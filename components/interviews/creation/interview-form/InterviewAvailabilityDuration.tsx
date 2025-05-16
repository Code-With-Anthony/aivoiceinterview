import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ManualInterviewGenerationFormValues } from "@/lib/schemas/manualInterviewGenerationForm";
import { UseFormReturn } from "react-hook-form";

interface InterviewAvailabilityDurationProps {
    form: UseFormReturn<ManualInterviewGenerationFormValues>;
}

export const InterviewAvailabilityDuration: React.FC<InterviewAvailabilityDurationProps> = ({ form }) => {
    return (
        <FormField
            control={form.control}
            name="date.availabilityDuration"
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
    )
}