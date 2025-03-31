import { useViewState } from "../../application/hooks/useViewState";
import cx from "./Header.module.scss";

export const Header = () => {
  const { goToRooms, goToStudents, goToInventory } = useViewState();

  return (
    <header className={cx.header}>
      <h1 className={cx.title}>Sistema Interno</h1>

      <nav className={cx.navbar}>
        <ul className={cx.navbarList}>
          <li onClick={() => goToRooms()} className={cx.navbarListItem}>
            Salas
          </li>
          <li onClick={() => goToStudents()} className={cx.navbarListItem}>
            Alunos
          </li>
          <li onClick={() => goToInventory()} className={cx.navbarListItem}>
            Inventário
          </li>
        </ul>
      </nav>
    </header>
  );
};
