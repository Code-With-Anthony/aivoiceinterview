import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ManualInterviewGenerationFormValues } from "@/lib/schemas/manualInterviewGenerationForm";
import { AudioLines, Code, Sparkles } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

interface InterviewTypeSelectorProps {
    form: UseFormReturn<ManualInterviewGenerationFormValues>;
}

export const InterviewTypeSelector: React.FC<InterviewTypeSelectorProps> = ({ form }) => {
    return (
        <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Interview Type</FormLabel>
                    <div className="flex flex-wrap gap-2 w-full">
                        {["Voice", "Coding", "Mix"].map((type) => (
                            <div key={type} className="w-full sm:w-auto flex-1 min-w-[120px]">
                                <input
                                    type="radio"
                                    id={`type-${type}`}
                                    value={type}
                                    checked={field.value === type}
                                    onChange={() => field.onChange(type)}
                                    className="peer sr-only"
                                />
                                <label
                                    htmlFor={`type-${type}`}
                                    className="flex flex-col items-center justify-center h-24 rounded-lg border-2 border-muted bg-popover p-2 
                        hover:bg-accent hover:text-accent-foreground 
                        peer-checked:border-primary 
                        peer-checked:bg-accent/50 
                        peer-checked:text-primary 
                        transition-colors !cursor-pointer"
                                >
                                    <div className="mb-2 rounded-full p-1">
                                        {type === "Voice" && (
                                            <AudioLines />
                                        )}
                                        {type === "Coding" && (
                                            <Code />
                                        )}
                                        {type === "Mix" && (
                                            <Sparkles />
                                        )}
                                    </div>
                                    <div className="text-sm font-medium">{type}</div>
                                </label>
                            </div>
                        ))}
                    </div>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}