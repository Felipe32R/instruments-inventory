import { ReactNode } from "react";

import { Header } from "./ui/components/Header";
import { LoadingOverlay } from "./ui/components/LoadingOverlay";

type LayoutProps = {
  children: ReactNode;
};

export function RootLayout({ children }: LayoutProps) {
  return (
    <div>
      <Header />
      <main>
        <LoadingOverlay />
        {children}
      </main>
    </div>
  );
}
