import { Interview } from '@/types/profile'
import { CalendarDays, Clock, FileText, Star, Trophy, Users } from 'lucide-react'
import React from 'react'

const InterviewStatsBar = ({ interview }: { interview: Interview }) => {
    return (
        <div className="border-b shadow-sm">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 divide-x">
                    <div className="flex flex-col items-center justify-center py-4 px-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                            <Clock className="h-4 w-4" />
                            <span>Duration</span>
                        </div>
                        <p className="font-semibold">30-45 minutes</p>
                    </div>
                    <div className="flex flex-col items-center justify-center py-4 px-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                            <CalendarDays className="h-4 w-4" />
                            <span>Availability</span>
                        </div>
                        <p className="font-semibold">Always available</p>
                    </div>
                    <div className="flex flex-col items-center justify-center py-4 px-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                            <FileText className="h-4 w-4" />
                            <span>Questions</span>
                        </div>
                        <p className="font-semibold">10-15 questions</p>
                    </div>
                    {interview?.score !== null ? (
                        <div className="flex flex-col items-center justify-center py-4 px-2">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                                <Trophy className="h-4 w-4" />
                                <span>Your Score</span>
                            </div>
                            <p className="font-semibold flex items-center gap-1">
                                <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                                {interview?.score}/100
                            </p>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-4 px-2">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                                <Users className="h-4 w-4" />
                                <span>Participants</span>
                            </div>
                            <p className="font-semibold">1,234 candidates</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default InterviewStatsBar