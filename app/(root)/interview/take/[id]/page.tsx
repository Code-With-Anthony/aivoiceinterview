import type { Metadata } from "next"
import { notFound } from "next/navigation"
import InterviewSession from "@/components/interviews/participation/interview-session"
import { getInterviewById } from "@/lib/data"

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const interview = await getInterviewById(params.id)

    if (!interview) {
        return {
            title: "Interview Not Found",
        }
    }

    return {
        title: `Taking: ${interview.name} | AI Voice Interview Platform`,
        description: interview.description,
    }
}

export default async function TakeInterviewPage({ params }: { params: { id: string } }) {
    const interview = await getInterviewById(params.id)

    if (!interview) {
        notFound()
    }

    return (
        <div className="container mx-auto py-8 px-4">
            <InterviewSession interview={interview} />
        </div>
    )
}
