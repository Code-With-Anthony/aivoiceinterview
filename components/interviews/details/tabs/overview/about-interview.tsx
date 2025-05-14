import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ABOUT_THIS_INTERVIEW } from '@/constants'
import { Interview } from '@/types/profile'
import React from 'react'

const AboutInterview = ({ interview }: { interview: Interview }) => {
    return (
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-xl">{ABOUT_THIS_INTERVIEW}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground leading-relaxed">{interview.description}</p>
            </CardContent>
        </Card>
    )
}

export default AboutInterview