import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { ManualInterviewGenerationFormValues } from "@/lib/schemas/manualInterviewGenerationForm";
import { UseFormReturn } from "react-hook-form";

interface InterviewExpectedAnswerProps {
    form: UseFormReturn<ManualInterviewGenerationFormValues>;
    index: number;
}

export const InterviewExpectedAnswer: React.FC<InterviewExpectedAnswerProps> = ({ form, index }) => {
    return (
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
    )
}