"use client";

import { MultiSelect } from "@/components/multi-select";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { programmingLogosList } from "@/public/TechIcons/programmingLogosList";
import type { UserProfile } from "@/types/profile";
import { X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface SkillsFormProps {
  skills?: string[];
  updateFormData: (data: Partial<UserProfile>) => void;
}

export default function SkillsForm({
  skills,
  updateFormData,
}: SkillsFormProps) {
  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>(
    skills || []
  );

  const removeSkill = (index: number) => {
    const updatedSkills = selectedFrameworks.filter((_, i) => i !== index);
    setSelectedFrameworks(updatedSkills);
    updateFormData({ skills: updatedSkills });
  };

  useEffect(() => {
    setSelectedFrameworks(selectedFrameworks);
    updateFormData({ skills: selectedFrameworks });
  }, [selectedFrameworks]);

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label>Skills</Label>
        <div className="flex flex-wrap gap-2 mb-2">
          {selectedFrameworks.length > 0 ? (
            selectedFrameworks.map((skill, index) => {
              const matched = programmingLogosList.find(
                (item) => item.value.toLowerCase() === skill.toLowerCase()
              );
              return (
                <Badge
                  key={index}
                  variant="outline"
                  className="px-3 py-1 text-sm"
                >
                  {matched?.icon && (
                    <Image
                      src={matched.icon}
                      alt={skill}
                      width={16}
                      height={16}
                      className="inline-block"
                    />
                  )}
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(index)}
                    className="text-muted-foreground hover:text-foreground cursor-pointer"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              );
            })
          ) : (
            <p>No skills listed</p>
          )}
        </div>
        <div>
          <MultiSelect
            options={programmingLogosList}
            onValueChange={setSelectedFrameworks}
            defaultValue={selectedFrameworks}
            placeholder="Select frameworks"
            variant="inverted"
            animation={2}
            maxCount={4}
          />
        </div>
      </div>
    </div>
  );
}
