"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { CheckCircle, ChevronLeft, Download, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getInterviewById } from "@/lib/data"
import type { Interview } from "@/types/profile"

export default function InterviewResultsPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const interviewId = searchParams.get("id")
    const wasTerminated = searchParams.get("terminated") === "true"

    const [interview, setInterview] = useState<Interview | null>(null)
    const [overallScore, setOverallScore] = useState(0)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (interviewId) {
            // In a real app, you would fetch the interview results from the API
            getInterviewById(interviewId).then((data) => {
                setInterview(data)

                // Generate a random score between 60 and 95 if not terminated
                if (!wasTerminated) {
                    setOverallScore(Math.floor(Math.random() * 36) + 60)
                } else {
                    setOverallScore(0)
                }

                setLoading(false)
            })
        }
    }, [interviewId, wasTerminated])

    if (loading) {
        return (
            <div className="container mx-auto py-16 px-4 flex flex-col items-center justify-center min-h-[80vh]">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-muted-foreground">Loading your results...</p>
            </div>
        )
    }

    if (!interview) {
        return (
            <div className="container mx-auto py-16 px-4 flex flex-col items-center justify-center min-h-[80vh]">
                <h1 className="text-2xl font-bold mb-4">Interview Not Found</h1>
                <p className="text-muted-foreground mb-8">We couldn't find the interview results you're looking for.</p>
                <Link href="/interviews">
                    <Button>Back to Interviews</Button>
                </Link>
            </div>
        )
    }

    const getScoreColor = (score: number) => {
        if (score >= 80) return "text-green-600"
        if (score >= 60) return "text-amber-600"
        return "text-red-600"
    }

    const getProgressColor = (score: number) => {
        if (score >= 80) return "bg-green-600"
        if (score >= 60) return "bg-amber-600"
        return "bg-red-600"
    }

    return (
        <div className="container mx-auto py-8 px-4">
            <Link href="/interviews" className="flex items-center text-sm mb-6 hover:underline">
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back to all interviews
            </Link>

            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold">{wasTerminated ? "Interview Terminated" : "Interview Results"}</h1>
                    <p className="text-muted-foreground mt-1">
                        {wasTerminated
                            ? "Your interview was terminated due to rule violations."
                            : `Here's how you performed in the ${interview.name} interview.`}
                    </p>
                </div>

                {wasTerminated ? (
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-red-600">Interview Terminated</CardTitle>
                            <CardDescription>
                                Your interview was terminated due to rule violations. Please review the interview guidelines before
                                attempting again.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>
                                The AI system detected that you switched tabs or applications during the interview, which is against the
                                interview rules. This is considered a violation of the interview integrity.
                            </p>
                            <p className="mt-4">
                                You can retake this interview after 24 hours. Please ensure you follow all guidelines during your next
                                attempt.
                            </p>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={() => router.push("/interviews")}>Back to Interviews</Button>
                        </CardFooter>
                    </Card>
                ) : (
                    <>
                        <Card className="mb-8">
                            <CardHeader>
                                <CardTitle>Overall Performance</CardTitle>
                                <CardDescription>Your overall score and performance summary</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col md:flex-row items-center gap-8">
                                    <div className="relative w-40 h-40 flex items-center justify-center">
                                        <svg className="w-full h-full" viewBox="0 0 100 100">
                                            <circle
                                                className="text-muted stroke-current"
                                                strokeWidth="10"
                                                cx="50"
                                                cy="50"
                                                r="40"
                                                fill="transparent"
                                            ></circle>
                                            <circle
                                                className={`${getProgressColor(overallScore)} stroke-current`}
                                                strokeWidth="10"
                                                strokeLinecap="round"
                                                cx="50"
                                                cy="50"
                                                r="40"
                                                fill="transparent"
                                                strokeDasharray={`${overallScore * 2.51} 251.2`}
                                                strokeDashoffset="0"
                                                transform="rotate(-90 50 50)"
                                            ></circle>
                                        </svg>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className={`text-4xl font-bold ${getScoreColor(overallScore)}`}>{overallScore}</span>
                                        </div>
                                    </div>

                                    <div className="flex-1 space-y-4">
                                        <div>
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-sm font-medium">Technical Knowledge</span>
                                                <span className="text-sm font-medium">
                                                    {Math.min(Math.max(overallScore + Math.floor(Math.random() * 11) - 5, 0), 100)}%
                                                </span>
                                            </div>
                                            <Progress value={overallScore + Math.floor(Math.random() * 11) - 5} className="h-2" />
                                        </div>

                                        <div>
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-sm font-medium">Communication Skills</span>
                                                <span className="text-sm font-medium">
                                                    {Math.min(Math.max(overallScore + Math.floor(Math.random() * 11) - 5, 0), 100)}%
                                                </span>
                                            </div>
                                            <Progress value={overallScore + Math.floor(Math.random() * 11) - 5} className="h-2" />
                                        </div>

                                        <div>
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-sm font-medium">Problem Solving</span>
                                                <span className="text-sm font-medium">
                                                    {Math.min(Math.max(overallScore + Math.floor(Math.random() * 11) - 5, 0), 100)}%
                                                </span>
                                            </div>
                                            <Progress value={overallScore + Math.floor(Math.random() * 11) - 5} className="h-2" />
                                        </div>

                                        <div>
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-sm font-medium">Overall Confidence</span>
                                                <span className="text-sm font-medium">
                                                    {Math.min(Math.max(overallScore + Math.floor(Math.random() * 11) - 5, 0), 100)}%
                                                </span>
                                            </div>
                                            <Progress value={overallScore + Math.floor(Math.random() * 11) - 5} className="h-2" />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Tabs defaultValue="feedback" className="w-full">
                            <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="feedback">Detailed Feedback</TabsTrigger>
                                <TabsTrigger value="answers">Your Answers</TabsTrigger>
                                <TabsTrigger value="improvement">Areas for Improvement</TabsTrigger>
                            </TabsList>

                            <TabsContent value="feedback" className="mt-6 space-y-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>AI Feedback</CardTitle>
                                        <CardDescription>Personalized feedback based on your interview performance</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div>
                                            <h3 className="font-medium mb-2">Strengths</h3>
                                            <ul className="list-disc pl-5 space-y-1">
                                                <li>Clear communication and articulation of ideas</li>
                                                <li>Good understanding of core concepts</li>
                                                <li>Logical approach to problem-solving</li>
                                                <li>Relevant examples from past experience</li>
                                            </ul>
                                        </div>

                                        <div>
                                            <h3 className="font-medium mb-2">Areas for Improvement</h3>
                                            <ul className="list-disc pl-5 space-y-1">
                                                <li>Could provide more specific technical details</li>
                                                <li>Consider structuring responses with the STAR method</li>
                                                <li>Expand on how you've handled challenges</li>
                                                <li>Provide more quantifiable results when discussing achievements</li>
                                            </ul>
                                        </div>

                                        <div>
                                            <h3 className="font-medium mb-2">Overall Assessment</h3>
                                            <p>
                                                You demonstrated a solid understanding of the subject matter and communicated your ideas
                                                effectively. Your responses were generally well-structured and relevant to the questions asked.
                                                To improve further, focus on providing more specific examples and quantifiable results when
                                                discussing your experiences and achievements.
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>

                                <div className="flex justify-between">
                                    <Button variant="outline" onClick={() => router.push("/interviews")}>
                                        Back to Interviews
                                    </Button>
                                    <div className="flex gap-2">
                                        <Button variant="outline">
                                            <Download className="mr-2 h-4 w-4" /> Download Report
                                        </Button>
                                        <Button>
                                            <Share2 className="mr-2 h-4 w-4" /> Share Results
                                        </Button>
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="answers" className="mt-6 space-y-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Your Answers</CardTitle>
                                        <CardDescription>Review your responses to the interview questions</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        {[1, 2, 3, 4, 5].map((i) => (
                                            <div key={i} className="space-y-2 pb-4 border-b last:border-0">
                                                <h3 className="font-medium">Question {i}</h3>
                                                <p className="text-muted-foreground">
                                                    {
                                                        [
                                                            "Tell me about your background and experience.",
                                                            "What are your strengths and weaknesses?",
                                                            "Describe a challenging project you worked on.",
                                                            "How do you handle tight deadlines?",
                                                            "What technologies are you most comfortable with?",
                                                        ][i - 1]
                                                    }
                                                </p>
                                                <div className="bg-muted p-3 rounded-md mt-2">
                                                    <p className="text-sm">
                                                        {
                                                            [
                                                                "I have over 5 years of experience in software development, specializing in web technologies. I've worked on various projects ranging from e-commerce platforms to enterprise applications.",
                                                                "My strengths include problem-solving, attention to detail, and the ability to learn quickly. My weakness is that I sometimes focus too much on perfecting details, but I'm working on balancing quality with efficiency.",
                                                                "I worked on a project where we had to migrate a legacy system to a modern architecture while maintaining all functionality. The challenge was ensuring data integrity during the migration while keeping the system operational.",
                                                                "I prioritize tasks, break down large projects into manageable chunks, and communicate regularly with stakeholders to manage expectations. I also ensure I have buffer time for unexpected issues.",
                                                                "I'm most comfortable with JavaScript, React, Node.js, and SQL databases. I've also worked with Python and AWS services for various projects.",
                                                            ][i - 1]
                                                        }
                                                    </p>
                                                </div>
                                                <div className="flex items-center justify-between mt-2">
                                                    <span className="text-sm font-medium">Score</span>
                                                    <span
                                                        className={`text-sm font-medium ${getScoreColor(Math.min(Math.max(overallScore + Math.floor(Math.random() * 11) - 5, 0), 100))}`}
                                                    >
                                                        {Math.min(Math.max(overallScore + Math.floor(Math.random() * 11) - 5, 0), 100)}/100
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </CardContent>
                                </Card>

                                <div className="flex justify-between">
                                    <Button variant="outline" onClick={() => router.push("/interviews")}>
                                        Back to Interviews
                                    </Button>
                                    <Button variant="outline">
                                        <Download className="mr-2 h-4 w-4" /> Download All Answers
                                    </Button>
                                </div>
                            </TabsContent>

                            <TabsContent value="improvement" className="mt-6 space-y-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Recommended Improvements</CardTitle>
                                        <CardDescription>Personalized recommendations to help you improve</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="space-y-2">
                                            <h3 className="font-medium">Technical Knowledge</h3>
                                            <p>
                                                Consider deepening your understanding of advanced concepts in your core technologies. Here are
                                                some resources that might help:
                                            </p>
                                            <ul className="list-disc pl-5 space-y-1 mt-2">
                                                <li>
                                                    <a href="#" className="text-primary hover:underline">
                                                        Advanced JavaScript Patterns
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#" className="text-primary hover:underline">
                                                        System Design Fundamentals
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#" className="text-primary hover:underline">
                                                        Data Structures and Algorithms
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="space-y-2">
                                            <h3 className="font-medium">Communication Skills</h3>
                                            <p>
                                                Practice structuring your responses using the STAR method (Situation, Task, Action, Result) to
                                                make your answers more impactful.
                                            </p>
                                            <div className="bg-muted p-3 rounded-md mt-2">
                                                <p className="text-sm font-medium">Example STAR Response:</p>
                                                <p className="text-sm mt-1">
                                                    <strong>Situation:</strong> "At my previous company, we faced a critical performance issue
                                                    with our main application."
                                                </p>
                                                <p className="text-sm mt-1">
                                                    <strong>Task:</strong> "I was tasked with identifying the bottleneck and improving response
                                                    times by at least 50%."
                                                </p>
                                                <p className="text-sm mt-1">
                                                    <strong>Action:</strong> "I profiled the application, identified inefficient database queries,
                                                    implemented caching, and optimized the most resource-intensive operations."
                                                </p>
                                                <p className="text-sm mt-1">
                                                    <strong>Result:</strong> "These changes reduced response times by 70% and improved user
                                                    satisfaction scores by 25%."
                                                </p>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <h3 className="font-medium">Practice Interviews</h3>
                                            <p>Based on your performance, we recommend the following practice interviews:</p>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                                                <Card>
                                                    <CardContent className="p-4">
                                                        <h4 className="font-medium">Advanced Technical Interview</h4>
                                                        <p className="text-sm text-muted-foreground mt-1">Focus on in-depth technical questions</p>
                                                        <Button className="w-full mt-4" size="sm">
                                                            Start Practice
                                                        </Button>
                                                    </CardContent>
                                                </Card>
                                                <Card>
                                                    <CardContent className="p-4">
                                                        <h4 className="font-medium">Behavioral Interview</h4>
                                                        <p className="text-sm text-muted-foreground mt-1">Improve your STAR method responses</p>
                                                        <Button className="w-full mt-4" size="sm">
                                                            Start Practice
                                                        </Button>
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <div className="flex justify-between">
                                    <Button variant="outline" onClick={() => router.push("/interviews")}>
                                        Back to Interviews
                                    </Button>
                                    <Button>
                                        <CheckCircle className="mr-2 h-4 w-4" /> Schedule Follow-up
                                    </Button>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </>
                )}
            </div>
        </div>
    )
}
