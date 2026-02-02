import { toMinutes } from "./time";
export function validateSlots(slots) {
  for (let i = 0; i < slots.length; i++) {
    const curr = slots[i];

    if (!curr.startTime || !curr.endTime) {
      return {
        slotIndex: i,
        message: "Start time and end time are required",
      };
    }

    const start = toMinutes(curr.startTime);
    const end = toMinutes(curr.endTime);

    if (start >= end) {
      return {
        slotIndex: i,
        message: "Start time must be before end time",
      };
    }

    if (i > 0) {
      const prev = slots[i - 1];
      const prevEnd = toMinutes(prev.endTime);

      if (start < prevEnd) {
        return {
          slotIndex: i,
          message: "This slot overlaps with previous slot",
        };
      }

      if (start === prevEnd) {
        return {
          slotIndex: i,
          message: "This slot must start after previous slot",
        };
      }
    }
  }

  return null;
}
