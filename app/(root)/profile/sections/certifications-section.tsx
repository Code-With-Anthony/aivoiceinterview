"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Certification } from "@/types/profile";
import { Award, ExternalLink } from "lucide-react";

interface CertificationsSectionProps {
  certifications?: Certification[];
  onEdit: () => void;
}

export default function CertificationsSection({
  certifications,
  onEdit,
}: CertificationsSectionProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <Award className="h-5 w-5" />
          <CardTitle>Certifications</CardTitle>
        </div>
        <Button variant="outline" onClick={onEdit}>
          Edit
        </Button>
      </CardHeader>
      <CardContent>
        {certifications && certifications.length > 0 ? (
          <div className="space-y-4">
            {certifications.map((cert, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex flex-col md:flex-row justify-between mb-2">
                  <h3 className="font-medium">{cert.name}</h3>
                  <p className="text-sm text-muted-foreground">{cert.date}</p>
                </div>
                {cert.url && (
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline flex items-center gap-1 mt-2"
                  >
                    View Certificate <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>No certifications listed</p>
        )}
      </CardContent>
    </Card>
  );
}
