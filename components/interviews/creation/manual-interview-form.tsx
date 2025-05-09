"use client"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { createInterview } from "@/lib/actions"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon, Plus, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import InterviewPreview from "./interview-preview"

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
            }),
        )
        .optional(),
})

type FormValues = z.infer<typeof formSchema>

export default function ManualInterviewForm() {
    const router = useRouter()
    const [activeTab, setActiveTab] = useState("form")

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
    })

    const watchType = form.watch("type")
    const watchDateType = form.watch("dateType")
    const watchDuration = form.watch("duration")
    // const watchNumberOfQuestions = form.watch("numberOfQuestions")
    const watchQuestions = form.watch("questions")

    // Add a new question field
    const addQuestion = () => {
        const currentQuestions = form.getValues("questions") || []
        form.setValue("questions", [...currentQuestions, { question: "", expectedAnswer: "" }])
    }

    // Remove a question field
    const removeQuestion = (index: number) => {
        const currentQuestions = form.getValues("questions") || []
        form.setValue(
            "questions",
            currentQuestions.filter((_, i) => i !== index),
        )
    }

    // Handle form submission
    const onSubmit = async (data: FormValues) => {
        try {
            // In a real app, you would call an API to create the interview
            const result = await createInterview(data)

            // Navigate to success page with the interview ID
            router.push(`/interviews/create/success?id=${result.id}`)
        } catch (error) {
            console.error("Error creating interview:", error)
        }
    }

    return (
        <div className="max-w-6xl mx-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="form">Form</TabsTrigger>
                    <TabsTrigger value="preview">Preview</TabsTrigger>
                </TabsList>

                <TabsContent value="form" className="mt-6">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-6">
                                    <FormField
                                        control={form.control}
                                        name="type"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Interview Type</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Select interview type" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="Voice">Voice</SelectItem>
                                                        <SelectItem value="Coding">Coding</SelectItem>
                                                        <SelectItem value="Mix">Mix</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormDescription>The type of interview determines the format and questions.</FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {(watchType === "Voice" || watchType === "Mix") && (
                                        <FormField
                                            control={form.control}
                                            name="area"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Interview Area</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger className="w-full">
                                                                <SelectValue placeholder="Select area" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="Management">Management</SelectItem>
                                                            <SelectItem value="HR">HR</SelectItem>
                                                            <SelectItem value="Sales">Sales</SelectItem>
                                                            <SelectItem value="Purchase">Purchase</SelectItem>
                                                            <SelectItem value="Marketing">Marketing</SelectItem>
                                                            <SelectItem value="Engineering">Engineering</SelectItem>
                                                            <SelectItem value="Design">Design</SelectItem>
                                                            <SelectItem value="Finance">Finance</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    )}

                                    {(watchType === "Coding" || watchType === "Mix") && (
                                        <FormField
                                            control={form.control}
                                            name="techStack"
                                            render={() => (
                                                <FormItem>
                                                    <div className="mb-4">
                                                        <FormLabel>Tech Stack</FormLabel>
                                                        <FormDescription>Select the technologies relevant to this interview.</FormDescription>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-2">
                                                        {["JS", "React", "Node", "Angular", "CSS", "TS", "Python", "Java", "C#", "PHP"].map(
                                                            (tech) => (
                                                                <FormField
                                                                    key={tech}
                                                                    control={form.control}
                                                                    name="techStack"
                                                                    render={({ field }) => {
                                                                        return (
                                                                            <FormItem key={tech} className="flex flex-row items-start space-x-3 space-y-0">
                                                                                <FormControl>
                                                                                    <Checkbox
                                                                                        checked={field.value?.includes(tech)}
                                                                                        onCheckedChange={(checked) => {
                                                                                            const current = field.value || []
                                                                                            return checked
                                                                                                ? field.onChange([...current, tech])
                                                                                                : field.onChange(current.filter((value) => value !== tech))
                                                                                        }}
                                                                                    />
                                                                                </FormControl>
                                                                                <FormLabel className="font-normal">{tech}</FormLabel>
                                                                            </FormItem>
                                                                        )
                                                                    }}
                                                                />
                                                            ),
                                                        )}
                                                    </div>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    )}

                                    <FormField
                                        control={form.control}
                                        name="level"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Difficulty Level</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Select difficulty level" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="Easy">Easy</SelectItem>
                                                        <SelectItem value="Medium">Medium</SelectItem>
                                                        <SelectItem value="Hard">Hard</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="description"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Description</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Provide a detailed description of the interview"
                                                        className="resize-none"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormDescription>
                                                    This will be shown to candidates before they start the interview.
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="space-y-6">
                                    <FormField
                                        control={form.control}
                                        name="dateType"
                                        render={({ field }) => (
                                            <FormItem className="space-y-3">
                                                <FormLabel>Date</FormLabel>
                                                <FormControl>
                                                    <RadioGroup
                                                        onValueChange={field.onChange}
                                                        defaultValue={field.value}
                                                        className="flex flex-col space-y-1"
                                                    >
                                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                                            <FormControl>
                                                                <RadioGroupItem value="Current" className="!cursor-pointer" />
                                                            </FormControl>
                                                            <FormLabel className="font-normal !cursor-pointer">Available immediately</FormLabel>
                                                        </FormItem>
                                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                                            <FormControl>
                                                                <RadioGroupItem value="Future" className="!cursor-pointer" />
                                                            </FormControl>
                                                            <FormLabel className="font-normal !cursor-pointer">Schedule for future date</FormLabel>
                                                        </FormItem>
                                                    </RadioGroup>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {watchDateType === "Future" && (
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
                                                                        "w-full pl-3 text-left font-normal",
                                                                        !field.value && "text-muted-foreground",
                                                                    )}
                                                                >
                                                                    {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                                </Button>
                                                            </FormControl>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-auto p-0" align="start">
                                                            <Calendar
                                                                mode="single"
                                                                selected={field.value}
                                                                onSelect={field.onChange}
                                                                disabled={(date) => date < new Date()}
                                                                initialFocus
                                                            />
                                                        </PopoverContent>
                                                    </Popover>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    )}

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
                                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                                            <FormControl>
                                                                <RadioGroupItem value="Permanent" className="!cursor-pointer" />
                                                            </FormControl>
                                                            <FormLabel className="font-normal !cursor-pointer">Permanently available</FormLabel>
                                                        </FormItem>
                                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                                            <FormControl>
                                                                <RadioGroupItem value="Limited" className="!cursor-pointer" />
                                                            </FormControl>
                                                            <FormLabel className="font-normal !cursor-pointer">Limited time period</FormLabel>
                                                        </FormItem>
                                                    </RadioGroup>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {watchDuration === "Limited" && (
                                        <FormField
                                            control={form.control}
                                            name="durationPeriod"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Duration Period (days)</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            min={1}
                                                            {...field}
                                                            onChange={(e) => field.onChange(Number.parseInt(e.target.value))}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    )}

                                    <FormField
                                        control={form.control}
                                        name="category"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Category</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Select category" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="TECHNICAL">Technical</SelectItem>
                                                        <SelectItem value="NON_TECHNICAL">Non-Technical</SelectItem>
                                                        <SelectItem value="BEHAVIORAL">Behavioral</SelectItem>
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
                                            <FormItem>
                                                <FormLabel>Status</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Select status" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="DRAFT">Draft</SelectItem>
                                                        <SelectItem value="PUBLISHED">Published</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormDescription>Draft interviews are not visible to candidates.</FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormField
                                        control={form.control}
                                        name="durationLimit"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Interview Duration (minutes)</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        min={5}
                                                        {...field}
                                                        onChange={(e) => field.onChange(Number.parseInt(e.target.value))}
                                                    />
                                                </FormControl>
                                                <FormDescription>The maximum time allowed for the interview.</FormDescription>
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
                                                        onChange={(e) => field.onChange(Number.parseInt(e.target.value))}
                                                    />
                                                </FormControl>
                                                <FormDescription>How many questions will be asked during the interview.</FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg font-medium">Questions</h3>
                                        <Button type="button" variant="outline" size="sm" onClick={addQuestion} className="gap-1">
                                            <Plus className="h-4 w-4" /> Add Question
                                        </Button>
                                    </div>

                                    {watchQuestions &&
                                        watchQuestions.map((_, index) => (
                                            <Card key={index} className="p-4">
                                                <CardContent className="p-0 space-y-4">
                                                    <div className="flex items-center justify-between">
                                                        <h4 className="font-medium">Question {index + 1}</h4>
                                                        {index > 0 && (
                                                            <Button
                                                                type="button"
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() => removeQuestion(index)}
                                                                className="h-8 w-8 p-0 text-destructive"
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
                                                                    <Textarea placeholder="Enter your question" className="resize-none" {...field} />
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
                                                                <FormLabel>Expected Answer (Optional)</FormLabel>
                                                                <FormControl>
                                                                    <Textarea
                                                                        placeholder="Enter the expected answer or key points"
                                                                        className="resize-none"
                                                                        {...field}
                                                                    />
                                                                </FormControl>
                                                                <FormDescription>
                                                                    This will be used for evaluation but not shown to candidates.
                                                                </FormDescription>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </CardContent>
                                            </Card>
                                        ))}
                                </div>
                            </div>

                            <div className="flex justify-between pt-6">
                                <Button type="button" variant="outline" onClick={() => router.back()}>
                                    Back
                                </Button>
                                <div className="flex gap-2">
                                    <Button type="button" variant="outline" onClick={() => setActiveTab("preview")}>
                                        Preview
                                    </Button>
                                    <Button type="submit">Create Interview</Button>
                                </div>
                            </div>
                        </form>
                    </Form>
                </TabsContent>

                <TabsContent value="preview" className="mt-6">
                    <div className="space-y-6">
                        <InterviewPreview formData={form.getValues()} />

                        <div className="flex justify-between pt-6">
                            <Button type="button" variant="outline" onClick={() => setActiveTab("form")}>
                                Back to Form
                            </Button>
                            <Button onClick={form.handleSubmit(onSubmit)}>Create Interview</Button>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
