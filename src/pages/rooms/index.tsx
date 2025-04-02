import { useEffect, useRef } from "react";

import cx from "./Rooms.module.scss";
import { useReservations } from "app/hooks/useReservations";
import { filterReservationsByRoom } from "app/domain/services/filterReservationsByRoom";
import { Calendar } from "app/ui/components/Calendar";
import { useRouter } from "next/router";

export default function Rooms() {
  const { reservations, rooms, isLoading } = useReservations();

  const router = useRouter();
  const { id } = router.query;

  const hasSelectedRoom = id !== undefined;

  console.log("rooms", rooms);

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

  if (!hasSelectedRoom || !rooms || !reservations) {
    return <>Loading...</>;
  }

  const selectedRoomId = id;
  const selectedRoom = rooms.find(
    (room) => room.id.toString() === selectedRoomId,
  )!;
  const selectedRoomReservations = filterReservationsByRoom(
    reservations,
    selectedRoom,
  );

  const calendarEntries = selectedRoomReservations.map((reservation) => ({
    id: reservation.id.toString(),
    title: reservation.student.name,
    dateStart: reservation.startDate,
    dateEnd: reservation.endDate,
    group: reservation.id.toString(),
  }));

  function handleGoToRoom(id: string) {
    router.push(`/rooms/${id}`);
  }

  return (
    <>
      <div className={cx.placeSelectContainer}>
        <select
          value={id}
          onChange={(event) => handleGoToRoom(event.target.value)}
        >
          {rooms.map((room) => (
            <option key={room.id} value={room.id}>
              {room.number} - {room.name}
            </option>
          ))}
        </select>
      </div>

      <div className={cx.calendarContainer}>
        <Calendar entries={calendarEntries} />
      </div>
    </>
  );
}
