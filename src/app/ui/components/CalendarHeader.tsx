import { range } from "lodash";
import cx from "./CalendarHeader.module.scss";

export const CalendarHeader = () => {
  const weekdays = [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
  ];

  const hoursInADay = 24;
  const timeMarkers = range(0, hoursInADay)
    .map((val) => [
      `${val.toString().padStart(2, "0")}:00`,
      `${val.toString().padStart(2, "0")}:30`,
    ])
    .flat();

  return (
    <>
      <div className={cx.calendarTopLeftCorner} />

      {timeMarkers.map((marker) => (
        <div key={marker} className={cx.timeMarker}>
          {marker}
        </div>
      ))}

      {weekdays.map((weekday) => (
        <div key={weekday} className={cx.weekday}>
          <span>{weekday}</span>
        </div>
      ))}
    </>
  );
};
