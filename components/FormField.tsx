import { Control, FieldValues, Path } from "react-hook-form";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  FormField as ShadFormField,
} from "./ui/form";
import { Input } from "./ui/input";
import React, { ReactNode } from "react";

interface FormFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  type?: "text" | "email" | "password" | "file";
  children?: (field: any, fieldState: any) => ReactNode;
}

const FormField = <T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  type = "text",
  children,
}: FormFieldProps<T>) => (
  <ShadFormField
    name={name}
    control={control}
    render={({ field, fieldState }) => (
      <FormItem>
        <FormLabel className="label">{label}</FormLabel>
        <FormControl>
          {typeof children === "function" ? (
            children(field, fieldState) // 👉 now child gets both field and error
          ) : (
            <Input
              className="input"
              placeholder={placeholder}
              {...field}
              type={type}
            />
          )}
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

export default FormField;
