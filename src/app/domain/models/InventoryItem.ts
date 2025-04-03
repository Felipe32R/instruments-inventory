import { FragilityLevel } from "./FragilityLevel";

export type InventoryItem = {
  id: number;
  type: string;
  brand: string;
  model: string;
  fragility: FragilityLevel;
  lastMaintenance: Date | string;
  sector: string;
};

export type InventoryItemDateString = {
  id: number;
  type: string;
  brand: string;
  model: string;
  fragility: FragilityLevel;
  lastMaintenance: string;
  sector: string;
};
