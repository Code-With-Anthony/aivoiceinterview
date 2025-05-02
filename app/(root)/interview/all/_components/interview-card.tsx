import Link from "next/link";
import Image from "next/image";
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
import { CalendarDays, Clock, ExternalLink, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Interview } from "@/types/profile";

interface InterviewCardProps {
  interview: Interview;
}

export default function InterviewCard({ interview }: InterviewCardProps) {
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
  } = interview;

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
      return "Always available";
    } else if (date.type === "future") {
      return `Opens on ${date.value}`;
    } else if (date.type === "limited") {
      return `Closes in ${date.value} days`;
    }
    return date.value;
  };

  return (
    <Card className="h-full flex flex-col transition-all hover:shadow-md">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-md">
              <Image
                src={companyLogo || "/placeholder.svg?height=40&width=40"}
                alt={companyName}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-medium">{companyName}</p>
              <p className="text-xs text-muted-foreground">{type}</p>
            </div>
          </div>
          <Badge className={cn("font-normal", getDifficultyColor(level))}>
            {level}
          </Badge>
        </div>
        <CardTitle className="text-xl mt-2">{name}</CardTitle>
        <CardDescription className="line-clamp-2">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-4 flex-grow">
        <div className="flex flex-wrap gap-1 mb-4">
          {techStack.map((tech) => (
            <Badge key={tech} variant="outline" className="font-normal">
              {tech}
            </Badge>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-y-2 text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            <span>30-45 min</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <CalendarDays className="h-3.5 w-3.5" />
            <span>{getDateDisplay()}</span>
          </div>
          <div className="flex items-center gap-1 col-span-2">
            <Star className="h-3.5 w-3.5 text-amber-500" />
            <span className="font-medium">
              {score !== null ? `${score}/100` : "Not attempted"}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 pt-0">
        <Link href={`/interview/${id}`} className="w-full">
          <Button variant="outline" className="w-full justify-between">
            View Details
            <ExternalLink className="h-4 w-4" />
          </Button>
        </Link>
        <Button
          className="w-full"
          variant={completed ? "secondary" : "default"}
        >
          {completed ? "View Results" : "Take Interview"}
        </Button>
      </CardFooter>
    </Card>
  );
}
