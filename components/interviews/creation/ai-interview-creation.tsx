"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Mic, MicOff, Camera, CameraOff, Send, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

type Message = {
    role: "user" | "assistant"
    content: string
    timestamp: Date
}

export default function AIInterviewCreation() {
    const router = useRouter()
    const [messages, setMessages] = useState<Message[]>([
        {
            role: "assistant",
            content:
                "Hi there! I'm your AI assistant. I'll help you create a customized interview. What type of interview would you like to create today?",
            timestamp: new Date(),
        },
    ])
    const [input, setInput] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isMicOn, setIsMicOn] = useState(false)
    const [isCameraOn, setIsCameraOn] = useState(false)
    const [interviewData, setInterviewData] = useState<any>(null)
    const [activeTab, setActiveTab] = useState<"chat" | "preview">("chat")

    const messagesEndRef = useRef<HTMLDivElement>(null)
    const videoRef = useRef<HTMLVideoElement>(null)

    // Scroll to bottom of messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    // Handle camera toggle
    useEffect(() => {
        if (isCameraOn && videoRef.current) {
            navigator.mediaDevices
                .getUserMedia({ video: true })
                .then((stream) => {
                    if (videoRef.current) {
                        videoRef.current.srcObject = stream
                    }
                })
                .catch((err) => {
                    console.error("Error accessing camera:", err)
                    setIsCameraOn(false)
                })
        } else if (videoRef.current?.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream
            stream.getTracks().forEach((track) => track.stop())
            videoRef.current.srcObject = null
        }
    }, [isCameraOn])

    const handleSendMessage = async () => {
        if (!input.trim()) return

        // Add user message
        const userMessage: Message = {
            role: "user",
            content: input,
            timestamp: new Date(),
        }

        setMessages((prev) => [...prev, userMessage])
        setInput("")
        setIsLoading(true)

        // Simulate AI response
        setTimeout(() => {
            let responseContent = ""

            // Simple logic to determine AI response based on message count
            if (messages.length === 1) {
                responseContent =
                    "Great! Let's create a " +
                    input +
                    " interview. What level of difficulty would you like? Easy, Medium, or Hard?"
            } else if (messages.length === 3) {
                responseContent = "Perfect. How many questions would you like to include in this interview?"
            } else if (messages.length === 5) {
                responseContent =
                    "Excellent. Would you like this interview to be available immediately or scheduled for a future date?"
            } else if (messages.length === 7) {
                responseContent =
                    "I've gathered all the information I need. I'm now generating your interview. This will just take a moment..."

                // After this message, we'll simulate the interview creation
                setTimeout(() => {
                    setInterviewData({
                        id: "ai-" + Math.random().toString(36).substring(2, 9),
                        type: "Voice",
                        level: "Medium",
                        numberOfQuestions: 10,
                        description: "AI-generated interview focusing on key skills and competencies.",
                        dateType: "Current",
                        duration: "Permanent",
                        category: "TECHNICAL",
                        status: "PUBLISHED",
                        durationLimit: 30,
                    })

                    setActiveTab("preview")
                }, 3000)
            } else {
                responseContent = "I understand. Is there anything specific you'd like to focus on in this interview?"
            }

            const assistantMessage: Message = {
                role: "assistant",
                content: responseContent,
                timestamp: new Date(),
            }

            setMessages((prev) => [...prev, assistantMessage])
            setIsLoading(false)
        }, 1500)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSendMessage()
        }
    }

    const toggleMic = () => {
        setIsMicOn(!isMicOn)
        // In a real app, you would implement speech recognition here
    }

    const toggleCamera = () => {
        setIsCameraOn(!isCameraOn)
    }

    const handleCreateInterview = () => {
        // In a real app, you would call an API to create the interview
        router.push(`/interview/create/success?id=${interviewData.id}`)
    }

    return (
        <div className="max-w-6xl mx-auto">
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "chat" | "preview")} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="chat">Chat with AI</TabsTrigger>
                    <TabsTrigger value="preview" disabled={!interviewData}>
                        Preview
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="chat" className="mt-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2">
                            <Card className="h-[600px] flex flex-col">
                                <CardContent className="flex-1 overflow-y-auto p-4">
                                    <div className="space-y-4 pt-4">
                                        <AnimatePresence initial={false}>
                                            {messages.map((message, index) => (
                                                <motion.div
                                                    key={index}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    className={cn("flex items-start gap-3 mb-4", message.role === "user" ? "justify-end" : "")}
                                                >
                                                    {message.role === "assistant" && (
                                                        <Avatar>
                                                            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="AI Assistant" />
                                                            <AvatarFallback>AI</AvatarFallback>
                                                        </Avatar>
                                                    )}

                                                    <div
                                                        className={cn(
                                                            "rounded-lg p-3 max-w-[80%]",
                                                            message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted",
                                                        )}
                                                    >
                                                        <p className="text-sm">{message.content}</p>
                                                        <p className="text-xs opacity-70 mt-1">
                                                            {message.timestamp.toLocaleTimeString([], {
                                                                hour: "2-digit",
                                                                minute: "2-digit",
                                                            })}
                                                        </p>
                                                    </div>

                                                    {message.role === "user" && (
                                                        <Avatar>
                                                            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                                                            <AvatarFallback>You</AvatarFallback>
                                                        </Avatar>
                                                    )}
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>

                                        {isLoading && (
                                            <div className="flex items-start gap-3 mb-4">
                                                <Avatar>
                                                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="AI Assistant" />
                                                    <AvatarFallback>AI</AvatarFallback>
                                                </Avatar>
                                                <div className="rounded-lg p-3 bg-muted">
                                                    <div className="flex items-center gap-1">
                                                        <div className="h-2 w-2 rounded-full bg-muted-foreground animate-pulse"></div>
                                                        <div className="h-2 w-2 rounded-full bg-muted-foreground animate-pulse delay-150"></div>
                                                        <div className="h-2 w-2 rounded-full bg-muted-foreground animate-pulse delay-300"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        <div ref={messagesEndRef} />
                                    </div>
                                </CardContent>

                                <div className="p-4 border-t">
                                    <div className="flex items-end gap-2">
                                        <Textarea
                                            placeholder="Type your message..."
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            onKeyDown={handleKeyDown}
                                            className="min-h-10 flex-1 resize-none"
                                        />
                                        <div className="flex flex-col gap-2">
                                            <Button
                                                size="icon"
                                                variant={isMicOn ? "default" : "outline"}
                                                onClick={toggleMic}
                                                className="h-10 w-10"
                                            >
                                                {isMicOn ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                                            </Button>
                                            <Button
                                                size="icon"
                                                onClick={handleSendMessage}
                                                disabled={!input.trim() || isLoading}
                                                className="h-10 w-10"
                                            >
                                                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>

                        <div>
                            <Card className="h-[600px] flex flex-col">
                                <CardContent className="p-4 flex-1 flex flex-col">
                                    <div className="relative flex-1 rounded-lg overflow-hidden bg-muted mb-4">
                                        {isCameraOn ? (
                                            <video ref={videoRef} autoPlay muted className="absolute inset-0 w-full h-full object-cover" />
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <p className="text-muted-foreground">Camera is off</p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex justify-center gap-2">
                                        <Button variant={isCameraOn ? "default" : "outline"} onClick={toggleCamera} className="gap-2">
                                            {isCameraOn ? (
                                                <>
                                                    <CameraOff className="h-4 w-4" /> Turn Off Camera
                                                </>
                                            ) : (
                                                <>
                                                    <Camera className="h-4 w-4" /> Turn On Camera
                                                </>
                                            )}
                                        </Button>
                                    </div>

                                    <div className="mt-6">
                                        <h3 className="font-medium mb-2">Tips for AI Interview Creation</h3>
                                        <ul className="space-y-2 text-sm">
                                            <li className="flex items-start gap-2">
                                                <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                                                    <svg className="h-2 w-2 text-primary" fill="currentColor" viewBox="0 0 8 8">
                                                        <circle cx="4" cy="4" r="3" />
                                                    </svg>
                                                </div>
                                                <span>Specify the type of interview (technical, behavioral, etc.)</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                                                    <svg className="h-2 w-2 text-primary" fill="currentColor" viewBox="0 0 8 8">
                                                        <circle cx="4" cy="4" r="3" />
                                                    </svg>
                                                </div>
                                                <span>Mention specific skills or topics you want to assess</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                                                    <svg className="h-2 w-2 text-primary" fill="currentColor" viewBox="0 0 8 8">
                                                        <circle cx="4" cy="4" r="3" />
                                                    </svg>
                                                </div>
                                                <span>Indicate the difficulty level and target audience</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                                                    <svg className="h-2 w-2 text-primary" fill="currentColor" viewBox="0 0 8 8">
                                                        <circle cx="4" cy="4" r="3" />
                                                    </svg>
                                                </div>
                                                <span>Ask for specific question formats if needed</span>
                                            </li>
                                        </ul>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="preview" className="mt-6">
                    {interviewData && (
                        <div className="space-y-6">
                            <Card>
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between mb-6">
                                        <div>
                                            <h2 className="text-2xl font-bold">AI-Generated Interview</h2>
                                            <p className="text-muted-foreground">Created based on your specifications</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Button variant="outline" onClick={() => setActiveTab("chat")}>
                                                Edit
                                            </Button>
                                            <Button onClick={handleCreateInterview}>Create Interview</Button>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div>
                                            <h3 className="text-lg font-medium mb-4">Interview Details</h3>
                                            <div className="space-y-4">
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <h4 className="text-sm font-medium text-muted-foreground">Type</h4>
                                                        <p>{interviewData.type}</p>
                                                    </div>
                                                    <div>
                                                        <h4 className="text-sm font-medium text-muted-foreground">Level</h4>
                                                        <p>{interviewData.level}</p>
                                                    </div>
                                                    <div>
                                                        <h4 className="text-sm font-medium text-muted-foreground">Questions</h4>
                                                        <p>{interviewData.numberOfQuestions}</p>
                                                    </div>
                                                    <div>
                                                        <h4 className="text-sm font-medium text-muted-foreground">Duration</h4>
                                                        <p>{interviewData.durationLimit} minutes</p>
                                                    </div>
                                                    <div>
                                                        <h4 className="text-sm font-medium text-muted-foreground">Availability</h4>
                                                        <p>{interviewData.dateType === "Current" ? "Immediate" : "Scheduled"}</p>
                                                    </div>
                                                    <div>
                                                        <h4 className="text-sm font-medium text-muted-foreground">Status</h4>
                                                        <p>{interviewData.status}</p>
                                                    </div>
                                                </div>

                                                <div>
                                                    <h4 className="text-sm font-medium text-muted-foreground">Description</h4>
                                                    <p>{interviewData.description}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="text-lg font-medium mb-4">Sample Questions</h3>
                                            <ul className="space-y-3">
                                                <li className="p-3 bg-muted rounded-md">
                                                    Tell me about your experience with [relevant technology].
                                                </li>
                                                <li className="p-3 bg-muted rounded-md">
                                                    How would you approach solving [specific problem] in your work?
                                                </li>
                                                <li className="p-3 bg-muted rounded-md">
                                                    Describe a challenging situation you faced and how you resolved it.
                                                </li>
                                                <li className="p-3 bg-muted rounded-md">
                                                    What are your strengths and weaknesses when it comes to teamwork?
                                                </li>
                                                <li className="p-3 bg-muted rounded-md text-muted-foreground">
                                                    +{interviewData.numberOfQuestions - 5} more questions...
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="flex justify-end gap-2">
                                <Button variant="outline" onClick={() => setActiveTab("chat")}>
                                    Back to Chat
                                </Button>
                                <Button onClick={handleCreateInterview}>Create Interview</Button>
                            </div>
                        </div>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    )
}
