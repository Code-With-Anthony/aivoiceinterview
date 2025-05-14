import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TECHNICAL_REQUIREMENTS } from '@/constants'
import { Mic, Monitor, Video } from 'lucide-react'
import React from 'react'

const TechnicalRequirements = () => {
    return (
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-xl">{TECHNICAL_REQUIREMENTS}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="flex items-start gap-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                            <Video className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <h3 className="font-medium">Keep Your Camera On</h3>
                            <p className="text-sm text-muted-foreground">
                                Your camera must remain on throughout the entire interview. Make sure you&apos;re in a well-lit
                                environment with a neutral background.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                            <Mic className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <h3 className="font-medium">Keep Your Microphone On</h3>
                            <p className="text-sm text-muted-foreground">
                                Your microphone must remain on during the interview. Find a quiet place to avoid background
                                noise. Voice detection is active throughout the session.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                            <Monitor className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <h3 className="font-medium">Screen Monitoring</h3>
                            <p className="text-sm text-muted-foreground">
                                Your screen is monitored during the interview. Do not switch tabs or applications. Avoid
                                copy-pasting content from external sources.
                            </p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default TechnicalRequirements