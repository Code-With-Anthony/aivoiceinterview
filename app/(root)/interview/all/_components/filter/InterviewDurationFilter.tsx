import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import React from 'react'

const InterviewDurationFilter = () => {
    return (
        <div className="space-y-2">
            <div className="flex justify-between">
                <Label>Duration (minutes)</Label>
            </div>
            <Slider
                defaultValue={[30, 120]}
                min={15}
                max={180}
                step={15}
                className="mt-4"
            />
            <span className="text-sm text-muted-foreground">30-120</span>
        </div>
    )
}

export default InterviewDurationFilter