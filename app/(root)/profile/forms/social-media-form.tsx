"use client";

import type React from "react";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { SocialMedia, UserProfile } from "@/types/profile";
import { Linkedin, Github, Globe } from "lucide-react";

interface SocialMediaFormProps {
  socialMedia?: SocialMedia;
  updateFormData: (data: Partial<UserProfile>) => void;
}

export default function SocialMediaForm({
  socialMedia,
  updateFormData,
}: SocialMediaFormProps) {
  const [formState, setFormState] = useState<SocialMedia>({
    linkedin: socialMedia?.linkedin || "",
    github: socialMedia?.github || "",
    stackoverflow: socialMedia?.stackoverflow || "",
    dribbble: socialMedia?.dribbble || "",
    hackerRank: socialMedia?.hackerRank || "",
    codeForces: socialMedia?.codeForces || "",
    hackerEarth: socialMedia?.hackerEarth || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    updateFormData({ socialMedia: { ...formState, [name]: value } });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
          <Label htmlFor="linkedin" className="flex items-center gap-2">
            <Linkedin className="h-4 w-4" /> LinkedIn
          </Label>
          <Input
            id="linkedin"
            name="linkedin"
            value={formState.linkedin}
            onChange={handleChange}
            placeholder="Enter LinkedIn profile URL"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="github" className="flex items-center gap-2">
            <Github className="h-4 w-4" /> GitHub
          </Label>
          <Input
            id="github"
            name="github"
            value={formState.github}
            onChange={handleChange}
            placeholder="Enter GitHub profile URL"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="stackoverflow" className="flex items-center gap-2">
            <Globe className="h-4 w-4" /> Stack Overflow
          </Label>
          <Input
            id="stackoverflow"
            name="stackoverflow"
            value={formState.stackoverflow}
            onChange={handleChange}
            placeholder="Enter Stack Overflow profile URL"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="dribbble" className="flex items-center gap-2">
            <Globe className="h-4 w-4" /> Dribbble
          </Label>
          <Input
            id="dribbble"
            name="dribbble"
            value={formState.dribbble}
            onChange={handleChange}
            placeholder="Enter Dribbble profile URL"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="hackerRank" className="flex items-center gap-2">
            <Globe className="h-4 w-4" /> HackerRank
          </Label>
          <Input
            id="hackerRank"
            name="hackerRank"
            value={formState.hackerRank}
            onChange={handleChange}
            placeholder="Enter HackerRank profile URL"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="codeForces" className="flex items-center gap-2">
            <Globe className="h-4 w-4" /> CodeForces
          </Label>
          <Input
            id="codeForces"
            name="codeForces"
            value={formState.codeForces}
            onChange={handleChange}
            placeholder="Enter CodeForces profile URL"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="hackerEarth" className="flex items-center gap-2">
            <Globe className="h-4 w-4" /> HackerEarth
          </Label>
          <Input
            id="hackerEarth"
            name="hackerEarth"
            value={formState.hackerEarth}
            onChange={handleChange}
            placeholder="Enter HackerEarth profile URL"
          />
        </div>
      </div>
    </div>
  );
}
