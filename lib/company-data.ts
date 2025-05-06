"use server"

import type { Company, Interview, Job } from "@/types/profile"

// Mock data for demonstration purposes
const companies: Company[] = [
    {
        id: "1",
        name: "TechCorp",
        logo: "/placeholder.svg?height=128&width=128&text=TC",
        coverImage: "/placeholder.svg?height=300&width=1200&text=TechCorp",
        industry: "Technology",
        headquarters: "San Francisco, CA",
        size: "1001-5000 employees",
        foundedYear: "2010",
        website: "https://techcorp.example.com",
        description:
            "TechCorp is a leading technology company specializing in cloud computing, artificial intelligence, and enterprise software solutions. We help businesses transform their operations through innovative technology.",
        mission:
            "To accelerate the world's transition to efficient, scalable, and sustainable technology solutions that empower businesses and individuals alike.",
        values: [
            "Innovation at our core",
            "Customer obsession",
            "Diversity and inclusion",
            "Sustainability",
            "Continuous learning",
        ],
        products: [
            {
                name: "TechCloud",
                description: "Enterprise-grade cloud computing platform with advanced security and scalability features.",
            },
            {
                name: "AI Insights",
                description: "AI-powered analytics platform that transforms raw data into actionable business intelligence.",
            },
            {
                name: "SecureConnect",
                description: "End-to-end encrypted communication and collaboration tools for remote teams.",
            },
        ],
        techStack: {
            frontend: ["React", "TypeScript", "Next.js", "Redux"],
            backend: ["Node.js", "Python", "Java", "Go"],
            database: ["PostgreSQL", "MongoDB", "Redis"],
            devops: ["AWS", "Docker", "Kubernetes", "Terraform"],
            other: ["GraphQL", "Kafka", "ElasticSearch"],
        },
        reviews: [
            {
                id: "r1",
                author: "Jane Smith",
                avatar: "/placeholder.svg?height=40&width=40&text=JS",
                position: "Senior Software Engineer",
                date: "March 15, 2025",
                title: "Great place to grow your career",
                content:
                    "I've been with TechCorp for 3 years and have had amazing opportunities to grow my skills and work on cutting-edge projects. The company truly values its employees and invests in their development.",
                pros: "Excellent benefits, flexible work arrangements, strong engineering culture, and opportunities for growth.",
                cons: "Work can be demanding at times, and there's occasional pressure during product launches.",
                ratings: {
                    workLifeBalance: 4.5,
                    culture: 5,
                    careerGrowth: 4.5,
                    diversity: 4,
                },
            },
            {
                id: "r2",
                author: "Michael Johnson",
                avatar: "/placeholder.svg?height=40&width=40&text=MJ",
                position: "Product Manager",
                date: "February 2, 2025",
                title: "Innovative company with great culture",
                content:
                    "TechCorp has a fantastic culture of innovation and collaboration. The leadership team is transparent and accessible, and there's a strong emphasis on work-life balance.",
                pros: "Collaborative environment, cutting-edge projects, excellent compensation, and strong leadership.",
                cons: "Some teams can be siloed, and decision-making can be slow at times due to the company's size.",
                ratings: {
                    workLifeBalance: 4,
                    culture: 4.5,
                    careerGrowth: 5,
                    diversity: 4.5,
                },
            },
        ],
        social: {
            linkedin: "https://linkedin.com/company/techcorp",
            twitter: "https://twitter.com/techcorp",
            github: "https://github.com/techcorp",
            glassdoor: "https://glassdoor.com/techcorp",
        },
        verified: true,
    },
    {
        id: "2",
        name: "InnovateSoft",
        logo: "/placeholder.svg?height=128&width=128&text=IS",
        coverImage: "/placeholder.svg?height=300&width=1200&text=InnovateSoft",
        industry: "Software Development",
        headquarters: "Austin, TX",
        size: "201-500 employees",
        foundedYear: "2015",
        website: "https://innovatesoft.example.com",
        description:
            "InnovateSoft is a dynamic software development company focused on creating cutting-edge web and mobile applications. We specialize in custom software solutions that help businesses streamline operations and enhance user experiences.",
        mission: "To build software that solves real-world problems through intuitive design and powerful functionality.",
        values: [
            "User-centered design",
            "Technical excellence",
            "Agile methodology",
            "Transparent communication",
            "Continuous improvement",
        ],
        products: [
            {
                name: "AppForge",
                description: "Low-code application development platform for rapid prototyping and deployment.",
            },
            {
                name: "MobileSync",
                description: "Cross-platform mobile application framework with real-time synchronization capabilities.",
            },
        ],
        techStack: {
            frontend: ["React", "Vue.js", "Angular", "Flutter"],
            backend: ["Node.js", "Ruby on Rails", "Django"],
            database: ["MySQL", "MongoDB"],
            devops: ["GCP", "Azure", "CircleCI"],
            other: ["WebSockets", "Firebase"],
        },
        reviews: [
            {
                id: "r1",
                author: "Alex Chen",
                avatar: "/placeholder.svg?height=40&width=40&text=AC",
                position: "Frontend Developer",
                date: "April 10, 2025",
                title: "Great place for developers",
                content:
                    "InnovateSoft provides an excellent environment for developers to grow. The tech stack is modern, and there's a strong emphasis on code quality and best practices.",
                pros: "Modern tech stack, collaborative team, good work-life balance.",
                cons: "Project deadlines can be tight sometimes.",
                ratings: {
                    workLifeBalance: 4,
                    culture: 4.5,
                    careerGrowth: 4,
                    diversity: 3.5,
                },
            },
        ],
        social: {
            linkedin: "https://linkedin.com/company/innovatesoft",
            twitter: "https://twitter.com/innovatesoft",
            github: "https://github.com/innovatesoft",
            glassdoor: null,
        },
        verified: true,
    },
    {
        id: "3",
        name: "DataDynamics",
        logo: "/placeholder.svg?height=128&width=128&text=DD",
        coverImage: "/placeholder.svg?height=300&width=1200&text=DataDynamics",
        industry: "Data Analytics",
        headquarters: "Boston, MA",
        size: "51-200 employees",
        foundedYear: "2018",
        website: "https://datadynamics.example.com",
        description:
            "DataDynamics specializes in big data analytics and machine learning solutions. We help organizations extract valuable insights from their data to drive strategic decision-making and business growth.",
        mission: "To democratize data analytics and make advanced insights accessible to organizations of all sizes.",
        values: [
            "Data-driven decision making",
            "Innovation and exploration",
            "Ethical AI development",
            "Collaboration and knowledge sharing",
        ],
        products: [
            {
                name: "InsightEngine",
                description: "Advanced analytics platform with machine learning capabilities for predictive insights.",
            },
            {
                name: "DataViz",
                description: "Interactive data visualization tool for creating compelling dashboards and reports.",
            },
        ],
        techStack: {
            frontend: ["React", "D3.js", "Plotly"],
            backend: ["Python", "R", "Scala"],
            database: ["Snowflake", "BigQuery", "Redshift"],
            devops: ["AWS", "Databricks"],
            other: ["TensorFlow", "PyTorch", "Spark", "Hadoop"],
        },
        reviews: [],
        social: {
            linkedin: "https://linkedin.com/company/datadynamics",
            twitter: "https://twitter.com/datadynamics",
            github: "https://github.com/datadynamics",
            glassdoor: "https://glassdoor.com/datadynamics",
        },
        verified: false,
    },
]

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
        name: "Data Scientist",
        type: "Technical",
        level: "Hard",
        score: null,
        date: {
            type: "future",
            value: "May 15, 2025",
        },
        description:
            "This interview evaluates your data science skills, including statistical analysis, machine learning, and data visualization.",
        techStack: ["Python", "Machine Learning", "Statistics", "Data Visualization"],
        completed: false,
    },
    {
        id: "4",
        companyName: "TechCorp",
        companyLogo: "/placeholder.svg?height=40&width=40&text=TC",
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
]

const jobs: Job[] = [
    {
        id: "1",
        companyId: "1",
        companyName: "TechCorp",
        companyLogo: "/placeholder.svg?height=48&width=48&text=TC",
        title: "Senior Full Stack Developer",
        type: "Full-time",
        level: "Senior",
        location: "San Francisco, CA",
        isRemote: true,
        salary: "$120,000 - $160,000",
        postedDate: "2 days ago",
        description:
            "We're looking for a Senior Full Stack Developer to join our growing engineering team. You'll be responsible for building and maintaining our core products, working with both frontend and backend technologies.",
        requirements: [
            "5+ years of experience in full stack development",
            "Strong proficiency in React, Node.js, and MongoDB",
            "Experience with cloud platforms (AWS, GCP, or Azure)",
            "Excellent problem-solving and communication skills",
            "Bachelor's degree in Computer Science or equivalent experience",
        ],
        skills: ["React", "Node.js", "MongoDB", "TypeScript", "AWS"],
        relatedInterviewId: "1",
        relatedInterviewTitle: "MERN Stack Developer Interview",
        applyUrl: "https://techcorp.example.com/careers/senior-full-stack-developer",
    },
    {
        id: "2",
        companyId: "1",
        companyName: "TechCorp",
        companyLogo: "/placeholder.svg?height=48&width=48&text=TC",
        title: "DevOps Engineer",
        type: "Full-time",
        level: "Mid-Level",
        location: "San Francisco, CA",
        isRemote: true,
        salary: "$110,000 - $140,000",
        postedDate: "1 week ago",
        description:
            "Join our DevOps team to help build and maintain our cloud infrastructure. You'll be responsible for implementing CI/CD pipelines, managing containerized applications, and ensuring the reliability and scalability of our systems.",
        requirements: [
            "3+ years of experience in DevOps or SRE roles",
            "Strong knowledge of AWS services",
            "Experience with Docker, Kubernetes, and Terraform",
            "Familiarity with CI/CD tools like Jenkins, GitHub Actions, or CircleCI",
            "Strong scripting skills (Bash, Python)",
        ],
        skills: ["AWS", "Docker", "Kubernetes", "Terraform", "CI/CD"],
        relatedInterviewId: "4",
        relatedInterviewTitle: "DevOps Engineer Interview",
        applyUrl: "https://techcorp.example.com/careers/devops-engineer",
    },
    {
        id: "3",
        companyId: "2",
        companyName: "InnovateSoft",
        companyLogo: "/placeholder.svg?height=48&width=48&text=IS",
        title: "Frontend Developer",
        type: "Full-time",
        level: "Mid-Level",
        location: "Austin, TX",
        isRemote: true,
        salary: "$90,000 - $120,000",
        postedDate: "3 days ago",
        description:
            "We're seeking a talented Frontend Developer to join our product team. You'll be responsible for building responsive and intuitive user interfaces for our web applications, collaborating closely with designers and backend developers.",
        requirements: [
            "3+ years of experience in frontend development",
            "Strong proficiency in React and modern JavaScript",
            "Experience with CSS preprocessors and responsive design",
            "Familiarity with frontend testing frameworks",
            "Good understanding of web performance optimization",
        ],
        skills: ["React", "JavaScript", "CSS", "HTML", "Redux"],
        relatedInterviewId: "2",
        relatedInterviewTitle: "Frontend Developer Interview",
        applyUrl: "https://innovatesoft.example.com/careers/frontend-developer",
    },
    {
        id: "4",
        companyId: "3",
        companyName: "DataDynamics",
        companyLogo: "/placeholder.svg?height=48&width=48&text=DD",
        title: "Data Scientist",
        type: "Full-time",
        level: "Senior",
        location: "Boston, MA",
        isRemote: false,
        salary: "$130,000 - $170,000",
        postedDate: "1 week ago",
        description:
            "Join our data science team to help build advanced analytics and machine learning solutions. You'll be working on challenging problems in data analysis, predictive modeling, and algorithm development.",
        requirements: [
            "5+ years of experience in data science or related field",
            "Strong background in statistics and machine learning",
            "Proficiency in Python and data science libraries (NumPy, Pandas, Scikit-learn)",
            "Experience with deep learning frameworks (TensorFlow, PyTorch)",
            "Master's or PhD in Computer Science, Statistics, or related field",
        ],
        skills: ["Python", "Machine Learning", "Statistics", "TensorFlow", "SQL"],
        relatedInterviewId: "3",
        relatedInterviewTitle: "Data Scientist Interview",
        applyUrl: "https://datadynamics.example.com/careers/data-scientist",
    },
]

// Simulated data fetching functions
export async function getAllCompanies(): Promise<Company[]> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))
    return companies
}

export async function getCompanyById(id: string): Promise<Company | undefined> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300))
    return companies.find((company) => company.id === id)
}

export async function getSimilarCompanies(currentId: string): Promise<Company[]> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 700))

    // Find companies in the same industry, excluding the current one
    const currentCompany = companies.find((company) => company.id === currentId)
    if (!currentCompany) return []

    return companies
        .filter((company) => company.id !== currentId && company.industry === currentCompany.industry)
        .slice(0, 3)
}

export async function getCompanyInterviews(companyId: string): Promise<Interview[]> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 400))

    return interviews.filter((interview) => {
        const company = companies.find((c) => c.id === companyId)
        return interview.companyName === company?.name
    })
}

export async function getCompanyJobs(companyId: string): Promise<Job[]> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 400))

    return jobs.filter((job) => job.companyId === companyId)
}

export async function getAllJobs(): Promise<Job[]> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))
    return jobs
}
