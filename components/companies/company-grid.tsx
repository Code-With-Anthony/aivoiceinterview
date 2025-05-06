import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2, MapPin, Users, ArrowRight } from "lucide-react";
import type { Company } from "@/types/profile";

interface CompanyGridProps {
  companies: Company[];
}

export default function CompanyGrid({ companies }: CompanyGridProps) {
  if (companies.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium">No companies found</h3>
        <p className="text-muted-foreground">
          Try adjusting your filters or search criteria
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {companies.map((company) => (
        <Card key={company.id} className="overflow-hidden flex flex-col">
          <div className="h-32 w-full relative bg-gradient-to-r from-primary/20 to-primary/5">
            {company.coverImage && (
              <Image
                src={company.coverImage || "/placeholder.svg"}
                alt={`${company.name} cover`}
                fill
                className="object-cover opacity-50"
              />
            )}
          </div>
          <CardContent className="p-6 flex-grow">
            <div className="flex items-center gap-4">
              <div className="relative h-16 w-16 rounded-md overflow-hidden border bg-background">
                <Image
                  src={company.logo || "/placeholder.svg?height=64&width=64"}
                  alt={company.name}
                  fill
                  className="object-contain p-1"
                />
              </div>
              <div>
                <h3 className="font-semibold text-xl">{company.name}</h3>
                <p className="text-muted-foreground">{company.industry}</p>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{company.headquarters}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>{company.size}</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                <span>Founded {company.foundedYear}</span>
              </div>
            </div>

            {company.techStack && (
              <div className="mt-4">
                <p className="text-sm text-muted-foreground mb-2">Tech Stack</p>
                <div className="flex flex-wrap gap-1">
                  {Object.values(company.techStack)
                    .flat()
                    .slice(0, 5)
                    .map((tech, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  {Object.values(company.techStack).flat().length > 5 && (
                    <Badge variant="outline" className="text-xs">
                      +{Object.values(company.techStack).flat().length - 5} more
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="p-6 pt-0 flex justify-between">
            <Button variant="outline" asChild>
              <Link href={`/companies/${company.id}/jobs`}>View Jobs</Link>
            </Button>
            <Button asChild>
              <Link
                href={`/companies/${company.id}`}
                className="flex items-center gap-1"
              >
                Company Profile
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
