import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Github, Linkedin, Mail, Award, Briefcase, GraduationCap, Code, Brain, Menu, X, Download } from 'lucide-react';
// ─── ENHANCEMENT 3A: Filter config — categories mapped to each project ────────
const CATEGORIES = ['All', 'Generative AI / NLP', 'Machine Learning', 'Data Engineering & Analytics', 'Full Stack Development'];
const ALL_PROJECTS = [
  {
    title: "PakWheels Used Car Price Predictor",
    tech: "Python, LightGBM, Streamlit, SHAP",
    description: "Built an AI-powered price prediction system for Pakistan's used car market featuring Explainable AI (XAI) via SHAP integration and real-time data scraping from PakWheels.",
    github: "https://github.com/Muhammad-Ahmad2511/used-car-price-predictor",
    category: "Machine Learning"
  },
  {
    title: "AI-Powered Support Ticket Triage System",
    tech: "Python, Flask, ChromaDB, Llama 3.3 (Groq API)",
    description: "Built an end-to-end automation pipeline utilizing a local ChromaDB-backed RAG architecture and structured Prompt Engineering to dynamically classify support tickets and generate grounded draft responses.",
    github: "https://github.com/Muhammad-Ahmad2511/support-triage-project",
    category: "Generative AI / NLP"
  },
  {
    title: "Emotion Detection in Social Media Text using Small LLMs",
    tech: "Python, PyTorch, HuggingFace Transformers, Flan-T5, DistilBERT",
    description: "Conducted a systematic comparison of zero-shot, few-shot, and fine-tuning prompt strategies for multi-class emotion detection on Google's GoEmotions dataset using models under 500M parameters.",
    github: "https://github.com/Muhammad-Ahmad2511/emotion-detection-small-llms",
    category: "Generative AI / NLP"
  },
  {
    title: "Sales Trend Analysis — Superstore Dataset",
    tech: "Python, STL Decomposition, ACF/PACF, Statsmodels, Scikit-learn",
    description: "Performed end-to-end time-series analysis and forecasting on retail transactions to isolate seasonal patterns, moving average demand trends, and regional performance.",
    github: "https://github.com/Muhammad-Ahmad2511/sales-trend-analysis",
    category: "Machine Learning"
  },
  {
    title: "Electronics Inventory Management Dashboard",
    tech: "Power BI",
    description: "Designed an interactive dashboard displaying stock levels, shortages, and inventory trends for data-driven decision making.",
    github: "https://github.com/Muhammad-Ahmad2511/Electronics-Inventory-Management-Dashboard",
    category: "Data Engineering & Analytics"
  },
  {
    title: "Retail Inventory Analytics & Business Intelligence",
    tech: "ETL, Data Warehousing, BI Dashboards",
    description: "Designed a data warehouse and BI solution to analyze retail sales, inventory levels, pricing, discounts, seasonality, and regional performance using ETL pipelines and interactive dashboards.",
    github: "https://github.com/Muhammad-Ahmad2511/retail-inventory-analytics-bi",
    category: "Data Engineering & Analytics"
  },
  {
    title: "Real-Time MERN Chat Infrastructure",
    tech: "MongoDB, Express.js, React, Node.js, Socket.io, JWT",
    description: "Engineered a decoupled full-stack chat application from scratch to establish core bi-directional communication channels, serving as the foundational architectural layer for upcoming enterprise RAG systems.",
    github: "https://github.com/Muhammad-Ahmad2511/DevNauts-Training",
    category: "Full Stack Development"
  },
  {
    title: "DevNauts AI Proposal Builder (In Progress)",
    tech: "Node.js, LangChain.js, Pinecone, Groq (Llama 4 Scout), RAG, Fine-Tuning",
    description: "Building a chat-based proposal generation tool that combines RAG over a project knowledge base with a tone-tuned model to draft client proposals from a brief in DevNauts' writing voice.",
    github: "https://github.com/idreesahmed1257/uw-proposal-builder",
    category: "Full Stack Development"
  }
];

const skills = {
  "Programming": ["C", "C++", "Python", "C#", "SQL"],
  "ML / AI": ["Regression", "Classification", "Clustering", "Dimensionality Reduction", "Feature Engineering", "Web Scraping", "LightGBM", "XGBoost"],
  "NLP & Large Language Models": ["Hugging Face", "Transformers", "Flan-T5", "DistilBERT", "LLM Fine-tuning",  "Prompt Engineering", "RAG", "LangChain", "Pinecone", "ChromaDB", "Groq API"],
  "Deep Learning": ["PyTorch (ANN, RNN, CNN)"],
  "Explainable AI & Data Analysis": ["SHAP", "XAI", "Feature Importance", "Time-Series Analysis", "EDA", "Data Cleaning", "Statistical Analysis", "Scikit-learn"],
  "Data, Databases & Web Backend": ["SQL Server","PostgreSQL", "MongoDB", "Data Warehousing", "ETL", "SQL Optimization", "Node.js", "Express", "Socket.io", "JWT", "API Integration"],
  "Visualization & UI": ["React", "Matplotlib", "Seaborn", "Power BI (DAX)", "Tableau"],
  "Tools & Engineering Workflow": ["Jupyter", "VS Code", "Google Colab", "Git/GitHub", "Streamlit", "ChatGPT", "Claude", "GitHub Copilot"]
};

// ─── ENHANCEMENT 2C: Cycling Typewriter Component ────────────────────────────
function CyclingTypewriter({ strings, typingSpeed = 80, deletingSpeed = 45, pauseMs = 1800 }) {
  const [displayed, setDisplayed] = useState('');
  const [stringIndex, setStringIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = strings[stringIndex];
    let timeout;

    if (!isDeleting && charIndex <= current.length) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIndex));
        setCharIndex(c => c + 1);
      }, charIndex === current.length ? pauseMs : typingSpeed);
    } else if (isDeleting && charIndex >= 0) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIndex));
        setCharIndex(c => c - 1);
      }, charIndex === 0 ? pauseMs / 2 : deletingSpeed);
    }

    if (!isDeleting && charIndex > current.length) {
      setIsDeleting(true);
    } else if (isDeleting && charIndex < 0) {
      setIsDeleting(false);
      setStringIndex(i => (i + 1) % strings.length);
      setCharIndex(0);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, stringIndex, strings, typingSpeed, deletingSpeed, pauseMs]);

  return (
    <span className="cycling-typewriter">
      {displayed}
      <span className="typewriter-cursor">|</span>
    </span>
  );
}




// ─── ENHANCEMENT 2A/2B: Staggered Project Grid ───────────────────────────────
function ProjectGrid({ projects }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.10
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 36 },
    show: { opacity: 1, y: 0, transition: { duration: 0.52, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <motion.div
      ref={ref}
      className="projects-grid"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'show' : 'hidden'}
    >
      <AnimatePresence mode="popLayout">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            layout
            variants={cardVariants}
            whileHover={{ y: -6, transition: { duration: 0.22 } }}
            className="project-card"
          >
            <h3 className="project-title">{project.title}</h3>
            <p className="project-tech">{project.tech}</p>
            <p className="project-desc">{project.description}</p>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="github-btn"
            >
              <Github size={15} />
              View on GitHub
            </a>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function Portfolio() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [particles, setParticles] = useState([]);

  // Enhancement 1 name typed once (non-cycling)
  const [displayText, setDisplayText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const fullText = "Muhammad Ahmad";

  // Enhancement 3A — filter state
  const [activeFilter, setActiveFilter] = useState('All');
  const filteredProjects = activeFilter === 'All'
    ? ALL_PROJECTS
    : ALL_PROJECTS.filter(p => p.category === activeFilter);


  // Particles
  useEffect(() => {
    const pts = Array.from({ length: 38 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 5 + 3,
      duration: Math.random() * 16 + 10,
      delay: Math.random() * 10
    }));
    setParticles(pts);
  }, []);

  // Name typewriter (once)
  useEffect(() => {
    let idx = 0;
    const iv = setInterval(() => {
      if (idx < fullText.length) {
        setDisplayText(fullText.slice(0, idx + 1));
        idx++;
      } else {
        setIsTypingComplete(true);
        clearInterval(iv);
      }
    }, 100);
    return () => clearInterval(iv);
  }, []);

  // Intersection observer for nav highlight
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { threshold: 0.25 }
    );
    document.querySelectorAll('section[id]').forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const handleDownloadCV = () => {
    fetch('/cv.pdf', { method: 'HEAD' }).then(res => {
      const link = document.createElement('a');
      if (res.ok) {
        link.href = '/cv.pdf';
        link.download = 'Muhammad_Ahmad_CV.pdf';
      } else {
        const blob = new Blob([`MUHAMMAD AHMAD\nLahore, Pakistan | mahmadimran383@gmail.com`], { type: 'text/plain' });
        link.href = URL.createObjectURL(blob);
        link.download = 'Muhammad_Ahmad_CV.txt';
      }
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }).catch(() => {});
  };

  return (
    <div className="portfolio-root">
      <style>{`
        /* ── ENHANCEMENT 1: Deep dark palette + neon gradient system ── */
        :root {
          --bg-deep:      #0b0f19;
          --bg-card:      #111a2e;
          --bg-card-alt:  #0f1829;
          --border:       rgba(59,130,246,0.18);
          --border-hover: rgba(6,182,212,0.55);
          --neon-start:   #00f2fe;
          --neon-end:     #4facfe;
          --text-muted:   #94a3b8;
          --text-main:    #e2e8f0;
          --accent-blue:  #60a5fa;
          --accent-cyan:  #22d3ee;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .portfolio-root {
          min-height: 100vh;
          background: var(--bg-deep);
          color: var(--text-main);
          overflow-x: hidden;
          font-family: 'Inter', system-ui, sans-serif;
        }

        /* ── Animated gradient bg ── */
        @keyframes bgShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animated-bg {
          position: fixed; inset: 0; z-index: -1;
          background: linear-gradient(135deg, #0b0f19 0%, #0d1829 30%, #091527 60%, #0b1523 100%);
          background-size: 400% 400%;
          animation: bgShift 18s ease infinite;
        }

        /* ── Particles ── */
        @keyframes floatUp {
          0%   { transform: translateY(100vh); opacity: 0; }
          8%   { opacity: 0.65; }
          92%  { opacity: 0.65; }
          100% { transform: translateY(-8vh) translateX(40px); opacity: 0; }
        }
        .particle {
          position: fixed; border-radius: 50%; pointer-events: none;
          background: radial-gradient(circle, rgba(6,182,212,0.55) 0%, rgba(59,130,246,0.25) 50%, transparent 100%);
          filter: blur(1px);
        }

        /* ── Nav ── */
        .nav {
          position: fixed; top: 0; width: 100%;
          background: rgba(11,15,25,0.82);
          backdrop-filter: blur(14px);
          border-bottom: 1px solid var(--border);
          z-index: 100;
        }
        .nav-inner {
          max-width: 1120px; margin: 0 auto;
          padding: 1rem 1.5rem;
          display: flex; justify-content: space-between; align-items: center;
        }
        .nav-logo {
          font-size: 1.4rem; font-weight: 800;
          background: linear-gradient(90deg, var(--accent-blue), var(--accent-cyan));
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }
        .nav-links { display: flex; gap: 2rem; align-items: center; }
        .nav-link {
          background: none; border: none; cursor: pointer;
          color: var(--text-muted); font-size: 0.95rem;
          position: relative; padding-bottom: 3px; transition: color 0.2s;
        }
        .nav-link::after {
          content: ''; position: absolute; bottom: 0; left: 0;
          width: 0; height: 2px;
          background: linear-gradient(90deg, var(--neon-start), var(--neon-end));
          transition: width 0.28s ease;
        }
        .nav-link:hover, .nav-link.active { color: var(--accent-cyan); }
        .nav-link:hover::after, .nav-link.active::after { width: 100%; }

        /* ── ENHANCEMENT 1: Neon Glow Buttons ── */
        .btn-neon {
          display: inline-flex; align-items: center; gap: 0.5rem;
          padding: 0.65rem 1.6rem; border-radius: 999px;
          font-weight: 700; font-size: 0.9rem; cursor: pointer;
          border: none; text-decoration: none;
          background: linear-gradient(135deg, var(--neon-start) 0%, var(--neon-end) 100%);
          color: #0b0f19;
          transition: transform 0.2s, box-shadow 0.3s;
        }
        .btn-neon:hover {
          transform: translateY(-2px) scale(1.04);
          box-shadow: 0 0 28px 6px rgba(0,242,254,0.35), 0 0 60px 12px rgba(79,172,254,0.18);
        }

        .btn-outline {
          display: inline-flex; align-items: center; gap: 0.5rem;
          padding: 0.6rem 1.4rem; border-radius: 8px;
          font-weight: 600; font-size: 0.88rem; cursor: pointer;
          text-decoration: none;
          border: 1px solid rgba(79,172,254,0.35);
          background: rgba(79,172,254,0.08);
          color: var(--accent-cyan);
          transition: transform 0.2s, box-shadow 0.3s, background 0.2s;
        }
        .btn-outline:hover {
          background: rgba(79,172,254,0.16);
          box-shadow: 0 0 18px 4px rgba(0,242,254,0.2);
          transform: translateY(-1px);
        }

        /* ── Hero ── */
        .hero { padding: 9rem 1.5rem 5rem; }
        .hero-inner {
          max-width: 1120px; margin: 0 auto;
          display: flex; flex-direction: column; align-items: center; gap: 2.5rem;
        }
        @media (min-width: 768px) {
          .hero-inner { flex-direction: row; }
          .nav-mobile-btn { display: none !important; }
        }
        .hero-avatar-wrap { position: relative; flex-shrink: 0; }
        @keyframes floatAvatar {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-14px); }
        }
        .hero-avatar {
          width: 220px; height: 220px; border-radius: 50%;
          overflow: hidden; border: 3px solid var(--accent-cyan);
          box-shadow: 0 0 32px 6px rgba(34,211,238,0.28);
          animation: floatAvatar 6s ease-in-out infinite;
        }
        .hero-avatar img { width: 100%; height: 100%; object-fit: cover; }
        .hero-badge {
          position: absolute; bottom: -8px; right: -8px;
          background: linear-gradient(135deg, var(--neon-start), var(--neon-end));
          color: #0b0f19; font-size: 0.75rem; font-weight: 700;
          padding: 0.35rem 0.9rem; border-radius: 999px;
        }
        .hero-text { flex: 1; }
        .hero-hi { font-size: 1rem; color: var(--text-muted); margin-bottom: 0.4rem; }
        .hero-name {
          font-size: clamp(2.6rem, 6vw, 4.5rem); font-weight: 900; line-height: 1.05;
          background: linear-gradient(120deg, var(--accent-blue), var(--accent-cyan), var(--accent-blue));
          background-size: 200%;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          min-height: 3.5rem;
        }
        /* ENHANCEMENT 2C: cycling typewriter subtitle */
        .hero-subtitle {
          font-size: 1.25rem; font-weight: 600;
          color: var(--accent-cyan); margin: 0.6rem 0 1rem;
          min-height: 2rem;
        }
        .cycling-typewriter { display: inline; }
        .typewriter-cursor {
          display: inline-block; margin-left: 2px;
          color: var(--neon-start);
          animation: blink 0.85s steps(1) infinite;
        }
        @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }

        .hero-bio {
          font-size: 0.97rem; color: var(--text-muted); line-height: 1.8;
          max-width: 600px; margin-bottom: 1.6rem;
        }
        .hero-actions { display: flex; gap: 0.8rem; flex-wrap: wrap; }

        /* ── Section wrapper ── */
        .section { padding: 5rem 1.5rem; }
        .section-inner { max-width: 1120px; margin: 0 auto; }
        .section-heading {
          font-size: 2.2rem; font-weight: 800; margin-bottom: 2.5rem;
          display: flex; align-items: center; gap: 0.7rem;
          color: var(--text-main);
        }
        .section-heading svg { color: var(--accent-blue); }

        /* ── Experience card ── */
        .exp-card {
          background: var(--bg-card); border: 1px solid var(--border);
          border-radius: 16px; padding: 2rem;
          transition: border-color 0.25s, box-shadow 0.25s;
        }
        .exp-card:hover {
          border-color: var(--border-hover);
          box-shadow: 0 0 24px rgba(6,182,212,0.12);
        }
        .exp-header { display: flex; justify-content: space-between; flex-wrap: wrap; margin-bottom: 1rem; }
        .exp-role { font-size: 1.3rem; font-weight: 700; color: var(--accent-blue); }
        .exp-company { color: var(--text-muted); font-size: 1rem; }
        .exp-date { color: var(--text-muted); font-size: 0.88rem; }
        .exp-list { list-style: none; space-y: 0.5rem; margin-bottom: 1.2rem; }
        .exp-list li { color: var(--text-muted); font-size: 0.93rem; margin-bottom: 0.4rem; }
        .exp-list li::before { content: '→ '; color: var(--accent-cyan); }

        /* ── ENHANCEMENT 3A: Filter Pills ── */
        .filter-pills {
          display: flex; flex-wrap: wrap; gap: 0.6rem; margin-bottom: 2rem;
        }
        .filter-pill {
          padding: 0.45rem 1.1rem; border-radius: 999px; cursor: pointer;
          font-size: 0.85rem; font-weight: 600; border: 1px solid var(--border);
          background: var(--bg-card-alt); color: var(--text-muted);
          transition: all 0.22s ease;
        }
        .filter-pill:hover { border-color: rgba(6,182,212,0.4); color: var(--accent-cyan); }
        .filter-pill.active {
          background: linear-gradient(135deg, rgba(0,242,254,0.15), rgba(79,172,254,0.15));
          border-color: var(--accent-cyan); color: var(--accent-cyan);
          box-shadow: 0 0 14px rgba(0,242,254,0.18);
        }

        /* ── ENHANCEMENT 2A/2B: Project Grid & Cards ── */
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.4rem;
        }
        .project-card {
          background: var(--bg-card);   /* #111a2e per spec */
          border: 1px solid var(--border);
          border-radius: 16px; padding: 1.6rem;
          display: flex; flex-direction: column; gap: 0.6rem;
          cursor: default;
          /* ENHANCEMENT 2B: soft cyan glow on hover via motion whileHover + this shadow */
          transition: border-color 0.25s, box-shadow 0.25s;
        }
        .project-card:hover {
          border-color: var(--border-hover);
          box-shadow: 0 10px 25px -5px rgba(6,182,212,0.15);
        }
        .project-title { font-size: 1.05rem; font-weight: 700; color: var(--accent-blue); }
        .project-tech  { font-size: 0.8rem; color: var(--accent-cyan); }
        .project-desc  { font-size: 0.88rem; color: var(--text-muted); line-height: 1.65; flex: 1; }
        .github-btn {
          display: inline-flex; align-items: center; gap: 0.4rem;
          padding: 0.45rem 1rem; border-radius: 8px;
          background: rgba(255,255,255,0.05); border: 1px solid var(--border);
          color: var(--text-muted); font-size: 0.82rem; font-weight: 600;
          text-decoration: none; width: fit-content;
          transition: background 0.2s, color 0.2s;
        }
        .github-btn:hover { background: rgba(255,255,255,0.1); color: var(--text-main); }

        /* ── Skills ── */
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 1.2rem;
        }
        .skill-card {
          background: var(--bg-card); border: 1px solid var(--border);
          border-radius: 14px; padding: 1.4rem;
          transition: border-color 0.22s, box-shadow 0.22s;
        }
        .skill-card:hover {
          border-color: var(--border-hover);
          box-shadow: 0 0 20px rgba(6,182,212,0.1);
        }
        .skill-cat { font-size: 0.95rem; font-weight: 700; color: var(--accent-blue); margin-bottom: 0.9rem; }
        .skill-tags { display: flex; flex-wrap: wrap; gap: 0.4rem; }
        .skill-tag {
          padding: 0.25rem 0.65rem; border-radius: 999px;
          background: rgba(96,165,250,0.1); color: var(--text-muted);
          font-size: 0.78rem;
          transition: background 0.2s, color 0.2s;
        }
        .skill-tag:hover { background: rgba(96,165,250,0.2); color: var(--text-main); }

        /* ── Education ── */
        .edu-card {
          background: var(--bg-card); border: 1px solid var(--border);
          border-radius: 16px; padding: 2rem; margin-bottom: 2rem;
        }
        .edu-degree { font-size: 1.3rem; font-weight: 700; color: var(--accent-blue); }
        .edu-school { color: var(--text-muted); }
        .certs-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px,1fr)); gap: 1rem; }
        .cert-card {
          display: flex; flex-direction: column; gap: 0.5rem;
          background: var(--bg-card); border: 1px solid var(--border);
          border-radius: 14px; padding: 1.2rem; text-decoration: none;
          transition: border-color 0.22s, box-shadow 0.22s;
        }
        .cert-card:hover {
          border-color: var(--border-hover);
          box-shadow: 0 0 18px rgba(6,182,212,0.12);
        }
        .cert-name { font-size: 0.95rem; font-weight: 600; color: var(--text-main); }
        .cert-platform { font-size: 0.8rem; color: var(--text-muted); }
        .cert-link { font-size: 0.8rem; color: var(--accent-cyan); margin-top: auto; }

        /* ── Contact ── */
        .contact-section { text-align: center; }
        .contact-heading { font-size: 2rem; font-weight: 800; margin-bottom: 0.75rem; }
        .contact-sub { color: var(--text-muted); margin-bottom: 2rem; }
        .contact-links { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.9rem; margin-bottom: 1.5rem; }
        .social-btn {
          display: inline-flex; align-items: center; gap: 0.5rem;
          padding: 0.6rem 1.3rem; border-radius: 10px;
          font-weight: 600; font-size: 0.9rem; text-decoration: none;
          border: 1px solid var(--border); background: var(--bg-card); color: var(--text-main);
          transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
        }
        .social-btn:hover {
          border-color: var(--border-hover);
          box-shadow: 0 0 16px rgba(6,182,212,0.18);
          transform: translateY(-2px);
        }

        /* ── Footer ── */
        .footer {
          padding: 2rem 1.5rem; border-top: 1px solid var(--border);
          text-align: center; color: var(--text-muted); font-size: 0.85rem;
        }

        /* ── Mobile nav ── */
        .nav-mobile-btn {
          background: none; border: none; color: var(--text-main); cursor: pointer;
        }
        .mobile-menu {
          display: flex; flex-direction: column; gap: 1rem;
          padding: 1rem 1.5rem 1.5rem; border-top: 1px solid var(--border);
        }
        @media (min-width: 768px) {
          .mobile-menu { display: none !important; }
          .nav-mobile-btn { display: none !important; }
        }
        @media (max-width: 767px) {
          .nav-links { display: none !important; }
        }

        /* ── Reduced motion ── */
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }
      `}</style>

      {/* Deep bg */}
      <div className="animated-bg" />

      {/* Particles */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
        {particles.map(p => (
          <div key={p.id} className="particle" style={{
            left: `${p.x}%`, bottom: 0,
            width: `${p.size}px`, height: `${p.size}px`,
            animation: `floatUp ${p.duration}s linear infinite`,
            animationDelay: `${p.delay}s`
          }} />
        ))}
      </div>

      {/* ── NAV ── */}
      <nav className="nav">
        <div className="nav-inner">
          <span className="nav-logo font-bold tracking-tight bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Muhammad Ahmad
          </span>
          <div className="nav-links">
            {['About', 'Experience', 'Projects', 'Skills', 'Education', 'Contact'].map(item => (
              <button
                key={item}
                className={`nav-link ${activeSection === item.toLowerCase() ? 'active' : ''}`}
                onClick={() => scrollTo(item.toLowerCase())}
              >
                {item}
              </button>
            ))}
            <button onClick={handleDownloadCV} className="btn-outline" style={{ borderRadius: 8 }}>
              <Download size={15} /> CV
            </button>
          </div>
          <button className="nav-mobile-btn" onClick={() => setMobileMenuOpen(o => !o)}>
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="mobile-menu">
            {['About', 'Experience', 'Projects', 'Skills', 'Education', 'Contact'].map(item => (
              <button key={item} className="nav-link" onClick={() => scrollTo(item.toLowerCase())}>{item}</button>
            ))}
            <button onClick={handleDownloadCV} className="btn-outline" style={{ width: 'fit-content' }}>
              <Download size={15} /> Download CV
            </button>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section id="about" className="hero">
        <div className="hero-inner">
          <div className="hero-avatar-wrap">
            <div className="hero-avatar">
              <img src="/profile.jpg" alt="Muhammad Ahmad" />
            </div>
            <span className="hero-badge">AI & ML Engineer</span>
          </div>

          <div className="hero-text">
            <p className="hero-hi">Hello, I'm</p>
            <h1 className="hero-name">
              {displayText}
              {!isTypingComplete && <span style={{ color: 'var(--neon-start)', animation: 'blink 0.85s steps(1) infinite' }}>|</span>}
            </h1>

            {/* ENHANCEMENT 2C: Cycling typewriter subtitle */}
            <p className="hero-subtitle">
              <CyclingTypewriter
                strings={["Large Language Models", "Predictive Analytics", "Explainable AI"]}
              />
            </p>

            <p className="hero-bio">
              <strong style={{ color: 'var(--accent-blue)' }}>AI & ML Engineer</strong> with hands-on experience in building{' '}
              <strong style={{ color: 'var(--accent-cyan)' }}>end-to-end machine learning solutions</strong>,{' '}
              <strong style={{ color: '#34d399' }}>NLP systems</strong>, and{' '}
              <strong style={{ color: '#a78bfa' }}>explainable AI applications</strong>. Proficient in Python, SQL, PyTorch, XGBoost, and HuggingFace Transformers — currently pursuing a BS in Data Science at{' '}
              <strong style={{ color: 'var(--accent-cyan)' }}>FAST-NUCES Lahore</strong>.
            </p>

            <div className="hero-actions">
              {/* ENHANCEMENT 1: Neon glow button */}
              <a
                href="https://calendly.com/mahmadimran383/30min"
                target="_blank" rel="noopener noreferrer"
                className="btn-neon"
              >
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Schedule a Call
              </a>
              <button onClick={handleDownloadCV} className="btn-neon" style={{ background: 'linear-gradient(135deg,#4facfe 0%,#00f2fe 100%)' }}>
                <Download size={17} /> Download CV
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section id="experience" className="section">
        <div className="section-inner">
          <h2 className="section-heading"><Briefcase size={28} /> Experience</h2>
          <div className="exp-card">
            <div className="exp-header">
              <div>
                <p className="exp-role">Technical Intern</p>
                <p className="exp-company">Nepta Solutions, United Kingdom (Remote)</p>
              </div>
              <span className="exp-date">Jun 2025 – Aug 2025</span>
            </div>
            <ul className="exp-list">
              <li>Participated in backend automation and integration tasks using C# and SAGE 50</li>
              <li>Assisted in exploring RESTful API workflows and system configurations</li>
              <li>Collaborated remotely via Microsoft Teams for task coordination</li>
            </ul>
            <a href="/certificate.jpg" target="_blank" rel="noopener noreferrer" className="btn-neon" style={{ width: 'fit-content', fontSize: '0.85rem' }}>
              <Award size={16} /> View Internship Certificate
            </a>
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="section">
        <div className="section-inner">
          <h2 className="section-heading"><Code size={28} /> Featured Projects</h2>

          {/* ENHANCEMENT 3A: Filter Pills */}
          <div className="filter-pills">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`filter-pill ${activeFilter === cat ? 'active' : ''}`}
                onClick={() => setActiveFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* ENHANCEMENT 2A/2B: Staggered Framer Motion Grid */}
          <ProjectGrid projects={filteredProjects} />
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" className="section">
        <div className="section-inner">
          <h2 className="section-heading"><Brain size={28} /> Technical Skills</h2>
          <div className="skills-grid">
            {Object.entries(skills).map(([cat, items]) => (
              <div key={cat} className="skill-card">
                <p className="skill-cat">{cat}</p>
                <div className="skill-tags">
                  {items.map(s => <span key={s} className="skill-tag">{s}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EDUCATION ── */}
      <section id="education" className="section">
        <div className="section-inner">
          <h2 className="section-heading"><GraduationCap size={28} /> Education & Certifications</h2>
          <div className="edu-card" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <div>
              <p className="edu-degree">Bachelor of Science in Data Science</p>
              <p className="edu-school">FAST-NUCES, Lahore</p>
            </div>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.88rem', alignSelf: 'flex-start', marginTop: '0.25rem' }}>2023 – Present</span>
          </div>

          <h3 style={{ color: 'var(--accent-blue)', fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem' }}>Certifications</h3>
          <div className="certs-grid">
            {[
              { name: "Feature Engineering for Machine Learning", platform: "DataCamp", link: "https://www.datacamp.com/statement-of-accomplishment/course/2c0a7a8b961475cb1c77d0a0289c5a3d870e6c0b?raw=1" },
              { name: "Deep Learning with PyTorch", platform: "DataCamp", link: "https://www.datacamp.com/statement-of-accomplishment/course/9eabbc32e0ca84d8f4a892be28c99fa1c06c19d6?raw=1" },
              { name: "IBM Machine Learning", platform: "Coursera", link: "https://www.coursera.org/account/accomplishments/specialization/certificate/SJFWK6SVPRFA" },
              { name: "Prompt Engineering with OpenAI API", platform: "DataCamp", link: "https://www.datacamp.com/statement-of-accomplishment/course/e18d6c6bb8e10cd4cd046e0be8e8f8a8cded9148?raw=1" },
              { name: "Working with the OpenAI API", platform: "DataCamp", link: "https://www.datacamp.com/statement-of-accomplishment/course/b135f4db28f88d7627f1227a46517ee79d529882?raw=1" },
              { name: "Deep Learning and Reinforcement Learning", platform: "Coursera", link: "https://www.coursera.org/account/accomplishments/certificate/M7W3YP1FABUB" },
              { name: "Exploratory Data Analysis for ML", platform: "Coursera", link: "https://www.coursera.org/account/accomplishments/certificate/C8RXZNE7K3SC" }
            ].map((cert, i) => (
              <a key={i} href={cert.link} target="_blank" rel="noopener noreferrer" className="cert-card">
                <div style={{ display: 'flex', gap: '0.7rem', alignItems: 'flex-start' }}>
                  <Award size={20} style={{ color: 'var(--accent-cyan)', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <p className="cert-name">{cert.name}</p>
                    <p className="cert-platform">{cert.platform}</p>
                  </div>
                </div>
                <p className="cert-link">View Certificate →</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="section contact-section">
        <div className="section-inner">
          <h2 className="contact-heading">Let's Connect</h2>
          <p className="contact-sub">Open to opportunities, collaborations, and interesting projects.</p>
          <div className="contact-links">
            <a href="https://github.com/Muhammad-Ahmad2511" target="_blank" rel="noopener noreferrer" className="social-btn">
              <Github size={18} /> GitHub
            </a>
            <a href="https://www.linkedin.com/in/hafiz-muhammad-ahmad-b76304273/" target="_blank" rel="noopener noreferrer" className="social-btn" style={{ background: '#1d4ed8' }}>
              <Linkedin size={18} /> LinkedIn
            </a>
            <a href="mailto:mahmadimran383@gmail.com" className="social-btn">
              <Mail size={18} /> Email
            </a>
          </div>
          <a href="tel:+923264498774" className="btn-neon">
            Call Me
          </a>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        © 2026 Muhammad Ahmad. All rights reserved.
      </footer>
    </div>
  );
}