import { useEffect, useRef, useState, type MouseEvent } from "react";
import type { Position, Size } from "../types";
import { cn } from "../utils";
import { ResizeHandle } from "./ResizeHandle";

type NoteProps = {
  id: string;
  note: string;
  size: Size;
  position: Position;
  onUpdate: (content: string) => void;
  onUpdatePosition: (position: Position) => void;
  className?: string;
};

export function Note({
  id,
  note,
  size,
  position,
  onUpdate,
  onUpdatePosition,
  className,
}: NoteProps) {
  const [isDragging, setIsDragging] = useState(false);
  const noteRef = useRef<HTMLDivElement>(null);
  const startPosition = useRef(position);
  const newPosition = useRef(position);

  // Set initial position and size of the note when it mounts
  useEffect(() => {
    if (!noteRef.current) return;
    noteRef.current.style.left = `${position.x}px`;
    noteRef.current.style.top = `${position.y}px`;
    noteRef.current.style.width = `${size.width}px`;
    noteRef.current.style.height = `${size.height}px`;
  }, []);

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (!noteRef.current) return;
    setIsDragging(true);
    const notePosition = noteRef.current.getBoundingClientRect();
    startPosition.current = {
      x: e.clientX - notePosition.left,
      y: e.clientY - notePosition.top,
    };
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    onUpdatePosition(newPosition.current);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !noteRef.current) return;
    const newXPos = e.clientX - startPosition.current.x;
    const newYPos = e.clientY - startPosition.current.y;
    noteRef.current.style.left = `${newXPos}px`;
    noteRef.current.style.top = `${newYPos}px`;
    newPosition.current = { x: newXPos, y: newYPos };
  };

  return (
    <div
      ref={noteRef}
      className={cn(
        "absolute",
        "p-4 bg-yellow-400 shadow-md text-gray-900 w-52 h-52",
        "hover:shadow-xl hover:cursor-grab hover:scale-105",
        "active:cursor-grabbing",
        className,
      )}
      onMouseUp={handleMouseUp}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      <div
        contentEditable
        suppressContentEditableWarning
        className="p-4 w-full text-md text-wrap focus:outline-none focus:bg-yellow-300 hover:cursor-pointer hover:bg-yellow-300"
        onBlur={(e) => {
          if (!e.currentTarget.textContent) return;
          onUpdate(e.currentTarget.textContent);
        }}
      >
        {note}
      </div>

      <ResizeHandle
        noteRef={noteRef}
        noteId={id}
        size={size}
        className="absolute bottom-4 right-4"
      />
    </div>
  );
}
