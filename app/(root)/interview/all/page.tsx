import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { getLatestInterviews } from "@/lib/actions/general.action";
import { PlusIcon } from "lucide-react";
import InterviewCard from "./_components/InterviewCard";

const Page = async () => {
  const user = await getCurrentUser();
  const allInterviews = await getLatestInterviews({
    userId: user?.id,
    limit: 10,
  });
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  console.log("all interviews: ", allInterviews);
  return (
    <div className="px-4 py-8 sm:px-6 lg:px-12">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div className="flex gap-3 items-center w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search interviews..."
            className="w-full sm:w-72 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-primary"
          />
          <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-primary">
            <option>All Status</option>
            <option>Upcoming</option>
            <option>Completed</option>
          </select>
        </div>
        <Button className="flex gap-2 items-center">
          <PlusIcon className="w-4 h-4" /> Schedule Interview
        </Button>
      </div>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
        {allInterviews?.map((interview, idx) => (
          <InterviewCard
            key={idx}
            company="Google"
            date={formatDate(interview.createdAt)}
            description="Contrary to popular belief, Lorem Ipsu consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source."
            role={interview.role}
            score={85}
            tech={interview.techstack}
            status="pending"
            time="2am"
          />
        ))}
      </div>
    </div>
  );
};

export default Page;
