import { z } from "zod";

export const ManualInterviewGenerationFormSchema = z.object({
    type: z.enum(["Voice", "Coding", "Mix"]),
    title: z.string().optional(),
    techStack: z.array(z.string()).optional(),
    level: z.enum(["Easy", "Medium", "Hard"]),
    description: z.string().min(10, "Description must be at least 10 characters"),

    date: z.object({
        interviewTimming: z.enum(["Current", "Future"]),
        availabilityDuration: z.enum(["Limited", "Permanent"]),
        scheduledDate: z.date().nullable(),
        durationPeriod: z.number().nullable().optional(),
    }),

    invitedCandidates: z.array(z.string()).optional(),
    category: z.enum(["TECHNICAL", "NON_TECHNICAL", "BEHAVIORAL", "CUSTOM"]),
    durationLimit: z.number().min(10, "Duration must be at least 5 minutes"),
    numberOfQuestions: z.number().min(3, "At least 2 question is required"),

    questions: z
        .array(
            z.object({
                question: z.string().optional(),
                expectedAnswer: z.string().optional(),
            })
        )
        .optional(),
});

export type ManualInterviewGenerationFormValues = z.infer<typeof ManualInterviewGenerationFormSchema>;