import { useRef } from "react";

import cx from "./Rooms.module.scss";

import { filterReservationsByRoom } from "app/domain/services/filterReservationsByRoom";
import { Calendar } from "app/ui/components/Calendar";
import { useRouter } from "next/router";
import { fetchReservations } from "app/infrastructure/inner/services/fetchReservations";
import { getRoomsFromReservations } from "app/domain/services/getRoomsFromReservations";
import { Room } from "app/domain/models/Room";
import { Reservation } from "app/domain/models/Reservation";

type RoomsProps = {
  rooms: Room[];
  reservations: Reservation[];
};

export default function Rooms({ rooms, reservations }: RoomsProps) {
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
    dateStart: new Date(reservation.startDate),
    dateEnd: new Date(reservation.endDate),
    group: reservation.id.toString(),
  }));

  function handleGoToRoom(id: string) {
    router.push(`/rooms/${id}`);
  }

  return (
    <>
      <div
        className={cx.placeSelectContainer}
        data-testid="room-select-container"
      >
        <select
          data-testid="room-select"
          value={id}
          onChange={(event) => handleGoToRoom(event.target.value)}
        >
          {rooms.map((room) => (
            <option
              key={room.id}
              value={room.id}
              data-testid={`room-option-${room.id}`}
            >
              {room.number} - {room.name}
            </option>
          ))}
        </select>
      </div>

      <div className={cx.calendarContainer} data-testid="room-calendar">
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
