export function formatTime(time24) {
  if (!time24 || typeof time24 !== "string") return "--";

  const parts = time24.split(":");
  if (parts.length !== 2) return "--";

  const h = Number(parts[0]);
  const m = Number(parts[1]);

  if (Number.isNaN(h) || Number.isNaN(m)) return "--";

  const suffix = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 || 12;

  return `${hour12}:${String(m).padStart(2, "0")} ${suffix}`;
}
export function toMinutes(time24) {
  if (!time24 || typeof time24 !== "string") return 0;
  const [h, m] = time24.split(":").map(Number);
  if (Number.isNaN(h) || Number.isNaN(m)) return 0;
  return h * 60 + m;
}
