import "./App.css";
import Card from "./components/Card";

// Spider deal: 54 cards — first 4 piles get 6, the other 6 get 5
const PILE_SIZES = [6, 6, 6, 6, 5, 5, 5, 5, 5, 5];

function App() {
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
        {PILE_SIZES.map((size, p) => (
          <div className="pile" key={p}>
            {Array.from({ length: size }, (_, i) => (
              <Card key={i} imageUrl="/cards/spider_red.png" />
            ))}
          </div>
        ))}
      </section>
    </>
  );
}

export default App;
