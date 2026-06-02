// TalkToBook — generated Open Graph image (shown when the link is shared).
// Branded teal card. Uses ImageResponse (next/og); the default font is Latin,
// so the headline stays Latin to render reliably across platforms.
import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "TalkToBook — Arabic-first AI hotel booking assistant";

export default function OpengraphImage() {
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
          gap: 28,
          background: "linear-gradient(135deg, #0D9488 0%, #0F3D38 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 110, fontWeight: 800, letterSpacing: -2 }}>
          TalkToBook
        </div>
        <div style={{ fontSize: 40, opacity: 0.95 }}>🏨</div>
        <div
          style={{
            fontSize: 38,
            maxWidth: 900,
            textAlign: "center",
            opacity: 0.92,
          }}
        >
          Arabic-first AI hotel booking assistant
        </div>
        <div
          style={{
            marginTop: 18,
            fontSize: 26,
            padding: "10px 28px",
            borderRadius: 999,
            background: "rgba(255,255,255,0.16)",
          }}
        >
          Describe your trip · Get the best 3 hotels
        </div>
      </div>
    ),
    { ...size },
  );
}
