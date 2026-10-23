import { useRef, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import { motion, useInView, useMotionValue, useTransform, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  Heart,
  Globe,
  Sparkles,
  Quote,
  ChevronDown,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

// ─── Data ────────────────────────────────────────────────────

interface PersonalStory {
  id: string;
  name: string;
  origin: string;
  quote: string;
  story: string;
  image: string;
  theme: string;
}

interface CulturalPractice {
  id: string;
  title: string;
  region: string;
  overview: string;
  sections: { heading: string; body: string }[];
  image: string;
  fact: string;
}

interface DivineInspiration {
  id: string;
  title: string;
  quote: string;
  quoteAuthor: string;
  narrative: string;
  image: string;
  reflection: string;
}

const personalStories: PersonalStory[] = [
  {
    id: "ps1",
    name: "Maria Elena",
    origin: "Oaxaca, Mexico",
    quote:
      "In the silence between heartbeats, I found a voice that had been waiting my whole life to speak.",
    story:
      "After losing her sight at age twelve, Maria Elena discovered that the darkness was not empty \u2014 it was full. She began to hear the subtle rhythms of the world with an intensity that transformed her understanding of prayer. Every morning before dawn, she sits in her garden and listens. The birds, the wind, the distant church bells \u2014 they all become part of a conversation with something larger than herself. Her community now gathers around her each Sunday, not for sermons, but for shared silence. In that stillness, dozens of people from different faiths find common ground.",
    image:
      "https://images.unsplash.com/photo-1766901110596-749e419db76a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXhpY2FuJTIwd29tYW4lMjBnYXJkZW4lMjBtb3JuaW5nJTIwcHJheWVyJTIwbWVkaXRhdGlvbnxlbnwxfHx8fDE3NzIzMzcyOTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    theme: "Silence & Listening",
  },
  {
    id: "ps2",
    name: "Arun Patel",
    origin: "Varanasi, India",
    quote:
      "My grandfather said the river doesn\u2019t need to believe in the ocean \u2014 it simply flows toward it.",
    story:
      "Arun grew up on the banks of the Ganges, where life and death coexist with a familiarity that would unsettle most Westerners. As a young man, he rebelled against tradition, moving to London to study economics. But after a decade in finance, a quiet crisis pulled him back. He returned to Varanasi not as a pilgrim but as a question mark. Sitting by the river each evening, watching the cremation fires reflect on the water, he found that the answers he sought weren\u2019t intellectual \u2014 they were felt. He now runs a small guesthouse where travellers from around the world come to sit, reflect, and find their own relationship with impermanence.",
    image:
      "https://images.unsplash.com/photo-1767278599772-59efdcc8ff93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2YXJhbmFzaSUyMGdhbmdlcyUyMHJpdmVyJTIwZXZlbmluZyUyMGluZGlhJTIwc3Bpcml0dWFsfGVufDF8fHx8MTc3MjMzNzI5NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    theme: "Impermanence & Return",
  },
  {
    id: "ps3",
    name: "Sister Catherine",
    origin: "County Clare, Ireland",
    quote:
      "I don\u2019t write to understand God. I write because God gave me hands that need to move across the page.",
    story:
      "At 78, Sister Catherine has filled over 200 journals. Not with theology or doctrine, but with observations \u2014 the way light moves across her cell wall at 6 AM, the sound of rain on the stone courtyard, the particular shade of green in March. She entered the convent at nineteen, not because she was certain of God, but because she was certain of beauty. Her journals, recently published at the insistence of a visiting scholar, have become unexpected bestsellers \u2014 not as religious texts, but as meditations on paying attention. She says her only spiritual practice is noticing.",
    image:
      "https://images.unsplash.com/photo-1712229462134-ca2d5bc7e7ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbGQlMjB3b21hbiUyMGhhbmR3cml0aW5nJTIwbm90ZWJvb2slMjBwZWFjZWZ1bCUyMHF1aWV0fGVufDF8fHx8MTc3MjMzNzI5N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    theme: "Attention & Beauty",
  },
];

const culturalPractices: CulturalPractice[] = [
  {
    id: "cp1",
    title: "Zen Gardens & Wabi-Sabi",
    region: "Japan",
    overview:
      "The Japanese Zen garden is not decoration. It is a tool for stilling the mind. Every stone, every line raked into gravel, is a deliberate act of presence.",
    sections: [
      {
        heading: "The Practice",
        body: "In a karesansui (dry landscape garden), monks arrange stones and rake gravel into flowing patterns that represent water, mountains, and the passage of time. There is no rushing. The garden is never finished. Each morning the patterns are raked fresh, and each evening the wind softens them. The act of raking is itself a meditation \u2014 a rhythm of arm and breath that quiets internal noise.",
      },
      {
        heading: "The Philosophy of Wabi-Sabi",
        body: "Wabi-sabi finds beauty in imperfection and impermanence. A cracked tea bowl is more valued than a flawless one because the crack tells a story. Moss growing on stone is not decay \u2014 it is time made visible. This philosophy teaches that nothing lasts, nothing is finished, and nothing is perfect. And in that acceptance, there is deep peace.",
      },
      {
        heading: "A Living Legacy",
        body: "These principles have shaped Japanese architecture, ceramics, and textile design for over five centuries. Today, they influence modern minimalism worldwide. The core lesson endures: simplicity is not emptiness. It is fullness with nothing to spare.",
      },
    ],
    image:
      "https://images.unsplash.com/photo-1672758688257-a110c93de407?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMHplbiUyMGdhcmRlbiUyMHJha2VkJTIwc2FuZCUyMHN0b25lcyUyMHRlbXBsZXxlbnwxfHx8fDE3NzIyOTc0NjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    fact: "Some Zen gardens have been maintained continuously for over 500 years.",
  },
  {
    id: "cp2",
    title: "Diwali \u2014 Festival of Lights",
    region: "India & South Asia",
    overview:
      "When over a billion people light oil lamps together, they participate in one of humanity\u2019s oldest rituals: calling light into darkness. Diwali is not merely a festival. It is a collective meditation on hope.",
    sections: [
      {
        heading: "The Five Days",
        body: "Diwali spans five days, each with its own significance. Homes are cleaned and decorated. New clothes are worn. Families gather to share food and prayer. The first day honours prosperity. The second celebrates the triumph of good over evil. The third \u2014 the main night \u2014 fills the darkness with millions of small flames. The fourth marks the new year in many traditions. The fifth honours the bond between siblings.",
      },
      {
        heading: "Collective Illumination",
        body: "The diyas \u2014 small clay oil lamps \u2014 are not symbolic. They are an act. Each one is hand-lit, hand-placed, hand-tended. The ritual teaches that even a single small flame can hold back the vast darkness. And that every individual light, when joined with others, creates an illumination visible from space. NASA satellite images during Diwali show the entire subcontinent glowing.",
      },
      {
        heading: "Universal Meaning",
        body: "At its heart, Diwali celebrates the victory of knowledge over ignorance. It asks each participant to examine what darkness they carry internally and to choose, deliberately, to light something against it. This is not a passive holiday. It is an invitation to participate in brightness.",
      },
    ],
    image:
      "https://images.unsplash.com/photo-1761057292491-74eae3d187fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXdhbGklMjBvaWwlMjBsYW1wcyUyMGRpeWFzJTIwY2VsZWJyYXRpb24lMjBsaWdodHN8ZW58MXx8fHwxNzcyMjk3NDYzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    fact: "Diwali celebrations are visible from space via NASA satellites.",
  },
  {
    id: "cp3",
    title: "Sufi Whirling Ceremony",
    region: "Turkey & Middle East",
    overview:
      "The Sema ceremony is not a performance. It is a prayer made visible. The whirling dervish spins not to entertain, but to dissolve the boundary between self and the divine.",
    sections: [
      {
        heading: "The Sema Ceremony",
        body: "Founded by followers of the 13th-century poet Rumi, the Mevlevi Order developed the Sema as a moving meditation. Dervishes spin counterclockwise, right palm facing up to receive divine grace, left palm facing down to channel it to the earth. The white robes represent the ego\u2019s shroud. The tall hat represents its tombstone. To spin is to die to the self and be reborn in each revolution.",
      },
      {
        heading: "The Body as Prayer",
        body: "The ceremony demonstrates that spirituality need not be still. It can be ecstatic, joyful, and fully embodied. Each rotation is a prayer. Each revolution brings the practitioner closer to truth. The music \u2014 a haunting ney flute over rhythmic drums \u2014 draws the dervish deeper inward even as the body moves outward. There is no separation between the physical and the sacred.",
      },
      {
        heading: "Rumi\u2019s Legacy",
        body: "Rumi\u2019s poetry has been translated into every major language on Earth. His words \u2014 \u201cYou are not a drop in the ocean. You are the entire ocean in a drop\u201d \u2014 continue to reach people across every boundary of culture and belief. The whirling ceremony is his living inheritance: proof that the deepest truths are not spoken but embodied.",
      },
    ],
    image:
      "https://images.unsplash.com/photo-1764099363036-af650bca3cd7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdWZpJTIwd2hpcmxpbmclMjBkZXJ2aXNoJTIwY2VyZW1vbnklMjBzcGlyaXR1YWx8ZW58MXx8fHwxNzcyMjk3NDY0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    fact: "Rumi\u2019s poetry has been translated into every major language on Earth.",
  },
];

const divineInspirations: DivineInspiration[] = [
  {
    id: "di1",
    title: "The Cathedrals of Light",
    quote:
      "Architecture should speak of its time and place, but yearn for timelessness.",
    quoteAuthor: "Frank Gehry",
    narrative:
      "When medieval builders raised the great cathedrals of Europe, they were not simply constructing buildings \u2014 they were translating a vision of heaven into stone and light. The architects of Chartres, Notre-Dame, and Cologne spent lifetimes on structures they knew they would never see completed. Their stained glass windows were designed to transform ordinary sunlight into something sacred, each colour carrying theological meaning. Blue for heaven, red for the blood of martyrs, gold for divine glory. These builders worked without modern tools, guided by geometry they considered divine. The result: spaces that have moved millions of people to tears for over 800 years \u2014 not through argument, but through beauty.",
    image:
      "https://images.unsplash.com/photo-1559147672-515704fa1c2e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXRoZWRyYWwlMjBzdGFpbmVkJTIwZ2xhc3MlMjBzdW5saWdodCUyMGludGVyaW9yfGVufDF8fHx8MTc3MjI5NzQ2MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    reflection:
      "What in your life are you building that you may never see completed \u2014 and is the building itself the point?",
  },
  {
    id: "di2",
    title: "Music as Prayer",
    quote: "Where words fail, music speaks.",
    quoteAuthor: "Hans Christian Andersen",
    narrative:
      "Throughout history, music has been humanity\u2019s most direct line to the transcendent. Bach wrote \u2018Soli Deo Gloria\u2019 (To God alone the glory) on every manuscript. John Coltrane\u2019s \u2018A Love Supreme\u2019 was a spiritual autobiography in four movements. Aboriginal Australians sing the world into existence through Songlines that map the landscape and the cosmos simultaneously. Neuroscience has shown that music activates the same brain regions as mystical experiences \u2014 the default mode network quiets, ego boundaries dissolve, and something larger seems to flow through. Whether it\u2019s a gospel choir, a solo oud, or a Tibetan singing bowl, music dissolves the barrier between the self and the infinite.",
    image:
      "https://images.unsplash.com/photo-1735868226419-30e577d80970?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaWFuaXN0JTIwY29uY2VydCUyMGhhbGwlMjBlbW90aW9uYWwlMjBwZXJmb3JtYW5jZXxlbnwxfHx8fDE3NzIyOTc0NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    reflection:
      "When was the last time a piece of music dissolved your sense of self? What was playing?",
  },
  {
    id: "di3",
    title: "Awe in the Natural World",
    quote:
      "The clearest way into the Universe is through a forest wilderness.",
    quoteAuthor: "John Muir",
    narrative:
      "Scientists call it \u2018the overview effect\u2019 \u2014 the cognitive shift reported by astronauts who see Earth from space. But you don\u2019t need a rocket to experience it. Standing before a vast mountain range, watching a thunderstorm roll across an open plain, or simply lying beneath a canopy of stars \u2014 these moments of awe have the same neurological signature as deep meditation. Research shows that awe shrinks our sense of self, expands our sense of time, and increases prosocial behaviour. Indigenous cultures have always known this: that the natural world is not a resource to be exploited but a teacher to be listened to. Every mountain, every river, every ancient tree has a story to tell \u2014 if we slow down enough to hear it.",
    image:
      "https://images.unsplash.com/photo-1770742185920-65a93f1ea885?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwZm9yZXN0JTIwc3VuYmVhbXMlMjBtaXN0eSUyMHBlYWNlZnVsfGVufDF8fHx8MTc3MjI5NzQ2M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    reflection:
      "Where do you go when you need to feel small in the best possible way?",
  },
];

const sectionNav = [
  { id: "stories", label: "Personal Stories", icon: Heart },
  { id: "practices", label: "Cultural Practices", icon: Globe },
  { id: "inspiration", label: "Divine Inspiration", icon: Sparkles },
];

// ─── Hero (unchanged) ────────────────────────────────────────

function SpiritualHero() {
  const ref = useRef<HTMLDivElement>(null);

  const scrollProgress = useMotionValue(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const progress = Math.min(
        Math.max(-rect.top / (rect.height || 1), 0),
        1
      );
      scrollProgress.set(progress);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollProgress]);

  const imageY = useTransform(scrollProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative h-[85vh] min-h-[600px] overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y: imageY }}>
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1751563696363-abb675273f59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvY2VhbiUyMGNhbG0lMjBob3Jpem9uJTIwcGVhY2VmdWwlMjBzZXJlbmUlMjBibHVlfGVufDF8fHx8MTc3MjA5NTc0OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Serene ocean horizon"
          className="w-full h-[120%] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/30 to-white" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-white/50 tracking-[0.4em] uppercase mb-6"
          style={{ fontSize: "0.6875rem", fontWeight: 600 }}
        >
          Community &middot; Spirit &middot; Connection
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-white max-w-3xl tracking-tight"
          style={{
            fontSize: "clamp(2.25rem, 6vw, 7rem)",
            fontWeight: 800,
            lineHeight: 1.05,
          }}
        >
          Spiritual
          <br />
          Inspiration
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="text-white/60 max-w-lg mt-6"
          style={{ fontSize: "1.0625rem", fontWeight: 400, lineHeight: 1.75 }}
        >
          Stories of faith, cultural wisdom, and the invisible forces that
          inspire humanity's greatest expressions.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="absolute bottom-10"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span
              className="text-white/30"
              style={{ fontSize: "0.625rem", fontWeight: 500, letterSpacing: "0.2em" }}
            >
              BEGIN
            </span>
            <ChevronDown size={16} className="text-white/30" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── Floating Bottom Tab Bar (Achievements-style) ────────────

function FloatingTabBar({ activeSection }: { activeSection: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="fixed bottom-7 left-1/2 -translate-x-1/2 z-50 max-w-[90vw]"
    >
      <div
        className="flex items-center gap-1 p-1 rounded-full bg-white/80 backdrop-blur-xl border border-neutral-200/60 shadow-sm"
        style={{ scrollbarWidth: "none" }}
      >
        {sectionNav.map((s) => {
          const Icon = s.icon;
          const isActive = activeSection === s.id;
          return (
            <button
              key={s.id}
              onClick={() => {
                const el = document.querySelector(`#section-${s.id}`);
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full transition-all duration-300 cursor-pointer whitespace-nowrap flex-shrink-0 ${
                isActive
                  ? "bg-neutral-900 text-white"
                  : "text-neutral-400 hover:text-neutral-700 hover:bg-neutral-50"
              }`}
              style={{
                fontSize: "0.75rem",
                fontWeight: isActive ? 600 : 500,
              }}
            >
              <Icon size={12} />
              <span className="hidden sm:inline">{s.label}</span>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}

// ─── Section Divider ─────────────────────────────────────────

function SectionIntro({
  id,
  number,
  title,
  subtitle,
}: {
  id: string;
  number: string;
  title: string;
  subtitle: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div id={`section-${id}`} ref={ref} className="pt-24 pb-8 sm:pt-32 sm:pb-12 scroll-mt-16">
      <div className="max-w-4xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <span
            style={{ fontSize: "0.6875rem", fontWeight: 600, color: "#3b82f6", letterSpacing: "0.3em" }}
          >
            {number}
          </span>
          <h2
            className="mt-3 mb-4"
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              fontWeight: 600,
              lineHeight: 1.15,
              color: "#000000",
            }}
          >
            {title}
          </h2>
          <p
            className="max-w-md mx-auto"
            style={{ fontSize: "1rem", fontWeight: 400, lineHeight: 1.75, color: "rgba(0,0,0,0.45)" }}
          >
            {subtitle}
          </p>
        </motion.div>
      </div>
    </div>
  );
}

// ─── Quote Block ─────────────────────────────────────────────

function QuoteBlock({
  quote,
  author,
}: {
  quote: string;
  author?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7 }}
    >
      <blockquote className="relative py-8 sm:py-10">
        <Quote
          size={32}
          className="absolute -top-1 left-0"
          style={{ color: "rgba(0,0,0,0.06)" }}
        />
        <p
          className="pl-2 italic"
          style={{ fontSize: "clamp(1.125rem, 2.5vw, 1.5rem)", fontWeight: 400, lineHeight: 1.6, color: "rgba(0,0,0,0.7)" }}
        >
          &ldquo;{quote}&rdquo;
        </p>
        {author && (
          <cite
            className="block mt-4 pl-2 not-italic"
            style={{ fontSize: "0.875rem", fontWeight: 500, color: "rgba(0,0,0,0.35)" }}
          >
            &mdash; {author}
          </cite>
        )}
      </blockquote>
    </motion.div>
  );
}

// ─── Story Card (with hover animation) ──────────────────────

function StoryCard({ story, index }: { story: PersonalStory; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [expanded, setExpanded] = useState(false);
  const isReversed = index % 2 !== 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.1 }}
      className="mb-20 sm:mb-28"
    >
      <div
        className={`flex flex-col ${
          isReversed ? "lg:flex-row-reverse" : "lg:flex-row"
        } gap-8 lg:gap-12 items-center`}
      >
        {/* Image with hover animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full lg:w-5/12 flex-shrink-0"
          whileHover={{ scale: 1.03, y: -4 }}
          style={{ transition: "none" }}
        >
          <div className="relative rounded-2xl overflow-hidden aspect-[4/5] sm:aspect-[3/4]">
            <motion.div
              className="w-full h-full"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <ImageWithFallback
                src={story.image}
                alt={story.name}
                className="w-full h-full object-cover"
              />
            </motion.div>
            {/* Theme tag */}
            <div className="absolute bottom-5 left-5">
              <span
                className="px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-white border border-white/15"
                style={{ fontSize: "0.6875rem", fontWeight: 600, letterSpacing: "0.05em" }}
              >
                {story.theme}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <div className="w-full lg:w-7/12">
          <div className="flex items-center gap-2 mb-4">
            <span
              style={{ fontSize: "0.6875rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "#3b82f6" }}
            >
              {story.origin}
            </span>
          </div>

          <h3
            className="mb-5"
            style={{ fontSize: "clamp(1.375rem, 3vw, 2rem)", fontWeight: 800, lineHeight: 1.2, color: "#000000" }}
          >
            {story.name}
          </h3>

          <QuoteBlock quote={story.quote} />

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <p
                  className="mb-6"
                  style={{ fontSize: "0.9375rem", fontWeight: 400, lineHeight: 1.95, color: "rgba(0,0,0,0.55)" }}
                >
                  {story.story}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-2 transition-colors duration-300 cursor-pointer group"
            style={{ color: "rgba(0,0,0,0.35)" }}
          >
            <span style={{ fontSize: "0.8125rem", fontWeight: 600 }}>
              {expanded ? "Read less" : "Read their story"}
            </span>
            <motion.div
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown size={14} />
            </motion.div>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Cultural Practice Card (image + structured text) ────────

function PracticeCard({
  practice,
  index,
}: {
  practice: CulturalPractice;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  // Parallax hover effect
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const imgX = useTransform(px, [-1, 1], [-10, 10]);
  const imgY = useTransform(py, [-1, 1], [-10, 10]);
  const imgScale = useTransform(px, [-1, 0, 1], [1.04, 1.02, 1.04]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mx = (e.clientX - rect.left) / rect.width;
    const my = (e.clientY - rect.top) / rect.height;
    px.set((mx - 0.5) * 2);
    py.set((my - 0.5) * 2);
  }, [px, py]);

  const handleMouseLeave = useCallback(() => {
    px.set(0);
    py.set(0);
  }, [px, py]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className="mb-24 sm:mb-32"
    >
      {/* Full-width image with parallax hover */}
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative rounded-2xl overflow-hidden aspect-[16/9] sm:aspect-[2/1] mb-10"
      >
        <motion.div
          className="absolute inset-[-12px]"
          style={{ x: imgX, y: imgY, scale: imgScale }}
          transition={{ type: "spring", stiffness: 150, damping: 25 }}
        >
          <ImageWithFallback
            src={practice.image}
            alt={practice.title}
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute bottom-6 left-6 right-6 z-10">
          <span
            className="px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-white/80 border border-white/15 inline-block mb-3"
            style={{ fontSize: "0.6875rem", fontWeight: 600 }}
          >
            {practice.region}
          </span>
          <h3
            className="text-white"
            style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)", fontWeight: 800, lineHeight: 1.15 }}
          >
            {practice.title}
          </h3>
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        {/* Overview */}
        <p
          className="mb-8"
          style={{ fontSize: "1.0625rem", fontWeight: 400, lineHeight: 1.95, color: "rgba(0,0,0,0.6)" }}
        >
          {practice.overview}
        </p>

        {/* Structured sections */}
        <div className="space-y-8 mb-8">
          {practice.sections.map((section) => (
            <div key={section.heading}>
              <h4
                className="mb-3"
                style={{ fontSize: "0.9375rem", fontWeight: 700, color: "#000000" }}
              >
                {section.heading}
              </h4>
              <p
                style={{ fontSize: "0.9375rem", fontWeight: 400, lineHeight: 1.95, color: "rgba(0,0,0,0.5)" }}
              >
                {section.body}
              </p>
            </div>
          ))}
        </div>

        {/* Fact callout */}
        <div
          className="flex items-start gap-3 px-5 py-4 rounded-xl"
          style={{ background: "rgba(59,130,246,0.04)", border: "1px solid rgba(59,130,246,0.1)" }}
        >
          <Sparkles size={16} className="mt-0.5 flex-shrink-0" style={{ color: "#3b82f6" }} />
          <p
            style={{ fontSize: "0.875rem", fontWeight: 500, lineHeight: 1.6, color: "rgba(0,0,0,0.55)" }}
          >
            {practice.fact}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Divine Inspiration Card (with parallax hover) ───────────

function InspirationCard({
  inspiration,
  index,
}: {
  inspiration: DivineInspiration;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [showReflection, setShowReflection] = useState(false);

  // Parallax hover effect
  const imgRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const imgX = useTransform(x, [-1, 1], [-12, 12]);
  const imgY = useTransform(y, [-1, 1], [-12, 12]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    x.set((px - 0.5) * 2);
    y.set((py - 0.5) * 2);
  }, [x, y]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className="mb-28 sm:mb-36"
    >
      {/* Large image with parallax */}
      <div
        ref={imgRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative rounded-2xl overflow-hidden aspect-[16/10] sm:aspect-[2.2/1] mb-10"
      >
        <motion.div
          className="absolute inset-[-15px]"
          style={{ x: imgX, y: imgY }}
          transition={{ type: "spring", stiffness: 150, damping: 25 }}
        >
          <ImageWithFallback
            src={inspiration.image}
            alt={inspiration.title}
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="px-8 sm:px-12 max-w-xl">
            <h3
              className="text-white mb-4"
              style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)", fontWeight: 800, lineHeight: 1.15 }}
            >
              {inspiration.title}
            </h3>
            <p
              className="text-white/60 italic"
              style={{ fontSize: "clamp(0.875rem, 2vw, 1.125rem)", fontWeight: 400, lineHeight: 1.6 }}
            >
              &ldquo;{inspiration.quote}&rdquo;
            </p>
            <p
              className="text-white/40 mt-2"
              style={{ fontSize: "0.8125rem", fontWeight: 500 }}
            >
              &mdash; {inspiration.quoteAuthor}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        <p
          className="mb-8"
          style={{ fontSize: "1rem", fontWeight: 400, lineHeight: 1.95, color: "rgba(0,0,0,0.55)" }}
        >
          {inspiration.narrative}
        </p>

        {/* Reflection prompt */}
        <div className="relative">
          <button
            onClick={() => setShowReflection(!showReflection)}
            className="w-full text-left px-6 py-5 rounded-2xl transition-all duration-300 cursor-pointer group"
            style={{ background: "rgba(0,0,0,0.02)", border: "1px solid rgba(0,0,0,0.06)" }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(59,130,246,0.08)" }}
                >
                  <Heart size={15} style={{ color: "#3b82f6" }} />
                </div>
                <span
                  style={{ fontSize: "0.875rem", fontWeight: 600, color: "rgba(0,0,0,0.6)" }}
                >
                  Pause & Reflect
                </span>
              </div>
              <motion.div
                animate={{ rotate: showReflection ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown size={16} style={{ color: "rgba(0,0,0,0.3)" }} />
              </motion.div>
            </div>
          </button>

          <AnimatePresence>
            {showReflection && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <div
                  className="px-6 pb-6 pt-4 rounded-b-2xl -mt-3"
                  style={{ background: "rgba(0,0,0,0.02)", border: "1px solid rgba(0,0,0,0.06)", borderTop: "none" }}
                >
                  <p
                    className="italic"
                    style={{ fontSize: "1rem", fontWeight: 400, lineHeight: 1.85, color: "rgba(0,0,0,0.55)" }}
                  >
                    {inspiration.reflection}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Separator ───────────────────────────────────────────────

function NarrativeSeparator() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 1 }}
      className="flex items-center justify-center py-8 sm:py-12"
    >
      <div className="flex items-center gap-3">
        <div className="w-12 h-px" style={{ background: "rgba(0,0,0,0.08)" }} />
        <Sparkles size={14} style={{ color: "rgba(0,0,0,0.15)" }} />
        <div className="w-12 h-px" style={{ background: "rgba(0,0,0,0.08)" }} />
      </div>
    </motion.div>
  );
}

// ─── Page ────────────────────────────────────────────────────

export function SpiritualPage() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("stories");

  // Track section in viewport
  const observerCallback = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id.replace("section-", "");
        setActiveSection(id);
      }
    });
  }, []);

  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(observerCallback, {
      threshold: 0.15,
      rootMargin: "-60px 0px -50% 0px",
    });
    return () => observerRef.current?.disconnect();
  }, [observerCallback]);

  // Observe sections after mount
  const attachObserver = (id: string) => {
    return (node: HTMLDivElement | null) => {
      if (node && observerRef.current) {
        observerRef.current.observe(node);
      }
    };
  };

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
        <span
          className="text-neutral-700"
          style={{ fontSize: "0.8125rem", fontWeight: 600 }}
        >
          Back
        </span>
      </motion.button>

      {/* Hero */}
      <SpiritualHero />

      {/* Floating bottom tab bar */}
      <FloatingTabBar activeSection={activeSection} />

      {/* ─── Section 1: Personal Stories ─── */}
      <div id="section-stories" ref={attachObserver("stories")}>
        <SectionIntro
          id="stories"
          number="PART ONE"
          title="Personal Stories of Faith"
          subtitle="Three lives, three journeys, one universal truth — that the deepest answers are found in the quietest places."
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-10 pb-8">
        {personalStories.map((story, i) => (
          <StoryCard key={story.id} story={story} index={i} />
        ))}
      </div>

      <NarrativeSeparator />

      {/* ─── Section 2: Cultural Practices ─── */}
      <div id="section-practices" ref={attachObserver("practices")}>
        <SectionIntro
          id="practices"
          number="PART TWO"
          title="Cultural Practices"
          subtitle="Across every continent, humanity has woven spiritual expression into art, ritual, and daily life."
        />
      </div>

      <div className="max-w-5xl mx-auto px-6 lg:px-10 pb-8">
        {culturalPractices.map((practice, i) => (
          <PracticeCard key={practice.id} practice={practice} index={i} />
        ))}
      </div>

      <NarrativeSeparator />

      {/* ─── Section 3: Divine Inspiration ─── */}
      <div id="section-inspiration" ref={attachObserver("inspiration")}>
        <SectionIntro
          id="inspiration"
          number="PART THREE"
          title="Divine Inspiration"
          subtitle="The invisible force behind cathedrals, symphonies, and starlit wonder."
        />
      </div>

      <div className="max-w-5xl mx-auto px-6 lg:px-10 pb-8">
        {divineInspirations.map((item, i) => (
          <InspirationCard key={item.id} inspiration={item} index={i} />
        ))}
      </div>

      {/* ─── Closing ─── */}
      <section className="py-24 sm:py-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center">
          {/* Stars image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative rounded-2xl overflow-hidden aspect-[2.5/1] mb-12"
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1633380982102-84f73080ac3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFycnklMjBuaWdodCUyMHNreSUyMG1pbGt5JTIwd2F5JTIwY29zbW9zfGVufDF8fHx8MTc3MjA5NTc0OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Starry night sky"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <QuoteBlock
              quote="The wound is the place where the Light enters you."
              author="Rumi"
            />
            <p
              className="max-w-md mx-auto mt-4 mb-10"
              style={{ fontSize: "0.9375rem", fontWeight: 400, lineHeight: 1.85, color: "rgba(0,0,0,0.4)" }}
            >
              Thank you for walking this path with us. May these stories stay
              with you like seeds — quiet now, but ready to bloom.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pb-16">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="px-7 py-3.5 bg-black text-white rounded-full hover:bg-neutral-800 transition-all duration-300 cursor-pointer"
                style={{ fontSize: "0.875rem", fontWeight: 600 }}
              >
                Return to the beginning
              </button>
              <button
                onClick={() => navigate("/")}
                className="px-7 py-3.5 rounded-full transition-all duration-300 cursor-pointer"
                style={{ fontSize: "0.875rem", fontWeight: 500, background: "rgba(0,0,0,0.04)", color: "rgba(0,0,0,0.6)" }}
              >
                Back to home
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}