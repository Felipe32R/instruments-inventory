import { InventorySector } from "../models/InventorySector";
import inventory from "../data/inventory.json";
import { wait } from "../../../../utils/wait";

export type GetInventoryReturnValue = {
  status: number;
  statusText: string;
  redirected: boolean;
  headers: Record<string, string>;
  data: Array<InventorySector>;
};

export const getInventory = async (): Promise<GetInventoryReturnValue> => {
  await wait(1000);

  return inventory as GetInventoryReturnValue;
};
