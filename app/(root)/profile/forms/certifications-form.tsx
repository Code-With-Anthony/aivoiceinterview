"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import type { Certification, UserProfile } from "@/types/profile";
import { Plus, Trash } from "lucide-react";

interface CertificationsFormProps {
  certifications?: Certification[];
  updateFormData: (data: Partial<UserProfile>) => void;
}

export default function CertificationsForm({
  certifications,
  updateFormData,
}: CertificationsFormProps) {
  const [formState, setFormState] = useState<Certification[]>(
    certifications || []
  );

  const addCertification = () => {
    const newCertification: Certification = {
      name: "",
      date: "",
      url: "",
    };
    const updatedCertifications = [...formState, newCertification];
    setFormState(updatedCertifications);
    updateFormData({ certifications: updatedCertifications });
  };

  const updateCertification = (
    index: number,
    field: keyof Certification,
    value: string
  ) => {
    const updatedCertifications = formState.map((cert, i) => {
      if (i === index) {
        return { ...cert, [field]: value };
      }
      return cert;
    });
    setFormState(updatedCertifications);
    updateFormData({ certifications: updatedCertifications });
  };

  const removeCertification = (index: number) => {
    const updatedCertifications = formState.filter((_, i) => i !== index);
    setFormState(updatedCertifications);
    updateFormData({ certifications: updatedCertifications });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Label>Certifications</Label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addCertification}
        >
          <Plus className="h-4 w-4 mr-1" /> Add Certification
        </Button>
      </div>

      {formState.length > 0 ? (
        <div className="space-y-6">
          {formState.map((cert, index) => (
            <div
              key={index}
              className="p-4 border rounded-lg space-y-4 relative"
            >
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 text-destructive"
                onClick={() => removeCertification(index)}
              >
                <Trash className="h-4 w-4" />
              </Button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor={`cert-name-${index}`}>Name</Label>
                  <Input
                    id={`cert-name-${index}`}
                    value={cert.name}
                    onChange={(e) =>
                      updateCertification(index, "name", e.target.value)
                    }
                    placeholder="Enter certification name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`cert-date-${index}`}>Date</Label>
                  <Input
                    id={`cert-date-${index}`}
                    value={cert.date}
                    onChange={(e) =>
                      updateCertification(index, "date", e.target.value)
                    }
                    placeholder="Enter certification date"
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor={`cert-url-${index}`}>URL</Label>
                  <Input
                    id={`cert-url-${index}`}
                    value={cert.url}
                    onChange={(e) =>
                      updateCertification(index, "url", e.target.value)
                    }
                    placeholder="Enter certification URL"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">
          No certifications added yet.
        </p>
      )}
    </div>
  );
}
