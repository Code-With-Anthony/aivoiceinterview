import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BEFORE_YOU_BEGIN } from '@/constants'
import { CheckCircle2 } from 'lucide-react'
import React from 'react'

const BeforeYouBegin = () => {
    return (
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-xl">{BEFORE_YOU_BEGIN}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                        <div className="bg-primary/10 p-2 rounded-full mt-1">
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                            <h3 className="font-medium">Test Equipment</h3>
                            <p className="text-sm text-muted-foreground">
                                Test your camera and microphone before starting
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="bg-primary/10 p-2 rounded-full mt-1">
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                            <h3 className="font-medium">Internet Connection</h3>
                            <p className="text-sm text-muted-foreground">Ensure you have a stable internet connection</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="bg-primary/10 p-2 rounded-full mt-1">
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                            <h3 className="font-medium">Close Applications</h3>
                            <p className="text-sm text-muted-foreground">
                                Close unnecessary applications and browser tabs
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="bg-primary/10 p-2 rounded-full mt-1">
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                            <h3 className="font-medium">Quiet Environment</h3>
                            <p className="text-sm text-muted-foreground">Find a quiet, distraction-free environment</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default BeforeYouBegin