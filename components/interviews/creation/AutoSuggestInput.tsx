import { useState } from "react";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

interface AutoSuggestInputProps {
  field: any;
  label: string;
  suggestions: string[];
  placeholder?: string;
}

export const AutoSuggestInput = ({
  field,
  label,
  suggestions,
  placeholder,
}: AutoSuggestInputProps) => {
  const [open, setOpen] = useState(false);

  return (
    <FormItem className="relative">
      <FormLabel>{label}</FormLabel>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <FormControl>
            <Input
              {...field}
              placeholder={placeholder || `Enter ${label.toLowerCase()}`}
              onFocus={() => setOpen(true)}
              onChange={(e) => field.onChange(e.target.value)}
            />
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-full" side="bottom" align="start">
          <Command>
            <CommandInput placeholder={`Search ${label.toLowerCase()}...`} />
            <CommandList>
              {suggestions.map((item) => (
                <CommandItem
                  key={item}
                  value={item}
                  onSelect={() => {
                    field.onChange(item);
                    setOpen(false);
                  }}
                >
                  {item}
                </CommandItem>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <FormMessage />
    </FormItem>
  );
};
