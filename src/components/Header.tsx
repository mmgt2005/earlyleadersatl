export default function Header() {
  return (
    <div
      id="top"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 20,
        padding: "20px clamp(20px,6vw,56px)",
        background: "#282882",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <img
          src="/images/logo.png"
          alt="Early Leaders"
          style={{ height: 88, objectFit: "contain" }}
        />
        <div>
          <div
            style={{
              fontFamily: "'Baloo 2',sans-serif",
              fontWeight: 700,
              fontSize: "clamp(24px,4vw,36px)",
              lineHeight: 1.15,
              color: "#fff",
              textTransform: "uppercase",
            }}
          >
            Early Leaders
            <br />
            Atl
          </div>
        </div>
      </div>
    </div>
  );
}
