"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import type { UserProfile } from "@/types/profile";
import { X, Plus } from "lucide-react";

interface TrainingsFormProps {
  trainings?: string[];
  updateFormData: (data: Partial<UserProfile>) => void;
}

export default function TrainingsForm({
  trainings,
  updateFormData,
}: TrainingsFormProps) {
  const [formState, setFormState] = useState<string[]>(trainings || []);
  const [newTraining, setNewTraining] = useState("");

  const addTraining = () => {
    if (newTraining.trim()) {
      const updatedTrainings = [...formState, newTraining.trim()];
      setFormState(updatedTrainings);
      updateFormData({ trainings: updatedTrainings });
      setNewTraining("");
    }
  };

  const removeTraining = (index: number) => {
    const updatedTrainings = formState.filter((_, i) => i !== index);
    setFormState(updatedTrainings);
    updateFormData({ trainings: updatedTrainings });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label>Trainings</Label>
        <div className="space-y-2 mb-2">
          {formState.map((training, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 border rounded-md"
            >
              <span>{training}</span>
              <button
                type="button"
                onClick={() => removeTraining(index)}
                className="text-destructive hover:text-destructive/80"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            value={newTraining}
            onChange={(e) => setNewTraining(e.target.value)}
            placeholder="Add a training"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTraining();
              }
            }}
          />
          <Button type="button" onClick={addTraining} size="sm">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
