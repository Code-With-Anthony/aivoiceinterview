import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TOP_SCORING_CANDIDATES } from '@/constants'
import { Star, Trophy } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const TopCandidates = () => {
    return (
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-none shadow-md">
            <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-primary" />
                    {TOP_SCORING_CANDIDATES}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="relative h-10 w-10 overflow-hidden rounded-full bg-muted">
                                <Image
                                    src="/placeholder.svg?height=40&width=40"
                                    alt="User avatar"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <p className="font-medium">Alex Johnson</p>
                                <p className="text-xs text-muted-foreground">2 days ago</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
                            <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                            98
                        </div>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="relative h-10 w-10 overflow-hidden rounded-full bg-muted">
                                <Image
                                    src="/placeholder.svg?height=40&width=40"
                                    alt="User avatar"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <p className="font-medium">Sarah Miller</p>
                                <p className="text-xs text-muted-foreground">1 week ago</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
                            <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                            95
                        </div>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="relative h-10 w-10 overflow-hidden rounded-full bg-muted">
                                <Image
                                    src="/placeholder.svg?height=40&width=40"
                                    alt="User avatar"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <p className="font-medium">David Chen</p>
                                <p className="text-xs text-muted-foreground">2 weeks ago</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
                            <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                            92
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default TopCandidates