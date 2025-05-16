"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Bot, FileEdit, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useUserStore } from "@/lib/store/useUserStore"

export default function InterviewCreationOptions() {
    const router = useRouter()
    const [selectedOption, setSelectedOption] = useState<"ai" | "manual" | null>(null)
    const { user } = useUserStore(state => state)

    const handleOptionSelect = (option: "ai" | "manual") => {
        setSelectedOption(option)
    }

    const handleContinue = () => {
        if (!user) return;

        const basePath = user.role === "recruiter" ? "/recruiter/interview/create" : "/interview/create";

        const path = selectedOption === "ai"
            ? `${basePath}/ai`
            : `${basePath}/manual`;

        router.push(path);
    };


    return (
        <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card
                    className={`cursor-pointer transition-all hover:shadow-md ${selectedOption === "ai" ? "ring-2 ring-primary ring-offset-2" : ""
                        }`}
                    onClick={() => handleOptionSelect("ai")}
                >
                    <CardHeader className="pb-2">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                            <Bot className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle>AI-Assisted Creation</CardTitle>
                        <CardDescription>Let our AI guide you through creating the perfect interview</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="relative h-48 w-full rounded-md overflow-hidden mb-4">
                            <Image
                                src="/placeholder.svg?height=192&width=384"
                                alt="AI Interview Creation"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-start gap-2">
                                <div className="rounded-full bg-green-500 p-1 mt-0.5">
                                    <svg className="h-2 w-2 text-white" fill="currentColor" viewBox="0 0 8 8">
                                        <circle cx="4" cy="4" r="3" />
                                    </svg>
                                </div>
                                <span>Conversational interface to define your interview</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <div className="rounded-full bg-green-500 p-1 mt-0.5">
                                    <svg className="h-2 w-2 text-white" fill="currentColor" viewBox="0 0 8 8">
                                        <circle cx="4" cy="4" r="3" />
                                    </svg>
                                </div>
                                <span>AI generates relevant questions based on your requirements</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <div className="rounded-full bg-green-500 p-1 mt-0.5">
                                    <svg className="h-2 w-2 text-white" fill="currentColor" viewBox="0 0 8 8">
                                        <circle cx="4" cy="4" r="3" />
                                    </svg>
                                </div>
                                <span>Quick setup with intelligent defaults</span>
                            </li>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <p className="text-sm text-muted-foreground">Best for: First-time users or when you need inspiration</p>
                    </CardFooter>
                </Card>

                <Card
                    className={`cursor-pointer transition-all hover:shadow-md ${selectedOption === "manual" ? "ring-2 ring-primary ring-offset-2" : ""
                        }`}
                    onClick={() => handleOptionSelect("manual")}
                >
                    <CardHeader className="pb-2">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                            <FileEdit className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle>Manual Creation</CardTitle>
                        <CardDescription>Full control over every aspect of your interview</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="relative h-48 w-full rounded-md overflow-hidden mb-4">
                            <Image
                                src="/placeholder.svg?height=192&width=384"
                                alt="Manual Interview Creation"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-start gap-2">
                                <div className="rounded-full bg-green-500 p-1 mt-0.5">
                                    <svg className="h-2 w-2 text-white" fill="currentColor" viewBox="0 0 8 8">
                                        <circle cx="4" cy="4" r="3" />
                                    </svg>
                                </div>
                                <span>Detailed form with all configuration options</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <div className="rounded-full bg-green-500 p-1 mt-0.5">
                                    <svg className="h-2 w-2 text-white" fill="currentColor" viewBox="0 0 8 8">
                                        <circle cx="4" cy="4" r="3" />
                                    </svg>
                                </div>
                                <span>Create custom question sets with specific criteria</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <div className="rounded-full bg-green-500 p-1 mt-0.5">
                                    <svg className="h-2 w-2 text-white" fill="currentColor" viewBox="0 0 8 8">
                                        <circle cx="4" cy="4" r="3" />
                                    </svg>
                                </div>
                                <span>Live preview as you build your interview</span>
                            </li>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <p className="text-sm text-muted-foreground">
                            Best for: Experienced users or specific interview requirements
                        </p>
                    </CardFooter>
                </Card>
            </div>

            <div className="mt-8 flex justify-center">
                <Button size="lg" onClick={handleContinue} disabled={!selectedOption} className="gap-2 cursor-pointer">
                    Continue <ArrowRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}
