"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code } from "lucide-react";

interface SkillsSectionProps {
  skills?: string[];
  onEdit: () => void;
}

export default function SkillsSection({ skills, onEdit }: SkillsSectionProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <Code className="h-5 w-5" />
          <CardTitle>Skills</CardTitle>
        </div>
        <Button variant="outline" onClick={onEdit}>
          Edit
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {skills && skills.length > 0 ? (
            skills.map((skill, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="px-3 py-1 text-sm"
              >
                {skill}
              </Badge>
            ))
          ) : (
            <p>No skills listed</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
