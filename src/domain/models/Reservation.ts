import { Room } from "./Room";
import { Student } from "./Student";

export type Reservation = {
  id: number;
  startDate: Date;
  endDate: Date;
  room: Room;
  student: Student;
};
