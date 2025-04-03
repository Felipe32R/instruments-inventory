"use client";
import cx from "./Header.module.scss";
import Link from "next/link";

export const Header = () => {
  return (
    <header className={cx.header} data-testid="header">
      <h1 className={cx.title} data-testid="app-title">
        Sistema Interno
      </h1>

      <nav className={cx.navbar} data-testid="main-nav">
        <ul className={cx.navbarList}>
          <li className={cx.navbarListItem}>
            <Link href={`/rooms`} data-testid="nav-rooms">
              Salas
            </Link>
          </li>
          <li className={cx.navbarListItem}>
            <Link href={`/students`} data-testid="nav-students">
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
