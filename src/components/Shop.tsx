import type { Book } from "../types";

interface ShopProps {
  books: Book[];
  hasMore: boolean;
  onShowMore: () => void;
  onOpenCover: (src: string) => void;
  onBuyNowClick: () => void;
}

export default function Shop({ books, hasMore, onShowMore, onOpenCover, onBuyNowClick }: ShopProps) {
  return (
    <div
      id="square-shop"
      style={{ background: "#282882", padding: "clamp(48px,7vw,72px) clamp(16px,6vw,40px)" }}
    >
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: ".14em",
            textTransform: "uppercase",
            color: "#FFDD00",
            marginBottom: 14,
          }}
        >
          Shop
        </div>
        <a
          href="#square-shop"
          style={{
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 14,
            margin: "0 0 14px",
          }}
        >
          <h2
            style={{
              fontFamily: "'Baloo 2',sans-serif",
              fontWeight: 700,
              color: "#fff",
              fontSize: 26,
              margin: 0,
            }}
          >
            Bookbag Books
          </h2>
          <img
            src="/images/bookbag.png"
            alt="Bookbag icon"
            style={{ height: 132, objectFit: "contain" }}
          />
        </a>
        <p
          style={{
            fontSize: 14,
            lineHeight: 1.7,
            color: "#dcdaf3",
            maxWidth: 460,
            margin: "0 auto",
          }}
        >
          Every copy sold supports Early Leaders Atl's general fund — powering book
          fairs, mentoring, and programs for kids.
        </p>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))",
          gap: 20,
          maxWidth: 900,
          margin: "0 auto 28px",
        }}
      >
        {books.map((book) => (
          <div
            key={book.cover}
            style={{
              background: "#fff",
              borderRadius: 12,
              padding: 16,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: 10,
            }}
          >
            <div
              role="img"
              aria-label={book.alt}
              onClick={() => onOpenCover(book.cover)}
              style={{
                width: 120,
                height: 150,
                backgroundImage: `url("${book.cover}")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "contain",
                flex: "none",
                cursor: "pointer",
              }}
            />
            <div>
              <h3
                style={{
                  fontFamily: "'Baloo 2',sans-serif",
                  fontWeight: 700,
                  fontSize: 15,
                  color: "#1c1b18",
                  margin: 0,
                }}
              >
                {book.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          textAlign: "center",
          display: "flex",
          flexWrap: "wrap",
          gap: 14,
          justifyContent: "center",
        }}
      >
        {hasMore && (
          <span
            onClick={onShowMore}
            style={{
              display: "inline-block",
              border: "2px solid #FFDD00",
              color: "#FFDD00",
              padding: "15px 34px",
              borderRadius: 999,
              fontWeight: 700,
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            Show More Books
          </span>
        )}
        <a
          href="https://earlyleadersatl.square.site/"
          target="_blank"
          rel="noreferrer"
          onClick={onBuyNowClick}
          style={{
            display: "inline-block",
            background: "#FFDD00",
            color: "#1c1b18",
            padding: "15px 34px",
            borderRadius: 999,
            fontWeight: 700,
            fontSize: 14,
            textDecoration: "none",
          }}
        >
          Buy Now
        </a>
      </div>
    </div>
  );
}
