import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FileText, Award, Lightbulb } from "lucide-react";
import type { Company } from "@/types/profile";

interface CompanyAboutProps {
  company: Company;
}

export default function CompanyAbout({ company }: CompanyAboutProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileText className="h-5 w-5 mr-2 text-primary" />
          About {company.name}
        </CardTitle>
        <CardDescription>
          Learn more about the company&apos;s mission, values, and products
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-2">Overview</h3>
          <p className="text-muted-foreground whitespace-pre-line">
            {company.description}
          </p>
        </div>

        <Separator />

        <div>
          <h3 className="text-lg font-medium mb-2 flex items-center">
            <Award className="h-5 w-5 mr-2 text-primary" />
            Mission & Values
          </h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium">Mission</h4>
              <p className="text-muted-foreground">{company.mission}</p>
            </div>
            {company.values && (
              <div>
                <h4 className="font-medium">Values</h4>
                <ul className="list-disc pl-5 text-muted-foreground space-y-1 mt-2">
                  {company.values.map((value, index) => (
                    <li key={index}>{value}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-lg font-medium mb-2 flex items-center">
            <Lightbulb className="h-5 w-5 mr-2 text-primary" />
            Products & Services
          </h3>
          {company.products && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {company.products.map((product, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="p-4">
                    <h4 className="font-medium">{product.name}</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {product.description}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
