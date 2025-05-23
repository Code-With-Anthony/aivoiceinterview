import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import React from 'react'

const DifficultyLevelFilter: React.FC<InterviewGeneralFilterProps> = ({ addFilter, filters }) => {
    return (
        <div className="space-y-2 flex-1">
            <Label htmlFor="level">Difficulty Level</Label>
            <Select value={filters?.level[0] || ""} onValueChange={(val) => addFilter("level", val)}>
                <SelectTrigger id="level" className="w-full">
                    <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}

export default DifficultyLevelFilter