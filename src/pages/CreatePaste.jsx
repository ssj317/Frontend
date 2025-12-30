import { useState } from "react";
import { createPaste } from "../api/pastes";

export default function CreatePaste() {
  const [content, setContent] = useState("");
  const [ttl, setTtl] = useState("");
  const [views, setViews] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);

    try {
      const payload = {
        content,
        ...(ttl && { ttl_seconds: Number(ttl) }),
        ...(views && { max_views: Number(views) }),
      };

      const res = await createPaste(payload);
      setResult(res.url);
      setContent("");
      setTtl("");
      setViews("");
    } catch (err) {
      setError(err.message);
    }
  };

  const formGroup = {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    marginBottom: "14px",
  };

  const inputStyle = {
    width: "100%",
    padding: "9px 10px",
    borderRadius: 4,
    border: "1px solid #ccc",
    fontSize: 14,
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea, #764ba2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 600,
          background: "#ffffff",
          padding: "28px",
          borderRadius: "10px",
          boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: 20 }}>
          📝 Create a Paste
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Content */}
          <div style={formGroup}>
            <label style={{ fontWeight: 600 }}>Content</label>
            <textarea
              rows={10}
              placeholder="Enter your text here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              style={{
                ...inputStyle,
                resize: "vertical",
                fontFamily: "monospace",
              }}
            />
          </div>

          {/* TTL */}
          <div style={formGroup}>
            <label style={{ fontWeight: 600 }}>TTL (seconds)</label>
            <input
              type="number"
              placeholder="Optional"
              value={ttl}
              onChange={(e) => setTtl(e.target.value)}
              style={inputStyle}
            />
          </div>

          {/* Views */}
          <div style={formGroup}>
            <label style={{ fontWeight: 600 }}>Max Views</label>
            <input
              type="number"
              placeholder="Optional"
              value={views}
              onChange={(e) => setViews(e.target.value)}
              style={inputStyle}
            />
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              marginTop: 10,
              padding: "11px",
              background: "#667eea",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              fontSize: 16,
              cursor: "pointer",
            }}
          >
            Create Paste
          </button>
        </form>

        {result && (
          <div
            style={{
              marginTop: 18,
              padding: 12,
              background: "#f0f9ff",
              border: "1px solid #bae6fd",
              borderRadius: 6,
            }}
          >
            <strong>Paste URL:</strong>{" "}
            <a href={result} target="_blank" rel="noreferrer">
              {result}
            </a>
          </div>
        )}

        {error && (
          <div
            style={{
              marginTop: 18,
              padding: 12,
              background: "#fee2e2",
              border: "1px solid #fecaca",
              borderRadius: 6,
              color: "#991b1b",
            }}
          >
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
