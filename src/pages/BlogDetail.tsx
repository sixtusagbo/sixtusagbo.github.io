import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Share2,
  Bookmark,
  ThumbsUp,
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
        content: "Adding Deployment to Your Pipeline",
      },
      {
        type: "paragraph",
        content:
          "Now let's extend our workflow to include deployment to a staging environment and then to production:",
      },
      {
        type: "code",
        language: "yaml",
        content: `  deploy-staging:
    needs: build-and-test
    if: github.event_name == 'push' && github.ref == 'refs/heads/main'
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
    
    - name: Build project
      run: npm run build
    
    - name: Deploy to Staging
      uses: netlify/actions/cli@master
      with:
        args: deploy --dir=build --site=\${{ secrets.NETLIFY_SITE_ID_STAGING }}
      env:
        NETLIFY_AUTH_TOKEN: \${{ secrets.NETLIFY_AUTH_TOKEN }}

  deploy-production:
    needs: deploy-staging
    if: github.event_name == 'push' && github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Wait for manual approval
      uses: trstringer/manual-approval@v1
      with:
        secret: \${{ github.TOKEN }}
        approvers: yourusername
        minimum-approvals: 1
        issue-title: 'Deploy to Production'
    
    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build project
      run: npm run build
    
    - name: Deploy to Production
      uses: netlify/actions/cli@master
      with:
        args: deploy --dir=build --prod --site=\${{ secrets.NETLIFY_SITE_ID_PRODUCTION }}
      env:
        NETLIFY_AUTH_TOKEN: \${{ secrets.NETLIFY_AUTH_TOKEN }}`,
      },
      {
        type: "paragraph",
        content:
          "This extended workflow adds two new jobs: one to deploy to staging automatically after successful tests, and another to deploy to production after manual approval.",
      },
      {
        type: "subheading",
        content: "Securing Sensitive Information",
      },
      {
        type: "paragraph",
        content:
          "Notice that we're using GitHub Secrets to store sensitive information like API tokens. This is a critical security practice. To add secrets to your repository, go to Settings → Secrets and Variables → Actions, and click on 'New repository secret'.",
      },
      {
        type: "subheading",
        content: "Enhancing Your Pipeline with Quality Checks",
      },
      {
        type: "paragraph",
        content:
          "You can further enhance your pipeline by adding more quality checks:",
      },
      {
        type: "list",
        items: [
          "Code coverage reporting with tools like Codecov or Coveralls",
          "Security scanning for vulnerabilities with tools like Snyk",
          "Performance benchmarking to catch regression issues",
          "End-to-end testing in a staging environment",
          "Notifications to Slack or Discord channels",
        ],
      },
      {
        type: "paragraph",
        content:
          "Each of these additions provides an extra layer of confidence in your deployment process.",
      },
      {
        type: "subheading",
        content: "Conclusion",
      },
      {
        type: "paragraph",
        content:
          "Setting up a CI/CD pipeline requires some initial investment, but the benefits in terms of code quality, team efficiency, and deployment reliability are substantial. By automating your build, test, and deployment processes, you free up more time to focus on what matters most: writing code and delivering value to your users. Start small with basic linting and testing, then gradually expand your pipeline as your project and team grow.",
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

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Back button */}
      <div>
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
          <ArrowLeft size={18} />
          <span>Back to all posts</span>
        </Link>
      </div>

      {/* Header */}
      <div className="space-y-6">
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-blue-500/20 text-blue-400 text-xs px-3 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <motion.h1
          className="text-3xl md:text-4xl lg:text-5xl font-bold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}>
          {post.title}
        </motion.h1>

        {/* Meta information */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
          <div className="flex items-center gap-2">
            <img
              src={post.authorImage}
              alt={post.author}
              className="w-8 h-8 rounded-full object-cover"
            />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center">
            <Calendar size={14} className="mr-1" />
            <span>{formatDate(post.date)}</span>
          </div>
          <div className="flex items-center">
            <Clock size={14} className="mr-1" />
            <span>{post.readTime}</span>
          </div>
        </div>
      </div>

      {/* Cover image */}
      <motion.div
        className="w-full h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden rounded-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}>
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Content */}
      <motion.div
        className="backdrop-blur-xl bg-white/10 rounded-2xl p-6 md:p-8 space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}>
        {post.content.map((section, index) => {
          switch (section.type) {
            case "paragraph":
              return (
                <p
                  key={index}
                  className="text-lg leading-relaxed text-gray-200">
                  {section.content}
                </p>
              );
            case "subheading":
              return (
                <h2
                  key={index}
                  className="text-2xl font-semibold mt-8 mb-4 text-blue-400">
                  {section.content}
                </h2>
              );
            case "list":
              return (
                <ul key={index} className="space-y-2 list-disc pl-5">
                  {section.items &&
                    section.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-lg text-gray-200">
                        {item}
                      </li>
                    ))}
                </ul>
              );
            case "code":
              return (
                <div
                  key={index}
                  className="bg-gray-900/50 p-4 rounded-lg overflow-x-auto">
                  <pre className="text-gray-200 font-mono text-sm">
                    <code>{section.content}</code>
                  </pre>
                </div>
              );
            default:
              return null;
          }
        })}
      </motion.div>

      {/* Action buttons */}
      <div className="flex justify-between items-center pt-4 border-t border-white/10">
        <div className="flex gap-4">
          <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
            <ThumbsUp size={20} />
          </button>
          <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
            <Bookmark size={20} />
          </button>
          <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
            <Share2 size={20} />
          </button>
        </div>
        <Link
          to="/blog"
          className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
          More Posts
        </Link>
      </div>
    </div>
  );
};

export default BlogDetail;
