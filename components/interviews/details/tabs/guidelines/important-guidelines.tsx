import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { IMPORTANT_GUIDELINES } from '@/constants'
import { Info } from 'lucide-react'
import React from 'react'

const ImportantGuideLines = () => {
    return (
        <Alert className="bg-blue-50 border-blue-200">
            <Info className="h-4 w-4 !text-blue-600" />
            <AlertTitle className="text-blue-800">{IMPORTANT_GUIDELINES}</AlertTitle>
            <AlertDescription className="text-blue-700">
                Please read and follow these guidelines carefully before starting the interview.
            </AlertDescription>
        </Alert>

    )
}

export default ImportantGuideLines