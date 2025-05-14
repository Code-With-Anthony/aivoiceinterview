import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { INTERVIEW_DETAILS } from '@/constants'
import { Interview } from '@/types/profile'
import { Separator } from '@radix-ui/react-select'
import { CheckCircle2, FileText, Globe, Layers, Mic, Monitor, Timer, Video } from 'lucide-react'
import React from 'react'

const InterviewDetails = ({ interview }: { interview: Interview }) => {
    return (
        <Card className="sticky top-6 border-t-4 border-t-primary shadow-md">
            <CardHeader className="pb-2">
                <CardTitle>{INTERVIEW_DETAILS}</CardTitle>
                <CardDescription>Key information about this interview</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                        <Timer className="h-5 w-5 text-primary" />
                        <div>
                            <h3 className="text-sm font-medium">Duration</h3>
                            <p className="text-sm">30-45 minutes</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                        <FileText className="h-5 w-5 text-primary" />
                        <div>
                            <h3 className="text-sm font-medium">Questions</h3>
                            <p className="text-sm">10-15 questions</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                        <Layers className="h-5 w-5 text-primary" />
                        <div>
                            <h3 className="text-sm font-medium">Format</h3>
                            <p className="text-sm">AI-powered voice</p>
                        </div>
                    </div>
                </div>

                <Separator />

                <div>
                    <h3 className="text-sm font-medium mb-2">Required Equipment</h3>
                    <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center gap-2 p-2 bg-muted/30 rounded-lg">
                            <Video className="h-4 w-4 text-primary" />
                            <span className="text-sm">Webcam</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 bg-muted/30 rounded-lg">
                            <Mic className="h-4 w-4 text-primary" />
                            <span className="text-sm">Microphone</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 bg-muted/30 rounded-lg">
                            <Globe className="h-4 w-4 text-primary" />
                            <span className="text-sm">Internet</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 bg-muted/30 rounded-lg">
                            <Monitor className="h-4 w-4 text-primary" />
                            <span className="text-sm">Computer</span>
                        </div>
                    </div>
                </div>

                <Separator />

                <div>
                    <h3 className="text-sm font-medium mb-2">Skills Assessed</h3>
                    <div className="flex flex-wrap gap-2">
                        {interview.techStack.map((tech) => (
                            <Badge key={tech} variant="outline" className="bg-muted/30">
                                {tech}
                            </Badge>
                        ))}
                        <Badge variant="outline" className="bg-muted/30">
                            Problem Solving
                        </Badge>
                        <Badge variant="outline" className="bg-muted/30">
                            Communication
                        </Badge>
                    </div>
                </div>

                <Separator />

                <div>
                    <h3 className="text-sm font-medium mb-2">Preparation Tips</h3>
                    <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                            <span className="text-sm">Review the tech stack requirements</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                            <span className="text-sm">Practice explaining technical concepts</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                            <span className="text-sm">Prepare examples of past work</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                            <span className="text-sm">Research the company</span>
                        </li>
                    </ul>
                </div>
            </CardContent>
        </Card>
    )
}

export default InterviewDetails