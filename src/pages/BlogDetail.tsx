import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Share2,
  Bookmark,
  ArrowUpRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const BlogDetail = () => {
  // Sample blog post data (in real app, this would come from props or context)
  const post = {
    title: "Building a CI/CD Pipeline for Your Projects",
    date: "2024-01-15",
    readTime: "7 min read",
    author: "Sixtus Miracle Agbo",
    authorImage: "/images/me.jpg",
    coverImage:
      "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg",
    tags: ["DevOps", "CI/CD", "Automation", "Git"],
    content: [
      {
        type: "paragraph",
        content:
          "Continuous Integration and Continuous Deployment (CI/CD) pipelines have become essential for modern software development. They automate the process of building, testing, and deploying code, allowing teams to ship features faster and with greater confidence. In this guide, I'll walk you through how to set up a robust CI/CD pipeline for your projects.",
      },
      {
        type: "subheading",
        content: "Why You Need a CI/CD Pipeline",
      },
      {
        type: "paragraph",
        content:
          "Before diving into the implementation, let's understand why CI/CD pipelines are so valuable for developers and teams of all sizes:",
      },
      {
        type: "list",
        items: [
          "Faster feedback loops for code changes",
          "Reduced manual errors in the deployment process",
          "Consistent testing across all code changes",
          "Automated quality control with linting and formatting",
          "More frequent, smaller deployments with less risk",
        ],
      },
      {
        type: "paragraph",
        content:
          "Even for personal projects, a CI/CD pipeline can save you time and ensure your applications remain stable as you continue to add features.",
      },
      {
        type: "subheading",
        content: "Components of a CI/CD Pipeline",
      },
      {
        type: "paragraph",
        content:
          "A complete CI/CD pipeline typically includes several stages that your code passes through:",
      },
      {
        type: "code",
        language: "plaintext",
        content: `Code Commit → Build → Test → Quality Analysis → Staging Deployment → Production Deployment`,
      },
      {
        type: "paragraph",
        content:
          "Each stage serves as a gate that ensures your code meets the necessary quality standards before moving forward.",
      },
      {
        type: "subheading",
        content: "Setting Up a CI/CD Pipeline with GitHub Actions",
      },
      {
        type: "paragraph",
        content:
          "For this tutorial, we'll use GitHub Actions, which provides a powerful and user-friendly way to implement CI/CD directly in your GitHub repository. Let's start by creating a basic workflow file.",
      },
      {
        type: "code",
        language: "yaml",
        content: `# .github/workflows/ci-cd.yml
name: CI/CD Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-test:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3

    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'

    - name: Install dependencies
      run: npm ci

    - name: Lint code
      run: npm run lint

    - name: Run tests
      run: npm test

    - name: Build project
      run: npm run build`,
      },
      {
        type: "paragraph",
        content:
          "This basic workflow will run whenever code is pushed to the main branch or when a pull request is opened against it. The job installs dependencies, runs linting and tests, and then builds the project.",
      },
      {
        type: "subheading",
        content: "Conclusion",
      },
      {
        type: "paragraph",
        content:
          "Setting up a CI/CD pipeline requires some initial investment, but the benefits in terms of code quality, team efficiency, and deployment reliability are substantial. By automating your build, test, and deployment processes, you free up more time to focus on what matters most: writing code and delivering value to your users.",
      },
    ],
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

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

  return (
    <div className="pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="space-y-8">
          {/* Back button */}
          <motion.div variants={itemVariants}>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors group">
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              <span>Back to all posts</span>
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div variants={itemVariants} className="space-y-6">
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-neutral-800 rounded-full text-xs font-medium text-neutral-300">
                  {tag}
                </span>
              ))}
              <span className="px-3 py-1 bg-amber-500/20 text-amber-400 rounded-full text-xs font-medium">
                WIP
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              {post.title}
            </h1>

            {/* Meta information */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-neutral-400">
              <div className="flex items-center gap-3">
                <img
                  src={post.authorImage}
                  alt={post.author}
                  className="w-10 h-10 rounded-full object-cover border-2 border-neutral-800"
                />
                <span className="font-medium text-white">{post.author}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar size={14} />
                <span>{formatDate(post.date)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={14} />
                <span>{post.readTime}</span>
              </div>
            </div>
          </motion.div>

          {/* Cover image */}
          <motion.div
            variants={itemVariants}
            className="aspect-video overflow-hidden rounded-3xl">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Content */}
          <motion.article
            variants={itemVariants}
            className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8 md:p-12 space-y-6">
            {post.content.map((section, index) => {
              switch (section.type) {
                case "paragraph":
                  return (
                    <p
                      key={index}
                      className="text-lg leading-relaxed text-neutral-300">
                      {section.content}
                    </p>
                  );
                case "subheading":
                  return (
                    <h2
                      key={index}
                      className="text-2xl font-semibold mt-10 mb-4 text-white">
                      {section.content}
                    </h2>
                  );
                case "list":
                  return (
                    <ul key={index} className="space-y-3 pl-1">
                      {section.items &&
                        section.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start gap-3 text-neutral-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-neutral-500 mt-2.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                    </ul>
                  );
                case "code":
                  return (
                    <div
                      key={index}
                      className="bg-neutral-950 border border-neutral-800 rounded-xl p-6 overflow-x-auto">
                      <pre className="text-neutral-300 font-mono text-sm">
                        <code>{section.content}</code>
                      </pre>
                    </div>
                  );
                default:
                  return null;
              }
            })}
          </motion.article>

          {/* Action buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4">
            <div className="flex gap-2">
              <button className="p-3 bg-neutral-900 border border-neutral-800 rounded-xl hover:bg-neutral-800 transition-colors">
                <Bookmark size={20} />
              </button>
              <button className="p-3 bg-neutral-900 border border-neutral-800 rounded-xl hover:bg-neutral-800 transition-colors">
                <Share2 size={20} />
              </button>
            </div>
            <Link
              to="/blog"
              className="group inline-flex items-center gap-2 px-6 py-3 bg-white text-neutral-950 rounded-full font-semibold hover:bg-neutral-200 transition-all">
              More Posts
              <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogDetail;
