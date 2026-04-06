"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Header from "../Header";

export default function HeaderWrapper() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [showHeader, setShowHeader] = useState(!isHomePage);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (isHomePage) {
      // On home page, hide header initially
      setShowHeader(false);

      // Show header after splash screen (5 seconds) + a small delay
      const timer = setTimeout(() => {
        setShowHeader(true);
      }, 5500); // 5s splash + 0.5s delay

      return () => clearTimeout(timer);
    } else {
      // On other pages, show header immediately
      setShowHeader(true);
    }
  }, [isHomePage]);

  // Handle scroll detection for home page
  useEffect(() => {
    if (!isHomePage || !showHeader) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY || window.pageYOffset;
      // Change to white when scrolled more than 50px
      setIsScrolled(scrollPosition > 50);
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage, showHeader]);

  if (!showHeader) {
    return null;
  }

  // Use gradient for home page only when at top, white when scrolled
  // For other pages, use dark background where needed
  const useGradient = isHomePage && !isScrolled;
  const isDarkBackground =
    pathname.startsWith("/blogs") ||
    pathname.startsWith("/contact-us") ||
    pathname.startsWith("/about-us");

  const headerBg = isDarkBackground
    ? "bg-[#0e2143]"
    : useGradient
    ? "bg-white/80 md:bg-gradient-to-b md:from-white/50 md:to-transparent"
    : "bg-white";

  return (
    <div
      className={`h-max w-full flex items-center fixed top-0 left-0 right-0 z-[100] border-b border-transparent ${headerBg} transition-all duration-300`}
    >
      <Header isDarkBackground={isDarkBackground} useGradient={useGradient} />
    </div>
  );
}
