"use client";

import { useState } from "react";
import AlertSubscribeModal from "./AlertSubscribeModal";

export default function AlertSubscribeButton({ className, style }: {
  className?: string;
  style?: React.CSSProperties;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)} className={className} style={style}>
        Alert einrichten
      </button>
      <AlertSubscribeModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
