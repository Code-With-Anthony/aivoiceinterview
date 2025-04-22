"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

const techStacks = [
  "React",
  "Node.js",
  "Python",
  "Java",
  "Angular",
  "Vue.js",
  "TypeScript",
  "MongoDB",
  "PostgreSQL",
  "AWS",
];

const formSchema = z.object({
  type: z.enum(["technical", "non-technical"]),
  date: z.date({
    required_error: "Please select a date for the interview.",
  }),
  difficulty: z.enum(["easy", "medium", "hard"]),
  techStack: z.array(z.string()).optional(),
  role: z.string().min(1, "Please select a role"),
});

export default function CreateCustomInterview() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      techStack: [],
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const interviewType = form.watch("type");

  return (
    <div className="container max-w-2xl mx-auto py-12">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold gradient-text">
            Create Custom Interview
          </h1>
          <p className="text-muted-foreground mt-2">
            Set up your custom interview by selecting your preferences below.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Interview Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select interview type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="technical">Technical</SelectItem>
                      <SelectItem value="non-technical">
                        Non-Technical
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Interview Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={`w-full pl-3 text-left font-normal ${
                            !field.value && "text-muted-foreground"
                          }`}
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
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date: any) =>
                          date < new Date(new Date().setHours(0, 0, 0, 0))
                        }
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="difficulty"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Difficulty Level</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {interviewType === "technical" ? (
                        <>
                          <SelectItem value="frontend">
                            Frontend Developer
                          </SelectItem>
                          <SelectItem value="backend">
                            Backend Developer
                          </SelectItem>
                          <SelectItem value="fullstack">
                            Fullstack Developer
                          </SelectItem>
                          <SelectItem value="devops">
                            DevOps Engineer
                          </SelectItem>
                        </>
                      ) : (
                        <>
                          <SelectItem value="hr">HR Manager</SelectItem>
                          <SelectItem value="sales">
                            Sales Representative
                          </SelectItem>
                          <SelectItem value="marketing">
                            Marketing Manager
                          </SelectItem>
                          <SelectItem value="product">
                            Product Manager
                          </SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {interviewType === "technical" && (
              <FormField
                control={form.control}
                name="techStack"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tech Stack</FormLabel>
                    <div className="flex flex-wrap gap-2">
                      {techStacks.map((tech) => (
                        <Button
                          key={tech}
                          type="button"
                          variant={
                            field.value?.includes(tech) ? "default" : "outline"
                          }
                          className="flex items-center gap-2"
                          onClick={() => {
                            const newValue = field.value?.includes(tech)
                              ? field.value.filter((t) => t !== tech)
                              : [...(field.value || []), tech];
                            field.onChange(newValue);
                          }}
                        >
                          {tech}
                        </Button>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <Button type="submit" className="w-full">
              Create Interview
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
