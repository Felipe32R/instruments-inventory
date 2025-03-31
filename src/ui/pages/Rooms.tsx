import { useEffect, useRef } from "react";
import { Calendar } from "../components/Calendar";
import cx from "./Rooms.module.scss";
import { useReservations } from "../../application/hooks/useReservations";
import { useViewState } from "../../application/hooks/useViewState";
import { filterReservationsByRoom } from "../../domain/services/filterReservationsByRoom";

export const Rooms = () => {
  const { reservations, rooms, isLoading } = useReservations();
  const { viewState, goToRooms } = useViewState();

  const hasSelectedRoom = viewState.id !== undefined;

  const initialize = (isLoading: boolean) => {
    if (isLoading || hasSelectedRoom || !rooms) {
      return;
    }

    const [firstRoom] = rooms;
    goToRooms(firstRoom.id.toString());
  };
  const initializeRef = useRef(initialize);
  initializeRef.current = initialize;

  useEffect(() => {
    initializeRef.current(isLoading);
  }, [isLoading]);

  if (!hasSelectedRoom || !rooms || !reservations) {
    return <>Loading...</>;
  }

  const selectedRoomId = viewState.id;
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

  return (
    <>
      <div className={cx.placeSelectContainer}>
        <select
          value={viewState.id}
          onChange={(event) => goToRooms(event.target.value)}
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
};
