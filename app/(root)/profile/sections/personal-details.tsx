"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { PersonalDetails } from "@/types/profile";
import { UserCircle } from "lucide-react";

interface PersonalDetailsProps {
  personalDetails?: PersonalDetails;
  onEdit: () => void;
}

export default function PersonalDetailsSection({
  personalDetails,
  onEdit,
}: PersonalDetailsProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <UserCircle className="h-5 w-5" />
          <CardTitle>Personal Details</CardTitle>
        </div>
        <Button variant="outline" onClick={onEdit}>
          Edit
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">
              Age
            </h3>
            <p>{personalDetails?.age || "Not specified"}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">
              Gender
            </h3>
            <p>{personalDetails?.gender || "Not specified"}</p>
          </div>
          <div className="md:col-span-2">
            <h3 className="text-sm font-medium text-muted-foreground mb-1">
              Address
            </h3>
            {personalDetails?.address ? (
              <p>
                {personalDetails.address.street}, {personalDetails.address.city}
                , {personalDetails.address.state} -{" "}
                {personalDetails.address.pin}
              </p>
            ) : (
              <p>No address provided</p>
            )}
          </div>
          <div className="md:col-span-2">
            <h3 className="text-sm font-medium text-muted-foreground mb-1">
              Hobbies
            </h3>
            <div className="flex flex-wrap gap-2 mt-1">
              {personalDetails?.hobbies &&
              personalDetails.hobbies.length > 0 ? (
                personalDetails.hobbies.map((hobby, index) => (
                  <Badge key={index} variant="secondary">
                    {hobby}
                  </Badge>
                ))
              ) : (
                <p>No hobbies listed</p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
