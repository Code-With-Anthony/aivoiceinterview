import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ManualInterviewGenerationFormValues } from "@/lib/schemas/manualInterviewGenerationForm";
import { UseFormReturn } from "react-hook-form";

interface InterviewDurationLimitProps {
    form: UseFormReturn<ManualInterviewGenerationFormValues>;
}

export const InterviewDurationLimit: React.FC<InterviewDurationLimitProps> = ({ form }) => {
    return (
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
    )
}