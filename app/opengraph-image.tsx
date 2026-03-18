import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Nuii IT Consulting";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 60%, #0f172a 100%)",
          fontFamily: "sans-serif",
          padding: "60px",
          position: "relative",
        }}
      >
        {/* Subtle grid dots */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle, #ffffff08 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />

        {/* Amber glow  */}
        <div
          style={{
            position: "absolute",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, #f59e0b18 0%, transparent 70%)",
            top: -100,
            right: -100,
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
            zIndex: 1,
          }}
        >
          <div
            style={{
              width: 96,
              height: 96,
              borderRadius: 20,
              background: "#1e293b",
              border: "2px solid #334155",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 42,
              fontWeight: 900,
              color: "#f59e0b",
              letterSpacing: -2,
            }}
          >
            Nu
          </div>

          {/* Brand name */}
          <div
            style={{
              fontSize: 72,
              fontWeight: 900,
              color: "#ffffff",
              letterSpacing: -3,
              lineHeight: 1,
            }}
          >
            Nuii
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: 26,
              color: "#94a3b8",
              fontWeight: 400,
              letterSpacing: 1,
              textAlign: "center",
            }}
          >
            IT Consulting &amp; Digital Solutions
          </div>

          {/* Amber divider */}
          <div
            style={{
              width: 64,
              height: 4,
              borderRadius: 9999,
              background: "#f59e0b",
              opacity: 0.7,
            }}
          />

          {/* Sub text */}
          <div
            style={{
              fontSize: 18,
              color: "#64748b",
              textAlign: "center",
              maxWidth: 600,
              lineHeight: 1.6,
            }}
          >
            Mobile · Web · Backend · Desktop — untuk komunitas &amp; bisnis Indonesia
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
