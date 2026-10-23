import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence, useInView } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  X,
  Landmark,
  Rocket,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Calendar,
  MapPin,
  TrendingUp,
  Compass,
  Cpu,
  Telescope,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";


// ─── Data ────────────────────────────────────────────────────

interface TimelineEvent {
  id: string;
  title: string;
  year: string;
  location: string;
  impact: string;
  image: string;
  story: string;
  stat: string;
  statLabel: string;
}

interface Era {
  id: string;
  label: string;
  period: string;
  color: string;
  bgGradient: string;
  icon: typeof Landmark;
  intro: string;
  events: TimelineEvent[];
}

// ─── IMAGES ──────────────────────────────────────────────────

const IMG = {
  pyramids: "https://images.unsplash.com/photo-1767797864473-1d34d23fd948?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVhdCUyMHB5cmFtaWRzJTIwZ2l6YSUyMGdvbGRlbiUyMHN1bmxpZ2h0JTIwY2xlYXIlMjBza3l8ZW58MXx8fHwxNzcyMjczMzgwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  colosseum: "https://images.unsplash.com/photo-1763935841627-2caf65b9736d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvc3NldW0lMjByb21lJTIwc3VubnklMjBjbGVhciUyMGFyY2hpdGVjdHVyYWx8ZW58MXx8fHwxNzcyMjczMzg3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  greekPhilo: "https://images.unsplash.com/photo-1765809185515-da05f5fb02ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwZ3JlZWslMjBtYXJibGUlMjBzY3VscHR1cmUlMjBwaGlsb3NvcGh5fGVufDF8fHx8MTc3MjI3MzM4Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  mesopotamia: "https://images.unsplash.com/photo-1762495842622-97bf58b76181?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwY3VuZWlmb3JtJTIwdGFibGV0JTIwbWVzb3BvdGFtaWElMjBhcnRpZmFjdHxlbnwxfHx8fDE3NzIyNzMzODJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  indusValley: "https://images.unsplash.com/photo-1608717310359-3a1e90a53504?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2hlbmpvJTIwZGFybyUyMGFuY2llbnQlMjBydWlucyUyMGFyY2hhZW9sb2dpY2FsJTIwc2l0ZXxlbnwxfHx8fDE3NzIyNzMzODJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  chinese: "https://images.unsplash.com/photo-1691087667225-7237a547f1ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwY2hpbmVzZSUyMGNvbXBhc3MlMjBzaWxrJTIwaW52ZW50aW9ufGVufDF8fHx8MTc3MjI3MzM4M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  mayan: "https://images.unsplash.com/photo-1769565979248-3fd0135049c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGljaGVuJTIwaXR6YSUyMG1heWFuJTIwcHlyYW1pZCUyMHN1bnJpc2V8ZW58MXx8fHwxNzcyMjczMzgzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  university: "https://images.unsplash.com/photo-1697119601616-27ef17df61d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbGQlMjB1bml2ZXJzaXR5JTIwaGFsbCUyMGdyYW5kJTIwb3JuYXRlJTIwbGlicmFyeXxlbnwxfHx8fDE3NzIyNzMzODh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  parthenon: "https://images.unsplash.com/photo-1694635994523-609fd83b2029?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJ0aGVub24lMjBhdGhlbnMlMjBjb2x1bW5zJTIwZ3JlZWslMjB0ZW1wbGV8ZW58MXx8fHwxNzcyMjczMzg0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  math: "https://images.unsplash.com/photo-1727522974735-44251dfe61b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwbWF0aGVtYXRpY3MlMjBnZW9tZXRyeSUyMG1hbnVzY3JpcHR8ZW58MXx8fHwxNzcyMjczMzg0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  medicine: "https://images.unsplash.com/photo-1691670352361-a330ac6990ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZXJiYWwlMjBtZWRpY2luZSUyMGFuY2llbnQlMjBib3RhbmljYWwlMjBoZWFsaW5nJTIwcGxhbnRzfGVufDF8fHx8MTc3MjI3MzM4OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  renaissance: "https://images.unsplash.com/photo-1763792334909-d5397700f838?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaXN0aW5lJTIwY2hhcGVsJTIwcmVuYWlzc2FuY2UlMjBmcmVzY28lMjBjZWlsaW5nJTIwYXJ0fGVufDF8fHx8MTc3MjI3MzM4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  davinci: "https://images.unsplash.com/photo-1569335529517-278a45cfcb53?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZW9uYXJkbyUyMGRhJTIwdmluY2klMjB2aXRydXZpYW4lMjBkcmF3aW5nJTIwaW52ZW50aW9ufGVufDF8fHx8MTc3MjI3MzM4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  printing: "https://images.unsplash.com/photo-1763951156236-eb5b3909c05f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbnRpcXVlJTIwcHJpbnRpbmclMjBwcmVzcyUyMGxldHRlcnByZXNzJTIwd29ya3Nob3B8ZW58MXx8fHwxNzcyMjczMzkwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  sailing: "https://images.unsplash.com/photo-1761396227947-0ea0bc403317?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWxsJTIwc2FpbGluZyUyMHNoaXAlMjBvY2VhbiUyMHZveWFnZSUyMGV4cGxvcmF0aW9ufGVufDF8fHx8MTc3MjI3MzM5MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  galileo: "https://images.unsplash.com/photo-1764605357421-6bd96a1f9991?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwYnJhc3MlMjB0ZWxlc2NvcGUlMjBhc3Ryb25vbXklMjBvYnNlcnZhdG9yeXxlbnwxfHx8fDE3NzIyNzMzOTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  newton: "https://images.unsplash.com/photo-1706102046314-233155491389?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxJc2FhYyUyME5ld3RvbiUyMGFwcGxlJTIwdHJlZSUyMHBoeXNpY3MlMjBzY2llbmNlfGVufDF8fHx8MTc3MjEzNzY1M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  industrial: "https://images.unsplash.com/photo-1767739791250-f972ca75c60e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwcmV2b2x1dGlvbiUyMGZhY3RvcnklMjBtYWNoaW5lcnklMjB2aW50YWdlfGVufDF8fHx8MTc3MjI3MzM5Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  steam: "https://images.unsplash.com/photo-1772020590834-596b72bd3eda?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwc3RlYW0lMjBsb2NvbW90aXZlJTIwdHJhaW4lMjBjbGFzc2ljfGVufDF8fHx8MTc3MjI3MzM5NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  electricity: "https://images.unsplash.com/photo-1762171687697-331a3cc54591?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpYyUyMGxpZ2h0bmluZyUyMGJvbHQlMjBlbmVyZ3klMjBkcmFtYXRpY3xlbnwxfHx8fDE3NzIyNzMzOTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  photography: "https://images.unsplash.com/photo-1590750458838-7a39cf204097?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwZmlsbSUyMGNhbWVyYSUyMGFudGlxdWUlMjBiZWxsb3dzJTIwcGhvdG9ncmFwaHl8ZW58MXx8fHwxNzcyMjczNDI3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  telegraph: "https://images.unsplash.com/photo-1771951494238-8b29fe625383?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWxlZ3JhcGglMjBtb3JzZSUyMGNvZGUlMjBtYWNoaW5lJTIwdmludGFnZSUyMGNvbW11bmljYXRpb258ZW58MXx8fHwxNzcyMjczMzk2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  space: "https://images.unsplash.com/photo-1617056952435-3d971c7c4fc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2NrZXQlMjBsYXVuY2glMjBOQVNBJTIwc3BhY2UlMjBzaHV0dGxlJTIwbGlmdG9mZnxlbnwxfHx8fDE3NzIyNzMzOTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  medModern: "https://images.unsplash.com/photo-1676288507025-e0f001be9926?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzdXJnZXJ5JTIwb3BlcmF0aW5nJTIwcm9vbSUyMGhvc3BpdGFsfGVufDF8fHx8MTc3MjI3MzM5N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  digital: "https://images.unsplash.com/photo-1750365919971-7dd273e7b317?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwdGVjaG5vbG9neSUyMGFydGlmaWNpYWwlMjBpbnRlbGxpZ2VuY2UlMjBjaXJjdWl0JTIwZnV0dXJpc3RpY3xlbnwxfHx8fDE3NzIyNzM0MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  un: "https://images.unsplash.com/photo-1761301643520-49c1ee626e72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml0ZWQlMjBuYXRpb25zJTIwYnVpbGRpbmclMjBkaXBsb21hdGljJTIwZ2xvYmFsfGVufDF8fHx8MTc3MjI3MzM5N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  civilRights: "https://images.unsplash.com/photo-1576568699714-a3f4950805d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXZpbCUyMHJpZ2h0cyUyMHByb3Rlc3QlMjBtYXJjaCUyMGVxdWFsaXR5JTIwaGlzdG9yaWN8ZW58MXx8fHwxNzcyMjczMzk4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  suffrage: "https://images.unsplash.com/photo-1658377937866-cd267aecae4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21lbiUyMGVtcG93ZXJtZW50JTIwZXF1YWxpdHklMjBtYXJjaCUyMGhpc3RvcmljfGVufDF8fHx8MTc3MjI3MzM5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  computer: "https://images.unsplash.com/photo-1676171286844-96c4c1a379c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwbWFpbmZyYW1lJTIwY29tcHV0ZXIlMjBlYXJseSUyMHRlY2hub2xvZ3klMjByZXRyb3xlbnwxfHx8fDE3NzIyNzMzOTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  smartphone: "https://images.unsplash.com/photo-1758348844327-b70d25c7589c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwbW9kZXJuJTIwdGVjaG5vbG9neSUyMGNsZWFuJTIwd2hpdGV8ZW58MXx8fHwxNzcyMjczNDAyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  renewable: "https://images.unsplash.com/photo-1769501378399-bbea7f5cfc94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2xhciUyMHBhbmVscyUyMHJlbmV3YWJsZSUyMGVuZXJneSUyMHdpbmQlMjB0dXJiaW5lJTIwY2xlYW58ZW58MXx8fHwxNzcyMjczNDAzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  iss: "https://images.unsplash.com/photo-1633984726552-3ed7296dc5c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnRlcm5hdGlvbmFsJTIwc3BhY2UlMjBzdGF0aW9uJTIwb3JiaXQlMjBlYXJ0aCUyMGFzdHJvbmF1dHxlbnwxfHx8fDE3NzIyNzM0MDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  buddhist: "https://images.unsplash.com/photo-1759155559767-233ade090bd8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkZW4lMjBidWRkaGElMjB0ZW1wbGUlMjBwZWFjZWZ1bCUyMHNlcmVuZXxlbnwxfHx8fDE3NzIyNzM0MDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  hindu: "https://images.unsplash.com/photo-1764395630695-6091dfef8882?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW5kdSUyMHRlbXBsZSUyMGNhcnZlZCUyMG9ybmF0ZSUyMHNwaXJpdHVhbCUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NzIyNzM0MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  taoist: "https://images.unsplash.com/photo-1684871431072-64c05a62cc97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaXN0eSUyMG1vdW50YWluJTIwdGFvaXN0JTIwdGVtcGxlJTIwY2hpbmVzZSUyMGxhbmRzY2FwZXxlbnwxfHx8fDE3NzIyNzM0MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  sufi: "https://images.unsplash.com/photo-1763044939313-0cb814a4e69e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdWZpJTIwd2hpcmxpbmclMjBkZXJ2aXNoJTIwZGFuY2UlMjBzcGlyaXR1YWwlMjBjZXJlbW9ueXxlbnwxfHx8fDE3NzIyNzM0MDV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  sacredText: "https://images.unsplash.com/photo-1660214248749-8932ef58a8a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbGx1bWluYXRlZCUyMHNhY3JlZCUyMG1hbnVzY3JpcHQlMjBhbmNpZW50JTIwdGV4dCUyMHBhZ2VzfGVufDF8fHx8MTc3MjI3MzQwNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  psychology: "https://images.unsplash.com/photo-1549925245-f20a1bac6454?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXVyb3NjaWVuY2UlMjBicmFpbiUyMHNjYW4lMjByZXNlYXJjaCUyMGxhYm9yYXRvcnl8ZW58MXx8fHwxNzcyMjczNDA2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  consciousness: "https://images.unsplash.com/photo-1755456068187-c2f56ad73d09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zY2lvdXNuZXNzJTIwYXdhcmVuZXNzJTIwbWVkaXRhdGlvbiUyMGNvc21pYyUyMGVuZXJneXxlbnwxfHx8fDE3NzIyNzM0Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  yoga: "https://images.unsplash.com/photo-1665849865190-edbe9486e1ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwc3VucmlzZSUyMG1vdW50YWluJTIwc2lsaG91ZXR0ZSUyMHBlYWNlZnVsfGVufDF8fHx8MTc3MjI3MzQwOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  meditation: "https://images.unsplash.com/photo-1770637113757-b4e1e99d61f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx6ZW4lMjBtZWRpdGF0aW9uJTIwcGVhY2VmdWwlMjB0ZW1wbGUlMjBjYWxtfGVufDF8fHx8MTc3MjI3MzQwOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  transformation: "https://images.unsplash.com/photo-1586250552011-3e585ef3a456?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb25hbCUyMGdyb3d0aCUyMHN1bnJpc2UlMjBqb3VybmV5JTIwdHJhbnNmb3JtYXRpb24lMjBuYXR1cmV8ZW58MXx8fHwxNzcyMjczNDEwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  www: "https://images.unsplash.com/photo-1607723619497-98a79f01ba90?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaWJlciUyMG9wdGljJTIwaW50ZXJuZXQlMjBjb25uZWN0aW9uJTIwbmV0d29yayUyMGJsdWV8ZW58MXx8fHwxNzcyMjczNDEwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  server: "https://images.unsplash.com/photo-1744868562210-fffb7fa882d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZXJ2ZXIlMjByb29tJTIwZGF0YSUyMGNlbnRlciUyMHRlY2hub2xvZ3klMjBibHVlJTIwbGlnaHRzfGVufDF8fHx8MTc3MjI3MzQxMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  social: "https://images.unsplash.com/photo-1766332555400-da2c49c46324?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NpYWwlMjBtZWRpYSUyMGNvbm5lY3RlZCUyMHBlb3BsZSUyMGRpZ2l0YWwlMjBuZXR3b3JrfGVufDF8fHx8MTc3MjI3MzQxMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  openSource: "https://images.unsplash.com/photo-1649451844931-57e22fc82de3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcGVuJTIwc291cmNlJTIwY29kZSUyMHByb2dyYW1taW5nJTIwY29sbGFib3JhdGl2ZSUyMHNjcmVlbnxlbnwxfHx8fDE3NzIyNzM0MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  cloud: "https://images.unsplash.com/photo-1664526937033-fe2c11f1be25?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbG91ZCUyMGNvbXB1dGluZyUyMGFic3RyYWN0JTIwYmx1ZSUyMG5ldHdvcmslMjBpbmZyYXN0cnVjdHVyZXxlbnwxfHx8fDE3NzIyNzM0MTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  remote: "https://images.unsplash.com/photo-1769002240965-7cc4b129d81a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZW1vdGUlMjB3b3JrJTIwbGFwdG9wJTIwaG9tZSUyMG9mZmljZSUyMG1vZGVybiUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NzIyNzM0MTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  blockchain: "https://images.unsplash.com/photo-1524666522-3afebecf783a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibG9ja2NoYWluJTIwY3J5cHRvY3VycmVuY3klMjBkaWdpdGFsJTIwYWJzdHJhY3QlMjBnbG93aW5nfGVufDF8fHx8MTc3MjI3MzQxN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  ai: "https://images.unsplash.com/photo-1673255745677-e36f618550d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwcm9ib3QlMjBmdXR1cmlzdGljJTIwaHVtYW5vaWQlMjBjbGVhbnxlbnwxfHx8fDE3NzIyNzM0MTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  translation: "https://images.unsplash.com/photo-1673515335152-f2589ba8bb7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYW5ndWFnZSUyMHRyYW5zbGF0aW9uJTIwZ2xvYmUlMjBtdWx0aWxpbmd1YWwlMjBjb21tdW5pY2F0aW9ufGVufDF8fHx8MTc3MjI3MzQxOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  knowledge: "https://images.unsplash.com/photo-1770307939909-f27b8e4ae9c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwbGlicmFyeSUyMGtub3dsZWRnZSUyMGFjY2VzcyUyMG1vZGVybiUyMGJyaWdodHxlbnwxfHx8fDE3NzIyNzM0MTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  creator: "https://images.unsplash.com/photo-1673767297172-220430e2d382?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW50JTIwY3JlYXRvciUyMHN0dWRpbyUyMG1pY3JvcGhvbmUlMjBwb2RjYXN0fGVufDF8fHx8MTc3MjI3MzQxOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  mars: "https://images.unsplash.com/photo-1660251146550-40e7c9d841b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNYXJzJTIwcmVkJTIwcGxhbmV0JTIwc3VyZmFjZSUyMGxhbmRzY2FwZSUyMHNwYWNlfGVufDF8fHx8MTc3MjI3MzQxOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  dna: "https://images.unsplash.com/photo-1705256811175-b1e3398d50e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxETkElMjBnZW5ldGljcyUyMGRvdWJsZSUyMGhlbGl4JTIwc2NpZW5jZSUyMGxhYm9yYXRvcnl8ZW58MXx8fHwxNzcyMjczNDIwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  brainInterface: "https://images.unsplash.com/photo-1686317465844-4b2e2218cb37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFpbiUyMG5ldXJhbCUyMGludGVyZmFjZSUyMHRlY2hub2xvZ3klMjBmdXR1cmlzdGljJTIwZ2xvd2luZ3xlbnwxfHx8fDE3NzIyNzM0MjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  quantum: "https://images.unsplash.com/photo-1701721575807-e0ce0c287754?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxxdWFudHVtJTIwY29tcHV0aW5nJTIwcHJvY2Vzc29yJTIwY2hpcCUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzcyMjczNDIxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  climate: "https://images.unsplash.com/photo-1637552481611-1f36222fb188?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWZvcmVzdGF0aW9uJTIwZ3JlZW4lMjBuYXR1cmUlMjByZXN0b3JhdGlvbiUyMHBsYW50aW5nfGVufDF8fHx8MTc3MjI3MzQyMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  fusion: "https://images.unsplash.com/photo-1640931020126-7f63ad7f1d37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXNpb24lMjBlbmVyZ3klMjByZWFjdG9yJTIwcGxhc21hJTIwdG9rYW1ha3xlbnwxfHx8fDE3NzIyNzM0MjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  ocean: "https://images.unsplash.com/photo-1758968417917-720636688370?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWVwJTIwb2NlYW4lMjB1bmRlcndhdGVyJTIwZXhwbG9yYXRpb24lMjBibHVlfGVufDF8fHx8MTc3MjI3MzQyNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  evolution: "https://images.unsplash.com/photo-1479150631305-affc21872aed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxodW1hbiUyMGV2b2x1dGlvbiUyMGNvbnNjaW91c25lc3MlMjBzcGlyaXR1YWwlMjBhd2FrZW5pbmclMjBsaWdodHxlbnwxfHx8fDE3NzIyNzM0MjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  ethical: "https://images.unsplash.com/photo-1717390758666-97dc77ef7a8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldGhpY2FsJTIwdGVjaG5vbG9neSUyMGh1bWFuJTIwaGFuZCUyMGRpZ2l0YWwlMjBjb25uZWN0aW9ufGVufDF8fHx8MTc3MjI3MzQyNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  agriculture: "https://images.unsplash.com/photo-1633949547235-8cae7f5f19b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwYWdyaWN1bHR1cmUlMjBmYXJtaW5nJTIwaGFydmVzdCUyMGdvbGRlbiUyMHdoZWF0fGVufDF8fHx8MTc3MjUwOTMwMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  wheel: "https://images.unsplash.com/photo-1642584576333-bdd752db25fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwd29vZGVuJTIwd2hlZWwlMjBjYXJ0JTIwYXJ0aWZhY3R8ZW58MXx8fHwxNzcyNTA5MzAzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  greatWall: "https://images.unsplash.com/photo-1495361174397-84e5b61bb77f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVhdCUyMHdhbGwlMjBjaGluYSUyMG1vdW50YWlucyUyMGxhbmRzY2FwZXxlbnwxfHx8fDE3NzI1MDkzMDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  writingSystems: "https://images.unsplash.com/photo-1764312349609-41297ede0e57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwd3JpdGluZyUyMGN1bmVpZm9ybSUyMGhpZXJvZ2x5cGhzJTIwc3RvbmUlMjB0YWJsZXR8ZW58MXx8fHwxNzcyNTA5MzAyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  silkRoad: "https://images.unsplash.com/photo-1760331696996-e0b7a83ecc98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaWxrJTIwcm9hZCUyMGNhcmF2YW4lMjBkZXNlcnQlMjBhbmNpZW50JTIwdHJhZGV8ZW58MXx8fHwxNzcyNTA5MzA0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  romanRoad: "https://images.unsplash.com/photo-1762420903072-bcc4a25da69f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwcm9tYW4lMjByb2FkJTIwY29iYmxlc3RvbmUlMjBlbXBpcmV8ZW58MXx8fHwxNzcyNTA5MzAzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  copernicus: "https://images.unsplash.com/photo-1729335312255-c3c54b769afc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Blcm5pY3VzJTIwYXN0cm9ub215JTIwc29sYXIlMjBzeXN0ZW0lMjBjZWxlc3RpYWwlMjBtb2RlbHxlbnwxfHx8fDE3NzI1MDkzMDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  enlightenment: "https://images.unsplash.com/photo-1612350625363-8bd0cc7e16a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbmxpZ2h0ZW5tZW50JTIwbGlicmFyeSUyMHBoaWxvc29waHklMjBib29rcyUyMGNhbmRsZXN8ZW58MXx8fHwxNzcyNTA5MzA4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  darwin: "https://images.unsplash.com/photo-1676910914003-55a29db437cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYWxhcGFnb3MlMjB3aWxkbGlmZSUyMG5hdHVyZSUyMGV2b2x1dGlvbiUyMGJpcmRzfGVufDF8fHx8MTc3MjUwOTMxNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  worldMap: "https://images.unsplash.com/photo-1760630857189-edf81b2c2a80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbnRpcXVlJTIwd29ybGQlMjBtYXAlMjBjYXJ0b2dyYXBoeSUyMGV4cGxvcmF0aW9ufGVufDF8fHx8MTc3MjUwOTMwOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  antibiotics: "https://images.unsplash.com/photo-1769454777452-75071eefbda8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZW5pY2lsbGluJTIwYW50aWJpb3RpYyUyMGxhYm9yYXRvcnklMjBwZXRyaSUyMGRpc2h8ZW58MXx8fHwxNzcyNTA5MzEwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  microscope: "https://images.unsplash.com/photo-1765207363238-105669534be9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWNyb3Njb3BlJTIwc2NpZW5jZSUyMGRpc2NvdmVyeSUyMHZpbnRhZ2UlMjBsZW5zfGVufDF8fHx8MTc3MjUwOTMxMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  flight: "https://images.unsplash.com/photo-1614120625014-0929f1eca50d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3cmlnaHQlMjBicm90aGVycyUyMGJpcGxhbmUlMjB2aW50YWdlJTIwYXZpYXRpb24lMjBmbGlnaHR8ZW58MXx8fHwxNzcyNTA5MzEzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  nuclear: "https://images.unsplash.com/photo-1772374310788-d7ef27259350?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxudWNsZWFyJTIwcG93ZXIlMjBwbGFudCUyMGNvb2xpbmclMjB0b3dlcnMlMjBlbmVyZ3l8ZW58MXx8fHwxNzcyNTA5MzE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  television: "https://images.unsplash.com/photo-1759577168954-4fb50db9a655?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwdGVsZXZpc2lvbiUyMHJldHJvJTIwYnJvYWRjYXN0aW5nJTIwbWVkaWF8ZW58MXx8fHwxNzcyNTA5MzE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  transistor: "https://images.unsplash.com/photo-1642354163974-41089602651f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZW1pY29uZHVjdG9yJTIwc2lsaWNvbiUyMGNoaXAlMjB0cmFuc2lzdG9yJTIwY2lyY3VpdHxlbnwxfHx8fDE3NzI1MDkzMTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  greenRev: "https://images.unsplash.com/photo-1650192559558-d691bf19568e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMHJldm9sdXRpb24lMjBhZ3JpY3VsdHVyZSUyMG1vZGVybiUyMHRlcnJhY2VkJTIwcmljZXxlbnwxfHx8fDE3NzI1MDkzMTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  confucius: "https://images.unsplash.com/photo-1770739684194-9857c7b51918?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25mdWNpdXMlMjBjaGluZXNlJTIwdGVtcGxlJTIwcGhpbG9zb3BoeSUyMHdpc2RvbXxlbnwxfHx8fDE3NzI1MDkzMTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  interfaith: "https://images.unsplash.com/photo-1719988487073-06d0aa1d312e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnRlcmZhaXRoJTIwZGlhbG9ndWUlMjByZWxpZ2lvdXMlMjBkaXZlcnNpdHklMjBnYXRoZXJpbmd8ZW58MXx8fHwxNzcyNTA5MzIwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  indigenous: "https://images.unsplash.com/photo-1551118493-e59eb9f2f2fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpZ2Vub3VzJTIwc3Bpcml0dWFsJTIwY2VyZW1vbnklMjB0cmliYWwlMjBuYXR1cmV8ZW58MXx8fHwxNzcyNTA5MzIwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  mindfulWest: "https://images.unsplash.com/photo-1655970580622-4a547789c850?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5kZnVsbmVzcyUyMHJldHJlYXQlMjB3ZXN0ZXJuJTIwbWVkaXRhdGlvbiUyMG1vZGVybnxlbnwxfHx8fDE3NzI1MDkzMjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  stoic: "https://images.unsplash.com/photo-1722325872617-478d6f864b3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdG9pYyUyMHBoaWxvc29waHklMjBtYXJibGUlMjBjb2x1bW5zJTIwYW5jaWVudCUyMHdpc2RvbXxlbnwxfHx8fDE3NzI1MDkzMjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  personalPC: "https://images.unsplash.com/photo-1767084984483-95eb8152bae6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlYXJseSUyMHBlcnNvbmFsJTIwY29tcHV0ZXIlMjBhcHBsZSUyMHZpbnRhZ2UlMjBkZXNrdG9wfGVufDF8fHx8MTc3MjUwOTMyNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  mobileEvo: "https://images.unsplash.com/photo-1753385158278-387d4dda60c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBwaG9uZSUyMGV2b2x1dGlvbiUyMHRlY2hub2xvZ3klMjBkZXZpY2VzfGVufDF8fHx8MTc3MjUwOTMyNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  streaming: "https://images.unsplash.com/photo-1760404700115-461c3872e160?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlYW1pbmclMjBlbnRlcnRhaW5tZW50JTIwbWVkaWElMjBtb2Rlcm4lMjBzY3JlZW58ZW58MXx8fHwxNzcyNTA5MzI2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  cybersec: "https://images.unsplash.com/photo-1768839722988-91767bb82b10?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnNlY3VyaXR5JTIwZGlnaXRhbCUyMGxvY2slMjBlbmNyeXB0aW9uJTIwcHJpdmFjeXxlbnwxfHx8fDE3NzI1MDkzMjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  ecommerce: "https://images.unsplash.com/photo-1768987439370-bd60d3d0b28b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjBvbmxpbmUlMjBzaG9wcGluZyUyMGRpZ2l0YWwlMjBtYXJrZXRwbGFjZXxlbnwxfHx8fDE3NzI1MDkzMjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  augmentation: "https://images.unsplash.com/photo-1564157212225-38fcc211e977?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxodW1hbm9pZCUyMHJvYm90JTIwYXVnbWVudGF0aW9uJTIwcHJvc3RoZXRpY3MlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc3MjUwOTMzMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  asteroid: "https://images.unsplash.com/photo-1710268470228-6d77e6d999b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc3Rlcm9pZCUyMHNwYWNlJTIwZXhwbG9yYXRpb24lMjBkZWVwJTIwc3BhY2VjcmFmdHxlbnwxfHx8fDE3NzI1MDkzMzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  autonomous: "https://images.unsplash.com/photo-1581399909946-212344b3cf59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXRvbm9tb3VzJTIwdmVoaWNsZSUyMHNlbGYlMjBkcml2aW5nJTIwZnV0dXJpc3RpYyUyMGNhcnxlbnwxfHx8fDE3NzI1MDkzMzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  energyStore: "https://images.unsplash.com/photo-1766507679641-51002768af6b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpYyUyMGJhdHRlcnklMjBlbmVyZ3klMjBzdG9yYWdlJTIwc3VzdGFpbmFibGV8ZW58MXx8fHwxNzcyNTA5MzMzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  genomeEdit: "https://images.unsplash.com/photo-1581056771085-3ce30d907416?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnZW5lJTIwZWRpdGluZyUyMGNyaXNwciUyMGJpb3RlY2glMjBsYWJvcmF0b3J5fGVufDF8fHx8MTc3MjUwOTMzM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  phoenician: "https://images.unsplash.com/photo-1765750068258-078645609ab6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwcGhvZW5pY2lhbiUyMGFscGhhYmV0JTIwY2FydmVkJTIwc3RvbmUlMjBpbnNjcmlwdGlvbnxlbnwxfHx8fDE3NzI1MTY1NzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  libraryAlex: "https://images.unsplash.com/photo-1707834331311-df8a2713ba3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWJyYXJ5JTIwb2YlMjBhbGV4YW5kcmlhJTIwYW5jaWVudCUyMGNvbHVtbnMlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NzI1MTY1NzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  angkorWat: "https://images.unsplash.com/photo-1551155674-6d39c2140d6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBbmdrb3IlMjBXYXQlMjB0ZW1wbGUlMjBzdW5yaXNlJTIwQ2FtYm9kaWElMjByZWZsZWN0aW9ufGVufDF8fHx8MTc3MjUxNjU3M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  incaRoad: "https://images.unsplash.com/photo-1763075461436-cabcfc298397?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxJbmNhJTIwdHJhaWwlMjBhbmNpZW50JTIwc3RvbmUlMjByb2FkJTIwQW5kZXMlMjBtb3VudGFpbnMlMjBQZXJ1fGVufDF8fHx8MTc3MjUxNjU3NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  ironAge: "https://images.unsplash.com/photo-1766940973188-598a6bd59ad6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwaXJvbiUyMHNtZWx0aW5nJTIwZm9yZ2UlMjBibGFja3NtaXRoJTIwZmlyZXxlbnwxfHx8fDE3NzI1MTY1NzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  ashoka: "https://images.unsplash.com/photo-1768921438968-76367164e83b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBc2hva2ElMjBwaWxsYXIlMjBhbmNpZW50JTIwSW5kaWElMjBCdWRkaGlzdCUyMHN0b25lJTIwZWRpY3RzfGVufDF8fHx8MTc3MjUxNjU3NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  vaccine: "https://images.unsplash.com/photo-1465077751796-1e7f7fae5031?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFsbHBveCUyMHZhY2NpbmF0aW9uJTIwbWVkaWNhbCUyMHZpYWwlMjBhbnRpcXVlfGVufDF8fHx8MTc3MjUxNjU3OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  abolition: "https://images.unsplash.com/photo-1577770540080-34d3e50fb65b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYm9saXRpb24lMjBzbGF2ZXJ5JTIwZnJlZWRvbSUyMGNoYWlucyUyMGJyb2tlbiUyMGhpc3RvcmljYWx8ZW58MXx8fHwxNzcyNTE2NTgwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  periodicTable: "https://images.unsplash.com/photo-1628864005140-7770b9b8e7dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJpb2RpYyUyMHRhYmxlJTIwY2hlbWlzdHJ5JTIwZWxlbWVudHMlMjBsYWJvcmF0b3J5fGVufDF8fHx8MTc3MjUxNjU4MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  symphony: "https://images.unsplash.com/photo-1745618409909-2c1af496c812?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGFzc2ljYWwlMjBtdXNpYyUyMG9yY2hlc3RyYSUyMGdyYW5kJTIwY29uY2VydCUyMGhhbGwlMjBzeW1waG9ueXxlbnwxfHx8fDE3NzI1MTY1ODF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  lavoisier: "https://images.unsplash.com/photo-1758876569703-ea9b21463691?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVtaXN0cnklMjBsYWJvcmF0b3J5JTIwdmludGFnZSUyMHNjaWVudGlmaWMlMjBnbGFzc3dhcmUlMjBiZWFrZXJzfGVufDF8fHx8MTc3MjUxNjU4MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  sextant: "https://images.unsplash.com/photo-1735801628880-49c1f9bdad78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbnRpcXVlJTIwYnJhc3MlMjBzZXh0YW50JTIwbmF2aWdhdGlvbiUyMG5hdXRpY2FsJTIwaW5zdHJ1bWVudHxlbnwxfHx8fDE3NzI1MTY1ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  dnaDiscovery: "https://images.unsplash.com/photo-1743338960176-02107775b73d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxETkElMjBkb3VibGUlMjBoZWxpeCUyMG1vbGVjdWxhciUyMGJpb2xvZ3klMjBkaXNjb3Zlcnl8ZW58MXx8fHwxNzcyNTE2NTg2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  berlinWall: "https://images.unsplash.com/photo-1574541426399-c0a9911ad121?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCZXJsaW4lMjBXYWxsJTIwZmFsbCUyMGNlbGVicmF0aW9uJTIwZnJlZWRvbSUyMGhpc3RvcmljYWwlMjAxOTg5fGVufDF8fHx8MTc3MjUxNjU4Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  smallpoxErad: "https://images.unsplash.com/photo-1706638794486-678a4b9bde71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFsbHBveCUyMGVyYWRpY2F0aW9uJTIwV0hPJTIwdmFjY2luYXRpb24lMjBnbG9iYWwlMjBoZWFsdGh8ZW58MXx8fHwxNzcyNTE2NTg3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  gps: "https://images.unsplash.com/photo-1770370419338-f9a813302baa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxHUFMlMjBzYXRlbGxpdGUlMjBuYXZpZ2F0aW9uJTIwb3JiaXRpbmclMjBFYXJ0aCUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzcyNTE2NTg3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  genomeProject: "https://images.unsplash.com/photo-1656337426914-5e5ba162d606?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxodW1hbiUyMGdlbm9tZSUyMEROQSUyMHNlcXVlbmNpbmclMjBsYWJvcmF0b3J5fGVufDF8fHx8MTc3MjUxNjU4OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  einstein: "https://images.unsplash.com/photo-1635372722656-389f87a941b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxFaW5zdGVpbiUyMHJlbGF0aXZpdHklMjBwaHlzaWNzJTIwYmxhY2tib2FyZCUyMGVxdWF0aW9uc3xlbnwxfHx8fDE3NzI1MTY2MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  kabbalah: "https://images.unsplash.com/photo-1699241138920-bf7f111599a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxLYWJiYWxhaCUyMEpld2lzaCUyMG15c3RpY2lzbSUyMHRyZWUlMjBvZiUyMGxpZmUlMjBhbmNpZW50fGVufDF8fHx8MTc3MjUxNjU5Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  zenGarden: "https://images.unsplash.com/photo-1762876244984-f9d493cf4aa1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx6ZW4lMjBnYXJkZW4lMjBKYXBhbmVzZSUyMHJvY2slMjBzdG9uZSUyMHRyYW5xdWlsfGVufDF8fHx8MTc3MjUxNjU5Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  contemplative: "https://images.unsplash.com/photo-1760256994268-ed4095fe5df5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25hc3RlcnklMjBjb250ZW1wbGF0aXZlJTIwcHJheWVyJTIwY2FuZGxlJTIwcXVpZXQlMjBhbmNpZW50fGVufDF8fHx8MTc3MjUxNjU5Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  ubuntu: "https://images.unsplash.com/photo-1630068846062-3ffe78aa5049?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwY29tbXVuaXR5JTIwZ2F0aGVyaW5nJTIwVWJ1bnR1JTIwc3Bpcml0JTIwdG9nZXRoZXJuZXNzfGVufDF8fHx8MTc3MjUxNjU5M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  gita: "https://images.unsplash.com/photo-1657302155425-611b7aba5b33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCaGFnYXZhZCUyMEdpdGElMjBIaW5kdSUyMHNjcmlwdHVyZSUyMGFuY2llbnQlMjBTYW5za3JpdCUyMHRleHR8ZW58MXx8fHwxNzcyNTE2NTkzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  telehealth: "https://images.unsplash.com/photo-1758691461916-dc7894eb8f94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWxlbWVkaWNpbmUlMjBkaWdpdGFsJTIwaGVhbHRoJTIwZG9jdG9yJTIwdmlkZW8lMjBjb25zdWx0YXRpb258ZW58MXx8fHwxNzcyNTE2NTk0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  printing3d: "https://images.unsplash.com/photo-1761454165168-cfdf007c6a31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzRCUyMHByaW50aW5nJTIwbWFudWZhY3R1cmluZyUyMGFkZGl0aXZlJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NzI1MTY1OTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  verticalFarm: "https://images.unsplash.com/photo-1688703990975-c541542800ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZXJ0aWNhbCUyMGZhcm1pbmclMjBpbmRvb3IlMjBhZ3JpY3VsdHVyZSUyMExFRCUyMGh5ZHJvcG9uaWN8ZW58MXx8fHwxNzcyNTE2NTk4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  spaceTourism: "https://images.unsplash.com/photo-1762290899574-7a628ca71587?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGFjZSUyMHRvdXJpc20lMjByb2NrZXQlMjBjb21tZXJjaWFsJTIwbGF1bmNofGVufDF8fHx8MTc3MjUxNjU5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  nanotech: "https://images.unsplash.com/photo-1588061746323-2a182e4d3dad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYW5vdGVjaG5vbG9neSUyMG1vbGVjdWxhciUyMG1pY3Jvc2NvcGljJTIwc2NpZW5jZXxlbnwxfHx8fDE3NzI1MTY1OTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  iot: "https://images.unsplash.com/photo-1746893737268-81fe686e6a51?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxJb1QlMjBzbWFydCUyMGNvbm5lY3RlZCUyMGRldmljZXMlMjBzZW5zb3JzJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NzI1MTY2MDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  digitalTwin: "https://images.unsplash.com/photo-1756701781600-12a63ab571fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXR1cmlzdGljJTIwY2l0eSUyMGRpZ2l0YWwlMjB0d2luJTIwc2ltdWxhdGlvbiUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzcyNTE2NjA0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  crowdfund: "https://images.unsplash.com/photo-1586764921336-8b37580c7aea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm93ZGZ1bmRpbmclMjBzdGFydHVwJTIwZW50cmVwcmVuZXVyc2hpcCUyMGNvbW11bml0eXxlbnwxfHx8fDE3NzI1MTY2MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  bronzeAge: "https://images.unsplash.com/photo-1739103495133-c91444cd24c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwYnJvbnplJTIwY2FzdGluZyUyMG1ldGFsbHVyZ3klMjBhcnRpZmFjdHxlbnwxfHx8fDE3NzI1MjE1MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  persianRoad: "https://images.unsplash.com/photo-1760443632950-04154aea11ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwUGVyc2lhbiUyMGVtcGlyZSUyMHJ1aW5zJTIwY29sdW1uc3xlbnwxfHx8fDE3NzI1MjE1Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  polynesian: "https://images.unsplash.com/photo-1580984398875-10d81379ed6b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxQb2x5bmVzaWFuJTIwY2Fub2UlMjBvY2VhbiUyMFBhY2lmaWMlMjBuYXZpZ2F0aW9ufGVufDF8fHx8MTc3MjUyMTUyN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  terracotta: "https://images.unsplash.com/photo-1620018765412-ceccb1af8fa0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZXJyYWNvdHRhJTIwd2FycmlvcnMlMjB4aWFuJTIwY2hpbmElMjBhbmNpZW50JTIwYXJteXxlbnwxfHx8fDE3NzI1MjE1Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  justinian: "https://images.unsplash.com/photo-1766499432010-e2fabda3b2dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCeXphbnRpbmUlMjBtb3NhaWMlMjBIYWdpYSUyMFNvcGhpYSUyMGFuY2llbnQlMjBsYXd8ZW58MXx8fHwxNzcyNTIxNTI5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  sciMethod: "https://images.unsplash.com/photo-1758573467057-99f26217b2ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2llbnRpZmljJTIwbWV0aG9kJTIwbGFib3JhdG9yeSUyMHZpbnRhZ2UlMjBleHBlcmltZW50fGVufDF8fHx8MTc3MjUyMTUyOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  harvey: "https://images.unsplash.com/photo-1729339983239-0129e46801de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmF0b21pY2FsJTIwaGVhcnQlMjB2aW50YWdlJTIwbWVkaWNhbCUyMGlsbHVzdHJhdGlvbnxlbnwxfHx8fDE3NzI1MjE1Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  linnaeus: "https://images.unsplash.com/photo-1720714411061-ea361e343bfc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib3RhbmljYWwlMjBjbGFzc2lmaWNhdGlvbiUyMGhlcmJhcml1bSUyMHByZXNzZWQlMjBwbGFudHN8ZW58MXx8fHwxNzcyNTIxNTMwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  humboldt: "https://images.unsplash.com/photo-1764836704310-3262f2cb4533?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMHJhaW5mb3Jlc3QlMjBleHBlZGl0aW9uJTIwcml2ZXIlMjBleHBsb3JhdGlvbnxlbnwxfHx8fDE3NzI1MjE1MzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  antiseptic: "https://images.unsplash.com/photo-1575839127405-ab6f4e312671?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwbWVkaWNhbCUyMGluc3RydW1lbnRzJTIwc3VyZ2ljYWwlMjB0b29scyUyMGFudGlxdWV8ZW58MXx8fHwxNzcyNTIxNTY0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  assemblyLine: "https://images.unsplash.com/photo-1583737097249-ea809c79c3f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwY2FyJTIwZmFjdG9yeSUyMHByb2R1Y3Rpb24lMjBsaW5lJTIwaW5kdXN0cmlhbHxlbnwxfHx8fDE3NzI1MjE1NDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  curie: "https://images.unsplash.com/photo-1726601057260-e8095dad345a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNYXJpZSUyMEN1cmllJTIwcmFkaW9hY3Rpdml0eSUyMGxhYm9yYXRvcnklMjBnbG93aW5nfGVufDF8fHx8MTc3MjUyMTUzNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  polioVaccine: "https://images.unsplash.com/photo-1578307896780-d257213543a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb2xpbyUyMHZhY2NpbmUlMjB2aW50YWdlJTIwbWVkaWNhbCUyMHN5cmluZ2UlMjBjaGlsZHxlbnwxfHx8fDE3NzI1MjE1Mzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  hubble: "https://images.unsplash.com/photo-1709142221177-c658e649586e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxIdWJibGUlMjBzcGFjZSUyMHRlbGVzY29wZSUyMG5lYnVsYSUyMGRlZXAlMjBzcGFjZXxlbnwxfHx8fDE3NzI1MjE1Mzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  panamaCanal: "https://images.unsplash.com/photo-1645932700624-5075c8d2df58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxQYW5hbWElMjBDYW5hbCUyMHNoaXBzJTIwbG9ja3MlMjB3YXRlcndheXxlbnwxfHx8fDE3NzI1MjE1Mzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  sikhism: "https://images.unsplash.com/photo-1757552529012-76b68fc93335?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxHb2xkZW4lMjBUZW1wbGUlMjBBbXJpdHNhciUyMFNpa2glMjBndXJkd2FyYXxlbnwxfHx8fDE3NzI1MjE1Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  axialAge: "https://images.unsplash.com/photo-1635166045348-31245c63b8a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwdGVtcGxlJTIwYXhpYWwlMjBhZ2UlMjBwaGlsb3NvcGh5JTIwY29sdW1uc3xlbnwxfHx8fDE3NzI1MjE1Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  bahai: "https://images.unsplash.com/photo-1688257609244-3f2a893f19d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCYWhhaSUyMHRlbXBsZSUyMGxvdHVzJTIwZmxvd2VyJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc3MjUyMTUzOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  psychedelicRes: "https://images.unsplash.com/photo-1768936919311-58724077d894?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwc3ljaGVkZWxpYyUyMGNvbnNjaW91c25lc3MlMjBjb2xvcmZ1bCUyMGFic3RyYWN0JTIwbWluZHxlbnwxfHx8fDE3NzI1MjE1Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  engagedBuddhism: "https://images.unsplash.com/photo-1766721057792-fd3279ca63b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb3R1cyUyMGZsb3dlciUyMHBlYWNlZnVsJTIwbW9uayUyMHplbiUyMEJ1ZGRoaXN0fGVufDF8fHx8MTc3MjUyMTU0NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  wifi: "https://images.unsplash.com/photo-1724940434703-901d77310a30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aWZpJTIwd2lyZWxlc3MlMjB0ZWNobm9sb2d5JTIwcm91dGVyJTIwc2lnbmFsJTIwbW9kZXJufGVufDF8fHx8MTc3MjUyMTU0NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  videoConf: "https://images.unsplash.com/photo-1766074903100-bc435aa4c60d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWRlbyUyMGNvbmZlcmVuY2UlMjBjYWxsJTIwc2NyZWVuJTIwbGFwdG9wJTIwbWVldGluZ3xlbnwxfHx8fDE3NzI1MjE1NDV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  fintech: "https://images.unsplash.com/photo-1739989934256-99e15bee9906?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBwYXltZW50JTIwZGlnaXRhbCUyMGZpbnRlY2glMjBjb250YWN0bGVzc3xlbnwxfHx8fDE3NzI1MjE1NDV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  podcast: "https://images.unsplash.com/photo-1769509068789-f242b5a6fc47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb2RjYXN0JTIwbWljcm9waG9uZSUyMHN0dWRpbyUyMGF1ZGlvJTIwcmVjb3JkaW5nfGVufDF8fHx8MTc3MjUyMTU0Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  edtech: "https://images.unsplash.com/photo-1758598738106-f8f9d4c5d9d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjBlZHVjYXRpb24lMjBzdHVkZW50JTIwdGFibGV0JTIwbGVhcm5pbmclMjBkaWdpdGFsfGVufDF8fHx8MTc3MjUyMTU0Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  labMeat: "https://images.unsplash.com/photo-1656711858987-1956a99f646a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYWIlMjBncm93biUyMGN1bHR1cmVkJTIwbWVhdCUyMHNjaWVuY2UlMjBmb29kfGVufDF8fHx8MTc3MjUyMTU0N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  satelliteNet: "https://images.unsplash.com/photo-1734126650058-623935bab140?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYXRlbGxpdGUlMjBkaXNoJTIwbmlnaHQlMjBza3klMjBzdGFycyUyMGNvbW11bmljYXRpb258ZW58MXx8fHwxNzcyNTIxNTUzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  synthBio: "https://images.unsplash.com/photo-1693932038683-7c35401f5307?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzeW50aGV0aWMlMjBiaW9sb2d5JTIwRE5BJTIwZW5naW5lZXJpbmclMjBsYWJvcmF0b3J5fGVufDF8fHx8MTc3MjUyMTU0OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  ubi: "https://images.unsplash.com/photo-1624872316440-95668bfdb4ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzYWwlMjBiYXNpYyUyMGluY29tZSUyMGNvaW5zJTIwbW9uZXklMjBjb21tdW5pdHl8ZW58MXx8fHwxNzcyNTIxNTUzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  interstellar: "https://images.unsplash.com/photo-1711991996883-1bdeecac8db9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2xhciUyMHNhaWwlMjBpbnRlcnN0ZWxsYXIlMjBkZWVwJTIwc3BhY2UlMjBzcGFjZWNyYWZ0JTIwc3RhcnN8ZW58MXx8fHwxNzcyNTIxNTUzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
};

// ─── ERA DATA ────────────────────────────────────────────────

const eras: Era[] = [
  {
    id: "historical",
    label: "Historical",
    period: "3000 BCE – 1500 CE",
    color: "#92400e",
    bgGradient: "linear-gradient(180deg, #ffffff 0%, #fefcf5 30%, #fdf8ed 60%, #fefcf5 80%, #ffffff 100%)",
    icon: Landmark,
    intro: "We built the foundations of civilisation.",
    events: [
      { id: "h1", title: "The Great Pyramids", year: "2580 BCE", location: "Giza, Egypt", impact: "2.3 million blocks. Zero modern tools. Still standing after 4,500 years.", image: IMG.pyramids, story: "The Great Pyramid of Giza was the tallest man-made structure for over 3,800 years. Built with 2.3 million limestone blocks, each averaging 2.5 tons, by tens of thousands of workers over 20 years. The precision of its base sides differs by only 58mm — a marvel that still astounds engineers.", stat: "4,500+", statLabel: "Years standing" },
      { id: "h2", title: "The Code of Hammurabi", year: "1754 BCE", location: "Babylon, Mesopotamia", impact: "The first written legal code. Justice, carved into stone.", image: IMG.mesopotamia, story: "King Hammurabi of Babylon created one of the earliest and most complete written legal codes — 282 laws governing everything from trade disputes to family rights. Carved into a basalt stele, it established the revolutionary idea that laws should be publicly known and consistently applied.", stat: "282", statLabel: "Written laws" },
      { id: "h3", title: "Indus Valley Cities", year: "2600 BCE", location: "Mohenjo-daro, South Asia", impact: "Grid-planned cities with plumbing before Rome existed.", image: IMG.indusValley, story: "The Indus Valley Civilisation built sophisticated urban centres with grid-planned streets, advanced drainage systems, and public baths — centuries before similar infrastructure appeared in Europe. Mohenjo-daro housed up to 40,000 people with a standard of civic planning not replicated for millennia.", stat: "40,000", statLabel: "Residents at peak" },
      { id: "h4", title: "Greek Philosophy", year: "400 BCE", location: "Athens, Greece", impact: "Democracy. Logic. Ethics. The bedrock of Western thought.", image: IMG.greekPhilo, story: "Socrates, Plato, and Aristotle fundamentally shaped how we understand the world. They invented formal logic, pioneered democratic governance, and asked questions about ethics, beauty, and truth that remain central to philosophy. Plato's Academy operated for nearly 900 years.", stat: "900", statLabel: "Years of Plato's Academy" },
      { id: "h5", title: "Roman Engineering", year: "80 CE", location: "Rome, Italy", impact: "Roads, aqueducts, the Colosseum. Infrastructure that defined empire.", image: IMG.colosseum, story: "The Colosseum seated 50,000 spectators with a retractable awning and hydraulic stage. Roman aqueducts carried 1.2 billion litres of water daily. Their concrete — stronger than modern versions — still holds bridges and domes 2,000 years later.", stat: "50,000", statLabel: "Colosseum capacity" },
      { id: "h6", title: "Chinese Inventions", year: "200 BCE – 1000 CE", location: "China", impact: "Paper. Compass. Gunpowder. Printing. Four gifts that changed everything.", image: IMG.chinese, story: "China's Four Great Inventions transformed human civilisation. Paper (105 CE) democratised knowledge. The compass (200 BCE) enabled global navigation. Gunpowder (9th century) reshaped warfare. Movable type (1040 CE) preceded Gutenberg by four centuries.", stat: "4", statLabel: "World-changing inventions" },
      { id: "h7", title: "Mayan Astronomy", year: "250 – 900 CE", location: "Central America", impact: "They tracked Venus to within 2 hours of accuracy. Without telescopes.", image: IMG.mayan, story: "The Maya developed one of the most sophisticated astronomical systems of the ancient world. They calculated the solar year to 365.2420 days — more accurate than the Gregorian calendar. Their Venus tables predicted the planet's cycle to within 2 hours over 500 years.", stat: "365.2420", statLabel: "Days in their solar year" },
      { id: "h8", title: "Sacred Architecture", year: "500 BCE – 1200 CE", location: "Worldwide", impact: "Temples, amphitheatres, monuments — faith made physical.", image: IMG.parthenon, story: "From the Parthenon's mathematical perfection to Angkor Wat's cosmic geometry to the Great Mosque of Córdoba's 856 columns — sacred architecture across cultures demonstrated humanity's drive to express the infinite in stone, wood, and light.", stat: "856", statLabel: "Columns in Córdoba's mosque" },
      { id: "h9", title: "Birth of Mathematics", year: "300 BCE", location: "Alexandria, Egypt & India", impact: "Zero, geometry, algebra. The invisible language of the universe.", image: IMG.math, story: "Euclid's Elements remained the definitive mathematics textbook for 2,000 years. Indian mathematicians invented zero and the decimal system. Al-Khwarizmi founded algebra. Together, they built the mathematical infrastructure that powers everything from bridges to computers.", stat: "2,000", statLabel: "Years of Euclid's relevance" },
      { id: "h10", title: "The First Universities", year: "859 CE", location: "Fez, Morocco", impact: "Structured higher learning. Knowledge, institutionalised.", image: IMG.university, story: "The University of al-Qarawiyyin, founded by Fatima al-Fihri in 859 CE, is the world's oldest existing, continually operating educational institution. Bologna (1088) and Oxford (1096) followed — creating the model of structured higher learning that still shapes education globally.", stat: "1,167", statLabel: "Years of continuous operation" },
      { id: "h11", title: "Early Medicine", year: "1500 BCE – 500 CE", location: "India, China, Greece", impact: "Ayurveda. Acupuncture. Hippocratic oath. Healing became a science.", image: IMG.medicine, story: "Ancient healing systems across continents developed remarkably parallel insights. Ayurveda catalogued 700 medicinal plants. Chinese medicine mapped meridian systems. Hippocrates separated medicine from superstition. Sushruta performed the world's first documented surgeries — including rhinoplasty — in 600 BCE.", stat: "700+", statLabel: "Medicinal plants catalogued" },
      { id: "h12", title: "The Agricultural Revolution", year: "~10,000 BCE", location: "Fertile Crescent", impact: "Humans stopped wandering. Civilisation began with a seed.", image: IMG.agriculture, story: "Around 10,000 BCE, humans in the Fertile Crescent began deliberately cultivating wheat, barley, and legumes. This shift from nomadic hunting to settled farming triggered the Neolithic Revolution — enabling permanent villages, food surpluses, population growth, social stratification, and eventually cities. Every civilisation that followed rests on this foundation.", stat: "10,000", statLabel: "BCE — dawn of farming" },
      { id: "h13", title: "The Invention of the Wheel", year: "~3500 BCE", location: "Mesopotamia", impact: "A simple circle that moved the world forward.", image: IMG.wheel, story: "The wheel first appeared around 3500 BCE in Mesopotamia — initially as a potter's wheel, then adapted for transport. Combined with the axle, it revolutionised trade, warfare, and agriculture. Wheeled carts allowed goods to move farther and faster, connecting communities into networks of exchange that would eventually become the first economies.", stat: "5,500+", statLabel: "Years of continuous use" },
      { id: "h14", title: "The Great Wall of China", year: "7th century BCE – 1644 CE", location: "Northern China", impact: "21,000 km of stone, earth, and human will.", image: IMG.greatWall, story: "Built across two millennia by multiple dynasties, the Great Wall stretches over 21,000 kilometres — the longest structure ever built by human hands. It employed millions of workers, many of whom perished during construction. More than a military barrier, it regulated trade, immigration, and cultural exchange along China's northern frontier.", stat: "21,000", statLabel: "Kilometres long" },
      { id: "h15", title: "The Birth of Writing", year: "3400 BCE", location: "Sumer & Egypt", impact: "Memory escaped the brain. Knowledge became permanent.", image: IMG.writingSystems, story: "Sumerian cuneiform and Egyptian hieroglyphs emerged independently around 3400–3200 BCE. Writing transformed civilisation: laws could be codified, trade recorded, stories preserved, and knowledge transmitted across generations. The transition from oral to written culture was the single most important information technology breakthrough until the printing press.", stat: "3,400", statLabel: "BCE — first written records" },
      { id: "h16", title: "The Silk Road", year: "130 BCE – 1450 CE", location: "China to Mediterranean", impact: "The first global network. Ideas travelled with goods.", image: IMG.silkRoad, story: "Stretching over 6,400 kilometres from Chang'an to Constantinople, the Silk Road was the ancient world's information superhighway. It carried silk, spices, and precious metals — but also religions, technologies, languages, and diseases. Buddhism, Islam, paper-making, and the compass all spread along its routes, shaping every civilisation they touched.", stat: "6,400", statLabel: "Kilometres of trade routes" },
      { id: "h17", title: "Roman Roads & Infrastructure", year: "312 BCE – 400 CE", location: "Roman Empire", impact: "All roads led to Rome — and they built 400,000 km of them.", image: IMG.romanRoad, story: "The Roman road network connected three continents and endured for centuries after the empire's fall. Engineered with drainage layers, cambered surfaces, and durable materials, many Roman roads are still visible today. This infrastructure enabled rapid military deployment, trade, postal services, and cultural unification across the largest empire the West had ever known.", stat: "400,000", statLabel: "Kilometres of Roman roads" },
      { id: "h18", title: "The Phoenician Alphabet", year: "~1050 BCE", location: "Byblos, Lebanon", impact: "22 letters. Every alphabet you know descends from this one.", image: IMG.phoenician, story: "The Phoenician alphabet was the first widely adopted writing system based on individual sounds rather than pictographs or syllables. Its 22 consonantal letters were simple enough for merchants to learn quickly, democratising literacy beyond scribal elites. Greek, Latin, Arabic, Hebrew, and Cyrillic scripts all trace their lineage directly to this Phoenician innovation.", stat: "22", statLabel: "Letters that changed everything" },
      { id: "h19", title: "The Library of Alexandria", year: "~300 BCE", location: "Alexandria, Egypt", impact: "The first attempt to collect all human knowledge in one place.", image: IMG.libraryAlex, story: "Founded by Ptolemy I, the Library of Alexandria housed an estimated 400,000 scrolls at its peak — the largest collection of knowledge in the ancient world. Scholars from across the Mediterranean gathered there to study, debate, and advance mathematics, astronomy, medicine, and literature. Its eventual destruction remains one of history's greatest intellectual losses.", stat: "400,000", statLabel: "Scrolls at its peak" },
      { id: "h20", title: "Ashoka's Edicts", year: "269 – 232 BCE", location: "Maurya Empire, India", impact: "An emperor renounced war and carved compassion into stone.", image: IMG.ashoka, story: "After the devastating Kalinga War, Emperor Ashoka converted to Buddhism and inscribed edicts of tolerance, non-violence, and welfare across his vast empire. Carved on rocks and pillars in multiple languages, these edicts represent the earliest known government declarations of religious freedom, animal welfare, and social responsibility — predating the Magna Carta by 1,500 years.", stat: "33", statLabel: "Major rock and pillar edicts" },
      { id: "h21", title: "Angkor Wat", year: "1113 – 1150 CE", location: "Angkor, Cambodia", impact: "The largest religious monument ever built. A cosmos in stone.", image: IMG.angkorWat, story: "Built by King Suryavarman II as a Hindu temple to Vishnu, Angkor Wat spans 162.6 hectares — larger than Vatican City. Its five towers represent Mount Meru, the centre of the Hindu universe. The complex includes over 1,800 carved apsara figures and bas-reliefs stretching 800 metres. It remains the best-preserved temple at Angkor and Cambodia's national symbol.", stat: "162.6", statLabel: "Hectares — world's largest temple" },
      { id: "h22", title: "The Inca Road System", year: "1400 – 1533 CE", location: "Andes, South America", impact: "40,000 km of road through mountains, without the wheel.", image: IMG.incaRoad, story: "The Qhapaq Ñan connected the vast Inca Empire from Colombia to Chile through some of the world's most extreme terrain — crossing deserts, jungles, and mountain passes above 5,000 metres. Built without iron tools, wheels, or draft animals, the network included suspension bridges, tunnels, and relay stations. Chasqui runners could transmit messages across the empire in days.", stat: "40,000", statLabel: "Kilometres of Inca roads" },
      { id: "h23", title: "The Iron Age", year: "~1200 BCE", location: "Anatolia & Global", impact: "A harder metal. Sharper tools. A new era of human capability.", image: IMG.ironAge, story: "The transition from bronze to iron around 1200 BCE transformed agriculture, warfare, and construction across Eurasia and Africa. Iron ore was far more abundant than tin and copper, making metal tools accessible to ordinary farmers for the first time. Iron ploughs broke harder soils, expanding arable land. Iron axes cleared forests. The democratisation of metal fundamentally reshaped social structures.", stat: "1,200", statLabel: "BCE — the Iron Age begins" },
      { id: "h24", title: "The Bronze Age", year: "~3300 BCE", location: "Near East & Mediterranean", impact: "Copper met tin. Civilisation found its first alloy.", image: IMG.bronzeAge, story: "The discovery that copper alloyed with tin produced bronze — harder, more durable, and easier to cast — launched a technological revolution. Bronze tools, weapons, and ceremonial objects enabled larger-scale agriculture, more complex warfare, and long-distance trade networks. The demand for tin, rare and geographically concentrated, drove some of the earliest international trade routes stretching from Afghanistan to Cornwall, England.", stat: "3,300", statLabel: "BCE — the Bronze Age begins" },
      { id: "h25", title: "The Persian Royal Road", year: "~500 BCE", location: "Persia (modern Iran to Turkey)", impact: "2,700 km of engineered highway. Messages crossed an empire in 7 days.", image: IMG.persianRoad, story: "Darius I built the Royal Road stretching 2,700 kilometres from Susa to Sardis, with 111 relay stations where mounted couriers exchanged horses. A message could traverse the entire empire in just 7 days — a journey that took 90 days on foot. Herodotus marvelled that 'neither snow, nor rain, nor heat, nor darkness of night' stopped these riders — a phrase later adopted by the U.S. Postal Service.", stat: "7", statLabel: "Days to cross the empire" },
      { id: "h26", title: "Polynesian Wayfinding", year: "1500 BCE – 1200 CE", location: "Pacific Ocean", impact: "They navigated 16 million square miles of open ocean — by the stars.", image: IMG.polynesian, story: "Polynesian navigators colonised virtually every habitable island in the Pacific — from Hawaii to New Zealand to Easter Island — using no instruments, only stars, ocean swells, bird flight patterns, and cloud formations. They sailed double-hulled canoes across the largest ocean on Earth, covering distances of up to 4,000 kilometres between islands. This was the most extraordinary feat of maritime navigation in human history.", stat: "16M", statLabel: "Square miles of Pacific navigated" },
      { id: "h27", title: "The Terracotta Army", year: "210 BCE", location: "Xi'an, China", impact: "8,000 unique soldiers buried to guard an emperor into eternity.", image: IMG.terracotta, story: "Emperor Qin Shi Huang commissioned an army of over 8,000 life-sized terracotta warriors, each with unique facial features, hairstyles, and armour, to accompany him in the afterlife. The figures were arranged in battle formation within a vast underground complex, along with 670 horses and 130 chariots. Discovered by farmers in 1974, the site revealed the first emperor's obsession with immortality and the staggering organisational capacity of ancient China.", stat: "8,000", statLabel: "Unique terracotta warriors" },
      { id: "h28", title: "Justinian's Code", year: "529 – 534 CE", location: "Constantinople, Byzantine Empire", impact: "Roman law, codified. The foundation of Western legal systems.", image: IMG.justinian, story: "Emperor Justinian I commissioned a team of legal scholars to compile, organise, and update a thousand years of Roman legal tradition into the Corpus Juris Civilis. This monumental work preserved Roman law through the medieval period and became the basis of civil law systems in continental Europe, Latin America, and parts of Asia and Africa. Concepts like habeas corpus, legal precedent, and contract law all trace their lineage to Justinian's codification.", stat: "1,000", statLabel: "Years of Roman law codified" },
    ],
  },
  {
    id: "discovery",
    label: "Discovery",
    period: "1500 – 1900",
    color: "#1e3a5f",
    bgGradient: "linear-gradient(180deg, #ffffff 0%, #f5f8fc 30%, #edf2f9 60%, #f5f8fc 80%, #ffffff 100%)",
    icon: Compass,
    intro: "We expanded the map of the world and the map of the mind.",
    events: [
      { id: "d1", title: "Renaissance Art & Science", year: "1400 – 1600", location: "Florence, Italy", impact: "Beauty and truth fused. Art became a laboratory.", image: IMG.renaissance, story: "The Renaissance saw art and science merge in unprecedented ways. Brunelleschi solved the dome of Florence Cathedral with engineering genius. Michelangelo's Sistine Chapel ceiling took 4 years of solitary work. The era proved that creativity and rigour are not opposites — they are partners.", stat: "4", statLabel: "Years on the Sistine ceiling" },
      { id: "d2", title: "Leonardo da Vinci", year: "1452 – 1519", location: "Italy", impact: "Painter. Engineer. Anatomist. The original polymath.", image: IMG.davinci, story: "Leonardo filled over 7,000 pages of notebooks with inventions, observations, and art that were centuries ahead of their time. He designed flying machines, hydraulic systems, and anatomical studies so accurate they weren't surpassed until the age of photography. He embodied the idea that one person can contain multitudes.", stat: "7,000+", statLabel: "Notebook pages" },
      { id: "d3", title: "The Printing Press", year: "1440", location: "Mainz, Germany", impact: "Knowledge escaped the monastery. The world was never the same.", image: IMG.printing, story: "Gutenberg's press reduced the cost of books by 80% within decades. By 1500, over 20 million volumes had been printed in Europe. Literacy rates soared. The Reformation, the Scientific Revolution, and the Enlightenment all rode on rivers of printed ink.", stat: "20M+", statLabel: "Volumes by 1500" },
      { id: "d4", title: "Global Sea Exploration", year: "1492 – 1600", location: "Atlantic & Pacific Oceans", impact: "Wooden ships crossed oceans. The world became one map.", image: IMG.sailing, story: "Columbus, da Gama, Magellan — navigators who risked everything to expand human knowledge of the planet. Magellan's expedition completed the first circumnavigation: 3 years, 60,000 miles, with only 18 of the original 270 crew surviving. The Age of Exploration permanently connected all continents.", stat: "60,000", statLabel: "Miles around the world" },
      { id: "d5", title: "Galileo & Astronomy", year: "1609", location: "Padua, Italy", impact: "He pointed a telescope upward. Earth lost its centre. Truth gained one.", image: IMG.galileo, story: "Galileo's telescope revealed Jupiter's moons, Saturn's rings, and the phases of Venus — shattering the geocentric model. His observations confirmed Copernicus and laid the foundation for modern astronomy. For daring to describe what he saw, he spent his last years under house arrest.", stat: "4", statLabel: "Moons of Jupiter discovered" },
      { id: "d6", title: "Newton & Physics", year: "1687", location: "Cambridge, England", impact: "Gravity. Optics. Calculus. One mind, three revolutions.", image: IMG.newton, story: "Isaac Newton's Principia Mathematica unified celestial and terrestrial mechanics under universal laws. He co-invented calculus, decomposed white light into its spectrum, and formulated three laws of motion that guided engineering for 300 years — until Einstein extended them.", stat: "3", statLabel: "Laws of motion" },
      { id: "d7", title: "The Industrial Revolution", year: "1760 – 1840", location: "Britain", impact: "Muscle gave way to machine. Production scaled beyond imagination.", image: IMG.industrial, story: "The Industrial Revolution multiplied human productive capacity by orders of magnitude. Cotton production increased 100-fold in a century. Cities swelled. Railways shrank continents. For the first time in history, sustained economic growth became possible — transforming every aspect of human life.", stat: "100x", statLabel: "Cotton production increase" },
      { id: "d8", title: "The Steam Engine", year: "1769", location: "Birmingham, England", impact: "James Watt harnessed steam. Distance became negotiable.", image: IMG.steam, story: "Watt's improved steam engine powered factories, ships, and locomotives. By 1830, railways connected cities. By 1869, the transcontinental railroad crossed America. Steam compressed the world — making goods, ideas, and people mobile at industrial scale.", stat: "1869", statLabel: "Transcontinental railroad" },
      { id: "d9", title: "Harnessing Electricity", year: "1831 – 1882", location: "UK & USA", impact: "Faraday found the spark. Edison lit the world.", image: IMG.electricity, story: "Faraday's electromagnetic induction (1831) and Edison's first commercial power station (1882) launched the electrical age. Tesla's alternating current made long-distance power transmission possible. Within decades, electricity transformed homes, factories, and cities — extending productive hours beyond daylight.", stat: "1882", statLabel: "First power station" },
      { id: "d10", title: "Photography", year: "1839", location: "Paris, France", impact: "Time, frozen. Memory, made permanent.", image: IMG.photography, story: "Daguerre's photographic process gave humanity the power to capture reality. For the first time, moments could be preserved exactly as they occurred. Photography transformed journalism, science, art, and personal memory — democratising image-making in ways that still accelerate today.", stat: "1839", statLabel: "Year of the daguerreotype" },
      { id: "d11", title: "The Telegraph", year: "1844", location: "Washington D.C., USA", impact: "'What hath God wrought.' Instant communication, born.", image: IMG.telegraph, story: "Morse's first telegraph message travelled instantly between Washington and Baltimore — collapsing distance in ways that seemed miraculous. Within decades, submarine cables connected continents. The telegraph was the ancestor of every instant communication technology we use today.", stat: "1866", statLabel: "First transatlantic cable" },
      { id: "d12", title: "Copernicus & Heliocentrism", year: "1543", location: "Frombork, Poland", impact: "The Earth is not the centre. The revolution started with a book.", image: IMG.copernicus, story: "Nicolaus Copernicus published De revolutionibus orbium coelestium on his deathbed in 1543, proposing that the Earth orbits the Sun. This heliocentric model shattered 1,400 years of Ptolemaic geocentrism and ignited the Scientific Revolution. It took over a century for the idea to be fully accepted, but it forever changed humanity's self-conception.", stat: "1,400", statLabel: "Years of geocentric orthodoxy overturned" },
      { id: "d13", title: "The Enlightenment", year: "1685 – 1815", location: "Europe", impact: "Reason over dogma. Rights over rulers. The modern world was born.", image: IMG.enlightenment, story: "The Enlightenment produced Locke's theory of natural rights, Voltaire's defence of free speech, Rousseau's social contract, and Kant's call to 'dare to know.' These ideas directly inspired the American and French Revolutions, the abolition of slavery, and the concept of universal human rights. The Enlightenment gave us the intellectual architecture of modern democracy.", stat: "130", statLabel: "Years reshaping civilisation" },
      { id: "d14", title: "Darwin & Evolution", year: "1859", location: "England", impact: "One theory unified all of biology.", image: IMG.darwin, story: "Charles Darwin's On the Origin of Species presented natural selection as the mechanism of evolution — the single most unifying idea in the life sciences. Drawing on 20 years of research, including his voyage on HMS Beagle, Darwin showed that all life on Earth shares common ancestry. His work remains the foundation of genetics, ecology, and modern medicine.", stat: "20", statLabel: "Years of research before publishing" },
      { id: "d15", title: "Mapping the World", year: "1500 – 1800", location: "Global", impact: "Every coastline charted. The unknown became the known.", image: IMG.worldMap, story: "From Mercator's 1569 projection to Captain Cook's Pacific voyages, cartographers transformed the blank spaces on maps into detailed knowledge. By 1800, every major coastline had been charted. Accurate maps enabled global trade, colonial expansion, scientific expeditions, and — for the first time — a shared picture of Earth's geography.", stat: "300", statLabel: "Years to map the planet" },
      { id: "d16", title: "The Microscope Revolution", year: "1665 – 1800", location: "Netherlands & Europe", impact: "The invisible world revealed. Biology was reborn.", image: IMG.microscope, story: "Antonie van Leeuwenhoek's handcrafted microscopes achieved 270× magnification, revealing bacteria, blood cells, and spermatozoa for the first time. Robert Hooke coined the word 'cell' in 1665. The microscope opened an entirely new dimension of reality — the microbial world that governs health, disease, and the chemistry of life itself.", stat: "270×", statLabel: "Leeuwenhoek's magnification" },
      { id: "d17", title: "The First Vaccine", year: "1796", location: "Berkeley, England", impact: "Edward Jenner turned cowpox into humanity's first shield against disease.", image: IMG.vaccine, story: "Edward Jenner inoculated 8-year-old James Phipps with cowpox material and demonstrated immunity to smallpox — creating the world's first vaccine. This single innovation would eventually lead to the complete eradication of smallpox in 1980, the only human disease ever eliminated. Vaccines derived from Jenner's principle have since saved an estimated 154 million lives over the past 50 years alone.", stat: "154M", statLabel: "Lives saved by vaccines (50 years)" },
      { id: "d18", title: "Abolition of the Slave Trade", year: "1807 – 1888", location: "Atlantic World", impact: "The longest struggle for human dignity. Freedom, hard-won.", image: IMG.abolition, story: "Britain abolished the slave trade in 1807 and slavery itself in 1833. The United States followed with the 13th Amendment in 1865. Brazil, the last major slaveholding nation, abolished slavery in 1888. The abolitionist movement — driven by formerly enslaved people, religious groups, and political activists — established the principle that no human being can own another. It was one of the greatest moral revolutions in history.", stat: "12.5M", statLabel: "People enslaved in the Atlantic trade" },
      { id: "d19", title: "The Periodic Table", year: "1869", location: "St. Petersburg, Russia", impact: "Mendeleev organised the elements. Chemistry found its map.", image: IMG.periodicTable, story: "Dmitri Mendeleev arranged 63 known elements by atomic weight and noticed recurring patterns in their properties. His periodic table predicted the existence and properties of undiscovered elements — gallium, scandium, and germanium were later found exactly as he foretold. The periodic table remains the single most important organising framework in chemistry, now containing 118 confirmed elements.", stat: "118", statLabel: "Elements in the modern table" },
      { id: "d20", title: "Classical Music's Golden Age", year: "1750 – 1900", location: "Europe", impact: "Bach, Mozart, Beethoven. Sound became the highest art.", image: IMG.symphony, story: "From Bach's mathematical fugues to Mozart's 600+ compositions to Beethoven's symphonies written while going deaf — the Classical and Romantic eras produced music that transcends time and culture. Beethoven's Ninth Symphony, completed in total deafness, remains one of humanity's supreme creative achievements. These composers proved that sound can express the full range of human experience.", stat: "600+", statLabel: "Mozart's compositions in 35 years" },
      { id: "d21", title: "Precision Navigation", year: "1731 – 1770s", location: "Britain", impact: "The sextant and chronometer solved the longitude problem.", image: IMG.sextant, story: "For centuries, sailors could determine latitude but not longitude — leading to countless shipwrecks and lost fleets. John Harrison's marine chronometer (1761) and the sextant gave navigators the tools to pinpoint their position anywhere on Earth. The Board of Longitude prize drove one of history's greatest engineering quests. Accurate navigation made global trade, exploration, and eventually air travel possible.", stat: "1761", statLabel: "Year the longitude problem was solved" },
      { id: "d22", title: "Modern Chemistry", year: "1770s – 1800s", location: "Paris, France", impact: "Lavoisier named oxygen and killed alchemy. Modern science began.", image: IMG.lavoisier, story: "Antoine Lavoisier identified oxygen's role in combustion, disproved the phlogiston theory, and established the law of conservation of mass — that matter is neither created nor destroyed. He wrote the first modern chemistry textbook and created a systematic chemical nomenclature still used today. Called the 'father of modern chemistry,' Lavoisier transformed an occult art into a rigorous science.", stat: "1789", statLabel: "Traité élémentaire de chimie published" },
      { id: "d23", title: "The Scientific Method", year: "1620", location: "England", impact: "Francis Bacon gave inquiry a structure. Observation replaced assumption.", image: IMG.sciMethod, story: "Francis Bacon's Novum Organum (1620) laid out a systematic approach to investigation: observe, hypothesise, experiment, and verify. Breaking from the Aristotelian tradition of pure deduction, Bacon championed inductive reasoning based on empirical evidence. His method became the intellectual engine of the Scientific Revolution and remains the foundation of modern research — from physics to medicine to social science.", stat: "1620", statLabel: "Novum Organum published" },
      { id: "d24", title: "William Harvey & Blood Circulation", year: "1628", location: "London, England", impact: "He proved the heart is a pump. The body became a knowable machine.", image: IMG.harvey, story: "William Harvey's De Motu Cordis (1628) demonstrated that blood circulates continuously through the body, pumped by the heart — overturning 1,400 years of Galenic medicine that claimed the liver continuously produced new blood. Through meticulous dissection and quantitative reasoning, Harvey calculated that the heart pumps roughly 260 litres of blood per hour, making continuous production physically impossible. His work founded modern physiology.", stat: "260", statLabel: "Litres pumped per hour" },
      { id: "d25", title: "Linnaeus & Taxonomy", year: "1735", location: "Uppsala, Sweden", impact: "He named the living world. Every species found its place.", image: IMG.linnaeus, story: "Carl Linnaeus published Systema Naturae in 1735, establishing the binomial nomenclature system that classifies every living organism with a genus and species name. Homo sapiens — the name he gave our own species — is his most famous coinage. Linnaeus personally classified over 12,000 species. His hierarchical system of kingdom, class, order, genus, and species remains the universal framework for biological classification nearly three centuries later.", stat: "12,000+", statLabel: "Species Linnaeus classified" },
      { id: "d26", title: "Alexander von Humboldt & Ecology", year: "1799 – 1804", location: "Americas", impact: "He saw nature as a web. Ecology was born from a single journey.", image: IMG.humboldt, story: "Alexander von Humboldt's five-year expedition through Latin America produced a revolutionary understanding of nature as an interconnected system. He mapped isothermal lines, discovered that altitude mimics latitude in determining vegetation zones, and documented how deforestation causes climate change — in 1800. His Kosmos inspired Darwin, Thoreau, and the modern environmental movement. More places on Earth are named after Humboldt than any other person.", stat: "5", statLabel: "Years of transformative exploration" },
      { id: "d27", title: "Antiseptic Surgery", year: "1867", location: "Glasgow, Scotland", impact: "Joseph Lister halved surgical deaths. Sterility saved millions.", image: IMG.antiseptic, story: "Joseph Lister applied Louis Pasteur's germ theory to surgery, introducing carbolic acid as an antiseptic to sterilise instruments, wounds, and surgical dressings. Surgical mortality at his Glasgow hospital dropped from 46% to 15% within three years. His work was initially ridiculed by the medical establishment, but by the 1880s antiseptic — and later aseptic — technique had become standard practice, saving countless millions of lives.", stat: "46→15%", statLabel: "Surgical mortality reduction" },
    ],
  },
  {
    id: "modern",
    label: "Modern",
    period: "1900 – Present",
    color: "#1e293b",
    bgGradient: "linear-gradient(180deg, #ffffff 0%, #f4f5fb 30%, #eceef8 60%, #f4f5fb 80%, #ffffff 100%)",
    icon: Rocket,
    intro: "We stepped beyond Earth and connected the planet.",
    events: [
      { id: "m1", title: "The Moon Landing", year: "1969", location: "Sea of Tranquility, Moon", impact: "400,000 people. One giant leap. We walked on another world.", image: IMG.space, story: "Apollo 11 carried Armstrong, Aldrin, and Collins 238,855 miles to the Moon. The Saturn V rocket generated 7.5 million pounds of thrust. The guidance computer had less power than a modern calculator. Yet humanity achieved the impossible — leaving Earth and returning safely.", stat: "238,855", statLabel: "Miles to the Moon" },
      { id: "m2", title: "Medical Miracles", year: "1928 – Present", location: "Worldwide", impact: "Penicillin. Vaccines. Gene therapy. Life expectancy doubled.", image: IMG.medModern, story: "Fleming's accidental discovery of penicillin has saved an estimated 200 million lives. Vaccines eradicated smallpox. The Human Genome Project mapped 3 billion DNA base pairs. CRISPR now edits genes directly. Global life expectancy rose from 31 to over 73 years in a single century.", stat: "200M+", statLabel: "Lives saved by antibiotics" },
      { id: "m3", title: "The United Nations", year: "1945", location: "New York, USA", impact: "After the worst wars in history, humanity chose dialogue.", image: IMG.un, story: "Founded from the ashes of World War II, the UN brought 193 nations into a framework for cooperation. Its agencies have eradicated diseases, fed millions, established human rights standards, and mediated countless conflicts — an imperfect but unprecedented experiment in global governance.", stat: "193", statLabel: "Member nations" },
      { id: "m4", title: "Civil Rights Movements", year: "1950s – 1970s", location: "USA & Worldwide", impact: "Ordinary people demanded dignity. Laws changed. Consciousness shifted.", image: IMG.civilRights, story: "From Montgomery to Selma to the March on Washington — millions of ordinary people transformed society through peaceful resistance. The Civil Rights Act of 1964 and Voting Rights Act of 1965 dismantled legal segregation. Similar movements across the globe proved that justice is not given — it is claimed.", stat: "250,000", statLabel: "At the March on Washington" },
      { id: "m5", title: "Women's Suffrage Expansion", year: "1893 – Present", location: "Worldwide", impact: "Half of humanity gained a voice. The longest revolution.", image: IMG.suffrage, story: "New Zealand became the first nation to grant women the vote in 1893. By 2025, women hold political rights in virtually every nation. Women now lead countries, corporations, and scientific breakthroughs — though the work toward full equality continues in every domain.", stat: "1893", statLabel: "First women's suffrage" },
      { id: "m6", title: "The Computer Revolution", year: "1945 – Present", location: "Global", impact: "From room-sized machines to pocket supercomputers.", image: IMG.computer, story: "ENIAC (1945) weighed 30 tons and could perform 5,000 calculations per second. Today's smartphones perform trillions. Computing power has increased by a factor of one trillion since 1956. This exponential acceleration underlies virtually every modern breakthrough.", stat: "1T×", statLabel: "Computing power increase" },
      { id: "m7", title: "The Internet", year: "1991", location: "Global", impact: "All of human knowledge, connected. 5.3 billion people online.", image: IMG.digital, story: "From ARPANET's first message in 1969 to Tim Berners-Lee's World Wide Web in 1991, the internet connected humanity. By 2025, 5.3 billion people are online. Information that once took lifetimes to access is now available in milliseconds.", stat: "5.3B", statLabel: "People online" },
      { id: "m8", title: "Smartphones", year: "2007", location: "Cupertino, USA", impact: "A supercomputer, a camera, a library — in every pocket.", image: IMG.smartphone, story: "The iPhone launched in 2007. By 2025, 6.8 billion smartphones exist worldwide. Each one has more processing power than the Apollo guidance computer. They've transformed commerce, communication, education, and entertainment — putting unprecedented capability into billions of hands.", stat: "6.8B", statLabel: "Smartphones worldwide" },
      { id: "m9", title: "Renewable Energy", year: "2000 – Present", location: "Worldwide", impact: "Solar is now the cheapest electricity in history.", image: IMG.renewable, story: "Solar energy costs dropped 99% since 1976. Wind power capacity grew 75-fold since 2000. In 2024, renewables generated over 30% of global electricity for the first time. The energy transition is no longer a dream — it's an accelerating economic reality.", stat: "99%", statLabel: "Solar cost reduction since 1976" },
      { id: "m10", title: "The Space Station", year: "1998 – Present", location: "Low Earth Orbit", impact: "Humans have lived continuously in space for 25 years.", image: IMG.iss, story: "The International Space Station has been continuously occupied since November 2000 — the longest uninterrupted human presence off Earth. Built by 15 nations, it orbits at 17,500 mph, completing a lap of Earth every 90 minutes. Over 270 astronauts from 21 countries have lived aboard.", stat: "25+", statLabel: "Years of continuous habitation" },
      { id: "m11", title: "The Wright Brothers & Flight", year: "1903", location: "Kitty Hawk, USA", impact: "12 seconds that launched a century of aviation.", image: IMG.flight, story: "On December 17, 1903, Orville Wright flew 120 feet in 12 seconds — the first controlled, powered heavier-than-air flight. Within 66 years, humans walked on the Moon. Aviation compressed the planet: flights that took months by sea now take hours. Today, over 100,000 flights carry 12 million passengers daily.", stat: "12M", statLabel: "Daily passengers by air" },
      { id: "m12", title: "The Nuclear Age", year: "1945 – Present", location: "Worldwide", impact: "The power to destroy worlds — or to light them.", image: IMG.nuclear, story: "The Trinity test on July 16, 1945, ushered in the nuclear age. The atomic bombs on Hiroshima and Nagasaki ended World War II but raised existential questions that persist today. Nuclear energy now provides 10% of global electricity, while nuclear deterrence has shaped geopolitics for 80 years. The dual nature of this technology defines modernity's deepest dilemma.", stat: "10%", statLabel: "Of global electricity from nuclear" },
      { id: "m13", title: "Television & Broadcasting", year: "1927 – Present", location: "Worldwide", impact: "The world entered your living room. Shared experience, televised.", image: IMG.television, story: "From Philo Farnsworth's first electronic television demonstration in 1927 to today's streaming age, TV transformed culture. The Moon landing was watched by 600 million people simultaneously. Television created shared national experiences, shaped political campaigns, and became the dominant medium of the 20th century before the internet inherited its throne.", stat: "600M", statLabel: "Watched the Moon landing live" },
      { id: "m14", title: "The Transistor & Semiconductors", year: "1947 – Present", location: "Bell Labs, USA", impact: "A tiny switch that built the modern world.", image: IMG.transistor, story: "Invented at Bell Labs in 1947, the transistor replaced bulky vacuum tubes and enabled the microelectronics revolution. Moore's Law predicted transistor density doubling every two years — and held for over 50 years. Today, a single chip contains over 100 billion transistors. Every smartphone, server, and satellite depends on this invention.", stat: "100B+", statLabel: "Transistors on a modern chip" },
      { id: "m15", title: "The Green Revolution", year: "1960s – 1980s", location: "India, Mexico, Asia", impact: "Norman Borlaug's seeds saved a billion lives from famine.", image: IMG.greenRev, story: "Norman Borlaug's high-yield, disease-resistant wheat and rice varieties transformed agriculture in developing nations. India went from famine to food surplus within a decade. The Green Revolution is credited with saving over 1 billion people from starvation — the largest humanitarian impact of any scientific achievement in history.", stat: "1B+", statLabel: "Lives saved from famine" },
      { id: "m16", title: "The Discovery of DNA", year: "1953", location: "Cambridge, England", impact: "Watson, Crick, and Franklin revealed the blueprint of life.", image: IMG.dnaDiscovery, story: "On February 28, 1953, James Watson and Francis Crick, building on Rosalind Franklin's crucial X-ray crystallography data, determined the double-helix structure of DNA. This discovery explained how genetic information is stored, copied, and transmitted — unlocking the molecular basis of heredity. It launched modern genetics, biotechnology, forensic science, and personalised medicine.", stat: "3.2B", statLabel: "Base pairs in human DNA" },
      { id: "m17", title: "The Fall of the Berlin Wall", year: "1989", location: "Berlin, Germany", impact: "A wall fell. A world order ended. Freedom surged.", image: IMG.berlinWall, story: "On November 9, 1989, East German authorities unexpectedly opened the Berlin Wall. Tens of thousands streamed through, reuniting families separated for 28 years. Within two years, the Soviet Union dissolved, the Cold War ended, and 15 new nations emerged. The fall of the Wall symbolised the triumph of human aspiration over authoritarian control and reshaped global politics forever.", stat: "28", statLabel: "Years the Wall stood" },
      { id: "m18", title: "Eradication of Smallpox", year: "1980", location: "Worldwide", impact: "The only human disease ever eliminated. Proof that we can win.", image: IMG.smallpoxErad, story: "Smallpox killed an estimated 300 million people in the 20th century alone. The WHO launched a global vaccination campaign in 1967, using ring vaccination to contain outbreaks. The last natural case occurred in Somalia in 1977. In 1980, the WHO officially declared smallpox eradicated — humanity's greatest victory over infectious disease, saving approximately 5 million lives per year since.", stat: "5M/yr", statLabel: "Lives saved annually" },
      { id: "m19", title: "Einstein & Relativity", year: "1905 – 1915", location: "Bern & Berlin, Germany", impact: "Space bends. Time stretches. E = mc². Physics was reborn.", image: IMG.einstein, story: "In 1905, Albert Einstein published four papers that revolutionised physics — including special relativity and the mass-energy equivalence E = mc². In 1915, his general theory of relativity described gravity as the curvature of spacetime. These theories underpin GPS satellites, nuclear energy, black hole detection, and our understanding of the cosmos. Einstein showed that reality is stranger than anyone imagined.", stat: "4", statLabel: "Papers that changed physics in 1905" },
      { id: "m20", title: "The Human Genome Project", year: "1990 – 2003", location: "Global", impact: "We read our own source code. 3.2 billion letters decoded.", image: IMG.genomeProject, story: "The Human Genome Project was the largest collaborative biological project in history — involving 20 institutions across 6 countries over 13 years. It mapped all 3.2 billion base pairs of human DNA, identifying approximately 20,500 genes. The cost dropped from $2.7 billion for the first genome to under $200 today, enabling personalised medicine, genetic testing, and targeted cancer therapies.", stat: "$200", statLabel: "Cost of genome sequencing today" },
      { id: "m21", title: "GPS & Satellite Navigation", year: "1978 – Present", location: "Worldwide", impact: "31 satellites that tell 4 billion people exactly where they are.", image: IMG.gps, story: "The Global Positioning System, developed by the U.S. Department of Defence and made freely available to civilians in 2000, uses 31 satellites to provide positioning accurate to within 30 centimetres. GPS underpins aviation, shipping, ride-hailing, precision agriculture, emergency response, and scientific research. Over 4 billion people use GPS-enabled devices daily — making it one of the most universally relied-upon technologies ever created.", stat: "4B+", statLabel: "Daily GPS users worldwide" },
      { id: "m22", title: "The Assembly Line", year: "1913", location: "Detroit, USA", impact: "Henry Ford made mass production possible. A car every 93 minutes.", image: IMG.assemblyLine, story: "Henry Ford's moving assembly line at Highland Park reduced the time to build a Model T from 12 hours to 93 minutes. The price dropped from $850 to $260, putting car ownership within reach of ordinary workers. Ford also doubled wages to $5 per day, creating consumer purchasing power. The assembly line concept spread to every industry, defining 20th-century manufacturing and enabling the modern consumer economy.", stat: "93", statLabel: "Minutes to build a Model T" },
      { id: "m23", title: "Marie Curie & Radioactivity", year: "1898 – 1934", location: "Paris, France", impact: "She discovered two elements. Won two Nobel Prizes. Changed physics forever.", image: IMG.curie, story: "Marie Curie, the first woman to win a Nobel Prize and the only person to win in two different sciences (Physics 1903, Chemistry 1911), discovered polonium and radium. Her research on radioactivity — a term she coined — laid the groundwork for nuclear physics, cancer treatment, and medical imaging. She personally developed mobile X-ray units during World War I, saving countless soldiers' lives. She died from aplastic anaemia caused by her years of radiation exposure.", stat: "2", statLabel: "Nobel Prizes in different sciences" },
      { id: "m24", title: "The Polio Vaccine", year: "1955", location: "USA & Worldwide", impact: "Jonas Salk refused to patent it. 'Could you patent the sun?'", image: IMG.polioVaccine, story: "Jonas Salk's inactivated polio vaccine, announced safe and effective on April 12, 1955, was one of the greatest medical triumphs of the 20th century. At its peak, polio paralysed over 35,000 Americans annually. Salk refused to patent the vaccine, foregoing an estimated $7 billion in personal royalties. Combined with Albert Sabin's oral vaccine, polio cases have been reduced by 99.9% worldwide — from 350,000 annual cases in 1988 to fewer than 100 today.", stat: "99.9%", statLabel: "Reduction in polio cases" },
      { id: "m25", title: "The Hubble Space Telescope", year: "1990 – Present", location: "Low Earth Orbit", impact: "One telescope that rewrote our understanding of the cosmos.", image: IMG.hubble, story: "Launched in 1990, the Hubble Space Telescope has made over 1.5 million observations, peering 13.4 billion light-years into the past. Its Deep Field images revealed that the observable universe contains at least 200 billion galaxies. Hubble proved the universe's expansion is accelerating, refined the age of the universe to 13.8 billion years, and captured images of stellar nurseries, dying stars, and colliding galaxies that have become icons of human curiosity.", stat: "1.5M", statLabel: "Observations made" },
      { id: "m26", title: "The Panama Canal", year: "1914", location: "Panama", impact: "An 82-km cut through a continent. The Atlantic met the Pacific.", image: IMG.panamaCanal, story: "The Panama Canal, completed in 1914 after a decade of construction, cut 82 kilometres through the Continental Divide, eliminating the 12,000-kilometre voyage around Cape Horn. It required excavating 200 million cubic metres of earth, employed 75,000 workers, and conquered yellow fever and malaria through pioneering public health measures. Over 14,000 ships transit the canal annually, carrying 5% of world trade.", stat: "14,000", statLabel: "Ships per year" },
    ],
  },
  {
    id: "spiritual",
    label: "Spiritual",
    period: "Timeless",
    color: "#7c3aed",
    bgGradient: "linear-gradient(180deg, #ffffff 0%, #faf8ff 30%, #f5f0ff 60%, #faf8ff 80%, #ffffff 100%)",
    icon: Sparkles,
    intro: "We explored the inner universe.",
    events: [
      { id: "s1", title: "Buddhism", year: "500 BCE", location: "India", impact: "Suffering has a cause. And a path beyond it.", image: IMG.buddhist, story: "Siddhartha Gautama's insights into the nature of suffering, impermanence, and liberation have guided over 500 million practitioners across 2,500 years. Buddhism's emphasis on meditation, compassion, and mindful awareness has influenced psychology, neuroscience, and global wellness movements.", stat: "500M+", statLabel: "Practitioners worldwide" },
      { id: "s2", title: "Hindu Philosophy", year: "1500 BCE", location: "India", impact: "The Upanishads asked: What is the self? Humanity never stopped asking.", image: IMG.hindu, story: "Hindu philosophy produced the Vedas, the Upanishads, and the Bhagavad Gita — among the oldest and most profound explorations of consciousness, duty, and the nature of reality. Concepts like karma, dharma, and moksha have shaped billions of lives and continue to influence global spiritual thought.", stat: "3,500+", statLabel: "Years of continuous tradition" },
      { id: "s3", title: "Taoism", year: "400 BCE", location: "China", impact: "The way that can be named is not the eternal way.", image: IMG.taoist, story: "Lao Tzu's Tao Te Ching — just 5,000 characters — became one of history's most translated texts. Taoism's emphasis on harmony with nature, wu wei (effortless action), and the balance of opposites has influenced art, medicine, martial arts, and environmental philosophy across millennia.", stat: "5,000", statLabel: "Characters in the Tao Te Ching" },
      { id: "s4", title: "Sufism", year: "800 CE", location: "Islamic World", impact: "Love is the whole thing. We are only pieces.", image: IMG.sufi, story: "Sufism — the mystical dimension of Islam — produced some of humanity's most transcendent poetry and practice. Rumi remains the best-selling poet in America, 750 years after his death. Sufi practices of dhikr, whirling, and heart-centred devotion offer a path of love beyond doctrine.", stat: "750+", statLabel: "Years of Rumi's influence" },
      { id: "s5", title: "Sacred Texts", year: "Timeless", location: "Every continent", impact: "Words that outlasted empires. Meaning that outlasts everything.", image: IMG.sacredText, story: "The Bible, Quran, Torah, Vedas, Pali Canon, Tao Te Ching, Guru Granth Sahib — sacred texts across traditions have guided billions of human lives. They encode moral frameworks, cosmological insights, and wisdom traditions that continue to shape law, art, philosophy, and daily life worldwide.", stat: "6B+", statLabel: "People guided by sacred texts" },
      { id: "s6", title: "Meditation Traditions", year: "1500 BCE – Present", location: "Worldwide", impact: "The mind can be trained. Neuroscience now agrees.", image: IMG.meditation, story: "From Vipassana to Zen to contemplative prayer — meditation traditions spanning millennia point to the same truth: sustained attention transforms consciousness. Modern neuroscience confirms measurable changes in brain structure after just 8 weeks of practice. Over 500 million people now meditate globally.", stat: "8", statLabel: "Weeks to change brain structure" },
      { id: "s7", title: "Yoga", year: "3000 BCE – Present", location: "India & Worldwide", impact: "Body and spirit, unified. 300 million practitioners and growing.", image: IMG.yoga, story: "Originating in the Indus Valley over 5,000 years ago, yoga has evolved from ascetic practice to global phenomenon. Its integration of breath, movement, and awareness reduces cortisol, improves immune function, and increases well-being — confirming what ancient practitioners intuited about the mind-body connection.", stat: "300M", statLabel: "Practitioners worldwide" },
      { id: "s8", title: "Modern Psychology", year: "1879 – Present", location: "Worldwide", impact: "The inner world, mapped with scientific rigour.", image: IMG.psychology, story: "From Freud's unconscious to Jung's archetypes to positive psychology and cognitive behavioural therapy — modern psychology has given humanity tools to understand and heal the mind. Therapy helps 75% of people who engage with it. Mental health awareness has become a global movement.", stat: "75%", statLabel: "Of therapy patients improve" },
      { id: "s9", title: "Consciousness Research", year: "1990 – Present", location: "Worldwide", impact: "Science is finally asking: What is awareness?", image: IMG.consciousness, story: "The 'hard problem of consciousness' — how subjective experience arises from matter — is now a frontier of neuroscience, philosophy, and physics. Researchers study meditation, psychedelics, and near-death experiences. The Integrated Information Theory and Global Workspace Theory represent our best attempts to understand awareness itself.", stat: "2020s", statLabel: "Decade of breakthrough research" },
      { id: "s10", title: "Personal Transformation", year: "1960 – Present", location: "Worldwide", impact: "The human potential movement proved: growth is a choice.", image: IMG.transformation, story: "From Maslow's hierarchy of needs to modern coaching, the personal transformation movement has touched millions. Practices combining ancient wisdom with modern science — breathwork, journaling, gratitude, and intentional living — demonstrate that human beings can consciously evolve their own psychology.", stat: "∞", statLabel: "Potential within each person" },
      { id: "s11", title: "Confucianism", year: "551 – 479 BCE", location: "China", impact: "The moral fabric of East Asian civilisation. Ethics as daily practice.", image: IMG.confucius, story: "Confucius taught that social harmony arises from personal virtue, filial piety, and ethical governance. His Analerta became the foundation of Chinese education for over 2,000 years. Confucian values — respect for elders, dedication to learning, and moral self-cultivation — shaped the cultures of China, Korea, Japan, and Vietnam, influencing over 1.5 billion people today.", stat: "2,000+", statLabel: "Years of influence" },
      { id: "s12", title: "Stoicism", year: "300 BCE – 200 CE", location: "Greece & Rome", impact: "Control what you can. Accept what you cannot. Endure with dignity.", image: IMG.stoic, story: "Founded by Zeno of Citium, Stoicism was practiced by emperors (Marcus Aurelius) and slaves (Epictetus) alike. Its principles — distinguishing what is within our control, finding equanimity amid chaos, and living according to virtue — have experienced a modern renaissance. Cognitive behavioural therapy draws directly from Stoic practices.", stat: "500", statLabel: "Years of ancient practice" },
      { id: "s13", title: "Interfaith Movements", year: "1893 – Present", location: "Worldwide", impact: "Different paths, shared mountain. Unity through understanding.", image: IMG.interfaith, story: "The 1893 Parliament of World's Religions in Chicago marked the first major interfaith dialogue. Since then, movements led by figures like Thomas Merton, Thich Nhat Hanh, and the Dalai Lama have built bridges between traditions. Modern interfaith efforts focus on shared ethics, conflict resolution, and the recognition that spiritual diversity enriches rather than divides humanity.", stat: "130+", statLabel: "Years of interfaith dialogue" },
      { id: "s14", title: "Indigenous Wisdom Traditions", year: "40,000+ years", location: "Every continent", impact: "The oldest knowledge systems on Earth. Still teaching us.", image: IMG.indigenous, story: "Indigenous cultures across Australia, the Americas, Africa, and the Pacific developed sophisticated ecological knowledge, oral histories, and ceremonial practices over tens of thousands of years. Aboriginal Australian Dreamtime stories encode 10,000+ years of geological history. Indigenous land management practices are now being integrated into modern conservation science.", stat: "40,000+", statLabel: "Years of accumulated wisdom" },
      { id: "s15", title: "Mindfulness Goes Global", year: "1970s – Present", location: "Worldwide", impact: "Eastern practice meets Western science. A global wellness revolution.", image: IMG.mindfulWest, story: "Jon Kabat-Zinn's Mindfulness-Based Stress Reduction (MBSR) programme, launched in 1979, brought meditation into hospitals and clinics. By 2025, mindfulness is taught in schools, militaries, corporations, and prisons worldwide. Over 6,000 peer-reviewed studies confirm its benefits for anxiety, depression, chronic pain, and cognitive performance.", stat: "6,000+", statLabel: "Peer-reviewed studies" },
      { id: "s16", title: "Jewish Mysticism & Kabbalah", year: "1200 CE – Present", location: "Spain, Israel, Global", impact: "The hidden architecture of creation. Wisdom encoded in symbol.", image: IMG.kabbalah, story: "The Zohar, composed in 13th-century Spain, became the foundational text of Kabbalah — the mystical tradition within Judaism. Kabbalah's Tree of Life maps ten divine attributes (sefirot) through which the infinite interacts with the finite. Its influence extends far beyond Judaism into Renaissance philosophy, Christian mysticism, modern psychology, and contemporary spirituality. Kabbalistic ideas about the nature of consciousness and reality resonate with modern physics.", stat: "10", statLabel: "Sefirot on the Tree of Life" },
      { id: "s17", title: "The Bhagavad Gita", year: "~200 BCE", location: "India", impact: "700 verses on duty, devotion, and the nature of the self.", image: IMG.gita, story: "Set on a battlefield where the warrior Arjuna faces a moral crisis, the Bhagavad Gita is a dialogue between the human and the divine. Its teachings on selfless action (karma yoga), devotion (bhakti yoga), and knowledge (jnana yoga) have guided hundreds of millions of lives. Gandhi called it his 'spiritual dictionary.' Oppenheimer quoted it at the Trinity test. Its influence transcends any single tradition.", stat: "700", statLabel: "Verses of timeless wisdom" },
      { id: "s18", title: "Zen Buddhism", year: "6th century CE – Present", location: "China, Japan, Global", impact: "Direct pointing at the mind. Simplicity as the highest art.", image: IMG.zenGarden, story: "Zen emerged when Buddhism met Chinese Taoism, emphasising direct experience over scriptural study. Its practices — zazen (sitting meditation), koans (paradoxical questions), and mindful attention to every action — influenced Japanese aesthetics, martial arts, garden design, and architecture. In the 20th century, teachers like D.T. Suzuki and Shunryu Suzuki brought Zen to the West, profoundly influencing art, psychotherapy, and Silicon Valley's design philosophy.", stat: "1,500", statLabel: "Years of Zen practice" },
      { id: "s19", title: "Contemplative Christianity", year: "3rd century CE – Present", location: "Egypt, Europe, Global", impact: "The Desert Fathers went into silence. Mystics found God within.", image: IMG.contemplative, story: "Beginning with the Desert Fathers and Mothers of 3rd-century Egypt, contemplative Christianity developed rich traditions of inner prayer. Meister Eckhart explored the divine spark within the soul. Teresa of Ávila mapped interior stages of prayer. Thomas Merton bridged East and West. The practice of centering prayer and lectio divina continues to offer millions a path of silence, surrender, and direct encounter with the sacred.", stat: "1,700+", statLabel: "Years of contemplative practice" },
      { id: "s20", title: "Ubuntu Philosophy", year: "Ancient – Present", location: "Sub-Saharan Africa", impact: "'I am because we are.' The philosophy that built communities.", image: IMG.ubuntu, story: "Ubuntu — a Nguni Bantu concept meaning 'I am because we are' — encapsulates African communal philosophy. It holds that individual identity is inseparable from community belonging. Archbishop Desmond Tutu used Ubuntu as the moral foundation of South Africa's Truth and Reconciliation Commission. Ubuntu's emphasis on interconnectedness, restorative justice, and shared humanity offers a vital counterbalance to Western individualism.", stat: "∞", statLabel: "Reach of communal wisdom" },
      { id: "s21", title: "Sikhism", year: "1469 – Present", location: "Punjab, India & Global", impact: "Equality before God. Community service as the highest devotion.", image: IMG.sikhism, story: "Founded by Guru Nanak in 1469, Sikhism emerged as a radical movement of spiritual equality — rejecting caste, gender discrimination, and religious hierarchy. The ten Sikh Gurus built a tradition centred on honest work, sharing with others, and devotion to one God. The langar (free communal kitchen) at the Golden Temple in Amritsar serves over 100,000 free meals daily to anyone regardless of religion, caste, or status — the largest free kitchen in the world.", stat: "100,000", statLabel: "Free meals served daily at Harmandir Sahib" },
      { id: "s22", title: "The Axial Age", year: "800 – 200 BCE", location: "Greece, China, India, Persia, Israel", impact: "The age when humanity learned to think about thinking.", image: IMG.axialAge, story: "Philosopher Karl Jaspers identified the period between 800 and 200 BCE as the Axial Age — a remarkable convergence when, independently and without contact, Socrates questioned assumptions in Athens, the Buddha taught liberation in India, Confucius codified ethics in China, Zoroaster preached moral dualism in Persia, and the Hebrew prophets demanded social justice in Israel. This era produced the foundational ethical and philosophical frameworks that still guide most of humanity.", stat: "600", statLabel: "Years that transformed human thought" },
      { id: "s23", title: "The Bahá'í Faith", year: "1863 – Present", location: "Persia (Iran) & Global", impact: "The oneness of humanity. Unity as the defining spiritual principle.", image: IMG.bahai, story: "Founded by Bahá'u'lláh in 1863, the Bahá'í Faith teaches the essential unity of all religions and all people. It advocates for the elimination of all forms of prejudice, universal education, the harmony of science and religion, and the equality of women and men. With followers in over 200 countries and territories, and its Lotus Temple in Delhi receiving over 100 million visitors, the Bahá'í Faith is one of the fastest-growing religions globally.", stat: "200+", statLabel: "Countries and territories" },
      { id: "s24", title: "Psychedelic-Assisted Therapy", year: "1950s – Present", location: "Worldwide", impact: "Forbidden compounds, reconsidered. Consciousness research, renewed.", image: IMG.psychedelicRes, story: "After decades of prohibition following promising 1950s–60s research, psychedelic-assisted therapy is experiencing a scientific renaissance. Clinical trials at Johns Hopkins, Imperial College London, and NYU demonstrate that psilocybin combined with therapy produces remission in 67% of treatment-resistant depression patients. MDMA-assisted therapy shows 71% remission for severe PTSD. These substances appear to work by temporarily dissolving rigid patterns of thought, allowing profound psychological restructuring.", stat: "67%", statLabel: "Depression remission in trials" },
      { id: "s25", title: "Engaged Buddhism", year: "1960s – Present", location: "Vietnam & Global", impact: "Meditation meets social action. Inner peace demands outer justice.", image: IMG.engagedBuddhism, story: "Thich Nhat Hanh, the Vietnamese Zen master who coined the term 'Engaged Buddhism,' taught that true mindfulness naturally leads to compassionate action. During the Vietnam War, he organised peace delegations, rescued boat people, and rebuilt bombed villages. Martin Luther King Jr. nominated him for the Nobel Peace Prize in 1967. His Plum Village community became a model for mindful living, and his books — selling over 5 million copies — made Buddhist practice accessible to millions worldwide.", stat: "5M+", statLabel: "Books sold worldwide" },
    ],
  },
  {
    id: "digital",
    label: "Digital",
    period: "1990 – Present",
    color: "#0369a1",
    bgGradient: "linear-gradient(180deg, #ffffff 0%, #f0f8ff 30%, #e6f2ff 60%, #f0f8ff 80%, #ffffff 100%)",
    icon: Cpu,
    intro: "We built a nervous system for the planet.",
    events: [
      { id: "dg1", title: "The World Wide Web", year: "1991", location: "CERN, Switzerland", impact: "Tim Berners-Lee gave the world a gift. He never patented it.", image: IMG.www, story: "The World Wide Web transformed the internet from a research tool into humanity's shared knowledge space. Berners-Lee deliberately kept it open and free. By 2025, there are over 1.9 billion websites. The web made information — once hoarded by institutions — universally accessible.", stat: "1.9B", statLabel: "Websites" },
      { id: "dg2", title: "Search Engines", year: "1998", location: "Stanford, USA", impact: "All of human knowledge, one query away.", image: IMG.server, story: "Google processes 8.5 billion searches daily — more questions in a day than all the libraries in history answered in a century. Search engines democratised access to information, making expertise available to anyone with a connection. Knowledge stopped being a privilege.", stat: "8.5B", statLabel: "Daily Google searches" },
      { id: "dg3", title: "Social Media", year: "2004 – Present", location: "Global", impact: "3 billion people sharing, connecting, debating, creating.", image: IMG.social, story: "Social media connected 4.9 billion people — 60% of humanity. It amplified voices, toppled governments, launched movements, and created entirely new forms of community. Its challenges are real, but so is its unprecedented power to connect human beings across every boundary.", stat: "4.9B", statLabel: "Social media users" },
      { id: "dg4", title: "Open Source Movement", year: "1991 – Present", location: "Global", impact: "Collaboration without permission. Code as commons.", image: IMG.openSource, story: "Linux, Wikipedia, Mozilla, Git — the open source movement proved that global collaboration without central control could produce world-class technology. Over 100 million developers contribute to open source. It powers 96% of servers and runs the infrastructure of modern civilisation.", stat: "100M+", statLabel: "Open source developers" },
      { id: "dg5", title: "Cloud Computing", year: "2006 – Present", location: "Global", impact: "Infinite computing power, rented by the second.", image: IMG.cloud, story: "Amazon Web Services launched in 2006. By 2025, cloud computing generates over $600 billion annually. It gave startups the infrastructure of corporations and enabled AI, streaming, remote work, and global collaboration at scales previously impossible.", stat: "$600B+", statLabel: "Annual cloud revenue" },
      { id: "dg6", title: "Remote Work Revolution", year: "2020 – Present", location: "Global", impact: "Work left the office. Talent left geography.", image: IMG.remote, story: "The pandemic accelerated a shift decades in the making. By 2025, 35% of knowledge workers work remotely. Companies hire globally. Workers live anywhere. The separation of work from place is one of the most significant social transformations of the 21st century.", stat: "35%", statLabel: "Remote knowledge workers" },
      { id: "dg7", title: "Creator Economy", year: "2010 – Present", location: "Global", impact: "Anyone with a voice can build an audience. Gatekeepers dissolved.", image: IMG.creator, story: "Over 200 million people now identify as content creators. YouTube, TikTok, Substack, and podcasting platforms enabled individuals to build media empires from bedrooms. The creator economy is worth over $250 billion — proof that talent no longer needs permission.", stat: "200M+", statLabel: "Content creators" },
      { id: "dg8", title: "Blockchain & Trust", year: "2009 – Present", location: "Global", impact: "Trust without institutions. Verification without authority.", image: IMG.blockchain, story: "Bitcoin's blockchain introduced a revolutionary concept: decentralised trust. Smart contracts, DeFi, and token systems now enable transparent transactions without intermediaries. Whatever the future of specific currencies, the underlying principle of trustless verification will reshape finance, law, and governance.", stat: "2009", statLabel: "Bitcoin's genesis block" },
      { id: "dg9", title: "AI Systems", year: "2012 – Present", location: "Global", impact: "Machines that learn. The most powerful tool humanity has ever built.", image: IMG.ai, story: "Deep learning's breakthrough in 2012 launched an acceleration that produced GPT, AlphaFold, DALL-E, and autonomous systems. AI now writes, codes, diagnoses diseases, discovers drugs, and creates art. It represents both humanity's greatest tool and its most complex responsibility.", stat: "2025", statLabel: "Year AI surpassed many human benchmarks" },
      { id: "dg10", title: "Knowledge Democratisation", year: "2001 – Present", location: "Global", impact: "Wikipedia. Khan Academy. MOOCs. Education, unchained.", image: IMG.knowledge, story: "Wikipedia contains 60 million articles in 300+ languages — all free. Khan Academy reaches 150 million learners. Coursera, edX, and YouTube have made world-class education accessible to anyone with internet. The greatest equaliser in history is an open browser tab.", stat: "60M", statLabel: "Wikipedia articles" },
      { id: "dg11", title: "Personal Computing", year: "1977 – 1995", location: "USA & Global", impact: "The computer left the lab and entered every home.", image: IMG.personalPC, story: "The Apple II (1977), IBM PC (1981), and Macintosh (1984) brought computing to the masses. By 1995, 100 million PCs were in homes worldwide. Personal computing democratised creation: anyone could write, design, calculate, and communicate. It was the foundation on which the entire digital revolution was built.", stat: "100M", statLabel: "PCs in homes by 1995" },
      { id: "dg12", title: "The Mobile Revolution", year: "1983 – Present", location: "Global", impact: "From brick phones to pocket supercomputers in one generation.", image: IMG.mobileEvo, story: "Martin Cooper made the first mobile phone call in 1973. The first commercial cell phone (DynaTAC) weighed 2 pounds and cost $3,995 in 1983. Today, 5.6 billion people carry smartphones with more power than 1990s supercomputers. Mobile connectivity has leapfrogged infrastructure in developing nations, bringing banking, education, and healthcare to billions.", stat: "5.6B", statLabel: "Mobile subscribers worldwide" },
      { id: "dg13", title: "Streaming & Digital Media", year: "2007 – Present", location: "Global", impact: "The album, the channel, and the theatre — all became apps.", image: IMG.streaming, story: "Netflix shifted from mail-order DVDs to streaming in 2007. Spotify launched in 2008. By 2025, streaming dominates music (600M+ subscribers), video (1.8B+ subscribers), and gaming. The shift from ownership to access transformed entertainment economics and gave creators direct-to-audience distribution channels.", stat: "1.8B+", statLabel: "Video streaming subscribers" },
      { id: "dg14", title: "Cybersecurity & Privacy", year: "1988 – Present", location: "Global", impact: "Every digital advance created new vulnerabilities to defend.", image: IMG.cybersec, story: "The Morris Worm (1988) was the first major internet attack. Since then, cybersecurity has become a $200 billion industry defending against state-sponsored hacking, ransomware, and data breaches. Privacy debates — from encryption to surveillance to GDPR — reflect the tension between security and freedom in the digital age.", stat: "$200B+", statLabel: "Annual cybersecurity industry" },
      { id: "dg15", title: "E-Commerce Revolution", year: "1995 – Present", location: "Global", impact: "Shopping left the mall. The global marketplace fit on a screen.", image: IMG.ecommerce, story: "Amazon and eBay launched in 1995. By 2025, global e-commerce exceeds $6 trillion annually. Alibaba's Singles' Day generates more revenue in 24 hours than Black Friday and Cyber Monday combined. E-commerce removed geographic barriers, enabled micro-entrepreneurs, and fundamentally restructured retail economics worldwide.", stat: "$6T+", statLabel: "Annual e-commerce revenue" },
      { id: "dg16", title: "Digital Health & Telemedicine", year: "2015 – Present", location: "Global", impact: "Healthcare crossed the screen. Doctors visit you, not the other way around.", image: IMG.telehealth, story: "Telemedicine usage surged 38× during the COVID-19 pandemic. By 2025, over 350 million telehealth consultations occur annually. AI-powered diagnostics can detect diabetic retinopathy, skin cancer, and cardiac arrhythmias with accuracy matching or exceeding specialists. Wearable devices monitor heart rhythm, blood oxygen, and sleep continuously — shifting healthcare from reactive treatment to proactive prevention.", stat: "38×", statLabel: "Telemedicine surge during pandemic" },
      { id: "dg17", title: "3D Printing Revolution", year: "2010 – Present", location: "Global", impact: "From digital file to physical object. Manufacturing democratised.", image: IMG.printing3d, story: "3D printing evolved from prototyping tool to manufacturing revolution. Today, it produces aerospace components, custom prosthetics, dental implants, and even concrete houses. In 2024, a 3D-printed rocket reached orbit. Bioprinters are creating human tissue for transplantation research. The technology promises to localise production, reduce waste, and make custom manufacturing available to everyone.", stat: "$44B", statLabel: "3D printing market by 2025" },
      { id: "dg18", title: "Crowdfunding & Democratised Capital", year: "2009 – Present", location: "Global", impact: "The crowd became the bank. Ideas fund themselves.", image: IMG.crowdfund, story: "Kickstarter, Indiegogo, and GoFundMe transformed how ideas get funded. Over $50 billion has been raised through crowdfunding platforms worldwide. The Pebble smartwatch raised $10 million from 68,000 backers. Crowdfunding has launched films, medical treatments, community projects, and hardware companies — proving that collective belief can replace institutional gatekeepers.", stat: "$50B+", statLabel: "Total crowdfunded worldwide" },
      { id: "dg19", title: "The Internet of Things", year: "2010 – Present", location: "Global", impact: "30 billion connected devices. The physical world became programmable.", image: IMG.iot, story: "By 2025, over 30 billion devices are connected to the internet — from thermostats and refrigerators to industrial sensors and city infrastructure. Smart agriculture uses soil sensors to reduce water usage by 30%. Connected medical devices monitor patients remotely. Smart grids optimise energy distribution. The IoT is creating a digital nervous system for the physical world.", stat: "30B+", statLabel: "Connected devices worldwide" },
      { id: "dg20", title: "Digital Mapping & Location", year: "2005 – Present", location: "Global", impact: "Google Maps changed how 1 billion people navigate the world.", image: IMG.gps, story: "Google Maps launched in 2005 and now serves over 1 billion monthly users across 220 countries. Street View has photographed 10 million miles of roads. Digital mapping powers ride-sharing, food delivery, autonomous vehicles, disaster response, and urban planning. It has made geographic knowledge — once the domain of cartographers — instantly available to everyone with a phone.", stat: "1B+", statLabel: "Monthly Google Maps users" },
      { id: "dg21", title: "WiFi & Wireless Connectivity", year: "1997 – Present", location: "Global", impact: "The invisible thread that untethered the internet.", image: IMG.wifi, story: "The IEEE 802.11 standard, released in 1997, created the foundation for WiFi. By 2025, there are over 18 billion WiFi-enabled devices worldwide. WiFi freed computing from cables, enabling laptops, smartphones, and IoT devices to connect anywhere. Each generation has dramatically improved: from 2 Mbps in 1997 to WiFi 7's theoretical 46 Gbps. Free WiFi in cafés, airports, and public spaces transformed where and how people work, learn, and create.", stat: "18B", statLabel: "WiFi-enabled devices worldwide" },
      { id: "dg22", title: "Video Conferencing Revolution", year: "2003 – Present", location: "Global", impact: "Face-to-face meetings, without leaving home. Geography, dissolved.", image: IMG.videoConf, story: "Skype launched in 2003, Zoom in 2012. When the pandemic struck in 2020, Zoom's daily participants surged from 10 million to 300 million in three months. By 2025, video conferencing is embedded in business, education, healthcare, and personal relationships. Remote court proceedings, telehealth consultations, and virtual classrooms became permanent features of modern life. The technology saved an estimated 11 billion tonnes of CO₂ by reducing business travel.", stat: "300M", statLabel: "Daily Zoom participants at peak" },
      { id: "dg23", title: "Fintech & Digital Payments", year: "2009 – Present", location: "Global", impact: "Cash faded. Payment became instant, frictionless, and global.", image: IMG.fintech, story: "From M-Pesa bringing mobile banking to rural Kenya in 2007, to Apple Pay and Alipay processing billions of contactless transactions, fintech has transformed global finance. India's UPI system processes over 10 billion transactions monthly. Stripe and Square enabled any small business to accept digital payments. In Sweden, cash now accounts for less than 1% of all transactions. Financial technology is bringing banking services to 1.4 billion previously unbanked adults worldwide.", stat: "10B", statLabel: "Monthly UPI transactions in India" },
      { id: "dg24", title: "The Podcast & Audio Revolution", year: "2004 – Present", location: "Global", impact: "Long-form conversation found its medium. 500 million listeners.", image: IMG.podcast, story: "The term 'podcast' was coined in 2004. By 2025, there are over 4 million podcasts and 500 million listeners worldwide. Podcasting democratised broadcasting — anyone with a microphone could reach a global audience. Shows like Serial, Joe Rogan Experience, and The Daily proved that long-form audio thrives in the attention economy. Podcast advertising revenue exceeds $4 billion annually, creating a new media industry built entirely on voice and story.", stat: "500M", statLabel: "Podcast listeners worldwide" },
      { id: "dg25", title: "EdTech & Online Learning", year: "2012 – Present", location: "Global", impact: "A Stanford lecture for everyone. Education left the ivory tower.", image: IMG.edtech, story: "When Stanford offered free online courses in 2011, 160,000 students enrolled — more than the university had taught in its entire 120-year history. Coursera, edX, and Udemy now serve over 300 million learners. Duolingo teaches 50 languages to 80 million monthly users. India's BYJU'S and China's Zuoyebang brought personalised learning to hundreds of millions. The pandemic accelerated adoption: UNESCO reported 1.6 billion students learning online simultaneously at peak.", stat: "1.6B", statLabel: "Students online simultaneously at pandemic peak" },
    ],
  },
  {
    id: "future",
    label: "Future Horizon",
    period: "Next 100+ Years",
    color: "#059669",
    bgGradient: "linear-gradient(180deg, #ffffff 0%, #f0fdf8 30%, #e6faf0 60%, #f0fdf8 80%, #ffffff 100%)",
    icon: Telescope,
    intro: "We are just getting started.",
    events: [
      { id: "f1", title: "Mars Settlement", year: "2030s – 2050s", location: "Mars", impact: "Humanity becomes a multi-planetary species.", image: IMG.mars, story: "SpaceX, NASA, and international partners are working toward permanent human presence on Mars. The first crewed missions are planned for the 2030s. Challenges of radiation, gravity, and isolation are immense — but so was crossing the Atlantic. Mars represents the next frontier of human resilience.", stat: "2030s", statLabel: "First crewed missions planned" },
      { id: "f2", title: "Longevity Science", year: "2020s – 2060s", location: "Worldwide", impact: "Not immortality. Healthy decades, added to every life.", image: IMG.dna, story: "Senolytics, gene therapy, and metabolic reprogramming are extending healthy lifespan in animal models by 25-40%. Human trials are accelerating. The goal isn't immortality — it's eliminating the decades of decline. Healthy 100-year lifespans may become normal within a generation.", stat: "25-40%", statLabel: "Lifespan extension in trials" },
      { id: "f3", title: "Brain-Computer Interfaces", year: "2020s – 2040s", location: "Worldwide", impact: "Thought becomes interface. The keyboard becomes optional.", image: IMG.brainInterface, story: "Neuralink and competitors are developing implants that allow paralysed patients to control computers with thought alone. Future applications include memory enhancement, direct brain-to-brain communication, and new forms of creative expression. The boundary between mind and machine is dissolving.", stat: "2024", statLabel: "First human BCI implant" },
      { id: "f4", title: "Quantum Computing", year: "2019 – 2040s", location: "Worldwide", impact: "Problems that would take millennia, solved in minutes.", image: IMG.quantum, story: "Google achieved quantum supremacy in 2019 — solving in 200 seconds what would take classical computers 10,000 years. Quantum computing will transform drug discovery, materials science, cryptography, and climate modelling. It represents a fundamentally new relationship with computation.", stat: "200s", statLabel: "vs 10,000 years classical" },
      { id: "f5", title: "Climate Restoration", year: "2020s – 2100", location: "Worldwide", impact: "Not just mitigation. Active healing of the planet.", image: IMG.climate, story: "Direct air capture, enhanced weathering, ocean alkalinity, and massive reforestation are moving from theory to deployment. Carbon removal capacity is doubling annually. Combined with renewable energy's exponential growth, the tools to restore Earth's climate are emerging — if deployed with urgency.", stat: "2×", statLabel: "Annual carbon capture growth" },
      { id: "f6", title: "Fusion Energy", year: "2022 – 2040s", location: "Worldwide", impact: "The power of the sun. Clean, limitless, on Earth.", image: IMG.fusion, story: "In December 2022, the National Ignition Facility achieved fusion ignition — more energy out than in. Commercial fusion reactors are now in development. If achieved, fusion would provide virtually limitless clean energy — solving climate change and powering human civilisation for millennia.", stat: "2022", statLabel: "Year of first fusion ignition" },
      { id: "f7", title: "Deep Ocean Exploration", year: "2020s – 2080s", location: "Earth's Oceans", impact: "We've mapped more of Mars than our own ocean floor.", image: IMG.ocean, story: "Only 5% of Earth's ocean floor has been explored in detail. Autonomous submersibles, deep-sea habitats, and bio-inspired engineering are opening the final frontier on our own planet. The ocean contains unknown species, mineral resources, and scientific insights that could transform medicine and materials science.", stat: "95%", statLabel: "Of the ocean floor unexplored" },
      { id: "f8", title: "Human-AI Symbiosis", year: "2025 – 2060s", location: "Worldwide", impact: "Not replacement. Partnership. Human creativity amplified.", image: IMG.ethical, story: "The future of AI is not machines replacing humans — it's humans and AI creating together. AI handles pattern recognition, data synthesis, and routine cognition. Humans provide meaning, ethics, creativity, and judgment. The result is a new kind of intelligence — greater than either alone.", stat: "∞", statLabel: "Combined potential" },
      { id: "f9", title: "Conscious Evolution", year: "Now – Forever", location: "Within", impact: "The greatest frontier is not out there. It's in here.", image: IMG.evolution, story: "For the first time in history, humans have the tools, knowledge, and freedom to consciously choose their own evolution — psychological, spiritual, and social. Meditation, therapy, education, and community can accelerate human development intentionally. The question is no longer what we can do. It's who we choose to become.", stat: "Now", statLabel: "The only moment that matters" },
      { id: "f10", title: "Human Augmentation", year: "2020s – 2050s", location: "Worldwide", impact: "Beyond healing — enhancing what it means to be human.", image: IMG.augmentation, story: "Bionic limbs now provide superhuman grip strength. Cochlear implants restore hearing to the deaf. Exoskeletons enable paralysed people to walk. The next frontier includes retinal implants for enhanced vision, AI-powered prosthetics with sensory feedback, and cognitive augmentation. The line between restoration and enhancement is blurring — raising profound questions about equality and identity.", stat: "2030s", statLabel: "Decade of mainstream augmentation" },
      { id: "f11", title: "Space Beyond the Moon", year: "2025 – 2080s", location: "Solar System", impact: "Asteroids. Jupiter's moons. Humanity reaches for the outer planets.", image: IMG.asteroid, story: "NASA's DART mission successfully redirected an asteroid in 2022 — our first planetary defence test. The Artemis programme is returning humans to the Moon as a stepping stone to Mars. Japan's Hayabusa2 returned asteroid samples. Europa Clipper will search for life on Jupiter's moon. Humanity is becoming a solar-system species.", stat: "2022", statLabel: "First successful asteroid redirect" },
      { id: "f12", title: "Autonomous Transportation", year: "2016 – 2040s", location: "Worldwide", impact: "Cars that drive themselves. Cities redesigned around people, not parking.", image: IMG.autonomous, story: "Waymo launched the first commercial autonomous taxi service in 2020. By 2025, autonomous vehicles operate in dozens of cities worldwide. The technology promises to eliminate 94% of traffic fatalities caused by human error, reduce commute times, and reclaim millions of acres currently used for parking. Urban planning is being fundamentally reimagined.", stat: "94%", statLabel: "Of crashes caused by human error" },
      { id: "f13", title: "Energy Storage Revolution", year: "2010 – 2040s", location: "Worldwide", impact: "Batteries that make renewable energy work 24/7.", image: IMG.energyStore, story: "Battery costs have fallen 97% since 1991. Tesla's Megapacks and competitors now store gigawatt-hours of grid-scale energy. Solid-state batteries promise double the density of lithium-ion. Iron-air batteries offer 100-hour storage at a fraction of the cost. Affordable energy storage is the missing piece that makes 100% renewable grids possible.", stat: "97%", statLabel: "Battery cost reduction since 1991" },
      { id: "f14", title: "Precision Gene Editing", year: "2012 – 2040s", location: "Worldwide", impact: "CRISPR: the ability to rewrite the code of life itself.", image: IMG.genomeEdit, story: "CRISPR-Cas9, developed by Jennifer Doudna and Emmanuelle Charpentier, won the 2020 Nobel Prize and opened an era of precision medicine. In 2023, the first CRISPR therapy (Casgevy) was approved for sickle cell disease. Gene editing promises cures for thousands of genetic disorders, disease-resistant crops, and even the de-extinction of lost species.", stat: "2023", statLabel: "First approved CRISPR therapy" },
      { id: "f15", title: "Vertical Farming", year: "2020s – 2050s", location: "Worldwide", impact: "Farms that grow upward. Agriculture freed from weather and soil.", image: IMG.verticalFarm, story: "Vertical farms use 95% less water than traditional agriculture and can produce crops year-round regardless of climate. LED-lit hydroponic facilities grow lettuce in 30 days versus 60 in fields. By 2025, the vertical farming market exceeds $7 billion. As populations urbanise and arable land shrinks, vertical farming offers a path to food security that doesn't require deforestation or long-distance transport.", stat: "95%", statLabel: "Less water than traditional farming" },
      { id: "f16", title: "Commercial Space Tourism", year: "2021 – 2040s", location: "Low Earth Orbit & Beyond", impact: "Space is no longer just for astronauts. The overview effect, democratised.", image: IMG.spaceTourism, story: "In 2021, Blue Origin, SpaceX, and Virgin Galactic each launched civilian passengers to space. SpaceX's Inspiration4 mission sent an all-civilian crew to orbit for three days. By 2025, over 100 private citizens have experienced spaceflight. As costs decrease, space tourism promises to give thousands the 'overview effect' — the cognitive shift astronauts report upon seeing Earth from space.", stat: "100+", statLabel: "Private citizens in space" },
      { id: "f17", title: "Digital Twins", year: "2020s – 2050s", location: "Worldwide", impact: "Virtual replicas of physical systems. Simulate before you build.", image: IMG.digitalTwin, story: "Digital twins — real-time virtual replicas of physical systems — are transforming engineering, medicine, and urban planning. Singapore has a complete digital twin of the entire city. NASA uses digital twins to monitor spacecraft. Hospitals create digital twins of patient hearts to plan surgeries. By 2030, the digital twin market is projected to exceed $150 billion, enabling a world where every major system can be tested virtually before real-world deployment.", stat: "$150B", statLabel: "Projected market by 2030" },
      { id: "f18", title: "Nanotechnology", year: "2000s – 2050s", location: "Worldwide", impact: "Engineering at the scale of atoms. The smallest revolution.", image: IMG.nanotech, story: "Nanotechnology manipulates matter at the scale of 1–100 nanometres — where a human hair is 80,000 nm wide. Nanoparticles already deliver cancer drugs directly to tumour cells, reducing side effects. Nanomaterials create self-cleaning surfaces, more efficient solar cells, and water purification membranes. Carbon nanotubes are 100× stronger than steel at one-sixth the weight. The nano-revolution is quietly reshaping medicine, materials science, and energy.", stat: "1–100", statLabel: "Nanometres — the working scale" },
      { id: "f19", title: "Rewilding & Ecosystem Restoration", year: "2020s – 2100", location: "Worldwide", impact: "Not just protecting nature. Actively bringing it back.", image: IMG.climate, story: "Rewilding — reintroducing keystone species and restoring degraded ecosystems — is gaining momentum globally. Wolves returned to Yellowstone transformed the park's rivers. The Great Green Wall project aims to restore 100 million hectares across Africa's Sahel. China has planted over 66 billion trees since 1978. The UN Decade on Ecosystem Restoration (2021–2030) has mobilised nations to restore 350 million hectares of degraded land worldwide.", stat: "350M", statLabel: "Hectares targeted for restoration" },
      { id: "f20", title: "Cellular Agriculture & Lab-Grown Meat", year: "2013 – 2040s", location: "Worldwide", impact: "Meat without slaughter. Food production, fundamentally reimagined.", image: IMG.labMeat, story: "The first lab-grown burger was produced in 2013 at a cost of $325,000. By 2025, cultivated meat companies have brought costs below $10 per pound and secured regulatory approval in Singapore, the US, and Israel. Traditional animal agriculture uses 77% of agricultural land while providing only 18% of calories. Cellular agriculture could produce equivalent protein using 95% less land and 78% less water, while eliminating the welfare concerns of factory farming.", stat: "95%", statLabel: "Less land than traditional farming" },
      { id: "f21", title: "Global Satellite Internet", year: "2019 – 2030s", location: "Low Earth Orbit & Global", impact: "Broadband for every corner of Earth. The digital divide, closing.", image: IMG.satelliteNet, story: "SpaceX's Starlink, with over 6,000 satellites in orbit by 2025, delivers high-speed internet to remote areas previously beyond the reach of terrestrial infrastructure. OneWeb, Amazon's Project Kuiper, and China's Guowang are building competing constellations. Satellite internet has connected schools in the Amazon rainforest, disaster relief operations, and rural communities across Africa and Asia. The goal of universal global broadband — connecting the remaining 2.6 billion unconnected people — is becoming technically achievable.", stat: "6,000+", statLabel: "Starlink satellites in orbit" },
      { id: "f22", title: "Synthetic Biology", year: "2010 – 2050s", location: "Worldwide", impact: "Biology, programmable. Life itself becomes a design medium.", image: IMG.synthBio, story: "Synthetic biology combines engineering principles with molecular biology to design and construct new biological systems. In 2010, Craig Venter created the first synthetic genome. By 2025, engineered microbes produce insulin, spider silk, sustainable aviation fuel, and biodegradable plastics. Synthetic biology is developing living medicines — engineered bacteria that detect and destroy cancer cells from within the body. The field is projected to contribute $30 trillion to the global economy by 2040.", stat: "$30T", statLabel: "Projected economic impact by 2040" },
      { id: "f23", title: "Universal Basic Income Experiments", year: "2017 – 2040s", location: "Worldwide", impact: "Rethinking the social contract. Security as a foundation for freedom.", image: IMG.ubi, story: "As automation reshapes economies, governments are testing universal basic income. Finland's 2017–2018 trial found recipients were happier, healthier, and more likely to find employment. Kenya's GiveDirectly experiment — the largest UBI study in history — provides 12 years of payments to 20,000 people, showing improved nutrition, business investment, and psychological wellbeing. Stockton, California's SEED programme found that full-time employment among recipients rose from 28% to 40%.", stat: "20,000", statLabel: "Recipients in Kenya's UBI trial" },
      { id: "f24", title: "Interstellar Exploration", year: "2016 – 2100+", location: "Beyond the Solar System", impact: "The stars are far. But we've already started reaching for them.", image: IMG.interstellar, story: "Breakthrough Starshot, announced in 2016 by Yuri Milner and Stephen Hawking, aims to send gram-scale spacecraft to Alpha Centauri at 20% the speed of light — arriving in approximately 20 years. NASA's Voyager 1, launched in 1977, entered interstellar space in 2012 and continues transmitting from 24 billion kilometres away. The James Webb Space Telescope is identifying potentially habitable exoplanets. Humanity's first steps toward the stars have already begun.", stat: "20%", statLabel: "Speed of light — Starshot's target" },
    ],
  },
];

// ─── Back Button ─────────────────────────────────────────────

function BackButton() {
  const navigate = useNavigate();
  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      onClick={() => navigate("/")}
      className="fixed top-5 left-5 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/80 backdrop-blur-xl border border-neutral-200/60 shadow-sm hover:bg-white hover:shadow-md transition-all duration-300 cursor-pointer group"
    >
      <ArrowLeft size={16} className="text-neutral-700 transition-transform duration-300 group-hover:-translate-x-0.5" />
      <span className="text-neutral-700" style={{ fontSize: "0.8125rem", fontWeight: 600 }}>Back</span>
    </motion.button>
  );
}

// ─── Era Pill Selector ───────────────────────────────────────

function EraPills({ activeEra, onSelect }: { activeEra: string; onSelect: (id: string) => void }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="fixed bottom-7 left-1/2 -translate-x-1/2 z-50 max-w-[90vw]"
    >
      <div
        ref={scrollRef}
        className="flex items-center gap-1 p-1 rounded-full bg-white/80 backdrop-blur-xl border border-neutral-200/60 shadow-sm overflow-x-auto"
        style={{ scrollbarWidth: "none" }}
      >
        {eras.map((era) => {
          const Icon = era.icon;
          const isActive = activeEra === era.id;
          return (
            <button
              key={era.id}
              onClick={() => onSelect(era.id)}
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full transition-all duration-300 cursor-pointer whitespace-nowrap flex-shrink-0 ${
                isActive ? "text-white" : "text-neutral-500 hover:text-neutral-800 hover:bg-neutral-100"
              }`}
              style={{
                fontSize: "0.75rem",
                fontWeight: isActive ? 600 : 500,
                backgroundColor: isActive ? era.color : undefined,
              }}
            >
              <Icon size={12} />
              <span className="hidden sm:inline">{era.label}</span>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}

// ─── Timeline Card ───────────────────────────────────────────

function TimelineCard({ event, eraColor, index, onOpen, isHighlighted }: { event: TimelineEvent; eraColor: string; index: number; onOpen: () => void; isHighlighted?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: Math.min(index * 0.08, 0.6) }}
      className="flex-shrink-0 w-[78vw] sm:w-[340px] lg:w-[360px] snap-center group"
      data-event-id={event.id}
    >
      <div
        onClick={onOpen}
        className={`relative bg-white rounded-2xl overflow-hidden border transition-all duration-500 hover:shadow-xl cursor-pointer h-full flex flex-col ${
          isHighlighted ? "border-[#D4A017] shadow-lg ring-2 ring-[#D4A017]/30 scale-[1.02]" : "border-neutral-100 hover:border-neutral-200"
        }`}
      >
        <div className="relative h-48 sm:h-52 overflow-hidden">
          <ImageWithFallback src={event.image} alt={event.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
          <div className="absolute top-3 left-3">
            <span
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full backdrop-blur-md border border-white/20 text-white"
              style={{ fontSize: "0.6875rem", fontWeight: 600, backgroundColor: `${eraColor}90` }}
            >
              <Calendar size={10} />
              {event.year}
            </span>
          </div>
          <div className="absolute bottom-3 right-3 text-right">
            <div className="text-white" style={{ fontSize: "1.25rem", fontWeight: 800, lineHeight: 1.1 }}>{event.stat}</div>
            <div className="text-white/60" style={{ fontSize: "0.5625rem", fontWeight: 500 }}>{event.statLabel}</div>
          </div>
        </div>
        <div className="p-4 sm:p-5 flex flex-col flex-1">
          <div className="flex items-center gap-1.5 mb-1.5" style={{ color: "#94a3b8" }}>
            <MapPin size={10} />
            <span style={{ fontSize: "0.6875rem", fontWeight: 500 }}>{event.location}</span>
          </div>
          <h3 className="text-[#0f172a] mb-1.5" style={{ fontSize: "1.0625rem", fontWeight: 800 }}>{event.title}</h3>
          <p className="flex-1" style={{ fontSize: "0.8125rem", fontWeight: 400, lineHeight: 1.6, color: "#64748b" }}>{event.impact}</p>
          <div className="mt-3 flex items-center gap-1.5 text-neutral-400 group-hover:text-neutral-700 transition-colors duration-300">
            <span style={{ fontSize: "0.75rem", fontWeight: 600 }}>Read the story</span>
            <TrendingUp size={12} className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Detail Modal ─────────────────────────────────────────────

function DetailModal({
  event,
  eraColor,
  onClose,
}: {
  event: TimelineEvent;
  eraColor: string;
  onClose: () => void;
}) {
  // Lock scroll & escape key
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [onClose]);

  // Prevent backdrop click from firing instantly on the same frame as open
  const [ready, setReady] = useState(false);
  useEffect(() => { const t = requestAnimationFrame(() => setReady(true)); return () => cancelAnimationFrame(t); }, []);

  return (
    <motion.div
      key="detail-modal-root"
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ padding: 16 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      {/* Backdrop — soft 25% dim */}
      <div
        className="absolute inset-0 bg-black/25"
        onClick={ready ? onClose : undefined}
      />

      {/* Modal panel */}
      <motion.div
        initial={{ scale: 0.92, y: 30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: 20, opacity: 0 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 bg-white rounded-2xl overflow-hidden flex flex-col w-full max-w-2xl"
        style={{
          maxHeight: "min(90vh, 780px)",
          boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-30 w-10 h-10 rounded-full bg-black/40 backdrop-blur-xl flex items-center justify-center hover:bg-black/60 transition-colors duration-200 cursor-pointer"
          aria-label="Close"
        >
          <X size={18} className="text-white" strokeWidth={2.5} />
        </button>

        {/* Scrollable content */}
        <div className="overflow-y-auto flex-1 overscroll-contain" style={{ scrollbarWidth: "thin" }}>
          {/* Hero image */}
          <div className="relative w-full h-56 sm:h-72 flex-shrink-0">
            <ImageWithFallback
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
            <div className="absolute bottom-4 left-5 right-14">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full backdrop-blur-md border border-white/20 text-white"
                  style={{ fontSize: "0.75rem", fontWeight: 600, backgroundColor: `${eraColor}88` }}
                >
                  <Calendar size={11} />
                  {event.year}
                </span>
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white"
                  style={{ fontSize: "0.75rem", fontWeight: 500 }}
                >
                  <MapPin size={11} />
                  {event.location}
                </span>
              </div>
              <h2
                className="text-white"
                style={{ fontSize: "clamp(1.25rem, 3.5vw, 1.75rem)", fontWeight: 800, lineHeight: 1.2 }}
              >
                {event.title}
              </h2>
            </div>
          </div>

          {/* Text content */}
          <div className="px-6 sm:px-8 py-6 sm:py-8">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-neutral-50 border border-neutral-100 mb-6">
              <div>
                <div className="text-[#0f172a]" style={{ fontSize: "1.5rem", fontWeight: 800, lineHeight: 1.1 }}>
                  {event.stat}
                </div>
                <div style={{ fontSize: "0.75rem", fontWeight: 500, color: "#64748b" }}>
                  {event.statLabel}
                </div>
              </div>
            </div>
            <p className="mb-5" style={{ fontSize: "0.9375rem", fontWeight: 600, lineHeight: 1.7, color: "#334155" }}>
              {event.impact}
            </p>
            <p style={{ fontSize: "0.9rem", fontWeight: 400, lineHeight: 1.9, color: "#64748b" }}>
              {event.story}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Era Section ─────────────────────────────────────────────

function EraSection({ era, onOpenEvent, highlightedEventId }: { era: Era; onOpenEvent: (event: TimelineEvent, color: string) => void; highlightedEventId?: string | null }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-60px" });
  const Icon = era.icon;

  // Drag-to-scroll — uses mouse events (NOT setPointerCapture which kills child clicks)
  const dragState = useRef({ isDown: false, startX: 0, startY: 0, scrollLeft: 0, hasDragged: false, axis: "" as "" | "x" | "y" });

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: direction === "left" ? -380 : 380, behavior: "smooth" });
    }
  };

  const onMouseDown = (e: React.MouseEvent) => {
    const el = scrollRef.current;
    if (!el) return;
    dragState.current = { isDown: true, startX: e.pageX - el.offsetLeft, startY: e.pageY, scrollLeft: el.scrollLeft, hasDragged: false, axis: "" };
    el.style.cursor = "grabbing";
    el.style.scrollSnapType = "none";
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragState.current.isDown) return;
    const el = scrollRef.current;
    if (!el) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = x - dragState.current.startX;
    if (Math.abs(walk) > 8) dragState.current.hasDragged = true;
    el.scrollLeft = dragState.current.scrollLeft - walk;
  };

  const onMouseUp = () => {
    const el = scrollRef.current;
    if (!el) return;
    dragState.current.isDown = false;
    el.style.cursor = "";
    requestAnimationFrame(() => {
      if (el) el.style.scrollSnapType = "x mandatory";
    });
  };

  const onMouseLeave = () => {
    if (dragState.current.isDown) onMouseUp();
  };

  return (
    <section id={`era-${era.id}`} className="py-16 sm:py-20" style={{ background: era.bgGradient }}>
      <div ref={headingRef} className="max-w-7xl mx-auto px-6 lg:px-10 mb-8 sm:mb-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5"
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${era.color}10` }}>
                <Icon size={18} style={{ color: era.color }} />
              </div>
              <span className="tracking-[0.15em] uppercase" style={{ fontSize: "0.6875rem", fontWeight: 600, color: "#94a3b8" }}>
                {era.period}
              </span>
            </div>
            <h2 className="mb-3" style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)", fontWeight: 700, lineHeight: 1.15, color: "#0f172a" }}>
              {era.label} Era
            </h2>
            <p style={{ fontSize: "1.0625rem", fontWeight: 500, lineHeight: 1.6, color: era.color }}>
              {era.intro}
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
            <span className="text-neutral-400 mr-2" style={{ fontSize: "0.75rem", fontWeight: 500 }}>
              {era.events.length} milestones
            </span>
            <button onClick={() => scroll("left")} className="w-10 h-10 rounded-full border border-neutral-200 flex items-center justify-center hover:bg-neutral-100 transition-colors duration-300 cursor-pointer">
              <ChevronLeft size={16} className="text-neutral-500" />
            </button>
            <button onClick={() => scroll("right")} className="w-10 h-10 rounded-full border border-neutral-200 flex items-center justify-center hover:bg-neutral-100 transition-colors duration-300 cursor-pointer">
              <ChevronRight size={16} className="text-neutral-500" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Timeline line + cards */}
      <div className="relative">
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${era.color}20, ${era.color}15, transparent)` }} />
        <div
          ref={scrollRef}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseLeave}
          className="flex gap-4 sm:gap-5 overflow-x-auto snap-x snap-mandatory px-6 lg:px-10 pt-6 pb-2 cursor-grab select-none"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}
        >
          {era.events.map((event, i) => (
            <TimelineCard key={event.id} event={event} eraColor={era.color} index={i} isHighlighted={highlightedEventId === event.id} onOpen={() => { if (!dragState.current.hasDragged) onOpenEvent(event, era.color); }} />
          ))}
          <div className="flex-shrink-0 w-4" />
        </div>
      </div>
    </section>
  );
}

// ─── Page ────────────────────────────────────────────────────

export function AchievementsPage() {
  const navigate = useNavigate();
  const [activeEra, setActiveEra] = useState("historical");
  const [selectedEvent, setSelectedEvent] = useState<{ event: TimelineEvent; color: string } | null>(null);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const [highlightedEventId] = useState<string | null>(null);

  const handleEraSelect = (id: string) => {
    setActiveEra(id);
    const el = document.querySelector(`#era-${id}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id.replace("era-", "");
            setActiveEra(id);
          }
        });
      },
      { threshold: 0.2, rootMargin: "-40px 0px -30% 0px" }
    );
    eras.forEach((era) => {
      const el = document.querySelector(`#era-${era.id}`);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen bg-white">
      <BackButton />
      <EraPills activeEra={activeEra} onSelect={handleEraSelect} />

      {/* Page hero */}
      <section className="pt-20 pb-10 sm:pt-28 sm:pb-14">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <p className="tracking-[0.3em] uppercase mb-5" style={{ fontSize: "0.6875rem", fontWeight: 600, color: "#94a3b8" }}>
              Human Achievements
            </p>
            <h1 className="mb-5" style={{ fontSize: "clamp(2.25rem, 6vw, 4rem)", fontWeight: 600, lineHeight: 1.05, letterSpacing: "-0.04em", color: "#0f172a" }}>
              The Atlas of
              <br />
              Human Achievement
            </h1>
            <p style={{ fontSize: "1.125rem", fontWeight: 400, lineHeight: 1.7, color: "#475569" }}>
              Proof that human potential compounds.
            </p>
          </motion.div>

          {/* Era progress bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-10 flex items-center gap-2 overflow-x-auto"
            style={{ scrollbarWidth: "none" }}
          >
            {eras.map((era) => (
              <button
                key={era.id}
                onClick={() => handleEraSelect(era.id)}
                className="flex-shrink-0 group cursor-pointer min-w-[80px] sm:flex-1"
              >
                <div className="h-1 rounded-full bg-neutral-100 overflow-hidden mb-2">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: activeEra === era.id ? "100%" : "0%", backgroundColor: era.color }}
                  />
                </div>
                <span
                  className={`transition-colors duration-300 whitespace-nowrap ${activeEra === era.id ? "text-neutral-800" : "text-neutral-400"}`}
                  style={{ fontSize: "0.6875rem", fontWeight: 600 }}
                >
                  {era.label}
                </span>
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Era sections */}
      <div>
        {eras.map((era) => (
          <EraSection key={era.id} era={era} highlightedEventId={highlightedEventId} onOpenEvent={(event, color) => setSelectedEvent({ event, color })} />
        ))}
      </div>

      {/* ─── Closing CTA ─── */}
      <section className="relative py-36 sm:py-48 overflow-hidden" style={{ background: "linear-gradient(180deg, #ffffff 0%, #f0f2f8 30%, #e8ebf5 50%, #f0f2f8 70%, #f8f9fc 100%)" }}>
        <motion.div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full blur-[200px] pointer-events-none"
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mb-10" style={{ fontSize: "clamp(1.75rem, 4.5vw, 4rem)", fontWeight: 600, lineHeight: 1.15, letterSpacing: "-0.035em", color: "#0f172a" }}>
              If this is what we&apos;ve achieved,
              <br />
              <span style={{ color: "#6366f1" }}>imagine what we will become.</span>
            </p>
            <p className="max-w-md mx-auto mb-12" style={{ fontSize: "1rem", fontWeight: 400, lineHeight: 1.8, color: "#64748b" }}>
              The timeline doesn&apos;t end here. The next milestone might be yours.
            </p>
            <button
              onClick={() => navigate("/join")}
              className="group px-12 py-4 rounded-full bg-[#0f172a] text-white hover:bg-[#1e293b] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 cursor-pointer"
              style={{ fontSize: "0.9375rem", fontWeight: 700, boxShadow: "0 8px 32px rgba(15,23,42,0.2)" }}
            >
              <span className="flex items-center gap-2">
                Build What&apos;s Next
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Bottom spacer for fixed toolbar */}
      <div className="h-16" />

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <DetailModal event={selectedEvent.event} eraColor={selectedEvent.color} onClose={() => setSelectedEvent(null)} />
        )}
      </AnimatePresence>

      {/* Gesture zoom overlay */}
      <AnimatePresence>
        {zoomedImage && (
          <motion.div
            key="gesture-zoom"
            className="fixed inset-0 z-[9995] flex items-center justify-center bg-black/30 backdrop-blur-sm cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setZoomedImage(null)}
          >
            <motion.img
              src={zoomedImage}
              alt="Zoomed achievement"
              className="max-w-[85vw] max-h-[80vh] rounded-2xl object-cover"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ boxShadow: "0 25px 60px rgba(0,0,0,0.3)" }}
            />
          </motion.div>
        )}
      </AnimatePresence>


    </div>
  );
}
