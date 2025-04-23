"use client";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Account } from "./Navbar/Account";
import { ToogleMode } from "./ToggleMode";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import Link from "next/link";

const Navbar = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const guestLinks = [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ];

  const userLinks = [
    { label: "All Interviews", href: "/dashboard/interviews" },
    // { label: "Take Interview", href: "/dashboard/take" },
    { label: "Create Interview", href: "/interview/create" },
    { label: "Analytics", href: "/dashboard/analytics" },
  ];

  const navLinks = user ? userLinks : guestLinks;

  const handleNavigate = (place: string) => () => {
    setIsMenuOpen(false);
    window.location.href = `/${place}`;
  };

  return (
    <nav
      className={`navbar-primary mb-6 ${
        isScrolled
          ? "navbar-background backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex-shrink-0 text-2xl font-bold gradient-text">
            <Link href="/">AV!</Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="hover:gradient-text font-medium transition"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center space-x-4">
            {!user ? (
              <>
                <a
                  href="#contact"
                  className="text-gray-700 hover:text-primary font-medium"
                >
                  Contact
                </a>
                <Button className="bg-primary hover:bg-primary/90 rounded-full px-6">
                  Get Started
                </Button>
              </>
            ) : (
              <>
                <Account user={user} handleNavigate={handleNavigate} />
                <ToogleMode />
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-primary focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden rounded-lg bg-[#1e293b] shadow-lg mx-2 mt-2 px-4 pt-4 pb-6 text-white">
          {/* Navigation links */}
          <div className="space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={toggleMenu}
                className={`block rounded-md px-3 py-2 font-medium ${
                  window.location.pathname === link.href
                    ? "bg-white/10 text-white"
                    : "hover:bg-white/5 text-gray-300"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Guest user */}
          {!user ? (
            <>
              <a
                href="#contact"
                className="block py-2 mt-4 text-gray-400 hover:text-white font-medium"
              >
                Contact
              </a>
              <Button className="mt-2 w-full bg-primary text-white rounded-full">
                Get Started
              </Button>
            </>
          ) : (
            <div className="mt-6 border-t border-white/10 pt-4">
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 rounded-lg">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt={user.name}
                    />
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-400">{user.email}</p>
                  </div>
                </div>
                <div>
                  <ToogleMode />
                </div>
              </div>
              <a
                className="block py-2 text-sm text-gray-300 hover:text-white"
                href="#"
              >
                Account Settings
              </a>
              <a
                className="block py-2 text-sm text-gray-300 hover:text-white"
                href="#"
              >
                Log out
              </a>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
