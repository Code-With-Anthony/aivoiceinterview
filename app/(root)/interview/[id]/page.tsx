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

import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CalendarDays,
  ChevronLeft,
  Clock,
  Info,
  Star,
  Video,
  Mic,
  Monitor,
  AlertTriangle,
} from "lucide-react";
// import InterviewList from "@/components/interviews/interview-list";
// import InterviewListSkeleton from "@/components/interviews/interview-list-skeleton";
import { cn } from "@/lib/utils";
import { getInterviewById, getSimilarInterviews } from "@/lib/data";
import InterviewListSkeleton from "../all/_components/interview-list-skelaton";
import InterviewList from "../all/_components/interview-list";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const interview = await getInterviewById(params.id);

  if (!interview) {
    return {
      title: "Interview Not Found",
    };
  }

  return {
    title: `${interview.name} | ${interview.companyName}`,
    description: interview.description,
  };
}

export default async function InterviewDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const interview = await getInterviewById(params.id);

  if (!interview) {
    notFound();
  }

  const similarInterviews = await getSimilarInterviews(
    interview.id,
    interview.techStack
  );

  const getDifficultyColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "easy":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "medium":
        return "bg-amber-100 text-amber-800 hover:bg-amber-200";
      case "hard":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  const getDateDisplay = () => {
    if (interview.date.type === "permanent") {
      return "Always available";
    } else if (interview.date.type === "future") {
      return `Opens on ${interview.date.value}`;
    } else if (interview.date.type === "limited") {
      return `Closes in ${interview.date.value} days`;
    }
    return interview.date.value;
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Link
        href="/interviews"
        className="flex items-center text-sm mb-6 hover:underline"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Back to all interviews
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-md">
                <Image
                  src={
                    interview.companyLogo ||
                    "/placeholder.svg?height=64&width=64"
                  }
                  alt={interview.companyName}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold">{interview.name}</h1>
                  <Badge
                    className={cn(
                      "font-normal",
                      getDifficultyColor(interview.level)
                    )}
                  >
                    {interview.level}
                  </Badge>
                </div>
                <p className="text-muted-foreground">{interview.companyName}</p>
              </div>
            </div>

            <Button
              size="lg"
              variant={interview.completed ? "secondary" : "default"}
            >
              {interview.completed ? "View Results" : "Take Interview"}
            </Button>
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="guidelines">Guidelines</TabsTrigger>
              <TabsTrigger value="faq">FAQ</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6 pt-4">
              <div>
                <h2 className="text-xl font-semibold mb-2">
                  About This Interview
                </h2>
                <p className="text-muted-foreground">{interview.description}</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Type
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="font-medium">{interview.type}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Duration
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <p className="font-medium">30-45 minutes</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Availability
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 flex items-center gap-1">
                    <CalendarDays className="h-4 w-4" />
                    <p className="font-medium">{getDateDisplay()}</p>
                  </CardContent>
                </Card>

                {interview.score !== null && (
                  <Card>
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        Your Score
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 flex items-center gap-1">
                      <Star className="h-4 w-4 text-amber-500" />
                      <p className="font-medium">{interview.score}/100</p>
                    </CardContent>
                  </Card>
                )}
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">Tech Stack</h2>
                <div className="flex flex-wrap gap-2">
                  {interview.techStack.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-sm">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">
                  What You&apos;ll Be Tested On
                </h2>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Understanding of core concepts and principles</li>
                  <li>Problem-solving abilities and logical thinking</li>
                  <li>Communication skills and clarity of expression</li>
                  <li>Technical knowledge and practical application</li>
                  <li>Ability to explain complex ideas in simple terms</li>
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="guidelines" className="space-y-6 pt-4">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Important Guidelines</AlertTitle>
                <AlertDescription>
                  Please read and follow these guidelines carefully before
                  starting the interview.
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Video className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Keep Your Camera On</h3>
                    <p className="text-sm text-muted-foreground">
                      Your camera must remain on throughout the entire
                      interview. Make sure you&apos;re in a well-lit environment
                      with a neutral background.
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
                      Your microphone must remain on during the interview. Find
                      a quiet place to avoid background noise. Voice detection
                      is active throughout the session.
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
                      Your screen is monitored during the interview. Do not
                      switch tabs or applications. Avoid copy-pasting content
                      from external sources.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-destructive/10 p-2 rounded-full">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                  </div>
                  <div>
                    <h3 className="font-medium">Violation Consequences</h3>
                    <p className="text-sm text-muted-foreground">
                      Violations of these guidelines may result in immediate
                      termination of the interview and potential
                      disqualification. The AI system automatically flags
                      suspicious behavior.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-medium mb-2">Before You Begin</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Test your camera and microphone</li>
                  <li>Ensure stable internet connection</li>
                  <li>Close unnecessary applications</li>
                  <li>Have a glass of water nearby</li>
                  <li>Find a quiet, distraction-free environment</li>
                  <li>
                    Allocate sufficient time to complete the interview without
                    interruptions
                  </li>
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="faq" className="space-y-6 pt-4">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">
                    How does the AI voice interview work?
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Our AI-powered system asks questions through text and audio,
                    analyzes your verbal responses, facial expressions, and tone
                    of voice to provide a comprehensive assessment of your
                    skills and fit for the role.
                  </p>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium">
                    Can I pause the interview and resume later?
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    No, once started, the interview must be completed in one
                    session. Make sure you have allocated sufficient time before
                    beginning.
                  </p>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium">
                    How are my responses evaluated?
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Your responses are evaluated based on content accuracy,
                    clarity of communication, problem-solving approach, and
                    overall presentation. The AI system analyzes both what you
                    say and how you say it to provide a comprehensive
                    assessment.
                  </p>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium">
                    Will I receive feedback after the interview?
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Yes, you&apos;ll receive a detailed report with scores and
                    feedback on different aspects of your performance, including
                    technical knowledge, communication skills, and areas for
                    improvement.
                  </p>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium">
                    What if I experience technical difficulties?
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    If you experience technical issues during the interview, the
                    system will attempt to reconnect. If problems persist, you
                    can contact our support team for assistance and possibly
                    reschedule the interview.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Interview Details</CardTitle>
              <CardDescription>
                Key information about this interview
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Questions
                </h3>
                <p>10-15 questions</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Format
                </h3>
                <p>AI-powered voice interview</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Required Equipment
                </h3>
                <ul className="list-disc pl-5 text-sm">
                  <li>Webcam</li>
                  <li>Microphone</li>
                  <li>Stable internet connection</li>
                  <li>Quiet environment</li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Preparation Tips
                </h3>
                <ul className="list-disc pl-5 text-sm">
                  <li>Review the tech stack requirements</li>
                  <li>Practice explaining technical concepts</li>
                  <li>Prepare examples of past work</li>
                  <li>Research the company</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Skills Assessed</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {interview.techStack.map((tech) => (
                  <li key={tech} className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    <span>{tech}</span>
                  </li>
                ))}
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                  <span>Problem Solving</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                  <span>Communication</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Similar Interviews</h2>
        <Suspense fallback={<InterviewListSkeleton />}>
          <InterviewList interviews={similarInterviews} />
        </Suspense>
      </div>
    </div>
  );
}
