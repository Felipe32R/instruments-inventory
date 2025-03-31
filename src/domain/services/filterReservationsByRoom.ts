import { Reservation } from "../models/Reservation";
import { Room } from "../models/Room";

export const filterReservationsByRoom = (
  reservations: Array<Reservation>,
  room: Room,
): Array<Reservation> => {
  return reservations.filter((reservation) => reservation.room.id === room.id);
};
