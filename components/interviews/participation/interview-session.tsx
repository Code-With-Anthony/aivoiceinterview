"use client"

import { Alert } from "@/components/ui/alert"
import CircularAudioVisualizer from "@/components/ui/audio-visualizer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { interviewer } from "@/constants"
import { createFeedback } from "@/lib/actions/general.action"
import { getAILogo } from "@/lib/data"
import { cn } from "@/lib/utils"
import { vapi } from "@/lib/vapi.sdk"
import { AnimatePresence, motion } from "framer-motion"
import {
    AlertTriangle,
    Camera,
    CameraOff,
    Clock,
    Maximize2,
    Mic,
    MicOff,
    Minimize2
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"

enum CallStatus {
    INACTIVE = "INACTIVE",
    ACTIVE = "ACTIVE",
    CONNECTING = "CONNECTING",
    FINISHED = "FINISHED",
}

interface SavedMessage {
    role: "user" | "system" | "assistant";
    content: string;
}

export default function InterviewSession({
    userName,
    userId,
    type,
    interviewId,
    questions,
    interviewTitle
}: AgentProps) {
    const router = useRouter()
    const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [messages, setMessages] = useState<SavedMessage[]>([
        {
            role: "assistant",
            content: `Welcome to the ${interviewTitle} interview. I'll be asking you a series of questions to assess your skills and experience. Please make sure your camera and microphone are enabled. Are you ready to begin?`,
        },
    ])
    const [isMicOn, setIsMicOn] = useState(false)
    const [isCameraOn, setIsCameraOn] = useState(false)
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [totalQuestions] = useState(10)
    const [showWarning, setShowWarning] = useState(false)
    const [warningCount, setWarningCount] = useState(0)
    const [isRecording, setIsRecording] = useState(false)
    const [isInterviewComplete, setIsInterviewComplete] = useState(false)
    const [showDeviceModal, setShowDeviceModal] = useState(true)
    const [isFullscreen, setIsFullscreen] = useState(false)
    const [isMuted, setIsMuted] = useState(false)
    const [elapsedTime, setElapsedTime] = useState(0)
    const [showEndDialog, setShowEndDialog] = useState(false)
    const [aiSpeaking, setAiSpeaking] = useState(true)
    const [showMobileChat, setShowMobileChat] = useState(true)
    const [showMobileCode, setShowMobileCode] = useState(false)

    const messagesEndRef = useRef<HTMLDivElement>(null)
    const videoRef = useRef<HTMLVideoElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const timerRef = useRef<NodeJS.Timeout | null>(null)

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

    // Timer for interview duration
    useEffect(() => {
        if (!isInterviewComplete) {
            timerRef.current = setInterval(() => {
                setElapsedTime((prev) => prev + 1)
            }, 1000)
        } else if (timerRef.current) {
            clearInterval(timerRef.current)
        }

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current)
            }
        }
    }, [isInterviewComplete])

    useEffect(() => {
        const onCallStart = () => setCallStatus(CallStatus.ACTIVE);
        const onCallEnd = () => setCallStatus(CallStatus.FINISHED);

        const onMessage = (message: Message) => {
            if (message.type === "transcript" && message.transcriptType === "final") {
                const newMessage = {
                    role: message.role,
                    content: message.transcript,
                };
                setMessages((prev) => [...prev, newMessage]);
            }
        };

        const onSpeechStart = () => setIsSpeaking(true);
        const onSpeechEnd = () => setIsSpeaking(false);

        const onError = (error: Error) => console.log("Error", error);

        vapi.on("call-start", onCallStart);
        vapi.on("call-end", onCallEnd);
        vapi.on("message", onMessage);
        vapi.on("speech-start", onSpeechStart);
        vapi.on("speech-end", onSpeechEnd);
        vapi.on("error", onError);

        return () => {
            vapi.off("call-start", onCallStart);
            vapi.off("call-end", onCallEnd);
            vapi.off("message", onMessage);
            vapi.off("speech-start", onSpeechStart);
            vapi.off("speech-end", onSpeechEnd);
            vapi.off("error", onError);
        };
    }, []);


    // Format time for display
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
    }

    const toggleMic = () => {
        setIsMicOn(!isMicOn)
        // In a real app, you would implement speech recognition here
    }

    const toggleCamera = () => {
        setIsCameraOn(!isCameraOn)
    }

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            containerRef.current?.requestFullscreen()
            setIsFullscreen(true)
        } else {
            document.exitFullscreen()
            setIsFullscreen(false)
        }
    }

    const toggleMute = () => {
        setIsMuted(!isMuted)
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
                router.push(`/interviews/results?id=${interviewId}&terminated=true`)
            }, 5000)
        }
    }

    const handleEndInterview = () => {
        setShowEndDialog(true)
    }

    const confirmEndInterview = () => {
        handleDisconnect();
        // router.push(`/interviews/results?id=${interview.id}`)
    }

    const toggleMobileChat = () => {
        setShowMobileChat(true)
        setShowMobileCode(false)
    }

    const toggleMobileCode = () => {
        setShowMobileChat(false)
        setShowMobileCode(true)
    }

    const handleGenerateFeedback = async (messages: SavedMessage[]) => {
        const result = await createFeedback({
            interviewId: interviewId!,
            userId: userId!,
            transcript: messages,
        });

        if (result && result.success && result.feedbackId) {
            router.push(`/interview/${interviewId}/feedback`);
        } else {
            console.error("Error generating feedback");
            router.push("/");
        }
    };

    useEffect(() => {
        if (callStatus === CallStatus.FINISHED) {
            if (type === "generate") {
                router.push("/");
            } else {
                handleGenerateFeedback(messages);
            }
        }
    }, [messages, callStatus, type, userId]);

    const handleCall = async () => {
        setCallStatus(CallStatus.CONNECTING);

        if (type === "generate") {
            await vapi.start(process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!, {
                variableValues: {
                    username: userName,
                    userid: userId,
                },
                clientMessages: [],
                serverMessages: [],
            });
        } else {
            let formattedQuestions = "";
            if (questions) {
                formattedQuestions = questions
                    .map((question) => `- ${question}`)
                    .join("\n");
            }

            await vapi.start(interviewer, {
                variableValues: {
                    questions: formattedQuestions,
                },
                clientMessages: [],
                serverMessages: [],
            });
        }
    };

    const handleDisconnect = async () => {
        setCallStatus(CallStatus.FINISHED);

        vapi.stop();
    };

    const latestMessage = messages[messages.length - 1]?.content;
    const isCallInactiveOrFinished =
        callStatus === CallStatus.INACTIVE || callStatus === CallStatus.FINISHED;

    return (
        <div
            ref={containerRef}
            className="max-w-full mx-auto h-[calc(100vh-80px)] flex flex-col bg-gradient-to-b from-background to-background/80"
        >
            {/* Header with controls */}
            <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-3">
                    <Badge variant={isRecording ? "destructive" : "outline"} className="animate-pulse">
                        {isRecording ? "Recording" : "Interview"} in Progress
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{formatTime(elapsedTime)}</span>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Progress value={(currentQuestion / totalQuestions) * 100} className="w-32 h-2 md:w-48" />
                    <span className="text-xs text-muted-foreground">
                        {currentQuestion}/{totalQuestions}
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" onClick={toggleFullscreen}>
                                    {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>{isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    <Button variant="destructive" size="sm" onClick={handleEndInterview} className="ml-2">
                        End Interview
                    </Button>

                    <Button variant="default" size="sm" onClick={handleCall} className="ml-2 bg-green-500">Start Interview</Button>
                </div>
            </div>

            {/* Main content area */}
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                {/* Mobile navigation tabs - only visible on small screens */}
                <div className="md:hidden flex border-b">
                    <Button
                        variant={showMobileChat ? "default" : "ghost"}
                        onClick={toggleMobileChat}
                        className="flex-1 rounded-none"
                    >
                        Chat
                    </Button>
                    {/* {(interview.type === "Coding" || interview.type === "Mix") && (
                        <Button
                            variant={showMobileCode ? "default" : "ghost"}
                            onClick={toggleMobileCode}
                            className="flex-1 rounded-none"
                        >
                            Code Editor
                        </Button>
                    )} */}
                </div>

                {/* Video and chat area */}
                <div
                    className={cn(
                        "flex-1 flex flex-col overflow-hidden w-full",
                        !showMobileChat && "hidden md:flex",
                    )}
                >
                    {/* Video area */}
                    <div className="h-[300px] md:h-full p-4 flex items-center justify-center relative bg-muted/30 backdrop-blur-sm">
                        {/* AI Avatar */}
                        <div className="relative">
                            <div
                                className={cn(
                                    "w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 relative z-10",
                                    aiSpeaking ? "border-primary animate-pulse" : "border-muted-foreground/20",
                                )}
                            >
                                <img
                                    src={getAILogo('apple')}
                                    alt="AI Assistant"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Speaking animation */}
                            {/* {aiSpeaking && (
                                <div className="absolute inset-0 z-0">
                                    <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping"></div>
                                    <div className="absolute inset-[-8px] rounded-full border border-primary/40"></div>
                                    <div className="absolute inset-[-16px] rounded-full border border-primary/20"></div>
                                </div>
                            )} */}

                            {/* Audio visualizer */}
                            <div className="absolute inset-0 flex items-center justify-center z-0">
                                {isSpeaking && <CircularAudioVisualizer isActive={true} className="w-60 h-60" />}
                            </div>



                        </div>

                        {/* User video */}
                        <div className="absolute bottom-4 right-4 w-32 h-24 md:w-48 md:h-36 rounded-lg overflow-hidden border border-muted shadow-lg">
                            {isCameraOn ? (
                                <video ref={videoRef} autoPlay muted className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full bg-muted flex items-center justify-center">
                                    <Camera className="h-8 w-8 text-muted-foreground/50" />
                                </div>
                            )}

                            {/* Camera controls */}
                            <div className="absolute bottom-2 right-2 flex gap-1">
                                <Button
                                    size="icon"
                                    variant="secondary"
                                    className="h-6 w-6 rounded-full bg-background/80 backdrop-blur-sm"
                                    onClick={toggleCamera}
                                >
                                    {isCameraOn ? <CameraOff className="h-3 w-3" /> : <Camera className="h-3 w-3" />}
                                </Button>

                                <Button
                                    size="icon"
                                    variant="secondary"
                                    className="h-6 w-6 rounded-full bg-background/80 backdrop-blur-sm"
                                    onClick={toggleMic}
                                >
                                    {isMicOn ? <MicOff className="h-3 w-3" /> : <Mic className="h-3 w-3" />}
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Chat area */}

                </div>

                {/* Code editor area - only shown for coding or mixed interviews */}
                {/* {(interview.type === "Coding" || interview.type === "Mix") && (
                    <div className={cn("md:flex-1 flex flex-col border-l overflow-hidden", !showMobileCode && "hidden md:flex")}>
                        <div className="p-4 border-b bg-muted/30 backdrop-blur-sm flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Code className="h-4 w-4" />
                                <h3 className="font-medium">Code Editor</h3>
                            </div>

                            <div className="flex items-center gap-2">
                                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                                    <SelectTrigger className="w-[180px] h-8">
                                        <SelectValue placeholder="Select Language" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="javascript">JavaScript</SelectItem>
                                        <SelectItem value="typescript">TypeScript</SelectItem>
                                        <SelectItem value="python">Python</SelectItem>
                                        <SelectItem value="java">Java</SelectItem>
                                        <SelectItem value="csharp">C#</SelectItem>
                                    </SelectContent>
                                </Select>

                                <Button variant="ghost" size="icon" onClick={() => setCode("")} disabled={!code.trim()}>
                                    <RefreshCw className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        <div className="flex-1 overflow-hidden">
                            <Textarea
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                placeholder="// Write your code here..."
                                className="h-full w-full resize-none font-mono p-4 bg-muted/10 border-0 rounded-none focus-visible:ring-0"
                                disabled={isInterviewComplete}
                            />
                        </div>
                    </div>
                )} */}

            </div>

            {messages?.length > 0 && (
                <div className="transcript-border mt-4 mb-4">
                    <div className="transcript">
                        <p
                            key={latestMessage}
                            className={cn(
                                "transition-opacity duration-500 opacity-0",
                                "animate-fadeIn opacity-100"
                            )}
                        >
                            {latestMessage}
                        </p>
                    </div>
                </div>
            )}

            {/* Device permission modal */}
            <Dialog open={showDeviceModal} onOpenChange={setShowDeviceModal}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Enable Camera and Microphone</DialogTitle>
                        <DialogDescription>
                            This interview requires access to your camera and microphone. Please enable them to continue.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid grid-cols-2 gap-4 py-4">
                        <div className="flex flex-col items-center gap-2 p-4 border rounded-lg">
                            <Camera className={cn("h-8 w-8", isCameraOn ? "text-green-500" : "text-destructive")} />
                            <p className="font-medium">Camera</p>
                            <Badge variant={isCameraOn ? "outline" : "destructive"}>{isCameraOn ? "Enabled" : "Disabled"}</Badge>
                            <Button variant={isCameraOn ? "outline" : "default"} size="sm" onClick={toggleCamera}>
                                {isCameraOn ? "Disable" : "Enable"}
                            </Button>
                        </div>

                        <div className="flex flex-col items-center gap-2 p-4 border rounded-lg">
                            <Mic className={cn("h-8 w-8", isMicOn ? "text-green-500" : "text-destructive")} />
                            <p className="font-medium">Microphone</p>
                            <Badge variant={isMicOn ? "outline" : "destructive"}>{isMicOn ? "Enabled" : "Disabled"}</Badge>
                            <Button variant={isMicOn ? "outline" : "default"} size="sm" onClick={toggleMic}>
                                {isMicOn ? "Disable" : "Enable"}
                            </Button>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button onClick={() => setShowDeviceModal(false)} disabled={!isCameraOn || !isMicOn}>
                            Start Interview
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Warning alert */}
            <AnimatePresence>
                {showWarning && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50"
                    >
                        <Alert variant="destructive" className="w-[400px]">
                            <AlertTriangle className="h-4 w-4" />
                            <div className="ml-2">
                                <p className="font-medium">Warning!</p>
                                <p className="text-sm">
                                    Switching tabs or applications during the interview is not allowed. This is your{" "}
                                    {warningCount === 0 ? "first" : "final"} warning.
                                </p>
                            </div>
                        </Alert>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* End interview confirmation dialog */}
            <Dialog open={showEndDialog} onOpenChange={setShowEndDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>End Interview</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to end this interview? Your progress will be saved.
                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowEndDialog(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={confirmEndInterview}>
                            End Interview
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
