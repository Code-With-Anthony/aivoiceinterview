"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { signOut } from "@/lib/actions/auth.action";
import { useUserStore } from "@/lib/store/useUserStore";
import { BadgeCheck, Bell, CreditCard, LogOut, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const NavUser = () => {
  const { user, clearUser } = useUserStore((state) => state);
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    clearUser();
    router.push("/");
  };

  return (
    <Popover>
      <PopoverTrigger className="flex gap-2 items-center outline-none cursor-pointer">
        <Avatar className="h-8 w-8 rounded-lg">
          <AvatarImage src={user?.avatar} alt={user?.name} />
          <AvatarFallback className="rounded-lg">CN</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        side="bottom"
        sideOffset={4}
        className="min-w-56 rounded-lg p-0 cursor-pointer"
      >
        <div className="px-3 py-2 !cursor-pointer">
          <div className="flex items-center gap-2 text-left text-sm">
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback className="rounded-lg">CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-semibold">{user?.name}</span>
              <span className="text-xs text-muted-foreground">
                {user?.email}
              </span>
            </div>
          </div>
        </div>

        <div className="border-t">
          <button className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted">
            <Sparkles className="w-4 h-4" />
            Upgrade to Pro
          </button>
        </div>

        <div className="border-t">
          <button className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted">
            <BadgeCheck className="w-4 h-4" />
            Account
          </button>
          <button className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted">
            <CreditCard className="w-4 h-4" />
            Billing
          </button>
          <button className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted">
            <Bell className="w-4 h-4" />
            Notifications
          </button>
        </div>

        <div className="border-t">
          <button
            className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted text-red-500"
            onClick={handleSignOut}
          >
            <LogOut className="w-4 h-4" />
            Log out
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NavUser;
