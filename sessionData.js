// Full 29-session programme data
// Themes: "Regulate" (pink), "Relate" (yellow), "Reason" (green)
// Each session: { session, title, theme, tier, reflectionQ, reflectionOpts, videoLink, videoNote }
// videoLink: YouTube embed URL — null if video still needs sourcing

const sessionData = [
  // ─── TIER 1: REGULATE (sessions 1–6) ────────────────────────────────────
  {
    session: 1,
    title: "Regulate, relate, reason",
    theme: "Regulate",
    tier: 1,
    reflectionQ: "Think of a student you find genuinely difficult to support. Which of these feels closest to what you think when things go wrong?",
    reflectionOpts: [
      "A) They're choosing to behave this way",
      "B) Something's happening for them that I don't fully understand",
      "C) They need firmer boundaries and more consistent consequences",
      "D) I worry I'm part of the problem somehow"
    ],
    videoLink: "https://www.youtube.com/embed/_3is_3XHKKs",
    videoNote: "Introduction to the neurosequential model — Bruce Perry"
  },
  {
    session: 2,
    title: "Meet your brain",
    theme: "Regulate",
    tier: 1,
    reflectionQ: "When you are under real pressure at work, which part of you tends to take over?",
    reflectionOpts: [
      "A) The part that shuts down and goes quiet",
      "B) The part that gets snappy or short with people",
      "C) The part that keeps going on autopilot without really thinking",
      "D) I stay pretty much the same under pressure"
    ],
    videoLink: "https://www.youtube.com/embed/4-tcKYx24aA",
    videoNote: "Brain architecture and bottom-up development"
  },
  {
    session: 3,
    title: "The lookout system",
    theme: "Regulate",
    tier: 1,
    reflectionQ: "Is there a place, situation, or type of person that makes you feel instantly on guard — even when you know rationally you're safe?",
    reflectionOpts: [
      "A) Yes — and I can name it clearly",
      "B) Yes — but I'm not sure why",
      "C) Sometimes, in unpredictable moments",
      "D) Not really — I feel pretty safe in most situations"
    ],
    videoLink: "https://www.youtube.com/embed/USDBAjm08kE",
    videoNote: "Polyvagal theory and the social engagement system — Stephen Porges"
  },
  {
    session: 4,
    title: "The stress response in school",
    theme: "Regulate",
    tier: 1,
    reflectionQ: "Watch the BBC3 clip. Before you analyse it — what did you feel in your body as you watched it?",
    reflectionOpts: [
      "A) Tension — I felt the situation escalating physically",
      "B) Frustration — with the student, the staff, or the system",
      "C) Sadness — it felt like a moment of failure for everyone",
      "D) Detachment — I tried to watch it analytically"
    ],
    videoLink: "https://www.youtube.com/embed/kX3xO2J4Icg",
    videoNote: "Case study: a regulated, communicating pupil escalates to restraint when staff miss natural curiosity and listening (relate)"
  },
  {
    session: 5,
    title: "Early trauma & the brain",
    theme: "Regulate",
    tier: 1,
    reflectionQ: "How does knowing a student has experienced early trauma change — or not change — how you feel about their most challenging behaviour?",
    reflectionOpts: [
      "A) It changes it significantly — I feel more compassion and less frustration",
      "B) It helps intellectually but doesn't always change my gut reaction in the moment",
      "C) It creates a tension — I understand it but worry about lowering expectations",
      "D) I'm not sure it changes much in practice"
    ],
    videoLink: "https://www.youtube.com/embed/xYBUY1kZpf8",
    videoNote: "ACEs and the impact of childhood adversity — Nadine Burke Harris"
  },
  {
    session: 6,
    title: "Regulating the body",
    theme: "Regulate",
    tier: 1,
    reflectionQ: "You have 60 seconds before walking into a difficult conversation. Which of these do you actually do?",
    reflectionOpts: [
      "A) Take a breath and try to think through what I'll say",
      "B) Nothing — I just go in",
      "C) Feel anxious but push through it",
      "D) I have a small ritual that genuinely helps me"
    ],
    videoLink: "https://www.youtube.com/embed/SHC1ZiUu-9E",
    videoNote: "Introduction to mindfulness — present-moment awareness as a regulation tool"
  },

  // ─── TIER 2: RELATE (sessions 7–12) ─────────────────────────────────────
  {
    session: 7,
    title: "Why relating comes next",
    theme: "Relate",
    tier: 2,
    reflectionQ: "Think of a student you genuinely connected with who then made real progress. What came first — the connection or the progress?",
    reflectionOpts: [
      "A) The connection came first — progress followed naturally from it",
      "B) They happened together — hard to separate",
      "C) Progress came first — the connection grew through shared success",
      "D) I'm not sure the connection was the key factor"
    ],
    videoLink: "https://www.youtube.com/embed/COMwI2akgqM",
    videoNote: "Attachment, safety and the social engagement system"
  },
  {
    session: 8,
    title: "Empathy vs sympathy",
    theme: "Relate",
    tier: 2,
    reflectionQ: "When someone you care about is in pain, which do you find yourself doing more naturally?",
    reflectionOpts: [
      "A) Wanting to fix it — practical help feels like love",
      "B) Sitting with them in it — I can tolerate not fixing",
      "C) Looking for the bright side — I find it hard not to offer hope",
      "D) Going quiet — I'm not sure I say the right things"
    ],
    videoLink: "https://www.youtube.com/embed/1Evwgu369Jw",
    videoNote: "Empathy vs sympathy — Brené Brown animation"
  },
  {
    session: 9,
    title: "Why your ego thrives on conflict",
    theme: "Relate",
    tier: 2,
    reflectionQ: "Which ego state do you recognise most in yourself at work under pressure?",
    reflectionOpts: [
      "A) Critical Parent — I can hear myself getting sharp or judgemental",
      "B) Nurturing Parent — I tend toward rescue and over-caring",
      "C) Adapted Child — I comply and please even when I shouldn't",
      "D) Adult — I feel fairly grounded in most situations"
    ],
    videoLink: "https://www.youtube.com/embed/Zl2Z2XdSmqE",
    videoNote: "Why the ego feeds on conflict, drama and being right"
  },
  {
    session: 10,
    title: "Pears Family School",
    theme: "Relate",
    tier: 2,
    reflectionQ: "What's your honest first response to the idea that parents should come into school every week alongside their children?",
    reflectionOpts: [
      "A) Exciting — that level of integration could change everything",
      "B) Logistically daunting — I can see how much it would take",
      "C) Uncertain — I'm not sure all families would engage or benefit",
      "D) Envious — I wish something like this existed where I work"
    ],
    videoLink: "https://www.youtube.com/embed/7PaQWTNIgaE",
    videoNote: "Source: Pears Foundation / Pears Family School documentary or case study film"
  },
  {
    session: 11,
    title: "The power of relationships",
    theme: "Relate",
    tier: 2,
    reflectionQ: "In an honest moment — when someone is talking to you, what percentage of the time are you fully present rather than forming your response?",
    reflectionOpts: [
      "A) Mostly present — I genuinely find it easy to listen",
      "B) About half and half — I drift but come back",
      "C) Probably mostly composing my response if I'm honest",
      "D) It depends entirely on who is talking and whether I'm stressed"
    ],
    videoLink: "https://www.youtube.com/embed/kzvm1m8zq5g",
    videoNote: "How safe relationships release oxytocin, build belonging and support regulation"
  },
  {
    session: 12,
    title: "Relational practice in the classroom",
    theme: "Relate",
    tier: 2,
    reflectionQ: "Think of a recent staffroom conversation that didn't go the way you hoped. What do you think was really going on underneath it?",
    reflectionOpts: [
      "A) We were talking at crossed purposes — different ego states",
      "B) One of us was stressed and it contaminated the exchange",
      "C) There was a hidden agenda — things we weren't saying directly",
      "D) It was probably fine — I'm overthinking it"
    ],
    videoLink: "https://www.youtube.com/embed/1kPAzVIe8-E",
    videoNote: "Relational practice in everyday classroom interactions"
  },

  // ─── TIER 3: REASON (sessions 13–29) ─────────────────────────────────────
  {
    session: 13,
    title: "Why reasoning comes last",
    theme: "Reason",
    tier: 3,
    reflectionQ: "When do you notice reasoning becoming genuinely available to you after a hard moment — what does that shift feel like?",
    reflectionOpts: [
      "A) A physical settling — breathing slows, tension releases",
      "B) A mental clearing — I can suddenly see the situation more broadly",
      "C) A relational cue — someone I trust makes it feel safe to think again",
      "D) I'm not sure I've noticed the shift consciously before"
    ],
    videoLink: "https://www.youtube.com/embed/cNzkyFPA7Lc",
    videoNote: "Source video on cortex, executive function and the last-online-first-offline principle"
  },
  {
    session: 14,
    title: "What is metacognition?",
    theme: "Reason",
    tier: 3,
    reflectionQ: "When did you last genuinely think about how you were thinking — not just what you needed to do, but how you were going to approach it?",
    reflectionOpts: [
      "A) Recently — I'm fairly reflective about my own approach",
      "B) Occasionally — when something isn't working and I have to change tack",
      "C) Rarely — I tend to just get on with things",
      "D) This concept makes me realise I don't do it as much as I thought"
    ],
    videoLink: null,
    videoNote: "Source video on metacognition and self-regulated learning — EEF"
  },
  {
    session: 15,
    title: "The illusion of mastery",
    theme: "Reason",
    tier: 3,
    reflectionQ: "Be honest — have you ever felt confident about something at work and then been caught out by how little you actually knew?",
    reflectionOpts: [
      "A) Yes — and it was genuinely humbling",
      "B) Yes — but I caught myself before it became a problem",
      "C) Occasionally — usually in a new area I thought I understood",
      "D) I try to flag uncertainty rather than let it become an illusion"
    ],
    videoLink: null,
    videoNote: "Source video on retrieval practice and the testing effect — cognitive science"
  },
  {
    session: 16,
    title: "Am I ready to learn?",
    theme: "Reason",
    tier: 3,
    reflectionQ: "When you sit down with a student to do some focused work and they seem completely unavailable — what's your first instinct?",
    reflectionOpts: [
      "A) Try to engage them differently — change my approach",
      "B) Check in on how they are before we start",
      "C) Carry on — they need to learn to engage even when they're not feeling it",
      "D) It depends on the student and what I know about their day"
    ],
    videoLink: null,
    videoNote: "Source video on readiness, regulation and learning states"
  },
  {
    session: 17,
    title: "Choosing the right strategy",
    theme: "Reason",
    tier: 3,
    reflectionQ: "How do you currently help students choose a revision approach — or do they mostly just do what feels familiar?",
    reflectionOpts: [
      "A) I actively teach strategy selection — this is part of my role",
      "B) I signpost strategies but leave the choice to them",
      "C) Most students default to re-reading and I haven't changed that much",
      "D) Strategy instruction isn't really part of what I do"
    ],
    videoLink: null,
    videoNote: "Source video on retrieval practice, spaced learning and interleaving"
  },
  {
    session: 18,
    title: "How to practise: the right kind of effort",
    theme: "Reason",
    tier: 3,
    reflectionQ: "When learning something new yourself — do you lean toward comfortable practice or do you seek out the stretch that feels difficult?",
    reflectionOpts: [
      "A) Comfortable practice — I tend to consolidate what I know",
      "B) Deliberate stretch — I seek out the edge of my competence",
      "C) It varies — I oscillate between both",
      "D) I haven't thought about my own learning practice in those terms before"
    ],
    videoLink: null,
    videoNote: "Source video on deliberate practice and desirable difficulty — Robert Bjork"
  },
  {
    session: 19,
    title: "Smart Learning in the ISAP classroom",
    theme: "Reason",
    tier: 3,
    reflectionQ: "How do you talk about learning itself — the process of it — with the students you support?",
    reflectionOpts: [
      "A) Quite explicitly — I explain why we do things the way we do",
      "B) Implicitly — I model it but don't always name it",
      "C) Rarely — our focus is usually on the content rather than the process",
      "D) I hadn't thought about making the process visible before"
    ],
    videoLink: null,
    videoNote: "Source video on metacognitive coaching in alternative provision"
  },
  {
    session: 20,
    title: "Teaching for lost learning",
    theme: "Reason",
    tier: 3,
    reflectionQ: "What's the most honest thing you believe about a student who has missed two years of school — not professionally, but genuinely?",
    reflectionOpts: [
      "A) That the gap is real but absolutely bridgeable with the right support",
      "B) That it depends enormously on the student and the reasons for the absence",
      "C) That some of what was missed cannot be recovered in time for qualifications",
      "D) I'm still working out what I actually believe about this"
    ],
    videoLink: null,
    videoNote: "Source video on reintegration, catch-up pedagogy and reengagement"
  },
  {
    session: 21,
    title: "Growth mindset deepdive",
    theme: "Reason",
    tier: 3,
    reflectionQ: "Where do you have a fixed mindset — a quiet belief that you're just not the sort of person who can do a particular thing?",
    reflectionOpts: [
      "A) Something creative — art, music, that kind of thing",
      "B) Something technical — data, spreadsheets, systems",
      "C) Something relational — public speaking, difficult conversations",
      "D) I genuinely believe I can grow in most areas if I try"
    ],
    videoLink: null,
    videoNote: "Source video on growth mindset — Carol Dweck"
  },
  {
    session: 22,
    title: "Stress, scripts & the reasoning brain",
    theme: "Reason",
    tier: 3,
    reflectionQ: "Which TA Driver do you recognise most in yourself — and what does it cost you?",
    reflectionOpts: [
      "A) Be Strong — I find it very hard to show I'm struggling",
      "B) Please Others — I over-adapt and lose sight of my own needs",
      "C) Try Hard — I put in excessive effort even when it's not needed",
      "D) Be Perfect — I hold myself to standards that exhaust me",
      // Note: 5th option possible but opts array kept at 4 for consistency
    ],
    videoLink: null,
    videoNote: "Source video on TA Drivers and their physiological cost"
  },
  {
    session: 23,
    title: "Proactive self-care & protecting your joy",
    theme: "Reason",
    tier: 3,
    reflectionQ: "What is the thing you most reliably let go of when work gets hard — the thing that gives you joy or restoration — and how long has it been gone?",
    reflectionOpts: [
      "A) Physical — movement, sport, being outside",
      "B) Creative — music, making, writing",
      "C) Social — time with people I love or feel like myself with",
      "D) Quiet — solitude, stillness, just not being needed for a while"
    ],
    videoLink: null,
    videoNote: "Source video on proactive wellbeing and energy management"
  },
  {
    session: 24,
    title: "Managing compassion fatigue",
    theme: "Reason",
    tier: 3,
    reflectionQ: "Right now — honestly — how full is your tank?",
    reflectionOpts: [
      "A) Quite full — I feel resourced and sustained",
      "B) Half — I'm managing but not thriving",
      "C) Running low — I'm aware of depletion but pushing through",
      "D) Near empty — I'm not sure how sustainable this is"
    ],
    videoLink: null,
    videoNote: "Source video on compassion fatigue, secondary trauma and sustainable practice"
  },
  {
    session: 25,
    title: "Critical incident deepdive",
    theme: "Reason",
    tier: 3,
    reflectionQ: "Watch the BBC3 clip again — now through all three lenses. What do you see that you couldn't see in session 4?",
    reflectionOpts: [
      "A) The regulation failure — the exact moment the lookout system took over",
      "B) The relational failure — where the transaction crossed and escalated",
      "C) The reasoning failure — the point at which the cortex was no longer available",
      "D) All three — I can see the whole chain now"
    ],
    videoLink: null,
    videoNote: "BBC3 'An Incident in School' — source/license required (second exposure: full RRR + TA analysis)"
  },
  {
    session: 26,
    title: "Confidence in supporting others",
    theme: "Reason",
    tier: 3,
    reflectionQ: "What is the MHFA situation you feel least confident handling — and what specifically do you worry will happen?",
    reflectionOpts: [
      "A) Someone disclosing something serious — I worry I'll say the wrong thing",
      "B) Someone in acute crisis — I worry I'll panic",
      "C) Someone who denies there's a problem — I worry I'll make it worse by pushing",
      "D) A colleague rather than a student — it feels harder somehow"
    ],
    videoLink: null,
    videoNote: "Source: MHFA England confidence-building or case study video"
  },
  {
    session: 27,
    title: "Professional goals & personal wellness plan",
    theme: "Reason",
    tier: 3,
    reflectionQ: "What is one professional goal for next year that connects to something you genuinely value — not just something you think you should want?",
    reflectionOpts: [
      "A) Deepening a skill or approach I've started developing this year",
      "B) Building something — a resource, a relationship, a project",
      "C) Letting something go — a habit, a pattern, a way of working that doesn't serve me",
      "D) I'm still figuring out what I actually want — this question feels important"
    ],
    videoLink: null,
    videoNote: "Source video on values-based goal setting and professional identity"
  },
  {
    session: 28,
    title: "Letter to my future self",
    theme: "Reason",
    tier: 3,
    reflectionQ: "What do you most want to remember about who you are right now — before time and work change you further?",
    reflectionOpts: [
      "A) Something I believe that I want to hold onto",
      "B) Something I've learned this year that has genuinely shifted me",
      "C) Someone I've been moved by — a student, a family, a colleague",
      "D) Something I want to do differently that I haven't managed yet"
    ],
    videoLink: null,
    videoNote: "Guided reflection — no external video needed; provide quiet music and writing time"
  },
  {
    session: 29,
    title: "Celebration, affirmation & the golden thread",
    theme: "Reason",
    tier: 3,
    reflectionQ: "What is the gold in your crack this year — what break became a site of repair that you are genuinely proud of?",
    reflectionOpts: [
      "A) A relationship that broke and was repaired",
      "B) A moment of failure I learned something essential from",
      "C) A student or family I didn't give up on when it would have been easier",
      "D) Something inside me — a shift in how I see myself or this work"
    ],
    videoLink: null,
    videoNote: "Celebration session — student/staff voice, affirmation circle, optional graduation music"
  }
];

// Theme colour map
const themeColors = {
  Regulate: { bg: "#F9C6D0", text: "#8B1A2E", label: "pink" },
  Relate:   { bg: "#FFF3B0", text: "#7A6000", label: "yellow" },
  Reason:   { bg: "#C8E6C9", text: "#1B5E20", label: "green" }
};

// Helper: get all sessions for a given theme
function getSessionsByTheme(theme) {
  return sessionData.filter(s => s.theme === theme);
}

// Helper: get a single session by number
function getSession(n) {
  return sessionData.find(s => s.session === n);
}
