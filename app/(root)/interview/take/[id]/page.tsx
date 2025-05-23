import type { Metadata } from "next";
import { notFound } from "next/navigation";
import InterviewSession from "@/components/interviews/participation/interview-session";
import { getInterviewById } from "@/lib/actions/general.action";
import { getCurrentUser } from "@/lib/actions/auth.action";

// For `generateMetadata`
export async function generateMetadata(
    context: { params: { id: string } }
): Promise<Metadata> {
    const { params } = context; // destructure here
    const interview = await getInterviewById(params?.id);

    if (!interview) {
        return {
            title: "Interview Not Found",
        };
    }

    return {
        title: `Taking: ${interview.title} | AI Voice Interview Platform`,
        description: interview.description,
    };
}

// For the page component
export default async function TakeInterviewPage(
    context: { params: { id: string } }
) {
    const { params } = context; // destructure here
    const interview = await getInterviewById(params?.id);
    console.log("interview: ", interview);
    const user = await getCurrentUser();

    if (!interview) {
        notFound();
    }

    return (
        <div className="container-fluid p-0 max-w-full">
            <InterviewSession userName={user?.name ?? ""}
                userId={user?.id ?? ""}
                interviewTitle={interview.title}
                type="interview" />
        </div>
    );
}
