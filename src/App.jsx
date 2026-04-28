import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, Phone, MapPin, Award, Briefcase, GraduationCap, Code, Brain, Menu, X, Download } from 'lucide-react';

export default function Portfolio() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);
  const fullText = "Muhammad Ahmad";

  // Generate particles
  useEffect(() => {
    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 40; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 6 + 3,
          duration: Math.random() * 15 + 10,
          delay: Math.random() * 10
        });
      }
      setParticles(newParticles);
    };
    generateParticles();
  }, []);

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayText(fullText.slice(0, index + 1));
        index++;
      } else {
        setIsTypingComplete(true);
        clearInterval(typingInterval);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, []);

  // Scroll animation observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.2 }
    );

    const sections = document.querySelectorAll('.scroll-section');
    sections.forEach((section) => observer.observe(section));

    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  // Mouse tracking for background effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const projects = [
    {
      title: "Adult Income Prediction Model",
      tech: "Python, Machine Learning",
      description: "Created an ML model using preprocessing and feature engineering to predict income levels with high accuracy.",
      github: "https://github.com/Muhammad-Ahmad2511/ML-Project-for-Income-prediction"
    },
    {
      title: "Electronics Inventory Management Dashboard",
      tech: "Power BI",
      description: "Designed an interactive dashboard displaying stock levels, shortages, and inventory trends for data-driven decision making.",
      github: "https://github.com/Muhammad-Ahmad2511/Electronics-Inventory-Management-Dashboard"
    },
    {
      title: "Eco Friendly Habit Tracker",
      tech: "C#",
      description: "Developed a habit tracking app with user authentication, progress charts, reminders, and streak-based motivation features.",
      github: "https://github.com/Muhammad-Ahmad2511/Eco-friendly-habit-tracker"
    },
    {
      title: "Retail Inventory Analytics & Business Intelligence",
      tech: "ETL, Data Warehousing, BI Dashboards",
      description: "Designed a data warehouse and BI solution to analyze retail sales, inventory levels, pricing, discounts, seasonality, and regional performance using ETL pipelines and interactive dashboards.",
      github: "https://github.com/Muhammad-Ahmad2511/retail-inventory-analytics-bi"
    }
  ];

  const skills = {
    "Programming": ["C", "C++", "Python", "C#", "SQL"],
    "ML / AI": ["Regression", "Classification", "Clustering", "Dimensionality Reduction", "Feature Engineering", "Data Mining", "NLP"],
    "EDA / Analysis": ["Exploratory Data Analysis", "Data Cleaning", "Statistical Analysis", "Probabilistic Analysis", "Image Processing"],
    "Data / DB": ["PostgreSQL", "SQL Server", "Data Warehousing", "ETL", "SQL Optimization"],
    "Visualization": ["Matplotlib", "Seaborn", "Power BI", "Tableau"],
    "Deep Learning": ["PyTorch", "ANN", "RNN"],
    "Tools": ["Jupyter", "VS Code", "Visual Studio", "Google Colab", "Git/GitHub"],
    "Soft Skills": ["Analytical Thinking", "Collaboration", "Adaptability", "Problem Solving"],
    "Other": ["Web Scraping", "Microsoft Office"]
  };

  const handleDownloadCV = () => {
    const publicCvUrl = '/cv.pdf';
    fetch(publicCvUrl, { method: 'HEAD' }).then(res => {
      if (res.ok) {
        const link = document.createElement('a');
        link.href = publicCvUrl;
        link.download = 'Muhammad_Ahmad_CV.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        const cvContent = `MUHAMMAD AHMAD
Lahore, Pakistan | +92 3264498774 | mahmadimran383@gmail.com

OBJECTIVE
Aspiring Data Scientist with hands-on experience in machine learning, data preprocessing, and analytics.

EXPERIENCE
Technical Intern | Nepta Solutions, UK (Remote) | Jun 2025 – Aug 2025
• Backend automation and integration tasks using C# and SAGE 50
• RESTful API workflows and system configurations

EDUCATION
Bachelor of Science in Data Science | FAST-NUCES, Lahore | 2023 – Present

SKILLS
Programming: C, C++, Python, C#, SQL
ML/AI: Regression, Classification, Clustering, NLP, Feature Engineering
Tools: PyTorch, Power BI, Tableau, PostgreSQL

CERTIFICATIONS
• Feature Engineering for Machine Learning - DataCamp
• Deep Learning with PyTorch - DataCamp
• IBM Machine Learning - Coursera`;

        const blob = new Blob([cvContent], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'Muhammad_Ahmad_CV.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }
    }).catch(() => {
      const cvContent = `MUHAMMAD AHMAD
Lahore, Pakistan | +92 3264498774 | mahmadimran383@gmail.com

OBJECTIVE
Aspiring Data Scientist with hands-on experience in machine learning, data preprocessing, and analytics.

EXPERIENCE
Technical Intern | Nepta Solutions, UK (Remote) | Jun 2025 – Aug 2025
• Backend automation and integration tasks using C# and SAGE 50
• RESTful API workflows and system configurations

EDUCATION
Bachelor of Science in Data Science | FAST-NUCES, Lahore | 2023 – Present

SKILLS
Programming: C, C++, Python, C#, SQL
ML/AI: Regression, Classification, Clustering, NLP, Feature Engineering
Tools: PyTorch, Power BI, Tableau, PostgreSQL

CERTIFICATIONS
• Feature Engineering for Machine Learning - DataCamp
• Deep Learning with PyTorch - DataCamp
• IBM Machine Learning - Coursera`;

      const blob = new Blob([cvContent], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Muhammad_Ahmad_CV.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    });
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white overflow-x-hidden relative">
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out;
        }

        .scroll-section {
          opacity: 0;
          transform: translateY(50px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }

        .scroll-section.show {
          opacity: 1;
          transform: translateY(0);
        }

        .stagger-item {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }

        .scroll-section.show .stagger-item {
          opacity: 1;
          transform: translateY(0);
        }

        .scroll-section.show .stagger-item:nth-child(1) { transition-delay: 0.1s; }
        .scroll-section.show .stagger-item:nth-child(2) { transition-delay: 0.2s; }
        .scroll-section.show .stagger-item:nth-child(3) { transition-delay: 0.3s; }
        .scroll-section.show .stagger-item:nth-child(4) { transition-delay: 0.4s; }
        .scroll-section.show .stagger-item:nth-child(5) { transition-delay: 0.5s; }
        .scroll-section.show .stagger-item:nth-child(6) { transition-delay: 0.6s; }

        .animated-bg {
          background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 25%, #0f172a 50%, #1e40af 75%, #0f172a 100%);
          background-size: 400% 400%;
          animation: gradientShift 15s ease infinite;
        }

        .tilt-card {
          transform-style: preserve-3d;
          transition: transform 0.3s ease;
        }

        .tilt-card:hover {
          transform: scale(1.05);
        }

        .profile-float {
          animation: float 6s ease-in-out infinite;
        }

        .nav-indicator {
          position: relative;
        }

        .nav-indicator::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #3b82f6, #06b6d4);
          transition: width 0.3s ease;
        }

        .nav-indicator.active::after,
        .nav-indicator:hover::after {
          width: 100%;
        }

        .glow-on-hover {
          transition: box-shadow 0.3s ease;
        }

        .glow-on-hover:hover {
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
        }

        .particle {
          position: fixed;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.6) 0%, rgba(6, 182, 212, 0.3) 50%, transparent 100%);
          border-radius: 50%;
          pointer-events: none;
          filter: blur(1px);
        }

        @keyframes float-particle {
          0% {
            transform: translateY(100vh) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          90% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-10vh) translateX(50px);
            opacity: 0;
          }
        }

        .connection-line {
          position: absolute;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.3), transparent);
          pointer-events: none;
          animation: fade-in-out 3s ease-in-out infinite;
        }

        @keyframes fade-in-out {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }
      `}</style>

      {/* Animated Background */}
      <div className="fixed inset-0 animated-bg -z-10"></div>

      {/* Floating Particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="particle"
            style={{
              left: `${particle.x}%`,
              bottom: '0',
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animation: `float-particle ${particle.duration}s linear infinite`,
              animationDelay: `${particle.delay}s`
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-900/80 backdrop-blur-md z-50 border-b border-blue-500/20">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">MA</h1>
            <div className="hidden md:flex gap-8 items-center">
              {['About', 'Experience', 'Projects', 'Skills', 'Education', 'Contact'].map(item => (
                <button 
                  key={item} 
                  onClick={() => scrollToSection(item.toLowerCase())} 
                  className={`nav-indicator hover:text-blue-400 transition-colors ${activeSection === item.toLowerCase() ? 'active text-blue-400' : ''}`}
                >
                  {item}
                </button>
              ))}
              <button 
                onClick={handleDownloadCV}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg font-semibold transition-all hover:scale-105 border border-blue-500/30"
              >
                <Download size={16} />
                CV
              </button>
            </div>
            <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 flex flex-col gap-4">
              {['About', 'Experience', 'Projects', 'Skills', 'Education', 'Contact'].map(item => (
                <button key={item} onClick={() => scrollToSection(item.toLowerCase())} className="text-left hover:text-blue-400">
                  {item}
                </button>
              ))}
              <button 
                onClick={handleDownloadCV}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg font-semibold transition-all text-left"
              >
                <Download size={16} />
                Download CV
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="about" className="pt-32 pb-20 px-6 scroll-section show">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12 mb-8">
            <div className="relative flex-shrink-0 profile-float">
              <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-blue-400 shadow-2xl shadow-blue-500/50 glow-on-hover">
                <img src="/profile.jpg" alt="Muhammad Ahmad" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                AI & ML Engineer
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <p className="text-lg text-slate-300 mb-2">Hello, I'm</p>
              <h1 className="text-5xl md:text-7xl font-bold mb-4 min-h-[4rem] md:min-h-[5rem]">
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  {displayText}
                  {!isTypingComplete && <span className="animate-pulse">|</span>}
                </span>
              </h1>
              <p className={`text-xl md:text-2xl text-blue-300 mb-6 transition-all duration-1000 ${isTypingComplete ? 'opacity-100' : 'opacity-0'}`}>
                AI & ML Engineer
              </p>
              <p className={`text-base text-slate-300 max-w-2xl mb-6 leading-relaxed transition-all duration-1000 ${isTypingComplete ? 'opacity-100' : 'opacity-0'}`}>
  <span className="text-blue-400 font-semibold">AI & ML Engineer</span> with hands-on experience in building{' '}
  <span className="text-cyan-400 font-semibold">end-to-end machine learning solutions</span>,{' '}
  <span className="text-emerald-400 font-semibold">NLP systems</span>, and{' '}
  <span className="text-indigo-400 font-semibold">explainable AI applications</span>. Proficient in{' '}
  <span className="text-green-400 font-semibold">Python</span>,{' '}
  <span className="text-yellow-400 font-semibold">SQL</span>,{' '}
  <span className="text-purple-400 font-semibold">PyTorch</span>,{' '}
  <span className="text-rose-400 font-semibold">XGBoost</span>, and{' '}
  <span className="text-violet-400 font-semibold">HuggingFace Transformers</span> — skilled in{' '}
  <span className="text-pink-400 font-semibold">fine-tuning LLMs</span>, designing{' '}
  <span className="text-orange-400 font-semibold">data warehouses</span>, and building{' '}
  <span className="text-teal-400 font-semibold">interactive Power BI dashboards</span>. Currently pursuing a Bachelor's in{' '}
  <span className="text-blue-300 font-semibold">Data Science</span> at{' '}
  <span className="text-cyan-300 font-semibold">FAST-NUCES Lahore</span>, building real-world AI solutions including a{' '}
  <span className="text-sky-400 font-semibold">car price predictor with SHAP explainability</span>, an{' '}
  <span className="text-emerald-300 font-semibold">NLP emotion detector</span>, and a{' '}
  <span className="text-indigo-300 font-semibold">retail data warehouse with 98% query speedup</span>.
</p>

              <div className={`flex gap-4 transition-all duration-1000 ${isTypingComplete ? 'opacity-100' : 'opacity-0'}`}>
                <a 
                  href="https://calendly.com/mahmadimran383/30min" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 rounded-full font-semibold transition-all hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Schedule a Call
                </a>
                
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="py-20 px-6 scroll-section">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 flex items-center gap-3">
            <Briefcase className="text-blue-400" />
            Experience
          </h2>
          <div className="stagger-item bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-blue-500/20 hover:border-blue-500/40 transition-all glow-on-hover">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
              <div>
                <h3 className="text-2xl font-bold text-blue-400">Technical Intern</h3>
                <p className="text-xl text-slate-300">Nepta Solutions, United Kingdom</p>
              </div>
              <span className="text-slate-400 mt-2 md:mt-0">Jun 2025 – Aug 2025</span>
            </div>
            <ul className="space-y-2 text-slate-300 mb-4">
              <li>• Participated in backend automation and integration tasks using C# and SAGE 50</li>
              <li>• Assisted in exploring RESTful API workflows and system configurations</li>
              <li>• Collaborated remotely via Microsoft Teams for task coordination</li>
            </ul>
            <a 
              href="/certificate.jpg" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-lg font-semibold transition-all hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50"
            >
              <Award size={20} />
              View Internship Certificate
            </a>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-20 px-6 scroll-section">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 flex items-center gap-3">
            <Code className="text-blue-400" />
            Featured Projects
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <div key={index} className="stagger-item tilt-card bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20">
                <h3 className="text-xl font-bold text-blue-400 mb-2">{project.title}</h3>
                <p className="text-sm text-cyan-400 mb-3">{project.tech}</p>
                <p className="text-slate-300 mb-4">{project.description}</p>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm font-semibold transition-all hover:scale-105"
                >
                  <Github size={16} />
                  View on GitHub
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="py-20 px-6 scroll-section">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 flex items-center gap-3">
            <Brain className="text-blue-400" />
            Technical Skills
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(skills).map(([category, items], index) => (
              <div key={category} className="stagger-item bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-blue-500/20 glow-on-hover transition-all">
                <h3 className="text-lg font-bold text-blue-400 mb-4">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill, idx) => (
                    <span key={idx} className="px-3 py-1 bg-blue-500/20 rounded-full text-sm text-slate-300 hover:bg-blue-500/30 transition-colors">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education */}
      <section id="education" className="py-20 px-6 scroll-section">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 flex items-center gap-3">
            <GraduationCap className="text-blue-400" />
            Education & Certifications
          </h2>
          <div className="stagger-item bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-blue-500/20 mb-8 glow-on-hover">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start">
              <div>
                <h3 className="text-2xl font-bold text-blue-400">Bachelor of Science in Data Science</h3>
                <p className="text-xl text-slate-300">FAST-NUCES, Lahore</p>
              </div>
              <span className="text-slate-400 mt-2 md:mt-0">2023 – Present</span>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-blue-400 mb-6">Certifications</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { name: "Feature Engineering for Machine Learning", platform: "DataCamp", link: "https://www.datacamp.com/statement-of-accomplishment/course/2c0a7a8b961475cb1c77d0a0289c5a3d870e6c0b?raw=1" },
              { name: "Deep Learning with PyTorch", platform: "DataCamp", link: "https://www.datacamp.com/statement-of-accomplishment/course/9eabbc32e0ca84d8f4a892be28c99fa1c06c19d6?raw=1" },
              { name: "IBM Machine Learning", platform: "Coursera", link: "https://www.coursera.org/account/accomplishments/specialization/certificate/SJFWK6SVPRFA" },
              { name: "Prompt Engineering with OpenAI API", platform: "DataCamp", link: "https://www.datacamp.com/statement-of-accomplishment/course/e18d6c6bb8e10cd4cd046e0be8e8f8a8cded9148?raw=1" },
              { name: "Working with the OpenAI API", platform: "DataCamp", link: "https://www.datacamp.com/statement-of-accomplishment/course/b135f4db28f88d7627f1227a46517ee79d529882?raw=1" },
              { name: "Deep Learning and Reinforcement Learning", platform: "Coursera", link: "https://www.coursera.org/account/accomplishments/certificate/M7W3YP1FABUB" },
              { name: "Exploratory Data Analysis for ML", platform: "Coursera", link: "https://www.coursera.org/account/accomplishments/certificate/C8RXZNE7K3SC" }
            ].map((cert, index) => (
              <a 
                key={index} 
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="stagger-item bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-blue-500/20 hover:border-blue-500/40 transition-all glow-on-hover group"
              >
                <div className="flex items-start gap-3 mb-3">
                  <Award size={24} className="text-cyan-400 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <div>
                    <h4 className="text-lg font-bold text-slate-200 group-hover:text-blue-400 transition-colors mb-1">{cert.name}</h4>
                    <p className="text-sm text-slate-400">{cert.platform}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-cyan-400 group-hover:text-cyan-300">
                  <span>View Certificate</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
{/* FAQs */}
<section id="faqs" className="py-20 px-6 scroll-section">
  <div className="max-w-4xl mx-auto">
    <h2 className="text-4xl font-bold mb-12 text-center">
      Frequently Asked Questions (FAQs)
    </h2>

    {[{
      q: "What services do you offer?",
      a: "Machine learning model development, data analysis, interactive dashboard creation and ETL pipeline design."
    },{
      q: "What programming languages and tools do you use?",
      a: "I primarily work with Python, SQL, PyTorch for ML/AI, and Power BI/Tableau for visualizations."
    },{
      q: "Are you available for freelance or contract work?",
      a: "Yes, I'm open to freelance projects, internships, and part-time opportunities while completing my degree."
    },{
      q: "What types of projects have you worked on?",
      a: "Income prediction models, inventory management dashboards, habit tracking apps, and business intelligence solutions with real-world data."
    },{
      q: "How long does a typical project take?",
      a: "Project timelines vary based on scope, but most small to medium projects take 2–4 weeks from kickoff to delivery."
    },{
      q: "How can I get in touch with you?",
      a: "You can email me at mahmadimran383@gmail.com, connect on LinkedIn, or schedule a call directly through the contact section."
    }].map((item, index) => (
      <details
  key={index}
  className="group mb-4 border border-blue-500/30 rounded-lg bg-slate-900/60
             transition-all duration-300
             hover:border-blue-400
             hover:bg-blue-500/10
             hover:shadow-lg
             hover:shadow-blue-500/30"
>

        <summary className="flex justify-between items-center cursor-pointer list-none px-6 py-4 text-lg font-semibold text-white">
          {item.q}
          <span className="text-blue-400 text-2xl transition-transform group-open:rotate-45">
            +
          </span>
        </summary>

        <div className="px-6 pb-4 text-slate-300 leading-relaxed">
          {item.a}
        </div>
      </details>
    ))}
  </div>
</section>


      {/* Contact */}
      <section id="contact" className="py-20 px-6 scroll-section">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Let's Connect</h2>
          <p className="text-xl text-slate-300 mb-8">
            I'm always open to discussing new opportunities and interesting projects.
          </p>
          
          {/* Social Links */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <a
              href="https://github.com/Muhammad-Ahmad2511"
              target="_blank"
              rel="noopener noreferrer"
              className="stagger-item inline-flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-lg font-semibold transition-all hover:scale-105 glow-on-hover"
            >
              <Github size={20} />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/hafiz-muhammad-ahmad-b76304273/"
              target="_blank"
              rel="noopener noreferrer"
              className="stagger-item inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-all hover:scale-105 glow-on-hover"
            >
              <Linkedin size={20} />
              LinkedIn
            </a>
            <a
              href="mailto:mahmadimran383@gmail.com"
              className="stagger-item inline-flex items-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg font-semibold transition-all hover:scale-105 glow-on-hover"
            >
              <Mail size={20} />
              Email
            </a>
          </div>

          {/* Contact Actions */}
          <div className="flex justify-center stagger-item">
            <a href="tel:+923264498774" className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 rounded-full font-semibold transition-all hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50">
              Call Me
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-blue-500/20">
        <div className="max-w-6xl mx-auto text-center text-slate-400">
          <p>© 2026 Muhammad Ahmad. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}