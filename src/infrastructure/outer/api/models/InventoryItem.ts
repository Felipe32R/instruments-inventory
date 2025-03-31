import { FragilityLevel } from "./FragilityLevel";

export type InventoryItem = {
  id: number;
  type: string;
  brand: string;
  model: string;
  fragility: FragilityLevel;
  last_maintenance: {
    day: number;
    month: number;
    year: number;
  };
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};
