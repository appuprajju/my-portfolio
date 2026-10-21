"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import Link from "next/link";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const Scene = dynamic(() => import("./Scene"), { ssr: false });

export default function Dev() {
  const [activeTab, setActiveTab] = useState<"about" | "arsenal" | "philosophy" | "impact">("about");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [activeTerminalCmd, setActiveTerminalCmd] = useState<"profile" | "security" | "stack">("profile");

  const developerEmail = "prajwal.dpm@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(developerEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <div className="liquid-bg">
      <div className="liquid-grid-overlay" />

      {/* Header */}
      <header className="dev-header">
        <div className="dev-container dev-header-inner">
          <Link href="/" className="dev-brand">
            <img 
              src={`/images/prajwal-portrait.jpg`} 
              alt="Prajwal M" 
              className="dev-avatar-badge" 
              style={{ objectFit: "cover", padding: 0 }} 
            />
            <div>
              <div className="dev-brand-name">Prajwal M</div>
              <div className="dev-brand-role">Digital Solutions Engineer</div>
            </div>
          </Link>

          <div className="dev-header-actions">
            <div className="dev-status-tag">
              <span className="status-dot" />
              <span>Available for Hire & Projects</span>
            </div>

            <Link href="/" className="btn-liquid-glass" style={{ fontSize: 13, padding: "9px 18px" }}>
              ← Return to Portfolio
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="dev-hero-section">
        <div className="dev-container">
          <div className="dev-hero-grid">
            
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="dev-hero-left"
            >
              <div className="dev-badge-group">
                <span className="liquid-pill liquid-pill-active">
                  <span style={{ color: "#8ee7ff" }}>✦</span> Developer Intro
                </span>
                <span className="liquid-pill">
                  <span>🛡️ Security Engineer</span>
                </span>
                <span className="liquid-pill">
                  <span>⚡ Full-Stack Architect</span>
                </span>
              </div>

              <h1 className="dev-hero-title">
                Engineered with <br />
                <span className="liquid-text-gradient">Precision & Zero Trust.</span>
              </h1>

              <p className="dev-hero-copy">
                Hi, I'm <strong style={{ color: "white" }}>Prajwal M</strong>. I build high-performance web systems, security intelligence products, and mobile experiences. My work bridges complex backend systems with fluid, pixel-perfect user interfaces.
              </p>

              <div className="dev-hero-actions">
                <a href="#contact-dev" className="btn-liquid-glass btn-liquid-primary">
                  <span>Initiate Project</span>
                  <span style={{ fontSize: 16 }}>↗</span>
                </a>

                <button onClick={handleCopyEmail} className="btn-liquid-glass">
                  <span>{copiedEmail ? "✓ Email Copied!" : "Copy Developer Email"}</span>
                </button>
              </div>

              <div className="dev-hero-stats">
                <div>
                  <div className="dev-stat-item-label">Experience</div>
                  <div className="dev-stat-item-val">2+ Years</div>
                </div>
                <div>
                  <div className="dev-stat-item-label">Core Focus</div>
                  <div className="dev-stat-item-val" style={{ color: "#8ee7ff" }}>Web & Cyber</div>
                </div>
                <div>
                  <div className="dev-stat-item-label">Code Standard</div>
                  <div className="dev-stat-item-val" style={{ color: "#cbb9ff" }}>Strict SecOps</div>
                </div>
              </div>
            </motion.div>

            {/* Right Side: 3D Hero Glass Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2 }}
            >
              <div className="dev-hero-card">
                
                {/* Embedded 3D Canvas */}
                <div className="dev-3d-canvas-bg">
                  <Scene />
                </div>

                {/* Top Badge */}
                <div className="dev-card-top-bar">
                  <span className="dev-node-badge">
                    STATUS // ACTIVE_NODE
                  </span>
                  <span className="status-dot" />
                </div>

                {/* Bottom Overlay Card */}
                <div className="dev-card-bottom-info">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "#8ee7ff", textTransform: "uppercase" }}>
                      Developer Dossier
                    </span>
                    <span style={{ fontSize: 11, fontFamily: "monospace", color: "#888894" }}>v2.6.0</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "4px 0" }}>
                    <img 
                      src={`/images/prajwal-portrait.jpg`} 
                      alt="Prajwal M" 
                      style={{ width: 32, height: 32, borderRadius: "50%", objectFit: "cover", border: "1px solid rgba(142, 231, 255, 0.4)", flexShrink: 0 }} 
                    />
                    <div style={{ fontSize: 14, fontWeight: 600, color: "white" }}>
                      Prajwal M — Solutions Engineer
                    </div>
                  </div>
                  <div style={{ fontSize: 12, color: "#b0b0bb", lineHeight: 1.5 }}>
                    Specialized in Next.js, React, TypeScript, Python (FastAPI), Cybersecurity analytics, and mobile app design.
                  </div>
                </div>

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Terminal Section */}
      <section className="dev-section-terminal">
        <div className="dev-container">
          <div className="dev-section-header-flex">
            <div>
              <div className="eyebrow">01 — Interactive Terminal</div>
              <h2 style={{ fontSize: "clamp(24px, 3.5vw, 36px)", fontFamily: "Space Grotesk, sans-serif", margin: "6px 0 0 0" }}>
                Developer <span className="liquid-text-gradient">Console Environment</span>
              </h2>
            </div>

            <div className="dev-cmd-switcher">
              <button
                onClick={() => setActiveTerminalCmd("profile")}
                className={`dev-cmd-btn ${activeTerminalCmd === "profile" ? "active" : ""}`}
              >
                Developer Overview
              </button>
              <button
                onClick={() => setActiveTerminalCmd("security")}
                className={`dev-cmd-btn ${activeTerminalCmd === "security" ? "active" : ""}`}
              >
                Security & Compliance
              </button>
              <button
                onClick={() => setActiveTerminalCmd("stack")}
                className={`dev-cmd-btn ${activeTerminalCmd === "stack" ? "active" : ""}`}
              >
                Tech Stack Architecture
              </button>
            </div>
          </div>

          <div className="glass-terminal">
            <div className="glass-terminal-header">
              <div className="terminal-dots">
                <span className="t-dot t-dot-red" />
                <span className="t-dot t-dot-yellow" />
                <span className="t-dot t-dot-green" />
              </div>
              <div style={{ fontSize: 12, color: "#888894" }}>Solutions Architecture Console</div>
              <div style={{ fontSize: 12, color: "#8ee7ff" }}>ONLINE</div>
            </div>

            <div className="terminal-body">
              <div className="terminal-prompt-line">
                <span style={{ color: "#8ee7ff", fontWeight: 700 }}>▸</span>
                <span style={{ color: "white", fontWeight: 500 }}>
                  {activeTerminalCmd === "profile" && "Developer Overview & Specializations"}
                  {activeTerminalCmd === "security" && "Security Compliance & Zero-Trust Audit"}
                  {activeTerminalCmd === "stack" && "Tech Stack Architecture Inspection"}
                </span>
              </div>

              {activeTerminalCmd === "profile" && (
                <motion.pre
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="terminal-json-block"
                >
{`{
  "developer": "Prajwal M",
  "title": "Digital Solutions Engineer & Security Strategist",
  "location": "Global / Remote",
  "experience_years": 2,
  "specializations": [
    "Full-Stack Web Development (Next.js, React, Node.js)",
    "Cybersecurity & Threat Intelligence Dashboards",
    "Mobile Applications (Android, React Native)",
    "RESTful APIs & Microservices (Python, FastAPI, Postgres)"
  ],
  "status": "Available for Freelance Projects & Strategic Consultations"
}`}
                </motion.pre>
              )}

              {activeTerminalCmd === "security" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 12 }}
                >
                  <div style={{ color: "#34d399" }}>[PASS] Static Analysis (SAST): 0 High vulnerabilities found</div>
                  <div style={{ color: "#34d399" }}>[PASS] Dependency Vulnerability Scan: Clean</div>
                  <div style={{ color: "#8ee7ff" }}>[INFO] Authentication: JWT / OAuth2 / PKCE enforced</div>
                  <div style={{ color: "#cbb9ff" }}>[INFO] Data Protection: AES-256 GCM encryption at rest</div>
                  <div style={{ color: "#a0a0ab", marginTop: 8 }}>✔ Security Health Index: 99.8 / 100</div>
                </motion.div>
              )}

              {activeTerminalCmd === "stack" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="dev-stack-grid"
                >
                  <div className="dev-stack-card">
                    <span className="dev-stack-card-title" style={{ color: "#8ee7ff" }}>Frontend Layer</span>
                    <span style={{ fontSize: 12, color: "#c0c0ca" }}>Next.js 14, React 18, TypeScript, Vanilla CSS, Framer Motion, Three.js / R3F</span>
                  </div>
                  <div className="dev-stack-card">
                    <span className="dev-stack-card-title" style={{ color: "#cbb9ff" }}>Backend & API</span>
                    <span style={{ fontSize: 12, color: "#c0c0ca" }}>Node.js, Express, Python, FastAPI, PostgreSQL, Redis</span>
                  </div>
                  <div className="dev-stack-card">
                    <span className="dev-stack-card-title" style={{ color: "#34d399" }}>Security & Cloud</span>
                    <span style={{ fontSize: 12, color: "#c0c0ca" }}>Threat Intel Workflows, Cloudflare, Docker, GCP, OAuth2</span>
                  </div>
                  <div className="dev-stack-card">
                    <span className="dev-stack-card-title" style={{ color: "#fbbf24" }}>Mobile & Tools</span>
                    <span style={{ fontSize: 12, color: "#c0c0ca" }}>Android (Kotlin), React Native, Git, Postman, Figma</span>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Dossier Tabs Section */}
      <section className="dev-dossier-section">
        <div className="dev-container">
          
          <div className="dev-section-title-center">
            <div className="eyebrow">02 — Comprehensive Dossier</div>
            <h2 style={{ fontSize: "clamp(28px, 4.5vw, 48px)", fontFamily: "Space Grotesk, sans-serif", margin: "10px 0 0 0" }}>
              Inside the <span className="liquid-text-gradient">Developer Mindset</span>
            </h2>
            <p style={{ color: "#9b9ba3", fontSize: 15, marginTop: 12, lineHeight: 1.6 }}>
              Explore my background, core competencies, engineering philosophy, and real-world project impact.
            </p>
          </div>

          <div className="dev-tabs-wrapper">
            <div className="dev-tabs-bar">
              {[
                { id: "about", label: "Biography & Background", icon: "👤" },
                { id: "arsenal", label: "Skill Arsenal", icon: "⚡" },
                { id: "philosophy", label: "Core Philosophy", icon: "💡" },
                { id: "impact", label: "Key Metrics & Impact", icon: "📊" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`dev-tab-btn ${activeTab === tab.id ? "active" : ""}`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === "about" && (
              <motion.div
                key="about"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="dev-grid-2"
              >
                <div className="liquid-glass-card" style={{ padding: 32 }}>
                  <div className="dev-card-icon-wrap" style={{ background: "rgba(142, 231, 255, 0.1)", border: "1px solid rgba(142, 231, 255, 0.3)" }}>
                    🚀
                  </div>
                  <h3 style={{ fontSize: 22, fontFamily: "Space Grotesk", color: "white", margin: "0 0 12px 0" }}>Full-Stack Solutions Architect</h3>
                  <p style={{ color: "#c0c0ca", fontSize: 14, lineHeight: 1.7, margin: "0 0 12px 0" }}>
                    My engineering journey is rooted in creating software that doesn't just work—it excels. From high-traffic Next.js applications to custom API servers in FastAPI and Node.js, I focus on building robust, scalable architectures that support rapid business growth.
                  </p>
                  <p style={{ color: "#c0c0ca", fontSize: 14, lineHeight: 1.7, margin: 0 }}>
                    I believe great software is the intersection of clean code, security standards, and intuitive human interaction.
                  </p>
                </div>

                <div className="liquid-glass-card" style={{ padding: 32 }}>
                  <div className="dev-card-icon-wrap" style={{ background: "rgba(169, 140, 255, 0.1)", border: "1px solid rgba(169, 140, 255, 0.3)" }}>
                    🛡️
                  </div>
                  <h3 style={{ fontSize: 22, fontFamily: "Space Grotesk", color: "white", margin: "0 0 12px 0" }}>Cybersecurity & Defensive Engineering</h3>
                  <p style={{ color: "#c0c0ca", fontSize: 14, lineHeight: 1.7, margin: "0 0 16px 0" }}>
                    Security is never an afterthought; it is built into the initial architecture. I specialize in designing threat intelligence interfaces, vulnerability workflow tools, and implementing Zero Trust access controls across modern web and mobile deployments.
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    <span className="liquid-pill" style={{ fontSize: 11, padding: "5px 12px" }}>Vulnerability Assessment</span>
                    <span className="liquid-pill" style={{ fontSize: 11, padding: "5px 12px" }}>IOC Analysis</span>
                    <span className="liquid-pill" style={{ fontSize: 11, padding: "5px 12px" }}>Secure APIs</span>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "arsenal" && (
              <motion.div
                key="arsenal"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="dev-grid-4"
              >
                {[
                  {
                    title: "Frontend & Web",
                    skills: ["Next.js 14", "React 18", "TypeScript", "Vanilla CSS", "Framer Motion", "Three.js / R3F"],
                  },
                  {
                    title: "Backend & Systems",
                    skills: ["Python", "FastAPI", "Node.js", "Express", "PostgreSQL", "Redis"],
                  },
                  {
                    title: "Cybersecurity & Ops",
                    skills: ["Threat Intel", "OWASP Rules", "Docker", "GCP / Cloud", "OAuth2 / Auth", "Git Ops"],
                  },
                  {
                    title: "Mobile & UX",
                    skills: ["Android (Kotlin)", "React Native", "Responsive UI", "Micro-animations", "Performance"],
                  },
                ].map((group, idx) => (
                  <div key={idx} className="liquid-glass-card" style={{ padding: 24 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
                      <h4 style={{ fontSize: 16, fontFamily: "Space Grotesk", color: "white", margin: 0 }}>{group.title}</h4>
                      <span style={{ fontSize: 12, fontFamily: "monospace", color: "#8ee7ff" }}>0{idx + 1}</span>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {group.skills.map((skill) => (
                        <div key={skill} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#d0d0db", background: "rgba(255,255,255,0.04)", padding: "7px 12px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.08)" }}>
                          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#8ee7ff" }} />
                          <span>{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === "philosophy" && (
              <motion.div
                key="philosophy"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="dev-grid-2"
              >
                {[
                  {
                    num: "01",
                    title: "Security by Design",
                    desc: "Every system is architected with defensive principles, strict validation, and authentication safeguards from day one.",
                  },
                  {
                    num: "02",
                    title: "User-Centric Elegance",
                    desc: "High performance and intense security mean nothing if the user interface feels clumsy. I prioritize micro-interactions and smooth responsiveness.",
                  },
                  {
                    num: "03",
                    title: "Modular Clean Code",
                    desc: "Code should be written for human readability and easy long-term maintenance. Component isolation and strict typing prevent regression bugs.",
                  },
                  {
                    num: "04",
                    title: "Continuous Refinement",
                    desc: "Technology evolves rapidly. I continuously benchmark code, optimize bundle sizes, and adopt modern web standards.",
                  },
                ].map((item) => (
                  <div key={item.num} className="liquid-glass-card" style={{ padding: 32, position: "relative" }}>
                    <span style={{ fontSize: 38, fontWeight: 700, fontFamily: "Space Grotesk", color: "rgba(255,255,255,0.08)", position: "absolute", top: 24, right: 28 }}>
                      {item.num}
                    </span>
                    <h4 style={{ fontSize: 20, fontFamily: "Space Grotesk", color: "white", margin: "0 0 10px 0" }}>{item.title}</h4>
                    <p style={{ color: "#c0c0ca", fontSize: 14, lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === "impact" && (
              <motion.div
                key="impact"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="dev-grid-4"
              >
                <div className="stat-liquid-card">
                  <div className="stat-number">3+</div>
                  <div className="stat-label">Shipped Products</div>
                </div>
                <div className="stat-liquid-card">
                  <div className="stat-number">&lt;100ms</div>
                  <div className="stat-label">Average API Latency</div>
                </div>
                <div className="stat-liquid-card">
                  <div className="stat-number">100%</div>
                  <div className="stat-label">Type Safety Coverage</div>
                </div>
                <div className="stat-liquid-card">
                  <div className="stat-number">99.9%</div>
                  <div className="stat-label">Target Uptime Focus</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </section>

      {/* Direct Contact / Hire CTA */}
      <section id="contact-dev" style={{ padding: "80px 0", borderTop: "1px solid rgba(255,255,255,0.1)", background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.6))" }}>
        <div className="dev-container">
          <div className="liquid-glass-card dev-cta-box">
            
            <span className="liquid-pill">
              <span className="status-dot" />
              <span>Direct Collaboration</span>
            </span>

            <h2 style={{ fontSize: "clamp(30px, 4.5vw, 52px)", fontFamily: "Space Grotesk, sans-serif", color: "white", margin: 0 }}>
              Ready to Build Something <br />
              <span className="liquid-text-gradient">Extraordinary Together?</span>
            </h2>

            <p style={{ color: "#c0c0ca", fontSize: 15, maxWidth: 580, lineHeight: 1.7, margin: 0 }}>
              Whether you need a sleek web application, a secure backend service, or a comprehensive digital solution, let's connect and make it a reality.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 14, marginTop: 10 }}>
              <button onClick={handleCopyEmail} className="btn-liquid-glass btn-liquid-primary">
                <span>{copiedEmail ? "✓ Email Copied to Clipboard!" : `Email ${developerEmail}`}</span>
              </button>

              <Link href="/" className="btn-liquid-glass">
                <span>View Full Portfolio Projects →</span>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="dev-footer">
        <div className="dev-container dev-footer-inner">
          <div>© {new Date().getFullYear()} Prajwal M — Digital Solutions & Cyber Engineering</div>
           <div className="footer-social-wrapper">
            <span className="social-title">Stay Connected with Developer</span>
            <div className="social-links">
              <a href="https://x.com/httpsalone_boy" aria-label="X (Twitter)" target="_blank" title="X (Twitter)" className="social-link">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://github.com/appuprajju" target="_blank" aria-label="Github" title="Github" className="social-link">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
              </a>
              <a href="https://www.linkedin.com/in/prajwaldpm?utm_source=share_via&utm_content=profile&utm_medium=member_android" aria-label="Linkedin" target="_blank" title="Linkedin" className="social-link">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
              </a>
              <a href="https://www.instagram.com/https.alone_boy.in?utm_source=beacons&utm_medium=lib_share&utm_campaign=https.alone_boy.in" aria-label="Instagram" target="_blank" title="Instagram" className="social-link">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="https://discord.gg/2b5EVSMp" aria-label="Discord" title="Discord" target="_blank" className="social-link">
               <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
