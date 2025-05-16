"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormDescription
} from "@/components/ui/form";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { createInterview } from "@/lib/actions";
import { ManualInterviewGenerationFormSchema, ManualInterviewGenerationFormValues } from "@/lib/schemas/manualInterviewGenerationForm";
import { useUserStore } from "@/lib/store/useUserStore";
import { cn, } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  Clock,
  Eye,
  FileCheck,
  HelpCircle,
  Layers,
  Plus,
  Save,
  Trash2
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import InterviewDetails from "../details/interview-details";
import InterviewCard from "../interview-card";
import { DescriptionInput } from "./interview-form/descriptionInput";
import { DifficultyLevelSelector } from "./interview-form/difficultyLevelSelector";
import { InterviewAvailability } from "./interview-form/interviewAvailability";
import { InterviewAvailabilityDuration } from "./interview-form/InterviewAvailabilityDuration";
import { InterviewCategory } from "./interview-form/interviewCategory";
import { InterviewDurationLimit } from "./interview-form/interviewDurationLimit";
import { InterviewExpectedAnswer } from "./interview-form/interviewExpectedAnswer";
import { InterviewQuestions } from "./interview-form/interviewQuestions";
import { InterviewScheduledDate } from "./interview-form/interviewScheduledDate";
import { InterviewScheduledDuration } from "./interview-form/interviewScheduledDuration";
import { InterviewTechStack } from "./interview-form/interviewTechStack";
import { InterviewTitle } from "./interview-form/interviewTitle";
import { InterviewTypeSelector } from "./interview-form/interviewTypeSelector";
import { NumberOfQuestionsInInterview } from "./interview-form/numberOfQuestionsInInterview";

export default function ManualInterviewForm() {
  const router = useRouter();
  const [formCompletion, setFormCompletion] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>([]);
  const { user } = useUserStore(state => state)

  // Initialize the form
  const form = useForm<ManualInterviewGenerationFormValues>({
    resolver: zodResolver(ManualInterviewGenerationFormSchema),
    defaultValues: {
      type: "Voice",
      level: "Medium",

      date: {
        interviewTimming: "Current",
        availabilityDuration: "Permanent",
        scheduledDate: new Date(),
        durationPeriod: null,
      },

      category: "TECHNICAL",
      durationLimit: 30,
      numberOfQuestions: 5,
      questions: [{ question: "", expectedAnswer: "" }],
      invitedCandidates: [],
    },
  });

  const watchType = form.watch("type");
  const watchDateType = form.watch("date.interviewTimming");
  const watchDuration = form.watch("date.availabilityDuration");
  const watchQuestions = form.watch("questions");
  const formValues = form.watch();

  // Calculate form completion percentage
  useEffect(() => {
    const requiredFields = [
      "type",
      "title",
      "level",
      "description",
      "interviewTimming",
      "category",
      "durationLimit",
      "numberOfQuestions",
    ];

    let filledFields = 0;
    requiredFields.forEach((field) => {
      if (formValues[field as keyof ManualInterviewGenerationFormValues]) filledFields++;
    });

    // Check conditional fields
    if ((watchType === "Voice" || watchType === "Coding" || watchType === "Mix") && formValues.title) filledFields++;
    if (selectedFrameworks.length > 0) filledFields++;
    if (watchDateType === "Future" || watchDateType === "Current" && formValues.date.scheduledDate) filledFields++;
    // if (watchDuration === "Limited" || watchDuration === "Permanent" && formValues.date.durationPeriod)
    //   filledFields++;

    // Calculate total percentage
    const totalRequiredFields = requiredFields.length + 2; // Adjust for conditional fields
    const basePercentage = (filledFields / totalRequiredFields) * 100; // Ensure max is 100%

    setFormCompletion(Math.min(Math.round(basePercentage), 100)); // Cap at 100%
  }, [formValues, watchType, watchDateType, watchDuration]);

  // Add a new question field
  const addQuestion = () => {
    const currentQuestions = form.getValues("questions") || [];
    form.setValue("questions", [
      ...currentQuestions,
      { question: "", expectedAnswer: "" },
    ]);
  };

  // Remove a question field
  const removeQuestion = (index: number) => {
    const currentQuestions = form.getValues("questions") || [];
    form.setValue(
      "questions",
      currentQuestions.filter((_, i) => i !== index)
    );
  };

  // Handle form submission
  const onSubmit = async (data: ManualInterviewGenerationFormValues) => {
    try {
      setIsSubmitting(true);
      const interviewData = {
        ...data,
        title: data.title ?? "", // Ensure title is always a string
        techStack: selectedFrameworks,
        userId: user?.id ?? "",
        createdAt: new Date().toISOString(),
        completed: false, // Default completed status
        date: {
          interviewTimming: data.date.interviewTimming.toLowerCase() as "current" | "future",
          avialabilityDuration: data.date.availabilityDuration.toLowerCase() as "limited" | "permanent",
          scheduledDate: data.date.scheduledDate ? data.date.scheduledDate.toISOString() : null,
          durationPeriod: data.date.durationPeriod ?? undefined,
        },
        questions: (data.questions ?? []).map(q => ({
          question: q.question ?? "",
          expectedAnswer: q.expectedAnswer,
        })),
      }
      const result = await createInterview(interviewData);
      const basePath = user?.role === "recruiter" ? `/recruiter/interview/create/success?id=${result.id}` : `/interview/create/success?id=${result.id}`;

      // Navigate to success page with the interview ID
      router.push(basePath);
    } catch (error) {
      console.error("Error creating interview:", error);
      setIsSubmitting(false);
    } finally {
      setIsSubmitting(false); // Ensures it resets on both success and failure
    }
  };


  return (
    <div className=" mx-auto">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Form Section */}
        <div className="flex-1">
          <div className="sticky top-4">
            <div className="bg-background rounded-xl shadow-sm border p-6 mb-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Create Interview</h2>
                <div className="flex items-center gap-2">
                  <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={cn(
                        "h-full transition-all duration-500 ease-out",
                        formCompletion < 30
                          ? "bg-rose-500"
                          : formCompletion < 70
                            ? "bg-amber-500"
                            : "bg-emerald-500"
                      )}
                      style={{ width: `${formCompletion}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium">{formCompletion}%</span>
                </div>
              </div>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  {/* Basic Interview Details */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 text-lg font-medium text-gray-900 dark:text-white">
                      <Layers className="h-5 w-5 text-primary" />
                      <h3>Basic Details</h3>
                    </div>

                    <div className="space-y-6">
                      {/* Interview Type - full row */}
                      <div className="w-full">
                        <InterviewTypeSelector form={form} />
                      </div>

                      {/* Difficulty Level - full row */}
                      <div className="w-full">
                        <DifficultyLevelSelector form={form} />
                      </div>
                    </div>

                    <AnimatePresence>
                      {(watchType === "Voice" || watchType === "Mix" || watchType === "Coding") && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <InterviewTitle form={form} />
                        </motion.div>
                      )}
                    </AnimatePresence>


                    <AnimatePresence>
                      {(watchType === "Coding" || watchType === "Mix" || watchType === "Voice") && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <InterviewTechStack
                            form={form}
                            selectedFrameworks={selectedFrameworks}
                            setSelectedFrameworks={setSelectedFrameworks}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <DescriptionInput form={form} />
                  </div>

                  {/* Scheduling & Duration */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 text-lg font-medium">
                      <Clock className="h-5 w-5 text-primary" />
                      <h3>Scheduling & Duration</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Availability */}
                      <InterviewAvailability form={form} />

                      {/* Availability Duration */}
                      <InterviewAvailabilityDuration form={form} />

                      {/* Show Scheduled Date when "Future" is selected */}
                      <AnimatePresence>
                        {watchDateType === "Future" && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <InterviewScheduledDate form={form} />
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Show Duration Period when "Limited" is selected */}
                      <AnimatePresence>
                        {watchDuration === "Limited" && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden col-span-1"
                          >
                            <InterviewScheduledDuration form={form} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <InterviewDurationLimit form={form} />

                      <NumberOfQuestionsInInterview form={form} />
                    </div>
                  </div>

                  {/* Classification */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 text-lg font-medium">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary"
                      >
                        <path d="M9 3H5a2 2 0 0 0-2 2v4"></path>
                        <path d="M9 21H5a2 2 0 0 1-2-2v-4"></path>
                        <path d="M19 3h4a2 2 0 0 1 2 2v4"></path>
                        <path d="M19 21h4a2 2 0 0 0 2-2v-4"></path>
                        <path d="M9 9H3"></path>
                        <path d="M9 15H3"></path>
                        <path d="M21 9h-6"></path>
                        <path d="M21 15h-6"></path>
                        <path d="M9 9a3 3 0 0 0 6 0"></path>
                        <path d="M9 15a3 3 0 0 0 6 0"></path>
                      </svg>
                      <h3>Classification</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <InterviewCategory form={form} />
                    </div>
                  </div>

                  {/* Questions */}
                  <div className="space-y-6">

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-lg font-medium">
                        <HelpCircle className="h-5 w-5 text-primary" />
                        <h3>Sample Questions (optional)</h3>
                      </div>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={addQuestion}
                              className="gap-1 cursor-pointer"
                            >
                              <Plus className="h-4 w-4" /> Add Question
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Add a new question to the interview</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <FormDescription>
                      Sample Questions help candidates prepare for the interview. You can add multiple questions, and they will be displayed in the interview details. These questions are not part of the actual interview.
                    </FormDescription>

                    <div className="space-y-4">
                      <AnimatePresence>
                        {watchQuestions &&
                          watchQuestions.map((_, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{
                                opacity: 0,
                                height: 0,
                                overflow: "hidden",
                              }}
                              transition={{ duration: 0.3 }}
                            >
                              <Card className="overflow-hidden border-l-4 border-l-primary">
                                <CardContent className="p-4 space-y-4">
                                  <div className="flex items-center justify-between">
                                    <h4 className="font-medium flex items-center gap-2">
                                      <Badge
                                        variant="outline"
                                        className="rounded-full h-6 w-6 p-0 flex items-center justify-center"
                                      >
                                        {index + 1}
                                      </Badge>
                                      Question {index + 1}
                                    </h4>
                                    {index > 0 && (
                                      <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => removeQuestion(index)}
                                        className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    )}
                                  </div>


                                  <InterviewQuestions form={form} index={index} />

                                  <InterviewExpectedAnswer form={form} index={index} />
                                </CardContent>
                              </Card>
                            </motion.div>
                          ))}
                      </AnimatePresence>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-6">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => router.back()}
                      className="gap-2 w-full sm:w-auto"
                    >
                      <ArrowLeft className="h-4 w-4" /> Back
                    </Button>
                    <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() =>
                          form.handleSubmit(() => form.trigger())()
                        }
                        className="gap-2 w-full sm:w-auto"
                      >
                        <Save className="h-4 w-4" /> Save Draft
                      </Button>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="gap-2 w-full sm:w-auto"
                      >
                        {isSubmitting ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-2 h-4 w-4"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Creating...
                          </>
                        ) : (
                          <>
                            <FileCheck className="h-4 w-4" /> Create Interview
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>

        {/* Preview Section */}
        <div className="w-full lg:w-[450px]">
          <div className="sticky top-4">
            <div className="bg-background rounded-xl shadow-sm border p-6 mb-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Preview</h2>
                <Badge variant="outline" className="gap-1">
                  <Eye className="h-3 w-3" /> Live
                </Badge>
              </div>
              <div className="overflow-auto max-h-[calc(100vh-150px)] pr-2 -mr-2">
                <div className="overflow-visible">
                  <InterviewCard
                    formData={form.getValues()}
                    techStackPreview={selectedFrameworks}
                  />
                </div>
                <div className="mt-6">
                  <InterviewDetails formData={form.getValues()} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
