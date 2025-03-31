import { FragilityLevel } from "./FragilityLevel";

export type InventoryItem = {
  id: number;
  type: string;
  brand: string;
  model: string;
  fragility: FragilityLevel;
  lastMaintenance: Date;
  sector: string;
};
