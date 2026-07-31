import { useState } from "react";
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
import { BOOKS, BOOKS_PAGE_SIZE } from "./data/books";
import { EVENTS, EVENTS_PAGE_SIZE } from "./data/events";
import type { InterestForm, RsvpForm } from "./types";

const EMPTY_INTEREST_FORM: InterestForm = {
  name: "",
  email: "",
  interest: "Volunteering",
  message: "",
};

const EMPTY_RSVP_FORM: RsvpForm = { name: "", email: "", guests: "1" };

function App() {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [visibleBookCount, setVisibleBookCount] = useState(BOOKS_PAGE_SIZE);
  const [visibleEventCount, setVisibleEventCount] = useState(EVENTS_PAGE_SIZE);

  const [interestFormOpen, setInterestFormOpen] = useState(false);
  const [interestForm, setInterestForm] = useState<InterestForm>(EMPTY_INTEREST_FORM);
  const [interestSubmitted, setInterestSubmitted] = useState(false);

  const [rsvpEventIndex, setRsvpEventIndex] = useState<number | null>(null);
  const [rsvpForm, setRsvpForm] = useState<RsvpForm>(EMPTY_RSVP_FORM);
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);

  const openInterestForm = () => {
    setInterestFormOpen(true);
    setInterestSubmitted(false);
    setInterestForm(EMPTY_INTEREST_FORM);
  };

  const handleRsvp = (index: number) => {
    setRsvpEventIndex(index);
    setRsvpForm(EMPTY_RSVP_FORM);
    setRsvpSubmitted(false);
  };

  return (
    <div style={{ color: "#1c1b18" }}>
      <Header />
      <Hero />
      <ExploreNav onOpenInterestForm={openInterestForm} />
      <Shop
        books={BOOKS.slice(0, visibleBookCount)}
        hasMore={visibleBookCount < BOOKS.length}
        onShowMore={() => setVisibleBookCount((n) => n + BOOKS_PAGE_SIZE)}
        onOpenCover={setLightboxSrc}
      />
      <Programs />
      <Events
        events={EVENTS.slice(0, visibleEventCount)}
        hasMore={visibleEventCount < EVENTS.length}
        onShowMore={() => setVisibleEventCount((n) => n + EVENTS_PAGE_SIZE)}
        onRsvp={handleRsvp}
      />
      <Mascots />
      <Board />
      <DonateCta />
      <Footer />

      <Lightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />

      <GetInvolvedModal
        open={interestFormOpen}
        form={interestForm}
        submitted={interestSubmitted}
        onClose={() => setInterestFormOpen(false)}
        onChange={(field, value) =>
          setInterestForm((s) => ({ ...s, [field]: value }))
        }
        onSubmit={() => setInterestSubmitted(true)}
      />

      <RsvpModal
        eventTitle={rsvpEventIndex !== null ? EVENTS[rsvpEventIndex].title : null}
        form={rsvpForm}
        submitted={rsvpSubmitted}
        onClose={() => setRsvpEventIndex(null)}
        onChange={(field, value) => setRsvpForm((s) => ({ ...s, [field]: value }))}
        onSubmit={() => setRsvpSubmitted(true)}
      />
    </div>
  );
}

export default App;
