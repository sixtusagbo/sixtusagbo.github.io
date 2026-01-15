"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { socialLinks, navigation } from "@/config/constants";
import { motion, AnimatePresence } from "framer-motion";

function NavLink({ item, onClick }: { item: { name: string; path: string }; onClick?: () => void }) {
  const pathname = usePathname();
  const isActive = pathname === item.path ||
    (item.path === "/" && pathname === "/") ||
    (item.path !== "/" && pathname.startsWith(item.path));

  if (item.path.includes("#")) {
    return (
      <a
        href={item.path}
        onClick={onClick}
        className="group relative py-2 text-sm font-medium tracking-wide uppercase">
        <span className={`transition-colors ${isActive ? "text-white" : "text-neutral-400 group-hover:text-white"}`}>
          {item.name}
        </span>
        <span className={`absolute bottom-0 left-0 h-0.5 bg-white transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"}`} />
      </a>
    );
  }

  return (
    <Link
      href={item.path}
      onClick={onClick}
      className="group relative py-2 text-sm font-medium tracking-wide uppercase">
      <span className={`transition-colors ${isActive ? "text-white" : "text-neutral-400 group-hover:text-white"}`}>
        {item.name}
      </span>
      <span className={`absolute bottom-0 left-0 h-0.5 bg-white transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"}`} />
    </Link>
  );
}

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isMenuOpen
          ? "bg-neutral-950"
          : isScrolled
            ? "bg-neutral-950/80 backdrop-blur-xl border-b border-neutral-800"
            : "bg-transparent"
      }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="relative z-10 group">
            <span className="text-2xl font-bold tracking-tighter">
              SIXTUS
              <span className="inline-block w-2 h-2 bg-emerald-400 rounded-full ml-1 group-hover:animate-ping" />
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <NavLink key={item.name} item={item} />
            ))}
          </div>

          {/* CTA Button - Desktop */}
          <a
            href={socialLinks.email.url}
            className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-white text-neutral-950 rounded-full text-sm font-semibold hover:bg-neutral-200 transition-colors group">
            Let&apos;s Talk
            <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden relative z-10 p-2 -mr-2">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed inset-0 top-20 bg-neutral-950 z-40">
            <div className="flex flex-col items-center justify-start h-full gap-8 px-6 pt-16">
              {navigation.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}>
                  {item.path.includes("#") ? (
                    <a
                      href={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className="text-3xl font-bold tracking-tight hover:text-neutral-400 transition-colors">
                      {item.name}
                    </a>
                  ) : (
                    <Link
                      href={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className="text-3xl font-bold tracking-tight hover:text-neutral-400 transition-colors">
                      {item.name}
                    </Link>
                  )}
                </motion.div>
              ))}
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                href={socialLinks.email.url}
                className="mt-8 px-8 py-4 bg-white text-neutral-950 rounded-full text-lg font-semibold">
                Let&apos;s Talk
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
