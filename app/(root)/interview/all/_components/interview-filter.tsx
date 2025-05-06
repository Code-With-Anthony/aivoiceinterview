"use client";

import type React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useMobile } from "@/hooks/interview-use-mobile";
import { Search, SlidersHorizontal, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { redirect } from "next/navigation";

export default function InterviewFilters() {
  const isMobile = useMobile();

  // const [search, setSearch] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  // const handleSearch = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   // In a real app, you would update the URL with the search params
  //   console.log("Searching for:", search);
  // };

  const addFilter = (filter: string) => {
    if (!activeFilters.includes(filter)) {
      setActiveFilters([...activeFilters, filter]);
    }
  };

  const removeFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter((f) => f !== filter));
  };

  const clearAllFilters = () => {
    setActiveFilters([]);
  };

  const FiltersContent = () => (
    <div className="w-full flex justify-evenly gap-6 flex-wrap mt-2">
      <div className="space-y-2 flex-1">
        <Label htmlFor="type">Interview Type</Label>
        <Select onValueChange={(value) => addFilter(`Type: ${value}`)}>
          <SelectTrigger id="type" className="w-full">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="technical">Technical</SelectItem>
            <SelectItem value="behavioral">Behavioral</SelectItem>
            <SelectItem value="mixed">Mixed</SelectItem>
            <SelectItem value="coding">Coding</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2 flex-1">
        <Label htmlFor="status">Platform</Label>
        <Select onValueChange={(value) => addFilter(`Status: ${value}`)}>
          <SelectTrigger id="status" className="w-full">
            <SelectValue placeholder="Select platform" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="linkedin">LinkedIn</SelectItem>
            <SelectItem value="naukri">Naukri</SelectItem>
            <SelectItem value="indeed">Indeed</SelectItem>
            <SelectItem value="monster">Monster</SelectItem>
            <SelectItem value="glassdoor">Glassdoor</SelectItem>
            <SelectItem value="anglelist">AngelList</SelectItem>
            <SelectItem value="custom">Custom</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2 flex-1">
        <Label htmlFor="stack">Tech Stack</Label>
        <Select onValueChange={(value) => addFilter(`Stack: ${value}`)}>
          <SelectTrigger id="stack" className="w-full">
            <SelectValue placeholder="Select stack" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="mern">MERN Stack</SelectItem>
            <SelectItem value="mean">MEAN Stack</SelectItem>
            <SelectItem value="javascript">JavaScript</SelectItem>
            <SelectItem value="python">Python</SelectItem>
            <SelectItem value="java">Java</SelectItem>
            <SelectItem value="dotnet">.NET</SelectItem>
            <SelectItem value="devops">DevOps</SelectItem>
            <SelectItem value="project-management">
              Project Management
            </SelectItem>
            <SelectItem value="hr">HR</SelectItem>
            <SelectItem value="sales">Sales</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2 flex-1">
        <Label htmlFor="level">Difficulty Level</Label>
        <Select onValueChange={(value) => addFilter(`Level: ${value}`)}>
          <SelectTrigger id="level" className="w-full">
            <SelectValue placeholder="Select level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="easy">Easy</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="hard">Hard</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* <div className="space-y-4">
        <div className="flex justify-between">
          <Label>Duration (minutes)</Label>
        </div>
        <Slider defaultValue={[30, 120]} min={15} max={180} step={15} />
        <span className="text-sm text-muted-foreground">30-120</span>
      </div> */}

      <div className="space-y-2 flex-1">
        <Label htmlFor="company">Company</Label>
        <Select onValueChange={(value) => addFilter(`Company: ${value}`)}>
          <SelectTrigger id="company" className="w-full">
            <SelectValue placeholder="Select company" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="google">Google</SelectItem>
            <SelectItem value="microsoft">Microsoft</SelectItem>
            <SelectItem value="amazon">Amazon</SelectItem>
            <SelectItem value="tcs">TCS</SelectItem>
            <SelectItem value="infosys">Infosys</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  const placeholders = [
    "Google Frontend Developer",
    "Microsoft Full Stack Engineer",
    "Apple Backend Engineer",
    "Javascript Coding Interview",
    "Zomato Business Analyst Interview",
    "KPMG Project Manager Interview",
    "RBI Grade B Interview",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };

  return (
    <div className="mb-8 space-y-4">
      <div className="flex gap-2 items-center">
        <div className="relative flex-1">
          <Search className="hidden md:flex absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground z-2" />
          {/* <Input
            placeholder="Search interviews by name, company, or skills..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          /> */}
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
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <Label>Duration (minutes)</Label>
                  </div>
                  <Slider
                    defaultValue={[30, 120]}
                    min={15}
                    max={180}
                    step={15}
                  />
                  <span className="text-sm text-muted-foreground">30-120</span>
                </div>

                <div className="space-y-2 flex-1">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    onValueChange={(value) => addFilter(`Status: ${value}`)}
                  >
                    <SelectTrigger id="status" className="w-full">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="upcoming">Upcoming</SelectItem>
                      <SelectItem value="limited">Limited Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

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
          className="hidden md:flex"
          onClick={() => redirect("/interview/custom")}
        >
          <Sparkles />
          Custom Interview
        </Button>
      </div>

      {!isMobile && (
        <div className="hidden md:flex w-full">
          <FiltersContent />
        </div>
      )}

      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 items-center mt-4">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {activeFilters.map((filter) => (
            <Badge
              key={filter}
              variant="secondary"
              className="flex items-center gap-1"
            >
              {filter}
              <button onClick={() => removeFilter(filter)}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-xs"
          >
            Clear all
          </Button>
        </div>
      )}
    </div>
  );
}
