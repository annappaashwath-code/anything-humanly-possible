import {
  Code,
  Palette,
  Rocket,
  BarChart3,
  PenTool,
  Flower2,
  Brain,
  Dumbbell,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────

export interface Course {
  id: string;
  title: string;
  provider: string;
  url: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  rating: number;
  ratingCount: number;
  completionRate: number;
  free: boolean;
  topSkills: string[];
  earningPotential?: string;
}

export interface DeepResource {
  id: string;
  title: string;
  type: "article" | "whitepaper" | "podcast";
  provider: string;
  url: string;
  readTime?: string;
  episodes?: number;
  free: boolean;
}

export interface ResourceLink {
  id: string;
  title: string;
  url: string;
  type: "course" | "tool" | "book" | "community" | "article";
  provider: string;
  free: boolean;
}

export interface Project {
  id: string;
  title: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  description: string;
  skills: string[];
}

export interface Milestone {
  id: string;
  label: string;
  description: string;
}

export interface ResourceCard {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  icon: string;
  courses: Course[];
  deepResources: DeepResource[];
  resources: ResourceLink[];
  projects: Project[];
  milestones: Milestone[];
  tags: string[];
  avgCompletionRate: number;
  topSkillsGained: string[];
  earningPotential: string;
}

export interface SkillCategory {
  id: string;
  slug: string;
  label: string;
  tagline: string;
  description: string;
  image: string;
  icon: LucideIcon;
  color: string;
  lightBg: string;
  cards: ResourceCard[];
}

// ─── Emerging AI Skills ──────────────────────────────────────

export interface AISkill {
  id: string;
  title: string;
  description: string;
  icon: string;
  demandGrowth: string;
  avgSalary: string;
  topCourses: { title: string; provider: string; free: boolean }[];
  keyCompetencies: string[];
}

export const aiEraSkills: AISkill[] = [
  {
    id: "ai-prompt",
    title: "Prompt Engineering",
    description:
      "Design precise instructions for large language models. Craft prompts that extract accurate, creative, and useful outputs from AI systems.",
    icon: "🎯",
    demandGrowth: "+312%",
    avgSalary: "$130K–$180K",
    topCourses: [
      { title: "ChatGPT Prompt Engineering for Developers", provider: "DeepLearning.AI", free: true },
      { title: "Prompt Engineering Guide", provider: "DAIR.AI", free: true },
      { title: "Building Systems with ChatGPT", provider: "OpenAI", free: true },
    ],
    keyCompetencies: ["Chain-of-thought prompting", "Few-shot learning", "System prompts", "Output formatting"],
  },
  {
    id: "ai-ethics",
    title: "AI Ethics & Governance",
    description:
      "Navigate the moral and regulatory dimensions of AI. Understand bias, fairness, transparency, and responsible deployment.",
    icon: "⚖️",
    demandGrowth: "+189%",
    avgSalary: "$120K–$165K",
    topCourses: [
      { title: "AI Ethics", provider: "MIT OpenCourseWare", free: true },
      { title: "Responsible AI", provider: "Google", free: true },
      { title: "Ethics of AI", provider: "University of Helsinki", free: true },
    ],
    keyCompetencies: ["Bias detection", "Fairness metrics", "Regulatory compliance", "Transparency frameworks"],
  },
  {
    id: "ai-collab",
    title: "Human-AI Collaboration",
    description:
      "Learn to work alongside AI as a co-pilot. Augment creativity, decision-making, and productivity through intelligent human-machine partnerships.",
    icon: "🤝",
    demandGrowth: "+245%",
    avgSalary: "$115K–$160K",
    topCourses: [
      { title: "AI-Powered Productivity", provider: "Coursera", free: false },
      { title: "Working with AI", provider: "LinkedIn Learning", free: false },
      { title: "AI for Everyone", provider: "DeepLearning.AI", free: true },
    ],
    keyCompetencies: ["AI tool fluency", "Workflow automation", "Critical evaluation", "Creative augmentation"],
  },
  {
    id: "ai-agents",
    title: "AI Agents & Automation",
    description:
      "Build autonomous AI systems that reason, plan, and execute complex tasks. Create agentic workflows that amplify human capability.",
    icon: "🤖",
    demandGrowth: "+428%",
    avgSalary: "$145K–$200K",
    topCourses: [
      { title: "Building AI Agents", provider: "LangChain", free: true },
      { title: "Multi-Agent Systems", provider: "DeepLearning.AI", free: true },
      { title: "AutoGPT & AI Agents", provider: "Udemy", free: false },
    ],
    keyCompetencies: ["LangChain/LangGraph", "Tool use & function calling", "Memory systems", "Orchestration patterns"],
  },
];

// ─── Data ────────────────────────────────────────────────────

export const skillCategories: SkillCategory[] = [
  {
    id: "coding",
    slug: "coding",
    label: "Coding",
    tagline: "Write the future",
    description:
      "From your first line of code to deploying production applications — everything you need to become a software engineer.",
    image:
      "https://images.unsplash.com/photo-1719400471588-575b23e27bd7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RpbmclMjBzb2Z0d2FyZSUyMGRldmVsb3BlciUyMGRhcmslMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzcyMDk4NzMyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    icon: Code,
    color: "#3b82f6",
    lightBg: "bg-blue-50",
    cards: [
      {
        id: "c-frontend",
        title: "Frontend Development",
        subtitle: "Build beautiful interfaces",
        description:
          "Master HTML, CSS, JavaScript, and modern frameworks to create responsive, accessible web experiences.",
        longDescription:
          "Frontend development is where design meets engineering. You'll learn to translate visual designs into pixel-perfect, interactive interfaces that work across devices.",
        icon: "🖥️",
        avgCompletionRate: 72,
        topSkillsGained: ["React", "TypeScript", "CSS", "Accessibility", "Performance"],
        earningPotential: "$75K–$145K",
        courses: [
          { id: "co1", title: "freeCodeCamp Responsive Design", provider: "freeCodeCamp", url: "#", duration: "300 hrs", difficulty: "Beginner", rating: 4.8, ratingCount: 24500, completionRate: 68, free: true, topSkills: ["HTML", "CSS", "Responsive Design"] },
          { id: "co2", title: "The Complete JavaScript Course", provider: "Udemy", url: "#", duration: "69 hrs", difficulty: "Beginner", rating: 4.7, ratingCount: 182000, completionRate: 54, free: false, topSkills: ["JavaScript", "ES6+", "DOM"] },
          { id: "co3", title: "React — The Complete Guide", provider: "Udemy", url: "#", duration: "48 hrs", difficulty: "Intermediate", rating: 4.6, ratingCount: 198000, completionRate: 47, free: false, topSkills: ["React", "Hooks", "Redux"], earningPotential: "$95K–$145K" },
          { id: "co4", title: "CSS for JS Developers", provider: "Josh Comeau", url: "#", duration: "40 hrs", difficulty: "Intermediate", rating: 4.9, ratingCount: 8400, completionRate: 78, free: false, topSkills: ["CSS", "Layout", "Animation"] },
          { id: "co5", title: "React Official Tutorial", provider: "React", url: "#", duration: "4 hrs", difficulty: "Beginner", rating: 4.5, ratingCount: 45000, completionRate: 82, free: true, topSkills: ["React", "Components", "State"] },
        ],
        deepResources: [
          { id: "dr1", title: "State of JS 2025 Report", type: "whitepaper", provider: "StateOfJS", url: "#", readTime: "25 min", free: true },
          { id: "dr2", title: "Syntax.fm", type: "podcast", provider: "Wes Bos & Scott Tolinski", url: "#", episodes: 800, free: true },
          { id: "dr3", title: "The Cost of JavaScript Frameworks", type: "article", provider: "Tim Kadlec", url: "#", readTime: "12 min", free: true },
        ],
        resources: [
          { id: "r1", title: "freeCodeCamp Responsive Design", url: "#", type: "course", provider: "freeCodeCamp", free: true },
          { id: "r2", title: "JavaScript.info", url: "#", type: "course", provider: "javascript.info", free: true },
          { id: "r3", title: "React Official Tutorial", url: "#", type: "course", provider: "React", free: true },
          { id: "r4", title: "VS Code", url: "#", type: "tool", provider: "Microsoft", free: true },
          { id: "r5", title: "CSS for JS Developers", url: "#", type: "course", provider: "Josh Comeau", free: false },
          { id: "r6", title: "Eloquent JavaScript", url: "#", type: "book", provider: "Marijn Haverbeke", free: true },
        ],
        projects: [
          { id: "p1", title: "Personal Portfolio", difficulty: "Beginner", description: "Build a responsive portfolio site with HTML, CSS, and vanilla JS.", skills: ["HTML", "CSS", "JavaScript"] },
          { id: "p2", title: "Weather Dashboard", difficulty: "Intermediate", description: "Create a weather app using a public API with search and favorites.", skills: ["React", "APIs", "State Management"] },
          { id: "p3", title: "E-Commerce Storefront", difficulty: "Advanced", description: "Build a full product catalog with cart, filtering, and checkout flow.", skills: ["React", "TypeScript", "Testing"] },
        ],
        milestones: [
          { id: "m1", label: "Build your first webpage", description: "Create and deploy a simple HTML/CSS page" },
          { id: "m2", label: "JavaScript fundamentals", description: "Loops, functions, DOM manipulation, and events" },
          { id: "m3", label: "Learn a framework", description: "Build a single-page app with React, Vue, or Svelte" },
          { id: "m4", label: "Ship a real project", description: "Deploy a project that others can use" },
        ],
        tags: ["HTML", "CSS", "JavaScript", "React"],
      },
      {
        id: "c-backend",
        title: "Backend Development",
        subtitle: "Power the infrastructure",
        description:
          "Build APIs, work with databases, handle authentication, and deploy scalable server-side applications.",
        longDescription:
          "Backend development is the engine room of every application. You'll learn to design RESTful APIs, model and query databases, implement secure authentication.",
        icon: "⚙️",
        avgCompletionRate: 58,
        topSkillsGained: ["Node.js", "SQL", "APIs", "Docker", "Security"],
        earningPotential: "$85K–$160K",
        courses: [
          { id: "co6", title: "The Odin Project — Node.js Path", provider: "The Odin Project", url: "#", duration: "200 hrs", difficulty: "Beginner", rating: 4.8, ratingCount: 15200, completionRate: 42, free: true, topSkills: ["Node.js", "Express", "MongoDB"] },
          { id: "co7", title: "PostgreSQL Bootcamp", provider: "Udemy", url: "#", duration: "22 hrs", difficulty: "Intermediate", rating: 4.6, ratingCount: 34000, completionRate: 61, free: false, topSkills: ["SQL", "PostgreSQL", "Query Optimization"] },
          { id: "co8", title: "Docker & Kubernetes: The Complete Guide", provider: "Udemy", url: "#", duration: "35 hrs", difficulty: "Advanced", rating: 4.7, ratingCount: 72000, completionRate: 38, free: false, topSkills: ["Docker", "Kubernetes", "DevOps"], earningPotential: "$110K–$160K" },
          { id: "co9", title: "System Design Primer", provider: "GitHub", url: "#", duration: "Self-paced", difficulty: "Advanced", rating: 4.9, ratingCount: 265000, completionRate: 35, free: true, topSkills: ["Architecture", "Scaling", "Design Patterns"] },
        ],
        deepResources: [
          { id: "dr4", title: "Designing Data-Intensive Applications (Summary)", type: "whitepaper", provider: "Martin Kleppmann", url: "#", readTime: "45 min", free: true },
          { id: "dr5", title: "Software Engineering Daily", type: "podcast", provider: "SE Daily", url: "#", episodes: 1500, free: true },
          { id: "dr6", title: "How Stripe Builds APIs", type: "article", provider: "Stripe Engineering", url: "#", readTime: "18 min", free: true },
        ],
        resources: [
          { id: "r7", title: "The Odin Project - Node.js", url: "#", type: "course", provider: "The Odin Project", free: true },
          { id: "r8", title: "Designing Data-Intensive Applications", url: "#", type: "book", provider: "Martin Kleppmann", free: false },
          { id: "r9", title: "PostgreSQL Tutorial", url: "#", type: "course", provider: "PostgreSQL", free: true },
          { id: "r10", title: "Postman", url: "#", type: "tool", provider: "Postman", free: true },
          { id: "r11", title: "Docker Getting Started", url: "#", type: "course", provider: "Docker", free: true },
          { id: "r12", title: "System Design Primer", url: "#", type: "article", provider: "GitHub", free: true },
        ],
        projects: [
          { id: "p4", title: "REST API", difficulty: "Beginner", description: "Build a CRUD API for a todo app with Node.js and Express.", skills: ["Node.js", "Express", "REST"] },
          { id: "p5", title: "Auth System", difficulty: "Intermediate", description: "Implement JWT-based authentication with refresh tokens.", skills: ["Auth", "Security", "Databases"] },
          { id: "p6", title: "Real-Time Chat", difficulty: "Advanced", description: "Build a WebSocket-powered chat app with rooms and persistence.", skills: ["WebSockets", "Redis", "System Design"] },
        ],
        milestones: [
          { id: "m5", label: "Build your first API", description: "Create a REST endpoint that returns JSON data" },
          { id: "m6", label: "Database proficiency", description: "Design schemas and write efficient queries" },
          { id: "m7", label: "Auth & security", description: "Implement secure authentication and authorization" },
          { id: "m8", label: "Deploy to production", description: "Set up CI/CD and deploy a live backend" },
        ],
        tags: ["Node.js", "Python", "Databases", "APIs"],
      },
      {
        id: "c-devops",
        title: "DevOps & Cloud",
        subtitle: "Automate everything",
        description:
          "Learn to deploy, monitor, and scale applications using containers, CI/CD pipelines, and cloud platforms.",
        longDescription:
          "DevOps bridges the gap between development and operations. You'll learn containerization with Docker, orchestration with Kubernetes, and infrastructure as code.",
        icon: "☁️",
        avgCompletionRate: 45,
        topSkillsGained: ["Docker", "AWS", "CI/CD", "Terraform", "Monitoring"],
        earningPotential: "$95K–$175K",
        courses: [
          { id: "co10", title: "AWS Cloud Practitioner Essentials", provider: "AWS", url: "#", duration: "6 hrs", difficulty: "Beginner", rating: 4.7, ratingCount: 89000, completionRate: 72, free: true, topSkills: ["AWS", "Cloud Basics", "Services"] },
          { id: "co11", title: "GitHub Actions — CI/CD", provider: "GitHub", url: "#", duration: "8 hrs", difficulty: "Intermediate", rating: 4.5, ratingCount: 12400, completionRate: 65, free: true, topSkills: ["CI/CD", "Automation", "Testing"] },
          { id: "co12", title: "Terraform Getting Started", provider: "HashiCorp", url: "#", duration: "12 hrs", difficulty: "Advanced", rating: 4.6, ratingCount: 28000, completionRate: 41, free: true, topSkills: ["IaC", "Terraform", "Cloud Provisioning"], earningPotential: "$120K–$175K" },
        ],
        deepResources: [
          { id: "dr7", title: "DORA State of DevOps Report", type: "whitepaper", provider: "Google Cloud", url: "#", readTime: "40 min", free: true },
          { id: "dr8", title: "Ship It! Podcast", type: "podcast", provider: "Changelog", url: "#", episodes: 120, free: true },
        ],
        resources: [
          { id: "r13", title: "Docker Mastery", url: "#", type: "course", provider: "Bret Fisher", free: false },
          { id: "r14", title: "AWS Free Tier", url: "#", type: "tool", provider: "Amazon", free: true },
          { id: "r15", title: "GitHub Actions Docs", url: "#", type: "article", provider: "GitHub", free: true },
          { id: "r16", title: "The Phoenix Project", url: "#", type: "book", provider: "Gene Kim", free: false },
          { id: "r17", title: "Terraform Getting Started", url: "#", type: "course", provider: "HashiCorp", free: true },
          { id: "r18", title: "DevOps Roadmap", url: "#", type: "community", provider: "roadmap.sh", free: true },
        ],
        projects: [
          { id: "p7", title: "Dockerize an App", difficulty: "Beginner", description: "Containerize an existing application with Docker and Docker Compose.", skills: ["Docker", "Linux", "Networking"] },
          { id: "p8", title: "CI/CD Pipeline", difficulty: "Intermediate", description: "Set up automated testing and deployment with GitHub Actions.", skills: ["CI/CD", "Testing", "Git"] },
          { id: "p9", title: "Infrastructure as Code", difficulty: "Advanced", description: "Provision cloud resources with Terraform and manage state.", skills: ["Terraform", "AWS", "IaC"] },
        ],
        milestones: [
          { id: "m9", label: "Containerize an app", description: "Run your first Docker container" },
          { id: "m10", label: "Set up CI/CD", description: "Automate testing and deployment" },
          { id: "m11", label: "Cloud deployment", description: "Deploy to a major cloud provider" },
          { id: "m12", label: "Monitoring & alerts", description: "Set up logging and alerting" },
        ],
        tags: ["Docker", "AWS", "CI/CD", "Terraform"],
      },
    ],
  },
  {
    id: "design",
    slug: "design",
    label: "Design",
    tagline: "Shape the experience",
    description:
      "From visual fundamentals to complex interaction design — develop the skills to craft experiences people love.",
    image:
      "https://images.unsplash.com/photo-1769776399260-01bfaa5f492c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMGRlc2lnbiUyMHN0dWRpbyUyMGNvbG9yZnVsJTIwbWluaW1hbHxlbnwxfHx8fDE3NzIwOTg3MzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    icon: Palette,
    color: "#ec4899",
    lightBg: "bg-pink-50",
    cards: [
      {
        id: "d-uiux",
        title: "UI / UX Design",
        subtitle: "Design with empathy",
        description:
          "Learn user research, wireframing, prototyping, and visual design to create intuitive digital products.",
        longDescription:
          "UI/UX design sits at the intersection of psychology and aesthetics. You'll learn to understand user needs through research and testing.",
        icon: "🎨",
        avgCompletionRate: 64,
        topSkillsGained: ["Figma", "Wireframing", "Prototyping", "Research", "Visual Design"],
        earningPotential: "$70K–$140K",
        courses: [
          { id: "co13", title: "Google UX Design Certificate", provider: "Google / Coursera", url: "#", duration: "200 hrs", difficulty: "Beginner", rating: 4.8, ratingCount: 312000, completionRate: 58, free: false, topSkills: ["UX Research", "Wireframing", "Figma"] },
          { id: "co14", title: "UI Design Bootcamp", provider: "Dribbble", url: "#", duration: "40 hrs", difficulty: "Intermediate", rating: 4.6, ratingCount: 8900, completionRate: 71, free: false, topSkills: ["Visual Design", "Typography", "Color"] },
          { id: "co15", title: "Interaction Design Specialization", provider: "UC San Diego / Coursera", url: "#", duration: "120 hrs", difficulty: "Advanced", rating: 4.5, ratingCount: 45000, completionRate: 39, free: false, topSkills: ["Interaction Design", "Prototyping", "Testing"], earningPotential: "$90K–$140K" },
        ],
        deepResources: [
          { id: "dr9", title: "NN/g UX Research Report 2025", type: "whitepaper", provider: "Nielsen Norman Group", url: "#", readTime: "35 min", free: true },
          { id: "dr10", title: "Design Better Podcast", type: "podcast", provider: "InVision", url: "#", episodes: 200, free: true },
        ],
        resources: [
          { id: "r19", title: "Google UX Design Certificate", url: "#", type: "course", provider: "Google", free: false },
          { id: "r20", title: "Don't Make Me Think", url: "#", type: "book", provider: "Steve Krug", free: false },
          { id: "r21", title: "Figma", url: "#", type: "tool", provider: "Figma", free: true },
          { id: "r22", title: "Laws of UX", url: "#", type: "article", provider: "Jon Yablonski", free: true },
          { id: "r23", title: "Dribbble", url: "#", type: "community", provider: "Dribbble", free: true },
          { id: "r24", title: "Refactoring UI", url: "#", type: "book", provider: "Adam Wathan", free: false },
        ],
        projects: [
          { id: "p10", title: "App Redesign", difficulty: "Beginner", description: "Redesign an existing app's key screen with improved UX.", skills: ["Wireframing", "Visual Design", "Figma"] },
          { id: "p11", title: "Design System", difficulty: "Intermediate", description: "Create a reusable component library with tokens and documentation.", skills: ["Systems Thinking", "Components", "Tokens"] },
          { id: "p12", title: "End-to-End Case Study", difficulty: "Advanced", description: "Research, design, test, and iterate on a complete product flow.", skills: ["Research", "Prototyping", "Testing"] },
        ],
        milestones: [
          { id: "m13", label: "Learn design principles", description: "Master layout, typography, color, and spacing" },
          { id: "m14", label: "Build in Figma", description: "Create your first high-fidelity mockup" },
          { id: "m15", label: "User testing", description: "Conduct a usability test and iterate on feedback" },
          { id: "m16", label: "Portfolio case study", description: "Document a complete design process" },
        ],
        tags: ["Figma", "Wireframing", "Prototyping", "Research"],
      },
      {
        id: "d-motion",
        title: "Motion & Animation",
        subtitle: "Bring designs to life",
        description:
          "Learn animation principles, micro-interactions, and motion design to add polish and delight to interfaces.",
        longDescription:
          "Motion design bridges static screens and living, breathing interfaces. You'll learn the 12 principles of animation and how to design meaningful micro-interactions.",
        icon: "✨",
        avgCompletionRate: 52,
        topSkillsGained: ["CSS Animation", "Motion", "After Effects", "Lottie", "Scroll-driven"],
        earningPotential: "$80K–$150K",
        courses: [
          { id: "co16", title: "Animation for UX", provider: "School of Motion", url: "#", duration: "30 hrs", difficulty: "Intermediate", rating: 4.8, ratingCount: 5600, completionRate: 62, free: false, topSkills: ["Timing", "Easing", "Storytelling"] },
          { id: "co17", title: "CSS Animation Masterclass", provider: "MDN / YouTube", url: "#", duration: "10 hrs", difficulty: "Beginner", rating: 4.4, ratingCount: 18000, completionRate: 74, free: true, topSkills: ["CSS", "Keyframes", "Transitions"] },
          { id: "co18", title: "After Effects for UI Designers", provider: "School of Motion", url: "#", duration: "45 hrs", difficulty: "Advanced", rating: 4.7, ratingCount: 7200, completionRate: 35, free: false, topSkills: ["After Effects", "Lottie", "Export"], earningPotential: "$85K–$150K" },
        ],
        deepResources: [
          { id: "dr11", title: "The Role of Animation in UX", type: "article", provider: "Smashing Magazine", url: "#", readTime: "15 min", free: true },
          { id: "dr12", title: "Motion Design Show", type: "podcast", provider: "School of Motion", url: "#", episodes: 85, free: true },
        ],
        resources: [
          { id: "r31", title: "The Illusion of Life", url: "#", type: "book", provider: "Disney", free: false },
          { id: "r32", title: "Motion (Framer Motion)", url: "#", type: "tool", provider: "Motion", free: true },
          { id: "r33", title: "After Effects Basics", url: "#", type: "course", provider: "School of Motion", free: false },
          { id: "r34", title: "Lottie Files", url: "#", type: "tool", provider: "Airbnb", free: true },
          { id: "r35", title: "CSS Animation Guide", url: "#", type: "article", provider: "MDN", free: true },
          { id: "r36", title: "UI Animation Newsletter", url: "#", type: "community", provider: "Val Head", free: true },
        ],
        projects: [
          { id: "p16", title: "Micro-Interactions", difficulty: "Beginner", description: "Design 5 button/toggle animations with CSS or Motion.", skills: ["CSS", "Timing", "Easing"] },
          { id: "p17", title: "Page Transitions", difficulty: "Intermediate", description: "Create smooth, meaningful transitions between app screens.", skills: ["React", "Motion", "Layout"] },
          { id: "p18", title: "Animated Explainer", difficulty: "Advanced", description: "Build a scroll-driven animated story explaining a complex concept.", skills: ["After Effects", "Storytelling", "Scroll"] },
        ],
        milestones: [
          { id: "m21", label: "Animation principles", description: "Understand easing, timing, and the 12 principles" },
          { id: "m22", label: "CSS animations", description: "Create transitions and keyframe animations" },
          { id: "m23", label: "Interactive motion", description: "Build gesture-driven and scroll animations" },
          { id: "m24", label: "Motion system", description: "Define motion tokens for a design system" },
        ],
        tags: ["Animation", "CSS", "After Effects", "Motion"],
      },
    ],
  },
  {
    id: "entrepreneurship",
    slug: "entrepreneurship",
    label: "Entrepreneurship",
    tagline: "Build something meaningful",
    description:
      "From validating ideas to scaling companies — the tools and frameworks for turning vision into venture.",
    image:
      "https://images.unsplash.com/photo-1758873272562-aa5459cbf34b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbnRyZXByZW5ldXIlMjBzdGFydHVwJTIwc3RyYXRlZ3klMjBwbGFubmluZ3xlbnwxfHx8fDE3NzIwOTg3MzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    icon: Rocket,
    color: "#f97316",
    lightBg: "bg-orange-50",
    cards: [
      {
        id: "e-ideation",
        title: "Ideation & Validation",
        subtitle: "Find your signal in the noise",
        description:
          "Learn to identify real problems, validate assumptions quickly, and develop products people actually want.",
        longDescription:
          "Most startups fail not because they can't build — but because they build the wrong thing. You'll learn lean startup methodology and customer discovery.",
        icon: "💡",
        avgCompletionRate: 55,
        topSkillsGained: ["Customer Discovery", "MVP Design", "Market Research", "Lean Startup", "Pricing"],
        earningPotential: "$80K–$200K+",
        courses: [
          { id: "co19", title: "Y Combinator Startup School", provider: "Y Combinator", url: "#", duration: "40 hrs", difficulty: "Beginner", rating: 4.9, ratingCount: 120000, completionRate: 52, free: true, topSkills: ["Ideation", "Pitching", "MVP"] },
          { id: "co20", title: "Lean Startup Methodology", provider: "Udacity", url: "#", duration: "16 hrs", difficulty: "Intermediate", rating: 4.5, ratingCount: 28000, completionRate: 61, free: true, topSkills: ["Lean Canvas", "Validation", "Pivoting"] },
          { id: "co21", title: "Product Management Fundamentals", provider: "Product School", url: "#", duration: "24 hrs", difficulty: "Intermediate", rating: 4.6, ratingCount: 15000, completionRate: 58, free: false, topSkills: ["Product Strategy", "Roadmapping", "Metrics"], earningPotential: "$100K–$200K+" },
        ],
        deepResources: [
          { id: "dr13", title: "How to Start a Startup (Lecture Notes)", type: "whitepaper", provider: "Sam Altman / Stanford", url: "#", readTime: "60 min", free: true },
          { id: "dr14", title: "How I Built This", type: "podcast", provider: "NPR / Guy Raz", url: "#", episodes: 500, free: true },
          { id: "dr15", title: "Why Startups Fail", type: "article", provider: "Harvard Business Review", url: "#", readTime: "20 min", free: true },
        ],
        resources: [
          { id: "r37", title: "The Mom Test", url: "#", type: "book", provider: "Rob Fitzpatrick", free: false },
          { id: "r38", title: "Y Combinator Startup School", url: "#", type: "course", provider: "YC", free: true },
          { id: "r39", title: "Lean Canvas", url: "#", type: "tool", provider: "Leanstack", free: true },
          { id: "r40", title: "Indie Hackers", url: "#", type: "community", provider: "Indie Hackers", free: true },
          { id: "r41", title: "Running Lean", url: "#", type: "book", provider: "Ash Maurya", free: false },
          { id: "r42", title: "Google Trends", url: "#", type: "tool", provider: "Google", free: true },
        ],
        projects: [
          { id: "p19", title: "Problem Interviews", difficulty: "Beginner", description: "Conduct 10 customer discovery interviews and synthesize findings.", skills: ["Research", "Interviewing", "Synthesis"] },
          { id: "p20", title: "Landing Page MVP", difficulty: "Intermediate", description: "Build a landing page to test demand before building the product.", skills: ["Copywriting", "Analytics", "Testing"] },
          { id: "p21", title: "Paid Pilot", difficulty: "Advanced", description: "Get 5 paying customers for a minimal version of your product.", skills: ["Sales", "Pricing", "Iteration"] },
        ],
        milestones: [
          { id: "m25", label: "Identify a problem", description: "Find a pain point worth solving" },
          { id: "m26", label: "Talk to users", description: "Conduct 10+ customer interviews" },
          { id: "m27", label: "Build an MVP", description: "Ship the simplest possible solution" },
          { id: "m28", label: "Get first revenue", description: "Earn your first dollar from a customer" },
        ],
        tags: ["Lean Startup", "Validation", "MVP", "Research"],
      },
      {
        id: "e-growth",
        title: "Growth & Marketing",
        subtitle: "Find your audience",
        description:
          "Master content marketing, SEO, paid acquisition, and community building to grow your user base sustainably.",
        longDescription:
          "Growth is the lifeblood of any startup. You'll learn the fundamentals of distribution channels — content, SEO, social media, email, paid, and community.",
        icon: "📈",
        avgCompletionRate: 48,
        topSkillsGained: ["SEO", "Content Marketing", "Analytics", "Email Marketing", "A/B Testing"],
        earningPotential: "$65K–$150K",
        courses: [
          { id: "co22", title: "HubSpot Inbound Marketing", provider: "HubSpot Academy", url: "#", duration: "12 hrs", difficulty: "Beginner", rating: 4.5, ratingCount: 210000, completionRate: 67, free: true, topSkills: ["Inbound", "Content", "SEO"] },
          { id: "co23", title: "Google Analytics Certification", provider: "Google", url: "#", duration: "10 hrs", difficulty: "Intermediate", rating: 4.4, ratingCount: 180000, completionRate: 55, free: true, topSkills: ["Analytics", "Data", "Reporting"] },
          { id: "co24", title: "Growth Hacking Masterclass", provider: "GrowthHackers", url: "#", duration: "20 hrs", difficulty: "Advanced", rating: 4.3, ratingCount: 9500, completionRate: 38, free: false, topSkills: ["Experimentation", "Virality", "Funnels"], earningPotential: "$85K–$150K" },
        ],
        deepResources: [
          { id: "dr16", title: "Content Marketing Institute Annual Report", type: "whitepaper", provider: "CMI", url: "#", readTime: "30 min", free: true },
          { id: "dr17", title: "Marketing Over Coffee", type: "podcast", provider: "John Wall & Chris Penn", url: "#", episodes: 600, free: true },
        ],
        resources: [
          { id: "r43", title: "Traction", url: "#", type: "book", provider: "Gabriel Weinberg", free: false },
          { id: "r44", title: "HubSpot Academy", url: "#", type: "course", provider: "HubSpot", free: true },
          { id: "r45", title: "Google Analytics", url: "#", type: "tool", provider: "Google", free: true },
          { id: "r46", title: "Ahrefs Blog", url: "#", type: "article", provider: "Ahrefs", free: true },
          { id: "r47", title: "GrowthHackers", url: "#", type: "community", provider: "GrowthHackers", free: true },
          { id: "r48", title: "Mailchimp", url: "#", type: "tool", provider: "Mailchimp", free: true },
        ],
        projects: [
          { id: "p22", title: "Content Strategy", difficulty: "Beginner", description: "Plan and publish 10 blog posts targeting specific keywords.", skills: ["SEO", "Writing", "Research"] },
          { id: "p23", title: "Email Funnel", difficulty: "Intermediate", description: "Build an automated email sequence that converts signups to users.", skills: ["Email", "Copywriting", "Analytics"] },
          { id: "p24", title: "Growth Experiment", difficulty: "Advanced", description: "Run 5 structured growth experiments and analyze results.", skills: ["Analytics", "A/B Testing", "Strategy"] },
        ],
        milestones: [
          { id: "m29", label: "Define your channel", description: "Identify your primary distribution channel" },
          { id: "m30", label: "Create content", description: "Publish regularly and build an audience" },
          { id: "m31", label: "Measure & optimize", description: "Set up analytics and track key metrics" },
          { id: "m32", label: "Sustainable growth", description: "Achieve predictable, repeatable growth" },
        ],
        tags: ["SEO", "Content", "Analytics", "Email"],
      },
    ],
  },
  {
    id: "data",
    slug: "data-science",
    label: "Data Science",
    tagline: "Find patterns in chaos",
    description:
      "Turn raw data into actionable insights with statistics, visualization, machine learning, and storytelling.",
    image:
      "https://images.unsplash.com/photo-1758876202980-0a28b744fb24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwYW5hbHl0aWNzJTIwY2hhcnRzJTIwdmlzdWFsaXphdGlvbiUyMG1vZGVybnxlbnwxfHx8fDE3NzIwOTU5OTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    icon: BarChart3,
    color: "#10b981",
    lightBg: "bg-emerald-50",
    cards: [
      {
        id: "ds-fundamentals",
        title: "Statistics & Analysis",
        subtitle: "Think in probabilities",
        description:
          "Build a strong foundation in statistics, probability, and exploratory data analysis.",
        longDescription:
          "Data science starts with statistical thinking. You'll learn probability theory, hypothesis testing, regression analysis, and how to avoid statistical pitfalls.",
        icon: "📊",
        avgCompletionRate: 51,
        topSkillsGained: ["Python", "Pandas", "Statistics", "Visualization", "SQL"],
        earningPotential: "$70K–$130K",
        courses: [
          { id: "co25", title: "Khan Academy Statistics", provider: "Khan Academy", url: "#", duration: "60 hrs", difficulty: "Beginner", rating: 4.7, ratingCount: 450000, completionRate: 45, free: true, topSkills: ["Probability", "Distributions", "Hypothesis Testing"] },
          { id: "co26", title: "Python for Data Science", provider: "DataCamp", url: "#", duration: "25 hrs", difficulty: "Intermediate", rating: 4.5, ratingCount: 89000, completionRate: 58, free: false, topSkills: ["Pandas", "NumPy", "Matplotlib"] },
          { id: "co27", title: "Applied Data Science with Python", provider: "University of Michigan / Coursera", url: "#", duration: "100 hrs", difficulty: "Advanced", rating: 4.6, ratingCount: 67000, completionRate: 32, free: false, topSkills: ["ML Basics", "NLP", "Network Analysis"], earningPotential: "$85K–$130K" },
        ],
        deepResources: [
          { id: "dr18", title: "Kaggle State of Data Science", type: "whitepaper", provider: "Kaggle", url: "#", readTime: "35 min", free: true },
          { id: "dr19", title: "Data Skeptic", type: "podcast", provider: "Kyle Polich", url: "#", episodes: 500, free: true },
          { id: "dr20", title: "How to Lie with Statistics (Revisited)", type: "article", provider: "Towards Data Science", url: "#", readTime: "10 min", free: true },
        ],
        resources: [
          { id: "r55", title: "Khan Academy Statistics", url: "#", type: "course", provider: "Khan Academy", free: true },
          { id: "r56", title: "Naked Statistics", url: "#", type: "book", provider: "Charles Wheelan", free: false },
          { id: "r57", title: "Jupyter Notebooks", url: "#", type: "tool", provider: "Project Jupyter", free: true },
          { id: "r58", title: "DataCamp", url: "#", type: "course", provider: "DataCamp", free: false },
          { id: "r59", title: "Kaggle Datasets", url: "#", type: "community", provider: "Kaggle", free: true },
          { id: "r60", title: "Python for Data Analysis", url: "#", type: "book", provider: "Wes McKinney", free: false },
        ],
        projects: [
          { id: "p28", title: "Dataset Exploration", difficulty: "Beginner", description: "Choose a public dataset and create a visual analysis report.", skills: ["Pandas", "Matplotlib", "Statistics"] },
          { id: "p29", title: "A/B Test Analysis", difficulty: "Intermediate", description: "Analyze a real A/B test dataset and make recommendations.", skills: ["Hypothesis Testing", "Python", "Statistics"] },
          { id: "p30", title: "Predictive Model", difficulty: "Advanced", description: "Build a regression model that predicts outcomes from historical data.", skills: ["Scikit-learn", "Feature Engineering", "Validation"] },
        ],
        milestones: [
          { id: "m37", label: "Stats fundamentals", description: "Mean, median, distributions, and hypothesis tests" },
          { id: "m38", label: "Python proficiency", description: "Pandas, NumPy, and Matplotlib" },
          { id: "m39", label: "First analysis", description: "Complete an end-to-end data analysis" },
          { id: "m40", label: "Publish findings", description: "Share a data story on Kaggle or Medium" },
        ],
        tags: ["Python", "Statistics", "Pandas", "Visualization"],
      },
      {
        id: "ds-ml",
        title: "Machine Learning",
        subtitle: "Teach machines to learn",
        description:
          "From linear regression to neural networks — build models that learn from data and make predictions.",
        longDescription:
          "Machine learning is the art of teaching computers to find patterns humans can't see. You'll progress from classical algorithms to modern deep learning.",
        icon: "🤖",
        avgCompletionRate: 38,
        topSkillsGained: ["TensorFlow", "PyTorch", "Scikit-learn", "NLP", "Computer Vision"],
        earningPotential: "$100K–$200K",
        courses: [
          { id: "co28", title: "Andrew Ng's Machine Learning", provider: "Stanford / Coursera", url: "#", duration: "60 hrs", difficulty: "Beginner", rating: 4.9, ratingCount: 4800000, completionRate: 42, free: true, topSkills: ["Linear Regression", "Neural Networks", "Optimization"] },
          { id: "co29", title: "fast.ai Practical Deep Learning", provider: "fast.ai", url: "#", duration: "70 hrs", difficulty: "Intermediate", rating: 4.8, ratingCount: 120000, completionRate: 35, free: true, topSkills: ["PyTorch", "CNNs", "Transfer Learning"] },
          { id: "co30", title: "Deep Learning Specialization", provider: "DeepLearning.AI", url: "#", duration: "120 hrs", difficulty: "Advanced", rating: 4.9, ratingCount: 890000, completionRate: 28, free: false, topSkills: ["Deep Learning", "Sequence Models", "GANs"], earningPotential: "$130K–$200K" },
        ],
        deepResources: [
          { id: "dr21", title: "State of AI Report", type: "whitepaper", provider: "Nathan Benaich", url: "#", readTime: "50 min", free: true },
          { id: "dr22", title: "Lex Fridman Podcast (AI episodes)", type: "podcast", provider: "Lex Fridman", url: "#", episodes: 400, free: true },
          { id: "dr23", title: "Attention Is All You Need (Explained)", type: "article", provider: "Jay Alammar", url: "#", readTime: "30 min", free: true },
        ],
        resources: [
          { id: "r61", title: "fast.ai Practical Deep Learning", url: "#", type: "course", provider: "fast.ai", free: true },
          { id: "r62", title: "Hands-On Machine Learning", url: "#", type: "book", provider: "Aurélien Géron", free: false },
          { id: "r63", title: "Google Colab", url: "#", type: "tool", provider: "Google", free: true },
          { id: "r64", title: "Kaggle Competitions", url: "#", type: "community", provider: "Kaggle", free: true },
          { id: "r65", title: "Andrew Ng's ML Course", url: "#", type: "course", provider: "Coursera", free: true },
          { id: "r66", title: "Papers With Code", url: "#", type: "article", provider: "Papers With Code", free: true },
        ],
        projects: [
          { id: "p31", title: "Classification Model", difficulty: "Beginner", description: "Build a model that classifies images or text into categories.", skills: ["Scikit-learn", "Data Prep", "Evaluation"] },
          { id: "p32", title: "Recommendation Engine", difficulty: "Intermediate", description: "Create a content or collaborative filtering recommendation system.", skills: ["NLP", "Embeddings", "Similarity"] },
          { id: "p33", title: "Kaggle Competition", difficulty: "Advanced", description: "Enter a Kaggle competition and achieve a top 25% score.", skills: ["Deep Learning", "Ensembling", "Tuning"] },
        ],
        milestones: [
          { id: "m41", label: "First model", description: "Train and evaluate a classification model" },
          { id: "m42", label: "Feature engineering", description: "Transform raw data into predictive features" },
          { id: "m43", label: "Deep learning basics", description: "Build and train a neural network" },
          { id: "m44", label: "Compete or publish", description: "Enter a competition or publish a model" },
        ],
        tags: ["ML", "Deep Learning", "TensorFlow", "Kaggle"],
      },
    ],
  },
  {
    id: "writing",
    slug: "writing",
    label: "Content & Writing",
    tagline: "Words that move people",
    description:
      "Master the craft of writing — from technical documentation and blog posts to storytelling and copywriting.",
    image:
      "https://images.unsplash.com/photo-1760278041881-e64e501d009c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3cml0ZXIlMjBjb250ZW50JTIwY3JlYXRvciUyMGNyZWF0aXZlJTIwZGVza3xlbnwxfHx8fDE3NzIwOTg3MzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    icon: PenTool,
    color: "#8b5cf6",
    lightBg: "bg-violet-50",
    cards: [
      {
        id: "w-technical",
        title: "Technical Writing",
        subtitle: "Clarity is kindness",
        description:
          "Write documentation, tutorials, and guides that help people understand complex systems.",
        longDescription:
          "Technical writing is the underrated superpower of the tech industry. Clear documentation reduces support tickets and makes products accessible.",
        icon: "📝",
        avgCompletionRate: 62,
        topSkillsGained: ["Documentation", "Clarity", "Structure", "API Docs", "Tutorials"],
        earningPotential: "$65K–$120K",
        courses: [
          { id: "co31", title: "Google Technical Writing", provider: "Google", url: "#", duration: "8 hrs", difficulty: "Beginner", rating: 4.7, ratingCount: 95000, completionRate: 78, free: true, topSkills: ["Clarity", "Structure", "Editing"] },
          { id: "co32", title: "API Documentation Best Practices", provider: "Swagger / SmartBear", url: "#", duration: "6 hrs", difficulty: "Intermediate", rating: 4.4, ratingCount: 12000, completionRate: 65, free: true, topSkills: ["OpenAPI", "REST Docs", "Examples"] },
          { id: "co33", title: "Technical Communication Cert", provider: "UC Berkeley Extension", url: "#", duration: "80 hrs", difficulty: "Advanced", rating: 4.5, ratingCount: 3200, completionRate: 45, free: false, topSkills: ["Information Architecture", "Style Guides", "UX Writing"], earningPotential: "$80K–$120K" },
        ],
        deepResources: [
          { id: "dr24", title: "Write the Docs — State of Docs", type: "whitepaper", provider: "Write the Docs", url: "#", readTime: "20 min", free: true },
          { id: "dr25", title: "The Not-Boring Tech Writer", type: "podcast", provider: "Write the Docs", url: "#", episodes: 45, free: true },
        ],
        resources: [
          { id: "r67", title: "Google Technical Writing Course", url: "#", type: "course", provider: "Google", free: true },
          { id: "r68", title: "Docs as Code", url: "#", type: "article", provider: "Write the Docs", free: true },
          { id: "r69", title: "Notion", url: "#", type: "tool", provider: "Notion", free: true },
          { id: "r70", title: "Write the Docs Community", url: "#", type: "community", provider: "WtD", free: true },
          { id: "r71", title: "The Elements of Style", url: "#", type: "book", provider: "Strunk & White", free: false },
          { id: "r72", title: "Grammarly", url: "#", type: "tool", provider: "Grammarly", free: true },
        ],
        projects: [
          { id: "p34", title: "API Documentation", difficulty: "Beginner", description: "Document a REST API with endpoints, examples, and error codes.", skills: ["Structure", "Clarity", "Examples"] },
          { id: "p35", title: "Tutorial Series", difficulty: "Intermediate", description: "Write a 5-part tutorial that teaches a technical concept from scratch.", skills: ["Pedagogy", "Code Examples", "Flow"] },
          { id: "p36", title: "Developer Guide", difficulty: "Advanced", description: "Create a comprehensive getting-started guide for an open source project.", skills: ["Architecture", "Audience", "Maintenance"] },
        ],
        milestones: [
          { id: "m45", label: "Write your first doc", description: "Document a process or API endpoint" },
          { id: "m46", label: "Get feedback", description: "Have a non-expert review your writing" },
          { id: "m47", label: "Publish a tutorial", description: "Write and publish a complete tutorial" },
          { id: "m48", label: "Build a portfolio", description: "Curate 5+ pieces in a writing portfolio" },
        ],
        tags: ["Documentation", "Tutorials", "Clarity", "Dev Docs"],
      },
      {
        id: "w-storytelling",
        title: "Storytelling & Copy",
        subtitle: "Craft narratives that convert",
        description:
          "Learn persuasive writing, narrative structure, and copywriting that moves people to action.",
        longDescription:
          "Great storytelling follows patterns as old as humanity — the hero's journey, the before-and-after transformation, the open loop that demands closure.",
        icon: "✍️",
        avgCompletionRate: 56,
        topSkillsGained: ["Copywriting", "Storytelling", "Headlines", "Email Marketing", "Brand Voice"],
        earningPotential: "$55K–$130K",
        courses: [
          { id: "co34", title: "CopyHackers Conversion Copy", provider: "CopyHackers", url: "#", duration: "20 hrs", difficulty: "Intermediate", rating: 4.8, ratingCount: 6800, completionRate: 62, free: false, topSkills: ["Conversion Copy", "Headlines", "CTAs"] },
          { id: "co35", title: "Story Structure for Writers", provider: "MasterClass", url: "#", duration: "10 hrs", difficulty: "Beginner", rating: 4.6, ratingCount: 42000, completionRate: 71, free: false, topSkills: ["Narrative Arc", "Character", "Conflict"] },
          { id: "co36", title: "Brand Voice & Messaging", provider: "Skillshare", url: "#", duration: "8 hrs", difficulty: "Advanced", rating: 4.3, ratingCount: 5400, completionRate: 48, free: false, topSkills: ["Brand Strategy", "Tone of Voice", "Messaging"], earningPotential: "$75K–$130K" },
        ],
        deepResources: [
          { id: "dr26", title: "State of Content Marketing", type: "whitepaper", provider: "Semrush", url: "#", readTime: "25 min", free: true },
          { id: "dr27", title: "The Copywriter Club Podcast", type: "podcast", provider: "Rob Marsh", url: "#", episodes: 350, free: true },
        ],
        resources: [
          { id: "r73", title: "Ogilvy on Advertising", url: "#", type: "book", provider: "David Ogilvy", free: false },
          { id: "r74", title: "Copyblogger", url: "#", type: "article", provider: "Copyblogger", free: true },
          { id: "r75", title: "Hemingway Editor", url: "#", type: "tool", provider: "Hemingway", free: true },
          { id: "r76", title: "CopyHackers", url: "#", type: "course", provider: "Joanna Wiebe", free: false },
          { id: "r77", title: "Substack", url: "#", type: "tool", provider: "Substack", free: true },
          { id: "r78", title: "On Writing Well", url: "#", type: "book", provider: "William Zinsser", free: false },
        ],
        projects: [
          { id: "p37", title: "Landing Page Copy", difficulty: "Beginner", description: "Write compelling copy for a product landing page.", skills: ["Headlines", "Benefits", "CTA"] },
          { id: "p38", title: "Email Sequence", difficulty: "Intermediate", description: "Create a 5-email welcome sequence for a newsletter.", skills: ["Storytelling", "Hooks", "Sequence"] },
          { id: "p39", title: "Brand Voice Guide", difficulty: "Advanced", description: "Define and document a brand's voice, tone, and messaging framework.", skills: ["Brand", "Consistency", "Guidelines"] },
        ],
        milestones: [
          { id: "m49", label: "Study great copy", description: "Analyze 10 landing pages you admire" },
          { id: "m50", label: "Write daily", description: "Maintain a 30-day writing streak" },
          { id: "m51", label: "Publish your work", description: "Launch a blog or newsletter" },
          { id: "m52", label: "Earn from writing", description: "Get paid for your writing" },
        ],
        tags: ["Copywriting", "Storytelling", "Email", "Landing Pages"],
      },
    ],
  },
  {
    id: "wellness",
    slug: "wellness",
    label: "Personal Growth",
    tagline: "Invest in yourself",
    description:
      "Build habits, develop emotional intelligence, and cultivate the mindset that underpins every other skill.",
    image:
      "https://images.unsplash.com/photo-1759951611066-d208d302e886?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWxsbmVzcyUyMG1lZGl0YXRpb24lMjBtaW5kZnVsbmVzcyUyMG1vcm5pbmd8ZW58MXx8fHwxNzcyMDk4NzM1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    icon: Flower2,
    color: "#06b6d4",
    lightBg: "bg-cyan-50",
    cards: [
      {
        id: "pg-habits",
        title: "Habits & Productivity",
        subtitle: "Systems over goals",
        description:
          "Build systems that make progress automatic — time management, deep work, and sustainable routines.",
        longDescription:
          "Productivity isn't about doing more — it's about doing what matters. You'll learn habit formation science, time-blocking techniques, and deep work principles.",
        icon: "⚡",
        avgCompletionRate: 67,
        topSkillsGained: ["Habit Formation", "Deep Work", "Time Management", "Focus", "Systems Thinking"],
        earningPotential: "N/A — Multiplier",
        courses: [
          { id: "co37", title: "Learning How to Learn", provider: "UC San Diego / Coursera", url: "#", duration: "15 hrs", difficulty: "Beginner", rating: 4.8, ratingCount: 3200000, completionRate: 72, free: true, topSkills: ["Memory", "Focus", "Chunking"] },
          { id: "co38", title: "The Science of Well-Being", provider: "Yale / Coursera", url: "#", duration: "19 hrs", difficulty: "Beginner", rating: 4.9, ratingCount: 4100000, completionRate: 68, free: true, topSkills: ["Happiness", "Habits", "Gratitude"] },
          { id: "co39", title: "Huberman Lab: Focus Toolkit", provider: "Andrew Huberman", url: "#", duration: "4 hrs", difficulty: "Intermediate", rating: 4.7, ratingCount: 890000, completionRate: 81, free: true, topSkills: ["Neuroscience", "Focus", "Sleep"] },
        ],
        deepResources: [
          { id: "dr28", title: "The Compound Effect of Tiny Habits", type: "article", provider: "James Clear", url: "#", readTime: "8 min", free: true },
          { id: "dr29", title: "Huberman Lab Podcast", type: "podcast", provider: "Andrew Huberman", url: "#", episodes: 200, free: true },
          { id: "dr30", title: "Global Wellness Economy Report", type: "whitepaper", provider: "GWI", url: "#", readTime: "40 min", free: true },
        ],
        resources: [
          { id: "r79", title: "Atomic Habits", url: "#", type: "book", provider: "James Clear", free: false },
          { id: "r80", title: "Deep Work", url: "#", type: "book", provider: "Cal Newport", free: false },
          { id: "r81", title: "Todoist", url: "#", type: "tool", provider: "Doist", free: true },
          { id: "r82", title: "Huberman Lab Podcast", url: "#", type: "course", provider: "Andrew Huberman", free: true },
          { id: "r83", title: "Obsidian", url: "#", type: "tool", provider: "Obsidian", free: true },
          { id: "r84", title: "r/productivity", url: "#", type: "community", provider: "Reddit", free: true },
        ],
        projects: [
          { id: "p40", title: "Habit Tracker", difficulty: "Beginner", description: "Track one key habit for 30 days and journal your experience.", skills: ["Self-awareness", "Consistency", "Journaling"] },
          { id: "p41", title: "Morning Routine", difficulty: "Intermediate", description: "Design and test a morning routine optimized for your goals.", skills: ["Planning", "Iteration", "Energy"] },
          { id: "p42", title: "Productivity Audit", difficulty: "Advanced", description: "Track your time for 2 weeks and redesign your schedule.", skills: ["Time Tracking", "Analysis", "Systems"] },
        ],
        milestones: [
          { id: "m53", label: "Define your system", description: "Choose one keystone habit to build" },
          { id: "m54", label: "30-day streak", description: "Maintain your habit for a full month" },
          { id: "m55", label: "Deep work practice", description: "Complete 4+ hours of focused work daily" },
          { id: "m56", label: "Teach someone", description: "Help someone else build a productive system" },
        ],
        tags: ["Habits", "Focus", "Systems", "Time Management"],
      },
      {
        id: "pg-mindset",
        title: "Mindset & Resilience",
        subtitle: "The foundation of everything",
        description:
          "Develop growth mindset, emotional intelligence, and the mental resilience to navigate challenges.",
        longDescription:
          "Every skill you learn is built on the foundation of your mindset. Growth mindset — the belief that abilities are developed through dedication — is the single biggest predictor of long-term success.",
        icon: "🧠",
        avgCompletionRate: 59,
        topSkillsGained: ["Growth Mindset", "Emotional Intelligence", "Resilience", "Meditation", "Self-awareness"],
        earningPotential: "N/A — Multiplier",
        courses: [
          { id: "co40", title: "The Science of Well-Being", provider: "Yale / Coursera", url: "#", duration: "19 hrs", difficulty: "Beginner", rating: 4.9, ratingCount: 4100000, completionRate: 68, free: true, topSkills: ["Happiness", "Habits", "Positive Psychology"] },
          { id: "co41", title: "Brené Brown on Vulnerability", provider: "TED / Coursera", url: "#", duration: "8 hrs", difficulty: "Beginner", rating: 4.8, ratingCount: 240000, completionRate: 75, free: true, topSkills: ["Vulnerability", "Courage", "Empathy"] },
          { id: "co42", title: "Emotional Intelligence at Work", provider: "LinkedIn Learning", url: "#", duration: "12 hrs", difficulty: "Intermediate", rating: 4.5, ratingCount: 56000, completionRate: 52, free: false, topSkills: ["EQ", "Self-regulation", "Social Skills"] },
        ],
        deepResources: [
          { id: "dr31", title: "The Growth Mindset Research", type: "whitepaper", provider: "Carol Dweck / Stanford", url: "#", readTime: "30 min", free: true },
          { id: "dr32", title: "Ten Percent Happier", type: "podcast", provider: "Dan Harris", url: "#", episodes: 600, free: true },
        ],
        resources: [
          { id: "r85", title: "Mindset", url: "#", type: "book", provider: "Carol Dweck", free: false },
          { id: "r86", title: "The Science of Well-Being", url: "#", type: "course", provider: "Yale / Coursera", free: true },
          { id: "r87", title: "Headspace", url: "#", type: "tool", provider: "Headspace", free: false },
          { id: "r88", title: "Man's Search for Meaning", url: "#", type: "book", provider: "Viktor Frankl", free: false },
          { id: "r89", title: "Brené Brown TED Talks", url: "#", type: "course", provider: "TED", free: true },
          { id: "r90", title: "Psychology Today", url: "#", type: "article", provider: "Psychology Today", free: true },
        ],
        projects: [
          { id: "p43", title: "Gratitude Journal", difficulty: "Beginner", description: "Write 3 things you're grateful for every day for 21 days.", skills: ["Reflection", "Positivity", "Awareness"] },
          { id: "p44", title: "Fear Setting", difficulty: "Intermediate", description: "Use Tim Ferriss's fear-setting exercise on a decision you're avoiding.", skills: ["Analysis", "Courage", "Planning"] },
          { id: "p45", title: "Mentor Others", difficulty: "Advanced", description: "Mentor someone for 3 months and document both your growth.", skills: ["Leadership", "Empathy", "Communication"] },
        ],
        milestones: [
          { id: "m57", label: "Self-assessment", description: "Identify your fixed-mindset triggers" },
          { id: "m58", label: "Daily reflection", description: "Build a journaling or meditation habit" },
          { id: "m59", label: "Face a fear", description: "Do something that scares you and reflect" },
          { id: "m60", label: "Share your story", description: "Help others by sharing your journey" },
        ],
        tags: ["Mindset", "EQ", "Resilience", "Meditation"],
      },
    ],
  },
  {
    id: "personal-training",
    slug: "personal-training",
    label: "Personal Training",
    tagline: "Master human movement, strength & coaching",
    description:
      "From biomechanics and resistance training to movement screening, nutrition, and client coaching psychology — build the skills of a master personal trainer.",
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwcGVyc29uYWwlMjB0cmFpbmluZyUyMGd5bSUyMHdvcmtvdXR8ZW58MXx8fHwxNzcyMzQyMzk4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    icon: Dumbbell,
    color: "#ea580c",
    lightBg: "bg-orange-50",
    cards: [
      {
        id: "pt-strength",
        title: "Strength & Conditioning Coaching",
        subtitle: "Biomechanics, compound lifts & program design",
        description:
          "Master barbell mechanics, progressive overload, energy systems, and periodized training design for all fitness levels.",
        longDescription:
          "Personal training begins with understanding how the human body moves against resistance. You will master functional anatomy, force vectors, the squat/hinge/push/pull kinetic chains, and evidence-based periodization strategies to build resilient, powerful athletes and everyday fitness enthusiasts.",
        icon: "🏋️",
        avgCompletionRate: 84,
        topSkillsGained: ["Biomechanics", "Periodization", "Compound Lifting", "Movement Assessment", "Program Design"],
        earningPotential: "$60K–$120K",
        courses: [
          { id: "co43", title: "NSCA-CPT Complete Preparation", provider: "NSCA", url: "#", duration: "120 hrs", difficulty: "Intermediate", rating: 4.9, ratingCount: 16400, completionRate: 88, free: false, topSkills: ["Exercise Technique", "Program Design", "Client Assessment"], earningPotential: "$65K–$115K" },
          { id: "co44", title: "Biomechanics of Resistance Training", provider: "Barbell Medicine", url: "#", duration: "45 hrs", difficulty: "Intermediate", rating: 4.8, ratingCount: 9200, completionRate: 82, free: false, topSkills: ["Force Vectors", "Spine Mechanics", "Joint Levers"] },
          { id: "co45", title: "Foundations of Human Movement", provider: "OpenLearn", url: "#", duration: "25 hrs", difficulty: "Beginner", rating: 4.7, ratingCount: 18500, completionRate: 91, free: true, topSkills: ["Anatomy", "Kinetic Chains", "Physiology"] },
        ],
        deepResources: [
          { id: "dr33", title: "Strength & Conditioning Research Digest", type: "whitepaper", provider: "JSCR Journal", url: "#", readTime: "30 min", free: true },
          { id: "dr34", title: "Iron Culture & Science Podcast", type: "podcast", provider: "Eric Helms & Omar Isuf", url: "#", episodes: 250, free: true },
        ],
        resources: [
          { id: "r91", title: "ExRx.net Exercise Prescription Library", url: "#", type: "tool", provider: "ExRx", free: true },
          { id: "r92", title: "Starting Strength: Basic Barbell Training", url: "#", type: "book", provider: "Mark Rippetoe", free: false },
          { id: "r93", title: "Science and Development of Muscle Hypertrophy", url: "#", type: "book", provider: "Brad Schoenfeld", free: false },
        ],
        projects: [
          { id: "p46", title: "12-Week Periodized Client Program", difficulty: "Intermediate", description: "Design an evidence-based 12-week undulating periodization program for an intermediate client aiming for hypertrophy and strength.", skills: ["Program Design", "Volume/Intensity", "Deloads"] },
          { id: "p47", title: "Kinetic Video Form Analysis", difficulty: "Advanced", description: "Perform a frame-by-frame biomechanical critique of a client's squat, bench press, and deadlift, writing corrective cues.", skills: ["Video Analysis", "Cueing", "Form Correction"] },
        ],
        milestones: [
          { id: "m61", label: "Master functional anatomy & planes of motion", description: "Understand sagittal, frontal, and transverse actions of prime movers and stabilizers" },
          { id: "m62", label: "Coach the 5 foundational movement patterns", description: "Demonstrate and cue squat, hinge, push, pull, and loaded carry with zero form breakdown" },
          { id: "m63", label: "Write a customized 8-week training split", description: "Calculate volume thresholds, set RPE/RIR targets, and prescribe deload weeks" },
          { id: "m64", label: "Onboard your first real training client", description: "Perform PAR-Q+ health screening, baseline fitness testing, and first guided session" },
        ],
        tags: ["Strength", "Biomechanics", "Periodization", "Lifting", "Anatomy"],
      },
      {
        id: "pt-corrective",
        title: "Corrective Exercise & Client Psychology",
        subtitle: "Movement screening, mobility & habit adherence",
        description:
          "Diagnose movement compensations, restore pain-free joint range of motion, and use behavioral psychology to help clients build lifelong fitness habits.",
        longDescription:
          "Great personal trainers don't just count reps; they restore functional movement and coach behavioral transformation. You will learn the NASM Corrective Exercise Continuum, joint-by-joint screening, and motivational interviewing to turn hesitant beginners into confident, lifelong athletes.",
        icon: "🧘",
        avgCompletionRate: 86,
        topSkillsGained: ["Corrective Exercise", "FMS Screening", "Mobility Protocols", "Motivational Interviewing", "Client Adherence"],
        earningPotential: "$55K–$110K",
        courses: [
          { id: "co46", title: "NASM Corrective Exercise Specialist (CES)", provider: "NASM", url: "#", duration: "80 hrs", difficulty: "Intermediate", rating: 4.8, ratingCount: 14200, completionRate: 85, free: false, topSkills: ["Movement Assessment", "Inhibit/Lengthen", "Activation"] },
        ],
        deepResources: [
          { id: "dr35", title: "Joint-by-Joint Approach to Human Movement", type: "article", provider: "Michael Boyle & Gray Cook", url: "#", readTime: "15 min", free: true },
          { id: "dr36", title: "The Psychology of Habit Formation in Fitness", type: "whitepaper", provider: "European Journal of Social Psychology", url: "#", readTime: "22 min", free: true },
        ],
        resources: [
          { id: "r94", title: "Functional Movement Systems (FMS)", url: "#", type: "tool", provider: "FMS", free: false },
          { id: "r95", title: "Becoming a Supple Leopard", url: "#", type: "book", provider: "Kelly Starrett", free: false },
          { id: "r96", title: "Motivational Interviewing in Nutrition & Fitness", url: "#", type: "book", provider: "Dawn Clifford", free: false },
        ],
        projects: [
          { id: "p48", title: "Complete Overhead Squat Assessment Case Study", difficulty: "Intermediate", description: "Record and evaluate an overhead squat, identify 3 kinetic chain compensations, and prescribe an 8-week corrective intervention.", skills: ["Assessment", "Mobility", "Activation"] },
          { id: "p49", title: "Client Habit Transformation Blueprint", difficulty: "Beginner", description: "Design a 30-day progressive habit architecture for a sedentary client addressing sleep, daily steps, and workout adherence.", skills: ["Behavior Change", "Goal Setting", "Tracking"] },
        ],
        milestones: [
          { id: "m65", label: "Perform full FMS & Overhead Squat screen", description: "Identify knee valgus, anterior pelvic tilt, and thoracic kyphosis compensations" },
          { id: "m66", label: "Master the 4-phase corrective continuum", description: "Apply inhibit (SMR), lengthen (stretch), activate (isolate), and integrate (compound)" },
          { id: "m67", label: "Conduct an intake motivational interview", description: "Uncover intrinsic motivators and establish SMART fitness goals with a new client" },
          { id: "m68", label: "Design a long-term retention roadmap", description: "Structure 90-day progress reviews, milestone check-ins, and community engagement" },
        ],
        tags: ["Corrective Exercise", "FMS", "Mobility", "Psychology", "Client Success"],
      },
    ],
  },
];

// Helpers
export function getAllMilestoneIds(): string[] {
  return skillCategories.flatMap((cat) =>
    cat.cards.flatMap((card) => card.milestones.map((m) => m.id))
  );
}

export function getTotalMilestoneCount(): number {
  return getAllMilestoneIds().length;
}

export function getTotalCourseCount(): number {
  return skillCategories.reduce(
    (a, c) => a + c.cards.reduce((b, d) => b + d.courses.length, 0),
    0
  );
}

export function getTotalDeepResourceCount(): number {
  return skillCategories.reduce(
    (a, c) => a + c.cards.reduce((b, d) => b + d.deepResources.length, 0),
    0
  );
}
