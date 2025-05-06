import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Layers, Database, Server, Cloud } from "lucide-react";
import type { Company } from "@/types/profile";

interface CompanyTechStackProps {
  company: Company;
}

export default function CompanyTechStack({ company }: CompanyTechStackProps) {
  if (
    !company.techStack ||
    Object.keys(company.techStack).every(
      (key) => company.techStack![key].length === 0
    )
  ) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Code className="h-5 w-5 mr-2 text-primary" />
            Tech Stack
          </CardTitle>
          <CardDescription>Technologies used by {company.name}</CardDescription>
        </CardHeader>
        <CardContent className="text-center py-12">
          <p className="text-muted-foreground">
            No tech stack information available for this company.
          </p>
        </CardContent>
      </Card>
    );
  }

  const categories = {
    frontend: {
      icon: <Layers className="h-5 w-5 mr-2 text-primary" />,
      title: "Frontend",
    },
    backend: {
      icon: <Server className="h-5 w-5 mr-2 text-primary" />,
      title: "Backend",
    },
    database: {
      icon: <Database className="h-5 w-5 mr-2 text-primary" />,
      title: "Database",
    },
    devops: {
      icon: <Cloud className="h-5 w-5 mr-2 text-primary" />,
      title: "DevOps & Infrastructure",
    },
    other: {
      icon: <Code className="h-5 w-5 mr-2 text-primary" />,
      title: "Other Technologies",
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Code className="h-5 w-5 mr-2 text-primary" />
          Tech Stack
        </CardTitle>
        <CardDescription>Technologies used by {company.name}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(categories).map(
            ([category, { icon, title }]) =>
              company.techStack![category as keyof typeof company.techStack]
                ?.length > 0 && (
                <Card key={category}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      {icon} {title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {company.techStack![
                        category as keyof typeof company.techStack
                      ].map((tech, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="px-3 py-1"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )
          )}
        </div>
      </CardContent>
    </Card>
  );
}
