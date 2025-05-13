"use client";

import TechStack from "@/components/interviews/creation/text-stack-preview";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getBrandLogo } from "@/lib/data";
import { useUserStore } from "@/lib/store/useUserStore";
import { cn } from "@/lib/utils";
import type { Interview } from "@/types/profile";
import { Separator } from "@radix-ui/react-select";
import {
  AlertCircle,
  AudioLines,
  CalendarDays,
  Clock,
  Code,
  ExternalLink,
  Star,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { z } from "zod";

const formSchema = z.object({
  type: z.enum(["Voice", "Coding", "Mix"]),
  area: z.string().optional(),
  techStack: z.array(z.string()).optional(),
  level: z.enum(["Easy", "Medium", "Hard"]),
  description: z.string().min(10, "Description must be at least 10 characters"),
  dateType: z.enum(["Current", "Future"]),
  scheduledDate: z.date().optional(),
  duration: z.enum(["Limited", "Permanent"]),
  durationPeriod: z.number().optional(),
  invitedCandidates: z.array(z.string()).optional(),
  category: z.enum(["TECHNICAL", "NON_TECHNICAL", "BEHAVIORAL", "CUSTOM"]),
  status: z.enum(["DRAFT", "PUBLISHED"]),
  durationLimit: z.number().min(5, "Duration must be at least 5 minutes"),
  numberOfQuestions: z.number().min(1, "At least 1 question is required"),
  questions: z
    .array(
      z.object({
        question: z.string().min(5, "Question must be at least 5 characters"),
        expectedAnswer: z.string().optional(),
      })
    )
    .optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface InterviewCardProps {
  interview: Interview;
  formData: FormValues;
  techStackPreview: string[];
}

export default function InterviewCard({ interview, formData, techStackPreview }: InterviewCardProps) {

  const previewInterview: Interview = {
    id: "preview", // or any temporary ID
    companyName: formData && "Microsoft" || interview.companyName,
    companyLogo: formData && "microsoft.com" || interview.companyLogo,
    name: formData?.area || interview?.name,
    type: formData?.category || interview?.type,
    level: formData?.level || interview?.level,
    score: null,
    date: formData
      ? formData.dateType === "Current"
        ? { type: "permanent", value: "" }
        : formData.dateType === "Future"
          ? { type: "future", value: formData.scheduledDate?.toLocaleDateString() || "" }
          : { type: "limited", value: formData.durationLimit?.toString() || "" }
      : interview?.date,
    description: formData?.description || interview?.description,
    techStack: formData && techStackPreview || interview?.techStack,
    completed: false,
    coding: formData?.type === "Coding" || interview?.coding,
    duration: formData?.duration === "Limited" ? formData?.durationLimit : null,
    numberOfQuestions: formData?.numberOfQuestions,
    questions: formData?.questions,
  };


  // Track window size using useState and useEffect
  const [windowWidth, setWindowWidth] = useState(0);
  const { user } = useUserStore(state => state)

  const maxBadgesSm = 2; // For small screens (sm)
  const maxBadgesMd = 2; // For medium screens (md)
  const maxBadgesLg = 3; // For large screens (lg)

  console.log("form data: ", formData);
  console.log("tech stack: ", techStackPreview);

  const currentInterview = formData ? previewInterview : interview;

  const {
    id,
    companyName,
    companyLogo,
    name,
    type,
    level,
    score,
    date,
    description,
    techStack,
    completed,
    coding,
    duration,
    numberOfQuestions,
    questions,
  } = currentInterview;

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
    if (date.type === "permanent") {
      return "open";
    } else if (date.type === "future") {
      return `Live on ${date.value}`;
    } else if (date.type === "limited") {
      return `Ends in ${date.value} days`;
    }
    return date.value;
  };

  // Update window width on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Set initial window width
    handleResize();

    // Add resize event listener
    window.addEventListener("resize", handleResize);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Determine number of badges to display based on screen size
  const displayedTechs =
    windowWidth <= 640
      ? techStack?.slice(0, maxBadgesSm) // For small screens (mobile)
      : windowWidth <= 1024
        ? techStack?.slice(0, maxBadgesMd) // For medium screens (tablets/laptops)
        : techStack?.slice(0, maxBadgesLg); // For large screens (desktops)

  // Calculate remaining count based on the visible number of badges
  const remainingCount = techStack?.length - displayedTechs?.length;
  const theme = useTheme();

  const router = useRouter();

  const handleStartInterview = () => {
    if (!user) {
      router.push("/sign-in");
    } else {
      router.push(`/interview/${id}`);
    }
  };

  const handleViewInterviewDetails = () => {
    router.push(`/interview/${id}`);
  }

  return (
    <Card className="h-full flex flex-col transition-all hover:shadow-md">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-md">
              <img
                src={getBrandLogo(companyLogo, theme.theme)}
                alt={companyName}
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-md font-semibold">{companyName}</p>
              <p className="text-xs text-muted-foreground">{type}</p>
            </div>
          </div>
          <Badge className={cn("font-normal", getDifficultyColor(level))}>
            {level}
          </Badge>
        </div>
        <CardTitle className="text-lg mt-2">{name}</CardTitle>
        <CardDescription className="line-clamp-3">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-4 flex-grow">
        <div className="flex flex-wrap gap-1 mb-4">
          {/* Display tech stack */}
          <div className="flex gap-1">
            {/* {displayedTechs?.map((tech) => (
              <Badge key={tech} variant="outline" className="font-normal">
                {tech}
              </Badge>
            ))} */}
            {techStack && techStack.length > 0 && (
              <TechStack techStack={techStack} />
            )}
          </div>

        </div>
        <div className="grid grid-cols-2 gap-y-2 text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            <span>{duration} min</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <CalendarDays className="h-3.5 w-3.5" />
            <span>{getDateDisplay()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 text-amber-500" />
            <span className="font-medium">
              {score !== null ? `${score}/100` : "Not attempted"}
            </span>
          </div>
          <div className="flex items-center gap-1">
            {coding === true ? (
              <Code className="h-3.5 w-3.5" />
            ) : (
              <AudioLines className="h-3.5 w-3.5" />
            )}
            <span className="font-medium">
              {coding === true ? "Coding" : "Voice"} Interview
            </span>
          </div>
        </div>
        <Separator />
      </CardContent>
      <CardFooter className="flex flex-col md:flex-row gap-2 pt-0 px-4">
        <div className="w-full">
          <Button variant="outline" className="w-full cursor-pointer" onClick={handleViewInterviewDetails}>
            View Details
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
        <div className="w-full">

          <Button
            onClick={handleStartInterview}
            className="w-full cursor-pointer"
            variant={completed ? "secondary" : "default"}
          >
            {completed ? "View Results" : "Take Interview"}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
