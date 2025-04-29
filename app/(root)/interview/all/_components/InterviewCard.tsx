import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CalendarIcon } from "lucide-react";
import React from "react";

interface interviewData {
  company: string;
  role: string;
  score: number;
  description: string;
  tech: string[];
  date: string;
  time: string;
  status: string;
}

const InterviewCard = ({
  company,
  role,
  score,
  description,
  tech,
  date,
  time,
  status,
}: interviewData) => {
  let google = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
      <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
    </svg>
  );
  return (
    <Card className="w-full max-w-md p-4 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between">
          <div className="h-12 w-12 bg-gray-400 p-2 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
              <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-left">{company}</h3>
            <p className="text-sm text-muted-foreground">{role}</p>
          </div>
          {score !== null ? (
            <Badge className="bg-green-100 text-green-800">{score}/100</Badge>
          ) : (
            <Badge variant="outline">N/A</Badge>
          )}
        </div>
        <p className="text-sm mt-2 mb-3 text-muted-foreground text-justify">
          {description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tech.map((item) => (
            <Badge key={item} variant="secondary">
              {item}
            </Badge>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-1 text-muted-foreground">
          <CalendarIcon className="w-4 h-4" />
          <span>{`${date}`}</span>
        </div>
        <Button variant="link" className="text-primary p-0 h-auto">
          View Details →
        </Button>
      </div>
    </Card>
  );
};

export default InterviewCard;
