"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  CalendarIcon,
  Clock,
  Eye,
  FileCheck,
  HelpCircle,
  Layers,
  Plus,
  Save,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";

import { MultiSelect } from "@/components/multi-select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { createInterview } from "@/lib/actions";
import { cn } from "@/lib/utils";
import { programmingLogosList } from "@/public/TechIcons/programmingLogosList";
import InterviewPreview from "./interview-preview";
import InterviewCard from "@/app/(root)/interview/all/_components/interview-card";

// Define the form schema with Zod
const formSchema = z.object({
  type: z.enum(["Voice", "Coding", "Mix"]),
  area: z.string().optional(),
  techStack: z.array(z.string()).optional(),
  level: z.enum(["Easy", "Medium", "Hard"]),
  description: z.string().min(10, "Description must be at least 10 characters"),
  dateType: z.enum(["Current", "Future"]),
  scheduledDate: z.date().optional(),
  duration: z.enum(["Limited", "Permanent"]),
  durationPeriod: z.number().optional(),
  invitedCandidates: z.array(z.string()).optional(),
  category: z.enum(["TECHNICAL", "NON_TECHNICAL", "BEHAVIORAL", "CUSTOM"]),
  status: z.enum(["DRAFT", "PUBLISHED"]),
  durationLimit: z.number().min(5, "Duration must be at least 5 minutes"),
  numberOfQuestions: z.number().min(1, "At least 1 question is required"),
  questions: z
    .array(
      z.object({
        question: z.string().min(5, "Question must be at least 5 characters"),
        expectedAnswer: z.string().optional(),
      })
    )
    .optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function ManualInterviewForm() {
  const router = useRouter();
  const [formCompletion, setFormCompletion] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>([]);

  // Initialize the form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "Voice",
      level: "Medium",
      dateType: "Current",
      duration: "Permanent",
      category: "TECHNICAL",
      status: "DRAFT",
      durationLimit: 30,
      numberOfQuestions: 5,
      questions: [{ question: "", expectedAnswer: "" }],
      invitedCandidates: [],
    },
  });

  const watchType = form.watch("type");
  const watchDateType = form.watch("dateType");
  const watchDuration = form.watch("duration");
  //   const watchNumberOfQuestions = form.watch("numberOfQuestions")
  const watchQuestions = form.watch("questions");
  const formValues = form.watch();

  // Calculate form completion percentage
  useEffect(() => {
    const requiredFields = [
      "type",
      "level",
      "description",
      "dateType",
      "duration",
      "category",
      "status",
      "durationLimit",
      "numberOfQuestions",
    ];

    let filledFields = 0;
    requiredFields.forEach((field) => {
      if (formValues[field as keyof FormValues]) filledFields++;
    });

    // Check conditional fields
    if (watchType === "Voice" && formValues.area) filledFields++;
    if (
      watchType === "Coding" &&
      formValues.techStack &&
      formValues.techStack.length > 0
    )
      filledFields++;
    if (watchDateType === "Future" && formValues.scheduledDate) filledFields++;
    if (watchDuration === "Limited" && formValues.durationPeriod)
      filledFields++;

    // Check questions
    const questionsCount =
      formValues.questions?.filter((q) => q.question.length >= 5).length || 0;
    const questionsPercentage = Math.min(
      questionsCount / (formValues.numberOfQuestions || 1),
      1
    );

    // Calculate total percentage
    const basePercentage = (filledFields / (requiredFields.length + 2)) * 0.7; // Base fields are 70% of completion
    const questionPercentage = questionsPercentage * 0.3; // Questions are 30% of completion

    setFormCompletion(Math.round((basePercentage + questionPercentage) * 100));
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
  const onSubmit = async (data: FormValues) => {
    try {
      setIsSubmitting(true);
      // In a real app, you would call an API to create the interview
      const result = await createInterview(data);

      // Navigate to success page with the interview ID
      router.push(`/interview/create/success?id=${result.id}`);
    } catch (error) {
      console.error("Error creating interview:", error);
      setIsSubmitting(false);
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Easy":
        return `
          bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 peer-checked:border-emerald-600
          dark:bg-emerald-800 dark:text-white dark:border-emerald-600 dark:hover:bg-emerald-700 dark:peer-checked:border-white
        `;
      case "Medium":
        return `
          bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 peer-checked:border-amber-600
          dark:bg-amber-800 dark:text-white dark:border-amber-600 dark:hover:bg-amber-700 dark:peer-checked:border-white
        `;
      case "Hard":
        return `
          bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100 peer-checked:border-rose-600
          dark:bg-rose-800 dark:text-white dark:border-rose-600 dark:hover:bg-rose-700 dark:peer-checked:border-white
        `;
      case "Expert":
        return `
          bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100 peer-checked:border-indigo-600
          dark:bg-indigo-800 dark:text-white dark:border-indigo-600 dark:hover:bg-indigo-700 dark:peer-checked:border-white
        `;
      default:
        return `
          bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100 peer-checked:border-gray-600
          dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:peer-checked:border-white
        `;
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
                        <FormField
                          control={form.control}
                          name="type"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Interview Type</FormLabel>
                              <div className="flex flex-wrap gap-2 w-full">
                                {["Voice", "Coding", "Mix"].map((type) => (
                                  <div key={type} className="w-full sm:w-auto flex-1 min-w-[120px]">
                                    <input
                                      type="radio"
                                      id={`type-${type}`}
                                      value={type}
                                      checked={field.value === type}
                                      onChange={() => field.onChange(type)}
                                      className="peer sr-only"
                                    />
                                    <label
                                      htmlFor={`type-${type}`}
                                      className="flex flex-col items-center justify-center h-24 rounded-lg border-2 border-muted bg-popover p-2 
                    hover:bg-accent hover:text-accent-foreground 
                    peer-checked:border-primary 
                    peer-checked:bg-accent/50 
                    peer-checked:text-primary 
                    transition-colors !cursor-pointer"
                                    >
                                      <div className="mb-2 rounded-full bg-primary/10 p-1">
                                        {type === "Voice" && (
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="text-primary"
                                          >
                                            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                                            <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                                            <line
                                              x1="12"
                                              x2="12"
                                              y1="19"
                                              y2="22"
                                            ></line>
                                          </svg>
                                        )}
                                        {type === "Coding" && (
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="text-primary"
                                          >
                                            <polyline points="16 18 22 12 16 6"></polyline>
                                            <polyline points="8 6 2 12 8 18"></polyline>
                                          </svg>
                                        )}
                                        {type === "Mix" && (
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="text-primary"
                                          >
                                            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                                            <path d="M13 7a2 2 0 0 1 5 0v10a2 2 0 0 1-5 0V7Z"></path>
                                          </svg>
                                        )}
                                      </div>
                                      <div className="text-sm font-medium">{type}</div>
                                    </label>
                                  </div>
                                ))}
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Difficulty Level - full row */}
                      <div className="w-full">
                        <FormField
                          control={form.control}
                          name="level"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Difficulty Level</FormLabel>
                              <div className="flex flex-wrap gap-2 w-full">
                                {["Easy", "Medium", "Hard", "Expert"].map((level) => (
                                  <div key={level} className="w-full sm:w-auto flex-1 min-w-[100px]">
                                    <input
                                      type="radio"
                                      id={`level-${level}`}
                                      value={level}
                                      checked={field.value === level}
                                      onChange={() => field.onChange(level)}
                                      className="peer sr-only"
                                    />
                                    <label
                                      htmlFor={`level-${level}`}
                                      className={cn(
                                        "flex h-10 items-center justify-center rounded-md border text-sm transition-colors hover:bg-muted peer-checked:border-primary peer-checked:text-primary !cursor-pointer",
                                        getLevelColor(level)
                                      )}
                                    >
                                      {level}
                                    </label>
                                  </div>
                                ))}
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
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
                          <FormField
                            control={form.control}
                            name="area"
                            render={({ field }) => (
                              <FormItem className="w-full p-1">
                                <FormLabel>Interview Title</FormLabel>
                                <FormControl>
                                  <input
                                    type="text"
                                    {...field}
                                    placeholder="eg: software engineer"
                                    className="h-10 w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
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
                          <FormField
                            control={form.control}
                            name="techStack"
                            render={() => (
                              <FormItem>
                                <div className="mb-4">
                                  <FormLabel>Tech Stack</FormLabel>
                                  <FormDescription>
                                    Select the technologies relevant to this
                                    interview.
                                  </FormDescription>
                                </div>
                                <div className="w-full">
                                  {/* MultiSelect component to replace the checkbox grid */}
                                  <MultiSelect
                                    options={programmingLogosList}
                                    value={selectedFrameworks} // current selected value
                                    onValueChange={setSelectedFrameworks} // update selected values
                                    placeholder="Select frameworks"
                                    variant="inverted"
                                    animation={2}
                                    maxCount={4} // limit number of items selected
                                  />
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Provide a detailed description of the interview"
                              className="resize-none min-h-[120px] max-h-[420px]"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            This will be shown to candidates before they start
                            the interview.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Scheduling & Duration */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 text-lg font-medium">
                      <Clock className="h-5 w-5 text-primary" />
                      <h3>Scheduling & Duration</h3>
                    </div>

                    {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="dateType"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel>Availability</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col space-y-1"
                              >
                                <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-3 hover:bg-muted">
                                  <FormControl>
                                    <RadioGroupItem value="Current" />
                                  </FormControl>
                                  <FormLabel className="font-normal cursor-pointer">
                                    Available immediately
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-3 hover:bg-muted">
                                  <FormControl>
                                    <RadioGroupItem value="Future" />
                                  </FormControl>
                                  <FormLabel className="font-normal cursor-pointer">
                                    Schedule for future date
                                  </FormLabel>
                                </FormItem>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="duration"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel>Availability Duration</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col space-y-1"
                              >
                                <div className="flex items-center space-x-3 space-y-0 rounded-md border p-3 hover:bg-muted cursor-pointer" onClick={() => field.onChange("Permanent")}>
                                  <FormControl>
                                    <RadioGroupItem value="Permanent" />
                                  </FormControl>
                                  <FormLabel className="font-normal cursor-pointer">
                                    Permanently available
                                  </FormLabel>
                                </div>
                                <div className="flex items-center space-x-3 space-y-0 rounded-md border p-3 hover:bg-muted cursor-pointer" onClick={() => field.onChange("Limited")}>
                                  <FormControl>
                                    <RadioGroupItem value="Limited" />
                                  </FormControl>
                                  <FormLabel className="font-normal cursor-pointer">
                                    Limited time period
                                  </FormLabel>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <AnimatePresence>
                        {watchDateType === "Future" && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <FormField
                              control={form.control}
                              name="scheduledDate"
                              render={({ field }) => (
                                <FormItem className="flex flex-col">
                                  <FormLabel>Scheduled Date</FormLabel>
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <FormControl>
                                        <Button
                                          variant={"outline"}
                                          className={cn(
                                            "!w-full pl-3 text-left font-normal",
                                            !field.value &&
                                            "text-muted-foreground"
                                          )}
                                        >
                                          {field.value ? (
                                            format(field.value, "PPP")
                                          ) : (
                                            <span>Pick a date</span>
                                          )}
                                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                      </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent
                                      className="w-full sm:w-auto p-0"
                                      align="start"
                                    >
                                      <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) => date < new Date()}
                                        // initialFocus
                                        autoFocus
                                        className="rounded-md border shadow"
                                      />
                                    </PopoverContent>
                                  </Popover>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <AnimatePresence>
                        {watchDuration === "Limited" && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden col-span-1"
                          >
                            <FormField
                              control={form.control}
                              name="durationPeriod"
                              render={({ field }) => (
                                <FormItem className="w-full">
                                  <FormLabel>Duration Period (days)</FormLabel>
                                  <FormControl>
                                    <Input
                                      type="number"
                                      min={1}
                                      className="w-full"
                                      {...field}
                                      onChange={(e) =>
                                        field.onChange(
                                          Number.parseInt(e.target.value)
                                        )
                                      }
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div> */}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Availability */}
                      <FormField
                        control={form.control}
                        name="dateType"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel>Availability</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col space-y-1"
                              >
                                <FormItem
                                  className="flex items-center space-x-3 space-y-0 rounded-md border p-3 hover:bg-muted cursor-pointer"
                                  onClick={() => field.onChange("Current")}
                                >
                                  <FormControl>
                                    <RadioGroupItem
                                      value="Current"
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal cursor-pointer">
                                    Available immediately
                                  </FormLabel>
                                </FormItem>

                                <FormItem
                                  className="flex items-center space-x-3 space-y-0 rounded-md border p-3 hover:bg-muted cursor-pointer"
                                  onClick={() => field.onChange("Future")}
                                >
                                  <FormControl>
                                    <RadioGroupItem
                                      value="Future"
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal cursor-pointer">
                                    Schedule for future date
                                  </FormLabel>
                                </FormItem>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Availability Duration */}
                      <FormField
                        control={form.control}
                        name="duration"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel>Availability Duration</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col space-y-1"
                              >
                                <FormItem
                                  className="flex items-center space-x-3 space-y-0 rounded-md border p-3 hover:bg-muted cursor-pointer"
                                  onClick={() => field.onChange("Permanent")}
                                >
                                  <FormControl>
                                    <RadioGroupItem
                                      value="Permanent"
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal cursor-pointer">
                                    Permanently available
                                  </FormLabel>
                                </FormItem>

                                <FormItem
                                  className="flex items-center space-x-3 space-y-0 rounded-md border p-3 hover:bg-muted cursor-pointer"
                                  onClick={() => field.onChange("Limited")}
                                >
                                  <FormControl>
                                    <RadioGroupItem
                                      value="Limited"
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal cursor-pointer">
                                    Limited time period
                                  </FormLabel>
                                </FormItem>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

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
                            <FormField
                              control={form.control}
                              name="scheduledDate"
                              render={({ field }) => (
                                <FormItem className="flex flex-col">
                                  <FormLabel>Scheduled Date</FormLabel>
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <FormControl>
                                        <Button
                                          variant={"outline"}
                                          className={cn(
                                            "!w-full pl-3 text-left font-normal",
                                            !field.value && "text-muted-foreground"
                                          )}
                                        >
                                          {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                      </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent
                                      className="w-full sm:w-auto p-0"
                                      align="start"
                                    >
                                      <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) => date < new Date()}
                                        autoFocus
                                        className="rounded-md border shadow"
                                      />
                                    </PopoverContent>
                                  </Popover>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
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
                            <FormField
                              control={form.control}
                              name="durationPeriod"
                              render={({ field }) => (
                                <FormItem className="w-full">
                                  <FormLabel>Duration Period (days)</FormLabel>
                                  <FormControl>
                                    <Input
                                      type="number"
                                      min={1}
                                      className="w-full"
                                      {...field}
                                      onChange={(e) =>
                                        field.onChange(Number.parseInt(e.target.value))
                                      }
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="durationLimit"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Interview Duration (minutes)</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  type="number"
                                  min={5}
                                  {...field}
                                  onChange={(e) =>
                                    field.onChange(
                                      Number.parseInt(e.target.value)
                                    )
                                  }
                                  className="pr-12"
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-sm text-muted-foreground">
                                  min
                                </div>
                              </div>
                            </FormControl>
                            <FormDescription>
                              The maximum time allowed for the interview.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="numberOfQuestions"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Number of Questions</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min={1}
                                max={20}
                                {...field}
                                onChange={(e) =>
                                  field.onChange(
                                    Number.parseInt(e.target.value)
                                  )
                                }
                              />
                            </FormControl>
                            <FormDescription>
                              How many questions will be asked during the
                              interview.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
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
                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel>Category</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="TECHNICAL">
                                  Technical
                                </SelectItem>
                                <SelectItem value="NON_TECHNICAL">
                                  Non-Technical
                                </SelectItem>
                                <SelectItem value="BEHAVIORAL">
                                  Behavioral
                                </SelectItem>
                                <SelectItem value="CUSTOM">Custom</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel>Status</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="DRAFT">Draft</SelectItem>
                                <SelectItem value="PUBLISHED">
                                  Published
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              Draft interviews are not visible to candidates.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Questions */}
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-lg font-medium">
                        <HelpCircle className="h-5 w-5 text-primary" />
                        <h3>Questions</h3>
                      </div>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={addQuestion}
                              className="gap-1"
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

                                  <FormField
                                    control={form.control}
                                    name={`questions.${index}.question`}
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Question</FormLabel>
                                        <FormControl>
                                          <Textarea
                                            placeholder="Enter your question"
                                            className="resize-none"
                                            {...field}
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />

                                  <FormField
                                    control={form.control}
                                    name={`questions.${index}.expectedAnswer`}
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>
                                          Expected Answer (Optional)
                                        </FormLabel>
                                        <FormControl>
                                          <Textarea
                                            placeholder="Enter the expected answer or key points"
                                            className="resize-none"
                                            {...field}
                                          />
                                        </FormControl>
                                        <FormDescription>
                                          This will be used for evaluation but
                                          not shown to candidates.
                                        </FormDescription>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
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
                <InterviewCard
                  interview={{
                    id: "1",
                    companyName: "Apple",
                    companyLogo: "apple.com",
                    name: "MERN Stack Developer",
                    type: "Technical",
                    coding: true,
                    level: "Medium",
                    score: null,
                    date: {
                      type: "permanent",
                      value: "Always available",
                    },
                    description:
                      "This interview assesses your proficiency with the MERN stack (MongoDB, Express.js, React, Node.js) and your ability to build full-stack web applications.",
                    techStack: ["MongoDB", "Express.js", "React", "Node.js"],
                    completed: false,
                  }}
                />
                <InterviewPreview formData={form.getValues()} techStack={selectedFrameworks} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
