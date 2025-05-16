import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ManualInterviewGenerationFormValues } from "@/lib/schemas/manualInterviewGenerationForm";
import { UseFormReturn } from "react-hook-form";

interface NumberOfQuestionsInInterviewProps {
    form: UseFormReturn<ManualInterviewGenerationFormValues>;
}

export const NumberOfQuestionsInInterview: React.FC<NumberOfQuestionsInInterviewProps> = ({ form }) => {
    return (
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
    )
}