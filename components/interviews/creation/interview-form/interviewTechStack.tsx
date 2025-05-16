import { MultiSelect } from "@/components/multi-select";
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { TECH_STACK } from "@/constants";
import { ManualInterviewGenerationFormValues } from "@/lib/schemas/manualInterviewGenerationForm";
import { programmingLogosList } from "@/public/TechIcons/programmingLogosList";
import { UseFormReturn } from "react-hook-form";

interface InterviewTechStackProps {
    form: UseFormReturn<ManualInterviewGenerationFormValues>;
    selectedFrameworks: string[]; // current selected value
    setSelectedFrameworks: (value: string[]) => void; // update selected values
}

export const InterviewTechStack: React.FC<InterviewTechStackProps> = ({ form, selectedFrameworks, setSelectedFrameworks }) => {
    return (
        <FormField
            control={form.control}
            name="techStack"
            render={() => (
                <FormItem>
                    <div>
                        <FormLabel>{TECH_STACK}</FormLabel>
                    </div>
                    <div className="w-full">
                        {/* MultiSelect component to replace the checkbox grid */}
                        <MultiSelect
                            options={programmingLogosList}
                            value={selectedFrameworks} // current selected value
                            onValueChange={setSelectedFrameworks} // update selected values
                            placeholder="Select frameworks"
                            variant="inverted"
                            animation={2}
                            maxCount={4} // limit number of items selected
                        />
                    </div>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}