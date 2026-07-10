import { useEffect, useState } from "react";
import { getHealthStatus } from "./services/api";

function App() {
  const [status, setStatus] = useState("Connecting...");

  useEffect(() => {
    getHealthStatus()
      .then((data) => {
        setStatus(data.status);
      })
      .catch(() => {
        setStatus("Connection failed");
      });
  }, []);

  return (
    <main>
      <h1>Nuvio</h1>
      <p>API Status: {status}</p>
    </main>
  );
}

export default App;