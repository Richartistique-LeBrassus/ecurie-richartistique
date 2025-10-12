"use client";
import { useEffect } from "react";

interface MarkOrdersProps {
  orderIds: string[];
}

export default function MarkOrdersOnLeave({ orderIds }: MarkOrdersProps) {
  useEffect(() => {
    return () => {
      fetch("/api/markViewed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderIds }),
      }).catch((err) => console.error("Failed to mark viewed:", err));
    };
  }, [orderIds]);
  
  return null;
}