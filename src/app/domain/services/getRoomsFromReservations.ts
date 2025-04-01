import { uniqBy } from "lodash";
import { Reservation } from "../models/Reservation";
import { Room } from "../models/Room";

export const getRoomsFromReservations = (
  reservations: Array<Reservation>,
): Array<Room> => {
  return uniqBy(
    reservations.map((reservation) => reservation.room),
    "id",
  );
};
