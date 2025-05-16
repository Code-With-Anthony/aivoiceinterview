import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ManualInterviewGenerationFormValues } from "@/lib/schemas/manualInterviewGenerationForm";
import { UseFormReturn } from "react-hook-form";

interface InterviewCategoryProps {
    form: UseFormReturn<ManualInterviewGenerationFormValues>;
}

export const InterviewCategory: React.FC<InterviewCategoryProps> = ({ form }) => {
    return (
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
    )
}