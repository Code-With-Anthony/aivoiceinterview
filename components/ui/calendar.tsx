"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import * as React from "react"
import { DayPicker } from "react-day-picker"
import { cn } from "@/lib/utils"
import "react-day-picker/style.css"

function Calendar({
  className,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      animate
      showOutsideDays={showOutsideDays}
      classNames={{
        button_previous: "fill-black dark:fill-white cursor-pointer",
        button_next: "fill-black dark:fill-white cursor-pointer",
        selected: "bg-primary text-primary-foreground rounded-md",
      }}
      className={cn("p-3", className)}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft className={cn("size-4", className)} {...props} />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight className={cn("size-4", className)} {...props} />
        ),
      }}
      {...props}
    />
  )
}

export { Calendar }
