import { useRef } from "react";

import cx from "./Rooms.module.scss";

import { filterReservationsByRoom } from "app/domain/services/filterReservationsByRoom";
import { Calendar } from "app/ui/components/Calendar";
import { useRouter } from "next/router";
import { fetchReservations } from "app/infrastructure/inner/services/fetchReservations";
import { getRoomsFromReservations } from "app/domain/services/getRoomsFromReservations";

export default function Rooms({ rooms, reservations }) {
  const router = useRouter();
  const { id } = router.query;

  const parsedReservations = reservations.map((reservation) => ({
    ...reservation,
    startDate: new Date(reservation.startDate),
    endDate: new Date(reservation.endDate),
  }));

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

  if (!hasSelectedRoom || !rooms || !parsedReservations) {
    return <>Loading...</>;
  }

  const selectedRoomId = id;
  const selectedRoom = rooms.find(
    (room) => room.id.toString() === selectedRoomId,
  )!;
  const selectedRoomReservations = filterReservationsByRoom(
    parsedReservations,
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

export async function getServerSideProps() {
  const reservations = await fetchReservations();
  const rooms = getRoomsFromReservations(reservations);

  return {
    props: {
      rooms,
      reservations,
    },
  };
}
