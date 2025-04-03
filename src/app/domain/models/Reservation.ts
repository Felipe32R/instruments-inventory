import { Room } from "./Room";
import { Student } from "./Student";

export type Reservation = {
  id: number;
  startDate: Date | string;
  endDate: Date | string;
  room: Room;
  student: Student;
};
