import { BreadCrumb } from "@/components/BreadCrumb";
import FAQSection from "@/components/FAQSection";
import FeaturesSection from "@/components/FeaturesSection";
import HeroSection from "@/components/HeroSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import InterviewCard from "@/components/InterviewCard";
import PricingSection from "@/components/PricingSection";
import { getCurrentUser } from "@/lib/actions/auth.action";
import {
  getInterviewsByUserId,
  getLatestInterviews,
} from "@/lib/actions/general.action";

const Page = async () => {
  const user = await getCurrentUser();
  const [userInterviews, latestInterviews] = await Promise.all([
    getInterviewsByUserId(user?.id!),
    getLatestInterviews({ userId: user?.id! }),
  ]);

  const hasPastInterviews = userInterviews?.length > 0;
  const hasUpcomingInterviews = latestInterviews?.length > 0;
  return (
    <>
      {!user && (
        <>
          <HeroSection />
          <FeaturesSection />
          <HowItWorksSection />
          <PricingSection />
          <FAQSection />
        </>
      )}
      <section className="flex flex-col gap-6">
        <h2>Your Interviews</h2>
        {/* <BreadCrumb items={[{ name: "Home", href: "/" }]} /> */}
        <div className="interviews-section">
          {hasPastInterviews ? (
            userInterviews?.map((interview) => (
              <InterviewCard {...interview} key={interview.id} />
            ))
          ) : (
            <p>You haven&apos;t taken any interviews yet</p>
          )}
          {/* <p>You haven&apos;t taken any interviews yet</p> */}
        </div>
      </section>
      <section className="flex flex-col gap-6 mt-8">
        <h2>Taken an Interview</h2>
        <div className="interviews-section">
          {hasUpcomingInterviews ? (
            latestInterviews?.map((interview) => (
              <InterviewCard {...interview} key={interview.id} />
            ))
          ) : (
            <p>There are no new interviews available</p>
          )}
        </div>
      </section>
    </>
  );
};

export default Page;
