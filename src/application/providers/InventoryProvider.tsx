import { ReactNode, createContext, useMemo } from "react";
import { useEffect, useState } from "react";
import { fetchInventory } from "../../infrastructure/inner/services/fetchInventory";
import { InventoryItem } from "../../domain/models/InventoryItem";

export type InventoryContextValue = {
  inventory: Array<InventoryItem> | undefined;
};

export const InventoryContext = createContext<
  InventoryContextValue | undefined
>(undefined);

export type InventoryProviderProps = {
  children: ReactNode;
};

export const InventoryProvider = ({ children }: InventoryProviderProps) => {
  const [inventory, setInventory] = useState<Array<InventoryItem> | undefined>(
    undefined,
  );

  useEffect(() => {
    fetchInventory().then((data) => setInventory(data));
  }, []);

  const value = useMemo(
    () => ({
      inventory,
    }),
    [inventory],
  );

  return (
    <InventoryContext.Provider value={value}>
      {children}
    </InventoryContext.Provider>
  );
};
