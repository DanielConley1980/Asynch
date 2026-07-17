// Quiz data — 5 questions per session, 18 sessions = 90 questions
// answer: "A"|"B"|"C"|"D"  |  callback: false or session number(s)

const quizData = [
  {
    session: 1, title: "Regulate, relate, reason",
    questions: [
      { q: "The RRR triangle mirrors Maslow's hierarchy in which key way?", opts: ["A) Both were created by the same psychologist in the 1950s", "B) Both say foundational needs must be secure before higher needs", "C) Both organise human needs into exactly five separate tiers", "D) Both are concerned mainly with raising pupils' academic achievement"], answer: "B", callback: false },
      { q: "In the neurosequential model, 'neurosequential' means:", opts: ["A) That neurons must fire in a fixed, repeated sequence during learning", "B) That brain functions develop and activate bottom-up, lowest first", "C) That classroom learning has to follow a prescribed order", "D) That all children develop at the same neurological rate"], answer: "B", callback: false },
      { q: "Which best describes why 'Reason' sits at the top of the triangle?", opts: ["A) Reasoning is simply the most important skill to teach", "B) Reasoning evolved most recently and develops last of all", "C) Reasoning is by far the easiest of the three tiers to reach", "D) Reasoning should be a practitioner's very first goal"], answer: "B", callback: false },
      { q: "A student is visibly upset and refusing to engage. According to RRR, the first priority is:", opts: ["A) Explaining the consequences of their behaviour clearly", "B) Calling their parent or carer without delay", "C) Helping them regulate and settle their nervous system", "D) Referring them to the SENCO for further assessment"], answer: "C", callback: false },
      { q: "The Regulate tier of the triangle corresponds to which part of the brain?", opts: ["A) The cortex, where higher reasoning takes place", "B) The limbic system, acting entirely on its own", "C) The brain stem and the lower brain structures", "D) The prefrontal cortex, just behind the forehead"], answer: "C", callback: false }
    ]
  },
  {
    session: 2, title: "Meet your brain",
    questions: [
      { q: "The brain stem is primarily responsible for:", opts: ["A) Storing emotional memory and forming early attachment bonds", "B) Producing language and complex reasoning", "C) Life-sustaining functions like pulse and breathing", "D) Planning, judgement and weighing decisions"], answer: "C", callback: false },
      { q: "The limbic system reaches maturity at approximately:", opts: ["A) 5–7 years old", "B) 10–13 years old", "C) 18 years old", "D) 25 years old"], answer: "B", callback: false },
      { q: "The prefrontal cortex — the seat of logical reasoning — reaches full maturity at approximately:", opts: ["A) 16 years old", "B) 18 years old", "C) 21 years old", "D) 25 years old"], answer: "D", callback: false },
      { q: "Brain development follows a pattern described as:", opts: ["A) Top-down — cortex first, brain stem develops last", "B) Outside-in — developing from the cortex inward", "C) Bottom-up — brain stem first, cortex last", "D) Simultaneously — all regions develop together at once"], answer: "C", callback: false },
      { q: "(Reference: Session 1) According to the RRR triangle, which brain region must be sufficiently settled before reasoning is accessible?", opts: ["A) Only the cortex really needs to be active", "B) The brain stem and limbic system must settle first", "C) The cortex can override the lower regions when needed", "D) All of the regions function independently of each other"], answer: "B", callback: 1 }
    ]
  },
  {
    session: 3, title: "The lookout system",
    questions: [
      { q: "The 'lookout system' refers to:", opts: ["A) A school monitoring system for at-risk pupils", "B) Brain pathways that scan the environment for threat", "C) A teacher's duty to watch for safeguarding concerns", "D) The brain system that regulates the sleep cycle"], answer: "B", callback: false },
      { q: "Polyvagal theory identifies which response as active when we feel safe?", opts: ["A) Fight or flight — the body's mobilising response", "B) Freeze — the body's bracing, on-hold response", "C) Social engagement — calm, connected, able to think", "D) Shutdown — the body's collapse-and-disconnect response"], answer: "C", callback: false },
      { q: "A student who seems constantly on alert, scanning the room and startling at small sounds, is most likely showing signs of:", opts: ["A) An attention deficit affecting focus and concentration", "B) A hypervigilant lookout system primed to find danger", "C) Boredom with the content of this particular lesson", "D) Poor impulse control and a lack of self-discipline"], answer: "B", callback: false },
      { q: "When the lookout system detects a potential threat, which response is typically activated?", opts: ["A) Social engagement and calm connection", "B) Open curiosity about what is happening", "C) A fight, flight or freeze response", "D) Relaxed, settled and comfortable attention"], answer: "C", callback: false },
      { q: "(Reference: Session 2) The lookout system is primarily associated with which part of the brain?", opts: ["A) The cortex, the brain's main thinking region", "B) The limbic system and the brain stem", "C) The prefrontal cortex, behind the forehead", "D) The cerebellum, at the back of the brain"], answer: "B", callback: 2 }
    ]
  },
  {
    session: 4, title: "The stress response in school",
    questions: [
      { q: "At the start of the clip Jess is regulated and able to explain what she needs (to keep her friend Warren safe). What does the neurosequential model tell us about the trajectory of the incident from here?", opts: ["A) Escalation was inevitable the moment she raised a concern", "B) How the adults responded, not Jess, shaped what happened next", "C) It proves her reasoning was fully available to her throughout", "D) Restraint was always going to be the only safe outcome here"], answer: "B", callback: false },
      { q: "Jess is hypervigilant — scanning, on guard, repeating her concern. In the model, hypervigilance is a sign that:", opts: ["A) She is being manipulative to avoid a consequence", "B) She is calm but is simply being argumentative", "C) Her stress response is active and reasoning is offline", "D) She is socially engaged and quite ready to negotiate calmly now"], answer: "C", callback: false },
      { q: "(Reference: Session 3) Jess's lookout system is already signalling threat as staff approach. Which response are the adults most likely to meet?", opts: ["A) Curiosity and openness to their instructions", "B) Social engagement and ready cooperation with staff", "C) Fight, flight or freeze, not social engagement", "D) Calm reasoning, if the rules are explained clearly"], answer: "C", callback: 3 },
      { q: "By the end of the clip neither Jess nor the staff are regulated. Why does the adults' own dysregulation matter most in the neurosequential model?", opts: ["A) It doesn't — only the student's regulation really matters", "B) Visible adult stress shows the student it is serious", "C) A dysregulated adult cannot co-regulate anyone else", "D) It speeds the student's return to clear reasoning"], answer: "C", callback: false },
      { q: "Jess is cornered and intimidated before being restrained. The clip's 'simple solution' is natural curiosity and listening. In Regulate → Relate → Reason terms, what went wrong?", opts: ["A) Staff needed firmer boundaries and quicker consequences", "B) Staff used control before regulating and relating first", "C) Nothing went wrong — staff followed the model correctly", "D) More adults were needed to enforce quicker compliance"], answer: "B", callback: false }
    ]
  },
  {
    session: 5, title: "Early trauma & the brain",
    questions: [
      { q: "Chronic activation of the stress response in early childhood leads to:", opts: ["A) A steadily stronger and more resilient nervous system over the years", "B) An over-sensitised lookout system that detects threat too readily", "C) No lasting changes once the child reaches adulthood", "D) Steadily improving emotional regulation as they grow up"], answer: "B", callback: false },
      { q: "Dr Nadine Burke Harris's research on ACEs found that childhood trauma:", opts: ["A) Has only limited impact if addressed before age ten", "B) Affects health, behaviour and learning across the lifespan", "C) Affects learning but not long-term physical health", "D) Matters only for those children who experienced direct physical abuse"], answer: "B", callback: false },
      { q: "'Hypervigilance' — a common consequence of early trauma — means:", opts: ["A) Being highly attentive and academically very focused at all times", "B) Constant alertness, scanning even safe places for danger", "C) An overactive immune system response to stress", "D) Heightened sensitivity to sensory stimuli only"], answer: "B", callback: false },
      { q: "A student who has experienced early trauma may escalate at a trivial trigger because:", opts: ["A) They are deliberately testing the adult's patience and boundaries", "B) Their system treats low-level signals as serious threats", "C) They lack any moral understanding of consequences", "D) They have simply never been taught how to behave"], answer: "B", callback: false },
      { q: "(Reference: Sessions 1, 2, 3, 4) Which sequence best describes how early trauma affects a student's access to the RRR triangle?", opts: ["A) Trauma improves access to Reason by building resilience", "B) Trauma over-sensitises the lookout system, blocking the higher tiers", "C) Trauma only makes the Relate tier — building relationships — much harder", "D) Trauma impairs the Reason tier and cortical function only"], answer: "B", callback: [1, 2, 3, 4] }
    ]
  },
  {
    session: 6, title: "Regulating the body",
    questions: [
      { q: "Mindfulness is best described as:", opts: ["A) Clearing the mind of all thought to reach blankness", "B) Paying attention to the present, with curiosity not judgement", "C) A relaxation technique guaranteed to make you feel calm and relaxed", "D) Thinking positively so that difficult feelings go away"], answer: "B", callback: false },
      { q: "A common misconception is that mindfulness means stopping or emptying your thoughts. In fact, mindfulness is:", opts: ["A) Forcing the mind to go completely silent and still", "B) Pushing away any thought that feels uncomfortable", "C) Noticing thoughts and feelings as they come and go", "D) Distracting yourself until the difficult thoughts fade"], answer: "C", callback: false },
      { q: "Practising mindfulness 'without judgement' means:", opts: ["A) Deciding whether each thought is good or bad", "B) Observing what you notice with acceptance, not self-criticism", "C) Deliberately ignoring uncomfortable feelings until they finally stop", "D) Allowing only the pleasant thoughts to remain present"], answer: "B", callback: false },
      { q: "Why does mindfulness support self-regulation? Because it:", opts: ["A) Removes stress from your life once and for all", "B) Builds the habit of noticing rising stress early", "C) Replaces the body's need to calm its own system", "D) Keeps the thinking brain online however threatened you feel"], answer: "B", callback: false },
      { q: "(Reference: Session 4) Mindful awareness of your own body matters most for a practitioner because:", opts: ["A) It impresses students with how calm you appear", "B) Noticing your own stress early lets you regulate first", "C) It guarantees students will copy your slow breathing", "D) It lets consequences be applied faster during incidents"], answer: "B", callback: 4 }
    ]
  },
  {
    session: 7, title: "Why relating comes next",
    questions: [
      { q: "Social engagement becomes possible only when:", opts: ["A) A student has learned the right coping strategies", "B) The nervous system signals enough safety to connect", "C) A positive relationship has formed over several months", "D) Academic expectations have been temporarily reduced"], answer: "B", callback: false },
      { q: "(Reference: Session 1) Session 1 introduced the Regulate → Relate → Reason sequence. According to that model, why does Relate come before Reason?", opts: ["A) Relationships matter more than academic learning does", "B) A student must feel safe and connected before reasoning", "C) Reasoning is too advanced for most Inclusion Base pupils", "D) Relating is simply quicker to deliver than reasoning"], answer: "B", callback: 1 },
      { q: "Why is it counterproductive to focus on building relationship before regulation?", opts: ["A) Relationships take longer to establish than regulation does", "B) A dysregulated student cannot take in relational input", "C) Relationship-building matters less than regulation does", "D) New adults are not trusted until students feel safe"], answer: "B", callback: false },
      { q: "The shift from Regulate to Relate in the RRR triangle is best described as:", opts: ["A) Moving from consequences towards rewards and praise", "B) Moving from managing behaviour to building trust", "C) Moving from physical to more emotional intervention", "D) Moving from individual work to small-group work"], answer: "B", callback: false },
      { q: "(Reference: Session 3) A student's lookout system has settled after a period of calm. Which shift in their behaviour would you most expect to see as social engagement comes back online?", opts: ["A) An immediate improvement in their academic output", "B) More eye contact, softer posture, openness to talk", "C) Better behaviour with every member of staff at once", "D) A reduced need for any adult support at all"], answer: "B", callback: 3 }
    ]
  },
  {
    session: 8, title: "Empathy vs sympathy",
    questions: [
      { q: "Brené Brown defines empathy as:", opts: ["A) Feeling sorry for someone in a difficult situation", "B) Feeling WITH someone and communicating that connection", "C) Offering practical solutions to their problems efficiently", "D) Keeping professional distance while acknowledging difficulty"], answer: "B", callback: false },
      { q: "The phrase 'empathy fuels connection, sympathy drives disconnection' means:", opts: ["A) Sympathy is harmful and should be avoided entirely", "B) Empathy connects by entering the experience; sympathy distances", "C) Emotional responses are always more helpful than practical ones", "D) Professional relationships should only ever rely on empathy"], answer: "B", callback: false },
      { q: "An 'at least' response is typically unhelpful because:", opts: ["A) It offers a kind of false comfort to the person", "B) It minimises the pain by jumping to the positive", "C) It is usually factually inaccurate in some way", "D) It needs personal knowledge the listener may lack"], answer: "B", callback: false },
      { q: "When someone shares a problem, the most empathetic first response is:", opts: ["A) Offering a clear, workable solution as quickly as you possibly can", "B) Sharing a similar experience of your own to relate", "C) Acknowledging the feeling first — 'that sounds really hard'", "D) Asking clarifying questions to understand it fully"], answer: "C", callback: false },
      { q: "(Reference: Session 7) How does leading with empathy rather than sympathy support the shift from Regulate to Relate explored in session 7?", opts: ["A) It doesn't — empathy and sympathy are both about the shift to Reason, not Relate", "B) Empathy signals safety and connection rather than fixing or minimising — the foundation Relate is built on", "C) Sympathy is more effective at signalling safety because it offers immediate reassurance", "D) Neither approach affects how safe a student feels — that depends on the relationship's longer history"], answer: "B", callback: 7 }
    ]
  },
  {
    session: 9, title: "Emotion Coaching 1",
    questions: [
      { q: "Why does Emotion Coaching treat a strong emotional moment as something to lean into, rather than shut down quickly?", opts: ["A) Because it's usually the fastest and most reliable way to end the disruption", "B) Because emotional moments are opportunities for connection and teaching", "C) Because ignoring a pupil's emotions goes against most schools' behaviour policies", "D) Because it guarantees the same behaviour won't happen again in future lessons"], answer: "B", callback: false },
      { q: "The first move in Emotion Coaching is:", opts: ["A) Set limits on the child's behaviour immediately, before it can spread", "B) Notice the child's behaviour and tune in to the emotion beneath it", "C) Help the child to verbally label the emotion they are experiencing", "D) Distract the child with a different activity until the feeling passes"], answer: "B", callback: false },
      { q: "'Listen empathetically and validate the child's feelings' means:", opts: ["A) Agreeing that the child's behaviour was acceptable in the circumstances", "B) Communicating that the feeling makes sense, even if the behaviour must change", "C) Waiting silently until the child has completely finished talking", "D) Explaining calmly why the child shouldn't feel the way they do"], answer: "B", callback: false },
      { q: "Setting limits on the behaviour is introduced:", opts: ["A) Before the emotion has been named or validated, so the boundary is clear from the outset", "B) After noticing, connecting, listening and labelling — alongside problem-solving, not instead of it", "C) Only when the behaviour becomes dangerous to the child or to others", "D) By a different adult, so that the coaching relationship stays warm"], answer: "B", callback: false },
      { q: "(Reference: Session 8) How does \"listen empathetically and validate\" connect to the empathy/sympathy distinction from that session?", opts: ["A) They're unrelated — session 8 is about adult relationships, this is about children", "B) Both separate sitting with a feeling from minimising or fixing it too fast — validating is empathy in action", "C) Sympathy is the preferred approach in Emotion Coaching because it offers comfort more quickly", "D) Emotion Coaching replaces empathy with a structured checklist anyone can follow"], answer: "B", callback: 8 }
    ]
  },
  {
    session: 10, title: "Emotion Coaching 2",
    questions: [
      { q: "Where is the evidence of the ABC in the video? Which matching is correct?", opts: ["A) \"I can see that…\" and \"I'm wondering…\" show Acknowledge; holding the limit shows Boundaries; exploring next steps shows Coaching", "B) \"I can see that…\" shows Boundaries; setting the limit shows Coaching; problem-solving what comes next shows Acknowledge", "C) The video only demonstrates Acknowledge — the Boundaries and Coaching steps are left to the adult to improvise", "D) The phrases are general behaviour management techniques that don't map onto the ABC in any reliable way"], answer: "A", callback: false },
      { q: "Emily is over twenty minutes late for her lesson after break. She is wandering the corridors, banging on classroom windows every so often and refusing to be redirected to her classroom or her head of year's office. What does an ABC approach open with?", opts: ["A) A clear instruction: back to class now, or it becomes a head of year matter with consequences attached", "B) Walking alongside her, unhurried, acknowledging first — \"something's making it hard to be in class right now\" — then redirecting", "C) Radioing for senior staff so she can be removed from the corridor before more lessons are disturbed", "D) Following her silently at a distance until she runs out of steam and returns of her own accord"], answer: "B", callback: false },
      { q: "You hear a locker being kicked and damaged. Jake storms past, hands deep in his pockets, visibly frustrated; other students are whispering. He kicks a stray book down the hall, then stops and leans against the lockers, arms crossed, staring at the ground. Using the ABC, your opening move is:", opts: ["A) Point out the damage to the locker straight away and explain what the repair is likely to cost him", "B) Ask him directly, while the other students are still watching, why he thought that was acceptable", "C) Approach calmly and acknowledge — \"something's really wound you up\" — using his pause to connect; the damage comes later", "D) Send him straight to isolation so the watching audience disperses and the corridor settles"], answer: "C", callback: false },
      { q: "Adam entered your class late — storming in, slamming the door, sitting in the wrong seat and putting his head on the desk. You've resettled the class and are ready to address it. The ABC-consistent move is:", opts: ["A) Insist he moves to his correct seat before anything else — the boundary must come first", "B) Address the lateness and door-slamming publicly so the class sees it dealt with", "C) Leave him completely alone for the rest of the lesson — he'll come round in his own time", "D) Crouch beside him and acknowledge quietly — \"I can see something's happened\" — the seat and the lateness can wait"], answer: "D", callback: false },
      { q: "You're waiting for a parent in reception when Chloe storms in, phone clamped to her ear, face red, shouting \"I don't care, Mum! I'm not doing it! Nobody ever listens to me!\" The receptionist looks exasperated and visitors are watching. What does the ABC look like here?", opts: ["A) Acknowledge and boundary in one calm move — \"I can hear how angry you are; come with me and we'll sort it away from here\"", "B) Tell her firmly to hang up the phone immediately — reception is not the place for a call like this", "C) Stay out of it — you're waiting for a parent, and reception is the receptionist's area to manage", "D) Point out that she's embarrassing herself in front of visitors so she understands the impact"], answer: "A", callback: false }
    ]
  },
  {
    session: 11, title: "Emotion Coaching 3",
    questions: [
      { q: "In the empathy/guidance model, the green quadrant — where Emotion Coaching sits — combines:", opts: ["A) High guidance delivered with firm professional detachment", "B) High empathy with expectations that flex to protect the student", "C) High empathy AND high guidance, held at the same time", "D) Whichever balance of the two best suits the individual student"], answer: "C", callback: false },
      { q: "'You're doing this because you can't be bothered. Detention — and don't bother explaining.' No curiosity, cold, straight to punishment. Which quadrant is this teacher in?", opts: ["A) Disapproving — high guidance, low empathy", "B) Dismissing — high empathy, low guidance", "C) Laissez-Faire — low empathy and low guidance", "D) Emotion Coaching — high in both empathy and guidance"], answer: "A", callback: false },
      { q: "'Oh love, don't get upset — forget the presentation, you don't have to do it. I'll tell Miss you're not up to it.' The feeling is soothed, but what has really happened?", opts: ["A) Effective coaching — the student's stress has been removed", "B) Dismissing — the challenge and the aspiration quietly taken away", "C) Disapproving — the student has been punished for feeling anxious", "D) A sensible, reasonable adjustment for a struggling student"], answer: "B", callback: false },
      { q: "'If he wants to sit there doing nothing, that's his choice. I teach the ones who want to learn.' Which quadrant?", opts: ["A) Emotion Coaching — respecting the student's autonomy", "B) Dismissing — protecting the student from unwanted pressure", "C) Disapproving — withholding attention as a deliberate sanction", "D) Laissez-Faire — disengagement met with a shrug, low in both"], answer: "D", callback: false },
      { q: "(Reference: Sessions 9, 10) How does the ABC keep you in the green quadrant?", opts: ["A) It doesn't — the ABC and the quadrant model are separate tools", "B) Acknowledge holds the empathy axis; Boundaries and Coaching hold the guidance axis", "C) The ABC mainly protects guidance — empathy has to come from somewhere else", "D) The ABC keeps empathy high by softening boundaries when emotions run hot"], answer: "B", callback: [9, 10] }
    ]
  },
  {
    session: 12, title: "Pears Family School",
    questions: [
      { q: "According to the source, what percentage of children who need mental health treatment do not currently receive it?", opts: ["A) 20%", "B) 50%", "C) 80%", "D) 95%"], answer: "C", callback: false },
      { q: "At what age do most adults with mental health issues first begin to show symptoms?", opts: ["A) Before they are 18", "B) After age 21", "C) During early childhood (under 5)", "D) In their late 20s"], answer: "A", callback: false },
      { q: "What is the core hypothesis that makes the Pears Family School model different from mainstream schools?", opts: ["A) Children simply learn better in smaller school buildings", "B) Technology is the key factor in mental health recovery", "C) School change is not sustainable without change at home", "D) Pupils should be taught only by trained researchers"], answer: "C", callback: false },
      { q: "What is a primary benefit of having parents physically present in the school?", opts: ["A) It lets parents take over the teaching duties themselves", "B) Parents see their child in the context of learning", "C) It reduces the cost of providing security at the school", "D) It lets the school finish its classes earlier each day"], answer: "B", callback: false },
      { q: "What is the ultimate goal of merging neuroscience and social science in the new centre?", opts: ["A) To create a school that is entirely automated", "B) To apply discoveries quickly and spread the model widely", "C) To focus only on children who live in London", "D) To replace traditional social work entirely with brain imaging"], answer: "B", callback: false }
    ]
  },
  {
    session: 13, title: "Why reasoning comes last",
    questions: [
      { q: "The cortex is the last brain region to mature and the first to be affected by stress. This is sometimes described as:", opts: ["A) The cortical vulnerability paradox", "B) Last online, first offline", "C) The executive function ceiling", "D) The developmental lag hypothesis"], answer: "B", callback: false },
      { q: "A student who 'knows the rules but can't follow them' in moments of distress is most likely experiencing:", opts: ["A) Deliberate defiance — a conscious choice to ignore the expectations", "B) Cortical access failure — the rule is known but unreachable under stress", "C) A learning difficulty affecting how well rules are retained over time", "D) Inconsistent boundary-setting at home and between different teachers"], answer: "B", callback: false },
      { q: "Which condition is necessary for the cortex to function effectively?", opts: ["A) High motivation and clearly communicated goals", "B) Regulation and sufficient felt safety — the lower brain settled first", "C) Intelligence and secure prior knowledge of the topic", "D) A structured, quiet and highly predictable learning environment"], answer: "B", callback: false },
      { q: "The Reason tier of the RRR triangle can only be built on:", opts: ["A) Academic readiness and prior attainment alone", "B) Stable regulation AND established relationship", "C) Motivation, aspiration and a growth mindset", "D) Parental support and consistent engagement from home"], answer: "B", callback: false },
      { q: "(Reference: Sessions 2, 4) A teacher asks a student to write a reflective account immediately after a difficult incident. What is the most likely outcome?", opts: ["A) The student will reflect honestly because they remember the incident clearly", "B) Meaningful reflection can't happen until the cortex is back online — the task should wait", "C) Written reflection is always more effective immediately after an event", "D) The outcome depends entirely on the student's emotional intelligence"], answer: "B", callback: [2, 4] }
    ]
  },
  {
    session: 14, title: "Practical classroom strategies",
    questions: [
      { q: "In the Lesson Toolkit, greeting each pupil at the door ('Meet & Greet') is relational practice because it:", opts: ["A) It lets you check uniform before pupils come in", "B) It creates a warm connection that signals safety first", "C) It saves a bit of time at the start of the lesson", "D) It helps you spot which pupils are likely to misbehave today"], answer: "B", callback: false },
      { q: "'Plausible anonymity' — for example, 'I'm only waiting for two people now' — works by:", opts: ["A) Publicly naming the off-task pupils so they correct fast", "B) Prompting pupils to self-correct without being named", "C) Ignoring low-level disruption in the room altogether", "D) Issuing an immediate sanction to the whole group"], answer: "B", callback: false },
      { q: "In the 100% Compliance ladder of corrective responses, which should generally come FIRST?", opts: ["A) A quick public corrective that names the pupil", "B) An individual private warning to the pupil", "C) A non-verbal cue, such as a silent gesture", "D) A sanction applied to the pupil straight away"], answer: "C", callback: false },
      { q: "Why does the corrective sequence start with non-verbal and group prompts and keep public, named correction to a minimum?", opts: ["A) Because adults should avoid correcting pupils wherever possible", "B) Because the least-invasive approach protects the relationship", "C) Because public correction is forbidden by school policy", "D) Because non-verbal cues are the only method that works"], answer: "B", callback: false },
      { q: "'Live in the now — today's a fresh start' and 'assume the best' help avoid power struggles because they:", opts: ["A) They lower expectations for pupils who struggled yesterday", "B) They let the adult drop grievances and meet pupils warmly", "C) They mean that past behaviour is never actually addressed", "D) They remove the need for any correction at all in lessons"], answer: "B", callback: false }
    ]
  },
  {
    session: 15, title: "Smart Learning 1",
    questions: [
      { q: "What is the central aim of the Smart Learning approach?", opts: ["A) To help students get through their workload as fast as possible, finishing tasks quickly so they have more free time afterwards", "B) To apply research on how the brain retains information, swapping ineffective habits for evidence-based strategies", "C) To increase the total number of hours spent revising each week", "D) To rank students by academic ability"], answer: "B", callback: false },
      { q: "Smart Learning organises the educational process into three distinct stages. These are:", opts: ["A) Preparing the mind, engaging with new material, and reinforcing knowledge through recall", "B) Reading the material, writing detailed notes on it, and then testing yourself repeatedly until exam day", "C) Planning, revising, and resting", "D) Listening, note-taking, and memorising"], answer: "A", callback: false },
      { q: "The third stage — reinforcing knowledge — relies specifically on:", opts: ["A) Re-reading your notes over and over again until the material starts to feel familiar and comfortable", "B) Highlighting the most important passages in a bright colour", "C) Active recall — retrieving information from memory without looking at the source", "D) Listening back to recordings of the lesson while relaxing"], answer: "C", callback: false },
      { q: "When the approach encourages students to abandon 'comfortable but unproductive routines,' it is referring to:", opts: ["A) Taking regular, well-timed breaks throughout a long revision session to stay fresh and focused", "B) Working in a quiet, distraction-free environment", "C) Asking a teacher for help whenever you get stuck", "D) Study habits that feel easy and familiar but do little for long-term memory"], answer: "D", callback: false },
      { q: "Aligning study efforts with the way the mind naturally functions is intended to:", opts: ["A) Make lessons and revision sessions considerably longer than they currently are", "B) Reduce academic stress and maximise a student's potential", "C) Remove the need for formal exams and assessments altogether, replacing them entirely with coursework", "D) Replace teacher instruction with independent study"], answer: "B", callback: false }
    ]
  },
  {
    session: 16, title: "Smart Learning 2",
    questions: [
      { q: "Explore smartlearningschool.com. According to the site, what is the Smart Learning approach built on?", opts: ["A) League table performance and exam technique", "B) Research into how the brain learns and retains information", "C) Extending the school day for more study time", "D) Replacing teachers with online learning tools"], answer: "B", callback: false },
      { q: "Find the stages of the learning process described on the site. Which set matches?", opts: ["A) Preparing the mind, engaging with new material, and reinforcing knowledge", "B) Reading the material, taking notes, and highlighting the key points", "C) Planning ahead, revising thoroughly, and resting well", "D) Watching, copying down, and repeating until it sticks"], answer: "A", callback: false },
      { q: "Which technique does the site champion for making knowledge stick long-term?", opts: ["A) Re-reading notes until they feel completely familiar", "B) Recording lessons and listening back to them", "C) Active recall — retrieving information from memory without looking", "D) Colour-coding notes by topic"], answer: "C", callback: false },
      { q: "Which familiar revision habits does the site warn feel productive but do little for long-term memory?", opts: ["A) Self-testing and flashcards", "B) Spacing revision out over several weeks", "C) Teaching the material to someone else", "D) Re-reading and highlighting notes"], answer: "D", callback: false },
      { q: "(Reference: Session 15) The site argues students should swap comfortable habits for evidence-based ones. How does this connect to the metacognition introduced in Smart Learning 1?", opts: ["A) It doesn't — the website is aimed at parents and school leaders rather than at students", "B) Noticing which habits actually work is metacognition — you can't swap a habit you've never examined", "C) Metacognition replaces the need for any particular study technique to be taught", "D) The site recommends metacognitive strategies only for its highest-attaining students"], answer: "B", callback: 15 }
    ]
  },
  {
    session: 17, title: "Why your ego thrives on conflict",
    questions: [
      { q: "Why does a student's defiance in front of the whole class often provoke a stronger reaction in an adult than the same words said privately?", opts: ["A) Public defiance is always a more serious offence than private", "B) The ego feels its status threatened in front of an audience", "C) Students only ever act up to get attention from peers", "D) Private conversations are simply easier to stay calm in"], answer: "B", callback: false },
      { q: "In a confrontation with a pupil, the strong urge to 'have the last word' is best understood as:", opts: ["A) A reasonable need to check the pupil has understood", "B) The ego seeking to win and reassert itself", "C) An effective way of maintaining authority in the room", "D) A clear sign the adult is staying calm and in control"], answer: "B", callback: false },
      { q: "An adult who feels they must be 'right' and win the argument with a defiant pupil is most likely to:", opts: ["A) Strengthen the relationship through honesty and openness", "B) Model really good reasoning for the rest of the class", "C) Win the point but damage the relationship and escalate", "D) Help the pupil develop their own debating skills"], answer: "C", callback: false },
      { q: "'The ego thrives on conflict and pain' means that:", opts: ["A) Some people simply enjoy being difficult with others", "B) The ego strengthens itself through opposition and drama", "C) Conflict is always necessary for genuine personal growth", "D) Pain is the only thing that truly motivates real change"], answer: "B", callback: false },
      { q: "(Reference: Session 4) When a pupil is publicly defiant, the most effective way to avoid an ego-driven power struggle is to:", opts: ["A) Match their intensity so they know that you mean business", "B) Insist on full compliance before anyone can move on", "C) Step out of the contest and refuse to take the bait", "D) Give an immediate public consequence to restore authority"], answer: "C", callback: 4 }
    ]
  },
  {
    session: 18, title: "Kintsugi: the golden thread",
    questions: [
      { q: "What is Kintsugi, literally?", opts: ["A) A Japanese meditation technique focused on stillness and acceptance", "B) The Japanese art of repairing broken pottery with gold, leaving the repair visible", "C) A style of Japanese pottery glazing developed in the twentieth century", "D) A form of Japanese calligraphy built around incomplete brushstrokes"], answer: "B", callback: false },
      { q: "The Kintsugi philosophy holds that an object repaired this way is:", opts: ["A) Less valuable because it has been visibly damaged and mended", "B) More beautiful and valuable because of its breaks, not despite them", "C) Restored to look exactly as if it had never broken", "D) Only valuable as a historical curiosity for collectors"], answer: "B", callback: false },
      { q: "Applied to people, Kintsugi's central idea is that:", opts: ["A) Difficult experiences should be hidden so others don't see the damage", "B) Scars and hard years are the visible gold — part of the story, not a reduction of it", "C) People who haven't experienced hardship are inherently more resilient", "D) Damage should be repaired as quickly and invisibly as possible"], answer: "B", callback: false },
      { q: "In this course, the \"golden thread\" running through the whole year is:", opts: ["A) The exam results students achieve by the end of the programme", "B) The staff. Their steadiness and care help restore, value and enrich our students", "C) The behaviour policy that ties every classroom together", "D) A specific CPD module every staff member must complete"], answer: "B", callback: false },
      { q: "(Reference: Session 5) How does Kintsugi build on what session 5 explored about early trauma?", opts: ["A) They're unrelated — trauma is a clinical matter, Kintsugi is philosophical and artistic", "B) Both refuse to treat hard experience as damage to erase — the break becomes the site of valued repair", "C) Kintsugi replaces trauma-informed practice with a more optimistic, upbeat framing", "D) Trauma should be forgotten as quickly as possible so the repair can begin"], answer: "B", callback: 5 }
    ]
  }
];

// Helper: get questions for a specific session number
function getSessionQuiz(sessionNum) {
  return quizData.find(s => s.session === sessionNum);
}

// Helper: get all callback questions (i.e. those that reference earlier sessions)
function getCallbackQuestions() {
  const callbacks = [];
  quizData.forEach(s => {
    s.questions.forEach((q, i) => {
      if (q.callback !== false) callbacks.push({ session: s.session, qIndex: i, refs: q.callback });
    });
  });
  return callbacks;
}
