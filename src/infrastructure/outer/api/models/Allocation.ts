import { Place } from "./Place";

export type Allocation = {
  id: number;
  system: AllocationSystem;
  date: string;
  type: AllocationType;
  place: Place;
};

export type AllocationSystem = "app" | "website";

export type AllocationType = 0 | 1;
