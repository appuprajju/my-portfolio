"use client";

import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { FormEvent, useState } from "react";
import Dropdown from "./Dropdown";

const Scene = dynamic(() => import("./Scene"), { ssr: false });

const services = [
  {
    icon: "◈",
    title: "Web Development",
    text: "High-performance websites and full-stack products with polished interfaces, scalable architecture and responsive experiences.",
    tags: ["Next.js", "React", "TypeScript", "Node.js", "APIs"],
  },
  {
    icon: "⌁",
    title: "Cybersecurity",
    text: "Security-focused applications, vulnerability intelligence dashboards and practical defensive engineering.",
    tags: ["Security", "Threat Intel", "APIs", "Cloud", "Analytics"],
  },
  {
    icon: "▣",
    title: "Mobile Apps",
    text: "Modern mobile experiences designed around simple flows, strong UX and reliable real-world functionality.",
    tags: ["Android", "Kotlin", "React Native", "APIs", "UX"],
  },
];

const projects = [
  { n: "01", title: "StadiumMind AI", type: "GenAI · Stadium Operations", text: "A real-time digital platform concept for fan experience, navigation, crowd management, accessibility and operational intelligence.", tags: ["AI", "FastAPI", "React", "Cloud"], image: "/images/stadium-mind.jpg", link: "https://github.com/appuprajju/stadium-track.git" },
  { n: "02", title: "EcoTrack", type: "AI · Sustainability", text: "A carbon-footprint platform turning activity data into actionable sustainability insights with a modern dashboard experience.", tags: ["AI", "React", "TypeScript", "GCP"], image: "/images/ecotrack.jpg", link: "https://github.com/appuprajju/stadium-track.git" },
  { n: "03", title: "Threat Intelligence", type: "Cybersecurity · Analytics", text: "A security workspace for vulnerability intelligence, IOC workflows, incident analysis and live operational visibility.", tags: ["Security", "FastAPI", "Postgres", "Redis"], image: "/images/threat-intel.jpg", link: "#" },
];

const skills = ["Next.js", "React", "TypeScript", "Node.js", "Python", "FastAPI", "Kotlin", "Cybersecurity", "Cloud", "PostgreSQL", "REST APIs", "Git"];

export default function Portfolio() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formData = new FormData(e.currentTarget);
      const data = {
        name: formData.get("name"),
        email: formData.get("email"),
        type: formData.get("type"),
        budget: formData.get("budget"),
        message: formData.get("message"),
      };

      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSent(true);
        e.currentTarget.reset();
        setTimeout(() => setSent(false), 5000); // Hide message after 5 seconds
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to send email. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error("Form submission error:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <nav className="nav">
        <div className="container nav-inner">
          <a className="logo" href="#home" onClick={() => setMobileMenuOpen(false)}>
            YOUR<span>.</span>STUDIO
          </a>
          
          <div className="nav-links">
            <a href="/dev" className="liquid-pill" style={{ fontSize: 12, padding: "4px 12px", color: "#8ee7ff", borderColor: "rgba(142,231,255,0.4)" }}>
              ✦ Developer Intro
            </a>
            <a href="#services">Services</a>
            <a href="#work">Work</a>
            <a href="#skills">Skills</a>
            <a href="#contact">Contact</a>
          </div>

          <div className="nav-actions">
            <a className="nav-cta" href="#contact">Start a project</a>
            
            <button 
              className={`code-menu-btn ${mobileMenuOpen ? "active" : ""}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Code Menu"
            >
              <span className="code-tag-bracket left">&lt;</span>
              <span className="code-tag-slash">{mobileMenuOpen ? "✕" : "/"}</span>
              <span className="code-tag-bracket right">&gt;</span>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              className="mobile-menu-overlay"
              initial={{ opacity: 0, y: -20, scaleY: 0.96 }}
              animate={{ opacity: 1, y: 0, scaleY: 1 }}
              exit={{ opacity: 0, y: -20, scaleY: 0.96 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{ originX: 0.5, originY: 0 }}
            >
              <div className="mobile-menu-header-bar">
                <div className="status-badge">
                  <span className="status-dot" />
                  <span>ONLINE & AVAILABLE</span>
                </div>
                <div className="menu-brand-tag">
                  YOUR<span>.</span>STUDIO
                </div>
              </div>

              <div className="mobile-menu-inner">
                {[
                  { href: "/dev", num: "✦", label: "Developer Profile & Dossier", isDev: true, icon: "↗" },
                  { href: "#services", num: "01", label: "Capabilities & Services", isDev: false },
                  { href: "#work", num: "02", label: "Selected Engineering Work", isDev: false },
                  { href: "#skills", num: "03", label: "Skills & Tech Stack", isDev: false },
                  { href: "#contact", num: "04", label: "Start a Project / Contact", isDev: false },
                ].map((item, index) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    className={`mobile-menu-link ${item.isDev ? "dev-link" : ""}`}
                    onClick={() => setMobileMenuOpen(false)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.25, delay: index * 0.04 }}
                  >
                    <div className="menu-item-left">
                      <span className="menu-num">{item.num}</span>
                      <span className="menu-title">{item.label}</span>
                    </div>
                    <span className="menu-arrow">{item.icon || "→"}</span>
                  </motion.a>
                ))}

                <motion.div 
                  className="mobile-menu-footer"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: 0.25 }}
                >
                  <a 
                    className="btn-liquid-glass btn-liquid-primary" 
                    href="#contact"
                    onClick={() => setMobileMenuOpen(false)}
                    style={{ width: "100%", justifyContent: "center" }}
                  >
                    <span>Start a project ↗</span>
                  </a>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <section id="home" className="hero">
        <div className="hero-grid" />
        <div className="hero-glow" />
        <div className="hero-canvas"><Scene /></div>
        <motion.div className="hero-content container"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .9 }}>
          <div className="eyebrow">Digital solutions engineer</div>
          <h1>Ideas into <span className="gradient-text">digital reality.</span></h1>
          <p className="hero-copy">
            I design and build premium digital products across web development,
            cybersecurity and mobile apps — combining engineering with a product-first mindset.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="/dev">Meet the Developer ↗</a>
            <a className="btn" href="#work">Explore my work</a>
          </div>
        </motion.div>
      </section>

      {/* Developer Profile Spotlight Card */}
      <section className="section" style={{ padding: "40px 0" }}>
        <div className="container" id="dev">
          <motion.div 
            className="liquid-glass-card"
            style={{ padding: "36px 40px" } as React.CSSProperties}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="dev-preview-grid" style={{ display: "flex", alignItems: "center", gap: 28, flexWrap: "wrap" }}>
              <div style={{ flexShrink: 0 }}>
                <img 
                  src="/images/prajwal-portrait.jpg" 
                  alt="Prajwal M" 
                  style={{ 
                    width: 96, 
                    height: 96, 
                    borderRadius: "20px", 
                    objectFit: "cover", 
                    border: "2px solid rgba(142, 231, 255, 0.4)",
                    boxShadow: "0 0 25px rgba(142, 231, 255, 0.25)",
                    display: "block"
                  }} 
                />
              </div>
              <div className="dev-preview-left" style={{ flex: "1 1 300px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span className="status-dot" />
                  <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: "#8ee7ff", textTransform: "uppercase", fontFamily: "monospace" }}>
                    Featured Developer Profile
                  </span>
                </div>
                <h3 style={{ fontSize: "clamp(26px, 3.5vw, 38px)", fontWeight: 700, fontFamily: "Space Grotesk, sans-serif", color: "white", margin: "6px 0 8px 0" }}>
                  Engineered by <span className="liquid-text-gradient">Prajwal M</span>
                </h3>
                <p style={{ color: "#c0c0ca", fontSize: 15, lineHeight: 1.6, margin: "0 0 12px 0", maxWidth: 680 }}>
                  Specializing in full-stack web architecture (Next.js/React/FastAPI), security intelligence dashboards, and mobile applications. Every project is crafted with zero-trust security and ultra-smooth liquid UI design.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, paddingTop: 4 }}>
                  <span className="liquid-pill" style={{ fontSize: 12 }}>⚡ Next.js & React</span>
                  <span className="liquid-pill" style={{ fontSize: 12 }}>🛡️ Cybersecurity SecOps</span>
                  <span className="liquid-pill" style={{ fontSize: 12 }}>📱 Android & Mobile</span>
                  <span className="liquid-pill" style={{ fontSize: 12 }}>🌐 FastAPI & Python</span>
                </div>
              </div>

              <div className="dev-preview-right">
                <a href="/dev" className="btn-liquid-glass btn-liquid-primary" style={{ whiteSpace: "nowrap" }}>
                  <span>Open Developer Dossier ↗</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="services" className="section">
        <div className="container">
          <div className="eyebrow">01 — Capabilities</div>
          <h2>What I can<br /><span className="gradient-text">build for you.</span></h2>
          <div className="service-grid">
            {services.map((s, i) => (
              <motion.article className="service-card" key={s.title}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }} transition={{ delay: i * .1 }}>
                <div className="service-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <div className="tags">{s.tags.map(t => <span className="tag" key={t}>{t}</span>)}</div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="work" className="section">
        <div className="container">
          <div className="eyebrow">02 — Selected work</div>
          <h2>Built to solve<br /><span className="gradient-text">real problems.</span></h2>
          <div className="projects-wrap">
            {projects.map((p, i) => (
              <motion.article className="project" key={p.title}
                initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }} transition={{ delay: i * .08 }}>
                <div className="project-info">
                  <div>
                    <div className="project-number">{p.n} / {p.type}</div>
                    <h3>{p.title}</h3>
                    <p>{p.text}</p>
                    <div className="tags" style={{ position: "static", marginTop: 24 }}>{p.tags.map(t => <span className="tag" key={t}>{t}</span>)}</div>
                  </div>
                  <a href={p.link || "#"} target={p.link && p.link !== "#" ? "_blank" : undefined} rel={p.link && p.link !== "#" ? "noopener noreferrer" : undefined} className="btn" style={{width: "fit-content", marginTop:25}}>View Project ↗</a>
                  <a className="btn" href="#contact" style={{ width: "fit-content", marginTop: 28 }}>Discuss a similar project →</a>
                </div>
                <div className="project-visual">
                  <div className="browser">
                    <div className="browser-top"><span className="dot"/><span className="dot"/><span className="dot"/></div>
                    <div className="browser-body" style={{ padding: 0, height: 260, overflow: "hidden", position: "relative" }}>
                      <img 
                        src={p.image} 
                        alt={p.title} 
                        style={{ 
                          width: "100%", 
                          height: "100%", 
                          objectFit: "cover", 
                          objectPosition: "top left",
                          display: "block"
                        }} 
                      />
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="skills" className="section">
        <div className="container">
          <div className="eyebrow">03 — Skill universe</div>
          <h2>Technology is<br /><span className="gradient-text">my toolkit.</span></h2>
          <div className="skill-cloud">
            <div className="skill-center"><div className="skill-core">BUILD<br />SECURE<br />SHIP</div></div>
            {skills.map((s, i) => {
              const angle = (i / skills.length) * Math.PI * 2;
              const radiusX = 37;
              const radiusY = 40;
              const leftPos = (50 + Math.cos(angle) * radiusX).toFixed(3);
              const topPos = (50 + Math.sin(angle) * radiusY).toFixed(3);
              return (
                <motion.div key={s} className="skill-node"
                  style={{ left: `${leftPos}%`, top: `${topPos}%` } as React.CSSProperties}
                  whileHover={{ scale: 1.12, borderColor: "rgba(142,231,255,.6)" } as any}>
                  {s}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="eyebrow">04 — Process</div>
          <h2>A simple path from<br /><span className="gradient-text">idea to launch.</span></h2>
          <div className="process">
            {[
              ["01", "Discover", "Understand the goal, users, constraints and success criteria."],
              ["02", "Design", "Shape the experience, architecture and technical direction."],
              ["03", "Build", "Develop, integrate, test and refine the product."],
              ["04", "Launch", "Deploy, monitor and keep improving after release."]
            ].map(([n,t,d]) => <div className="step" key={n}><div className="step-num">{n}</div><h3>{t}</h3><p>{d}</p></div>)}
          </div>
        </div>
      </section>

      <section id="contact" className="section contact">
        <div className="container">
          <div className="eyebrow">05 — Start a project</div>
          <h2>Have an idea?<br /><span className="gradient-text">Let's build it.</span></h2>
          <p className="contact-copy">Tell me what you are trying to create. Whether it is a website, security product or mobile app, we can turn the idea into a clear technical plan.</p>
          <form className="form" onSubmit={submit}>
            <div className="form-row">
              <input className="input" required placeholder="Your name" name="name" />
              <input className="input" required type="email" placeholder="Email address" name="email" />
            </div>
            <div className="form-row" id="dropdowns">
              <Dropdown
                name="type"
                options={["Website", "Cybersecurity", "Mobile App", "Other"]}
                defaultValue="Website"
                className="dropdown-type"
              />
              {/*<Dropdown
                name="budget"
                options={["Let's discuss", "Under $1k", "$1k–$5k", "$5k+"]}
                defaultValue="Let's discuss"
                className="dropdown-type"
              />*/}
            </div>
            <textarea className="input" required name="message" placeholder="Tell me about your project..." />
            <button className="btn btn-primary" type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send project request ↗"}
            </button>
            <div className="form-status">
              {sent && "Thanks — your request has been sent successfully!"}
              {error && <span style={{ color: "#ff6b6b" }}>{error}</span>}
              {!sent && !error && " "}
            </div>
          </form>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-inner">
          <span>© 2026 YOUR.STUDIO</span>
          <span>Web · Cybersecurity · Mobile</span>
          <span>Built with Next.js + Three.js</span>
        </div>
      </footer>
    </main>
  );
}