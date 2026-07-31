import { BookFairIcon, PeopleIcon, HeartIcon } from "./Icons";

const badgeStyle: React.CSSProperties = {
  width: 44,
  height: 44,
  borderRadius: 10,
  background: "#282882",
  flex: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const rowStyle: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "8px 24px",
  alignItems: "baseline",
  padding: "20px 0",
  borderTop: "1px solid #ded9cb",
};

export default function Programs() {
  return (
    <div
      id="programs-section"
      style={{ background: "#faf9f6", padding: "clamp(48px,7vw,72px) clamp(16px,6vw,40px)" }}
    >
      <h2
        style={{
          fontFamily: "'Baloo 2',sans-serif",
          fontWeight: 700,
          textTransform: "uppercase",
          color: "#282882",
          fontSize: 22,
          margin: "0 0 32px",
          textAlign: "center",
        }}
      >
        Fun Programs With Real Impact
      </h2>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={rowStyle}>
          <span style={badgeStyle}>
            <BookFairIcon size={22} />
          </span>
          <h3 style={{ fontSize: 16, fontWeight: 700, flex: "1 1 160px", margin: 0 }}>
            Book Fairs
          </h3>
          <p style={{ fontSize: 13.5, lineHeight: 1.6, color: "#5a5850", margin: 0, flex: "2 1 240px" }}>
            Bringing books and reading literacy directly into communities and schools.
          </p>
        </div>
        <div style={rowStyle}>
          <span style={badgeStyle}>
            <PeopleIcon size={22} />
          </span>
          <h3 style={{ fontSize: 16, fontWeight: 700, flex: "1 1 160px", margin: 0 }}>
            Workshops &amp; Mentoring
          </h3>
          <p style={{ fontSize: 13.5, lineHeight: 1.6, color: "#5a5850", margin: 0, flex: "2 1 240px" }}>
            Hands-on sessions building character, problem-solving, and emotional
            intelligence.
          </p>
        </div>
        <div style={{ ...rowStyle, borderBottom: "1px solid #ded9cb" }}>
          <span style={badgeStyle}>
            <HeartIcon size={22} />
          </span>
          <h3 style={{ fontSize: 16, fontWeight: 700, flex: "1 1 160px", margin: 0 }}>
            Health &amp; Financial Literacy
          </h3>
          <p style={{ fontSize: 13.5, lineHeight: 1.6, color: "#5a5850", margin: 0, flex: "2 1 240px" }}>
            Games, videos, and activities teaching money skills and physical wellness.
          </p>
        </div>
      </div>
    </div>
  );
}
