"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { Project, UserProfile } from "@/types/profile";
import { Plus, Trash } from "lucide-react";

interface ProjectsFormProps {
  projects?: Project[];
  updateFormData: (data: Partial<UserProfile>) => void;
}

export default function ProjectsForm({
  projects,
  updateFormData,
}: ProjectsFormProps) {
  const [formState, setFormState] = useState<Project[]>(projects || []);

  const addProject = () => {
    const newProject: Project = {
      name: "",
      description: "",
      url: "",
    };
    const updatedProjects = [...formState, newProject];
    setFormState(updatedProjects);
    updateFormData({ projects: updatedProjects });
  };

  const updateProject = (
    index: number,
    field: keyof Project,
    value: string
  ) => {
    const updatedProjects = formState.map((proj, i) => {
      if (i === index) {
        return { ...proj, [field]: value };
      }
      return proj;
    });
    setFormState(updatedProjects);
    updateFormData({ projects: updatedProjects });
  };

  const removeProject = (index: number) => {
    const updatedProjects = formState.filter((_, i) => i !== index);
    setFormState(updatedProjects);
    updateFormData({ projects: updatedProjects });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Label>Projects</Label>
        <Button type="button" variant="outline" size="sm" onClick={addProject}>
          <Plus className="h-4 w-4 mr-1" /> Add Project
        </Button>
      </div>

      {formState.length > 0 ? (
        <div className="space-y-6">
          {formState.map((project, index) => (
            <div
              key={index}
              className="p-4 border rounded-lg space-y-4 relative"
            >
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 text-destructive"
                onClick={() => removeProject(index)}
              >
                <Trash className="h-4 w-4" />
              </Button>

              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor={`project-name-${index}`}>Name</Label>
                  <Input
                    id={`project-name-${index}`}
                    value={project.name}
                    onChange={(e) =>
                      updateProject(index, "name", e.target.value)
                    }
                    placeholder="Enter project name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`project-desc-${index}`}>Description</Label>
                  <Textarea
                    id={`project-desc-${index}`}
                    value={project.description}
                    onChange={(e) =>
                      updateProject(index, "description", e.target.value)
                    }
                    placeholder="Enter project description"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`project-url-${index}`}>URL</Label>
                  <Input
                    id={`project-url-${index}`}
                    value={project.url}
                    onChange={(e) =>
                      updateProject(index, "url", e.target.value)
                    }
                    placeholder="Enter project URL"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">No projects added yet.</p>
      )}
    </div>
  );
}
