import { useEffect, useRef } from "react";

import cx from "./Students.module.scss";
import { useReservations } from "app/hooks/useReservations";

import { filterReservationsByStudent } from "app/domain/services/filterReservationsByStudent";
import { Calendar } from "app/ui/components/Calendar";
import { useRouter } from "next/router";

export default function Students() {
  const { reservations, students, isLoading } = useReservations();

  const router = useRouter();
  const { id } = router.query;

  if (!router.isReady || !students || !reservations || !id) {
    return <>Loading...</>;
  }

  console.log("id", id);

  const hasSelectedStudent = id !== undefined;

  const initialize = (isLoading: boolean) => {
    if (isLoading || hasSelectedStudent || !students) {
      return;
    }

    const [firstStudent] = students;
    handleChangeStudent(firstStudent.id.toString());
  };
  const initializeRef = useRef(initialize);
  initializeRef.current = initialize;

  useEffect(() => {
    initializeRef.current(isLoading);
  }, [isLoading]);

  console.log("students", students);

  if (!hasSelectedStudent || !students || !reservations) {
    return <>Loading...</>;
  }

  const selectedStudent = students.find(
    (courseTaker) => courseTaker.id.toString() === id,
  )!;

  if (!selectedStudent) {
    return <>Estudante não encontrado...</>;
  }

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

  function handleChangeStudent(id: string) {
    router.push(`/students/${id}`);
  }

  return (
    <>
      <div className={cx.placeSelectContainer}>
        <select
          value={id}
          onChange={(event) => handleChangeStudent(event.target.value)}
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
}
