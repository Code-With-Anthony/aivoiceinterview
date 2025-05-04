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
import { Progress } from "@/components/ui/progress";
import { ArrowRight, BarChart, CheckCircle, XCircle } from "lucide-react";
import { format } from "date-fns";

interface InterviewResult {
  id: string;
  interviewId: string;
  interviewName: string;
  companyName: string;
  date: string;
  score: number;
  feedback: {
    strengths: string[];
    improvements: string[];
  };
}

interface RecentResultsProps {
  results: InterviewResult[];
}

export default function RecentResults({ results }: RecentResultsProps) {
  if (results.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart className="h-5 w-5 mr-2 text-primary" />
            Recent Results
          </CardTitle>
          <CardDescription>
            Your interview performance and feedback will appear here
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center py-8">
          <p className="text-muted-foreground">
            You haven&apos;t completed any interviews yet. Take a practice
            interview to get started!
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href="/interviews?type=practice">
            <Button>Take a Practice Interview</Button>
          </Link>
        </CardFooter>
      </Card>
    );
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-amber-500";
    return "text-red-500";
  };

  const getProgressColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-amber-500";
    return "bg-red-500";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <BarChart className="h-5 w-5 mr-2 text-primary" />
          Recent Results
        </CardTitle>
        <CardDescription>
          Your performance and feedback from recent interviews
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {results.map((result, index) => (
          <div key={index} className="space-y-4">
            {index > 0 && <div className="border-t my-4"></div>}
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
              <div>
                <h3 className="font-medium">{result.interviewName}</h3>
                <p className="text-sm text-muted-foreground">
                  {result.companyName}
                </p>
                <p className="text-xs text-muted-foreground">
                  {format(new Date(result.date), "MMM d, yyyy")}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-2xl font-bold ${getScoreColor(
                    result.score
                  )}`}
                >
                  {result.score}%
                </span>
                <div className="w-32">
                  <Progress
                    value={result.score}
                    className={getProgressColor(result.score)}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="text-sm font-medium flex items-center">
                  <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                  Strengths
                </h4>
                <ul className="text-sm space-y-1">
                  {result.feedback.strengths.map((strength, i) => (
                    <li key={i} className="text-muted-foreground">
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-medium flex items-center">
                  <XCircle className="h-4 w-4 mr-1 text-amber-500" />
                  Areas to Improve
                </h4>
                <ul className="text-sm space-y-1">
                  {result.feedback.improvements.map((improvement, i) => (
                    <li key={i} className="text-muted-foreground">
                      {improvement}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex justify-end">
              <Link href={`/results/${result.id}`}>
                <Button variant="ghost" size="sm">
                  View detailed feedback
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter className="flex justify-end border-t p-4">
        <Link href="/results">
          <Button variant="ghost" size="sm" className="gap-1">
            View all results
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
