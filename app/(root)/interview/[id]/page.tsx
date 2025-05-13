// import Agent from "@/components/Agent";
// import DisplayTechIcons from "@/components/DisplayTechIcons";
// import { getCurrentUser } from "@/lib/actions/auth.action";
// import { getInterviewById } from "@/lib/actions/general.action";
// import { getRandomInterviewCover } from "@/lib/utils";
// import Image from "next/image";
// import { redirect } from "next/navigation";

// const page = async ({ params }: RouteParams) => {
//   const { id } = await params;
//   const user = await getCurrentUser();

//   const interview = await getInterviewById(id);
//   if (!interview) redirect("/");
//   return (
//     <>
//       <div className="flex flex-row gap-4 justify-between">
//         <div className="flex flex-row gap-4 items-center max-sm:flex-col">
//           <div className="flex flex-row gap-4 items-center">
//             <Image
//               src={getRandomInterviewCover()}
//               alt="cover-image"
//               width={40}
//               height={40}
//               className="rounded-full object-cover size-[40px]"
//             />
//             <h3 className="capitalize">{interview.role}</h3>
//           </div>
//           <DisplayTechIcons techStack={interview.techstack} />
//         </div>
//         <p className="dark:bg-white dark:text-black bg-dark-200 text-white px-3 py-3 rounded-lg h-fit capitalize">
//           {interview.type}
//         </p>
//       </div>
//       <Agent
//         userName={user?.name || ""}
//         userId={user?.id}
//         interviewId={id}
//         questions={interview.questions}
//         type="interview"
//       />
//     </>
//   );
// };

// export default page;

// import { Suspense } from "react";
// import type { Metadata } from "next";
// import Link from "next/link";
// import Image from "next/image";
// import { notFound } from "next/navigation";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import {
//   CalendarDays,
//   ChevronLeft,
//   Clock,
//   Info,
//   Star,
//   Video,
//   Mic,
//   Monitor,
//   AlertTriangle,
// } from "lucide-react";
// // import InterviewList from "@/components/interviews/interview-list";
// // import InterviewListSkeleton from "@/components/interviews/interview-list-skeleton";
// import { cn } from "@/lib/utils";
// import { getInterviewById, getSimilarInterviews } from "@/lib/data";
// import InterviewListSkeleton from "../all/_components/interview-list-skelaton";
// import InterviewList from "../all/_components/interview-list";

// export async function generateMetadata({
//   params,
// }: {
//   params: { id: string };
// }): Promise<Metadata> {
//   const interview = await getInterviewById(params.id);

//   if (!interview) {
//     return {
//       title: "Interview Not Found",
//     };
//   }

//   return {
//     title: `${interview.name} | ${interview.companyName}`,
//     description: interview.description,
//   };
// }

// export default async function InterviewDetailsPage({
//   params,
// }: {
//   params: { id: string };
// }) {
//   const interview = await getInterviewById(params?.id);

//   if (!interview) {
//     notFound();
//   }

//   const similarInterviews = await getSimilarInterviews(
//     interview.id,
//     interview.techStack
//   );

//   const getDifficultyColor = (level: string) => {
//     switch (level.toLowerCase()) {
//       case "easy":
//         return "bg-green-100 text-green-800 hover:bg-green-200";
//       case "medium":
//         return "bg-amber-100 text-amber-800 hover:bg-amber-200";
//       case "hard":
//         return "bg-red-100 text-red-800 hover:bg-red-200";
//       default:
//         return "bg-gray-100 text-gray-800 hover:bg-gray-200";
//     }
//   };

//   const getDateDisplay = () => {
//     if (interview.date.type === "permanent") {
//       return "Always available";
//     } else if (interview.date.type === "future") {
//       return `Opens on ${interview.date.value}`;
//     } else if (interview.date.type === "limited") {
//       return `Closes in ${interview.date.value} days`;
//     }
//     return interview.date.value;
//   };

//   return (
//     <div className="container mx-auto py-8 px-4">
//       <Link
//         href="/interviews"
//         className="flex items-center text-sm mb-6 hover:underline"
//       >
//         <ChevronLeft className="h-4 w-4 mr-1" />
//         Back to all interviews
//       </Link>

//       <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
//         <div className="lg:col-span-2 space-y-6">
//           <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//             <div className="flex items-center gap-4">
//               <div className="relative h-16 w-16 overflow-hidden rounded-md">
//                 <img
//                   src={
//                     interview.companyLogo ||
//                     "/placeholder.svg?height=64&width=64"
//                   }
//                   alt={interview.companyName}
//                   className="object-cover"
//                 />
//               </div>
//               <div>
//                 <div className="flex items-center gap-2">
//                   <h1 className="text-2xl font-bold">{interview.name}</h1>
//                   <Badge
//                     className={cn(
//                       "font-normal",
//                       getDifficultyColor(interview.level)
//                     )}
//                   >
//                     {interview.level}
//                   </Badge>
//                 </div>
//                 <p className="text-muted-foreground">{interview.companyName}</p>
//               </div>
//             </div>

//             <Button
//               size="lg"
//               variant={interview.completed ? "secondary" : "default"}
//             >
//               {interview.completed ? "View Results" : "Take Interview"}
//             </Button>
//           </div>

//           <Tabs defaultValue="overview" className="w-full">
//             <TabsList className="grid w-full grid-cols-3">
//               <TabsTrigger value="overview">Overview</TabsTrigger>
//               <TabsTrigger value="guidelines">Guidelines</TabsTrigger>
//               <TabsTrigger value="faq">FAQ</TabsTrigger>
//             </TabsList>

//             <TabsContent value="overview" className="space-y-6 pt-4">
//               <div>
//                 <h2 className="text-xl font-semibold mb-2">
//                   About This Interview
//                 </h2>
//                 <p className="text-muted-foreground">{interview.description}</p>
//               </div>

//               <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//                 <Card>
//                   <CardHeader className="p-4 pb-2">
//                     <CardTitle className="text-sm font-medium text-muted-foreground">
//                       Type
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent className="p-4 pt-0">
//                     <p className="font-medium">{interview.type}</p>
//                   </CardContent>
//                 </Card>

//                 <Card>
//                   <CardHeader className="p-4 pb-2">
//                     <CardTitle className="text-sm font-medium text-muted-foreground">
//                       Duration
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent className="p-4 pt-0 flex items-center gap-1">
//                     <Clock className="h-4 w-4" />
//                     <p className="font-medium">30-45 minutes</p>
//                   </CardContent>
//                 </Card>

//                 <Card>
//                   <CardHeader className="p-4 pb-2">
//                     <CardTitle className="text-sm font-medium text-muted-foreground">
//                       Availability
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent className="p-4 pt-0 flex items-center gap-1">
//                     <CalendarDays className="h-4 w-4" />
//                     <p className="font-medium">{getDateDisplay()}</p>
//                   </CardContent>
//                 </Card>

//                 {interview.score !== null && (
//                   <Card>
//                     <CardHeader className="p-4 pb-2">
//                       <CardTitle className="text-sm font-medium text-muted-foreground">
//                         Your Score
//                       </CardTitle>
//                     </CardHeader>
//                     <CardContent className="p-4 pt-0 flex items-center gap-1">
//                       <Star className="h-4 w-4 text-amber-500" />
//                       <p className="font-medium">{interview.score}/100</p>
//                     </CardContent>
//                   </Card>
//                 )}
//               </div>

//               <div>
//                 <h2 className="text-xl font-semibold mb-2">Tech Stack</h2>
//                 <div className="flex flex-wrap gap-2">
//                   {interview.techStack.map((tech) => (
//                     <Badge key={tech} variant="secondary" className="text-sm">
//                       {tech}
//                     </Badge>
//                   ))}
//                 </div>
//               </div>

//               <div>
//                 <h2 className="text-xl font-semibold mb-2">
//                   What You&apos;ll Be Tested On
//                 </h2>
//                 <ul className="list-disc pl-5 space-y-1">
//                   <li>Understanding of core concepts and principles</li>
//                   <li>Problem-solving abilities and logical thinking</li>
//                   <li>Communication skills and clarity of expression</li>
//                   <li>Technical knowledge and practical application</li>
//                   <li>Ability to explain complex ideas in simple terms</li>
//                 </ul>
//               </div>
//             </TabsContent>

//             <TabsContent value="guidelines" className="space-y-6 pt-4">
//               <Alert>
//                 <Info className="h-4 w-4" />
//                 <AlertTitle>Important Guidelines</AlertTitle>
//                 <AlertDescription>
//                   Please read and follow these guidelines carefully before
//                   starting the interview.
//                 </AlertDescription>
//               </Alert>

//               <div className="space-y-4">
//                 <div className="flex items-start gap-3">
//                   <div className="bg-primary/10 p-2 rounded-full">
//                     <Video className="h-5 w-5 text-primary" />
//                   </div>
//                   <div>
//                     <h3 className="font-medium">Keep Your Camera On</h3>
//                     <p className="text-sm text-muted-foreground">
//                       Your camera must remain on throughout the entire
//                       interview. Make sure you&apos;re in a well-lit environment
//                       with a neutral background.
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex items-start gap-3">
//                   <div className="bg-primary/10 p-2 rounded-full">
//                     <Mic className="h-5 w-5 text-primary" />
//                   </div>
//                   <div>
//                     <h3 className="font-medium">Keep Your Microphone On</h3>
//                     <p className="text-sm text-muted-foreground">
//                       Your microphone must remain on during the interview. Find
//                       a quiet place to avoid background noise. Voice detection
//                       is active throughout the session.
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex items-start gap-3">
//                   <div className="bg-primary/10 p-2 rounded-full">
//                     <Monitor className="h-5 w-5 text-primary" />
//                   </div>
//                   <div>
//                     <h3 className="font-medium">Screen Monitoring</h3>
//                     <p className="text-sm text-muted-foreground">
//                       Your screen is monitored during the interview. Do not
//                       switch tabs or applications. Avoid copy-pasting content
//                       from external sources.
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex items-start gap-3">
//                   <div className="bg-destructive/10 p-2 rounded-full">
//                     <AlertTriangle className="h-5 w-5 text-destructive" />
//                   </div>
//                   <div>
//                     <h3 className="font-medium">Violation Consequences</h3>
//                     <p className="text-sm text-muted-foreground">
//                       Violations of these guidelines may result in immediate
//                       termination of the interview and potential
//                       disqualification. The AI system automatically flags
//                       suspicious behavior.
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-muted p-4 rounded-lg">
//                 <h3 className="font-medium mb-2">Before You Begin</h3>
//                 <ul className="list-disc pl-5 space-y-1 text-sm">
//                   <li>Test your camera and microphone</li>
//                   <li>Ensure stable internet connection</li>
//                   <li>Close unnecessary applications</li>
//                   <li>Have a glass of water nearby</li>
//                   <li>Find a quiet, distraction-free environment</li>
//                   <li>
//                     Allocate sufficient time to complete the interview without
//                     interruptions
//                   </li>
//                 </ul>
//               </div>
//             </TabsContent>

//             <TabsContent value="faq" className="space-y-6 pt-4">
//               <div className="space-y-4">
//                 <div>
//                   <h3 className="font-medium">
//                     How does the AI voice interview work?
//                   </h3>
//                   <p className="text-sm text-muted-foreground mt-1">
//                     Our AI-powered system asks questions through text and audio,
//                     analyzes your verbal responses, facial expressions, and tone
//                     of voice to provide a comprehensive assessment of your
//                     skills and fit for the role.
//                   </p>
//                 </div>

//                 <Separator />

//                 <div>
//                   <h3 className="font-medium">
//                     Can I pause the interview and resume later?
//                   </h3>
//                   <p className="text-sm text-muted-foreground mt-1">
//                     No, once started, the interview must be completed in one
//                     session. Make sure you have allocated sufficient time before
//                     beginning.
//                   </p>
//                 </div>

//                 <Separator />

//                 <div>
//                   <h3 className="font-medium">
//                     How are my responses evaluated?
//                   </h3>
//                   <p className="text-sm text-muted-foreground mt-1">
//                     Your responses are evaluated based on content accuracy,
//                     clarity of communication, problem-solving approach, and
//                     overall presentation. The AI system analyzes both what you
//                     say and how you say it to provide a comprehensive
//                     assessment.
//                   </p>
//                 </div>

//                 <Separator />

//                 <div>
//                   <h3 className="font-medium">
//                     Will I receive feedback after the interview?
//                   </h3>
//                   <p className="text-sm text-muted-foreground mt-1">
//                     Yes, you&apos;ll receive a detailed report with scores and
//                     feedback on different aspects of your performance, including
//                     technical knowledge, communication skills, and areas for
//                     improvement.
//                   </p>
//                 </div>

//                 <Separator />

//                 <div>
//                   <h3 className="font-medium">
//                     What if I experience technical difficulties?
//                   </h3>
//                   <p className="text-sm text-muted-foreground mt-1">
//                     If you experience technical issues during the interview, the
//                     system will attempt to reconnect. If problems persist, you
//                     can contact our support team for assistance and possibly
//                     reschedule the interview.
//                   </p>
//                 </div>
//               </div>
//             </TabsContent>
//           </Tabs>
//         </div>

//         <div className="space-y-6">
//           <Card>
//             <CardHeader>
//               <CardTitle>Interview Details</CardTitle>
//               <CardDescription>
//                 Key information about this interview
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div>
//                 <h3 className="text-sm font-medium text-muted-foreground">
//                   Questions
//                 </h3>
//                 <p>10-15 questions</p>
//               </div>

//               <div>
//                 <h3 className="text-sm font-medium text-muted-foreground">
//                   Format
//                 </h3>
//                 <p>AI-powered voice interview</p>
//               </div>

//               <div>
//                 <h3 className="text-sm font-medium text-muted-foreground">
//                   Required Equipment
//                 </h3>
//                 <ul className="list-disc pl-5 text-sm">
//                   <li>Webcam</li>
//                   <li>Microphone</li>
//                   <li>Stable internet connection</li>
//                   <li>Quiet environment</li>
//                 </ul>
//               </div>

//               <div>
//                 <h3 className="text-sm font-medium text-muted-foreground">
//                   Preparation Tips
//                 </h3>
//                 <ul className="list-disc pl-5 text-sm">
//                   <li>Review the tech stack requirements</li>
//                   <li>Practice explaining technical concepts</li>
//                   <li>Prepare examples of past work</li>
//                   <li>Research the company</li>
//                 </ul>
//               </div>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader>
//               <CardTitle>Skills Assessed</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <ul className="space-y-2">
//                 {interview.techStack.map((tech) => (
//                   <li key={tech} className="flex items-center gap-2">
//                     <div className="h-2 w-2 rounded-full bg-primary"></div>
//                     <span>{tech}</span>
//                   </li>
//                 ))}
//                 <li className="flex items-center gap-2">
//                   <div className="h-2 w-2 rounded-full bg-primary"></div>
//                   <span>Problem Solving</span>
//                 </li>
//                 <li className="flex items-center gap-2">
//                   <div className="h-2 w-2 rounded-full bg-primary"></div>
//                   <span>Communication</span>
//                 </li>
//               </ul>
//             </CardContent>
//           </Card>
//         </div>
//       </div>

//       <div className="mt-12">
//         <h2 className="text-2xl font-bold mb-6">Similar Interviews</h2>
//         <Suspense fallback={<InterviewListSkeleton />}>
//           <InterviewList interviews={similarInterviews} />
//         </Suspense>
//       </div>
//     </div>
//   );
// }

import { Suspense } from "react"
import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertTriangle,
  ArrowLeft,
  BookOpen,
  Calendar,
  CalendarDays,
  CheckCircle2,
  Clock,
  Code,
  Cpu,
  FileText,
  Globe,
  GraduationCap,
  HelpCircle,
  Info,
  Layers,
  Mic,
  Monitor,
  Play,
  Share2,
  Star,
  Timer,
  Trophy,
  Users,
  Video,
} from "lucide-react"
// import InterviewList from "@/components/interviews/interview-list"
// import InterviewListSkeleton from "@/components/interviews/interview-list-skeleton"
import { cn } from "@/lib/utils"
import { getBrandLogo, getInterviewById, getSimilarInterviews } from "@/lib/data"
import InterviewListSkeleton from "../all/_components/interview-list-skelaton"
import InterviewList from "../all/_components/interview-list"
import { useTheme } from "next-themes"

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const interview = await getInterviewById(params.id);

  if (!interview) {
    return {
      title: "Interview Not Found",
    }
  }

  return {
    title: `${interview.name} | ${interview.companyName}`,
    description: interview.description,
  }
}

export default async function InterviewDetailsPage({ params }: { params: { id: string } }) {
  const interview = await getInterviewById(params?.id)

  if (!interview) {
    notFound()
  }

  const similarInterviews = await getSimilarInterviews(interview.id, interview.techStack)

  const getDifficultyColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "easy":
        return "bg-green-100 text-green-800 hover:bg-green-200"
      case "medium":
        return "bg-amber-100 text-amber-800 hover:bg-amber-200"
      case "hard":
        return "bg-red-100 text-red-800 hover:bg-red-200"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200"
    }
  }

  const getDifficultyGradient = (level: string) => {
    switch (level.toLowerCase()) {
      case "easy":
        return "from-green-500 to-emerald-600"
      case "medium":
        return "from-amber-500 to-orange-600"
      case "hard":
        return "from-red-500 to-rose-600"
      default:
        return "from-blue-500 to-indigo-600"
    }
  }

  const getDateDisplay = () => {
    if (interview.date.type === "permanent") {
      return "Always available"
    } else if (interview.date.type === "future") {
      return `Opens on ${interview.date.value}`
    } else if (interview.date.type === "limited") {
      return `Closes in ${interview.date.value} days`
    }
    return interview.date.value
  }

  const getInterviewTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "voice":
        return <Mic className="h-5 w-5" />
      case "coding":
        return <Code className="h-5 w-5" />
      case "mix":
        return <Layers className="h-5 w-5" />
      default:
        return <FileText className="h-5 w-5" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className={cn("relative w-full bg-gradient-to-r py-12 text-white", getDifficultyGradient(interview.level))}>
        <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]"></div>
        <div className="container relative mx-auto px-4">
          <Link
            href="/interview/all"
            className="inline-flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-sm backdrop-blur-md transition-colors hover:bg-white/30 mb-6"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to all interviews
          </Link>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="relative h-20 w-20 overflow-hidden rounded-xl border-4 border-white/20 bg-white shadow-lg">
                <img
                  src={getBrandLogo(interview.companyLogo) || "/placeholder.svg?height=80&width=80"}
                  alt={interview.companyName}
                  // fill
                  className="object-cover"
                />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-1">
                  <h1 className="text-3xl font-bold">{interview.name}</h1>
                  <Badge className="bg-white/20 text-white hover:bg-white/30 backdrop-blur-md">{interview.level}</Badge>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <span className="font-medium">{interview.companyName}</span>
                  <span className="text-white/60">•</span>
                  <span className="flex items-center gap-1">
                    {getInterviewTypeIcon(interview.type)}
                    <span>{interview.type} Interview</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                size="lg"
                className="gap-2 bg-white text-primary hover:bg-white/90"
                variant={interview.completed ? "secondary" : "default"}
              >
                {interview.completed ? (
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

      {/* Stats Bar */}
      <div className="border-b bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x">
            <div className="flex flex-col items-center justify-center py-4 px-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <Clock className="h-4 w-4" />
                <span>Duration</span>
              </div>
              <p className="font-semibold">30-45 minutes</p>
            </div>
            <div className="flex flex-col items-center justify-center py-4 px-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <CalendarDays className="h-4 w-4" />
                <span>Availability</span>
              </div>
              <p className="font-semibold">{getDateDisplay()}</p>
            </div>
            <div className="flex flex-col items-center justify-center py-4 px-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <FileText className="h-4 w-4" />
                <span>Questions</span>
              </div>
              <p className="font-semibold">10-15 questions</p>
            </div>
            {interview.score !== null ? (
              <div className="flex flex-col items-center justify-center py-4 px-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <Trophy className="h-4 w-4" />
                  <span>Your Score</span>
                </div>
                <p className="font-semibold flex items-center gap-1">
                  <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                  {interview.score}/100
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-4 px-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <Users className="h-4 w-4" />
                  <span>Participants</span>
                </div>
                <p className="font-semibold">1,234 candidates</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="w-full grid grid-cols-3 p-1 bg-muted/80">
                <TabsTrigger
                  value="overview"
                  className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="guidelines"
                  className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Guidelines
                </TabsTrigger>
                <TabsTrigger
                  value="faq"
                  className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  <HelpCircle className="h-4 w-4 mr-2" />
                  FAQ
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-8 pt-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl">About This Interview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{interview.description}</p>
                  </CardContent>
                </Card>

                <div>
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Cpu className="h-5 w-5 text-primary" />
                    Tech Stack
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {interview.techStack.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-sm px-3 py-1 rounded-full">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl flex items-center gap-2">
                      <GraduationCap className="h-5 w-5 text-primary" />
                      What You'll Be Tested On
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-start gap-3">
                        <div className="bg-primary/10 p-2 rounded-full mt-1">
                          <CheckCircle2 className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">Core Concepts</h3>
                          <p className="text-sm text-muted-foreground">
                            Understanding of fundamental principles and theories
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="bg-primary/10 p-2 rounded-full mt-1">
                          <CheckCircle2 className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">Problem Solving</h3>
                          <p className="text-sm text-muted-foreground">Ability to analyze and solve complex problems</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="bg-primary/10 p-2 rounded-full mt-1">
                          <CheckCircle2 className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">Communication</h3>
                          <p className="text-sm text-muted-foreground">
                            Clear expression and explanation of technical concepts
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="bg-primary/10 p-2 rounded-full mt-1">
                          <CheckCircle2 className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">Practical Application</h3>
                          <p className="text-sm text-muted-foreground">Applying knowledge to real-world scenarios</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Globe className="h-5 w-5 text-primary" />
                      Sample Questions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex items-center justify-center h-6 w-6 rounded-full bg-primary/20 text-primary text-xs font-medium">
                            1
                          </div>
                          <h3 className="font-medium">Explain the concept of state management in React</h3>
                        </div>
                        <p className="text-sm text-muted-foreground pl-8">
                          This question tests your understanding of React's core principles and how data flows through a
                          React application.
                        </p>
                      </div>
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex items-center justify-center h-6 w-6 rounded-full bg-primary/20 text-primary text-xs font-medium">
                            2
                          </div>
                          <h3 className="font-medium">How would you optimize the performance of a web application?</h3>
                        </div>
                        <p className="text-sm text-muted-foreground pl-8">
                          This question evaluates your knowledge of performance optimization techniques and best
                          practices.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="guidelines" className="space-y-6 pt-6">
                <Alert className="bg-blue-50 border-blue-200">
                  <Info className="h-4 w-4 text-blue-600" />
                  <AlertTitle className="text-blue-800">Important Guidelines</AlertTitle>
                  <AlertDescription className="text-blue-700">
                    Please read and follow these guidelines carefully before starting the interview.
                  </AlertDescription>
                </Alert>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl">Technical Requirements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <Video className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">Keep Your Camera On</h3>
                          <p className="text-sm text-muted-foreground">
                            Your camera must remain on throughout the entire interview. Make sure you're in a well-lit
                            environment with a neutral background.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <Mic className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">Keep Your Microphone On</h3>
                          <p className="text-sm text-muted-foreground">
                            Your microphone must remain on during the interview. Find a quiet place to avoid background
                            noise. Voice detection is active throughout the session.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <Monitor className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">Screen Monitoring</h3>
                          <p className="text-sm text-muted-foreground">
                            Your screen is monitored during the interview. Do not switch tabs or applications. Avoid
                            copy-pasting content from external sources.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-amber-500" />
                      Violation Consequences
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                      <p className="text-sm text-amber-800">
                        Violations of these guidelines may result in immediate termination of the interview and
                        potential disqualification. The AI system automatically flags suspicious behavior.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl">Before You Begin</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-start gap-3">
                        <div className="bg-primary/10 p-2 rounded-full mt-1">
                          <CheckCircle2 className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">Test Equipment</h3>
                          <p className="text-sm text-muted-foreground">
                            Test your camera and microphone before starting
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="bg-primary/10 p-2 rounded-full mt-1">
                          <CheckCircle2 className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">Internet Connection</h3>
                          <p className="text-sm text-muted-foreground">Ensure you have a stable internet connection</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="bg-primary/10 p-2 rounded-full mt-1">
                          <CheckCircle2 className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">Close Applications</h3>
                          <p className="text-sm text-muted-foreground">
                            Close unnecessary applications and browser tabs
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="bg-primary/10 p-2 rounded-full mt-1">
                          <CheckCircle2 className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">Quiet Environment</h3>
                          <p className="text-sm text-muted-foreground">Find a quiet, distraction-free environment</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="faq" className="space-y-6 pt-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl">Frequently Asked Questions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <div className="flex items-start gap-3">
                          <div className="bg-primary/10 p-2 rounded-full mt-1">
                            <HelpCircle className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">How does the AI voice interview work?</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              Our AI-powered system asks questions through text and audio, analyzes your verbal
                              responses, facial expressions, and tone of voice to provide a comprehensive assessment of
                              your skills and fit for the role.
                            </p>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <div className="flex items-start gap-3">
                          <div className="bg-primary/10 p-2 rounded-full mt-1">
                            <HelpCircle className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">Can I pause the interview and resume later?</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              No, once started, the interview must be completed in one session. Make sure you have
                              allocated sufficient time before beginning.
                            </p>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <div className="flex items-start gap-3">
                          <div className="bg-primary/10 p-2 rounded-full mt-1">
                            <HelpCircle className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">How are my responses evaluated?</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              Your responses are evaluated based on content accuracy, clarity of communication,
                              problem-solving approach, and overall presentation. The AI system analyzes both what you
                              say and how you say it to provide a comprehensive assessment.
                            </p>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <div className="flex items-start gap-3">
                          <div className="bg-primary/10 p-2 rounded-full mt-1">
                            <HelpCircle className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">Will I receive feedback after the interview?</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              Yes, you'll receive a detailed report with scores and feedback on different aspects of
                              your performance, including technical knowledge, communication skills, and areas for
                              improvement.
                            </p>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <div className="flex items-start gap-3">
                          <div className="bg-primary/10 p-2 rounded-full mt-1">
                            <HelpCircle className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">What if I experience technical difficulties?</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              If you experience technical issues during the interview, the system will attempt to
                              reconnect. If problems persist, you can contact our support team for assistance and
                              possibly reschedule the interview.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Calendar className="h-6 w-6 text-primary" />
                Similar Interviews
              </h2>
              <Suspense fallback={<InterviewListSkeleton />}>
                <InterviewList interviews={similarInterviews} />
              </Suspense>
            </div>
          </div>

          <div className="space-y-6">
            <Card className="sticky top-6 border-t-4 border-t-primary shadow-md">
              <CardHeader className="pb-2">
                <CardTitle>Interview Details</CardTitle>
                <CardDescription>Key information about this interview</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <Timer className="h-5 w-5 text-primary" />
                    <div>
                      <h3 className="text-sm font-medium">Duration</h3>
                      <p className="text-sm">30-45 minutes</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <FileText className="h-5 w-5 text-primary" />
                    <div>
                      <h3 className="text-sm font-medium">Questions</h3>
                      <p className="text-sm">10-15 questions</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <Layers className="h-5 w-5 text-primary" />
                    <div>
                      <h3 className="text-sm font-medium">Format</h3>
                      <p className="text-sm">AI-powered voice</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-sm font-medium mb-2">Required Equipment</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-2 p-2 bg-muted/30 rounded-lg">
                      <Video className="h-4 w-4 text-primary" />
                      <span className="text-sm">Webcam</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-muted/30 rounded-lg">
                      <Mic className="h-4 w-4 text-primary" />
                      <span className="text-sm">Microphone</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-muted/30 rounded-lg">
                      <Globe className="h-4 w-4 text-primary" />
                      <span className="text-sm">Internet</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-muted/30 rounded-lg">
                      <Monitor className="h-4 w-4 text-primary" />
                      <span className="text-sm">Computer</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-sm font-medium mb-2">Skills Assessed</h3>
                  <div className="flex flex-wrap gap-2">
                    {interview.techStack.map((tech) => (
                      <Badge key={tech} variant="outline" className="bg-muted/30">
                        {tech}
                      </Badge>
                    ))}
                    <Badge variant="outline" className="bg-muted/30">
                      Problem Solving
                    </Badge>
                    <Badge variant="outline" className="bg-muted/30">
                      Communication
                    </Badge>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-sm font-medium mb-2">Preparation Tips</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                      <span className="text-sm">Review the tech stack requirements</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                      <span className="text-sm">Practice explaining technical concepts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                      <span className="text-sm">Prepare examples of past work</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                      <span className="text-sm">Research the company</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-none shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-primary" />
                  Top Performers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
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

                  <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
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

                  <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
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
          </div>
        </div>
      </div>
    </div>
  )
}

