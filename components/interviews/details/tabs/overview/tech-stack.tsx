import { Interview } from '@/types/profile'
import { Cpu } from 'lucide-react'
import React from 'react'
import TechStackPreview from '@/components/interviews/creation/text-stack-preview'
import { TECH_STACK } from '@/constants'
const TechStack = ({ interview }: { interview: Interview }) => {
    return (
        <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Cpu className="h-5 w-5 text-primary" />
                {TECH_STACK}
            </h2>
            <TechStackPreview techStack={interview.techStack} />
        </div>
    )
}

export default TechStack