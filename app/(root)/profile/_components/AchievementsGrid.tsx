import Image from "next/image";
import Achievement from "./icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const achievements = [
  { label: "Extra Miler", icon: Achievement.extraMiler },
  { label: "Verified", icon: Achievement.verified },
  { label: "Milestone", icon: Achievement.mileStone },
];

const AchievementsGrid = () => (
  <div className="flex sm:grid sm:grid-cols-3 gap-4 overflow-x-auto">
    {achievements.map(({ label, icon }) => (
      <div key={label}>
        <TooltipProvider>
          <Tooltip disableHoverableContent>
            <TooltipTrigger asChild>
              <Image
                src={icon}
                alt={label}
                width={25}
                height={25}
                loading="lazy"
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>{label}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        {/* <p className="text-sm text-muted-foreground">{label}</p> */}
      </div>
    ))}
  </div>
);

export default AchievementsGrid;
