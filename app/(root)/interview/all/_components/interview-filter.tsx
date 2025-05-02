"use client";

import type React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Slider } from "@/components/ui/slider";
import { useMobile } from "@/hooks/interview-use-mobile";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useState } from "react";

export default function InterviewFilters() {
  const isMobile = useMobile();

  const [search, setSearch] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would update the URL with the search params
    console.log("Searching for:", search);
  };

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
    <>
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="type">Interview Type</Label>
          <Select onValueChange={(value) => addFilter(`Type: ${value}`)}>
            <SelectTrigger id="type">
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

        <div className="space-y-2">
          <Label htmlFor="level">Difficulty Level</Label>
          <Select onValueChange={(value) => addFilter(`Level: ${value}`)}>
            <SelectTrigger id="level">
              <SelectValue placeholder="Select level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="easy">Easy</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="hard">Hard</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="stack">Tech Stack</Label>
          <Select onValueChange={(value) => addFilter(`Stack: ${value}`)}>
            <SelectTrigger id="stack">
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

        <div className="space-y-4">
          <div className="flex justify-between">
            <Label>Duration (minutes)</Label>
            <span className="text-sm text-muted-foreground">30-120</span>
          </div>
          <Slider defaultValue={[30, 120]} min={15} max={180} step={15} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select onValueChange={(value) => addFilter(`Status: ${value}`)}>
            <SelectTrigger id="status">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="upcoming">Upcoming</SelectItem>
              <SelectItem value="limited">Limited Time</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </>
  );

  return (
    <div className="mb-8 space-y-4">
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search interviews by name, company, or skills..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {isMobile ? (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
                <SheetDescription>
                  Narrow down interviews based on your preferences
                </SheetDescription>
              </SheetHeader>
              <div className="py-6">
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
          <Button variant="outline" size="icon">
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        )}

        <Button type="submit">Search</Button>
      </form>

      {!isMobile && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 border rounded-lg bg-muted/40">
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
