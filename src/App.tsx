import { useEffect, useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ExploreNav from "./components/ExploreNav";
import Shop from "./components/Shop";
import Programs from "./components/Programs";
import Events from "./components/Events";
import Mascots from "./components/Mascots";
import Board from "./components/Board";
import DonateCta from "./components/DonateCta";
import Footer from "./components/Footer";
import Lightbox from "./components/Lightbox";
import GetInvolvedModal from "./components/GetInvolvedModal";
import RsvpModal from "./components/RsvpModal";
import RedirectNoticeModal, { type RedirectNotice } from "./components/RedirectNoticeModal";
import { BOOKS as FALLBACK_BOOKS, BOOKS_PAGE_SIZE } from "./data/books";
import { EVENTS as FALLBACK_EVENTS, EVENTS_PAGE_SIZE } from "./data/events";
import type { Book, EventItem, InterestForm, RsvpForm } from "./types";

const EMPTY_INTEREST_FORM: InterestForm = {
  name: "",
  email: "",
  interest: "Volunteering",
  message: "",
};

const EMPTY_RSVP_FORM: RsvpForm = { name: "", email: "", guests: "1" };

const DONATE_NOTICE: RedirectNotice = {
  title: "Thanks for Your Support!",
  message:
    "We opened the donation page in a new tab. Feel free to close it and come back here anytime.",
};

const CHECKOUT_NOTICE: RedirectNotice = {
  title: "Thanks for Shopping With Us!",
  message:
    "We opened Bookbag Books checkout in a new tab. Feel free to close it and come back here anytime.",
};

function App() {
  const [books, setBooks] = useState<Book[]>(FALLBACK_BOOKS);
  const [events, setEvents] = useState<EventItem[]>(FALLBACK_EVENTS);

  useEffect(() => {
    fetch("/api/books")
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error("bad status"))))
      .then((data: Book[]) => {
        if (Array.isArray(data) && data.length > 0) setBooks(data);
      })
      .catch(() => {
        // keep the bundled fallback catalog (e.g. sheet unreachable, or /api not running locally)
      });

    fetch("/api/events")
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error("bad status"))))
      .then((data: EventItem[]) => {
        if (Array.isArray(data) && data.length > 0) setEvents(data);
      })
      .catch(() => {
        // keep the bundled fallback events
      });
  }, []);

  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [visibleBookCount, setVisibleBookCount] = useState(BOOKS_PAGE_SIZE);
  const [visibleEventCount, setVisibleEventCount] = useState(EVENTS_PAGE_SIZE);

  const [redirectNotice, setRedirectNotice] = useState<RedirectNotice | null>(null);

  const [interestFormOpen, setInterestFormOpen] = useState(false);
  const [interestForm, setInterestForm] = useState<InterestForm>(EMPTY_INTEREST_FORM);
  const [interestSubmitting, setInterestSubmitting] = useState(false);
  const [interestSubmitted, setInterestSubmitted] = useState(false);
  const [interestError, setInterestError] = useState<string | null>(null);

  const [rsvpEventIndex, setRsvpEventIndex] = useState<number | null>(null);
  const [rsvpForm, setRsvpForm] = useState<RsvpForm>(EMPTY_RSVP_FORM);
  const [rsvpSubmitting, setRsvpSubmitting] = useState(false);
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  const [rsvpError, setRsvpError] = useState<string | null>(null);

  const openInterestForm = () => {
    setInterestFormOpen(true);
    setInterestSubmitted(false);
    setInterestError(null);
    setInterestForm(EMPTY_INTEREST_FORM);
  };

  const handleRsvp = (index: number) => {
    setRsvpEventIndex(index);
    setRsvpForm(EMPTY_RSVP_FORM);
    setRsvpSubmitted(false);
    setRsvpError(null);
  };

  const submitInterestForm = async () => {
    setInterestSubmitting(true);
    setInterestError(null);
    try {
      const res = await fetch("/api/get-involved", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(interestForm),
      });
      if (!res.ok) throw new Error("Request failed");
      setInterestSubmitted(true);
    } catch {
      setInterestError("Something went wrong — please try again.");
    } finally {
      setInterestSubmitting(false);
    }
  };

  const rsvpEvent = rsvpEventIndex !== null ? (events[rsvpEventIndex] ?? null) : null;

  const submitRsvpForm = async () => {
    if (!rsvpEvent) return;
    setRsvpSubmitting(true);
    setRsvpError(null);
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...rsvpForm, eventTitle: rsvpEvent.title }),
      });
      if (!res.ok) throw new Error("Request failed");
      setRsvpSubmitted(true);
    } catch {
      setRsvpError("Something went wrong — please try again.");
    } finally {
      setRsvpSubmitting(false);
    }
  };

  return (
    <div style={{ color: "#1c1b18" }}>
      <Header />
      <Hero onDonateClick={() => setRedirectNotice(DONATE_NOTICE)} />
      <ExploreNav onOpenInterestForm={openInterestForm} />
      <Shop
        books={books.slice(0, visibleBookCount)}
        hasMore={visibleBookCount < books.length}
        onShowMore={() => setVisibleBookCount((n) => n + BOOKS_PAGE_SIZE)}
        onOpenCover={setLightboxSrc}
        onBuyNowClick={() => setRedirectNotice(CHECKOUT_NOTICE)}
      />
      <Programs />
      <Events
        events={events.slice(0, visibleEventCount)}
        hasMore={visibleEventCount < events.length}
        onShowMore={() => setVisibleEventCount((n) => n + EVENTS_PAGE_SIZE)}
        onRsvp={handleRsvp}
      />
      <Mascots />
      <Board />
      <DonateCta onDonateClick={() => setRedirectNotice(DONATE_NOTICE)} />
      <Footer />

      <RedirectNoticeModal notice={redirectNotice} onClose={() => setRedirectNotice(null)} />

      <Lightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />

      <GetInvolvedModal
        open={interestFormOpen}
        form={interestForm}
        submitting={interestSubmitting}
        submitted={interestSubmitted}
        error={interestError}
        onClose={() => setInterestFormOpen(false)}
        onChange={(field, value) =>
          setInterestForm((s) => ({ ...s, [field]: value }))
        }
        onSubmit={submitInterestForm}
      />

      <RsvpModal
        eventTitle={rsvpEvent?.title ?? null}
        form={rsvpForm}
        submitting={rsvpSubmitting}
        submitted={rsvpSubmitted}
        error={rsvpError}
        onClose={() => setRsvpEventIndex(null)}
        onChange={(field, value) => setRsvpForm((s) => ({ ...s, [field]: value }))}
        onSubmit={submitRsvpForm}
      />
    </div>
  );
}

export default App;
