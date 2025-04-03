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
  selectedRoomId: string;
};

export default function Rooms({
  rooms,
  reservations,
  selectedRoomId,
}: RoomsProps) {
  const router = useRouter();

  const parsedReservations = reservations.map((reservation) => ({
    ...reservation,
    startDate: new Date(reservation.startDate),
    endDate: new Date(reservation.endDate),
  }));

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
          value={selectedRoomId}
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

export async function getStaticProps({ params }: { params: { id: string } }) {
  const reservations = await fetchReservations();
  const rooms = getRoomsFromReservations(reservations);

  const revalidationTimeInMs = 5000;

  return {
    props: {
      rooms,
      reservations,
      selectedRoomId: params.id,
    },

    revalidate: revalidationTimeInMs,
  };
}

export async function getStaticPaths() {
  const reservations = await fetchReservations();
  const rooms = getRoomsFromReservations(reservations);

  const paths = rooms.map((room) => ({
    params: { id: room.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
}
