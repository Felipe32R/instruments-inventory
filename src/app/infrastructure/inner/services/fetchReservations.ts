import { addMinutes } from "date-fns";
import { Reservation } from "../../../domain/models/Reservation";
import { Allocation } from "../../outer/api/models/Allocation";
import { CourseTaker } from "../../outer/api/models/CourseTaker";
import { Place } from "../../outer/api/models/Place";
import { getAllocations } from "../../outer/api/services/getAllocations";

export const fetchReservations = async (): Promise<Array<Reservation>> => {
  const response = await getAllocations();

  const courseTakers = response.data.data;
  const allocations = courseTakers.flatMap((courseTaker) => courseTaker.allocs);

  return mapAllocationsToReservations(allocations, courseTakers);
};

const mapAllocationsToReservations = (
  allocations: Array<Allocation>,
  courseTakers: Array<CourseTaker>,
) =>
  allocations.map((alloc) => ({
    id: alloc.id,
    startDate: new Date(alloc.date),
    endDate: addMinutes(new Date(alloc.date), alloc.type === 0 ? 30 : 60),
    room: mapPlaceToRoom(alloc.place),
    student: mapCourseTakerToStudent(
      courseTakers.find((courseTaker) =>
        courseTaker.allocs.some(
          (courseTakerAlloc) => courseTakerAlloc.id === alloc.id,
        ),
      )!,
    ),
  }));

const mapPlaceToRoom = (place: Place) => ({
  id: place.id,
  name: place.name,
  number: place.num,
});

const mapCourseTakerToStudent = (courseTaker: CourseTaker) => ({
  id: courseTaker.id,
  name: courseTaker.name,
});
