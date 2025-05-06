"use client";

import { Skeleton } from "@/components/ui/skeleton";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { SlidersHorizontal, Search } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export default function InterviewFiltersSkeleton() {
  const isMobile = useIsMobile();

  const FilterSkeletonBlock = () => (
    <div className="space-y-2 flex-1">
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-10 w-full" />
    </div>
  );

  return (
    <div className="mb-8 space-y-4">
      <div className="flex gap-2 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground z-2" />
          <Skeleton className="h-10 w-full pl-10" />
        </div>

        {isMobile ? (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="h-10 w-10">
                <SlidersHorizontal className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>
                  <Skeleton className="h-6 w-24" />
                </SheetTitle>
                <SheetDescription>
                  <Skeleton className="h-4 w-48" />
                </SheetDescription>
              </SheetHeader>
              <div className="px-4 space-y-6 mt-4">
                {[...Array(5)].map((_, i) => (
                  <FilterSkeletonBlock key={i} />
                ))}
              </div>
              <SheetFooter className="mt-6 flex flex-col gap-2">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </SheetFooter>
            </SheetContent>
          </Sheet>
        ) : (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="lg">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </PopoverTrigger>
            <PopoverContent className="space-y-4 w-80">
              {[...Array(3)].map((_, i) => (
                <FilterSkeletonBlock key={i} />
              ))}
              <div className="flex gap-2 pt-2">
                <Skeleton className="h-10 w-1/2" />
                <Skeleton className="h-10 w-1/2" />
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </div>
  );
}
