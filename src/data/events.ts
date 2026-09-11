import type { EventItem } from "../types";

export const EVENTS: EventItem[] = [
  {
    day: "14",
    month: "Sep",
    date: "2026-09-14T00:00:00.000Z",
    title: "Book Fair Kickoff",
    blurb: "Community book fair with free titles for every child.",
    when: "Sat · 10am–2pm · Atlanta, GA",
    capacity: 40,
    registered: 28,
  },
  {
    day: "02",
    month: "Oct",
    date: "2026-10-02T00:00:00.000Z",
    title: "Leadership Workshop",
    blurb: "Hands-on session on confidence and character building.",
    when: "Wed · 4pm–6pm · Community Center",
    capacity: 25,
    registered: 25,
  },
  {
    day: "21",
    month: "Oct",
    date: "2026-10-21T00:00:00.000Z",
    title: "Mentoring Circle",
    blurb: "Small-group mentoring for middle schoolers.",
    when: "Tue · 5pm–6:30pm · Early Leaders HQ",
    capacity: 15,
    registered: 6,
  },
];

export const EVENTS_PAGE_SIZE = 3;
