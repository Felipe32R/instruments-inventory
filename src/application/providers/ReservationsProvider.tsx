import { ReactNode, createContext, useMemo } from "react";
import { useEffect, useState } from "react";
import { fetchReservations } from "../../infrastructure/inner/services/fetchReservations";
import { Reservation } from "../../domain/models/Reservation";

export type ReservationContextValue = {
  reservations: Array<Reservation> | undefined;
};

export const ReservationsContext = createContext<
  ReservationContextValue | undefined
>(undefined);

export type ReeervationProviderProps = {
  children: ReactNode;
};

export const ReservationsProvider = ({
  children,
}: ReeervationProviderProps) => {
  const [reservations, setReservations] = useState<
    Array<Reservation> | undefined
  >(undefined);

  useEffect(() => {
    fetchReservations().then((data) => setReservations(data));
  }, []);

  const value = useMemo(
    () => ({
      reservations,
    }),
    [reservations],
  );

  return (
    <ReservationsContext.Provider value={value}>
      {children}
    </ReservationsContext.Provider>
  );
};
