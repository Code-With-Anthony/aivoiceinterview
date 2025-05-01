"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { ProfessionalDetails } from "@/types/profile";
import { Briefcase, GraduationCap } from "lucide-react";

interface ProfessionalDetailsProps {
  professionalDetails?: ProfessionalDetails;
  onEdit: () => void;
}

export default function ProfessionalDetailsSection({
  professionalDetails,
  onEdit,
}: ProfessionalDetailsProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <Briefcase className="h-5 w-5" />
          <CardTitle>Professional Details</CardTitle>
        </div>
        <Button variant="outline" onClick={onEdit}>
          Edit
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">
              Total Experience
            </h3>
            <p>
              {professionalDetails?.totalExperience || "Not specified"} years
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-3">Current Role</h3>
            {professionalDetails?.currentRole &&
            professionalDetails.currentRole.length > 0 ? (
              <div className="space-y-4">
                {professionalDetails.currentRole.map((role, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">
                          Designation
                        </h4>
                        <p>{role.designation}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">
                          Company
                        </h4>
                        <p>{role.companyName}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">
                          From
                        </h4>
                        <p>{role.fromYear}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">
                          To
                        </h4>
                        <p>{role.toYear || "Present"}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No current role information</p>
            )}
          </div>

          <Separator />

          <div>
            <div className="flex items-center gap-2 mb-3">
              <GraduationCap className="h-5 w-5" />
              <h3 className="font-medium">Education</h3>
            </div>
            {professionalDetails?.education &&
            professionalDetails.education.length > 0 ? (
              <div className="space-y-4">
                {professionalDetails.education.map((edu, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">
                          Institution
                        </h4>
                        <p>{edu.institution}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">
                          Degree
                        </h4>
                        <p>{edu.degree}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">
                          Field of Study
                        </h4>
                        <p>{edu.fieldOfStudy}</p>
                      </div>
                      <div className="md:col-span-2 grid grid-cols-2 gap-3">
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground">
                            From
                          </h4>
                          <p>{edu.fromYear}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground">
                            To
                          </h4>
                          <p>{edu.toYear || "Present"}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No education information</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
