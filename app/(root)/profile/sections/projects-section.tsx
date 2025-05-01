"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Project } from "@/types/profile";
import { Code, ExternalLink } from "lucide-react";

interface ProjectsSectionProps {
  projects?: Project[];
  onEdit: () => void;
}

export default function ProjectsSection({
  projects,
  onEdit,
}: ProjectsSectionProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <Code className="h-5 w-5" />
          <CardTitle>Projects</CardTitle>
        </div>
        <Button variant="outline" onClick={onEdit}>
          Edit
        </Button>
      </CardHeader>
      <CardContent>
        {projects && projects.length > 0 ? (
          <div className="space-y-6">
            {projects.map((project, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">{project.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {project.description}
                </p>
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                  >
                    View Project <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>No projects listed</p>
        )}
      </CardContent>
    </Card>
  );
}
