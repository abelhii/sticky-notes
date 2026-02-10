import { Note } from "../components/Note";
import { Toolbar } from "../components/Toolbar";
import { useNotesStore } from "../store/notes.store";
import type { NoteSize } from "../types";
import { NOTE_SIZE } from "../utils";

export function Notes() {
  const { notes, addNote, updateNote, updateNotePosition } = useNotesStore();

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
          />
        </div>
      ))}

      <Toolbar />
    </div>
  );
}
