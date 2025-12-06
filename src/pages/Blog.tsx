import { useState, useMemo, useEffect } from "react";
import { blogPosts } from "../config/constants";
import { Filter, Search, X, ArrowUpRight, Calendar, Clock } from "lucide-react";
import { motion } from "framer-motion";

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="space-y-12">
          {/* Header */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-neutral-500 uppercase tracking-wider">Blog</span>
                <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 text-xs font-medium rounded-full">
                  WIP
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold">Articles & Insights</h1>
              <p className="text-lg text-neutral-400 max-w-2xl">
                Thoughts on software development, technology trends, and lessons learned along the way.
              </p>
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center gap-2 px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-xl text-sm font-medium">
              <Filter size={16} />
              {showFilters ? "Hide Filters" : "Show Filters"}
              {(selectedTags.length > 0 || searchTerm) && (
                <span className="px-2 py-0.5 bg-white text-neutral-950 rounded-full text-xs">
                  {selectedTags.length + (searchTerm ? 1 : 0)}
                </span>
              )}
            </button>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <motion.aside
              variants={itemVariants}
              className={`lg:w-72 flex-shrink-0 space-y-6 ${showFilters ? "block" : "hidden lg:block"}`}>
              <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 space-y-6 sticky top-28">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Filters</h3>
                  {(selectedTags.length > 0 || searchTerm) && (
                    <button
                      onClick={clearFilters}
                      className="text-sm text-neutral-400 hover:text-white transition-colors">
                      Clear all
                    </button>
                  )}
                </div>

                {/* Search */}
                <div className="space-y-2">
                  <label className="text-sm text-neutral-400">Search</label>
                  <div className="relative">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search posts..."
                      className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-10 py-2.5 text-sm focus:outline-none focus:border-neutral-600 placeholder-neutral-500"
                    />
                    {searchTerm && (
                      <button
                        onClick={() => setSearchTerm("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white">
                        <X size={14} />
                      </button>
                    )}
                  </div>
                </div>

                {/* Sort */}
                <div className="space-y-2">
                  <label className="text-sm text-neutral-400">Sort by</label>
                  <div className="space-y-1">
                    {[
                      { value: "newest", label: "Newest first" },
                      { value: "oldest", label: "Oldest first" },
                      { value: "title", label: "Title (A-Z)" }
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setSortBy(option.value as SortOption)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                          sortBy === option.value
                            ? "bg-white text-neutral-950 font-medium"
                            : "text-neutral-400 hover:text-white hover:bg-neutral-800"
                        }`}>
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div className="space-y-3">
                  <label className="text-sm text-neutral-400">Filter by tags</label>
                  <div className="flex flex-wrap gap-2">
                    {allTags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                          selectedTags.includes(tag)
                            ? "bg-white text-neutral-950"
                            : "bg-neutral-800 text-neutral-400 hover:text-white"
                        }`}>
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mobile Close Button */}
                <button
                  onClick={() => setShowFilters(false)}
                  className="lg:hidden w-full py-2.5 bg-neutral-800 hover:bg-neutral-700 rounded-xl text-sm font-medium transition-colors">
                  Apply Filters
                </button>
              </div>
            </motion.aside>

            {/* Blog Posts Grid */}
            <div className="flex-1">
              {filteredPosts.length === 0 ? (
                <motion.div
                  variants={itemVariants}
                  className="text-center py-20 bg-neutral-900 rounded-3xl border border-neutral-800">
                  <p className="text-xl text-neutral-400 mb-4">No posts match your criteria.</p>
                  <button
                    onClick={clearFilters}
                    className="px-6 py-3 bg-white text-neutral-950 rounded-full font-semibold hover:bg-neutral-200 transition-colors">
                    Clear filters
                  </button>
                </motion.div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredPosts.map((post, index) => (
                    <motion.a
                      key={post.title}
                      href={post.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      variants={itemVariants}
                      className="group bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden hover:border-neutral-700 transition-all">
                      {/* Image */}
                      <div className="aspect-video overflow-hidden relative">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {post.tags && post.tags[0] && (
                          <span className="absolute top-4 left-4 px-3 py-1 bg-neutral-950/80 backdrop-blur-sm rounded-full text-xs font-medium">
                            {post.tags[0]}
                          </span>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-6 space-y-4">
                        {/* Meta */}
                        <div className="flex items-center gap-4 text-sm text-neutral-500">
                          {post.date && (
                            <div className="flex items-center gap-1.5">
                              <Calendar size={14} />
                              <span>{formatDate(post.date)}</span>
                            </div>
                          )}
                          {post.readTime && (
                            <div className="flex items-center gap-1.5">
                              <Clock size={14} />
                              <span>{post.readTime}</span>
                            </div>
                          )}
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-semibold group-hover:text-neutral-300 transition-colors line-clamp-2">
                          {post.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="text-neutral-400 text-sm line-clamp-2">
                          {post.excerpt}
                        </p>

                        {/* Tags */}
                        {post.tags && post.tags.length > 1 && (
                          <div className="flex flex-wrap gap-2 pt-2">
                            {post.tags.slice(1, 4).map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-1 bg-neutral-800 rounded-md text-xs text-neutral-400">
                                {tag}
                              </span>
                            ))}
                            {post.tags.length > 4 && (
                              <span className="px-2 py-1 text-xs text-neutral-500">
                                +{post.tags.length - 4} more
                              </span>
                            )}
                          </div>
                        )}

                        {/* Read More */}
                        <div className="flex items-center gap-2 text-sm text-neutral-400 group-hover:text-white transition-colors pt-2">
                          Read article
                          <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </div>
                      </div>
                    </motion.a>
                  ))}
                </div>
              )}

              {/* Results Count */}
              {filteredPosts.length > 0 && (
                <motion.p
                  variants={itemVariants}
                  className="text-center text-neutral-500 text-sm mt-8">
                  Showing {filteredPosts.length} of {blogPosts.length} posts
                </motion.p>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Blog;
