import { uniqBy } from "lodash";
import { useContext } from "react";
import { ReservationsContext } from "../providers/ReservationsProvider";

export const useReservations = () => {
  const value = useContext(ReservationsContext);

  if (value === undefined) {
    throw new Error("You forgot ReservationsProvider!");
  }

  const { reservations } = value;

  const students = reservations
    ? uniqBy(
        reservations.map((reservation) => reservation.student),
        "id",
      )
    : undefined;
  const rooms = reservations
    ? uniqBy(
        reservations.map((reservation) => reservation.room),
        "id",
      )
    : undefined;

  const isLoading = reservations === undefined;

  return {
    reservations,
    students,
    rooms,
    isLoading,
  };
};
