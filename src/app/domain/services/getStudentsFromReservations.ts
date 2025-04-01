import { uniqBy } from "lodash";
import { Reservation } from "../models/Reservation";
import { Student } from "../models/Student";

export const getStudentsFromReservations = (
  reservations: Array<Reservation>,
): Array<Student> => {
  return uniqBy(
    reservations.map((reservation) => reservation.student),
    "id",
  );
};
