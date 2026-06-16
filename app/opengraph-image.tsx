import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "NUII — Teknologi & R&D Indonesia yang membangun produknya sendiri";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INDEX = [
  { num: "01", name: "SAFAR", tag: "IoT" },
  { num: "02", name: "Sistem Pemantauan", tag: "Web" },
  { num: "04", name: "Wisezone", tag: "Web · Mobile" },
  { num: "06", name: "FIFA Pay", tag: "Mobile" },
  { num: "11", name: "CMS Dashboard", tag: "Web" },
];

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#F1ECE0",
          fontFamily: "sans-serif",
        }}
      >
        {/* ===== LEFT: editorial wordmark ===== */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "72px 64px",
          }}
        >
          {/* eyebrow */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: 22,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#BF6440",
              fontWeight: 600,
            }}
          >
          </div>

          {/* wordmark + tagline */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: 150,
                fontWeight: 800,
                color: "#16302A",
                letterSpacing: 2,
                lineHeight: 1,
              }}
            >
              NUII
            </div>
            <div style={{ display: "flex", width: 80, height: 5, background: "#BF6440", borderRadius: 9999, margin: "30px 0 26px" }} />
            <div
              style={{
                display: "flex",
                fontSize: 33,
                color: "#20413A",
                fontWeight: 600,
                lineHeight: 1.25,
                maxWidth: 560,
              }}
            >
              Kami membangun &amp; menjalankan teknologi kami sendiri.
            </div>
          </div>

          {/* footer */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", fontSize: 24, color: "#BF6440", fontWeight: 600, letterSpacing: 1 }}>nuiiapp.com</div>
            <div style={{ display: "flex", fontSize: 18, color: "#6C685D", letterSpacing: 2, textTransform: "uppercase" }}>
              Integritas · Inovasi · Presisi
            </div>
          </div>
        </div>

        {/* ===== RIGHT: pine "index" panel ===== */}
        <div
          style={{
            width: 420,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            background: "#16302A",
            padding: "64px 52px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 18,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#7E978B",
              marginBottom: 28,
            }}
          >
            Indeks Produk
          </div>
          {INDEX.map((p, i) => (
            <div
              key={p.num}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "18px 0",
                borderTop: i === 0 ? "none" : "1px solid #2E4A41",
              }}
            >
              <div style={{ display: "flex", fontSize: 20, color: "#BF6440", width: 42 }}>{p.num}</div>
              <div style={{ display: "flex", flex: 1, fontSize: 23, color: "#F1ECE0", fontWeight: 600 }}>{p.name}</div>
              <div style={{ display: "flex", fontSize: 16, color: "#7E978B" }}>{p.tag}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
