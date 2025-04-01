import { InventoryItem as ApiInventoryItem } from "../../outer/api/models/InventoryItem";
import { getInventory } from "../../outer/api/services/getInventory";
import { InventoryItem } from "../../../domain/models/InventoryItem";

export const fetchInventory = async (): Promise<Array<InventoryItem>> => {
  const response = await getInventory();
  const sectors = response.data;

  return sectors.flatMap((sector) =>
    sector.items.map((item) => ({
      id: item.id,
      type: item.type,
      brand: item.brand,
      model: item.model,
      fragility: item.fragility,
      lastMaintenance: mapLastMaintenance(item.last_maintenance),
      sector: sector.sector,
    })),
  );
};

const mapLastMaintenance = (
  lastMaintenance: ApiInventoryItem["last_maintenance"],
) => {
  const { day, month, year } = lastMaintenance;

  return new Date(year, month, day);
};
