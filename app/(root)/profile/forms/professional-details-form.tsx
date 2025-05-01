"use client";

import type React from "react";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import type {
  ProfessionalDetails,
  UserProfile,
  Education,
  CurrentRole,
} from "@/types/profile";
import { Plus, Trash } from "lucide-react";

interface ProfessionalDetailsFormProps {
  professionalDetails?: ProfessionalDetails;
  updateFormData: (data: Partial<UserProfile>) => void;
}

export default function ProfessionalDetailsForm({
  professionalDetails,
  updateFormData,
}: ProfessionalDetailsFormProps) {
  const [formState, setFormState] = useState<ProfessionalDetails>({
    totalExperience: professionalDetails?.totalExperience || "",
    currentRole: professionalDetails?.currentRole || [],
    education: professionalDetails?.education || [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    updateFormData({ professionalDetails: { ...formState, [name]: value } });
  };

  // Current Role Functions
  const addCurrentRole = () => {
    const newRole: CurrentRole = {
      designation: "",
      companyName: "",
      fromYear: "",
      toYear: "",
    };
    const updatedRoles = [...formState.currentRole!, newRole];
    setFormState((prev) => ({ ...prev, currentRole: updatedRoles }));
    updateFormData({
      professionalDetails: { ...formState, currentRole: updatedRoles },
    });
  };

  const updateCurrentRole = (
    index: number,
    field: keyof CurrentRole,
    value: string
  ) => {
    const updatedRoles = formState.currentRole!.map((role, i) => {
      if (i === index) {
        return { ...role, [field]: value };
      }
      return role;
    });
    setFormState((prev) => ({ ...prev, currentRole: updatedRoles }));
    updateFormData({
      professionalDetails: { ...formState, currentRole: updatedRoles },
    });
  };

  const removeCurrentRole = (index: number) => {
    const updatedRoles = formState.currentRole!.filter((_, i) => i !== index);
    setFormState((prev) => ({ ...prev, currentRole: updatedRoles }));
    updateFormData({
      professionalDetails: { ...formState, currentRole: updatedRoles },
    });
  };

  // Education Functions
  const addEducation = () => {
    const newEducation: Education = {
      institution: "",
      degree: "",
      fieldOfStudy: "",
      fromYear: "",
      toYear: "",
    };
    const updatedEducation = [...formState.education!, newEducation];
    setFormState((prev) => ({ ...prev, education: updatedEducation }));
    updateFormData({
      professionalDetails: { ...formState, education: updatedEducation },
    });
  };

  const updateEducation = (
    index: number,
    field: keyof Education,
    value: string
  ) => {
    const updatedEducation = formState.education!.map((edu, i) => {
      if (i === index) {
        return { ...edu, [field]: value };
      }
      return edu;
    });
    setFormState((prev) => ({ ...prev, education: updatedEducation }));
    updateFormData({
      professionalDetails: { ...formState, education: updatedEducation },
    });
  };

  const removeEducation = (index: number) => {
    const updatedEducation = formState.education!.filter((_, i) => i !== index);
    setFormState((prev) => ({ ...prev, education: updatedEducation }));
    updateFormData({
      professionalDetails: { ...formState, education: updatedEducation },
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="totalExperience">Total Experience (years)</Label>
        <Input
          id="totalExperience"
          name="totalExperience"
          value={formState.totalExperience}
          onChange={handleChange}
          placeholder="Enter total years of experience"
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Current Role</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addCurrentRole}
          >
            <Plus className="h-4 w-4 mr-1" /> Add Role
          </Button>
        </div>

        {formState.currentRole && formState.currentRole.length > 0 ? (
          <div className="space-y-6">
            {formState.currentRole.map((role, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg space-y-4 relative"
              >
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 text-destructive"
                  onClick={() => removeCurrentRole(index)}
                >
                  <Trash className="h-4 w-4" />
                </Button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor={`role-designation-${index}`}>
                      Designation
                    </Label>
                    <Input
                      id={`role-designation-${index}`}
                      value={role.designation}
                      onChange={(e) =>
                        updateCurrentRole(index, "designation", e.target.value)
                      }
                      placeholder="Enter designation"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`role-company-${index}`}>
                      Company Name
                    </Label>
                    <Input
                      id={`role-company-${index}`}
                      value={role.companyName}
                      onChange={(e) =>
                        updateCurrentRole(index, "companyName", e.target.value)
                      }
                      placeholder="Enter company name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`role-from-${index}`}>From Year</Label>
                    <Input
                      id={`role-from-${index}`}
                      value={role.fromYear}
                      onChange={(e) =>
                        updateCurrentRole(index, "fromYear", e.target.value)
                      }
                      placeholder="Enter start year"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`role-to-${index}`}>To Year</Label>
                    <Input
                      id={`role-to-${index}`}
                      value={role.toYear}
                      onChange={(e) =>
                        updateCurrentRole(index, "toYear", e.target.value)
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
            No current roles added yet.
          </p>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Education</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addEducation}
          >
            <Plus className="h-4 w-4 mr-1" /> Add Education
          </Button>
        </div>

        {formState.education && formState.education.length > 0 ? (
          <div className="space-y-6">
            {formState.education.map((edu, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg space-y-4 relative"
              >
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 text-destructive"
                  onClick={() => removeEducation(index)}
                >
                  <Trash className="h-4 w-4" />
                </Button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor={`edu-institution-${index}`}>
                      Institution
                    </Label>
                    <Input
                      id={`edu-institution-${index}`}
                      value={edu.institution}
                      onChange={(e) =>
                        updateEducation(index, "institution", e.target.value)
                      }
                      placeholder="Enter institution name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`edu-degree-${index}`}>Degree</Label>
                    <Input
                      id={`edu-degree-${index}`}
                      value={edu.degree}
                      onChange={(e) =>
                        updateEducation(index, "degree", e.target.value)
                      }
                      placeholder="Enter degree"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`edu-field-${index}`}>Field of Study</Label>
                    <Input
                      id={`edu-field-${index}`}
                      value={edu.fieldOfStudy}
                      onChange={(e) =>
                        updateEducation(index, "fieldOfStudy", e.target.value)
                      }
                      placeholder="Enter field of study"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`edu-from-${index}`}>From Year</Label>
                    <Input
                      id={`edu-from-${index}`}
                      value={edu.fromYear}
                      onChange={(e) =>
                        updateEducation(index, "fromYear", e.target.value)
                      }
                      placeholder="Enter start year"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`edu-to-${index}`}>To Year</Label>
                    <Input
                      id={`edu-to-${index}`}
                      value={edu.toYear}
                      onChange={(e) =>
                        updateEducation(index, "toYear", e.target.value)
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
            No education entries added yet.
          </p>
        )}
      </div>
    </div>
  );
}
