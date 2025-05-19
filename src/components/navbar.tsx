"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaDiscord } from 'react-icons/fa';
import { RiTeamFill } from 'react-icons/ri';
import { BsTrophyFill } from 'react-icons/bs';
import { ThemeSwitcher } from './theme-switcher';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-slate-950/80 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-[2000px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-purple-400"
            >
              Coalition
            </motion.div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink href="/teams" icon={<RiTeamFill />}>Teams</NavLink>
            <NavLink href="/leaderboard" icon={<BsTrophyFill />}>Leaderboard</NavLink>
            <NavLink href="/discord" icon={<FaDiscord />}>Discord</NavLink>
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            <ThemeSwitcher />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 text-white text-sm font-medium shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40 transition-all duration-300"
            >
              Connect
            </motion.button>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 rounded-lg hover:bg-slate-800/50 transition-colors">
              <svg className="w-6 h-6 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}

function NavLink({ href, children, icon }: { href: string; children: React.ReactNode; icon: React.ReactNode }) {
  return (
    <Link href={href}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center space-x-1 text-slate-300 hover:text-white transition-colors"
      >
        <span className="text-violet-400">{icon}</span>
        <span>{children}</span>
      </motion.div>
    </Link>
  );
} 