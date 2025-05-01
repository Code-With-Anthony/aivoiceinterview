"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import type { UserProfile } from "@/types/profile";
import { X, Plus } from "lucide-react";

interface SkillsFormProps {
  skills?: string[];
  updateFormData: (data: Partial<UserProfile>) => void;
}

export default function SkillsForm({
  skills,
  updateFormData,
}: SkillsFormProps) {
  const [formState, setFormState] = useState<string[]>(skills || []);
  const [newSkill, setNewSkill] = useState("");

  const addSkill = () => {
    if (newSkill.trim()) {
      const updatedSkills = [...formState, newSkill.trim()];
      setFormState(updatedSkills);
      updateFormData({ skills: updatedSkills });
      setNewSkill("");
    }
  };

  const removeSkill = (index: number) => {
    const updatedSkills = formState.filter((_, i) => i !== index);
    setFormState(updatedSkills);
    updateFormData({ skills: updatedSkills });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label>Skills</Label>
        <div className="flex flex-wrap gap-2 mb-2">
          {formState.map((skill, index) => (
            <div
              key={index}
              className="flex items-center bg-muted px-3 py-1 rounded-full"
            >
              <span className="mr-1">{skill}</span>
              <button
                type="button"
                onClick={() => removeSkill(index)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Add a skill"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addSkill();
              }
            }}
          />
          <Button type="button" onClick={addSkill} size="sm">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
