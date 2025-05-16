import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { ManualInterviewGenerationFormValues } from "@/lib/schemas/manualInterviewGenerationForm";
import { UseFormReturn } from "react-hook-form";

interface InterviewQuestionsProps {
    form: UseFormReturn<ManualInterviewGenerationFormValues>;
    index: number;
}

export const InterviewQuestions: React.FC<InterviewQuestionsProps> = ({ form, index }) => {
    return (
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
    )
}