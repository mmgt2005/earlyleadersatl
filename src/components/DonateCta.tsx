export default function DonateCta() {
  return (
    <div
      id="donate-cta"
      style={{
        background: "#282882",
        padding: "clamp(40px,6vw,56px) clamp(16px,6vw,40px)",
        textAlign: "center",
      }}
    >
      <div
        style={{
          width: 26,
          height: 26,
          borderRadius: "50%",
          border: "3px solid #FFDD00",
          margin: "0 auto 18px",
        }}
      />
      <h2
        style={{
          fontFamily: "'Baloo 2',sans-serif",
          fontWeight: 700,
          textTransform: "uppercase",
          color: "#FFDD00",
          fontSize: 22,
          margin: "0 0 10px",
        }}
      >
        Big Dreams. Brave Hearts. Bright Futures.
      </h2>
      <p style={{ fontSize: 14, color: "#dcdaf3", margin: "0 0 26px" }}>
        Help us create brighter futures for every child.
      </p>
      <a
        href="https://square.link/u/wzRTsGub"
        target="_blank"
        rel="noreferrer"
        style={{
          display: "inline-block",
          background: "#FFDD00",
          color: "#1c1b18",
          padding: "15px 32px",
          borderRadius: 999,
          fontWeight: 700,
          fontSize: 14,
          textDecoration: "none",
        }}
      >
        Donate Now
      </a>
    </div>
  );
}
