import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router";
import { motion, useInView, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  Search,
  Heart,
  MessageCircle,
  Clock,
  MapPin,
  TrendingUp,
  CalendarDays,
  Tag,
  Plus,
  X,
  Send,
  ArrowUp,
  Flame,
  Users,
  Sparkles,
  Video,
  Trophy,
  PenLine,
  Check,
} from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import {
  communityPosts as defaultPosts,
  trendingPosts,
  upcomingEvents,
  allTags,
  type CommunityPost,
  type UpcomingEvent,
} from "./communityData";
import { fetchCommunityStories, publishCommunityStory } from "../../lib/communityService";

// ─── Helpers ─────────────────────────────────────────────────

const eventTypeConfig: Record<
  UpcomingEvent["type"],
  { icon: typeof Video; bg: string; text: string }
> = {
  workshop: { icon: PenLine, bg: "bg-blue-50", text: "text-blue-600" },
  meetup: { icon: Users, bg: "bg-amber-50", text: "text-amber-600" },
  webinar: { icon: Video, bg: "bg-violet-50", text: "text-violet-600" },
  challenge: { icon: Trophy, bg: "bg-emerald-50", text: "text-emerald-600" },
};

function AvatarBubble({ initials, size = 40 }: { initials: string; size?: number }) {
  const colors = [
    "bg-rose-100 text-rose-700",
    "bg-amber-100 text-amber-700",
    "bg-emerald-100 text-emerald-700",
    "bg-sky-100 text-sky-700",
    "bg-violet-100 text-violet-700",
    "bg-orange-100 text-orange-700",
    "bg-teal-100 text-teal-700",
    "bg-pink-100 text-pink-700",
  ];
  const idx = (initials.charCodeAt(0) + (initials.charCodeAt(1) || 0)) % colors.length;
  return (
    <div
      className={`rounded-full flex items-center justify-center flex-shrink-0 ${colors[idx]}`}
      style={{ width: size, height: size, fontSize: size * 0.35, fontWeight: 700 }}
    >
      {initials}
    </div>
  );
}

// ─── Persistent user stories ─────────────────────────────────

function loadUserStories(): CommunityPost[] {
  try {
    const stored = localStorage.getItem("community_user_stories");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveUserStories(stories: CommunityPost[]) {
  localStorage.setItem("community_user_stories", JSON.stringify(stories));
}

// ─── Featured Post Card ──────────────────────────────────────

function FeaturedPostCard({
  post,
  onTagClick,
  onClick,
}: {
  post: CommunityPost;
  onTagClick: (tag: string) => void;
  onClick: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [liked, setLiked] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="group relative bg-white rounded-2xl overflow-hidden hover:-translate-y-1 transition-all duration-500 cursor-pointer"
      style={{ border: "1px solid rgba(0,0,0,0.06)" }}
      onClick={onClick}
    >
      {/* Image */}
      <div className="relative aspect-[16/9] overflow-hidden">
        <motion.div
          className="w-full h-full"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <ImageWithFallback
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </motion.div>
        {/* Featured badge */}
        <div className="absolute top-4 left-4">
          <span
            className="px-3 py-1 rounded-full flex items-center gap-1"
            style={{
              fontSize: "0.625rem",
              fontWeight: 700,
              letterSpacing: "0.05em",
              background: "#D4A017",
              color: "#000",
            }}
          >
            <Flame size={10} />
            FEATURED
          </span>
        </div>
        {/* Hover read prompt */}
        <div className="absolute inset-0 flex items-end justify-between px-5 pb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <span
            className="text-white/90 backdrop-blur-sm bg-black/20 px-3 py-1.5 rounded-full"
            style={{ fontSize: "0.75rem", fontWeight: 600 }}
          >
            Read story &rarr;
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6">
        <div className="flex items-center gap-3 mb-4">
          <AvatarBubble initials={post.author.avatar} size={36} />
          <div>
            <p style={{ fontSize: "0.8125rem", fontWeight: 600, color: "#000" }}>
              {post.author.name}
            </p>
            <p className="flex items-center gap-1.5" style={{ color: "rgba(0,0,0,0.3)" }}>
              <MapPin size={10} />
              <span style={{ fontSize: "0.6875rem", fontWeight: 400 }}>
                {post.author.location}
              </span>
              <span style={{ margin: "0 2px" }}>&middot;</span>
              <span style={{ fontSize: "0.6875rem", fontWeight: 400 }}>
                {post.date}
              </span>
            </p>
          </div>
        </div>

        <h3
          className="mb-2"
          style={{ fontSize: "1.25rem", fontWeight: 800, lineHeight: 1.3, color: "#000" }}
        >
          {post.title}
        </h3>
        <p
          className="mb-4"
          style={{ fontSize: "0.875rem", fontWeight: 400, lineHeight: 1.75, color: "rgba(0,0,0,0.45)" }}
        >
          {post.summary}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {post.tags.map((tag) => (
            <button
              key={tag}
              onClick={(e) => { e.stopPropagation(); onTagClick(tag); }}
              className="px-2.5 py-0.5 rounded-full transition-colors duration-200 cursor-pointer"
              style={{
                fontSize: "0.6875rem",
                fontWeight: 500,
                background: "rgba(0,0,0,0.03)",
                color: "rgba(0,0,0,0.4)",
                border: "1px solid rgba(0,0,0,0.04)",
              }}
            >
              #{tag}
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3" style={{ borderTop: "1px solid rgba(0,0,0,0.04)" }}>
          <div className="flex items-center gap-4" style={{ color: "rgba(0,0,0,0.3)" }}>
            <button
              onClick={(e) => { e.stopPropagation(); setLiked(!liked); }}
              className="flex items-center gap-1 hover:text-rose-500 transition-colors duration-200 cursor-pointer"
            >
              <Heart size={14} className={liked ? "fill-rose-500 text-rose-500" : ""} />
              <span style={{ fontSize: "0.75rem", fontWeight: 600 }}>
                {liked ? post.likes + 1 : post.likes}
              </span>
            </button>
            <span className="flex items-center gap-1">
              <MessageCircle size={14} />
              <span style={{ fontSize: "0.75rem", fontWeight: 600 }}>{post.comments}</span>
            </span>
          </div>
          <span className="flex items-center gap-1" style={{ color: "rgba(0,0,0,0.2)" }}>
            <Clock size={12} />
            <span style={{ fontSize: "0.6875rem", fontWeight: 500 }}>{post.readTime}</span>
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Regular Post Card ───────────────────────────────────────

function PostCard({
  post,
  index,
  onTagClick,
  onClick,
}: {
  post: CommunityPost;
  index: number;
  onTagClick: (tag: string) => void;
  onClick: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });
  const [liked, setLiked] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 25 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="group bg-white rounded-2xl overflow-hidden hover:-translate-y-1 transition-all duration-500 cursor-pointer"
      style={{ border: "1px solid rgba(0,0,0,0.06)" }}
      onClick={onClick}
    >
      {/* Image */}
      <div className="relative aspect-[3/2] overflow-hidden">
        <motion.div
          className="w-full h-full"
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <ImageWithFallback
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
          <span
            className="text-white/80 backdrop-blur-sm bg-black/20 px-2.5 py-1 rounded-full"
            style={{ fontSize: "0.6875rem", fontWeight: 600 }}
          >
            Read &rarr;
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5">
        <div className="flex items-center gap-2 mb-3">
          <AvatarBubble initials={post.author.avatar} size={28} />
          <div>
            <p style={{ fontSize: "0.75rem", fontWeight: 600, color: "#000" }}>
              {post.author.name}
            </p>
            <p style={{ fontSize: "0.625rem", fontWeight: 400, color: "rgba(0,0,0,0.3)" }}>
              {post.date}
            </p>
          </div>
        </div>

        <h3
          className="mb-2"
          style={{ fontSize: "1rem", fontWeight: 800, lineHeight: 1.35, color: "#000" }}
        >
          {post.title}
        </h3>
        <p
          className="mb-3"
          style={{
            fontSize: "0.8125rem",
            fontWeight: 400,
            lineHeight: 1.7,
            color: "rgba(0,0,0,0.4)",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical" as const,
            overflow: "hidden",
          }}
        >
          {post.summary}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {post.tags.slice(0, 3).map((tag) => (
            <button
              key={tag}
              onClick={(e) => { e.stopPropagation(); onTagClick(tag); }}
              className="px-2 py-0.5 rounded-full transition-colors duration-200 cursor-pointer"
              style={{
                fontSize: "0.625rem",
                fontWeight: 500,
                background: "rgba(0,0,0,0.03)",
                color: "rgba(0,0,0,0.35)",
              }}
            >
              #{tag}
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3" style={{ borderTop: "1px solid rgba(0,0,0,0.04)" }}>
          <div className="flex items-center gap-3" style={{ color: "rgba(0,0,0,0.3)" }}>
            <button
              onClick={(e) => { e.stopPropagation(); setLiked(!liked); }}
              className="flex items-center gap-1 hover:text-rose-500 transition-colors duration-200 cursor-pointer"
            >
              <Heart size={13} className={liked ? "fill-rose-500 text-rose-500" : ""} />
              <span style={{ fontSize: "0.6875rem", fontWeight: 600 }}>
                {liked ? post.likes + 1 : post.likes}
              </span>
            </button>
            <span className="flex items-center gap-1">
              <MessageCircle size={13} />
              <span style={{ fontSize: "0.6875rem", fontWeight: 600 }}>{post.comments}</span>
            </span>
          </div>
          <span className="flex items-center gap-1" style={{ color: "rgba(0,0,0,0.2)" }}>
            <Clock size={11} />
            <span style={{ fontSize: "0.625rem", fontWeight: 500 }}>{post.readTime}</span>
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Submit Story Form ───────────────────────────────────────

function SubmitStoryModal({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: (story: CommunityPost) => void;
}) {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [body, setBody] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!title.trim()) e.title = "Title is required";
    if (!summary.trim()) e.summary = "Summary is required";
    if (!body.trim()) e.body = "Story content is required";
    if (!authorName.trim()) e.authorName = "Your name is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    const initials = authorName
      .trim()
      .split(" ")
      .map((w) => w[0]?.toUpperCase() || "")
      .join("")
      .slice(0, 2);

    const wordCount = body.trim().split(/\s+/).length;
    const readMin = Math.max(1, Math.ceil(wordCount / 200));

    const newPost: CommunityPost = {
      id: `user-${Date.now()}`,
      title: title.trim(),
      summary: summary.trim(),
      body: body.trim(),
      image: imageUrl.trim() || "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1080",
      author: {
        name: authorName.trim(),
        avatar: initials || "??",
        location: "Community Member",
      },
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      readTime: `${readMin} min read`,
      tags: selectedTags.length > 0 ? selectedTags : ["inspiration"],
      likes: 0,
      comments: 0,
    };

    onSubmit(newPost);
    setSubmitted(true);
    setTimeout(() => onClose(), 1800);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        style={{ boxShadow: "0 25px 50px -12px rgba(0,0,0,0.15)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {submitted ? (
          <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="w-16 h-16 rounded-full bg-black flex items-center justify-center mb-5"
            >
              <Check size={28} className="text-white" />
            </motion.div>
            <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#000" }}>
              Story Submitted
            </h3>
            <p style={{ fontSize: "0.875rem", color: "rgba(0,0,0,0.4)", marginTop: 8, lineHeight: 1.6 }}>
              Your story is now live in the community feed.
            </p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
              <div>
                <h3 style={{ fontSize: "1.125rem", fontWeight: 800, color: "#000" }}>
                  Share Your Story
                </h3>
                <p style={{ fontSize: "0.8125rem", fontWeight: 400, color: "rgba(0,0,0,0.35)", marginTop: 2 }}>
                  Inspire the community with your experience
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-colors cursor-pointer"
                style={{ background: "rgba(0,0,0,0.04)" }}
              >
                <X size={16} style={{ color: "rgba(0,0,0,0.4)" }} />
              </button>
            </div>

            {/* Form */}
            <div className="px-6 py-5 space-y-5">
              {/* Author Name */}
              <div>
                <label className="block mb-1.5" style={{ fontSize: "0.8125rem", fontWeight: 600, color: "#000" }}>
                  Your Name
                </label>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="How should we credit you?"
                  className="w-full px-4 py-3 rounded-xl focus:outline-none transition-all"
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    background: "rgba(0,0,0,0.02)",
                    border: errors.authorName ? "1px solid #ef4444" : "1px solid rgba(0,0,0,0.06)",
                    color: "#000",
                  }}
                />
                {errors.authorName && (
                  <p style={{ fontSize: "0.6875rem", color: "#ef4444", marginTop: 4 }}>{errors.authorName}</p>
                )}
              </div>

              {/* Title */}
              <div>
                <label className="block mb-1.5" style={{ fontSize: "0.8125rem", fontWeight: 600, color: "#000" }}>
                  Story Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="What's the headline of your story?"
                  className="w-full px-4 py-3 rounded-xl focus:outline-none transition-all"
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    background: "rgba(0,0,0,0.02)",
                    border: errors.title ? "1px solid #ef4444" : "1px solid rgba(0,0,0,0.06)",
                    color: "#000",
                  }}
                />
                {errors.title && (
                  <p style={{ fontSize: "0.6875rem", color: "#ef4444", marginTop: 4 }}>{errors.title}</p>
                )}
              </div>

              {/* Summary */}
              <div>
                <label className="block mb-1.5" style={{ fontSize: "0.8125rem", fontWeight: 600, color: "#000" }}>
                  Short Summary
                </label>
                <textarea
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="Give readers a preview in 1–2 sentences..."
                  rows={2}
                  className="w-full px-4 py-3 rounded-xl focus:outline-none transition-all resize-none"
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: 400,
                    lineHeight: 1.65,
                    background: "rgba(0,0,0,0.02)",
                    border: errors.summary ? "1px solid #ef4444" : "1px solid rgba(0,0,0,0.06)",
                    color: "#000",
                  }}
                />
                {errors.summary && (
                  <p style={{ fontSize: "0.6875rem", color: "#ef4444", marginTop: 4 }}>{errors.summary}</p>
                )}
              </div>

              {/* Cover image URL */}
              <div>
                <label className="block mb-1.5" style={{ fontSize: "0.8125rem", fontWeight: 600, color: "#000" }}>
                  Cover Image URL{" "}
                  <span style={{ fontWeight: 400, color: "rgba(0,0,0,0.25)" }}>(optional)</span>
                </label>
                {imageUrl ? (
                  <div className="relative rounded-xl overflow-hidden aspect-[16/9] mb-2">
                    <ImageWithFallback src={imageUrl} alt="Cover preview" className="w-full h-full object-cover" />
                    <button
                      onClick={() => setImageUrl("")}
                      className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/50 flex items-center justify-center cursor-pointer"
                    >
                      <X size={12} className="text-white" />
                    </button>
                  </div>
                ) : (
                  <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="Paste an image URL (e.g. from Unsplash)"
                    className="w-full px-4 py-3 rounded-xl focus:outline-none transition-all"
                    style={{
                      fontSize: "0.875rem",
                      fontWeight: 500,
                      background: "rgba(0,0,0,0.02)",
                      border: "1px solid rgba(0,0,0,0.06)",
                      color: "#000",
                    }}
                  />
                )}
              </div>

              {/* Full Story */}
              <div>
                <label className="block mb-1.5" style={{ fontSize: "0.8125rem", fontWeight: 600, color: "#000" }}>
                  Full Story
                </label>
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Write your full story here. Use blank lines between paragraphs for readability..."
                  rows={8}
                  className="w-full px-4 py-3 rounded-xl focus:outline-none transition-all resize-none"
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: 400,
                    lineHeight: 1.75,
                    background: "rgba(0,0,0,0.02)",
                    border: errors.body ? "1px solid #ef4444" : "1px solid rgba(0,0,0,0.06)",
                    color: "#000",
                  }}
                />
                {errors.body && (
                  <p style={{ fontSize: "0.6875rem", color: "#ef4444", marginTop: 4 }}>{errors.body}</p>
                )}
              </div>

              {/* Tags */}
              <div>
                <label className="block mb-2" style={{ fontSize: "0.8125rem", fontWeight: 600, color: "#000" }}>
                  Tags{" "}
                  <span style={{ fontWeight: 400, color: "rgba(0,0,0,0.25)" }}>(select up to 3)</span>
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {allTags.map((tag) => {
                    const isSelected = selectedTags.includes(tag);
                    return (
                      <button
                        key={tag}
                        onClick={() => {
                          if (!isSelected && selectedTags.length >= 3) return;
                          toggleTag(tag);
                        }}
                        className={`px-3 py-1 rounded-full border transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? "bg-black border-black text-white"
                            : "bg-white text-neutral-500 hover:text-neutral-700"
                        } ${!isSelected && selectedTags.length >= 3 ? "opacity-40 cursor-not-allowed" : ""}`}
                        style={{ fontSize: "0.6875rem", fontWeight: 500, borderColor: isSelected ? "#000" : "rgba(0,0,0,0.1)" }}
                      >
                        #{tag}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div
              className="px-6 py-4 flex items-center justify-between"
              style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}
            >
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-full transition-colors cursor-pointer"
                style={{ fontSize: "0.8125rem", fontWeight: 500, color: "rgba(0,0,0,0.4)" }}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-black text-white hover:bg-neutral-800 transition-all duration-300 cursor-pointer"
                style={{ fontSize: "0.8125rem", fontWeight: 600 }}
              >
                <Send size={14} />
                Submit Story
              </button>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

// ─── Sidebar ─────────────────────────────────────────────────

function Sidebar({
  search,
  setSearch,
  activeTag,
  setActiveTag,
}: {
  search: string;
  setSearch: (s: string) => void;
  activeTag: string | null;
  setActiveTag: (tag: string | null) => void;
}) {
  return (
    <aside className="space-y-6">
      {/* Search */}
      <div className="bg-white rounded-2xl p-4" style={{ border: "1px solid rgba(0,0,0,0.06)" }}>
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "rgba(0,0,0,0.2)" }} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search stories..."
            className="w-full pl-9 pr-9 py-2.5 rounded-xl focus:outline-none transition-all"
            style={{
              fontSize: "0.8125rem",
              fontWeight: 500,
              background: "rgba(0,0,0,0.02)",
              border: "1px solid rgba(0,0,0,0.06)",
              color: "#000",
            }}
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
              style={{ color: "rgba(0,0,0,0.3)" }}
            >
              <X size={13} />
            </button>
          )}
        </div>
      </div>

      {/* Trending */}
      <div className="bg-white rounded-2xl p-5" style={{ border: "1px solid rgba(0,0,0,0.06)" }}>
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp size={15} style={{ color: "#D4A017" }} />
          <h4 style={{ fontSize: "0.875rem", fontWeight: 700, color: "#000" }}>
            Trending Stories
          </h4>
        </div>
        <div className="space-y-3">
          {trendingPosts.map((post, i) => (
            <div key={post.id} className="flex items-start gap-3 group cursor-pointer">
              <span
                className="mt-0.5 flex-shrink-0"
                style={{ fontSize: "0.875rem", fontWeight: 800, color: "rgba(0,0,0,0.1)" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex-1 min-w-0">
                <p
                  className="group-hover:opacity-70 transition-opacity truncate"
                  style={{ fontSize: "0.8125rem", fontWeight: 600, color: "#000" }}
                >
                  {post.title}
                </p>
                <p className="flex items-center gap-2 mt-0.5" style={{ color: "rgba(0,0,0,0.3)" }}>
                  <span style={{ fontSize: "0.6875rem", fontWeight: 400 }}>{post.author}</span>
                  <span>&middot;</span>
                  <span className="flex items-center gap-0.5" style={{ fontSize: "0.6875rem", fontWeight: 500 }}>
                    <Heart size={9} />
                    {post.likes}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-white rounded-2xl p-5" style={{ border: "1px solid rgba(0,0,0,0.06)" }}>
        <div className="flex items-center gap-2 mb-4">
          <CalendarDays size={15} style={{ color: "#3b82f6" }} />
          <h4 style={{ fontSize: "0.875rem", fontWeight: 700, color: "#000" }}>
            Upcoming Events
          </h4>
        </div>
        <div className="space-y-3">
          {upcomingEvents.map((event) => {
            const config = eventTypeConfig[event.type];
            const Icon = config.icon;
            return (
              <div
                key={event.id}
                className="flex items-start gap-3 p-3 rounded-xl hover:bg-neutral-50 transition-colors cursor-pointer"
              >
                <div className={`w-8 h-8 rounded-lg ${config.bg} ${config.text} flex items-center justify-center flex-shrink-0`}>
                  <Icon size={14} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate" style={{ fontSize: "0.8125rem", fontWeight: 600, color: "#000" }}>
                    {event.title}
                  </p>
                  <p className="flex items-center gap-1.5 mt-0.5" style={{ color: "rgba(0,0,0,0.3)" }}>
                    <span style={{ fontSize: "0.625rem", fontWeight: 500 }}>{event.date}</span>
                    <span>&middot;</span>
                    <span style={{ fontSize: "0.625rem", fontWeight: 500 }}>{event.time}</span>
                  </p>
                  <p className="flex items-center gap-1 mt-0.5" style={{ color: "rgba(0,0,0,0.2)" }}>
                    <MapPin size={9} />
                    <span style={{ fontSize: "0.625rem", fontWeight: 400 }}>{event.location}</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tags */}
      <div className="bg-white rounded-2xl p-5" style={{ border: "1px solid rgba(0,0,0,0.06)" }}>
        <div className="flex items-center gap-2 mb-4">
          <Tag size={15} style={{ color: "#8b5cf6" }} />
          <h4 style={{ fontSize: "0.875rem", fontWeight: 700, color: "#000" }}>
            Browse by Tag
          </h4>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {activeTag && (
            <button
              onClick={() => setActiveTag(null)}
              className="px-2.5 py-1 rounded-full bg-black text-white flex items-center gap-1 cursor-pointer"
              style={{ fontSize: "0.6875rem", fontWeight: 600 }}
            >
              #{activeTag}
              <X size={10} />
            </button>
          )}
          {allTags
            .filter((t) => t !== activeTag)
            .map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className="px-2.5 py-1 rounded-full transition-colors duration-200 cursor-pointer"
                style={{
                  fontSize: "0.6875rem",
                  fontWeight: 500,
                  background: "rgba(0,0,0,0.03)",
                  color: "rgba(0,0,0,0.4)",
                  border: "1px solid rgba(0,0,0,0.04)",
                }}
              >
                #{tag}
              </button>
            ))}
        </div>
      </div>
    </aside>
  );
}

// ─── Page ────────────────────────────────────────────────────

export function CommunityPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [sortBy, setSortBy] = useState<"recent" | "popular">("recent");
  const [posts, setPosts] = useState<CommunityPost[]>(defaultPosts);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchCommunityStories().then((loaded) => {
      if (loaded && loaded.length > 0) {
        setPosts(loaded);
      }
    });
  }, []);

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 500);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSubmitStory = useCallback(async (story: CommunityPost) => {
    setPosts((prev) => [story, ...prev]);
    const updated = await publishCommunityStory(story);
    setPosts(updated);
  }, []);

  // Filter & sort
  const filteredPosts = useMemo(() => {
    let result = [...posts];
    if (activeTag) {
      result = result.filter((p) => p.tags.includes(activeTag));
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.summary.toLowerCase().includes(q) ||
          p.author.name.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    if (sortBy === "popular") {
      result.sort((a, b) => b.likes - a.likes);
    }
    return result;
  }, [search, activeTag, sortBy, posts]);

  const featuredPosts = filteredPosts.filter((p) => p.featured);
  const regularPosts = filteredPosts.filter((p) => !p.featured);

  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <div className="relative min-h-screen bg-white">
      {/* Back button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        onClick={() => navigate("/")}
        className="fixed top-5 left-5 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/80 backdrop-blur-xl border border-neutral-200/60 shadow-sm hover:bg-white hover:shadow-md transition-all duration-300 cursor-pointer group"
      >
        <ArrowLeft
          size={16}
          className="text-neutral-700 transition-transform duration-300 group-hover:-translate-x-0.5"
        />
        <span className="text-neutral-700" style={{ fontSize: "0.8125rem", fontWeight: 600 }}>
          Back
        </span>
      </motion.button>

      {/* Back to top */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-black text-white shadow-lg hover:bg-neutral-800 flex items-center justify-center transition-colors cursor-pointer"
          >
            <ArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <SubmitStoryModal
            onClose={() => setShowModal(false)}
            onSubmit={handleSubmitStory}
          />
        )}
      </AnimatePresence>

      {/* Hero */}
      <section
        ref={heroRef}
        className="bg-white pt-24 pb-8 sm:pt-28 sm:pb-10"
        style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6"
          >
            <div className="max-w-xl">
              <div className="flex items-center gap-2 mb-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: "rgba(212,160,23,0.1)" }}
                >
                  <Users size={15} style={{ color: "#D4A017" }} />
                </div>
                <span
                  className="tracking-[0.2em] uppercase"
                  style={{ fontSize: "0.6875rem", fontWeight: 600, color: "rgba(0,0,0,0.3)" }}
                >
                  Community
                </span>
              </div>
              <h1
                className="mb-3"
                style={{
                  fontSize: "clamp(2rem, 5vw, 3rem)",
                  fontWeight: 600,
                  lineHeight: 1.1,
                  color: "#000",
                }}
              >
                Stories that
                <br />
                inspire action
              </h1>
              <p
                style={{ fontSize: "1rem", fontWeight: 400, lineHeight: 1.85, color: "rgba(0,0,0,0.45)" }}
              >
                Real people sharing real experiences — of courage, creativity,
                and the extraordinary things that happen when we refuse to give up.
              </p>
            </div>
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-black text-white hover:bg-neutral-800 transition-all duration-300 cursor-pointer self-start sm:self-auto"
              style={{ fontSize: "0.875rem", fontWeight: 600 }}
            >
              <Plus size={16} />
              Share Your Story
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Sort bar */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-5 flex items-center justify-between">
        <p style={{ fontSize: "0.8125rem", fontWeight: 500, color: "rgba(0,0,0,0.35)" }}>
          {filteredPosts.length} stor{filteredPosts.length === 1 ? "y" : "ies"}
          {activeTag && (
            <span>
              {" "}tagged{" "}
              <span style={{ fontWeight: 600, color: "#000" }}>#{activeTag}</span>
            </span>
          )}
          {search && (
            <span>
              {" "}matching{" "}
              <span style={{ fontWeight: 600, color: "#000" }}>"{search}"</span>
            </span>
          )}
        </p>
        <div
          className="flex items-center gap-1 bg-white rounded-full p-1"
          style={{ border: "1px solid rgba(0,0,0,0.06)" }}
        >
          {(["recent", "popular"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setSortBy(s)}
              className={`px-3.5 py-1.5 rounded-full transition-all duration-200 cursor-pointer capitalize ${
                sortBy === s ? "bg-black text-white" : ""
              }`}
              style={{
                fontSize: "0.6875rem",
                fontWeight: 600,
                color: sortBy === s ? "#fff" : "rgba(0,0,0,0.3)",
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Main content */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Feed */}
          <div className="flex-1 min-w-0">
            {filteredPosts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 bg-white rounded-2xl"
                style={{ border: "1px solid rgba(0,0,0,0.06)" }}
              >
                <Search size={32} className="mx-auto mb-4" style={{ color: "rgba(0,0,0,0.1)" }} />
                <p style={{ fontSize: "1rem", fontWeight: 700, color: "#000" }} className="mb-2">
                  No stories found
                </p>
                <p style={{ fontSize: "0.875rem", fontWeight: 400, color: "rgba(0,0,0,0.35)" }} className="mb-6">
                  Try a different search or clear your filters.
                </p>
                <button
                  onClick={() => { setSearch(""); setActiveTag(null); }}
                  className="px-5 py-2.5 rounded-full bg-black text-white hover:bg-neutral-800 transition-colors cursor-pointer"
                  style={{ fontSize: "0.8125rem", fontWeight: 600 }}
                >
                  Clear filters
                </button>
              </motion.div>
            ) : (
              <>
                {/* Featured posts */}
                {featuredPosts.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                    {featuredPosts.map((post) => (
                      <FeaturedPostCard
                        key={post.id}
                        post={post}
                        onTagClick={setActiveTag}
                        onClick={() => navigate(`/community/${post.id}`)}
                      />
                    ))}
                  </div>
                )}

                {/* Regular grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {regularPosts.map((post, i) => (
                    <PostCard
                      key={post.id}
                      post={post}
                      index={i}
                      onTagClick={setActiveTag}
                      onClick={() => navigate(`/community/${post.id}`)}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <div className="lg:sticky lg:top-6">
              <Sidebar
                search={search}
                setSearch={setSearch}
                activeTag={activeTag}
                setActiveTag={setActiveTag}
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-white" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 sm:py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
              style={{ background: "rgba(212,160,23,0.08)" }}
            >
              <Sparkles size={24} style={{ color: "#D4A017" }} />
            </div>
            <h2
              className="mb-3"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 600, color: "#000" }}
            >
              Everyone has a story worth sharing
            </h2>
            <p
              className="max-w-md mx-auto mb-8"
              style={{ fontSize: "0.9375rem", fontWeight: 400, lineHeight: 1.8, color: "rgba(0,0,0,0.4)" }}
            >
              Whether it's a quiet triumph or a bold leap of faith, your
              experience could be the spark someone else needs today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-2 px-7 py-3.5 bg-black text-white rounded-full hover:bg-neutral-800 transition-all duration-300 cursor-pointer"
                style={{ fontSize: "0.875rem", fontWeight: 600 }}
              >
                <PenLine size={16} />
                Write Your Story
              </button>
              <button
                onClick={() => navigate("/")}
                className="px-7 py-3.5 rounded-full transition-all duration-300 cursor-pointer"
                style={{
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  background: "rgba(0,0,0,0.04)",
                  color: "rgba(0,0,0,0.5)",
                }}
              >
                Back to Home
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}