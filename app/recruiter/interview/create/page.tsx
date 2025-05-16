// import CreateCustomInterview from "@/components/CreateCustomInterview";
// import React from "react";

// const page = () => {
//   return (
//     <>
//       <CreateCustomInterview />
//     </>
//   );
// };

// export default page;

import type { Metadata } from "next"
import InterviewCreationOptions from "@/components/interviews/creation/interview-creation-options"

export const metadata: Metadata = {
  title: "Create Interview | AI Voice Interview Platform",
  description: "Create a new interview using AI assistance or manual configuration",
}

export default function CreateInterviewPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-2">Create New Interview</h1>
      <p className="text-muted-foreground mb-8">
        Choose how you&apos;d like to create your interview - with AI assistance or manual configuration
      </p>

      <InterviewCreationOptions />
    </div>
  )
}
