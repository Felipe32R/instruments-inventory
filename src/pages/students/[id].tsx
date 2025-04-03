import { useRef } from "react";
import cx from "./Students.module.scss";
import { filterReservationsByStudent } from "app/domain/services/filterReservationsByStudent";
import { Calendar } from "app/ui/components/Calendar";
import { useRouter } from "next/router";
import { fetchReservations } from "app/infrastructure/inner/services/fetchReservations";
import { getStudentsFromReservations } from "app/domain/services/getStudentsFromReservations";

export default function Students({ students, reservations }) {
  const router = useRouter();
  const { id } = router.query;

  const parsedReservations = reservations.map((reservation) => ({
    ...reservation,
    startDate: new Date(reservation.startDate),
    endDate: new Date(reservation.endDate),
  }));

  const initialize = (isLoading: boolean) => {
    if (isLoading || id !== undefined || !students) {
      return;
    }

    const [firstStudent] = students;
    handleChangeStudent(firstStudent.id.toString());
  };

  const initializeRef = useRef(initialize);
  initializeRef.current = initialize;

  const selectedStudent = students.find(
    (courseTaker) => courseTaker.id.toString() === id,
  )!;

  if (!selectedStudent) {
    return <>Student not found...</>;
  }

  const selectedStudentReservations = filterReservationsByStudent(
    parsedReservations,
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
      <div
        className={cx.placeSelectContainer}
        data-testid="student-select-container"
      >
        <select
          data-testid="student-select"
          value={id}
          onChange={(event) => handleChangeStudent(event.target.value)}
        >
          {students.map((student) => (
            <option
              key={student.id}
              value={student.id}
              data-testid={`student-option-${student.id}`}
            >
              {student.name}
            </option>
          ))}
        </select>
      </div>

      <div className={cx.calendarContainer} data-testid="student-calendar">
        <Calendar entries={entries} />
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const reservations = await fetchReservations();
  const students = getStudentsFromReservations(reservations);

  return {
    props: {
      students,
      reservations,
    },
  };
}
