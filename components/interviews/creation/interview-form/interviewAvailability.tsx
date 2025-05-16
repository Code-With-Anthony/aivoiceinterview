import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ManualInterviewGenerationFormValues } from "@/lib/schemas/manualInterviewGenerationForm";
import { UseFormReturn } from "react-hook-form";

interface InterviewAvailabilityProps {
    form: UseFormReturn<ManualInterviewGenerationFormValues>;
}

export const InterviewAvailability: React.FC<InterviewAvailabilityProps> = ({ form }) => {
    return (
        <FormField
            control={form.control}
            name="date.interviewTimming"
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
    )
}