import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, ExternalLink } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Resource {
  id: string;
  title: string;
  description: string;
  category: string;
  url: string;
  isExternal: boolean;
}

interface TipsResourcesProps {
  resources: Resource[];
}

export default function TipsResources({ resources }: TipsResourcesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <BookOpen className="h-5 w-5 mr-2 text-primary" />
          Resources & Tips
        </CardTitle>
        <CardDescription>
          Helpful articles to improve your interview skills
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Carousel className="w-full">
          <CarouselContent>
            {resources.map((resource, index) => (
              <CarouselItem key={index}>
                <Card className="border-none shadow-none">
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-sm">{resource.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {resource.description}
                    </p>
                    <div className="flex justify-end mt-3">
                      <Link href={resource.url}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 text-xs gap-1"
                        >
                          Read more
                          {resource.isExternal && (
                            <ExternalLink className="h-3 w-3" />
                          )}
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex items-center justify-center mt-2">
            <CarouselPrevious className="relative inset-0 translate-y-0 mr-2" />
            <CarouselNext className="relative inset-0 translate-y-0" />
          </div>
        </Carousel>
      </CardContent>
      <CardFooter className="flex justify-end border-t p-4">
        <Link href="/resources">
          <Button variant="ghost" size="sm" className="gap-1">
            View all resources
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
