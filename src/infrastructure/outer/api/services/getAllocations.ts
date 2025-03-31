import { wait } from "../../../../utils/wait";
import allocations from "../data/allocations.json";
import { CourseTaker } from "../models/CourseTaker";

export type GetAllocationsReturnValue = {
  status: number;
  statusText: string;
  redirected: boolean;
  headers: Record<string, string>;
  data: {
    data: Array<CourseTaker>;
  };
};

export const getAllocations = async (): Promise<GetAllocationsReturnValue> => {
  await wait(1000);

  return allocations as GetAllocationsReturnValue;
};
