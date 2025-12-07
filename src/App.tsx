import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { socialLinks, navigation } from "./config/constants";
import { motion, AnimatePresence } from "framer-motion";

// Pages
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Resume from "./pages/Experience";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";

// Navigation link component with underline animation
function NavLink({ item, onClick }: { item: { name: string; path: string }; onClick?: () => void }) {
  const location = useLocation();
  const isActive = location.pathname === item.path ||
    (item.path === "/" && location.pathname === "/") ||
    (item.path !== "/" && location.pathname.startsWith(item.path));

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
      to={item.path}
      onClick={onClick}
      className="group relative py-2 text-sm font-medium tracking-wide uppercase">
      <span className={`transition-colors ${isActive ? "text-white" : "text-neutral-400 group-hover:text-white"}`}>
        {item.name}
      </span>
      <span className={`absolute bottom-0 left-0 h-0.5 bg-white transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"}`} />
    </Link>
  );
}

function AppContent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

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
    <div className="min-h-screen bg-neutral-950 text-white selection:bg-white selection:text-neutral-950">
      {/* Subtle grid background */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

      {/* Navigation */}
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
            <Link to="/" className="relative z-10 group">
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
              Let's Talk
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
                        to={item.path}
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
                  Let's Talk
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Main Content */}
      <main className="relative z-10">
        <Routes>
          <Route path="/" element={<Home socialLinks={socialLinks} />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/detail" element={<BlogDetail />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-neutral-800 mt-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Brand */}
            <div className="space-y-4">
              <span className="text-2xl font-bold tracking-tighter">
                SIXTUS
                <span className="inline-block w-2 h-2 bg-emerald-400 rounded-full ml-1" />
              </span>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Full-Stack Developer crafting exceptional digital experiences.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-neutral-400">Navigation</h4>
              <div className="flex flex-col gap-2">
                {navigation.map((item) => (
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
                      to={item.path}
                      className="text-neutral-300 hover:text-white transition-colors text-sm">
                      {item.name}
                    </Link>
                  )
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-neutral-400">Connect</h4>
              <div className="flex gap-4">
                <a href={socialLinks.github.url} target="_blank" rel="noopener noreferrer"
                   className="w-10 h-10 rounded-full border border-neutral-700 flex items-center justify-center hover:border-white hover:bg-white hover:text-neutral-950 transition-all">
                  <img src="/images/github-mark.svg" alt="GitHub" className="w-5 h-5 invert" />
                </a>
                <a href={socialLinks.linkedin.url} target="_blank" rel="noopener noreferrer"
                   className="w-10 h-10 rounded-full border border-neutral-700 flex items-center justify-center hover:border-white hover:bg-white hover:text-neutral-950 transition-all text-neutral-300 hover:text-neutral-950">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
                <a href={socialLinks.twitter.url} target="_blank" rel="noopener noreferrer"
                   className="w-10 h-10 rounded-full border border-neutral-700 flex items-center justify-center hover:border-white hover:bg-white hover:text-neutral-950 transition-all text-neutral-300 hover:text-neutral-950">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href={socialLinks.email.url}
                   className="w-10 h-10 rounded-full border border-neutral-700 flex items-center justify-center hover:border-white hover:bg-white hover:text-neutral-950 transition-all text-neutral-300 hover:text-neutral-950">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-neutral-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-neutral-500 text-sm">
              © {new Date().getFullYear()} Sixtus Agbo. All rights reserved.
            </p>
            <p className="text-neutral-500 text-sm">
              Built with React & TypeScript
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}>
      <AppContent />
    </Router>
  );
}

export default App;
