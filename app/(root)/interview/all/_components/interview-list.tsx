"use client";
import InterviewCard from "@/components/interviews/interview-card";
import type { Interview } from "@/types/profile";
import { AnimatePresence, motion } from "motion/react";

interface InterviewListProps {
  interviews: Interview[];
}

export default function InterviewList({ interviews }: InterviewListProps) {
  if (interviews.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium">No interviews found</h3>
        <p className="text-muted-foreground">
          Try adjusting your filters or search criteria
        </p>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={interviews.map(i => i.id).join("-")} // changes key when content changes
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6"
      >
        {interviews.map(interview => (
          <InterviewCard key={interview.id} interview={interview} />
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
