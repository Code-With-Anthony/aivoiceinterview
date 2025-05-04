import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles } from "lucide-react";
import type { Interview } from "@/types/profile";

interface SimilarInterviewsProps {
  interviews: Interview[];
  userSkills: string[];
}

export default function SimilarInterviews({
  interviews,
  userSkills,
}: SimilarInterviewsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Sparkles className="h-5 w-5 mr-2 text-primary" />
          Recommended Interviews
        </CardTitle>
        <CardDescription>
          Based on your skills and previous interviews
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {interviews.slice(0, 3).map((interview, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
            >
              <div className="relative h-12 w-12 flex-shrink-0">
                <Image
                  src={
                    interview.companyLogo ||
                    "/placeholder.svg?height=48&width=48"
                  }
                  alt={interview.companyName}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex-grow min-w-0">
                <h3 className="font-medium text-lg truncate">
                  {interview.name}
                </h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{interview.companyName}</span>
                  <span>•</span>
                  <span>{interview.level}</span>
                </div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {interview.techStack
                    .filter((tech) => userSkills.includes(tech))
                    .slice(0, 2)
                    .map((tech, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                </div>
              </div>
              <Link href={`/interviews/${interview.id}`}>
                <Button variant="ghost" size="sm" className="flex-shrink-0">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end border-t p-4">
        <Link href="/interviews">
          <Button variant="ghost" size="sm" className="gap-1">
            View all interviews
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
