import React, { useState } from "react";
import {
  MapPin,
  Navigation,
  ExternalLink,
  Layers,
  Copy,
  Check,
  Compass,
} from "lucide-react";
import "./GoogleMapEmbed.css";

const GOOGLE_MAPS_SHORT_URL = "https://maps.app.goo.gl/8nHc8qSnCRHtKBfL6?g_st=aw";
const LAT = 6.99897;
const LNG = 79.963791;
const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${LAT},${LNG}`;

export default function GoogleMapEmbed({
  title = "DP Motorhub Showroom & Engineering Hub",
  subtitle = "325/1/A/3, Ihala Biyanwila, Kadawatha, Sri Lanka",
  compact = false,
  showCardOverlay = true,
  height = 450,
}) {
  const [mapType, setMapType] = useState("m"); // "m" = roadmap, "k" = satellite
  const [copied, setCopied] = useState(false);

  const embedSrc = `https://maps.google.com/maps?q=${LAT},${LNG}&t=${mapType}&hl=en&z=16&output=embed`;

  const handleCopyCoords = () => {
    navigator.clipboard.writeText(`${LAT}, ${LNG}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className={`google-map-container ${compact ? "compact-map" : ""}`}>
      {/* Top Header Bar */}
      <div className="google-map-header">
        <div className="google-map-title-wrap">
          <div className="google-map-indicator">
            <span className="pulse-dot"></span>
            <span className="live-text">Live Google Maps</span>
          </div>
          <button
            type="button"
            className="coordinates-badge"
            onClick={handleCopyCoords}
            title="Click to copy coordinates"
          >
            <span>{LAT.toFixed(6)}, {LNG.toFixed(6)}</span>
            {copied ? <Check size={12} color="#008AC9" /> : <Copy size={12} />}
          </button>
        </div>

        {/* View Mode & Actions */}
        <div className="google-map-controls">
          <div className="map-view-switcher">
            <button
              type="button"
              className={`view-toggle-btn ${mapType === "m" ? "active" : ""}`}
              onClick={() => setMapType("m")}
              title="Roadmap View"
            >
              <Layers size={13} />
              <span>Map</span>
            </button>
            <button
              type="button"
              className={`view-toggle-btn ${mapType === "k" ? "active" : ""}`}
              onClick={() => setMapType("k")}
              title="Satellite Imagery"
            >
              <span>Satellite</span>
            </button>
          </div>

          <a
            href={GOOGLE_MAPS_SHORT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="map-header-action-btn"
            title="Open in Google Maps app"
          >
            <span>Open Maps</span>
            <ExternalLink size={13} />
          </a>
        </div>
      </div>

      {/* Map Body with Iframe */}
      <div className="google-map-body" style={{ height: `${height}px` }}>
        <iframe
          title="DP Motorhub Google Location"
          src={embedSrc}
          className="google-map-iframe"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />

        {/* Floating Pin / Info Overlay Card */}
        {showCardOverlay && (
          <div className="google-map-floating-card">
            <div className="map-card-header">
              <div className="map-pin-icon-wrap">
                <MapPin size={18} color="#ffffff" />
              </div>
              <div style={{ flex: 1 }}>
                <h4 className="map-card-name">{title}</h4>
                <p className="map-card-address">{subtitle}</p>
              </div>
            </div>

            <div className="map-card-actions">
              <a
                href={DIRECTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="map-btn map-btn-primary"
              >
                <Compass size={14} />
                <span>Directions</span>
              </a>

              <a
                href={GOOGLE_MAPS_SHORT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="map-btn map-btn-secondary"
              >
                <Navigation size={14} />
                <span>Google Maps</span>
              </a>

              <button
                type="button"
                onClick={handleCopyCoords}
                className="map-btn map-btn-icon"
                title="Copy GPS coordinates"
              >
                {copied ? <Check size={14} color="#008AC9" /> : <Copy size={14} />}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Mobile / Responsive Quick Bar */}
      <div className="google-map-footer-bar">
        <div className="footer-location-info">
          <MapPin size={14} color="var(--m-blue)" />
          <span>325/1/A/3, Ihala Biyanwila, Kadawatha</span>
        </div>
        <div className="footer-quick-links">
          <a
            href={DIRECTIONS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-action-link"
          >
            <Compass size={13} />
            <span>Directions</span>
          </a>
          <a
            href={GOOGLE_MAPS_SHORT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-action-link highlight"
          >
            <ExternalLink size={13} />
            <span>Maps Link</span>
          </a>
        </div>
      </div>
    </div>
  );
}
