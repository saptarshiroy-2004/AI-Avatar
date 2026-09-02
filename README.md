<div align="center">

# ConsulAI

**an AI visa officer that actually makes you sweat before the real thing**

[Live Demo](https://saptarshiroy-2004.github.io/AI-Avatar/) · [Submission Deck](#whats-inside) · [How it works](#how-it-works)

</div>

---

## what this is

every year millions of students walk up to a US consulate window, freeze for 90 seconds, and get rejected. not because their profile is weak — because they panicked.

text chatbots don't fix this. you can't simulate a skeptical officer staring at you through a ChatGPT text box. you need the pressure. you need someone cutting you off mid-sentence. you need that eyebrow raise when you accidentally say "i want to settle in california."

so i built **ConsulAI** — a voice-first AI consular officer avatar that runs you through a realistic mock interview, watches how you respond in real time, and tells you exactly where you'd get denied under Section 214(b).

**the whole thing runs in the browser. no backend, no API keys, no sign-up.**

---

## how it works

1. **pick your scenario** — F-1 student visa, B-1/B-2 tourist, or H-1B work visa
2. **pick your officer** — Miller (strict, fast, skeptical), Chen (financial scrutiny), or Davis (catches scripted answers)
3. **start the interview** — speak into your mic or type. the avatar reacts live — eyebrow raises, head shakes, note-taking
4. **get your report** — 214(b) risk score, conciseness breakdown, line-by-line transcript with red flags highlighted

the avatar is rendered on a canvas element at 60fps with natural blinking, lip-sync during speech, breathing animations, and emotional state transitions. no video API, no HeyGen/D-ID latency — just lightweight vector rendering that responds in under a second.

---

## what's inside

```
├── index.html              ← the app (3 views: simulator, pitch deck, analytics)
├── app.js                  ← interview engine, avatar renderer, speech I/O, scoring
├── styles.css              ← design system
├── SUBMISSION_DOCUMENT.md  ← 8-slide PM submission writeup
├── USER_INTERVIEW_LOGS.md  ← raw user interview transcripts (8 testers)
└── README.md               ← you are here
```

the app has three tabs:

| tab | what it shows |
|-----|---------------|
| **Live Simulator** | full interactive interview with avatar, mic input, real-time telemetry, and diagnostic report card |
| **Submission Deck** | 8-slide presentation covering problem, product, why-avatar, decisions, GTM, traction, failures, roadmap |
| **Traction & Data** | user funnel metrics, interview quotes, and A/B test decision log |

---

## quick start

just open `index.html` in any browser. or if you want mic permissions to work properly:

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

no npm, no node_modules, no build step. it's vanilla JS + CSS + HTML.

---

## the product thinking (short version)

**problem:** visa interviews are 80% psychological — eye contact, pacing, composure. text prep doesn't transfer. human coaches cost $100/hr.

**insight:** an AI avatar with reactive facial expressions creates genuine social evaluation pressure. users in testing took 2.8x longer to start their first answer compared to a text prompt. that's the anxiety transfer working.

**key decisions:**
- canvas-rendered avatar over video APIs → sub-1.2s latency vs 4s+ with HeyGen
- strict officers over friendly coaches → 71% of testers preferred the harsh persona
- 5-question sprints over 20-question drills → completion went from 28% to 66%

**validation (48hr beta):** 47 users → 66% completion → 61% repeat rate → +62 NPS

---

## tech notes

- **avatar:** custom 2D vector rendering on `<canvas>`, driven by requestAnimationFrame. states: neutral, speaking (lip-sync), skeptical (eyebrow + head tilt), disapproving (head shake), note-taking (gaze shift), approving (smile). natural blink cycle with randomized intervals.
- **speech:** Web Speech API for STT (with manual text fallback) and SpeechSynthesis for officer voice. each officer has distinct pitch/rate params.
- **scoring:** regex-based 214(b) red flag detection, strong-tie pattern matching, conciseness timer (optimal 10-18s), composite scoring with flag penalties.
- **zero dependencies.** no React, no Tailwind, no npm. ships as 3 files.

---

## what broke in testing

1. **accents:** browser STT turned "VLSI Design" into "very low size design" for some Indian testers. added manual correction fallback.
2. **script readers:** people held printed notes and read robotically for 40 seconds. added live conciseness warnings and randomized follow-up curveballs.
3. **tone:** initial avatar was too polite ("Thank you for sharing!"). real officers are curt. rewrote all prompts.

---

## next steps (if i had 2 more weeks)

- real-time audio interruptions — avatar verbally cuts in when answers exceed 20s
- Whisper API for multi-accent robustness
- B2B consultant portal — agencies review student transcripts with timestamped notes
- paywall experiment: $9.99/week "Embassy Pass" vs free single-mock

---

<div align="center">

built by [saptarshi](https://github.com/saptarshiroy-2004) for the product intern assignment

</div>
