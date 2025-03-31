import { useContext } from "react";
import { ViewStateContext } from "../providers/ViewStateProvider";

export const useViewState = () => {
  const value = useContext(ViewStateContext);

  if (value === undefined) {
    throw new Error("You forgot ViewStateProvider!");
  }

  const { viewState, setViewState } = value;

  const goToRooms = (id?: string) =>
    setViewState({
      view: "Rooms",
      id,
    });

  const goToStudents = (id?: string) =>
    setViewState({
      view: "Students",
      id,
    });

  const goToInventory = () =>
    setViewState({
      view: "Inventory",
    });

  return {
    viewState,
    goToRooms,
    goToStudents,
    goToInventory,
  };
};
