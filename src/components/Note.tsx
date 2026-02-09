import { useEffect, useRef, useState } from "react";

import { cn } from "../utils";
import type { Position } from "../types";

type NoteProps = {
  note: string;
  position: Position;
  onUpdate: (content: string) => void;
  onUpdatePosition: (position: Position) => void;
  className?: string;
};

export function Note({
  note,
  position,
  onUpdate,
  onUpdatePosition,
  className,
}: NoteProps) {
  const [isMoving, setIsMoving] = useState(false);
  const noteRef = useRef<HTMLDivElement>(null);
  const startPosition = useRef(position);
  const newPosition = useRef(position);

  // Set initial position of the note when it mounts
  useEffect(() => {
    if (!noteRef.current) return;
    noteRef.current.style.left = `${position.x}px`;
    noteRef.current.style.top = `${position.y}px`;
  }, []);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!noteRef.current) return;
    setIsMoving(true);
    const notePosition = noteRef.current.getBoundingClientRect();
    startPosition.current = {
      x: e.clientX - notePosition.left,
      y: e.clientY - notePosition.top,
    };
  };

  const handleMouseUp = () => {
    setIsMoving(false);
    console.log("Updating position:", newPosition.current);
    onUpdatePosition(newPosition.current);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isMoving || !noteRef.current) return;
    const newX = e.clientX - startPosition.current.x;
    const newY = e.clientY - startPosition.current.y;
    noteRef.current.style.left = `${newX}px`;
    noteRef.current.style.top = `${newY}px`;
    newPosition.current = { x: newX, y: newY };
  };

  return (
    <div
      ref={noteRef}
      className={cn(
        "fixed",
        "p-4 bg-yellow-500 shadow-md text-gray-900 w-52 h-52",
        "hover:shadow-xl hover:cursor-grab hover:scale-105",
        "active:cursor-grabbing",
        className,
      )}
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div
        contentEditable
        suppressContentEditableWarning
        className="p-4 max-w-52 text-md text-wrap focus:outline-none hover:cursor-pointer hover:bg-yellow-400"
        onBlur={(e) => {
          if (!e.currentTarget.textContent) return;
          onUpdate(e.currentTarget.textContent);
        }}
      >
        {note}
      </div>
    </div>
  );
}
