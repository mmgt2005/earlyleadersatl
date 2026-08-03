import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

// Confirmation emails go to the visitor now, not the org — this is the address
// replies land on, not the send destination.
export const CONTACT_EMAIL = "info@earlyleadersatl.org";
export const FROM_EMAIL = "Early Leaders Atl <info@earlyleadersatl.org>";
