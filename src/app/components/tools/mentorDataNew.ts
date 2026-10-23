import {
  Globe, Heart, Wand2, Scale, Network, Megaphone, Lightbulb, Cpu, Dumbbell,
} from "lucide-react";
import type { MentorCategory } from "./mentorData";

// ─── 8 New Categories for "Anything Humanly Possible" ───────

export const newMentorCategories: MentorCategory[] = [
  // ════════════════════════════════════════════
  // 1. Climate & Sustainability
  // ════════════════════════════════════════════
  {
    id: "climate",
    slug: "climate",
    label: "Climate & Sustainability",
    tagline: "Build a livable future for every generation",
    description: "From renewable energy systems to circular economies — learn the science, policy, and innovation reshaping how humanity relates to the planet.",
    icon: Globe,
    color: "#059669",
    gradient: "from-emerald-700 via-emerald-500 to-teal-400",
    mentors: [
      {
        id: "gaia",
        name: "Gaia",
        title: "Climate Systems Mentor",
        isMaster: true,
        tagline: "Understanding Earth's operating system",
        personality: "Scientific, passionate, systems-oriented. Gaia makes climate science tangible and empowering rather than overwhelming.",
        avatar: "🌍",
        initials: "GA",
        envTheme: { bg: "#061210", accent: "#059669", mood: "planetary" },
        voiceConfig: { pitch: 1.05, rate: 0.9, voiceHint: "female" },
        specialties: ["Climate Science", "Carbon Systems", "Renewable Energy", "Environmental Policy", "Sustainability Metrics"],
        greeting: "Welcome! I'm Gaia, your climate systems mentor. Understanding Earth's climate isn't just science — it's the most important knowledge of our century. I'll help you see the system clearly, understand leverage points, and find where you can make the biggest impact. Let's think at planetary scale.",
        encouragement: [
          "Your systems thinking about carbon cycles is getting sophisticated!",
          "That analysis shows real understanding of feedback loops.",
          "You're connecting science to action — that's what the world needs.",
        ],
        course: {
          id: "gaia-climate",
          title: "Climate Science & Action",
          overview: "Understand Earth's climate system, the science behind climate change, renewable energy technologies, and the policy and innovation frameworks for building a sustainable civilization. This isn't doom and gloom — it's empowerment through understanding.",
          totalDuration: "35 hours",
          learningDuration: "6–8 weeks",
          difficulty: "Beginner",
          modules: [
            {
              id: "cs-1", title: "Earth's Climate System", description: "How our planet regulates temperature and why it's changing.",
              lessons: [
                { id: "cs-1-1", title: "The Greenhouse Effect & Carbon Cycle", duration: "55 min", content: "Earth's climate is regulated by a delicate balance of incoming solar radiation and outgoing infrared radiation. Greenhouse gases — CO2, methane, water vapor, nitrous oxide — trap heat in the atmosphere like a blanket. This is natural and necessary; without it, Earth would be -18°C.\n\nThe problem isn't the greenhouse effect itself — it's that humans have increased atmospheric CO2 from 280 ppm (pre-industrial) to over 420 ppm by burning fossil fuels, deforestation, and industrial processes. This extra CO2 traps more heat, raising global temperatures. The carbon cycle — how carbon moves between atmosphere, oceans, soil, and living things — is now out of balance.", keyPoints: ["CO2 has risen 50% above pre-industrial levels", "Oceans absorb ~30% of human CO2 emissions (causing acidification)", "Permafrost thawing is a major feedback risk (stored methane)", "Carbon stays in atmosphere for centuries — effects are cumulative"], practiceTask: "Create a visual diagram of the carbon cycle showing all major reservoirs (atmosphere, ocean, soil, biomass, fossil fuels) and fluxes between them. Annotate with current gigatons of carbon. Identify which fluxes humans have altered most.", reflectionQuestion: "If carbon stays in the atmosphere for centuries, what does that imply about the urgency of action — even if effects seem gradual?" },
                { id: "cs-1-2", title: "Tipping Points & Feedback Loops", duration: "50 min", content: "Climate tipping points are thresholds beyond which changes become self-reinforcing and potentially irreversible. The ice-albedo feedback is a classic example: as Arctic ice melts, darker ocean water absorbs more heat, melting more ice. Each degree of warming triggers processes that cause further warming.\n\nScientists have identified at least 16 major tipping elements: Amazon rainforest dieback, West Antarctic ice sheet collapse, Arctic sea ice loss, Atlantic circulation shutdown, permafrost carbon release, and more. Several may be triggered between 1.5°C and 2°C of warming — ranges we're approaching rapidly.", keyPoints: ["Tipping points can trigger cascading failures across systems", "The Amazon could shift from carbon sink to carbon source", "Atlantic circulation weakening affects global weather patterns", "Multiple tipping points may interact — creating 'tipping cascades'"], practiceTask: "Research three climate tipping points in depth. For each, document the current state, threshold temperature, potential consequences, and estimated timeline. Create a risk matrix showing interactions between them.", reflectionQuestion: "How does the concept of tipping points change the framing from 'gradual warming' to 'systemic risk'?" },
              ],
            },
            {
              id: "cs-2", title: "Solutions & Innovation", description: "Technologies and strategies for a sustainable future.",
              lessons: [
                { id: "cs-2-1", title: "Renewable Energy Systems", duration: "60 min", content: "Solar and wind are now the cheapest forms of new electricity generation in most of the world. Solar costs have dropped 90% in a decade. But the energy transition isn't just about replacing coal plants with solar panels — it's about redesigning entire energy systems: storage (batteries, hydrogen, pumped hydro), grid flexibility, demand response, and electrification of transport and heating.\n\nThe key insight: we already have most of the technologies we need. The challenge is deployment speed, grid integration, storage at scale, and managing the economic transition for communities dependent on fossil fuels.", keyPoints: ["Solar is now cheapest energy source in history in most regions", "Battery costs have fallen 97% since 1991", "Grid-scale storage is the key bottleneck for 100% renewables", "Electrification of transport and heating multiplies clean energy impact"], practiceTask: "Design a renewable energy plan for a small city (100,000 people). Calculate current energy demand, design the generation mix (solar, wind, storage), estimate costs, and create a 10-year transition timeline.", reflectionQuestion: "If renewable energy is already cheaper, why hasn't the transition happened faster? What non-technical barriers exist?" },
              ],
            },
          ],
        },
      },
      {
        id: "echo",
        name: "Echo",
        title: "Circular Economy Mentor",
        tagline: "Waste is just a resource in the wrong place",
        personality: "Innovative, entrepreneurial, resource-conscious. Echo sees waste as a design flaw and teaches you to build systems where everything circulates.",
        avatar: "♻️",
        initials: "EC",
        envTheme: { bg: "#081210", accent: "#34d399", mood: "regenerative" },
        voiceConfig: { pitch: 1.1, rate: 1.0, voiceHint: "female" },
        specialties: ["Circular Design", "Waste Systems", "Biomimicry", "Sustainable Business", "Life Cycle Analysis"],
        greeting: "Hey! I'm Echo, your circular economy mentor. In nature, there's no such thing as waste — everything is a nutrient for something else. I'll teach you to design products, systems, and businesses that work the same way. Let's close the loop.",
        encouragement: [
          "That circular design thinking is brilliant!",
          "You're seeing waste as opportunity — that's the mindset shift.",
          "Your life cycle analysis is getting rigorous.",
        ],
        course: {
          id: "echo-circular",
          title: "Circular Economy & Regenerative Design",
          overview: "Learn to design products and systems that eliminate waste by keeping materials in use. From cradle-to-cradle design to circular business models, build the skills for an economy that regenerates rather than depletes.",
          totalDuration: "25 hours",
          learningDuration: "4–6 weeks",
          difficulty: "Beginner",
          modules: [
            {
              id: "ce-1", title: "Circular Thinking", description: "From linear to circular — redesigning how we make and use things.",
              lessons: [
                { id: "ce-1-1", title: "Linear vs. Circular Economy", duration: "50 min", content: "Our current economy is linear: take resources, make products, throw them away. This 'take-make-waste' model assumes infinite resources and infinite capacity to absorb waste. Both assumptions are wrong.\n\nA circular economy redesigns this system at every stage. Products are designed for disassembly and reuse. Materials are chosen for recyclability. Business models shift from selling products to selling services (you don't buy a washing machine — you buy clean clothes). The result: less extraction, less waste, more value from every resource.", keyPoints: ["The linear economy wastes 90% of materials after first use", "Circular design starts at the product conception stage", "Product-as-a-service models align business incentives with durability", "Biological and technical material cycles require different strategies"], practiceTask: "Choose a common product (e.g., a smartphone) and redesign it for circularity. Address materials selection, modularity for repair, end-of-life recovery, and a business model that incentivizes product return.", reflectionQuestion: "Why do you think the linear economy persists despite its obvious inefficiency? What systemic factors keep it in place?" },
              ],
            },
          ],
        },
      },
      // ── Third mentor: Ember ──
      {
        id: "ember",
        name: "Ember",
        title: "Climate Action & Policy Mentor",
        tagline: "Science becomes power when people organize",
        personality: "Activist-minded, politically savvy, community-driven. Ember bridges climate science with real-world policy, grassroots movements, and corporate accountability.",
        avatar: "🔥",
        initials: "EM",
        envTheme: { bg: "#0a0f0e", accent: "#10b981", mood: "urgent" },
        voiceConfig: { pitch: 1.15, rate: 1.0, voiceHint: "female" },
        specialties: ["Climate Policy", "Environmental Advocacy", "Corporate Sustainability", "Community Organizing", "Carbon Markets"],
        greeting: "Hey — I'm Ember, your climate action mentor. Science tells us what's happening. Policy decides what we do about it. I'll teach you how climate policy actually works, how to hold institutions accountable, and how communities turn knowledge into action. Let's light a fire.",
        encouragement: [
          "That policy analysis cuts straight to the leverage points!",
          "You're connecting local action to global impact — exactly right.",
          "Your advocacy strategy is both bold and strategic.",
        ],
        course: {
          id: "ember-action",
          title: "Climate Policy & Collective Action",
          overview: "Learn how climate policy is made, how carbon markets work, how grassroots movements create change, and how to hold corporations accountable.",
          totalDuration: "24 hours",
          learningDuration: "4–6 weeks",
          difficulty: "Intermediate" as const,
          modules: [
            {
              id: "ca-1", title: "How Climate Policy Works", description: "From international agreements to local action.",
              lessons: [
                { id: "ca-1-1", title: "The Paris Agreement & Global Climate Governance", duration: "50 min", content: "The Paris Agreement (2015) is the most ambitious international climate treaty — 196 nations agreed to limit warming to 1.5–2°C. But it relies on voluntary Nationally Determined Contributions (NDCs), not binding targets.\n\nThe gap between promise and action is where the real fight happens. Understanding how NDCs are set, monitored, and ratcheted up is essential for climate action.", keyPoints: ["The Paris Agreement relies on voluntary national commitments", "NDCs must be updated every 5 years with increasing ambition", "Climate finance to developing nations remains controversial", "Subnational actors often lead when nations lag"], practiceTask: "Compare the NDCs of three countries at different development levels. Analyze ambition, feasibility, and accountability mechanisms.", reflectionQuestion: "Can voluntary international agreements solve a collective action problem like climate change?" },
                { id: "ca-1-2", title: "Carbon Pricing & Market Mechanisms", duration: "55 min", content: "Carbon pricing puts a cost on emissions via carbon taxes (price per ton) or cap-and-trade (emissions cap, tradeable allowances). The EU ETS is the world's largest carbon market.\n\nThe theory: make polluting expensive and clean alternatives win. Reality: prices are often too low, industries get free allowances, and carbon leakage undermines effectiveness.", keyPoints: ["Carbon tax: simple, predictable price signal", "Cap-and-trade: sets quantity, price floats", "Global carbon prices range from $1 to $170/ton", "Border adjustments prevent leakage to unregulated countries"], practiceTask: "Design a carbon pricing system for a mid-sized country. Choose tax vs cap-and-trade, set levels, address competitiveness, and design revenue recycling.", reflectionQuestion: "If carbon pricing is economically efficient, why is it politically so difficult?" },
              ],
            },
            {
              id: "ca-2", title: "Grassroots Climate Action", description: "How communities drive change from the ground up.",
              lessons: [
                { id: "ca-2-1", title: "Community Organizing for Climate Justice", duration: "50 min", content: "Climate change hits hardest in communities with the fewest resources. Climate justice means ensuring the clean energy transition doesn't leave these communities behind.\n\nEffective organizing combines local knowledge with global solidarity. Successful movements build broad coalitions, use strategic escalation, and connect local grievances to systemic causes.", keyPoints: ["Frontline communities bear disproportionate climate impacts", "Climate justice demands equitable transition", "Successful movements combine local organizing with global solidarity", "Strategic escalation: awareness → advocacy → direct action → power"], practiceTask: "Research a climate justice campaign in your region. Map stakeholders, analyze strategy, and document outcomes.", reflectionQuestion: "Why is 'climate justice' a more motivating frame than 'climate action' for many people?" },
              ],
            },
          ],
        },
      },
    ],
  },

  // ════════════════════════════════════════════
  // 2. Health & Longevity
  // ════════════════════════════════════════════
  {
    id: "health",
    slug: "health",
    label: "Health & Longevity",
    tagline: "Your body is the ultimate technology",
    description: "From preventive medicine to neuroscience — understand the science of human health, extend your healthspan, and build the habits that let you thrive for decades.",
    icon: Heart,
    color: "#dc2626",
    gradient: "from-red-600 via-rose-500 to-pink-400",
    mentors: [
      {
        id: "vita",
        name: "Vita",
        title: "Preventive Health Mentor",
        isMaster: true,
        tagline: "The best medicine is the one you never need",
        personality: "Evidence-based, empathetic, empowering. Vita translates complex health science into actionable daily practices.",
        avatar: "🫀",
        initials: "VT",
        envTheme: { bg: "#140606", accent: "#dc2626", mood: "vital" },
        voiceConfig: { pitch: 1.08, rate: 0.92, voiceHint: "female" },
        specialties: ["Preventive Medicine", "Nutrition Science", "Sleep Science", "Exercise Physiology", "Longevity Research"],
        greeting: "Welcome! I'm Vita, your preventive health mentor. The most powerful health interventions aren't drugs or surgeries — they're the daily choices you make about sleep, nutrition, movement, and stress. I'll teach you the science behind a long, vital life. Let's optimize your healthspan.",
        encouragement: [
          "Your understanding of metabolic health is getting nuanced!",
          "Building evidence-based habits — that's real health literacy.",
          "You're thinking about healthspan, not just lifespan. That's the key insight.",
        ],
        course: {
          id: "vita-health",
          title: "The Science of Preventive Health",
          overview: "Learn the evidence-based science of sleep, nutrition, exercise, and stress management. Understand how your body works at a deep level and build the daily practices that maximize your healthspan — the years you live in full vitality.",
          totalDuration: "30 hours",
          learningDuration: "6–8 weeks",
          difficulty: "Beginner",
          modules: [
            {
              id: "ph-1", title: "The Four Pillars of Health", description: "Sleep, nutrition, movement, and stress — the foundations of vitality.",
              lessons: [
                { id: "ph-1-1", title: "Sleep: The Foundation of Everything", duration: "55 min", content: "Matthew Walker's research has revealed that sleep is the single most effective thing you can do for your brain and body. During sleep, your brain consolidates memories, clears metabolic waste via the glymphatic system, and regulates hormones. Chronic sleep deprivation is linked to Alzheimer's, heart disease, diabetes, obesity, and depression.\n\nThe architecture of sleep matters: you need both deep NREM sleep (physical restoration, memory consolidation) and REM sleep (emotional processing, creativity). Each cycle is ~90 minutes, and you need 4-5 cycles per night. Alcohol, blue light, caffeine after 2 PM, and irregular schedules all disrupt this architecture.", keyPoints: ["7-9 hours of sleep is non-negotiable for health", "The glymphatic system clears brain toxins during deep sleep", "Sleep deprivation impairs decision-making as much as alcohol", "Consistent sleep/wake times matter more than total hours"], practiceTask: "Track your sleep for one week using a journal or app. Record bedtime, wake time, caffeine intake, screen exposure, and subjective energy the next day. Identify your biggest sleep disruptors and create a 'sleep protocol' to address them.", reflectionQuestion: "Why does our culture glorify sleep deprivation ('I'll sleep when I'm dead') despite overwhelming evidence of its harm?" },
                { id: "ph-1-2", title: "Nutrition: Fueling Human Performance", duration: "60 min", content: "Nutrition science is plagued by contradictory headlines, but the fundamentals are well-established. Michael Pollan's summary is hard to beat: 'Eat food, not too much, mostly plants.' The science supports: whole foods over processed, abundant vegetables and fruits, adequate protein, healthy fats, and minimizing added sugars and ultra-processed foods.\n\nThe key insight is that ultra-processed foods — engineered for hyper-palatability — drive overeating and metabolic dysfunction. They constitute 60% of calories in the American diet. Understanding food labels, insulin response, and the gut microbiome empowers you to make choices that support long-term health.", keyPoints: ["Ultra-processed foods drive 60% of calorie intake in Western diets", "The gut microbiome influences immunity, mood, and weight", "Protein needs increase with age and exercise", "Meal timing and fasting windows affect metabolic health"], practiceTask: "Audit your diet for three days. Track everything you eat, categorize items as whole food vs. ultra-processed, calculate your protein intake, and identify three specific improvements you can make. Design a week of meals that address the gaps.", reflectionQuestion: "Why is nutrition advice so confusing in popular media? How can you evaluate nutrition claims critically?" },
              ],
            },
            {
              id: "ph-2", title: "Longevity Science", description: "What cutting-edge research reveals about extending healthspan.",
              lessons: [
                { id: "ph-2-1", title: "The Biology of Aging", duration: "55 min", content: "Aging isn't a single process — it's a collection of interconnected mechanisms. The 'hallmarks of aging' identified by researchers include: genomic instability, telomere attrition, epigenetic alterations, loss of proteostasis, deregulated nutrient sensing, mitochondrial dysfunction, cellular senescence, stem cell exhaustion, and altered intercellular communication.\n\nUnderstanding these hallmarks reveals intervention points. Caloric restriction, exercise, rapamycin, metformin, senolytics, and NAD+ precursors all target specific hallmarks. The field is moving from 'anti-aging' to 'geroscience' — treating aging as the root cause of age-related diseases.", keyPoints: ["Nine hallmarks of aging provide a framework for interventions", "Exercise is the most powerful known 'anti-aging' intervention", "Cellular senescence creates inflammation that accelerates aging", "Caloric restriction extends lifespan in nearly every organism studied"], practiceTask: "Research two of the nine hallmarks of aging in depth. For each, explain the mechanism, its role in age-related disease, and current interventions (both lifestyle and pharmaceutical). Assess the evidence quality.", reflectionQuestion: "Should we frame aging as a disease to be treated, or a natural process to be accepted? What are the implications of each framing?" },
              ],
            },
          ],
        },
      },
      {
        id: "pulse",
        name: "Pulse",
        title: "Mental Health & Neuroscience Mentor",
        tagline: "Your brain is plastic — reshape it intentionally",
        personality: "Compassionate, scientific, practical. Pulse bridges neuroscience and psychology to teach evidence-based mental health practices.",
        avatar: "🧬",
        initials: "PU",
        envTheme: { bg: "#0e0610", accent: "#e879f9", mood: "neural" },
        voiceConfig: { pitch: 0.95, rate: 0.88, voiceHint: "male" },
        specialties: ["Neuroscience", "CBT Techniques", "Stress Physiology", "Neuroplasticity", "Emotional Regulation"],
        greeting: "Hello! I'm Pulse, your neuroscience and mental health mentor. Your brain is the most complex object in the known universe — and it's remarkably plastic. I'll teach you how it works and how to work with it. Understanding your mind is the ultimate human skill.",
        encouragement: [
          "Your grasp of neuroplasticity principles is impressive!",
          "Applying CBT techniques shows real self-awareness.",
          "You're building a scientific understanding of your own mind.",
        ],
        course: {
          id: "pulse-neuro",
          title: "Neuroscience of Mental Performance",
          overview: "Understand how your brain creates thoughts, emotions, and habits. Learn evidence-based techniques from CBT, neuroscience, and positive psychology to optimize mental performance and emotional wellbeing.",
          totalDuration: "28 hours",
          learningDuration: "4–6 weeks",
          difficulty: "Beginner",
          modules: [
            {
              id: "nm-1", title: "How Your Brain Works", description: "The neuroscience of thought, emotion, and behavior.",
              lessons: [
                { id: "nm-1-1", title: "Neuroplasticity & Habit Formation", duration: "50 min", content: "Your brain physically changes in response to experience. Every skill you practice, every thought pattern you repeat, literally rewires neural connections. This is neuroplasticity — and it means you are not stuck with the brain you have. You can intentionally reshape it.\n\nHabits form through a neurological loop: cue → routine → reward. Over time, this loop becomes automatic, controlled by the basal ganglia rather than the prefrontal cortex. Understanding this loop lets you design new habits deliberately and disrupt unwanted ones.", keyPoints: ["Neurons that fire together wire together (Hebb's rule)", "It takes 18-254 days to form a habit (not 21, that's a myth)", "The prefrontal cortex is the 'brake' on impulsive behavior", "Stress impairs prefrontal function, increasing habitual behavior"], practiceTask: "Identify one habit you want to build and one you want to break. For each, map the cue-routine-reward loop. Design an implementation intention ('When X happens, I will do Y') and track your progress for two weeks.", reflectionQuestion: "If your brain physically changes based on what you repeatedly do and think, what are you currently training it to become?" },
              ],
            },
          ],
        },
      },
      // ── Third mentor: Stride ──
      {
        id: "stride",
        name: "Stride",
        title: "Movement & Exercise Science Mentor",
        tagline: "Motion is medicine — move with purpose",
        personality: "Energetic, science-driven, motivating. Stride makes exercise physiology accessible and helps you design movement practices that last a lifetime.",
        avatar: "🏃",
        initials: "ST",
        envTheme: { bg: "#100808", accent: "#f43f5e", mood: "kinetic" },
        voiceConfig: { pitch: 1.0, rate: 1.05, voiceHint: "male" },
        specialties: ["Exercise Physiology", "Strength Training", "Mobility", "Sports Science", "Movement Programming"],
        greeting: "Hey there! I'm Stride, your movement and exercise science mentor. Exercise isn't punishment — it's the single most powerful intervention for health, cognition, and longevity. I'll teach you the science behind how your body adapts to training, so you can design a movement practice that works for your life.",
        encouragement: [
          "Your periodization plan shows real programming sophistication!",
          "Understanding the why behind training makes you unstoppable.",
          "That movement analysis is getting sharp — you're thinking like a coach.",
        ],
        course: {
          id: "stride-movement",
          title: "The Science of Human Movement",
          overview: "Understand exercise physiology, strength training principles, mobility, and recovery. Design evidence-based training programs that build strength, endurance, and resilience for decades.",
          totalDuration: "26 hours",
          learningDuration: "4–6 weeks",
          difficulty: "Beginner" as const,
          modules: [
            {
              id: "sm-1", title: "Exercise Physiology Fundamentals", description: "How your body adapts to training.",
              lessons: [
                { id: "sm-1-1", title: "The Adaptation Response: How Training Changes You", duration: "55 min", content: "When you exercise, you're applying a stress that temporarily makes you weaker. During recovery, your body super-compensates — rebuilding stronger than before. This stress-recovery-adaptation cycle is the fundamental mechanism behind all fitness gains.\n\nThe key variables are intensity (how hard), volume (how much), frequency (how often), and recovery (how long between sessions). Manipulating these variables is the art of programming.", keyPoints: ["Training is a stress signal — adaptation happens during recovery", "Progressive overload: gradually increasing demands drives continued gains", "The principle of specificity: your body adapts to exactly what you train", "Recovery is when you get stronger — training breaks you down"], practiceTask: "Design a 4-week training program for a specific goal (e.g., first pullup, 5K run, better mobility). Include progressive overload, rest days, and deload week. Explain your programming decisions.", reflectionQuestion: "Why do most people quit exercise programs? How does understanding the science change your relationship with training?" },
                { id: "sm-1-2", title: "Cardiovascular & Metabolic Fitness", duration: "50 min", content: "VO2 max — your body's maximum capacity to use oxygen — is the single strongest predictor of all-cause mortality. Higher VO2 max means lower risk of heart disease, cancer, dementia, and early death. The good news: it's highly trainable at any age.\n\nZone 2 training (conversational pace, 60-70% max heart rate) builds the aerobic base. High-intensity intervals (Zone 4-5) push VO2 max higher. The optimal mix: 80% Zone 2, 20% high intensity — the polarized training model.", keyPoints: ["VO2 max is the strongest predictor of longevity", "Zone 2 training builds mitochondrial density and fat oxidation", "High-intensity intervals improve VO2 max most efficiently", "The 80/20 rule: most training should be easy, some very hard"], practiceTask: "Calculate your estimated VO2 max using a simple field test. Design a 6-week cardiovascular training plan using the polarized model. Track heart rate during Zone 2 sessions to verify you're in the right zone.", reflectionQuestion: "If VO2 max is the best predictor of longevity, why isn't cardiovascular fitness a standard part of medical checkups?" },
              ],
            },
            {
              id: "sm-2", title: "Strength & Mobility", description: "Building resilient, capable bodies.",
              lessons: [
                { id: "sm-2-1", title: "Resistance Training Fundamentals", duration: "55 min", content: "Muscle mass declines 3-8% per decade after age 30 (sarcopenia). Resistance training is the primary intervention. But it's not just about aesthetics — muscle is a metabolic organ that regulates blood sugar, produces beneficial myokines, protects joints, and maintains independence in old age.\n\nThe fundamentals: compound movements (squat, hinge, push, pull, carry) trained 2-4x per week with progressive overload. Start with bodyweight, progress to external load. Technique always precedes intensity.", keyPoints: ["Muscle loss accelerates aging — resistance training is non-negotiable", "Compound movements train the most muscle in the least time", "2-4 sessions per week is sufficient for most people", "Technique before intensity — injury prevention is paramount"], practiceTask: "Learn and practice the five fundamental movement patterns. Film yourself performing each and analyze form. Create a beginner strength program using only these movements.", reflectionQuestion: "Why is strength training still perceived as optional by many healthcare systems, despite overwhelming evidence?" },
              ],
            },
          ],
        },
      },
    ],
  },

  // ════════════════════════════════════════════
  // 3. Digital Craft & Creator Economy
  // ════════════════════════════════════════════
  {
    id: "creator",
    slug: "creator",
    label: "Digital Craft & Creator Economy",
    tagline: "Build audiences, ship products, own your income",
    description: "Master the skills of the creator economy — from content creation and audience building to launching digital products and building sustainable creative businesses.",
    icon: Wand2,
    color: "#f59e0b",
    gradient: "from-amber-500 via-yellow-500 to-orange-400",
    mentors: [
      {
        id: "pixel",
        name: "Pixel",
        title: "Content Creation Mentor",
        isMaster: true,
        tagline: "Every piece of content is a relationship builder",
        personality: "Creative, strategic, prolific. Pixel teaches that great content isn't about going viral — it's about building genuine connections at scale.",
        avatar: "🎬",
        initials: "PX",
        envTheme: { bg: "#140e04", accent: "#f59e0b", mood: "creative" },
        voiceConfig: { pitch: 1.12, rate: 1.05, voiceHint: "female" },
        specialties: ["Video Production", "Writing", "Social Strategy", "Brand Building", "Monetization"],
        greeting: "Hey! I'm Pixel, your content creation mentor. The creator economy isn't a trend — it's a fundamental shift in how value is created and distributed. I'll teach you to create content that resonates, build an audience that trusts you, and turn that trust into a sustainable business. Let's create something that matters.",
        encouragement: [
          "That content hook is magnetic — instant attention grabber!",
          "Your storytelling instincts are sharpening beautifully.",
          "You're building an authentic voice — that's your moat.",
        ],
        course: {
          id: "pixel-creator",
          title: "The Creator Economy Playbook",
          overview: "Learn to create compelling content across platforms, build an engaged audience, develop your unique voice, and monetize through multiple revenue streams. The creator economy is the most accessible entrepreneurial path in history.",
          totalDuration: "30 hours",
          learningDuration: "4–6 weeks",
          difficulty: "Beginner",
          modules: [
            {
              id: "cc-1", title: "Finding Your Voice", description: "Developing a unique perspective that cuts through the noise.",
              lessons: [
                { id: "cc-1-1", title: "The Creator's Competitive Advantage", duration: "50 min", content: "In a world of infinite content, your unique advantage isn't skill — it's perspective. Nobody else has your specific combination of experiences, interests, and worldview. The most successful creators don't try to be everything to everyone — they go deep on a specific intersection of topics that only they can occupy.\n\nThis is your 'content niche' — but it's not about limiting yourself. It's about becoming the obvious choice for a specific audience. Naval Ravikant calls this 'specific knowledge' — knowledge that can't be taught but can be shared. Your job is to find where your passion meets the world's curiosity.", keyPoints: ["Your unique perspective is your unfair advantage", "Niche down to stand out, then expand once established", "Consistency beats virality for sustainable growth", "Authenticity is a strategy, not just a value"], practiceTask: "Map your unique 'creator intersection' — the overlap of 3 topics you're passionate about, have experience in, and that have audience demand. Create 10 content ideas that sit at this intersection. Test 3 of them and analyze which resonates most.", reflectionQuestion: "What topics could you talk about for hours without getting bored? Where does that enthusiasm overlap with what people are searching for?" },
              ],
            },
            {
              id: "cc-2", title: "Building & Monetizing", description: "From audience to income — sustainable creator business models.",
              lessons: [
                { id: "cc-2-1", title: "Revenue Streams for Creators", duration: "55 min", content: "The most resilient creator businesses have multiple revenue streams. Ad revenue alone is volatile and platform-dependent. Smart creators diversify across: digital products (courses, templates, ebooks), services (coaching, consulting), brand partnerships (aligned with audience values), community membership (recurring revenue), and affiliate marketing (recommending tools you use).\n\nThe key principle: own your audience relationship. Email lists and communities on your own platform are assets you control. Social media followers are rented attention — the platform can change the rules anytime.", keyPoints: ["Digital products have near-zero marginal cost", "Email lists are owned assets; social followers are rented", "1,000 true fans generating $100/year = $100K business", "Brand deals should align with audience trust, never betray it"], practiceTask: "Design a creator business model with at least 4 revenue streams. For each, estimate potential monthly revenue, required audience size, and time investment. Create a 12-month roadmap for launching each stream sequentially.", reflectionQuestion: "Why do some creators with small audiences earn more than those with millions of followers? What does that reveal about the value of trust?" },
              ],
            },
          ],
        },
      },
      // ── Second mentor: Flux ──
      {
        id: "flux",
        name: "Flux",
        title: "Growth & Monetization Mentor",
        tagline: "Turn attention into sustainable revenue",
        personality: "Analytical, growth-focused, data-driven. Flux combines creative intuition with rigorous metrics to help creators build businesses, not just audiences.",
        avatar: "📊",
        initials: "FX",
        envTheme: { bg: "#12100a", accent: "#d97706", mood: "analytical" },
        voiceConfig: { pitch: 0.92, rate: 1.0, voiceHint: "male" },
        specialties: ["Analytics", "Growth Hacking", "Funnel Design", "Email Marketing", "Product Launches"],
        greeting: "Hey, I'm Flux — your growth and monetization mentor. Creativity matters, but so does sustainability. I'll teach you to read the numbers, understand what's working, build revenue systems, and turn your creative passion into a real business. Let's make the math work for your art.",
        encouragement: [
          "That conversion funnel design shows real business thinking!",
          "Your analytics instincts are getting sharper with every lesson.",
          "You're thinking like a creator-entrepreneur now — that's the edge.",
        ],
        course: {
          id: "flux-growth",
          title: "Creator Growth & Revenue Systems",
          overview: "Master the analytics, growth strategies, and monetization systems that turn creative work into sustainable businesses. From email funnels to product launches, learn the business side of creating.",
          totalDuration: "26 hours",
          learningDuration: "4–6 weeks",
          difficulty: "Intermediate" as const,
          modules: [
            {
              id: "fg-1", title: "Growth Mechanics", description: "Understanding audience growth loops and viral mechanics.",
              lessons: [
                { id: "fg-1-1", title: "The Creator Growth Flywheel", duration: "50 min", content: "Sustainable creator growth isn't about gaming algorithms — it's about building growth flywheels. A flywheel is a self-reinforcing cycle: create content → attract audience → engage deeply → get shared → attract more audience. The strongest creators have multiple interlocking flywheels.\n\nThe key metrics that matter: not follower count, but engagement rate, email conversion rate, and revenue per subscriber. A creator with 5,000 engaged email subscribers often earns more than one with 500,000 passive followers.", keyPoints: ["Growth flywheels are self-reinforcing cycles", "Engagement rate matters more than follower count", "Email subscribers are 10x more valuable than social followers", "Depth of relationship beats breadth of reach"], practiceTask: "Map your creator growth flywheel. Identify the key conversion points (discovery → follow → engage → subscribe → purchase). For each, brainstorm 3 ways to increase conversion rate.", reflectionQuestion: "Why do some creators with huge audiences struggle financially while others with tiny audiences thrive?" },
              ],
            },
            {
              id: "fg-2", title: "Revenue Architecture", description: "Building multiple revenue streams that compound.",
              lessons: [
                { id: "fg-2-1", title: "The Revenue Stack: From Free to Premium", duration: "55 min", content: "Smart creators build a 'revenue stack' — layers of value at different price points. Free content builds trust. Low-ticket products ($10-50) convert curious followers into customers. Mid-ticket ($100-500) serves committed learners. High-ticket ($1000+) delivers transformation.\n\nEach layer feeds the next. Someone who buys your $29 ebook is 10x more likely to join your $299 course.", keyPoints: ["Revenue stacks serve customers at every commitment level", "Free content is customer acquisition, not a loss", "Low-ticket products identify your best customers", "High-ticket offerings have the best profit margins"], practiceTask: "Design a 4-tier revenue stack for a creator niche. Define offer, price, delivery method, and expected conversion rate for each tier. Calculate projected monthly revenue at 1K, 10K, 100K audience sizes.", reflectionQuestion: "What makes someone willing to pay $1000+ when similar free content exists? What's the real product at premium pricing?" },
              ],
            },
          ],
        },
      },
      // ── Third mentor: Prism ──
      {
        id: "prism",
        name: "Prism",
        title: "Visual Design & Brand Identity Mentor",
        tagline: "Design is thinking made visible",
        personality: "Aesthetic, detail-obsessed, brand-strategic. Prism teaches that great design isn't decoration — it's communication compressed into visual form.",
        avatar: "🎨",
        initials: "PR",
        envTheme: { bg: "#12100a", accent: "#eab308", mood: "visual" },
        voiceConfig: { pitch: 1.1, rate: 0.95, voiceHint: "female" },
        specialties: ["Visual Identity", "Typography", "Color Theory", "Brand Systems", "UI/UX Design"],
        greeting: "Hey! I'm Prism, your visual design and brand identity mentor. In the creator economy, your visual identity is your first impression — and often your only chance to stand out. I'll teach you the design principles that separate amateur from professional, so every pixel you publish builds your brand.",
        encouragement: [
          "That color system is cohesive and distinctive — real brand thinking!",
          "Your typography choices show genuine design maturity.",
          "You're developing an eye for visual hierarchy — that's the designer's superpower.",
        ],
        course: {
          id: "prism-design",
          title: "Visual Design for Creators",
          overview: "Master the fundamentals of visual design — color theory, typography, layout, and brand identity systems. Build a professional visual brand that stands out and scales across platforms.",
          totalDuration: "24 hours",
          learningDuration: "4–6 weeks",
          difficulty: "Beginner" as const,
          modules: [
            {
              id: "vd-1", title: "Design Fundamentals", description: "The principles that make design work.",
              lessons: [
                { id: "vd-1-1", title: "Visual Hierarchy & Layout Principles", duration: "50 min", content: "Visual hierarchy is the arrangement of elements to guide the viewer's eye in order of importance. It's how designers communicate 'look here first, then here, then here.' The tools: size (bigger = more important), contrast (high contrast draws attention), spacing (white space creates breathing room), and position (top-left gets scanned first in Western layouts).\n\nThe golden rule: every design should have one clear focal point. If everything screams for attention, nothing gets it. Restraint is the hallmark of professional design.", keyPoints: ["Size, contrast, spacing, and position control visual hierarchy", "Every design needs one clear focal point", "White space is not empty — it's a design element", "The rule of thirds creates natural visual tension"], practiceTask: "Redesign a cluttered social media post or webpage screenshot. Apply visual hierarchy principles to create a clear reading path. Show before and after with annotations explaining each decision.", reflectionQuestion: "Why do beginners tend to fill every inch of space? What makes restraint so difficult and so powerful?" },
                { id: "vd-1-2", title: "Color Theory & Typography for Brand", duration: "55 min", content: "Color is emotion compressed into wavelengths. Different colors trigger different psychological responses — blue signals trust, red signals urgency, green signals growth. A brand's color palette is a shortcut to its personality.\n\nTypography is equally powerful. A serif font (Times) says tradition and authority. A geometric sans-serif (Futura) says modern and clean. A humanist sans-serif (Gill Sans) says approachable. Your font choices communicate before anyone reads a word.", keyPoints: ["Limit brand palettes to 2-3 primary colors plus neutrals", "Color contrast ratios must meet accessibility standards (WCAG)", "Pair one display font with one body font — no more", "Font personality must match brand personality"], practiceTask: "Create a complete brand color system and typography scale for a fictional creator brand. Include primary, secondary, accent colors, and specify heading, body, and caption typefaces with rationale for each choice.", reflectionQuestion: "Why do the world's most recognized brands use such simple color palettes? What does simplicity communicate?" },
              ],
            },
            {
              id: "vd-2", title: "Brand Identity Systems", description: "Building visual systems that scale.",
              lessons: [
                { id: "vd-2-1", title: "Building a Scalable Brand System", duration: "55 min", content: "A brand identity isn't a logo — it's a system. It includes your logo, color palette, typography, imagery style, iconography, layout patterns, and voice. The goal: every piece of content looks like it belongs to the same family, whether it's a tweet, a YouTube thumbnail, a course landing page, or a business card.\n\nThe secret to consistency at scale: design tokens and templates. Define your visual rules once, then create reusable templates that enforce them. This lets you produce high-quality content quickly without redesigning from scratch each time.", keyPoints: ["A brand system is more than a logo — it's visual rules for everything", "Consistency builds recognition faster than any single brilliant design", "Design tokens: reusable color, type, and spacing values", "Templates enforce quality while enabling speed"], practiceTask: "Build a mini brand guide with logo usage rules, color codes, typography scale, and 3 content templates (social post, presentation slide, email header). Test it by creating 5 pieces of content that all feel cohesive.", reflectionQuestion: "How do constraints (brand rules) actually increase rather than limit creativity?" },
              ],
            },
          ],
        },
      },
    ],
  },

  // ════════════════════════════════════════════
  // 4. Philosophy & Critical Thinking
  // ════════════════════════════════════════════
  {
    id: "philosophy",
    slug: "philosophy",
    label: "Philosophy & Critical Thinking",
    tagline: "Think clearly in a world of noise",
    description: "Develop the mental models, logical reasoning, and ethical frameworks that enable clear thinking, wise decisions, and a meaningful life.",
    icon: Scale,
    color: "#7c3aed",
    gradient: "from-violet-700 via-violet-500 to-purple-400",
    mentors: [
      {
        id: "socra",
        name: "Socra",
        title: "Critical Thinking Mentor",
        isMaster: true,
        tagline: "Question everything — especially yourself",
        personality: "Socratic, precise, intellectually humble. Socra teaches through questions rather than answers, building your capacity for independent thought.",
        avatar: "🏛️",
        initials: "SO",
        envTheme: { bg: "#0e0818", accent: "#7c3aed", mood: "contemplative" },
        voiceConfig: { pitch: 0.9, rate: 0.85, voiceHint: "male" },
        specialties: ["Logic & Argumentation", "Cognitive Biases", "Decision Frameworks", "Ethical Reasoning", "Mental Models"],
        greeting: "Welcome. I'm Socra, your critical thinking mentor. In an age of information overload, the ability to think clearly is the most valuable skill you can develop. I won't give you answers — I'll teach you to ask better questions. The examined life, as my namesake said, is the only one worth living.",
        encouragement: [
          "That argument structure is logically rigorous!",
          "Identifying your own bias — that takes real intellectual honesty.",
          "You're developing the habit of questioning assumptions. That's everything.",
        ],
        course: {
          id: "socra-thinking",
          title: "The Art of Clear Thinking",
          overview: "Learn formal logic, identify cognitive biases, build mental models, and develop ethical reasoning frameworks. This isn't abstract philosophy — it's practical training for making better decisions in every domain of life.",
          totalDuration: "30 hours",
          learningDuration: "6–8 weeks",
          difficulty: "Beginner",
          modules: [
            {
              id: "ct-1", title: "Foundations of Logic", description: "The structure of valid reasoning.",
              lessons: [
                { id: "ct-1-1", title: "Arguments, Premises & Logical Fallacies", duration: "55 min", content: "An argument is a set of premises leading to a conclusion. A valid argument has a structure where, if the premises are true, the conclusion must be true. A sound argument is valid AND has true premises. Most disagreements in life aren't about facts — they're about hidden premises or logical errors.\n\nLogical fallacies are patterns of reasoning that seem convincing but are structurally invalid. Ad hominem (attacking the person, not the argument), straw man (misrepresenting the argument), false dichotomy (presenting only two options when more exist), appeal to authority, and confirmation bias are everywhere — in politics, media, and our own thinking.\n\nReal-world example: During a corporate strategy meeting, a VP argued 'We should expand to Asia because our competitor did and their stock went up.' This contains multiple fallacies: post hoc ergo propter hoc (assuming the stock rose because of the expansion), appeal to authority (following competitors blindly), and a hidden premise (what works for them works for us). Unpacking these fallacies revealed the team needed independent market research, not imitation.\n\nPractical breakdown: To analyze any argument — (1) Identify the conclusion. (2) List the explicit premises. (3) Find hidden premises. (4) Check validity. (5) Check soundness. (6) Identify any fallacies.", keyPoints: ["Valid argument: structure is correct. Sound argument: structure AND premises are correct", "Most real-world arguments have hidden premises — identify them", "Fallacies feel persuasive but collapse under analysis", "Your own reasoning has fallacies too — intellectual humility is essential", "The 12 most common fallacies cover 90% of bad reasoning you'll encounter", "Steelmanning (strengthening the opposing argument) beats strawmanning"], practiceTask: "Analyze 5 opinion pieces or debates from major media. For each, extract the core argument, identify hidden premises, and flag logical fallacies. Then steelman each argument — rewrite it in its strongest possible form.", reflectionQuestion: "When you discover that you've been committing a logical fallacy, how does that feel? Why is it uncomfortable to find flaws in your own reasoning?" },
                { id: "ct-1-2", title: "Cognitive Biases & Mental Shortcuts", duration: "60 min", content: "Daniel Kahneman's research revealed that human cognition operates in two systems: System 1 (fast, automatic, intuitive) and System 2 (slow, deliberate, analytical). Most decisions are made by System 1, which uses mental shortcuts (heuristics) that often work but systematically fail in predictable ways — these are cognitive biases.\n\nThere are over 180 documented cognitive biases, but a handful dominate: Confirmation bias (seeking evidence for existing beliefs), Anchoring (over-relying on the first piece of information), Availability heuristic (overweighting recent/vivid events), Dunning-Kruger effect (the less you know, the more confident you are), and Sunk cost fallacy (continuing because you've already invested).\n\nReal-world example: A startup founder invested $500,000 into a product nobody wanted. Every advisor said pivot, but he couldn't let go — sunk cost fallacy. He also suffered from confirmation bias, selectively reading user feedback that supported his vision while dismissing critical feedback.\n\nPractical breakdown: You cannot eliminate biases — they're wired into cognition. But you can build debiasing protocols: (1) Pre-mortems — before decisions, imagine the project failed and identify why. (2) Devil's advocate — formally assign someone to argue against the group. (3) Base rates — check statistical reality before trusting intuition. (4) Decision journals — record your reasoning before outcomes are known.", keyPoints: ["System 1 (fast/intuitive) vs. System 2 (slow/deliberate) — most decisions are System 1", "Confirmation bias is the most pervasive — you see what you expect to see", "Sunk cost fallacy: past investment shouldn't determine future decisions", "Dunning-Kruger: incompetence prevents recognizing incompetence", "Pre-mortems and devil's advocates are the best organizational debiasing tools", "You can't eliminate biases, but you can build systems to catch them"], practiceTask: "Keep a 'bias journal' for one week. Each day, catch yourself using at least one cognitive bias. Document: the situation, the bias, the decision you made, and how you'd decide differently. At week's end, identify your personal top 3 biases.", reflectionQuestion: "If our brains are systematically biased, can we ever truly think objectively? What's the best we can do?" },
                { id: "ct-1-3", title: "The Art of Asking Better Questions", duration: "50 min", content: "Socrates never wrote a single word. His entire philosophical method was asking questions — not to trap people, but to help them discover the gaps in their own reasoning. The Socratic method works because the most important knowledge isn't information — it's awareness of what you don't know.\n\nThe quality of your thinking is determined by the quality of your questions. 'How do I make more money?' produces shallow thinking. 'What would I work on even if I weren't paid?' produces insight.\n\nReal-world example: A product team kept asking 'How do we get more users?' and getting mediocre answers. A new PM reframed: 'Why do users who try our product once never come back?' That question revealed a completely different problem — onboarding friction — that the original question would never have surfaced.\n\nPractical breakdown: Three levels of questions — (1) Surface questions ask about facts. (2) Structural questions ask about patterns. (3) Paradigmatic questions challenge assumptions. Most problem-solving stays at level 1. Breakthroughs come from level 3.", keyPoints: ["The Socratic method: questions reveal gaps in reasoning better than lectures", "The quality of your answers is limited by the quality of your questions", "Reframing the question often matters more than answering it", "Three levels: surface (facts), structural (patterns), paradigmatic (assumptions)", "The most powerful question is often 'What am I assuming that might be wrong?'", "Intellectual humility — knowing what you don't know — is the highest form of intelligence"], practiceTask: "For one important problem you're facing, write 10 different questions about it. Push from surface to structural to paradigmatic. Notice which question reframes the problem most powerfully. Practice the Socratic method in a conversation: respond only with genuine questions for 10 minutes.", reflectionQuestion: "What question, if answered honestly, would most transform your life right now? Why haven't you asked it?" },
              ],
            },
            {
              id: "ct-2", title: "Mental Models for Decision-Making", description: "Thinking tools that upgrade every decision you make.",
              lessons: [
                { id: "ct-2-1", title: "First Principles Thinking", duration: "50 min", content: "First principles thinking means breaking down complex problems to their most fundamental truths and building up from there — rather than reasoning by analogy. Aristotle defined a first principle as 'the first basis from which a thing is known.'\n\nElon Musk famously used first principles to challenge the assumption that rockets must be expensive. Rather than accepting the market price ($65 million per launch), he asked: 'What are rockets made of? What do these materials cost on the commodity market?' The answer was about 2% of the typical rocket price. This reasoning led to SpaceX.\n\nReal-world example: A restaurateur asked 'Why does a great dining experience cost $200 per person?' She broke it down: ingredient cost (15%), labor (30%), real estate (25%), ambiance (15%), profit (15%). By eliminating expensive real estate and simplifying ambiance, she delivered $200-quality food for $60.\n\nPractical breakdown: The first principles process — (1) Identify the assumption. (2) Break it down to fundamental components. (3) Question each component. (4) Rebuild the best solution from those truths.", keyPoints: ["First principles = fundamental truths, not inherited assumptions", "Reasoning by analogy is easier but limits you to incremental improvement", "Ask 'Why?' five times to reach first principles (Toyota's 5 Whys)", "The cost of first principles thinking is effort; the reward is breakthrough innovation", "Most 'impossible' things are just unexplored first-principles solutions", "Combine first principles with practical constraints for actionable insight"], practiceTask: "Choose a problem you're stuck on. Write your current assumptions. Apply the 5 Whys to each until you reach first principles. Rebuild a solution from those fundamentals, ignoring conventional wisdom. Compare to your original approach.", reflectionQuestion: "In what area of your life are you reasoning by analogy instead of from first principles? What would change if you questioned those inherited assumptions?" },
                { id: "ct-2-2", title: "Inversion & Second-Order Thinking", duration: "50 min", content: "Charlie Munger says 'Invert, always invert.' Instead of asking 'How do I succeed?' ask 'How would I guarantee failure?' Then avoid those things. Inversion reveals risks and failure modes that forward thinking misses.\n\nSecond-order thinking extends this: most people consider only the immediate effects of a decision (first order). Wise thinkers consider the effects of the effects (second order) and the effects of those effects (third order). Rent control sounds good (first order: lower rents). But second order: landlords reduce maintenance. Third order: housing supply shrinks.\n\nReal-world example: Amazon's decision to offer free shipping seemed to lose money (first order). Second order: it increased order frequency and basket size. Third order: it created Prime, which became Amazon's most powerful competitive moat.\n\nPractical breakdown: For any decision — (1) Inversion: 'What would make this fail?' (2) Second-order: 'If I do this, then what happens? And then what?' Map at least three levels. (3) Combine: 'What second-order effects could cause failure?'", keyPoints: ["Inversion: solve problems backward — 'How would I guarantee failure?'", "Second-order thinking: consider consequences of consequences", "Most bad decisions look good at first order but fail at second", "Inversion catches risks that optimistic forward-thinking misses", "Great strategists think at least 3 orders of consequences ahead", "Combining inversion with second-order thinking is the most powerful decision tool"], practiceTask: "For a major decision you're facing: (1) Apply inversion — list 10 ways it could go wrong. (2) Apply second-order thinking — map three levels of consequences for each option. (3) Identify which second-order consequences are most dangerous and design safeguards.", reflectionQuestion: "Think of a decision you regret. Was the failure visible at first order or did it emerge at second/third order?" },
                { id: "ct-2-3", title: "Building Your Mental Model Toolkit", duration: "55 min", content: "Charlie Munger advocates building a latticework of mental models from multiple disciplines. A person with one model tries to fit every problem into it. A person with 50 models can select the most appropriate one for each situation.\n\nEssential mental models: (1) Pareto Principle (80/20) — a vital few inputs produce most outputs. (2) Occam's Razor — the simplest explanation is usually correct. (3) The Map is Not the Territory — your model of reality is not reality. (4) Circle of Competence — know what you know and what you don't. (5) Opportunity Cost — every choice means giving up alternatives. (6) Feedback Loops — outputs become inputs. (7) Margin of Safety — build buffers for the unexpected.\n\nReal-world example: Warren Buffett's investment success comes from combining just a few mental models: circle of competence, margin of safety, compound interest, and competitive moats. Simple models applied consistently beat complex algorithms.\n\nPractical breakdown: Start with 10-12 core models and practice applying them. The key is pattern recognition — when you see a situation, which model applies? Keep a model journal: for each important decision, write which models you applied and why.", keyPoints: ["A latticework of mental models from multiple disciplines prevents narrow thinking", "10-12 core models cover most decision situations you'll face", "Pareto (80/20), Occam's Razor, Map vs. Territory, Circle of Competence", "Opportunity cost, feedback loops, margin of safety, compound effects", "The goal is pattern recognition — matching situations to models automatically", "When multiple models agree on a decision, your confidence should increase"], practiceTask: "Create a personal 'mental model cheat sheet' with 10 models most useful to your life. For each, write: the model in one sentence, when to use it, and a personal example. This week, before every significant decision, apply at least 2 models.", reflectionQuestion: "Which mental model would have changed a past decision most significantly? What model are you currently missing?" },
              ],
            },
            {
              id: "ct-3", title: "The Examined Life", description: "Apply critical thinking to yourself — the hardest and most important application.",
              lessons: [
                { id: "ct-3-1", title: "Thinking About Thinking: Metacognition", duration: "50 min", content: "Metacognition — thinking about your own thinking — is the highest-leverage cognitive skill. It's the ability to observe your thought processes while they're happening, evaluate their quality, and adjust in real time.\n\nResearch shows that metacognitive awareness is one of the strongest predictors of success — stronger than IQ. Students who monitor their understanding learn dramatically faster than those who don't.\n\nReal-world example: A chess grandmaster doesn't just think about moves — she thinks about how she's thinking about moves. 'Am I being too aggressive? Am I anchored on an early plan?' This metacognitive layer separates experts from advanced beginners.\n\nPractical breakdown: Three metacognitive practices — (1) Monitoring: 'Do I actually understand this?' (2) Planning: 'What approach will I use? What models apply?' (3) Evaluating: 'Was my approach effective? Where did my thinking go wrong?'", keyPoints: ["Metacognition: thinking about your own thinking — the ultimate cognitive skill", "Stronger predictor of success than IQ", "Three practices: monitoring, planning, evaluating", "The Feynman Technique: if you can't explain it simply, you don't understand it", "Metacognition improves dramatically with deliberate practice", "Journaling is the most accessible metacognitive tool"], practiceTask: "Practice metacognitive monitoring for three days. During any complex task, set a timer for every 15 minutes. At each interval, ask: 'What am I thinking? Is my approach working? Do I truly understand this?' Journal your observations about your own thinking patterns.", reflectionQuestion: "When do you mistake familiarity for understanding? How can you tell the difference between 'I've seen this before' and 'I truly get this'?" },
                { id: "ct-3-2", title: "Intellectual Humility & Changing Your Mind", duration: "45 min", content: "Intellectual humility is the recognition that your beliefs might be wrong — and the willingness to update them in the face of better evidence. It's not about lacking confidence; it's about holding beliefs proportionally to the evidence.\n\nJulia Galef's 'Scout Mindset' vs. 'Soldier Mindset' captures this. The soldier defends existing beliefs. The scout seeks to build an accurate map of reality, even when that means admitting previous beliefs were wrong.\n\nReal-world example: Ray Dalio attributes Bridgewater's success to radical open-mindedness — actively seeking disagreement. He asks: 'What am I missing? Where am I wrong?' and rewards employees who challenge his thinking.\n\nPractical breakdown: Building intellectual humility — (1) Assign confidence levels to beliefs (e.g., '70% sure'). (2) Seek disconfirming evidence. (3) Practice saying 'I changed my mind because...' (4) Surround yourself with thoughtful disagreers.", keyPoints: ["Scout mindset (map reality) vs. soldier mindset (defend beliefs)", "Strong opinions, weakly held: be confident but open to updating", "Actively seek disconfirming evidence — the only way to improve your map", "Changing your mind is strength, not weakness", "Assign probability to beliefs — few things deserve 100% certainty", "The smartest people update faster, not less often"], practiceTask: "Identify a belief you hold strongly. Spend 30 minutes searching for the best arguments against it. Write a steelman of the opposing position. Rate your confidence before and after. Track one instance this week where you changed your mind.", reflectionQuestion: "What belief, if wrong, would be most disruptive to your worldview? Are you open to testing it?" },
                { id: "ct-3-3", title: "Information Literacy in the Age of Noise", duration: "50 min", content: "We live in an unprecedented information environment: more content is produced in a day than a person could consume in a lifetime. The challenge isn't access — it's discerning signal from noise.\n\nMisinformation (unintentional falsehood), disinformation (deliberate deception), and malinformation (true but misleading context) exploit cognitive biases — especially confirmation bias and emotional reasoning. Algorithms amplify the most engaging content, which is often the most outrageous and least accurate.\n\nReal-world example: A student encountered a viral health article. Instead of sharing or dismissing it, she applied the SIFT method: Stop, Investigate the source, Find better coverage, Trace claims. She discovered the article cherry-picked a single study and ignored five contradicting ones.\n\nPractical breakdown: The information diet — curate what you consume mentally. (1) Prioritize primary sources over commentary. (2) Follow domain experts rather than generalist commentators. (3) Read books for deep understanding. (4) Build a diverse media diet. (5) The 24-hour rule — wait before forming opinions on breaking news.", keyPoints: ["SIFT method: Stop, Investigate the source, Find better coverage, Trace claims", "Misinformation vs. disinformation vs. malinformation — different problems", "Algorithms optimize for engagement, not accuracy", "Primary sources over commentary; books over articles for depth", "Diverse media diet prevents echo chambers", "The 24-hour rule prevents knee-jerk reactions to breaking news"], practiceTask: "Apply the SIFT method to 5 pieces of content this week. Document: the claim, source investigation, what better coverage says, and original data. Also audit your information diet: list your top 10 sources and evaluate each for accuracy, bias, and depth.", reflectionQuestion: "How would your beliefs change if you only consumed primary sources and expert analysis for one month?" },
              ],
            },
          ],
        },
      },
      {
        id: "ethica",
        name: "Ethica",
        title: "Ethics & Decisions Mentor",
        tagline: "Navigate the grey areas with wisdom",
        personality: "Thoughtful, nuanced, empathetic. Ethica doesn't moralize — she helps you build frameworks for navigating genuinely difficult moral questions.",
        avatar: "⚖️",
        initials: "ET",
        envTheme: { bg: "#100818", accent: "#a78bfa", mood: "reflective" },
        voiceConfig: { pitch: 1.1, rate: 0.88, voiceHint: "female" },
        specialties: ["Ethical Frameworks", "Decision Theory", "Applied Ethics", "Moral Psychology", "Value Alignment"],
        greeting: "Hello. I'm Ethica, your ethics and decision-making mentor. The hardest decisions in life aren't between right and wrong — they're between right and right, or between two imperfect options. I'll help you build frameworks for navigating complexity with wisdom and integrity.",
        encouragement: [
          "That ethical analysis shows real depth and nuance!",
          "You're holding multiple perspectives simultaneously — that's moral maturity.",
          "Your decision framework is becoming more robust.",
        ],
        course: {
          id: "ethica-ethics",
          title: "Applied Ethics & Decision Making",
          overview: "Explore the major ethical frameworks — utilitarianism, deontology, virtue ethics, care ethics — and learn to apply them to real decisions in technology, business, medicine, and everyday life.",
          totalDuration: "28 hours",
          learningDuration: "5–6 weeks",
          difficulty: "Intermediate",
          modules: [
            {
              id: "ae-1", title: "Ethical Frameworks", description: "The major traditions of moral reasoning.",
              lessons: [
                { id: "ae-1-1", title: "Consequentialism, Deontology & Virtue Ethics", duration: "55 min", content: "The three major ethical traditions offer different lenses for moral reasoning. Consequentialism (especially utilitarianism) judges actions by their outcomes — the right action produces the most good for the most people. Deontology (following Kant) judges actions by whether they follow moral rules — some actions are right or wrong regardless of consequences. Virtue ethics (from Aristotle) focuses on character — the right action is what a virtuous person would do.\n\nNone of these frameworks is complete on its own. Real ethical reasoning often requires holding multiple perspectives simultaneously. A doctor might use consequentialism for triage decisions, deontological thinking for patient consent, and virtue ethics for bedside manner.\n\nReal-world example: Should a self-driving car prioritize its passengers or pedestrians in an unavoidable collision? Utilitarianism says: minimize total harm (save the most people). Deontology says: you cannot use people as means to an end (the car shouldn't sacrifice pedestrians for passengers or vice versa). Virtue ethics asks: what would a courageous, wise person do? Each framework yields a different answer — and engineers must decide which to program.\n\nPractical breakdown: For any ethical dilemma, apply all three lenses: (1) Consequentialist: What action produces the best outcomes for the most people? (2) Deontological: What duties, rights, or rules apply regardless of outcome? (3) Virtue-based: What would a person of excellent character do? When all three agree, you have strong moral ground. When they conflict, that's where deep ethical reasoning begins.", keyPoints: ["Utilitarianism: maximize overall wellbeing (but whose? how measured?)", "Deontology: some acts are wrong regardless of outcomes (but which?)", "Virtue ethics: focus on character rather than rules (but whose virtues?)", "Ethical pluralism: use multiple frameworks for robust reasoning", "When frameworks conflict, that's where genuine ethical thinking begins", "Care ethics adds a fourth lens: what does this relationship require?"], practiceTask: "Analyze a current ethical controversy (AI bias, climate policy, gene editing) from all three frameworks. Show how each arrives at a different conclusion. Then articulate your own position, explaining which framework(s) inform it and why.", reflectionQuestion: "Is there a 'best' ethical framework, or is the ability to reason from multiple frameworks itself the highest ethical skill?" },
                { id: "ae-1-2", title: "Care Ethics & Feminist Philosophy", duration: "50 min", content: "Care ethics, developed by Carol Gilligan and Nel Noddings, challenges the traditional emphasis on abstract rules and universal principles. Instead, it centers relationships, empathy, and responsiveness to particular people in particular contexts. The fundamental question shifts from 'What is the right rule?' to 'What does this relationship require of me?'\n\nThis isn't a rejection of justice — it's a complement to it. Justice asks 'What do people deserve?' Care asks 'What do people need?' Both are essential. A hospital that follows rules perfectly but treats patients without compassion is failing ethically. A friend who cares deeply but enables destructive behavior is also failing.\n\nReal-world example: A manager discovers an employee has been underperforming for months. A purely rule-based approach: follow the performance improvement plan, document, potentially terminate. A care ethics approach adds: What's happening in this person's life? What do they need to succeed? Is this a skill gap or a wellbeing crisis? The care-informed manager investigates first, discovering the employee is going through a divorce. She adjusts expectations temporarily while maintaining standards — combining justice with care.\n\nPractical breakdown: Care ethics operates on four elements: (1) Attentiveness — noticing when someone needs care. (2) Responsibility — acknowledging your role in providing it. (3) Competence — caring effectively, not just well-intentionally. (4) Responsiveness — adjusting based on the other's actual experience of your care.", keyPoints: ["Care ethics centers relationships and context, not abstract rules", "Justice asks 'What do people deserve?' Care asks 'What do people need?'", "Neither care nor justice alone is sufficient — both are required", "Four elements: attentiveness, responsibility, competence, responsiveness", "Care ethics challenges the false separation between emotion and reason", "Structural care: designing systems that care, not just individuals who care"], practiceTask: "Identify a current ethical situation in your life. Analyze it through care ethics: Who is involved? What relationships are at stake? What does each person need? How would a care-centered response differ from a purely rule-based one? Try the care-centered approach and reflect on the outcome.", reflectionQuestion: "In what areas of your life do you default to rules when care would serve better? Where do you default to care when clearer boundaries would help?" },
                { id: "ae-1-3", title: "Moral Psychology: Why Good People Do Bad Things", duration: "50 min", content: "Understanding ethics requires understanding moral psychology — the cognitive and emotional processes behind moral judgment. Jonathan Haidt's research reveals that moral reasoning is often post-hoc rationalization: you feel something is wrong (emotional intuition), then construct a logical argument to justify that feeling.\n\nHaidt's Moral Foundations Theory identifies six universal moral dimensions: Care/Harm, Fairness/Cheating, Loyalty/Betrayal, Authority/Subversion, Sanctity/Degradation, and Liberty/Oppression. Different people and cultures weight these foundations differently — which explains why people can be equally moral yet reach opposite conclusions.\n\nReal-world example: Stanley Milgram's obedience experiments showed that 65% of ordinary people would administer what they believed were lethal electric shocks when instructed by an authority figure. They weren't evil — they were caught in a system that overrode their moral intuitions. Understanding this isn't excusing it — it's preparing yourself to resist similar pressures.\n\nPractical breakdown: Three forces that lead good people to bad actions: (1) Authority pressure — the Milgram effect. Build the habit of questioning authority internally. (2) Gradual escalation — the 'slippery slope' works because each small step seems harmless. Set bright-line rules for yourself. (3) Diffusion of responsibility — 'Someone else will handle it.' Adopt the principle: if you see it, you own it.", keyPoints: ["Moral intuitions come first; reasoning follows (Haidt's social intuitionist model)", "Six moral foundations: Care, Fairness, Loyalty, Authority, Sanctity, Liberty", "Different people weight moral foundations differently — this explains political disagreement", "Milgram effect: authority pressure overrides moral intuition in most people", "Gradual escalation makes unethical behavior feel normal — set bright-line rules", "Awareness of moral psychology makes you less vulnerable to its traps"], practiceTask: "Take Haidt's Moral Foundations Questionnaire online. Reflect on which foundations you weight most heavily. Then analyze a political or ethical disagreement you've had: can you identify which moral foundations each side is prioritizing? Practice explaining the other side's position using their moral foundations, not yours.", reflectionQuestion: "Have you ever done something you knew was wrong because of authority pressure, gradual escalation, or diffusion of responsibility? What would you do differently now?" },
              ],
            },
            {
              id: "ae-2", title: "Ethics in the Modern World", description: "Applying ethical thinking to technology, AI, business, and daily life.",
              lessons: [
                { id: "ae-2-1", title: "AI Ethics: Bias, Autonomy & Accountability", duration: "55 min", content: "Artificial intelligence is making decisions that affect billions of people — hiring, lending, criminal sentencing, medical diagnosis, content recommendation. But AI systems encode the biases of their training data and designers, often amplifying existing inequalities.\n\nThe core ethical challenges of AI: (1) Bias — AI trained on historical data perpetuates historical discrimination. (2) Transparency — 'black box' algorithms make decisions no one can explain. (3) Autonomy — at what point should AI make decisions without human oversight? (4) Accountability — when an AI causes harm, who is responsible?\n\nReal-world example: Amazon developed an AI hiring tool trained on 10 years of resume data. Because the tech industry had historically hired more men, the AI learned to penalize resumes containing the word 'women's' (as in 'women's chess club') and downgrade graduates of all-women's colleges. Amazon scrapped the tool, but the lesson stands: AI doesn't remove bias — it scales it.\n\nPractical breakdown: Ethical AI requires: (1) Diverse teams building the systems (different perspectives catch different biases). (2) Transparent algorithms that can be audited. (3) Human oversight for high-stakes decisions. (4) Clear accountability chains. (5) Regular bias audits throughout the AI lifecycle.", keyPoints: ["AI amplifies existing biases — it doesn't neutralize them", "Transparency and explainability are ethical requirements, not optional features", "The question 'Who is accountable?' must be answered before deployment, not after harm", "Diverse teams catch biases that homogeneous teams miss", "AI ethics is not a technical problem — it's a human values problem", "You don't need to be a developer to demand ethical AI — you need to ask the right questions"], practiceTask: "Choose an AI system you interact with (recommendation algorithm, hiring tool, content moderation). Research: What data was it trained on? What biases have been documented? Who is accountable for its decisions? Write a brief ethical audit and propose improvements.", reflectionQuestion: "If an AI makes a biased decision that harms someone, who bears moral responsibility — the developer, the company, the user, or the AI itself?" },
                { id: "ae-2-2", title: "Business Ethics: Profit, Purpose & Stakeholders", duration: "50 min", content: "Milton Friedman argued that the only social responsibility of business is to increase profits. Stakeholder theory (R. Edward Freeman) counters that businesses have obligations to employees, customers, communities, and the environment — not just shareholders. This isn't abstract: it determines how companies treat workers, price products, impact environments, and distribute wealth.\n\nThe most interesting ethical questions in business aren't about fraud (that's clearly wrong) — they're about trade-offs between legitimate goods. How much should a company invest in sustainability vs. shareholder returns? When should you sacrifice short-term profit for long-term trust? How do you balance automation's efficiency against job displacement?\n\nReal-world example: Patagonia's founder Yvon Chouinard transferred ownership of the $3 billion company to a trust fighting climate change. 'Earth is now our only shareholder.' This was an extreme stakeholder approach. Meanwhile, fast fashion companies optimize ruthlessly for shareholder value, externalizing environmental and human costs. Both are legal. Only one is ethical by most frameworks.\n\nPractical breakdown: For any business decision, apply the stakeholder map: (1) List all affected stakeholders. (2) For each, identify what they need and what they stand to gain or lose. (3) Identify trade-offs — whose interests conflict? (4) Make the trade-off transparent and justify it ethically. (5) Ask: 'Would I be comfortable if this decision were public?'", keyPoints: ["Shareholder theory vs. stakeholder theory — the fundamental business ethics debate", "The hardest ethical decisions are between legitimate goods, not good vs. evil", "Externalities: costs imposed on people who didn't choose to bear them", "The 'newspaper test': Would you be comfortable if this decision were front-page news?", "Long-term trust often outperforms short-term profit maximization", "Ethical leadership means making trade-offs transparent, not pretending they don't exist"], practiceTask: "Choose a company you admire and one you critique. For each, map the stakeholders and analyze how the company balances their interests. Where do trade-offs occur? How are they justified? Then apply the same stakeholder analysis to a decision in your own work or life.", reflectionQuestion: "Is it possible to be both maximally profitable and maximally ethical? Where do you draw the line, and how do you justify it?" },
                { id: "ae-2-3", title: "Everyday Ethics: Small Decisions, Big Character", duration: "45 min", content: "Ethics isn't only about dramatic dilemmas — it's about the hundreds of small decisions you make daily. Do you tell the full truth or a convenient half-truth? Do you take credit for someone else's idea? Do you speak up when you witness unfairness, or stay silent because it's uncomfortable? Character is built in these moments, not in hypothetical trolley problems.\n\nAristotle argued that virtue is a habit — you become courageous by practicing courage, honest by practicing honesty. Each small ethical decision either strengthens or weakens your moral 'muscle.' The person who cuts small ethical corners eventually cuts large ones, not through malice but through habit erosion.\n\nReal-world example: A researcher noticed a small data error that, if uncorrected, would make her results look stronger. Correcting it would delay publication by months. She corrected it. Years later, when a major integrity scandal hit her field, her reputation was spotless — because she'd built the habit of honesty in small moments that nobody was watching.\n\nPractical breakdown: The daily ethics practice — (1) The 'mirror test': At the end of each day, can you look yourself in the mirror and respect the person you see? (2) The 'grandmother test': Would you be proud to explain this decision to someone whose respect matters deeply? (3) The 'precedent test': If everyone did what you're about to do, what world would that create?", keyPoints: ["Character is built through daily small decisions, not dramatic dilemmas", "Virtue is a habit — each ethical choice strengthens or weakens moral muscle", "The person who cuts small corners eventually cuts large ones", "Three daily tests: mirror, grandmother, precedent", "Ethical courage in small moments builds capacity for ethical courage in big ones", "Integrity means being the same person when no one is watching"], practiceTask: "For one week, practice the evening 'mirror test': review your day and identify every decision that had an ethical dimension — even tiny ones (Did I give full credit? Did I tell the whole truth? Did I speak up?). Score yourself honestly. Identify one area where you want to strengthen your ethical habit.", reflectionQuestion: "What small ethical compromise do you make most often? What would change if you stopped making it?" },
              ],
            },
            {
              id: "ae-3", title: "Decision Theory & Wise Action", description: "Make better decisions under uncertainty, complexity, and moral ambiguity.",
              lessons: [
                { id: "ae-3-1", title: "Decision-Making Under Uncertainty", duration: "50 min", content: "Most important decisions are made with incomplete information. Decision theory provides frameworks for choosing wisely when you can't know the outcome in advance. The key insight: a good decision isn't defined by its outcome — it's defined by the quality of the reasoning process given what was knowable at the time.\n\nAnnie Duke, former poker champion, teaches that decisions are bets. Every choice has a range of possible outcomes with different probabilities. Good decision-makers don't just pick the option with the best expected value — they also consider how wrong they can afford to be (risk management) and what information would change their mind (decision criteria).\n\nReal-world example: A surgeon must decide whether to operate on a patient with a 70% chance of full recovery but a 5% chance of death. The 'right' decision depends on frameworks: expected value (operate — 70% is good odds), minimax regret (what decision would you regret least?), and the patient's values (some patients would prefer a 5% death risk over a certain chronic condition; others wouldn't).\n\nPractical breakdown: The decision quality framework — (1) Frame the decision correctly (are you solving the right problem?). (2) Generate creative alternatives (don't settle for the obvious two). (3) Gather meaningful information (what would change your mind?). (4) Clarify values (what matters most in this decision?). (5) Apply sound reasoning. (6) Commit to action.", keyPoints: ["A good decision is defined by process, not outcome — lucky outcomes can follow bad decisions", "Decisions are bets: consider probability, expected value, and downside risk", "Minimax regret: choose the option you'd regret least if things go wrong", "Generate alternatives before evaluating — don't settle for binary choices", "Pre-commit to decision criteria before seeing results", "Reversible decisions deserve speed; irreversible decisions deserve deliberation"], practiceTask: "For a decision you're currently facing, apply the full framework: (1) Write the decision as clearly as possible. (2) Generate at least 5 alternatives (not just 2). (3) For each, estimate probability of success and worst-case scenario. (4) Clarify your values — what matters most? (5) Choose, and document your reasoning so you can review it later.", reflectionQuestion: "Think of a decision that turned out badly. Was it a bad decision or a good decision with an unlucky outcome? How can you tell the difference?" },
                { id: "ae-3-2", title: "Ethical Decision-Making Frameworks", duration: "50 min", content: "When ethical dilemmas have no clear right answer, structured frameworks prevent paralysis and reduce bias. The most practical frameworks combine multiple ethical lenses with systematic analysis.\n\nThe Potter Box (Ralph Potter, Harvard) provides a four-step process: (1) Define the facts — what actually happened? (2) Identify the values in conflict — what competing goods are at stake? (3) Apply ethical principles — what do the major frameworks say? (4) Choose your loyalties — to whom do you owe the greatest obligation?\n\nReal-world example: A journalist discovers that a politician they personally admire has committed financial fraud. Potter Box analysis: Facts (clear evidence of fraud), Values (truth vs. loyalty, public interest vs. personal relationship), Principles (utilitarianism says publish — public benefit outweighs private harm; care ethics says consider the impact on the politician's family), Loyalties (the journalist's primary loyalty is to the public). The framework doesn't make the decision easy, but it makes it principled.\n\nPractical breakdown: A simpler daily framework — PLUS: (1) Policies — Does this decision violate any laws, rules, or policies? (2) Legal — Is it legal? (3) Universal — Would I want everyone to make this choice? (4) Self — Does this align with who I want to be? If any answer is 'no,' reconsider.", keyPoints: ["The Potter Box: facts, values, principles, loyalties — a systematic ethical decision process", "PLUS framework for daily decisions: Policies, Legal, Universal, Self", "Ethical frameworks don't eliminate difficulty — they ensure principled reasoning", "Most ethical failures come from not thinking systematically, not from bad character", "Document your ethical reasoning — it clarifies thinking and creates accountability", "When in doubt, choose the option that requires the most courage — it's usually right"], practiceTask: "Apply the Potter Box to an ethical dilemma you've recently faced (or one from the news). Work through all four steps. Then identify an upcoming decision and apply the PLUS framework proactively. Compare the two approaches — which felt more useful?", reflectionQuestion: "Do you tend to make ethical decisions based on intuition or structured reasoning? What are the strengths and risks of each approach?" },
                { id: "ae-3-3", title: "Living with Moral Complexity", duration: "45 min", content: "The highest ethical skill isn't finding the right answer — it's living with integrity when there is no right answer. Moral complexity is the norm, not the exception. Most real ethical situations involve trade-offs between legitimate goods, uncertain outcomes, and competing obligations.\n\nThe danger of ethical absolutism is rigidity — applying rules without sensitivity to context. The danger of ethical relativism is paralysis — if everything is relative, nothing matters. The middle path is 'principled pragmatism' — holding strong values while acknowledging that applying them requires judgment, humility, and sometimes compromise.\n\nReal-world example: A nonprofit leader faces a dilemma: accept a large donation from a corporation with questionable labor practices, or reject it and lay off staff who depend on the nonprofit for their livelihood. There is no clean answer. Principled pragmatism means: acknowledge the tension openly, make the best decision you can with available information, explain your reasoning transparently, and remain open to revising your approach as you learn more.\n\nPractical breakdown: Living with moral complexity requires: (1) Tolerance of ambiguity — resist the urge to oversimplify. (2) Moral imagination — consider possibilities beyond the obvious options. (3) Ethical courage — act on your best judgment even when certainty is impossible. (4) Moral humility — hold your conclusions open to revision. (5) Moral repair — when you cause harm despite good intentions, take responsibility and make amends.", keyPoints: ["Most real ethical situations have no clean right answer — complexity is normal", "Absolutism is rigid; relativism is paralyzed; principled pragmatism is the middle path", "Moral imagination: seeing beyond the obvious options to creative alternatives", "Ethical courage means acting on your best judgment under uncertainty", "Moral repair: when you cause harm, own it and fix it — don't defend it", "The goal isn't moral perfection — it's moral growth through honest engagement"], practiceTask: "Reflect on a decision where you compromised one value to honor another. Write about: What values were in tension? Why did you choose as you did? Do you still agree with your reasoning? What would you do differently? Share your reflection with someone whose moral judgment you respect.", reflectionQuestion: "Is moral certainty a sign of wisdom or a sign of oversimplification? How do you maintain strong values while acknowledging genuine moral complexity?" },
              ],
            },
          ],
        },
      },
      // ── Third mentor: Clarity ──
      {
        id: "clarity",
        name: "Clarity",
        title: "Applied Philosophy & Meaning Mentor",
        tagline: "Philosophy isn't abstract — it's how you live",
        personality: "Warm, existential, practically grounded. Clarity brings ancient and modern philosophy into daily life — helping you build a personal philosophy that guides real decisions.",
        avatar: "💎",
        initials: "CL",
        envTheme: { bg: "#0e0a18", accent: "#c084fc", mood: "existential" },
        voiceConfig: { pitch: 1.05, rate: 0.88, voiceHint: "female" },
        specialties: ["Existentialism", "Stoicism", "Eastern Philosophy", "Meaning-Making", "Personal Philosophy"],
        greeting: "Welcome. I'm Clarity, your applied philosophy mentor. Philosophy isn't about memorizing dead thinkers — it's about answering the questions that keep you up at night. What makes a good life? How do you find meaning in uncertainty? What should you sacrifice, and for what? I'll help you build a personal philosophy that actually guides your life.",
        encouragement: [
          "That philosophical reflection shows real depth of self-examination!",
          "You're integrating ideas from multiple traditions — that's wisdom, not just knowledge.",
          "Your personal philosophy is becoming more coherent and actionable.",
        ],
        course: {
          id: "clarity-meaning",
          title: "Building a Personal Philosophy",
          overview: "Explore Stoicism, Existentialism, Eastern philosophy, and modern meaning-making frameworks. Build a practical personal philosophy that guides decisions, sustains you through difficulty, and helps you live with purpose.",
          totalDuration: "28 hours",
          learningDuration: "5–6 weeks",
          difficulty: "Beginner" as const,
          modules: [
            {
              id: "pp-1", title: "Western Philosophical Traditions", description: "Timeless wisdom for modern living.",
              lessons: [
                { id: "pp-1-1", title: "Stoicism: The Art of Inner Freedom", duration: "55 min", content: "Stoicism, founded by Zeno of Citium and refined by Marcus Aurelius, Seneca, and Epictetus, offers a radical idea: you cannot control what happens to you, but you can always control how you respond. The dichotomy of control — distinguishing what's 'up to you' from what's 'not up to you' — is the foundation.\n\nThis isn't passive acceptance. It's strategic focus. By directing energy only toward what you can influence, you become more effective, less anxious, and more resilient. Modern CBT therapy is essentially applied Stoicism.\n\nReal-world example: When James Stockdale was shot down over Vietnam and imprisoned for seven years, he survived by applying Stoic philosophy. He later said the optimists died first — they kept expecting rescue by Christmas, and when it didn't come, they broke. Stockdale held the 'Stockdale Paradox': confront the brutal facts of your current reality AND maintain faith that you will prevail in the end.\n\nPractical breakdown: Four daily Stoic practices — (1) Morning meditation: 'What challenges might I face? How will I respond with virtue?' (2) Dichotomy of control: 'Is this in my control? If yes, act. If no, release.' (3) Negative visualization: briefly imagine losing what you value to deepen gratitude. (4) Evening review: 'What went well? Where did I fall short? What will I improve?'", keyPoints: ["The dichotomy of control: focus only on what you can influence", "Negative visualization: imagining loss deepens gratitude", "Amor fati: loving your fate transforms suffering into fuel", "The evening review: daily self-examination builds character", "The Stockdale Paradox: brutal honesty AND unwavering faith simultaneously", "Stoicism is not suppression — it's choosing your response deliberately"], practiceTask: "Practice the Stoic daily cycle for one week: morning preparation (5 min), dichotomy of control throughout the day, negative visualization (5 min), evening review (10 min journaling). Track how your stress levels and emotional responses shift.", reflectionQuestion: "Is there a difference between Stoic acceptance and passive resignation? How do you practice one without falling into the other?" },
                { id: "pp-1-2", title: "Existentialism: Freedom, Responsibility & Meaning", duration: "55 min", content: "Existentialism begins with a disorienting truth: there is no pre-given meaning to life. Sartre said 'existence precedes essence' — you exist first, then define yourself through choices. This sounds terrifying, but it's actually liberating: if meaning isn't given, you're free to create it.\n\nKierkegaard emphasized the 'leap of faith' — committing to something without certainty. Camus explored the absurd — continuing to live fully despite meaninglessness. Viktor Frankl, surviving Auschwitz, concluded that meaning comes from three sources: creative work, love relationships, and dignified suffering.\n\nReal-world example: A tech executive in her 40s had achieved everything society told her would bring meaning — wealth, status, a prestigious title. Yet she felt profoundly empty. Through existential therapy, she realized she'd been living by inherited definitions of success. Her 'existential audit' revealed that her deepest values — creative expression, deep relationships, and contribution to something larger — were completely unrepresented in her daily life. She restructured everything.\n\nPractical breakdown: Existential living requires three practices — (1) Radical honesty: asking 'Am I living by my own values or borrowed ones?' (2) Authentic choice: making decisions from your deepest convictions, not social pressure. (3) Meaning-creation: actively building meaning through work, relationships, and courageous engagement with suffering.", keyPoints: ["Existence precedes essence: you define yourself through choices", "Radical freedom implies radical responsibility", "Frankl: meaning comes from creation, connection, and courageous suffering", "Authenticity means living by your own values, not borrowed ones", "Bad faith: pretending you have no choice when you do", "The anxiety of freedom is the price of genuine autonomy"], practiceTask: "Write a 'personal existential audit.' Where are you living authentically (by your own values) vs. inauthentically (by borrowed expectations)? Identify one area of inauthenticity and make a more authentic choice this week. Journal about what shifts.", reflectionQuestion: "If you accept that life has no inherent meaning, does that make meaning-creation more or less valuable?" },
                { id: "pp-1-3", title: "Pragmatism & The Philosophy of Action", duration: "50 min", content: "American Pragmatism, developed by William James, John Dewey, and Charles Peirce, offers a radically different approach: truth is what works. Ideas aren't judged by abstract correctness but by their practical consequences. A belief is 'true' to the extent that it helps you navigate reality effectively.\n\nThis isn't relativism — pragmatism has standards. An idea must be tested in experience, survive scrutiny, and produce results that withstand ongoing evaluation. The pragmatist asks: 'If I adopt this belief, what difference does it make in my life? Does it help me act more effectively, live more fully, solve more problems?'\n\nReal-world example: A philosophy professor struggled with depression despite understanding every theory of happiness intellectually. Pragmatism shifted his approach: instead of asking 'What is the true theory of wellbeing?' he asked 'What practices actually make me feel better and function better?' He discovered that morning exercise, afternoon walks, and weekly deep conversations were his pragmatic truth — not because they were theoretically correct, but because they worked.\n\nPractical breakdown: Pragmatist thinking in daily life — (1) For any belief or idea, ask 'What difference does this make in practice?' If the answer is 'none,' the belief is empty. (2) Test ideas through action, not just thought. (3) Evaluate by consequences: Does this idea make me more effective, compassionate, and alive? (4) Hold ideas lightly — be willing to discard what stops working.", keyPoints: ["Pragmatism: truth is what works — ideas are judged by practical consequences", "Test beliefs through action and experience, not just logic", "Not relativism: ideas must survive scrutiny and produce real results", "William James: 'The ultimate test of what a truth means is the conduct it inspires'", "Pragmatism bridges philosophy and action — it makes philosophy useful", "Hold ideas lightly: discard what stops working, keep what serves life"], practiceTask: "Identify three beliefs or philosophies you hold. For each, answer: 'What practical difference does this belief make in my daily life?' If the answer is 'none,' either find a way to live it or question whether you actually hold it. Choose one belief and design a one-week experiment to test it through action.", reflectionQuestion: "Is there a belief you hold strongly that makes no practical difference in how you live? What does that reveal about the gap between your philosophy and your life?" },
              ],
            },
            {
              id: "pp-2", title: "Eastern Wisdom", description: "Contemplative traditions and the practice of presence.",
              lessons: [
                { id: "pp-2-1", title: "Buddhism: The Path to Reduced Suffering", duration: "55 min", content: "Buddhism's core insight is startlingly simple: suffering arises from attachment and craving. Not all pain is suffering — pain is inevitable, but suffering (the mental anguish we add to pain) is optional. The Four Noble Truths lay out the diagnosis and cure: (1) Life contains suffering. (2) Suffering arises from attachment. (3) Suffering can end. (4) The Eightfold Path is the way.\n\nThe Eightfold Path isn't a set of commandments — it's a training program: right understanding, intention, speech, action, livelihood, effort, mindfulness, and concentration. 'Right' doesn't mean morally correct — it means 'skillful' or 'effective.'\n\nReal-world example: A startup founder was devastated when her company failed. A Buddhist teacher didn't tell her to 'think positive.' Instead, she was taught to separate the event (company closed) from the story (I'm a failure, I wasted years, I'll never succeed). The event was painful but factual. The story was suffering — layers of judgment, comparison, and catastrophizing she'd added. Learning to notice the story as a story, rather than reality, dramatically reduced her anguish.\n\nPractical breakdown: Three accessible Buddhist practices — (1) Mindfulness meditation: 10 minutes of non-judgmental awareness of breath and thoughts. (2) Noting: silently labeling thoughts as 'thinking,' emotions as 'feeling,' sensations as 'sensing' — this creates distance from automatic reactions. (3) Impermanence reflection: 'This too shall pass' — applied to both suffering and pleasure, it cultivates equanimity.", keyPoints: ["Suffering = pain + resistance — pain is inevitable, suffering is optional", "The Four Noble Truths: suffering exists, has a cause, can end, and has a path", "Attachment doesn't mean caring — it means clinging to outcomes", "Mindfulness is non-judgmental awareness, not emptying your mind", "Impermanence is the foundation: everything changes, including your suffering", "Buddhism is a practice, not a belief system — it's meant to be tested"], practiceTask: "Practice 10 minutes of mindfulness meditation daily for one week. Also practice 'noting' throughout the day — when you notice a thought, silently label it 'thinking'; when you notice an emotion, label it 'feeling.' Journal about how this distance changes your relationship with your inner experience.", reflectionQuestion: "What are you most attached to — an outcome, an identity, a relationship? What would it mean to care deeply about it without clinging to it?" },
                { id: "pp-2-2", title: "Taoism: The Way of Effortless Action", duration: "50 min", content: "Taoism, rooted in the Tao Te Ching by Lao Tzu and the writings of Zhuangzi, offers a counterintuitive approach to life: the most effective action is often non-action (wu wei). This doesn't mean passivity — it means aligning with the natural flow of things rather than forcing outcomes through sheer will.\n\nThe Tao (the Way) is the underlying order of the universe. It can't be named or grasped — only experienced. Water is the Taoist's favorite metaphor: it's the softest substance, yet it erodes the hardest rock. It doesn't struggle against obstacles — it flows around them. It always seeks the lowest point, yet it sustains all life.\n\nReal-world example: A martial arts master demonstrates wu wei when she redirects an attacker's force rather than opposing it head-on. In business, a CEO practiced wu wei by stopping his attempts to micromanage his team. Instead of pushing harder when results stalled, he created conditions for the team to find their own solutions — clearer goals, fewer meetings, more autonomy. Results improved dramatically when he stopped forcing.\n\nPractical breakdown: Taoist practices for daily life — (1) Notice where you're forcing: What area of life involves constant struggle? Could you find a path of less resistance? (2) Yield to win: In conflicts, try listening and yielding before pushing. (3) Simplify: The Tao Te Ching says 'In pursuit of learning, every day something is acquired. In pursuit of Tao, every day something is dropped.' What can you let go of? (4) Nature time: Spend time in nature without agenda — observe how natural systems work without effort.", keyPoints: ["Wu wei: effortless action by aligning with natural flow, not passive inaction", "Water as metaphor: soft overcomes hard, yielding overcomes forcing", "The Tao that can be named is not the eternal Tao — some things must be experienced", "Simplification is wisdom: drop what's unnecessary", "Forcing often produces the opposite of the intended result", "Balance yin (receptive) and yang (active) — life requires both"], practiceTask: "Identify one area of your life where you're forcing outcomes. For one week, experiment with wu wei: instead of pushing harder, create conditions for the outcome to emerge naturally. Observe what changes. Also spend 30 minutes in nature with no phone and no agenda — just observe.", reflectionQuestion: "Where in your life are you like water — flowing around obstacles — and where are you like a battering ram? What would happen if you tried the opposite approach?" },
                { id: "pp-2-3", title: "Integrating Eastern & Western Wisdom", duration: "50 min", content: "The most powerful personal philosophy draws from both Eastern and Western traditions. Western philosophy emphasizes analysis, action, and individual agency. Eastern philosophy emphasizes awareness, acceptance, and interconnection. You don't have to choose — the deepest wisdom integrates both.\n\nKen Wilber's Integral Theory attempts this synthesis: include and transcend. Take the Western emphasis on rational analysis and individual rights. Add the Eastern emphasis on contemplative awareness and interconnection. Neither is complete alone — together, they approach a fuller picture of human experience.\n\nReal-world example: Jon Kabat-Zinn brought Buddhist mindfulness into Western medicine, creating Mindfulness-Based Stress Reduction (MBSR). By combining Eastern contemplative practice with Western scientific rigor, he demonstrated measurable health benefits — reduced chronic pain, lower anxiety, improved immune function. Neither tradition alone would have achieved this.\n\nPractical breakdown: Building an integrated practice — (1) From the West: rational analysis, goal-setting, ethical reasoning, deliberate practice. (2) From the East: mindfulness, non-attachment, acceptance, compassion. (3) Integration: Use analytical thinking to set direction, contemplative practice to maintain presence, and ethical reasoning to navigate complexity. Morning meditation (East) followed by strategic planning (West) is a powerful daily ritual.", keyPoints: ["Western: analysis, action, agency. Eastern: awareness, acceptance, interconnection", "Integration doesn't mean dilution — it means taking the best from each tradition", "Mindfulness + rational analysis = the most complete decision-making approach", "Non-attachment doesn't mean not caring — it means caring without clinging", "The examined life (Socrates) + the mindful life (Buddha) = the full life", "Your personal philosophy should draw from whatever traditions serve your growth"], practiceTask: "Design a daily practice that integrates both Western and Eastern elements. Example: 10 minutes of mindfulness meditation (East) + 10 minutes of journaling with Stoic evening review (West) + one act of deliberate compassion (integrated). Practice this for one week and evaluate: does the integration feel more complete than either tradition alone?", reflectionQuestion: "Which tradition — Eastern or Western — do you naturally lean toward? What would the other tradition add to your life that's currently missing?" },
              ],
            },
            {
              id: "pp-3", title: "Crafting Your Personal Philosophy", description: "Synthesize everything into a living document that guides your life.",
              lessons: [
                { id: "pp-3-1", title: "Values Excavation: What You Actually Believe", duration: "50 min", content: "Your personal philosophy begins with understanding what you actually value — not what you think you should value or what society tells you to value. There's often a significant gap between stated values ('I value creativity') and lived values (spending 10 hours a day on routine work with no creative output).\n\nThe most honest way to discover your values is to examine your behavior, not your beliefs. How you spend your time, energy, and money reveals your actual priorities. The discomfort of this exercise is where the growth happens.\n\nReal-world example: A consultant who claimed to value 'family above everything' tracked his time for two weeks and discovered he spent 70 hours per week on work, 8 hours with his family, and 6 hours on social media. His stated values and lived values were completely misaligned. Rather than feeling guilty, he used this data to redesign his schedule — because you can't change what you won't acknowledge.\n\nPractical breakdown: The values excavation process — (1) List your top 10 stated values. (2) Track your time and energy for one week — where do they actually go? (3) Compare: where do stated and lived values align? Where do they diverge? (4) For each divergence, ask: Do I need to change my behavior to match my values, or update my values to match my actual priorities? Both are valid. Dishonesty about the gap is the only wrong answer.", keyPoints: ["Stated values vs. lived values: your behavior reveals your true priorities", "Time and money allocation is the most honest mirror of your values", "The gap between stated and lived values is where growth begins", "Sometimes you need to change behavior; sometimes you need to update values", "Values excavation requires radical honesty — not self-improvement theater", "Revisit this exercise annually — values evolve as you grow"], practiceTask: "List your top 10 stated values. Then track how you spent your time, energy, and money over the past week. Compare: which stated values are reflected in your actual behavior? Which are aspirational only? For each gap, write an honest analysis: is the behavior wrong, or is the stated value not actually yours?", reflectionQuestion: "What would someone conclude your values are by watching your behavior for a month — with no access to what you say you believe?" },
                { id: "pp-3-2", title: "Principles: Your Decision-Making Operating System", duration: "50 min", content: "Principles are the bridge between values and action. While values tell you what matters, principles tell you what to do when values conflict or situations are ambiguous. A principle is a rule that guides behavior: 'When in doubt, choose the braver option.' 'Always tell the truth, even when it's costly.' 'Seek to understand before being understood.'\n\nRay Dalio's 'Principles' demonstrated the power of codifying your decision-making rules. When principles are explicit, you can apply them consistently, share them with others, and refine them over time. When they're implicit, they're inconsistent and invisible.\n\nReal-world example: A designer codified five professional principles: (1) Clarity over cleverness. (2) User need over client preference. (3) Data-informed, not data-driven. (4) Ship imperfect over theorize perfect. (5) Credit the team, own the failure. These principles made hundreds of daily decisions easier because she didn't have to reason from scratch each time — the principles provided a consistent framework.\n\nPractical breakdown: Writing effective principles — (1) Start with situations where you've struggled to decide. What rule would have made the decision clearer? (2) Keep principles actionable: 'Be courageous' is a value; 'When afraid, take the smallest brave action' is a principle. (3) Limit to 7-10 core principles — too many become unmanageable. (4) Test them: live by your principles for a month and revise any that don't hold up under real conditions.", keyPoints: ["Principles bridge values and action — they tell you what to do in ambiguity", "Explicit principles create consistency; implicit principles create confusion", "Good principles are actionable and specific, not abstract platitudes", "7-10 core principles is the sweet spot — enough to cover most situations", "Principles should be tested, not just written — revise what doesn't hold up", "Sharing principles with others creates accountability and trust"], practiceTask: "Write 7-10 personal principles that would guide your decisions in ambiguous situations. For each: (1) State the principle clearly. (2) Give an example of when you'd apply it. (3) Explain why this principle matters to you. Live by them for two weeks, then revise any that don't hold up in practice.", reflectionQuestion: "What principle, if you fully committed to it, would most transform how you live and work? What's stopping you from committing?" },
                { id: "pp-3-3", title: "Living Philosophy: Making Wisdom Practical", duration: "50 min", content: "Philosophy that doesn't change how you live is entertainment, not wisdom. The final step in building a personal philosophy is integration — embedding your values, principles, and practices into daily routines so they become automatic, not effortful.\n\nPierre Hadot, the French philosopher, argued that ancient philosophy was never meant to be academic — it was a 'way of life.' Stoics had daily practices. Epicureans had community rituals. Buddhists had meditation. Philosophy was lived, not just thought. The modern separation of philosophy from practice is the problem.\n\nReal-world example: A portfolio manager created a 'philosophy of the day' practice. Each morning, she reads one principle from her personal philosophy document, reflects on how it applies to that day's challenges, and sets an intention. Each evening, she reviews: Did I live according to my philosophy today? Where did I fall short? Over two years, this practice transformed her from someone who had a philosophy to someone who lived one.\n\nPractical breakdown: Integration strategies — (1) Morning philosophy ritual: Read one principle and set an intention. (2) Decision checkpoint: Before any significant decision, consult your principles. (3) Evening review: Score yourself on how well you lived your philosophy today. (4) Monthly revision: Review and update your philosophy based on lived experience. (5) Community: Share your philosophy with someone who will hold you accountable. Your personal philosophy should be a living document — evolving as you grow, not a static artifact.", keyPoints: ["Philosophy that doesn't change behavior is entertainment, not wisdom", "Ancient philosophy was a way of life, not an academic discipline", "Integration requires daily practice — morning intention, evening review", "A personal philosophy is a living document, revised through experience", "Community and accountability turn private philosophy into public character", "The goal is to close the gap between who you aspire to be and who you actually are"], practiceTask: "Create your complete Personal Philosophy Document: your core values (5-7), your principles (7-10), and your daily practices (3-5). Then implement the integration cycle: morning intention, decision checkpoints, evening review. Run this system for two weeks. At the end, revise your philosophy based on what you learned.", reflectionQuestion: "Imagine reading your personal philosophy in 10 years. What would you want it to reveal about the person you are becoming? Does your current version point in that direction?" },
              ],
            },
          ],
        },
      },
    ],
  },

  // ════════════════════════════════════════════
  // 5. Systems Thinking
  // ════════════════════════════════════════════
  {
    id: "systems",
    slug: "systems",
    label: "Systems Thinking",
    tagline: "See the whole, not just the parts",
    description: "Learn to see and understand complex systems — from organizations to ecosystems. Master feedback loops, leverage points, and the mental models that reveal how the world really works.",
    icon: Network,
    color: "#0284c7",
    gradient: "from-sky-700 via-sky-500 to-blue-400",
    mentors: [
      {
        id: "meta",
        name: "Meta",
        title: "Complex Systems Mentor",
        isMaster: true,
        tagline: "Everything is connected to everything else",
        personality: "Holistic, patient, pattern-oriented. Meta sees connections where others see chaos and teaches you to map the invisible structures that shape outcomes.",
        avatar: "🔗",
        initials: "ME",
        envTheme: { bg: "#06101a", accent: "#0284c7", mood: "systemic" },
        voiceConfig: { pitch: 0.88, rate: 0.9, voiceHint: "male" },
        specialties: ["System Dynamics", "Feedback Loops", "Leverage Points", "Complexity Science", "Causal Mapping"],
        greeting: "Welcome. I'm Meta, your systems thinking mentor. Most problems we face — in business, health, climate, society — are symptoms of deeper systemic structures. I'll teach you to see those structures, understand their dynamics, and find the leverage points where small changes create big effects. Let's think in systems.",
        encouragement: [
          "Your causal loop diagram reveals deep structural understanding!",
          "Identifying that leverage point shows systems thinking mastery.",
          "You're moving beyond symptoms to root causes — that's the power of this skill.",
        ],
        course: {
          id: "meta-systems",
          title: "Systems Thinking & Complexity",
          overview: "Learn Donella Meadows' systems thinking framework, causal loop diagramming, system archetypes, and the art of finding leverage points in complex systems. This skill transforms how you see every problem.",
          totalDuration: "28 hours",
          learningDuration: "4–6 weeks",
          difficulty: "Intermediate",
          modules: [
            {
              id: "syt-1", title: "Foundations of Systems Thinking", description: "How to see and map complex systems.",
              lessons: [
                { id: "sys-1-1", title: "Feedback Loops & System Behavior", duration: "55 min", content: "Every system's behavior is driven by its feedback loops. Reinforcing loops amplify change (compound interest, viral growth, arms races). Balancing loops resist change and maintain equilibrium (thermostats, market competition, predator-prey dynamics). The interaction between these loops creates the complex behavior we observe.\n\nDonella Meadows identified that understanding feedback structure — not individual events — is the key to understanding why systems behave the way they do.\n\nReal-world example: Social media engagement works through a reinforcing loop: more content creates more engagement, which attracts more creators. But there's a hidden balancing loop: as content volume increases, quality decreases, reducing engagement. Platforms that ignore the balancing loop experience growth followed by decline.\n\nPractical breakdown: Identifying feedback loops — (1) Find a variable that's changing. (2) Trace what that change causes. (3) Follow the chain until it loops back. (4) Determine if it reinforces or opposes the original change. (5) Look for delays between cause and effect.", keyPoints: ["Reinforcing loops amplify change (growth or collapse)", "Balancing loops resist change (stability or stagnation)", "Delays in feedback loops cause oscillation and overshoot", "System behavior emerges from structure, not individual events", "Most persistent problems are maintained by hidden balancing loops", "Most runaway trends are driven by reinforcing loops with delayed consequences"], practiceTask: "Map a system you care about (team productivity, social media, traffic) as a causal loop diagram. Identify at least 2 reinforcing and 2 balancing loops. Predict what happens if you intervene at different points.", reflectionQuestion: "Why do good intentions often produce unintended consequences? How does systems thinking help prevent this?" },
                { id: "sys-1-2", title: "Causal Loop Diagrams: Mapping Invisible Structures", duration: "50 min", content: "A causal loop diagram (CLD) is the systems thinker's primary tool — a visual map of how variables influence each other. Unlike flowcharts (which show sequence), CLDs show causation and feedback. They reveal the invisible structures producing the behavior you observe.\n\nThe notation is simple: arrows show influence, '+' means same direction (A up, B up), '-' means opposite direction (A up, B down). A loop with an even number of '-' signs is reinforcing. Odd is balancing.\n\nReal-world example: A manager notices high employee turnover. A linear thinker blames hiring or compensation. A systems thinker maps: High turnover → increased workload → burnout → more turnover (reinforcing). Also: high turnover → management attention → improved conditions → reduced turnover (balancing). The reinforcing loop is faster than the balancing one — turnover accelerates before management can respond.\n\nPractical breakdown: Building a CLD — (1) Start with the core problem variable. (2) Ask 'What does this influence?' and 'What influences this?' (3) Draw arrows with +/- signs. (4) Look for loops. (5) Identify delays. (6) Validate: does the diagram explain observed behavior?", keyPoints: ["CLDs show causation and feedback, not sequence", "'+' means same direction; '-' means opposite direction", "Even '-' signs = reinforcing; odd = balancing", "Start with the core problem variable and trace outward", "Delays are crucial — mark them explicitly", "A good CLD explains observed behavior; if not, it's incomplete"], practiceTask: "Build a CLD for a problem you're experiencing (career, health, relationship pattern). Include at least 6 variables, 3 loops, and 2 delays. Does it explain the pattern? Share with someone for a fresh perspective.", reflectionQuestion: "What invisible structure in your life is producing a pattern you'd like to change?" },
                { id: "sys-1-3", title: "Delays, Nonlinearity & Emergence", duration: "50 min", content: "Three properties make complex systems genuinely difficult: delays (effects appear long after causes), nonlinearity (small changes can have huge effects at tipping points), and emergence (the whole has properties none of the parts have — consciousness from neurons, traffic jams from individual drivers).\n\nThese properties explain why our intuitions about complex systems are systematically wrong. We expect proportional responses (linear thinking), immediate effects (ignoring delays), and properties to reside in parts rather than wholes (reductionism).\n\nReal-world example: Climate change illustrates all three. Delays: CO2 emitted today affects temperatures decades later. Nonlinearity: warming is gradual until tipping points (permafrost melting, ice sheet collapse) create sudden, irreversible shifts. Emergence: no single emission source causes climate change — it emerges from billions of individual actions interacting with planetary systems.\n\nPractical breakdown: Working with these properties — (1) Delays: always ask 'What's the lag?' Build patience and early indicators. (2) Nonlinearity: look for tipping points — where does a small push create a big shift? (3) Emergence: study interaction rules between parts, not just the parts. A flock's behavior emerges from 3 simple rules each bird follows.", keyPoints: ["Delays: effects appear long after causes — patience and early indicators essential", "Nonlinearity: small changes can tip systems into different states", "Emergence: system properties that none of the parts possess individually", "Linear thinking fails in complex systems", "Tipping points are leverage opportunities — find them before they tip negatively", "Study interaction rules, not just individual components"], practiceTask: "Identify a system where delays have caused problems. Map the delay structure. Where are decisions based on outdated information? Design an early-warning indicator system.", reflectionQuestion: "Where are you experiencing consequences of decisions made long ago? Where are you making decisions whose consequences won't appear for years?" },
              ],
            },
            {
              id: "syt-2", title: "System Archetypes & Patterns", description: "Recurring system structures that appear across every domain.",
              lessons: [
                { id: "sys-2-1", title: "The 10 System Archetypes", duration: "55 min", content: "Just as music has recurring chord progressions, systems have recurring structural patterns — archetypes. Peter Senge identified approximately 10 that appear everywhere. Recognizing them reveals the known intervention.\n\nKey archetypes: (1) Fixes That Fail: quick fix addresses symptoms but worsens the underlying problem. (2) Shifting the Burden: dependence on external solutions atrophies internal capacity. (3) Limits to Growth: success creates side effects that limit further growth. (4) Tragedy of the Commons: individuals rationally exploiting a shared resource until destroyed. (5) Success to the Successful: initial advantages compound into winner-take-all dynamics.\n\nReal-world example: 'Fixes That Fail' in healthcare: chronic back pain → painkillers (fix) → opioid dependency (side effect) → more health problems → more intervention. The fix created a reinforcing loop of dependence. The systemic solution addresses root causes (posture, stress, exercise).\n\nPractical breakdown: (1) When facing a persistent problem, ask 'Which archetype is this?' (2) Each has a known intervention. (3) Fixes That Fail: address root causes. (4) Shifting the Burden: invest in internal capacity. (5) Limits to Growth: address side effects early. (6) Tragedy of the Commons: create governance for shared resources.", keyPoints: ["~10 system archetypes recur across all domains", "Fixes That Fail: quick fixes worsen underlying problems", "Shifting the Burden: external solutions atrophy internal capacity", "Limits to Growth: success creates limiting side effects", "Tragedy of the Commons: rational individual behavior destroys shared resources", "Recognizing the archetype reveals the known intervention"], practiceTask: "Identify 3 archetypes in your life or organization. For each: name it, map the structure, identify the dynamic, propose the systemic intervention.", reflectionQuestion: "Which archetype appears most frequently in your life? What does that reveal about your default approach?" },
                { id: "sys-2-2", title: "Growth, Limits & Collapse Dynamics", duration: "50 min", content: "The most consequential system dynamic is growth meeting limits. Every growth process encounters constraints. How the system responds determines whether it adapts, stabilizes, or collapses.\n\nThree trajectories: (1) S-curve: growth slows and stabilizes at a sustainable level. (2) Overshoot and oscillation: growth overshoots, collapses, recovers, oscillates (boom-bust). (3) Overshoot and collapse: growth exceeds carrying capacity permanently.\n\nReal-world example: The dot-com bubble followed overshoot-oscillation. The internet represented genuine value (growth), but speculation drove valuations beyond sustainable levels (overshoot). The crash corrected it, and the internet grew to sustainable scale. The key: the underlying resource (internet utility) wasn't permanently damaged.\n\nPractical breakdown: Managing growth-limits dynamics — (1) Identify limits early. (2) Distinguish hard limits (physics, resources) from soft limits (skills, culture). (3) Invest in limit-removal before hitting the limit. (4) Build feedback mechanisms that detect approaching limits. (5) Plan for multiple growth phases with different limits.", keyPoints: ["Every growth process encounters limits — the question is when and how", "S-curve, overshoot-oscillation, and overshoot-collapse are the three trajectories", "Hard limits vs. soft limits require different responses", "Investing in limit removal before hitting limits prevents crises", "Boom-bust results from delays between growth and limit recognition", "Sustainable growth requires continuously addressing the next constraint"], practiceTask: "Analyze a growth trajectory you're part of. Where are the limits? Hard or soft? What trajectory are you on? Design early-warning systems and strategies for each limit.", reflectionQuestion: "What's the carrying capacity of your current life structure? Where are you approaching limits you haven't acknowledged?" },
                { id: "sys-2-3", title: "Mental Models vs. System Reality", duration: "50 min", content: "The most important systems insight: the map is not the territory. Our mental models are always simpler than actual systems. This gap is where most failures originate — we intervene based on our model, not reality.\n\nChris Argyris distinguished 'espoused theory' (what people say they believe) from 'theory-in-use' (the mental models that actually drive behavior). A manager who says 'I value innovation' but punishes every failure has a theory-in-use that suppresses innovation.\n\nReal-world example: Education operated on the mental model 'more instruction = more learning.' This ignores feedback loops: excessive instruction without practice leads to cognitive overload, reducing retention, prompting even more instruction. Schools that redesigned around the actual learning system (cycles of instruction, practice, feedback, reflection) dramatically improved outcomes.\n\nPractical breakdown: Surfacing mental models — (1) Articulate yours explicitly: 'I believe X causes Y because Z.' (2) Look for disconfirming evidence. (3) Map the actual system as a CLD and compare to your model. (4) Identify missing variables and connections. (5) Update and test. This is the learning loop that drives mastery.", keyPoints: ["The map is not the territory — mental models are always simpler than reality", "Espoused theory vs. theory-in-use: what you say vs. what drives behavior", "Most failures come from acting on inaccurate mental models", "Surfacing models explicitly is the first step to improving them", "Compare your mental model to a CLD to find gaps", "The learning loop: articulate → test → update → repeat"], practiceTask: "Choose a system you're trying to influence. Write your mental model explicitly. Map the actual system as a CLD. Where do they differ? What are you missing? Update your model and design an intervention based on the update.", reflectionQuestion: "What mental model have you held for years that turned out wrong? What did updating it teach you?" },
              ],
            },
            {
              id: "syt-3", title: "Leverage Points & Systemic Change", description: "Finding places where small changes create massive effects.",
              lessons: [
                { id: "sys-3-1", title: "Donella Meadows' 12 Leverage Points", duration: "55 min", content: "Donella Meadows' hierarchy ranks 12 places to intervene in a system from least to most effective. Understanding this prevents wasting effort on low-leverage interventions.\n\nFrom least to most effective: (12) Parameters. (11) Buffer sizes. (10) Stock-flow structures. (9) Delays. (8) Balancing loops. (7) Reinforcing loops. (6) Information flows. (5) Rules. (4) Self-organization. (3) Goals. (2) Paradigms. (1) Power to transcend paradigms.\n\nReal-world example: Reducing traffic congestion. Low-leverage: adjusting speed limits (#12), widening roads (#10) — induced demand fills new capacity. High-leverage: real-time congestion pricing (#6 information flows). Even higher: changing the goal from 'move more cars' to 'move more people' (#3) — opening transit, remote work, and urban design solutions.\n\nPractical breakdown: (1) Map the system structure. (2) Identify where you're currently intervening — what level? (3) Ask 'Can I intervene higher?' (4) The most powerful interventions change paradigms and goals, not parameters. (5) Counterintuitively, people push on the lowest-leverage points because they're most visible.", keyPoints: ["Meadows' 12 leverage points rank from least to most effective", "Low leverage: parameters, buffers. High leverage: goals, paradigms", "Most people intervene at low-leverage points because they're visible", "Information flows (#6) are often the most accessible high-leverage point", "Changing the system's goal (#3) transforms everything downstream", "Transcending paradigms (#1) is the ultimate leverage"], practiceTask: "Choose a persistent problem. Map where current interventions fall on Meadows' hierarchy. Identify the highest-leverage intervention you could realistically implement. Design it based on system structure.", reflectionQuestion: "What paradigm — an unquestioned assumption — would create the most change in your life if you transcended it?" },
                { id: "sys-3-2", title: "Systemic Change in Organizations", duration: "50 min", content: "Organizations resist change not because people are resistant but because system structure — incentives, information flows, power dynamics, cultural norms — maintains the current state. To change an organization, change its structures.\n\nPeter Senge's five disciplines: personal mastery, mental models, shared vision, team learning, and systems thinking (the integrating discipline). Organizations that learn faster than their environment changes survive.\n\nReal-world example: Toyota's production system succeeded through structural innovations — continuous improvement (kaizen), pull-based production, worker empowerment to stop the line, and root-cause analysis (5 Whys). These changed feedback loops, information flows, and decision rules — high-leverage points.\n\nPractical breakdown: (1) Map current system: feedback loops, incentives, information flows, power. (2) Identify structures maintaining dysfunctional behavior. (3) Design structural interventions: change incentives, information access, decision rules. (4) Pilot in one team. (5) Build reinforcing loops: design change so success breeds more success. (6) Be patient: structural change takes time.", keyPoints: ["Organizations resist change because of structural inertia, not personal resistance", "Change the structure (incentives, information, rules) not just the people", "Senge's five disciplines with systems thinking as integrator", "Toyota's success came from systemic structural innovations", "Pilot changes in small units before scaling", "Build reinforcing loops so success breeds more change"], practiceTask: "Map your organization as a system: key feedback loops, incentive structures, information flows, cultural norms. Find one structural change more effective than any policy or speech. Design a pilot.", reflectionQuestion: "What structure in your organization most powerfully maintains behavior you'd like to change?" },
                { id: "sys-3-3", title: "Systems Thinking for Wicked Problems", duration: "55 min", content: "Wicked problems — climate change, inequality, healthcare — resist solution because they are systemically complex: multiple interacting causes, diverse stakeholders with conflicting values, no stopping rule, and every intervention creates new problems. You cannot 'solve' a wicked problem — only continuously navigate it.\n\nCharacteristics (Rittel & Webber): (1) No definitive formulation. (2) No stopping rule. (3) Solutions are better/worse, not true/false. (4) Every intervention has unintended consequences. (5) Every wicked problem is unique. (6) Every wicked problem is a symptom of another problem.\n\nReal-world example: Homelessness is simultaneously a housing, mental health, substance abuse, economic, and policy problem. 'Solving' housing without addressing mental health produces shelters that can't serve residents. Addressing mental health without housing produces treated people with nowhere to live. Only multi-dimensional, adaptive approaches make progress.\n\nPractical breakdown: Navigating wicked problems — (1) Map from multiple stakeholder perspectives. (2) Identify archetypes at play. (3) Find leverage points addressing multiple dimensions. (4) Design adaptive interventions that learn and adjust. (5) Build diverse coalitions. (6) Accept 'progress, not perfection' as the standard.", keyPoints: ["Wicked problems cannot be solved — only continuously navigated", "Different stakeholders define the same problem differently — all partially right", "Every intervention creates unintended consequences — design for adaptation", "Multi-dimensional approaches outperform single-dimension solutions", "Diverse coalitions essential — no single actor can address wicked problems", "Progress, not perfection, is the appropriate standard"], practiceTask: "Choose a wicked problem you care about. Map it from 3 stakeholder perspectives. Identify archetypes at play. Find 2 leverage points addressing multiple dimensions. Design an adaptive intervention.", reflectionQuestion: "What wicked problem do you feel called to work on? What role can your unique skills play?" },
              ],
            },
          ],
        },
      },
      // ── Second mentor: Weave ──
      {
        id: "weave",
        name: "Weave",
        title: "Systems Design Mentor",
        tagline: "Design systems that heal, not just function",
        personality: "Integrative, empathetic, design-oriented. Weave brings a human-centered lens to systems thinking, focusing on how to design interventions that create positive systemic change in organizations and communities.",
        avatar: "🕸️",
        initials: "WV",
        envTheme: { bg: "#080e16", accent: "#0ea5e9", mood: "integrative" },
        voiceConfig: { pitch: 1.08, rate: 0.92, voiceHint: "female" },
        specialties: ["Systems Design", "Organizational Change", "Stakeholder Mapping", "Intervention Design", "Resilience"],
        greeting: "Hello! I'm Weave, your systems design mentor. While Meta teaches you to see systems, I'll teach you to redesign them. How do you intervene in a dysfunctional organization? How do you design policies that don't backfire? How do you build resilient communities? Let's learn to weave better systems together.",
        encouragement: [
          "That stakeholder map shows real empathy for all the actors involved!",
          "Your intervention design considers second-order effects — that's rare wisdom.",
          "You're thinking about resilience, not just efficiency — the world needs more of that.",
        ],
        course: {
          id: "weave-design",
          title: "Designing Systemic Interventions",
          overview: "Learn to move from understanding systems to redesigning them. Master stakeholder mapping, intervention design, organizational change, and building resilient systems that serve human wellbeing.",
          totalDuration: "24 hours",
          learningDuration: "4–6 weeks",
          difficulty: "Advanced" as const,
          modules: [
            {
              id: "sd-1", title: "Mapping Stakeholders & Power", description: "Who shapes the system and how do they relate?",
              lessons: [
                { id: "sd-1-1", title: "Power Mapping & Influence Networks", duration: "50 min", content: "Every system has visible structures (org charts, laws, processes) and invisible structures (power dynamics, cultural norms, information flows). Effective systems designers map both.\n\nThe most impactful interventions often work through invisible structures. Changing a law without changing cultural norms produces resistance. Changing a process without changing incentives produces workarounds.\n\nReal-world example: A nonprofit trying to improve education in a rural district initially targeted the school board (visible power). After power mapping, they discovered that three informal community leaders — a church pastor, a grocery store owner, and a retired teacher — had more actual influence on parents' decisions than any official. By engaging these informal leaders first, the nonprofit achieved in 6 months what 3 years of formal advocacy hadn't.\n\nPractical breakdown: Creating a power map — (1) List all stakeholders (including voiceless ones). (2) Map formal authority (org charts, legal powers). (3) Map informal influence (who do people actually listen to?). (4) Map information flows (who knows what?). (5) Map resource control (who controls money, access, attention?). (6) Identify bridge actors — people who connect different stakeholder groups.", keyPoints: ["Visible structures show how systems should work", "Invisible structures show how they actually work", "Power mapping reveals leverage points for change", "Voiceless stakeholders often hold the key to sustainable solutions", "Informal influence often exceeds formal authority", "Bridge actors who connect groups are high-leverage intervention points"], practiceTask: "Choose a system you want to change. Create a stakeholder map with formal and informal power. Identify 3 invisible structures maintaining the current state and 2 bridge actors.", reflectionQuestion: "Why do top-down reforms so often fail? What does this tell us about where real power resides?" },
                { id: "sd-1-2", title: "Systems Mapping in Practice: Multi-Perspective Analysis", duration: "50 min", content: "A system looks different depending on where you stand in it. A hospital looks different to a doctor, a patient, an administrator, and an insurance company. Each perspective reveals real structures the others can't see. Multi-perspective analysis means mapping the same system from multiple viewpoints to build a more complete picture.\n\nSoft Systems Methodology (Peter Checkland) provides a framework: for each stakeholder, define their 'root definition' — what they believe the system is for. Conflicts between root definitions are where the real problems (and opportunities) live.\n\nReal-world example: A tech company's product team saw the recommendation algorithm as a 'user engagement system.' The trust and safety team saw it as a 'content distribution system with safety implications.' Users saw it as 'the thing that shows me stuff.' Regulators saw it as 'an automated editorial decision-maker.' Each perspective revealed real issues invisible to the others. Only when all four were mapped together did the full system picture emerge.\n\nPractical breakdown: Multi-perspective mapping — (1) Identify 4-6 key stakeholder groups. (2) For each, define their 'root definition': What is this system for? (3) Map the system from each perspective: what's important, what's invisible, what are the problems? (4) Overlay the maps: where do perspectives agree? Where do they conflict? (5) Conflicts between root definitions reveal the deepest systemic tensions — and the highest-leverage intervention points.", keyPoints: ["Every stakeholder sees a different system — all perspectives are partially valid", "Root definitions reveal what each stakeholder believes the system is for", "Conflicts between root definitions are where the real problems live", "Multi-perspective mapping builds a more complete system picture than any single view", "The perspectives of the least powerful stakeholders are usually the most informative", "Soft Systems Methodology provides structure for multi-perspective analysis"], practiceTask: "Choose a system with at least 4 stakeholder groups. Define each group's root definition. Map the system from each perspective. Identify where perspectives conflict and where they align. What intervention could address the conflicts?", reflectionQuestion: "Whose perspective on a system you're part of do you most need to understand better? What would change if you truly saw the system through their eyes?" },
                { id: "sd-1-3", title: "Designing Inclusive Participatory Processes", duration: "50 min", content: "The best system designs come from participatory processes — bringing affected stakeholders into the design process rather than designing for them. This isn't just ethics; it's effectiveness. People who help design a system understand it, own it, and maintain it.\n\nParticipatory design has its own challenges: power dynamics can silence marginalized voices even in 'inclusive' settings. Dominant personalities, institutional hierarchies, and cultural norms all shape who speaks and who is heard. Designing the participation process itself is a systems design challenge.\n\nReal-world example: When redesigning a city's public transportation system, the planning department initially held public meetings. Attendance was dominated by retirees and activists — working parents, shift workers, and non-English speakers were absent. The redesign team shifted to going where people were: bus stops, grocery stores, community centers, online surveys in multiple languages. The resulting design reflected the actual user base and ridership increased 34%.\n\nPractical breakdown: Effective participatory design — (1) Go to stakeholders, don't make them come to you. (2) Use multiple engagement formats (visual, verbal, written, digital). (3) Actively manage power dynamics: anonymous input, small groups, trained facilitators. (4) Close the loop: show stakeholders how their input shaped the design. (5) Build ongoing feedback mechanisms, not one-time consultations.", keyPoints: ["Participatory design produces better outcomes than expert-only design", "Power dynamics shape who speaks in 'inclusive' processes — design for this", "Go to stakeholders; don't make them come to you", "Multiple engagement formats include different types of participants", "Closing the loop (showing how input was used) builds trust and continued participation", "Ongoing feedback mechanisms beat one-time consultations"], practiceTask: "Design a participatory process for a system change you want to make. Identify all stakeholder groups. For each, design an engagement method that meets them where they are. Plan how to manage power dynamics. Define how you'll close the loop.", reflectionQuestion: "When have you been excluded from a design process that affected you? How did that experience shape the outcome?" },
              ],
            },
            {
              id: "sd-2", title: "Resilience & Adaptive Design", description: "Building systems that adapt rather than break.",
              lessons: [
                { id: "sd-2-1", title: "Designing for Resilience, Not Just Efficiency", duration: "55 min", content: "Efficient systems are optimized for one condition. Resilient systems thrive across many conditions. Nature favors resilience — ecosystems maintain diversity, redundancy, and modularity so local failures don't cascade.\n\nIn organizations, resilience means distributed decision-making, psychological safety, information transparency, and rapid adaptability.\n\nReal-world example: Japan's bullet train system is designed for resilience, not just efficiency. Multiple independent power sources (redundancy), automatic earthquake detection that stops trains before shaking arrives (fast feedback), modular track sections that can be isolated and repaired without shutting the whole system (modularity), and continuous improvement culture (adaptability). In 60 years of operation, zero passenger fatalities.\n\nPractical breakdown: The five dimensions of resilience — (1) Diversity: multiple approaches, perspectives, and capabilities. (2) Redundancy: backup systems and slack capacity. (3) Modularity: components that can fail independently without cascading. (4) Feedback speed: early detection and rapid response. (5) Adaptability: the ability to reconfigure in response to changing conditions.", keyPoints: ["Efficiency optimizes for one scenario; resilience prepares for many", "Redundancy is not waste — it's insurance against cascading failure", "Fast feedback loops are the immune system of organizations", "Diversity of perspectives increases collective intelligence", "Modularity prevents local failures from becoming systemic collapse", "The most resilient systems invest in all five dimensions simultaneously"], practiceTask: "Audit a system you're part of on all five resilience dimensions (1-10 each). Design 3 interventions to improve the weakest dimension without sacrificing the strongest.", reflectionQuestion: "When has pursuing efficiency at all costs led to fragility? What would resilience-first look like?" },
                { id: "sd-2-2", title: "Adaptive Management: Learning While Doing", duration: "50 min", content: "Complex systems can't be fully understood before intervening. Adaptive management acknowledges this: design interventions as experiments, monitor results, and adjust continuously. The goal is structured learning, not perfect prediction.\n\nThe adaptive management cycle: (1) Assess: what do we know and not know? (2) Design: create an intervention as a testable hypothesis. (3) Implement: try it in a controlled way. (4) Monitor: measure the outcomes you predicted AND watch for surprises. (5) Evaluate: did the intervention work as expected? (6) Adjust: modify based on what you learned. (7) Repeat.\n\nReal-world example: The Yellowstone wolf reintroduction was managed adaptively. Scientists hypothesized that wolves would control elk populations, allowing vegetation to recover. They monitored not just elk numbers but the entire ecosystem — river patterns, bird populations, beaver activity. When unexpected effects emerged (wolves changed elk behavior, not just population, which affected where elk grazed, which changed riverbank vegetation, which changed river flow), the management plan was adjusted to support these cascading benefits.\n\nPractical breakdown: Implementing adaptive management — (1) State your hypothesis: 'If we do X, we expect Y because Z.' (2) Define success metrics AND surprise indicators. (3) Set review checkpoints (weekly, monthly, quarterly). (4) Create a 'learning log': what did we expect vs. what happened? (5) Make adjustment decisions based on data, not sunk costs. (6) Share learning across the organization.", keyPoints: ["Complex systems can't be fully understood before intervening — learn while doing", "Design interventions as testable hypotheses, not fixed plans", "Monitor for expected results AND surprises", "The adaptive cycle: assess, design, implement, monitor, evaluate, adjust", "Learning logs create organizational memory and prevent repeated mistakes", "Adjustment based on data, not sunk costs or ego"], practiceTask: "Design an intervention for a system you want to change as an adaptive experiment. State your hypothesis, define success metrics and surprise indicators, set review checkpoints, and create a learning log template. Implement for 2 weeks and evaluate.", reflectionQuestion: "Where are you treating a complex system as if it were predictable? What would an adaptive approach look like instead?" },
                { id: "sd-2-3", title: "Designing Anti-Fragile Systems", duration: "50 min", content: "Nassim Taleb's concept of antifragility goes beyond resilience. Resilient systems withstand shocks and return to their previous state. Antifragile systems actually improve from stress, disorder, and volatility — they get stronger from being challenged.\n\nBiological evolution is antifragile: environmental stress kills weak organisms and strengthens the species. Startup ecosystems are antifragile: individual companies fail frequently, but the ecosystem as a whole improves as lessons are shared and resources reallocate to better ideas.\n\nReal-world example: Netflix's Chaos Monkey is designed antifragility. It randomly terminates production servers during business hours. Initially terrifying, this practice forced Netflix's engineering teams to build systems so robust that they handle any failure automatically. By deliberately introducing disorder, Netflix made its systems stronger than they could have been through careful planning alone.\n\nPractical breakdown: Designing antifragile systems — (1) Small, contained failures: create safe environments for things to break. (2) Optionality: build systems with many possible paths, not one optimized path. (3) Barbell strategy: combine extreme safety on core functions with extreme experimentation on peripheral ones. (4) Skin in the game: ensure decision-makers bear the consequences of their decisions. (5) Via negativa: improve by removing fragilities rather than adding features.", keyPoints: ["Antifragile systems improve from stress — they get stronger from challenges", "Resilient = withstands shocks. Antifragile = benefits from shocks", "Small contained failures build system-wide strength (Chaos Monkey principle)", "Optionality: many possible paths beats one optimized path", "Barbell strategy: extreme safety + extreme experimentation", "Via negativa: remove fragilities rather than adding features"], practiceTask: "Identify a system you manage. Where is it fragile (breaks under stress)? Where is it resilient (withstands stress)? Where could it be antifragile (improves from stress)? Design 3 interventions to increase antifragility: one small-failure mechanism, one optionality increase, one via negativa removal.", reflectionQuestion: "What in your life has made you stronger specifically because it was difficult? How can you design more of that?" },
              ],
            },
            {
              id: "sd-3", title: "Designing Systemic Interventions", description: "From understanding to action — creating change that sticks.",
              lessons: [
                { id: "sd-3-1", title: "Intervention Design: Theory of Change", duration: "50 min", content: "A theory of change is a map from where you are to where you want to be, showing every causal step in between. It makes your assumptions explicit and testable: 'If we do A, it will cause B, which will lead to C, which produces our desired outcome D.' Every step is a hypothesis that can be validated or refuted.\n\nThe power of a theory of change is that it forces you to think through the full causal chain — including the conditions that must be true for each step to work. Most interventions fail not because the final goal is wrong but because an intermediate step doesn't hold.\n\nReal-world example: A nonprofit wanted to reduce youth unemployment. Their theory of change: provide job training (A) → participants gain skills (B) → employers hire them (C) → unemployment decreases (D). When they made this explicit, they realized step B→C had a hidden assumption: employers must be aware of and trust the training program. By adding employer partnerships to their intervention, completion-to-employment rates tripled.\n\nPractical breakdown: Building a theory of change — (1) Define your ultimate goal. (2) Work backward: what conditions must exist for the goal to be achieved? (3) For each condition, what intervention creates it? (4) Identify assumptions at each step. (5) Define indicators for each step so you can monitor progress. (6) Test the weakest assumptions first.", keyPoints: ["A theory of change maps every causal step from intervention to outcome", "It makes assumptions explicit and testable", "Most interventions fail at intermediate steps, not at the final goal", "Work backward from the desired outcome to identify required conditions", "Test the weakest assumptions first — they're where interventions break", "Indicators at each step enable adaptive management"], practiceTask: "Build a theory of change for a change you want to create. Define the goal, work backward through 4-5 causal steps, identify assumptions at each step, and define indicators. Identify the weakest assumption and design a test for it.", reflectionQuestion: "What assumption in your current approach to a problem have you never explicitly tested?" },
                { id: "sd-3-2", title: "Scaling Systemic Change: From Pilot to Movement", duration: "50 min", content: "Most change initiatives succeed in pilots and fail at scale. The reason is systemic: the conditions that made the pilot work (high attention, dedicated resources, motivated early adopters) don't exist at scale. Scaling requires designing for different system dynamics.\n\nEverett Rogers' diffusion of innovations provides the framework: innovators (2.5%) and early adopters (13.5%) adopt based on vision. The early majority (34%) adopts based on evidence and peer influence. The late majority (34%) adopts based on necessity and social pressure. Crossing from early adopters to early majority — 'crossing the chasm' — is where most change efforts die.\n\nReal-world example: Microfinance started as a pilot program by Muhammad Yunus in a single Bangladeshi village. It worked brilliantly — small loans to women created businesses that lifted families from poverty. Scaling to millions of borrowers revealed system dynamics the pilot missed: aggressive lending targets created over-indebtedness, group lending created social coercion, and the absence of financial literacy led to misuse of loans. The intervention that was transformative at pilot became harmful at scale until these systemic issues were addressed.\n\nPractical breakdown: Scaling change systemically — (1) Design the pilot to test system dynamics, not just effectiveness. (2) Identify what conditions made the pilot work that won't exist at scale. (3) Build reinforcing loops: success stories, peer networks, visible results. (4) Address the 'chasm': create evidence packages and peer champions for the early majority. (5) Anticipate and design for scaling side effects. (6) Maintain feedback loops so the intervention adapts as it scales.", keyPoints: ["Pilots succeed under conditions that don't exist at scale", "Crossing the chasm from early adopters to early majority is where most change dies", "Evidence and peer influence drive the early majority, not vision", "Design pilots to test system dynamics, not just effectiveness", "Anticipate scaling side effects — interventions that work small can harm at scale", "Reinforcing loops (success stories, peer networks) are the engine of scaling"], practiceTask: "Take a change initiative you've seen (or designed). Analyze: what conditions made it work at pilot? Which won't exist at scale? What 'chasm-crossing' strategies are needed? Design a scaling plan that addresses system dynamics.", reflectionQuestion: "Have you seen a great idea fail at scale? What systemic factors caused the failure?" },
                { id: "sd-3-3", title: "Systems Leadership: Leading Without Control", duration: "55 min", content: "Systems leadership is fundamentally different from traditional leadership. You cannot control a complex system — you can only influence it. Systems leaders create conditions for change rather than dictating it. They work through relationships, information flows, and shared sense-making rather than authority and directives.\n\nPeter Senge, Hal Hamilton, and John Kania define three core capabilities of systems leaders: (1) Seeing the larger system — helping others see beyond their immediate context. (2) Fostering reflection and generative conversation — creating spaces where people can think together about complexity. (3) Shifting the collective focus from reactive problem-solving to co-creating the future.\n\nReal-world example: Nelson Mandela is a systems leader archetype. After 27 years in prison, rather than seeking retribution (which would have maintained the apartheid system's revenge dynamics), he redesigned the system's goal from 'one group wins' to 'all groups reconcile.' The Truth and Reconciliation Commission was a systems intervention — it changed the feedback loop from revenge cycles to healing cycles by changing the system's fundamental goal.\n\nPractical breakdown: Systems leadership practices — (1) Convene, don't command: bring diverse stakeholders together. (2) Ask questions, don't give answers: help people see the system together. (3) Build shared language: systems thinking vocabulary enables collective understanding. (4) Hold space for emergence: resist the urge to control outcomes. (5) Model the change: embody the principles you want the system to adopt. (6) Think in timescales: systems change happens over years, not quarters.", keyPoints: ["You cannot control a complex system — you can only create conditions for change", "Three capabilities: seeing the larger system, fostering reflection, shifting focus to co-creation", "Convene, don't command; ask, don't tell; hold space, don't control", "Systems change requires patience — think in years, not quarters", "Model the change you want the system to adopt", "Systems leadership is about influence through relationships and shared understanding"], practiceTask: "Identify a system you want to influence but cannot control. Instead of planning what to do, design a convening: who needs to be in the room? What questions would help them see the system together? What shared language would enable collective understanding? Facilitate the conversation.", reflectionQuestion: "Where are you trying to control a system that can only be influenced? What would shift if you moved from commanding to convening?" },
              ],
            },
          ],
        },
      },
      // ── Third mentor: Praxis ──
      {
        id: "praxis",
        name: "Praxis",
        title: "Systems Modeling & Simulation Mentor",
        tagline: "Model it before you change it",
        personality: "Quantitative, curious, tool-oriented. Praxis teaches the computational side of systems thinking — building models and simulations that reveal dynamics invisible to intuition alone.",
        avatar: "📐",
        initials: "PX",
        envTheme: { bg: "#060e18", accent: "#38bdf8", mood: "analytical" },
        voiceConfig: { pitch: 0.92, rate: 0.95, voiceHint: "male" },
        specialties: ["System Dynamics Modeling", "Agent-Based Simulation", "Stock-Flow Diagrams", "Scenario Planning", "Data Visualization"],
        greeting: "Hey! I'm Praxis, your systems modeling mentor. Systems thinking gives you the concepts — I'll teach you the tools. When you can build a model of a system, test scenarios, and visualize dynamics, you move from understanding to prediction. Let's turn theory into working simulations.",
        encouragement: [
          "That stock-flow model captures the dynamics precisely!",
          "Your scenario analysis reveals non-obvious leverage points.",
          "You're building intuition through simulation — that's the fastest path to mastery.",
        ],
        course: {
          id: "praxis-modeling",
          title: "Systems Modeling & Simulation",
          overview: "Learn to build system dynamics models, run scenario simulations, and visualize complex system behavior. From stock-flow diagrams to agent-based models, develop the quantitative skills that make systems thinking actionable.",
          totalDuration: "26 hours",
          learningDuration: "4–6 weeks",
          difficulty: "Advanced" as const,
          modules: [
            {
              id: "smm-1", title: "Stock-Flow Modeling", description: "The building blocks of system dynamics.",
              lessons: [
                { id: "smm-1-1", title: "Stocks, Flows & Feedback in Mathematical Form", duration: "55 min", content: "System dynamics models translate causal loop diagrams into mathematical form. Stocks are accumulations (population, savings, pollution). Flows are rates of change (births, deposits, emissions). Every stock changes only through its inflows and outflows.\n\nThe power: it reveals delays and accumulations intuition misses. Your bathtub fills because inflow exceeds outflow — obvious in a bathtub, but the same logic explains why CO2 accumulates even as emissions decline.\n\nReal-world example: A startup tracked 'employee knowledge' as a stock. Inflow: new hires, training, learning on the job. Outflow: turnover, forgetting, skill obsolescence. When they modeled this, they discovered that their 40% annual turnover rate meant the knowledge stock was barely growing despite massive hiring. The model showed that reducing turnover by 10% was worth more than doubling the training budget.\n\nPractical breakdown: Building stock-flow models — (1) Identify the key stocks (what accumulates?). (2) Define inflows and outflows for each stock. (3) Connect flows to other variables through feedback. (4) Add delays where effects take time. (5) Set initial values and run the model. (6) Validate: does the model reproduce observed behavior?", keyPoints: ["Stocks accumulate; flows are rates of change", "Stock(t) = Stock(t-1) + Inflow - Outflow", "Delays between action and effect cause overshoot and oscillation", "Stock-flow models reveal dynamics invisible to mental simulation", "Counter-intuitive: reducing outflows often matters more than increasing inflows", "Validate models against observed behavior before using for prediction"], practiceTask: "Build a stock-flow model of a system you care about (savings, hiring, disease spread, skill development). Define all stocks, flows, and feedback connections. Run scenarios: what happens if you double one flow? Halve another?", reflectionQuestion: "Why does the human mind struggle with accumulation and delay? What policy mistakes result?" },
                { id: "smm-1-2", title: "System Dynamics Modeling Tools & Techniques", duration: "50 min", content: "While you can sketch stock-flow diagrams on paper, running simulations requires software. System dynamics tools allow you to define stocks, flows, and equations, then simulate behavior over time. This moves you from 'I think X will happen' to 'The model predicts X under these conditions.'\n\nThe most accessible tools: Insight Maker (free, web-based), Vensim (professional standard, free PLE version), Stella Architect (visual, education-focused), and Python with PySD library (for programmers). Each has trade-offs between ease of use and analytical power.\n\nReal-world example: Epidemiologists used system dynamics models (SIR models — Susceptible, Infected, Recovered) to predict COVID-19 spread. The models weren't perfectly accurate, but they revealed crucial dynamics: the critical importance of the 'reproduction number' (R), the exponential nature of early spread, and the impact of interventions at different times. Decision-makers who used these models made better choices than those who relied on linear intuition.\n\nPractical breakdown: Building your first simulation — (1) Start with a simple 2-stock model (e.g., SIR epidemic model). (2) Define stocks, flows, and parameters. (3) Run a baseline simulation. (4) Change one parameter and observe the effect. (5) Test sensitivity: which parameters have the largest impact? (6) Add complexity gradually — only add what improves explanatory power.", keyPoints: ["Simulation moves you from 'I think' to 'The model predicts'", "Start with free tools: Insight Maker, Vensim PLE, or Python PySD", "The SIR model is the classic starter — learn the fundamentals with epidemiology", "Sensitivity analysis reveals which parameters matter most", "Add complexity gradually — simple models that are understood beat complex ones that aren't", "Models are tools for thinking, not crystal balls — they clarify logic, not predict the future"], practiceTask: "Build your first system dynamics simulation using Insight Maker (free, web-based). Model a simple SIR epidemic: Susceptible → Infected → Recovered. Run the baseline, then experiment: what happens when you change the infection rate? The recovery rate? When you add a 'vaccination' flow?", reflectionQuestion: "What's more dangerous: making decisions without models (pure intuition) or making decisions with models you don't understand? How do you avoid both traps?" },
                { id: "smm-1-3", title: "Model Validation & the Art of Useful Simplification", duration: "50 min", content: "All models are wrong — some are useful. George Box's famous aphorism captures the essential tension in modeling: your model must be simple enough to understand and use, yet complex enough to capture the dynamics that matter. The art is knowing what to include and what to leave out.\n\nModel validation asks: does the model behave like the real system? Not 'is the model true' (it never is) but 'is it useful for the questions we're asking?' Validation techniques: historical fit (can the model reproduce past behavior?), extreme conditions (does the model behave sensibly when you push parameters to extremes?), and structural validation (do experts agree the model captures key relationships?).\n\nReal-world example: The Club of Rome's 'Limits to Growth' model (1972) was criticized for being too simple — it didn't include technological innovation, price signals, or substitution effects. But its core dynamics (exponential growth hitting finite resources) have been remarkably accurate at the aggregate level 50 years later. The model was 'wrong' in many details but 'useful' in capturing the essential dynamic.\n\nPractical breakdown: Model validation checklist — (1) Structure test: do experts agree on the causal relationships? (2) Behavior test: can the model reproduce historical patterns? (3) Extreme condition test: does the model behave sensibly at parameter extremes? (4) Sensitivity test: which parameters most affect outcomes? Are they realistic? (5) Surprise test: does the model reveal any non-obvious dynamics? (6) Use test: does the model answer the questions you built it for?", keyPoints: ["All models are wrong; some are useful — the question is usefulness, not truth", "Include what matters for your question; exclude everything else", "Validate against history, extreme conditions, sensitivity, and expert judgment", "Simple models that are understood beat complex ones that aren't", "The most useful models reveal non-obvious dynamics", "Models are for learning and conversation, not prediction and control"], practiceTask: "Take a model you've built. Apply the 6-point validation checklist. Where does the model pass? Where does it fail? What's the simplest change that would improve its usefulness? What complexity should you resist adding?", reflectionQuestion: "When does a model become so complex that it's less useful than simpler thinking? How do you know when you've reached that point?" },
              ],
            },
            {
              id: "smm-2", title: "Scenario Planning & Simulation", description: "Testing futures before they arrive.",
              lessons: [
                { id: "smm-2-1", title: "Building & Testing Scenarios", duration: "55 min", content: "Scenario planning doesn't predict the future — it prepares you for multiple futures. Identify key uncertainties (2-3 driving forces whose outcome is unknown), create distinct plausible scenarios, then stress-test your strategy against each.\n\nShell Oil pioneered this in the 1970s and was the only major oil company prepared for the 1973 crisis. The value isn't in the scenarios — it's in the strategic flexibility they build.\n\nReal-world example: A mid-size retailer used scenario planning for their AI strategy. Two key uncertainties: (1) Will AI commoditize or differentiate retail? (2) Will consumer preference shift to hyper-personalization or privacy? The 2x2 matrix produced four scenarios: 'AI Arms Race' (differentiation + personalization), 'Privacy Paradise' (differentiation + privacy), 'Race to the Bottom' (commoditization + personalization), and 'Analog Renaissance' (commoditization + privacy). Their current strategy only worked in one scenario. They redesigned it to be robust across all four.\n\nPractical breakdown: The scenario planning process — (1) Identify the strategic question. (2) Research driving forces (political, economic, social, technological, environmental). (3) Select 2 most impactful, most uncertain forces. (4) Create a 2x2 matrix with 4 scenarios. (5) Name each scenario and write a brief narrative. (6) Test your current strategy against each. (7) Design a robust strategy that performs acceptably in all scenarios.", keyPoints: ["Scenarios are plausible futures, not predictions", "2 key uncertainties create a 2x2 matrix with 4 scenarios", "Test every strategy against all scenarios, not just the expected one", "The goal is strategic flexibility, not accurate forecasting", "Name scenarios vividly — names make them memorable and discussable", "Robust strategies perform acceptably across all scenarios, not optimally in one"], practiceTask: "Identify a major decision. Define 2 key uncertainties, create a 2x2 scenario matrix, name each scenario, test your current strategy against all four, and redesign for robustness.", reflectionQuestion: "Why do organizations default to single-point forecasts? What makes scenario thinking psychologically difficult?" },
                { id: "smm-2-2", title: "Monte Carlo Simulation & Probabilistic Thinking", duration: "50 min", content: "Monte Carlo simulation replaces the question 'What will happen?' with 'What are the odds?' Instead of a single forecast, it runs thousands of simulations with randomized inputs, producing a distribution of possible outcomes. This transforms decision-making from betting on one future to understanding the probability landscape.\n\nThe core idea: define your variables (costs, growth rate, market size), assign probability distributions to each (not just a single estimate), then let a computer run thousands of iterations to show the range of possible outcomes and their likelihood.\n\nReal-world example: A venture capital firm evaluating a startup used traditional analysis (single-point estimates) that showed a 3x return. Monte Carlo simulation with realistic uncertainty ranges showed: 20% chance of total loss, 40% chance of 1-2x return, 25% chance of 3-5x return, and 15% chance of 10x+ return. The expected value was similar, but the risk profile was dramatically clearer — leading to a different investment structure (convertible note with downside protection instead of equity).\n\nPractical breakdown: Running Monte Carlo analysis — (1) Define the model: what variables drive the outcome? (2) Replace point estimates with ranges: 'Revenue won't be $1M — it'll be somewhere between $500K and $2M, most likely around $900K.' (3) Assign distributions (normal, uniform, triangular). (4) Run 1,000-10,000 iterations. (5) Analyze the output distribution: What's the median? The 10th percentile (downside)? The 90th (upside)? (6) Make decisions based on the distribution, not a single number.", keyPoints: ["Monte Carlo replaces single forecasts with probability distributions", "Replace point estimates with ranges — acknowledge uncertainty explicitly", "Run thousands of iterations to see the full landscape of possibilities", "Focus on downside risk (10th percentile) not just expected value", "Probability thinking leads to better decisions than deterministic thinking", "Simple Monte Carlo can be done in any spreadsheet — you don't need fancy tools"], practiceTask: "Choose a decision with financial uncertainty. Define 3-5 key variables with probability ranges. Run a Monte Carlo simulation (even in a spreadsheet with random functions). Analyze: What's the median outcome? The worst 10%? Best 10%? How does this change your decision vs. single-point analysis?", reflectionQuestion: "Where in your life are you making decisions based on single-point estimates when probability distributions would be more appropriate?" },
                { id: "smm-2-3", title: "War-Gaming & Tabletop Simulations", duration: "50 min", content: "War-gaming brings scenarios to life through role-played simulation. Instead of analyzing scenarios on paper, participants take on stakeholder roles and make decisions in real-time, revealing dynamics, strategies, and failure modes that static analysis misses.\n\nThe method originated in military planning but is now used widely: business strategy (competitive war-games), policy design (policy simulations), crisis management (tabletop exercises), and organizational change (change simulations).\n\nReal-world example: Before launching a new pricing strategy, a SaaS company ran a competitive war-game. Executives played the roles of their three main competitors and were asked: 'How would you respond to our price change?' The war-game revealed that Competitor B would likely undercut by 30% and offer free migration — a response the team hadn't considered in their static analysis. They redesigned the pricing strategy to be robust against this response.\n\nPractical breakdown: Running a war-game — (1) Define the scenario and the decision being tested. (2) Assign roles: each team plays a different stakeholder or competitor. (3) Provide each team with realistic information about their assigned actor. (4) Run rounds: announce your move, each team responds. (5) Debrief: What surprised you? What strategies emerged? What would you change? (6) Synthesize: How should the real strategy change based on what you learned?", keyPoints: ["War-gaming reveals dynamics that static analysis misses", "Role-playing stakeholders surfaces strategies you wouldn't consider from your own perspective", "Competitive war-games test strategies against likely competitive responses", "Tabletop exercises prepare teams for crisis response", "The debrief is more valuable than the game itself — structure it carefully", "Even simple 2-hour war-games produce actionable strategic insights"], practiceTask: "Design and run a mini war-game for a strategic decision. Assign 3-4 stakeholder roles to colleagues or friends. Run 2-3 rounds. Debrief: What surprised everyone? What strategies emerged? How should your real approach change?", reflectionQuestion: "When have you been surprised by someone's response to your actions? How would a war-game have helped you anticipate it?" },
              ],
            },
            {
              id: "smm-3", title: "Advanced Modeling & Visualization", description: "Agent-based models, network analysis, and communicating system insights.",
              lessons: [
                { id: "smm-3-1", title: "Agent-Based Modeling: Emergence from Simple Rules", duration: "55 min", content: "Agent-based models (ABMs) simulate systems from the bottom up: define individual agents with simple rules, let them interact, and observe what emerges. This is the opposite of system dynamics (top-down) — ABMs are ideal for systems where individual behavior and heterogeneity matter.\n\nThe classic ABM insight: complex system behavior can emerge from simple individual rules. Schelling's segregation model showed that mild individual preferences for similar neighbors produce extreme neighborhood segregation — no individual intended it, but the system-level pattern is dramatic.\n\nReal-world example: Epidemiologists used ABMs alongside system dynamics during COVID-19. While SIR models captured aggregate dynamics, ABMs modeled individual behavior: some people wear masks, some don't; some have many contacts, some few; some are in dense housing, some aren't. The ABM revealed that 'superspreader events' (10% of people causing 80% of transmission) were more important than average transmission rates — a dynamic invisible to aggregate models.\n\nPractical breakdown: Building agent-based models — (1) Define agent types (people, companies, cells). (2) Define simple rules for each agent (move toward food, avoid predators, buy cheaper options). (3) Define how agents interact (proximity, networks, markets). (4) Set initial conditions and run. (5) Observe emergent patterns. (6) Validate: does the emergence match real-world patterns? Tools: NetLogo (free, visual), Mesa (Python), AnyLogic (professional).", keyPoints: ["ABMs simulate from the bottom up: simple individual rules → complex system behavior", "Emergence: system-level patterns that no individual intended", "ABMs capture heterogeneity and individual behavior that aggregate models miss", "Schelling's segregation model: mild preferences → extreme outcomes", "Superspreader dynamics: 10% of agents can drive 80% of system behavior", "Start simple — even 2 rules per agent can produce rich emergent behavior"], practiceTask: "Build a simple ABM using NetLogo (free). Start with Schelling's segregation model: agents on a grid move if less than X% of neighbors are similar. Experiment: how does changing the preference threshold change the segregation outcome? Document the emergence.", reflectionQuestion: "Where in real life do simple individual rules produce system-level patterns that nobody intended? How would you change the rules to change the pattern?" },
                { id: "smm-3-2", title: "Network Analysis: Seeing Structure in Connections", duration: "50 min", content: "Network analysis reveals the hidden structure of connections in any system. Who communicates with whom? How do ideas spread? Where are the bottlenecks? Network science provides tools to answer these questions quantitatively.\n\nKey network metrics: (1) Degree centrality: who has the most connections? (2) Betweenness centrality: who bridges different groups? (3) Clustering: how connected are your connections to each other? (4) Path length: how many steps between any two nodes? Small-world networks (short path lengths + high clustering) are remarkably common — from brain neurons to social networks.\n\nReal-world example: A company struggling with slow decision-making did a network analysis of email communication patterns. The org chart showed a flat structure. The network analysis revealed a bottleneck: one mid-level manager was on 73% of all cross-team communication threads. She wasn't a formal gatekeeper — but she was an informal one. Addressing this bottleneck (creating direct cross-team channels) cut decision time by 40%.\n\nPractical breakdown: Conducting a network analysis — (1) Define nodes (people, organizations, concepts) and edges (communication, influence, dependency). (2) Collect data (surveys, email patterns, meeting attendance). (3) Calculate key metrics (centrality, clustering, path length). (4) Visualize the network. (5) Identify structural insights: bottlenecks, isolated clusters, bridge actors. (6) Design interventions: add connections where they're missing, reduce over-dependence on bridge actors.", keyPoints: ["Network analysis reveals hidden connection structures in any system", "Degree centrality: who's most connected. Betweenness: who bridges groups", "Bottleneck individuals appear in network analysis but not org charts", "Small-world networks (short paths + high clustering) are everywhere", "Adding strategic connections can dramatically improve system performance", "Network visualization makes invisible structures visible and actionable"], practiceTask: "Map a network you're part of (team, community, industry). Define nodes and edges. Identify: who are the most connected? Who bridges groups? Where are bottlenecks? Where are isolated clusters? Design one intervention to improve the network structure.", reflectionQuestion: "What role do you play in the networks you're part of? Are you a hub, a bridge, or a peripheral node? What would change if you shifted roles?" },
                { id: "smm-3-3", title: "Communicating System Insights: Data Visualization & Storytelling", duration: "50 min", content: "The best system analysis is worthless if you can't communicate it. Most decision-makers aren't systems thinkers — they need insights translated into language and visuals they can understand and act on. The systems modeler's most important skill isn't building models — it's telling the story the model reveals.\n\nEdward Tufte's principles for data visualization: show the data, minimize non-data ink, use small multiples for comparison, and respect the viewer's intelligence. For systems: show dynamics over time (behavior-over-time graphs), show structure (simplified CLDs), and show leverage (intervention impact comparisons).\n\nReal-world example: Climate scientists struggled for decades to communicate climate model results to policymakers. The breakthrough came with simple visualizations: the 'hockey stick' graph (temperature over 1000 years), 'warming stripes' (one colored stripe per year), and scenario comparisons ('If we do X, this happens; if we do Y, that happens'). Complex models, simple stories.\n\nPractical breakdown: Communicating system insights — (1) Lead with the story, not the model: 'Here's the problem, here's why it persists, here's the leverage point.' (2) Use behavior-over-time graphs to show dynamics. (3) Simplify CLDs to 5-7 variables maximum for presentations. (4) Show scenarios as comparisons: 'Path A leads here, Path B leads here.' (5) Make one clear recommendation. (6) Anticipate questions: 'What if your model is wrong? What assumptions are you making?'", keyPoints: ["The best analysis is worthless if it can't be communicated", "Lead with the story, not the model — most audiences need narrative, not equations", "Behavior-over-time graphs show dynamics; simplified CLDs show structure", "Scenario comparisons make abstract futures concrete", "Simplify: 5-7 variables maximum in any presentation CLD", "Anticipate 'What if you're wrong?' — address assumptions explicitly"], practiceTask: "Take a system analysis you've done. Create a 5-minute presentation for a non-systems-thinking audience. Include: the story (problem, persistence, leverage), one behavior-over-time graph, one simplified CLD, and one scenario comparison. Present it and assess: did they understand and want to act?", reflectionQuestion: "What's the most important system insight you hold that you haven't been able to communicate effectively? What would change if you could?" },
              ],
            },
          ],
        },
      },
    ],
  },

  // ════════════════════════════════════════════
  // 6. Public Speaking & Influence
  // ════════════════════════════════════════════
  {
    id: "speaking",
    slug: "speaking",
    label: "Public Speaking & Influence",
    tagline: "Your voice can move the world",
    description: "Master the art and science of communication that inspires action — from stage presence and storytelling to negotiation and everyday persuasion.",
    icon: Megaphone,
    color: "#ea580c",
    gradient: "from-orange-700 via-orange-500 to-amber-400",
    mentors: [
      {
        id: "voice",
        name: "Voice",
        title: "Public Speaking Mentor",
        isMaster: true,
        tagline: "Command any room with clarity and conviction",
        personality: "Charismatic, encouraging, technique-focused. Voice teaches that great speaking isn't a talent — it's a learned craft built on structure, practice, and genuine connection.",
        avatar: "🎤",
        initials: "VO",
        envTheme: { bg: "#140a04", accent: "#ea580c", mood: "commanding" },
        voiceConfig: { pitch: 0.95, rate: 0.95, voiceHint: "male" },
        specialties: ["Stage Presence", "Speech Structure", "Storytelling", "Vocal Technique", "Audience Connection"],
        greeting: "Welcome! I'm Voice, your public speaking mentor. Every great leader, every world-changing idea, every movement that mattered — they all needed someone who could stand up and speak with clarity, conviction, and heart. That's a skill, not a gift. And I'll teach it to you.",
        encouragement: [
          "That speech structure is tight — clear thesis, compelling evidence, powerful close!",
          "Your storytelling is creating genuine emotional connection.",
          "You're developing real stage presence — confidence without arrogance.",
        ],
        course: {
          id: "voice-speaking",
          title: "The Art of Public Speaking",
          overview: "Learn to craft and deliver speeches that inform, inspire, and persuade. From TED-style talks to boardroom presentations, master the techniques that make your ideas impossible to ignore.",
          totalDuration: "25 hours",
          learningDuration: "4–6 weeks",
          difficulty: "Beginner",
          modules: [
            {
              id: "ps-1", title: "Foundations of Speaking", description: "Structure, delivery, and connection.",
              lessons: [
                { id: "ps-1-1", title: "Speech Structure: The Proven Frameworks", duration: "50 min", content: "Great speeches aren't improvised — they're engineered. The most effective speeches follow proven structures that guide the audience's attention and build toward a compelling conclusion. The 'Problem-Solution-Benefit' framework works for persuasive talks. 'What-So What-Now What' works for informative presentations. The 'Hero's Journey' structure works for inspirational keynotes.\n\nEvery speech needs three things: a hook that captures attention in the first 30 seconds, a body with 3-5 key points (not more — audiences can't retain more), and a close that tells people exactly what to do or think differently. The rule of three is the speaker's best friend — humans naturally process information in groups of three.", keyPoints: ["The first 30 seconds determine whether the audience stays or mentally checks out", "Three key points maximum — audiences can't retain more", "Every point needs evidence: story, statistic, or demonstration", "The close should be a call to action, not a summary"], practiceTask: "Write and deliver a 5-minute speech on a topic you care about. Use the Problem-Solution-Benefit structure. Include a compelling hook, three evidence-backed points, and a specific call to action. Record yourself and analyze.", reflectionQuestion: "Why are TED talks limited to 18 minutes? What does that constraint reveal about how audiences process information?" },
                { id: "ps-1-2", title: "Stage Presence & Vocal Mastery", duration: "55 min", content: "Stage presence isn't about charisma — it's about intentional physical and vocal communication. Your body language communicates before you speak a single word. Power posing, purposeful movement, eye contact, and stillness during key moments all signal confidence and authority.\n\nYour voice is an instrument with four dimensions: pace (speed creates energy or gravitas), pitch (variety prevents monotone), power (volume signals importance), and pause (silence is the most powerful rhetorical device). Great speakers vary all four constantly — it's vocal music that keeps audiences engaged.", keyPoints: ["Stillness signals confidence; fidgeting signals nervousness", "Eye contact for 3-5 seconds per person creates connection", "The strategic pause is more powerful than any word", "Vocal variety is the #1 predictor of perceived speaker competence"], practiceTask: "Record a 3-minute speech twice: once normally, once focusing entirely on vocal variety and pauses. Compare the recordings. Practice 'the power pause' — stopping for 3 full seconds at your most important point.", reflectionQuestion: "Why does silence feel uncomfortable for speakers but powerful for audiences?" },
              ],
            },
          ],
        },
      },
      {
        id: "aura",
        name: "Aura",
        title: "Persuasion & Negotiation Mentor",
        tagline: "Influence without manipulation",
        personality: "Strategic, empathetic, psychologically informed. Aura teaches ethical influence based on understanding human psychology and building genuine alignment.",
        avatar: "🤝",
        initials: "AU",
        envTheme: { bg: "#120a06", accent: "#fb923c", mood: "strategic" },
        voiceConfig: { pitch: 1.08, rate: 0.92, voiceHint: "female" },
        specialties: ["Negotiation", "Persuasion Psychology", "Conflict Resolution", "Stakeholder Management", "Emotional Intelligence"],
        greeting: "Hello! I'm Aura, your persuasion and negotiation mentor. Influence isn't manipulation — it's understanding what people truly need and finding paths to mutual benefit. I'll teach you the psychology of persuasion, the art of negotiation, and how to navigate any human interaction with skill and integrity.",
        encouragement: [
          "Your negotiation framework shows real strategic thinking!",
          "Finding the win-win — that's advanced influence skill.",
          "You're reading the room with increasing precision.",
        ],
        course: {
          id: "aura-influence",
          title: "The Psychology of Influence",
          overview: "Learn the science of persuasion, negotiation tactics from Harvard's Program on Negotiation, and everyday influence skills. Ethical influence is about understanding, empathy, and creating value for everyone.",
          totalDuration: "22 hours",
          learningDuration: "4–6 weeks",
          difficulty: "Intermediate",
          modules: [
            {
              id: "pi-1", title: "Persuasion Science", description: "How people actually make decisions.",
              lessons: [
                { id: "pi-1-1", title: "Cialdini's Principles of Influence", duration: "55 min", content: "Robert Cialdini identified six principles that drive human compliance: Reciprocity (we feel obligated to return favors), Commitment/Consistency (we align behavior with past commitments), Social Proof (we follow what others do), Authority (we defer to perceived experts), Liking (we say yes to people we like), and Scarcity (we value what's rare).\n\nThese principles work because they're cognitive shortcuts — normally helpful heuristics that evolved for good reasons. Understanding them gives you two powers: the ability to ethically incorporate them into your communication, and the ability to recognize when others are using them on you.", keyPoints: ["Reciprocity: give genuine value before asking for anything", "Social proof: show that others like the audience have succeeded", "Scarcity: authentic urgency (not fake countdown timers)", "Authority: demonstrate expertise through content, not claims"], practiceTask: "Analyze a successful marketing campaign, political speech, and charity appeal. Identify which of Cialdini's 6 principles each uses. Then craft a persuasive email for a cause you care about, intentionally using at least 3 principles ethically.", reflectionQuestion: "Where is the line between ethical persuasion and manipulation? How do you know when you've crossed it?" },
              ],
            },
          ],
        },
      },
      // ── Third mentor: Quill ──
      {
        id: "quill",
        name: "Quill",
        title: "Written Communication & Storytelling Mentor",
        tagline: "The pen shapes minds the voice cannot reach",
        personality: "Literary, precise, craft-obsessed. Quill teaches that powerful writing — from emails to essays — is the most scalable form of influence, and it's a learnable craft.",
        avatar: "✍️",
        initials: "QU",
        envTheme: { bg: "#140c06", accent: "#f97316", mood: "literary" },
        voiceConfig: { pitch: 1.05, rate: 0.88, voiceHint: "female" },
        specialties: ["Business Writing", "Storytelling", "Copywriting", "Narrative Structure", "Editing"],
        greeting: "Hello! I'm Quill, your written communication mentor. Speaking moves a room; writing moves the world. Every email you send, every proposal you write, every story you tell — it's all persuasion through language. I'll teach you to write with clarity, precision, and power. Let's sharpen your pen.",
        encouragement: [
          "That opening hook is impossible to stop reading — masterful!",
          "Your editing instinct is getting sharper — cutting the right words.",
          "You're developing a distinctive written voice — that's your brand.",
        ],
        course: {
          id: "quill-writing",
          title: "The Craft of Powerful Writing",
          overview: "Master clear, persuasive writing for every context — from emails and proposals to essays and storytelling. Learn the editing principles that transform good writing into great writing.",
          totalDuration: "22 hours",
          learningDuration: "4–6 weeks",
          difficulty: "Beginner" as const,
          modules: [
            {
              id: "pw-1", title: "Clarity & Precision", description: "Writing that cannot be misunderstood.",
              lessons: [
                { id: "pw-1-1", title: "The Principles of Clear Writing", duration: "50 min", content: "George Orwell's rules remain unbeaten: never use a long word where a short one will do. If it's possible to cut a word, cut it. Never use the passive where you can use the active. Never use jargon when an everyday equivalent exists.\n\nClarity isn't simplification — it's precision. Clear writing respects the reader's time and eliminates ambiguity. Every sentence should do one of two things: advance the argument or provide evidence. If it does neither, delete it.", keyPoints: ["Short sentences are almost always more powerful than long ones", "Active voice creates clarity and energy: 'The team shipped the product'", "One idea per paragraph — no exceptions for professional writing", "Edit ruthlessly: if a word doesn't earn its place, cut it"], practiceTask: "Take a 500-word piece of your own writing (email, essay, memo). Edit it down to 300 words without losing any meaning. Then edit the 300-word version to 200 words. Notice what's truly essential.", reflectionQuestion: "Why is it harder to write short than long? What does that reveal about the editing process?" },
              ],
            },
            {
              id: "pw-2", title: "Storytelling & Persuasion", description: "Writing that moves people to action.",
              lessons: [
                { id: "pw-2-1", title: "Narrative Structure for Influence", duration: "55 min", content: "Stories are the oldest and most powerful technology for transmitting ideas. Neuroscience shows that stories activate the brain differently from facts — they trigger emotional processing, mirror neurons, and memory consolidation. A fact tells; a story sells.\n\nThe basic narrative arc (character → challenge → struggle → transformation) works in every context: sales pages, investor pitches, case studies, even emails requesting budget approval. The key: make the reader the hero of the story, not yourself.", keyPoints: ["Stories activate emotional processing that facts alone cannot", "The narrative arc: character → challenge → struggle → transformation", "Make the reader the hero — not yourself or your company", "Specific details create believability; generalities create doubt"], practiceTask: "Rewrite a boring factual document (e.g., a project update or product description) as a narrative. Use a character, a challenge, specific details, and a resolution. Compare reader engagement between both versions.", reflectionQuestion: "If storytelling is so powerful, what are the ethical obligations of a skilled storyteller?" },
              ],
            },
          ],
        },
      },
    ],
  },

  // ════════════════════════════════════════════
  // 7. Open Innovation
  // ════════════════════════════════════════════
  {
    id: "innovation",
    slug: "innovation",
    label: "Open Innovation",
    tagline: "Build in public, solve together",
    description: "Master the principles of open source, collaborative innovation, and rapid prototyping. Learn to build with communities, share knowledge, and create solutions that scale through openness.",
    icon: Lightbulb,
    color: "#0891b2",
    gradient: "from-cyan-700 via-cyan-500 to-teal-400",
    mentors: [
      {
        id: "open",
        name: "Open",
        title: "Open Source & Collaboration Mentor",
        isMaster: true,
        tagline: "The best solutions are built together",
        personality: "Community-minded, transparent, technically savvy. Open believes that sharing knowledge accelerates everyone — and that open systems always win in the long run.",
        avatar: "🌐",
        initials: "OP",
        envTheme: { bg: "#061214", accent: "#0891b2", mood: "collaborative" },
        voiceConfig: { pitch: 0.95, rate: 1.0, voiceHint: "male" },
        specialties: ["Open Source Culture", "Community Building", "Documentation", "Collaborative Development", "Knowledge Sharing"],
        greeting: "Hey! I'm Open, your open innovation mentor. The most impactful technologies of our era — the internet, Linux, Wikipedia, Git — were built through open collaboration. I'll teach you how to build in public, contribute to communities, and create solutions that grow through openness. Let's build together.",
        encouragement: [
          "Your contribution approach shows real community awareness!",
          "Building in public takes courage — you're doing great.",
          "That documentation will help hundreds of future contributors.",
        ],
        course: {
          id: "open-innovation",
          title: "Open Innovation & Collaborative Building",
          overview: "Learn the principles and practices of open source, community-driven development, and building in public. From contributing to projects to launching your own, master the art of collaborative innovation.",
          totalDuration: "22 hours",
          learningDuration: "4–6 weeks",
          difficulty: "Beginner",
          modules: [
            {
              id: "oi-1", title: "The Open Source Mindset", description: "How openness accelerates innovation.",
              lessons: [
                { id: "oi-1-1", title: "Why Open Wins: The Economics of Shared Knowledge", duration: "50 min", content: "Open source isn't charity — it's a superior innovation model. When knowledge flows freely, everyone builds on the best available foundation rather than reinventing wheels. Linux, Android, TensorFlow, React, Kubernetes — the world's most critical infrastructure is open source. Companies that embrace openness attract better talent, iterate faster, and build more resilient systems.\n\nThe economics are counterintuitive: by giving away the core, you create more value than by keeping it proprietary. Red Hat built a billion-dollar business on free software. WordPress powers 43% of the web. The secret is that open source creates ecosystems — and ecosystems generate exponentially more value than products.", keyPoints: ["Open source reduces duplication across the entire economy", "Community review produces higher quality than internal-only development", "Open ecosystems attract more innovation than closed platforms", "The business model shifts from selling code to selling services"], practiceTask: "Study 3 successful open source projects (e.g., Linux, React, Python). Analyze their governance model, contribution process, business model, and community culture. Identify what made each successful.", reflectionQuestion: "If sharing knowledge freely creates more value, why do most organizations default to secrecy? What would it take to change this?" },
              ],
            },
          ],
        },
      },
      // ── Second mentor: Forge ──
      {
        id: "forge",
        name: "Forge",
        title: "Rapid Prototyping Mentor",
        tagline: "Ship fast, learn faster, iterate always",
        personality: "Hands-on, pragmatic, builder-first. Forge lives by the principle that the best way to test an idea is to build it. Speed of iteration beats perfection every time.",
        avatar: "🔨",
        initials: "FG",
        envTheme: { bg: "#0a1214", accent: "#14b8a6", mood: "building" },
        voiceConfig: { pitch: 0.98, rate: 1.05, voiceHint: "male" },
        specialties: ["Rapid Prototyping", "MVP Design", "Hackathon Culture", "Design Sprints", "Build in Public"],
        greeting: "What's up! I'm Forge, your rapid prototyping mentor. Ideas are worthless without execution. I'll teach you to build fast, get real feedback, iterate relentlessly, and ship things that actually solve problems. The best innovators aren't the smartest — they're the fastest learners. Let's start building.",
        encouragement: [
          "That MVP is tight and focused — exactly what a first version should be!",
          "You're iterating faster now — that's where real innovation happens.",
          "Shipping beats planning every time. You're developing builder instincts.",
        ],
        course: {
          id: "forge-prototype",
          title: "Ship It: Rapid Prototyping & MVPs",
          overview: "Learn the art of building fast. From design sprints to MVPs, hackathon methodology to build-in-public culture, master the skills that turn ideas into tangible prototypes in days, not months.",
          totalDuration: "20 hours",
          learningDuration: "3–5 weeks",
          difficulty: "Beginner" as const,
          modules: [
            {
              id: "rp-1", title: "The Builder's Mindset", description: "Why speed of iteration beats perfection.",
              lessons: [
                { id: "rp-1-1", title: "Why Shipping Beats Planning", duration: "45 min", content: "The greatest risk in innovation isn't building the wrong thing — it's spending too long planning the right thing. Reid Hoffman said 'If you're not embarrassed by the first version of your product, you've launched too late.' The fastest path to a great product is through multiple imperfect versions.\n\nDesign sprints compress months of debate into days of building and testing. The framework: Monday understand the problem, Tuesday sketch solutions, Wednesday decide, Thursday prototype, Friday test with real users. One week from question to validated answer.", keyPoints: ["Speed of learning is the only sustainable competitive advantage", "Every day spent planning is a day not spent learning from reality", "Design sprints compress months into days", "Real user feedback outweighs all expert opinions combined"], practiceTask: "Pick a problem you care about. Set a 4-hour timer. Design and build the simplest possible prototype that lets you test your core assumption. It can be a paper prototype, a landing page, a Figma mockup — anything tangible. Then show it to 3 people and record their honest reactions.", reflectionQuestion: "What holds you back from shipping imperfect work? Is that fear protecting you, or is it preventing you from learning?" },
              ],
            },
            {
              id: "rp-2", title: "Build in Public", description: "Turning your building process into a growth engine.",
              lessons: [
                { id: "rp-2-1", title: "The Build in Public Playbook", duration: "50 min", content: "Building in public means sharing your journey — the wins, the failures, the lessons — as you create. It's simultaneously a learning accelerator, a marketing strategy, and an accountability system. When you build in public, you attract collaborators, early users, and supporters who are invested in your success.\n\nThe practice: share weekly updates on what you built, what you learned, and what's next. Share your metrics honestly. Ask for feedback openly. Document your decision-making process. This transparency builds trust and creates a community around your work.", keyPoints: ["Building in public attracts collaborators and early adopters", "Transparency builds trust faster than any marketing campaign", "Public accountability accelerates your execution speed", "Your journey documentation becomes valuable content itself"], practiceTask: "Start a 'build in public' log for any project you're working on. Write your first update covering: what you're building, why, what you've done so far, and what's next. Share it somewhere public (Twitter, blog, forum). Commit to 4 weekly updates.", reflectionQuestion: "What would change about your work quality and speed if you knew thousands of people were watching your progress?" },
              ],
            },
          ],
        },
      },
      // ── Third mentor: Spark ──
      {
        id: "spark",
        name: "Spark",
        title: "Innovation Methods & Design Thinking Mentor",
        tagline: "Great ideas are engineered, not awaited",
        personality: "Energetic, methodical, user-centered. Spark teaches that creativity isn't magic — it's a process that can be learned, practiced, and applied systematically.",
        avatar: "⚡",
        initials: "SK",
        envTheme: { bg: "#081216", accent: "#06b6d4", mood: "inventive" },
        voiceConfig: { pitch: 1.1, rate: 1.0, voiceHint: "female" },
        specialties: ["Design Thinking", "Innovation Frameworks", "User Research", "Ideation Methods", "Problem Framing"],
        greeting: "Hey! I'm Spark, your innovation methods mentor. Breakthroughs don't happen by accident — they happen when you combine deep user understanding with structured creativity. I'll teach you design thinking, innovation frameworks, and the art of asking better questions. The best ideas are waiting to be engineered.",
        encouragement: [
          "That problem reframe opens up entirely new solution spaces!",
          "Your user research instincts are becoming razor-sharp.",
          "You're connecting divergent thinking with convergent execution — that's innovation mastery.",
        ],
        course: {
          id: "spark-innovation",
          title: "Design Thinking & Innovation Methods",
          overview: "Master human-centered design thinking, structured ideation techniques, and innovation frameworks. Learn to identify real problems, generate creative solutions, and validate them quickly.",
          totalDuration: "24 hours",
          learningDuration: "4–6 weeks",
          difficulty: "Intermediate" as const,
          modules: [
            {
              id: "dt-1", title: "Design Thinking Foundations", description: "A systematic approach to human-centered innovation.",
              lessons: [
                { id: "dt-1-1", title: "Empathy, Define, Ideate, Prototype, Test", duration: "55 min", content: "Design thinking, pioneered at Stanford's d.school and IDEO, is a human-centered approach to innovation. The five stages — Empathize (understand real user needs), Define (frame the right problem), Ideate (generate many solutions), Prototype (build to think), Test (learn from reality) — create a systematic path from confusion to clarity.\n\nThe most common mistake: jumping straight to solutions. The best innovators spend more time in empathy and problem definition. A well-framed problem is half-solved. Einstein reportedly said he'd spend 55 minutes defining the problem and 5 minutes solving it.", keyPoints: ["Empathy first: understand real needs, not assumed needs", "Problem framing determines solution quality", "Diverge before you converge: quantity of ideas enables quality", "Prototyping is thinking with your hands, not just your brain"], practiceTask: "Run a mini design thinking sprint on a real problem. Spend 30 minutes on empathy (interview 2 people), 15 on problem definition (craft a 'How Might We' statement), 20 on ideation (generate 20+ ideas), 30 on prototyping (build the top idea), and test with 2 users.", reflectionQuestion: "Why is it so tempting to skip empathy and jump to solutions? What do you miss when you do?" },
              ],
            },
            {
              id: "dt-2", title: "Structured Creativity", description: "Techniques for generating breakthrough ideas.",
              lessons: [
                { id: "dt-2-1", title: "Ideation Techniques: Beyond Brainstorming", duration: "50 min", content: "Traditional brainstorming often fails because of groupthink, anchoring, and social dynamics. Better alternatives exist: brainwriting (silent individual ideation before sharing), SCAMPER (Substitute, Combine, Adapt, Modify, Put to other use, Eliminate, Reverse), analogical thinking (solutions from other domains), and constraint-based ideation (what if you had half the budget? What if it had to work in 10 seconds?).\n\nThe best ideation combines individual divergent thinking with collective building. Start alone, share, then build on each other's ideas. This produces both quantity and novelty.", keyPoints: ["Brainwriting outperforms brainstorming for idea quantity and diversity", "SCAMPER provides structured prompts for creative modification", "Analogical thinking: borrow solutions from unrelated domains", "Constraints boost creativity by forcing novel approaches"], practiceTask: "Take a challenge you're facing. Generate ideas using three different methods: brainwriting (10 minutes solo), SCAMPER (modify each element systematically), and analogical thinking (find 3 solutions from nature or other industries). Compare the results.", reflectionQuestion: "Why might working alone before collaborating produce better creative results than starting with group discussion?" },
              ],
            },
          ],
        },
      },
    ],
  },

  // ════════════════════════════════════════════
  // 8. Human-AI Collaboration
  // ════════════════════════════════════════════
  {
    id: "human-ai",
    slug: "human-ai",
    label: "Human-AI Collaboration",
    tagline: "The future belongs to augmented humans",
    description: "Go beyond using AI tools. Learn to think alongside AI, design human-AI systems, understand AI ethics, and build the collaborative intelligence that will define the next era of human capability.",
    icon: Cpu,
    color: "#6366f1",
    gradient: "from-indigo-600 via-indigo-500 to-violet-400",
    mentors: [
      {
        id: "synth",
        name: "Synth",
        title: "AI Partnership Mentor",
        isMaster: true,
        tagline: "Your AI co-pilot for the next decade",
        personality: "Forward-thinking, philosophical, practically grounded. Synth sees human-AI collaboration not as a trend but as the defining skill of the 21st century.",
        avatar: "🧩",
        initials: "SY",
        envTheme: { bg: "#0a0a1a", accent: "#6366f1", mood: "augmented" },
        voiceConfig: { pitch: 1.0, rate: 1.0, voiceHint: "male" },
        specialties: ["AI Collaboration", "Prompt Engineering", "AI System Design", "Cognitive Augmentation", "AI Strategy"],
        greeting: "Welcome! I'm Synth, your human-AI collaboration mentor. We're at the beginning of the most significant capability shift in human history. AI won't replace humans — but humans who work with AI will replace those who don't. I'll teach you to think alongside AI, design human-AI workflows, and stay ahead of the curve. Let's build your augmented intelligence.",
        encouragement: [
          "Your prompt architecture shows sophisticated thinking!",
          "That human-AI workflow design is genuinely innovative.",
          "You're developing meta-skills that will compound for decades.",
        ],
        course: {
          id: "synth-humanai",
          title: "Human-AI Collaborative Intelligence",
          overview: "Learn to design effective human-AI collaborations, master advanced prompting techniques, understand AI capabilities and limitations deeply, and develop the meta-skills that make you more valuable as AI capabilities grow.",
          totalDuration: "28 hours",
          learningDuration: "4–6 weeks",
          difficulty: "Intermediate",
          modules: [
            {
              id: "ha-1", title: "The Augmented Human", description: "Designing effective human-AI partnerships.",
              lessons: [
                { id: "ha-1-1", title: "Cognitive Augmentation: Thinking with AI", duration: "55 min", content: "Human-AI collaboration is most powerful when it combines AI's strengths (pattern recognition, data processing, consistency, scale) with human strengths (creativity, empathy, judgment, context understanding). The key isn't delegating to AI — it's thinking alongside it.\n\nEffective human-AI collaboration follows a pattern: the human provides direction, context, and judgment; the AI provides execution, variation, and data processing; the human evaluates, refines, and makes final decisions. This loop — direct → generate → evaluate → refine — is the basic unit of augmented cognition.", keyPoints: ["AI excels at: pattern recognition, data processing, consistency, scale", "Humans excel at: creativity, empathy, judgment, context", "The 'centaur' model: human strategic thinking + AI tactical execution", "Meta-learning (learning how to learn with AI) is the critical skill"], practiceTask: "Design a 'centaur workflow' for a complex task you do regularly. Map which subtasks are best for human judgment, which for AI processing, and where the handoffs occur. Implement it and measure the quality and speed improvement.", reflectionQuestion: "As AI capabilities grow, which human skills become MORE valuable, not less? How should you invest your learning time?" },
                { id: "ha-1-2", title: "Advanced Prompt Engineering", duration: "60 min", content: "Prompt engineering isn't about tricks — it's about clear communication with a different kind of intelligence. The best prompts provide context (what role the AI should play), task specification (what exactly you need), format guidance (how the output should be structured), and examples (showing the quality level you expect).\n\nAdvanced techniques include chain-of-thought prompting (asking the AI to show its reasoning), few-shot learning (providing examples of desired output), meta-prompting (asking the AI to generate better prompts), and system prompt architecture (designing reusable prompt templates for repeated tasks).", keyPoints: ["Context + Task + Format + Examples = effective prompt structure", "Chain-of-thought: 'Let's think step by step' improves reasoning", "Few-shot examples dramatically improve output quality", "Prompt libraries save time and ensure consistency"], practiceTask: "Create a personal prompt library of 10 optimized prompts for tasks you do regularly. For each, test at least 3 variations, measure quality, and document the best version with explanation of why it works.", reflectionQuestion: "Is prompt engineering a temporary skill that will become unnecessary, or a permanent new form of human-computer communication?" },
              ],
            },
            {
              id: "ha-2", title: "AI Ethics & Governance", description: "Building AI systems that serve humanity.",
              lessons: [
                { id: "ha-2-1", title: "Bias, Fairness & Responsible AI", duration: "55 min", content: "AI systems inherit and amplify the biases present in their training data. Hiring algorithms that discriminate, facial recognition that fails on dark skin, language models that perpetuate stereotypes — these aren't bugs, they're predictable outcomes of building systems on biased data without adequate safeguards.\n\nResponsible AI requires: diverse training data, bias auditing at every stage, human oversight for high-stakes decisions, transparency about capabilities and limitations, and ongoing monitoring after deployment. The goal isn't perfect AI — it's AI systems with known limitations and appropriate guardrails.", keyPoints: ["AI bias reflects and amplifies societal biases in training data", "Fairness has multiple mathematical definitions — they often conflict", "Transparency requirements vary by risk level of the application", "Human oversight is essential for high-stakes AI decisions"], practiceTask: "Audit an AI system you use regularly for potential biases. Test it with diverse inputs, document any patterns of unfairness, and propose specific technical and process changes to address them.", reflectionQuestion: "Who should be responsible when an AI system causes harm — the developer, the deployer, the user, or the AI itself?" },
              ],
            },
          ],
        },
      },
      {
        id: "bridge",
        name: "Bridge",
        title: "AI Strategy Mentor",
        tagline: "Navigating the AI transformation",
        personality: "Strategic, organizational, change-oriented. Bridge helps leaders and teams navigate the AI transformation with clarity and purpose.",
        avatar: "🌉",
        initials: "BR",
        envTheme: { bg: "#08081a", accent: "#818cf8", mood: "strategic" },
        voiceConfig: { pitch: 1.05, rate: 0.95, voiceHint: "female" },
        specialties: ["AI Strategy", "Change Management", "AI Governance", "Team Augmentation", "AI Roadmapping"],
        greeting: "Hello! I'm Bridge, your AI strategy mentor. Every organization is asking 'how do we use AI?' — but the real question is 'how do we become an AI-augmented organization?' I'll help you think strategically about AI adoption, team transformation, and building sustainable competitive advantage through human-AI collaboration.",
        encouragement: [
          "That AI strategy roadmap shows executive-level thinking!",
          "You're connecting AI capability to business value — that's the key.",
          "Your change management approach will make adoption actually stick.",
        ],
        course: {
          id: "bridge-strategy",
          title: "AI Strategy & Organizational Transformation",
          overview: "Learn to develop AI strategies for teams and organizations. From identifying high-value use cases to managing change and measuring ROI, build the leadership skills for the AI era.",
          totalDuration: "25 hours",
          learningDuration: "4–6 weeks",
          difficulty: "Advanced",
          modules: [
            {
              id: "as-1", title: "AI Strategy Foundations", description: "From AI hype to AI value.",
              lessons: [
                { id: "as-1-1", title: "Identifying High-Value AI Use Cases", duration: "55 min", content: "Not every problem should be solved with AI. The best AI use cases have three characteristics: high volume (the task happens frequently enough to justify investment), data availability (relevant data exists or can be collected), and tolerance for imperfection (the consequences of AI errors are manageable).\n\nThe framework for evaluating AI opportunities: map every process in terms of data intensity, repetitiveness, current cost, and impact of errors. High data + high repetition + high cost + low error impact = ideal AI candidate. Then rank by strategic value and implementation difficulty.", keyPoints: ["Not every problem benefits from AI — be selective", "Best candidates: high volume, data-rich, error-tolerant tasks", "Start with internal productivity gains before customer-facing AI", "Pilot projects should demonstrate value within 90 days"], practiceTask: "Map 10 processes in an organization you know well. Score each on data availability, repetitiveness, current cost, and error tolerance. Identify the top 3 AI opportunities and create a 90-day pilot plan for the highest-value one.", reflectionQuestion: "Why do so many AI projects fail to deliver value? What can you learn from the pattern of failure?" },
              ],
            },
          ],
        },
      },
      // ── Third mentor: Muse ──
      {
        id: "muse",
        name: "Muse",
        title: "Creative AI & Generative Tools Mentor",
        tagline: "AI is the most powerful creative instrument ever built",
        personality: "Imaginative, experimental, multi-disciplinary. Muse explores the creative frontier of AI — using generative tools for art, music, writing, design, and entirely new forms of expression.",
        avatar: "🎭",
        initials: "MU",
        envTheme: { bg: "#0a0814", accent: "#a78bfa", mood: "creative" },
        voiceConfig: { pitch: 1.12, rate: 0.95, voiceHint: "female" },
        specialties: ["Generative AI Art", "AI Music", "Creative AI Workflows", "Multi-Modal AI", "AI-Augmented Design"],
        greeting: "Welcome! I'm Muse, your creative AI mentor. Generative AI isn't replacing artists — it's giving us the most powerful creative instrument in human history. I'll teach you to use AI tools for visual art, music, writing, and design — not as a shortcut, but as a creative amplifier. Let's make something beautiful.",
        encouragement: [
          "That creative AI workflow produces results no single tool could achieve!",
          "Your prompt crafting for visual generation is becoming genuinely artistic.",
          "You're using AI as a collaborator, not a replacement — that's the right relationship.",
        ],
        course: {
          id: "muse-creative",
          title: "Creative AI: Art, Music & Expression",
          overview: "Explore the creative frontier of generative AI. Learn to use AI tools for visual art, music composition, writing, and design. Develop creative workflows that combine human artistic vision with AI generative power.",
          totalDuration: "24 hours",
          learningDuration: "4–6 weeks",
          difficulty: "Beginner" as const,
          modules: [
            {
              id: "cai-1", title: "Visual AI & Generative Art", description: "Creating with AI image generation.",
              lessons: [
                { id: "cai-1-1", title: "The Art of AI Image Generation", duration: "55 min", content: "AI image generation (Midjourney, DALL-E, Stable Diffusion) works by learning the statistical relationship between text descriptions and images from billions of examples. The result: you can describe any image in words and the AI will generate it.\n\nBut 'generate any image' is like saying a piano can 'play any music.' The instrument is simple; mastery takes practice. Effective AI art requires understanding composition, style vocabulary, technical parameters (aspect ratio, style weight, chaos), and iterative refinement.", keyPoints: ["Prompt specificity directly correlates with output quality", "Style references are more effective than style descriptions", "Iterative refinement: generate → evaluate → modify → regenerate", "Understanding composition principles elevates AI art from random to intentional"], practiceTask: "Create a series of 5 AI-generated images on a single theme. For each, document your prompt evolution (at least 3 iterations), explain your artistic choices, and annotate what makes the final version successful.", reflectionQuestion: "Is AI-generated art 'real' art? Where does creativity reside — in the idea, the execution, or the curation?" },
                { id: "cai-1-2", title: "Multi-Modal Creative Workflows", duration: "55 min", content: "The most powerful creative AI workflows combine multiple tools. Generate concept art with Midjourney, refine in Photoshop with AI-assisted editing, animate with Runway, add music with Suno or Udio, and compose with AI-assisted video editing. Each tool in the chain adds a layer of creative control.\n\nThe human's role shifts from executor to director. You provide the creative vision, the emotional intent, and the quality judgment. AI provides execution speed, variation, and technical capability. Together, a single person can produce work that previously required a studio.", keyPoints: ["Multi-tool workflows multiply creative capability exponentially", "The human role shifts from executor to creative director", "Each AI tool excels at different aspects of the creative pipeline", "Workflow design is itself a creative skill"], practiceTask: "Create a complete creative piece using at least 3 different AI tools in a pipeline. Document each step, explain your tool choices, and analyze where the human creative decisions were most important.", reflectionQuestion: "As AI handles more of the technical execution, what new creative skills become essential?" },
              ],
            },
            {
              id: "cai-2", title: "AI for Writing & Music", description: "Generative tools for language and sound.",
              lessons: [
                { id: "cai-2-1", title: "AI-Augmented Writing & Music Composition", duration: "50 min", content: "AI writing tools (GPT-4, Claude, Gemini) are most powerful as thinking partners, not replacement writers. Use them for brainstorming, outlining, exploring alternative framings, getting unstuck, and rapid first drafts that you then heavily edit. The best AI-augmented writing preserves your voice while leveraging AI's speed and breadth.\n\nAI music tools (Suno, Udio, AIVA) are following the same trajectory as AI image generation. Describe a mood, genre, and structure, and the AI generates a complete composition. For creators, this means custom music for videos, podcasts, and projects — without licensing costs or musical training.", keyPoints: ["AI writing tools work best as thinking partners, not ghostwriters", "The edit-from-AI-draft workflow is faster than blank-page writing", "AI music tools enable custom compositions for any creative project", "Maintaining authentic voice requires heavy human editing of AI drafts"], practiceTask: "Write a 1000-word essay using AI as a collaborator. Use the AI for brainstorming, outlining, and generating a first draft. Then substantially rewrite it in your own voice. Compare the AI draft with your final version.", reflectionQuestion: "When you heavily edit an AI-generated draft, who is the author? Does it matter?" },
              ],
            },
          ],
        },
      },
    ],
  },
  // ════════════════════════════════════════════
  // 9. Personal Training & Fitness Coaching
  // ════════════════════════════════════════════
  {
    id: "personal-training",
    slug: "personal-training",
    label: "Personal Training",
    tagline: "Master human movement, strength, biomechanics & coaching",
    description: "From functional anatomy, resistance training, and progressive overload to movement screening, injury prevention, client psychology, and business building — master the art and science of elite personal training.",
    icon: Dumbbell,
    color: "#ea580c",
    gradient: "from-amber-600 via-orange-500 to-rose-600",
    mentors: [
      {
        id: "atlas",
        name: "Atlas",
        title: "Master Strength & Conditioning Coach",
        isMaster: true,
        tagline: "Strength is a skill — build it with precision and purpose",
        personality: "Disciplined, biomechanically rigorous, deeply encouraging. Atlas combines sports science with decades of coaching under the iron to turn lifting into a precise, transformative craft.",
        avatar: "🏋️",
        initials: "AT",
        envTheme: { bg: "#100904", accent: "#f97316", mood: "iron" },
        voiceConfig: { pitch: 0.95, rate: 1.0, voiceHint: "male" },
        specialties: ["Strength & Conditioning", "Biomechanics & Kinetics", "Progressive Overload", "Periodization", "Compound Lifting Mastery"],
        greeting: "Welcome! I am Atlas, your Master Strength & Conditioning mentor. Strength is not merely moving load from point A to point B — it is the highest expression of human biomechanics, neuromuscular coordination, and joint longevity. Whether you are coaching an athlete to podium performance or helping a client build pain-free functional resilience, the rules of progressive overload, moment arms, and force vectors never change. Let us master the iron.",
        encouragement: [
          "Your biomechanical eye is getting sharp — you spotted the knee valgus immediately!",
          "That periodization plan balances fatigue and adaptation with master-level precision.",
          "You are coaching the movement, not just counting reps. That is the hallmark of an elite coach.",
        ],
        course: {
          id: "atlas-strength",
          title: "The Science of Strength & Conditioning",
          overview: "Master functional anatomy, force vectors, barbell mechanics, and periodization. Learn to assess movement, cue clients with clarity, manage training volume, and design world-class strength programs.",
          totalDuration: "32 hours",
          learningDuration: "6–8 weeks",
          difficulty: "Intermediate",
          modules: [
            {
              id: "sc-1",
              title: "Functional Anatomy & Biomechanical Fundamentals",
              description: "The skeletal, muscular, and nervous systems under load.",
              lessons: [
                {
                  id: "sc-1-1",
                  title: "Skeletal-Muscular Architecture & Force Vectors",
                  duration: "55 min",
                  content: "Understanding human movement begins with the musculoskeletal levers that produce force. Muscles do not simply pull bones; they generate internal moments around joint axes that must overcome external resistance.\n\nEvery exercise presents a specific line of force relative to the center of mass. In a barbell squat, the line of gravity drops vertically through the mid-foot. The perpendicular distance from that line to each joint axis (hip, knee, ankle) determines the moment arm and thus which muscle groups work hardest.\n\nWhen you coach, your job is to manipulate these levers: adjusting stance width, bar placement (high bar vs. low bar), and grip width to align forces favorably with client anatomy.",
                  keyPoints: [
                    "Muscles produce internal torque to balance external moment arms",
                    "The bar path must remain over the mid-foot for biomechanical equilibrium",
                    "Individual limb ratios (femur vs. torso length) dictate ideal movement geometry",
                    "Understanding prime movers vs. synergists and stabilizers prevents overuse injuries"
                  ],
                  practiceTask: "Film yourself or a training partner performing 5 reps of a barbell squat from the side. Trace the vertical bar path and measure the relative distance to the hip and knee joints at parallel depth.",
                  reflectionQuestion: "Why is forcing every client into an identical squat stance biomechanically flawed?"
                },
                {
                  id: "sc-1-2",
                  title: "Joint Levers, Moment Arms & Mechanical Advantage",
                  duration: "50 min",
                  content: "The human body operates primarily on third-class levers: the effort is applied between the fulcrum and the load. While this sacrifices mechanical advantage (requiring muscles to generate immense force), it maximizes range of motion and angular velocity.\n\nA classic example is the bicep curl: the elbow is the fulcrum, the bicep insertion on the radius is the effort (just inches from the elbow), and the dumbbell in the hand is the load. When the forearm is parallel to the ground (at 90 degrees of flexion), the moment arm of the dumbbell is at its maximum, creating the peak point of mechanical difficulty.\n\nMaster trainers understand resistance curves and match them with muscle strength curves using free weights, cables, and accommodating resistance like bands and chains.",
                  keyPoints: [
                    "Third-class levers trade force output for velocity and range of motion",
                    "Peak resistance occurs when the moment arm perpendicular to gravity is longest",
                    "Strength curves vary: ascending (squat), descending (hamstring curl), or bell-shaped (bicep curl)",
                    "Cables and bands alter resistance profiles to overload different ranges"
                  ],
                  practiceTask: "Compare the resistance curve of a dumbbell lateral raise versus a cable lateral raise set at hip height. Diagram where peak tension occurs in each exercise.",
                  reflectionQuestion: "How can understanding resistance curves help you choose the best exercise for hypertrophy versus athletic power?"
                },
                {
                  id: "sc-1-3",
                  title: "Neuromuscular Adaptations & Energy Systems",
                  duration: "60 min",
                  content: "In the first 4 to 8 weeks of resistance training, strength gains are overwhelmingly neurological, not hypertrophic. The central nervous system learns to coordinate motor units through rate coding (firing frequency), motor unit recruitment according to Henneman's Size Principle, and reducing antagonist co-contraction.\n\nEnergy systems power this work: the phosphagen (ATP-CP) system powers maximal efforts under 10 seconds; anaerobic glycolysis fuels 30 to 90 second bouts; and oxidative phosphorylation drives aerobic recovery between sets.\n\nProgramming appropriate rest intervals between sets (2 to 5 minutes for strength vs. 60 to 90 seconds for metabolic conditioning) dictates which physiological pathway is stimulated and how fully phosphocreatine stores replenish.",
                  keyPoints: [
                    "Early strength gains are driven by motor unit synchronization and rate coding",
                    "Henneman's Size Principle dictates smaller slow-twitch units recruit before fast-twitch units",
                    "ATP-CP restoration requires 3 to 5 minutes of rest for complete phosphocreatine resynthesis",
                    "Mitochondrial density and capillary beds govern work capacity and inter-set recovery"
                  ],
                  practiceTask: "Design an energy-system specific training session for an athlete needing both maximal 3-rep strength and repeat-sprint ability.",
                  reflectionQuestion: "Why do beginner lifters experience rapid strength jumps without noticeable muscle cross-sectional area growth?"
                }
              ]
            },
            {
              id: "sc-2",
              title: "The Foundational Compound Movements",
              description: "Coaching mastery for the squat, hinge, push, and pull patterns.",
              lessons: [
                {
                  id: "sc-2-1",
                  title: "The Squat Pattern: Depth, Stance & Torso Mechanics",
                  duration: "65 min",
                  content: "The squat is a foundational human movement pattern and the premier lower-body compound exercise. It requires simultaneous ankle dorsiflexion, knee flexion, and hip flexion while maintaining a rigid, neutral spinal column under compressive load.\n\nKey coaching checkpoints include: establishing a tripod foot (heel, 1st metatarsal, 5th metatarsal), initiating with hips and knees simultaneously, driving the knees in line with the toes to create hip abduction torque, and descending until the hip crease dips just below the top of the patella.\n\nRecognizing and correcting butt wink (posterior pelvic tilt at the bottom of the squat) requires identifying whether the cause is anatomical acetabular depth, restricted ankle mobility, or motor control breakdown.",
                  keyPoints: [
                    "Tripod foot pressure creates the kinetic foundation for whole-body stability",
                    "Torso inclination is governed by femur-to-torso ratio, not personal preference",
                    "Butt wink is often caused by ankle dorsiflexion limitations rather than hamstring tightness",
                    "Verbal cues should be external (e.g. spread the floor) rather than internal"
                  ],
                  practiceTask: "Conduct a 5-minute squat coaching clinic with a volunteer. Identify one limiting factor (ankle, hip, or bracing) and apply an immediate corrective cue.",
                  reflectionQuestion: "Why are external cues ('push the floor away') more effective for motor learning than internal cues ('contract your quadriceps')?"
                },
                {
                  id: "sc-2-2",
                  title: "The Hip Hinge & Deadlift: Posterior Chain Dominance",
                  duration: "60 min",
                  content: "The hip hinge is the king of posterior chain recruitment, activating the gluteus maximus, hamstrings, and erector spinae. Unlike the squat, the hip hinge maximizes hip displacement backward while minimizing forward knee travel.\n\nIn the conventional deadlift, the setup is critical: the bar sits over the mid-foot (1 inch from shins), the lifter pulls the slack out of the barbell, engages the lats (protecting the lumbar spine via the thoracolumbar fascia), and wedges the hips into position before initiating the pull.\n\nThe lockout is achieved by squeezing the glutes forward into the bar, not by hyperextending the lumbar spine.",
                  keyPoints: [
                    "The hip hinge is horizontal hip translation with soft knees, distinct from knee-dominant squatting",
                    "Engaging the lats creates isometric stiffness across the entire spinal column",
                    "Pulling the slack out of the bar removes eccentric whip and establishes starting tension",
                    "Lockout requires full hip extension via gluteal contraction without spinal hyperextension"
                  ],
                  practiceTask: "Teach the wall tap hip-hinge drill to a beginner. Ensure their shins remain vertical while their hips travel backward to touch the wall 6 inches behind them.",
                  reflectionQuestion: "When would you prescribe a trap bar deadlift or Romanian deadlift over a conventional barbell deadlift from the floor?"
                },
                {
                  id: "sc-2-3",
                  title: "Horizontal & Vertical Pressing: Shoulder Complex & Scapular Rhythm",
                  duration: "55 min",
                  content: "Pressing strength requires understanding the scapulohumeral rhythm: for every 2 degrees of glenohumeral elevation, the scapula must rotate upward by 1 degree. When pressing overhead, the scapulae must upwardly rotate, elevate, and posterior tilt.\n\nIn the bench press, the scapulae must remain retracted and depressed into the bench to provide a solid, stable shelf and open the subacromial space. The grip should create stacked wrists directly above vertical forearms at the bottom touchpoint.\n\nOverhead pressing demands full thoracic extension and glenohumeral mobility; without it, clients will compensate by hyperextending the lumbar spine, placing undue shear stress on the lower back.",
                  keyPoints: [
                    "Bench press stability relies on active scapular retraction and depression",
                    "Overhead pressing requires dynamic scapular upward rotation and thoracic extension",
                    "Stacked wrist and elbow joints ensure optimal vertical force transmission",
                    "Leg drive in the bench press creates whole-body kinetic rigidity"
                  ],
                  practiceTask: "Assess overhead press form in the sagittal plane. Check whether the client can lock out a barbell directly over the crown of the head without anterior pelvic tilt or rib flare.",
                  reflectionQuestion: "Why is pressing from an unstable surface (like a Swiss ball) counterproductive for developing maximal upper-body strength?"
                }
              ]
            },
            {
              id: "sc-3",
              title: "Program Design, Periodization & Fatigue",
              description: "Designing periodized programs that produce consistent, long-term progression.",
              lessons: [
                {
                  id: "sc-3-1",
                  title: "Progressive Overload: Volume, Intensity & Frequency",
                  duration: "60 min",
                  content: "Progressive overload is the cornerstone of all physical adaptation: the body only adapts when exposed to a stimulus greater than it has previously encountered. This can be achieved through increasing load (intensity), total sets and reps (volume), exercise frequency, or density (work completed in less time).\n\nFor hypertrophy, training volume is the primary driver, typically within 10 to 20 challenging sets per muscle group per week. For strength, intensity (% of 1RM) and neurological specificity take precedence.\n\nEvery increase in stimulus must be balanced against systemic recovery capability to avoid non-functional overreaching.",
                  keyPoints: [
                    "Overload can be achieved through load, volume, movement quality, or density",
                    "Weekly volume thresholds between 10-20 hard sets per muscle group maximize hypertrophy",
                    "Intensity of effort (RIR 1-3) ensures high-threshold motor unit recruitment",
                    "More volume is only better if the client has the systemic recovery bandwidth to adapt"
                  ],
                  practiceTask: "Audit an existing 4-week client program. Calculate total weekly set volume per muscle group and project a 5% progressive volume/intensity increase over month two.",
                  reflectionQuestion: "How do you distinguish between functional overreaching that leads to supercompensation and chronic overtraining?"
                },
                {
                  id: "sc-3-2",
                  title: "Periodization Models: Linear, Daily Undulating & Block",
                  duration: "65 min",
                  content: "Periodization is the systematic planning of athletic training to achieve peak performance at specific points while mitigating injury risk. There are three primary paradigms:\n\n1. Linear Periodization: Progresses from high-volume, low-intensity hypertrophy work toward low-volume, high-intensity strength and peaking. Ideal for beginners and intermediate athletes.\n\n2. Daily Undulating Periodization (DUP): Varies volume and intensity within each weekly microcycle (e.g., Monday Hypertrophy, Wednesday Strength, Friday Power). Highly effective for preventing training plateaus.\n\n3. Block Periodization: Concentrated training mesocycles focusing on one primary biological adaptation at a time (Accumulation -> Transmutation -> Realization).",
                  keyPoints: [
                    "Linear periodization develops an aerobic/hypertrophic base before peaking intensity",
                    "DUP prevents neurological accommodation by undulating stimulus within the week",
                    "Block periodization utilizes residual training effects for advanced competitors",
                    "The simplest periodization model that drives progress is always the best model to use"
                  ],
                  practiceTask: "Draft an 8-week DUP microcycle for an intermediate lifter training 3 days per week with Squat, Bench Press, and Deadlift.",
                  reflectionQuestion: "Why does an advanced athlete require block periodization while a novice makes faster progress on simple linear progression?"
                },
                {
                  id: "sc-3-3",
                  title: "Fatigue Management, RPE/RIR & Deload Protocols",
                  duration: "55 min",
                  content: "Fitness and fatigue are two sides of the Banister Impulse-Response Model: every training bout increases fitness, but it also increases fatigue. Because fatigue dissipates faster than fitness, planned deloads unmask true adaptation.\n\nSubjective autoregulation using RPE (Rating of Perceived Exertion) and RIR (Reps in Reserve) allows trainers to adjust load according to daily readiness. An RPE 8 means the client could perform exactly 2 more reps before technical failure (2 RIR).\n\nDeload weeks (typically reducing volume by 50% while holding intensity around 80%) should be scheduled every 4 to 8 weeks depending on training age, age, life stress, and sleep quality.",
                  keyPoints: [
                    "The Fitness-Fatigue model demonstrates that real performance is Fitness minus Fatigue",
                    "RIR/RPE autoregulates training around life stressors, sleep, and nutrition variances",
                    "Deloads allow connective tissue remodeling, central nervous system recovery, and glycogen replenishment",
                    "Ignoring early signs of systemic fatigue leads to plateaus, tendonitis, and burnout"
                  ],
                  practiceTask: "Create a deload protocol for a client experiencing joint achiness, elevated resting heart rate, and stalled lift numbers after a 6-week heavy strength block.",
                  reflectionQuestion: "How does teaching a client RIR empower them to make smarter decisions during independent workouts?"
                }
              ]
            }
          ]
        }
      },
      {
        id: "kaya",
        name: "Kaya",
        title: "Movement Screening & Corrective Exercise Coach",
        tagline: "Move well before you move often — restore the body's natural balance",
        personality: "Attentive, holistic, biomechanically intuitive. Kaya diagnoses postural imbalances, eliminates compensations, and unlocks pain-free athletic longevity.",
        avatar: "🧘",
        initials: "KA",
        envTheme: { bg: "#0d0a08", accent: "#fb923c", mood: "alignment" },
        voiceConfig: { pitch: 1.08, rate: 0.96, voiceHint: "female" },
        specialties: ["Corrective Exercise", "Functional Movement Screen", "Postural Assessment", "Joint Mobility", "Injury Prevention"],
        greeting: "Hello! I am Kaya, your corrective exercise and movement screening mentor. Loading dysfunction only produces stronger dysfunction. My mission is to teach you how to look at human movement like a master detective — spotting subtle kinetic chain breaks, restoring joint mobility, and programming corrective drills so your clients move with effortless grace and zero pain. Let us build resilience from the inside out.",
        encouragement: [
          "Your kinetic chain assessment caught the root cause, not just the symptom!",
          "That corrective sequence restored hip internal rotation smoothly.",
          "You understand that stability and mobility are two sides of the same coin.",
        ],
        course: {
          id: "kaya-corrective",
          title: "Corrective Exercise & Movement Screening",
          overview: "Learn systematic movement assessments (FMS, Overhead Squat), diagnose upper and lower crossed syndromes, and implement the 4-phase corrective exercise continuum to eliminate pain and restore function.",
          totalDuration: "26 hours",
          learningDuration: "4–6 weeks",
          difficulty: "Beginner",
          modules: [
            {
              id: "ce-1",
              title: "Kinetic Chain Analysis & Movement Screening",
              description: "Systematic protocols for uncovering movement compensations.",
              lessons: [
                {
                  id: "ce-1-1",
                  title: "The Kinetic Chain & Joint-by-Joint Concept",
                  duration: "50 min",
                  content: "The human body is an interconnected chain of segments where action at one joint directly influences adjacent joints. Michael Boyle and Gray Cook popularized the Joint-by-Joint concept, which reveals an alternating pattern of mobility and stability throughout the body:\n\n- Foot: Stability\n- Ankle: Mobility (sagittal)\n- Knee: Stability\n- Hip: Mobility (multi-planar)\n- Lumbar Spine: Stability\n- Thoracic Spine: Mobility\n- Scapula: Stability\n- Glenohumeral: Mobility\n\nWhen a mobile joint becomes restricted (such as stiff ankles or tight hips), the body forces the adjacent stable joint (the knee or lower back) to compensate by moving outside its intended plane, precipitating chronic pain and acute injury.",
                  keyPoints: [
                    "The body alternates between mobile and stable joints from foot to cervical spine",
                    "Loss of ankle mobility causes knee valgus and lumbar flexion compensations",
                    "The lumbar spine requires isometric stiffness, not excessive mobility under load",
                    "Treating the site of pain without addressing adjacent joint function fails to cure dysfunction"
                  ],
                  practiceTask: "Map out the Joint-by-Joint checklist for a client presenting with non-specific lower back stiffness during running or squatting. Where are the likely mobility restrictions?",
                  reflectionQuestion: "Why is treating only the painful joint usually addressing the victim rather than the criminal?"
                },
                {
                  id: "ce-1-2",
                  title: "Upper & Lower Crossed Syndromes Diagnosis",
                  duration: "55 min",
                  content: "Vladimir Janda identified predictable patterns of muscular imbalance resulting from prolonged sedentary postures like desk work:\n\n1. Upper Crossed Syndrome: Hyperactive and shortened pectorals and upper trapezius/levator scapulae cross with inhibited, weakened deep neck flexors and middle/lower trapezius and serratus anterior. Results in forward head posture, rounded shoulders, and thoracic kyphosis.\n\n2. Lower Crossed Syndrome: Hyperactive, shortened hip flexors (iliopsoas, rectus femoris) and lumbar erectors cross with inhibited, lengthened gluteus maximus and deep abdominal core. Results in anterior pelvic tilt, hyperlordosis, and hamstring overactivity.\n\nPersonal trainers must inhibit and lengthen the overactive culprits before strengthening the underactive stabilizers.",
                  keyPoints: [
                    "Janda's crossed syndromes reveal reciprocal inhibition patterns across posture",
                    "Upper Crossed: tight chest/neck extensors inhibit lower traps and deep neck flexors",
                    "Lower Crossed: tight hip flexors reciprocally inhibit glute contraction",
                    "Strengthening a muscle without first lengthening its antagonist is ineffective"
                  ],
                  practiceTask: "Conduct a static postural assessment on yourself or a partner from anterior, posterior, and lateral views. Note any signs of upper or lower crossed syndrome.",
                  reflectionQuestion: "How does reciprocal inhibition explain why clients who sit all day struggle to feel their glutes fire during squats?"
                },
                {
                  id: "ce-1-3",
                  title: "The Overhead Squat Assessment: A Systematic Diagnostic",
                  duration: "60 min",
                  content: "The Overhead Squat Assessment (OHSA) is the gold standard dynamic movement screen in sports medicine and personal training. By placing the arms overhead and squatting, the client challenges the entire kinetic chain simultaneously.\n\nView the client from three angles over 5 repetitions:\n1. Anterior View: Look at the feet (turn out?) and knees (move inward/valgus or outward/varus?).\n2. Lateral View: Look at the LPHC (excessive forward lean? low back arches or rounds?) and upper body (arms fall forward?).\n3. Posterior View: Look at the heels (rise off floor?) and pelvis (asymmetrical weight shift?).\n\nEach compensation directly points to probable overactive and underactive muscle pairings.",
                  keyPoints: [
                    "Overhead Squat challenges mobility and stability across every major kinetic checkpoint",
                    "Knees caving inward (valgus) indicates overactive adductors and underactive gluteus medius",
                    "Arms falling forward indicates tight latissimus dorsi and pectorals restricting shoulder flexion",
                    "Excessive forward lean points to restricted ankle dorsiflexion and overactive hip flexors"
                  ],
                  practiceTask: "Film an Overhead Squat assessment of 5 reps from anterior and lateral views. Document every kinetic compensation observed and list the primary overactive and underactive muscles.",
                  reflectionQuestion: "What is the difference between a mobility restriction and a motor control dysfunction during an assessment?"
                }
              ]
            },
            {
              id: "ce-2",
              title: "Mobility, Stability & Motor Control",
              description: "Restoring range of motion, joint centration, and core bracing.",
              lessons: [
                {
                  id: "ce-2-1",
                  title: "Ankle Dorsiflexion & Hip Capsule Mobility Protocols",
                  duration: "55 min",
                  content: "Ankle dorsiflexion and hip capsule mobility are the twin gateways to lower body movement quality. Normal ankle dorsiflexion requires at least 35-40 degrees or a 4-inch knee-to-wall distance with heel planted.\n\nIf dorsiflexion is restricted by talocrural joint mechanics, banded joint distractions (mobilization with movement) help the talus glide posteriorly. If soft tissue is the limiter, foam rolling and dynamic stretching of the gastrocnemius and soleus restore glide.\n\nFor the hip, addressing the posterior and anterior joint capsules via 90/90 hip mobility drills, frog stretches, and quadruped rockbacks restores essential internal and external rotation.",
                  keyPoints: [
                    "The knee-to-wall test quantifies functional ankle dorsiflexion reliably",
                    "Banded joint distraction targets capsular stiffness; stretching targets muscle tissue",
                    "Hip internal rotation (minimum 35 degrees) is essential for pain-free squatting and running",
                    "90/90 transitions develop active end-range control, not just passive flexibility"
                  ],
                  practiceTask: "Perform the knee-to-wall dorsiflexion test on both ankles. Measure difference in inches. Apply a 3-minute banded mobilization protocol and re-test.",
                  reflectionQuestion: "Why is passive stretching alone insufficient for creating lasting mobility improvements in training clients?"
                },
                {
                  id: "ce-2-2",
                  title: "Thoracic Spine Mobility & Core Bracing Dynamics",
                  duration: "50 min",
                  content: "The thoracic spine is designed for rotation and extension, while the lumbar spine demands stiffness. Desk posture stiffens the thoracic spine into kyphosis, forcing the neck and lower back into excessive motion.\n\nEffective thoracic mobilization uses foam roller extensions (anchoring the ribs down), quadruped thread-the-needles, and side-lying open books.\n\nOnce thoracic mobility is restored, core stability must be built. The core is an anatomical cylinder: diaphragm at top, pelvic floor at bottom, transverse abdominis wrapped around, and multifidus behind. Dr. Stuart McGill's Big 3 (Modified Curl-Up, Side Plank, Bird Dog) builds 360-degree muscular endurance without spinal flexion.",
                  keyPoints: [
                    "Thoracic extension allows proper shoulder overhead position without lumbar hyperextension",
                    "Diaphragmatic breathing generates intra-abdominal pressure (IAP) to protect the spine",
                    "The core is primarily an anti-movement stabilizer (anti-flexion, anti-extension, anti-rotation)",
                    "McGill's Big 3 builds endurance in spinal stabilizers with minimal joint shear stress"
                  ],
                  practiceTask: "Coach a client through McGill's Big 3 with zero compensatory pelvic rotation or spinal flexion. Emphasize breathing while maintaining isometric core tension.",
                  reflectionQuestion: "Why are sit-ups and spinal flexion crunches poor choices for clients with lower back sensitivity?"
                },
                {
                  id: "ce-2-3",
                  title: "Scapulothoracic Stability & Rotator Cuff Centration",
                  duration: "55 min",
                  content: "The shoulder joint sacrifices bony stability for maximal mobility, making muscular centration vital. The rotator cuff (supraspinatus, infraspinatus, teres minor, subscapularis) acts as dynamic ligaments, pulling the humeral head snugly into the shallow glenoid fossa.\n\nThe scapula acts as the moving base of support. If the serratus anterior and lower trapezius are dormant, the scapula wings or anteriorly tilts, causing subacromial impingement during pressing.\n\nCorrective protocols incorporate prone Y-T-W raises, face pulls with external rotation, and serratus wall slides to groove scapulothoracic upward rotation and rotator cuff integrity.",
                  keyPoints: [
                    "Rotator cuff muscles compress and centrate the humeral head in the glenoid fossa",
                    "Serratus anterior upwardly rotates the scapula and glues it against the ribcage",
                    "Face pulls and band pull-aparts counteract habitual rounded-shoulder postures",
                    "Stable scapulae provide the foundation for pain-free heavy pressing"
                  ],
                  practiceTask: "Assess scapular rhythm during a wall slide. Look for symmetry, winging of the medial border, and shrugging of the upper traps. Prescribe 2 corrective drills.",
                  reflectionQuestion: "How does a lack of thoracic extension impair healthy scapular upward rotation?"
                }
              ]
            },
            {
              id: "ce-3",
              title: "Corrective Exercise Programming & Prehab",
              description: "Translating screening data into structured warmups and recovery protocols.",
              lessons: [
                {
                  id: "ce-3-1",
                  title: "The 4-Phase Continuum: Inhibit, Lengthen, Activate, Integrate",
                  duration: "55 min",
                  content: "The NASM Corrective Exercise Continuum is a proven 4-stage systematic process for correcting neuromuscular imbalances:\n\n1. Inhibit: Self-myofascial release (foam rolling, massage ball) reduces overactive neural drive to hypertonic muscles for 30-90 seconds.\n2. Lengthen: Static or neuromuscular stretching increases tissue extensibility and resets muscle spindle sensitivity.\n3. Activate: Isolated strengthening exercises (e.g. banded clamshells, chin tucks) re-awaken dormant motor units.\n4. Integrate: Multi-joint functional movements (e.g. squat to press, single-leg deadlift) reteach the central nervous system to coordinate the corrected motor patterns under load.",
                  keyPoints: [
                    "Inhibit relaxes hyperactive motor units via autogenic inhibition",
                    "Lengthen resets resting muscle sarcomere length without losing power",
                    "Activate targets isolated dormant stabilizers before compound work",
                    "Integrate encodes the new neuromuscular pattern into whole-body movement"
                  ],
                  practiceTask: "Build a complete 4-phase corrective protocol for a client exhibiting pronounced knee valgus during squatting.",
                  reflectionQuestion: "Why will skipping the Integrate step cause the client to revert to old movement habits as soon as they lift heavy?"
                },
                {
                  id: "ce-3-2",
                  title: "Prehab Protocols for Lower Back, Knees & Shoulders",
                  duration: "50 min",
                  content: "Prehabilitation is the proactive strengthening and conditioning of vulnerable tissues before injury occurs. The three most common areas of breakdown in training are the lumbar spine, patellofemoral joint, and shoulder girdle.\n\nLower back prehab centers on glute max activation, hip mobility, and anti-extension core endurance. Knee prehab focuses on VMO (vastus medialis) firing, terminal knee extensions (TKEs), and hip abductor strength to control femur rotation. Shoulder prehab utilizes rotator cuff external rotation, band distractions, and scapular pushups.\n\nPrehab should be enjoyable, time-efficient (5 to 10 minutes), and performed before every training session.",
                  keyPoints: [
                    "Prehab addresses individual weak links before heavy training stressors are applied",
                    "Glute strength and ankle mobility protect the knee joint from shear stress",
                    "Rotator cuff prehab prevents subacromial bursitis and impingement",
                    "Consistency in prehab yields compounded resilience over years of training"
                  ],
                  practiceTask: "Design a 7-minute prehab routine for an overhead athlete or swimmer with previous history of shoulder impingement.",
                  reflectionQuestion: "How do you explain the value of prehab exercises to a client who only wants to lift heavy?"
                },
                {
                  id: "ce-3-3",
                  title: "Seamless Integration: From Correctives to Main Workouts",
                  duration: "50 min",
                  content: "A major mistake novice personal trainers make is treating corrective exercise as a separate, boring 45-minute rehab session. Clients want to train, sweat, and build strength.\n\nThe elite method is seamless integration: use corrective exercises as targeted warmup primers, and as active rest fillers between heavy working sets (e.g., performing band pull-aparts or ankle mobilizations while resting between deadlift sets).\n\nThis optimizes gym time, keeps the heart rate elevated, and reinforces good movement patterns right when the nervous system is primed.",
                  keyPoints: [
                    "Correctives should be embedded directly into dynamic warmups and inter-set rest",
                    "Active rest pairings (e.g., bench press paired with thoracic rotations) maximize session efficiency",
                    "Clients maintain high motivation when corrective work supports their performance goals",
                    "Progression means gradually reducing corrective volume as movement quality becomes automatic"
                  ],
                  practiceTask: "Take a standard 45-minute hypertrophy workout and integrate 3 corrective exercise fillers into the rest periods without adding extra session time.",
                  reflectionQuestion: "How does weaving correctives into rest intervals enhance workout flow and client compliance?"
                }
              ]
            }
          ]
        }
      },
      {
        id: "vance",
        name: "Vance",
        title: "Fitness Coaching Psychology & Client Transformation Mentor",
        tagline: "The best workout plan is the one your client actually executes",
        personality: "Empathetic, business-savvy, motivational. Vance focuses on the human side of personal training — behavioral psychology, client communication, nutrition coaching, and building a thriving coaching practice.",
        avatar: "⚡",
        initials: "VA",
        envTheme: { bg: "#080b10", accent: "#f59e0b", mood: "empowering" },
        voiceConfig: { pitch: 1.0, rate: 1.0, voiceHint: "male" },
        specialties: ["Client Behavior Change", "Motivational Interviewing", "Nutritional Coaching", "Client Intake & Retention", "Fitness Business Strategy"],
        greeting: "Hey there! I am Vance, your client transformation and fitness business mentor. The greatest technical knowledge in the world means nothing if you cannot inspire a client to show up on Monday morning or make peace with their nutrition. I will teach you how to listen deeply, overcome client resistance, navigate body composition plateaus, and build a flourishing personal training brand that changes lives and sustains your career. Let us make human transformation your life's work.",
        encouragement: [
          "That motivational interviewing question opened up your client's real why!",
          "Your nutritional guidance strikes the perfect balance of science and sustainability.",
          "Building client trust through empathy — that is why your retention will be extraordinary.",
        ],
        course: {
          id: "vance-coaching",
          title: "Client Transformation & Fitness Coaching Mastery",
          overview: "Master the psychological tools of fitness coaching: motivational interviewing, habit architecture, client onboarding, nutrition guidance for body recomposition, and building a sustainable, high-income training practice.",
          totalDuration: "28 hours",
          learningDuration: "6–8 weeks",
          difficulty: "Beginner",
          modules: [
            {
              id: "fc-1",
              title: "Behavioral Psychology & Habit Architecture",
              description: "How clients change, adhere, and break through mental resistance.",
              lessons: [
                {
                  id: "fc-1-1",
                  title: "Stages of Change & The Habit Loop in Fitness",
                  duration: "55 min",
                  content: "The Prochaska Transtheoretical Model explains why clients fail when given advanced routines too early. People move through 5 stages of change: Precontemplation, Contemplation, Preparation, Action, and Maintenance.\n\nIf a client is in Contemplation (thinking about exercising but hesitant), handing them a 5-day brutal workout program will trigger overwhelm and dropout. You must meet the client where they are.\n\nHabits follow a 4-part neurological loop: Cue -> Craving -> Response -> Reward. Master coaches make the cues obvious, the responses easy, and the rewards immediate and emotionally satisfying.",
                  keyPoints: [
                    "Matching training demands to the client's current Stage of Change prevents early dropout",
                    "Habit stacking attaches a new fitness behavior to an existing automatic daily habit",
                    "Reducing friction in the first 2 minutes of a workout guarantees consistency",
                    "Intrinsic motivation compounds over time, whereas guilt and fear burn out within weeks"
                  ],
                  practiceTask: "Interview a partner about a health habit they have struggled to adopt. Determine their current Stage of Change and design a micro-step for the next 7 days.",
                  reflectionQuestion: "Why does relying on willpower alone almost always fail in long-term client habit formation?"
                },
                {
                  id: "fc-1-2",
                  title: "Motivational Interviewing: Eliciting Client Autonomy",
                  duration: "60 min",
                  content: "Telling clients what to do produces resistance. Asking clients powerful, open-ended questions helps them discover their own reasons for change. This is the essence of Motivational Interviewing (MI).\n\nKey MI skills follow the OARS framework:\n- Open-ended questions: 'What would having more energy allow you to do with your children?'\n- Affirmations: Recognizing client strengths, efforts, and past successes.\n- Reflective listening: Mirroring back feelings to ensure the client feels deeply understood.\n- Summarizing: Tying together client ambivalence and personal motivation.\n\nWhen clients voice their own arguments for change, adherence rates skyrocket.",
                  keyPoints: [
                    "The righting reflex (trying to fix a client with advice) breeds defensiveness",
                    "OARS framework builds unconditional positive regard and client trust",
                    "Change talk vs. sustain talk: guide the client toward articulating their own reasons to act",
                    "Autonomy-supportive coaching fosters lifelong self-efficacy"
                  ],
                  practiceTask: "Role-play a client consultation where the client states they do not have time to exercise. Use only open-ended questions and reflective listening to guide them to a self-discovered solution.",
                  reflectionQuestion: "How does shifting from an authoritarian instructor to a collaborative guide change your client relationship?"
                },
                {
                  id: "fc-1-3",
                  title: "Environmental Design & Overcoming Workout Resistance",
                  duration: "50 min",
                  content: "Environment is the invisible hand that shapes human behavior. Clients do not lack motivation; their living and working environments make poor choices frictionless and healthy choices difficult.\n\nCoaching environmental design means helping clients redesign their physical and digital spaces: setting gym clothes out the night before, pre-packing wholesome snacks, deleting distracting apps during workout windows, and scheduling workouts like non-negotiable executive meetings.\n\nWhen workout resistance arises (rainy days, stressful meetings), having a fallback 'Floor Workout' (a 15-minute bare minimum routine) preserves the identity of consistency.",
                  keyPoints: [
                    "Design environments that make healthy choices the path of least resistance",
                    "The 'Never Miss Twice' rule keeps temporary slips from becoming permanent derailments",
                    "A 15-minute floor routine preserves habit momentum when life chaos hits",
                    "Social environments either pull clients forward or drag them back into old patterns"
                  ],
                  practiceTask: "Audit your client's daily routine. Identify three environmental friction points that derail their workouts or nutrition and implement physical environment redesigns.",
                  reflectionQuestion: "Why is maintaining a 15-minute bare-minimum workout better than skipping a scheduled session entirely?"
                }
              ]
            },
            {
              id: "fc-2",
              title: "Evidence-Based Nutrition & Body Composition",
              description: "Guiding clients on energy balance, macronutrients, and metabolic adaptation.",
              lessons: [
                {
                  id: "fc-2-1",
                  title: "Energy Balance, BMR & Calculating Accurate TDEE",
                  duration: "55 min",
                  content: "Energy balance is governed by the first law of thermodynamics: energy cannot be created or destroyed, only converted. Total Daily Energy Expenditure (TDEE) consists of:\n\n1. Basal Metabolic Rate (BMR): ~60-70% of daily energy expended at rest.\n2. Non-Exercise Activity Thermogenesis (NEAT): ~15-30% of energy burned through daily movement, fidgeting, and walking.\n3. Thermic Effect of Food (TEF): ~8-10% of energy required to digest nutrients (highest for protein at 20-30%).\n4. Exercise Activity Thermogenesis (EAT): ~5-10% burned during intentional workouts.\n\nMost clients overestimate EAT and underestimate caloric intake. Trainers must calculate realistic deficits (300-500 kcal/day) that preserve lean mass while ensuring fat loss.",
                  keyPoints: [
                    "TDEE is composed of BMR, NEAT, TEF, and EAT",
                    "NEAT is the most variable and controllable component of energy expenditure",
                    "Moderate calorie deficits (10-20% below TDEE) safeguard metabolic health and muscle tissue",
                    "Tracking body weight trends over 14-day rolling averages smooths out water fluctuations"
                  ],
                  practiceTask: "Calculate BMR and TDEE for a 35-year-old, 180 lb client with 25% body fat using the Katch-McArdle formula. Prescribe target daily calorie intake for sustainable fat loss.",
                  reflectionQuestion: "Why is prescribing an aggressive 1,000-calorie deficit counterproductive for long-term body composition?"
                },
                {
                  id: "fc-2-2",
                  title: "Protein Targets, Macronutrient Splits & Nutrient Timing",
                  duration: "55 min",
                  content: "Protein is the foundational macronutrient for body recomposition. It provides essential amino acids for muscle protein synthesis (MPS) via the leucine trigger and boasts the highest satiety score and thermic effect.\n\nEvidence-based recommendations indicate 1.6 to 2.2 grams of protein per kilogram of total body weight (or 0.8 to 1.0g per pound) to maximize muscle retention during a caloric deficit.\n\nCarbohydrates fuel high-intensity glycolytic lifting sessions and replenish muscle glycogen, while dietary fats (minimum 0.6g/kg) are critical for endocrine hormone synthesis and lipid-soluble vitamin absorption.",
                  keyPoints: [
                    "1.6 to 2.2g/kg protein maximizes muscle protein synthesis and satiety",
                    "Distributing protein across 3 to 5 meals (each with 3g leucine) optimizes 24-hour MPS",
                    "Carbohydrates are protein-sparing and optimize training intensity and volume tolerance",
                    "Dietary fats are essential for testosterone, estrogen, and cellular membrane integrity"
                  ],
                  practiceTask: "Construct a daily macronutrient distribution for an athlete weighing 75kg aiming for lean muscle gain with 300 kcal surplus. Specify grams of protein, carbohydrate, and fat.",
                  reflectionQuestion: "When does nutrient timing around the workout window actually matter, and when is daily total intake the only priority?"
                },
                {
                  id: "fc-2-3",
                  title: "Managing Fat Loss Plateaus & Reverse Dieting",
                  duration: "50 min",
                  content: "During sustained caloric deficits, the body initiates adaptive thermogenesis: thyroid hormones (T3), leptin, and testosterone decrease while ghrelin (hunger hormone) increases. Simultaneously, spontaneous NEAT drops as the body conserves energy.\n\nWhen a client hits a weight loss plateau, trainers must distinguish between true metabolic adaptation and behavioral drift (untracked snacking, weekend overeating).\n\nIf true metabolic slowing has occurred, implementing a 1 to 2-week diet break at maintenance calories, or initiating a structured reverse diet (gradually increasing calories by 50-100 kcal/week) restores metabolic rate, hormones, and training performance.",
                  keyPoints: [
                    "Adaptive thermogenesis causes energy expenditure to decrease beyond what weight loss alone predicts",
                    "Unconscious decreases in NEAT are often the primary cause of stalled weight loss",
                    "Diet breaks at maintenance calories relieve psychological fatigue and reset hunger hormones",
                    "Reverse dieting gradually restores caloric intake while minimizing unwanted fat regain"
                  ],
                  practiceTask: "Formulate a strategy for a client who has been in a 500-calorie deficit for 16 weeks and whose weight loss has stalled for 3 consecutive weeks despite strict adherence.",
                  reflectionQuestion: "How do you navigate the emotional distress clients experience when stepping on the scale during a water-retention spike?"
                }
              ]
            },
            {
              id: "fc-3",
              title: "The Business & Career of Personal Training",
              description: "Client onboarding, retention systems, and building a sustainable coaching career.",
              lessons: [
                {
                  id: "fc-3-1",
                  title: "Client Intake, PAR-Q+ Screening & Expectation Alignment",
                  duration: "55 min",
                  content: "The initial consultation sets the trajectory for the entire coaching relationship. A professional intake protocol includes:\n\n1. Health Screening: PAR-Q+ (Physical Activity Readiness Questionnaire), medical clearance if indicated, previous injury history, and medication review.\n2. Lifestyle Audit: Occupation, sleep duration, daily stress levels, nutrition habits, and previous exercise experiences.\n3. SMART Goal Formulation: Transforming vague wishes ('I want to get fit') into Specific, Measurable, Achievable, Relevant, and Time-bound objectives.\n\nClarifying mutual expectations (cancellation policy, communication channels, client accountability) establishes clear professional boundaries from day one.",
                  keyPoints: [
                    "PAR-Q+ screening protects client safety and shields the trainer from legal liability",
                    "Uncovering past negative fitness experiences helps you avoid repeating previous trainers' mistakes",
                    "SMART goals provide objective benchmarks to celebrate progress",
                    "Transparent communication policies and boundary setting prevent trainer burnout"
                  ],
                  practiceTask: "Draft a comprehensive new client onboarding packet including PAR-Q+, liability waiver, lifestyle questionnaire, and service agreement.",
                  reflectionQuestion: "Why is asking 'What has stopped you from achieving your goals in the past?' the most revealing intake question?"
                },
                {
                  id: "fc-3-2",
                  title: "Client Retention, Milestone Celebrations & Community",
                  duration: "50 min",
                  content: "It costs 5 to 7 times more to acquire a new personal training client than to retain an existing one. High-earning trainers build retention into the fabric of their coaching.\n\nRetention is driven by feeling seen, valued, and continuously challenged. Implement non-scale victories (NSVs): celebrating that a client carried groceries without back pain, improved their resting heart rate, or achieved their first full pull-up.\n\nConduct formal 90-day progress reviews with visual comparisons, strength metric graphs, and re-evaluated goals to ensure the client always has a clear horizon ahead of them.",
                  keyPoints: [
                    "Client retention is the single greatest determinant of personal trainer income stability",
                    "Non-scale victories (energy, mobility, sleep, mood) reinforce value beyond the scale",
                    "Formal 90-day reviews prevent client complacency and demonstrate ongoing return on investment",
                    "Building client camaraderie through challenges and workshops fosters a community culture"
                  ],
                  practiceTask: "Create a 90-day progress review template featuring qualitative questions, strength milestones, body composition shifts, and new goal horizons.",
                  reflectionQuestion: "How does celebrating small daily micro-wins prevent clients from giving up when long-term goals take months to achieve?"
                },
                {
                  id: "fc-3-3",
                  title: "Hybrid, In-Person & Remote Online Training Business Models",
                  duration: "60 min",
                  content: "The modern fitness landscape has evolved far beyond trading hours for dollars on the gym floor. A resilient personal training business utilizes a diversified model:\n\n1. In-Person 1-on-1: Premium pricing, high touch, immediate tactile form correction.\n2. Semi-Private / Small Group: 2 to 4 clients sharing a coaching hour; higher hourly revenue for the coach and lower price point for clients.\n3. Hybrid Coaching: 1 in-person session weekly paired with 2-3 programmed sessions via mobile coaching software with video feedback.\n4. Remote Online Coaching: Scalable, location-independent, focused on asynchronous video form analysis, programming, and nutrition guidance.\n\nMastering digital coaching tools and ethical marketing allows trainers to build sustainable, 6-figure businesses with healthy work-life balance.",
                  keyPoints: [
                    "Trading hours for dollars creates a hard revenue ceiling and risks physical burnout",
                    "Hybrid coaching provides the perfect bridge of in-person connection and scalable software tracking",
                    "Asynchronous video form analysis delivers exceptional coaching without scheduling conflicts",
                    "Ethical marketing focuses on educational content and client case studies over hype"
                  ],
                  practiceTask: "Map out the pricing tiers and service deliverable breakdown for a hybrid personal training offering (1 weekly in-person session + full app-based programming).",
                  reflectionQuestion: "How can adopting a hybrid training model dramatically reduce trainer burnout while serving more clients effectively?"
                }
              ]
            }
          ]
        }
      }
    ]
  },
];
