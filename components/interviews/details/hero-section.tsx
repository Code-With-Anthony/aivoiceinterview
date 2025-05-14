import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { BACK_TO_ALL_INTERVIEWS } from '@/constants'
import { getBrandLogo } from '@/lib/data'
import { cn, getDifficultyGradient, getInterviewTypeIcon } from '@/lib/utils'
import { Interview } from '@/types/profile'
import { ArrowLeft, CheckCircle2, Play, Share2 } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const HeroSection = ({ interview }: { interview: Interview }) => {
    const Icon = getInterviewTypeIcon(interview?.type);
    return (
        <div className={cn("relative w-full bg-gradient-to-r py-12 text-white", getDifficultyGradient(interview?.level))}>
            <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]"></div>
            <div className="container relative mx-auto px-4">
                <Link
                    href="/interview/all"
                    className="inline-flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-sm backdrop-blur-md transition-colors hover:bg-white/30 mb-6"
                >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    {BACK_TO_ALL_INTERVIEWS}
                </Link>

                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="flex items-center gap-5">
                        <div className="relative h-20 w-20 overflow-hidden rounded-xl border-4 border-white/20 bg-white shadow-lg">
                            <img
                                src={getBrandLogo(interview?.companyLogo) || "/placeholder.svg?height=80&width=80"}
                                alt={interview?.companyName}
                                // fill
                                className="object-cover"
                            />
                        </div>
                        <div>
                            <div className="flex flex-wrap items-center gap-3 mb-1">
                                <h1 className="md:text-3xl font-bold sm:text-2xl">{interview?.name}</h1>
                                <Badge className="bg-white/20 text-white hover:bg-white/30 backdrop-blur-md">{interview?.level}</Badge>
                            </div>
                            <div className="flex items-center gap-2 text-white/80">
                                <span className="font-medium">{interview?.companyName}</span>
                                <span className="text-white/60">•</span>
                                <span className="flex items-center gap-1">
                                    <Icon className="h-5 w-5" />
                                    <span>{interview?.type} Interview</span>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <Button
                            size="lg"
                            className="gap-2"
                            variant={interview?.completed ? "secondary" : "default"}
                        >
                            {interview?.completed ? (
                                <>
                                    <CheckCircle2 className="h-4 w-4" />
                                    View Results
                                </>
                            ) : (
                                <>
                                    <Play className="h-4 w-4" />
                                    Take Interview
                                </>
                            )}
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="gap-2 bg-white/10 text-white border-white/20 hover:bg-white/20 hover:border-white/30"
                        >
                            <Share2 className="h-4 w-4" />
                            Share
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroSection