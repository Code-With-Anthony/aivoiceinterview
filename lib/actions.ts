"use server"

import { db } from "@/firebase/admin"
import type { Interview, UserProfile } from "@/types/profile"

// Mock data for demonstration purposes
// In a real application, this would be fetched from a database
export async function getUserProfile(userId: string): Promise<UserProfile> {
    // Simulate a database fetch
    return {
        id: userId,
        name: "John Doe",
        bio: "Experienced software engineer with a passion for building innovative solutions. Specialized in web development and AI applications.",
        email: "john.doe@example.com",
        role: "Senior Software Engineer",
        personalDetails: {
            age: "32",
            gender: "Male",
            address: {
                street: "123 Tech Street",
                city: "San Francisco",
                state: "California",
                pin: "94105",
            },
            image: "/placeholder.svg?height=200&width=200",
            hobbies: ["Coding", "Reading", "Hiking", "Photography"],
        },
        professionalDetails: {
            totalExperience: "8",
            currentRole: [
                {
                    designation: "Senior Software Engineer",
                    companyName: "Tech Innovations Inc.",
                    fromYear: "2020",
                    toYear: "",
                },
            ],
            education: [
                {
                    institution: "Stanford University",
                    degree: "Master's",
                    fieldOfStudy: "Computer Science",
                    fromYear: "2012",
                    toYear: "2014",
                },
                {
                    institution: "MIT",
                    degree: "Bachelor's",
                    fieldOfStudy: "Computer Engineering",
                    fromYear: "2008",
                    toYear: "2012",
                },
            ],
        },
        experience: [
            {
                company: "Tech Innovations Inc.",
                position: "Senior Software Engineer",
                fromYear: "2020",
                toYear: "",
            },
            {
                company: "Digital Solutions LLC",
                position: "Software Engineer",
                fromYear: "2016",
                toYear: "2020",
            },
            {
                company: "WebTech Startup",
                position: "Junior Developer",
                fromYear: "2014",
                toYear: "2016",
            },
        ],
        skills: [
            "JavaScript",
            "TypeScript",
            "React",
            "Node.js",
            "Python",
            "AWS",
            "Docker",
            "GraphQL",
            "Next.js",
            "TensorFlow",
        ],
        trainings: [
            "Advanced React Patterns",
            "AWS Solutions Architect",
            "Machine Learning with TensorFlow",
            "Microservices Architecture",
        ],
        certifications: [
            {
                name: "AWS Certified Solutions Architect",
                date: "2022",
                url: "https://aws.amazon.com/certification/",
            },
            {
                name: "Google Professional Cloud Developer",
                date: "2021",
                url: "https://cloud.google.com/certification/cloud-developer",
            },
        ],
        projects: [
            {
                name: "AI Voice Interview System",
                description:
                    "Developed an AI-powered voice interview system that analyzes candidate responses and provides insights to recruiters.",
                url: "https://github.com/johndoe/ai-voice-interview",
            },
            {
                name: "E-commerce Platform",
                description: "Built a scalable e-commerce platform with real-time inventory management and payment processing.",
                url: "https://github.com/johndoe/ecommerce-platform",
            },
            {
                name: "Health Monitoring App",
                description:
                    "Created a mobile application for tracking health metrics and providing personalized recommendations.",
                url: "https://github.com/johndoe/health-monitor",
            },
        ],
        socialMedia: {
            linkedin: "https://linkedin.com/in/johndoe",
            github: "https://github.com/johndoe",
            stackoverflow: "https://stackoverflow.com/users/123456/johndoe",
            dribbble: "https://dribbble.com/johndoe",
            hackerRank: "https://hackerrank.com/johndoe",
            codeForces: "https://codeforces.com/profile/johndoe",
            hackerEarth: "https://hackerearth.com/@johndoe",
        },
    }
}

// In a real application, you would implement these functions to save data to a database
export async function updateUserProfile(userId: string, data: Partial<UserProfile>): Promise<UserProfile> {
    console.log("Updating user profile:", userId, data)
    // Simulate a database update
    return { ...(await getUserProfile(userId)), ...data }
}

export async function createUserProfile(data: UserProfile): Promise<UserProfile> {
    console.log("Creating user profile:", data)
    // Simulate a database create
    return { id: "new-user-id", ...data }
}

export async function deleteUserProfile(userId: string): Promise<boolean> {
    console.log("Deleting user profile:", userId)
    // Simulate a database delete
    return true
}

// Create a new interview
export async function createInterview(data: Interview): Promise<{ id: string }> {
    const docRef = await db.collection("interviews").add(data);
    console.log("Creating interview:", docRef.id, data)
    return { id: "interview-" + docRef.id }
}
