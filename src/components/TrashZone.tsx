import { type Ref } from "react";


type TrashZoneProps = {
  ref?: Ref<HTMLDivElement>;
}

export function TrashZone({ref}: TrashZoneProps) {
  return <div ref={ref} className="w-60 h-60 border z-30"></div>;
}
