import { Suspense } from "react";
import type { Metadata } from "next";
import WelcomeBanner from "@/components/dashboard/welcome-banner";
import StatsOverview from "@/components/dashboard/stats-overview";
import NextInterview from "@/components/dashboard/next-interview";
import PracticeInterviewSection from "@/components/dashboard/practice-interview-section";
import RecentResults from "@/components/dashboard/recent-results";
import ProfileCompletion from "@/components/dashboard/profile-completion";
import SimilarInterviews from "@/components/dashboard/similar-interviews";
import TipsResources from "@/components/dashboard/tips-resources";
import NotificationCenter from "@/components/dashboard/notification-center";
import DashboardSkeleton from "@/components/dashboard/dashboard-skeleton";
import { getUserDashboardData } from "@/lib/dashboard-data";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Dashboard | AI Voice Interview Platform",
  description:
    "Track your interview progress and prepare for upcoming opportunities",
};

export default async function DashboardPage() {
  // In a real app, you would get the user ID from the session
  const userId = "user123";
  const user = await getCurrentUser();

  // Redirect as they are not authenticated
  if (!user) {
    return redirect("/");
  }

  const dashboardData = await getUserDashboardData(userId);

  return (
    <div className="container mx-auto py-6 px-4 md:px-6 xl:px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <WelcomeBanner
            name={dashboardData.user.name}
            lastActive={dashboardData.user.lastActive}
          />

          <StatsOverview stats={dashboardData.stats} />

          {dashboardData.nextInterview && (
            <NextInterview interview={dashboardData.nextInterview} />
          )}

          <Suspense fallback={<DashboardSkeleton type="practice" />}>
            <PracticeInterviewSection
              recommendedPractice={dashboardData.recommendedPractice}
            />
          </Suspense>

          <Suspense fallback={<DashboardSkeleton type="results" />}>
            <RecentResults results={dashboardData.recentResults} />
          </Suspense>

          <Suspense fallback={<DashboardSkeleton type="interviews" />}>
            <SimilarInterviews
              interviews={dashboardData.similarInterviews}
              userSkills={dashboardData.user.skills}
            />
          </Suspense>
        </div>

        <div className="space-y-6">
          <NotificationCenter notifications={dashboardData.notifications} />

          <ProfileCompletion
            profile={dashboardData.user.profile}
            completionPercentage={dashboardData.profileCompletionPercentage}
          />

          <TipsResources resources={dashboardData.resources} />
        </div>
      </div>
    </div>
  );
}
