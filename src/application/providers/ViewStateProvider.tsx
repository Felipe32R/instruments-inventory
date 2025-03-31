import { ReactNode, createContext, useMemo, useState } from "react";

export type ViewState = {
  view: "Inventory" | "Rooms" | "Students";
  id?: string;
};

type ViewStateContextValue = {
  viewState: ViewState;
  setViewState: (viewState: ViewState) => void;
};

export const ViewStateContext = createContext<
  ViewStateContextValue | undefined
>(undefined);

export type ViewStateProviderProps = {
  children: ReactNode;
};

export const ViewStateProvider = ({ children }: ViewStateProviderProps) => {
  const [viewState, setViewState] = useState<ViewState>({
    view: "Rooms",
  });

  const value = useMemo(
    () => ({
      viewState,
      setViewState,
    }),
    [viewState],
  );

  return (
    <ViewStateContext.Provider value={value}>
      {children}
    </ViewStateContext.Provider>
  );
};
