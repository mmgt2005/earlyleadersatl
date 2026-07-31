import type { EventItem } from "../types";

interface EventsProps {
  events: EventItem[];
  hasMore: boolean;
  onShowMore: () => void;
  onRsvp: (index: number) => void;
}

function spotsLabel(event: EventItem): string {
  const spotsLeft = event.capacity - event.registered;
  if (spotsLeft <= 0) return "Full";
  return `${spotsLeft} spot${spotsLeft === 1 ? "" : "s"} left`;
}

export default function Events({ events, hasMore, onShowMore, onRsvp }: EventsProps) {
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
        Upcoming Events
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: 20,
          maxWidth: 900,
          margin: "0 auto 28px",
        }}
      >
        {events.map((ev, i) => (
          <div
            key={ev.title}
            style={{
              background: "#fff",
              border: "1px solid #ece9e2",
              borderRadius: 14,
              padding: 20,
              display: "flex",
              gap: 16,
              alignItems: "flex-start",
              boxShadow: "0 6px 18px rgba(40,40,130,.06)",
            }}
          >
            <div
              style={{
                flex: "none",
                width: 56,
                background: "#282882",
                borderRadius: 10,
                padding: "10px 0",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: "'Baloo 2',sans-serif",
                  fontWeight: 700,
                  color: "#FFDD00",
                  fontSize: 20,
                  lineHeight: 1,
                }}
              >
                {ev.day}
              </div>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: "#fff",
                  textTransform: "uppercase",
                  letterSpacing: ".05em",
                }}
              >
                {ev.month}
              </div>
            </div>
            <div>
              <h3
                style={{
                  fontFamily: "'Baloo 2',sans-serif",
                  fontWeight: 700,
                  fontSize: 15,
                  color: "#1c1b18",
                  margin: "0 0 6px",
                }}
              >
                {ev.title}
              </h3>
              <p style={{ fontSize: 12.5, lineHeight: 1.6, color: "#6a685f", margin: "0 0 6px" }}>
                {ev.blurb}
              </p>
              <p style={{ fontSize: 12, fontWeight: 700, color: "#282882", margin: "0 0 8px" }}>
                {ev.when}
              </p>
              <p style={{ fontSize: 11.5, fontWeight: 700, color: "#8a6d00", margin: "0 0 10px" }}>
                {spotsLabel(ev)}
              </p>
              <span
                onClick={() => onRsvp(i)}
                style={{
                  display: "inline-block",
                  background: "#282882",
                  color: "#FFDD00",
                  padding: "9px 20px",
                  borderRadius: 999,
                  fontWeight: 700,
                  fontSize: 12,
                  cursor: "pointer",
                }}
              >
                RSVP
              </span>
            </div>
          </div>
        ))}
      </div>
      <div style={{ textAlign: "center" }}>
        {hasMore && (
          <span
            onClick={onShowMore}
            style={{
              display: "inline-block",
              border: "2px solid #282882",
              color: "#282882",
              padding: "15px 34px",
              borderRadius: 999,
              fontWeight: 700,
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            Show More Events
          </span>
        )}
      </div>
    </div>
  );
}
