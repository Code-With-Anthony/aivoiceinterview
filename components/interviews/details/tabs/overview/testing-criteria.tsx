import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TESTING_CRITERIA } from '@/constants'
import { CheckCircle2, GraduationCap } from 'lucide-react'
import React from 'react'

const TestingCriteria = () => {
    return (
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-xl flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-primary" />
                    {TESTING_CRITERIA}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                        <div className="bg-primary/10 p-2 rounded-full mt-1">
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                            <h3 className="font-medium">Core Concepts</h3>
                            <p className="text-sm text-muted-foreground">
                                Understanding of fundamental principles and theories
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="bg-primary/10 p-2 rounded-full mt-1">
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                            <h3 className="font-medium">Problem Solving</h3>
                            <p className="text-sm text-muted-foreground">Ability to analyze and solve complex problems</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="bg-primary/10 p-2 rounded-full mt-1">
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                            <h3 className="font-medium">Communication</h3>
                            <p className="text-sm text-muted-foreground">
                                Clear expression and explanation of technical concepts
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="bg-primary/10 p-2 rounded-full mt-1">
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                            <h3 className="font-medium">Practical Application</h3>
                            <p className="text-sm text-muted-foreground">Applying knowledge to real-world scenarios</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default TestingCriteria