"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Mic, MicOff, Camera, CameraOff, Monitor, AlertTriangle, Code, Send, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Interview } from "@/types/profile"
import { cn } from "@/lib/utils"

interface InterviewSessionProps {
    interview: Interview
}

type Message = {
    role: "user" | "assistant"
    content: string
    timestamp: Date
}

export default function InterviewSession({ interview }: InterviewSessionProps) {
    const router = useRouter()
    const [activeTab, setActiveTab] = useState<"interview" | "code">("interview")
    const [messages, setMessages] = useState<Message[]>([
        {
            role: "assistant",
            content: `Welcome to the ${interview.name} interview. I'll be asking you a series of questions to assess your skills and experience. Please make sure your camera and microphone are enabled. Are you ready to begin?`,
            timestamp: new Date(),
        },
    ])
    const [input, setInput] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isMicOn, setIsMicOn] = useState(false)
    const [isCameraOn, setIsCameraOn] = useState(false)
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [totalQuestions] = useState(10)
    const [showWarning, setShowWarning] = useState(false)
    const [warningCount, setWarningCount] = useState(0)
    const [code, setCode] = useState("")
    const [isRecording, setIsRecording] = useState(false)
    const [isInterviewComplete, setIsInterviewComplete] = useState(false)

    const messagesEndRef = useRef<HTMLDivElement>(null)
    const videoRef = useRef<HTMLVideoElement>(null)

    // Sample questions for the interview
    const questions = [
        "Tell me about your background and experience.",
        "What are your strengths and weaknesses?",
        "Describe a challenging project you worked on.",
        "How do you handle tight deadlines?",
        "What technologies are you most comfortable with?",
        "How do you stay updated with industry trends?",
        "Describe your problem-solving approach.",
        "How do you work in a team environment?",
        "What are your career goals?",
        "Do you have any questions for me?",
    ]

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

    // Monitor tab visibility
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden && !isInterviewComplete) {
                handleTabChange()
            }
        }

        document.addEventListener("visibilitychange", handleVisibilityChange)

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange)
        }
    }, [isInterviewComplete])

    // Start the interview when user is ready
    useEffect(() => {
        const handleStartInterview = () => {
            if (messages.length === 2 && messages[1].role === "user") {
                setTimeout(() => {
                    askNextQuestion()
                }, 1500)
            }
        }

        handleStartInterview()
    }, [messages])

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
            if (currentQuestion < totalQuestions - 1) {
                askNextQuestion()
            } else {
                // End the interview
                const finalMessage: Message = {
                    role: "assistant",
                    content:
                        "Thank you for completing this interview. Your responses have been recorded. You'll receive feedback shortly.",
                    timestamp: new Date(),
                }

                setMessages((prev) => [...prev, finalMessage])
                setIsInterviewComplete(true)

                // Redirect to results page after a delay
                setTimeout(() => {
                    router.push(`/interviews/results?id=${interview.id}`)
                }, 5000)
            }

            setIsLoading(false)
        }, 1500)
    }

    const askNextQuestion = () => {
        setCurrentQuestion((prev) => {
            const next = prev + 1

            const questionMessage: Message = {
                role: "assistant",
                content: questions[next - 1],
                timestamp: new Date(),
            }

            setMessages((prev) => [...prev, questionMessage])

            return next
        })
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

    const toggleRecording = () => {
        setIsRecording(!isRecording)
        // In a real app, you would implement screen recording here
    }

    const handleTabChange = () => {
        if (warningCount < 1) {
            setShowWarning(true)
            setWarningCount((prev) => prev + 1)

            setTimeout(() => {
                setShowWarning(false)
            }, 5000)
        } else {
            // End the interview due to cheating
            const warningMessage: Message = {
                role: "assistant",
                content:
                    "The interview has been terminated due to multiple violations of the interview rules. Switching tabs or applications during the interview is not allowed.",
                timestamp: new Date(),
            }

            setMessages((prev) => [...prev, warningMessage])
            setIsInterviewComplete(true)

            // Redirect to results page after a delay
            setTimeout(() => {
                router.push(`/interviews/results?id=${interview.id}&terminated=true`)
            }, 5000)
        }
    }

    const handleEndInterview = () => {
        if (confirm("Are you sure you want to end this interview? Your progress will be saved.")) {
            router.push(`/interviews/results?id=${interview.id}`)
        }
    }

    // Audio visualization for AI speaking
    const AudioWaveform = () => (
        <div className="flex items-center gap-0.5 h-4">
            {Array.from({ length: 5 }).map((_, i) => (
                <motion.div
                    key={i}
                    className="w-1 bg-primary rounded-full"
                    animate={{
                        height: [4, 12, 4],
                    }}
                    transition={{
                        duration: 0.8,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                        delay: i * 0.1,
                    }}
                />
            ))}
        </div>
    )

    return (
        <div className="max-w-6xl mx-auto">
            <div className="mb-6">
                <h1 className="text-2xl font-bold">{interview.name}</h1>
                <div className="flex items-center justify-between mt-2">
                    <p className="text-muted-foreground">
                        {interview.type} Interview • {interview.level} • {currentQuestion}/{totalQuestions} Questions
                    </p>
                    <Button variant="destructive" size="sm" onClick={handleEndInterview}>
                        End Interview
                    </Button>
                </div>
                <Progress value={(currentQuestion / totalQuestions) * 100} className="mt-4" />
            </div>

            {showWarning && (
                <Alert variant="destructive" className="mb-4">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Warning!</AlertTitle>
                    <AlertDescription>
                        Switching tabs or applications during the interview is not allowed. This is your{" "}
                        {warningCount === 0 ? "first" : "final"} warning.
                    </AlertDescription>
                </Alert>
            )}

            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "interview" | "code")} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="interview">Interview</TabsTrigger>
                    <TabsTrigger value="code" disabled={interview.type !== "Coding" && interview.type !== "Mix"}>
                        Code Editor
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="interview" className="mt-6">
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
                                                            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="AI Interviewer" />
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
                                                        <div className="flex items-center justify-between mt-1">
                                                            <p className="text-xs opacity-70">
                                                                {message.timestamp.toLocaleTimeString([], {
                                                                    hour: "2-digit",
                                                                    minute: "2-digit",
                                                                })}
                                                            </p>

                                                            {message.role === "assistant" && index === messages.length - 1 && <AudioWaveform />}
                                                        </div>
                                                    </div>

                                                    {message.role === "user" && (
                                                        <Avatar>
                                                            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="You" />
                                                            <AvatarFallback>You</AvatarFallback>
                                                        </Avatar>
                                                    )}
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>

                                        {isLoading && (
                                            <div className="flex items-start gap-3 mb-4">
                                                <Avatar>
                                                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="AI Interviewer" />
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
                                            placeholder="Type your response..."
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            onKeyDown={handleKeyDown}
                                            className="min-h-10 flex-1 resize-none"
                                            disabled={isInterviewComplete}
                                        />
                                        <div className="flex flex-col gap-2">
                                            <Button
                                                size="icon"
                                                variant={isMicOn ? "default" : "outline"}
                                                onClick={toggleMic}
                                                className="h-10 w-10"
                                                disabled={isInterviewComplete}
                                            >
                                                {isMicOn ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                                            </Button>
                                            <Button
                                                size="icon"
                                                onClick={handleSendMessage}
                                                disabled={!input.trim() || isLoading || isInterviewComplete}
                                                className="h-10 w-10"
                                            >
                                                <Send className="h-4 w-4" />
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

                                    <div className="flex justify-center gap-2 mb-4">
                                        <Button
                                            variant={isCameraOn ? "default" : "outline"}
                                            onClick={toggleCamera}
                                            className="gap-2 flex-1"
                                            disabled={isInterviewComplete}
                                        >
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

                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <h3 className="font-medium">Interview Rules</h3>
                                            <Button
                                                variant={isRecording ? "default" : "outline"}
                                                size="sm"
                                                onClick={toggleRecording}
                                                className="gap-1"
                                                disabled={isInterviewComplete}
                                            >
                                                <Monitor className="h-4 w-4" />
                                                {isRecording ? "Recording" : "Record Screen"}
                                            </Button>
                                        </div>

                                        <ul className="space-y-2 text-sm">
                                            <li className="flex items-start gap-2">
                                                <div className="rounded-full bg-destructive/10 p-1 mt-0.5">
                                                    <X className="h-3 w-3 text-destructive" />
                                                </div>
                                                <span>Do not switch tabs or applications</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <div className="rounded-full bg-destructive/10 p-1 mt-0.5">
                                                    <X className="h-3 w-3 text-destructive" />
                                                </div>
                                                <span>Do not use external resources unless specified</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <div className="rounded-full bg-destructive/10 p-1 mt-0.5">
                                                    <X className="h-3 w-3 text-destructive" />
                                                </div>
                                                <span>Do not communicate with others during the interview</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                                                    <svg className="h-3 w-3 text-primary" fill="currentColor" viewBox="0 0 8 8">
                                                        <circle cx="4" cy="4" r="3" />
                                                    </svg>
                                                </div>
                                                <span>Speak clearly and directly into your microphone</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                                                    <svg className="h-3 w-3 text-primary" fill="currentColor" viewBox="0 0 8 8">
                                                        <circle cx="4" cy="4" r="3" />
                                                    </svg>
                                                </div>
                                                <span>Ensure your face is clearly visible in the camera</span>
                                            </li>
                                        </ul>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="code" className="mt-6">
                    <Card className="h-[600px] flex flex-col">
                        <CardContent className="p-4 flex-1 flex flex-col">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-medium">Code Editor</h3>
                                <div className="flex items-center gap-2">
                                    <Button variant="outline" size="sm" onClick={() => setCode("")} disabled={!code.trim()}>
                                        Clear
                                    </Button>
                                    <Button variant="outline" size="sm" onClick={() => setActiveTab("interview")}>
                                        Back to Interview
                                    </Button>
                                </div>
                            </div>

                            <div className="flex-1 bg-muted rounded-md overflow-hidden">
                                <Textarea
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    placeholder="Write your code here..."
                                    className="h-full resize-none font-mono p-4 bg-muted"
                                    disabled={isInterviewComplete}
                                />
                            </div>

                            <div className="mt-4">
                                <p className="text-sm text-muted-foreground">
                                    <Code className="h-4 w-4 inline-block mr-1" />
                                    Use this editor to write code for any programming questions. Your code will be saved and submitted
                                    with your interview.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
