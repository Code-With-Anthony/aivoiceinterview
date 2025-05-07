import { PASSWORD_VALIDATIONS, STRONG_PASSWORD_TEXT } from "@/constants";
import { customPasswordFeedbackMap } from "@/utils/utils";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Control, FieldValues, Path } from "react-hook-form";
import zxcvbn from "zxcvbn";
import { FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Progress } from "./ui/progress";

type FormFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
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
  const [isFocused, setIsFocused] = useState(false);
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const result = zxcvbn(field.value || "");
        const password = field.value || "";
        const hasNumber = /[0-9]/.test(password);
        const hasSpecialChar = /[^A-Za-z0-9]/.test(password);
        const hasMinLength = password.length >= 8;

        const extraSuggestions: string[] = [];
        if (!hasMinLength) extraSuggestions.push(PASSWORD_VALIDATIONS.HAS_MIN_LENGTH);
        if (!hasNumber) extraSuggestions.push(PASSWORD_VALIDATIONS.HAS_NUMBER);
        if (!hasSpecialChar) extraSuggestions.push(PASSWORD_VALIDATIONS.HAS_SPECIAL_CHARACTER);

        const finalScore =
          !hasMinLength || !hasNumber || !hasSpecialChar
            ? Math.min(result.score, 2) // cap the strength to "Good" or below
            : result.score;
        const strength = [PASSWORD_VALIDATIONS.PASSWORD_STRENGTH.WEAK, PASSWORD_VALIDATIONS.PASSWORD_STRENGTH.FAIR, PASSWORD_VALIDATIONS.PASSWORD_STRENGTH.GOOD, PASSWORD_VALIDATIONS.PASSWORD_STRENGTH.STRONG][finalScore] || PASSWORD_VALIDATIONS.PASSWORD_STRENGTH.WEAK;

        const customSuggestions = [
          ...result.feedback.suggestions.map((msg: string) => customPasswordFeedbackMap[msg] || msg),
          ...extraSuggestions
        ];

        return (
          <FormItem>
            {label && <Label htmlFor={name}>{label}</Label>}
            <FormControl>
              <div className="relative select-none">
                <Input
                  type={isView ? "text" : type}
                  id={name}
                  className={`input select-none ${fieldState.error ? "border-red-500" : ""
                    }`}
                  placeholder={placeholder || "Enter your password"}
                  {...field}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  autoComplete="off"
                />
                {isView ? (
                  <Eye
                    className="absolute right-4 top-2 z-10 cursor-pointer text-gray-500"
                    onClick={() => setIsView(!isView)}
                  />
                ) : (
                  <EyeOff
                    className="absolute right-4 top-2 z-10 cursor-pointer text-gray-500"
                    onClick={() => setIsView(!isView)}
                  />
                )}

                {/* Floating Tooltip */}
                {signUp && isFocused && (
                  <div className="absolute top-full mt-2 left-0 w-full z-20 bg-background border rounded-md shadow-md p-3 text-sm">
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-full mr-2">
                        <Progress
                          value={Math.min(finalScore + 1, 4) * 25}
                          className={`h-2 ${finalScore === 0
                            ? "[&>div]:bg-red-500"
                            : result.score === 1
                              ? "[&>div]:bg-orange-400"
                              : result.score === 2
                                ? "[&>div]:bg-yellow-400"
                                : "[&>div]:bg-green-500"
                            }`}
                        />
                      </div>
                      <span className="text-xs font-medium text-gray-100">
                        {strength}
                      </span>
                    </div>
                    <ul className="text-gray-600 text-xs space-y-1">
                      {customSuggestions.length > 0 ? (
                        customSuggestions.map((msg: string, i: number) => (
                          <li key={i}>• {customPasswordFeedbackMap[msg] || msg}</li>
                        ))
                      ) : (
                        <li>• {STRONG_PASSWORD_TEXT}</li>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default PasswordField;
