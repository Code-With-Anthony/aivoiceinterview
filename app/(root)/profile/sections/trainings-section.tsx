"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

interface TrainingsSectionProps {
  trainings?: string[];
  onEdit: () => void;
}

export default function TrainingsSection({
  trainings,
  onEdit,
}: TrainingsSectionProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          <CardTitle>Trainings</CardTitle>
        </div>
        <Button variant="outline" onClick={onEdit}>
          Edit
        </Button>
      </CardHeader>
      <CardContent>
        {trainings && trainings.length > 0 ? (
          <ul className="list-disc pl-5 space-y-2">
            {trainings.map((training, index) => (
              <li key={index}>{training}</li>
            ))}
          </ul>
        ) : (
          <p>No trainings listed</p>
        )}
      </CardContent>
    </Card>
  );
}
