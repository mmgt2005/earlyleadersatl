import type { Book } from "../types";
import { overlayStyle } from "./modalStyles";

interface LightboxProps {
  book: Book | null;
  onClose: () => void;
}

export default function Lightbox({ book, onClose }: LightboxProps) {
  if (!book) return null;

  return (
    <div onClick={onClose} style={overlayStyle}>
      <div
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={book.title}
        style={{
          position: "relative",
          display: "flex",
          flexWrap: "wrap",
          gap: 24,
          alignItems: "flex-start",
          width: "min(92vw,720px)",
          maxHeight: "85vh",
          overflowY: "auto",
          background: "#fff",
          borderRadius: 16,
          padding: 32,
          boxShadow: "0 24px 60px rgba(0,0,0,.5)",
        }}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            width: 32,
            height: 32,
            borderRadius: "50%",
            border: "none",
            background: "#f4f3ef",
            color: "#1c1b18",
            fontSize: 20,
            lineHeight: 1,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ×
        </button>

        <div
          role="img"
          aria-label={book.alt}
          style={{
            flex: "1 1 240px",
            maxWidth: 260,
            height: "clamp(220px,50vh,340px)",
            alignSelf: "center",
            backgroundImage: `url("${book.cover}")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "contain",
            borderRadius: 8,
          }}
        />

        <div style={{ flex: "1 1 220px", minWidth: 200, display: "flex", flexDirection: "column", gap: 10 }}>
          <h3
            style={{
              fontFamily: "'Baloo 2',sans-serif",
              fontWeight: 700,
              fontSize: "clamp(18px,3vw,22px)",
              color: "#1c1b18",
              margin: 0,
            }}
          >
            {book.title}
          </h3>
          {book.description && (
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.5, color: "#5a5850" }}>
              {book.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
