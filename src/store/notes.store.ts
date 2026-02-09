import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { Note, Position } from "../types";

type NotesState = {
  notes: Note[];
  addNote: (content: string) => void;
  updateNote: (id: string, content: string) => void;
  updateNotePosition: (id: string, position: Position) => void;
  deleteNote: (id: string) => void;
  clearAllNotes: () => void;
};

export const useNotesStore = create<NotesState>()(
  persist(
    (set) => ({
      notes: [],
      addNote: (content) =>
        set((state) => ({
          notes: [
            ...state.notes,
            { id: Date.now().toString(), content, position: { x: 0, y: 0 } },
          ],
        })),
      updateNote: (id, content) =>
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id ? { ...note, content } : note,
          ),
        })),
      updateNotePosition: (id, position) =>
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id ? { ...note, position } : note,
          ),
        })),
      deleteNote: (id) =>
        set((state) => ({
          notes: state.notes.filter((note) => note.id !== id),
        })),
      clearAllNotes: () => set({ notes: [] }),
    }),
    { name: "notes-storage" },
  ),
);
