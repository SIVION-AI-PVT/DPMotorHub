import React, { useRef } from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Target,
  Zap,
  Users,
  ArrowUpRight,
  CheckCircle2,
  Award,
  Wrench,
  Gauge,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "./Home.css";
import "./About.css";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { number: "100%", label: "Genuine BMW OEM Parts" },
  { number: "15,000+", label: "M Chassis Upgraded" },
  { number: "< 0.01%", label: "Fitment Tolerance" },
  { number: "24-HOUR", label: "Dispatch Guarantee" },
];

const values = [
  {
    icon: ShieldCheck,
    title: "100% Genuine Provenance",
    desc: "Only authentic BMW OEM parts and top-tier verified motorsport manufacturers.",
  },
  {
    icon: Target,
    title: "Technical Precision",
    desc: "Engineered by enthusiasts. We know exact chassis codes, torque specs, and fitment nuances.",
  },
  {
    icon: Zap,
    title: "24-Hour Fulfillment",
    desc: "Rapid dispatch with tracked global logistics to get your car back on track swiftly.",
  },
  {
    icon: Users,
    title: "Direct Master Support",
    desc: "VIN verification and technical fitment guidance directly via WhatsApp or Email.",
  },
];

const checks = [
  "100% Autoclave Pre-preg Dry Carbon Fiber Inspection",
  "Ultrasonic Fitment Tolerance Checking",
  "Factory-Sealed Genuine BMW Hologram Verification",
  "High-Intensity UV Weave Symmetry Audit",
];

const teamSpecialists = [
  {
    role: "VIN & Fitment Verification",
    title: "Master Chassis Engineers",
    desc: "Cross-referencing factory schematics and ETK databases to guarantee 100% bolt-on precision for your specific M chassis.",
    icon: Wrench,
  },
  {
    role: "Motorsport & Aerodynamics",
    title: "Carbon Aero Technicians",
    desc: "Specialized in pre-preg autoclave dry carbon splitters, rear wings, and diffusers engineered for functional downforce.",
    icon: Gauge,
  },
  {
    role: "Track & Performance Tuning",
    title: "Powertrain Specialists",
    desc: "Advising on S55, S58, S63, and S68 power upgrades, titanium acoustics, and brake cooling thermodynamics.",
    icon: Award,
  },
];

export default function About() {
  const container = useRef(null);

  useGSAP(
    () => {
      // Hero timeline
      const tl = gsap.timeline();
      tl.from(".stitch-hero-eyebrow", {
        y: 20,
        opacity: 0,
        filter: "blur(10px)",
        duration: 0.8,
        ease: "power3.out",
        delay: 0.1,
      })
        .from(
          ".stitch-hero-title",
          {
            y: 50,
            opacity: 0,
            filter: "blur(10px)",
            scale: 0.95,
            duration: 1,
            ease: "expo.out",
          },
          "-=0.4"
        )
        .from(
          ".stitch-hero-subtitle",
          {
            y: 30,
            opacity: 0,
            filter: "blur(5px)",
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.6"
        )
        .from(
          ".about-hero-actions a",
          {
            y: 30,
            opacity: 0,
            filter: "blur(5px)",
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
          },
          "-=0.6"
        );

    },
    { scope: container }
  );

  return (
    <div className="about-page" ref={container}>
      {/* Hero Banner */}
      <section className="about-hero stitch-hero">
        <div className="about-hero-bg stitch-hero-bg">
          <img
            src="/assets/hero_bg.jpg"
            alt="BMW M Motorsport Hardware"
          />
          <div className="about-hero-overlay stitch-hero-overlay"></div>
        </div>

        <div className="container about-hero-content stitch-hero-container">
          <div className="stitch-hero-eyebrow">
            <span className="m-stripe-pill"></span> OUR HERITAGE & MOTORSPORT PASSION
          </div>
          <h1 className="stitch-hero-title">
            BORN ON THE TRACK.
            <br />
            BUILT FOR THE ROAD.
          </h1>
          <p className="stitch-hero-subtitle" style={{ maxWidth: "720px" }}>
            DP Motorhub is a dedicated sanctuary for BMW M performance hardware, genuine OEM components, and track-engineered aerodynamics built to factory specs.
          </p>
          <div className="about-hero-actions">
            <Link to="/shop" className="wix-pill-btn dark">
              EXPLORE CATALOG <ArrowUpRight size={18} />
            </Link>
            <Link to="/contact" className="wix-pill-btn orange">
              CONTACT TECHNICIAN <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Floating Stats Bar */}
      <section className="section about-stats-bar" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="about-stats-grid">
            {stats.map((stat) => (
              <div key={stat.label} className="about-stat-item">
                <div className="about-stat-number">{stat.number}</div>
                <div className="about-stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="section">
        <div className="container">
          <div className="about-story-grid">
            <div>
              <div className="eyebrow" style={{ color: "var(--m-blue)", marginBottom: "12px" }}>
                THE PURSUIT OF PERFECTION
              </div>
              <h2 className="wix-main-h2 dark" style={{ fontSize: "clamp(28px, 4vw, 44px)", marginBottom: "24px" }}>
                Uncompromising German Motorsport Engineering
              </h2>
              <p
                style={{
                  fontSize: "17px",
                  color: "var(--mid-gray)",
                  marginBottom: "20px",
                  lineHeight: 1.7,
                }}
              >
                DP Motorhub was established by a collective of BMW M enthusiasts who were tired of navigating generic auto parts marketplaces to find genuine performance upgrades. We created a dedicated sanctuary that matches the exact engineering standards of Nürburgring-tested M-cars.
              </p>
              <p
                style={{
                  fontSize: "17px",
                  color: "var(--mid-gray)",
                  lineHeight: 1.7,
                }}
              >
                Every splitter, steering wheel, titanium exhaust, and carbon ceramic brake system in our catalog has been verified by our in-house engineering team to guarantee 100% factory fitment and authentic BMW provenance.
              </p>
            </div>

            <div className="about-media-frame">
              <img src="/assets/front_splitter.jpg" alt="DP Motorhub Carbon Aero" />
              <div className="about-media-badge">
                <div className="eyebrow" style={{ color: "var(--m-blue)", marginBottom: "4px" }}>
                  M PERFORMANCE STANDARDS
                </div>
                <h4 style={{ fontFamily: "var(--font-heading)", fontSize: "16px", fontWeight: 700, color: "var(--white)" }}>
                  Factory-Gapped 100% Pre-preg Dry Carbon
                </h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Principles / Values Grid */}
      <section className="section" style={{ background: "rgba(11,11,13,0.4)" }}>
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto" }}>
            <div className="eyebrow" style={{ justifyContent: "center", marginBottom: "12px" }}>
              OUR GUIDING PRINCIPLES
            </div>
            <h2 className="wix-main-h2 dark" style={{ fontSize: "clamp(28px, 4vw, 44px)" }}>
              Why BMW Enthusiasts Trust Us
            </h2>
          </div>

          <div className="about-values-grid">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="about-value-card">
                <Icon
                  size={40}
                  color="var(--m-blue)"
                  style={{ margin: "0 auto 20px" }}
                  strokeWidth={1.5}
                />
                <h3
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "18px",
                    fontWeight: 700,
                    color: "var(--white)",
                    marginBottom: "12px",
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{
                    color: "var(--mid-gray)",
                    fontSize: "14px",
                    lineHeight: 1.6,
                  }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facility & Quality Assurance */}
      <section className="section">
        <div className="container">
          <div className="about-story-grid" style={{ alignItems: "center" }}>
            <div className="about-media-frame" style={{ height: "420px" }}>
              <img src="/assets/steering_wheel.jpg" alt="Munich Quality Assurance Facility" />
              <div className="about-media-badge">
                <div className="eyebrow" style={{ color: "var(--m-blue)", marginBottom: "4px" }}>
                  MUNICH HEADQUARTERS
                </div>
                <h4 style={{ fontFamily: "var(--font-heading)", fontSize: "16px", fontWeight: 700, color: "var(--white)" }}>
                  Track & Fitment Inspection Facility
                </h4>
              </div>
            </div>

            <div>
              <div className="eyebrow" style={{ color: "var(--m-blue)", marginBottom: "12px" }}>
                OUR WORKSHOP & FACILITY
              </div>
              <h2 className="wix-main-h2 dark" style={{ fontSize: "clamp(28px, 4vw, 44px)", marginBottom: "20px" }}>
                Track-Tested Quality Control
              </h2>
              <p
                style={{
                  color: "var(--mid-gray)",
                  marginBottom: "24px",
                  lineHeight: 1.7,
                  fontSize: "16px",
                }}
              >
                Inside our specialized Munich workshop and fulfillment facility, every carbon fiber component and performance hardware piece undergoes rigorous multi-point verification before dispatch.
              </p>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                  marginBottom: "32px",
                }}
              >
                {checks.map((check) => (
                  <div
                    key={check}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      fontSize: "15px",
                      color: "var(--white)",
                      fontWeight: 500,
                    }}
                  >
                    <CheckCircle2 size={20} color="var(--m-blue)" style={{ flexShrink: 0 }} />
                    <span>{check}</span>
                  </div>
                ))}
              </div>

              <Link to="/shop" className="wix-pill-btn dark">
                EXPLORE M-CATALOG <ArrowUpRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Master Technicians Section */}
      <section className="section" style={{ background: "rgba(11,11,13,0.6)" }}>
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: "720px", margin: "0 auto" }}>
            <div className="eyebrow" style={{ justifyContent: "center", marginBottom: "12px" }}>
              IN-HOUSE EXPERTISE
            </div>
            <h2 className="wix-main-h2 dark" style={{ fontSize: "clamp(28px, 4vw, 44px)" }}>
              BMW Master Technician Support
            </h2>
            <p style={{ color: "var(--mid-gray)", marginTop: "12px", fontSize: "16px" }}>
              Our support team consists of certified master mechanics and chassis engineers dedicated to answering your technical fitment queries.
            </p>
          </div>

          <div className="about-team-grid">
            {teamSpecialists.map(({ role, title, desc, icon: Icon }) => (
              <div key={title} className="about-team-card">
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    background: "rgba(0, 138, 201, 0.15)",
                    border: "1px solid rgba(0, 138, 201, 0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "20px",
                  }}
                >
                  <Icon size={24} color="var(--m-blue)" />
                </div>
                <div className="eyebrow" style={{ fontSize: "11px", color: "var(--m-blue)", marginBottom: "6px" }}>
                  {role}
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "20px",
                    fontWeight: 700,
                    color: "var(--white)",
                    marginBottom: "10px",
                  }}
                >
                  {title}
                </h3>
                <p style={{ color: "var(--mid-gray)", fontSize: "14px", lineHeight: 1.6 }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section wix-promo-banner-section">
        <div className="container" style={{ textAlign: "center" }}>
          <h2 className="wix-promo-title">
            Ready to elevate your BMW M experience?
            <br />
            Browse our curated inventory or reach out to our technicians
          </h2>
          <div style={{ marginTop: "32px", display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/shop" className="wix-pill-btn dark">
              Shop M Catalog <ArrowUpRight size={18} />
            </Link>
            <Link to="/contact" className="wix-pill-btn orange">
              Get Technical Advice <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
