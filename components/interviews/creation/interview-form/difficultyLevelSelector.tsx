import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ManualInterviewGenerationFormValues } from "@/lib/schemas/manualInterviewGenerationForm";
import { cn } from "@/lib/utils";
import { UseFormReturn } from "react-hook-form";

interface DifficultyLevelSelectorProps {
    form: UseFormReturn<ManualInterviewGenerationFormValues>;
}

export const DifficultyLevelSelector: React.FC<DifficultyLevelSelectorProps> = ({ form }) => {
    const getLevelColor = (level: string) => {
        switch (level) {
            case "Easy":
                return `
              bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 peer-checked:border-emerald-600
              dark:bg-emerald-800 dark:text-white dark:border-emerald-600 dark:hover:bg-emerald-700 dark:peer-checked:border-white
            `;
            case "Medium":
                return `
              bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 peer-checked:border-amber-600
              dark:bg-amber-800 dark:text-white dark:border-amber-600 dark:hover:bg-amber-700 dark:peer-checked:border-white
            `;
            case "Hard":
                return `
              bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100 peer-checked:border-rose-600
              dark:bg-rose-800 dark:text-white dark:border-rose-600 dark:hover:bg-rose-700 dark:peer-checked:border-white
            `;
            case "Expert":
                return `
              bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100 peer-checked:border-indigo-600
              dark:bg-indigo-800 dark:text-white dark:border-indigo-600 dark:hover:bg-indigo-700 dark:peer-checked:border-white
            `;
            default:
                return `
              bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100 peer-checked:border-gray-600
              dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:peer-checked:border-white
            `;
        }
    };
    return (
        <FormField
            control={form.control}
            name="level"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Difficulty Level</FormLabel>
                    <div className="flex flex-wrap gap-2 w-full">
                        {["Easy", "Medium", "Hard", "Expert"].map((level) => (
                            <div key={level} className="w-full sm:w-auto flex-1 min-w-[100px]">
                                <input
                                    type="radio"
                                    id={`level-${level}`}
                                    value={level}
                                    checked={field.value === level}
                                    onChange={() => field.onChange(level)}
                                    className="peer sr-only"
                                />
                                <label
                                    htmlFor={`level-${level}`}
                                    className={cn(
                                        "flex h-10 items-center justify-center rounded-md border text-sm transition-colors hover:bg-muted peer-checked:border-primary peer-checked:text-primary !cursor-pointer",
                                        getLevelColor(level)
                                    )}
                                >
                                    {level}
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