import { useEffect, useRef } from "react";

import { useReservations } from "app/hooks/useReservations";

import { useRouter } from "next/router";

export default function Rooms() {
  const { rooms, isLoading } = useReservations();

  const router = useRouter();
  const { id } = router.query;

  const hasSelectedRoom = id !== undefined;

  const initialize = (isLoading: boolean) => {
    if (isLoading || hasSelectedRoom || !rooms) {
      return;
    }

    const [firstRoom] = rooms;
    handleGoToRoom(firstRoom.id.toString());
  };
  const initializeRef = useRef(initialize);
  initializeRef.current = initialize;

  useEffect(() => {
    initializeRef.current(isLoading);
  }, [isLoading]);

  function handleGoToRoom(id: string) {
    router.push(`/rooms/${id}`);
  }

  return null;
}
