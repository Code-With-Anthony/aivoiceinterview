"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { useUserStore } from "@/lib/store/useUserStore";
import { NavigationMenuProps } from "@radix-ui/react-navigation-menu";
import Link from "next/link";

interface NavMenuProps extends NavigationMenuProps {
  onLinkClick?: () => void;
}

export const NavMenu = ({ onLinkClick, ...props }: NavMenuProps) => {
  const { user } = useUserStore((state) => state);
  const isCandidate = user?.role === "candidate";

  return (
    <NavigationMenu {...props}>
      <NavigationMenuList className="gap-6 font-semibold space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start">
        {/* Conditionally render based on role */}
        {isCandidate ? (
          <>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/interview/all" onClick={onLinkClick}>
                  All Interviews
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/interview/create" onClick={onLinkClick}>
                  Create Interview
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/companies" onClick={onLinkClick}>
                  Companies
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </>
        ) : (
          <>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/analytics" onClick={onLinkClick}>
                  Analytics
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/Candidates" onClick={onLinkClick}>
                  Candidates
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </>
        )}

        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/pricing" onClick={onLinkClick}>
              Pricing
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/contact" onClick={onLinkClick}>
              Contact Us
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
