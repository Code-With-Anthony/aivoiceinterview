import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  CalendarDays,
  Clock,
  User,
  Users,
  CheckCircle2,
  Briefcase,
  Code,
  Layers,
  AlertCircle,
  AudioLines,
  Code2,
} from "lucide-react";
import ExpandableDescription from "./expandable-interview-content";
import TechStack from "./text-stack-preview";

interface InterviewPreviewProps {
  formData: any;
  techStack: string[];
}

export default function InterviewPreview({ formData, techStack }: InterviewPreviewProps) {
  const {
    type,
    area,
    // techStack,
    level,
    description,
    dateType,
    scheduledDate,
    duration,
    durationPeriod,
    category,
    status,
    durationLimit,
    numberOfQuestions,
    questions,
  } = formData;
  console.log("formData", formData);
  console.log("techstack", techStack);

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case "Easy":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Medium":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Hard":
        return "bg-rose-50 text-rose-700 border-rose-200";
      case "Expert":
        return "bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "DRAFT":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "PUBLISHED":
        return "bg-green-50 text-green-700 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "TECHNICAL":
        return <Code className="h-4 w-4" />;
      case "NON_TECHNICAL":
        return <Briefcase className="h-4 w-4" />;
      case "BEHAVIORAL":
        return <User className="h-4 w-4" />;
      case "CUSTOM":
        return <Layers className="h-4 w-4" />;
      default:
        return <Layers className="h-4 w-4" />;
    }
  };

  const getDateDisplay = () => {
    if (dateType === "Current") {
      return "Available immediately";
    } else if (dateType === "Future" && scheduledDate) {
      return `Available from ${scheduledDate.toLocaleDateString()}`;
    }
    return "Date not specified";
  };

  const getDurationDisplay = () => {
    if (duration === "Permanent") {
      return "Always available";
    } else if (duration === "Limited" && durationPeriod) {
      return `Available for ${durationPeriod} days`;
    }
    return "Duration not specified";
  };

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden border-none shadow-md bg-background">
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold text-primary">
                {/* {type} Interview */}
                {area ? `${area}` : 'Interview Title'}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {category} • {numberOfQuestions} questions • {durationLimit}{" "}
                minutes
              </p>
            </div>

            <Badge className={getStatusColor(status)}>{status}</Badge>
          </div>
        </div>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
              <Badge className={getDifficultyColor(level)} variant="outline">
                {level} Difficulty
              </Badge>
              <Badge variant="outline" className="mr-1">
                {
                  type === "Voice" ? <><AudioLines /> <p>Voice</p> </> : type === "Coding" ? <><Code2 /> <p>Coding</p> </> : <><Code /> <p>Mix</p> </>
                }
              </Badge>
              {techStack && techStack.length > 0 && (
                <TechStack techStack={techStack} />
              )}

            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">
                DESCRIPTION
              </h3>
              <ExpandableDescription description={description || "No description provided"} />
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <CalendarDays className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Availability</p>
                  <p className="text-sm font-medium">{getDateDisplay()}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Clock className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Duration</p>
                  <p className="text-sm font-medium">{getDurationDisplay()}</p>
                </div>
              </div>
            </div>

            <Separator />

            {questions && questions.length > 0 && questions[0].question && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-3">
                  SAMPLE QUESTIONS
                </h3>
                <div className="space-y-3">
                  {questions.slice(0, 3).map(
                    (q: any, i: number) =>
                      q.question && (
                        <div key={i} className="flex gap-3">
                          <div className="h-6 w-6 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center text-xs font-medium text-primary">
                            {i + 1}
                          </div>
                          <p className="text-sm">{q.question}</p>
                        </div>
                      )
                  )}
                  {questions.length > 3 && (
                    <p className="text-sm text-muted-foreground pl-9">
                      +{questions.length - 3} more questions
                    </p>
                  )}
                </div>
              </div>
            )}

            {(!questions ||
              questions.length === 0 ||
              !questions[0].question) && (
                <div className="flex items-center gap-3 text-muted-foreground">
                  <AlertCircle className="h-5 w-5" />
                  <p className="text-sm">
                    Add questions to see them in the preview
                  </p>
                </div>
              )}
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-none shadow-md">
        <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 p-6">
          <CardTitle className="text-base">Interview Details</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
              <User className="h-4 w-4 text-gray-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium">Created by You</h3>
              <p className="text-xs text-muted-foreground">Just now</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
              <Users className="h-4 w-4 text-gray-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium">Invited Candidates</h3>
              <p className="text-xs text-muted-foreground">
                {formData.invitedCandidates?.length || 0} candidates
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
              <CheckCircle2 className="h-4 w-4 text-gray-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium">Completion Rate</h3>
              <p className="text-xs text-muted-foreground">No data yet</p>
            </div>
          </div>

          <div className="mt-4 rounded-lg overflow-hidden border border-gray-100">
            <div className="relative h-24 w-full bg-gradient-to-r flex items-center justify-center">
              <div className="text-center">
                <p className="text-sm font-medium">Interview Link</p>
                <p className="text-xs text-muted-foreground">
                  Will be generated after creation
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
