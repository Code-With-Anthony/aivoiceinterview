import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import React from 'react'

const InterviewStatusFilter: React.FC<InterviewGeneralFilterProps> = ({ addFilter, activeStatus }) => {
    return (
        <div className="space-y-2 flex-1">
            <Label htmlFor="status">Status</Label>
            <Select
                value={activeStatus || ''}
                onValueChange={(val) => addFilter('status', val)}
            >
                <SelectTrigger id="status" className="w-full">
                    <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="limited">Limited Time</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}

export default InterviewStatusFilter