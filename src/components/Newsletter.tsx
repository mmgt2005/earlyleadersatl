interface NewsletterProps {
  email: string;
  submitting: boolean;
  submitted: boolean;
  error: string | null;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

export default function Newsletter({
  email,
  submitting,
  submitted,
  error,
  onChange,
  onSubmit,
}: NewsletterProps) {
  return (
    <div
      style={{
        background: "#faf9f6",
        padding: "clamp(40px,6vw,56px) clamp(16px,6vw,40px)",
        textAlign: "center",
      }}
    >
      <h2
        style={{
          fontFamily: "'Baloo 2',sans-serif",
          fontWeight: 700,
          textTransform: "uppercase",
          color: "#282882",
          fontSize: 20,
          margin: "0 0 10px",
        }}
      >
        Join Our Email List
      </h2>
      <p
        style={{
          fontSize: 14,
          color: "#5a5850",
          margin: "0 0 20px",
          maxWidth: 420,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        Get occasional updates on events, new books, and programs from Early Leaders
        Atl.
      </p>
      {submitted ? (
        <p style={{ fontSize: 14, color: "#2f8a4b", fontWeight: 700, margin: 0 }}>
          You're on the list! Thanks for joining.
        </p>
      ) : (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            justifyContent: "center",
            maxWidth: 420,
            margin: "0 auto",
          }}
        >
          <input
            type="email"
            value={email}
            onChange={(e) => onChange(e.target.value)}
            placeholder="you@example.com"
            style={{
              flex: "1 1 220px",
              boxSizing: "border-box",
              padding: "13px 16px",
              border: "1px solid #ddd8cc",
              borderRadius: 999,
              fontSize: 14,
              fontFamily: "Inter,sans-serif",
            }}
          />
          <span
            onClick={submitting ? undefined : onSubmit}
            style={{
              display: "inline-block",
              background: submitting ? "#9c9cc4" : "#282882",
              color: "#FFDD00",
              padding: "13px 28px",
              borderRadius: 999,
              fontWeight: 700,
              fontSize: 14,
              cursor: submitting ? "default" : "pointer",
              whiteSpace: "nowrap",
            }}
          >
            {submitting ? "Joining…" : "Subscribe"}
          </span>
        </div>
      )}
      {error && (
        <p style={{ fontSize: 13, color: "#b3261e", fontWeight: 700, margin: "14px 0 0" }}>
          {error}
        </p>
      )}
    </div>
  );
}
