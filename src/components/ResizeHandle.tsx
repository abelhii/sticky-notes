import { useRef, useState, type PointerEvent, type RefObject } from "react";
import { CgArrowsExpandLeft } from "react-icons/cg";

import type { Size } from "../types";
import { cn } from "../utils";
import { useNotesStore } from "../store/notes.store";

type ResizeHandle = {
  noteRef: RefObject<HTMLDivElement | null>;
  noteId: string;
  size: Size;
  className?: string;
};

export function ResizeHandle({
  noteRef,
  noteId,
  size,
  className,
}: ResizeHandle) {
  const { updateNoteSize } = useNotesStore();

  const [isDragging, setIsDragging] = useState(false);
  const [noteSize, setNoteSize] = useState(size);
  const startPos = useRef({ x: 0, y: 0 });
  const startSize = useRef({ width: 0, height: 0 });

  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    e.preventDefault();
    startPos.current = { x: e.clientX, y: e.clientY };
    startSize.current = { ...size };
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    updateNoteSize(noteId, noteSize);
  };

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !noteRef.current) return;
    const deltaX = e.clientX - startPos.current.x;
    const deltaY = e.clientY - startPos.current.y;

    const newSize = {
      width: Math.min(Math.max(160, startSize.current.width + deltaX), 500),
      height: Math.min(Math.max(160, startSize.current.height + deltaY), 500),
    };

    setNoteSize(newSize);
    noteRef.current.style.width = `${newSize.width}px`;
    noteRef.current.style.height = `${newSize.height}px`;
  };

  return (
    <div
      className={cn(
        "flex items-center justify-center p-2 rounded bg-white/80",
        "hover:bg-white hover:cursor-pointer",
        className,
      )}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onPointerMove={handlePointerMove}
    >
      <CgArrowsExpandLeft className="size-5" />
    </div>
  );
}
