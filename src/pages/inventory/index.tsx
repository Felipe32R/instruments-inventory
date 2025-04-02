import cx from "./Inventory.module.scss";
import { InventoryItem } from "app/ui/components/InventoryItem";
import { fetchInventory } from "app/infrastructure/inner/services/fetchInventory";

export default function Inventory({ inventory }) {
  const parsedInventory = inventory.map((item) => ({
    ...item,
    lastMaintenance: new Date(item.lastMaintenance),
  }));

  return (
    <ul className={cx.list}>
      {parsedInventory.map((item) => (
        <InventoryItem key={item.id} item={item} />
      ))}

      <div className={cx.spacing} />
    </ul>
  );
}

export async function getServerSideProps() {
  const inventory = await fetchInventory();
  return {
    props: {
      inventory,
    },
  };
}
