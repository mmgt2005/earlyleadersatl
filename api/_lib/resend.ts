import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

export const TO_EMAIL = "earlyleaderatl@gmail.com";
export const FROM_EMAIL = "Early Leaders Atl <onboarding@resend.dev>";
