// ─── Types ───────────────────────────────────────────────────

export interface Author {
  name: string;
  avatar: string;
  location: string;
}

export interface CommunityPost {
  id: string;
  title: string;
  summary: string;
  body: string;
  image: string;
  author: Author;
  date: string;
  readTime: string;
  tags: string[];
  likes: number;
  comments: number;
  featured?: boolean;
}

export interface TrendingPost {
  id: string;
  title: string;
  author: string;
  likes: number;
  tag: string;
}

export interface UpcomingEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  type: "workshop" | "meetup" | "webinar" | "challenge";
}

// ─── Posts ────────────────────────────────────────────────────

export const communityPosts: CommunityPost[] = [
  {
    id: "post-1",
    title: "How I Climbed Kilimanjaro After Turning 60",
    summary:
      "At 62, I decided to prove that age is just a number. Here's the story of how I trained for 8 months and made it to the summit — and what it taught me about life.",
    body: `The idea first came to me during a routine check-up. My doctor said I was in decent shape "for my age," and something about the phrase lit a fire in me. For my age. As if age was a ceiling I was supposed to accept.

I went home that afternoon and searched "hardest hikes in the world." Kilimanjaro appeared on every list. 19,341 feet. Five climate zones. A mountain that doesn't require technical climbing but demands everything your body and mind have to give.

I started training the next morning. At first, it was humbling. A flight of stairs left me winded. A thirty-minute walk felt long. But I kept going — three days a week became five, flat walks became hill sprints, and within two months I was hiking six miles with a loaded pack.

The real training, though, was mental. I had to unlearn the story I'd been telling myself for decades: that my best years were behind me. Every morning I woke up sore, every time my knees ached on a descent, that old narrative whispered. And every time, I chose to keep walking.

Eight months later, I stood at the Uhuru Peak sign at dawn. The sun was rising over a sea of clouds below me, and the air was so thin I could barely breathe. I was crying — not from pain, but from the overwhelming realization that the only limits I'd ever had were the ones I'd accepted.

The descent took two days. My toenails turned black. My legs shook for a week. And I have never, in sixty-two years of living, felt more alive.

If you're reading this and you think you're too old, too out of shape, too anything — I want you to know that the mountain doesn't care about your story. It only asks one question: will you take the next step?`,
    image:
      "https://images.unsplash.com/photo-1611961547440-bde7c756990f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaWtlciUyMG1vdW50YWluJTIwc3VtbWl0JTIwa2lsaW1hbmphcm8lMjBhY2hpZXZlbWVudHxlbnwxfHx8fDE3NzIzMzc3NjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    author: { name: "Margaret Liu", avatar: "ML", location: "Portland, OR" },
    date: "Feb 22, 2026",
    readTime: "8 min read",
    tags: ["adventure", "resilience", "fitness"],
    likes: 342,
    comments: 47,
    featured: true,
  },
  {
    id: "post-2",
    title: "The Mural That Changed My Neighborhood",
    summary:
      "When I started painting the wall on 5th Street, I didn't expect it to become a gathering point. Now it's where neighbors meet, kids play, and strangers become friends.",
    body: `It started with a blank, graffiti-tagged wall that everyone walked past without a second glance. The building owner had given up trying to keep it clean. One afternoon I asked him if I could paint it instead. He shrugged and said, "Do whatever you want."

So I did.

I sketched a design that night — a sprawling scene of hands reaching toward each other across the wall, each hand a different color, each one holding something: a flower, a book, a tool, a child's drawing. I wanted it to feel like the neighborhood itself.

The first day I showed up with my brushes, three kids stopped to watch. By the second day, they were asking if they could help. By the end of the first week, I had a team of twelve — ranging from an eight-year-old girl named Sofia to a retired construction worker named Ray who mixed my paints with the precision of a chemist.

Something shifted on that block. People who had lived next door to each other for years and never spoken were suddenly standing together, watching the wall grow, talking about what it meant to them. A woman named Dolores brought tamales for the crew every Saturday. A teenager named Marcus, who everyone warned me was "trouble," turned out to be one of the most talented natural artists I'd ever seen.

The mural took six weeks. It spans forty-two feet. But the real thing it built wasn't on the wall — it was between the people who stood in front of it. Last month the city asked me to do three more. I said yes, on one condition: the neighborhood picks the design.

Art doesn't change the world from museums. It changes the world from street corners.`,
    image:
      "https://images.unsplash.com/photo-1665340826058-89f02430d90c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMHN0cmVldCUyMG11cmFsJTIwYXJ0aXN0JTIwcGFpbnRpbmclMjB3YWxsfGVufDF8fHx8MTc3MjMzNzc2Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    author: { name: "Carlos Rivera", avatar: "CR", location: "Austin, TX" },
    date: "Feb 18, 2026",
    readTime: "5 min read",
    tags: ["art", "community", "creativity"],
    likes: 218,
    comments: 31,
  },
  {
    id: "post-3",
    title: "Growing Food, Growing Hope: Our Community Garden Story",
    summary:
      "What began as a vacant lot is now a thriving garden feeding 40 families. Here's how we turned neglect into nourishment.",
    body: `The lot had been empty for three years. Weeds grew chest-high, and people used it as a shortcut and a dumping ground. I walked past it every morning on my way to the bus stop, and every morning I thought the same thing: what a waste.

One Saturday I brought a shovel. Just one shovel and a pair of gloves. I didn't have a plan. I just started clearing weeds in a ten-by-ten patch. My neighbor Keisha saw me from her porch and came over. "What are you doing?" she asked. "I don't know yet," I told her. "But I'm tired of looking at this mess."

By the end of that first weekend, four of us had cleared a quarter of the lot. I went to the city council the following Monday and asked about a community garden permit. They were skeptical — this neighborhood had a reputation for starting things and not finishing them. I told them we'd already started.

The permit came through in three weeks. A local hardware store donated lumber for raised beds. A retired biology teacher named Mr. Henderson taught us about soil pH and crop rotation. A group of Somali women from the apartments on Oak Street brought seeds from home — varieties of tomatoes and peppers I'd never seen.

That first harvest was small. A few handfuls of greens, some stubborn carrots, a pile of herbs. But we cooked together that evening in Keisha's backyard, and the food tasted like something more than vegetables. It tasted like proof that we could build something.

Three years later, the garden feeds forty families. We have a waiting list for plots. The Somali women sell their surplus at the Saturday farmer's market. Mr. Henderson runs a weekly workshop for kids. And the lot — the one everyone walked past without a second glance — is now the most visited spot in the neighborhood.

We didn't just grow food. We grew each other.`,
    image:
      "https://images.unsplash.com/photo-1630441466350-d053acf63b22?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBnYXJkZW4lMjB2ZWdldGFibGVzJTIwZ3Jvd2luZyUyMHRvZ2V0aGVyfGVufDF8fHx8MTc3MjMzNzc2Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    author: { name: "Amina Osei", avatar: "AO", location: "Detroit, MI" },
    date: "Feb 14, 2026",
    readTime: "6 min read",
    tags: ["community", "sustainability", "hope"],
    likes: 189,
    comments: 22,
  },
  {
    id: "post-4",
    title: "First in My Family to Graduate — Here's What It Means",
    summary:
      "Walking across that stage wasn't just for me. It was for my grandmother who never learned to read, my mother who worked three jobs, and every kid who was told they couldn't.",
    body: `When they called my name, I couldn't hear the applause. All I could hear was my mother's voice from when I was eight, sitting at the kitchen table after midnight, helping me with homework even though she couldn't read the textbook herself. "You're going to be the one, David," she'd say. "You're going to be the one who makes it."

My grandmother came to this country with nothing. Literally nothing — no money, no English, no documentation. She worked in garment factories for thirty years, hunched over a sewing machine in a room with no windows. She never learned to read. But every week she put five dollars in an envelope marked with my name.

When I got the acceptance letter from San Jose State, I didn't open it alone. I drove to my grandmother's apartment and we opened it together. She couldn't read the words, but she knew from my face. She held my hands and cried. "This is why I came here," she said in Vietnamese. "This moment."

College wasn't easy. I worked two jobs. I failed my first chemistry exam. I sat in lecture halls where I was the only person who looked like me. There were nights I almost quit — nights I thought maybe my family's story was one of survival, not success.

But I kept going. Not for me. For the five-dollar envelopes. For the midnight homework sessions. For every person in my family who worked so hard so I could sit in a classroom.

When I walked across that stage, I carried all of them with me. My diploma has one name on it. But it belongs to generations.

To every first-generation student reading this: your doubt is normal. Your fear is valid. And your graduation will mean more than you can possibly imagine — not just to you, but to everyone who comes after you.`,
    image:
      "https://images.unsplash.com/photo-1591218214141-45545921d2d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFkdWF0aW9uJTIwY2VyZW1vbnklMjBjZWxlYnJhdGlvbiUyMGhhcHB5JTIwc3R1ZGVudHxlbnwxfHx8fDE3NzIzMzc3NjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    author: { name: "David Nguyen", avatar: "DN", location: "San Jose, CA" },
    date: "Feb 10, 2026",
    readTime: "7 min read",
    tags: ["education", "family", "perseverance"],
    likes: 412,
    comments: 63,
    featured: true,
  },
  {
    id: "post-5",
    title: "Running Toward Recovery: My Marathon After Injury",
    summary:
      "Two years ago doctors said I might never run again. Last Sunday I crossed the finish line of my first marathon. This is my story of refusing to give up.",
    body: `The accident happened on a Tuesday — the kind of ordinary day that becomes a dividing line in your life. Before the accident. After the accident. A car ran a red light while I was crossing the street on my morning jog. I don't remember the impact. I remember waking up in a hospital bed with metal rods in my left leg and a doctor explaining, very gently, that I should "prepare for a new normal."

I was a runner. It was the only thing that made sense to me — the rhythm, the solitude, the way the world simplified itself into footfall and breath. Being told I might never run again wasn't just a medical prognosis. It felt like losing my identity.

The first six months were dark. Physical therapy was agonizing. Progress was measured in millimeters. I could walk to the bathroom. Then to the kitchen. Then to the end of the driveway. Every step was a negotiation between my body and my will.

At month eight, I took my first jogging step. It lasted three seconds before the pain stopped me. But those three seconds — those three seconds contained everything. Possibility. Defiance. A tiny, stubborn flame that refused to go out.

I built from there. Three seconds became thirty. Thirty became three minutes. I trained with a physiotherapist who never once told me to lower my expectations. She told me to listen to my body, respect its limits, and then push them — gently, consistently, relentlessly.

Last Sunday I stood at the start line of the Dublin Marathon. My leg was taped. My hands were shaking. And 26.2 miles later, I crossed the finish line in four hours and forty-seven minutes.

I wasn't fast. I wasn't graceful. But I was there. And every single step was a middle finger to that "new normal" I was supposed to accept.

If you're recovering from something — anything — I want you to know: the timeline doesn't matter. The pace doesn't matter. The only thing that matters is that you keep moving forward.`,
    image:
      "https://images.unsplash.com/photo-1562029216-441d384c1c63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJhdGhvbiUyMHJ1bm5lciUyMGNyb3NzaW5nJTIwZmluaXNoJTIwbGluZSUyMHN1bnJpc2V8ZW58MXx8fHwxNzcyMzM3NzYzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    author: { name: "Sophie Walsh", avatar: "SW", location: "Dublin, IE" },
    date: "Feb 6, 2026",
    readTime: "9 min read",
    tags: ["fitness", "resilience", "health"],
    likes: 287,
    comments: 39,
  },
  {
    id: "post-6",
    title: "Music Saved My Life — Now I Teach It to Kids",
    summary:
      "Growing up without direction, a guitar changed everything. Now I run a free music program for at-risk youth in my city.",
    body: `I was fifteen and heading nowhere fast. School felt irrelevant, home was complicated, and the streets offered the only community I knew. I was already making choices that would have consequences — the kind you don't fully understand until you're older and looking back with a pit in your stomach.

Then Mr. Callaway showed up. He was the new music teacher at our school — this tall, quiet man who wore the same three sweaters in rotation and spoke so softly you had to lean in to hear him. Most kids ignored him. But one afternoon he left a guitar on a chair in the hallway with a note taped to it: "This belongs to whoever needs it."

I took it home that night. I didn't know a single chord. I sat on my bed and made noise — ugly, random, frustrated noise. But I kept going. YouTube tutorials at the library. Playing until my fingers bled. Something about the guitar demanded my full attention, and for the first time in my life, I had something that asked nothing of me except to be present.

Within a year, I was playing at school assemblies. Within two years, I was writing songs. Mr. Callaway never made a big deal of it. He'd just nod and say, "Good. Keep going."

I'm thirty-one now. I didn't become a rock star. But I run a free music program on the South Side for kids who remind me of myself — kids who are smart and angry and haven't found their thing yet. We've got forty students, donated instruments, and a waiting list.

Last month, a sixteen-year-old named Darius played his first original song at our showcase. When he finished, the room was silent for a beat — and then it erupted. He had the same look on his face that I must have had all those years ago: surprise that something beautiful could come from his own hands.

Mr. Callaway was right. The guitar does belong to whoever needs it.`,
    image:
      "https://images.unsplash.com/photo-1758612897785-f6354d462789?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBwbGF5aW5nJTIwZ3VpdGFyJTIwdGVhY2hpbmclMjB5b3V0aCUyMG11c2ljfGVufDF8fHx8MTc3MjMzNzc3MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    author: { name: "James Okonkwo", avatar: "JO", location: "Chicago, IL" },
    date: "Feb 2, 2026",
    readTime: "6 min read",
    tags: ["music", "education", "community"],
    likes: 195,
    comments: 28,
  },
  {
    id: "post-7",
    title: "60 Years of Dancing Together",
    summary:
      "My grandparents have danced every Saturday night for sixty years. Their love story — told through movement — is the most beautiful thing I've ever witnessed.",
    body: `They met at a dance hall in 1966. Grandpa says he noticed her shoes first — red, with a small buckle. Grandma says she noticed his hands — steady and sure, even then. They danced three songs that first night. By the fourth, he asked for her phone number. She said no. He came back the next Saturday. And the next. On the fifth Saturday, she finally said yes.

They've danced every Saturday since.

I grew up watching them. As a child I thought it was just what old people did — put on music in the living room and move slowly around the furniture. I didn't understand what I was seeing. I didn't understand that those Saturday nights were a language — a way of saying things that words couldn't hold.

When Grandma was diagnosed with Parkinson's, we were terrified. The tremors. The stiffness. The slow erosion of control over her own body. The doctors prepared us for decline.

But every Saturday, Grandpa would put on their song — always "Besame Mucho" — and extend his hand. And something extraordinary would happen. The tremors would ease. Her body would remember. They would dance, not as well as before, not as long, but they would dance. The neurologist called it remarkable. Grandpa called it love.

Last Saturday I watched them from the doorway. She's smaller now. He's slower. They barely move — more of a sway than a dance. But his hand on her back is as steady as it was in 1966, and she leans into him with a trust that sixty years has only deepened.

I used to think their love story was about romance. Now I understand it's about commitment — the kind that shows up every Saturday, without fail, even when the music has changed and the body can't keep time.

They don't dance for anyone else. They dance for each other. And in doing so, they've taught everyone in our family what it means to love someone not just in the big moments, but in the quiet, repeated ones.`,
    image:
      "https://images.unsplash.com/photo-1767784097019-f19285b71a12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGRlcmx5JTIwY291cGxlJTIwZGFuY2luZyUyMHRvZ2V0aGVyJTIwYmFsbHJvb20lMjBqb3lmdWx8ZW58MXx8fHwxNzcyMzM3NzYzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    author: { name: "Elena Torres", avatar: "ET", location: "Madrid, ES" },
    date: "Jan 28, 2026",
    readTime: "5 min read",
    tags: ["love", "family", "inspiration"],
    likes: 521,
    comments: 72,
  },
  {
    id: "post-8",
    title: "From Lab Bench to Breakthrough: A Scientist's Quiet Triumph",
    summary:
      "After 7 years of failed experiments, our team finally developed a biodegradable material that could replace single-use plastics. Here's the untold story.",
    body: `Science doesn't usually happen in eureka moments. It happens in the long, quiet space between hope and frustration — in the Tuesday afternoons when the experiment fails for the two-hundredth time and you have to decide whether to run it again.

Our team spent seven years trying to develop a biodegradable polymer that could replace single-use plastics. Seven years. In that time, three team members left for industry jobs. Our funding was cut twice. I defended the project in front of a review board that openly questioned whether it was worth continuing.

The problem was elegantly simple and maddeningly complex: we needed a material that was strong enough to hold liquids, cheap enough to manufacture at scale, and capable of breaking down in soil within six months. Every solution we found for one requirement broke another.

Year one was optimistic. Year two was educational. Year three was humbling. Years four and five were a war of attrition against our own discouragement. My colleague Ravi used to say, "We're not failing. We're eliminating possibilities." Some weeks that felt heroic. Other weeks it felt delusional.

The breakthrough, when it came, was not dramatic. It was a Thursday morning. Our newest team member — a postdoc named Ananya who had joined only three months earlier — suggested a modification to our polymer chain that we had rejected in year two for being "too simple." She had a fresh perspective. She hadn't been told yet what wouldn't work.

We tested it. It held water. We tested it again. It held for weeks. We buried samples in three different soil types. Within four months, they were gone.

Seven years of work, and the answer had been hiding in an idea we'd dismissed because it seemed too obvious. Science is like that. The hardest problems often have simple solutions — they just require enough patience to circle back to them.

We published last month. The material is now being tested by two packaging companies. If it works at scale, it could eliminate millions of tons of plastic waste annually.

I don't know if it will change the world. But I know this: persistence is its own kind of brilliance.`,
    image:
      "https://images.unsplash.com/photo-1758573467240-f944226c2026?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2llbnRpc3QlMjBsYWJvcmF0b3J5JTIwcmVzZWFyY2glMjBtaWNyb3Njb3BlJTIwZGlzY292ZXJ5fGVufDF8fHx8MTc3MjMzNzc2NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    author: { name: "Dr. Priya Sharma", avatar: "PS", location: "Mumbai, IN" },
    date: "Jan 24, 2026",
    readTime: "10 min read",
    tags: ["science", "sustainability", "perseverance"],
    likes: 308,
    comments: 41,
  },
  {
    id: "post-9",
    title: "Building My Business from a Kitchen Table",
    summary:
      "With $200 and a borrowed laptop, I launched a business that now employs 12 people. It started with a simple question: what if I just tried?",
    body: `I remember the exact moment. I was sitting at my kitchen table at 11 PM, kids finally asleep, scrolling job listings that required experience I didn't have. I'd been out of the workforce for six years raising my children, and the gap on my resume felt like a canyon.

That night I didn't apply for a single job. Instead, I opened a blank document and wrote a question: "What can I do with what I already know?"

I knew how to organize. I knew how to plan. I knew how to manage chaos — three children under seven will teach you that. I also knew that every small business owner I'd ever met was drowning in administrative work they hated doing.

The next morning I printed twenty flyers at the library. "Virtual Assistant — Let me handle the details so you can focus on your business." I posted them at coffee shops, handed them out at the school gate, and left a stack at the community center. My "office" was the kitchen table. My "staff" was me, a borrowed laptop, and a free email account.

My first client was a local bakery owner named Pam who needed help with invoicing and scheduling. She paid me $15 an hour. I worked during nap times, after bedtime, and in every crack of free time I could find.

Within six months I had eight clients. Within a year I had to hire my first contractor — a woman named Jasmine who was in the exact same position I'd been in a year earlier. That felt better than any paycheck.

Today, three years later, we're a team of twelve. We serve over fifty businesses. We specialize in helping small companies that can't afford full-time administrative staff. Most of my team are women who, like me, were told the workforce didn't have room for them anymore.

The business didn't start with a brilliant idea or investor funding. It started with $200, a borrowed laptop, and a question I almost didn't ask: what if I just tried?

If you're sitting at your own kitchen table right now, wondering if you have what it takes — you do. Start before you're ready. Start small. Start scared. Just start.`,
    image:
      "https://images.unsplash.com/photo-1762341121611-1d6faa70fb2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGVudHJlcHJlbmV1ciUyMGxhcHRvcCUyMGhvbWUlMjBidXNpbmVzcyUyMHN0YXJ0dXB8ZW58MXx8fHwxNzcyMzM3NzY2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    author: { name: "Fatima Al-Rashid", avatar: "FA", location: "Toronto, CA" },
    date: "Jan 20, 2026",
    readTime: "7 min read",
    tags: ["entrepreneurship", "perseverance", "creativity"],
    likes: 276,
    comments: 35,
  },
];

// ─── Trending ────────────────────────────────────────────────

export const trendingPosts: TrendingPost[] = [
  { id: "t1", title: "60 Years of Dancing Together", author: "Elena Torres", likes: 521, tag: "love" },
  { id: "t2", title: "First in My Family to Graduate", author: "David Nguyen", likes: 412, tag: "education" },
  { id: "t3", title: "How I Climbed Kilimanjaro After 60", author: "Margaret Liu", likes: 342, tag: "adventure" },
  { id: "t4", title: "A Scientist's Quiet Triumph", author: "Dr. Priya Sharma", likes: 308, tag: "science" },
  { id: "t5", title: "Running Toward Recovery", author: "Sophie Walsh", likes: 287, tag: "fitness" },
];

// ─── Events ──────────────────────────────────────────────────

export const upcomingEvents: UpcomingEvent[] = [
  { id: "e1", title: "Storytelling Workshop", date: "Mar 5, 2026", time: "6:00 PM EST", location: "Virtual", type: "workshop" },
  { id: "e2", title: "Community Builders Meetup", date: "Mar 12, 2026", time: "7:00 PM EST", location: "New York, NY", type: "meetup" },
  { id: "e3", title: "30-Day Resilience Challenge", date: "Mar 15, 2026", time: "All Day", location: "Online", type: "challenge" },
  { id: "e4", title: "Finding Your Purpose — Webinar", date: "Mar 22, 2026", time: "12:00 PM EST", location: "Virtual", type: "webinar" },
];

// ─── All Tags ────────────────────────────────────────────────

export const allTags: string[] = [
  "adventure",
  "art",
  "community",
  "creativity",
  "education",
  "entrepreneurship",
  "family",
  "fitness",
  "health",
  "hope",
  "inspiration",
  "love",
  "music",
  "perseverance",
  "resilience",
  "science",
  "sustainability",
];
