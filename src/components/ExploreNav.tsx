import { PencilIcon, PeopleIcon, HeartIcon } from "./Icons";

const chipStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  background: "#fff",
  border: "1px solid #ece9e2",
  borderRadius: 999,
  padding: "10px 18px 10px 10px",
  textDecoration: "none",
  boxShadow: "0 4px 12px rgba(40,40,130,.05)",
};

const badgeStyle: React.CSSProperties = {
  width: 32,
  height: 32,
  borderRadius: 8,
  background: "#282882",
  flex: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const labelStyle: React.CSSProperties = {
  fontFamily: "'Baloo 2',sans-serif",
  fontWeight: 700,
  textTransform: "uppercase",
  fontSize: 13,
  color: "#1c1b18",
};

interface ExploreNavProps {
  onOpenInterestForm: () => void;
}

export default function ExploreNav({ onOpenInterestForm }: ExploreNavProps) {
  return (
    <div style={{ padding: "8px clamp(16px,6vw,40px) clamp(32px,5vw,48px)" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          margin: "0 0 24px",
        }}
      >
        <span style={{ width: 60, height: 2, background: "#FFDD00" }} />
        <h2
          style={{
            fontFamily: "'Baloo 2',sans-serif",
            fontWeight: 700,
            textTransform: "uppercase",
            color: "#282882",
            fontSize: 18,
            margin: 0,
          }}
        >
          Explore
        </h2>
        <span style={{ width: 60, height: 2, background: "#FFDD00" }} />
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 12,
          maxWidth: 900,
          margin: "0 auto",
        }}
      >
        <a href="#programs-section" style={chipStyle}>
          <div style={badgeStyle}>
            <PencilIcon size={17} />
          </div>
          <span style={labelStyle}>Programs</span>
        </a>
        <a href="#mascots-section" style={chipStyle}>
          <div style={badgeStyle}>
            <PeopleIcon size={17} />
          </div>
          <span style={labelStyle}>About Us</span>
        </a>
        <span
          onClick={onOpenInterestForm}
          style={{ ...chipStyle, cursor: "pointer" }}
        >
          <div style={badgeStyle}>
            <HeartIcon size={17} />
          </div>
          <span style={labelStyle}>Get Involved</span>
        </span>
      </div>
    </div>
  );
}
