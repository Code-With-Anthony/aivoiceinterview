import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Linkedin, Twitter, Github, Globe } from "lucide-react";
import type { Company } from "@/types/profile";

interface CompanySocialProps {
  company: Company;
}

export default function CompanySocial({ company }: CompanySocialProps) {
  if (!company.social || Object.values(company.social).every((link) => !link)) {
    return null;
  }

  const socialLinks = [
    {
      name: "LinkedIn",
      url: company.social.linkedin,
      icon: <Linkedin className="h-5 w-5" />,
      color: "bg-[#0077B5]/10 text-[#0077B5]",
    },
    {
      name: "Twitter",
      url: company.social.twitter,
      icon: <Twitter className="h-5 w-5" />,
      color: "bg-[#1DA1F2]/10 text-[#1DA1F2]",
    },
    {
      name: "GitHub",
      url: company.social.github,
      icon: <Github className="h-5 w-5" />,
      color: "bg-[#333]/10 text-[#333] dark:text-white",
    },
    {
      name: "Glassdoor",
      url: company.social.glassdoor,
      icon: <Globe className="h-5 w-5" />,
      color: "bg-[#0CAA41]/10 text-[#0CAA41]",
    },
  ].filter((link) => link.url);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Globe className="h-5 w-5 mr-2 text-primary" />
          Connect with {company.name}
        </CardTitle>
        <CardDescription>Follow {company.name} on social media</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {socialLinks.map((link, index) => (
            <Button
              key={index}
              variant="outline"
              className="h-auto py-6 flex flex-col gap-3 hover:bg-muted"
              asChild
            >
              <a href={link.url!} target="_blank" rel="noopener noreferrer">
                <div className={`rounded-full p-3 ${link.color}`}>
                  {link.icon}
                </div>
                <span>{link.name}</span>
              </a>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
