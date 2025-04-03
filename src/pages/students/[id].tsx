import { useRef } from "react";
import cx from "./Students.module.scss";
import { filterReservationsByStudent } from "app/domain/services/filterReservationsByStudent";
import { Calendar } from "app/ui/components/Calendar";
import { useRouter } from "next/router";
import { fetchReservations } from "app/infrastructure/inner/services/fetchReservations";
import { getStudentsFromReservations } from "app/domain/services/getStudentsFromReservations";
import { Reservation } from "app/domain/models/Reservation";
import { Student } from "app/domain/models/Student";

type StudentsProps = {
  students: Student[];
  reservations: Reservation[];
  selectedStudentId: string;
};

export default function Students({
  students,
  reservations,
  selectedStudentId,
}: StudentsProps) {
  const router = useRouter();

  const parsedReservations = reservations.map((reservation) => ({
    ...reservation,
    startDate: new Date(reservation.startDate),
    endDate: new Date(reservation.endDate),
  }));

  const initialize = (isLoading: boolean) => {
    if (isLoading || selectedStudentId || !students) {
      return;
    }

    const [firstStudent] = students;
    handleChangeStudent(firstStudent.id.toString());
  };

  const initializeRef = useRef(initialize);
  initializeRef.current = initialize;

  const selectedStudent = students.find(
    (courseTaker) => courseTaker.id.toString() === selectedStudentId,
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
    dateStart: new Date(reservation.startDate),
    dateEnd: new Date(reservation.endDate),
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
          value={selectedStudentId}
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

export async function getStaticProps({ params }: { params: { id: string } }) {
  const reservations = await fetchReservations();
  const students = getStudentsFromReservations(reservations);

  return {
    props: {
      students,
      reservations,
      selectedStudentId: params.id,
    },
    // Re-generate the page at most once per hour
    revalidate: 3600,
  };
}

export async function getStaticPaths() {
  const reservations = await fetchReservations();
  const students = getStudentsFromReservations(reservations);

  const paths = students.map((student) => ({
    params: { id: student.id.toString() },
  }));

  return {
    paths,
    // Fallback: false means other routes should 404
    fallback: false,
  };
}
