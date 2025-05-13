import { useState, useMemo, useEffect } from "react";
import { blogPosts } from "../config/constants";
import { BlogPostCard } from "../components";
import { Filter, SortAsc, SortDesc, Search, X } from "lucide-react";

type SortOption = "newest" | "oldest" | "title";

function Blog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [showFilters, setShowFilters] = useState(false);

  // Extract all unique tags from blog posts
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    blogPosts.forEach(post => {
      post.tags?.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, []);

  // Filter and sort posts based on current criteria
  const filteredPosts = useMemo(() => {
    let result = [...blogPosts];
    
    // Filter by search term
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      result = result.filter(post => 
        post.title.toLowerCase().includes(lowerSearchTerm) || 
        post.excerpt.toLowerCase().includes(lowerSearchTerm)
      );
    }
    
    // Filter by selected tags
    if (selectedTags.length > 0) {
      result = result.filter(post => 
        selectedTags.every(tag => post.tags?.includes(tag))
      );
    }
    
    // Sort posts
    result.sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.date || "").getTime() - new Date(a.date || "").getTime();
      } else if (sortBy === "oldest") {
        return new Date(a.date || "").getTime() - new Date(b.date || "").getTime();
      } else {
        return a.title.localeCompare(b.title);
      }
    });
    
    return result;
  }, [searchTerm, selectedTags, sortBy]);

  // Toggle tag selection
  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedTags([]);
    setSortBy("newest");
  };

  // Close filters panel on larger screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setShowFilters(false);
      }
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-4xl font-bold">Blog Posts</h1>
          <span className="bg-yellow-500/80 text-black text-xs px-2 py-1 rounded-md font-semibold animate-pulse">
            WIP
          </span>
        </div>
        
        {/* Mobile filter toggle */}
        <button 
          className="md:hidden flex items-center gap-2 px-4 py-2 backdrop-blur-xl bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter size={18} />
          <span>{showFilters ? "Hide Filters" : "Show Filters"}</span>
        </button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters panel - visible on desktop or when toggled on mobile */}
        <div className={`
          ${showFilters ? "block" : "hidden"} md:block
          w-full md:w-64 backdrop-blur-xl bg-white/10 rounded-2xl p-6 space-y-6
          md:sticky md:top-24 self-start
        `}>
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">Filters</h3>
            <button 
              onClick={clearFilters}
              className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              Clear all
            </button>
          </div>
          
          {/* Search */}
          <div className="space-y-2">
            <label className="text-sm text-gray-300">Search</label>
            <div className="relative">
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search posts..."
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>
          
          {/* Sort options */}
          <div className="space-y-2">
            <label className="text-sm text-gray-300">Sort by</label>
            <div className="space-y-1">
              {[
                { value: "newest", label: "Newest first", icon: <SortDesc size={16} /> },
                { value: "oldest", label: "Oldest first", icon: <SortAsc size={16} /> },
                { value: "title", label: "Title (A-Z)", icon: <SortAsc size={16} /> }
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSortBy(option.value as SortOption)}
                  className={`
                    flex items-center gap-2 w-full px-3 py-2 rounded-lg transition-colors
                    ${sortBy === option.value ? "bg-blue-500/20 text-blue-400" : "hover:bg-white/5"}
                  `}
                >
                  {option.icon}
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
          </div>
          
          {/* Tags */}
          <div className="space-y-2">
            <label className="text-sm text-gray-300">Filter by tags</label>
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`
                    text-xs px-3 py-1.5 rounded-full transition-colors
                    ${selectedTags.includes(tag) 
                      ? "bg-blue-500/30 text-blue-300" 
                      : "bg-white/10 hover:bg-white/20"}
                  `}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
          
          {/* Mobile close button */}
          <button 
            className="md:hidden w-full mt-4 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
            onClick={() => setShowFilters(false)}
          >
            Close Filters
          </button>
        </div>
        
        {/* Blog posts grid */}
        <div className="flex-1">
          {filteredPosts.length === 0 ? (
            <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-8 text-center">
              <h3 className="text-xl font-semibold mb-2">No posts found</h3>
              <p className="text-gray-300 mb-4">Try adjusting your filters or search term</p>
              <button 
                onClick={clearFilters}
                className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <BlogPostCard key={index} post={post} index={index} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Blog;
