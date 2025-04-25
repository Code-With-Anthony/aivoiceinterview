import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { signOut } from "@/lib/actions/auth.action";
import { BadgeCheck, Bell, CreditCard, LogOut, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface User {
  name: string;
  email: string;
  role?: string;
}

type HandleNavigate = (route: string) => () => void;

interface AccountProps {
  user: User;
  handleNavigate: HandleNavigate;
}

export function Account({ user, handleNavigate }: AccountProps) {
  const router = useRouter();
  const handleSignOut = async () => {
    await signOut();
    router.push("/sign-in");
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="cursor-pointer w-10 h-10 flex items-center justify-center rounded-lg hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors">
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage src="https://github.com/shadcn.png" alt={user.name} />
            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
          </Avatar>
        </div>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        sideOffset={4}
        className="min-w-56 rounded-lg p-0 shadow-lg border bg-popover text-popover-foreground"
      >
        {/* User Info */}
        <div className="flex items-center gap-2 px-4 py-3 text-left text-sm">
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage src="https://github.com/shadcn.png" alt={user.name} />
            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
          </Avatar>
          <div className="grid text-sm leading-tight">
            <span className="font-semibold truncate">{user.name}</span>
            <span className="text-xs truncate text-muted-foreground">
              {user.email}
            </span>
          </div>
        </div>

        <div className="border-t" />

        {/* Menu Items */}
        <div className="py-2 px-1">
          <button className="menu-item" onClick={() => console.log("Upgrade")}>
            <Sparkles className="mr-2 h-4 w-4" />
            Upgrade to Pro
          </button>
          <button className="menu-item" onClick={handleNavigate("account")}>
            <BadgeCheck className="mr-2 h-4 w-4" />
            Account
          </button>
          <button className="menu-item">
            <CreditCard className="mr-2 h-4 w-4" />
            Billing
          </button>
          <button className="menu-item">
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </button>
        </div>

        <div className="border-t" />

        <div className="py-2 px-1">
          <button
            className="menu-item text-red-500 hover:text-red-600"
            onClick={handleSignOut}
          >
            <Link href="/signout">
              <LogOut className="mr-2 h-4 w-4" />
            </Link>
            Log out
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
