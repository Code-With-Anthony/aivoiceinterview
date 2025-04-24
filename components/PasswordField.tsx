import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Control, FieldValues, Path } from "react-hook-form";
import { FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

type FormFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder: string;
  type?: string;
  signUp: boolean;
};

const PasswordField = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = "password",
  signUp = false,
}: FormFieldProps<T>) => {
  const [isView, setIsView] = useState(false);
  const getPasswordStrength = (password: string) => {
    if (!password) return "";
    if (password.length < 6) return "Weak";
    if (
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[^A-Za-z0-9]/.test(password)
    )
      return "Strong";
    return "Moderate";
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <Label htmlFor={name}>{label}</Label>
          <FormControl>
            <div className="relative">
              <Input
                type={isView ? "text" : type} // Toggle between text and password
                id={name}
                className="input select-none"
                placeholder={placeholder || "Enter your password"}
                {...field}
              />
              {isView ? (
                <Eye
                  className="absolute right-4 top-4 z-10 cursor-pointer text-gray-500"
                  onClick={() => setIsView(!isView)}
                />
              ) : (
                <EyeOff
                  className="absolute right-4 top-4 z-10 cursor-pointer text-gray-500"
                  onClick={() => setIsView(!isView)}
                />
              )}
            </div>
          </FormControl>
          {signUp &&
            (() => {
              const strength = getPasswordStrength(field.value);
              return (
                <p className="text-xs text-muted-foreground mt-1">
                  Password Strength:{" "}
                  <span
                    className={`font-medium ${
                      strength === "Weak"
                        ? "text-red-500"
                        : strength === "Moderate"
                        ? "text-yellow-500"
                        : "text-green-500"
                    }`}
                  >
                    {strength}
                  </span>
                </p>
              );
            })()}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PasswordField;
