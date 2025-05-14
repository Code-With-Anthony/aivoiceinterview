import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SAMPLE_QUESTIONS } from '@/constants'
import { Globe } from 'lucide-react'
import React from 'react'

const SampleQuestions = () => {
    return (
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-xl flex items-center gap-2">
                    <Globe className="h-5 w-5 text-primary" />
                    {SAMPLE_QUESTIONS}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="p-4 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="flex items-center justify-center h-6 w-6 rounded-full bg-primary/20 text-primary text-xs font-medium">
                                1
                            </div>
                            <h3 className="font-medium">Explain the concept of state management in React</h3>
                        </div>
                        <p className="text-sm text-muted-foreground pl-8">
                            This question tests your understanding of React&apos;s core principles and how data flows through a
                            React application.
                        </p>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="flex items-center justify-center h-6 w-6 rounded-full bg-primary/20 text-primary text-xs font-medium">
                                2
                            </div>
                            <h3 className="font-medium">How would you optimize the performance of a web application?</h3>
                        </div>
                        <p className="text-sm text-muted-foreground pl-8">
                            This question evaluates your knowledge of performance optimization techniques and best
                            practices.
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default SampleQuestions