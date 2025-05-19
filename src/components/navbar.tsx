"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white shadow-sm"
          : "bg-white"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between h-20 px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold">
            <span className="text-[#FFA500]">Edu</span>
            <span className="text-[#333333]">Learn</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="text-sm font-medium text-gray-600 hover:text-[#FFA500] transition-colors"
          >
            Find Sub
          </Link>
          <Link
            href="#"
            className="text-sm font-medium text-gray-600 hover:text-[#FFA500] transition-colors"
          >
            For School
          </Link>
          <Link
            href="#"
            className="text-sm font-medium text-gray-600 hover:text-[#FFA500] transition-colors"
          >
            Resource
          </Link>
          <Link
            href="#"
            className="text-sm font-medium text-gray-600 hover:text-[#FFA500] transition-colors"
          >
            About Us
          </Link>
          <Link
            href="/users"
            className="text-sm font-medium text-gray-600 hover:text-[#FFA500] transition-colors"
          >
            User List
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/users">
            <Button
              size="sm"
              className="bg-[#2D9979] text-white hover:bg-[#238b6d] rounded-full px-6 mr-2"
            >
              User List
            </Button>
          </Link>
          <Button
            size="sm"
            className="bg-white text-gray-800 border border-gray-300 hover:bg-gray-100 rounded-full px-6"
          >
            Make Appointment
          </Button>
          <Button 
            variant="outline" 
            size="icon"
            className="md:hidden border-0"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
          </Button>
        </div>
      </div>
    </header>
  );
} 