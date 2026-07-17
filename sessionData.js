// Full 18-session programme data
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
    title: "Emotion Coaching 1",
    theme: "Relate",
    tier: 2,
    reflectionQ: "Think of a student whose behaviour was clearly being driven by a strong feeling underneath it. In that moment, what did you find yourself doing first?",
    reflectionOpts: [
      "A) I noticed the feeling and tried to understand what was underneath it",
      "B) I focused on the behaviour first — correcting it before addressing anything emotional",
      "C) I felt for them, but wasn't sure how to help them name what they were feeling",
      "D) I held a firm boundary, even though I could see there was something more going on"
    ],
    videoLink: "https://www.youtube.com/embed/7KJa32r07xk",
    videoNote: "Emotion Coaching — notice, connect, listen & validate, help label, set limits"
  },
  {
    session: 10,
    title: "Emotion Coaching 2",
    theme: "Relate",
    tier: 2,
    reflectionQ: "Think about how you naturally respond when a student is upset AND breaking a rule at the same time. Which comes first for you, honestly?",
    reflectionOpts: [
      "A) The feeling — I tend to deal with the emotion and sometimes let the behaviour slide",
      "B) The behaviour — I address the rule first and the feeling later, if at all",
      "C) Both at once — though it can come out muddled",
      "D) It depends entirely on the student and the day"
    ],
    videoLink: "https://www.youtube.com/embed/UfoLcD8aHFA",
    videoNote: "Emotion Coaching in practice — attunement and the ABC (Acknowledge, Boundaries, Coaching)",
    explainer: "The ABC model gives you a way to carry Emotion Coaching into the heat of the moment. Acknowledge: notice the feeling underneath the behaviour and name it without judgement — \"I can see that something's really upset you\", \"I'm wondering if something's happened\". Boundaries: hold the limit while keeping the feeling acceptable — all feelings are OK; not all behaviours are. \"It's OK to be angry — it's not OK to kick the lockers.\" Coaching: once the student is settled enough to think, problem-solve together — what could they do differently the next time that feeling arrives? The order matters: acknowledgement comes first, because a student who feels heard is a student who can actually take in the boundary and the coaching."
  },
  {
    session: 11,
    title: "Emotion Coaching 3",
    theme: "Relate",
    tier: 2,
    graphicLabel: "Empathy × Guidance",
    graphic: `<svg viewBox="0 0 560 430" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Empathy and guidance quadrant diagram" style="width:100%;height:auto;font-family:inherit;">
      <rect x="60" y="20" width="240" height="180" rx="8" fill="rgba(244,67,54,0.14)"/>
      <rect x="304" y="20" width="240" height="180" rx="8" fill="rgba(76,175,80,0.28)" stroke="rgba(76,175,80,0.8)" stroke-width="2"/>
      <rect x="60" y="204" width="240" height="180" rx="8" fill="rgba(120,120,120,0.14)"/>
      <rect x="304" y="204" width="240" height="180" rx="8" fill="rgba(255,193,7,0.16)"/>
      <text x="180" y="95" text-anchor="middle" font-size="19" font-weight="700" fill="#C62828">Disapproving</text>
      <text x="180" y="120" text-anchor="middle" font-size="12.5" fill="var(--text-2,#555)">cold · punitive · no curiosity</text>
      <text x="180" y="138" text-anchor="middle" font-size="12.5" fill="var(--text-2,#555)">high guidance, low empathy</text>
      <text x="424" y="95" text-anchor="middle" font-size="19" font-weight="800" fill="#1B5E20">Emotion Coaching</text>
      <text x="424" y="120" text-anchor="middle" font-size="12.5" fill="var(--text-2,#555)">warm AND holds the challenge</text>
      <text x="424" y="138" text-anchor="middle" font-size="12.5" font-weight="700" fill="#2E7D32">high empathy, high guidance</text>
      <text x="180" y="285" text-anchor="middle" font-size="19" font-weight="700" fill="var(--text-3,#777)">Laissez-Faire</text>
      <text x="180" y="310" text-anchor="middle" font-size="12.5" fill="var(--text-2,#555)">disinterested · disengaged</text>
      <text x="180" y="328" text-anchor="middle" font-size="12.5" fill="var(--text-2,#555)">low guidance, low empathy</text>
      <text x="424" y="285" text-anchor="middle" font-size="19" font-weight="700" fill="#B8860B">Dismissing</text>
      <text x="424" y="310" text-anchor="middle" font-size="12.5" fill="var(--text-2,#555)">indulges the feeling · removes the challenge</text>
      <text x="424" y="328" text-anchor="middle" font-size="12.5" fill="var(--text-2,#555)">high empathy, low guidance</text>
      <line x1="302" y1="14" x2="302" y2="390" stroke="var(--text-3,#999)" stroke-width="1.5"/>
      <line x1="54" y1="202" x2="550" y2="202" stroke="var(--text-3,#999)" stroke-width="1.5"/>
      <line x1="60" y1="404" x2="544" y2="404" stroke="var(--text,#333)" stroke-width="2" marker-end="url(#arrowE)"/>
      <line x1="40" y1="384" x2="40" y2="20" stroke="var(--text,#333)" stroke-width="2" marker-end="url(#arrowG)"/>
      <defs>
        <marker id="arrowE" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="var(--text,#333)"/></marker>
        <marker id="arrowG" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="var(--text,#333)"/></marker>
      </defs>
      <text x="302" y="425" text-anchor="middle" font-size="13.5" font-weight="700" letter-spacing="2" fill="var(--text,#333)">EMPATHY</text>
      <text x="20" y="202" text-anchor="middle" font-size="13.5" font-weight="700" letter-spacing="2" fill="var(--text,#333)" transform="rotate(-90 20 202)">GUIDANCE</text>
    </svg>`,
    graphicCaption: "Two things are at work in every response to a struggling student: empathy — how well you tune in to the feeling — and guidance — how firmly you hold expectations and direction. High in both, the green quadrant, is Emotion Coaching. High guidance without empathy turns Disapproving: cold, punitive, with no natural curiosity about what's driving the behaviour. High empathy without guidance turns Dismissing: the emotion is indulged, the challenge taken away, expectations and aspirations quietly lowered. Low in both is Laissez-Faire: disinterested, disengaged teaching that shrugs off disengagement. The videos below show the three styles to avoid — watch for what's missing in each.",
    reflectionQ: "Under real pressure — end of a hard week, a class pushing every button — which quadrant do you honestly drift toward?",
    reflectionOpts: [
      "A) Guidance stays high but my empathy drops — I get colder and more punitive than I'd like",
      "B) Empathy stays high but my guidance drops — I let expectations slide to keep the peace",
      "C) Both drop — I disengage and just get through the lesson",
      "D) I mostly hold both, but it costs me real effort"
    ],
    videoLink: null,
    videos: [
      { link: "https://www.youtube.com/embed/XrcLR_rBolc", label: "Video 1 — The Disapproving style" },
      { link: "https://www.youtube.com/embed/oB1TDE-aFvA", label: "Video 2 — The Dismissing style" },
      { link: "https://www.youtube.com/embed/WeRZHZ6LAqo", label: "Video 3 — The Laissez-Faire style" }
    ]
  },
  {
    session: 12,
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

  // ─── TIER 3: REASON (sessions 13–18) ─────────────────────────────────────
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
    title: "Practical classroom strategies",
    theme: "Reason",
    tier: 3,
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
  {
    session: 15,
    title: "Smart Learning 1",
    theme: "Reason",
    tier: 3,
    reflectionQ: "When did you last genuinely think about how you were thinking — not just what you needed to do, but how you were going to approach it?",
    reflectionOpts: [
      "A) Recently — I'm fairly reflective about my own approach",
      "B) Occasionally — when something isn't working and I have to change tack",
      "C) Rarely — I tend to just get on with things",
      "D) This concept makes me realise I don't do it as much as I thought"
    ],
    videoLink: "https://www.youtube.com/embed/jBbpyWEk4kw",
    videoNote: "Smart Learning School — Introduction"
  },
  {
    session: 16,
    title: "Smart Learning 2",
    theme: "Reason",
    tier: 3,
    reflectionQ: "Be honest — have you ever felt confident about something at work and then been caught out by how little you actually knew?",
    reflectionOpts: [
      "A) Yes — and it was genuinely humbling",
      "B) Yes — but I caught myself before it became a problem",
      "C) Occasionally — usually in a new area I thought I understood",
      "D) I try to flag uncertainty rather than let it become an illusion"
    ],
    videoLink: "https://smartlearningschool.com/",
    videoNote: "Explore the Smart Learning School website — how the approach turns brain science into everyday study habits"
  },
  {
    session: 17,
    title: "Why your ego thrives on conflict",
    theme: "Reason",
    tier: 3,
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
    session: 18,
    title: "Kintsugi: the golden thread",
    theme: "Reason",
    tier: 3,
    reflectionQ: "Kintsugi mends broken pottery with gold, making the break itself part of the beauty — not something hidden. Where in your work this year has a break — a failure, a crisis, a hard year with a student or family — become something you're now genuinely proud of, rather than something you'd erase if you could?",
    reflectionOpts: [
      "A) A relationship that broke and was repaired — and the repair itself taught me something",
      "B) A moment I felt like I'd failed, that turned out to be exactly what someone needed",
      "C) A student or family I didn't give up on when it would have been easier to",
      "D) I'm still in the crack — I haven't reached the gold yet, and that's honest too"
    ],
    videoLink: "https://www.youtube.com/embed/EBUTQkaSSTY",
    videoNote: "Kintsugi philosophy introduction — beauty in imperfection and chaos; the golden thread is the staff; students are more beautiful for having survived the cracks"
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
