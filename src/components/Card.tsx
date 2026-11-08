import { useRef, useState } from "react";

type CardProps = {
  imageUrl: string;
  isDraggable?: boolean;
};

function Card({ imageUrl, isDraggable = true }: CardProps) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const offset = useRef({ x: 0, y: 0 });

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (!isDraggable) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    offset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
    setDragging(true);
  }

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!isDraggable) return;
    if (!dragging) return;
    setPos({
      x: e.clientX - offset.current.x,
      y: e.clientY - offset.current.y,
    });
  }

  function onPointerUp(e: React.PointerEvent<HTMLDivElement>) {
    if (!dragging) return;
    e.currentTarget.releasePointerCapture(e.pointerId);
    setDragging(false);
    // later: check the drop target here and snap back if the move is invalid
  }

  return (
    <div
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      style={{
        transform: `translate(${pos.x}px, ${pos.y}px)`,
        cursor: !isDraggable ? "default" : dragging ? "grabbing" : "grab",
        touchAction: isDraggable ? "none" : "auto",
        userSelect: "none",
        position: "relative",
        zIndex: dragging ? 1000 : "auto",
        width: "var(--card-w)",
        aspectRatio: "146 / 198",
      }}
    >
      <img
        src={imageUrl}
        alt="karta"
        draggable={false}
        style={{ width: "100%", height: "auto", display: "block" }}
      />
    </div>
  );
}

export default Card;
