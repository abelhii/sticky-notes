import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { NoteSize, Size } from "./types";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const NOTE_SIZE: Record<NoteSize, { px: Size; tw: string }> = {
  S: { px: { width: 160, height: 160 }, tw: "w-16 h-16" },
  M: { px: { width: 200, height: 200 }, tw: "w-20 h-20" },
  L: { px: { width: 240, height: 240 }, tw: "w-24 h-24" },
};
