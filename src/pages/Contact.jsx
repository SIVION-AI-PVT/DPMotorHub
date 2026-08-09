import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  ArrowUpRight,
  CheckCircle2,
  Send,
  Sparkles,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "./Home.css";

gsap.registerPlugin(ScrollTrigger);

const glassCard = {
  borderRadius: "16px",
  padding: "32px",
};

const glassInput = {
  borderRadius: "8px",
  width: "100%",
  padding: "14px 18px",
  outline: "none",
  fontFamily: "inherit",
  fontSize: "15px",
  transition: "all 0.3s",
};

const topics = [
  "VIN Fitment Check",
  "Order Status & Shipping",
  "Custom Carbon Aero Sourcing",
  "Technical Installation Guide",
];

export default function Contact() {
  const container = useRef(null);
  const [submitted, setSubmitted] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState("VIN Fitment Check");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    chassis: "",
    message: "",
  });

  useGSAP(
    () => {
      // Header
      const tl = gsap.timeline();
      tl.from(
        ".stitch-hero-eyebrow",
        { y: 20, opacity: 0, duration: 0.6, ease: "power3.out", delay: 0.1 }
      )
        .from(
          ".section h1",
          { y: 30, opacity: 0, duration: 0.8, ease: "power3.out" },
          "-=0.4"
        )
        .from(
          ".section p",
          { y: 20, opacity: 0, duration: 0.6, ease: "power3.out" },
          "-=0.5"
        );

      // Grid columns
      tl.from(
        ".grid-cols-2 > div",
        { y: 30, opacity: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" },
        "-=0.4"
      );
    },
    { scope: container },
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ width: "100%", overflow: "hidden" }} ref={container}>
      {/* Header */}
      <section
        className="section"
        style={{ paddingTop: "100px", textAlign: "center" }}
      >
        <div
          className="container"
          style={{ maxWidth: "840px", margin: "0 auto" }}
        >
          <div
            className="stitch-hero-eyebrow"
            style={{ justifyContent: "center", margin: "0 auto 20px" }}
          >
            <span className="m-stripe-pill"></span> EXPERT TECHNICAL SUPPORT
          </div>
          <h1
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(32px, 5vw, 56px)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              marginBottom: "16px",
            }}
          >
            GET IN TOUCH WITH OUR
            <br />M SPECIALISTS
          </h1>
          <p
            style={{
              color: "var(--mid-gray)",
              fontSize: "17px",
              lineHeight: 1.7,
              maxWidth: "640px",
              margin: "0 auto",
            }}
          >
            VIN fitment questions, rare part sourcing, or technical installation
            guidance — our BMW Master Technicians are ready to assist.
          </p>
        </div>
      </section>

      {/* 2 Column Layout */}
      <section className="section" style={{ paddingTop: "40px" }}>
        <div className="container">
          <div
            className="grid grid-cols-2"
            style={{ gap: "40px", alignItems: "flex-start" }}
          >
            {/* LEFT: Contact Form */}
            <div className="glass-card contact-form-card" style={glassCard}>
              <h2
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "22px",
                  fontWeight: 700,
                  marginBottom: "20px",
                }}
              >
                Send Us A Message
              </h2>

              {/* Inquiry Topic Pills */}
              <div style={{ marginBottom: "24px" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    color: "var(--m-blue)",
                    marginBottom: "10px",
                    textTransform: "uppercase",
                  }}
                >
                  INQUIRY SUBJECT
                </label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {topics.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setSelectedTopic(t)}
                      className={`topic-pill-btn ${selectedTopic === t ? "selected" : ""}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {submitted ? (
                <div
                  style={{
                    background: "rgba(0, 138, 201, 0.15)",
                    border: "1px solid var(--m-blue)",
                    borderRadius: "12px",
                    padding: "32px 24px",
                    textAlign: "center",
                  }}
                >
                  <CheckCircle2 size={48} color="var(--m-blue)" style={{ margin: "0 auto 16px" }} />
                  <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "20px", color: "#fff", marginBottom: "8px" }}>
                    Enquiry Submitted Successfully!
                  </h3>
                  <p style={{ color: "var(--mid-gray)", fontSize: "14px", lineHeight: 1.6, marginBottom: "20px" }}>
                    Our BMW Master Technicians in Munich have received your request regarding <strong>"{selectedTopic}"</strong>. We will review your chassis details and get back to you within 4 hours.
                  </p>
                  <button
                    type="button"
                    className="wix-pill-btn dark"
                    onClick={() => setSubmitted(false)}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "16px",
                      marginBottom: "16px",
                    }}
                  >
                    <div>
                      <label
                        style={{
                          display: "block",
                          fontSize: "11px",
                          fontWeight: 700,
                          letterSpacing: "0.08em",
                          color: "var(--m-blue)",
                          marginBottom: "6px",
                          textTransform: "uppercase",
                        }}
                      >
                        FULL NAME *
                      </label>
                      <input
                        type="text"
                        placeholder="John Schmidt"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        style={glassInput}
                      />
                    </div>
                    <div>
                      <label
                        style={{
                          display: "block",
                          fontSize: "11px",
                          fontWeight: 700,
                          letterSpacing: "0.08em",
                          color: "var(--m-blue)",
                          marginBottom: "6px",
                          textTransform: "uppercase",
                        }}
                      >
                        EMAIL ADDRESS *
                      </label>
                      <input
                        type="email"
                        placeholder="john@example.com"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        style={glassInput}
                      />
                    </div>
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "16px",
                      marginBottom: "16px",
                    }}
                  >
                    <div>
                      <label
                        style={{
                          display: "block",
                          fontSize: "11px",
                          fontWeight: 700,
                          letterSpacing: "0.08em",
                          color: "var(--m-blue)",
                          marginBottom: "6px",
                          textTransform: "uppercase",
                        }}
                      >
                        PHONE / WHATSAPP
                      </label>
                      <input
                        type="text"
                        placeholder="+49 176 12345678"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        style={glassInput}
                      />
                    </div>
                    <div>
                      <label
                        style={{
                          display: "block",
                          fontSize: "11px",
                          fontWeight: 700,
                          letterSpacing: "0.08em",
                          color: "var(--m-blue)",
                          marginBottom: "6px",
                          textTransform: "uppercase",
                        }}
                      >
                        CHASSIS CODE / VIN
                      </label>
                      <input
                        type="text"
                        placeholder="G80 M3 / F90 M5"
                        value={formData.chassis}
                        onChange={(e) => setFormData({ ...formData, chassis: e.target.value })}
                        style={glassInput}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: "24px" }}>
                    <label
                      style={{
                        display: "block",
                        fontSize: "11px",
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        color: "var(--m-blue)",
                        marginBottom: "6px",
                        textTransform: "uppercase",
                      }}
                    >
                      YOUR MESSAGE *
                    </label>
                    <textarea
                      rows={5}
                      required
                      placeholder="Describe your project, chassis details, or the specific M part you need..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      style={{ ...glassInput, resize: "vertical" }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="wix-pill-btn dark"
                    style={{ width: "100%" }}
                  >
                    Submit Technical Enquiry <Send size={16} />
                  </button>
                </form>
              )}
            </div>

            {/* RIGHT: Info Cards */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              {/* WhatsApp Hotline */}
              <div className="glass-card contact-info-card" style={{ ...glassCard, borderLeft: "4px solid #25D366" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "12px",
                  }}
                >
                  <MessageCircle size={22} color="#25D366" />
                  <h3
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "18px",
                      fontWeight: 700,
                    }}
                  >
                    WhatsApp Technical Hotline
                  </h3>
                </div>
                <p
                  style={{
                    color: "var(--mid-gray)",
                    fontSize: "14px",
                    marginBottom: "16px",
                    lineHeight: 1.6,
                  }}
                >
                  Get instant technical support and VIN fitment verification directly from our Munich Master Technicians.
                </p>
                <a
                  href="https://wa.me/15556769377"
                  target="_blank"
                  rel="noreferrer"
                  className="wix-pill-btn orange"
                  style={{ fontSize: "13px", padding: "12px 28px" }}
                >
                  Chat Now <ArrowUpRight size={16} />
                </a>
              </div>

              {/* HQ Address */}
              <div className="glass-card contact-info-card" style={glassCard}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "12px",
                  }}
                >
                  <MapPin size={20} color="var(--m-blue)" />
                  <h3
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "16px",
                      fontWeight: 700,
                    }}
                  >
                    Munich Headquarters & Facility
                  </h3>
                </div>
                <p
                  style={{
                    color: "var(--mid-gray)",
                    fontSize: "14px",
                    lineHeight: 1.6,
                  }}
                >
                  DP Motorhub GmbH
                  <br />
                  Schleißheimer Str. 200, 80809 Munich, Germany
                </p>
              </div>

              {/* Operating Hours + Direct Email */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "20px",
                }}
              >
                <div className="glass-card contact-info-card" style={{ ...glassCard, padding: "24px" }}>
                  <Clock
                    size={20}
                    color="var(--m-blue)"
                    style={{ marginBottom: "12px" }}
                  />
                  <h4
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "14px",
                      fontWeight: 700,
                      marginBottom: "8px",
                    }}
                  >
                    Operating Hours
                  </h4>
                  <p
                    style={{
                      color: "var(--mid-gray)",
                      fontSize: "13px",
                      lineHeight: 1.6,
                    }}
                  >
                    Mon — Fri: 9:00 — 18:00 CET
                    <br />
                    Sat: 10:00 — 14:00 CET
                  </p>
                </div>

                <div className="glass-card contact-info-card" style={{ ...glassCard, padding: "24px" }}>
                  <Mail
                    size={20}
                    color="var(--m-blue)"
                    style={{ marginBottom: "12px" }}
                  />
                  <h4
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "14px",
                      fontWeight: 700,
                      marginBottom: "8px",
                    }}
                  >
                    Direct Email
                  </h4>
                  <a
                    href="mailto:sales@dpmotorhub.com"
                    style={{
                      color: "var(--m-blue)",
                      fontSize: "13px",
                      textDecoration: "none",
                    }}
                  >
                    sales@dpmotorhub.com
                  </a>
                  <br />
                  <a
                    href="mailto:support@dpmotorhub.com"
                    style={{
                      color: "var(--mid-gray)",
                      fontSize: "13px",
                      textDecoration: "none",
                    }}
                  >
                    support@dpmotorhub.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="section wix-promo-banner-section">
        <div className="container" style={{ textAlign: "center" }}>
          <h2 className="wix-promo-title">
            Can't find what you need?
            <br />
            Our sourcing team locates any BMW M part worldwide.
          </h2>
          <div style={{ marginTop: "32px" }}>
            <Link to="/shop" className="wix-pill-btn dark">
              Browse Full Catalog <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
