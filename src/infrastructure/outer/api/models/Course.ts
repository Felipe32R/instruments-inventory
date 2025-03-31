import { Specialty } from "./Specialty";

export type Course = {
  id: number;
  name: string;
  catalogue: number;
  specialties: Array<Specialty>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};
