"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { placeholders } from "@/constants";
import { useMobile } from "@/hooks/interview-use-mobile";
import { Search, SlidersHorizontal, Sparkles } from "lucide-react";
import { redirect, useSearchParams } from "next/navigation";
import type React from "react";
import { useEffect, useState } from "react";
import { CompanyFilter } from "./filter/CompanyFilter";
import DifficultyLevelFilter from "./filter/DifficultyLevelFilter";
import InterviewDurationFilter from "./filter/InterviewDurationFilter";
import InterviewStatusFilter from "./filter/InterviewStatusFilter";
import ActiveFilterBadges from "./filter/ActiveFilterBadges";
import InterviewCategoryFilter from "./filter/InterviewCategoryFilter";
import InterviewTypeFilter from "./filter/InterviewTypeFilter";
import PlatformFilter from "./filter/PlatformFilter";
import { TechnologyFilter } from "./filter/TechnologiesFilter";


interface InterviewFilterProps {
  activeStatus: string | null;
  onStatusChange: (status: string | null) => void;
  onCompanyChange: (company: string[] | null) => void;
  onLevelChange: (level: string | null) => void;
  onTechnologyChange: (technology: string[] | null) => void;
  onInterviewTypeChange: (type: string | null) => void;
  onSearchChange: (query: string) => void;
  onCategoryChange: (category: string | null) => void;
}

export default function InterviewFilters({
  activeStatus,
  onStatusChange,
  onCompanyChange,
  onLevelChange,
  onTechnologyChange,
  onInterviewTypeChange,
  onSearchChange,
  onCategoryChange
}: InterviewFilterProps) {
  const isMobile = useMobile();
  const searchParams = useSearchParams();
  const initialType = searchParams.get("type");
  const [filters, setFilters] = useState<InterviewFiltersInterface>({
    status: [],
    technologies: [],
    level: [],
    company: [],
    category: [],
    type: [],
  });

  const addFilter = (category: keyof typeof filters, value: string) => {
    setFilters((prev) => {
      return {
        ...prev,
        [category]: [value], // always replace with a single-item array for single selects
      };
    });

    // For single select filters, notify parent immediately (except company & technology)
    if (category === "status") onStatusChange(value);
    else if (category === "level") onLevelChange(value);
    else if (category === "type") { console.log("did i came herer: ", value); onInterviewTypeChange(value) }
    else if (category === "category") onCategoryChange(value);
  };

  // Remove single filter value
  const removeFilter = (category: keyof typeof filters, value: string) => {
    setFilters((prev) => {
      const updatedCategoryFilters = prev[category].filter((v) => v !== value);

      // Notify parent with updated filter(s)
      switch (category) {
        case "status":
          onStatusChange(updatedCategoryFilters.length > 0 ? updatedCategoryFilters[0] : null);
          break;
        case "company":
          onCompanyChange(updatedCategoryFilters.length > 0 ? updatedCategoryFilters : null);
          break;
        case "level":
          onLevelChange(updatedCategoryFilters.length > 0 ? updatedCategoryFilters[0] : null);
          break;
        case "technologies":
          onTechnologyChange(updatedCategoryFilters.length > 0 ? updatedCategoryFilters : null);
          break;
        case "type":
          onInterviewTypeChange(updatedCategoryFilters.length > 0 ? updatedCategoryFilters[0] : null);
          break;
        case "category":
          onCategoryChange(updatedCategoryFilters.length > 0 ? updatedCategoryFilters[0] : null);
      }

      return { ...prev, [category]: updatedCategoryFilters };
    });
  };

  const clearAllFilters = () => {
    onStatusChange(null)
    onCompanyChange(null)
    onLevelChange(null)
    onTechnologyChange(null)
    onInterviewTypeChange(null)
    setFilters({
      status: [],
      technologies: [],
      level: [],
      company: [],
      type: [],
      category: [],
    });
  };

  // Update company filter from MultiSelect
  const handleCompanyChange = (selected: string[]) => {
    setFilters((prev) => ({ ...prev, company: selected }));
    onCompanyChange(selected.length === 0 ? null : selected);
  };

  // Update technology filter from MultiSelect
  const handleTechnologyChange = (selected: string[]) => {
    setFilters((prev) => ({ ...prev, technologies: selected }));
    onTechnologyChange(selected.length === 0 ? null : selected);
  };


  const FiltersContent = () => (
    <div className="w-full flex justify-evenly gap-6 flex-wrap mt-2">

      {/* Interview Category */}
      <InterviewCategoryFilter filters={filters} addFilter={addFilter} />

      {/* Platform */}
      <PlatformFilter filters={filters} addFilter={addFilter} />

      {/* Technologies */}
      <div className="space-y-2 flex-1">
        <Label htmlFor="stack">Technologies</Label>
        <TechnologyFilter onChange={handleTechnologyChange} selected={filters.technologies} />
      </div>

      {/* Difficulty Level */}
      <DifficultyLevelFilter filters={filters} addFilter={addFilter} />

      {/* Compannies */}
      <div className="space-y-2 flex-1">
        <Label htmlFor="company">Company</Label>
        <CompanyFilter onChange={handleCompanyChange} selected={filters.company} />
      </div>
    </div>
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };

  // On mount, apply initial type filter from query param (if needed)
  useEffect(() => {
    if (initialType && !filters.type.includes(initialType)) {
      setFilters((prev) => ({ ...prev, type: [initialType] }));
      onInterviewTypeChange(initialType);
    }
  }, [initialType]);

  const hasActiveFilters = Object.values(filters).some(arr => arr.length > 0);

  return (
    <div className="mb-8 space-y-4">
      <div className="flex gap-2 items-center">
        <div className="relative flex-1">
          <Search className="hidden md:flex absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground z-2" />
          <PlaceholdersAndVanishInput
            placeholders={placeholders}
            onChange={handleChange}
            onSubmit={onSubmit}
          />
        </div>

        {isMobile ? (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="h-10 w-10">
                <SlidersHorizontal className="h-10 w-10" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
                <SheetDescription>
                  Narrow down interviews based on your preferences
                </SheetDescription>
              </SheetHeader>
              <div className="px-4">
                <FiltersContent />
              </div>
              <SheetFooter>
                <Button
                  onClick={clearAllFilters}
                  variant="outline"
                  className="w-full"
                >
                  Clear Filters
                </Button>
                <Button className="w-full">Apply Filters</Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        ) : (
          <Popover>
            <PopoverTrigger asChild className="relative">
              <Button variant="outline" size="lg">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </PopoverTrigger>
            <PopoverContent className="absolute top-2 right-[-55px]">
              <h4 className="text-sm font-semibold mb-4">Filter Interviews</h4>
              <div className="space-y-4">
                <InterviewTypeFilter filters={filters} addFilter={addFilter} />

                <InterviewStatusFilter activeStatus={activeStatus} addFilter={addFilter} />

                <InterviewDurationFilter />

                {/* <FiltersContent /> */}
                <div className="flex gap-2 justify-end">
                  <Button onClick={clearAllFilters} variant="outline" size="sm">
                    Clear
                  </Button>
                  <Button size="sm">Apply</Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        )}

        <Button
          type="button"
          className="hidden md:flex cursor-pointer"
          onClick={() => redirect("/interview/create")}
        >
          <Sparkles />
          Create Interview
        </Button>
      </div>

      {!isMobile && (
        <div className="hidden md:flex w-full">
          <FiltersContent />
        </div>
      )}

      {hasActiveFilters && <ActiveFilterBadges filters={filters} removeFilter={removeFilter} />}
    </div>
  );
}
