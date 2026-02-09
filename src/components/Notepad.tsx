import { type RefObject } from "react";

import type { NoteSize } from "../types";
import { cn, NOTE_SIZE } from "../utils";

type NotePageProps = {
  size: NoteSize;
  ref?: RefObject<HTMLDivElement | null>;
  className?: string;
  children?: React.ReactNode;
} & React.HtmlHTMLAttributes<HTMLDivElement>;

const NotePage = ({
  ref,
  size,
  className,
  children,
  ...props
}: NotePageProps) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-center text-gray-900 font-bold",
        "absolute bg-yellow-400 p-4 rounded shadow shadow-yellow-600 transition-all",
        "hover:cursor-grab",
        "active:cursor-grabbing",
        NOTE_SIZE[size]["tw"],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

type NotepadProps = {
  size: NoteSize;
};

export function Notepad({ size }: NotepadProps) {
  return (
    <div className={cn("relative w-20 h-20 group", NOTE_SIZE[size]["tw"])}>
      <NotePage size={size} className="top-0 left-0" />
      <NotePage size={size} className="top-1 left-1" />
      <NotePage
        draggable
        size={size}
        className="top-2 left-2 group-hover:top-3 group-hover:left-3"
        onDragStart={(e) => {
          e.dataTransfer.setData("size", size);
        }}
      >
        <span>{size}</span>
      </NotePage>
    </div>
  );
}
