import {
  useCallback,
  useEffect,
  useRef,
  type PointerEvent,
  type RefObject,
} from "react";
import { CgArrowsExpandLeft } from "react-icons/cg";

import { useNotesStore } from "../store/notes.store";
import type { Size } from "../types";
import { cn } from "../utils";

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

  const dragging = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });
  const startSize = useRef({ width: 0, height: 0 });
  const newNoteSize = useRef(size);

  const handlePointerMove = useCallback((e: globalThis.PointerEvent) => {
    if (!dragging || !noteRef.current) return;
    const deltaX = e.clientX - startPos.current.x;
    const deltaY = e.clientY - startPos.current.y;

    const newSize = {
      width: Math.min(Math.max(160, startSize.current.width + deltaX), 500),
      height: Math.min(Math.max(160, startSize.current.height + deltaY), 500),
    };

    newNoteSize.current = newSize;
    noteRef.current.style.width = `${newSize.width}px`;
    noteRef.current.style.height = `${newSize.height}px`;
  }, []);

  const handlePointerUp = useCallback(() => {
    updateNoteSize(noteId, newNoteSize.current);

    // eslint-disable-next-line react-hooks/immutability
    window.removeEventListener("pointerup", handlePointerUp);
    window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  const handlePointerDown = useCallback((e: PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();

    dragging.current = true;
    startPos.current = { x: e.clientX, y: e.clientY };
    startSize.current = { ...size };

    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointermove", handlePointerMove);
  }, []);

  useEffect(() => {
    // make sure to remove leftover event listeners on rerender
    return () => {
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  return (
    <div
      className={cn(
        "flex items-center justify-center p-2 rounded bg-white/80 cursor-nwse-resize",
        "hover:bg-white",
        className,
      )}
      onPointerDown={handlePointerDown}
    >
      <CgArrowsExpandLeft className="size-5" />
    </div>
  );
}
