// import { Button } from "@/components/ui/button";
// import { getCurrentUser } from "@/lib/actions/auth.action";
// import { getLatestInterviews } from "@/lib/actions/general.action";
// import { PlusIcon } from "lucide-react";
// import InterviewCard from "./_components/InterviewCard";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Input } from "@/components/ui/input";

// const Page = async () => {
//   const user = await getCurrentUser();
//   const allInterviews = await getLatestInterviews({
//     userId: user?.id,
//     limit: 10,
//   });
//   const formatDate = (dateStr: string) => {
//     const date = new Date(dateStr);
//     return new Intl.DateTimeFormat("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     }).format(date);
//   };

//   console.log("all interviews: ", allInterviews);
//   return (
//     <div className="px-4 py-8 sm:px-6 lg:px-12">
//       <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
//         <div className="flex gap-3 items-center w-full sm:w-auto">
//           <Select>
//             <SelectTrigger className="w-[180px]">
//               <SelectValue placeholder="All" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all">All</SelectItem>
//               <SelectItem value="upcoming">Upcoming</SelectItem>
//               <SelectItem value="completed">Completed</SelectItem>
//             </SelectContent>
//           </Select>
//           <Input
//             type="search"
//             placeholder="Search Interview"
//             className="sm:w-72 px-4 py-2 focus:outline-none"
//           />
//           <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-primary">
//             <option>All Status</option>
//             <option>Upcoming</option>
//             <option>Completed</option>
//           </select>
//         </div>
//         <Button className="flex gap-2 items-center">
//           <PlusIcon className="w-4 h-4" /> Schedule Interview
//         </Button>
//       </div>
//       <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
//         {allInterviews?.map((interview, idx) => (
//           <InterviewCard
//             key={idx}
//             company="Google"
//             date={formatDate(interview.createdAt)}
//             description="Contrary to popular belief, Lorem Ipsu consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source."
//             role={interview.role}
//             score={85}
//             tech={interview.techstack}
//             status="pending"
//             time="2am"
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Page;

import { Suspense } from "react";
import type { Metadata } from "next";
// import InterviewFilters from "@/components/interviews/interview-filters";
// import InterviewList from "@/components/interviews/interview-list";
// import InterviewListSkeleton from "@/components/interviews/interview-list-skeleton";
import { getInterviews } from "@/lib/data";
import InterviewFilters from "./_components/interview-filter";
import InterviewListSkeleton from "./_components/interview-list-skelaton";
import InterviewList from "./_components/interview-list";

export const metadata: Metadata = {
  title: "Interviews | AI Voice Interview Platform",
  description:
    "Browse and take interviews on our AI-powered voice interview platform",
};

export default async function InterviewsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // In a real app, you would pass these search params to your data fetching function
  const interviews = await getInterviews();

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Available Interviews</h1>
        <p className="text-muted-foreground">
          Browse through our collection of AI-powered interviews from top
          companies
        </p>
      </div>

      <InterviewFilters />

      <Suspense fallback={<InterviewListSkeleton />}>
        <InterviewList interviews={interviews} />
      </Suspense>
    </div>
  );
}
