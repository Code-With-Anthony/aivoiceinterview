import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ManualInterviewGenerationFormValues } from "@/lib/schemas/manualInterviewGenerationForm";
import { UseFormReturn } from "react-hook-form";

interface InterviewTitleProps {
    form: UseFormReturn<ManualInterviewGenerationFormValues>;
}

export const InterviewTitle: React.FC<InterviewTitleProps> = ({ form }) => {
    return (
        <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
                <FormItem className="w-full p-1">
                    <FormLabel>Interview Title</FormLabel>
                    <FormControl>
                        <input
                            type="text"
                            {...field}
                            placeholder="eg: software engineer"
                            className="h-10 w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}