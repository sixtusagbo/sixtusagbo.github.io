"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Eye, Loader2, PenLine, RefreshCw } from "lucide-react";
import { previewMarkdownAction, savePostAction } from "@/app/admin/actions";
import type { BlogPost } from "@/lib/posts";
import { calculateReadingTime, slugify } from "@/lib/utils";
import { cloudinaryConfigured } from "@/lib/cloudinary";
import ImageUploadButton from "@/components/admin/ImageUploadButton";

const inputClass =
  "w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-neutral-500 placeholder-neutral-500";

const labelClass = "text-sm text-neutral-400";

export default function PostEditor({ post }: { post?: BlogPost }) {
  const router = useRouter();

  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(post));
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [coverImage, setCoverImage] = useState(post?.coverImage ?? "");
  const [tagsInput, setTagsInput] = useState(post?.tags.join(", ") ?? "");
  const [content, setContent] = useState(post?.content ?? "");
  const [status, setStatus] = useState<"draft" | "published">(
    post?.status ?? "draft"
  );

  const [mode, setMode] = useState<"write" | "preview">("write");
  const [previewHtml, setPreviewHtml] = useState("");
  const [previewLoading, setPreviewLoading] = useState(false);
  const previewedContent = useRef<string | null>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const [error, setError] = useState("");
  const [dirty, setDirty] = useState(false);
  const [isSaving, startSaving] = useTransition();

  useEffect(() => {
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const markDirty = () => setDirty(true);

  const onTitleChange = (value: string) => {
    setTitle(value);
    if (!slugTouched) setSlug(slugify(value));
    markDirty();
  };

  const showPreview = async () => {
    setMode("preview");
    if (previewedContent.current === content) return;
    setPreviewLoading(true);
    try {
      setPreviewHtml(await previewMarkdownAction(content));
      previewedContent.current = content;
    } finally {
      setPreviewLoading(false);
    }
  };

  const onContentKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key !== "Tab") return;
    e.preventDefault();
    const target = e.currentTarget;
    const { selectionStart, selectionEnd, value } = target;
    const next = `${value.slice(0, selectionStart)}  ${value.slice(selectionEnd)}`;
    setContent(next);
    markDirty();
    requestAnimationFrame(() => {
      target.selectionStart = target.selectionEnd = selectionStart + 2;
    });
  };

  const insertImageMarkdown = (url: string) => {
    const md = `![](${url})`;
    const ta = contentRef.current;
    if (!ta) {
      setContent((c) => `${c}\n${md}\n`);
      markDirty();
      return;
    }
    const { selectionStart, selectionEnd, value } = ta;
    setContent(value.slice(0, selectionStart) + md + value.slice(selectionEnd));
    markDirty();
    requestAnimationFrame(() => {
      ta.focus();
      ta.selectionStart = ta.selectionEnd = selectionStart + md.length;
    });
  };

  const save = () => {
    setError("");
    startSaving(async () => {
      const result = await savePostAction({
        id: post?.id,
        title,
        slug,
        excerpt,
        content,
        coverImage,
        tags: tagsInput
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        status,
      });
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setDirty(false);
      router.push("/admin/posts");
      router.refresh();
    });
  };

  const words = content.split(/\s+/).filter(Boolean).length;

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Top bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/posts"
            className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors group">
            <ArrowLeft
              size={18}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Posts
          </Link>
          <h1 className="text-xl font-bold">
            {post ? "Edit Post" : "New Post"}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div
            role="group"
            aria-label="Post status"
            className="flex bg-neutral-900 border border-neutral-800 rounded-full p-1">
            {(["draft", "published"] as const).map((s) => (
              <button
                key={s}
                onClick={() => {
                  setStatus(s);
                  markDirty();
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${
                  status === s
                    ? s === "published"
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "bg-amber-500/20 text-amber-400"
                    : "text-neutral-500 hover:text-white"
                }`}>
                {s}
              </button>
            ))}
          </div>
          <button
            onClick={save}
            disabled={isSaving || !dirty}
            title={!dirty ? "No changes to save" : undefined}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-white text-neutral-950 rounded-full text-sm font-semibold hover:bg-neutral-200 transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
            {isSaving && <Loader2 size={14} className="animate-spin" />}
            {status === "published" ? "Save & Publish" : "Save Draft"}
          </button>
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
          {error}
        </p>
      )}

      <div className="grid lg:grid-cols-3 gap-6 items-start">
        {/* Main column */}
        <div className="lg:col-span-2 space-y-4">
          <label htmlFor="post-title" className="sr-only">
            Post title
          </label>
          <input
            id="post-title"
            type="text"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="Post title"
            className="w-full bg-transparent text-3xl font-bold placeholder-neutral-600 focus:outline-none focus:placeholder-neutral-500"
          />

          {/* Write / Preview tabs */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMode("write")}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                mode === "write"
                  ? "bg-white text-neutral-950"
                  : "bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white"
              }`}>
              <PenLine size={14} />
              Write
            </button>
            <button
              onClick={showPreview}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                mode === "preview"
                  ? "bg-white text-neutral-950"
                  : "bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white"
              }`}>
              <Eye size={14} />
              Preview
            </button>
            <div className="ml-auto flex items-center gap-3">
              {cloudinaryConfigured && (
                <ImageUploadButton
                  label="Insert image"
                  onUploaded={insertImageMarkdown}
                />
              )}
              <span className="text-xs text-neutral-500">
                {words} words · {calculateReadingTime(content)} min read
              </span>
            </div>
          </div>

          {mode === "write" ? (
            <textarea
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                markDirty();
              }}
              onKeyDown={onContentKeyDown}
              ref={contentRef}
              placeholder="Write your post in Markdown..."
              spellCheck
              className="w-full min-h-[65vh] bg-neutral-900 border border-neutral-800 rounded-3xl p-6 font-mono text-sm leading-relaxed focus:outline-none focus:border-neutral-600 placeholder-neutral-600 resize-y"
            />
          ) : (
            <div className="min-h-[65vh] bg-neutral-900 border border-neutral-800 rounded-3xl p-6 md:p-8">
              {previewLoading ? (
                <div className="flex items-center justify-center h-40 text-neutral-500">
                  <Loader2 size={20} className="animate-spin" />
                </div>
              ) : (
                <div
                  className="blog-prose prose prose-invert prose-neutral max-w-none"
                  dangerouslySetInnerHTML={{ __html: previewHtml }}
                />
              )}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 space-y-5 lg:sticky lg:top-10">
          <div className="space-y-2">
            <label htmlFor="slug" className={labelClass}>
              Slug
            </label>
            <div className="flex gap-2">
              <input
                id="slug"
                type="text"
                value={slug}
                onChange={(e) => {
                  setSlug(slugify(e.target.value));
                  setSlugTouched(true);
                  markDirty();
                }}
                placeholder="post-url-slug"
                className={inputClass}
              />
              <button
                onClick={() => {
                  setSlug(slugify(title));
                  setSlugTouched(false);
                  markDirty();
                }}
                aria-label="Regenerate slug from title"
                title="Regenerate slug from title"
                className="p-2.5 bg-neutral-800 border border-neutral-700 rounded-xl text-neutral-400 hover:text-white transition-colors flex-shrink-0">
                <RefreshCw size={14} />
              </button>
            </div>
            <p className="text-xs text-neutral-600 break-all">/blog/{slug || "…"}</p>
          </div>

          <div className="space-y-2">
            <label htmlFor="excerpt" className={labelClass}>
              Excerpt
            </label>
            <textarea
              id="excerpt"
              value={excerpt}
              onChange={(e) => {
                setExcerpt(e.target.value);
                markDirty();
              }}
              rows={3}
              placeholder="Auto-generated from content if left empty"
              className={`${inputClass} resize-none`}
            />
            <p className="text-xs text-neutral-600">
              {excerpt.length}/160 characters (also used as meta description)
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <label htmlFor="cover" className={labelClass}>
                Cover image
              </label>
              {cloudinaryConfigured && (
                <ImageUploadButton
                  label="Upload"
                  onUploaded={(url) => {
                    setCoverImage(url);
                    markDirty();
                  }}
                />
              )}
            </div>
            <input
              id="cover"
              type="text"
              value={coverImage}
              onChange={(e) => {
                setCoverImage(e.target.value);
                markDirty();
              }}
              placeholder="/images/blog/my-post/cover.png"
              className={inputClass}
            />
            {coverImage && (
              <div className="aspect-video overflow-hidden rounded-xl border border-neutral-800">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={coverImage}
                  alt="Cover preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="tags" className={labelClass}>
              Tags
            </label>
            <input
              id="tags"
              type="text"
              value={tagsInput}
              onChange={(e) => {
                setTagsInput(e.target.value);
                markDirty();
              }}
              placeholder="Flutter, Web Development"
              className={inputClass}
            />
            <div className="flex flex-wrap gap-2">
              {tagsInput
                .split(",")
                .map((t) => t.trim())
                .filter(Boolean)
                .map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 bg-neutral-800 rounded-full text-xs text-neutral-300">
                    {tag}
                  </span>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
