import { useCallback, useEffect, useRef, type PointerEvent } from "react";

import type { Position, Size } from "../types";
import { cn } from "../utils";
import { ResizeHandle } from "./ResizeHandle";
import { useNotesStore } from "../store/notes.store";

type NoteProps = {
  id: string;
  note: string;
  size: Size;
  position: Position;
  onUpdate: (content: string) => void;
  onUpdatePosition: (position: Position) => void;
  onUpdateCurrentNoteId: (id: string | null) => void;
  className?: string;
};

export function Note({
  id,
  note,
  size,
  position,
  onUpdate,
  onUpdatePosition,
  onUpdateCurrentNoteId,
  className,
}: NoteProps) {
  const { updateNoteRect } = useNotesStore();
  const dragging = useRef(false);
  const noteRef = useRef<HTMLDivElement>(null);
  const startPosition = useRef(position);
  const newPosition = useRef(position);

  const handlePointerMove = useCallback((e: globalThis.PointerEvent) => {
    if (!dragging.current || !noteRef.current) return;
    const newXPos = e.clientX - startPosition.current.x;
    const newYPos = e.clientY - startPosition.current.y;

    noteRef.current.style.left = `${newXPos}px`;
    noteRef.current.style.top = `${newYPos}px`;
    newPosition.current = { x: newXPos, y: newYPos };
    updateNoteRect(id, noteRef.current?.getBoundingClientRect());
  }, []);

  const handlePointerUp = useCallback(() => {
    onUpdatePosition(newPosition.current);
    onUpdateCurrentNoteId(null);

    // eslint-disable-next-line react-hooks/immutability
    window.removeEventListener("mouseup", handlePointerUp);
    window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  const handlePointerDown = useCallback((e: PointerEvent<HTMLDivElement>) => {
    if (!noteRef.current) return;
    dragging.current = true;
    const notePosition = noteRef.current.getBoundingClientRect();
    startPosition.current = {
      x: e.clientX - notePosition.left,
      y: e.clientY - notePosition.top,
    };

    onUpdateCurrentNoteId(id);

    window.addEventListener("mouseup", handlePointerUp);
    window.addEventListener("pointermove", handlePointerMove);
  }, []);

  // Set initial position and size of the note when it mounts
  useEffect(() => {
    if (!noteRef.current) return;
    // Position
    noteRef.current.style.left = `${position.x * window.innerWidth}px`;
    noteRef.current.style.top = `${position.y * window.innerHeight}px`;

    // Size
    noteRef.current.style.width = `${size.width}px`;
    noteRef.current.style.height = `${size.height}px`;

    // make sure to remove leftover event listeners on rerender
    return () => {
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

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
      onPointerDown={handlePointerDown}
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
