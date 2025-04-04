"use client";
import { useEffect, useState } from "react";
import cx from "./Header.module.scss";
import Link from "next/link";
import { fetchReservations } from "app/infrastructure/inner/services/fetchReservations";
import { getRoomsFromReservations } from "app/domain/services/getRoomsFromReservations";
import { getStudentsFromReservations } from "app/domain/services/getStudentsFromReservations";

export const Header = () => {
  const [firstRoomId, setFirstRoomId] = useState<string | null>(null);
  const [firstStudentId, setFirstStudentId] = useState<string | null>(null);

  useEffect(() => {
    async function loadFirstRoom() {
      const reservations = await fetchReservations();
      const rooms = getRoomsFromReservations(reservations);
      const students = getStudentsFromReservations(reservations);

      setFirstRoomId(rooms[0].id.toString());
      setFirstStudentId(students[0].id.toString());
    }
    loadFirstRoom();
  }, []);

  return (
    <header className={cx.header} data-testid="header">
      <h1 className={cx.title} data-testid="app-title">
        Sistema Interno
      </h1>

      <nav className={cx.navbar} data-testid="main-nav">
        <ul className={cx.navbarList}>
          <li className={cx.navbarListItem}>
            <Link href={`/rooms/${firstRoomId}`} data-testid="nav-rooms">
              Salas
            </Link>
          </li>
          <li className={cx.navbarListItem}>
            <Link
              href={`/students/${firstStudentId}`}
              data-testid="nav-students"
            >
              Alunos
            </Link>
          </li>
          <li className={cx.navbarListItem}>
            <Link href="/inventory" data-testid="nav-inventory">
              Inventário
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
