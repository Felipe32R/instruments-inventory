import { InventoryProvider } from "app/providers/InventoryProvider";
import { ReservationsProvider } from "app/providers/ReservationsProvider";
import { ViewStateProvider } from "app/providers/ViewStateProvider";
import { Header } from "app/ui/components/Header";

import type { AppProps } from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ViewStateProvider>
      <ReservationsProvider>
        <InventoryProvider>
          <Header />
          <Component {...pageProps} />
        </InventoryProvider>
      </ReservationsProvider>
    </ViewStateProvider>
  );
}
