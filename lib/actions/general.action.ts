"use server";

import { feedbackSchema } from "@/constants";
import { db } from "@/firebase/admin";
import { Interview } from "@/types/profile";
import { sampleInterviews } from "@/utils/utils";
import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { Timestamp } from "firebase/firestore";

export async function getInterviewsByUserId(userId: string): Promise<Interview[] | null> {
    if (!userId) return null; // avoid invalid query
    const interviews = await db.collection("interviews").where("userId", "==", userId).orderBy('createdAt', 'desc').get();
    console.log("interviews: ", interviews.docs.map((doc) => doc.data()));
    return interviews.docs.map((doc) => {
        const data = doc.data();
        return {
            id: doc.id,
            ...data,
            createdAt: data.createdAt?.toDate?.().toISOString() || null, // Convert to ISO string
            date: {
                ...data.date,
                scheduledDate: data.date.scheduledDate?.toDate?.().toISOString() || null, // Convert to ISO string     
            },
            scheduledDate: data.date.scheduledDate?.toDate?.().toISOString() || null,
        };
    }) as Interview[];

}

export async function sanitizeFirestoreData(obj: any): any {
    if (obj instanceof Timestamp) {
        return obj.toDate().toISOString();
    }

    if (Array.isArray(obj)) {
        return obj.map(sanitizeFirestoreData);
    }

    if (obj !== null && typeof obj === "object") {
        const sanitized: any = {};
        for (const key in obj) {
            sanitized[key] = sanitizeFirestoreData(obj[key]);
        }
        return sanitized;
    }

    return obj; // Primitive (string, number, boolean, null, etc.)
}

export async function getAllInterviews(): Promise<Interview[] | null> {
    const snapshot = await db.collection("interviews").get();

    return snapshot.docs.map((doc) => {
        const rawData = doc.data();
        console.log("scheduledDate:", rawData.date?.scheduledDate);
        console.log("is Timestamp?", typeof rawData.date?.scheduledDate?.toDate === "function");


        return {
            id: doc.id,
            type: rawData.type || null,
            title: rawData.title || null,
            level: rawData.level || null,
            description: rawData.description || null,
            durationPeriod: rawData.durationPeriod || null,
            invitedCandidates: rawData.invitedCandidates || [],
            category: rawData.category || null,
            durationLimit: rawData.durationLimit || null,
            numberOfQuestions: rawData.numberOfQuestions || null,
            questions: rawData.questions || [],
            userId: rawData.userId || null,
            techStack: Array.isArray(rawData.techStack) ? rawData.techStack : [],
            completed: rawData.completed ?? false,
            date: {
                interviewTimming: rawData.date?.interviewTimming || "future",
                avialabilityDuration: rawData.date?.avialabilityDuration || "limited",
                scheduledDate: rawData.date?.scheduledDate || null,
                durationPeriod: rawData.date?.durationPeriod || null,
            },
            createdAt: rawData.createdAt || null,
        };
    });
}

export async function getLatestInterviews(params: GetLatestInterviewsParams): Promise<Interview[] | null> {
    const { userId, limit = 20 } = params;
    if (!userId) return null; // avoid invalid query
    const interviews = await db
        .collection("interviews")
        .orderBy("createdAt", "desc")
        .where("finalized", "==", true)
        .where("userId", "!=", userId)
        .limit(limit)
        .get();
    return interviews.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    })) as Interview[];
}

export async function getInterviewById(id: string): Promise<Interview | null> {
    if (!id) return null;
    const interview = await db.collection("interviews").doc(id).get();
    return interview.data() as Interview | null;
}

export async function createFeedback(params: CreateFeedbackParams) {
    const { interviewId, userId, transcript } = params;
    if (!interviewId || !userId || !transcript) return null;

    try {
        const formattedTranscript = transcript.map((sentence: { role: string; content: string }) => (
            `- ${sentence.role}: ${sentence.content}\n`
        )).join("");

        const { object: { totalScore, categoryScores, strengths, areasForImprovement, finalAssessment } } = await generateObject({
            model: google('gemini-2.0-flash-001', {
                structuredOutputs: false,
            }),
            schema: feedbackSchema,
            prompt: `
        You are an AI interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories. Be thorough and detailed in your analysis. Don't be lenient with the candidate. If there are mistakes or areas for improvement, point them out.
        Transcript:
        ${formattedTranscript}

        Please score the candidate from 0 to 100 in the following areas. Do not add categories other than the ones provided:
        - **Communication Skills**: Clarity, articulation, structured responses.
        - **Technical Knowledge**: Understanding of key concepts for the role.
        - **Problem-Solving**: Ability to analyze problems and propose solutions.
        - **Cultural & Role Fit**: Alignment with company values and job role.
        - **Confidence & Clarity**: Confidence in responses, engagement, and clarity.
        `,
            system:
                "You are a professional interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories",
        })

        const feedback = await db.collection("feedback").add({
            interviewId: interviewId,
            userId,
            totalScore,
            categoryScores,
            strengths,
            areasForImprovement,
            finalAssessment,
            createdAt: new Date().toISOString(),
        })

        return {
            success: true,
            feedbackId: feedback.id,
        }
    } catch (error) {
        console.error("Error creating feedback:", error);
        return { success: false }
    }
}

export async function getFeedbackByInterviewId(params: GetFeedbackByInterviewIdParams): Promise<Feedback | null> {
    const { interviewId, userId } = params;
    if (!interviewId || !userId) return null;
    const feedback = await db
        .collection("feedback")
        .where("interviewId", "==", interviewId)
        .where("userId", "==", userId)
        .limit(1)
        .get();

    if (feedback.empty) return null;
    const feedbackData = feedback.docs[0]

    return {
        id: feedbackData.id,
        ...feedbackData.data()
    } as Feedback;
}

export async function getUserByUserId(userId: string): Promise<User | null> {
    if (!userId) return null;
    const user = await db.collection("users").doc(userId).get();
    return user.data() as User | null;
}

export async function addSampleInterviews() {
    try {
        for (const interview of sampleInterviews) {
            await db.collection("interviews").add(interview);
        }
        console.log("Sample interviews added successfully!");
    } catch (error) {
        console.error("Error adding sample interviews: ", error);
    }
}