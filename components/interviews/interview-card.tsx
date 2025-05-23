"use client";

import ExpandableDescription from "@/components/interviews/creation/expandable-interview-content";
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
import { getUserByUserId } from "@/lib/actions/general.action";
import { getBrandLogo } from "@/lib/data";
import { ManualInterviewGenerationFormValues } from "@/lib/schemas/manualInterviewGenerationForm";
import { useUserStore } from "@/lib/store/useUserStore";
import { cn } from "@/lib/utils";
import type { Interview } from "@/types/profile";
import { Separator } from "@radix-ui/react-select";
import { format } from "date-fns";
import {
  AudioLines,
  CalendarClock,
  CalendarDays,
  Clock,
  Code,
  ExternalLink,
  Sparkles,
  Star
} from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface InterviewCardProps {
  interview?: Interview;
  formData?: ManualInterviewGenerationFormValues;
  techStackPreview?: string[];
}

export default function InterviewCard({ interview, formData, techStackPreview }: InterviewCardProps) {
  const { user } = useUserStore(state => state);
  console.log("scheduleddate: ", interview?.date?.scheduledDate);
  const [interviewGeneratedUser, setInterviewGeneratedUser] = useState<string | undefined>(undefined);
  const theme = useTheme();
  const router = useRouter();

  function getInitials(name: string | undefined): string {
    // Split the name by spaces
    const nameParts = name?.split(' ');

    // Get the first letter of each part and convert it to uppercase
    const initials = nameParts?.map(part => part.charAt(0).toUpperCase()).join('');

    return (initials ?? initials) || "U";
  }

  // getting user by userId
  const userDetails = async () => {
    if (!interview?.userId) return;
    const details = await getUserByUserId(interview.userId);
    setInterviewGeneratedUser(details?.name);
  }


  useEffect(() => {
    if (interview?.userId) {
      userDetails();
    }
  }, [interview?.userId]);


  const previewInterview: Interview = {
    id: formData ? "preview" : (interview?.id ?? "unknown-id"),
    userId: user?.id ?? "preview-user",
    createdAt: formData ? new Date().toISOString() : interview?.createdAt ?? new Date().toISOString(),
    companyName: formData ? (user?.name ?? "") : (interviewGeneratedUser ?? ""),
    companyLogo: formData && getInitials(user?.name) || interview?.companyLogo,
    title: formData ? (formData?.title ?? "Interview Title") : (interview?.title ?? "Interview Title"),
    type: formData?.type || interview?.type || "Voice",
    category: formData?.category || interview?.category || "Technical",
    level: formData?.level || interview?.level || "Medium",
    score: formData ? null : interview?.score || null,
    date: formData
      ? {
        interviewTimming: formData.date.interviewTimming?.toLowerCase() as "current" | "future",
        avialabilityDuration: formData.date.availabilityDuration?.toLowerCase() as "limited" | "permanent",
        scheduledDate: formData.date.scheduledDate
          ? format(formData.date.scheduledDate, "PPP")
          : null,
        durationPeriod: formData.date.durationPeriod != null ? formData.date.durationPeriod : undefined,
      }
      : interview?.date ?? {
        interviewTimming: interview?.date?.interviewTimming || "current",
        avialabilityDuration: interview?.date?.avialabilityDuration || "limited",
        scheduledDate: interview?.date?.scheduledDate || null,
        durationPeriod: interview?.date?.durationPeriod || undefined,
      },
    description: formData?.description ? "Enter detailed description about the interview. The description should be crystal clear about the interview and should focus on fully the interview." : interview?.description || "Enter detailed description about the interview. The description should be crystal clear about the interview and should focus on fully the interview.",
    techStack: formData && techStackPreview || interview?.techStack || [],
    completed: false,
    // duration: formData?.duration === "Limited" ? formData?.durationLimit : null,
    numberOfQuestions: formData ? formData?.numberOfQuestions : interview?.numberOfQuestions || 0,
    questions: formData?.questions
      ? formData.questions
        .filter((q) => typeof q.question === "string" && q.question !== undefined)
        .map((q) => ({
          question: q.question ?? "",
          expectedAnswer: q.expectedAnswer,
        }))
      : undefined,
    durationLimit: formData ? formData?.durationLimit : interview?.durationLimit || 30,
  };

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
    if (previewInterview.date?.interviewTimming?.toLocaleLowerCase() === "current") {
      return `Live on ${new Date().toISOString().split("T")[0]}`;
    }
    else if (previewInterview.date?.interviewTimming?.toLocaleLowerCase() === "future") {
      const temp = `Scheduled on ${previewInterview?.date?.scheduledDate?.split("T")[0]}`;
      console.log("scheduled date: ", temp);
      return temp;
    }
    return previewInterview.date?.avialabilityDuration;
  };

  const handleStartInterview = () => {
    if (!user) {
      router.push("/sign-in");
    } else {
      router.push(`/interview/take/${previewInterview.id}`);
    }
  };

  const handleViewInterviewDetails = () => {
    router.push(`/interview/${previewInterview.id}`);
  }


  return (
    <Card className="h-full flex flex-col transition-all hover:shadow-md">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-md">
              <Avatar className={`h-10 w-10 ${!formData ? "hidden" : ""}`}>
                <AvatarFallback className="bg-muted text-muted-foreground">
                  {previewInterview.companyLogo}
                </AvatarFallback>
              </Avatar>
              <img
                src={getBrandLogo(previewInterview.companyLogo, theme.theme)}
                alt={previewInterview.companyName}
                className="object-cover"
                hidden={formData}
              />
            </div>
            <div>
              <p className="text-md font-semibold">{previewInterview.companyName}</p>
              <p className="text-xs text-muted-foreground">{previewInterview.type}</p>
            </div>
          </div>
          <Badge className={cn("font-normal", getDifficultyColor(previewInterview.level ?? ""))}>
            {previewInterview.level}
          </Badge>
        </div>
        <CardTitle className="text-lg mt-2">{formData ? formData.title ? formData.title : "Interview Title" : previewInterview.title}</CardTitle>
        <CardDescription className="line-clamp-3 h-full flex flex-col transition-all">
          <ExpandableDescription description={previewInterview.description ? previewInterview.description : "Enter detailed description about the interview. The description should be crystal clear about the interview and should focus on fully the interview."} maxLength={120} />
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
            {previewInterview.techStack && previewInterview.techStack.length > 0 && (
              <TechStack techStack={previewInterview.techStack} />
            )}
          </div>

        </div>
        <div className="grid grid-cols-2 gap-y-2 text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            <span>{previewInterview.durationLimit} min</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <CalendarDays className="h-3.5 w-3.5" />
            <span>{getDateDisplay()}</span>
          </div>
          <div className="flex items-center gap-1">
            {
              !formData ? user?.role === "candidate" ? (
                <>
                  <Star className="h-3.5 w-3.5 text-amber-500" />
                  <span className="font-medium">
                    {previewInterview.score !== null ? `${previewInterview.score}/100` : "Not attempted"}
                  </span>
                </>
              ) : (
                <>
                  <CalendarClock className="h-3.5 w-3.5 text-amber-500" />
                  <span>
                    {previewInterview.date?.avialabilityDuration?.toLocaleLowerCase() === "limited" ? `Available for ${previewInterview.date?.durationPeriod} days` : "Available Forever"}
                  </span>
                </>
              ) : (
                <>
                  <CalendarClock className="h-3.5 w-3.5 text-amber-500" />
                  <span>
                    {previewInterview.date?.avialabilityDuration === "limited" ? `Available for ${previewInterview.date?.durationPeriod ? previewInterview.date?.durationPeriod : "-"} days` : "Available Forever"}
                  </span>
                </>
              )
            }

          </div>
          <div className="flex items-center gap-1">
            {previewInterview.type === "Coding" ? (
              <Code className="h-3.5 w-3.5" />
            ) : previewInterview.type === "Voice" ? (
              <AudioLines className="h-3.5 w-3.5" />
            ) : (
              <Sparkles className="h-3.5 w-3.5" />
            )}
            <span className="font-medium">
              {previewInterview.type === "Coding" ? "Coding" : previewInterview.type === "Voice" ? "Voice" : "Mix"} Interview
            </span>
          </div>
        </div>
        <Separator />
      </CardContent>
      {
        !formData &&
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
              variant={previewInterview.completed ? "secondary" : "default"}
            >
              {user?.role === "recruiter" ? "Analytics" : previewInterview.completed ? "View Results" : "Take Interview"}
            </Button>
          </div>
        </CardFooter>
      }
    </Card>
  );
}
