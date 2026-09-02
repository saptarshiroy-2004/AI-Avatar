/* ==========================================================================
   ConsulAI — Interactive AI Visa Officer MVP Engine
   ========================================================================== */

// --- Scenario Question Banks ---
const QUESTION_BANKS = {
  f1_stem: [
    {
      id: "q1",
      question: "Good morning. Pass your passport and I-20 through the slot. Why did you choose this specific university in the United States?",
      tip: "Focus on 1-2 unique academic hooks (specific lab, faculty, curriculum) and how it maps directly to your career back home.",
      followUpTrigger: ["ranking", "reputation", "usa is great", "good country"],
      followUp: "Thousands of schools have good rankings. What specific coursework or lab does this program offer that you cannot get in your home country?",
      samples: {
        strong: "I chose Purdue for its specialized Microelectronics and VLSI track, specifically Professor Chen's Semiconductor Fabrication lab. It directly aligns with India's expanding semiconductor mission where I plan to return as a chip design engineer.",
        rambling: "Well, ever since I was a child I was passionate about computers. When I looked at the rankings, the United States is the best in the world for higher education. Also my cousins live in California and told me the weather and curriculum are amazing, and I always wanted to study abroad.",
        scripted: "This university is a globally prestigious institution ranked highly in QS rankings, providing world-class infrastructure and eminent professors to fulfill my childhood dream."
      }
    },
    {
      id: "q2",
      question: "Who is sponsoring your education, and how are you covering the $58,000 yearly expense?",
      tip: "State exact numbers: sponsor relationship, liquid savings, approved education loan, and annual family income.",
      followUpTrigger: ["someone will help", "pay as I go", "on-campus job"],
      followUp: "On-campus jobs are limited and not guaranteed for living expenses. Do you have liquid funds documented right now?",
      samples: {
        strong: "My education is fully funded through an approved $45,000 unsecured education loan from HDFC Credila, combined with $22,000 in liquid savings from my father, who earns $28,000 annually as a civil contractor.",
        rambling: "My family is taking care of it. My father has some property which he might sell if needed, and my uncle in New Jersey also promised he would help cover whatever tuition is left over after my first semester.",
        scripted: "My parents are my sole financial sponsors and they have sufficient bank balance to manage all expenses without any financial strain."
      }
    },
    {
      id: "q3",
      question: "I see you completed your bachelor's degree in 2024. What have you been doing for the past two years?",
      tip: "Account for every month concisely: full-time work, research projects, or relevant certifications.",
      followUpTrigger: ["nothing much", "just preparing", "stayed home"],
      followUp: "Two years is a substantial gap. What professional milestones did you achieve during this period?",
      samples: {
        strong: "For the past 22 months, I worked as a Junior Systems Analyst at Tata Consultancy Services, building telemetry pipelines for automotive clients before deciding to specialize via my Master's.",
        rambling: "Honestly I was mostly preparing for GRE and TOEFL exams, and then I took some time off to relax with family and explore some freelancing online, but nothing very formal or full-time.",
        scripted: "I was continuously upskilling myself and preparing diligently for competitive examinations to ensure academic readiness for US education."
      }
    },
    {
      id: "q4",
      question: "What are your post-graduation plans once you finish this degree?",
      tip: "CRITICAL 214(b) TRAP: Prove strong nonimmigrant intent. Name specific target companies, roles, and salary projections in your home country.",
      followUpTrigger: ["opt", "stay in usa", "h1b", "work in silicon valley", "green card", "settle"],
      followUp: "Your I-20 is for study, not immigration. What concrete commitments require you to return to your home country?",
      samples: {
        strong: "Upon graduating in 2028, I will return to Bangalore to join tier-1 automotive telemetry firms like Bosch India or Mahindra Tech as a Senior ADAS Engineer, where starting packages for US-trained specialists average 25 to 30 LPA.",
        rambling: "I plan to work on OPT for 3 years, and if my company sponsors my H-1B I would like to gain experience in Silicon Valley, and maybe eventually apply for permanent residency if things work out.",
        scripted: "I will return to my motherland to serve my country and utilize the global knowledge gained in the United States to build our nation."
      }
    },
    {
      id: "q5",
      question: "Do you have any immediate relatives currently living in the United States?",
      tip: "Answer with a direct 'Yes' or 'No'. If yes, specify exact relationship and visa status without over-justifying.",
      followUpTrigger: ["stay with them", "live at their house"],
      followUp: "Will you be living with them during your academic term?",
      samples: {
        strong: "No, officer. All my immediate family members, including my parents and younger sister, reside permanently in Pune, India.",
        rambling: "I have a distant second cousin who moved to Texas five years ago on an H-1B, and an aunt in Chicago, but we don't talk very often and I won't be visiting them during my studies at all.",
        scripted: "None of my immediate family members reside in the United States of America."
      }
    }
  ],
  b1_b2: [
    {
      id: "q1",
      question: "What is the exact purpose of your trip to the United States?",
      tip: "State specific dates, locations, event names, or host details in under 12 seconds.",
      samples: {
        strong: "I am traveling to Chicago for 6 days from October 12 to 18 to attend the annual AWS Cloud Conference as a delegate sponsored by my current employer.",
        rambling: "I just want to visit some friends, see the Grand Canyon, visit Disney World, and maybe check out some business opportunities or universities in California if I have time.",
        scripted: "The primary intent of my travel is tourism and sightseeing to experience the rich culture and landmarks of the United States."
      }
    },
    {
      id: "q2",
      question: "How long do you intend to stay, and who is paying for your travel?",
      tip: "Clear itinerary length and verifiable expense sponsorship.",
      samples: {
        strong: "I will stay for exactly 9 days. My roundtrip flight and hotel are fully reimbursed by my employer, Infosys Ltd.",
        rambling: "Maybe two to three weeks, or possibly two months depending on how much time I can take off from my freelance work.",
        scripted: "I will reside for a short vacation funded entirely through my personal earnings."
      }
    },
    {
      id: "q3",
      question: "What ties do you have that guarantee your return to your home country?",
      tip: "Highlight ongoing employment contract, immovable property, or family care responsibilities.",
      samples: {
        strong: "I have been an engineering manager at Flipkart for 5 years with ongoing project deliverables, and I co-own our family residential home in Delhi with my spouse.",
        rambling: "I really love my country and my family is here, so of course I will come back after I travel around.",
        scripted: "I have strong socio-economic ties to my homeland that mandate my timely return upon completion of my visit."
      }
    }
  ],
  h1b: [
    {
      id: "q1",
      question: "What is your specialty occupation, and who is your sponsoring U.S. employer?",
      tip: "State role, petitioning company, client location (if third-party), and core specialized technical domain.",
      samples: {
        strong: "I am a Distributed Systems Engineer with Stripe Inc. in Seattle, specializing in low-latency payment processing consensus algorithms.",
        rambling: "I work for a consultancy that places contractors at different tech clients across the US, and currently my client is in New York.",
        scripted: "I am a software professional hired under specialty occupation guidelines by my approved petitioner."
      }
    },
    {
      id: "q2",
      question: "What is your approved LCA salary and work location?",
      tip: "Recite exact LCA wage level and certified work site without hesitation.",
      samples: {
        strong: "My certified LCA wage is $168,000 per annum based at Stripe's downtown Seattle office.",
        rambling: "It's around $120k to $140k depending on bonuses and remote work allowances.",
        scripted: "My compensation strictly adheres to prevailing wage guidelines certified in my approved petition."
      }
    }
  ]
};

// --- Officer Personas Definition ---
const OFFICER_PERSONAS = {
  miller: {
    name: "Officer Miller",
    subheading: "Consular Section · Window 07 (Strict & Skeptical)",
    tone: "fast-paced, curt, cuts in if answers exceed 18 seconds",
    pitch: 0.9,
    rate: 1.08,
    voiceGender: "male",
    skinTone: "#E8B298",
    hairColor: "#4A3B32",
    suitColor: "#1E293B",
    tieColor: "#991B1B",
    glasses: true,
    facialExpressionBase: "skeptical"
  },
  chen: {
    name: "Officer Chen",
    subheading: "Consular Section · Window 04 (Detail & Finance Heavy)",
    tone: "meticulous, observant, zeroes in on funding and documentation",
    pitch: 1.15,
    rate: 1.02,
    voiceGender: "female",
    skinTone: "#F3D5B5",
    hairColor: "#1F2937",
    suitColor: "#0F172A",
    tieColor: "#0284C7",
    glasses: false,
    facialExpressionBase: "neutral"
  },
  davis: {
    name: "Officer Davis",
    subheading: "Consular Section · Window 11 (Intent & Tie Prober)",
    tone: "calm but catches rehearsed clichés and nonimmigrant slips",
    pitch: 0.85,
    rate: 0.98,
    voiceGender: "male",
    skinTone: "#A36B4F",
    hairColor: "#111827",
    suitColor: "#182234",
    tieColor: "#D97706",
    glasses: true,
    facialExpressionBase: "stoic"
  }
};

// --- Immigrant Intent (214b) Red Flag Keywords ---
const RED_FLAG_PATTERNS = [
  { regex: /\b(settle|stay permanent|green card|h1b|citizenship|immigrat|live forever)\b/i, flag: "Immigrant Intent (214b Trigger)", severity: "critical", tip: "Never state intent to remain in the US on a nonimmigrant F-1/B-1 visa." },
  { regex: /\b(opt for 3 years then work|stay in silicon valley|find a job in us)\b/i, flag: "Dual Intent Misconception", severity: "high", tip: "Emphasize immediate post-degree return to your home country market." },
  { regex: /\b(cousin will help|uncle will sponsor later|pay as i go|work cash)\b/i, flag: "Unverified / Informal Funding", severity: "high", tip: "Only cite documented sponsors with legitimate bank certificates or sanctioned loans." },
  { regex: /\b(best country in the world|childhood dream|always wanted to go to america)\b/i, flag: "Generic Scripted Cliché", severity: "medium", tip: "Avoid emotional flattery. Officers want objective academic or professional rationale." },
  { regex: /\b(don't know|not sure|maybe|perhaps)\b/i, flag: "Hesitation / Uncertainty", severity: "medium", tip: "Answer with confidence. Hesitation signals unverified applications." }
];

const STRONG_TIE_PATTERNS = [
  /\b(return to|back in my home country|bangalore|delhi|mumbai|lagos|hyderabad|seoul|beijing|family business|bosch|tcs|infosys|tata|startup|hired)\b/i,
  /\b(approved loan|sanctioned|liquid savings|hdfc|sbi|bank statement|sponsor)\b/i,
  /\b(microelectronics|vlsi|faculty|curriculum|lab|professor|coursework)\b/i
];

// --- State Management ---
const state = {
  currentTrack: "f1_stem",
  currentOfficer: "miller",
  currentQuestionIndex: 0,
  interviewActive: false,
  interviewStartTime: null,
  questionStartTime: null,
  currentQuestionTimerInterval: null,
  globalTimerInterval: null,
  
  // Audio & STT
  isRecording: false,
  recognition: null,
  speechSynth: window.speechSynthesis,
  isOfficerSpeaking: false,
  
  // Avatar Animation State
  avatarState: "neutral",
  avatarEyeBlink: 0,
  avatarMouthOpen: 0,
  avatarHeadTilt: 0,
  avatarEyebrowRaise: 0,
  animFrameId: null,

  // Resume
  resumeText: null,
  resumeData: null,
  resumeQuestions: null,

  // Session Results
  sessionLogs: [],
  overallScore: 85,
  redFlagsDetected: 0,
  
  // Deck navigation
  currentSlide: 1,
  totalSlides: 8
};

// ==========================================================================
// Initialization & DOM Setup
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  initDOMReferences();
  initAvatarCanvas();
  initSpeechRecognition();
  initEventListeners();
  initResumeUpload();
  initDeckSlides();
  startAvatarAnimationLoop();
  
  // Start in idle mode
  updateOfficerDisplay();
});

let dom = {};

function initDOMReferences() {
  dom = {
    // Navigation Tabs
    tabSimulatorBtn: document.getElementById("tabSimulatorBtn"),
    tabDeckBtn: document.getElementById("tabDeckBtn"),
    tabValidationBtn: document.getElementById("tabValidationBtn"),
    quickDeckNavBtn: document.getElementById("quickDeckNavBtn"),
    viewSimulator: document.getElementById("viewSimulator"),
    viewDeck: document.getElementById("viewDeck"),
    viewValidation: document.getElementById("viewValidation"),

    // Controls & Selectors
    visaTrackSelect: document.getElementById("visaTrackSelect"),
    officerPills: document.querySelectorAll(".officer-pill"),
    currentOfficerName: document.getElementById("currentOfficerName"),
    officerSubheading: document.getElementById("officerSubheading"),
    interviewTimer: document.getElementById("interviewTimer"),
    
    // Avatar Viewport
    avatarCanvas: document.getElementById("avatarCanvas"),
    avatarStatusIcon: document.getElementById("avatarStatusIcon"),
    avatarStatusText: document.getElementById("avatarStatusText"),
    reactionCue: document.getElementById("reactionCue"),
    cueText: document.getElementById("cueText"),
    officerSpokenText: document.getElementById("officerSpokenText"),
    questionCounter: document.getElementById("questionCounter"),
    soundWave: document.getElementById("soundWave"),
    replaySpeechBtn: document.getElementById("replaySpeechBtn"),

    // Panels
    idlePanel: document.getElementById("idlePanel"),
    activePanel: document.getElementById("activePanel"),
    resultPanel: document.getElementById("resultPanel"),
    
    // Buttons & Inputs
    startInterviewBtn: document.getElementById("startInterviewBtn"),
    abortInterviewBtn: document.getElementById("abortInterviewBtn"),
    micToggleBtn: document.getElementById("micToggleBtn"),
    micIcon: document.getElementById("micIcon"),
    micLabel: document.getElementById("micLabel"),
    micListeningIndicator: document.getElementById("micListeningIndicator"),
    userTranscriptInput: document.getElementById("userTranscriptInput"),
    submitAnswerBtn: document.getElementById("submitAnswerBtn"),
    quickSampleChips: document.querySelectorAll(".chip-btn"),
    progressBar: document.getElementById("progressBar"),
    liveTipText: document.getElementById("liveTipText"),
    
    // Telemetry
    answerDurationTimer: document.getElementById("answerDurationTimer"),
    liveWordCount: document.getElementById("liveWordCount"),
    concisenessStatus: document.getElementById("concisenessStatus"),

    // Result Elements
    decisionStamp: document.getElementById("decisionStamp"),
    decisionIcon: document.getElementById("decisionIcon"),
    decisionTitle: document.getElementById("decisionTitle"),
    decisionSub: document.getElementById("decisionSub"),
    overallScore: document.getElementById("overallScore"),
    intentRiskGrade: document.getElementById("intentRiskGrade"),
    intentRiskBar: document.getElementById("intentRiskBar"),
    intentRiskNote: document.getElementById("intentRiskNote"),
    concisenessGrade: document.getElementById("concisenessGrade"),
    concisenessBar: document.getElementById("concisenessBar"),
    concisenessNote: document.getElementById("concisenessNote"),
    financeGrade: document.getElementById("financeGrade"),
    financeBar: document.getElementById("financeBar"),
    financeNote: document.getElementById("financeNote"),
    reviewAccordion: document.getElementById("reviewAccordion"),
    restartSimBtn: document.getElementById("restartSimBtn"),
    copyReportBtn: document.getElementById("copyReportBtn"),
    goToDeckBtn: document.getElementById("goToDeckBtn"),

    // Deck
    prevSlideBtn: document.getElementById("prevSlideBtn"),
    nextSlideBtn: document.getElementById("nextSlideBtn"),
    slideIndicator: document.getElementById("slideIndicator"),
    slideDots: document.getElementById("slideDots"),
    slideCards: document.querySelectorAll(".slide-card"),

    // Resume upload
    resumeFileInput: document.getElementById("resumeFileInput"),
    uploadBox: document.getElementById("uploadBox"),
    browseResumeBtn: document.getElementById("browseResumeBtn"),
    resumeStatus: document.getElementById("resumeStatus"),
    resumeFileName: document.getElementById("resumeFileName"),
    resumeParsedInfo: document.getElementById("resumeParsedInfo"),
    removeResumeBtn: document.getElementById("removeResumeBtn")
  };
}

// ==========================================================================
// Event Listeners & Tab Switching
// ==========================================================================
function initEventListeners() {
  // Navigation Tabs
  dom.tabSimulatorBtn.addEventListener("click", () => switchTab("viewSimulator"));
  dom.tabDeckBtn.addEventListener("click", () => switchTab("viewDeck"));
  dom.tabValidationBtn.addEventListener("click", () => switchTab("viewValidation"));
  
  if (dom.quickDeckNavBtn) {
    dom.quickDeckNavBtn.addEventListener("click", () => switchTab("viewDeck"));
  }
  if (dom.goToDeckBtn) {
    dom.goToDeckBtn.addEventListener("click", () => switchTab("viewDeck"));
  }

  // Visa track change
  dom.visaTrackSelect.addEventListener("change", (e) => {
    state.currentTrack = e.target.value;
    if (!state.interviewActive) {
      updateOfficerDisplay();
    }
  });

  // Officer persona selection
  dom.officerPills.forEach(pill => {
    pill.addEventListener("click", () => {
      if (state.interviewActive) return; // Locked during live interview
      dom.officerPills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      state.currentOfficer = pill.dataset.officer;
      updateOfficerDisplay();
    });
  });

  // Simulator Workflow Actions
  dom.startInterviewBtn.addEventListener("click", startInterview);
  dom.abortInterviewBtn.addEventListener("click", resetToIdle);
  dom.restartSimBtn.addEventListener("click", startInterview);
  dom.submitAnswerBtn.addEventListener("click", handleAnswerSubmission);
  dom.replaySpeechBtn.addEventListener("click", replayOfficerSpeech);
  dom.copyReportBtn.addEventListener("click", copyDiagnosticReport);

  // Mic Toggle
  dom.micToggleBtn.addEventListener("click", toggleMicrophone);

  // Input Realtime Telemetry
  dom.userTranscriptInput.addEventListener("input", handleUserInputUpdate);

  // Sample Response Chips
  dom.quickSampleChips.forEach(chip => {
    chip.addEventListener("click", () => {
      const type = chip.dataset.type;
      injectSampleAnswer(type);
    });
  });

  // Keyboard navigation for Deck
  document.addEventListener("keydown", (e) => {
    if (dom.viewDeck.classList.contains("active")) {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    }
  });

  dom.prevSlideBtn.addEventListener("click", prevSlide);
  dom.nextSlideBtn.addEventListener("click", nextSlide);
}

// ==========================================================================
// Resume Upload & Parsing
// ==========================================================================
function initResumeUpload() {
  if (!dom.uploadBox || !dom.resumeFileInput) return;

  // click to browse
  dom.uploadBox.addEventListener("click", () => dom.resumeFileInput.click());
  if (dom.browseResumeBtn) {
    dom.browseResumeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      dom.resumeFileInput.click();
    });
  }

  // file selection
  dom.resumeFileInput.addEventListener("change", (e) => {
    if (e.target.files.length > 0) handleResumeFile(e.target.files[0]);
  });

  // drag & drop
  dom.uploadBox.addEventListener("dragover", (e) => {
    e.preventDefault();
    dom.uploadBox.classList.add("drag-over");
  });
  dom.uploadBox.addEventListener("dragleave", () => dom.uploadBox.classList.remove("drag-over"));
  dom.uploadBox.addEventListener("drop", (e) => {
    e.preventDefault();
    dom.uploadBox.classList.remove("drag-over");
    if (e.dataTransfer.files.length > 0) handleResumeFile(e.dataTransfer.files[0]);
  });

  // remove resume
  if (dom.removeResumeBtn) {
    dom.removeResumeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      clearResume();
    });
  }
}

function handleResumeFile(file) {
  if (file.size > 5 * 1024 * 1024) {
    alert("File too large. Please use a file under 5 MB.");
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    let text = e.target.result;
    // for PDF: extract readable text (basic approach — works for text-layer PDFs)
    if (file.type === 'application/pdf') {
      // extract printable ASCII from PDF binary
      text = extractTextFromPDF(text);
    }
    state.resumeText = text;
    state.resumeData = parseResumeText(text);
    state.resumeQuestions = generateResumeQuestions(state.resumeData);

    // show success state
    dom.uploadBox.classList.add("hidden");
    dom.resumeStatus.classList.remove("hidden");
    dom.resumeFileName.textContent = file.name;
    const details = [];
    if (state.resumeData.name) details.push(state.resumeData.name);
    if (state.resumeData.university) details.push(state.resumeData.university);
    if (state.resumeData.degree) details.push(state.resumeData.degree);
    dom.resumeParsedInfo.textContent = details.length > 0
      ? `Found: ${details.join(" · ")} — questions will be personalized`
      : "Resume loaded — questions will reference your background";
  };

  if (file.type === 'application/pdf') {
    reader.readAsBinaryString(file);
  } else {
    reader.readAsText(file);
  }
}

function extractTextFromPDF(binaryStr) {
  // lightweight client-side text extraction from PDF streams
  // handles most single-layer text PDFs
  let text = '';
  try {
    // find text between BT and ET operators
    const btEtRegex = /BT[\s\S]*?ET/g;
    const matches = binaryStr.match(btEtRegex) || [];
    for (const block of matches) {
      const tjRegex = /\(([^)]+)\)/g;
      let m;
      while ((m = tjRegex.exec(block)) !== null) {
        text += m[1] + ' ';
      }
    }
    // fallback: grab all printable strings
    if (text.trim().length < 30) {
      const printable = binaryStr.replace(/[^\x20-\x7E\n]/g, ' ');
      text = printable.replace(/\s{3,}/g, '\n').trim();
    }
  } catch (e) {
    text = binaryStr.replace(/[^\x20-\x7E\n]/g, ' ').replace(/\s{3,}/g, '\n');
  }
  return text;
}

function clearResume() {
  state.resumeText = null;
  state.resumeData = null;
  state.resumeQuestions = null;
  dom.resumeFileInput.value = '';
  dom.uploadBox.classList.remove("hidden");
  dom.resumeStatus.classList.add("hidden");
}

function parseResumeText(text) {
  const data = { name: null, university: null, degree: null, skills: [], companies: [], gpa: null };
  const lines = text.split(/\n/);

  // name: usually the first non-empty line
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.length > 2 && trimmed.length < 60 && !/[@|http|www|phone|email]/i.test(trimmed)) {
      data.name = trimmed;
      break;
    }
  }

  // university
  const uniMatch = text.match(/(?:university|institute|college|school)\s+(?:of\s+)?([^,\n]+)/i);
  if (uniMatch) data.university = uniMatch[0].trim().substring(0, 80);

  // degree
  const degMatch = text.match(/(?:B\.?S\.?|M\.?S\.?|B\.?Tech|M\.?Tech|B\.?E|M\.?E|B\.?A|M\.?A|MBA|Ph\.?D|Bachelor|Master)\s*(?:of|in|,)?\s*([^,\n]{3,50})/i);
  if (degMatch) data.degree = degMatch[0].trim().substring(0, 80);

  // GPA
  const gpaMatch = text.match(/(?:GPA|CGPA)[:\s]*(\d\.\d+)/i);
  if (gpaMatch) data.gpa = gpaMatch[1];

  // skills
  const skillKeywords = ['python', 'java', 'javascript', 'react', 'node', 'sql', 'aws', 'machine learning', 'data science', 'tensorflow', 'c\\+\\+', 'docker', 'kubernetes', 'excel', 'tableau', 'figma'];
  for (const skill of skillKeywords) {
    if (new RegExp(skill, 'i').test(text)) data.skills.push(skill);
  }

  // companies
  const companyKeywords = ['google', 'amazon', 'microsoft', 'meta', 'apple', 'tcs', 'infosys', 'wipro', 'deloitte', 'accenture', 'cognizant', 'ibm', 'oracle', 'salesforce', 'stripe', 'uber'];
  for (const co of companyKeywords) {
    if (new RegExp('\\b' + co + '\\b', 'i').test(text)) data.companies.push(co);
  }

  return data;
}

function generateResumeQuestions(data) {
  const questions = [];
  const uni = data.university || 'the university you applied to';
  const deg = data.degree || 'your chosen program';
  const skillList = data.skills.length > 0 ? data.skills.slice(0, 3).join(', ') : 'your technical skills';

  questions.push({
    id: 'rq1',
    question: `I see you're applying to study at ${uni}. Why this specific program over similar ones in your home country?`,
    tip: 'Reference specific faculty, labs, or curriculum unique to this school. Tie it to a career goal back home.',
    samples: {
      strong: `${uni} has a specialized research track in ${skillList} that directly aligns with my goal to work in India's growing tech sector after graduating.`,
      rambling: `I've always wanted to study abroad and the US has the best universities in the world. My friends recommended this school and I think it will be a great experience.`,
      scripted: `This is a globally renowned institution providing world-class education to fulfill my lifelong academic aspirations.`
    }
  });

  questions.push({
    id: 'rq2',
    question: 'Who is funding your education, and can you walk me through the exact financial arrangement?',
    tip: 'State exact loan amounts, bank balances, sponsor income. Never say "my family will manage."',
    samples: {
      strong: 'My education is funded through an approved education loan of $45,000 from HDFC Credila, plus $20,000 in liquid savings from my father who earns $28,000 annually.',
      rambling: 'My parents are handling it. We have enough savings and property. My uncle might help too if needed.',
      scripted: 'My parents are my sole sponsors with sufficient funds to cover all expenses comfortably.'
    }
  });

  if (data.companies.length > 0) {
    questions.push({
      id: 'rq3',
      question: `Your resume mentions experience at ${data.companies[0]}. Why leave a good job to pursue this degree now?`,
      tip: 'Show career progression logic. Don\'t sound like you\'re fleeing your current role.',
      samples: {
        strong: `At ${data.companies[0]}, I realized I needed deeper expertise in ${skillList} to move into a senior technical role. This program fills that exact gap.`,
        rambling: 'I was getting bored at my job and wanted a change of scenery. The US seemed like a good place to explore new opportunities.',
        scripted: 'I wish to upskill myself with cutting-edge knowledge from a prestigious global institution.'
      }
    });
  } else {
    questions.push({
      id: 'rq3',
      question: 'What have you been doing since your last degree? Walk me through the gap.',
      tip: 'Account for every month. Work, certifications, or research — never say "just preparing for exams."',
      samples: {
        strong: 'I worked for 18 months as a Junior Analyst, building data pipelines, before deciding to specialize through this Master\'s program.',
        rambling: 'I was mostly preparing for GRE and TOEFL and exploring some freelance work online.',
        scripted: 'I was continuously upskilling and preparing diligently for competitive examinations.'
      }
    });
  }

  questions.push({
    id: 'rq4',
    question: 'What are your specific plans after graduation? Where do you see yourself working?',
    tip: 'CRITICAL: Name specific companies and roles IN YOUR HOME COUNTRY. Never mention staying in the US.',
    samples: {
      strong: `After graduating, I plan to return to India and target senior ${skillList} roles at firms like Bosch India or Tata Advanced Systems, where US-trained specialists earn 25-30 LPA.`,
      rambling: 'I\'d like to do OPT for 3 years and then maybe apply for H-1B if my company sponsors me.',
      scripted: 'I will return to serve my motherland with the global knowledge I gain from US education.'
    }
  });

  questions.push({
    id: 'rq5',
    question: 'Do you have any relatives currently living in the United States?',
    tip: 'Answer directly with a Yes or No. If yes, specify relationship and their visa status.',
    samples: {
      strong: 'No, officer. My entire immediate family — parents and younger brother — lives in Pune, India.',
      rambling: 'My cousin moved to Texas a few years ago and my aunt is in Chicago, but I won\'t be visiting them.',
      scripted: 'No immediate family members reside in the United States of America.'
    }
  });

  return questions;
}

function switchTab(viewId) {
  [dom.viewSimulator, dom.viewDeck, dom.viewValidation].forEach(v => v.classList.remove("active", "hidden"));
  [dom.tabSimulatorBtn, dom.tabDeckBtn, dom.tabValidationBtn].forEach(t => t.classList.remove("active"));

  if (viewId === "viewSimulator") {
    dom.viewSimulator.classList.add("active");
    dom.viewDeck.classList.add("hidden");
    dom.viewValidation.classList.add("hidden");
    dom.tabSimulatorBtn.classList.add("active");
  } else if (viewId === "viewDeck") {
    dom.viewDeck.classList.add("active");
    dom.viewSimulator.classList.add("hidden");
    dom.viewValidation.classList.add("hidden");
    dom.tabDeckBtn.classList.add("active");
  } else if (viewId === "viewValidation") {
    dom.viewValidation.classList.add("active");
    dom.viewSimulator.classList.add("hidden");
    dom.viewDeck.classList.add("hidden");
    dom.tabValidationBtn.classList.add("active");
  }
}

// ==========================================================================
// Simulation Core Logic
// ==========================================================================
function updateOfficerDisplay() {
  const officer = OFFICER_PERSONAS[state.currentOfficer];
  dom.currentOfficerName.textContent = officer.name;
  dom.officerSubheading.textContent = officer.subheading;
  
  const currentQuestions = getActiveQuestions();
  const initialQ = currentQuestions[0].question;
  dom.officerSpokenText.textContent = `"${initialQ}"`;
  dom.questionCounter.textContent = `Question 1 of ${currentQuestions.length}`;
  dom.liveTipText.innerHTML = `<strong>Officer Insight:</strong> ${currentQuestions[0].tip}`;
}

function getActiveQuestions() {
  // use resume-based questions if a resume was uploaded, otherwise use default bank
  if (state.resumeQuestions && state.resumeQuestions.length > 0) {
    return state.resumeQuestions;
  }
  return QUESTION_BANKS[state.currentTrack];
}

function startInterview() {
  state.interviewActive = true;
  state.currentQuestionIndex = 0;
  state.sessionLogs = [];
  state.interviewStartTime = Date.now();
  
  // Switch Panels
  dom.idlePanel.classList.add("hidden");
  dom.resultPanel.classList.add("hidden");
  dom.activePanel.classList.remove("hidden");

  // Reset timers
  startGlobalTimer();
  loadQuestion(0);
}

function loadQuestion(index) {
  const currentQuestions = getActiveQuestions();
  if (index >= currentQuestions.length) {
    finishInterview();
    return;
  }

  state.currentQuestionIndex = index;
  const qData = currentQuestions[index];
  
  // UI Updates
  dom.questionCounter.textContent = `Question ${index + 1} of ${currentQuestions.length}`;
  dom.officerSpokenText.textContent = `"${qData.question}"`;
  dom.liveTipText.innerHTML = `<strong>Officer Insight:</strong> ${qData.tip}`;
  
  // Progress Bar
  const progressPercent = ((index) / currentQuestions.length) * 100;
  dom.progressBar.style.width = `${progressPercent}%`;

  // Clear Input Box
  dom.userTranscriptInput.value = "";
  dom.liveWordCount.textContent = "0 words";
  dom.answerDurationTimer.textContent = "00:00";
  updateConcisenessBadge(0);

  // Avatar Speaking & Audio Trigger
  setAvatarState("speaking", 3500);
  speakOfficerText(qData.question);

  // Start question timer
  state.questionStartTime = Date.now();
  clearInterval(state.currentQuestionTimerInterval);
  state.currentQuestionTimerInterval = setInterval(() => {
    const elapsedSec = Math.floor((Date.now() - state.questionStartTime) / 1000);
    const mm = String(Math.floor(elapsedSec / 60)).padStart(2, '0');
    const ss = String(elapsedSec % 60).padStart(2, '0');
    dom.answerDurationTimer.textContent = `${mm}:${ss}`;
    updateConcisenessBadge(elapsedSec);

    // Dynamic interruption reaction if applicant takes > 25s
    if (elapsedSec > 22 && state.avatarState !== "skeptical" && state.avatarState !== "disapproving") {
      triggerReactionCue("Officer is growing skeptical of length...", "warning");
      setAvatarState("skeptical", 5000);
    }
  }, 1000);
}

function handleUserInputUpdate() {
  const text = dom.userTranscriptInput.value.trim();
  const words = text.length > 0 ? text.split(/\s+/).length : 0;
  dom.liveWordCount.textContent = `${words} words`;

  // Real-time flag check
  for (const item of RED_FLAG_PATTERNS) {
    if (item.regex.test(text)) {
      triggerReactionCue(`Warning: Detected "${item.flag}"`, "red");
      setAvatarState("disapproving", 3000);
      break;
    }
  }
}

function updateConcisenessBadge(seconds) {
  if (seconds <= 18) {
    dom.concisenessStatus.textContent = "Optimal (< 18s)";
    dom.concisenessStatus.className = "telemetry-value badge-green";
  } else if (seconds <= 30) {
    dom.concisenessStatus.textContent = "Borderline (18-30s)";
    dom.concisenessStatus.className = "telemetry-value badge-amber";
  } else {
    dom.concisenessStatus.textContent = "Rambling (> 30s)";
    dom.concisenessStatus.className = "telemetry-value badge-red";
  }
}

function injectSampleAnswer(type) {
  const currentQuestions = getActiveQuestions();
  const qData = currentQuestions[state.currentQuestionIndex];
  if (!qData.samples || !qData.samples[type]) return;

  dom.userTranscriptInput.value = qData.samples[type];
  handleUserInputUpdate();
}

function handleAnswerSubmission() {
  const answer = dom.userTranscriptInput.value.trim();
  if (answer.length < 5) {
    triggerReactionCue("Please provide a spoken or typed response first", "warning");
    return;
  }

  // Stop mic if recording
  if (state.isRecording) {
    toggleMicrophone();
  }

  clearInterval(state.currentQuestionTimerInterval);
  const elapsedSec = Math.floor((Date.now() - state.questionStartTime) / 1000);

  // Analyze Answer
  const currentQuestions = getActiveQuestions();
  const qData = currentQuestions[state.currentQuestionIndex];
  const evaluation = evaluateAnswer(qData, answer, elapsedSec);

  state.sessionLogs.push({
    question: qData.question,
    answer: answer,
    durationSec: elapsedSec,
    wordCount: answer.split(/\s+/).length,
    evaluation: evaluation
  });

  // Reaction Animation before next question
  if (evaluation.riskLevel === "high") {
    setAvatarState("disapproving", 2500);
    triggerReactionCue("Red Flag noted in consular file", "red");
  } else if (evaluation.riskLevel === "medium") {
    setAvatarState("notetaking", 2500);
    triggerReactionCue("Officer recording answer notes...", "neutral");
  } else {
    setAvatarState("approving", 2500);
    triggerReactionCue("Crisp & verified response", "green");
  }

  // Disable button briefly
  dom.submitAnswerBtn.disabled = true;
  setTimeout(() => {
    dom.submitAnswerBtn.disabled = false;
    loadQuestion(state.currentQuestionIndex + 1);
  }, 1600);
}

function evaluateAnswer(qData, answer, durationSec) {
  let flags = [];
  let isStrong = false;

  // Check red flags
  for (const item of RED_FLAG_PATTERNS) {
    if (item.regex.test(answer)) {
      flags.push({ flag: item.flag, tip: item.tip });
    }
  }

  // Check strong signals
  for (const regex of STRONG_TIE_PATTERNS) {
    if (regex.test(answer)) {
      isStrong = true;
      break;
    }
  }

  let riskLevel = "low";
  let score = 90;

  if (flags.length > 0) {
    riskLevel = "high";
    score -= (flags.length * 25);
  }

  if (durationSec > 28) {
    score -= 15;
  } else if (durationSec < 5 && answer.length < 20) {
    score -= 10;
  }

  if (isStrong && flags.length === 0) {
    score += 8;
  }

  score = Math.max(20, Math.min(98, score));

  return {
    score: score,
    riskLevel: riskLevel,
    flags: flags,
    durationSec: durationSec,
    critique: flags.length > 0 
      ? `Identified potential refusal trigger: ${flags[0].flag}. ${flags[0].tip}`
      : (durationSec > 25 ? "Good technical points, but answer exceeded 20s. Trim down unnecessary preamble." : "Excellent concise response with strong nonimmigrant intent.")
  };
}

function finishInterview() {
  state.interviewActive = false;
  clearInterval(state.globalTimerInterval);
  clearInterval(state.currentQuestionTimerInterval);

  // Switch to Result Panel
  dom.activePanel.classList.add("hidden");
  dom.resultPanel.classList.remove("hidden");

  // Calculate Aggregates
  let totalScore = 0;
  let totalDuration = 0;
  let criticalFlags = 0;

  state.sessionLogs.forEach(log => {
    totalScore += log.evaluation.score;
    totalDuration += log.durationSec;
    if (log.evaluation.flags.length > 0) criticalFlags += log.evaluation.flags.length;
  });

  const avgScore = Math.round(totalScore / (state.sessionLogs.length || 1));
  const avgDuration = Math.round(totalDuration / (state.sessionLogs.length || 1));

  // Render Result Card
  dom.overallScore.textContent = avgScore;
  
  if (avgScore >= 75 && criticalFlags === 0) {
    dom.decisionIcon.textContent = "✅";
    dom.decisionTitle.textContent = "VISA APPROVED (Low Risk)";
    dom.decisionTitle.style.color = "var(--accent-emerald)";
    dom.decisionSub.textContent = "Demonstrated clear nonimmigrant intent, crisp timing, and verifiable funding.";
    
    dom.intentRiskGrade.textContent = "LOW (Passed)";
    dom.intentRiskGrade.className = "metric-grade grade-low";
    dom.intentRiskBar.className = "bar-fill fill-green";
    dom.intentRiskBar.style.width = "20%";
    dom.intentRiskNote.textContent = "Strong socio-economic ties to home country proven.";
    setAvatarState("approving", 6000);
  } else if (avgScore >= 55) {
    dom.decisionIcon.textContent = "⚠️";
    dom.decisionTitle.textContent = "ADMINISTRATIVE 221(g) / BORDERLINE";
    dom.decisionTitle.style.color = "var(--accent-amber)";
    dom.decisionSub.textContent = "Answers were overly lengthy or contained minor ambiguity regarding ties.";
    
    dom.intentRiskGrade.textContent = "MODERATE";
    dom.intentRiskGrade.className = "metric-grade grade-warning";
    dom.intentRiskBar.className = "bar-fill fill-amber";
    dom.intentRiskBar.style.width = "55%";
    dom.intentRiskNote.textContent = "Needs more specific employer and post-degree career targets.";
    setAvatarState("skeptical", 6000);
  } else {
    dom.decisionIcon.textContent = "❌";
    dom.decisionTitle.textContent = "SECTION 214(b) REFUSAL RISK (High)";
    dom.decisionTitle.style.color = "var(--accent-rose)";
    dom.decisionSub.textContent = "Detected fatal immigrant intent triggers or vague financial sponsorship answers.";
    
    dom.intentRiskGrade.textContent = "CRITICAL RISK";
    dom.intentRiskGrade.className = "metric-grade grade-bad";
    dom.intentRiskBar.className = "bar-fill fill-rose";
    dom.intentRiskBar.style.width = "85%";
    dom.intentRiskNote.textContent = "Statements suggested long-term US residency intent.";
    setAvatarState("disapproving", 6000);
  }

  // Conciseness Gauge
  dom.concisenessGrade.textContent = `${avgDuration}s avg`;
  if (avgDuration <= 18) {
    dom.concisenessGrade.className = "metric-grade grade-low";
    dom.concisenessBar.className = "bar-fill fill-green";
    dom.concisenessBar.style.width = "85%";
    dom.concisenessNote.textContent = `Pacing is within ideal 10–18s consular window.`;
  } else {
    dom.concisenessGrade.className = "metric-grade grade-bad";
    dom.concisenessBar.className = "bar-fill fill-rose";
    dom.concisenessBar.style.width = "35%";
    dom.concisenessNote.textContent = `Answers averaged ${avgDuration}s. Real officers cut you off after 15s.`;
  }

  // Populate Review Accordion
  dom.reviewAccordion.innerHTML = "";
  state.sessionLogs.forEach((log, idx) => {
    const item = document.createElement("div");
    item.className = "review-item";
    item.innerHTML = `
      <div class="review-q-header">
        <span>Q${idx + 1}: ${log.question}</span>
        <span style="color: ${log.evaluation.score >= 75 ? '#34D399' : '#F87171'}">${log.evaluation.score}/100</span>
      </div>
      <div class="review-user-ans">"${log.answer}"</div>
      <div class="review-critique">
        <strong>Feedback:</strong> ${log.evaluation.critique} (${log.durationSec}s · ${log.wordCount} words)
      </div>
    `;
    dom.reviewAccordion.appendChild(item);
  });
}

function resetToIdle() {
  state.interviewActive = false;
  clearInterval(state.globalTimerInterval);
  clearInterval(state.currentQuestionTimerInterval);
  if (state.isRecording) toggleMicrophone();

  dom.activePanel.classList.add("hidden");
  dom.resultPanel.classList.add("hidden");
  dom.idlePanel.classList.remove("hidden");
  dom.interviewTimer.textContent = "00:00";
  setAvatarState("neutral");
}

function startGlobalTimer() {
  clearInterval(state.globalTimerInterval);
  state.globalTimerInterval = setInterval(() => {
    const totalElapsedSec = Math.floor((Date.now() - state.interviewStartTime) / 1000);
    const mm = String(Math.floor(totalElapsedSec / 60)).padStart(2, '0');
    const ss = String(totalElapsedSec % 60).padStart(2, '0');
    dom.interviewTimer.textContent = `${mm}:${ss}`;
  }, 1000);
}

function triggerReactionCue(text, type) {
  dom.cueText.textContent = text;
  dom.reactionCue.classList.add("active");
  if (type === "green") {
    dom.reactionCue.style.background = "rgba(16, 185, 129, 0.9)";
  } else if (type === "warning") {
    dom.reactionCue.style.background = "rgba(245, 158, 11, 0.9)";
  } else {
    dom.reactionCue.style.background = "rgba(239, 68, 68, 0.9)";
  }

  setTimeout(() => {
    dom.reactionCue.classList.remove("active");
  }, 3200);
}

// ==========================================================================
// Speech-to-Text & Text-to-Speech
// ==========================================================================
function initSpeechRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    dom.micToggleBtn.disabled = true;
    dom.micLabel.textContent = "Mic unsupported (Type below)";
    return;
  }

  state.recognition = new SpeechRecognition();
  state.recognition.continuous = true;
  state.recognition.interimResults = true;
  state.recognition.lang = "en-US";

  state.recognition.onstart = () => {
    state.isRecording = true;
    dom.micToggleBtn.classList.add("recording");
    dom.micLabel.textContent = "Listening (Click to Stop)";
    dom.micListeningIndicator.classList.remove("hidden");
  };

  state.recognition.onresult = (event) => {
    let finalTranscript = "";
    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        finalTranscript += event.results[i][0].transcript + " ";
      }
    }
    if (finalTranscript) {
      dom.userTranscriptInput.value += finalTranscript;
      handleUserInputUpdate();
    }
  };

  state.recognition.onerror = (event) => {
    console.warn("Speech recognition error:", event.error);
    if (event.error === 'not-allowed') {
      triggerReactionCue("Mic permission denied. Please type your answers.", "warning");
    }
    stopMicrophone();
  };

  state.recognition.onend = () => {
    stopMicrophone();
  };
}

function toggleMicrophone() {
  if (!state.recognition) return;
  if (!state.isRecording) {
    try {
      state.recognition.start();
    } catch (e) {
      console.warn("Recognition already active", e);
    }
  } else {
    state.recognition.stop();
    stopMicrophone();
  }
}

function stopMicrophone() {
  state.isRecording = false;
  dom.micToggleBtn.classList.remove("recording");
  dom.micLabel.textContent = "Click to Speak";
  dom.micListeningIndicator.classList.add("hidden");
}

function speakOfficerText(text) {
  if (!('speechSynthesis' in window)) return;
  
  window.speechSynthesis.cancel(); // Stop any pending speech
  const officer = OFFICER_PERSONAS[state.currentOfficer];
  const utterance = new SpeechSynthesisUtterance(text);
  
  utterance.pitch = officer.pitch;
  utterance.rate = officer.rate;

  utterance.onstart = () => {
    state.isOfficerSpeaking = true;
    dom.soundWave.classList.add("speaking");
  };

  utterance.onend = () => {
    state.isOfficerSpeaking = false;
    dom.soundWave.classList.remove("speaking");
    setAvatarState("neutral");
  };

  utterance.onerror = () => {
    state.isOfficerSpeaking = false;
    dom.soundWave.classList.remove("speaking");
  };

  window.speechSynthesis.speak(utterance);
}

function replayOfficerSpeech() {
  const currentQuestions = getActiveQuestions();
  const qData = currentQuestions[state.currentQuestionIndex];
  if (qData) {
    setAvatarState("speaking", 3500);
    speakOfficerText(qData.question);
  }
}

function copyDiagnosticReport() {
  let reportText = `ConsulAI Visa Readiness Diagnostic Report\n`;
  reportText += `Category: ${state.currentTrack.toUpperCase()}\n`;
  reportText += `Overall Readiness Score: ${dom.overallScore.textContent}/100\n\n`;
  
  state.sessionLogs.forEach((log, idx) => {
    reportText += `[Q${idx + 1}] ${log.question}\nAnswer: "${log.answer}"\nFeedback: ${log.evaluation.critique} (${log.durationSec}s)\n\n`;
  });

  navigator.clipboard.writeText(reportText).then(() => {
    triggerReactionCue("Diagnostic report copied to clipboard!", "green");
  });
}

// ==========================================================================
// Dynamic Vector Canvas Avatar Renderer
// ==========================================================================
let ctx = null;

function initAvatarCanvas() {
  ctx = dom.avatarCanvas.getContext("2d");
}

function setAvatarState(newState, durationMs) {
  state.avatarState = newState;
  
  if (newState === "skeptical") {
    dom.avatarStatusIcon.textContent = "🧐";
    dom.avatarStatusText.textContent = "Analyzing credibility...";
  } else if (newState === "speaking") {
    dom.avatarStatusIcon.textContent = "🗣️";
    dom.avatarStatusText.textContent = "Officer speaking...";
  } else if (newState === "disapproving") {
    dom.avatarStatusIcon.textContent = "⚠️";
    dom.avatarStatusText.textContent = "214(b) Risk Flag Noticed";
  } else if (newState === "notetaking") {
    dom.avatarStatusIcon.textContent = "✍️";
    dom.avatarStatusText.textContent = "Writing in consular file...";
  } else if (newState === "approving") {
    dom.avatarStatusIcon.textContent = "✅";
    dom.avatarStatusText.textContent = "Satisfied with response";
  } else {
    dom.avatarStatusIcon.textContent = "👁️";
    dom.avatarStatusText.textContent = "Observing applicant...";
  }

  if (durationMs) {
    setTimeout(() => {
      if (state.avatarState === newState) {
        setAvatarState("neutral");
      }
    }, durationMs);
  }
}

function startAvatarAnimationLoop() {
  let lastBlinkTime = Date.now();
  let blinkInterval = 3200;

  function render(timestamp) {
    const now = Date.now();

    // Natural Blink Trigger
    if (now - lastBlinkTime > blinkInterval) {
      state.avatarEyeBlink = 1;
      setTimeout(() => { state.avatarEyeBlink = 0; }, 140);
      lastBlinkTime = now;
      blinkInterval = 2500 + Math.random() * 3000;
    }

    // Gentle Breathing / Idle sway
    const breathingOffset = Math.sin(now / 700) * 2.5;

    // Clear Canvas
    ctx.clearRect(0, 0, 460, 460);

    // Draw Consular Officer
    drawConsularAvatar(ctx, breathingOffset);

    state.animFrameId = requestAnimationFrame(render);
  }

  state.animFrameId = requestAnimationFrame(render);
}

function drawConsularAvatar(ctx, breathingOffset) {
  const officer = OFFICER_PERSONAS[state.currentOfficer];
  const cx = 230;
  const cy = 250 + breathingOffset;

  // 1. Shoulders & Suit Jacket
  ctx.fillStyle = officer.suitColor;
  ctx.beginPath();
  ctx.moveTo(cx - 150, 460);
  ctx.quadraticCurveTo(cx - 130, cy + 80, cx - 60, cy + 60);
  ctx.lineTo(cx + 60, cy + 60);
  ctx.quadraticCurveTo(cx + 130, cy + 80, cx + 150, 460);
  ctx.closePath();
  ctx.fill();

  // 2. White Shirt Collar & Tie
  ctx.fillStyle = "#F8FAFC";
  ctx.beginPath();
  ctx.moveTo(cx - 38, cy + 60);
  ctx.lineTo(cx, cy + 105);
  ctx.lineTo(cx + 38, cy + 60);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = officer.tieColor;
  ctx.beginPath();
  ctx.moveTo(cx - 12, cy + 68);
  ctx.lineTo(cx + 12, cy + 68);
  ctx.lineTo(cx + 16, cy + 160);
  ctx.lineTo(cx, cy + 180);
  ctx.lineTo(cx - 16, cy + 160);
  ctx.closePath();
  ctx.fill();

  // 3. Neck
  ctx.fillStyle = officer.skinTone;
  ctx.beginPath();
  ctx.rect(cx - 24, cy + 20, 48, 50);
  ctx.fill();

  // 4. Head & Face
  ctx.save();
  // Apply slight head tilt if skeptical
  if (state.avatarState === "skeptical") {
    ctx.translate(cx, cy - 30);
    ctx.rotate(-0.06);
    ctx.translate(-cx, -(cy - 30));
  } else if (state.avatarState === "disapproving") {
    const shake = Math.sin(Date.now() / 120) * 0.04;
    ctx.translate(cx, cy - 30);
    ctx.rotate(shake);
    ctx.translate(-cx, -(cy - 30));
  }

  // Face Shape
  ctx.fillStyle = officer.skinTone;
  ctx.beginPath();
  ctx.ellipse(cx, cy - 30, 68, 85, 0, 0, Math.PI * 2);
  ctx.fill();

  // Ears
  ctx.beginPath();
  ctx.ellipse(cx - 70, cy - 30, 10, 16, 0, 0, Math.PI * 2);
  ctx.ellipse(cx + 70, cy - 30, 10, 16, 0, 0, Math.PI * 2);
  ctx.fill();

  // Hair
  ctx.fillStyle = officer.hairColor;
  ctx.beginPath();
  ctx.ellipse(cx, cy - 90, 72, 38, 0, Math.PI, Math.PI * 2);
  ctx.quadraticCurveTo(cx + 78, cy - 50, cx + 72, cy - 25);
  ctx.lineTo(cx + 62, cy - 65);
  ctx.quadraticCurveTo(cx, cy - 80, cx - 62, cy - 65);
  ctx.lineTo(cx - 72, cy - 25);
  ctx.quadraticCurveTo(cx - 78, cy - 50, cx - 72, cy - 90);
  ctx.closePath();
  ctx.fill();

  // Eyebrows
  ctx.strokeStyle = officer.hairColor;
  ctx.lineWidth = 4;
  ctx.lineCap = "round";

  let leftBrowY = cy - 54;
  let rightBrowY = cy - 54;
  if (state.avatarState === "skeptical") {
    rightBrowY -= 10; // Raised skeptical eyebrow
  } else if (state.avatarState === "disapproving") {
    leftBrowY += 4;
    rightBrowY += 4;
  }

  // Left Eyebrow
  ctx.beginPath();
  ctx.moveTo(cx - 48, leftBrowY + 3);
  ctx.quadraticCurveTo(cx - 30, leftBrowY - 4, cx - 12, leftBrowY);
  ctx.stroke();

  // Right Eyebrow
  ctx.beginPath();
  ctx.moveTo(cx + 12, rightBrowY);
  ctx.quadraticCurveTo(cx + 30, rightBrowY - 4, cx + 48, rightBrowY + 3);
  ctx.stroke();

  // Eyes
  const eyeY = cy - 38;
  const isBlinking = state.avatarEyeBlink === 1;

  // Eye Sockets / Whites
  if (!isBlinking) {
    ctx.fillStyle = "#FFFFFF";
    ctx.beginPath();
    ctx.ellipse(cx - 30, eyeY, 14, 8, 0, 0, Math.PI * 2);
    ctx.ellipse(cx + 30, eyeY, 14, 8, 0, 0, Math.PI * 2);
    ctx.fill();

    // Irises
    ctx.fillStyle = "#2D3748";
    let pupilOffset = state.avatarState === "notetaking" ? 4 : 0;
    ctx.beginPath();
    ctx.arc(cx - 30, eyeY + pupilOffset, 5.5, 0, Math.PI * 2);
    ctx.arc(cx + 30, eyeY + pupilOffset, 5.5, 0, Math.PI * 2);
    ctx.fill();

    // Highlights
    ctx.fillStyle = "#FFFFFF";
    ctx.beginPath();
    ctx.arc(cx - 32, eyeY - 2 + pupilOffset, 2, 0, Math.PI * 2);
    ctx.arc(cx + 28, eyeY - 2 + pupilOffset, 2, 0, Math.PI * 2);
    ctx.fill();
  } else {
    // Closed eye line
    ctx.strokeStyle = "#4B5563";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(cx - 42, eyeY);
    ctx.quadraticCurveTo(cx - 30, eyeY + 4, cx - 18, eyeY);
    ctx.moveTo(cx + 18, eyeY);
    ctx.quadraticCurveTo(cx + 30, eyeY + 4, cx + 42, eyeY);
    ctx.stroke();
  }

  // Glasses Frame (If officer wears glasses)
  if (officer.glasses) {
    ctx.strokeStyle = "#1E293B";
    ctx.lineWidth = 3;
    // Left Lens
    ctx.beginPath();
    ctx.roundRect(cx - 48, eyeY - 12, 34, 24, 6);
    ctx.stroke();
    // Right Lens
    ctx.beginPath();
    ctx.roundRect(cx + 14, eyeY - 12, 34, 24, 6);
    ctx.stroke();
    // Bridge
    ctx.beginPath();
    ctx.moveTo(cx - 14, eyeY - 2);
    ctx.lineTo(cx + 14, eyeY - 2);
    ctx.stroke();
  }

  // Nose
  ctx.strokeStyle = "rgba(0, 0, 0, 0.25)";
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(cx, cy - 40);
  ctx.lineTo(cx - 2, cy - 14);
  ctx.lineTo(cx + 6, cy - 14);
  ctx.stroke();

  // Mouth
  const mouthY = cy + 12;
  if (state.isOfficerSpeaking || state.avatarState === "speaking") {
    // Dynamic speaking mouth
    const mouthOpenHeight = 4 + Math.sin(Date.now() / 90) * 6;
    ctx.fillStyle = "#831843";
    ctx.beginPath();
    ctx.ellipse(cx, mouthY, 14, Math.max(2, mouthOpenHeight), 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#9F1239";
    ctx.stroke();
  } else if (state.avatarState === "approving") {
    // Slight smile
    ctx.strokeStyle = "#475569";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(cx - 16, mouthY - 2);
    ctx.quadraticCurveTo(cx, mouthY + 5, cx + 16, mouthY - 2);
    ctx.stroke();
  } else if (state.avatarState === "disapproving") {
    // Tight frown
    ctx.strokeStyle = "#334155";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(cx - 16, mouthY + 3);
    ctx.quadraticCurveTo(cx, mouthY - 4, cx + 16, mouthY + 3);
    ctx.stroke();
  } else {
    // Neutral stoic line
    ctx.strokeStyle = "#475569";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(cx - 14, mouthY);
    ctx.lineTo(cx + 14, mouthY);
    ctx.stroke();
  }

  ctx.restore();

  // Consular Counter Desk & Pass-through Slot at the bottom
  ctx.fillStyle = "#0B0F19";
  ctx.fillRect(0, 410, 460, 50);
  ctx.strokeStyle = "#1E293B";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, 410);
  ctx.lineTo(460, 410);
  ctx.stroke();

  // Pass-through slot
  ctx.fillStyle = "#030712";
  ctx.beginPath();
  ctx.roundRect(140, 420, 180, 22, 4);
  ctx.fill();
  ctx.strokeStyle = "#334155";
  ctx.stroke();

  ctx.fillStyle = "#64748B";
  ctx.font = "10px JetBrains Mono";
  ctx.textAlign = "center";
  ctx.fillText("PASSPORT & I-20 SLOT", 230, 435);
}

// ==========================================================================
// Presentation Deck Navigation (8 Slides)
// ==========================================================================
function initDeckSlides() {
  dom.slideDots.innerHTML = "";
  dom.slideCards.forEach((_, idx) => {
    const dot = document.createElement("div");
    dot.className = `slide-dot ${idx === 0 ? 'active' : ''}`;
    dot.addEventListener("click", () => goToSlide(idx + 1));
    dom.slideDots.appendChild(dot);
  });
  updateDeckView();
}

function updateDeckView() {
  dom.slideCards.forEach((card, idx) => {
    if (idx + 1 === state.currentSlide) {
      card.classList.add("active");
    } else {
      card.classList.remove("active");
    }
  });

  const dots = dom.slideDots.querySelectorAll(".slide-dot");
  dots.forEach((dot, idx) => {
    if (idx + 1 === state.currentSlide) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });

  dom.slideIndicator.textContent = `Slide ${state.currentSlide} of ${state.totalSlides}`;
  dom.prevSlideBtn.disabled = (state.currentSlide === 1);
  dom.nextSlideBtn.disabled = (state.currentSlide === state.totalSlides);
}

function nextSlide() {
  if (state.currentSlide < state.totalSlides) {
    state.currentSlide++;
    updateDeckView();
  }
}

function prevSlide() {
  if (state.currentSlide > 1) {
    state.currentSlide--;
    updateDeckView();
  }
}

function goToSlide(slideNum) {
  state.currentSlide = slideNum;
  updateDeckView();
}
