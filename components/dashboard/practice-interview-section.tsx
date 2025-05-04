import Link from "next/link";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Code, Users, Clock, ArrowRight } from "lucide-react";
import type { Interview } from "@/types/profile";

interface PracticeInterviewSectionProps {
  recommendedPractice: {
    technical: Interview[];
    behavioral: Interview[];
  };
}

export default function PracticeInterviewSection({
  recommendedPractice,
}: PracticeInterviewSectionProps) {
  const renderInterviewCard = (interview: Interview, index: number) => (
    <Card key={index} className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <CardTitle className="text-base">{interview.name}</CardTitle>
          <Badge variant="outline">{interview.level}</Badge>
        </div>
        <CardDescription className="line-clamp-2">
          {interview.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2 flex-grow">
        <div className="flex flex-wrap gap-1 mb-2">
          {interview.techStack.slice(0, 3).map((tech, i) => (
            <Badge key={i} variant="secondary" className="font-normal text-xs">
              {tech}
            </Badge>
          ))}
          {interview.techStack.length > 3 && (
            <Badge variant="secondary" className="font-normal text-xs">
              +{interview.techStack.length - 3} more
            </Badge>
          )}
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="h-3.5 w-3.5 mr-1" />
          <span>30-45 min</span>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Link href={`/interview/${interview.id}`} className="w-full">
          <Button variant="outline" size="sm" className="w-full">
            Start Practice
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Brain className="h-5 w-5 mr-2 text-primary" />
          Practice Interviews
        </CardTitle>
        <CardDescription>
          Sharpen your skills with these recommended practice interviews
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="technical">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="technical" className="flex items-center">
              <Code className="h-4 w-4 mr-2" />
              Technical
            </TabsTrigger>
            <TabsTrigger value="behavioral" className="flex items-center">
              <Users className="h-4 w-4 mr-2" />
              Behavioral
            </TabsTrigger>
          </TabsList>

          <TabsContent value="technical" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommendedPractice.technical
                .slice(0, 2)
                .map(renderInterviewCard)}
            </div>
          </TabsContent>

          <TabsContent value="behavioral" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommendedPractice.behavioral
                .slice(0, 2)
                .map(renderInterviewCard)}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-end border-t p-4">
        <Link href="/interviews?type=practice">
          <Button variant="ghost" size="sm" className="gap-1">
            View all practice interviews
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
