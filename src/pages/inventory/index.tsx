import { useInventory } from "app/hooks/useInventory";
import cx from "./Inventory.module.scss";
import { InventoryItem } from "app/ui/components/InventoryItem";

export default function Inventory() {
  const { inventory, isLoading } = useInventory();

  if (isLoading || !inventory) {
    return <>Loading...</>;
  }

  return (
    <ul className={cx.list}>
      {inventory.map((item) => (
        <InventoryItem key={item.id} item={item} />
      ))}

      <div className={cx.spacing} />
    </ul>
  );
}
