import { useState } from "react";
import "./App.css";

const Feeling_presets = [
  "anxious",
  "sad",
  "overwhelmed",
  "stressed",
  "lonely",
  "angry",
  "exhausted",
];

function App() {
  const [name, setName] = useState("");
  const [feeling, setFeeling] = useState("");
  const [affirmation, setAffirmation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePreset = (preset) => {
    setFeeling(preset);
  };

  const handleSubmit = async () => {
    setError("");
    setAffirmation("");

    if (!name.trim() || !feeling.trim()) {
      setError("Please enter your name and how you are feelling.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/affirmation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, feeling }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.detail || "Something went wrong. Please try again.");
        return;
      }

      setAffirmation(data.affirmation);
    } catch (err) {
      console.error(err);
      setError("Could not reach the server. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="container">
      <div className="card">
        <h1>🌿 Mood Architect</h1>
        <p className="subtitle">
          Tell us how you're feeling and we'll craft a personal affirmation just
          for you.
        </p>

        <div className="form-group">
          <label>Your Name</label>
          <input
            type="text"
            placeholder="Enter you name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>How are you feeling?</label>
          <div className="presets">
            {Feeling_presets.map((preset) => (
              <button
                key={preset}
                className={`preset-btn ${feeling === preset ? "active" : ""}`}
                onClick={() => handlePreset(preset)}
              >
                {preset}
              </button>
            ))}
          </div>

          <input
            type="text"
            placeholder="Or type your own feeling..."
            value={feeling}
            onChange={(e) => setFeeling(e.target.value)}
          />
        </div>

        <button
          className="generate-btn"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Crafting your affirmation..." : "Generate Affirmation ✨"}
        </button>

        {error && <div className="error-box">⚠️ {error}</div>}

        {affirmation && (
          <div className="affirmation-box">
            <p>{affirmation}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
