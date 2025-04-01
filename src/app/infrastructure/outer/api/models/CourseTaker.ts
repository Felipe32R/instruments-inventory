import { Address } from "./Address";
import { Allocation } from "./Allocation";
import { Course } from "./Course";

export type CourseTaker = {
  id: number;
  course_taker_id: string;
  name: string;
  age: number;
  address: Address;
  phone_number: string;
  birth_date: string;
  rg: string;
  courses: Array<Course>;
  enrollment_year: number;
  allocs: Array<Allocation>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};
