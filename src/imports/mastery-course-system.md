We are building the Mastery Course System for Anything Humanly Possible.

Each course has its own Persona Mentor. Every persona is a master in their domain and teaches users in a confident, calm, powerful one‑on‑one style. This should feel like a private mentor, not a chatbot.

When a user enters a course (for example: Frontend Development, UI/UX Design, DevOps, Data Science, Storytelling, etc.), the assigned persona must greet the user with voice interaction immediately.

The persona should say something like:

"Welcome back. I am your Frontend Mentor. Tell me what you want to build today."

The system must work like this:

When the user asks a question (text or voice), it sends the message to Supabase backend.

Inside Supabase:

Call Google API using environment variable:
GOOGLE_API_KEY = "YOUR_GOOGLE_API_KEY"

Fetch relevant knowledge

Filter response based on the course domain

Return the formatted response in persona tone

Important:

Each persona must only answer within their domain.

Example:
If user is inside Design course and asks about Kubernetes,
the persona should respond:
"I focus on design mastery. Let's keep this session design-centered."

Each persona must have:

Confident tone

Mentor-like personality

Structured explanation

Step-by-step guidance

Adaptive difficulty based on user level

User profile should dynamically adjust teaching style based on:

Primary skill

Skill level

Completed modules

Learning speed

All learning must feel 1-on-1.

Voice interaction:
Every response returned from backend should trigger text-to-speech.
Persona voice must match personality:

DevOps → structured, precise

Design → calm, aesthetic

Entrepreneurship → energetic, visionary

Data Science → analytical, clear

Personal Growth → grounded, reflective

Dashboard system:

After login, user sees:

Progress percentage

Current module

Completed milestones

Activity history

Persona interaction memory

Mastery pathway visualization (Foundation → Growth → Mastery → Impact)

When a lesson is completed:

Save completion in Supabase

Update dashboard progress

Unlock next module

Public website navigation and Logged-in dashboard navigation must be separate.

Public site:
Inspiration, Achievements, Philosophy, Community preview.

Logged-in view:
Sidebar with:

Continue Learning

My Courses

Mastery Map

Community

Achievements

Profile

Everything must feel premium, calm, powerful, and immersive.

This is not a course platform.
This is a Human Potential Operating System.

Build the experience with emotional depth, clarity, and intelligence.

That’s your clean build prompt.

When you're ready, next we can design:

Persona voice personalities in detail

Dynamic teaching adaptation logic

Or full Supabase function example

You choose.