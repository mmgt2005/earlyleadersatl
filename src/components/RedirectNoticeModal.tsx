export interface RedirectNotice {
  title: string;
  message: string;
}

interface RedirectNoticeModalProps {
  notice: RedirectNotice | null;
  onClose: () => void;
}

export default function RedirectNoticeModal({ notice, onClose }: RedirectNoticeModalProps) {
  if (!notice) return null;

  return (
    <div
      onClick={onClose}
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
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          borderRadius: 16,
          padding: 32,
          maxWidth: 380,
          width: "100%",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontFamily: "'Baloo 2',sans-serif",
            fontWeight: 700,
            textTransform: "uppercase",
            color: "#282882",
            fontSize: 18,
            margin: "0 0 10px",
          }}
        >
          {notice.title}
        </h2>
        <p style={{ fontSize: 13.5, lineHeight: 1.6, color: "#5a5850", margin: "0 0 20px" }}>
          {notice.message}
        </p>
        <span
          onClick={onClose}
          style={{
            display: "inline-block",
            background: "#282882",
            color: "#FFDD00",
            padding: "12px 28px",
            borderRadius: 999,
            fontWeight: 700,
            fontSize: 13.5,
            cursor: "pointer",
          }}
        >
          Got it
        </span>
      </div>
    </div>
  );
}
