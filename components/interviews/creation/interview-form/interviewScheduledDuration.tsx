import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ManualInterviewGenerationFormValues } from "@/lib/schemas/manualInterviewGenerationForm";
import { UseFormReturn } from "react-hook-form";

interface InterviewScheduledDurationProps {
    form: UseFormReturn<ManualInterviewGenerationFormValues>;
}

export const InterviewScheduledDuration: React.FC<InterviewScheduledDurationProps> = ({ form }) => {
    return (
        <FormField
            control={form.control}
            name="date.durationPeriod"
            render={({ field }) => (
                <FormItem className="w-full">
                    <FormLabel>Duration Period (days)</FormLabel>
                    <FormControl>
                        <Input
                            type="number"
                            min={1}
                            className="w-full"
                            {...field}
                            value={field.value ?? ""}
                            onChange={(e) =>
                                field.onChange(
                                    e.target.value === "" ? null : Number.parseInt(e.target.value)
                                )
                            }
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}