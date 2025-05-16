import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { ManualInterviewGenerationFormValues } from "@/lib/schemas/manualInterviewGenerationForm";
import { UseFormReturn } from "react-hook-form";

interface DescriptionInputProps {
    form: UseFormReturn<ManualInterviewGenerationFormValues>;
}

export const DescriptionInput: React.FC<DescriptionInputProps> = ({ form }) => {
    return (
        <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                        <Textarea
                            placeholder="Provide a detailed description of the interview"
                            className="resize-none min-h-[120px] max-h-[420px]"
                            {...field}
                        />
                    </FormControl>
                    <FormDescription>
                        This will be shown to candidates before they start
                        the interview.
                    </FormDescription>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}