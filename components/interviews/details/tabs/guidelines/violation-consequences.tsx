import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { VIOLATION_CONSEQUENCES } from '@/constants'
import { AlertTriangle } from 'lucide-react'
import React from 'react'

const ViolationConsequences = () => {
    return (
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-xl flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-amber-500" />
                    {VIOLATION_CONSEQUENCES}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <p className="text-sm text-amber-800">
                        Violations of these guidelines may result in immediate termination of the interview and
                        potential disqualification. The AI system automatically flags suspicious behavior.
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}

export default ViolationConsequences