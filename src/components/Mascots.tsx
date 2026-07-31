export default function Mascots() {
  return (
    <div id="mascots-section" style={{ padding: "clamp(48px,7vw,72px) clamp(16px,6vw,40px)" }}>
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
        Meet the Mascots
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
          gap: 20,
          maxWidth: 760,
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 20,
            alignItems: "center",
            background: "#faf9f6",
            borderRadius: 16,
            padding: 24,
          }}
        >
          <img src="/images/toni.png" alt="Toni" style={{ height: 120, objectFit: "contain" }} />
          <div>
            <h3
              style={{
                fontFamily: "'Baloo 2',sans-serif",
                fontWeight: 700,
                margin: "0 0 6px",
                fontSize: 16,
                color: "#282882",
              }}
            >
              Toni
            </h3>
            <p style={{ fontSize: 13, lineHeight: 1.6, color: "#5a5850", margin: 0 }}>
              Bold and confident, Toni teaches kids to stand tall and lead their
              communities.
            </p>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            gap: 20,
            alignItems: "center",
            background: "#faf9f6",
            borderRadius: 16,
            padding: 24,
          }}
        >
          <img src="/images/freddy.png" alt="Freddy" style={{ height: 120, objectFit: "contain" }} />
          <div>
            <h3
              style={{
                fontFamily: "'Baloo 2',sans-serif",
                fontWeight: 700,
                margin: "0 0 6px",
                fontSize: 16,
                color: "#282882",
              }}
            >
              Freddy
            </h3>
            <p style={{ fontSize: 13, lineHeight: 1.6, color: "#5a5850", margin: 0 }}>
              Curious and kind-hearted, Freddy shows kids that asking questions is the
              first step to leading.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
