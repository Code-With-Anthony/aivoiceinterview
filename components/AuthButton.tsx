import { Button } from "@/components/ui/button";
import { AUTH_BUTTON_TITLES } from "@/constants";
import { Loader2 } from "lucide-react";

interface AuthButtonProps {
  title: string;
  onClick: () => Promise<void>;
  loadingText: string;
  variant?: "destructive" | "default" | "outline" | "link" | "secondary" | "ghost" | null | undefined;
  disabled?: boolean;
  loading?: boolean; // <- add this
}

const AuthButton = ({
  title,
  onClick,
  loadingText,
  variant,
  disabled,
  loading = false, // <- default false
}: AuthButtonProps) => {
  const handleClick = async () => {
    await onClick();
  };

  const isDestructive = title === AUTH_BUTTON_TITLES.LOGOUT;
  const buttonVariant = isDestructive ? "destructive" : title === AUTH_BUTTON_TITLES.SIGNUP ? "default" : "outline";

  return (
    <Button
      variant={variant ?? buttonVariant}
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

