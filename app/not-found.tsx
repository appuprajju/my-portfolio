import Link from "next/link";

export const metadata = {
  title: "404: Not Found — YOUR.STUDIO",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#050506",
        color: "#f5f5f7",
        padding: "20px",
        textAlign: "center",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          padding: "6px 14px",
          borderRadius: "999px",
          background: "rgba(239, 68, 68, 0.12)",
          border: "1px solid rgba(239, 68, 68, 0.3)",
          color: "#f87171",
          fontSize: "12px",
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          marginBottom: "20px",
        }}
      >
        <span>▣</span> 404 Error · Node Disconnected
      </div>

      <h1
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "clamp(64px, 12vw, 120px)",
          fontWeight: 800,
          margin: 0,
          letterSpacing: "-0.05em",
          background: "linear-gradient(135deg, #ef4444 0%, #f97316 50%, #8ee7ff 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        404
      </h1>

      <p
        style={{
          color: "#9b9ba3",
          fontSize: "18px",
          maxWidth: "460px",
          lineHeight: 1.6,
          margin: "12px 0 32px 0",
        }}
      >
        The digital coordinate or interface node you are looking for does not exist or has been relocated.
      </p>

      <Link
        href="/"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          padding: "12px 28px",
          borderRadius: "999px",
          background: "linear-gradient(135deg, #8ee7ff 0%, #a98cff 100%)",
          color: "#050506",
          fontWeight: 600,
          textDecoration: "none",
          fontSize: "14px",
        }}
      >
        ← Return to Portfolio
      </Link>
    </div>
  );
}
