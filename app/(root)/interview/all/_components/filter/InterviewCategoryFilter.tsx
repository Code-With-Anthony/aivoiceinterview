import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

const InterviewCategoryFilter: React.FC<InterviewGeneralFilterProps> = ({
  addFilter,
  filters,
}) => {
  return (
    <div className="space-y-2 flex-1">
      <Label htmlFor="category">Interview Category</Label>
      <Select value={filters?.category[0] || ''} onValueChange={(val) => addFilter("category", val)}>
        <SelectTrigger id="category" className="w-full">
          <SelectValue placeholder="Select Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="technical">Technical</SelectItem>
          <SelectItem value="behavioral">Behavioral</SelectItem>
          <SelectItem value="non_technical">Non Technical</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default InterviewCategoryFilter;
