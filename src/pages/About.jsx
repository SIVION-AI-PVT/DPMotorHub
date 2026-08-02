import React, { useRef } from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Target,
  Zap,
  Users,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "./Home.css";

const glassCard = {
  background: "rgba(20, 20, 26, 0.65)",
  backdropFilter: "blur(20px) saturate(190%)",
  WebkitBackdropFilter: "blur(20px) saturate(190%)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: "16px",
  padding: "36px 28px",
  textAlign: "center",
  transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
};

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
];

export default function About() {
  const container = useRef(null);

  useGSAP(
    () => {
      // Hero
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
          "-=0.4",
        )
        .from(
          ".wix-hero .wix-pill-btn",
          {
            y: 30,
            opacity: 0,
            filter: "blur(5px)",
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.6",
        );

      // Content fade
      gsap.from(".section p", {
        scrollTrigger: { trigger: ".section", start: "top 75%" },
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
      });

      // Glass cards grid
      gsap.from(".grid-cols-4 .glass-card", {
        scrollTrigger: { trigger: ".grid-cols-4", start: "top 75%" },
        y: 50,
        opacity: 0,
        filter: "blur(10px)",
        scale: 0.95,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });

      // Facility Section
      gsap.from(".grid-cols-2 > div", {
        scrollTrigger: { trigger: ".grid-cols-2", start: "top 75%" },
        x: (index) => (index === 0 ? -60 : 60),
        opacity: 0,
        filter: "blur(10px)",
        duration: 1.2,
        stagger: 0.2,
        ease: "expo.out",
      });
    },
    { scope: container },
  );

  return (
    <div style={{ width: "100%", overflow: "hidden" }} ref={container}>
      {/* Hero Banner */}
      <section
        className="wix-hero"
        style={{ minHeight: "500px", paddingTop: "100px" }}
      >
        <div className="wix-hero-bg">
          <img
            src="/assets/hero_bg.jpg"
            alt="BMW M Engineering"
            className="hero-bg"
          />{" "}
          <div
            className="wix-hero-overlay"
            style={{
              background:
                "radial-gradient(circle, transparent 20%, rgba(11,11,13,0.85) 100%), linear-gradient(180deg, rgba(11,11,13,0.4) 0%, rgba(11,11,13,0.95) 100%)",
            }}
          ></div>
        </div>

        <div
          className="container"
          style={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <div className="stitch-hero-eyebrow">
            <span className="m-stripe-pill"></span> OUR HERITAGE & MOTORSPORT
            PASSION
          </div>
          <h1
            className="stitch-hero-title"
            style={{ fontSize: "clamp(40px, 6vw, 72px)" }}
          >
            Born On The Track.
            <br />
            Built For The Road.
          </h1>
          <div style={{ marginTop: "24px" }}>
            <Link to="/shop" className="wix-pill-btn dark">
              Explore Catalog <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="section">
        <div
          className="container"
          style={{ maxWidth: "840px", margin: "0 auto", textAlign: "center" }}
        >
          <div
            className="eyebrow"
            style={{ justifyContent: "center", marginBottom: "12px" }}
          >
            THE PURSUIT OF PERFECTION
          </div>
          <h2 className="wix-main-h2 dark" style={{ marginBottom: "32px" }}>
            Uncompromising German Engineering
          </h2>
          <p
            style={{
              fontSize: "18px",
              color: "var(--mid-gray)",
              marginBottom: "24px",
              lineHeight: 1.7,
            }}
          >
            DP Motorhub was established by a collective of BMW M enthusiasts who
            were tired of navigating generic auto parts marketplaces to find
            genuine performance upgrades. We created a dedicated sanctuary that
            matches the exact engineering standards of Nürburgring-tested
            M-cars.
          </p>
          <p
            style={{
              fontSize: "18px",
              color: "var(--mid-gray)",
              lineHeight: 1.7,
            }}
          >
            Every splitter, steering wheel, titanium exhaust, and carbon ceramic
            brake system in our catalog has been verified by our in-house
            engineering team to guarantee 100% factory fitment and authentic BMW
            provenance.
          </p>
        </div>
      </section>

      {/* Core Values Grid */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <div className="eyebrow" style={{ justifyContent: "center" }}>
              OUR PRINCIPLES
            </div>
            <h2 className="wix-main-h2 dark">Why BMW Enthusiasts Choose Us</h2>
          </div>

          <div className="grid grid-cols-4">
            {values.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="glass-card"
                style={{ ...glassCard, cursor: "default" }}
              >
                <Icon
                  size={44}
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

      {/* Facility / Workshop Section */}
      <section className="section">
        <div className="container">
          <div
            className="grid grid-cols-2"
            style={{ gap: "48px", alignItems: "center" }}
          >
            <div>
              <div className="eyebrow" style={{ color: "var(--m-blue)" }}>
                OUR FACILITY
              </div>
              <h2 className="wix-main-h2 dark" style={{ marginBottom: "24px" }}>
                Track-Tested Quality Control
              </h2>
              <p
                style={{
                  color: "var(--mid-gray)",
                  marginBottom: "24px",
                  lineHeight: 1.7,
                }}
              >
                Inside our specialized Munich workshop and fulfillment facility,
                every carbon fiber piece is inspected under high-intensity
                lighting for weave symmetry and UV finish clarity before being
                packaged with protective foam.
              </p>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  marginBottom: "32px",
                }}
              >
                {checks.map((check) => (
                  <div
                    key={check}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      fontSize: "15px",
                      color: "var(--white)",
                    }}
                  >
                    <CheckCircle2 size={18} color="var(--m-blue)" /> {check}
                  </div>
                ))}
              </div>

              <Link to="/shop" className="wix-pill-btn dark">
                Explore Catalog <ArrowUpRight size={18} />
              </Link>
            </div>

            <div
              style={{
                ...glassCard,
                padding: 0,
                overflow: "hidden",
                height: "400px",
              }}
            >
              <img
                src="/assets/mirror_caps.jpg"
                alt="DP Motorhub Facility"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="section wix-promo-banner-section">
        <div className="container" style={{ textAlign: "center" }}>
          <h2 className="wix-promo-title">
            Ready to elevate your BMW M experience?
            <br />
            Browse our curated inventory or reach out to our technicians
          </h2>
          <div style={{ marginTop: "32px" }}>
            <Link to="/shop" className="wix-pill-btn dark">
              Shop M Catalog <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
