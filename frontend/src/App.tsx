import { useEffect, useState } from "react";
import { getHealth } from "./api";

import "./App.css";

function App() {
  const [health, setHealth] = useState<
    { status: string; timestamp: string } | null
  >(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getHealth()
      .then(setHealth)
      .catch((err) => setError(err.message));
  }, []);

  return (
    <>
      <h1>Lion Clicker</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {health && (
        <div>
          <p>Status: {health.status}</p>
          <p>Last Check: {new Date(health.timestamp).toLocaleString()}</p>
        </div>
      )}
    </>
  );
}

export default App;
