import { Button } from "../components/button";
import { Note } from "../components/Note";
import { useNotesStore } from "../store/notes.store";

export function Notes() {
  const { notes, addNote, updateNote, updateNotePosition, clearAllNotes } =
    useNotesStore();

  return (
    <div className="flex justify-center items-center h-screen w-screen bg-gray-100 p-7">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-2xl font-bold mb-4">Sticky Notes</h1>
        <Button onClick={() => addNote("new note")}>Add Note</Button>
        <Button onClick={() => clearAllNotes()}>Clear All Notes</Button>
      </div>

      {notes.map((note) => (
        <div key={note.id} className="mb-2">
          <Note
            note={note.content}
            position={note.position}
            onUpdate={(content) => updateNote(note.id, content)}
            onUpdatePosition={(position) =>
              updateNotePosition(note.id, position)
            }
          />
        </div>
      ))}
    </div>
  );
}
