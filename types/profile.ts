export interface UserProfile {
    id?: string
    name?: string
    bio?: string
    email?: string
    role?: string
    authProvider?: string;
    personalDetails?: PersonalDetails
    professionalDetails?: ProfessionalDetails
    experience?: Experience[]
    skills?: string[]
    trainings?: string[]
    certifications?: Certification[]
    projects?: Project[]
    socialMedia?: SocialMedia
    jobsApplied?: []
    completedInterview: []
}

export interface PersonalDetails {
    age?: string | null
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
    linkedIn?: string
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
    coding?: boolean
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

export interface TechStack {
    frontend?: string[];
    backend?: string[];
    database?: string[];
    devops?: string[];
    other?: string[];
}

export interface Review {
    id: string;
    author: string;
    avatar?: string;
    position: string;
    date: string;
    title: string;
    content: string;
    pros?: string;
    cons?: string;
    ratings: {
        workLifeBalance: number;
        culture: number;
        careerGrowth: number;
        diversity: number;
    };
}

export interface Company {
    id?: string
    name: string
    role: string
    authProvider: string
    email: string
    isTechCompany: boolean
    logo: string
    coverImage?: string
    industry: string
    headquarters: string
    size: string
    foundedYear: string
    website: string
    description: string
    mission: string
    values?: string[]
    products?: {
        name: string
        description: string
    }[]
    techStack?: TechStack
    reviews?: Review[]
    social?: {
        linkedin?: string
        twitter?: string
        github?: string
        glassdoor?: string | null;
    }
    verified?: boolean
}

export interface Job {
    id: string
    companyId: string
    companyName: string
    companyLogo?: string
    title: string
    type: string
    level: string
    location: string
    isRemote: boolean
    salary?: string
    postedDate: string
    description: string
    requirements?: string[]
    skills?: string[]
    relatedInterviewId: string
    relatedInterviewTitle: string
    applyUrl: string
}

export interface Admin {
    name: string
    email: string
    role: string
    authProvider?: string;
    adminDetails?: AdminDetails
}

export interface AdminDetails {
    permissions: string[]; // e.g., ["manageUsers", "moderateContent", "viewReports"]
    createdAt: string;     // ISO date
    lastActiveAt?: string; // optional - ISO date
    activityLogs?: AdminActivityLog[]; // optional
    assignedSections?: string[]; // e.g., ["interviews", "jobs", "feedback"]
    isSuperAdmin?: boolean; // special privileges
    contactEmail?: string;
    notificationsEnabled?: boolean;
}

export interface AdminActivityLog {
    action: string;         // e.g., "deleted job", "banned user"
    targetId?: string;      // optional (e.g., ID of job/user affected)
    timestamp: string;      // ISO format
    description?: string;   // optional human-readable info
}