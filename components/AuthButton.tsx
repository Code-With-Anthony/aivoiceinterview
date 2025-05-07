//this is a reusable component for handling login, register and logout.
import { Button } from "@/components/ui/button";
import { AUTH_BUTTON_TITLES } from "@/constants";
import { Loader2 } from "lucide-react"; // For a loading spinner icon
import { useState } from "react";

interface AuthButtonProps {
  title: string;
  onClick: () => Promise<void>; // Function to call (Login/Signup/Logout action)
  loadingText: string; // Text to show when button is loading
  variant?:
  | "destructive"
  | "default"
  | "outline"
  | "link"
  | "secondary"
  | "ghost"
  | null
  | undefined;
  disabled?: boolean;
}

const AuthButton = ({
  title,
  onClick,
  loadingText,
  variant,
  disabled,
}: AuthButtonProps) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    await onClick();
    setLoading(false);
  };

  // Set the variant depending on the title (to handle the "Logout" case)
  const isDestructive = title === AUTH_BUTTON_TITLES.LOGOUT;
  const buttonVariant = isDestructive
    ? "destructive"
    : title === AUTH_BUTTON_TITLES.SIGNUP
      ? "default"
      : "outline";

  return (
    <Button
      variant={variant ? variant : buttonVariant}
      size={variant ? "default" : "sm"}
      disabled={loading || disabled}
      onClick={handleClick}
      className="cursor-pointer select-none"
    >
      {loading ? (
        <div className="flex items-center gap-2">
          <Loader2 className="animate-spin" size={16} />
          {loadingText}
        </div>
      ) : (
        title
      )}
    </Button>
  );
};

export default AuthButton;
