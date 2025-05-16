"use client";

import { MultiSelect } from "@/components/multi-select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { programmingLogosList } from "@/public/TechIcons/programmingLogosList";
import {
  ArrowLeft,
  ArrowRight,
  BarChart2,
  BookOpen,
  Briefcase,
  Code2Icon,
  Cpu,
  MessageSquareText,
  Mic,
  Puzzle,
  ShieldCheck,
  User2Icon,
} from "lucide-react";
import { useEffect, useState } from "react";

const FormContainer = ({
  onHandleInputChange,
  GoToNextStep,
  GoToPreviousStep,
}: any) => {
  const InterviewType = [
    {
      title: "Technical",
      icon: Code2Icon,
    },
    {
      title: "Behavioral",
      icon: User2Icon,
    },
    {
      title: "Problem Solving",
      icon: Puzzle,
    },
    {
      title: "Communication",
      icon: MessageSquareText,
    },
    {
      title: "HR Round",
      icon: Briefcase,
    },
    {
      title: "Aptitude",
      icon: BarChart2,
    },
    {
      title: "System Design",
      icon: Cpu,
    },
    {
      title: "Situational",
      icon: ShieldCheck,
    },
    {
      title: "Case Study",
      icon: BookOpen,
    },
    {
      title: "Mock Interview",
      icon: Mic,
    },
  ];

  const [interviewType, setInterviewType] = useState([]);

  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>([]);

  useEffect(() => {
    if (interviewType) onHandleInputChange("interviewType", interviewType);
    if (selectedFrameworks)
      onHandleInputChange("techStack", selectedFrameworks);
  }, [interviewType, selectedFrameworks]);

  return (
    <div className="p-5 bg-white rounded-xl">
      <div>
        <h2 className="text-sm font-medium">Job Position</h2>
        <Input
          placeholder="eg: Full Stack Developer"
          className="mt-2"
          onChange={(event) =>
            onHandleInputChange("jobPosition", event.target.value)
          }
        />
      </div>
      <div className="mt-5">
        <h2 className="text-sm font-medium">Job Description</h2>
        <Textarea
          placeholder="Enter detailed job desrciption"
          className="h-[200px] mt-2"
          onChange={(event) =>
            onHandleInputChange("jobDescription", event.target.value)
          }
        />
      </div>
      <div className="mt-5">
        <h2 className="text-sm font-medium">Interview Duration</h2>
        <Select
          onValueChange={(value) => onHandleInputChange("duration", value)}
        >
          <SelectTrigger className="w-full mt-2">
            <SelectValue placeholder="Select Duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5 Mins</SelectItem>
            <SelectItem value="15">15 Mins</SelectItem>
            <SelectItem value="30">30 Mins</SelectItem>
            <SelectItem value="45">45 Mins</SelectItem>
            <SelectItem value="60">60 Mins</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="mt-5">
        <h2 className="text-sm font-medium">Interview Level</h2>
        <Select onValueChange={(value) => onHandleInputChange("level", value)}>
          <SelectTrigger className="w-full mt-2">
            <SelectValue placeholder="Select Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="easy">Easy</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="hard">Hard</SelectItem>
            <SelectItem value="expert">Expert</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="mt-5">
        <h2 className="text-sm font-medium">Interview Type</h2>
        <div className="flex gap-3 flex-wrap mt-2">
          {InterviewType.map(({ title, icon: Icon }) => (
            <div
              key={title}
              className={`flex items-center gap-3 cursor-pointer p-1 px-2 rounded-2xl border border-gray-300 ${
                interviewType.includes(title) && "bg-primary text-white"
              } select-none`}
              onClick={() =>
                setInterviewType((prev) =>
                  prev.includes(title)
                    ? prev.filter((item) => item !== title)
                    : [...prev, title]
                )
              }
            >
              <Icon
                className={`text-primary h-4 w-4 ${
                  interviewType.includes(title) && "text-white"
                }`}
              />
              <span>{title}</span>
            </div>
          ))}
        </div>
      </div>
      {interviewType.includes("Technical") && (
        <div className="mt-5">
          <h2 className="text-sm font-medium">Preferred Tech Stack</h2>
          <MultiSelect
            options={programmingLogosList}
            onValueChange={setSelectedFrameworks}
            defaultValue={selectedFrameworks}
            placeholder="Select frameworks"
            variant="inverted"
            animation={2}
            maxCount={4}
          />
        </div>
      )}

      <div className="mt-5">
        <h2 className="text-sm font-medium">Interview Questions</h2>
        <Select
          onValueChange={(value) => onHandleInputChange("question", value)}
        >
          <SelectTrigger className="w-full mt-2">
            <SelectValue placeholder="No. of interview questions" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="15">15</SelectItem>
            <SelectItem value="20">20</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mt-7 flex justify-between">
        <Button className="cursor-pointer" onClick={() => GoToPreviousStep()}>
          <ArrowLeft /> Back
        </Button>
        <Button className="cursor-pointer" onClick={() => GoToNextStep()}>
          Generate Interview <ArrowRight />{" "}
        </Button>
      </div>
    </div>
  );
};

export default FormContainer;
