
export type Position = { x: number; y: number };
export type Size = { width: number; height: number };
export type NoteSize = "S" | "M" | "L";

export type Note = {
  id: string;
  content: string;
  size: Size;
  position: Position;
  rect?: DOMRect;
};
