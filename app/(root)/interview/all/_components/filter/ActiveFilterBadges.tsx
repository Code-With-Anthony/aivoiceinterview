import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

type FilterKeys = "status" | "company" | "level" | "technologies" | "type" | "category";

interface Props {
    filters: Record<FilterKeys, string[]>;
    removeFilter: (key: FilterKeys, value: string) => void;
}

const filterLabels: Record<FilterKeys, string> = {
    status: "Status",
    company: "Company",
    level: "Level",
    technologies: "Technology",
    type: "Type",
    category: "Category",
};

export default function ActiveFilterBadges({ filters, removeFilter }: Props) {
    return (
        <div className="flex flex-wrap gap-2 mt-4">
            {Object.entries(filters).map(([key, values]) =>
                values.map((v) => (
                    <Badge
                        key={`${key}-${v}`}
                        variant="secondary"
                        onClick={() => removeFilter(key as FilterKeys, v)}
                        className="cursor-pointer"
                    >
                        {filterLabels[key as FilterKeys]}: {v} <X className="ml-1 h-3 w-3" />
                    </Badge>
                ))
            )}
        </div>
    );
}
