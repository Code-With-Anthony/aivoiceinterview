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
import { ArrowRight, MessageSquare } from "lucide-react";
import InterviewCard from "@/components/interviews/interview-card";
import type { Interview } from "@/types/profile";
interface CompanyInterviewsProps {
  interviews: Interview[];
}

export default function CompanyInterviews({
  interviews,
}: CompanyInterviewsProps) {
  if (interviews.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageSquare className="h-5 w-5 mr-2 text-primary" />
            Interviews
          </CardTitle>
          <CardDescription>
            Practice interviews for this company
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center py-12">
          <p className="text-muted-foreground mb-4">
            No interviews available for this company yet.
          </p>
          <Button asChild>
            <Link href="/interviews">Browse All Interviews</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <MessageSquare className="h-5 w-5 mr-2 text-primary" />
          Interviews
        </CardTitle>
        <CardDescription>Practice interviews for this company</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {interviews.map((interview) => (
            <InterviewCard key={interview.id} interview={interview} />
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
