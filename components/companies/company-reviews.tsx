"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Star,
  StarHalf,
  Briefcase,
  Clock,
  Users,
  Sparkles,
} from "lucide-react";
import type { Company } from "@/types/profile";

interface CompanyReviewsProps {
  company: Company;
}

export default function CompanyReviews({ company }: CompanyReviewsProps) {
  const [helpfulReviews, setHelpfulReviews] = useState<Record<string, boolean>>(
    {}
  );

  const toggleHelpful = (reviewId: string) => {
    setHelpfulReviews((prev) => ({
      ...prev,
      [reviewId]: !prev[reviewId],
    }));
  };

  if (!company.reviews || company.reviews.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageSquare className="h-5 w-5 mr-2 text-primary" />
            Employee Reviews
          </CardTitle>
          <CardDescription>
            Insights into company culture and work environment
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center py-12">
          <p className="text-muted-foreground">
            No reviews available for this company yet.
          </p>
        </CardContent>
      </Card>
    );
  }

  // Calculate average ratings
  const avgWorkLifeBalance =
    company.reviews.reduce(
      (sum, review) => sum + review.ratings.workLifeBalance,
      0
    ) / company.reviews.length;
  const avgCulture =
    company.reviews.reduce((sum, review) => sum + review.ratings.culture, 0) /
    company.reviews.length;
  const avgCareerGrowth =
    company.reviews.reduce(
      (sum, review) => sum + review.ratings.careerGrowth,
      0
    ) / company.reviews.length;
  const avgDiversity =
    company.reviews.reduce((sum, review) => sum + review.ratings.diversity, 0) /
    company.reviews.length;

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    return (
      <div className="flex">
        {Array(fullStars)
          .fill(0)
          .map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
          ))}
        {hasHalfStar && (
          <StarHalf className="h-4 w-4 fill-amber-500 text-amber-500" />
        )}
        {Array(5 - fullStars - (hasHalfStar ? 1 : 0))
          .fill(0)
          .map((_, i) => (
            <Star
              key={i + fullStars + (hasHalfStar ? 1 : 0)}
              className="h-4 w-4 text-muted-foreground"
            />
          ))}
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <MessageSquare className="h-5 w-5 mr-2 text-primary" />
          Employee Reviews
        </CardTitle>
        <CardDescription>
          Insights into company culture and work environment
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Rating Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Work-Life Balance</span>
                  <div className="flex items-center gap-2">
                    {renderStars(avgWorkLifeBalance)}
                    <span className="text-sm font-medium">
                      {avgWorkLifeBalance.toFixed(1)}
                    </span>
                  </div>
                </div>
                <Progress value={avgWorkLifeBalance * 20} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Culture & Values</span>
                  <div className="flex items-center gap-2">
                    {renderStars(avgCulture)}
                    <span className="text-sm font-medium">
                      {avgCulture.toFixed(1)}
                    </span>
                  </div>
                </div>
                <Progress value={avgCulture * 20} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Career Growth</span>
                  <div className="flex items-center gap-2">
                    {renderStars(avgCareerGrowth)}
                    <span className="text-sm font-medium">
                      {avgCareerGrowth.toFixed(1)}
                    </span>
                  </div>
                </div>
                <Progress value={avgCareerGrowth * 20} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Diversity & Inclusion</span>
                  <div className="flex items-center gap-2">
                    {renderStars(avgDiversity)}
                    <span className="text-sm font-medium">
                      {avgDiversity.toFixed(1)}
                    </span>
                  </div>
                </div>
                <Progress value={avgDiversity * 20} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Company Highlights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-2">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Clock className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Flexible Hours</h4>
                    <p className="text-xs text-muted-foreground">
                      Mentioned in 80% of reviews
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Users className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Great Team</h4>
                    <p className="text-xs text-muted-foreground">
                      Mentioned in 75% of reviews
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Briefcase className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Career Growth</h4>
                    <p className="text-xs text-muted-foreground">
                      Mentioned in 65% of reviews
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Sparkles className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Innovative Work</h4>
                    <p className="text-xs text-muted-foreground">
                      Mentioned in 60% of reviews
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Separator />

        <div className="space-y-6">
          <h3 className="text-lg font-medium">Employee Reviews</h3>

          {company.reviews.map((review, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage
                        src={review.avatar || "/placeholder.svg"}
                        alt={review.author}
                      />
                      <AvatarFallback>
                        {review.author.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{review.author}</h4>
                      <p className="text-sm text-muted-foreground">
                        {review.position}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {renderStars(
                      (review.ratings.workLifeBalance +
                        review.ratings.culture +
                        review.ratings.careerGrowth +
                        review.ratings.diversity) /
                        4
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  <h5 className="font-medium">{review.title}</h5>
                  <p className="text-muted-foreground mt-2">{review.content}</p>
                </div>

                {(review.pros || review.cons) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    {review.pros && (
                      <div>
                        <h6 className="text-sm font-medium text-green-600 dark:text-green-400">
                          Pros
                        </h6>
                        <p className="text-sm text-muted-foreground mt-1">
                          {review.pros}
                        </p>
                      </div>
                    )}
                    {review.cons && (
                      <div>
                        <h6 className="text-sm font-medium text-red-600 dark:text-red-400">
                          Cons
                        </h6>
                        <p className="text-sm text-muted-foreground mt-1">
                          {review.cons}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex justify-between items-center mt-4 pt-4 border-t">
                  <span className="text-xs text-muted-foreground">
                    {review.date}
                  </span>
                  <div className="flex items-center gap-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 gap-1"
                      onClick={() => toggleHelpful(review.id)}
                    >
                      {helpfulReviews[review.id] ? (
                        <ThumbsUp className="h-4 w-4 fill-primary text-primary" />
                      ) : (
                        <ThumbsUp className="h-4 w-4" />
                      )}
                      <span>
                        {helpfulReviews[review.id]
                          ? "Helpful"
                          : "Mark as helpful"}
                      </span>
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 gap-1">
                      <ThumbsDown className="h-4 w-4" />
                      <span>Not helpful</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-center border-t p-4">
        <Button>Write a Review</Button>
      </CardFooter>
    </Card>
  );
}
