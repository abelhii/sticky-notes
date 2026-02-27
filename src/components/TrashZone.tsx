import { type Ref } from "react";
import { cn } from "../utils";
import { TbTrash } from "react-icons/tb";

type TrashZoneProps = {
  isNoteOver?: boolean;
  className?: string;
  ref?: Ref<HTMLDivElement>;
};

export function TrashZone({ isNoteOver, className, ref }: TrashZoneProps) {
  return (
    <section
      ref={ref}
      className={cn(
        "absolute flex flex-col justify-center items-center z-30 transition-all",
        "text-gray-400 right-8 bottom-8 w-60 h-60 border border-dotted",
        isNoteOver && "bg-red-500/20 border-red-500 text-red-500 h-64 w-64",
        className,
      )}
    >
      <TbTrash className="size-10" />
      {isNoteOver ? <p>Release to Delete!</p> : <p>Drag note to delete</p>}
    </section>
  );
}
