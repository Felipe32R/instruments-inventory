"use client";
import cx from "./Header.module.scss";
import Link from "next/link";

export const Header = () => {
  return (
    <header className={cx.header}>
      <h1 className={cx.title}>Sistema Interno</h1>

      <nav className={cx.navbar}>
        <ul className={cx.navbarList}>
          <li className={cx.navbarListItem}>
            <Link href={`/rooms`}>Salas</Link>
          </li>
          <li className={cx.navbarListItem}>
            <Link href={`/students`}>Alunos</Link>
          </li>
          <li className={cx.navbarListItem}>
            <Link href="/inventory">Inventário</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
