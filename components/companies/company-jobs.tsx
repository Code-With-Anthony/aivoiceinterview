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
import { Separator } from "@/components/ui/separator";
import {
  ArrowRight,
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  ExternalLink,
} from "lucide-react";
import type { Company, Job } from "@/types/profile";

interface CompanyJobsProps {
  jobs: Job[];
  company: Company;
}

export default function CompanyJobs({ jobs, company }: CompanyJobsProps) {
  if (jobs.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Briefcase className="h-5 w-5 mr-2 text-primary" />
            Open Positions
          </CardTitle>
          <CardDescription>
            Current job openings at {company.name}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center py-12">
          <p className="text-muted-foreground mb-4">
            No job openings available at this time.
          </p>
          <Button asChild>
            <Link href="/jobs">Browse All Jobs</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Briefcase className="h-5 w-5 mr-2 text-primary" />
          Open Positions
        </CardTitle>
        <CardDescription>
          Current job openings at {company.name}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {jobs.map((job) => (
          <Card key={job.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="p-6">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="flex gap-4">
                    <div className="relative h-12 w-12 flex-shrink-0">
                      <Image
                        src={
                          company.logo || "/placeholder.svg?height=48&width=48"
                        }
                        alt={company.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{job.title}</h3>
                      <p className="text-muted-foreground">{company.name}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">{job.type}</Badge>
                    <Badge variant="outline">{job.level}</Badge>
                    {job.isRemote && <Badge variant="secondary">Remote</Badge>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>Posted {job.postedDate}</span>
                  </div>
                  {job.salary && (
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span>{job.salary}</span>
                    </div>
                  )}
                </div>

                <Separator className="my-6" />

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">Job Description</h4>
                    <p className="text-muted-foreground mt-2">
                      {job.description}
                    </p>
                  </div>

                  {job.requirements && (
                    <div>
                      <h4 className="font-medium">Requirements</h4>
                      <ul className="list-disc pl-5 text-muted-foreground mt-2 space-y-1">
                        {job.requirements.map((req, i) => (
                          <li key={i}>{req}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {job.skills && job.skills.length > 0 && (
                    <div>
                      <h4 className="font-medium">Skills</h4>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {job.skills.map((skill, i) => (
                          <Badge key={i} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-muted/30 p-4 flex flex-col sm:flex-row gap-3 justify-between items-center">
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-primary" />
                  <span className="text-sm">
                    Prepare for this role with our{" "}
                    <Link
                      href={`/interviews/${job.relatedInterviewId}`}
                      className="text-primary hover:underline"
                    >
                      {job.relatedInterviewTitle}
                    </Link>
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" asChild>
                    <Link href={`/interviews/${job.relatedInterviewId}`}>
                      Practice Interview
                    </Link>
                  </Button>
                  <Button asChild>
                    <a
                      href={job.applyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1"
                    >
                      Apply Now
                      <ExternalLink className="h-4 w-4 ml-1" />
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </CardContent>
      <CardFooter className="flex justify-end border-t p-4">
        <Link href="/jobs">
          <Button variant="ghost" size="sm" className="gap-1">
            View all jobs
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
