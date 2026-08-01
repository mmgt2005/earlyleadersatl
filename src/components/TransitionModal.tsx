interface TransitionModalProps {
  label: string | null;
}

export default function TransitionModal({ label }: TransitionModalProps) {
  if (!label) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(20,20,50,.85)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 16,
          padding: "32px 40px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
        }}
      >
        <div className="transition-spinner" />
        <p
          style={{
            margin: 0,
            fontFamily: "'Baloo 2',sans-serif",
            fontWeight: 700,
            color: "#282882",
            fontSize: 15,
            textAlign: "center",
          }}
        >
          {label}
        </p>
      </div>
    </div>
  );
}
