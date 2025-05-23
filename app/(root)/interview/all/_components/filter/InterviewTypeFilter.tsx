import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import React from 'react'

const InterviewTypeFilter: React.FC<InterviewGeneralFilterProps> = ({ addFilter, filters }) => {
    return (
        <div className="space-y-2 flex-1">
            <Label htmlFor="type">Type</Label>
            <Select
                value={filters?.type[0] || ''}
                onValueChange={(value) => addFilter('type', value)}
            >
                <SelectTrigger id="typr" className="w-full">
                    <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="voice">Voice</SelectItem>
                    <SelectItem value="coding">Coding</SelectItem>
                    <SelectItem value="mix">Mix</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}

export default InterviewTypeFilter