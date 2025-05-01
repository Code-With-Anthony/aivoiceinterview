"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import type { Experience, UserProfile } from "@/types/profile";
import { Plus, Trash } from "lucide-react";

interface ExperienceFormProps {
  experience?: Experience[];
  updateFormData: (data: Partial<UserProfile>) => void;
}

export default function ExperienceForm({
  experience,
  updateFormData,
}: ExperienceFormProps) {
  const [formState, setFormState] = useState<Experience[]>(experience || []);

  const addExperience = () => {
    const newExperience: Experience = {
      company: "",
      position: "",
      fromYear: "",
      toYear: "",
    };
    const updatedExperience = [...formState, newExperience];
    setFormState(updatedExperience);
    updateFormData({ experience: updatedExperience });
  };

  const updateExperience = (
    index: number,
    field: keyof Experience,
    value: string
  ) => {
    const updatedExperience = formState.map((exp, i) => {
      if (i === index) {
        return { ...exp, [field]: value };
      }
      return exp;
    });
    setFormState(updatedExperience);
    updateFormData({ experience: updatedExperience });
  };

  const removeExperience = (index: number) => {
    const updatedExperience = formState.filter((_, i) => i !== index);
    setFormState(updatedExperience);
    updateFormData({ experience: updatedExperience });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Label>Experience</Label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addExperience}
        >
          <Plus className="h-4 w-4 mr-1" /> Add Experience
        </Button>
      </div>

      {formState.length > 0 ? (
        <div className="space-y-6">
          {formState.map((exp, index) => (
            <div
              key={index}
              className="p-4 border rounded-lg space-y-4 relative"
            >
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 text-destructive"
                onClick={() => removeExperience(index)}
              >
                <Trash className="h-4 w-4" />
              </Button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor={`exp-company-${index}`}>Company</Label>
                  <Input
                    id={`exp-company-${index}`}
                    value={exp.company}
                    onChange={(e) =>
                      updateExperience(index, "company", e.target.value)
                    }
                    placeholder="Enter company name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`exp-position-${index}`}>Position</Label>
                  <Input
                    id={`exp-position-${index}`}
                    value={exp.position}
                    onChange={(e) =>
                      updateExperience(index, "position", e.target.value)
                    }
                    placeholder="Enter position"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`exp-from-${index}`}>From Year</Label>
                  <Input
                    id={`exp-from-${index}`}
                    value={exp.fromYear}
                    onChange={(e) =>
                      updateExperience(index, "fromYear", e.target.value)
                    }
                    placeholder="Enter start year"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`exp-to-${index}`}>To Year</Label>
                  <Input
                    id={`exp-to-${index}`}
                    value={exp.toYear}
                    onChange={(e) =>
                      updateExperience(index, "toYear", e.target.value)
                    }
                    placeholder="Enter end year or leave blank for present"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">
          No experience entries added yet.
        </p>
      )}
    </div>
  );
}
