"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function ToogleMode() {
  const { setTheme } = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleSetTheme = (theme: string) => {
    setTheme(theme);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-36 p-2">
        <button
          onClick={() => handleSetTheme("light")}
          className="w-full text-left px-2 py-1.5 text-sm hover:bg-muted rounded"
        >
          Light
        </button>
        <button
          onClick={() => handleSetTheme("dark")}
          className="w-full text-left px-2 py-1.5 text-sm hover:bg-muted rounded"
        >
          Dark
        </button>
        <button
          onClick={() => handleSetTheme("system")}
          className="w-full text-left px-2 py-1.5 text-sm hover:bg-muted rounded"
        >
          System
        </button>
      </PopoverContent>
    </Popover>
  );
}
