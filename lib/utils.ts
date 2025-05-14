import { interviewCovers, mappings } from "@/constants";
import { Interview } from "@/types/profile";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Code, FileText, Layers, LucideIcon, Mic } from "lucide-react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const techIconBaseURL = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";

const normalizeTechName = (tech: string) => {
  const key = tech.toLowerCase().replace(/\.js$/, "").replace(/\s+/g, "");
  return mappings[key as keyof typeof mappings];
};

const checkIconExists = async (url: string) => {
  try {
    const response = await fetch(url, { method: "HEAD" });
    return response.ok; // Returns true if the icon exists
  } catch {
    return false;
  }
};

export const getTechLogos = async (techArray: string[]) => {
  const logoURLs = techArray.map((tech) => {
    const normalized = normalizeTechName(tech);
    return {
      tech,
      url: `${techIconBaseURL}/${normalized}/${normalized}-original.svg`,
    };
  });

  const results = await Promise.all(
    logoURLs.map(async ({ tech, url }) => ({
      tech,
      url: (await checkIconExists(url)) ? url : "/tech.svg",
    }))
  );

  return results;
};

export const getRandomInterviewCover = () => {
  const randomIndex = Math.floor(Math.random() * interviewCovers.length);
  return `/covers${interviewCovers[randomIndex]}`;
};

export const getDateDisplay = (interview: Interview) => {
  console.log(interview?.date?.type);
  if (interview?.date?.type === "permanent") {
    return "Always available"
  } else if (interview?.date?.type === "future") {
    return `Opens on ${interview?.date?.value}`
  } else if (interview?.date?.type === "limited") {
    return `Closes in ${interview?.date?.value} days`
  }
  return interview?.date?.value
}

export const getDifficultyGradient = (level: string) => {
  switch (level?.toLowerCase()) {
    case "easy":
      return "from-green-500 to-emerald-600"
    case "medium":
      return "from-amber-500 to-orange-600"
    case "hard":
      return "from-red-500 to-rose-600"
    default:
      return "from-blue-500 to-indigo-600"
  }
}


export const getInterviewTypeIcon = (type: string): LucideIcon => {
  switch (type?.toLowerCase()) {
    case "voice":
      return Mic;
    case "coding":
      return Code;
    case "mix":
      return Layers;
    default:
      return FileText;
  }
};