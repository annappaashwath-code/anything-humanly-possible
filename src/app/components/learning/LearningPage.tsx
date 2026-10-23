import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion, useInView, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  Zap,
  Layers,
  Target,
  Rocket,
  BookOpen,
  MessageSquare,
  FolderOpen,
  BarChart3,
  Users,
  Globe,
  Clock,
} from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { learningCategories, type LearningCategory } from "./learningData";

/* ════════════════════════════════════════════════════════════════
   DEEP STAGE CONTENT — the soul of each learning stage
   Every stage answers: What you learn, How you practice,
   What you build, How AI Mentor supports, What unlocks next
   ════════════════════════════════════════════════════════════════ */

interface StageDeep {
  whatYouLearn: string;
  howYouPractice: string;
  whatYouBuild: string;
  aiMentorRole: string;
  whatUnlocksNext: string;
}

const deepStageContent: Record<string, Record<string, StageDeep>> = {
  technology: {
    t1: {
      whatYouLearn:
        "You begin with logic itself — how computers interpret instructions, how data flows through systems, how a few lines of code can create something from nothing. HTML gives you structure. CSS gives you design. JavaScript gives you behaviour. The command line teaches you to speak directly to your machine. Version control teaches you that every change matters, and nothing is truly lost.",
      howYouPractice:
        "Daily coding exercises that start small and compound. You build simple pages, then interactive ones. You debug. You read other people's code. You develop the muscle memory of syntax until it becomes second nature. Each session is guided by your AI mentor who adapts the pace to your learning speed.",
      whatYouBuild:
        "A responsive personal portfolio site — your first published work on the internet. It showcases who you are, what you're learning, and where you're heading. This is not a homework assignment. It is the beginning of your digital identity.",
      aiMentorRole:
        "Your AI mentor reviews your code in real time, explains errors with patience and context, suggests improvements that teach principles not just fixes, and adapts lesson difficulty based on your demonstrated understanding.",
      whatUnlocksNext:
        "Completing Foundation unlocks the Builder stage, where you move from static pages to dynamic applications. You gain access to framework-specific learning paths, API integration challenges, and collaborative code review sessions.",
    },
    t2: {
      whatYouLearn:
        "Modern frameworks like React or Vue transform you from someone who writes pages into someone who builds applications. You learn component thinking — breaking complex interfaces into reusable, composable pieces. REST APIs connect you to the world's data. TypeScript adds a layer of safety that professional teams demand. State management teaches you to think about data flow at scale.",
      howYouPractice:
        "Weekly build challenges that mirror real-world problems. You consume APIs, manage asynchronous data, handle edge cases, and learn to think in components. Code reviews from your AI mentor become more sophisticated, focusing on architecture and patterns rather than syntax.",
      whatYouBuild:
        "A weather dashboard that fetches real-time data from external APIs, displays interactive forecasts with charts, handles loading and error states gracefully, and lets users save favourite locations. This is a production-quality application.",
      aiMentorRole:
        "Your mentor shifts from teaching syntax to teaching architecture. It helps you understand why certain patterns exist, reviews your component structure, suggests performance optimisations, and introduces you to testing strategies.",
      whatUnlocksNext:
        "Builder completion opens the Master stage: full-stack development with databases, authentication systems, deployment pipelines, and your first experience shipping something real users depend on.",
    },
    t3: {
      whatYouLearn:
        "The full stack — from database design to server-side logic to cloud deployment. You learn to build complete systems: user authentication, real-time features, data persistence, and continuous integration. You understand how the internet actually works, not just how to build on top of it.",
      howYouPractice:
        "You build end-to-end applications under realistic constraints. You deploy to production environments. You handle failures, scale considerations, and security concerns. Collaboration with other learners introduces you to team-based development workflows.",
      whatYouBuild:
        "A collaborative task manager with user accounts, real-time updates, team features, and cloud deployment. A system that real people could use, built to production standards.",
      aiMentorRole:
        "Your mentor becomes a technical lead — reviewing architecture decisions, suggesting database schemas, identifying security vulnerabilities, and helping you navigate deployment infrastructure with confidence.",
      whatUnlocksNext:
        "Master completion unlocks the Visionary stage and access to specialised tracks: AI/ML engineering, mobile development, systems design, cybersecurity. You also gain access to open source contribution pathways and technical mentoring opportunities.",
    },
    t4: {
      whatYouLearn:
        "Specialisation and impact. You choose a domain — artificial intelligence, mobile development, systems architecture, or security — and go deep. You learn to design systems that serve millions. You contribute to open source projects that shape the tools others use. You begin mentoring those earlier in their journey.",
      howYouPractice:
        "You work on real open source projects, participate in architecture reviews, build systems designed for scale, and engage in technical writing that teaches others. Your practice becomes indistinguishable from professional contribution.",
      whatYouBuild:
        "A meaningful open source contribution — a bug fix, a new feature, documentation improvement, or entirely new tool — that gets merged into a project used by other developers worldwide.",
      aiMentorRole:
        "Your mentor operates as a strategic advisor — helping you evaluate career directions, prepare for system design discussions, develop leadership skills within technical teams, and identify opportunities to create lasting impact.",
      whatUnlocksNext:
        "This is the continuous stage. There is no graduation — only deepening mastery, broader impact, and the privilege of guiding others who follow the same path you walked.",
    },
  },
  art: {
    a1: {
      whatYouLearn:
        "You learn to see before you learn to draw. Most people look at the world through labels — 'that's a tree, that's a face.' Artists see shapes, negative space, the play of light on surfaces. Contour drawing teaches your hand to follow your eye. Gesture sketching captures the energy of a form in seconds. Proportion study trains your perception of relationships between parts.",
      howYouPractice:
        "Daily observational sketching — ten minutes minimum, every day, from life rather than photographs. You draw objects on your desk, views from your window, hands, shoes, the play of shadow on a wall. The practice is meditative and accumulative. Your AI mentor reviews your sketches and highlights areas of growing strength.",
      whatYouBuild:
        "A 30-day sketch journal documenting your daily practice. Not perfection — progression. The journal becomes proof of what consistency creates, and the foundation for everything that follows.",
      aiMentorRole:
        "Your mentor observes your developing eye. It identifies recurring tendencies — perhaps you consistently flatten depth, or miss the weight of shadows — and offers targeted exercises that address specific perceptual habits.",
      whatUnlocksNext:
        "Completing Foundation unlocks colour theory, composition principles, and typography — the tools that transform raw perception into intentional visual communication.",
    },
    a2: {
      whatYouLearn:
        "Colour theory reveals why certain combinations evoke emotion while others create discord. Composition teaches you where to place elements so the viewer's eye moves exactly where you intend. Typography is the art of making language visible. Visual storytelling connects all three — creating work that communicates meaning without explanation.",
      howYouPractice:
        "Structured colour studies, composition analyses of master works, typography exercises that develop sensitivity to letterform and spacing. You learn by studying what works — then creating your own versions with deliberate variations.",
      whatYouBuild:
        "A poster series — three distinct posters for a fictional event, each exploring different colour palettes and composition strategies. This is applied theory: proof that you understand not just the rules, but when to break them.",
      aiMentorRole:
        "Your mentor discusses your design decisions with you — why you chose certain colours, how your compositions guide attention, whether your typography choices support or compete with your imagery. The conversation develops your critical eye.",
      whatUnlocksNext:
        "Builder completion opens digital tools and media — Photoshop, Illustrator, Procreate, Figma — where your trained eye meets professional production capability.",
    },
    a3: {
      whatYouLearn:
        "Digital creation tools are extensions of your artistic vision. Photoshop for image manipulation and compositing. Illustrator for precision vector work. Procreate for natural digital painting. Figma for interface and product design. Motion graphics for work that moves and breathes. You master the tools without becoming dependent on them.",
      howYouPractice:
        "Tool-specific projects that build fluency through real creative challenges. You don't learn menus — you learn workflows. Each project requires combining multiple tools and techniques, developing the kind of integrated skill that professional work demands.",
      whatYouBuild:
        "A complete brand identity — logo system, colour palette, typography scale, social media templates, and brand guidelines document. This is professional-grade design work that demonstrates systematic creative thinking.",
      aiMentorRole:
        "Your mentor helps you navigate tool-specific challenges, suggests workflow optimisations, provides critique on design consistency across deliverables, and connects your digital work back to the foundational principles you built earlier.",
      whatUnlocksNext:
        "Master completion opens the Visionary stage — developing your personal artistic voice, building a curated portfolio, and connecting with the creative community at a professional level.",
    },
    a4: {
      whatYouLearn:
        "Finding your voice means developing a distinctive style that feels authentically yours. You study how other artists found theirs. You experiment with combinations of medium, subject, and approach until something clicks — not once, but as an ongoing practice of creative identity. You also learn the business of creativity: how to price work, find clients, and sustain a practice.",
      howYouPractice:
        "You produce prolifically, curate ruthlessly, and seek honest critique from peers and mentors. You write artist statements that articulate your intentions. You present your work publicly and learn to stand behind your creative choices.",
      whatYouBuild:
        "A solo exhibition — 8 to 10 of your strongest pieces, curated into a cohesive show with artist statements, displayed online or physically. This is the culmination of seeing, studying, building, and finding your creative truth.",
      aiMentorRole:
        "Your mentor helps you see patterns in your own body of work that you might miss. It assists with artist statement development, portfolio curation strategy, and navigating the practical aspects of creative careers.",
      whatUnlocksNext:
        "This stage is continuous. Your voice will evolve as you do. The practice never ends — it deepens, broadens, and connects to everything else you create and contribute.",
    },
  },
  science: {
    s1: {
      whatYouLearn:
        "The scientific method is not a rigid procedure — it is a discipline of honest inquiry. You learn to form hypotheses that can be tested, design experiments that isolate variables, collect data without bias, and interpret results with intellectual honesty even when they contradict your expectations. Critical thinking becomes a habit, not a skill you deploy occasionally.",
      howYouPractice:
        "You design and conduct simple experiments in your own environment — kitchen chemistry, physics of everyday objects, biological observations in your neighbourhood. Each experiment follows the full scientific method: question, hypothesis, methodology, data collection, analysis, conclusion.",
      whatYouBuild:
        "A kitchen experiment series — three documented experiments with proper scientific methodology. Not school-grade worksheets. Real scientific documentation that would satisfy a peer reviewer's demand for clarity and rigour.",
      aiMentorRole:
        "Your mentor asks probing questions about your experimental design. It challenges your assumptions, points out potential confounding variables, and teaches you to distinguish between correlation and causation in your own observations.",
      whatUnlocksNext:
        "Foundation opens the world of data — statistics, visualisation, computational analysis — where your scientific thinking meets the tools that handle complexity beyond what intuition can manage.",
    },
    s2: {
      whatYouLearn:
        "Numbers tell stories, but only to those trained to listen. Statistics transforms raw data into meaning. Visualisation transforms meaning into insight that others can grasp immediately. You learn Python or R — languages designed for data — and develop the ability to extract signal from noise in complex datasets.",
      howYouPractice:
        "Hands-on analysis of real-world datasets. You clean messy data, run statistical tests, build visualisations, and write summaries that communicate findings to non-technical audiences. Each analysis develops both your technical skills and your scientific communication.",
      whatYouBuild:
        "A public dataset analysis — choosing a real dataset, performing exploratory and statistical analysis, creating compelling visualisations, and writing a clear summary of your findings and their implications.",
      aiMentorRole:
        "Your mentor reviews your statistical reasoning, checks your methodology for common errors, suggests more appropriate tests or visualisation approaches, and helps you develop the habit of questioning your own analytical assumptions.",
      whatUnlocksNext:
        "Builder completion unlocks specialisation — the opportunity to dive deep into a specific scientific discipline with access to primary literature, advanced methodologies, and the global research community.",
    },
    s3: {
      whatYouLearn:
        "Deep specialisation in your chosen field — biology, physics, chemistry, earth science, neuroscience, or any discipline that captures your curiosity. You learn to read primary research papers, understand methodology sections, evaluate statistical claims, and form original research questions. You develop the ability to think at the frontier of human knowledge.",
      howYouPractice:
        "Literature reviews of current research, replication of published experiments where possible, writing research proposals that demonstrate original thinking, and engaging with the academic community through forums and discussion groups.",
      whatYouBuild:
        "A formal research proposal — complete with literature review, clearly stated hypothesis, detailed methodology, expected outcomes, and discussion of potential implications. This is the document that separates a curious mind from a scientific thinker.",
      aiMentorRole:
        "Your mentor serves as a research advisor — helping you navigate the literature, evaluate the strength of published evidence, refine your research questions, and develop the writing skills that scientific communication demands.",
      whatUnlocksNext:
        "Master completion opens the Visionary stage: science communication, public advocacy, mentoring the next generation, and contributing to the broader conversation about how science shapes society.",
    },
    s4: {
      whatYouLearn:
        "The greatest discoveries mean nothing if they cannot be communicated. You learn to translate complex scientific concepts for non-expert audiences, write grant proposals that secure funding, speak publicly with clarity and conviction, and mentor students who are just beginning their scientific journey.",
      howYouPractice:
        "You prepare and deliver talks, write blog posts and articles, participate in citizen science projects, and volunteer as a science communicator in schools or community organisations. Your practice directly impacts how others understand and trust science.",
      whatYouBuild:
        "A 10-minute science talk — a compelling, clear, accurate presentation of a complex scientific concept delivered to a non-expert audience. Not a lecture. A performance of understanding.",
      aiMentorRole:
        "Your mentor helps you identify the core narrative in complex scientific ideas, refine your communication strategy for different audiences, develop compelling visual aids, and build the confidence to present with authority and warmth.",
      whatUnlocksNext:
        "This is the continuous stage. Scientific inquiry never ends. Communication, advocacy, and mentoring are lifelong practices that multiply the impact of everything you've learned.",
    },
  },
  spiritual: {
    sp1: {
      whatYouLearn:
        "You begin with the most radical act available to a modern human: sitting still. Breath awareness teaches you that you are not your thoughts — you are the awareness that observes them. Body scanning develops sensitivity to the physical manifestations of emotion. Sitting meditation builds the capacity to remain present when every instinct says to move, check, scroll, react.",
      howYouPractice:
        "Daily sits of 10 minutes minimum, gradually extending to 20, then 30. You use guided meditations initially, then transition to silent sitting. You practice mindful pauses throughout the day — moments of conscious awareness inserted into routine activities. Each session is tracked and reflected upon.",
      whatYouBuild:
        "A 21-day meditation streak with daily journal entries. The journal is not about achieving calm — it's about honestly documenting what arises. Anxiety, boredom, unexpected emotion, moments of genuine peace. All of it is data about your inner landscape.",
      aiMentorRole:
        "Your mentor provides guidance on posture, breath technique, and common beginner challenges. It responds to your journal entries with insights about meditation stages, normalises difficult experiences, and gently corrects common misunderstandings about what meditation is supposed to feel like.",
      whatUnlocksNext:
        "Foundation unlocks movement practices — yoga, tai chi, qigong — where the stillness you've cultivated internally begins to express itself through physical form and flow.",
    },
    sp2: {
      whatYouLearn:
        "The body is not separate from the spirit — it is its primary vehicle. Yoga teaches you to inhabit your body with awareness. Tai chi and qigong develop sensitivity to energy flow. Walking meditation brings contemplative presence into the most ordinary human activity. You discover that movement can be as meditative as stillness.",
      howYouPractice:
        "A 30-minute morning practice combining breathwork, gentle movement, and brief meditation. You commit to 30 consecutive days. The consistency matters more than the intensity. Your AI mentor adapts the sequence based on your physical experience and emotional state.",
      whatYouBuild:
        "A personalised morning ritual — a 30-minute sequence you've refined through 30 days of practice, documented with observations about how each element affects your energy, mood, and mental clarity throughout the day.",
      aiMentorRole:
        "Your mentor guides you through movement sequences with attention to alignment and breath coordination. It helps you understand the philosophy behind each practice tradition, and adjusts recommendations based on your physical capabilities and evolving needs.",
      whatUnlocksNext:
        "Builder opens the wisdom traditions — the philosophical and contemplative foundations that give depth and context to your practice. Zen, Stoicism, Sufism, indigenous wisdom — the threads that connect all seeking.",
    },
    sp3: {
      whatYouLearn:
        "The great contemplative traditions — Zen Buddhism, Stoic philosophy, Sufi mysticism, Hindu Vedanta, indigenous wisdom, Christian contemplation — share more than they differ. You study their core texts, understand their historical contexts, and discover the perennial philosophy that runs beneath all of them: the recognition that the deepest truths must be experienced, not merely understood.",
      howYouPractice:
        "Contemplative reading — slow, deliberate engagement with primary texts. Philosophical journaling that connects ancient wisdom to contemporary experience. Gratitude practices that shift attention from deficit to abundance. Study circles with other seekers who bring different perspectives.",
      whatYouBuild:
        "A wisdom commonplace book — a personal collection of passages, reflections, and insights gathered from at least four different contemplative traditions, woven together with your own commentary and connections.",
      aiMentorRole:
        "Your mentor serves as a philosophical companion — offering historical context for texts you're studying, suggesting connections between traditions, challenging interpretations that remain superficial, and helping you find the universal within the particular.",
      whatUnlocksNext:
        "Master opens the final dimension: service and integration — where inner practice flows outward into compassionate action, community engagement, and the recognition that true spiritual growth is measured by how you treat others.",
    },
    sp4: {
      whatYouLearn:
        "True spiritual growth is not measured by how long you can sit in meditation or how many texts you've read. It is measured by how you respond to difficulty, how you treat strangers, how present you are for the people who need you. Service and integration is where practice meets life — where stillness becomes strength and wisdom becomes kindness.",
      howYouPractice:
        "One deliberate act of service each day for 30 days. Not grand gestures — simple, genuine offerings. Volunteering, deep listening, anonymous kindness, mentoring, full presence with someone who is struggling. You document the experience and observe how service transforms both the giver and the receiver.",
      whatYouBuild:
        "A 30-day service journal — documenting each act, the emotions it evoked, the responses it generated, and the subtle shifts in your relationship with compassion, ego, and connection.",
      aiMentorRole:
        "Your mentor helps you reflect on the spiritual dimensions of service — the tension between ego and selflessness, the difference between helping and fixing, the practice of offering without attachment to outcome.",
      whatUnlocksNext:
        "This stage never ends. Integration is a lifelong practice. The more deeply you live these principles, the more naturally they express themselves — not as effort, but as character.",
    },
  },
  "human-potential": {
    hp1: {
      whatYouLearn:
        "Self-awareness is the foundation of all personal growth. You learn to map your strengths honestly — not the strengths you wish you had, but the ones that consistently show up. You identify your blind spots, the defensive patterns that protect you from truths you're not yet ready to face. You clarify your values — not abstract ideals, but the actual principles that guide your daily decisions. And you examine the stories you tell yourself — the narratives about who you are that may or may not serve your evolution.",
      howYouPractice:
        "Morning Pages — three pages of stream-of-consciousness writing each morning. Values clarification exercises. Personality framework assessments used not as labels but as starting points for inquiry. Honest conversations with people who know you well and will tell you the truth.",
      whatYouBuild:
        "A comprehensive personal audit — a private document that maps your genuine strengths, acknowledged weaknesses, core values, default stories, and specific areas of growth you're committed to pursuing.",
      aiMentorRole:
        "Your mentor asks questions you might not ask yourself. It helps you distinguish between genuine self-assessment and self-criticism, between healthy aspiration and perfectionism. It reflects patterns in your writing and responses that reveal what you truly value versus what you think you should value.",
      whatUnlocksNext:
        "Self-awareness unlocks the Discipline & Habits stage — where understanding yourself becomes the foundation for building the systems that compound into extraordinary capability.",
    },
    hp2: {
      whatYouLearn:
        "Discipline is not about willpower — it's about systems. Habit stacking teaches you to attach new behaviours to existing routines. Time blocking transforms your relationship with productivity from reactive to intentional. Deep work practices develop the capacity for sustained, focused attention in an age of constant distraction. Energy management teaches you to respect your biological rhythms rather than fighting them.",
      howYouPractice:
        "A 90-day protocol focused on one keystone habit — a single change that cascades into multiple areas of improvement. You design the system, track the data, adjust based on results, and develop the meta-skill of optimising your own behaviour.",
      whatYouBuild:
        "A documented 90-day habit sprint — before and after measurements, daily tracking data, weekly reflections, and a final analysis of what worked, what didn't, and what you would do differently.",
      aiMentorRole:
        "Your mentor helps you identify the right keystone habit, design an implementation strategy that accounts for your specific obstacles, provides accountability without judgment, and helps you distinguish between productive adaptation and premature abandonment.",
      whatUnlocksNext:
        "Discipline unlocks Emotional Mastery — where the systems you've built for behaviour extend into the more challenging domain of emotional regulation, empathy, and interpersonal effectiveness.",
    },
    hp3: {
      whatYouLearn:
        "Emotional intelligence is not about suppressing emotions — it's about understanding and directing them. You learn to regulate emotional responses without denying their validity. Active listening develops the capacity to truly hear what others are communicating beneath their words. Conflict resolution teaches you to navigate disagreement without either capitulating or dominating. Empathy expands your capacity to understand experiences fundamentally different from your own.",
      howYouPractice:
        "Three difficult conversations conducted using Nonviolent Communication principles. Each conversation is prepared in advance, executed with intention, and reflected upon in writing. You practice active listening in everyday interactions and track your emotional responses to challenging situations.",
      whatYouBuild:
        "A documented set of difficult conversations — preparation notes, real-time observations, outcomes, and reflections on what you learned about yourself, communication, and the nature of conflict.",
      aiMentorRole:
        "Your mentor helps you prepare for emotionally challenging situations, debriefs after difficult interactions, identifies patterns in your emotional triggers, and offers evidence-based strategies for expanding your emotional range and resilience.",
      whatUnlocksNext:
        "Emotional mastery unlocks the Visionary stage — Legacy & Impact — where personal development extends outward into mentoring, contribution, and the deliberate creation of a life that matters beyond your own experience.",
    },
    hp4: {
      whatYouLearn:
        "Legacy is not about fame — it's about contribution that outlasts you. You learn to mentor effectively, sharing hard-won wisdom without imposing your path on others. You develop your public narrative — the ability to articulate what you stand for and why. You create a personal mission statement that serves as a compass, not a cage. And you begin building community around the values you've clarified through years of inner work.",
      howYouPractice:
        "You commit to mentoring one person for three months — providing guidance, accountability, and honest reflection. You document the mentoring relationship and what it teaches you about leadership, patience, and the art of helping without controlling.",
      whatYouBuild:
        "A documented mentoring journey — the goals you set together, the challenges you navigated, the growth you observed (in both mentor and mentee), and the insights about human development that emerged from the relationship.",
      aiMentorRole:
        "Your mentor helps you develop mentoring skills — understanding different learning styles, providing constructive feedback, setting appropriate boundaries, and recognising when to push and when to simply hold space for another person's process.",
      whatUnlocksNext:
        "This is the stage that never ends. Legacy is built daily through small acts of contribution, presence, and integrity. The question shifts from 'What can I achieve?' to 'What can I leave behind?'",
    },
  },
  leadership: {
    l1: {
      whatYouLearn:
        "Before you can lead systems, you must understand them. Systems thinking reveals how societies, economies, and institutions interconnect in ways that are often invisible. You develop economic literacy — not academic theory, but practical understanding of how incentives shape behaviour. Historical pattern recognition teaches you that most 'unprecedented' situations have precedents. Critical analysis becomes your default mode of engaging with information.",
      howYouPractice:
        "You map local systems — food distribution, public transport, education pathways — tracing connections and dependencies that most people never see. You analyse news not for content but for underlying dynamics. You study historical case studies of systemic change.",
      whatYouBuild:
        "A systems map of a local system — a visual and written analysis showing all the interconnections, feedback loops, and leverage points in a system you interact with daily.",
      aiMentorRole:
        "Your mentor challenges your maps for completeness, introduces you to systems thinking frameworks, helps you identify hidden connections and unintended consequences, and teaches you to think in loops rather than lines.",
      whatUnlocksNext:
        "Systems understanding unlocks Communication & Influence — where your ability to see the whole picture becomes the foundation for your ability to communicate it to others and mobilise collective action.",
    },
    l2: {
      whatYouLearn:
        "Communication is the lever of leadership. You learn to speak publicly with clarity and conviction. Persuasive writing develops your ability to make a case that moves people to action. Negotiation teaches you to find outcomes where everyone gains. Storytelling — the oldest leadership technology — teaches you to wrap data in narrative that makes it memorable and motivating.",
      howYouPractice:
        "You write and deliver a compelling 15-minute talk on something you deeply believe in. You start a blog or newsletter. You practise negotiation in everyday situations. You study great speeches and analyse what makes them effective.",
      whatYouBuild:
        "A public talk — written, rehearsed, and delivered to a real audience. Not a school presentation. A genuine act of persuasion that requires you to stand behind your ideas and defend them under scrutiny.",
      aiMentorRole:
        "Your mentor reviews your speeches and writing for clarity, structure, and persuasive effectiveness. It helps you develop your authentic voice — not imitating others, but finding the communication style that is genuinely yours.",
      whatUnlocksNext:
        "Communication mastery unlocks Building & Leading — where your ability to see systems and communicate visions translates into the practical work of starting something, leading teams, and driving organisational change.",
    },
    l3: {
      whatYouLearn:
        "Leadership at this stage is applied, not theoretical. You learn to build teams — selecting people whose strengths complement your weaknesses. Project management teaches you to break vision into executable steps. Fundraising or resource acquisition develops your ability to convince others to invest in your vision. Decision-making under uncertainty becomes a practised skill rather than a source of anxiety.",
      howYouPractice:
        "You validate a real startup idea or social initiative in six weeks: identify a problem, propose a solution, build a minimum viable product, and find your first users or beneficiaries. This is not simulation. You build something real under real constraints.",
      whatYouBuild:
        "A venture sprint — a six-week intensive that produces a validated concept with real evidence of demand, a functioning MVP, and documented learning about what it takes to create something from nothing.",
      aiMentorRole:
        "Your mentor serves as a business advisor — stress-testing your assumptions, helping you prioritise ruthlessly, providing frameworks for decision-making under uncertainty, and sharing patterns from thousands of startup journeys.",
      whatUnlocksNext:
        "Building & Leading unlocks the Visionary stage: systemic impact — where you shift from building individual ventures to shaping the policies, institutions, and movements that define how society operates.",
    },
    l4: {
      whatYouLearn:
        "Systemic impact is about building things that outlive you. Policy design teaches you to create rules that shape behaviour at scale. Institution building develops your ability to create organisations with staying power. Ethics and governance become practical concerns rather than philosophical abstractions. Movement leadership teaches you to mobilise collective action around shared values.",
      howYouPractice:
        "You write a detailed policy proposal addressing a real issue in your community or nation. You participate in governance — boards, advisory committees, civic organisations. You study movements that achieved lasting change and analyse their strategies.",
      whatYouBuild:
        "A comprehensive policy proposal — addressing a real local or national issue with research, stakeholder analysis, implementation plan, and evaluation criteria. Not an essay. A document that could be presented to a decision-maker.",
      aiMentorRole:
        "Your mentor helps you navigate the complexity of policy analysis, understand stakeholder dynamics, develop politically viable proposals, and think about second and third-order consequences of systemic interventions.",
      whatUnlocksNext:
        "This is the lifelong stage. Systemic impact compounds over decades. The leaders who change the world are those who commit to the long work of building institutions and cultures that serve human flourishing.",
    },
  },
  "ai-future": {
    ai1: {
      whatYouLearn:
        "AI literacy is not about coding — it's about understanding the most powerful tool humanity has ever created. You learn what AI actually is beneath the hype: pattern recognition at scale, statistical prediction, neural networks that learn from data. You develop fluency in prompt engineering — the art of communicating with AI systems effectively. You study ethics and bias — how AI systems can perpetuate and amplify human prejudices. And you survey the landscape of available tools to understand what AI can and cannot do today.",
      howYouPractice:
        "You test ten AI tools across different domains — writing, coding, image generation, analysis, research — and document their capabilities and limitations with scientific rigour. You experiment with prompt strategies and learn how subtle changes in instruction produce dramatically different outputs.",
      whatYouBuild:
        "An AI tool audit — a comprehensive evaluation of ten AI systems across multiple dimensions: accuracy, creativity, reliability, bias, and practical utility. This becomes your reference guide and your credential as someone who understands AI beyond the headlines.",
      aiMentorRole:
        "Your mentor helps you understand the technical foundations behind AI systems at the level of conceptual understanding — not requiring mathematics, but developing genuine intuition for how these systems work, where they excel, and where they fail.",
      whatUnlocksNext:
        "AI literacy unlocks Building with AI — where you move from using AI tools to creating AI-powered applications and automating complex workflows.",
    },
    ai2: {
      whatYouLearn:
        "Building with AI means going beyond prompting. You learn API integration — connecting AI models to your own applications through code. Workflow automation transforms repetitive processes into intelligent pipelines. Data pipeline design teaches you to feed AI systems the information they need in the format they require. No-code AI tools extend your building capacity beyond traditional programming.",
      howYouPractice:
        "You build AI-powered applications that solve real problems — not toys, but useful tools. You automate workflows in your own life or work. You experiment with combining multiple AI services into systems more capable than any individual model.",
      whatYouBuild:
        "An AI-powered application that solves a real problem — a tool that uses AI APIs to do something genuinely useful for real people. This is not a tutorial project. It is a product.",
      aiMentorRole:
        "Your mentor guides you through API documentation, helps you debug integration issues, suggests architectural patterns for AI-powered applications, and helps you think about responsible deployment of AI-powered tools.",
      whatUnlocksNext:
        "Building with AI unlocks Machine Learning — where you move from using pre-built models to understanding and training your own, giving you the ability to create AI that doesn't exist yet.",
    },
    ai3: {
      whatYouLearn:
        "Machine learning requires you to understand the mathematics of intelligence — not at a PhD level, but deeply enough to make informed decisions about model selection, training strategy, and performance evaluation. You learn Python's ML ecosystem: PyTorch, TensorFlow, scikit-learn. Neural network architectures become tools you can reason about. MLOps teaches you to deploy and maintain models in production environments.",
      howYouPractice:
        "You train models on real datasets, compete in Kaggle challenges, evaluate model performance with statistical rigour, and deploy trained models as accessible APIs. Each project builds both technical skill and the judgment to know when ML is the right solution and when it isn't.",
      whatYouBuild:
        "A trained and deployed model — a machine learning system trained on a real dataset, evaluated against meaningful metrics, and deployed as an API that others can use. This is the bridge between learning ML and practising it.",
      aiMentorRole:
        "Your mentor helps you navigate the mathematical foundations, debug training issues, interpret evaluation metrics, choose appropriate architectures for different problems, and develop the engineering discipline that production ML demands.",
      whatUnlocksNext:
        "ML mastery unlocks the Visionary stage: Human-AI Symbiosis — where technical skill meets ethical responsibility, and you help design the future relationship between human intelligence and artificial intelligence.",
    },
    ai4: {
      whatYouLearn:
        "Human-AI Symbiosis is about designing the future. You study AI ethics not as an academic exercise but as a practical discipline for building systems that serve human flourishing. You develop future strategy — the ability to think about where AI is heading and what that means for individuals, organisations, and civilisation. You explore creative human-AI collaboration and discover the kinds of work that emerge when human intuition and AI capability combine.",
      howYouPractice:
        "You design an ethical framework for AI deployment in a specific industry or context. You participate in policy discussions. You experiment with collaborative creative processes where human and AI contribute different strengths. You write about the future with both technical knowledge and humanistic values.",
      whatYouBuild:
        "An AI ethics framework — a comprehensive, practical guide for responsible AI use in a specific context. Not abstract principles, but actionable guidelines with enforcement mechanisms and evaluation criteria.",
      aiMentorRole:
        "Your mentor engages you in Socratic dialogue about the hardest questions in AI — consciousness, agency, alignment, power concentration, creative authenticity. It challenges your assumptions and helps you develop positions that are both principled and pragmatic.",
      whatUnlocksNext:
        "This is the frontier. There is no graduation from the future. Your role is to help shape it — with technical skill, ethical clarity, and the conviction that AI should amplify what is best in humanity, not replace it.",
    },
  },
};

/* ════════════════════════════════════════════════════════════════
   Category philosophy — the deeper 'why' for each path
   ════════════════════════════════════════════════════════════════ */

const pathPhilosophy: Record<string, string> = {
  technology:
    "Technology is not neutral. Every tool embodies a vision of the future. When you learn to build technology, you are not just acquiring a skill — you are accepting responsibility for shaping the world that others will inhabit. We begin with foundations not because they are simple, but because mastery of fundamentals is what separates builders from users. The journey from your first line of code to systems that serve millions is one of the most transformative paths a human being can walk.",
  art:
    "Creativity is not a luxury — it is a fundamental mode of human understanding. Art makes visible what cannot be measured: emotion, beauty, grief, transcendence. When you develop your creative voice, you are adding something to the world that would not exist without you. This path treats creativity as a discipline — rigorous, demanding, and deeply rewarding. Every human is born creative. This path helps you remember how.",
  science:
    "Science is the practice of asking questions that reality must answer. It is not a body of knowledge — it is a way of knowing. When you learn to think scientifically, you develop the most powerful epistemological tool humans have ever created: the ability to distinguish what is true from what merely feels true. This path builds the habits of mind that have driven every major advance in human understanding.",
  spiritual:
    "The inner landscape is the final frontier. While technology extends outward, spiritual practice turns inward — toward the consciousness that observes all experience. This is not religion. It is the disciplined exploration of awareness itself. Every contemplative tradition, from Zen to Stoicism, from Sufism to indigenous wisdom, points to the same recognition: that who you truly are is deeper than any thought, emotion, or identity you have ever assumed.",
  "human-potential":
    "You are not fixed. The science of neuroplasticity, the traditions of personal development, and the evidence of extraordinary human achievement all point to the same truth: human beings can consciously evolve. This path treats personal growth not as self-help, but as self-authorship — the deliberate practice of becoming the person you choose to be. Discipline, emotional intelligence, and resilience are not traits you're born with. They are skills you build.",
  leadership:
    "Leadership is not a position — it is a practice. The ability to see systems, communicate vision, build teams, and navigate complexity is the foundation of every meaningful collective achievement in human history. This path develops leaders who serve rather than dominate, who listen before they speak, and who measure success not by personal accumulation but by the flourishing of the communities they shape.",
  "ai-future":
    "We stand at the threshold of a new kind of intelligence. AI is not a tool like any other — it is a mirror and an amplifier of human cognition. Learning to work with AI is not optional; it is the defining skill of this century. But this path is not merely technical. It asks the deepest questions: What remains uniquely human when machines can think? How do we ensure that artificial intelligence serves human flourishing? What does partnership with a non-human intelligence look like?",
};

/* ════════════════════════════════════════════════════════════════
   Seven Core Systems of Mastery Space
   ════════════════════════════════════════════════════════════════ */

const masterySystems = [
  {
    icon: MessageSquare,
    title: "AI Mentor",
    subtitle: "Adaptive, personalised guidance",
    desc: "Real-time feedback from an AI that knows your learning history, understands your goals, and adapts its teaching style to how you think. Not a chatbot. A mentor that grows with you.",
    color: "#3b82f6",
  },
  {
    icon: BookOpen,
    title: "Structured Lessons",
    subtitle: "Deep concept-driven modules",
    desc: "Each lesson builds on the last with deliberate progression. Concepts are introduced through explanation, demonstrated through examples, and solidified through active engagement. No passive video consumption.",
    color: "#8b5cf6",
  },
  {
    icon: Zap,
    title: "Practice Mode",
    subtitle: "Active exercises, drills, challenges",
    desc: "Knowledge without practice is theory. Practice mode provides calibrated challenges that push you just beyond your current capability — the zone where real learning happens.",
    color: "#f59e0b",
  },
  {
    icon: FolderOpen,
    title: "Project Space",
    subtitle: "Build real-world artefacts",
    desc: "Every learning stage culminates in a project that produces something real — a portfolio piece, a contribution, a creation that demonstrates mastery through tangible evidence.",
    color: "#10b981",
  },
  {
    icon: BarChart3,
    title: "Reflection & Growth Tracking",
    subtitle: "Journals, progress, performance mapping",
    desc: "Learning without reflection is accumulation without understanding. Growth tracking reveals patterns in your development that are invisible in the moment but transformative over time.",
    color: "#ec4899",
  },
  {
    icon: Users,
    title: "Community Collaboration",
    subtitle: "Peer learning, shared builds, discussions",
    desc: "You learn faster with others. Peer review, collaborative projects, discussion forums, and shared challenges create accountability and perspective that solo learning cannot provide.",
    color: "#6366f1",
  },
  {
    icon: Globe,
    title: "Impact & Contribution",
    subtitle: "Launch ideas. Publish work. Solve real problems.",
    desc: "The final layer of mastery is contribution. Your projects don't stay in a classroom. They enter the world — open source contributions, published research, community impact, real products.",
    color: "#06b6d4",
  },
];

/* ════════════════════════════════════════════════════════════════
   Stage label configuration
   ════════════════════════════════════════════════════════════════ */

const stageLabels: Record<
  string,
  { icon: typeof Layers; label: string; fullLabel: string; color: string }
> = {
  Beginner: {
    icon: Layers,
    label: "Stage 1",
    fullLabel: "Foundation",
    color: "#3b82f6",
  },
  Builder: {
    icon: Target,
    label: "Stage 2",
    fullLabel: "Skill Building",
    color: "#8b5cf6",
  },
  Master: {
    icon: Zap,
    label: "Stage 3",
    fullLabel: "Applied Mastery",
    color: "#f59e0b",
  },
  Visionary: {
    icon: Rocket,
    label: "Stage 4",
    fullLabel: "Visionary Contribution",
    color: "#10b981",
  },
};

/* ════════════════════════════════════════════════════════════════
   PATHWAY CARD — Expandable chapter-style
   ════════════════════════════════════════════════════════════════ */

function PathwayCard({
  category,
  index,
}: {
  category: LearningCategory;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const Icon = category.icon;
  const philosophy = pathPhilosophy[category.id] || "";
  const deepContent = deepStageContent[category.id] || {};

  const handleToggle = () => {
    const willExpand = !expanded;
    setExpanded(willExpand);
    if (willExpand) {
      requestAnimationFrame(() => {
        setTimeout(() => {
          headerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 80);
      });
    }
  };

  return (
    <motion.div
      ref={ref}
      id={`path-${category.id}`}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.06 }}
    >
      <div
        ref={headerRef}
        className="group relative rounded-2xl overflow-hidden transition-all duration-500"
        style={{
          background: "#ffffff",
          border: expanded
            ? `1px solid ${category.color}20`
            : "1px solid rgba(0,0,0,0.06)",
          boxShadow: expanded
            ? "0 8px 40px rgba(0,0,0,0.06)"
            : "0 2px 12px rgba(0,0,0,0.02)",
          scrollMarginTop: "80px",
        }}
      >
        {/* Top accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-500"
          style={{
            background: category.color,
            opacity: expanded ? 0.7 : 0.15,
          }}
        />

        {/* ── Header (always visible) ── */}
        <div
          className="flex items-start gap-5 p-6 sm:p-8 cursor-pointer select-none"
          onClick={handleToggle}
        >
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-500 group-hover:scale-105"
            style={{
              backgroundColor: `${category.color}10`,
              color: category.color,
            }}
          >
            <Icon size={22} />
          </div>

          <div className="flex-1 min-w-0">
            <h3
              style={{
                fontSize: "1.25rem",
                fontWeight: 700,
                color: "#000000",
                letterSpacing: "-0.01em",
              }}
              className="mb-1.5"
            >
              {category.label}
            </h3>
            <p
              style={{
                fontSize: "0.9375rem",
                fontWeight: 450,
                lineHeight: 1.7,
                color: "rgba(0,0,0,0.55)",
              }}
            >
              {category.tagline}
            </p>
            <div className="flex flex-wrap gap-1.5 mt-4">
              {category.skillClusters.map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-1 rounded-full"
                  style={{
                    fontSize: "0.6875rem",
                    fontWeight: 500,
                    color: "rgba(0,0,0,0.5)",
                    background: "rgba(0,0,0,0.03)",
                    border: "1px solid rgba(0,0,0,0.06)",
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex-shrink-0 mt-2"
          >
            <ChevronDown size={20} style={{ color: "rgba(0,0,0,0.3)" }} />
          </motion.div>
        </div>

        {/* ── Expanded chapter ── */}
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                height: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
                opacity: { duration: 0.3, delay: 0.08 },
              }}
              className="overflow-hidden"
            >
              <div className="px-6 sm:px-8 pb-0">
                {/* Divider */}
                <div
                  className="h-px mb-8"
                  style={{ background: "rgba(0,0,0,0.06)" }}
                />

                {/* ── Action buttons — immediately visible at top ── */}
                <div className="flex flex-col sm:flex-row gap-3 mb-10">
                  <button
                    onClick={() => navigate(`/learn/${category.slug}`)}
                    className="flex-1 group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-black text-white hover:bg-neutral-800 transition-all duration-300 cursor-pointer"
                    style={{ fontSize: "0.875rem", fontWeight: 700 }}
                  >
                    Begin This Path
                    <ArrowRight
                      size={14}
                      className="group-hover:translate-x-1 transition-transform duration-300"
                    />
                  </button>
                  <button
                    onClick={() => navigate(`/tools/${category.masterySlug}`)}
                    className="flex-1 group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border transition-all duration-300 cursor-pointer hover:shadow-sm"
                    style={{
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      color: category.color,
                      borderColor: `${category.color}30`,
                      background: `${category.color}06`,
                    }}
                  >
                    Enter Mastery Space
                    <Zap size={13} />
                  </button>
                </div>

                {/* ── Overview image ── */}
                <div className="relative h-48 sm:h-56 rounded-xl overflow-hidden mb-10">
                  <ImageWithFallback
                    src={category.image}
                    alt={category.label}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* ── Philosophy ── */}
                <div className="mb-12">
                  <p
                    className="mb-3"
                    style={{
                      fontSize: "0.6875rem",
                      fontWeight: 700,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: category.color,
                    }}
                  >
                    Philosophy
                  </p>
                  <p
                    style={{
                      fontSize: "1rem",
                      fontWeight: 400,
                      lineHeight: 2,
                      color: "rgba(0,0,0,0.65)",
                    }}
                  >
                    {philosophy}
                  </p>
                </div>

                {/* ── Stages ── */}
                <div className="mb-10">
                  <p
                    className="mb-8"
                    style={{
                      fontSize: "0.6875rem",
                      fontWeight: 700,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "rgba(0,0,0,0.3)",
                    }}
                  >
                    Learning Stages
                  </p>

                  <div className="space-y-8">
                    {category.milestones.map((m, mi) => {
                      const sl = stageLabels[m.stage] || stageLabels.Beginner;
                      const StageIcon = sl.icon;
                      const deep = deepContent[m.id];

                      return (
                        <div
                          key={m.id}
                          className="relative rounded-xl overflow-hidden"
                          style={{
                            background: "#ffffff",
                            border: "1px solid rgba(0,0,0,0.06)",
                          }}
                        >
                          <div className="p-6 sm:p-8">
                            <div className="flex items-start gap-4 mb-5">
                              <div
                                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                                style={{
                                  backgroundColor: `${sl.color}12`,
                                  color: sl.color,
                                }}
                              >
                                <StageIcon size={18} />
                              </div>
                              <div>
                                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                                  <span
                                    className="px-2 py-0.5 rounded-full"
                                    style={{
                                      fontSize: "0.5625rem",
                                      fontWeight: 700,
                                      letterSpacing: "0.1em",
                                      textTransform: "uppercase",
                                      color: sl.color,
                                      background: `${sl.color}10`,
                                    }}
                                  >
                                    {sl.label} — {sl.fullLabel}
                                  </span>
                                  <span
                                    className="flex items-center gap-1"
                                    style={{ fontSize: "0.6875rem", fontWeight: 500, color: "rgba(0,0,0,0.35)" }}
                                  >
                                    <Clock size={11} />
                                    {m.estimatedTime}
                                  </span>
                                </div>
                                <h4
                                  style={{
                                    fontSize: "1.0625rem",
                                    fontWeight: 800,
                                    color: "#000000",
                                  }}
                                >
                                  {m.title}
                                </h4>
                              </div>
                            </div>

                            {/* Skills */}
                            <div className="flex flex-wrap gap-1.5 mb-6 ml-14">
                              {m.skills.map((skill) => (
                                <span
                                  key={skill}
                                  className="px-2.5 py-1 rounded-lg"
                                  style={{
                                    fontSize: "0.6875rem",
                                    fontWeight: 500,
                                    color: sl.color,
                                    background: `${sl.color}08`,
                                    border: `1px solid ${sl.color}12`,
                                  }}
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>

                            {/* Deep content blocks */}
                            {deep && (
                              <div className="ml-0 sm:ml-14 space-y-7">
                                <DetailBlock
                                  label="What you learn"
                                  text={deep.whatYouLearn}
                                />
                                <DetailBlock
                                  label="How you practice"
                                  text={deep.howYouPractice}
                                />
                                <DetailBlock
                                  label="What you build"
                                  text={deep.whatYouBuild}
                                />
                                <DetailBlock
                                  label="How AI Mentor supports"
                                  text={deep.aiMentorRole}
                                />
                                <DetailBlock
                                  label="What unlocks next"
                                  text={deep.whatUnlocksNext}
                                />
                              </div>
                            )}

                            {/* Resources */}
                            <div className="ml-0 sm:ml-14 mt-7">
                              <p
                                className="mb-2.5"
                                style={{
                                  fontSize: "0.6875rem",
                                  fontWeight: 600,
                                  letterSpacing: "0.08em",
                                  textTransform: "uppercase",
                                  color: "rgba(0,0,0,0.3)",
                                }}
                              >
                                Resources
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {m.resources.map((r) => (
                                  <span
                                    key={r.title}
                                    className="px-3 py-1.5 rounded-lg"
                                    style={{
                                      fontSize: "0.75rem",
                                      fontWeight: 500,
                                      color: "rgba(0,0,0,0.6)",
                                      background: "rgba(0,0,0,0.02)",
                                      border: "1px solid rgba(0,0,0,0.06)",
                                    }}
                                  >
                                    {r.title}{" "}
                                    <span style={{ opacity: 0.3 }}>·</span>{" "}
                                    <span style={{ fontSize: "0.625rem", opacity: 0.5 }}>
                                      {r.type}
                                    </span>
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Project */}
                            <div
                              className="ml-0 sm:ml-14 mt-7 p-5 rounded-lg border-2 border-dashed"
                              style={{ borderColor: `${sl.color}20` }}
                            >
                              <div className="flex items-center gap-2 mb-2">
                                <Target size={12} style={{ color: sl.color }} />
                                <span
                                  style={{
                                    fontSize: "0.625rem",
                                    fontWeight: 700,
                                    letterSpacing: "0.1em",
                                    textTransform: "uppercase",
                                    color: sl.color,
                                  }}
                                >
                                  Capstone Project
                                </span>
                              </div>
                              <p
                                style={{
                                  fontSize: "0.9375rem",
                                  fontWeight: 700,
                                  color: "#000000",
                                  marginBottom: "0.375rem",
                                }}
                              >
                                {m.project.title}
                              </p>
                              <p
                                style={{
                                  fontSize: "0.875rem",
                                  fontWeight: 400,
                                  lineHeight: 1.85,
                                  color: "rgba(0,0,0,0.5)",
                                }}
                              >
                                {m.project.description}
                              </p>
                            </div>
                          </div>

                          {/* Connector */}
                          {mi < category.milestones.length - 1 && (
                            <div className="flex justify-center py-2">
                              <div
                                className="w-px h-6"
                                style={{
                                  background: `linear-gradient(to bottom, ${sl.color}25, transparent)`,
                                }}
                              />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* ── Sticky bottom action bar ── */}
              <div
                className="sticky bottom-0 px-6 sm:px-8 py-4 bg-white border-t"
                style={{ borderColor: "rgba(0,0,0,0.06)", zIndex: 10 }}
              >
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => navigate(`/learn/${category.slug}`)}
                    className="flex-1 group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-black text-white hover:bg-neutral-800 transition-all duration-300 cursor-pointer"
                    style={{ fontSize: "0.875rem", fontWeight: 700 }}
                  >
                    Begin This Path
                    <ArrowRight
                      size={14}
                      className="group-hover:translate-x-1 transition-transform duration-300"
                    />
                  </button>
                  <button
                    onClick={() => navigate(`/tools/${category.masterySlug}`)}
                    className="flex-1 group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border transition-all duration-300 cursor-pointer hover:shadow-sm"
                    style={{
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      color: category.color,
                      borderColor: `${category.color}30`,
                      background: `${category.color}06`,
                    }}
                  >
                    Enter Mastery Space
                    <Zap size={13} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════════════
   Detail block — individual deep content section
   ════════════════════════════════════════════════════════════════ */

function DetailBlock({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <p
        className="mb-2"
        style={{
          fontSize: "0.6875rem",
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "rgba(0,0,0,0.3)",
        }}
      >
        {label}
      </p>
      <p
        style={{
          fontSize: "0.9rem",
          fontWeight: 400,
          lineHeight: 1.95,
          color: "rgba(0,0,0,0.6)",
        }}
      >
        {text}
      </p>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   Pathway lines (subtle SVG background)
   ════════════════════════════════════════════════════════════════ */

function PathwayLines() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg
        className="absolute top-0 left-0 w-full h-full"
        viewBox="0 0 1200 5000"
        preserveAspectRatio="none"
        fill="none"
      >
        <motion.path
          d="M100 0 Q300 400 200 800 T400 1600 T200 2400 T300 3200 T200 4000 T300 5000"
          stroke="rgba(99,102,241,0.035)"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 10, ease: "linear" }}
        />
        <motion.path
          d="M1100 0 Q900 500 1000 1000 T800 1800 T1000 2600 T900 3400 T1000 4200 T900 5000"
          stroke="rgba(59,130,246,0.025)"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 14, ease: "linear", delay: 1 }}
        />
        <motion.path
          d="M600 0 Q650 300 550 700 T650 1200 T550 1800 T650 2400 T550 3200 T650 4000 T550 5000"
          stroke="rgba(139,92,246,0.025)"
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 16, ease: "linear", delay: 2 }}
        />
      </svg>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   Evolution pipeline visual
   ════════════════════════════════════════════════════════════════ */

const evolutionSteps = [
  { label: "Learn", color: "#3b82f6" },
  { label: "Practice", color: "#8b5cf6" },
  { label: "Build", color: "#f59e0b" },
  { label: "Reflect", color: "#ec4899" },
  { label: "Contribute", color: "#10b981" },
  { label: "Evolve", color: "#06b6d4" },
];

function EvolutionPipeline() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="flex items-center justify-center gap-1 sm:gap-2 flex-wrap">
      {evolutionSteps.map((step, i) => (
        <motion.div
          key={step.label}
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
          className="flex items-center gap-1 sm:gap-2"
        >
          <span
            className="px-3 sm:px-4 py-2 rounded-lg"
            style={{
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.05em",
              color: step.color,
              background: `${step.color}08`,
              border: `1px solid ${step.color}15`,
            }}
          >
            {step.label}
          </span>
          {i < evolutionSteps.length - 1 && (
            <ArrowRight size={12} style={{ color: "rgba(0,0,0,0.15)" }} className="flex-shrink-0" />
          )}
        </motion.div>
      ))}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   MAIN PAGE
   ════════════════════════════════════════════════════════════════ */

export function LearningPage() {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen bg-white">
      {/* Back button — identical to Achievements page */}
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

      {/* ═══════════════════ HERO ═══════════════════ */}
      <section ref={heroRef} className="pt-28 pb-8 sm:pt-36 sm:pb-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <p
              className="tracking-[0.3em] uppercase mb-5"
              style={{
                fontSize: "0.6875rem",
                fontWeight: 600,
                color: "#3b82f6",
              }}
            >
              How We Learn
            </p>
            <h1
              className="mb-6"
              style={{
                fontSize: "clamp(2.25rem, 6vw, 4rem)",
                fontWeight: 600,
                lineHeight: 1.05,
                letterSpacing: "-0.04em",
                color: "#000000",
              }}
            >
              This is not education.
              <br />
              This is guided evolution.
            </h1>
            <p
              className="mb-6"
              style={{
                fontSize: "1.125rem",
                fontWeight: 400,
                lineHeight: 1.9,
                color: "rgba(0,0,0,0.6)",
              }}
            >
              Learning here is structured, adaptive, persona-based,
              project-driven, mentor-guided, and fully integrated with the
              Mastery Space. Every path is designed to take you from curiosity to
              contribution — not through passive consumption, but through
              deliberate practice, real projects, and AI-guided reflection.
            </p>
            <p
              style={{
                fontSize: "0.9375rem",
                fontWeight: 400,
                lineHeight: 1.9,
                color: "rgba(0,0,0,0.45)",
              }}
            >
              You choose the domain. The system adapts to your pace, your
              strengths, your growing edge. Your AI mentor knows your history,
              understands your goals, and meets you exactly where you are. Every
              stage builds on the last. Every project produces real evidence of
              mastery. This is how humans evolve — intentionally.
            </p>
          </motion.div>

          {/* Quick-nav pills */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-wrap gap-2"
          >
            {learningCategories.map((cat) => {
              const CatIcon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    const el = document.querySelector(`#path-${cat.id}`);
                    if (el)
                      el.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full border bg-white hover:bg-neutral-50 transition-all duration-300 cursor-pointer group"
                  style={{ borderColor: "rgba(0,0,0,0.08)" }}
                >
                  <CatIcon size={13} style={{ color: cat.color }} />
                  <span
                    className="transition-colors"
                    style={{ fontSize: "0.8125rem", fontWeight: 500, color: "rgba(0,0,0,0.55)" }}
                  >
                    {cat.label}
                  </span>
                </button>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════ EVOLUTION PIPELINE ═══════════════════ */}
      <section className="py-10 sm:py-14">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <p
              className="tracking-[0.25em] uppercase mb-3"
              style={{
                fontSize: "0.625rem",
                fontWeight: 600,
                color: "rgba(0,0,0,0.3)",
              }}
            >
              The Evolution Cycle
            </p>
          </motion.div>
          <EvolutionPipeline />
        </div>
      </section>

      {/* ═══════════════════ LEARNING DIMENSIONS ═══════════════════ */}
      <section className="relative py-10 sm:py-16">
        <PathwayLines />

        <div className="max-w-4xl mx-auto px-6 lg:px-10 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p
              className="tracking-[0.3em] uppercase mb-3"
              style={{
                fontSize: "0.625rem",
                fontWeight: 600,
                color: "#3b82f6",
              }}
            >
              Learning Dimensions
            </p>
            <h2
              style={{
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                color: "#000000",
              }}
            >
              Seven paths into mastery
            </h2>
            <p
              className="max-w-lg mx-auto mt-4"
              style={{
                fontSize: "0.9375rem",
                fontWeight: 400,
                lineHeight: 1.85,
                color: "rgba(0,0,0,0.45)",
              }}
            >
              Each path is a complete journey — from first principles to
              visionary contribution. Expand any path to see the full structure,
              philosophy, and detailed stages.
            </p>
          </motion.div>

          <div className="space-y-4">
            {learningCategories.map((cat, i) => (
              <PathwayCard key={cat.id} category={cat} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ SEVEN CORE SYSTEMS ═══════════════════ */}
      <section
        className="relative py-24 sm:py-32 overflow-hidden bg-white"
      >
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <p
              className="tracking-[0.3em] uppercase mb-4"
              style={{
                fontSize: "0.625rem",
                fontWeight: 600,
                color: "#3b82f6",
              }}
            >
              Integrated into Every Path
            </p>
            <h2
              className="mb-4"
              style={{
                fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)",
                fontWeight: 600,
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                color: "#000000",
              }}
            >
              The Seven Core Systems
              <br />
              of Mastery Space
            </h2>
            <p
              className="max-w-lg mx-auto"
              style={{
                fontSize: "0.9375rem",
                fontWeight: 400,
                lineHeight: 1.85,
                color: "rgba(0,0,0,0.45)",
              }}
            >
              Not a list of features. An integrated evolution engine that powers
              every learning path, every stage, every project.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {masterySystems.map((sys, i) => {
              const SysIcon = sys.icon;
              return (
                <motion.div
                  key={sys.title}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.05 * i }}
                  className="p-6 rounded-xl"
                  style={{
                    background: "#ffffff",
                    border: "1px solid rgba(0,0,0,0.06)",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.02)",
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                    style={{
                      backgroundColor: `${sys.color}10`,
                      color: sys.color,
                    }}
                  >
                    <SysIcon size={18} />
                  </div>
                  <h4
                    className="mb-1"
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: 700,
                      color: "#000000",
                    }}
                  >
                    {sys.title}
                  </h4>
                  <p
                    className="mb-2.5"
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 500,
                      color: sys.color,
                    }}
                  >
                    {sys.subtitle}
                  </p>
                  <p
                    style={{
                      fontSize: "0.8125rem",
                      fontWeight: 400,
                      lineHeight: 1.8,
                      color: "rgba(0,0,0,0.5)",
                    }}
                  >
                    {sys.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Evolution pipeline repeat */}
          <div className="mt-14">
            <EvolutionPipeline />
          </div>
        </div>
      </section>

      {/* ═══════════════════ CLOSING CTA ═══════════════════ */}
      <section
        className="relative py-28 sm:py-36 overflow-hidden bg-white"
      >
        <div className="relative max-w-2xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <p
              className="mb-6"
              style={{
                fontSize: "1.0625rem",
                fontWeight: 400,
                lineHeight: 1.8,
                color: "rgba(0,0,0,0.45)",
              }}
            >
              You are not here to consume knowledge.
            </p>
            <h2
              className="mb-8"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 4rem)",
                fontWeight: 700,
                lineHeight: 1.08,
                letterSpacing: "-0.035em",
                color: "#000000",
              }}
            >
              You are here
              <br />
              to transform.
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => navigate("/tools")}
                className="group inline-flex items-center gap-2 px-9 py-4 rounded-full bg-black text-white hover:bg-neutral-800 transition-all duration-300 cursor-pointer"
                style={{ fontSize: "0.875rem", fontWeight: 700 }}
              >
                Begin Your Evolution
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-1 transition-transform duration-300"
                />
              </button>
              <button
                onClick={() =>
                  window.scrollTo({ top: 0, behavior: "smooth" })
                }
                className="px-6 py-3.5 rounded-full transition-colors duration-300 cursor-pointer"
                style={{ fontSize: "0.8125rem", fontWeight: 550, color: "rgba(0,0,0,0.4)" }}
              >
                Back to top
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
