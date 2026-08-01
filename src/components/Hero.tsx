import HeroDecoration from "./HeroDecoration";

interface HeroProps {
  onDonateClick: () => void;
}

export default function Hero({ onDonateClick }: HeroProps) {
  return (
    <div
      style={{
        background: "#282882",
        borderRadius: "0 0 50% 50%/0 0 14% 14%",
        borderBottom: "5px solid #FFDD00",
        padding: "clamp(20px,5vw,64px) clamp(16px,5vw,40px) clamp(36px,7vw,96px)",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <HeroDecoration />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 0,
          maxWidth: 1000,
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            flex: "0 0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#FFDD00",
            borderRadius: "50%",
            padding: "clamp(10px,2vw,20px)",
            marginRight: "clamp(-16px,-2vw,-4px)",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-end" }}>
            <img
              src="/images/freddy.png"
              alt="Freddy, Early Leaders mascot"
              style={{ height: "clamp(80px,17vw,240px)", objectFit: "contain" }}
            />
            <img
              src="/images/toni.png"
              alt="Toni, Early Leaders mascot"
              style={{
                height: "clamp(80px,17vw,240px)",
                objectFit: "contain",
                marginLeft: "clamp(-20px,-2.5vw,-10px)",
              }}
            />
          </div>
        </div>
        <div style={{ flex: "1 1 300px", textAlign: "center", position: "relative" }}>
          <h1
            style={{
              fontFamily: "'Paytone One',sans-serif",
              fontWeight: 400,
              textTransform: "uppercase",
              textAlign: "center",
              margin: "0 0 14px",
            }}
          >
            <div style={{ color: "#FFDD00", fontSize: "clamp(24px,5.6vw,54px)", lineHeight: 1.05 }}>
              Big Dreams.
            </div>
            <div style={{ color: "#FFDD00", fontSize: "clamp(13px,2.8vw,26px)", lineHeight: 1.1 }}>
              Brave Hearts.
            </div>
            <div style={{ color: "#FFDD00", fontSize: "clamp(21px,5vw,48px)", lineHeight: 1.05 }}>
              Bright
            </div>
            <div style={{ color: "#FFDD00", fontSize: "clamp(21px,5vw,48px)", lineHeight: 1.05 }}>
              Futures.
            </div>
          </h1>
          <p
            className="hero-copy"
            style={{
              fontSize: 13.5,
              lineHeight: 1.6,
              color: "#e7e6f5",
              maxWidth: 420,
              margin: "0 auto 18px",
              display: "none",
            }}
          >
            Early Leaders ATL connects families with educational tools, enriching
            experiences, and engaging programs that build character, promote active
            learning, and prepare our young people to lead with confidence.
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              justifyContent: "center",
              position: "relative",
            }}
          >
            <a
              href="https://square.link/u/wzRTsGub"
              target="_blank"
              rel="noreferrer"
              onClick={onDonateClick}
              style={{
                display: "inline-block",
                background: "#FFDD00",
                color: "#1c1b18",
                padding: "13px 26px",
                borderRadius: 999,
                fontWeight: 700,
                fontSize: 14,
                textDecoration: "none",
              }}
            >
              Donate Now
            </a>
            <a
              href="#square-shop"
              style={{
                display: "inline-block",
                border: "2px solid #FFDD00",
                color: "#FFDD00",
                padding: "13px 26px",
                borderRadius: 999,
                fontWeight: 700,
                fontSize: 14,
                textDecoration: "none",
              }}
            >
              Shop the Books
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
