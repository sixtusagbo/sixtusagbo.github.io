import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Menu, X, Moon } from "lucide-react";
import { socialLinks, navigation } from "./config/constants";
import { SocialLinks } from "./components";

// Pages
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Resume from "./pages/Experience";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <Router>
      <div
        className={`min-h-screen ${
          isDarkMode
            ? "bg-gradient-to-br from-dark-purple-950 via-dark-blue-950 to-black text-white"
            : "bg-gradient-to-br from-purple-900 via-blue-900 to-black text-white"
        }`}>
        {/* Navigation */}
        <nav className="backdrop-blur-xl bg-white/10 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              <Link
                to="/"
                className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                SA
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                {navigation.map((item) =>
                  item.path.includes("#") ? (
                    <a
                      key={item.name}
                      href={item.path}
                      className="text-gray-300 hover:text-white transition-colors">
                      {item.name}
                    </a>
                  ) : (
                    <Link
                      key={item.name}
                      to={item.path}
                      className="text-gray-300 hover:text-white transition-colors">
                      {item.name}
                    </Link>
                  )
                )}
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors">
                  {isDarkMode ? (
                    <Moon size={20} className="text-purple-300" />
                  ) : (
                    <Moon size={20} />
                  )}
                </button>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden flex items-center gap-4">
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors">
                  {isDarkMode ? (
                    <Moon size={20} className="text-purple-300" />
                  ) : (
                    <Moon size={20} />
                  )}
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
                {navigation.map((item) =>
                  item.path.includes("#") ? (
                    <a
                      key={item.name}
                      href={item.path}
                      className="block px-3 py-2 text-gray-300 hover:text-white transition-colors"
                      onClick={() => setIsMenuOpen(false)}>
                      {item.name}
                    </a>
                  ) : (
                    <Link
                      key={item.name}
                      to={item.path}
                      className="block px-3 py-2 text-gray-300 hover:text-white transition-colors"
                      onClick={() => setIsMenuOpen(false)}>
                      {item.name}
                    </Link>
                  )
                )}
              </div>
            </div>
          )}
        </nav>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<Home socialLinks={socialLinks} />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/detail" element={<BlogDetail />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="backdrop-blur-xl bg-white/10 border-t border-white/10 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SocialLinks links={socialLinks} />
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
