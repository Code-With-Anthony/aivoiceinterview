"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { CheckCircle, Copy, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { getInterviewById } from "@/lib/data"
import type { Interview } from "@/types/profile"
import { useUserStore } from "@/lib/store/useUserStore"

export default function InterviewSuccessPage() {
    const { user } = useUserStore(state => state)
    const searchParams = useSearchParams()
    const interviewId = searchParams.get("id")
    const [interview, setInterview] = useState<Interview | null>(null)
    const [copied, setCopied] = useState(false)

    useEffect(() => {
        if (interviewId) {
            // In a real app, you would fetch the interview data from the API
            getInterviewById(interviewId).then(setInterview)
        }
    }, [interviewId])

    const interviewLink = `${window.location.origin}/interviews/${interviewId}`

    const copyToClipboard = () => {
        navigator.clipboard.writeText(interviewLink)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const shareInterview = () => {
        if (navigator.share) {
            navigator.share({
                title: interview?.name || "AI Voice Interview",
                text: "Join this interview session",
                url: interviewLink,
            })
        } else {
            copyToClipboard()
        }
    }

    const isRecruiter = user?.role === "recruiter";
    const basePath = user?.role === "recruiter" ? "/recruiter/interview/create" : "/interview/create";
    const buttonText = isRecruiter ? "Back to Create Interview" : "Back to Interviews";

    return (
        <div className="container mx-auto py-16 px-4 flex flex-col items-center justify-center min-h-[80vh]">
            <div className="max-w-md w-full">
                <div className="flex justify-center mb-8">
                    <div className="rounded-full bg-green-100 p-3">
                        <CheckCircle className="h-12 w-12 text-green-600" />
                    </div>
                </div>

                <Card>
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl">Interview Created!</CardTitle>
                        <CardDescription>Your interview has been successfully created and is ready to share.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <h3 className="text-sm font-medium">Interview Link</h3>
                            <div className="flex">
                                <Input value={interviewLink} readOnly className="rounded-r-none" />
                                <Button variant="outline" size="icon" className="rounded-l-none" onClick={copyToClipboard}>
                                    {copied ? <CheckCircle className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-sm font-medium">Interview Details</h3>
                            <p className="text-sm">
                                <span className="font-medium">Type:</span> {interview?.type || "Voice"}
                            </p>
                            <p className="text-sm">
                                <span className="font-medium">Level:</span> {interview?.level || "Medium"}
                            </p>
                            <p className="text-sm">
                                <span className="font-medium">Questions:</span> {interview?.description?.split(" ").length || 5}
                            </p>
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-2">
                        <div className="grid grid-cols-2 gap-2 w-full">
                            <Button variant="outline" onClick={shareInterview} className="w-full">
                                <Share2 className="mr-2 h-4 w-4" /> Share
                            </Button>
                            <Link href={`/interviews/${interviewId}`} className="w-full">
                                <Button className="w-full">View Interview</Button>
                            </Link>
                        </div>
                        <Link href={basePath} className="w-full">
                            <Button variant="ghost" className="w-full">
                                {buttonText}
                            </Button>
                        </Link>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}
