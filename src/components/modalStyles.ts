import type { CSSProperties } from "react";

export const overlayStyle: CSSProperties = {
  position: "fixed",
  inset: 0,
  background: "rgba(20,20,50,.85)",
  zIndex: 1000,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 24,
  overflowY: "auto",
};

export const labelStyle: CSSProperties = {
  display: "block",
  fontSize: 12,
  fontWeight: 700,
  color: "#1c1b18",
  marginBottom: 6,
};

export const inputStyle: CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
  padding: "11px 12px",
  border: "1px solid #ddd8cc",
  borderRadius: 8,
  fontSize: 14,
  fontFamily: "Inter,sans-serif",
};

export const cancelButtonStyle: CSSProperties = {
  flex: 1,
  textAlign: "center",
  border: "1.5px solid #282882",
  color: "#282882",
  padding: 13,
  borderRadius: 999,
  fontWeight: 700,
  fontSize: 13.5,
  cursor: "pointer",
};

export const submitButtonStyle: CSSProperties = {
  flex: 1,
  textAlign: "center",
  background: "#282882",
  color: "#FFDD00",
  padding: 13,
  borderRadius: 999,
  fontWeight: 700,
  fontSize: 13.5,
  cursor: "pointer",
};

export const submitButtonDisabledStyle: CSSProperties = {
  ...submitButtonStyle,
  opacity: 0.6,
  cursor: "default",
};

export const errorTextStyle: CSSProperties = {
  fontSize: 13,
  color: "#b3261e",
  fontWeight: 700,
  margin: "14px 0 0",
  textAlign: "center",
};
