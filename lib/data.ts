import type { Interview } from "@/types/profile"

// Mock data for demonstration purposes
const interviews: Interview[] = [
    {
        id: "1",
        companyName: "TechCorp",
        companyLogo: "/placeholder.svg?height=40&width=40&text=TC",
        name: "MERN Stack Developer",
        type: "Technical",
        level: "Medium",
        score: null,
        date: {
            type: "permanent",
            value: "Always available",
        },
        description:
            "This interview assesses your proficiency with the MERN stack (MongoDB, Express.js, React, Node.js) and your ability to build full-stack web applications.",
        techStack: ["MongoDB", "Express.js", "React", "Node.js"],
        completed: false,
    },
    {
        id: "2",
        companyName: "InnovateSoft",
        companyLogo: "/placeholder.svg?height=40&width=40&text=IS",
        name: "Frontend Developer",
        type: "Mixed",
        level: "Easy",
        score: 85,
        date: {
            type: "limited",
            value: "3",
        },
        description:
            "A comprehensive assessment of your frontend development skills, focusing on JavaScript, React, and modern CSS frameworks.",
        techStack: ["JavaScript", "React", "CSS", "HTML"],
        completed: true,
    },
    {
        id: "3",
        companyName: "DataDynamics",
        companyLogo: "/placeholder.svg?height=40&width=40&text=DD",
        name: "Backend Engineer",
        type: "Technical",
        level: "Hard",
        score: null,
        date: {
            type: "future",
            value: "May 15, 2025",
        },
        description:
            "This interview evaluates your backend development expertise, system design skills, and knowledge of databases and API development.",
        techStack: ["Node.js", "Python", "SQL", "NoSQL", "System Design"],
        completed: false,
    },
    {
        id: "4",
        companyName: "CloudNative",
        companyLogo: "/placeholder.svg?height=40&width=40&text=CN",
        name: "DevOps Engineer",
        type: "Technical",
        level: "Medium",
        score: null,
        date: {
            type: "permanent",
            value: "Always available",
        },
        description:
            "An assessment of your DevOps skills, including CI/CD pipelines, containerization, cloud platforms, and infrastructure as code.",
        techStack: ["Docker", "Kubernetes", "AWS", "CI/CD", "Terraform"],
        completed: false,
    },
    {
        id: "5",
        companyName: "AgileTeam",
        companyLogo: "/placeholder.svg?height=40&width=40&text=AT",
        name: "Project Manager",
        type: "Behavioral",
        level: "Medium",
        score: 92,
        date: {
            type: "permanent",
            value: "Always available",
        },
        description:
            "This interview assesses your project management skills, including team leadership, agile methodologies, and stakeholder management.",
        techStack: ["Agile", "Scrum", "Project Management", "Leadership"],
        completed: true,
    },
    {
        id: "6",
        companyName: "TalentHub",
        companyLogo: "/placeholder.svg?height=40&width=40&text=TH",
        name: "HR Specialist",
        type: "Behavioral",
        level: "Easy",
        score: null,
        date: {
            type: "limited",
            value: "7",
        },
        description:
            "An evaluation of your HR skills, including recruitment, employee relations, and knowledge of HR policies and best practices.",
        techStack: ["HR", "Recruitment", "Employee Relations"],
        completed: false,
    },
    {
        id: "7",
        companyName: "CodeMasters",
        companyLogo: "/placeholder.svg?height=40&width=40&text=CM",
        name: "Full Stack JavaScript",
        type: "Technical",
        level: "Medium",
        score: 78,
        date: {
            type: "permanent",
            value: "Always available",
        },
        description:
            "A comprehensive assessment of your full-stack JavaScript skills, including modern frameworks and libraries.",
        techStack: ["JavaScript", "TypeScript", "React", "Node.js", "Express.js"],
        completed: true,
    },
    {
        id: "8",
        companyName: "DataInsights",
        companyLogo: "/placeholder.svg?height=40&width=40&text=DI",
        name: "Data Scientist",
        type: "Technical",
        level: "Hard",
        score: null,
        date: {
            type: "future",
            value: "June 1, 2025",
        },
        description:
            "This interview evaluates your data science skills, including statistical analysis, machine learning, and data visualization.",
        techStack: ["Python", "Machine Learning", "Statistics", "Data Visualization"],
        completed: false,
    },
    {
        id: "9",
        companyName: "SalesPro",
        companyLogo: "/placeholder.svg?height=40&width=40&text=SP",
        name: "Sales Representative",
        type: "Behavioral",
        level: "Medium",
        score: null,
        date: {
            type: "permanent",
            value: "Always available",
        },
        description:
            "An assessment of your sales skills, including customer relationship management, negotiation, and closing techniques.",
        techStack: ["Sales", "Negotiation", "CRM", "Communication"],
        completed: false,
    },
]

// Simulated data fetching functions
export async function getInterviews(): Promise<Interview[]> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))
    return interviews
}

export async function getInterviewById(id: string): Promise<Interview | undefined> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300))
    return interviews.find((interview) => interview.id === id)
}

export async function getSimilarInterviews(currentId: string, techStack: string[]): Promise<Interview[]> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 700))

    // Find interviews with similar tech stack, excluding the current one
    return interviews
        .filter((interview) => interview.id !== currentId && interview.techStack.some((tech) => techStack.includes(tech)))
        .slice(0, 3)
}
