import { useNotesStore } from "../store/notes.store";
import { Button } from "./Button";
import { Notepad } from "./Notepad";

export function Toolbar() {
  const { clearAllNotes } = useNotesStore();

  return (
    <div className="flex items-center justify-center gap-8 bg-white p-8 rounded-lg">
      <Notepad size="S" />
      <Notepad size="M" />
      <Notepad size="L" />
      <Button className="bg-red-500" onClick={() => clearAllNotes()}>
        Clear All
      </Button>
    </div>
  );
}
