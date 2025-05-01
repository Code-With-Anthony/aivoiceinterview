"use client";

import type React from "react";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { PersonalDetails, UserProfile } from "@/types/profile";
import { X, Plus } from "lucide-react";

interface PersonalDetailsFormProps {
  personalDetails?: PersonalDetails;
  updateFormData: (data: Partial<UserProfile>) => void;
}

export default function PersonalDetailsForm({
  personalDetails,
  updateFormData,
}: PersonalDetailsFormProps) {
  const [formState, setFormState] = useState<PersonalDetails>({
    age: personalDetails?.age || "",
    gender: personalDetails?.gender || "",
    address: personalDetails?.address || {
      street: "",
      city: "",
      state: "",
      pin: "",
    },
    image: personalDetails?.image || "",
    hobbies: personalDetails?.hobbies || [],
  });

  const [newHobby, setNewHobby] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormState((prev) => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof PersonalDetails] as Record<string, unknown>),
          [child]: value,
        },
      }));
    } else {
      setFormState((prev) => ({ ...prev, [name]: value }));
    }
    updateFormData({ personalDetails: { ...formState } });
  };

  const handleSelectChange = (value: string) => {
    setFormState((prev) => ({ ...prev, gender: value }));
    updateFormData({ personalDetails: { ...formState, gender: value } });
  };

  const addHobby = () => {
    if (newHobby.trim()) {
      const updatedHobbies = [...formState.hobbies!, newHobby.trim()];
      setFormState((prev) => ({ ...prev, hobbies: updatedHobbies }));
      updateFormData({
        personalDetails: { ...formState, hobbies: updatedHobbies },
      });
      setNewHobby("");
    }
  };

  const removeHobby = (index: number) => {
    const updatedHobbies = formState.hobbies!.filter((_, i) => i !== index);
    setFormState((prev) => ({ ...prev, hobbies: updatedHobbies }));
    updateFormData({
      personalDetails: { ...formState, hobbies: updatedHobbies },
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            name="age"
            value={formState.age}
            onChange={handleChange}
            placeholder="Enter your age"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="gender">Gender</Label>
          <Select value={formState.gender} onValueChange={handleSelectChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
              <SelectItem value="Prefer not to say">
                Prefer not to say
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">Profile Image URL</Label>
        <Input
          id="image"
          name="image"
          value={formState.image}
          onChange={handleChange}
          placeholder="Enter image URL"
        />
      </div>

      <div className="space-y-4">
        <Label>Address</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="address.street">Street</Label>
            <Input
              id="address.street"
              name="address.street"
              value={formState.address?.street}
              onChange={handleChange}
              placeholder="Enter street address"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address.city">City</Label>
            <Input
              id="address.city"
              name="address.city"
              value={formState.address?.city}
              onChange={handleChange}
              placeholder="Enter city"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address.state">State</Label>
            <Input
              id="address.state"
              name="address.state"
              value={formState.address?.state}
              onChange={handleChange}
              placeholder="Enter state"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address.pin">PIN Code</Label>
            <Input
              id="address.pin"
              name="address.pin"
              value={formState.address?.pin}
              onChange={handleChange}
              placeholder="Enter PIN code"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <Label>Hobbies</Label>
        <div className="flex flex-wrap gap-2 mb-2">
          {formState.hobbies?.map((hobby, index) => (
            <div
              key={index}
              className="flex items-center bg-muted px-3 py-1 rounded-full"
            >
              <span className="mr-1">{hobby}</span>
              <button
                type="button"
                onClick={() => removeHobby(index)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            value={newHobby}
            onChange={(e) => setNewHobby(e.target.value)}
            placeholder="Add a hobby"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addHobby();
              }
            }}
          />
          <Button type="button" onClick={addHobby} size="sm">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
