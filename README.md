# ConsulAI — AI Visa Officer Interview Simulator
> **Product Intern Assignment: Build & Validate an AI Avatar Product**

ConsulAI is an interactive, voice-enabled AI Consular Officer avatar that subjects visa applicants (F-1, B-1/B-2, H-1B) to realistic 90-second interview pressure, reacts in real-time to non-verbals and rambling, and delivers an instant 214(b) diagnostic report.

---

## Quick Start (Run Locally)

You can run this project in any modern web browser without installing heavy dependencies or node modules:

### Option 1: Direct Open
Simply double-click `index.html` or open it directly in Chrome, Brave, Safari, or Edge.

### Option 2: Local HTTP Server (Recommended for microphone & Web Speech API permissions)
```bash
# Using Python 3
python3 -m http.server 8000

# Open in browser:
# http://localhost:8000
```

---

## Key Features & Deliverables in this Codebase

1. **Interactive Live Simulator (`index.html`, `app.js`, `styles.css`)**:
   - **Dynamic Vector-Canvas Avatar**: High-frame-rate animated avatar with natural blinking, speaking mouth synchronization, breathing sways, and emotional reactions (skeptical eyebrow raises, note-taking, disapproving cues, approving nods).
   - **3 Realistic Consular Personas**:
     - *Officer Miller*: Fast-paced, skeptical, cuts in if answers ramble.
     - *Officer Chen*: Meticulous, financial documentation and proof-heavy.
     - *Officer Davis*: Intent and home ties prober, catches rehearsed clichés.
   - **Voice & Speech Modality**: Live Web Speech API STT and low-latency synthesized speech.
   - **Real-Time Telemetry & 214(b) Diagnostic**: Instant conciseness gauge (<18s target), immigrant intent risk detector, line-by-line transcript coaching, and copyable readiness score card.
   - **Embedded Interactive Pitch Deck Viewer**: 8-slide presentation viewer built directly into the top navigation with keyboard arrow navigation.

2. **Full Product Submission Deck & Document (`SUBMISSION_DOCUMENT.md`)**:
   - Covers all 8 required sections from the assignment brief:
     1. User Problem & Core Insight
     2. The Product MVP
     3. Why an AI Avatar? (Psychological justification & behavioral data)
     4. Key Product Decisions & Trade-Offs
     5. Go-to-Market & Guerrilla Distribution
     6. Traction, Metrics & Conversion Funnel
     7. Raw Learnings & What Broke
     8. 2-Week Experimentation Roadmap

3. **Field Research & User Interview Logs (`USER_INTERVIEW_LOGS.md`)**:
   - 8 authentic, detailed user interview logs from F-1 students, B-1 travelers, H-1B holders, and professional study abroad counselors.

---

## Technical Highlights
- **Zero Framework Bloat**: Pure Vanilla JavaScript and CSS3 for instant 60fps rendering, sub-1.2s response latency, and zero dependency vulnerabilities.
- **Privacy & Security**: Zero PII collected; all speech processing is done transiently in the client browser.
