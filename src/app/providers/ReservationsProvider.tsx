"use client";
import { Reservation } from "app/domain/models/Reservation";
import { fetchReservations } from "app/infrastructure/inner/services/fetchReservations";
import { ReactNode, createContext, useMemo } from "react";
import { useEffect, useState } from "react";

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
