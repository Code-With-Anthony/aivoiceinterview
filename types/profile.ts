export interface UserProfile {
    id?: string
    name?: string
    bio?: string
    email?: string
    role?: string
    personalDetails?: PersonalDetails
    professionalDetails?: ProfessionalDetails
    experience?: Experience[]
    skills?: string[]
    trainings?: string[]
    certifications?: Certification[]
    projects?: Project[]
    socialMedia?: SocialMedia
}

export interface PersonalDetails {
    age?: string
    gender?: string
    address?: {
        street?: string
        city?: string
        state?: string
        pin?: string
    }
    image?: string
    hobbies?: string[]
}

export interface ProfessionalDetails {
    totalExperience?: string
    currentRole?: CurrentRole[]
    education?: Education[]
}

export interface CurrentRole {
    designation?: string
    companyName?: string
    fromYear?: string
    toYear?: string
}

export interface Education {
    institution?: string
    degree?: string
    fieldOfStudy?: string
    fromYear?: string
    toYear?: string
}

export interface Experience {
    company?: string
    position?: string
    fromYear?: string
    toYear?: string
}

export interface Certification {
    name?: string
    date?: string
    url?: string
}

export interface Project {
    name?: string
    description?: string
    url?: string
}

export interface SocialMedia {
    linkedin?: string
    dribbble?: string
    hackerRank?: string
    codeForces?: string
    hackerEarth?: string
    github?: string
    stackoverflow?: string
}

export interface Interview {
    id: string
    companyName: string
    companyLogo?: string
    name: string
    type: string
    level: string
    score: number | null
    date: {
        type: "permanent" | "future" | "limited"
        value: string
    }
    description: string
    techStack: string[]
    completed: boolean
}