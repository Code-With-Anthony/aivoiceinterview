import HeroSection from "@/components/interviews/details/hero-section"
import InterviewDetails from "@/components/interviews/details/interview-details"
import InterviewStatsBar from "@/components/interviews/details/interview-stats-bar"
import FrequentlyAskedQuestion from "@/components/interviews/details/tabs/faq/frequently-asked-question"
import BeforeYouBegin from "@/components/interviews/details/tabs/guidelines/before-you-begin"
import ImportantGuideLines from "@/components/interviews/details/tabs/guidelines/important-guidelines"
import TechnicalRequirements from "@/components/interviews/details/tabs/guidelines/technical-requirements"
import ViolationConsequences from "@/components/interviews/details/tabs/guidelines/violation-consequences"
import AboutInterview from "@/components/interviews/details/tabs/overview/about-interview"
import SampleQuestions from "@/components/interviews/details/tabs/overview/sample-questions"
import TechStack from "@/components/interviews/details/tabs/overview/tech-stack"
import TestingCriteria from "@/components/interviews/details/tabs/overview/testing-criteria"
import TopCandidates from "@/components/interviews/details/tabs/top_candidates/top-candidates"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SIMILAR_INTERVIEWS, TABS } from "@/constants"
import { getInterviewById, getSimilarInterviews } from "@/lib/data"
import {
  BookOpen,
  Calendar,
  FileText,
  HelpCircle,
  Trophy
} from "lucide-react"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Suspense } from "react"
import InterviewList from "../all/_components/interview-list"
import InterviewListSkeleton from "../all/_components/interview-list-skelaton"

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { id } = await params;
  const interview = await getInterviewById(id);

  if (!interview) {
    return {
      title: "Interview Not Found",
    }
  }

  return {
    title: `${interview.name} | ${interview.companyName}`,
    description: interview.description,
  }
}

export default async function InterviewDetailsPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const interview = await getInterviewById(id);

  if (!interview) {
    notFound()
  }

  const similarInterviews = await getSimilarInterviews(interview.id, interview.techStack)

  return (
    <div className="min-h-screen bg-gradient-to-b">
      {/* Hero Section */}
      <HeroSection interview={interview} />

      {/* Stats Bar */}
      <InterviewStatsBar interview={interview} />

      {/* Tabs */}
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="w-full grid grid-cols-4 p-1 bg-muted/80">
                <TabsTrigger
                  value="overview"
                  className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  {TABS.OVERVIEW}
                </TabsTrigger>
                <TabsTrigger
                  value="guidelines"
                  className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  {TABS.GUIDELINES}
                </TabsTrigger>
                <TabsTrigger
                  value="faq"
                  className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  <HelpCircle className="h-4 w-4 mr-2" />
                  {TABS.FAQ}
                </TabsTrigger>
                <TabsTrigger
                  value="top-candidates"
                  className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  <Trophy className="h-4 w-4 mr-2" />
                  {TABS.TOP_CANDIDATES}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-8 pt-6">
                {/* About Interview */}
                <AboutInterview interview={interview} />

                {/* Tech Stack */}
                <TechStack interview={interview} />

                {/* Testing Criteria */}
                <TestingCriteria />

                {/* Sample Questions */}
                <SampleQuestions />
              </TabsContent>

              <TabsContent value="guidelines" className="space-y-6 pt-6">
                {/* Alert */}
                <ImportantGuideLines />

                {/* Technical Requirements */}
                <TechnicalRequirements />

                {/* Violation Concsequences */}
                <ViolationConsequences />

                {/* Before You Begin */}
                <BeforeYouBegin />
              </TabsContent>

              <TabsContent value="faq" className="space-y-6 pt-6">
                {/* FAQ */}
                <FrequentlyAskedQuestion />
              </TabsContent>

              <TabsContent value="top-candidates" className="space-y-6 pt-6">
                {/* Top Candidates */}
                <TopCandidates />
              </TabsContent>

            </Tabs>
          </div>

          <div className="space-y-6">
            {/* Right Side Interview Details Section */}
            <InterviewDetails interview={interview} />
          </div>
        </div>
      </div>

      {/* Similar Interviews Section */}
      <div className="container mx-auto py-8 px-4">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Calendar className="h-6 w-6 text-primary" />
          {SIMILAR_INTERVIEWS}
        </h2>
        <Suspense fallback={<InterviewListSkeleton />}>
          <InterviewList interviews={similarInterviews} />
        </Suspense>
      </div>
    </div>
  )
}

