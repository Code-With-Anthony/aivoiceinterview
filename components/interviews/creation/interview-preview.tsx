import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays, CheckCircle2, Clock, User, Users } from "lucide-react"
import Image from "next/image"

interface InterviewPreviewProps {
    formData: any
}

export default function InterviewPreview({ formData }: InterviewPreviewProps) {
    const {
        type,
        area,
        techStack,
        level,
        description,
        dateType,
        scheduledDate,
        duration,
        durationPeriod,
        category,
        status,
        durationLimit,
        numberOfQuestions,
    } = formData

    const getDifficultyColor = (level: string) => {
        switch (level) {
            case "Easy":
                return "bg-green-100 text-green-800 hover:bg-green-200"
            case "Medium":
                return "bg-amber-100 text-amber-800 hover:bg-amber-200"
            case "Hard":
                return "bg-red-100 text-red-800 hover:bg-red-200"
            default:
                return "bg-gray-100 text-gray-800 hover:bg-gray-200"
        }
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case "DRAFT":
                return "bg-gray-100 text-gray-800"
            case "PUBLISHED":
                return "bg-green-100 text-green-800"
            default:
                return "bg-gray-100 text-gray-800"
        }
    }

    const getDateDisplay = () => {
        if (dateType === "Current") {
            return "Available immediately"
        } else if (dateType === "Future" && scheduledDate) {
            return `Available from ${scheduledDate.toLocaleDateString()}`
        }
        return "Date not specified"
    }

    const getDurationDisplay = () => {
        if (duration === "Permanent") {
            return "Always available"
        } else if (duration === "Limited" && durationPeriod) {
            return `Available for ${durationPeriod} days`
        }
        return "Duration not specified"
    }

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">Interview Preview</h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle className="text-2xl">
                                        {type} Interview
                                        {area && ` - ${area}`}
                                        {type === "Coding" && techStack && techStack.length > 0 && ` - ${techStack.join(", ")}`}
                                    </CardTitle>
                                    <CardDescription>
                                        {category} • {numberOfQuestions} questions • {durationLimit} minutes
                                    </CardDescription>
                                </div>
                                <Badge className={getStatusColor(status)}>{status}</Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                <div className="flex items-center gap-2">
                                    <Badge className={getDifficultyColor(level)}>{level}</Badge>
                                    {type === "Coding" && techStack && techStack.length > 0 && (
                                        <div className="flex flex-wrap gap-1">
                                            {techStack.map((tech: string) => (
                                                <Badge key={tech} variant="outline">
                                                    {tech}
                                                </Badge>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <h3 className="font-medium mb-2 text-lg">Description</h3>
                                    <p className="text-muted-foreground text-sm">{description || "No description provided"}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex items-center gap-2">
                                        <CalendarDays className="h-4 w-4 text-muted-foreground" />
                                        <span>{getDateDisplay()}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-muted-foreground" />
                                        <span>{getDurationDisplay()}</span>
                                    </div>
                                </div>

                                {formData.questions && formData.questions.length > 0 && (
                                    <div>
                                        <h3 className="font-medium mb-2 text-lg">Sample Questions</h3>
                                        <ul className="list-disc pl-5 space-y-1">
                                            {formData.questions.slice(0, 3).map((q: any, i: number) => (
                                                <li key={i}>{q.question || "Question not specified"}</li>
                                            ))}
                                            {formData.questions.length > 3 && (
                                                <li className="text-muted-foreground">+{formData.questions.length - 3} more questions</li>
                                            )}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl">Interview Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-start gap-3">
                                <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                                <div>
                                    <h3 className="font-semibold text-lg">Created by You</h3>
                                    <p className="text-sm text-muted-foreground">Just now</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
                                <div>
                                    <h3 className="font-medium text-lg">Invited Candidates</h3>
                                    <p className="text-sm text-muted-foreground">{formData.invitedCandidates?.length || 0} candidates</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <CheckCircle2 className="h-5 w-5 text-muted-foreground mt-0.5" />
                                <div>
                                    <h3 className="font-medium text-lg">Completion Rate</h3>
                                    <p className="text-sm text-muted-foreground">No data yet</p>
                                </div>
                            </div>

                            <div className="relative h-32 w-full rounded-md overflow-hidden mt-4">
                                <Image
                                    src="/placeholder.svg?height=128&width=256"
                                    alt="Interview Preview"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
