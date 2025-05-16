// import CreateCustomInterview from "@/components/CreateCustomInterview";
// import React from "react";

// const page = () => {
//   return (
//     <>
//       <CreateCustomInterview goToNextStep={2} />
//     </>
//   );
// };

// export default page;
import type { Metadata } from "next";
import ManualInterviewForm from "@/components/interviews/creation/manual-interview-form";

export const metadata: Metadata = {
  title: "Manual Interview Creation | AI Voice Interview Platform",
  description: "Create a custom interview with detailed configuration options",
};

export default function ManualInterviewCreationPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-2">Manual Interview Creation</h1>
      <p className="text-muted-foreground mb-8">
        Configure every aspect of your interview with our detailed form
      </p>
      <ManualInterviewForm />
    </div>
  );
}
