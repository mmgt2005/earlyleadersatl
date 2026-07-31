export interface Book {
  cover: string;
  alt: string;
  title: string;
}

export interface EventItem {
  day: string;
  month: string;
  title: string;
  blurb: string;
  when: string;
  capacity: number;
  registered: number;
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
