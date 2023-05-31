"use client"

import { useEffect, useState } from "react";

export default function Watcher() {
  const [lastNumber, setLastNumber] = useState(0);
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }));

  useEffect(() => {
    fetchLastNumber().then((number) => setLastNumber(number));

    setInterval(() => {
      fetchLastNumber().then((number) => setLastNumber(number));
      const renderedAt = new Date().toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setLastUpdated(renderedAt);
    }, 1000)
  }, []);

  async function fetchLastNumber(): Promise<number> {
    const response = await fetch("http://localhost:8000");
    const data = await response.json();
    return data.number;
  }

  return (
    <div className="flex flex-col gap-1 items-center">
      <span>Último número chamado</span>
      <span className="flex font-bold text-2xl">{lastNumber}</span>
      <span className="font-extralight">Atualizado às {lastUpdated}</span>
    </div>
  )
}