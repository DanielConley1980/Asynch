// Full 50-session programme data
// Themes: "Regulate" (pink), "Relate" (yellow), "Reason" (green)
// Each session: { session, title, theme, tier, reflectionQ, reflectionOpts, videoLink, videoNote }
// videoLink: YouTube embed URL — null if video still needs sourcing

const sessionData = [
  // ─── TIER 1: REGULATE (sessions 1–15) ────────────────────────────────────
  {
    session: 1,
    title: "The triangle: Regulate, Relate, Reason",
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
    videoLink: "https://www.youtube.com/embed/56c1uL_O8Jk",
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
    videoLink: null,
    videoNote: "BBC3 'An Incident in School' — source/license required (first exposure)"
  },
  {
    session: 5,
    title: "Early trauma & the over-sensitised brain",
    theme: "Regulate",
    tier: 1,
    reflectionQ: "How does knowing a student has experienced early trauma change — or not change — how you feel about their most challenging behaviour?",
    reflectionOpts: [
      "A) It changes it significantly — I feel more compassion and less frustration",
      "B) It helps intellectually but doesn't always change my gut reaction in the moment",
      "C) It creates a tension — I understand it but worry about lowering expectations",
      "D) I'm not sure it changes much in practice"
    ],
    videoLink: "https://www.youtube.com/embed/oPJtRDul0do",
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
    videoLink: "https://www.youtube.com/embed/jyxKxAlkuDE",
    videoNote: "Somatic regulation and the vagal brake"
  },
  {
    session: 7,
    title: "The window of tolerance",
    theme: "Regulate",
    tier: 1,
    reflectionQ: "At your most overwhelmed at work — which description fits best?",
    reflectionOpts: [
      "A) Racing, tense, snappy — everything feels urgent and too much",
      "B) Flat, withdrawn, going through the motions",
      "C) I oscillate — sometimes one, sometimes the other",
      "D) I don't often reach that level of overwhelm"
    ],
    videoLink: "https://www.youtube.com/embed/qxyVCjp48S4",
    videoNote: "Window of tolerance — Dan Siegel"
  },
  {
    session: 8,
    title: "Classroom regulation strategies",
    theme: "Regulate",
    tier: 1,
    reflectionQ: "Which regulation strategy do you already use — even if you've never called it that?",
    reflectionOpts: [
      "A) Something about the physical environment — seating, lighting, noise",
      "B) The way I speak — my tone, pace, volume",
      "C) Predictable routines that remove uncertainty",
      "D) I haven't consciously thought of what I do as regulation before"
    ],
    videoLink: "https://www.youtube.com/embed/rpJYACy8ZoI",
    videoNote: "Practical classroom regulation strategies"
  },
  {
    session: 9,
    title: "Around-school de-escalation",
    theme: "Regulate",
    tier: 1,
    reflectionQ: "Think of a moment when something you said or did made a situation worse without intending to. What do you think happened?",
    reflectionOpts: [
      "A) I escalated without realising — my tone or presence added fuel",
      "B) The student was already too far gone for anything to help",
      "C) I was too calm and it came across as dismissive",
      "D) I'm not sure — I couldn't read what was happening in the moment"
    ],
    videoLink: "https://www.youtube.com/embed/1Evwgu369Jw",
    videoNote: "De-escalation hierarchy and the escalation trap"
  },
  {
    session: 10,
    title: "Staying steady in the moment",
    theme: "Regulate",
    tier: 1,
    reflectionQ: "After a really hard interaction with a student or family, what do you actually do with what you're carrying?",
    reflectionOpts: [
      "A) Talk it through with a colleague",
      "B) Push it down and move on to the next thing",
      "C) Take it home — it replays in my head later",
      "D) I have a personal way of processing that mostly works"
    ],
    videoLink: "https://www.youtube.com/embed/TQW8t6w0Cy4",
    videoNote: "Co-regulation and staying regulated under pressure"
  },
  {
    session: 11,
    title: "Recognising distress in others",
    theme: "Regulate",
    tier: 1,
    reflectionQ: "A student or colleague seems different but hasn't said anything. What stops you from checking in?",
    reflectionOpts: [
      "A) Not wanting to intrude or make assumptions",
      "B) Not knowing what to say if they say yes",
      "C) Time and workload — there never seems to be a good moment",
      "D) I don't hesitate — I usually check in if something feels off"
    ],
    videoLink: null,
    videoNote: "Source video on recognising signs of distress in young people"
  },
  {
    session: 12,
    title: "Behavioural strategies toolkit",
    theme: "Regulate",
    tier: 1,
    reflectionQ: "What is the situation that most reliably tips you out of your window of tolerance at work?",
    reflectionOpts: [
      "A) A specific type of student behaviour",
      "B) A colleague or management interaction",
      "C) The cumulative weight of the day rather than one thing",
      "D) Something from outside work bleeding in"
    ],
    videoLink: "https://www.youtube.com/embed/qUcC71-W9Os",
    videoNote: "Practical regulation and trigger-mapping strategies"
  },
  {
    session: 13,
    title: "Calming the busy mind",
    theme: "Regulate",
    tier: 1,
    reflectionQ: "Your mind at its busiest — which description fits?",
    reflectionOpts: [
      "A) A loop of the same thoughts — replaying and solving nothing",
      "B) Jumping from thing to thing — hard to land on any of them",
      "C) Self-critical — replaying what went wrong or what I should have said",
      "D) Busy but mostly manageable — I can usually bring it back"
    ],
    videoLink: "https://www.youtube.com/embed/FXnPeKLrD-w",
    videoNote: "Mindfulness and the observing pause — Eckhart Tolle"
  },
  {
    session: 14,
    title: "Kintsugi — the golden thread",
    theme: "Regulate",
    tier: 1,
    reflectionQ: "Where in your own story is there gold in a crack — something that broke and is stronger or more beautiful for the repair?",
    reflectionOpts: [
      "A) Something professional — a failure or difficult period that taught me something essential",
      "B) Something personal — a relationship, loss, or challenge that changed me",
      "C) I haven't thought about my own history through that lens before",
      "D) I'm not sure I see gold yet — the crack is still quite raw"
    ],
    videoLink: "https://www.youtube.com/embed/JfdoJxPjp1k",
    videoNote: "Kintsugi philosophy and the ISAP approach"
  },
  {
    session: 15,
    title: "Term 1 review: the Regulate tier",
    theme: "Regulate",
    tier: 1,
    reflectionQ: "Across the first 14 sessions — what has shifted most in how you think about behaviour?",
    reflectionOpts: [
      "A) I see behaviour as communication more clearly than I did",
      "B) I understand my own stress response better",
      "C) I'm more curious about what's underneath behaviour before I respond",
      "D) Honestly, most of this confirmed things I already felt"
    ],
    videoLink: null,
    videoNote: "Consolidation — use clips from sessions 1–14 as highlights or student voice"
  },

  // ─── TIER 2: RELATE (sessions 16–33) ─────────────────────────────────────
  {
    session: 16,
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
    session: 17,
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
    videoLink: "https://www.youtube.com/embed/F0WYFXxhPGY",
    videoNote: "Empathy vs sympathy — Brené Brown animation"
  },
  {
    session: 18,
    title: "Active listening",
    theme: "Relate",
    tier: 2,
    reflectionQ: "In an honest moment — when someone is talking to you, what percentage of the time are you fully present rather than forming your response?",
    reflectionOpts: [
      "A) Mostly present — I genuinely find it easy to listen",
      "B) About half and half — I drift but come back",
      "C) Probably mostly composing my response if I'm honest",
      "D) It depends entirely on who is talking and whether I'm stressed"
    ],
    videoLink: null,
    videoNote: "Source video on active listening skills in educational/therapeutic contexts"
  },
  {
    session: 19,
    title: "Transactional Analysis: ego states",
    theme: "Relate",
    tier: 2,
    reflectionQ: "Which ego state do you recognise most in yourself at work under pressure?",
    reflectionOpts: [
      "A) Critical Parent — I can hear myself getting sharp or judgemental",
      "B) Nurturing Parent — I tend toward rescue and over-caring",
      "C) Adapted Child — I comply and please even when I shouldn't",
      "D) Adult — I feel fairly grounded in most situations"
    ],
    videoLink: "https://www.youtube.com/embed/z_-rNd7h6z8",
    videoNote: "Introduction to Transactional Analysis — Eric Berne"
  },
  {
    session: 20,
    title: "Transactions in the staffroom",
    theme: "Relate",
    tier: 2,
    reflectionQ: "Think of a recent staffroom conversation that didn't go the way you hoped. What do you think was really going on underneath it?",
    reflectionOpts: [
      "A) We were talking at crossed purposes — different ego states",
      "B) One of us was stressed and it contaminated the exchange",
      "C) There was a hidden agenda — things we weren't saying directly",
      "D) It was probably fine — I'm overthinking it"
    ],
    videoLink: null,
    videoNote: "Source video on TA transactions in workplace relationships"
  },
  {
    session: 21,
    title: "Strokes & recognition",
    theme: "Relate",
    tier: 2,
    reflectionQ: "When did someone last make you feel genuinely seen at work — and what did they actually do or say?",
    reflectionOpts: [
      "A) Recently — I can think of a specific moment",
      "B) A while ago — it doesn't happen as often as it should",
      "C) I find it hard to receive recognition even when it's given",
      "D) I'm not sure — I don't notice strokes much either way"
    ],
    videoLink: "https://www.youtube.com/embed/M1dlEocp_Yo",
    videoNote: "Recognition, strokes and human connection"
  },
  {
    session: 22,
    title: "My ego under stress",
    theme: "Relate",
    tier: 2,
    reflectionQ: "Be honest — when do you most lose yourself at work? When does the 'real you' get replaced by a pattern on autopilot?",
    reflectionOpts: [
      "A) When I feel undermined or unfairly criticised",
      "B) When I'm exhausted and haven't got reserves",
      "C) When I feel responsible for something I can't control",
      "D) I'm fairly consistent — I don't feel like I lose myself much"
    ],
    videoLink: null,
    videoNote: "Source video on ego, mindfulness and the observing self — Eckhart Tolle"
  },
  {
    session: 23,
    title: "The Drama Triangle",
    theme: "Relate",
    tier: 2,
    reflectionQ: "Which role do you most recognise in yourself when a student is struggling?",
    reflectionOpts: [
      "A) Rescuer — I find it hard not to take the problem on",
      "B) Persecutor — I get frustrated when the support I offer isn't taken up",
      "C) I move between them depending on the situation",
      "D) I think I mostly manage to stay outside the triangle"
    ],
    videoLink: null,
    videoNote: "Source video on the Karpman Drama Triangle"
  },
  {
    session: 24,
    title: "PEARS Family School: the model",
    theme: "Relate",
    tier: 2,
    reflectionQ: "What's your honest first response to the idea that parents should come into school every week alongside their children?",
    reflectionOpts: [
      "A) Exciting — that level of integration could change everything",
      "B) Logistically daunting — I can see how much it would take",
      "C) Uncertain — I'm not sure all families would engage or benefit",
      "D) Envious — I wish something like this existed where I work"
    ],
    videoLink: null,
    videoNote: "Source: Pears Foundation / Pears Family School documentary or case study film"
  },
  {
    session: 25,
    title: "Family-school partnership: what works",
    theme: "Relate",
    tier: 2,
    reflectionQ: "Think of a family you find hardest to engage. What do you think the barrier actually is — for them?",
    reflectionOpts: [
      "A) Previous negative experiences of school — their own or their child's",
      "B) Practical barriers — time, language, transport, work",
      "C) Distrust of authority or professional systems",
      "D) I genuinely don't know — I haven't found a way in yet"
    ],
    videoLink: null,
    videoNote: "Source video on family engagement principles and the ISAP approach"
  },
  {
    session: 26,
    title: "Pre-mentalising & curiosity mindset",
    theme: "Relate",
    tier: 2,
    reflectionQ: "In the heat of a difficult moment — how often are you genuinely curious about what's driving the other person, versus just reacting?",
    reflectionOpts: [
      "A) Mostly curious — I try to understand before I respond",
      "B) It depends — easier with students I know, harder with strangers",
      "C) Honestly, mostly reacting — curiosity comes later when I reflect",
      "D) I'm curious in theory but it's hard to access in the actual moment"
    ],
    videoLink: null,
    videoNote: "Source video on mentalisation — Peter Fonagy / Anna Freud Centre"
  },
  {
    session: 27,
    title: "Executive function & the 8 skills",
    theme: "Relate",
    tier: 2,
    reflectionQ: "Which executive function skill do you find hardest to support in students — and which one are you least certain you fully have yourself?",
    reflectionOpts: [
      "A) Impulse control — in students and honestly sometimes in me",
      "B) Flexible thinking — I can be more rigid than I'd like",
      "C) Working memory — I forget things and I see students struggle with it",
      "D) Emotional regulation — the hardest one to teach or model"
    ],
    videoLink: null,
    videoNote: "Source video on executive function and the developing brain"
  },
  {
    session: 28,
    title: "MHFA: checking in with others",
    theme: "Relate",
    tier: 2,
    reflectionQ: "If you were struggling with your mental health, which of these would you be most likely to do?",
    reflectionOpts: [
      "A) Tell someone I trusted at work",
      "B) Tell someone close to me outside work",
      "C) Try to manage it privately and get on with things",
      "D) I'm not sure — it depends on the severity"
    ],
    videoLink: null,
    videoNote: "Source: MHFA England awareness video or equivalent"
  },
  {
    session: 29,
    title: "Boundaries in helping relationships",
    theme: "Relate",
    tier: 2,
    reflectionQ: "When does caring for others most easily tip into carrying too much for them?",
    reflectionOpts: [
      "A) When I feel like I'm the only one who really understands their situation",
      "B) When there's no one else to step in",
      "C) When I know setting a limit will disappoint them",
      "D) I think I manage my limits reasonably well most of the time"
    ],
    videoLink: null,
    videoNote: "Source video on healthy boundaries and the helping relationship"
  },
  {
    session: 30,
    title: "The practice of gratitude",
    theme: "Relate",
    tier: 2,
    reflectionQ: "At the end of a hard day, where does your attention naturally go?",
    reflectionOpts: [
      "A) What went wrong — I replay and analyse",
      "B) What's waiting tomorrow — I'm already there",
      "C) I'm usually too tired to reflect at all",
      "D) I try to land on something that went well before I sleep"
    ],
    videoLink: null,
    videoNote: "Source video on gratitude practice and the negativity bias"
  },
  {
    session: 31,
    title: "Building a peer support culture",
    theme: "Relate",
    tier: 2,
    reflectionQ: "How psychologically safe does your team feel right now — could you admit a mistake to a colleague without it costing you something?",
    reflectionOpts: [
      "A) Yes — our team feels genuinely safe for that",
      "B) With some colleagues, not all",
      "C) Not really — there are risks to being that open",
      "D) I haven't thought about it consciously but now I'm not sure"
    ],
    videoLink: null,
    videoNote: "Source video on psychological safety — Amy Edmondson"
  },
  {
    session: 32,
    title: "Brain, ego states & communication",
    theme: "Relate",
    tier: 2,
    reflectionQ: "Now that you can see the RRR triangle and the PAC model side by side — which crossing between them explains the most about a difficult relationship you've had at work?",
    reflectionOpts: [
      "A) I was regulated but the other person wasn't — and I couldn't bridge it",
      "B) I was dysregulated and that pulled me into Parent or Child",
      "C) We were both dysregulated — there was no Adult in the room",
      "D) I'm seeing a past situation differently now — the models reframe it"
    ],
    videoLink: null,
    videoNote: "Integration: neurosequential model meets Transactional Analysis"
  },
  {
    session: 33,
    title: "Term 2 review: the Relate tier",
    theme: "Relate",
    tier: 2,
    reflectionQ: "What single thing from the Relate tier will most change how you show up for someone who is struggling?",
    reflectionOpts: [
      "A) How I listen — less fixing, more presence",
      "B) How I notice my own ego state before I respond",
      "C) How I think about families — with more curiosity and fewer assumptions",
      "D) How I understand the Drama Triangle and my role within it"
    ],
    videoLink: null,
    videoNote: "Consolidation — use student/family voice or highlights from sessions 16–32"
  },

  // ─── TIER 3: REASON (sessions 34–50) ─────────────────────────────────────
  {
    session: 34,
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
    session: 35,
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
    session: 36,
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
    session: 37,
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
    session: 38,
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
    session: 39,
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
    session: 40,
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
    session: 41,
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
    session: 42,
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
    session: 43,
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
    session: 44,
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
    session: 45,
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
    session: 46,
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
    session: 47,
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
    session: 48,
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
    session: 49,
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
    session: 50,
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
