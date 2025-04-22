"use client";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Account } from "./Navbar/Account";
import { ToogleMode } from "./ToggleMode";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

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
    { label: "Take Interview", href: "/dashboard/take" },
    { label: "Custom Interview", href: "/interview/custom" },
    { label: "Analytics", href: "/dashboard/analytics" },
  ];

  const navLinks = user ? userLinks : guestLinks;

  const handleNavigate = (place: string) => () => {
    setIsMenuOpen(false);
    window.location.href = `/${place}`;
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex-shrink-0 text-2xl font-bold gradient-text">
            AV!
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:gradient-text font-medium transition"
              >
                {link.label}
              </a>
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
              className="p-2 rounded-md text-gray-700 hover:text-primary focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg px-4 pt-4 pb-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={toggleMenu}
              className="block py-2 text-gray-700 hover:text-primary font-medium"
            >
              {link.label}
            </a>
          ))}

          {!user ? (
            <>
              <a
                href="#contact"
                className="block py-2 text-gray-700 hover:text-primary font-medium"
              >
                Contact
              </a>
              <Button className="mt-2 w-full bg-primary text-white rounded-full">
                Get Started
              </Button>
            </>
          ) : (
            <div className="mt-4 border-t pt-4">
              <div className="flex items-center gap-2 mb-2">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
              </div>
              <a className="block py-2 text-sm text-primary" href="#">
                Account Settings
              </a>
              <a className="block py-2 text-sm text-primary" href="#">
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
