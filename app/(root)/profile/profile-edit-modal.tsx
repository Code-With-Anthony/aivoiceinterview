"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { UserProfile } from "@/types/profile";
import { useState } from "react";
import CertificationsForm from "./forms/certifications-form";
import ExperienceForm from "./forms/experience-form";
import PersonalDetailsForm from "./forms/personal-details-form";
import ProfessionalDetailsForm from "./forms/professional-details-form";
import ProjectsForm from "./forms/projects-form";
import SkillsForm from "./forms/skills-form";
import SocialMediaForm from "./forms/social-media-form";
import TrainingsForm from "./forms/trainings-form";

interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  section: string | null;
  userData: UserProfile;
  onSave: (updatedData: Partial<UserProfile>) => void;
}

export default function ProfileEditModal({
  isOpen,
  onClose,
  section,
  userData,
  onSave,
}: ProfileEditModalProps) {
  const [formData, setFormData] = useState<Partial<UserProfile>>(userData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const updateFormData = (data: Partial<UserProfile>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const renderForm = () => {
    switch (section) {
      case "personal":
        return (
          <PersonalDetailsForm
            personalDetails={userData.personalDetails}
            updateFormData={updateFormData}
          />
        );
      case "professional":
        return (
          <ProfessionalDetailsForm
            professionalDetails={userData.professionalDetails}
            updateFormData={updateFormData}
          />
        );
      case "experience":
        return (
          <ExperienceForm
            experience={userData.experience}
            updateFormData={updateFormData}
          />
        );
      case "skills":
        return (
          <SkillsForm
            skills={userData.skills}
            updateFormData={updateFormData}
          />
        );
      case "trainings":
        return (
          <TrainingsForm
            trainings={userData.trainings}
            updateFormData={updateFormData}
          />
        );
      case "certifications":
        return (
          <CertificationsForm
            certifications={userData.certifications}
            updateFormData={updateFormData}
          />
        );
      case "projects":
        return (
          <ProjectsForm
            projects={userData.projects}
            updateFormData={updateFormData}
          />
        );
      case "social":
        return (
          <SocialMediaForm
            socialMedia={userData.socialMedia}
            updateFormData={updateFormData}
          />
        );
      default:
        return <div>Unknown section</div>;
    }
  };

  const getSectionTitle = () => {
    switch (section) {
      case "basic":
        return "Edit Basic Information";
      case "personal":
        return "Edit Personal Details";
      case "professional":
        return "Edit Professional Details";
      case "experience":
        return "Edit Experience";
      case "skills":
        return "Edit Skills";
      case "trainings":
        return "Edit Trainings";
      case "certifications":
        return "Edit Certifications";
      case "projects":
        return "Edit Projects";
      case "social":
        return "Edit Social Media";
      default:
        return "Edit Profile";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{getSectionTitle()}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          {renderForm()}
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
