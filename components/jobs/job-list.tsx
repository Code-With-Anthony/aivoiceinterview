import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, DollarSign, ExternalLink } from "lucide-react";
import type { Job } from "@/types/profile";

interface JobListProps {
  jobs: Job[];
}

export default function JobList({ jobs }: JobListProps) {
  if (jobs.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium">No jobs found</h3>
        <p className="text-muted-foreground">
          Try adjusting your filters or search criteria
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {jobs.map((job) => (
        <Card
          key={job.id}
          className="overflow-hidden hover:shadow-md transition-shadow"
        >
          <CardContent className="p-0">
            <div className="p-6">
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="flex gap-4">
                  <div className="relative h-12 w-12 flex-shrink-0">
                    <img
                      src={
                        job.companyLogo || "/placeholder.svg?height=48&width=48"
                      }
                      alt={job.companyName}
                      //   fill
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <Link
                      href={`/companies/${job.companyId}/jobs/${job.id}`}
                      className="hover:underline"
                    >
                      <h3 className="text-xl font-semibold">{job.title}</h3>
                    </Link>
                    <Link
                      href={`/companies/${job.companyId}`}
                      className="text-muted-foreground hover:underline"
                    >
                      {job.companyName}
                    </Link>
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

              <p className="text-muted-foreground mt-4 line-clamp-2">
                {job.description}
              </p>

              {job.skills && job.skills.length > 0 && (
                <div className="mt-4">
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill, i) => (
                      <Badge key={i} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="bg-muted/30 p-4 flex flex-col sm:flex-row gap-3 justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-sm">
                  Prepare with our{" "}
                  <Link
                    href={`/interview/${job.relatedInterviewId}`}
                    className="text-primary hover:underline"
                  >
                    {job.relatedInterviewTitle}
                  </Link>
                </span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" asChild>
                  <Link href={`/interview/${job.relatedInterviewId}`}>
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
                    Apply
                    <ExternalLink className="h-4 w-4 ml-1" />
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
