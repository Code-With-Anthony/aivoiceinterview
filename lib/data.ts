import type { Interview } from "@/types/profile"

export function getBrandLogo(domain: string, theme?: string) {
    if (!theme) theme = "light";
    const clientId = process.env.NEXT_PUBLIC_BRANDFETCH_CLIENT_ID!;
    return `https://cdn.brandfetch.io/${domain}/${theme}/w/200/h/200?c=${clientId}`;
}


// Mock data for demonstration purposes
const interviews: Interview[] = [
    {
        id: "1",
        companyName: "Apple",
        companyLogo: "apple.com",
        name: "MERN Stack Developer",
        type: "Technical",
        coding: true,
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
        companyName: "Google",
        companyLogo: "google.com",
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
        companyName: "Microsoft",
        companyLogo: "microsoft.com",
        name: "Backend Engineer",
        type: "Technical",
        coding: true,
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
        companyName: "Tesla",
        companyLogo: "tesla.com",
        name: "DevOps Engineer",
        type: "Technical",
        coding: true,
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
        companyName: "TikTok",
        companyLogo: "tiktok.com",
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
        companyName: "Bloomberg",
        companyLogo: "bloomberg.com",
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
        companyName: "Figma.com",
        companyLogo: "figma.com",
        name: "Full Stack JavaScript",
        type: "Technical",
        coding: true,
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
        companyName: "Dribbble",
        companyLogo: "dribbble.com",
        name: "Data Scientist",
        type: "Technical",
        coding: true,
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
        companyName: "Linear",
        companyLogo: "linear.app",
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
