"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { SocialMedia } from "@/types/profile";
import { Globe, Linkedin, Github, ExternalLink } from "lucide-react";

interface SocialMediaSectionProps {
  socialMedia?: SocialMedia;
  onEdit: () => void;
}

export default function SocialMediaSection({
  socialMedia,
  onEdit,
}: SocialMediaSectionProps) {
  const socialLinks = [
    {
      name: "LinkedIn",
      url: socialMedia?.linkedin,
      icon: <Linkedin className="h-5 w-5" />,
    },
    {
      name: "GitHub",
      url: socialMedia?.github,
      icon: <Github className="h-5 w-5" />,
    },
    {
      name: "Stack Overflow",
      url: socialMedia?.stackoverflow,
      icon: <ExternalLink className="h-5 w-5" />,
    },
    {
      name: "Dribbble",
      url: socialMedia?.dribbble,
      icon: <ExternalLink className="h-5 w-5" />,
    },
    {
      name: "HackerRank",
      url: socialMedia?.hackerRank,
      icon: <ExternalLink className="h-5 w-5" />,
    },
    {
      name: "CodeForces",
      url: socialMedia?.codeForces,
      icon: <ExternalLink className="h-5 w-5" />,
    },
    {
      name: "HackerEarth",
      url: socialMedia?.hackerEarth,
      icon: <ExternalLink className="h-5 w-5" />,
    },
  ];

  const availableLinks = socialLinks.filter((link) => link.url);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <Globe className="h-5 w-5" />
          <CardTitle>Social Media</CardTitle>
        </div>
        <Button variant="outline" onClick={onEdit}>
          Edit
        </Button>
      </CardHeader>
      <CardContent>
        {availableLinks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availableLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-3 border rounded-lg hover:bg-muted transition-colors"
              >
                {link.icon}
                <span>{link.name}</span>
              </a>
            ))}
          </div>
        ) : (
          <p>No social media links provided</p>
        )}
      </CardContent>
    </Card>
  );
}
