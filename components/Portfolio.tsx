"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { FormEvent, useState } from "react";
import Dropdown from "./Dropdown";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";


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
  { n: "01", title: "StadiumMind AI", type: "GenAI · Stadium Operations", text: "A real-time digital platform concept for fan experience, navigation, crowd management, accessibility and operational intelligence.", tags: ["AI", "FastAPI", "React", "Cloud"], image: "/images/stadium-mind.jpg", link: "https://github.com/appuprajju/stadium-track.git", domain: "stadiummind.ai" },
  { n: "02", title: "EcoTrack", type: "AI · Sustainability", text: "A carbon-footprint platform turning activity data into actionable sustainability insights with a modern dashboard experience.", tags: ["AI", "React", "TypeScript", "GCP"], image: "/images/ecotrack.jpg", link: "https://github.com/appuprajju/stadium-track.git", domain: "ecotrack.app" },
  { n: "03", title: "Threat Intelligence", type: "Cybersecurity · Analytics", text: "A security workspace for vulnerability intelligence, IOC workflows, incident analysis and live operational visibility.", tags: ["Security", "FastAPI", "Postgres", "Redis"], image: "/images/threat-intel.jpg", link: "#", domain: "threatintel.internal" },
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

    const form = e.currentTarget;

    try {
      const formData = new FormData(form);
      const data = {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        type: formData.get("type") as string,
        budget: formData.get("budget") as string,
        message: formData.get("message") as string,
      };

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
      const endpoint = apiUrl ? `${apiUrl.replace(/\/$/, '')}/api/send-email` : "/api/send-email";

      let response = await fetch("https://api.makeuperfect.in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).catch(() => null);

      // Fallback for GitHub Pages static export if /api/send-email returns 404/405 or fails to fetch
      if (!response || !response.ok) {
        const web3Key = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
        if (web3Key) {
          const web3Response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              access_key: web3Key,
              name: data.name,
              email: data.email,
              subject: `New Portfolio Inquiry from ${data.name}`,
              from_name: "Portfolio Contact Form",
              replyto: data.email,
              message: `Project Type: ${data.type}\nBudget: ${data.budget || "Not specified"}\n\nMessage:\n${data.message}`,
            }),
          });
          if (web3Response.ok) {
            response = web3Response;
          }
        }
      }

      if (response && response.ok) {
        setSent(true);
        form.reset();
        setTimeout(() => setSent(false), 5000); // Hide message after 5 seconds
      } else {
        const errorData = response ? await response.json().catch(() => ({})) : {};
        setError(errorData.error || errorData.message || "Failed to send email. Please try again or check setup.");
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
            <Link href="/dev" className="liquid-pill" style={{ fontSize: 12, padding: "4px 12px", color: "#8ee7ff", borderColor: "rgba(142,231,255,0.4)" }}>
              ✦ Developer Intro
            </Link>
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
                ].map((item, index) => {
                  const isRoute = item.href.startsWith("/");
                  const content = (
                    <>
                      <div className="menu-item-left">
                        <span className="menu-num">{item.num}</span>
                        <span className="menu-title">{item.label}</span>
                      </div>
                      <span className="menu-arrow">{item.icon || "→"}</span>
                    </>
                  );
                  return isRoute ? (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`mobile-menu-link ${item.isDev ? "dev-link" : ""}`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {content}
                    </Link>
                  ) : (
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
                      {content}
                    </motion.a>
                  );
                })}

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
            <Link className="btn btn-primary" href="/dev">Meet the Developer ↗</Link>
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
                  src={`/images/prajwal-portrait.jpg`}
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
                <Link href="/dev" className="btn-liquid-glass btn-liquid-primary" style={{ whiteSpace: "nowrap" }}>
                  <span>Open Developer Dossier ↗</span>
                </Link>
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
            {projects.map((p, i) => {
              const isComingSoon = !p.link || p.link.trim() === "#";
              return (
                <motion.article
                  className={`project ${isComingSoon ? "project-coming-soon" : ""}`}
                  key={p.title}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ delay: i * .08 }}
                >
                  {isComingSoon && (
                    <div className="project-corner-ribbon" title="Coming Soon to GitHub">
                      <span>COMING SOON</span>
                    </div>
                  )}

                  <div className="project-info">
                    <div>
                      <div className="project-meta-row">
                        <div className="project-number">{p.n} / {p.type}</div>
                        {isComingSoon && (
                          <span className="coming-soon-status-badge">
                            <span className="coming-soon-dot-pulse" />
                            Coming Soon
                          </span>
                        )}
                      </div>
                      <h3>{p.title}</h3>
                      <p>{p.text}</p>
                      <div className="tags" style={{ position: "static", marginTop: 24 }}>
                        {p.tags.map(t => <span className="tag" key={t}>{t}</span>)}
                      </div>
                    </div>

                    {isComingSoon ? (
                      <span className="btn btn-coming-soon" style={{ width: "fit-content", marginTop: 25 }}>
                        <span className="coming-soon-dot-pulse" />
                        Coming Soon to GitHub
                      </span>
                    ) : (
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn"
                        style={{ width: "fit-content", marginTop: 25 }}
                      >
                        View Project ↗
                      </a>
                    )}
                    <a className="btn" href="#contact" style={{ width: "fit-content", marginTop: 28 }}>Discuss a similar project →</a>
                  </div>

                  <div className="project-visual">
                    <a
                      href={isComingSoon ? undefined : p.link}
                      target={isComingSoon ? undefined : "_blank"}
                      rel={isComingSoon ? undefined : "noopener noreferrer"}
                      className={`browser-frame-link ${isComingSoon ? "browser-link-disabled" : ""}`}
                      aria-label={isComingSoon ? `${p.title} (Coming Soon)` : `View ${p.title} project (opens in new tab)`}
                    >
                      <div className="browser">
                        <div className="browser-top">
                          <div className="browser-traffic-lights">
                            <span className="dot dot-close" />
                            <span className="dot dot-minimize" />
                            <span className="dot dot-expand" />
                          </div>
                          <div className="browser-address-bar">
                            <svg className="browser-lock-icon" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                            </svg>
                            <span className="browser-url-text">{p.domain || "https://project-demo.live"}</span>
                            {!isComingSoon && (
                              <span className="browser-external-badge">
                                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                  <polyline points="15 3 21 3 21 9"></polyline>
                                  <line x1="10" y1="14" x2="21" y2="3"></line>
                                </svg>
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="browser-body">
                          <div className="browser-scroll-viewport">
                            <img
                              src={`${p.image}`}
                              alt={p.title}
                              className="browser-scroll-img"
                              style={{
                                filter: isComingSoon ? "brightness(0.62) contrast(1.05)" : "none",
                              }}
                            />
                            {!isComingSoon && (
                              <div className="browser-hover-hint">
                                <span className="hover-hint-pill">
                                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="12" y1="5" x2="12" y2="19"></line>
                                    <polyline points="19 12 12 19 5 12"></polyline>
                                  </svg>
                                  Hover to scroll · Click to open
                                </span>
                              </div>
                            )}
                          </div>

                          {isComingSoon && (
                            <div className="browser-coming-soon-overlay">
                              <div className="coming-soon-glass-banner">
                                <div className="coming-soon-icon-badge">⏳</div>
                                <div className="coming-soon-banner-content">
                                  <div className="coming-soon-banner-title">
                                    <span>COMING SOON</span>
                                    <span className="coming-soon-banner-badge">IN PROGRESS</span>
                                  </div>
                                  <p className="coming-soon-banner-desc">GitHub repository releasing soon</p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </a>
                  </div>
                </motion.article>
              );
            })}
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
            ].map(([n, t, d]) => <div className="step" key={n}><div className="step-num">{n}</div><h3>{t}</h3><p>{d}</p></div>)}
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
              {<Dropdown
                name="priority"
                options={["Let's discuss", ">7weeks", ">16weeks", ">48weeks"]}
                defaultValue="Priority"
                className="dropdown-type"
              />}
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
          <div className="footer-social-wrapper">
            <span className="social-title">Stay Connected</span>
            <div className="social-links">
              <a href="#" aria-label="X (Twitter)" title="X (Twitter)" className="social-link">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="#" aria-label="Github" title="Github" className="social-link">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
              </a>
              <a href="#" aria-label="Linkedin" title="Linkedin" className="social-link">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
              </a>
              <a href="#" aria-label="Instagram" title="Instagram" className="social-link">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
            </div>
          </div>
          <div className="footer-meta">
            <span>© 2026 YOUR.STUDIO</span>
            <span className="footer-sep">·</span>
            <span>Web · Cybersecurity · Mobile</span>
          </div>
        </div>
      </footer>
    </main>
  );
}