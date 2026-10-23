import {
  Code,
  Palette,
  FlaskConical,
  Sparkles,
  Brain,
  Crown,
  Cpu,
} from "lucide-react";

export interface Resource {
  title: string;
  type: "Book" | "Course" | "Tool" | "Community" | "Practice";
  url: string;
}

export interface Milestone {
  id: string;
  title: string;
  stage: "Beginner" | "Builder" | "Master" | "Visionary";
  description: string;
  skills: string[];
  resources: Resource[];
  project: {
    title: string;
    description: string;
  };
  estimatedTime: string;
}

export interface LearningCategory {
  id: string;
  slug: string;
  label: string;
  tagline: string;
  description: string;
  skillClusters: string[];
  image: string;
  icon: typeof Code;
  color: string;
  lightBg: string;
  masterySlug: string;
  milestones: Milestone[];
}

export const learningCategories: LearningCategory[] = [
  {
    id: "technology",
    slug: "technology",
    label: "Technology",
    tagline: "We learn by building tools that shape the future.",
    description:
      "From first lines of code to architecting systems — master the tools that define our digital civilisation.",
    skillClusters: [
      "Coding",
      "AI Systems",
      "Robotics",
      "Cybersecurity",
      "Product Design",
      "Engineering Fundamentals",
    ],
    image:
      "https://images.unsplash.com/photo-1760670399462-f5e479452c27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RpbmclMjBwcm9ncmFtbWluZyUyMGxhcHRvcCUyMGRldmVsb3BlciUyMGRhcmt8ZW58MXx8fHwxNzcyMDk1MzAyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    icon: Code,
    color: "#3b82f6",
    lightBg: "bg-blue-50",
    masterySlug: "coding",
    milestones: [
      {
        id: "t1",
        title: "Foundations",
        stage: "Beginner",
        description:
          "Understand how computers think. Learn HTML, CSS, and your first programming language.",
        skills: ["HTML & CSS", "JavaScript basics", "Command line", "Version control"],
        resources: [
          { title: "freeCodeCamp", type: "Course", url: "#" },
          { title: "Eloquent JavaScript", type: "Book", url: "#" },
          { title: "VS Code", type: "Tool", url: "#" },
        ],
        project: {
          title: "Personal Portfolio Site",
          description:
            "Build a responsive personal website showcasing your bio, projects, and contact info.",
        },
        estimatedTime: "4–6 weeks",
      },
      {
        id: "t2",
        title: "Frameworks & APIs",
        stage: "Builder",
        description:
          "Level up with modern frameworks. Build dynamic, data-driven applications.",
        skills: ["React / Vue", "REST APIs", "State management", "TypeScript"],
        resources: [
          { title: "React Documentation", type: "Course", url: "#" },
          { title: "TypeScript Handbook", type: "Book", url: "#" },
          { title: "Postman", type: "Tool", url: "#" },
        ],
        project: {
          title: "Weather Dashboard",
          description:
            "Create a weather app that fetches real-time data, displays forecasts, and saves favorites.",
        },
        estimatedTime: "6–8 weeks",
      },
      {
        id: "t3",
        title: "Full-Stack & Deployment",
        stage: "Master",
        description:
          "Build end-to-end applications with databases, authentication, and cloud deployment.",
        skills: ["Node.js / Python", "Databases", "Authentication", "CI/CD & Cloud"],
        resources: [
          { title: "The Odin Project", type: "Course", url: "#" },
          { title: "Designing Data-Intensive Apps", type: "Book", url: "#" },
          { title: "Dev Community", type: "Community", url: "#" },
        ],
        project: {
          title: "Collaborative Task Manager",
          description:
            "Build a full-stack project management tool with user accounts and real-time updates.",
        },
        estimatedTime: "8–12 weeks",
      },
      {
        id: "t4",
        title: "Specialization & Impact",
        stage: "Visionary",
        description:
          "Choose your niche — AI/ML, mobile, systems design, or security. Contribute and mentor.",
        skills: ["System design", "AI / Machine Learning", "Open source", "Technical leadership"],
        resources: [
          { title: "fast.ai", type: "Course", url: "#" },
          { title: "System Design Interview", type: "Book", url: "#" },
          { title: "GitHub Open Source", type: "Community", url: "#" },
        ],
        project: {
          title: "Open Source Contribution",
          description:
            "Identify a project you use daily, fix a bug or add a feature, and get your PR merged.",
        },
        estimatedTime: "Ongoing",
      },
    ],
  },
  {
    id: "art",
    slug: "art-creativity",
    label: "Art & Creativity",
    tagline: "We learn by expressing what cannot be measured.",
    description:
      "Develop your creative voice through design, music, storytelling, and digital media.",
    skillClusters: [
      "Design",
      "Music",
      "Filmmaking",
      "Storytelling",
      "Writing",
      "Architecture",
      "Digital Art",
    ],
    image:
      "https://images.unsplash.com/photo-1567366865909-4841d122b8ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc3QlMjBwYWludGluZyUyMGNyZWF0aXZlJTIwc3R1ZGlvJTIwY29sb3JmdWx8ZW58MXx8fHwxNzcyMDk1MzAyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    icon: Palette,
    color: "#ec4899",
    lightBg: "bg-pink-50",
    masterySlug: "design",
    milestones: [
      {
        id: "a1",
        title: "Seeing & Sketching",
        stage: "Beginner",
        description:
          "Train your eye to see shapes, light, and proportion. Daily sketching is the foundation.",
        skills: ["Contour drawing", "Proportions", "Light & shadow", "Gesture sketching"],
        resources: [
          { title: "Drawing on the Right Side of the Brain", type: "Book", url: "#" },
          { title: "Proko Anatomy", type: "Course", url: "#" },
          { title: "Sketchbook practice", type: "Practice", url: "#" },
        ],
        project: {
          title: "30-Day Sketch Journal",
          description: "Complete one observational sketch per day for 30 days.",
        },
        estimatedTime: "4–5 weeks",
      },
      {
        id: "a2",
        title: "Color & Composition",
        stage: "Builder",
        description:
          "Understand color theory, visual hierarchy, and how to create emotionally resonant work.",
        skills: ["Color theory", "Composition", "Typography", "Visual storytelling"],
        resources: [
          { title: "Interaction of Color (Albers)", type: "Book", url: "#" },
          { title: "Skillshare Color Course", type: "Course", url: "#" },
          { title: "Adobe Color", type: "Tool", url: "#" },
        ],
        project: {
          title: "Poster Series",
          description: "Design three posters exploring different color palettes and compositions.",
        },
        estimatedTime: "5–7 weeks",
      },
      {
        id: "a3",
        title: "Digital Tools & Media",
        stage: "Master",
        description:
          "Master digital creation — Photoshop, Illustrator, Procreate, Figma. Bring ideas to life.",
        skills: ["Digital illustration", "UI/UX design", "Photo editing", "Motion graphics"],
        resources: [
          { title: "Figma for Beginners", type: "Course", url: "#" },
          { title: "Procreate Handbook", type: "Book", url: "#" },
          { title: "Dribbble Community", type: "Community", url: "#" },
        ],
        project: {
          title: "Brand Identity Kit",
          description: "Create a complete brand identity — logo, color system, typography, templates.",
        },
        estimatedTime: "6–8 weeks",
      },
      {
        id: "a4",
        title: "Finding Your Voice",
        stage: "Visionary",
        description:
          "Develop a distinctive style. Exhibit your work and connect with the creative community.",
        skills: ["Personal style", "Portfolio curation", "Art critique", "Creative business"],
        resources: [
          { title: "Show Your Work (Austin Kleon)", type: "Book", url: "#" },
          { title: "Behance / Portfolio Sites", type: "Tool", url: "#" },
          { title: "Local art community", type: "Community", url: "#" },
        ],
        project: {
          title: "Solo Exhibition",
          description: "Curate 8–10 pieces into a cohesive exhibition with artist statements.",
        },
        estimatedTime: "Ongoing",
      },
    ],
  },
  {
    id: "science",
    slug: "science-discovery",
    label: "Science & Discovery",
    tagline: "We learn by questioning reality.",
    description:
      "From curious observation to rigorous experiment — think like a scientist and uncover nature's patterns.",
    skillClusters: [
      "Physics",
      "Biology",
      "Astronomy",
      "Climate Science",
      "Neuroscience",
      "Research Thinking",
    ],
    image:
      "https://images.unsplash.com/photo-1760493828288-d2dbb70d18c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYWJvcmF0b3J5JTIwc2NpZW5jZSUyMHJlc2VhcmNoJTIwbWljcm9zY29wZXxlbnwxfHx8fDE3NzIwOTUzMDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    icon: FlaskConical,
    color: "#10b981",
    lightBg: "bg-emerald-50",
    masterySlug: "data-science",
    milestones: [
      {
        id: "s1",
        title: "Scientific Thinking",
        stage: "Beginner",
        description:
          "Learn the scientific method — hypotheses, experiments, and honest interpretation.",
        skills: ["Scientific method", "Critical thinking", "Data literacy", "Research design"],
        resources: [
          { title: "A Short History of Nearly Everything", type: "Book", url: "#" },
          { title: "Khan Academy Sciences", type: "Course", url: "#" },
          { title: "Science journals", type: "Practice", url: "#" },
        ],
        project: {
          title: "Kitchen Experiment Series",
          description: "Design and conduct three home experiments, documenting each scientifically.",
        },
        estimatedTime: "3–5 weeks",
      },
      {
        id: "s2",
        title: "Data & Analysis",
        stage: "Builder",
        description:
          "Numbers tell stories. Learn statistics, visualization, and data extraction.",
        skills: ["Statistics", "Data visualization", "Python / R basics", "Spreadsheets"],
        resources: [
          { title: "Statistics in Plain English", type: "Book", url: "#" },
          { title: "DataCamp", type: "Course", url: "#" },
          { title: "Jupyter Notebooks", type: "Tool", url: "#" },
        ],
        project: {
          title: "Public Dataset Analysis",
          description: "Choose a public dataset, analyze it, visualize findings, and write a summary.",
        },
        estimatedTime: "6–8 weeks",
      },
      {
        id: "s3",
        title: "Specialization & Research",
        stage: "Master",
        description:
          "Dive deep into a field. Read papers, replicate experiments, form your own questions.",
        skills: ["Literature review", "Lab techniques", "Peer review", "Academic writing"],
        resources: [
          { title: "MIT OpenCourseWare", type: "Course", url: "#" },
          { title: "Nature / Science journals", type: "Practice", url: "#" },
          { title: "ResearchGate", type: "Community", url: "#" },
        ],
        project: {
          title: "Research Proposal",
          description: "Write a formal proposal with literature review, methodology, and expected outcomes.",
        },
        estimatedTime: "8–10 weeks",
      },
      {
        id: "s4",
        title: "Impact & Communication",
        stage: "Visionary",
        description:
          "Great science must be shared. Communicate, advocate, and mentor.",
        skills: ["Science communication", "Public speaking", "Grant writing", "Mentoring"],
        resources: [
          { title: "Houston, We Have a Narrative", type: "Book", url: "#" },
          { title: "TED Talks on Science", type: "Course", url: "#" },
          { title: "Citizen science projects", type: "Community", url: "#" },
        ],
        project: {
          title: "Science Talk",
          description: "Deliver a 10-minute talk explaining a complex concept to a non-expert audience.",
        },
        estimatedTime: "Ongoing",
      },
    ],
  },
  {
    id: "spiritual",
    slug: "spiritual-practice",
    label: "Spiritual Practice",
    tagline: "We learn by turning inward.",
    description:
      "Cultivate inner peace, self-awareness, and wisdom through timeless contemplative practices.",
    skillClusters: [
      "Meditation",
      "Yoga",
      "Philosophy",
      "Sacred Texts",
      "Mindfulness",
      "Consciousness Studies",
    ],
    image:
      "https://images.unsplash.com/photo-1758274538961-fe8f1f24166f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGF0aW9uJTIwc3Bpcml0dWFsJTIwcHJhY3RpY2UlMjBwZWFjZWZ1bCUyMG5hdHVyZXxlbnwxfHx8fDE3NzIwOTUzMDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    icon: Sparkles,
    color: "#8b5cf6",
    lightBg: "bg-violet-50",
    masterySlug: "personal-growth",
    milestones: [
      {
        id: "sp1",
        title: "Stillness & Breath",
        stage: "Beginner",
        description:
          "Begin with the most profound practice — sitting still, breathing consciously, observing your mind.",
        skills: ["Breath awareness", "Body scanning", "Sitting meditation", "Mindful pauses"],
        resources: [
          { title: "Wherever You Go, There You Are", type: "Book", url: "#" },
          { title: "Headspace / Insight Timer", type: "Tool", url: "#" },
          { title: "Daily 10-minute sits", type: "Practice", url: "#" },
        ],
        project: {
          title: "21-Day Meditation Streak",
          description: "Meditate 10+ minutes daily for 21 days. Journal what arises.",
        },
        estimatedTime: "3–4 weeks",
      },
      {
        id: "sp2",
        title: "Movement & Energy",
        stage: "Builder",
        description:
          "Unite body and spirit through yoga, tai chi, qigong, or walking meditation.",
        skills: ["Yoga foundations", "Tai chi basics", "Walking meditation", "Energy awareness"],
        resources: [
          { title: "Light on Yoga (Iyengar)", type: "Book", url: "#" },
          { title: "Yoga With Adriene", type: "Course", url: "#" },
          { title: "Local yoga studio", type: "Community", url: "#" },
        ],
        project: {
          title: "Morning Practice Ritual",
          description: "Design a 30-minute morning routine. Practice it for 30 days.",
        },
        estimatedTime: "5–6 weeks",
      },
      {
        id: "sp3",
        title: "Wisdom Traditions",
        stage: "Master",
        description:
          "Study great contemplative traditions — Zen, Stoicism, Sufism, indigenous wisdom.",
        skills: ["Contemplative reading", "Journaling", "Philosophical inquiry", "Gratitude practice"],
        resources: [
          { title: "The Perennial Philosophy (Huxley)", type: "Book", url: "#" },
          { title: "Waking Up App", type: "Tool", url: "#" },
          { title: "Study circles", type: "Community", url: "#" },
        ],
        project: {
          title: "Wisdom Commonplace Book",
          description: "Compile passages and reflections from four different wisdom traditions.",
        },
        estimatedTime: "8–10 weeks",
      },
      {
        id: "sp4",
        title: "Service & Integration",
        stage: "Visionary",
        description:
          "True growth flows outward. Integrate practice into daily life and serve with compassion.",
        skills: ["Compassionate action", "Community service", "Teaching", "Deep listening"],
        resources: [
          { title: "The Book of Joy (Dalai Lama & Tutu)", type: "Book", url: "#" },
          { title: "Volunteer organizations", type: "Community", url: "#" },
          { title: "Loving-kindness practice", type: "Practice", url: "#" },
        ],
        project: {
          title: "30 Days of Service",
          description: "One deliberate act of service each day for 30 days.",
        },
        estimatedTime: "Ongoing",
      },
    ],
  },
  {
    id: "human-potential",
    slug: "human-potential",
    label: "Human Potential",
    tagline: "We learn by evolving ourselves.",
    description:
      "Master the inner game — personal growth, discipline, emotional intelligence, and the habits of extraordinary people.",
    skillClusters: [
      "Personal Growth",
      "Discipline",
      "Emotional Intelligence",
      "Communication",
      "Habits",
      "Resilience",
    ],
    image:
      "https://images.unsplash.com/photo-1627496393703-ce95e8b54e83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb25hbCUyMHRyYW5zZm9ybWF0aW9uJTIwZ3Jvd3RoJTIwam91cm5leSUyMHN1bnJpc2V8ZW58MXx8fHwxNzcyMTM3Njg1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    icon: Brain,
    color: "#f59e0b",
    lightBg: "bg-amber-50",
    masterySlug: "personal-growth",
    milestones: [
      {
        id: "hp1",
        title: "Self-Awareness",
        stage: "Beginner",
        description:
          "Know yourself first. Map your strengths, blind spots, values, and the stories you tell yourself.",
        skills: ["Journaling", "Values clarification", "Personality frameworks", "Self-reflection"],
        resources: [
          { title: "Atomic Habits (James Clear)", type: "Book", url: "#" },
          { title: "The Science of Well-Being", type: "Course", url: "#" },
          { title: "Morning Pages practice", type: "Practice", url: "#" },
        ],
        project: {
          title: "Personal Audit",
          description: "Complete a thorough self-audit: strengths, weaknesses, values, and goals.",
        },
        estimatedTime: "3–4 weeks",
      },
      {
        id: "hp2",
        title: "Discipline & Habits",
        stage: "Builder",
        description:
          "Build the systems that compound. Master habit stacking, time management, and deep work.",
        skills: ["Habit formation", "Time blocking", "Deep work", "Energy management"],
        resources: [
          { title: "Deep Work (Cal Newport)", type: "Book", url: "#" },
          { title: "Todoist / Notion", type: "Tool", url: "#" },
          { title: "Accountability partners", type: "Community", url: "#" },
        ],
        project: {
          title: "90-Day Habit Sprint",
          description: "Design and execute a 90-day protocol targeting one keystone habit.",
        },
        estimatedTime: "12 weeks",
      },
      {
        id: "hp3",
        title: "Emotional Mastery",
        stage: "Master",
        description:
          "Navigate complexity with grace. Develop emotional intelligence, empathy, and resilience.",
        skills: ["Emotional regulation", "Active listening", "Conflict resolution", "Empathy"],
        resources: [
          { title: "Emotional Intelligence (Goleman)", type: "Book", url: "#" },
          { title: "Nonviolent Communication", type: "Course", url: "#" },
          { title: "Therapy / coaching", type: "Practice", url: "#" },
        ],
        project: {
          title: "Difficult Conversations",
          description: "Have three challenging conversations using NVC principles. Journal the outcomes.",
        },
        estimatedTime: "6–8 weeks",
      },
      {
        id: "hp4",
        title: "Legacy & Impact",
        stage: "Visionary",
        description:
          "Define your contribution. Mentor others, build something lasting, lead by example.",
        skills: ["Mentoring", "Public narrative", "Legacy planning", "Community building"],
        resources: [
          { title: "Man's Search for Meaning (Frankl)", type: "Book", url: "#" },
          { title: "Mentoring programs", type: "Community", url: "#" },
          { title: "Personal mission statement", type: "Practice", url: "#" },
        ],
        project: {
          title: "Mentor One Person",
          description: "Commit to mentoring someone for 3 months. Document the journey.",
        },
        estimatedTime: "Ongoing",
      },
    ],
  },
  {
    id: "leadership",
    slug: "leadership-society",
    label: "Leadership & Society",
    tagline: "We learn by shaping collective futures.",
    description:
      "Understand how systems work and how to lead within them — from entrepreneurship to governance.",
    skillClusters: [
      "Entrepreneurship",
      "Governance",
      "Ethics",
      "Social Systems",
      "Economics",
      "Public Speaking",
    ],
    image:
      "https://images.unsplash.com/photo-1576568699714-a3f4950805d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXZpbCUyMHJpZ2h0cyUyMG1hcmNoJTIwcHJvdGVzdCUyMGVxdWFsaXR5JTIwaGlzdG9yaWN8ZW58MXx8fHwxNzcyMTM3NjU2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    icon: Crown,
    color: "#6366f1",
    lightBg: "bg-indigo-50",
    masterySlug: "entrepreneurship",
    milestones: [
      {
        id: "l1",
        title: "Systems Thinking",
        stage: "Beginner",
        description:
          "See the whole picture. Understand how societies, economies, and institutions interconnect.",
        skills: ["Systems thinking", "Economic literacy", "Historical patterns", "Critical analysis"],
        resources: [
          { title: "Thinking in Systems (Meadows)", type: "Book", url: "#" },
          { title: "Crash Course Economics", type: "Course", url: "#" },
          { title: "News analysis practice", type: "Practice", url: "#" },
        ],
        project: {
          title: "Systems Map",
          description: "Map a local system (food, transport, education) showing all interconnections.",
        },
        estimatedTime: "4–6 weeks",
      },
      {
        id: "l2",
        title: "Communication & Influence",
        stage: "Builder",
        description:
          "Learn to speak, write, and persuade with clarity. Communication is the lever of leadership.",
        skills: ["Public speaking", "Persuasive writing", "Negotiation", "Storytelling"],
        resources: [
          { title: "Talk Like TED", type: "Book", url: "#" },
          { title: "Toastmasters", type: "Community", url: "#" },
          { title: "Blog / newsletter", type: "Practice", url: "#" },
        ],
        project: {
          title: "Public Talk",
          description: "Write and deliver a compelling 15-minute talk on something you believe in.",
        },
        estimatedTime: "6–8 weeks",
      },
      {
        id: "l3",
        title: "Building & Leading",
        stage: "Master",
        description:
          "Start something. Lead a team, launch a venture, or drive change in an organisation.",
        skills: ["Team leadership", "Project management", "Fundraising", "Decision-making"],
        resources: [
          { title: "The Lean Startup (Eric Ries)", type: "Book", url: "#" },
          { title: "Y Combinator Startup School", type: "Course", url: "#" },
          { title: "Founder communities", type: "Community", url: "#" },
        ],
        project: {
          title: "Venture Sprint",
          description: "Validate a startup idea in 6 weeks: problem, solution, MVP, first users.",
        },
        estimatedTime: "6–10 weeks",
      },
      {
        id: "l4",
        title: "Systemic Impact",
        stage: "Visionary",
        description:
          "Shape policy, build institutions, or create movements that outlive you.",
        skills: ["Policy design", "Institution building", "Ethics & governance", "Movement leadership"],
        resources: [
          { title: "Good to Great (Collins)", type: "Book", url: "#" },
          { title: "Civic leadership programs", type: "Community", url: "#" },
          { title: "Board participation", type: "Practice", url: "#" },
        ],
        project: {
          title: "Policy Proposal",
          description: "Write a detailed policy proposal addressing a real local or national issue.",
        },
        estimatedTime: "Ongoing",
      },
    ],
  },
  {
    id: "ai-future",
    slug: "ai-future",
    label: "AI & The Future",
    tagline: "We learn by collaborating with intelligence beyond us.",
    description:
      "Navigate the frontier — AI prompting, automation, machine learning, and human-AI partnership.",
    skillClusters: [
      "AI Prompting",
      "Automation",
      "Data Science",
      "Machine Learning",
      "Human-AI Systems",
      "Future Strategy",
    ],
    image:
      "https://images.unsplash.com/photo-1760931969401-9bd6ee902798?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwcm9ib3QlMjBmdXR1cmlzdGljJTIwZ2xvd3xlbnwxfHx8fDE3NzIxMzc2NzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    icon: Cpu,
    color: "#06b6d4",
    lightBg: "bg-cyan-50",
    masterySlug: "ai-skills",
    milestones: [
      {
        id: "ai1",
        title: "AI Literacy",
        stage: "Beginner",
        description:
          "Understand what AI is, how it works, and why it matters. Become fluent in the language of the future.",
        skills: ["AI concepts", "Prompt engineering", "Ethics & bias", "Tool landscape"],
        resources: [
          { title: "Elements of AI", type: "Course", url: "#" },
          { title: "AI Superpowers (Kai-Fu Lee)", type: "Book", url: "#" },
          { title: "ChatGPT / Claude", type: "Tool", url: "#" },
        ],
        project: {
          title: "AI Tool Audit",
          description: "Test 10 AI tools across different domains. Document capabilities and limitations.",
        },
        estimatedTime: "3–4 weeks",
      },
      {
        id: "ai2",
        title: "Building with AI",
        stage: "Builder",
        description:
          "Go beyond prompting. Build AI-powered applications, automate workflows, and create intelligent systems.",
        skills: ["API integration", "Workflow automation", "Data pipelines", "No-code AI tools"],
        resources: [
          { title: "LangChain Documentation", type: "Course", url: "#" },
          { title: "Zapier / Make.com", type: "Tool", url: "#" },
          { title: "AI builders community", type: "Community", url: "#" },
        ],
        project: {
          title: "AI-Powered App",
          description: "Build an application that uses an AI API to solve a real problem.",
        },
        estimatedTime: "6–8 weeks",
      },
      {
        id: "ai3",
        title: "Machine Learning",
        stage: "Master",
        description:
          "Understand the mathematics. Train models, evaluate performance, deploy intelligently.",
        skills: ["Python & ML libraries", "Model training", "Neural networks", "MLOps"],
        resources: [
          { title: "fast.ai Practical Deep Learning", type: "Course", url: "#" },
          { title: "Hands-On ML (Géron)", type: "Book", url: "#" },
          { title: "Kaggle Competitions", type: "Community", url: "#" },
        ],
        project: {
          title: "Trained & Deployed Model",
          description: "Train a model on a real dataset and deploy it as an accessible API.",
        },
        estimatedTime: "10–14 weeks",
      },
      {
        id: "ai4",
        title: "Human-AI Symbiosis",
        stage: "Visionary",
        description:
          "Design the future relationship between humans and AI. Ethics, governance, and creative partnership.",
        skills: ["AI ethics", "Future strategy", "Human-AI collaboration", "Policy & governance"],
        resources: [
          { title: "The Alignment Problem", type: "Book", url: "#" },
          { title: "AI safety research", type: "Course", url: "#" },
          { title: "Global AI policy forums", type: "Community", url: "#" },
        ],
        project: {
          title: "AI Ethics Framework",
          description: "Design an ethical framework for AI use in a specific industry or context.",
        },
        estimatedTime: "Ongoing",
      },
    ],
  },
];