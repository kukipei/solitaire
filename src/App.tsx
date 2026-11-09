import { useRef, useState } from "react";
import "./App.css";
import Card from "./components/Card";

// Spider deal: 54 cards — first 4 piles get 6, the other 6 get 5
const PILE_SIZES = [6, 6, 6, 6, 5, 5, 5, 5, 5, 5];

type CardData = { id: string; imageUrl: string };

function dealPiles(): CardData[][] {
  return PILE_SIZES.map((size, p) =>
    Array.from({ length: size }, (_, i) => ({
      id: `${p}-${i}`,
      imageUrl: "/cards/spider_red.png",
    })),
  );
}

function App() {
  const [piles, setPiles] = useState<CardData[][]>(dealPiles);
  const pileRefs = useRef<(HTMLDivElement | null)[]>([]);

  function handleDrop(cardId: string, clientX: number) {
    // nearest pile = smallest horizontal distance to the pile's center
    let target = -1;
    let best = Infinity;
    pileRefs.current.forEach((el, i) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      const d = Math.abs(clientX - (r.left + r.width / 2));
      if (d < best) {
        best = d;
        target = i;
      }
    });
    if (target === -1) return;

    setPiles((prev) => {
      const from = prev.findIndex((p) => p.some((c) => c.id === cardId));
      if (from === -1 || from === target) return prev; // same pile → snaps back
      const card = prev[from].find((c) => c.id === cardId)!;
      return prev.map((p, i) =>
        i === from
          ? p.filter((c) => c.id !== cardId)
          : i === target
            ? [...p, card]
            : p,
      );
    });
  }

  return (
    <>
      <section className="deck">
        <div className="deal-cards">
          <Card imageUrl="/cards/spider_red.png" />
          <Card imageUrl="/cards/spider_red.png" />
          <Card imageUrl="/cards/spider_red.png" />
          <Card imageUrl="/cards/spider_red.png" />
        </div>
        <div className="result">
          <Card imageUrl="/cards/spider_red.png" />
          <Card imageUrl="/cards/spider_red.png" />
          <Card imageUrl="/cards/spider_red.png" />
          <Card imageUrl="/cards/spider_red.png" />
          <Card imageUrl="/cards/spider_red.png" />
          <Card imageUrl="/cards/spider_red.png" />
          <Card imageUrl="/cards/spider_red.png" />
          <Card imageUrl="/cards/spider_red.png" />
        </div>
      </section>
      <section className="playing-area">
        {piles.map((pile, p) => (
          <div
            className="pile"
            key={p}
            ref={(el) => {
              pileRefs.current[p] = el;
            }}
          >
            {pile.map((card) => (
              <Card
                key={card.id}
                imageUrl={card.imageUrl}
                onDrop={(x) => handleDrop(card.id, x)}
              />
            ))}
          </div>
        ))}
      </section>
    </>
  );
}

export default App;
