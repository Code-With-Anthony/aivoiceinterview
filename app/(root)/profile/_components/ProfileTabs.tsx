import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CertificationsSection from "../sections/certifications-section";
import ExperienceSection from "../sections/experience-section";
import PersonalDetailsSection from "../sections/personal-details";
import ProfessionalDetailsSection from "../sections/professional-details";
import ProjectsSection from "../sections/projects-section";
import SkillsSection from "../sections/skills-section";
import SocialMediaSection from "../sections/social-media-section";
import TrainingsSection from "../sections/trainings-section";

const ProfileTabs = ({ profile, handleEdit }: any) => {
  return (
    <Tabs defaultValue="personal" className="w-full">
      <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 mb-8">
        <TabsTrigger value="personal">Personal</TabsTrigger>
        <TabsTrigger value="professional">Professional</TabsTrigger>
        <TabsTrigger value="experience">Experience</TabsTrigger>
        <TabsTrigger value="skills">Skills</TabsTrigger>
        <TabsTrigger value="trainings">Trainings</TabsTrigger>
        <TabsTrigger value="certifications">Certifications</TabsTrigger>
        <TabsTrigger value="projects">Projects</TabsTrigger>
        <TabsTrigger value="social">Social</TabsTrigger>
      </TabsList>

      <TabsContent value="personal">
        <PersonalDetailsSection
          personalDetails={profile.personalDetails}
          onEdit={() => handleEdit("personal")}
        />
      </TabsContent>

      <TabsContent value="professional">
        <ProfessionalDetailsSection
          professionalDetails={profile.professionalDetails}
          onEdit={() => handleEdit("professional")}
        />
      </TabsContent>

      <TabsContent value="experience">
        <ExperienceSection
          experience={profile.experience}
          onEdit={() => handleEdit("experience")}
        />
      </TabsContent>

      <TabsContent value="skills">
        <SkillsSection
          skills={profile.skills}
          onEdit={() => handleEdit("skills")}
        />
      </TabsContent>

      <TabsContent value="trainings">
        <TrainingsSection
          trainings={profile.trainings}
          onEdit={() => handleEdit("trainings")}
        />
      </TabsContent>

      <TabsContent value="certifications">
        <CertificationsSection
          certifications={profile.certifications}
          onEdit={() => handleEdit("certifications")}
        />
      </TabsContent>

      <TabsContent value="projects">
        <ProjectsSection
          projects={profile.projects}
          onEdit={() => handleEdit("projects")}
        />
      </TabsContent>

      <TabsContent value="social">
        <SocialMediaSection
          socialMedia={profile.socialMedia}
          onEdit={() => handleEdit("social")}
        />
      </TabsContent>
    </Tabs>
  );
};

export default ProfileTabs;
