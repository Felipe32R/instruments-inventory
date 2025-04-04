import { RootLayout } from "app/layout";
import { InventoryProvider } from "app/providers/InventoryProvider";
import { ReservationsProvider } from "app/providers/ReservationsProvider";
import { ViewStateProvider } from "app/providers/ViewStateProvider";

import type { AppProps } from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ViewStateProvider>
      <ReservationsProvider>
        <InventoryProvider>
          <RootLayout>
            <Component {...pageProps} />
          </RootLayout>
        </InventoryProvider>
      </ReservationsProvider>
    </ViewStateProvider>
  );
}
