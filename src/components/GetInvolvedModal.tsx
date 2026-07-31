import type { InterestForm } from "../types";
import {
  overlayStyle,
  labelStyle,
  inputStyle,
  cancelButtonStyle,
  submitButtonStyle,
  submitButtonDisabledStyle,
  errorTextStyle,
} from "./modalStyles";

interface GetInvolvedModalProps {
  open: boolean;
  form: InterestForm;
  submitting: boolean;
  submitted: boolean;
  error: string | null;
  onClose: () => void;
  onChange: (field: keyof InterestForm, value: string) => void;
  onSubmit: () => void;
}

export default function GetInvolvedModal({
  open,
  form,
  submitting,
  submitted,
  error,
  onClose,
  onChange,
  onSubmit,
}: GetInvolvedModalProps) {
  if (!open) return null;

  return (
    <div onClick={onClose} style={overlayStyle}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          borderRadius: 16,
          padding: 32,
          maxWidth: 440,
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
          Get Involved
        </h2>
        <p style={{ fontSize: 13, color: "#6a685f", margin: "0 0 20px" }}>
          Tell us how you'd like to help — volunteering, partnering, or something
          else.
        </p>
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
            <label style={labelStyle}>I'm interested in</label>
            <select
              value={form.interest}
              onChange={(e) => onChange("interest", e.target.value)}
              style={{ ...inputStyle, background: "#fff" }}
            >
              <option value="Volunteering">Volunteering</option>
              <option value="Partnering">Partnering</option>
              <option value="Book Fairs">Book Fairs</option>
              <option value="Workshops & Mentoring">Workshops &amp; Mentoring</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label style={labelStyle}>Additional Information</label>
            <textarea
              value={form.message}
              onChange={(e) => onChange("message", e.target.value)}
              placeholder="Anything else you'd like us to know?"
              rows={4}
              style={{ ...inputStyle, resize: "vertical" }}
            />
          </div>
          {submitted ? (
            <div style={{ display: "flex", marginTop: 6 }}>
              <span onClick={onClose} style={submitButtonStyle}>
                Close
              </span>
            </div>
          ) : (
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
          )}
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
              Thanks! We'll be in touch soon.
            </p>
          )}
          {error && <p style={errorTextStyle}>{error}</p>}
        </div>
      </div>
    </div>
  );
}
