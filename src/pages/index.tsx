"use client";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    router.push(`/rooms/1`);
  }, [router]);

  return null;
}
