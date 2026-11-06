export interface Book {
  cover: string;
  alt: string;
  title: string;
  description?: string;
}

export interface EventItem {
  day: string;
  month: string;
  title: string;
  blurb: string;
  when: string;
  capacity: number;
  registered: number;
  date: string | null;
}

export interface InterestForm {
  name: string;
  email: string;
  interest: string;
  message: string;
}

export interface RsvpForm {
  name: string;
  email: string;
  guests: string;
}

export interface ProgramVideoConfig {
  heading: string;
  description: string;
  showDonateButton: boolean;
  showShopButton: boolean;
  showNewsletterButton: boolean;
}
