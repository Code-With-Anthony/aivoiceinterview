"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type AvatarGroupProps = {
  techstack: string[];
};

export default function AvatarGroup({ techstack }: AvatarGroupProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const visibleTech = techstack.slice(0, 3);
  const extraCount = techstack.length - visibleTech.length;

  return (
    <TooltipProvider delayDuration={0}>
      <div className="flex -space-x-2 *:ring-3 *:ring-background flex-wrap gap-2">
        {visibleTech.map((tech, index) => (
          <Tooltip key={index}>
            <TooltipTrigger asChild>
              <Avatar
                className={`transition-transform ${
                  activeIndex === index ? "z-10 scale-110" : ""
                }`}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                <AvatarImage
                  src={`/TechIcons/${tech
                    .toLowerCase()
                    .replace(/[^a-z0-9]/gi, "")}.png`}
                  alt={tech}
                  onError={(e) =>
                    (e.currentTarget.src = "/TechIcons/user-avatar.png")
                  }
                />
                <AvatarFallback>
                  {tech
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent>
              <p>{tech}</p>
            </TooltipContent>
          </Tooltip>
        ))}

        {extraCount > 0 && (
          <Avatar className="bg-muted">
            <AvatarFallback className="text-sm font-medium">
              +{extraCount}
            </AvatarFallback>
          </Avatar>
        )}
      </div>
    </TooltipProvider>
  );
}
