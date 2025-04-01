import { InventoryItem } from "./InventoryItem";

export type InventorySector = {
  id: number;
  sector: string;
  items: Array<InventoryItem>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};
