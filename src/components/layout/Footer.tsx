"use client";

import Link from "next/link";
import { socialLinks, navigation } from "@/config/constants";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-neutral-800 mt-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <span className="text-2xl font-bold tracking-tighter">
              SA
              <span className="inline-block w-2 h-2 bg-emerald-400 rounded-full ml-1" />
            </span>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Full-Stack Developer crafting exceptional digital experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-neutral-400">
              Navigation
            </h4>
            <div className="flex flex-col gap-2">
              {navigation.map((item) =>
                item.path.includes("#") ? (
                  <a
                    key={item.name}
                    href={item.path}
                    className="text-neutral-300 hover:text-white transition-colors text-sm">
                    {item.name}
                  </a>
                ) : (
                  <Link
                    key={item.name}
                    href={item.path}
                    className="text-neutral-300 hover:text-white transition-colors text-sm">
                    {item.name}
                  </Link>
                )
              )}
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-neutral-400">
              Connect
            </h4>
            <div className="flex gap-4">
              <a
                href={socialLinks.github.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-neutral-700 flex items-center justify-center hover:border-white hover:bg-white hover:text-neutral-950 transition-all">
                <img
                  src="/images/github-mark.svg"
                  alt="GitHub"
                  className="w-5 h-5 invert"
                />
              </a>
              <a
                href={socialLinks.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-neutral-700 flex items-center justify-center hover:border-white hover:bg-white hover:text-neutral-950 transition-all text-neutral-300 hover:text-neutral-950">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href={socialLinks.twitter.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-neutral-700 flex items-center justify-center hover:border-white hover:bg-white hover:text-neutral-950 transition-all text-neutral-300 hover:text-neutral-950">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href={socialLinks.email.url}
                className="w-10 h-10 rounded-full border border-neutral-700 flex items-center justify-center hover:border-white hover:bg-white hover:text-neutral-950 transition-all text-neutral-300 hover:text-neutral-950">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-neutral-500 text-sm">
            © {new Date().getFullYear()} Sixtus Agbo. All rights reserved.
          </p>
          <p className="text-neutral-500 text-sm">
            Built with Next.js & TypeScript
          </p>
        </div>
      </div>
    </footer>
  );
}
