import { useEffect, useRef } from "react";

import { useReservations } from "app/hooks/useReservations";

import { useRouter } from "next/router";

export default function Students() {
  const router = useRouter();
  const { id } = router.query;
  const { students, isLoading } = useReservations();

  const initialize = (isLoading: boolean) => {
    if (isLoading || id !== undefined || !students) {
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

  function handleChangeStudent(id: string) {
    router.push(`/students/${id}`);
  }

  return null;
}
