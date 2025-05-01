"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Experience } from "@/types/profile";
import { Briefcase } from "lucide-react";

interface ExperienceSectionProps {
  experience?: Experience[];
  onEdit: () => void;
}

export default function ExperienceSection({
  experience,
  onEdit,
}: ExperienceSectionProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <Briefcase className="h-5 w-5" />
          <CardTitle>Experience</CardTitle>
        </div>
        <Button variant="outline" onClick={onEdit}>
          Edit
        </Button>
      </CardHeader>
      <CardContent>
        {experience && experience.length > 0 ? (
          <div className="space-y-6">
            {experience.map((exp, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex flex-col md:flex-row justify-between mb-2">
                  <h3 className="font-medium">{exp.position}</h3>
                  <p className="text-sm text-muted-foreground">
                    {exp.fromYear} - {exp.toYear || "Present"}
                  </p>
                </div>
                <p className="text-muted-foreground mb-2">{exp.company}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No experience information</p>
        )}
      </CardContent>
    </Card>
  );
}
