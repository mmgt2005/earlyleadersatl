import type { ProgramVideoConfig } from "../types";

interface ProgramVideoSectionProps {
  config: ProgramVideoConfig;
  onDonateClick: () => void;
}

const buttonBase: React.CSSProperties = {
  display: "inline-block",
  padding: "13px 26px",
  borderRadius: 999,
  fontWeight: 700,
  fontSize: 14,
  textDecoration: "none",
};

export default function ProgramVideoSection({ config, onDonateClick }: ProgramVideoSectionProps) {
  return (
    <div style={{ padding: "clamp(48px,7vw,72px) clamp(16px,6vw,40px)", textAlign: "center" }}>
      <h2
        style={{
          fontFamily: "'Baloo 2',sans-serif",
          fontWeight: 700,
          textTransform: "uppercase",
          color: "#282882",
          fontSize: 22,
          margin: "0 0 16px",
        }}
      >
        {config.heading}
      </h2>
      {config.description && (
        <p
          style={{
            fontSize: 14,
            lineHeight: 1.6,
            color: "#5a5850",
            maxWidth: 560,
            margin: "0 auto 28px",
          }}
        >
          {config.description}
        </p>
      )}
      <video
        controls
        playsInline
        preload="metadata"
        style={{
          width: "100%",
          maxWidth: 720,
          borderRadius: 16,
          display: "block",
          margin: "0 auto 28px",
          background: "#000",
        }}
      >
        <source src="/videos/program-video.mp4" type="video/mp4" />
      </video>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
        {config.showDonateButton && (
          <a
            href="https://square.link/u/wzRTsGub"
            target="_blank"
            rel="noreferrer"
            onClick={onDonateClick}
            style={{ ...buttonBase, background: "#FFDD00", color: "#1c1b18" }}
          >
            Donate Now
          </a>
        )}
        {config.showShopButton && (
          <a
            href="#square-shop"
            style={{ ...buttonBase, border: "2px solid #282882", color: "#282882" }}
          >
            Shop the Books
          </a>
        )}
        {config.showNewsletterButton && (
          <a
            href="#newsletter-section"
            style={{ ...buttonBase, border: "2px solid #282882", color: "#282882" }}
          >
            Join the Newsletter
          </a>
        )}
      </div>
    </div>
  );
}
