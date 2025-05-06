import { Suspense } from "react";
import type { Metadata } from "next";
import { getAllJobs } from "@/lib/company-data";
import JobFilters from "@/components/jobs/job-filters";
import JobListSkeleton from "@/components/jobs/job-list-skeleton";
import JobList from "@/components/jobs/job-list";

export const metadata: Metadata = {
  title: "Jobs | AI Voice Interview Platform",
  description:
    "Explore job opportunities and prepare for interviews with our AI-powered platform",
};

export default async function JobsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const jobs = await getAllJobs();
  console.log("jobs search params: ", searchParams);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Job Opportunities</h1>
        <p className="text-muted-foreground">
          Explore job openings and prepare for interviews with our AI-powered
          platform
        </p>
      </div>

      <JobFilters />

      <Suspense fallback={<JobListSkeleton />}>
        <JobList jobs={jobs} />
      </Suspense>
    </div>
  );
}
