import type { RsvpForm } from "../types";
import {
  overlayStyle,
  labelStyle,
  inputStyle,
  cancelButtonStyle,
  submitButtonStyle,
  submitButtonDisabledStyle,
  errorTextStyle,
} from "./modalStyles";

interface RsvpModalProps {
  eventTitle: string | null;
  form: RsvpForm;
  submitting: boolean;
  submitted: boolean;
  error: string | null;
  onClose: () => void;
  onChange: (field: keyof RsvpForm, value: string) => void;
  onSubmit: () => void;
}

export default function RsvpModal({
  eventTitle,
  form,
  submitting,
  submitted,
  error,
  onClose,
  onChange,
  onSubmit,
}: RsvpModalProps) {
  if (eventTitle === null) return null;

  return (
    <div onClick={onClose} style={overlayStyle}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          borderRadius: 16,
          padding: 32,
          maxWidth: 420,
          width: "100%",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <h2
          style={{
            fontFamily: "'Baloo 2',sans-serif",
            fontWeight: 700,
            textTransform: "uppercase",
            color: "#282882",
            fontSize: 20,
            margin: "0 0 6px",
          }}
        >
          RSVP
        </h2>
        <p style={{ fontSize: 13, color: "#6a685f", margin: "0 0 20px" }}>{eventTitle}</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <label style={labelStyle}>Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => onChange("name", e.target.value)}
              placeholder="Your full name"
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>Email Address</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => onChange("email", e.target.value)}
              placeholder="you@example.com"
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>Number Attending</label>
            <select
              value={form.guests}
              onChange={(e) => onChange("guests", e.target.value)}
              style={{ ...inputStyle, background: "#fff" }}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 6 }}>
            <span onClick={onClose} style={cancelButtonStyle}>
              Cancel
            </span>
            <span
              onClick={submitting ? undefined : onSubmit}
              style={submitting ? submitButtonDisabledStyle : submitButtonStyle}
            >
              {submitting ? "Submitting…" : "Submit"}
            </span>
          </div>
          {submitted && (
            <p
              style={{
                fontSize: 13,
                color: "#2f8a4b",
                fontWeight: 700,
                margin: "14px 0 0",
                textAlign: "center",
              }}
            >
              You're on the list! See you there.
            </p>
          )}
          {error && <p style={errorTextStyle}>{error}</p>}
        </div>
      </div>
    </div>
  );
}
