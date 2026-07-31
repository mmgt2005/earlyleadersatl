export default function Footer() {
  return (
    <div
      style={{
        padding: "32px clamp(16px,6vw,40px)",
        display: "flex",
        flexWrap: "wrap",
        gap: 16,
        justifyContent: "space-between",
        alignItems: "center",
        borderTop: "1px solid #ece9e2",
      }}
    >
      <p style={{ fontSize: 13, color: "#6a685f", margin: 0 }}>
        earlyleaderatl@gmail.com · Atlanta, GA
      </p>
      <div
        style={{
          display: "flex",
          gap: 28,
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: ".08em",
          textTransform: "uppercase",
          color: "#282882",
        }}
      >
        <a href="#top" style={{ textDecoration: "none" }}>
          Home
        </a>
        <a href="#square-shop" style={{ textDecoration: "none" }}>
          Shop
        </a>
        <a href="#programs-section" style={{ textDecoration: "none" }}>
          Resources
        </a>
        <a href="#donate-cta" style={{ textDecoration: "none" }}>
          Donate
        </a>
      </div>
    </div>
  );
}
