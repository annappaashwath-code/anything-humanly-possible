// ─── Course Detail Data ──────────────────────────────────────
// Comprehensive data for all 42 course inner pages.

export interface CourseModule {
  id: string;
  title: string;
  lessons: { id: string; title: string; duration: string }[];
}

export interface Exercise {
  id: string;
  title: string;
  description: string;
  type: "code" | "reflection" | "design" | "analysis" | "writing" | "practice";
}

export interface RealWorldExample {
  title: string;
  description: string;
  lesson: string;
}

export interface CategoryWisdom {
  quote: string;
  author: string;
  insight: string;
}

export interface CourseDetail {
  id: string;
  overview: string;
  learningObjectives: string[];
  prerequisites: string[];
  modules: CourseModule[];
  videoPlaceholder: { title: string; description: string };
  realWorldExamples: RealWorldExample[];
  exercises: Exercise[];
  categoryWisdom: CategoryWisdom;
  communityNote: string;
}

// ─── Category Wisdom Collections ────────────────────────────

const codingWisdom: CategoryWisdom[] = [
  { quote: "Talk is cheap. Show me the code.", author: "Linus Torvalds", insight: "The open-source revolution proved that passionate individuals, working freely, can build software that powers the world. Linux, Git, and countless tools were born from this ethos — that code is the ultimate form of showing what's possible." },
  { quote: "First, solve the problem. Then, write the code.", author: "John Johnson", insight: "The best engineers spend more time thinking than typing. Understanding the problem deeply before writing a single line of code saves hours of debugging and refactoring." },
  { quote: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.", author: "Martin Fowler", insight: "Clean code is an act of empathy. When you write readable, well-structured code, you're respecting every developer who will read it after you — including your future self." },
];

const designWisdom: CategoryWisdom[] = [
  { quote: "Design is not just what it looks like and feels like. Design is how it works.", author: "Steve Jobs", insight: "Jobs revolutionized entire industries by insisting that design wasn't decoration — it was the product itself. The iPhone succeeded not because it was beautiful, but because every interaction felt inevitable and intuitive." },
  { quote: "Good design is as little design as possible.", author: "Dieter Rams", insight: "Rams' ten principles of good design have guided generations. His work at Braun proved that restraint, clarity, and purposefulness create products that stand the test of time." },
  { quote: "The details are not the details. They make the design.", author: "Charles Eames", insight: "Every pixel, every transition, every micro-interaction matters. The sum of a thousand tiny decisions is what separates forgettable interfaces from ones people love." },
];

const entrepreneurWisdom: CategoryWisdom[] = [
  { quote: "Your most unhappy customers are your greatest source of learning.", author: "Bill Gates", insight: "Gates built Microsoft into a global empire by relentlessly listening to what wasn't working. The best entrepreneurs don't avoid criticism — they mine it for gold." },
  { quote: "The way to get started is to quit talking and begin doing.", author: "Walt Disney", insight: "Disney was fired from a newspaper for 'lacking imagination.' He went bankrupt multiple times. Yet he built an entertainment empire because he never stopped executing on his vision." },
  { quote: "Move fast and break things. Unless you are breaking stuff, you are not moving fast enough.", author: "Mark Zuckerberg", insight: "Speed of iteration beats perfection of planning. The lean startup movement proved that rapid experimentation — build, measure, learn — is the fastest path to product-market fit." },
];

const dataWisdom: CategoryWisdom[] = [
  { quote: "Without data, you're just another person with an opinion.", author: "W. Edwards Deming", insight: "Deming transformed Japanese manufacturing and proved that data-driven decision making creates exponentially better outcomes than intuition alone." },
  { quote: "The goal is to turn data into information, and information into insight.", author: "Carly Fiorina", insight: "Raw data is noise. The art of data science is finding the signal — the story hiding in millions of data points that changes how we understand the world." },
  { quote: "Data is the new oil. It's valuable, but if unrefined it cannot really be used.", author: "Clive Humby", insight: "Like crude oil, raw data must be processed, cleaned, and analyzed before it becomes useful. The data pipeline — from collection to insight — is where the real value is created." },
];

const writingWisdom: CategoryWisdom[] = [
  { quote: "The first draft of anything is garbage.", author: "Ernest Hemingway", insight: "Hemingway won the Nobel Prize in Literature, yet he rewrote the ending of A Farewell to Arms 47 times. Great writing is rewriting. The willingness to revise ruthlessly is what separates professionals from amateurs." },
  { quote: "If you want to be a writer, you must do two things above all others: read a lot and write a lot.", author: "Stephen King", insight: "King's prolific output — over 60 novels — stems from a disciplined daily practice. Writing is a craft that improves through consistent repetition, not waiting for inspiration." },
  { quote: "Easy reading is damn hard writing.", author: "Nathaniel Hawthorne", insight: "The most powerful writing feels effortless to read. That ease is the result of countless revisions, cutting every unnecessary word until only clarity remains." },
];

const wellnessWisdom: CategoryWisdom[] = [
  { quote: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.", author: "Aristotle (paraphrased by Will Durant)", insight: "Modern neuroscience confirms what the ancients knew: habits literally reshape our neural pathways. The compound effect of small daily actions is the most powerful force for personal transformation." },
  { quote: "The mind is everything. What you think, you become.", author: "Buddha", insight: "Research on neuroplasticity shows that our thoughts physically change our brains. A growth mindset isn't just positive thinking — it's a biological restructuring of how we process challenges and setbacks." },
  { quote: "Between stimulus and response there is a space. In that space is our freedom and power to choose our response.", author: "Viktor Frankl", insight: "Frankl survived the Holocaust and emerged with a profound insight: we cannot always control what happens to us, but we can always choose how we respond. That space between stimulus and response is where all personal growth begins." },
];

function getWisdom(categoryId: string, index: number): CategoryWisdom {
  const collections: Record<string, CategoryWisdom[]> = {
    coding: codingWisdom,
    design: designWisdom,
    entrepreneurship: entrepreneurWisdom,
    data: dataWisdom,
    writing: writingWisdom,
    wellness: wellnessWisdom,
  };
  const col = collections[categoryId] || codingWisdom;
  return col[index % col.length];
}

// ─── All 42 Course Details ──────────────────────────────────

export const courseDetails: Record<string, CourseDetail> = {
  /* ══════════════════════════════════════════════
     CODING — Frontend Development
     ══════════════════════════════════════════════ */
  co1: {
    id: "co1",
    overview: "This comprehensive, self-paced curriculum takes you from zero to responsive web design proficiency. You'll build real projects — tribute pages, survey forms, product landing pages, and technical documentation — using semantic HTML5 and modern CSS3. Every concept is taught through hands-on coding challenges, so you learn by doing rather than watching. By the end, you'll understand how to create layouts that look great on any screen size, from mobile phones to ultra-wide monitors.",
    learningObjectives: [
      "Write semantic, accessible HTML5 markup",
      "Style layouts with CSS Flexbox and Grid",
      "Build fully responsive designs using media queries",
      "Create forms with proper validation patterns",
      "Implement CSS custom properties and modern selectors",
      "Deploy a live website to the internet",
    ],
    prerequisites: ["No prior experience required", "A computer with a web browser", "Willingness to practice daily"],
    modules: [
      { id: "m1-1", title: "HTML Foundations", lessons: [{ id: "l1", title: "Your first HTML page", duration: "45 min" }, { id: "l2", title: "Semantic elements", duration: "60 min" }, { id: "l3", title: "Forms and inputs", duration: "90 min" }, { id: "l4", title: "Accessibility basics", duration: "60 min" }] },
      { id: "m1-2", title: "CSS Fundamentals", lessons: [{ id: "l5", title: "Selectors and specificity", duration: "60 min" }, { id: "l6", title: "The box model", duration: "45 min" }, { id: "l7", title: "Colors, typography, spacing", duration: "75 min" }, { id: "l8", title: "CSS custom properties", duration: "45 min" }] },
      { id: "m1-3", title: "Responsive Layout", lessons: [{ id: "l9", title: "Flexbox deep dive", duration: "90 min" }, { id: "l10", title: "CSS Grid mastery", duration: "90 min" }, { id: "l11", title: "Media queries", duration: "60 min" }, { id: "l12", title: "Mobile-first design", duration: "45 min" }] },
      { id: "m1-4", title: "Certification Projects", lessons: [{ id: "l13", title: "Tribute page project", duration: "120 min" }, { id: "l14", title: "Survey form project", duration: "120 min" }, { id: "l15", title: "Product landing page", duration: "180 min" }, { id: "l16", title: "Technical documentation", duration: "180 min" }] },
    ],
    videoPlaceholder: { title: "Building Your First Responsive Page", description: "Watch how a blank HTML file transforms into a beautiful, responsive webpage — step by step, in real time." },
    realWorldExamples: [
      { title: "How Stripe rebuilt their documentation", description: "Stripe's docs are considered the gold standard. See how semantic HTML and thoughtful CSS create documentation that developers love.", lesson: "Every element has a purpose. Clean markup leads to clean design." },
      { title: "The responsive design of gov.uk", description: "The UK government's website serves millions of diverse users. Their responsive approach ensures accessibility across all devices and connection speeds.", lesson: "Responsive design is about inclusion — making sure no one is left behind." },
    ],
    exercises: [
      { id: "ex1", title: "Build a tribute page", description: "Create a responsive tribute page for someone who inspires you. Include an image, timeline, and quotes.", type: "code" },
      { id: "ex2", title: "Recreate a famous layout", description: "Pick a website you admire and recreate its layout using only HTML and CSS. Focus on structure, not pixel-perfection.", type: "code" },
      { id: "ex3", title: "Accessibility audit", description: "Run an accessibility checker on three websites and document the issues you find. How would you fix them?", type: "analysis" },
    ],
    categoryWisdom: getWisdom("coding", 0),
    communityNote: "Thousands of developers started their careers right here. The freeCodeCamp community forums are one of the most supportive spaces on the internet — ask questions freely, help others, and grow together.",
  },
  co2: {
    id: "co2",
    overview: "Master JavaScript from the ground up. This course covers everything from variables and data types to advanced concepts like closures, prototypal inheritance, asynchronous programming, and modern ES6+ features. You'll build real projects including a budgeting app, a recipe finder, and a fully-featured game. The emphasis is on truly understanding how JavaScript works under the hood, not just memorizing syntax.",
    learningObjectives: [
      "Understand JavaScript's execution context and scope chain",
      "Master ES6+ features: destructuring, spread, modules, classes",
      "Work with asynchronous code: callbacks, promises, async/await",
      "Manipulate the DOM and handle events effectively",
      "Build complete applications from scratch",
      "Debug JavaScript with browser DevTools",
    ],
    prerequisites: ["Basic HTML and CSS knowledge", "Understanding of how websites work", "No prior JavaScript experience needed"],
    modules: [
      { id: "m2-1", title: "JavaScript Fundamentals", lessons: [{ id: "l17", title: "Variables, types, and operators", duration: "60 min" }, { id: "l18", title: "Control flow and loops", duration: "45 min" }, { id: "l19", title: "Functions and scope", duration: "75 min" }, { id: "l20", title: "Arrays and objects", duration: "90 min" }] },
      { id: "m2-2", title: "How JavaScript Works", lessons: [{ id: "l21", title: "Execution context and the call stack", duration: "60 min" }, { id: "l22", title: "Closures and the module pattern", duration: "75 min" }, { id: "l23", title: "The 'this' keyword", duration: "60 min" }, { id: "l24", title: "Prototypal inheritance", duration: "60 min" }] },
      { id: "m2-3", title: "Modern JavaScript", lessons: [{ id: "l25", title: "ES6+ features deep dive", duration: "90 min" }, { id: "l26", title: "Asynchronous JavaScript", duration: "120 min" }, { id: "l27", title: "Working with APIs", duration: "90 min" }, { id: "l28", title: "Modules and tooling", duration: "60 min" }] },
      { id: "m2-4", title: "Real Projects", lessons: [{ id: "l29", title: "Budgeting application", duration: "180 min" }, { id: "l30", title: "Recipe finder app", duration: "240 min" }, { id: "l31", title: "Interactive game", duration: "300 min" }] },
    ],
    videoPlaceholder: { title: "JavaScript Under the Hood", description: "A visual walkthrough of how JavaScript executes code — the call stack, event loop, and memory management explained with animations." },
    realWorldExamples: [
      { title: "How JavaScript powers Notion", description: "Notion's entire editor is built with JavaScript. See how a single language can create rich, interactive, real-time collaborative experiences.", lesson: "JavaScript's versatility makes it the most valuable language to learn first." },
      { title: "The event loop in production", description: "Node.js serves millions of concurrent requests because of JavaScript's non-blocking event loop. Understanding this pattern is key to building fast applications.", lesson: "Mastering async patterns is what separates junior developers from senior ones." },
    ],
    exercises: [
      { id: "ex4", title: "Build a calculator", description: "Create a fully functional calculator with keyboard support. Handle edge cases like division by zero.", type: "code" },
      { id: "ex5", title: "Promise chain challenge", description: "Fetch data from three different APIs sequentially and combine the results into a single dashboard view.", type: "code" },
      { id: "ex6", title: "Debug this code", description: "We provide broken code with 10 bugs. Use DevTools to find and fix each one. Document your debugging process.", type: "analysis" },
    ],
    categoryWisdom: getWisdom("coding", 1),
    communityNote: "JavaScript has the largest developer community in the world. Whatever question you have, someone has asked it before — and the answer is waiting for you on Stack Overflow, MDN, or in the course forums.",
  },
  co3: {
    id: "co3",
    overview: "Dive deep into React, the world's most popular UI library. This course covers components, JSX, state management with hooks, context API, Redux, routing, authentication patterns, testing, and deployment. You'll build multiple real-world projects including a recipe app, an expense tracker, and a full-stack web application. The curriculum stays current with the latest React patterns and best practices.",
    learningObjectives: [
      "Build component-based user interfaces with React and JSX",
      "Manage state with useState, useReducer, and Context API",
      "Handle side effects and data fetching with useEffect",
      "Implement client-side routing with React Router",
      "Write unit and integration tests for React components",
      "Deploy React applications to production",
    ],
    prerequisites: ["Solid JavaScript fundamentals (ES6+)", "Understanding of HTML and CSS", "Familiarity with the command line"],
    modules: [
      { id: "m3-1", title: "React Fundamentals", lessons: [{ id: "l32", title: "Components and JSX", duration: "60 min" }, { id: "l33", title: "Props and children", duration: "45 min" }, { id: "l34", title: "State with useState", duration: "75 min" }, { id: "l35", title: "Event handling", duration: "45 min" }] },
      { id: "m3-2", title: "Advanced Patterns", lessons: [{ id: "l36", title: "useEffect and side effects", duration: "90 min" }, { id: "l37", title: "Custom hooks", duration: "60 min" }, { id: "l38", title: "Context and global state", duration: "75 min" }, { id: "l39", title: "Performance optimization", duration: "60 min" }] },
      { id: "m3-3", title: "Ecosystem & Tools", lessons: [{ id: "l40", title: "React Router", duration: "75 min" }, { id: "l41", title: "Redux toolkit", duration: "90 min" }, { id: "l42", title: "Testing with Jest & RTL", duration: "90 min" }, { id: "l43", title: "Deployment strategies", duration: "45 min" }] },
      { id: "m3-4", title: "Capstone Projects", lessons: [{ id: "l44", title: "Full-stack web application", duration: "480 min" }] },
    ],
    videoPlaceholder: { title: "React Mental Model", description: "Understanding React's declarative paradigm — how thinking in components changes the way you build user interfaces." },
    realWorldExamples: [
      { title: "How Meta uses React at scale", description: "React was born at Facebook (now Meta) to solve the challenge of building complex, interactive UIs that update in real-time. See how component architecture scales to billions of users.", lesson: "Thinking in components is the single most important mental shift in modern frontend development." },
      { title: "Airbnb's design system in React", description: "Airbnb's design system powers hundreds of surfaces across web and mobile. React's composability makes it possible to maintain consistency at massive scale.", lesson: "A well-designed component library becomes a force multiplier for your entire team." },
    ],
    exercises: [
      { id: "ex7", title: "Build a task manager", description: "Create a Kanban board with drag-and-drop, categories, due dates, and local storage persistence.", type: "code" },
      { id: "ex8", title: "Custom hook challenge", description: "Create three reusable custom hooks: useLocalStorage, useDebounce, and useFetch. Write tests for each.", type: "code" },
      { id: "ex9", title: "Performance audit", description: "Profile a slow React application, identify unnecessary re-renders, and optimize it using memo, useMemo, and useCallback.", type: "analysis" },
    ],
    categoryWisdom: getWisdom("coding", 2),
    communityNote: "React's community is one of the most vibrant in tech. From React Conf to local meetups, from Discord servers to Reddit — you'll never be alone in your learning journey.",
  },
  co4: {
    id: "co4",
    overview: "CSS is often misunderstood and underestimated. This course treats CSS as a real programming language, diving deep into the mental models that make complex layouts feel intuitive. You'll master the rendering engine's layout algorithms, learn to think in terms of flow, flexbox, and grid contexts, and build the confidence to create any layout without fighting the browser.",
    learningObjectives: [
      "Understand CSS rendering: flow, stacking contexts, and containment",
      "Master Flexbox and Grid layout algorithms deeply",
      "Create fluid, responsive typography and spacing systems",
      "Build complex animations and transitions",
      "Debug CSS issues systematically using DevTools",
      "Create a personal CSS methodology for scalable styles",
    ],
    prerequisites: ["Comfortable with HTML", "Some CSS experience (will be re-taught from fundamentals)", "Basic JavaScript knowledge helpful"],
    modules: [
      { id: "m4-1", title: "Rendering Logic", lessons: [{ id: "l45", title: "Flow layout", duration: "75 min" }, { id: "l46", title: "Positioned layout", duration: "60 min" }, { id: "l47", title: "Stacking contexts", duration: "60 min" }, { id: "l48", title: "Overflow and containment", duration: "45 min" }] },
      { id: "m4-2", title: "Modern Layout", lessons: [{ id: "l49", title: "Flexbox: the algorithm", duration: "90 min" }, { id: "l50", title: "Grid: two-dimensional power", duration: "90 min" }, { id: "l51", title: "Responsive strategies", duration: "75 min" }] },
      { id: "m4-3", title: "Typography & Animation", lessons: [{ id: "l52", title: "Fluid typography system", duration: "60 min" }, { id: "l53", title: "CSS transitions deep dive", duration: "75 min" }, { id: "l54", title: "Keyframe animations", duration: "75 min" }, { id: "l55", title: "Scroll-driven effects", duration: "60 min" }] },
    ],
    videoPlaceholder: { title: "The CSS Layout Algorithm", description: "A visual exploration of how browsers actually render CSS — understanding the algorithm behind every pixel on your screen." },
    realWorldExamples: [
      { title: "How Apple.com achieves its polish", description: "Apple's website is a masterclass in CSS craftsmanship. Every scroll animation, every typographic detail, every responsive breakpoint is carefully orchestrated.", lesson: "CSS mastery is what transforms a functional website into an experience that feels premium." },
    ],
    exercises: [
      { id: "ex10", title: "Layout challenge", description: "Recreate five complex layouts from popular websites using only CSS Grid and Flexbox. No frameworks allowed.", type: "code" },
      { id: "ex11", title: "Animation sequence", description: "Build a multi-step loading animation with CSS keyframes that tells a story through motion.", type: "design" },
    ],
    categoryWisdom: getWisdom("coding", 0),
    communityNote: "CSS has gone through a renaissance. New features like container queries, cascade layers, and :has() are transforming what's possible. This is the best time to deeply invest in CSS skills.",
  },
  co5: {
    id: "co5",
    overview: "The official React tutorial is the fastest way to get productive with React. In just a few hours, you'll build an interactive tic-tac-toe game while learning React's core concepts: components, props, state, and the declarative programming model. It's maintained by the React team themselves, ensuring the content always reflects current best practices.",
    learningObjectives: [
      "Understand React's component model and JSX syntax",
      "Pass data between components using props",
      "Manage interactive state with useState",
      "Implement basic game logic in React",
      "Understand React's re-rendering model",
    ],
    prerequisites: ["Basic JavaScript knowledge", "HTML fundamentals", "A code editor installed"],
    modules: [
      { id: "m5-1", title: "Setup & Basics", lessons: [{ id: "l56", title: "Setting up your environment", duration: "15 min" }, { id: "l57", title: "Your first component", duration: "20 min" }, { id: "l58", title: "Passing props", duration: "25 min" }] },
      { id: "m5-2", title: "Building the Game", lessons: [{ id: "l59", title: "Adding interactivity with state", duration: "30 min" }, { id: "l60", title: "Lifting state up", duration: "25 min" }, { id: "l61", title: "Implementing game logic", duration: "40 min" }, { id: "l62", title: "Time travel feature", duration: "35 min" }] },
    ],
    videoPlaceholder: { title: "React in 4 Hours", description: "A guided walkthrough of building your first React application from setup to deployment." },
    realWorldExamples: [
      { title: "How React's component model changed the industry", description: "Before React, building interactive UIs was painful. React's declarative model revolutionized how we think about UI development.", lesson: "The best abstractions make complex things simple — that's exactly what React does with UI." },
    ],
    exercises: [
      { id: "ex12", title: "Extend the game", description: "Add features to the tic-tac-toe game: player names, score tracking, board size options, and an AI opponent.", type: "code" },
    ],
    categoryWisdom: getWisdom("coding", 1),
    communityNote: "The React docs are considered some of the best technical documentation in the industry. Don't just take the tutorial — explore the guides and API reference too.",
  },

  /* ══════════════════════════════════════════════
     CODING — Backend Development
     ══════════════════════════════════════════════ */
  co6: {
    id: "co6",
    overview: "The Odin Project's Node.js path takes you from JavaScript fundamentals through to building and deploying full-stack web applications. This open-source curriculum is project-based — you'll build a mini message board, an inventory application, a members-only clubhouse, and a blog API. Every lesson links to the best free resources on the web, and the community of learners provides support and code reviews.",
    learningObjectives: ["Build server-side applications with Node.js and Express", "Design and query databases with MongoDB and PostgreSQL", "Implement authentication with Passport.js", "Create RESTful APIs following best practices", "Deploy applications to production", "Write server-side tests"],
    prerequisites: ["Solid JavaScript fundamentals", "Basic HTML/CSS knowledge", "Command line comfort"],
    modules: [
      { id: "m6-1", title: "Node.js Basics", lessons: [{ id: "l63", title: "Node.js introduction", duration: "60 min" }, { id: "l64", title: "Express framework", duration: "90 min" }, { id: "l65", title: "Middleware and routing", duration: "75 min" }] },
      { id: "m6-2", title: "Databases", lessons: [{ id: "l66", title: "MongoDB with Mongoose", duration: "90 min" }, { id: "l67", title: "SQL and PostgreSQL", duration: "90 min" }, { id: "l68", title: "Data modeling patterns", duration: "60 min" }] },
      { id: "m6-3", title: "Authentication & APIs", lessons: [{ id: "l69", title: "User authentication", duration: "90 min" }, { id: "l70", title: "RESTful API design", duration: "75 min" }, { id: "l71", title: "Testing and deployment", duration: "60 min" }] },
    ],
    videoPlaceholder: { title: "Building a REST API from Scratch", description: "Watch a complete REST API come to life — from project setup through to handling real HTTP requests." },
    realWorldExamples: [
      { title: "How Netflix handles millions of API requests", description: "Netflix's Node.js migration improved startup time by 70%. See how event-driven architecture enables massive scale.", lesson: "Node.js excels at I/O-heavy workloads — understanding why helps you choose the right tool." },
    ],
    exercises: [
      { id: "ex13", title: "Build a blog API", description: "Create a complete blog REST API with CRUD operations, authentication, pagination, and error handling.", type: "code" },
      { id: "ex14", title: "Database design challenge", description: "Design a database schema for a social media platform. Consider relationships, indexes, and query patterns.", type: "analysis" },
    ],
    categoryWisdom: getWisdom("coding", 2),
    communityNote: "The Odin Project has helped hundreds of thousands of people transition into tech careers. The Discord community is incredibly active and supportive.",
  },
  co7: {
    id: "co7",
    overview: "PostgreSQL is the world's most advanced open-source database. This bootcamp teaches you SQL from scratch, then dives into PostgreSQL-specific features: CTEs, window functions, full-text search, JSON operations, and query optimization. You'll work with real datasets and learn to write queries that are both correct and fast.",
    learningObjectives: ["Write complex SQL queries with joins, subqueries, and CTEs", "Optimize query performance with EXPLAIN and indexes", "Design normalized database schemas", "Use PostgreSQL-specific features: JSON, arrays, full-text search", "Implement database migrations and versioning", "Set up replication and backups"],
    prerequisites: ["Basic understanding of what databases are", "Some programming experience helpful", "Command line basics"],
    modules: [
      { id: "m7-1", title: "SQL Fundamentals", lessons: [{ id: "l72", title: "SELECT, WHERE, ORDER BY", duration: "60 min" }, { id: "l73", title: "JOINs and relationships", duration: "90 min" }, { id: "l74", title: "Aggregation and grouping", duration: "60 min" }] },
      { id: "m7-2", title: "Advanced SQL", lessons: [{ id: "l75", title: "Subqueries and CTEs", duration: "75 min" }, { id: "l76", title: "Window functions", duration: "90 min" }, { id: "l77", title: "Full-text search and JSON", duration: "75 min" }] },
      { id: "m7-3", title: "Performance & Design", lessons: [{ id: "l78", title: "EXPLAIN and query plans", duration: "60 min" }, { id: "l79", title: "Indexing strategies", duration: "75 min" }, { id: "l80", title: "Schema design patterns", duration: "60 min" }] },
    ],
    videoPlaceholder: { title: "Query Optimization in Action", description: "See how a slow 30-second query gets optimized to run in milliseconds through indexing and query rewriting." },
    realWorldExamples: [{ title: "How Instagram scaled PostgreSQL", description: "Instagram chose PostgreSQL early and scaled it to handle billions of likes, comments, and follows. Their sharding strategy is a masterclass in database engineering.", lesson: "PostgreSQL can scale further than most people think — if you understand its internals." }],
    exercises: [
      { id: "ex15", title: "Query challenge", description: "Solve 10 progressively harder SQL challenges using a real e-commerce dataset. Optimize each query for performance.", type: "code" },
    ],
    categoryWisdom: getWisdom("coding", 0),
    communityNote: "SQL is a skill that compounds. Every company uses databases, and developers who write efficient SQL are always in demand.",
  },
  co8: {
    id: "co8",
    overview: "Containers revolutionized software deployment. This comprehensive guide takes you from Docker basics through Kubernetes orchestration, covering container networking, volumes, multi-stage builds, Helm charts, and production deployment patterns. You'll containerize real applications and deploy them to a Kubernetes cluster.",
    learningObjectives: ["Build and optimize Docker images with multi-stage builds", "Orchestrate containers with Docker Compose", "Deploy applications to Kubernetes clusters", "Implement service discovery and load balancing", "Set up monitoring and logging", "Design microservice architectures"],
    prerequisites: ["Comfortable with the command line", "Basic understanding of web applications", "Some programming experience"],
    modules: [
      { id: "m8-1", title: "Docker Fundamentals", lessons: [{ id: "l81", title: "Containers and images", duration: "60 min" }, { id: "l82", title: "Dockerfiles and builds", duration: "75 min" }, { id: "l83", title: "Docker Compose", duration: "60 min" }] },
      { id: "m8-2", title: "Kubernetes", lessons: [{ id: "l84", title: "Pods, Services, Deployments", duration: "90 min" }, { id: "l85", title: "ConfigMaps and Secrets", duration: "60 min" }, { id: "l86", title: "Helm charts", duration: "75 min" }] },
      { id: "m8-3", title: "Production Patterns", lessons: [{ id: "l87", title: "CI/CD with containers", duration: "60 min" }, { id: "l88", title: "Monitoring and logging", duration: "75 min" }, { id: "l89", title: "Scaling strategies", duration: "60 min" }] },
    ],
    videoPlaceholder: { title: "From Code to Kubernetes", description: "Watch an application go from a local development environment to a production Kubernetes cluster in real time." },
    realWorldExamples: [{ title: "How Spotify runs 2,000+ microservices", description: "Spotify's engineering culture embraced containers early, enabling autonomous teams to deploy independently thousands of times per day.", lesson: "Containers aren't just about technology — they enable organizational agility." }],
    exercises: [{ id: "ex16", title: "Containerize a full-stack app", description: "Take an existing Node.js + React + PostgreSQL application and containerize it with Docker Compose. Add health checks and volume persistence.", type: "code" }],
    categoryWisdom: getWisdom("coding", 1),
    communityNote: "DevOps and container skills are among the highest-paid in tech. This knowledge is a career accelerator.",
  },
  co9: {
    id: "co9",
    overview: "System design is the art of building systems that scale. This self-paced primer covers load balancing, caching, database sharding, message queues, CDNs, and microservices architecture. You'll learn to design systems like URL shorteners, social networks, and real-time chat applications — the same questions asked in senior engineering interviews.",
    learningObjectives: ["Design scalable distributed systems", "Choose appropriate storage solutions for different use cases", "Implement caching strategies at multiple levels", "Design for high availability and fault tolerance", "Communicate design tradeoffs clearly", "Estimate system capacity requirements"],
    prerequisites: ["Experience building web applications", "Understanding of databases and networking", "Comfort with at least one backend language"],
    modules: [
      { id: "m9-1", title: "Fundamentals", lessons: [{ id: "l90", title: "Scalability principles", duration: "60 min" }, { id: "l91", title: "Load balancing", duration: "45 min" }, { id: "l92", title: "Caching strategies", duration: "75 min" }] },
      { id: "m9-2", title: "Storage & Data", lessons: [{ id: "l93", title: "SQL vs NoSQL", duration: "60 min" }, { id: "l94", title: "Database sharding", duration: "75 min" }, { id: "l95", title: "Message queues", duration: "60 min" }] },
      { id: "m9-3", title: "System Design Practice", lessons: [{ id: "l96", title: "Design a URL shortener", duration: "90 min" }, { id: "l97", title: "Design a chat system", duration: "90 min" }, { id: "l98", title: "Design a social feed", duration: "90 min" }] },
    ],
    videoPlaceholder: { title: "Designing Systems at Scale", description: "A walkthrough of designing a real-time messaging system that handles millions of concurrent users." },
    realWorldExamples: [{ title: "How WhatsApp serves 2 billion users with 50 engineers", description: "WhatsApp's architecture choices — Erlang, BEAM VM, message-level sharding — enabled a tiny team to build one of the most-used applications on Earth.", lesson: "Great system design is about choosing the right constraints, not throwing more hardware at the problem." }],
    exercises: [{ id: "ex17", title: "Design a system", description: "Pick any application you use daily and design its architecture from scratch. Document your decisions, tradeoffs, and capacity estimates.", type: "analysis" }],
    categoryWisdom: getWisdom("coding", 2),
    communityNote: "System design knowledge makes you a better engineer at every level. It's the skill that unlocks senior and staff-level positions.",
  },

  /* ══════════════════════════════════════════════
     CODING — DevOps & Cloud
     ══════════════════════════════════════════════ */
  co10: {
    id: "co10",
    overview: "AWS Cloud Practitioner Essentials provides a foundational understanding of AWS cloud concepts, services, security, architecture, and pricing. This is the perfect starting point for anyone entering the cloud computing space. You'll learn about compute (EC2, Lambda), storage (S3, EBS), databases (RDS, DynamoDB), networking (VPC), and the shared responsibility model.",
    learningObjectives: ["Understand core AWS cloud services and their use cases", "Explain the AWS shared responsibility model", "Navigate the AWS Management Console", "Describe basic cloud architecture principles", "Understand AWS pricing and billing models", "Prepare for the AWS Cloud Practitioner certification exam"],
    prerequisites: ["No prior cloud experience required", "Basic understanding of IT concepts", "Interest in cloud computing"],
    modules: [
      { id: "m10-1", title: "Cloud Concepts", lessons: [{ id: "l99", title: "What is cloud computing?", duration: "30 min" }, { id: "l100", title: "AWS global infrastructure", duration: "25 min" }, { id: "l101", title: "Compute services", duration: "45 min" }] },
      { id: "m10-2", title: "Core Services", lessons: [{ id: "l102", title: "Storage and databases", duration: "40 min" }, { id: "l103", title: "Networking and security", duration: "40 min" }, { id: "l104", title: "Monitoring and management", duration: "30 min" }] },
    ],
    videoPlaceholder: { title: "Your First Cloud Deployment", description: "Launch a web application on AWS in under 15 minutes — from sign-up to a live URL." },
    realWorldExamples: [{ title: "How startups use AWS to scale", description: "Companies like Airbnb, Slack, and Netflix started on AWS with minimal infrastructure and scaled to millions of users without rebuilding.", lesson: "Cloud computing democratized infrastructure — you can now access the same technology as the biggest companies in the world." }],
    exercises: [{ id: "ex18", title: "Launch a web server", description: "Use the AWS Free Tier to launch an EC2 instance, configure security groups, and serve a static website.", type: "practice" }],
    categoryWisdom: getWisdom("coding", 0),
    communityNote: "Cloud skills are table stakes in modern tech. This certification is recognized globally and opens doors to cloud-focused roles.",
  },
  co11: {
    id: "co11",
    overview: "GitHub Actions enables powerful CI/CD pipelines directly in your repository. This course teaches you to automate testing, building, and deploying applications using workflow files. You'll learn to create custom actions, use matrix strategies for cross-platform testing, manage secrets, and implement deployment gates.",
    learningObjectives: ["Create GitHub Actions workflow files from scratch", "Implement automated testing pipelines", "Build and publish Docker images automatically", "Set up deployment pipelines with environment gates", "Create reusable custom actions", "Manage secrets and environment variables securely"],
    prerequisites: ["Familiarity with Git and GitHub", "Basic understanding of YAML", "Some programming experience"],
    modules: [
      { id: "m11-1", title: "Workflow Basics", lessons: [{ id: "l105", title: "YAML syntax and triggers", duration: "45 min" }, { id: "l106", title: "Jobs, steps, and runners", duration: "60 min" }, { id: "l107", title: "Environment and secrets", duration: "45 min" }] },
      { id: "m11-2", title: "Advanced Workflows", lessons: [{ id: "l108", title: "Matrix strategies", duration: "45 min" }, { id: "l109", title: "Custom actions", duration: "60 min" }, { id: "l110", title: "Deployment pipelines", duration: "75 min" }] },
    ],
    videoPlaceholder: { title: "CI/CD Pipeline in 10 Minutes", description: "Watch a complete CI/CD pipeline get built from scratch — push code, run tests, deploy automatically." },
    realWorldExamples: [{ title: "How open source projects use CI/CD", description: "Major open source projects run thousands of tests on every pull request. GitHub Actions makes this accessible to projects of any size.", lesson: "Automation frees humans to focus on creativity and problem-solving instead of repetitive tasks." }],
    exercises: [{ id: "ex19", title: "Build a pipeline", description: "Create a GitHub Actions workflow that tests, builds, and deploys a web application on every push to main.", type: "code" }],
    categoryWisdom: getWisdom("coding", 1),
    communityNote: "CI/CD is the backbone of modern software delivery. Once you experience automated deployments, you'll never go back to manual processes.",
  },
  co12: {
    id: "co12",
    overview: "Terraform lets you define infrastructure as code. This course covers HCL syntax, providers, state management, modules, workspaces, and best practices for managing cloud resources declaratively. You'll provision real AWS infrastructure and learn patterns for managing state safely in team environments.",
    learningObjectives: ["Write Terraform configurations in HCL", "Manage infrastructure state safely", "Create reusable modules", "Implement multi-environment deployments", "Handle secrets and sensitive data", "Plan and apply infrastructure changes safely"],
    prerequisites: ["Basic cloud computing knowledge", "Command line proficiency", "Understanding of networking basics"],
    modules: [
      { id: "m12-1", title: "Terraform Basics", lessons: [{ id: "l111", title: "HCL syntax and providers", duration: "60 min" }, { id: "l112", title: "Resources and data sources", duration: "60 min" }, { id: "l113", title: "Variables and outputs", duration: "45 min" }] },
      { id: "m12-2", title: "State & Modules", lessons: [{ id: "l114", title: "State management", duration: "60 min" }, { id: "l115", title: "Creating modules", duration: "75 min" }, { id: "l116", title: "Workspaces and environments", duration: "60 min" }] },
    ],
    videoPlaceholder: { title: "Infrastructure as Code", description: "Watch an entire cloud environment get provisioned from a single terraform apply command." },
    realWorldExamples: [{ title: "How GitLab manages infrastructure", description: "GitLab uses Terraform to manage their entire cloud infrastructure, enabling reproducible environments and disaster recovery.", lesson: "Infrastructure as code makes your infrastructure as reviewable and version-controlled as your application code." }],
    exercises: [{ id: "ex20", title: "Provision a VPC", description: "Use Terraform to create a complete VPC with public/private subnets, NAT gateway, and security groups on AWS.", type: "code" }],
    categoryWisdom: getWisdom("coding", 2),
    communityNote: "Terraform skills are incredibly valuable. Companies are willing to pay premium salaries for engineers who can manage infrastructure as code.",
  },

  /* ══════════════════════════════════════════════
     DESIGN — UI/UX
     ══════════════════════════════════════════════ */
  co13: {
    id: "co13",
    overview: "Google's UX Design Certificate is a comprehensive program that teaches the entire UX design process. From user research and personas to wireframing, prototyping, and usability testing — you'll learn industry-standard practices used by design teams at top tech companies. The program includes portfolio projects that demonstrate your skills to potential employers.",
    learningObjectives: ["Conduct user research and synthesize findings", "Create user personas and journey maps", "Design wireframes and high-fidelity prototypes in Figma", "Plan and run usability studies", "Apply accessibility principles to designs", "Build a professional UX design portfolio"],
    prerequisites: ["No design experience required", "Curiosity about how people use technology", "Access to Figma (free)"],
    modules: [
      { id: "m13-1", title: "Research & Strategy", lessons: [{ id: "l117", title: "UX design process", duration: "90 min" }, { id: "l118", title: "User research methods", duration: "120 min" }, { id: "l119", title: "Personas and journey maps", duration: "90 min" }] },
      { id: "m13-2", title: "Design & Prototype", lessons: [{ id: "l120", title: "Wireframing", duration: "120 min" }, { id: "l121", title: "Visual design principles", duration: "90 min" }, { id: "l122", title: "High-fidelity prototyping", duration: "150 min" }] },
      { id: "m13-3", title: "Test & Iterate", lessons: [{ id: "l123", title: "Usability testing", duration: "120 min" }, { id: "l124", title: "Iterating on feedback", duration: "90 min" }, { id: "l125", title: "Portfolio project", duration: "300 min" }] },
    ],
    videoPlaceholder: { title: "The Design Process in Action", description: "Follow a real UX design project from research through to a tested, refined prototype." },
    realWorldExamples: [
      { title: "How Steve Jobs made design a priority", description: "When Jobs returned to Apple in 1997, his first act was to simplify the product line and invest in design. He believed that design wasn't just about aesthetics — it was about making technology accessible to everyone. The iMac, iPod, iPhone, and iPad each redefined their categories through design thinking.", lesson: "Great design starts with understanding what people actually need — then removing everything that gets in the way." },
      { title: "How Duolingo gamified learning through UX", description: "Duolingo's UX design makes language learning feel like a game. Every interaction — streaks, hearts, celebrations — is carefully designed to motivate continued engagement.", lesson: "The best UX design is invisible — it guides behavior without the user noticing." },
    ],
    exercises: [
      { id: "ex21", title: "Redesign challenge", description: "Choose an app you find frustrating. Research 5 users, identify pain points, and redesign the key screens.", type: "design" },
      { id: "ex22", title: "Usability test", description: "Create a prototype and test it with 3 people. Document your findings and make one round of improvements.", type: "practice" },
    ],
    categoryWisdom: getWisdom("design", 0),
    communityNote: "UX design is one of the most accessible creative careers. This certificate has helped thousands of people transition from unrelated fields into fulfilling design roles.",
  },
  co14: {
    id: "co14",
    overview: "This intensive bootcamp focuses on the visual side of design — typography, color theory, layout composition, and creating polished, professional interfaces. You'll study real-world UI examples, learn to critique designs constructively, and build a portfolio of beautiful, functional screen designs.",
    learningObjectives: ["Apply typography principles to create visual hierarchy", "Build harmonious color palettes with purpose", "Create balanced, grid-based layouts", "Design consistent component libraries", "Understand visual design trends and timeless principles", "Develop your personal design aesthetic"],
    prerequisites: ["Basic understanding of design tools", "Interest in visual design", "Figma account (free)"],
    modules: [
      { id: "m14-1", title: "Visual Foundations", lessons: [{ id: "l126", title: "Typography deep dive", duration: "90 min" }, { id: "l127", title: "Color theory and palettes", duration: "75 min" }, { id: "l128", title: "Layout and composition", duration: "75 min" }] },
      { id: "m14-2", title: "UI Design Practice", lessons: [{ id: "l129", title: "Component design", duration: "90 min" }, { id: "l130", title: "Design critiques", duration: "60 min" }, { id: "l131", title: "Portfolio pieces", duration: "120 min" }] },
    ],
    videoPlaceholder: { title: "Typography That Speaks", description: "A visual exploration of how type choices create mood, hierarchy, and trust in digital interfaces." },
    realWorldExamples: [{ title: "Dieter Rams and functional beauty", description: "Rams' work at Braun influenced a generation of designers, including Jony Ive at Apple. His principle 'less, but better' remains the most powerful design philosophy.", lesson: "Restraint is the designer's superpower. Every element you remove makes the remaining elements stronger." }],
    exercises: [{ id: "ex23", title: "Daily UI challenge", description: "Complete 7 consecutive daily UI challenges, each exploring a different component type.", type: "design" }],
    categoryWisdom: getWisdom("design", 1),
    communityNote: "Visual design is a skill that improves dramatically with practice. Design something every day, even if it's just for 30 minutes.",
  },
  co15: {
    id: "co15",
    overview: "This specialization goes deep into interaction design — how people interact with digital products. You'll study input methods, gesture design, microinteractions, transition patterns, and how to design for accessibility. The curriculum draws from cognitive psychology and human factors research.",
    learningObjectives: ["Design intuitive interaction patterns", "Create meaningful microinteractions", "Apply cognitive psychology to interface design", "Design for accessibility and inclusive experiences", "Prototype complex interactions", "Evaluate designs through rigorous user testing"],
    prerequisites: ["Foundational design skills", "Experience with Figma or similar tools", "Basic understanding of UX principles"],
    modules: [
      { id: "m15-1", title: "Interaction Fundamentals", lessons: [{ id: "l132", title: "Input and feedback", duration: "90 min" }, { id: "l133", title: "Gesture design", duration: "75 min" }, { id: "l134", title: "Microinteractions", duration: "90 min" }] },
      { id: "m15-2", title: "Advanced Patterns", lessons: [{ id: "l135", title: "Navigation patterns", duration: "75 min" }, { id: "l136", title: "Form design", duration: "60 min" }, { id: "l137", title: "Accessibility deep dive", duration: "90 min" }] },
      { id: "m15-3", title: "Capstone", lessons: [{ id: "l138", title: "Comprehensive design project", duration: "300 min" }] },
    ],
    videoPlaceholder: { title: "Microinteractions That Delight", description: "A showcase of tiny design moments that transform functional interfaces into experiences people love." },
    realWorldExamples: [{ title: "How iOS gestures changed computing", description: "Apple's multitouch gestures — pinch to zoom, swipe to go back — redefined how humans interact with computers. These interactions feel 'natural' because they map to physical intuitions.", lesson: "The best interactions feel like they were always there — as if the technology is reading your mind." }],
    exercises: [{ id: "ex24", title: "Interaction redesign", description: "Take a web form that frustrates you. Redesign every interaction — validation, transitions, error states, success feedback.", type: "design" }],
    categoryWisdom: getWisdom("design", 2),
    communityNote: "Interaction design is where design meets engineering. Understanding both sides makes you extraordinarily valuable.",
  },

  /* ══════════════════════════════════════════════
     DESIGN — Motion
     ══════════════════════════════════════════════ */
  co16: {
    id: "co16",
    overview: "Motion design for UX focuses on creating animations that serve a purpose — guiding attention, providing feedback, and creating continuity between states. This isn't about making things flashy; it's about making interfaces feel alive and intuitive through thoughtful motion.",
    learningObjectives: ["Apply the 12 principles of animation to UI", "Design meaningful transitions between states", "Create motion that guides user attention", "Build animation specifications for developers", "Understand timing, easing, and choreography", "Design motion systems for design systems"],
    prerequisites: ["Solid understanding of UI design", "Basic familiarity with animation concepts", "Figma and/or After Effects"],
    modules: [
      { id: "m16-1", title: "Motion Principles", lessons: [{ id: "l139", title: "The 12 animation principles", duration: "90 min" }, { id: "l140", title: "Timing and easing", duration: "60 min" }, { id: "l141", title: "Motion choreography", duration: "75 min" }] },
      { id: "m16-2", title: "Applied Motion", lessons: [{ id: "l142", title: "Page transitions", duration: "90 min" }, { id: "l143", title: "Loading states", duration: "60 min" }, { id: "l144", title: "Celebration moments", duration: "60 min" }, { id: "l145", title: "Motion specifications", duration: "75 min" }] },
    ],
    videoPlaceholder: { title: "Motion That Means Something", description: "Side-by-side comparison of interfaces with and without purposeful motion — see the difference it makes." },
    realWorldExamples: [{ title: "How Stripe uses motion as a design language", description: "Stripe's website is celebrated for its motion design — gradient animations, scroll-triggered reveals, and interactive 3D elements that make a payment company feel exciting.", lesson: "Motion transforms static marketing into a living experience that communicates craftsmanship and attention to detail." }],
    exercises: [{ id: "ex25", title: "Animate a flow", description: "Take a 3-screen user flow and design every transition. Specify timing, easing, and choreography for each element.", type: "design" }],
    categoryWisdom: getWisdom("design", 0),
    communityNote: "Motion design is an increasingly valuable skill. As interfaces become more complex, the need for designers who understand motion only grows.",
  },
  co17: {
    id: "co17",
    overview: "CSS animations are the most accessible entry point to motion on the web. This masterclass covers transitions, keyframe animations, scroll-driven animations, and performance optimization. Everything is built with pure CSS — no JavaScript animation libraries required.",
    learningObjectives: ["Create smooth CSS transitions", "Build complex keyframe animations", "Implement scroll-driven animations", "Optimize animation performance", "Use CSS custom properties for dynamic animations", "Create accessible motion experiences"],
    prerequisites: ["Good CSS knowledge", "Understanding of the box model", "Basic HTML"],
    modules: [
      { id: "m17-1", title: "CSS Transitions", lessons: [{ id: "l146", title: "Transition properties", duration: "45 min" }, { id: "l147", title: "Easing functions", duration: "60 min" }, { id: "l148", title: "Hover and focus states", duration: "45 min" }] },
      { id: "m17-2", title: "Keyframe Animations", lessons: [{ id: "l149", title: "Building keyframe sequences", duration: "75 min" }, { id: "l150", title: "Complex multi-step animations", duration: "90 min" }, { id: "l151", title: "Scroll-driven animations", duration: "60 min" }, { id: "l152", title: "Performance optimization", duration: "45 min" }] },
    ],
    videoPlaceholder: { title: "CSS Animation from Zero to Hero", description: "Build increasingly complex animations live, from simple hovers to multi-element scroll-driven sequences." },
    realWorldExamples: [{ title: "How Linear uses CSS animations", description: "Linear's marketing website uses CSS animations extensively — smooth transitions, scroll-triggered reveals, and loading states that make the product feel fast and polished.", lesson: "Sometimes the simplest tools create the most elegant solutions. CSS animations are powerful enough for most UI motion." }],
    exercises: [{ id: "ex26", title: "Animation collection", description: "Build a library of 10 reusable CSS animation components: loading spinners, hover effects, entrance animations, and scroll reveals.", type: "code" }],
    categoryWisdom: getWisdom("design", 1),
    communityNote: "CSS animation is one of the highest-leverage skills a frontend developer can learn. It bridges the gap between design and development.",
  },
  co18: {
    id: "co18",
    overview: "After Effects is the industry standard for motion graphics and UI animation. This course teaches UI designers how to create polished animation prototypes, explainer animations, and Lottie files for production. You'll learn the After Effects workflow through a UI design lens.",
    learningObjectives: ["Navigate the After Effects interface efficiently", "Create UI animation prototypes", "Build scroll-driven animation sequences", "Export Lottie files for web and mobile", "Design animated icons and illustrations", "Create motion design specifications"],
    prerequisites: ["Strong visual design skills", "Basic understanding of animation principles", "Comfort with design tools"],
    modules: [
      { id: "m18-1", title: "AE Foundations", lessons: [{ id: "l153", title: "Interface and workflow", duration: "90 min" }, { id: "l154", title: "Keyframes and easing", duration: "75 min" }, { id: "l155", title: "Layer management", duration: "60 min" }] },
      { id: "m18-2", title: "UI Animation", lessons: [{ id: "l156", title: "Screen transitions", duration: "90 min" }, { id: "l157", title: "Microinteractions", duration: "75 min" }, { id: "l158", title: "Lottie export", duration: "60 min" }] },
      { id: "m18-3", title: "Advanced", lessons: [{ id: "l159", title: "Expressions basics", duration: "90 min" }, { id: "l160", title: "3D layers", duration: "75 min" }, { id: "l161", title: "Portfolio reel", duration: "120 min" }] },
    ],
    videoPlaceholder: { title: "From Figma to After Effects", description: "A complete workflow for creating production-quality UI animations starting from your Figma designs." },
    realWorldExamples: [{ title: "How Airbnb uses Lottie animations", description: "Airbnb created the Lottie format to bridge the gap between designers and developers. Animations created in After Effects can now run natively in apps.", lesson: "The right tools make the impossible feel easy. Lottie made high-quality animation accessible to every app." }],
    exercises: [{ id: "ex27", title: "Animated walkthrough", description: "Create a 30-second animated walkthrough of a mobile app, showcasing 5 key screens with smooth transitions.", type: "design" }],
    categoryWisdom: getWisdom("design", 2),
    communityNote: "Motion designers who can also code are unicorns in the industry. If you combine After Effects skills with frontend development, you'll be unstoppable.",
  },

  /* ══════════════════════════════════════════════
     ENTREPRENEURSHIP
     ══════════════════════════════════════════════ */
  co19: {
    id: "co19",
    overview: "Y Combinator has funded over 4,000 startups including Airbnb, Stripe, and Dropbox. Startup School distills their collective wisdom into a free, structured program. You'll learn how to find ideas, talk to users, build MVPs, measure growth, and avoid the most common startup mistakes — taught by the people who've seen thousands of startups succeed and fail.",
    learningObjectives: ["Evaluate startup ideas using the YC framework", "Conduct effective customer discovery interviews", "Build minimum viable products quickly", "Measure product-market fit", "Craft compelling pitches", "Navigate the first 12 months of a startup"],
    prerequisites: ["No startup experience required", "An idea or the desire to find one", "Willingness to talk to potential users"],
    modules: [
      { id: "m19-1", title: "Finding Ideas", lessons: [{ id: "l162", title: "How to get startup ideas", duration: "60 min" }, { id: "l163", title: "Evaluating ideas", duration: "45 min" }, { id: "l164", title: "Talking to users", duration: "75 min" }] },
      { id: "m19-2", title: "Building", lessons: [{ id: "l165", title: "MVP strategies", duration: "60 min" }, { id: "l166", title: "Launching", duration: "45 min" }, { id: "l167", title: "Iteration and pivoting", duration: "60 min" }] },
      { id: "m19-3", title: "Growing", lessons: [{ id: "l168", title: "Measuring growth", duration: "60 min" }, { id: "l169", title: "Fundraising basics", duration: "75 min" }, { id: "l170", title: "Common mistakes", duration: "45 min" }] },
    ],
    videoPlaceholder: { title: "How to Find Startup Ideas", description: "YC partners share the framework that has identified some of the most successful startups in history." },
    realWorldExamples: [
      { title: "How Airbnb went from $0 to $100B", description: "Brian Chesky started by renting air mattresses in his apartment. Through relentless customer focus and creative problem-solving — including selling cereal boxes to fund operations — Airbnb became one of the most valuable companies in the world.", lesson: "The best startups start by solving a problem the founders personally experience. Authenticity scales." },
      { title: "How Stripe simplified payments", description: "Patrick Collison noticed that accepting online payments was absurdly complex. Stripe reduced it to seven lines of code. That obsession with developer experience created a $95B company.", lesson: "If you can make something 10x easier, you've found a billion-dollar opportunity." },
    ],
    exercises: [
      { id: "ex28", title: "Idea evaluation", description: "Generate 10 startup ideas. Evaluate each against the YC framework: problem clarity, market size, founder-market fit. Pick the best one.", type: "reflection" },
      { id: "ex29", title: "Customer interviews", description: "Conduct 5 customer discovery interviews about your chosen problem. Document insights, patterns, and surprises.", type: "practice" },
    ],
    categoryWisdom: getWisdom("entrepreneurship", 0),
    communityNote: "Startup School has a vibrant community of founders at all stages. You'll find co-founders, mentors, and lifelong friends here.",
  },
  co20: {
    id: "co20",
    overview: "The Lean Startup methodology revolutionized how companies are built. This course teaches the Build-Measure-Learn feedback loop, hypothesis-driven development, validated learning, and when to pivot or persevere. You'll apply lean principles to real product decisions.",
    learningObjectives: ["Apply the Build-Measure-Learn framework", "Create and test business hypotheses", "Design experiments that generate validated learning", "Know when to pivot vs. persevere", "Build lean canvases and value proposition maps", "Measure what matters with actionable metrics"],
    prerequisites: ["Interest in building products", "No business experience required", "Curiosity and open-mindedness"],
    modules: [
      { id: "m20-1", title: "Lean Principles", lessons: [{ id: "l171", title: "The Build-Measure-Learn loop", duration: "60 min" }, { id: "l172", title: "Validated learning", duration: "45 min" }, { id: "l173", title: "Innovation accounting", duration: "60 min" }] },
      { id: "m20-2", title: "Applied Lean", lessons: [{ id: "l174", title: "Lean Canvas workshop", duration: "90 min" }, { id: "l175", title: "Experiment design", duration: "60 min" }, { id: "l176", title: "Pivot or persevere", duration: "45 min" }] },
    ],
    videoPlaceholder: { title: "The Lean Startup in Practice", description: "Real stories of startups that used lean methodology to find product-market fit — and those that didn't." },
    realWorldExamples: [{ title: "How Dropbox validated demand with a video", description: "Before building the product, Dropbox created a 3-minute demo video. Overnight, their beta signup list went from 5,000 to 75,000. They validated demand without writing a line of code.", lesson: "The fastest way to learn is to test your riskiest assumption first — and the MVP is the vehicle for that test." }],
    exercises: [{ id: "ex30", title: "Lean Canvas", description: "Fill out a Lean Canvas for an idea you're passionate about. Identify your riskiest assumption and design an experiment to test it.", type: "reflection" }],
    categoryWisdom: getWisdom("entrepreneurship", 1),
    communityNote: "Lean thinking applies far beyond startups. It transforms how you approach any problem — with humility, curiosity, and a bias toward action.",
  },
  co21: {
    id: "co21",
    overview: "Product management sits at the intersection of business, technology, and design. This course teaches the frameworks, tools, and mindset that top PMs use to build products people love. You'll learn roadmapping, prioritization, stakeholder management, and data-driven decision making.",
    learningObjectives: ["Define product vision and strategy", "Build and prioritize product roadmaps", "Write effective user stories and requirements", "Use data to drive product decisions", "Manage stakeholder relationships", "Run effective sprint planning and retrospectives"],
    prerequisites: ["Some professional work experience", "Interest in product development", "Basic understanding of technology"],
    modules: [
      { id: "m21-1", title: "PM Foundations", lessons: [{ id: "l177", title: "The PM role", duration: "45 min" }, { id: "l178", title: "Product vision and strategy", duration: "75 min" }, { id: "l179", title: "Roadmapping", duration: "60 min" }] },
      { id: "m21-2", title: "Execution", lessons: [{ id: "l180", title: "User stories and requirements", duration: "60 min" }, { id: "l181", title: "Prioritization frameworks", duration: "75 min" }, { id: "l182", title: "Data-driven decisions", duration: "60 min" }] },
    ],
    videoPlaceholder: { title: "A Day in the Life of a PM", description: "Follow a product manager through their day — standups, user interviews, roadmap reviews, and tough prioritization calls." },
    realWorldExamples: [{ title: "How Steve Jobs thought about product", description: "Jobs famously said 'People don't know what they want until you show it to them.' While lean methodology emphasizes user feedback, Jobs reminded us that vision and taste also matter enormously.", lesson: "Great product management balances user data with creative vision — you need both the spreadsheet and the dream." }],
    exercises: [{ id: "ex31", title: "Product teardown", description: "Choose a product you love. Analyze its strategy, features, business model, and competitive positioning. What would you change?", type: "analysis" }],
    categoryWisdom: getWisdom("entrepreneurship", 2),
    communityNote: "Product management is one of the most versatile and rewarding career paths in tech. The skills transfer to every industry.",
  },

  /* Growth & Marketing co22-co24 */
  co22: {
    id: "co22",
    overview: "HubSpot Academy's Inbound Marketing certification teaches the methodology that transformed digital marketing. Instead of interrupting people with ads, inbound marketing attracts customers through valuable content, SEO, and relationship building. You'll learn to create content strategies, optimize for search engines, and build conversion funnels.",
    learningObjectives: ["Understand the inbound marketing methodology", "Create content strategies aligned with buyer personas", "Optimize content for search engines", "Build lead nurturing email sequences", "Analyze marketing performance metrics", "Create conversion-focused landing pages"],
    prerequisites: ["No marketing experience required", "Basic understanding of the internet", "Interest in content creation"],
    modules: [
      { id: "m22-1", title: "Inbound Methodology", lessons: [{ id: "l183", title: "Attract, engage, delight", duration: "45 min" }, { id: "l184", title: "Buyer personas", duration: "60 min" }, { id: "l185", title: "Content strategy", duration: "75 min" }] },
      { id: "m22-2", title: "Execution", lessons: [{ id: "l186", title: "SEO fundamentals", duration: "60 min" }, { id: "l187", title: "Email marketing", duration: "60 min" }, { id: "l188", title: "Conversion optimization", duration: "45 min" }] },
    ],
    videoPlaceholder: { title: "Inbound Marketing in Action", description: "See how a small company built a content engine that generates leads automatically." },
    realWorldExamples: [{ title: "How HubSpot built a $30B company on content", description: "HubSpot practiced what they preached — their blog, free tools, and educational content attracted millions of visitors and built trust before any sales conversation.", lesson: "The best marketing doesn't feel like marketing. It feels like help." }],
    exercises: [{ id: "ex32", title: "Content plan", description: "Create a 30-day content plan for a business. Include blog posts, social media, and an email sequence.", type: "writing" }],
    categoryWisdom: getWisdom("entrepreneurship", 0),
    communityNote: "Inbound marketing skills are universal. Whether you're building a startup, freelancing, or working for a large company, these skills create value.",
  },
  co23: {
    id: "co23",
    overview: "Google Analytics is the world's most-used web analytics platform. This certification teaches you to set up tracking, analyze user behavior, create custom reports, and make data-driven marketing decisions. You'll learn to translate raw data into actionable insights that improve business outcomes.",
    learningObjectives: ["Set up Google Analytics tracking correctly", "Analyze user behavior and traffic sources", "Create custom reports and dashboards", "Set up conversion goals and funnels", "Use UTM parameters for campaign tracking", "Make data-driven marketing decisions"],
    prerequisites: ["Basic understanding of websites", "No analytics experience required", "Access to a website helpful but not required"],
    modules: [
      { id: "m23-1", title: "Analytics Setup", lessons: [{ id: "l189", title: "Installing and configuring GA4", duration: "45 min" }, { id: "l190", title: "Understanding metrics", duration: "60 min" }, { id: "l191", title: "Traffic sources and attribution", duration: "60 min" }] },
      { id: "m23-2", title: "Analysis & Reporting", lessons: [{ id: "l192", title: "Behavior analysis", duration: "60 min" }, { id: "l193", title: "Custom reports", duration: "45 min" }, { id: "l194", title: "Conversion tracking", duration: "45 min" }] },
    ],
    videoPlaceholder: { title: "Reading Analytics Like a Story", description: "Learn to look at analytics dashboards and see the story they're telling about your users' behavior." },
    realWorldExamples: [{ title: "How data drives growth at Booking.com", description: "Booking.com runs thousands of A/B tests simultaneously. Their data-driven culture means every design decision is validated by real user behavior.", lesson: "Opinions are useful, but data is definitive. The best growth teams test everything." }],
    exercises: [{ id: "ex33", title: "Analytics audit", description: "Analyze a website's Google Analytics data. Identify the top 3 opportunities for improvement and create a plan.", type: "analysis" }],
    categoryWisdom: getWisdom("entrepreneurship", 1),
    communityNote: "Analytics skills are like a superpower — they let you see patterns that others miss. Every marketer should be data-literate.",
  },
  co24: {
    id: "co24",
    overview: "Growth hacking is the discipline of rapid experimentation across marketing, product, and engineering to find the fastest paths to growth. This masterclass teaches the frameworks used by companies like Uber, Airbnb, and Dropbox to achieve explosive user growth.",
    learningObjectives: ["Design and run growth experiments", "Build viral loops and referral systems", "Optimize conversion funnels", "Identify and leverage growth channels", "Measure and improve key metrics (CAC, LTV, retention)", "Build growth models and forecasts"],
    prerequisites: ["Some marketing or product experience", "Basic analytics knowledge", "Comfort with experimentation"],
    modules: [
      { id: "m24-1", title: "Growth Foundations", lessons: [{ id: "l195", title: "Growth frameworks", duration: "60 min" }, { id: "l196", title: "Pirate metrics (AARRR)", duration: "45 min" }, { id: "l197", title: "Viral loop design", duration: "75 min" }] },
      { id: "m24-2", title: "Experimentation", lessons: [{ id: "l198", title: "Experiment design", duration: "75 min" }, { id: "l199", title: "A/B testing", duration: "60 min" }, { id: "l200", title: "Growth modeling", duration: "60 min" }] },
    ],
    videoPlaceholder: { title: "Growth Hacking Case Studies", description: "Deep dives into how Dropbox, Uber, and Slack achieved exponential growth through clever experimentation." },
    realWorldExamples: [{ title: "How Dropbox grew 3900% with referrals", description: "Dropbox's referral program — give storage, get storage — was one of the most successful growth hacks in history. It cost nearly nothing and drove explosive adoption.", lesson: "The best growth comes from making your product so good that people want to share it." }],
    exercises: [{ id: "ex34", title: "Growth experiment", description: "Design 3 growth experiments for a product. Define hypothesis, metrics, minimum sample size, and success criteria.", type: "analysis" }],
    categoryWisdom: getWisdom("entrepreneurship", 2),
    communityNote: "Growth is a mindset, not a job title. The most successful people in any field apply growth thinking to their career, health, and relationships.",
  },

  /* ══════════════════════════════════════════════
     DATA SCIENCE
     ══════════════════════════════════════════════ */
  co25: {
    id: "co25",
    overview: "Khan Academy's statistics curriculum is the gold standard for learning statistics from scratch. Taught through intuitive visualizations and real-world examples, you'll build genuine understanding of probability, distributions, hypothesis testing, and regression — the foundations that underpin all of data science and machine learning.",
    learningObjectives: ["Understand probability and random variables", "Work with common distributions (normal, binomial, Poisson)", "Conduct hypothesis tests and interpret p-values", "Perform linear regression analysis", "Calculate and interpret confidence intervals", "Identify and avoid common statistical fallacies"],
    prerequisites: ["Basic algebra", "No statistics experience required", "Curiosity about patterns in data"],
    modules: [
      { id: "m25-1", title: "Probability", lessons: [{ id: "l201", title: "Probability fundamentals", duration: "90 min" }, { id: "l202", title: "Random variables", duration: "75 min" }, { id: "l203", title: "Common distributions", duration: "90 min" }] },
      { id: "m25-2", title: "Inference", lessons: [{ id: "l204", title: "Sampling and estimation", duration: "75 min" }, { id: "l205", title: "Hypothesis testing", duration: "90 min" }, { id: "l206", title: "Confidence intervals", duration: "60 min" }] },
      { id: "m25-3", title: "Regression", lessons: [{ id: "l207", title: "Linear regression", duration: "90 min" }, { id: "l208", title: "Multiple regression", duration: "75 min" }, { id: "l209", title: "Model evaluation", duration: "60 min" }] },
    ],
    videoPlaceholder: { title: "Statistics Made Visual", description: "Complex statistical concepts explained through beautiful, interactive visualizations that make abstract ideas concrete." },
    realWorldExamples: [{ title: "How Florence Nightingale used data to save lives", description: "Nightingale was a pioneer of data visualization. Her polar area diagrams convinced the British government to improve hospital conditions, saving thousands of soldiers' lives.", lesson: "Data visualization isn't just about charts — it's about communicating truths that change minds and save lives." }],
    exercises: [{ id: "ex35", title: "Statistical analysis", description: "Find a public dataset, formulate 3 hypotheses, test them statistically, and write up your findings as a data story.", type: "analysis" }],
    categoryWisdom: getWisdom("data", 0),
    communityNote: "Statistics is the foundation of data science, AI, and evidence-based decision making. This investment pays dividends across every field.",
  },
  co26: {
    id: "co26",
    overview: "This course teaches Python specifically for data analysis. You'll master Pandas for data manipulation, NumPy for numerical computing, and Matplotlib/Seaborn for visualization. The emphasis is on practical, real-world data analysis workflows.",
    learningObjectives: ["Manipulate data with Pandas DataFrames", "Perform numerical computing with NumPy", "Create publication-quality visualizations", "Clean and transform messy real-world datasets", "Merge, group, and aggregate data efficiently", "Build reproducible analysis notebooks"],
    prerequisites: ["Basic Python knowledge", "Understanding of basic statistics", "Jupyter Notebook setup"],
    modules: [
      { id: "m26-1", title: "Data Manipulation", lessons: [{ id: "l210", title: "Pandas fundamentals", duration: "90 min" }, { id: "l211", title: "Data cleaning", duration: "75 min" }, { id: "l212", title: "Grouping and aggregation", duration: "60 min" }] },
      { id: "m26-2", title: "Visualization", lessons: [{ id: "l213", title: "Matplotlib basics", duration: "60 min" }, { id: "l214", title: "Seaborn for statistical plots", duration: "60 min" }, { id: "l215", title: "Interactive dashboards", duration: "45 min" }] },
    ],
    videoPlaceholder: { title: "Pandas in 30 Minutes", description: "A fast-paced tour of the most important Pandas operations you'll use every day as a data scientist." },
    realWorldExamples: [{ title: "How Spotify Wrapped uses data storytelling", description: "Spotify Wrapped transforms billions of data points into personalized stories that millions of users eagerly share. It's data analysis as art.", lesson: "The best data analysis doesn't just answer questions — it tells stories that people care about." }],
    exercises: [{ id: "ex36", title: "Data analysis project", description: "Download a Kaggle dataset, perform EDA, create 10 visualizations, and write a narrative explaining your findings.", type: "analysis" }],
    categoryWisdom: getWisdom("data", 1),
    communityNote: "Python is the lingua franca of data science. Every hour you invest in Pandas proficiency saves hundreds of hours in your career.",
  },
  co27: {
    id: "co27",
    overview: "This University of Michigan specialization takes you from intermediate Python to applied data science. You'll cover text mining, network analysis, and build machine learning models. The capstone has you analyze real datasets and present findings.",
    learningObjectives: ["Apply machine learning algorithms to real datasets", "Perform text mining and NLP tasks", "Analyze network structures and social graphs", "Build predictive models", "Visualize complex multi-dimensional data", "Communicate analysis findings effectively"],
    prerequisites: ["Python proficiency", "Statistics fundamentals", "Pandas and NumPy experience"],
    modules: [
      { id: "m27-1", title: "Applied Plotting", lessons: [{ id: "l216", title: "Advanced visualization", duration: "90 min" }, { id: "l217", title: "Interactive charts", duration: "75 min" }] },
      { id: "m27-2", title: "Machine Learning", lessons: [{ id: "l218", title: "Supervised learning", duration: "120 min" }, { id: "l219", title: "Model evaluation", duration: "90 min" }] },
      { id: "m27-3", title: "Text & Network", lessons: [{ id: "l220", title: "Text mining with NLTK", duration: "90 min" }, { id: "l221", title: "Network analysis with NetworkX", duration: "90 min" }] },
    ],
    videoPlaceholder: { title: "From Data to Decisions", description: "A complete analysis workflow from messy data to actionable business recommendations." },
    realWorldExamples: [{ title: "How Netflix recommendation algorithm works", description: "Netflix's recommendation system analyzes viewing patterns of 200M+ users to predict what you'll watch next. It saves Netflix $1B per year in reduced churn.", lesson: "Applied data science creates massive business value by turning behavioral data into personalized experiences." }],
    exercises: [{ id: "ex37", title: "End-to-end analysis", description: "Take a business question, find the data, analyze it, build a predictive model, and present your findings.", type: "analysis" }],
    categoryWisdom: getWisdom("data", 2),
    communityNote: "Applied data science is where theory meets impact. The ability to go from raw data to business insight is one of the most valuable skills in the modern economy.",
  },

  /* ML co28-co30 */
  co28: {
    id: "co28",
    overview: "Andrew Ng's Machine Learning course is where millions of data scientists started their journey. This Stanford course covers supervised learning, unsupervised learning, neural networks, and practical advice for applying ML in the real world. It's the single most important course in machine learning education.",
    learningObjectives: ["Understand supervised and unsupervised learning", "Implement linear and logistic regression from scratch", "Build and train neural networks", "Apply regularization to prevent overfitting", "Use gradient descent optimization", "Evaluate model performance rigorously"],
    prerequisites: ["Basic linear algebra", "Basic Python or Octave", "High school calculus helpful"],
    modules: [
      { id: "m28-1", title: "Supervised Learning", lessons: [{ id: "l222", title: "Linear regression", duration: "90 min" }, { id: "l223", title: "Logistic regression", duration: "90 min" }, { id: "l224", title: "Regularization", duration: "60 min" }] },
      { id: "m28-2", title: "Neural Networks", lessons: [{ id: "l225", title: "Neural network basics", duration: "90 min" }, { id: "l226", title: "Backpropagation", duration: "90 min" }, { id: "l227", title: "Training tips", duration: "60 min" }] },
      { id: "m28-3", title: "Unsupervised & Applied", lessons: [{ id: "l228", title: "Clustering (K-means)", duration: "60 min" }, { id: "l229", title: "Dimensionality reduction", duration: "60 min" }, { id: "l230", title: "ML system design", duration: "75 min" }] },
    ],
    videoPlaceholder: { title: "The Beauty of Machine Learning", description: "Andrew Ng explains why machine learning is the most exciting field in computer science — and why it matters for humanity." },
    realWorldExamples: [{ title: "How machine learning powers modern medicine", description: "ML models can now detect certain cancers more accurately than human radiologists. This course's alumni have gone on to build systems that literally save lives.", lesson: "Machine learning isn't just about algorithms — it's about using mathematics to solve problems that matter." }],
    exercises: [{ id: "ex38", title: "Build a classifier", description: "Implement a neural network from scratch (no frameworks) that classifies handwritten digits with >95% accuracy.", type: "code" }],
    categoryWisdom: getWisdom("data", 0),
    communityNote: "This course has been called 'the course that launched a thousand careers.' Andrew Ng's ability to make complex concepts intuitive is unmatched.",
  },
  co29: {
    id: "co29",
    overview: "fast.ai takes a top-down approach to deep learning — you'll train state-of-the-art models in the first lesson, then gradually understand the internals. Using PyTorch, you'll build image classifiers, NLP models, recommendation systems, and tabular models. The philosophy is practical: get results first, understand theory as needed.",
    learningObjectives: ["Train deep learning models with PyTorch", "Apply transfer learning for computer vision", "Build NLP models for text classification", "Create recommendation systems", "Understand neural network architectures", "Deploy models to production"],
    prerequisites: ["Python programming experience", "High school math", "No ML experience required"],
    modules: [
      { id: "m29-1", title: "Practical Deep Learning", lessons: [{ id: "l231", title: "Image classification", duration: "120 min" }, { id: "l232", title: "NLP fundamentals", duration: "120 min" }, { id: "l233", title: "Tabular data", duration: "90 min" }] },
      { id: "m29-2", title: "From Foundations", lessons: [{ id: "l234", title: "Neural networks from scratch", duration: "120 min" }, { id: "l235", title: "Backprop and optimization", duration: "90 min" }, { id: "l236", title: "Architectures", duration: "90 min" }] },
    ],
    videoPlaceholder: { title: "Deep Learning Made Practical", description: "Jeremy Howard's legendary teaching style makes cutting-edge AI accessible to anyone willing to learn." },
    realWorldExamples: [{ title: "How fast.ai alumni are changing the world", description: "fast.ai graduates have applied deep learning to agriculture (detecting crop diseases), medicine (analyzing medical images), and conservation (tracking endangered species).", lesson: "You don't need a PhD to make a real impact with AI. You need curiosity, persistence, and the right education." }],
    exercises: [{ id: "ex39", title: "Fine-tune a model", description: "Use transfer learning to build an image classifier for a domain you care about. Achieve >90% accuracy.", type: "code" }],
    categoryWisdom: getWisdom("data", 1),
    communityNote: "fast.ai's philosophy — 'making neural nets uncool again' — is about democratizing AI. Anyone can contribute to this field.",
  },
  co30: {
    id: "co30",
    overview: "DeepLearning.AI's specialization is the most comprehensive deep learning curriculum available. Across five courses, you'll cover neural network foundations, optimization, structuring ML projects, CNNs, and sequence models (RNNs, transformers). You'll understand not just how to use deep learning, but why it works.",
    learningObjectives: ["Build deep neural networks from scratch", "Implement CNN architectures for computer vision", "Build sequence models for NLP", "Apply best practices for ML project structure", "Understand optimization algorithms deeply", "Work with attention mechanisms and transformers"],
    prerequisites: ["Python programming", "Basic linear algebra and calculus", "Introductory ML knowledge helpful"],
    modules: [
      { id: "m30-1", title: "Neural Networks & Deep Learning", lessons: [{ id: "l237", title: "Network architecture", duration: "120 min" }, { id: "l238", title: "Optimization", duration: "90 min" }] },
      { id: "m30-2", title: "CNNs", lessons: [{ id: "l239", title: "Convolutional networks", duration: "120 min" }, { id: "l240", title: "Object detection", duration: "90 min" }] },
      { id: "m30-3", title: "Sequence Models", lessons: [{ id: "l241", title: "RNNs and LSTMs", duration: "90 min" }, { id: "l242", title: "Attention and transformers", duration: "120 min" }] },
    ],
    videoPlaceholder: { title: "The Transformer Architecture", description: "A visual explanation of the attention mechanism that powers GPT, BERT, and every modern language model." },
    realWorldExamples: [{ title: "How GPT was built on transformer architecture", description: "The transformer architecture, introduced in 'Attention Is All You Need,' is the foundation of ChatGPT, DALL-E, and most modern AI systems. Understanding transformers is understanding the future.", lesson: "The most powerful ideas in AI are often elegantly simple. Attention — letting the model focus on what matters — changed everything." }],
    exercises: [{ id: "ex40", title: "Build a transformer", description: "Implement a simplified transformer model from scratch. Train it on a text generation task and analyze the attention patterns.", type: "code" }],
    categoryWisdom: getWisdom("data", 2),
    communityNote: "Deep learning is moving at breathtaking speed. This specialization gives you the foundations to keep up with — and contribute to — the most exciting field in technology.",
  },

  /* ══════════════════════════════════════════════
     CONTENT & WRITING
     ══════════════════════════════════════════════ */
  co31: {
    id: "co31",
    overview: "Google's free technical writing course is the most efficient way to improve your technical communication skills. In just a few focused hours, you'll learn to write clear, concise, and accurate technical content. The exercises are practical and immediately applicable.",
    learningObjectives: ["Write clear, concise technical sentences", "Organize information with logical structure", "Create effective code samples and examples", "Use active voice and strong verbs", "Write for international audiences", "Create useful lists and tables"],
    prerequisites: ["English proficiency", "Some technical knowledge helpful", "Desire to communicate clearly"],
    modules: [
      { id: "m31-1", title: "Technical Writing One", lessons: [{ id: "l243", title: "Words and sentences", duration: "60 min" }, { id: "l244", title: "Paragraphs and documents", duration: "60 min" }, { id: "l245", title: "Editing exercises", duration: "45 min" }] },
      { id: "m31-2", title: "Technical Writing Two", lessons: [{ id: "l246", title: "Organizing large docs", duration: "60 min" }, { id: "l247", title: "Illustrations and code", duration: "45 min" }, { id: "l248", title: "Review and feedback", duration: "30 min" }] },
    ],
    videoPlaceholder: { title: "The Art of Clear Writing", description: "Before-and-after examples showing how simple editing techniques transform confusing prose into crystal-clear communication." },
    realWorldExamples: [{ title: "How Stripe's docs became the gold standard", description: "Stripe's documentation is so good that developers choose Stripe over competitors partly because of the docs. Clear writing directly drives business outcomes.", lesson: "Good documentation is good business. Every dollar spent on clarity saves ten in support." }],
    exercises: [{ id: "ex41", title: "Edit for clarity", description: "Take a confusing technical document and rewrite it. Cut word count by 40% while preserving all information.", type: "writing" }],
    categoryWisdom: getWisdom("writing", 0),
    communityNote: "Writing clearly is the most underrated skill in technology. Engineers who write well get promoted faster, influence more, and build better products.",
  },
  co32: {
    id: "co32",
    overview: "API documentation is a specialized and highly valued form of technical writing. This course teaches OpenAPI/Swagger specifications, endpoint documentation, authentication guides, code samples, and error documentation. You'll learn what makes API docs great.",
    learningObjectives: ["Write OpenAPI/Swagger specifications", "Document REST API endpoints effectively", "Create useful code samples in multiple languages", "Write authentication and quickstart guides", "Handle error documentation", "Structure API reference documentation"],
    prerequisites: ["Basic understanding of APIs and HTTP", "Some writing experience", "Familiarity with JSON"],
    modules: [
      { id: "m32-1", title: "API Doc Fundamentals", lessons: [{ id: "l249", title: "OpenAPI specification", duration: "60 min" }, { id: "l250", title: "Endpoint documentation", duration: "75 min" }, { id: "l251", title: "Code samples", duration: "45 min" }] },
      { id: "m32-2", title: "Advanced API Docs", lessons: [{ id: "l252", title: "Quickstart guides", duration: "45 min" }, { id: "l253", title: "Error documentation", duration: "30 min" }, { id: "l254", title: "API reference structure", duration: "45 min" }] },
    ],
    videoPlaceholder: { title: "Great API Docs Deconstructed", description: "A side-by-side comparison of excellent and poor API documentation — and what makes the difference." },
    realWorldExamples: [{ title: "Why Twilio's docs win developers", description: "Twilio's documentation includes interactive code editors, multiple language examples, and step-by-step quickstarts that let developers go from zero to working code in minutes.", lesson: "The best API docs respect the developer's time. Make the happy path obvious and the edge cases discoverable." }],
    exercises: [{ id: "ex42", title: "Document an API", description: "Choose a public API and write complete documentation: overview, authentication, 5 endpoints, code samples, and error reference.", type: "writing" }],
    categoryWisdom: getWisdom("writing", 1),
    communityNote: "API technical writers are in high demand and well-compensated. This niche combines writing skill with technical understanding in a way few others do.",
  },
  co33: {
    id: "co33",
    overview: "This comprehensive program covers information architecture, content strategy, style guide development, UX writing, and the business of technical communication. It prepares you for a professional career in technical communication across industries.",
    learningObjectives: ["Design information architectures for complex content", "Develop organizational style guides", "Write UX copy for digital interfaces", "Manage documentation projects end-to-end", "Apply content strategy principles", "Build a professional technical writing portfolio"],
    prerequisites: ["Strong writing skills", "Some professional experience", "Interest in technology"],
    modules: [
      { id: "m33-1", title: "Information Architecture", lessons: [{ id: "l255", title: "Content organization", duration: "90 min" }, { id: "l256", title: "Navigation design", duration: "75 min" }, { id: "l257", title: "Taxonomy and metadata", duration: "60 min" }] },
      { id: "m33-2", title: "Style & UX Writing", lessons: [{ id: "l258", title: "Style guide development", duration: "90 min" }, { id: "l259", title: "UX writing fundamentals", duration: "75 min" }, { id: "l260", title: "Microcopy and error messages", duration: "60 min" }] },
      { id: "m33-3", title: "Portfolio", lessons: [{ id: "l261", title: "Case study development", duration: "120 min" }, { id: "l262", title: "Portfolio presentation", duration: "90 min" }] },
    ],
    videoPlaceholder: { title: "Words That Work", description: "How UX writers at top companies craft microcopy that guides millions of users through complex workflows." },
    realWorldExamples: [{ title: "How Mailchimp's voice transformed B2B", description: "Mailchimp proved that B2B software doesn't have to sound boring. Their warm, human voice made email marketing accessible and even fun.", lesson: "Voice is a design element. The right words, in the right tone, create emotional connection and trust." }],
    exercises: [{ id: "ex43", title: "Style guide", description: "Create a mini style guide for a product. Include voice, tone, word list, and 10 examples of UI copy.", type: "writing" }],
    categoryWisdom: getWisdom("writing", 2),
    communityNote: "Technical communication is a stable, well-paying career that combines creativity with analytical thinking. The field is growing as technology becomes more complex.",
  },

  /* Storytelling & Copy co34-co36 */
  co34: {
    id: "co34",
    overview: "CopyHackers is the premier copywriting education platform, and this course teaches conversion-focused copywriting. You'll learn to write headlines that hook, body copy that persuades, and CTAs that convert. The methods are data-driven and battle-tested.",
    learningObjectives: ["Write headlines that capture attention", "Craft value propositions that resonate", "Structure persuasive long-form copy", "Write CTAs that drive action", "A/B test copy variations", "Apply psychological triggers ethically"],
    prerequisites: ["Basic writing ability", "Interest in marketing and persuasion", "No copywriting experience required"],
    modules: [
      { id: "m34-1", title: "Conversion Copy", lessons: [{ id: "l263", title: "Headlines and hooks", duration: "75 min" }, { id: "l264", title: "Value propositions", duration: "60 min" }, { id: "l265", title: "Long-form persuasion", duration: "90 min" }] },
      { id: "m34-2", title: "Applied Copywriting", lessons: [{ id: "l266", title: "Landing page copy", duration: "75 min" }, { id: "l267", title: "Email sequences", duration: "60 min" }, { id: "l268", title: "A/B testing copy", duration: "60 min" }] },
    ],
    videoPlaceholder: { title: "Copy That Converts", description: "Before-and-after examples of landing pages transformed by better copy — with the conversion data to prove it." },
    realWorldExamples: [{ title: "How Apple's copywriting sells dreams", description: "Apple never sells specifications — they sell experiences. 'A thousand songs in your pocket' is infinitely more compelling than '5GB storage.' Their copy focuses on what technology enables, not what it is.", lesson: "Great copy sells transformation, not features. People buy better versions of themselves." }],
    exercises: [{ id: "ex44", title: "Landing page", description: "Write complete landing page copy for a product. Include headline, subhead, benefits, social proof, and CTA.", type: "writing" }],
    categoryWisdom: getWisdom("writing", 0),
    communityNote: "Copywriting is the single highest-ROI writing skill. Every business needs copy, and good copy directly drives revenue.",
  },
  co35: {
    id: "co35",
    overview: "Storytelling is humanity's oldest technology. This course teaches narrative structure, character development, conflict and resolution, and how to apply these timeless patterns to modern content. Whether you're writing blog posts, brand narratives, or presentations, story structure makes your content memorable.",
    learningObjectives: ["Understand the three-act structure and hero's journey", "Create compelling characters and conflicts", "Build narrative tension and pacing", "Apply storytelling frameworks to business content", "Write openings that hook and endings that resonate", "Develop your unique voice and style"],
    prerequisites: ["Love of reading and stories", "Basic writing ability", "No formal training required"],
    modules: [
      { id: "m35-1", title: "Story Structure", lessons: [{ id: "l269", title: "The three-act structure", duration: "60 min" }, { id: "l270", title: "Character and conflict", duration: "45 min" }, { id: "l271", title: "Tension and pacing", duration: "60 min" }] },
      { id: "m35-2", title: "Applied Storytelling", lessons: [{ id: "l272", title: "Storytelling in business", duration: "60 min" }, { id: "l273", title: "Finding your voice", duration: "45 min" }, { id: "l274", title: "Writing practice", duration: "60 min" }] },
    ],
    videoPlaceholder: { title: "The Science of Story", description: "Why stories activate different parts of the brain than facts alone — and how to use this to communicate more effectively." },
    realWorldExamples: [{ title: "How Steve Jobs used story in product launches", description: "Jobs' keynotes were masterclasses in storytelling. He structured presentations as three-act stories with a hero (the product), a villain (the status quo), and a transformative resolution.", lesson: "The most powerful presentation isn't a list of features — it's a story about how the world changes." }],
    exercises: [{ id: "ex45", title: "Tell your story", description: "Write a 1,000-word personal essay about a transformative experience. Use the three-act structure and focus on sensory details.", type: "writing" }],
    categoryWisdom: getWisdom("writing", 1),
    communityNote: "Storytelling is a skill that enhances every other skill. Whether you're giving a talk, writing documentation, or pitching investors — story is the thread that makes information stick.",
  },
  co36: {
    id: "co36",
    overview: "Brand voice is what makes a company feel human. This course teaches you to define, document, and maintain a consistent brand voice across every touchpoint. You'll create messaging frameworks, tone guidelines, and voice charts that scale across teams.",
    learningObjectives: ["Define brand voice attributes and personality", "Create voice and tone guidelines", "Write messaging frameworks for different audiences", "Maintain consistency across channels", "Adapt voice for different contexts", "Build brand voice documentation"],
    prerequisites: ["Writing experience", "Understanding of brand basics", "Interest in brand strategy"],
    modules: [
      { id: "m36-1", title: "Brand Voice", lessons: [{ id: "l275", title: "Voice vs. tone", duration: "45 min" }, { id: "l276", title: "Voice attributes", duration: "60 min" }, { id: "l277", title: "Messaging hierarchy", duration: "60 min" }] },
      { id: "m36-2", title: "Applied Brand", lessons: [{ id: "l278", title: "Voice charts", duration: "45 min" }, { id: "l279", title: "Channel adaptation", duration: "45 min" }, { id: "l280", title: "Brand voice document", duration: "60 min" }] },
    ],
    videoPlaceholder: { title: "Voice That Connects", description: "How brands like Mailchimp, Slack, and Notion developed voices that feel authentic and human." },
    realWorldExamples: [{ title: "How Slack's voice built a community", description: "Slack's warm, witty, and helpful voice made enterprise software feel approachable. Their loading messages, release notes, and error pages all reflect a consistent, human personality.", lesson: "Consistency builds trust. When your voice is the same everywhere, people feel like they know you." }],
    exercises: [{ id: "ex46", title: "Voice guide", description: "Create a comprehensive brand voice guide: personality traits, do/don't examples, and 20 sample messages across different scenarios.", type: "writing" }],
    categoryWisdom: getWisdom("writing", 2),
    communityNote: "Brand voice work is some of the most impactful writing you can do. It shapes how thousands or millions of people experience a company.",
  },

  /* ══════════════════════════════════════════════
     PERSONAL GROWTH — Habits
     ══════════════════════════════════════════════ */
  co37: {
    id: "co37",
    overview: "The most popular online course ever created teaches you how your brain learns. Drawing from neuroscience and cognitive psychology, you'll discover powerful techniques for mastering tough subjects: chunking, spaced repetition, the Pomodoro Technique, and how to overcome procrastination. These meta-learning skills accelerate everything else you study.",
    learningObjectives: ["Understand focused vs. diffuse thinking modes", "Apply chunking to break down complex topics", "Use spaced repetition for long-term retention", "Overcome procrastination with proven techniques", "Improve memory and recall", "Develop effective study habits"],
    prerequisites: ["No prerequisites", "Open to anyone who wants to learn better", "Available in multiple languages"],
    modules: [
      { id: "m37-1", title: "How the Brain Learns", lessons: [{ id: "l281", title: "Focused and diffuse modes", duration: "60 min" }, { id: "l282", title: "Chunking", duration: "45 min" }, { id: "l283", title: "Memory and sleep", duration: "45 min" }] },
      { id: "m37-2", title: "Practical Techniques", lessons: [{ id: "l284", title: "Overcoming procrastination", duration: "60 min" }, { id: "l285", title: "Spaced repetition", duration: "45 min" }, { id: "l286", title: "Building learning habits", duration: "45 min" }] },
    ],
    videoPlaceholder: { title: "Your Brain on Learning", description: "Animated visualizations of how neural pathways form when you learn — and why sleep, exercise, and practice matter so much." },
    realWorldExamples: [{ title: "How chess grandmasters 'chunk' knowledge", description: "Chess masters don't memorize positions — they recognize patterns (chunks) from thousands of games. This chunking ability is exactly what happens when you deeply learn any subject.", lesson: "Learning is not about memorizing facts — it's about building patterns that your brain can access effortlessly." }],
    exercises: [
      { id: "ex47", title: "Learning experiment", description: "Choose a difficult concept you've been avoiding. Apply the Pomodoro Technique and spaced repetition for one week. Journal your progress.", type: "reflection" },
    ],
    categoryWisdom: getWisdom("wellness", 0),
    communityNote: "This course has transformed how millions of people learn. The skills are universal — they work whether you're studying medicine, programming, languages, or music.",
  },
  co38: {
    id: "co38",
    overview: "Yale's most popular course, taught by Professor Laurie Santos, explores the science of happiness. You'll learn what psychological research actually says about what makes us happy — and how our expectations and biases often lead us astray. The course includes 'rewirements' — behavioral exercises designed to build happier habits.",
    learningObjectives: ["Understand the science of happiness and well-being", "Identify cognitive biases that undermine happiness", "Build evidence-based happiness habits", "Practice gratitude and mindfulness techniques", "Design a personalized well-being routine", "Understand the connection between purpose and fulfillment"],
    prerequisites: ["No prerequisites", "Open to everyone", "Willingness to try behavioral experiments"],
    modules: [
      { id: "m38-1", title: "Misconceptions", lessons: [{ id: "l287", title: "What we think makes us happy", duration: "60 min" }, { id: "l288", title: "Hedonic adaptation", duration: "45 min" }, { id: "l289", title: "Social comparison", duration: "45 min" }] },
      { id: "m38-2", title: "What Actually Works", lessons: [{ id: "l290", title: "Gratitude and kindness", duration: "60 min" }, { id: "l291", title: "Social connection", duration: "45 min" }, { id: "l292", title: "Purpose and flow", duration: "60 min" }] },
      { id: "m38-3", title: "Rewirements", lessons: [{ id: "l293", title: "Building happiness habits", duration: "45 min" }, { id: "l294", title: "Your happiness plan", duration: "60 min" }] },
    ],
    videoPlaceholder: { title: "The Science of a Good Life", description: "Professor Santos shares the research that surprised her most — and the habits that actually change how you feel." },
    realWorldExamples: [{ title: "How gratitude changes the brain", description: "Neuroscience research shows that practicing gratitude for just 21 days measurably changes brain activity in regions associated with well-being. The effects persist even after the practice stops.", lesson: "Happiness isn't a destination — it's a practice. Small, consistent actions rewire your brain for well-being." }],
    exercises: [{ id: "ex48", title: "Gratitude practice", description: "Write down 3 things you're grateful for every night for 14 days. At the end, reflect on how your perspective has shifted.", type: "reflection" }],
    categoryWisdom: getWisdom("wellness", 1),
    communityNote: "This course has been taken by over 4 million people. The 'rewirements' work — but only if you actually do them. Commit to the practice.",
  },
  co39: {
    id: "co39",
    overview: "Dr. Andrew Huberman distills neuroscience research into practical protocols for improving focus, attention, and productivity. This toolkit covers the science of dopamine, the optimal times for focused work, the role of sleep in learning, and specific techniques for extending your concentration.",
    learningObjectives: ["Understand the neuroscience of focus and attention", "Apply dopamine management for sustained motivation", "Optimize your work schedule for peak performance", "Improve sleep quality for better learning", "Use visual focus techniques for concentration", "Build sustainable productivity routines"],
    prerequisites: ["No science background required", "Interest in performance optimization", "Open to evidence-based approaches"],
    modules: [
      { id: "m39-1", title: "Focus Science", lessons: [{ id: "l295", title: "The neuroscience of attention", duration: "45 min" }, { id: "l296", title: "Dopamine and motivation", duration: "45 min" }, { id: "l297", title: "Visual focus techniques", duration: "30 min" }] },
      { id: "m39-2", title: "Applied Focus", lessons: [{ id: "l298", title: "Optimal work scheduling", duration: "30 min" }, { id: "l299", title: "Sleep for performance", duration: "30 min" }, { id: "l300", title: "Building focus habits", duration: "30 min" }] },
    ],
    videoPlaceholder: { title: "Rewire Your Focus", description: "Science-backed techniques for extending deep focus sessions — demonstrated with brain imaging data." },
    realWorldExamples: [{ title: "How elite athletes use focus techniques", description: "Olympic athletes train their focus as deliberately as they train their bodies. Many of the same techniques — visualization, breath work, attention anchoring — apply directly to cognitive work.", lesson: "Focus is a muscle. The more deliberately you train it, the stronger it gets." }],
    exercises: [{ id: "ex49", title: "Focus protocol", description: "Design your ideal focused work protocol. Test it for 5 days, measure your output, and iterate.", type: "practice" }],
    categoryWisdom: getWisdom("wellness", 2),
    communityNote: "Huberman Lab has made neuroscience accessible to millions. These protocols are based on peer-reviewed research, not internet trends.",
  },

  /* Mindset co40-co42 */
  co40: {
    id: "co40",
    overview: "A second offering of Yale's transformative course — this time focused specifically on positive psychology and building happiness habits. The course explores how character strengths, social connections, and purpose create lasting well-being. Perfect for those who want a deeper understanding of the science.",
    learningObjectives: ["Identify and leverage your character strengths", "Build meaningful social connections", "Find and cultivate a sense of purpose", "Apply positive psychology interventions", "Design a sustainable well-being practice", "Understand the neuroscience of positive emotions"],
    prerequisites: ["No prerequisites", "Complementary to co38 but standalone", "Open to everyone"],
    modules: [
      { id: "m40-1", title: "Positive Psychology", lessons: [{ id: "l301", title: "Character strengths", duration: "60 min" }, { id: "l302", title: "Flow and engagement", duration: "45 min" }, { id: "l303", title: "Meaning and purpose", duration: "60 min" }] },
      { id: "m40-2", title: "Practice", lessons: [{ id: "l304", title: "Positive interventions", duration: "60 min" }, { id: "l305", title: "Relationship building", duration: "45 min" }, { id: "l306", title: "Your well-being plan", duration: "60 min" }] },
    ],
    videoPlaceholder: { title: "The Happiness Advantage", description: "Research showing that happiness precedes success — not the other way around — and how to apply this insight." },
    realWorldExamples: [{ title: "How Google invested in employee well-being", description: "Google's 'Search Inside Yourself' program proved that mindfulness training improves focus, emotional intelligence, and job satisfaction — measurably and at scale.", lesson: "Investing in your well-being isn't self-indulgent — it's the foundation of sustainable high performance." }],
    exercises: [{ id: "ex50", title: "Strengths audit", description: "Take the VIA Character Strengths survey. Write about how your top 5 strengths show up in your daily life and how you could use them more.", type: "reflection" }],
    categoryWisdom: getWisdom("wellness", 0),
    communityNote: "Positive psychology is backed by decades of rigorous research. These aren't feel-good platitudes — they're evidence-based practices that measurably improve quality of life.",
  },
  co41: {
    id: "co41",
    overview: "Brené Brown's research on vulnerability, courage, and empathy has reached over 60 million people. This course explores her findings: that vulnerability is not weakness but the birthplace of innovation, creativity, and change. You'll learn to embrace imperfection and build deeper, more authentic connections.",
    learningObjectives: ["Understand vulnerability as a strength", "Develop shame resilience", "Practice empathy in relationships and work", "Build courage through small, daily actions", "Create belonging in teams and communities", "Live with greater authenticity"],
    prerequisites: ["No prerequisites", "Openness to self-reflection", "Courage to be honest with yourself"],
    modules: [
      { id: "m41-1", title: "Vulnerability & Courage", lessons: [{ id: "l307", title: "The power of vulnerability", duration: "60 min" }, { id: "l308", title: "Shame resilience", duration: "60 min" }, { id: "l309", title: "Daring leadership", duration: "60 min" }] },
      { id: "m41-2", title: "Connection", lessons: [{ id: "l310", title: "Empathy vs. sympathy", duration: "45 min" }, { id: "l311", title: "Building trust (BRAVING)", duration: "60 min" }, { id: "l312", title: "Rising strong", duration: "45 min" }] },
    ],
    videoPlaceholder: { title: "The Call to Courage", description: "Brené Brown's message: vulnerability is not about winning or losing. It's about showing up when you can't control the outcome." },
    realWorldExamples: [{ title: "How vulnerability transforms leadership", description: "Leaders who admit mistakes, ask for help, and show genuine emotion don't appear weak — they build trust, loyalty, and psychological safety in their teams.", lesson: "The strongest organizations are built by leaders brave enough to be vulnerable." }],
    exercises: [{ id: "ex51", title: "Vulnerability practice", description: "Identify one area where you're holding back due to fear. Take one small, brave action this week. Journal about the experience.", type: "reflection" }],
    categoryWisdom: getWisdom("wellness", 1),
    communityNote: "Brené Brown's work has been embraced by everyone from military leaders to tech CEOs. Vulnerability and courage are universal human needs.",
  },
  co42: {
    id: "co42",
    overview: "Emotional intelligence (EQ) is the strongest predictor of workplace success — stronger than IQ or technical skills. This course teaches self-awareness, self-regulation, empathy, social skills, and motivation. You'll learn to navigate complex interpersonal dynamics with grace and effectiveness.",
    learningObjectives: ["Assess and improve your emotional intelligence", "Develop self-awareness through reflection", "Practice emotional self-regulation techniques", "Build empathy and active listening skills", "Navigate conflict constructively", "Influence and inspire others"],
    prerequisites: ["Professional work experience helpful", "No psychology background needed", "Willingness for honest self-assessment"],
    modules: [
      { id: "m42-1", title: "Self-Awareness & Regulation", lessons: [{ id: "l313", title: "Understanding your emotions", duration: "60 min" }, { id: "l314", title: "Emotional triggers", duration: "45 min" }, { id: "l315", title: "Self-regulation techniques", duration: "60 min" }] },
      { id: "m42-2", title: "Social Intelligence", lessons: [{ id: "l316", title: "Empathy and listening", duration: "60 min" }, { id: "l317", title: "Navigating conflict", duration: "60 min" }, { id: "l318", title: "Inspiring others", duration: "45 min" }] },
    ],
    videoPlaceholder: { title: "EQ at Work", description: "Real workplace scenarios showing how emotional intelligence transforms difficult conversations into collaborative breakthroughs." },
    realWorldExamples: [{ title: "How Satya Nadella transformed Microsoft with empathy", description: "When Nadella became CEO, he shifted Microsoft's culture from 'know-it-all' to 'learn-it-all.' His emphasis on empathy, growth mindset, and emotional intelligence revitalized a trillion-dollar company.", lesson: "The most important leadership skill isn't strategic vision — it's the ability to understand and connect with people." }],
    exercises: [{ id: "ex52", title: "EQ journal", description: "For one week, journal about your emotional reactions at work. Identify patterns, triggers, and moments where better regulation would have changed the outcome.", type: "reflection" }],
    categoryWisdom: getWisdom("wellness", 2),
    communityNote: "EQ is the multiplier that makes every other skill more effective. Technical expertise gets you in the door — emotional intelligence determines how far you go.",
  },
  co43: {
    id: "co43",
    overview: "The National Strength and Conditioning Association Certified Personal Trainer (NSCA-CPT) certification is the gold standard for fitness professionals worldwide. This course covers functional anatomy, biomechanics, exercise technique, client consultation, program design, and emergency protocols, giving you the knowledge and clinical judgment to train diverse client populations safely and effectively.",
    learningObjectives: [
      "Master functional anatomy, kinetic chains, and joint levers",
      "Conduct comprehensive client consultations, health history, and fitness assessments",
      "Demonstrate and coach proper biomechanical form on compound and isolation lifts",
      "Design periodized strength and conditioning programs tailored to client goals",
      "Apply exercise physiology to optimize energy system development and recovery",
      "Implement client safety guidelines, spotter techniques, and facility risk management",
    ],
    prerequisites: ["High school diploma or equivalent", "CPR/AED certification recommended", "Basic interest in human biology and fitness"],
    modules: [
      {
        id: "m43-1",
        title: "Anatomy, Biomechanics & Exercise Physiology",
        lessons: [
          { id: "l319", title: "Musculoskeletal anatomy and planes of motion", duration: "75 min" },
          { id: "l320", title: "Bioenergetics and cardiovascular adaptations", duration: "60 min" },
          { id: "l321", title: "Neuromuscular coordination and force production", duration: "60 min" },
          { id: "l322", title: "Biomechanics of lifting and resistance curves", duration: "75 min" },
        ],
      },
      {
        id: "m43-2",
        title: "Client Consultation & Fitness Assessment",
        lessons: [
          { id: "l323", title: "PAR-Q+ screening and medical clearance protocols", duration: "45 min" },
          { id: "l324", title: "Vital signs and body composition assessment", duration: "60 min" },
          { id: "l325", title: "Cardiorespiratory and muscular endurance testing", duration: "60 min" },
          { id: "l326", title: "Movement screening and flexibility evaluations", duration: "60 min" },
        ],
      },
      {
        id: "m43-3",
        title: "Program Design & Training Techniques",
        lessons: [
          { id: "l327", title: "Free weight and machine resistance technique", duration: "90 min" },
          { id: "l328", title: "Spotting techniques and client safety protocols", duration: "45 min" },
          { id: "l329", title: "Periodization models and volume-intensity planning", duration: "75 min" },
          { id: "l330", title: "Training special populations: youth, seniors, and prenatal", duration: "60 min" },
        ],
      },
    ],
    videoPlaceholder: {
      title: "The Art of Barbell Coaching",
      description: "Step-by-step visual breakdowns of setup, cueing, common faults, and instant form corrections for the squat, bench press, deadlift, and overhead press.",
    },
    realWorldExamples: [
      {
        title: "How elite trainers program for client longevity",
        description: "Instead of grinding clients into exhaustion with random high-intensity workouts, top NSCA trainers use undulating periodization and movement screens to build strength without joint inflammation.",
        lesson: "Progressive overload combined with movement quality creates lifelong client adherence and zero injuries.",
      },
      {
        title: "From gym floor trainer to boutique fitness director",
        description: "A certified trainer scaled their practice by introducing systematic movement assessments during client intake, increasing client retention from 3 months to over 2 years.",
        lesson: "Objective assessment data builds immediate credibility and trust with clients.",
      },
    ],
    exercises: [
      {
        id: "ex53",
        title: "Client Intake & Program Design Case Study",
        description: "Review a 42-year-old desk worker's health questionnaire. Design their first 4-week strength protocol balancing postural correction with progressive resistance.",
        type: "analysis",
      },
      {
        id: "ex54",
        title: "Biomechanical Form Critique",
        description: "Analyze three video clips of clients deadlifting. Identify lumbar flexion, early hip shoot, and knee collapse. Write exact verbal cues to correct each error.",
        type: "analysis",
      },
    ],
    categoryWisdom: {
      quote: "Strength is the mother quality of all physical attributes. When strength increases, every other physical capacity improves with it.",
      author: "Mark Rippetoe",
      role: "Strength Coach & Author",
    },
    communityNote: "The NSCA-CPT credential is recognized across professional gyms, collegiate athletic departments, and private coaching facilities globally.",
  },
  co46: {
    id: "co46",
    overview: "The NASM Corrective Exercise Specialist (CES) curriculum provides the clinical assessment and programming skills necessary to address muscle imbalances, faulty movement patterns, and joint limitations before they become injuries. Learn the NASM 4-Phase Corrective Exercise Continuum (Inhibit, Lengthen, Activate, Integrate) to keep clients moving pain-free.",
    learningObjectives: [
      "Conduct static postural, dynamic movement, and range of motion assessments",
      "Identify common postural distortion syndromes (Upper and Lower Crossed, Pronation Distortion)",
      "Apply self-myofascial release (Inhibit) and neuromuscular stretching (Lengthen)",
      "Prescribe isolated strengthening drills (Activate) for dormant stabilizers",
      "Program multi-joint integrated movement patterns (Integrate) to retrain neuromuscular coordination",
      "Safely transition corrective protocols into full-body strength and conditioning workouts",
    ],
    prerequisites: ["Personal training certification or fitness coaching experience recommended", "Basic anatomy knowledge"],
    modules: [
      {
        id: "m46-1",
        title: "Movement Assessments & Postural Analysis",
        lessons: [
          { id: "l331", title: "The kinetic chain and cumulative injury cycle", duration: "60 min" },
          { id: "l332", title: "Static postural observation and spinal alignments", duration: "60 min" },
          { id: "l333", title: "Overhead squat assessment diagnostic masterclass", duration: "75 min" },
          { id: "l334", title: "Single-leg squat and transitional movement tests", duration: "60 min" },
        ],
      },
      {
        id: "m46-2",
        title: "The Corrective Exercise Continuum",
        lessons: [
          { id: "l335", title: "Phase 1: Inhibit — Self-myofascial release science", duration: "45 min" },
          { id: "l336", title: "Phase 2: Lengthen — Static and neuromuscular stretching", duration: "60 min" },
          { id: "l337", title: "Phase 3: Activate — Positional isometrics and isolated strengthening", duration: "60 min" },
          { id: "l338", title: "Phase 4: Integrate — Multi-planar dynamic movement integration", duration: "60 min" },
        ],
      },
    ],
    videoPlaceholder: {
      title: "Reading the Kinetic Chain",
      description: "A clinician's view of an Overhead Squat screen: spotting foot pronation, knee valgus, asymmetrical weight shift, and arms falling forward in real time.",
    },
    realWorldExamples: [
      {
        title: "Eliminating runner's knee through hip stabilization",
        description: "A marathoner plagued by chronic patellofemoral pain was diagnosed with hip abductor weakness and foot overpronation. An 8-week corrective intervention of foam rolling, hip activation, and single-leg integration resolved pain without missing race season.",
        lesson: "The site of pain is rarely the cause of pain. Look up and down the kinetic chain.",
      },
    ],
    exercises: [
      {
        id: "ex55",
        title: "Corrective Protocol Formulation",
        description: "A client exhibits arms falling forward and excessive forward lean during an Overhead Squat screen. Prescribe an exact 4-phase corrective routine (Inhibit, Lengthen, Activate, Integrate).",
        type: "analysis",
      },
    ],
    categoryWisdom: {
      quote: "First move well, then move often. Loading dysfunction only cements dysfunction.",
      author: "Gray Cook",
      role: "Physical Therapist & Co-Founder of FMS",
    },
    communityNote: "Corrective exercise skills bridge the gap between physical therapy and fitness coaching, allowing you to work with rehabilitation referrals.",
  },
};

// Note: findCourseContext is implemented directly in CoursePage.tsx
// to avoid circular dependency with toolsData.ts
