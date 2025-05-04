"use server"

import type { Interview } from "@/types/profile"

interface DashboardData {
  user: {
    id: string
    name: string
    lastActive: string
    skills: string[]
    profile: {
      items: Array<{
        name: string
        completed: boolean
      }>
    }
  }
  stats: {
    upcomingInterviews: number
    completedInterviews: number
    jobsApplied: number
    averageScore: number | null
  }
  nextInterview:
    | (Interview & {
        scheduledFor: string
        timeUntil: string
      })
    | null
  recommendedPractice: {
    technical: Interview[]
    behavioral: Interview[]
  }
  recentResults: Array<{
    id: string
    interviewId: string
    interviewName: string
    companyName: string
    date: string
    score: number
    feedback: {
      strengths: string[]
      improvements: string[]
    }
  }>
  similarInterviews: Interview[]
  notifications: Array<{
    id: string
    type: "reminder" | "update" | "message" | "achievement"
    title: string
    description: string
    date: string
    read: boolean
    action?: {
      text: string
      url: string
    }
  }>
  resources: Array<{
    id: string
    title: string
    description: string
    category: string
    url: string
    isExternal: boolean
  }>
  profileCompletionPercentage: number
}

// Mock data for demonstration purposes
export async function getUserDashboardData(userId: string): Promise<DashboardData> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  return {
    user: {
      id: userId,
      name: "Anthony",
      lastActive: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
      skills: ["JavaScript", "React", "Node.js", "TypeScript", "MongoDB"],
      profile: {
        items: [
          { name: "Resume uploaded", completed: true },
          { name: "Skills added", completed: true },
          { name: "Portfolio link", completed: false },
          { name: "Cover letter", completed: false },
          { name: "Work experience", completed: true },
          { name: "Education details", completed: true },
        ],
      },
    },
    stats: {
      upcomingInterviews: 2,
      completedInterviews: 5,
      jobsApplied: 3,
      averageScore: 85,
    },
    nextInterview: {
      id: "1",
      companyName: "TechCorp",
      companyLogo: "/placeholder.svg?height=128&width=128&text=TC",
      name: "MERN Stack Developer Interview",
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
      scheduledFor: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
      timeUntil: "2 days",
    },
    recommendedPractice: {
      technical: [
        {
          id: "pt1",
          companyName: "Practice Interview",
          companyLogo: "/placeholder.svg?height=40&width=40&text=PI",
          name: "JavaScript Fundamentals",
          type: "Technical",
          level: "Medium",
          score: null,
          date: {
            type: "permanent",
            value: "Always available",
          },
          description:
            "Test your knowledge of JavaScript fundamentals including closures, promises, and ES6+ features.",
          techStack: ["JavaScript", "ES6+", "Async/Await"],
          completed: false,
        },
        {
          id: "pt2",
          companyName: "Practice Interview",
          companyLogo: "/placeholder.svg?height=40&width=40&text=PI",
          name: "React Component Patterns",
          type: "Technical",
          level: "Medium",
          score: null,
          date: {
            type: "permanent",
            value: "Always available",
          },
          description: "Assess your understanding of React component patterns, hooks, and state management.",
          techStack: ["React", "Hooks", "State Management"],
          completed: false,
        },
      ],
      behavioral: [
        {
          id: "pb1",
          companyName: "Practice Interview",
          companyLogo: "/placeholder.svg?height=40&width=40&text=PI",
          name: "Leadership & Teamwork",
          type: "Behavioral",
          level: "Medium",
          score: null,
          date: {
            type: "permanent",
            value: "Always available",
          },
          description:
            "Practice answering questions about your leadership style, conflict resolution, and teamwork experiences.",
          techStack: ["Leadership", "Teamwork", "Communication"],
          completed: false,
        },
        {
          id: "pb2",
          companyName: "Practice Interview",
          companyLogo: "/placeholder.svg?height=40&width=40&text=PI",
          name: "Problem-Solving Scenarios",
          type: "Behavioral",
          level: "Hard",
          score: null,
          date: {
            type: "permanent",
            value: "Always available",
          },
          description: "Demonstrate your problem-solving approach through real-world scenarios and challenges.",
          techStack: ["Problem Solving", "Critical Thinking", "Decision Making"],
          completed: false,
        },
      ],
    },
    recentResults: [
      {
        id: "r1",
        interviewId: "i1",
        interviewName: "Frontend Developer Interview",
        companyName: "InnovateSoft",
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
        score: 85,
        feedback: {
          strengths: [
            "Strong understanding of React component lifecycle",
            "Excellent problem-solving approach",
            "Clear communication of technical concepts",
          ],
          improvements: [
            "Could improve knowledge of advanced CSS techniques",
            "Consider exploring more state management solutions",
          ],
        },
      },
      {
        id: "r2",
        interviewId: "i2",
        interviewName: "Full Stack JavaScript",
        companyName: "CodeMasters",
        date: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(), // 12 days ago
        score: 78,
        feedback: {
          strengths: ["Good understanding of Node.js fundamentals", "Solid knowledge of RESTful API design"],
          improvements: [
            "Need to improve database optimization techniques",
            "Work on explaining complex architectural decisions",
            "Practice more with authentication implementations",
          ],
        },
      },
    ],
    similarInterviews: [
      {
        id: "si1",
        companyName: "WebTech Solutions",
        companyLogo: "/placeholder.svg?height=40&width=40&text=WS",
        name: "Senior React Developer",
        type: "Technical",
        level: "Hard",
        score: null,
        date: {
          type: "limited",
          value: "5",
        },
        description:
          "Advanced React interview focusing on performance optimization, state management, and complex component patterns.",
        techStack: ["React", "Redux", "TypeScript", "Performance"],
        completed: false,
      },
      {
        id: "si2",
        companyName: "DataStack",
        companyLogo: "/placeholder.svg?height=40&width=40&text=DS",
        name: "MERN Stack Engineer",
        type: "Mixed",
        level: "Medium",
        score: null,
        date: {
          type: "permanent",
          value: "Always available",
        },
        description: "Comprehensive assessment of your full-stack development skills with the MERN stack.",
        techStack: ["MongoDB", "Express", "React", "Node.js"],
        completed: false,
      },
      {
        id: "si3",
        companyName: "FrontendMasters",
        companyLogo: "/placeholder.svg?height=40&width=40&text=FM",
        name: "UI/UX Developer",
        type: "Technical",
        level: "Medium",
        score: null,
        date: {
          type: "future",
          value: "May 20, 2025",
        },
        description: "Interview focused on frontend development with emphasis on UI/UX principles and implementation.",
        techStack: ["JavaScript", "React", "CSS", "UI/UX"],
        completed: false,
      },
    ],
    notifications: [
      {
        id: "n1",
        type: "reminder",
        title: "Upcoming Interview",
        description: "Your MERN Stack Developer interview with TechCorp is scheduled in 2 days.",
        date: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
        read: false,
        action: {
          text: "Prepare now",
          url: "/interviews/1",
        },
      },
      {
        id: "n2",
        type: "update",
        title: "New Practice Interviews",
        description: "We've added new practice interviews for React developers. Check them out!",
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
        read: false,
        action: {
          text: "View interviews",
          url: "/interviews?type=practice",
        },
      },
      {
        id: "n3",
        type: "achievement",
        title: "Achievement Unlocked",
        description: "You've completed 5 interviews! Keep up the good work.",
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
        read: true,
      },
    ],
    resources: [
      {
        id: "res1",
        title: "Top 10 React Interview Questions",
        description: "Prepare for your next React interview with these commonly asked questions and expert answers.",
        category: "Technical",
        url: "/resources/react-interview-questions",
        isExternal: false,
      },
      {
        id: "res2",
        title: "How to Ace Behavioral Interviews",
        description:
          "Learn techniques to effectively communicate your experiences and skills in behavioral interviews.",
        category: "Behavioral",
        url: "/resources/behavioral-interview-tips",
        isExternal: false,
      },
      {
        id: "res3",
        title: "Mastering System Design Interviews",
        description: "A comprehensive guide to approaching and solving system design problems in technical interviews.",
        category: "Technical",
        url: "https://example.com/system-design-guide",
        isExternal: true,
      },
      {
        id: "res4",
        title: "Improve Your Resume in 5 Minutes",
        description: "Quick tips to enhance your resume and make it stand out to recruiters and hiring managers.",
        category: "Career",
        url: "/resources/resume-tips",
        isExternal: false,
      },
    ],
    profileCompletionPercentage: 75,
  }
}
