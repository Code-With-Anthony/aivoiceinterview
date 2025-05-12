import { Badge } from "@/components/ui/badge";
import { programmingLogosList } from "@/public/TechIcons/programmingLogosList";
import Image from "next/image";
import { useState } from "react";

const TechStack = ({ techStack }: { techStack: string[] }) => {
    // State to track whether to show all technologies or not
    const [showMore, setShowMore] = useState(false);

    // Handle the toggle between "Show More" and "Show Less"
    const toggleShowMore = () => {
        setShowMore(!showMore);
    };

    // Show first 5 technologies initially and then the rest if 'showMore' is true
    const visibleTechStack = showMore ? techStack : techStack.slice(0, 5);

    // Helper function to get the logo/icon for a technology
    const getTechLogo = (tech: string) => {
        const techItem = programmingLogosList.find((item) => item.label === tech);
        return techItem ? techItem.icon : null; // Return the icon or null if not found
    };

    return (
        <div className="flex flex-wrap gap-1">
            {visibleTechStack.map((tech: string) => {
                const icon = getTechLogo(tech);
                return (
                    <Badge
                        key={tech}
                        variant="outline"
                        className="px-3 py-1 text-sm rounded-md"
                    >
                        {icon && <Image src={icon} alt={tech} className="w-4 h-4" height={4} width={4} />}
                        {tech}
                    </Badge>
                )
            })}
            {techStack.length > 5 && (
                <button
                    onClick={toggleShowMore}
                    className="mt-2 text-sm text-blue-600 cursor-pointer hover:underline"
                >
                    {showMore ? "Show Less" : `+ ${techStack.length - 5} more`}
                </button>
            )}
        </div>
    );
};

export default TechStack;
