"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Bookmark,
  Building2,
  MapPin,
  Users,
  Globe,
  Bell,
  BellOff,
} from "lucide-react";
import type { Company } from "@/types/profile";
import { useState } from "react";

interface CompanyHeaderProps {
  company: Company;
}

export default function CompanyHeader({ company }: CompanyHeaderProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <Card className="overflow-hidden border-none shadow-md">
      <div className="h-40 w-full relative bg-gradient-to-r from-primary/20 to-primary/5">
        {company.coverImage && (
          <Image
            src={company.coverImage || "/placeholder.svg"}
            alt={`${company.name} cover`}
            fill
            className="object-cover opacity-50"
          />
        )}
      </div>
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row gap-6 p-6 relative">
          <div className="absolute -top-16 left-6 md:relative md:top-auto md:left-auto">
            <div className="relative h-32 w-32 rounded-xl overflow-hidden border-4 border-background bg-background shadow-md">
              <Image
                src={company.logo || "/placeholder.svg?height=128&width=128"}
                alt={company.name}
                fill
                className="object-contain p-2"
              />
            </div>
          </div>

          <div className="flex-grow mt-16 md:mt-0">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-3xl font-bold">{company.name}</h1>
                  {company.verified && (
                    <Badge variant="secondary">Verified</Badge>
                  )}
                </div>
                <p className="text-muted-foreground">{company.industry}</p>
              </div>

              <div className="flex gap-2 flex-wrap">
                <Button
                  variant={isBookmarked ? "secondary" : "outline"}
                  size="sm"
                  onClick={() => setIsBookmarked(!isBookmarked)}
                >
                  <Bookmark
                    className={`h-4 w-4 mr-2 ${
                      isBookmarked ? "fill-current" : ""
                    }`}
                  />
                  {isBookmarked ? "Bookmarked" : "Bookmark"}
                </Button>
                <Button
                  variant={isFollowing ? "secondary" : "outline"}
                  size="sm"
                  onClick={() => setIsFollowing(!isFollowing)}
                >
                  {isFollowing ? (
                    <BellOff className="h-4 w-4 mr-2" />
                  ) : (
                    <Bell className="h-4 w-4 mr-2" />
                  )}
                  {isFollowing ? "Following" : "Follow"}
                </Button>
                <Button>View Jobs</Button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                <span>Founded {company.foundedYear}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{company.headquarters}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>{company.size}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Website
                </a>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
