import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { motion, useInView } from "motion/react";
import { ArrowLeft, Heart, MessageCircle, Clock, MapPin, ChevronLeft } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { communityPosts, type CommunityPost } from "./communityData";
import { toggleLikeCommunityStory } from "../../lib/communityService";

// ─── Avatar ──────────────────────────────────────────────────

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

// ─── Page ────────────────────────────────────────────────────

export function StoryDetailPage() {
  const navigate = useNavigate();
  const { storyId } = useParams<{ storyId: string }>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Try stored stories cache first (which includes updated likes and user stories), then fall back to communityPosts
  let initialPost: CommunityPost | undefined;
  try {
    const stored = localStorage.getItem("ahp_community_stories_cache") || localStorage.getItem("community_user_stories");
    if (stored) {
      const stories: CommunityPost[] = JSON.parse(stored);
      initialPost = stories.find((p) => p.id === storyId);
    }
  } catch {
    /* ignore */
  }

  if (!initialPost) {
    initialPost = communityPosts.find((p) => p.id === storyId);
  }

  const post = initialPost;
  const [likes, setLikes] = useState<number>(post?.likes ?? 0);
  const [liked, setLiked] = useState(false);

  const handleLike = async () => {
    if (liked || !post) return;
    setLiked(true);
    setLikes((prev) => prev + 1);
    await toggleLikeCommunityStory(post.id);
  };

  const contentRef = useRef<HTMLDivElement>(null);
  const contentInView = useInView(contentRef, { once: true, margin: "-40px" });

  if (!post) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p style={{ fontSize: "1.125rem", fontWeight: 700, color: "#000" }}>Story not found</p>
          <p style={{ fontSize: "0.875rem", color: "rgba(0,0,0,0.4)", marginTop: 8 }}>
            This story may have been removed or the link is incorrect.
          </p>
          <button
            onClick={() => navigate("/community")}
            className="mt-6 px-6 py-3 bg-black text-white rounded-full cursor-pointer hover:bg-neutral-800 transition-colors"
            style={{ fontSize: "0.875rem", fontWeight: 600 }}
          >
            Back to Community
          </button>
        </div>
      </div>
    );
  }

  // Parse paragraphs from body
  const paragraphs = post.body
    .split("\n\n")
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-white">
      {/* Back button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        onClick={() => navigate("/community")}
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

      {/* Cover image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative w-full aspect-[16/7] sm:aspect-[16/6] max-h-[520px] overflow-hidden"
      >
        <ImageWithFallback
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 lg:px-10">
        {/* Meta section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="pt-10 pb-8 border-b"
          style={{ borderColor: "rgba(0,0,0,0.06)" }}
        >
          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 rounded-full"
                style={{
                  fontSize: "0.6875rem",
                  fontWeight: 600,
                  background: "rgba(0,0,0,0.04)",
                  color: "rgba(0,0,0,0.45)",
                }}
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              fontWeight: 600,
              lineHeight: 1.15,
              color: "#000",
              marginBottom: 20,
            }}
          >
            {post.title}
          </h1>

          {/* Author row */}
          <div className="flex items-center gap-3">
            <AvatarBubble initials={post.author.avatar} size={44} />
            <div>
              <p style={{ fontSize: "0.9375rem", fontWeight: 700, color: "#000" }}>
                {post.author.name}
              </p>
              <div className="flex items-center gap-3 mt-0.5" style={{ color: "rgba(0,0,0,0.35)" }}>
                <span className="flex items-center gap-1">
                  <MapPin size={11} />
                  <span style={{ fontSize: "0.75rem", fontWeight: 400 }}>
                    {post.author.location}
                  </span>
                </span>
                <span style={{ fontSize: "0.75rem", fontWeight: 400 }}>
                  {post.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={11} />
                  <span style={{ fontSize: "0.75rem", fontWeight: 400 }}>
                    {post.readTime}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Article body */}
        <motion.article
          ref={contentRef}
          initial={{ opacity: 0, y: 30 }}
          animate={contentInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="py-10"
        >
          {paragraphs.map((p, i) => (
            <p
              key={i}
              style={{
                fontSize: "1.0625rem",
                fontWeight: 400,
                lineHeight: 2,
                color: "rgba(0,0,0,0.6)",
                marginBottom: i < paragraphs.length - 1 ? 28 : 0,
              }}
            >
              {p}
            </p>
          ))}
        </motion.article>

        {/* Engagement footer */}
        <div
          className="flex items-center justify-between py-8 mb-12"
          style={{ borderTop: "1px solid rgba(0,0,0,0.06)", borderBottom: "1px solid rgba(0,0,0,0.06)" }}
        >
          <div className="flex items-center gap-5" style={{ color: "rgba(0,0,0,0.35)" }}>
            <button
              onClick={handleLike}
              className="flex items-center gap-1.5 hover:text-rose-500 transition-colors cursor-pointer group"
              title={liked ? "Liked!" : "Like this story"}
            >
              <Heart
                size={16}
                className={liked ? "fill-rose-500 text-rose-500" : "group-hover:scale-110 transition-transform"}
              />
              <span style={{ fontSize: "0.875rem", fontWeight: 600, color: liked ? "#f43f5e" : "inherit" }}>
                {likes}
              </span>
            </button>
            <span className="flex items-center gap-1.5">
              <MessageCircle size={16} />
              <span style={{ fontSize: "0.875rem", fontWeight: 600 }}>
                {post.comments}
              </span>
            </span>
          </div>
          <button
            onClick={() => navigate("/community")}
            className="flex items-center gap-1.5 cursor-pointer hover:opacity-70 transition-opacity"
            style={{ color: "rgba(0,0,0,0.4)", fontSize: "0.8125rem", fontWeight: 600 }}
          >
            <ChevronLeft size={14} />
            All Stories
          </button>
        </div>
      </div>
    </div>
  );
}
