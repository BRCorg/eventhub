import { useEffect, useState } from "react";

type Health = { status: string; services: Record<string, string> };

export default function App() {
  const [health, setHealth] = useState<Health | null>(null);

  useEffect(() => {
    fetch("/api/healthz")
      .then((res) => res.json())
      .then(setHealth)
      .catch(() => setHealth({ status: "API injoignable", services: {} }));
  }, []);

  return (
    <main style={{ fontFamily: "sans-serif", padding: "2rem" }}>
      <h1>EventHub</h1>
      <p>Statut de l&apos;API : {health?.status ?? "chargement..."}</p>
      <ul>
        {Object.entries(health?.services ?? {}).map(([name, state]) => (
          <li key={name}>
            {name} : {state}
          </li>
        ))}
      </ul>
    </main>
  );
}
