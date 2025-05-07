"use client";
import {
  AudioLines,
  BookOpen,
  Briefcase,
  Building2,
  CircleHelp,
  Code2,
  DollarSign,
  FileText,
  Globe,
  Headphones,
  Home,
  LayoutList,
  Menu,
  PenSquare,
  Phone,
  Signal,
  Sliders,
} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AUTH_BUTTON_TITLES } from "@/constants";
import { useIsMobile } from "@/hooks/use-mobile";
import { signOut } from "@/lib/actions/auth.action";
import { useUserStore } from "@/lib/store/useUserStore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AuthButton from "../AuthButton";
import { ToogleMode } from "../ToggleMode";
import NavUser from "./nav-user";
interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface NavbarProps {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  menu?: MenuItem[];
  auth?: {
    login: {
      title: string;
      url: string;
    };
    signup: {
      title: string;
      url: string;
    };
    logout: {
      title: string;
    };
  };
}

const Navbar = ({
  logo = {
    url: "/",
    src: "https://shadcnblocks.com/images/block/logos/shadcnblockscom-icon.svg",
    alt: "logo",
    title: "AV!",
  },
  menu = [
    {
      title: "Home",
      url: "/",
      icon: <Home className="size-5 shrink-0" />,
    },
    {
      title: "Interviews",
      url: "/interview/all",
      items: [
        {
          title: "All Interviews",
          description: "Collections of different bunch of interviews.",
          icon: <LayoutList className="size-5 shrink-0" />,
          url: "/interview/all",
        },
        {
          title: "AI Voice Interview",
          description: "Simulate real-world voice-based interview scenarios.",
          icon: <AudioLines className="size-5 shrink-0" />,
          url: "/interview/all?type=voice",
        },
        {
          title: "AI Coding Interview",
          description: "Practice coding questions in a realistic environment.",
          icon: <Code2 className="size-5 shrink-0" />,
          url: "/interview/all?type=coding",
        },
        {
          title: "Custom Interview",
          description: "Create and tailor interviews to specific needs.",
          icon: <Sliders className="size-5 shrink-0" />,
          url: "/interview/create",
        },
        {
          title: "Company Based Interview",
          description: "Interview formats based on real-world companies.",
          icon: <Building2 className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Practice Concepts",
          description: "Review key concepts to strengthen your skills.",
          icon: <BookOpen className="size-5 shrink-0" />,
          url: "#",
        },
      ],
    },
    {
      title: "Company",
      url: "#",
      items: [
        {
          title: "Blog",
          description: "Insights, updates, and tutorials from our team.",
          icon: <PenSquare className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Company",
          description: "Learn more about our mission and values.",
          icon: <Globe className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Careers",
          description: "Join our team and shape the future of AI.",
          icon: <Briefcase className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Support",
          description: "Get help from our team or access resources.",
          icon: <Headphones className="size-5 shrink-0" />,
          url: "#",
        },
      ],
    },
    {
      title: "Resources",
      url: "#",
      items: [
        {
          title: "Help Center",
          description: "FAQs, guides, and support documentation.",
          icon: <CircleHelp className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Contact Us",
          description: "Reach out to our support or sales teams.",
          icon: <Phone className="size-5 shrink-0" />,
          url: "/contact-us",
        },
        {
          title: "Status",
          description: "Live system status and performance updates.",
          icon: <Signal className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Terms of Service",
          description: "Review our service terms and usage policies.",
          icon: <FileText className="size-5 shrink-0" />,
          url: "#",
        },
      ],
    },
    {
      title: "Jobs",
      url: "/jobs",
      icon: <Briefcase className="size-5 shrink-0" />,
    },
    {
      title: "Pricing",
      url: "/pricing",
      icon: <DollarSign className="size-5 shrink-0" />,
    },
    {
      title: "Blog",
      url: "#",
      icon: <PenSquare className="size-5 shrink-0" />,
    },
  ],
  auth = {
    login: { title: AUTH_BUTTON_TITLES.LOGIN, url: "/sign-in" },
    signup: { title: AUTH_BUTTON_TITLES.SIGNUP, url: "/sign-up" },
    logout: { title: AUTH_BUTTON_TITLES.LOGOUT },
  },
}: NavbarProps) => {
  const { user, clearUser } = useUserStore((state) => state);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const router = useRouter();
  const isMobile = useIsMobile();

  const handleSheetClick = () => {
    setIsSheetOpen(false);
  };

  const handleSignOut = async () => {
    await signOut();
    handleSheetClick();
    clearUser();
    router.push("/");
  };

  useEffect(() => {
    //note: in future remove the isSheetOpen from if condition to close the sidebar if ther is no mobile view regardless of sheet is open or not
    if (!isMobile && isSheetOpen) {
      setIsSheetOpen(false);
    }
  }, [isMobile]);

  return (
    <section className="py-4 px-4 md:px-6 xl:px-10">
      <div className="container">
        {/* Desktop Menu */}
        <nav className="hidden justify-between lg:flex">
          <div className="flex items-center gap-6">
            {/* Logo */}
            <Link href={logo.url} className="flex items-center gap-2">
              <Image
                src={logo.src}
                height={20}
                width={20}
                className="max-h-20"
                alt={logo.alt}
              />
              <span className="text-lg font-semibold tracking-tighter">
                {logo.title}
              </span>
            </Link>
            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  {menu.map((item) => renderMenuItem(item, handleSheetClick))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          {user ? (
            <div className="flex gap-2 items-center">
              <NavUser />
              <ToogleMode />
            </div>
          ) : (
            <div className="flex gap-2">
              <AuthButton
                title={auth.login.title}
                onClick={async () => await router.push(auth.login.url)}
                loadingText="Logging in..."
              />
              <AuthButton
                title={auth.signup.title}
                onClick={async () => await router.push(auth.signup.url)}
                loadingText="Signing up..."
              />
            </div>
          )}
        </nav>

        {/* Mobile Menu */}
        {isMobile && (
          <div className="block lg:hidden">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link
                href={logo.url}
                className="flex items-center gap-2"
                onClick={handleSheetClick}
              >
                <img src={logo.src} className="max-h-8" alt={logo.alt} />
              </Link>
              <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Menu className="size-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent className="flex flex-col h-full">
                  <SheetHeader>
                    <SheetTitle>
                      <Link
                        href={logo.url}
                        className="flex items-center gap-2"
                        onClick={handleSheetClick}
                      >
                        <img
                          src={logo.src}
                          className="max-h-8"
                          alt={logo.alt}
                        />
                      </Link>
                    </SheetTitle>
                  </SheetHeader>
                  <div className="flex-1 overflow-y-auto">
                    <div className="flex flex-col gap-6 p-4">
                      <Accordion
                        type="single"
                        collapsible
                        className="flex w-full flex-col gap-4"
                      >
                        {menu.map((item) =>
                          renderMobileMenuItem(item, handleSheetClick)
                        )}
                        {user && (
                          <Link
                            href="/profile"
                            className="text-lg font-semibold"
                            onClick={handleSheetClick}
                          >
                            Profile
                          </Link>
                        )}
                      </Accordion>
                    </div>
                  </div>
                  <SheetFooter className="p-4 border-t">
                    <SheetClose asChild>
                      {!user ? (
                        <div className="flex flex-col gap-3">
                          <AuthButton
                            title={auth.login.title}
                            onClick={async () =>
                              await router.push(auth.login.url)
                            }
                            loadingText="Logging in..."
                          />
                          <AuthButton
                            title={auth.signup.title}
                            onClick={async () =>
                              await router.push(auth.signup.url)
                            }
                            loadingText="Signing up..."
                          />
                        </div>
                      ) : (
                        <AuthButton
                          title={auth.logout.title}
                          onClick={handleSignOut}
                          loadingText="Logging out..."
                        />
                      )}
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

const renderMenuItem = (item: MenuItem, handleSheetClick: () => void) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
        <NavigationMenuContent className="bg-popover text-popover-foreground">
          {item.items.map((subItem) => (
            <NavigationMenuLink asChild key={subItem.title} className=" !w-80">
              <SubMenuLink item={subItem} handleSheetClick={handleSheetClick} />
            </NavigationMenuLink>
          ))}
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink
        href={item.url}
        className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground"
      >
        {item.title}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item: MenuItem, handleSheetClick: () => void) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b-0">
        <AccordionTrigger className="text-lg py-0 font-semibold hover:no-underline">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2">
          {item.items.map((subItem) => (
            <SubMenuLink
              key={subItem.title}
              item={subItem}
              handleSheetClick={handleSheetClick}
            />
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <Link
      key={item.title}
      onClick={handleSheetClick}
      href={item.url}
      className="text-lg font-semibold"
    >
      {item.title}
    </Link>
  );
};

const SubMenuLink = ({
  item,
  handleSheetClick,
}: {
  item: MenuItem;
  handleSheetClick: () => void;
}) => {
  return (
    <Link
      className="flex flex-row gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-muted hover:text-accent-foreground min-w-[320px]"
      href={item.url}
      onClick={handleSheetClick}
    >
      <div className="text-foreground">{item.icon}</div>
      <div>
        <div className="text-sm font-semibold">{item.title}</div>
        {item.description && (
          <p className="text-sm leading-snug text-muted-foreground">
            {item.description}
          </p>
        )}
      </div>
    </Link>
  );
};

export { Navbar };
