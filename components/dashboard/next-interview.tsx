import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarClock, Clock, ExternalLink, Video } from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";
import type { Interview } from "@/types/profile";

interface NextInterviewProps {
  interview: Interview & {
    scheduledFor: string;
    timeUntil: string;
  };
}

export default function NextInterview({ interview }: NextInterviewProps) {
  const interviewDate = new Date(interview.scheduledFor);
  const formattedDate = format(interviewDate, "EEEE, MMMM d, yyyy");
  const formattedTime = format(interviewDate, "h:mm a");

  return (
    <Card className="overflow-hidden border-2 border-primary/20">
      <div className="bg-primary/5 px-6 py-3 border-b border-primary/10">
        <h2 className="text-lg font-semibold flex items-center">
          <CalendarClock className="h-5 w-5 mr-2 text-primary" />
          Your Next Interview
        </h2>
      </div>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-grow space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold">{interview.name}</h3>
                <p className="text-muted-foreground">{interview.companyName}</p>
              </div>
              <Badge
                variant={
                  interview.timeUntil.includes("hours")
                    ? "destructive"
                    : "outline"
                }
              >
                {interview.timeUntil.includes("hours") ? "Urgent" : "Upcoming"}
              </Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <CalendarClock className="h-4 w-4 text-muted-foreground" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{formattedTime}</span>
              </div>
            </div>

            <div className="text-sm">
              <p className="font-medium">
                Starts {formatDistanceToNow(interviewDate, { addSuffix: true })}
              </p>
              <p className="text-muted-foreground mt-1">
                Make sure your camera and microphone are working before joining.
              </p>
            </div>
          </div>

          <div className="relative h-24 w-24 md:h-32 md:w-32 flex-shrink-0 mx-auto md:mx-0">
            <Image
              src={
                interview.companyLogo || "/placeholder.svg?height=128&width=128"
              }
              alt={interview.companyName}
              fill
              className="object-contain"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="px-6 py-4 bg-muted/30 flex flex-col sm:flex-row gap-3">
        <Button className="w-full sm:w-auto" size="lg">
          <Video className="h-4 w-4 mr-2" />
          Join Interview
        </Button>
        <Link href={`/interview/${interview.id}`} className="w-full sm:w-auto">
          <Button variant="outline" className="w-full" size="lg">
            View Details
            <ExternalLink className="h-4 w-4 ml-2" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
