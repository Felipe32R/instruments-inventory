import { Reservation } from "../models/Reservation";
import { Student } from "../models/Student";

export const filterReservationsByStudent = (
  reservations: Array<Reservation>,
  student: Student,
): Array<Reservation> => {
  return reservations.filter(
    (reservation) => reservation.student.id === student.id,
  );
};
