import { MultiSelect } from "@/components/multi-select";
import { programmingLogosList } from "@/public/TechIcons/programmingLogosList";

export function TechnologyFilter({ selected, onChange }: CompanyAndTechnologiesFilterProps) {
    return (
        <MultiSelect
            options={programmingLogosList}
            defaultValue={selected}
            onValueChange={onChange}
            placeholder="Select technologies"
            maxCount={1}
            variant="default"
            animation={2}
        />
    );
}