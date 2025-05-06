import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import CompanyHeader from "@/components/companies/company-header";
import CompanyAbout from "@/components/companies/company-about";
import CompanyInterviews from "@/components/companies/company-interviews";
import CompanyReviews from "@/components/companies/company-reviews";
import CompanyTechStack from "@/components/companies/company-tech-stack";
import CompanyJobs from "@/components/companies/company-jobs";
import CompanySocial from "@/components/companies/company-social";
import CompanySimilar from "@/components/companies/company-similar";
import CompanyDetailsSkeleton from "@/components/companies/company-details-skeleton";
import {
  getCompanyById,
  getSimilarCompanies,
  getCompanyInterviews,
  getCompanyJobs,
} from "@/lib/company-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const company = await getCompanyById(params.id);

  if (!company) {
    return {
      title: "Company Not Found",
    };
  }

  return {
    title: `${company.name} | AI Voice Interview Platform`,
    description: company.description,
  };
}

export default async function CompanyProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const company = await getCompanyById(params.id);

  if (!company) {
    notFound();
  }

  const interviews = await getCompanyInterviews(params.id);
  const jobs = await getCompanyJobs(params.id);
  const similarCompanies = await getSimilarCompanies(params.id);

  return (
    <div className="container mx-auto py-8 px-4">
      <Link
        href="/companies"
        className="flex items-center text-sm mb-6 hover:underline"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Back to all companies
      </Link>

      <CompanyHeader company={company} />

      <div className="mt-8">
        <Tabs defaultValue="about" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="interviews">Interviews</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="jobs">Jobs</TabsTrigger>
            <TabsTrigger value="tech">Tech Stack</TabsTrigger>
          </TabsList>

          <TabsContent value="about" className="space-y-8">
            <Suspense fallback={<CompanyDetailsSkeleton type="about" />}>
              <CompanyAbout company={company} />
              <CompanySocial company={company} />
            </Suspense>
          </TabsContent>

          <TabsContent value="interviews" className="space-y-8">
            <Suspense fallback={<CompanyDetailsSkeleton type="interviews" />}>
              <CompanyInterviews interviews={interviews} />
            </Suspense>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-8">
            <Suspense fallback={<CompanyDetailsSkeleton type="reviews" />}>
              <CompanyReviews company={company} />
            </Suspense>
          </TabsContent>

          <TabsContent value="jobs" className="space-y-8">
            <Suspense fallback={<CompanyDetailsSkeleton type="jobs" />}>
              <CompanyJobs jobs={jobs} company={company} />
            </Suspense>
          </TabsContent>

          <TabsContent value="tech" className="space-y-8">
            <Suspense fallback={<CompanyDetailsSkeleton type="tech" />}>
              <CompanyTechStack company={company} />
            </Suspense>
          </TabsContent>
        </Tabs>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Similar Companies</h2>
        <Suspense fallback={<CompanyDetailsSkeleton type="similar" />}>
          <CompanySimilar companies={similarCompanies} />
        </Suspense>
      </div>
    </div>
  );
}
