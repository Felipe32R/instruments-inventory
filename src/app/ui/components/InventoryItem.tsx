import { format } from "date-fns";
import { capitalize } from "lodash";
import { computeInventoryItemWear } from "../../domain/services/computeInventoryItemWear";
import { displayableFragility } from "../services/displayableFragility";
import { displayableWear } from "../services/displayableWear";
import cx from "./InventoryItem.module.scss";
import { InventoryItem as DomainInventoryItem } from "../../domain/models/InventoryItem";

export type InventoryItemProps = {
  item: DomainInventoryItem;
};

export const InventoryItem = ({ item }: InventoryItemProps) => {
  const wear = computeInventoryItemWear(item);

  return (
    <li
      className={cx.container}
      style={{ backgroundColor: displayableWear(wear).color }}
    >
      <dl>
        <h3 className={cx.title}>
          {capitalize(item.type)} | {item.brand} {item.model}
        </h3>

        <div className={cx.field}>
          <dt className={cx.fieldTitle}>Sector</dt>

          <dd className={cx.fieldData}>{item.sector}</dd>
        </div>

        <div className={cx.field}>
          <dt className={cx.fieldTitle}>Fragility</dt>

          <dd className={cx.fieldData}>
            {displayableFragility(item.fragility)}
          </dd>
        </div>

        <div className={cx.field}>
          <dt className={cx.fieldTitle}>Last Maintenance</dt>

          <dd className={cx.fieldData}>
            {format(item.lastMaintenance, "dd/MM/yyyy")}
          </dd>
        </div>

        <div className={cx.field}>
          <dt className={cx.fieldTitle}>Wear</dt>

          <dd className={cx.fieldData}>{displayableWear(wear).text}</dd>
        </div>
      </dl>
    </li>
  );
};
