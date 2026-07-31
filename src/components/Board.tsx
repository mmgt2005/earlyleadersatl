export default function Board() {
  return (
    <div style={{ background: "#faf9f6", padding: "clamp(48px,7vw,72px) clamp(16px,6vw,40px)" }}>
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
        Guided By Our Board
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))",
          gap: 20,
          maxWidth: 640,
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <div>
          <div style={{ fontWeight: 700, fontSize: 14 }}>Damon Danielson</div>
          <div style={{ fontSize: 12, color: "#8a877e" }}>Board Chair &amp; Treasurer</div>
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 14 }}>Marcia Danielson</div>
          <div style={{ fontSize: 12, color: "#8a877e" }}>Secretary</div>
        </div>
      </div>
    </div>
  );
}
