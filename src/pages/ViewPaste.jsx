import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPaste } from "../api/pastes";

export default function ViewPaste() {
  const { id } = useParams();
  const hasFetched = useRef(false);
  const [paste, setPaste] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    fetchPaste(id)
      .then(setPaste)
      .catch((err) => setError(err.message));
  }, [id]);

  const expiresAt = paste?.expires_at
    ? new Date(paste.expires_at)
    : null;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea, #764ba2)",
        padding: "24px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 700,
          background: "#ffffff",
          borderRadius: 10,
          padding: "28px",
          boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: 20 }}>
          📄 View Paste
        </h2>

        {/* Error */}
        {error && (
          <div
            style={{
              background: "#fee2e2",
              border: "1px solid #fecaca",
              color: "#991b1b",
              padding: 12,
              borderRadius: 6,
              marginBottom: 16,
            }}
          >
            {error}
          </div>
        )}

        {/* Loading */}
        {!error && !paste && (
          <p style={{ textAlign: "center" }}>Loading...</p>
        )}

        {/* Content */}
        {paste && (
          <>
            <pre
              style={{
                padding: "16px",
                background: "#0f172a",
                color: "#e5e7eb",
                borderRadius: 8,
                overflowX: "auto",
                fontSize: 14,
                lineHeight: 1.6,
                fontFamily:
                  "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
              }}
            >
              {paste.content}
            </pre>

            {/* Meta Info */}
            <div
              style={{
                marginTop: 18,
                fontSize: 14,
                color: "#374151",
                display: "flex",
                flexDirection: "column",
                gap: 6,
              }}
            >
              {paste.remaining_views !== null && (
                <p>🔁 Remaining views: {paste.remaining_views}</p>
              )}

              {expiresAt && (
                <p>
                  ⏰ Expires at:{" "}
                  <strong>{expiresAt.toLocaleString()}</strong>
                </p>
              )}

              {!expiresAt && paste.remaining_views === null && (
                <p>♾️ No expiry or view limit</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
