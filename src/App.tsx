import { Header } from "./ui/components/Header";
import { Rooms } from "./ui/pages/Rooms";
import { Students } from "./ui/pages/Students";
import "./ui/styles/global.scss";
import { Inventory } from "./ui/pages/Inventory";
import { useViewState } from "./application/hooks/useViewState";
import { ViewStateProvider } from "./application/providers/ViewStateProvider";
import { ReservationsProvider } from "./application/providers/ReservationsProvider";
import { InventoryProvider } from "./application/providers/InventoryProvider";

function App() {
  const { viewState } = useViewState();

  const renderViewMatrix = {
    Rooms: () => <Rooms />,
    Students: () => <Students />,
    Inventory: () => <Inventory />,
  };

  const renderView = renderViewMatrix[viewState.view];

  return (
    <>
      <Header />

      {renderView()}
    </>
  );
}

const AppWithProviders = () => (
  <ViewStateProvider>
    <ReservationsProvider>
      <InventoryProvider>
        <App />
      </InventoryProvider>
    </ReservationsProvider>
  </ViewStateProvider>
);

export default AppWithProviders;
