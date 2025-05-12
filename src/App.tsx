import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {
  Github,
  Twitter,
  Linkedin,
  Mail,
  BookOpen,
  Menu,
  X,
  Sun,
  Moon,
} from "lucide-react";

// Pages
import Home from "./pages/Home";
import Portfolio from "./pages/Projects";
import Resume from "./pages/Experience";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const socialLinks = [
    {
      icon: <Twitter size={20} />,
      url: "https://twitter.com/sixtusagbo",
      label: "Twitter",
    },
    {
      icon: <Linkedin size={20} />,
      url: "https://linkedin.com/in/sixtusagbo",
      label: "LinkedIn",
    },
    {
      icon: <Github size={20} />,
      url: "https://github.com/sixtusagbo",
      label: "GitHub",
    },
    {
      icon: <Mail size={20} />,
      url: "mailto:miracleagbosixtus@gmail.com",
      label: "Email",
    },
    {
      icon: <BookOpen size={20} />,
      url: "https://sixtusagbo.medium.com/",
      label: "Blog",
    },
  ];

  const navigation = [
    { name: "Home", path: "/" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Resume", path: "/resume" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <Router>
      <div
        className={`min-h-screen ${
          isDarkMode
            ? "bg-gradient-to-br from-purple-900 via-blue-900 to-black text-white"
            : "bg-gradient-to-br from-purple-100 via-blue-100 to-white text-gray-900"
        }`}>
        {/* Navigation */}
        <nav className="backdrop-blur-xl bg-white/10 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              <Link
                to="/"
                className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                Sixtus Agbo
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="text-gray-300 hover:text-white transition-colors">
                    {item.name}
                  </Link>
                ))}
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors">
                  {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden flex items-center gap-4">
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors">
                  {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2 rounded-md text-gray-300 hover:text-white">
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="block px-3 py-2 text-gray-300 hover:text-white transition-colors"
                    onClick={() => setIsMenuOpen(false)}>
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </nav>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<Home socialLinks={socialLinks} />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="backdrop-blur-xl bg-white/10 border-t border-white/10 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center space-x-6">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors">
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
