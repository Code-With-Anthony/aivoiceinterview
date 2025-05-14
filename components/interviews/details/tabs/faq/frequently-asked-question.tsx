import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FAQ } from '@/constants'
import { Separator } from '@radix-ui/react-select'
import { HelpCircle } from 'lucide-react'
import React from 'react'

const FrequentlyAskedQuestion = () => {
    return (
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-xl">{FAQ}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    <div className="space-y-2">
                        <div className="flex items-start gap-3">
                            <div className="bg-primary/10 p-2 rounded-full mt-1">
                                <HelpCircle className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-medium">How does the AI voice interview work?</h3>
                                <p className="text-sm text-muted-foreground mt-1">
                                    Our AI-powered system asks questions through text and audio, analyzes your verbal
                                    responses, facial expressions, and tone of voice to provide a comprehensive assessment of
                                    your skills and fit for the role.
                                </p>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                        <div className="flex items-start gap-3">
                            <div className="bg-primary/10 p-2 rounded-full mt-1">
                                <HelpCircle className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-medium">Can I pause the interview and resume later?</h3>
                                <p className="text-sm text-muted-foreground mt-1">
                                    No, once started, the interview must be completed in one session. Make sure you have
                                    allocated sufficient time before beginning.
                                </p>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                        <div className="flex items-start gap-3">
                            <div className="bg-primary/10 p-2 rounded-full mt-1">
                                <HelpCircle className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-medium">How are my responses evaluated?</h3>
                                <p className="text-sm text-muted-foreground mt-1">
                                    Your responses are evaluated based on content accuracy, clarity of communication,
                                    problem-solving approach, and overall presentation. The AI system analyzes both what you
                                    say and how you say it to provide a comprehensive assessment.
                                </p>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                        <div className="flex items-start gap-3">
                            <div className="bg-primary/10 p-2 rounded-full mt-1">
                                <HelpCircle className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-medium">Will I receive feedback after the interview?</h3>
                                <p className="text-sm text-muted-foreground mt-1">
                                    Yes, you&apos;ll receive a detailed report with scores and feedback on different aspects of
                                    your performance, including technical knowledge, communication skills, and areas for
                                    improvement.
                                </p>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                        <div className="flex items-start gap-3">
                            <div className="bg-primary/10 p-2 rounded-full mt-1">
                                <HelpCircle className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-medium">What if I experience technical difficulties?</h3>
                                <p className="text-sm text-muted-foreground mt-1">
                                    If you experience technical issues during the interview, the system will attempt to
                                    reconnect. If problems persist, you can contact our support team for assistance and
                                    possibly reschedule the interview.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default FrequentlyAskedQuestion