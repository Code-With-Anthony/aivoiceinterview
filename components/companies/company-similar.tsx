import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import type { Company } from "@/types/profile";

interface CompanySimilarProps {
  companies: Company[];
}

export default function CompanySimilar({ companies }: CompanySimilarProps) {
  if (companies.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {companies.map((company) => (
        <Card key={company.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="p-6">
              <div className="flex items-center gap-4">
                <div className="relative h-12 w-12 rounded-md overflow-hidden">
                  <Image
                    src={company.logo || "/placeholder.svg?height=48&width=48"}
                    alt={company.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-semibold">{company.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {company.industry}
                  </p>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Headquarters</span>
                  <span>{company.headquarters}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Company Size</span>
                  <span>{company.size}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Founded</span>
                  <span>{company.foundedYear}</span>
                </div>
              </div>

              {company.techStack && (
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground mb-2">
                    Tech Stack
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {Object.values(company.techStack)
                      .flat()
                      .slice(0, 5)
                      .map((tech, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                        >
                          {tech}
                        </Badge>
                      ))}
                    {Object.values(company.techStack).flat().length > 5 && (
                      <Badge variant="outline" className="text-xs">
                        +{Object.values(company.techStack).flat().length - 5}{" "}
                        more
                      </Badge>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t flex justify-end">
              <Link href={`/companies/${company.id}`}>
                <Button variant="ghost" size="sm" className="gap-1">
                  View Company
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
