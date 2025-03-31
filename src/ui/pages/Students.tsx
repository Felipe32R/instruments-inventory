import { useEffect, useRef } from "react";
import { Calendar } from "../components/Calendar";
import cx from "./Students.module.scss";
import { useReservations } from "../../application/hooks/useReservations";
import { useViewState } from "../../application/hooks/useViewState";
import { filterReservationsByStudent } from "../../domain/services/filterReservationsByStudent";

export const Students = () => {
  const { reservations, students, isLoading } = useReservations();

  const { viewState, goToStudents } = useViewState();

  const hasSelectedStudent = viewState.id !== undefined;

  const initialize = (isLoading: boolean) => {
    if (isLoading || hasSelectedStudent || !students) {
      return;
    }

    const [firstStudent] = students;
    goToStudents(firstStudent.id.toString());
  };
  const initializeRef = useRef(initialize);
  initializeRef.current = initialize;

  useEffect(() => {
    initializeRef.current(isLoading);
  }, [isLoading]);

  if (!hasSelectedStudent || !students || !reservations) {
    return <>Loading...</>;
  }

  const selectedStudent = students.find(
    (courseTaker) => courseTaker.id.toString() === viewState.id,
  )!;
  const selectedStudentReservations = filterReservationsByStudent(
    reservations,
    selectedStudent,
  );

  const entries = selectedStudentReservations.map((reservation) => ({
    id: reservation.id.toString(),
    title: `${reservation.room.number} - ${reservation.room.name}`,
    dateStart: reservation.startDate,
    dateEnd: reservation.endDate,
    group: reservation.id.toString(),
  }));

  return (
    <>
      <div className={cx.placeSelectContainer}>
        <select
          value={viewState.id}
          onChange={(event) => goToStudents(event.target.value)}
        >
          {students.map((student) => (
            <option key={student.id} value={student.id}>
              {student.name}
            </option>
          ))}
        </select>
      </div>

      <div className={cx.calendarContainer}>
        <Calendar entries={entries} />
      </div>
    </>
  );
};
