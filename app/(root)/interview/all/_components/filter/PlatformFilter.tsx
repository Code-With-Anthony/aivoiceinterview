import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import React from 'react'

const PlatformFilter: React.FC<InterviewGeneralFilterProps> = ({ addFilter }) => {
    return (
        <div className="space-y-2 flex-1">
            <Label htmlFor="status">Platform</Label>
            <Select onValueChange={(value) => addFilter('status', value)}>
                <SelectTrigger id="status" className="w-full">
                    <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="linkedin">LinkedIn</SelectItem>
                    <SelectItem value="naukri">Naukri</SelectItem>
                    <SelectItem value="indeed">Indeed</SelectItem>
                    <SelectItem value="monster">Monster</SelectItem>
                    <SelectItem value="glassdoor">Glassdoor</SelectItem>
                    <SelectItem value="anglelist">AngelList</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}

export default PlatformFilter