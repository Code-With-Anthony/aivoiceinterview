"use client";
import { Button } from "@/components/ui/button";
import AvatarCard from "./_components/AvatarCard";
import BadgeShowcase from "./_components/Badge";
import ProfileHeader from "./_components/ProfileHeader";
import ProfileTabs from "./_components/ProfileTabs";
import { useState } from "react";
import { UserProfile } from "@/types/profile";
import ProfileEditModal from "./profile-edit-modal";

interface ProfilePageProps {
  userData: UserProfile;
}

const ProfilePage = ({ userData }: ProfilePageProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [profile, setProfile] = useState<UserProfile>(userData);

  const handleEdit = (section: string) => {
    setActiveSection(section);
    setIsEditing(true);
  };

  const handleSave = (updatedData: Partial<UserProfile>) => {
    setProfile({ ...profile, ...updatedData });
    setIsEditing(false);
    setActiveSection(null);
    // In a real app, you would save the data to the server here
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Main Profile Section */}
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <AvatarCard />
        </div>

        {/* Content */}
        <div className="flex-1 w-full">
          <ProfileHeader />
          <div className="mt-4">
            <BadgeShowcase />
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <Button className="w-full sm:w-auto">Follow</Button>
            <Button className="w-full sm:w-auto" variant="outline">
              Get in touch
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mt-8 w-full px-4 sm:px-6">
        <ProfileTabs profile={profile} handleEdit={handleEdit} />
      </div>

      {isEditing && (
        <ProfileEditModal
          isOpen={isEditing}
          onClose={() => setIsEditing(false)}
          section={activeSection}
          userData={profile}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default ProfilePage;
