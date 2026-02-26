import { useRef, useState, useCallback, useEffect } from "react";
import { Note } from "../components/Note";
import { Toolbar } from "../components/Toolbar";
import { TrashZone } from "../components/TrashZone";
import { useNotesStore } from "../store/notes.store";
import type { NoteSize } from "../types";
import { NOTE_SIZE } from "../utils";

function intersectRect(r1: DOMRect, other: DOMRect) {
  return (
    r1.x < other.x + other.width &&
    r1.x + r1.width > other.x &&
    r1.y < other.y + other.height &&
    r1.y + r1.height > other.y
  );
}

export function Notes() {
  const { notes, addNote, updateNote, updateNotePosition } = useNotesStore();

  const trashZone = useRef<HTMLDivElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [currentNoteId, setCurrentNoteId] = useState<string | null>(null);
  const { deleteNote, getNote } = useNotesStore();

  const handlePointerUp = useCallback(() => {
    console.log("pointer up", currentNoteId, isIntersecting);
    if (!currentNoteId || !isIntersecting) return;
    deleteNote(currentNoteId);
    setIsIntersecting(false);
  }, [currentNoteId, deleteNote, isIntersecting]);

  const handlePointerMove = useCallback(() => {
    if (!trashZone.current || !currentNoteId) return;
    const note = getNote(currentNoteId);

    if (!note || !note.rect) return;
    const zoneRect = trashZone.current.getBoundingClientRect();

    if (intersectRect(zoneRect, note.rect)) {
      setIsIntersecting(true);
    } else {
      setIsIntersecting(false);
    }

    console.log(intersectRect(zoneRect, note.rect));
  }, [currentNoteId, getNote]);

  useEffect(() => {
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [handlePointerMove, handlePointerUp]);

  return (
    <div
      className="flex flex-col items-center justify-end h-screen w-screen p-16"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        const size = e.dataTransfer.getData("size") as NoteSize;
        const rect = e.currentTarget.getBoundingClientRect();
        const pos = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        };

        addNote(undefined, pos, NOTE_SIZE[size ?? "M"]["px"]);
      }}
    >
      {notes.map((note) => (
        <div key={note.id} className="mb-2">
          <Note
            id={note.id}
            note={note.content}
            size={note.size}
            position={note.position}
            onUpdate={(content) => updateNote(note.id, content)}
            onUpdatePosition={(position) =>
              updateNotePosition(note.id, position)
            }
            onUpdateCurrentNoteId={setCurrentNoteId}
          />
        </div>
      ))}

      <TrashZone ref={trashZone} />

      <Toolbar />
    </div>
  );
}
