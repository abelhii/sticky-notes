import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { Note, Position } from "../types";
import { NOTE_SIZE } from "../utils";

type NotesState = {
  notes: Note[];
  getNote: (id: string) => Note | undefined;
  addNote: (content?: string, position?: Position, size?: Note["size"]) => void;
  updateNote: (id: string, content: string) => void;
  updateNotePosition: (id: string, position: Position) => void;
  deleteNote: (id: string) => void;
  clearAllNotes: () => void;
};

export const useNotesStore = create<NotesState>()(
  persist(
    (set, get) => ({
      notes: [],
      getNote: (id) => {
        const { notes } = get();
        return notes.find((note) => note.id === id);
      },
      addNote: (content, position, size) =>
        set((state) => ({
          notes: [
            ...state.notes,
            {
              id: Date.now().toString(),
              content: content || "New note",
              size: size || NOTE_SIZE["M"]["px"],
              position: position || { x: 0, y: 0 },
            },
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
