import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

dayjs.extend(isSameOrAfter);

/**
 * Checks wether the date is within x month(s) ago or not
 *
 * @param {string | Date} date The date
 * @param {number} x The month
 * @returns {boolean} true if the date is within x month(s) ago
 */
export default function isInXMonthsAgo(date: string | Date, x: number): boolean {
  if (!dayjs(date).isValid()) throw new Error(`${String(date)} is not a valid date`);

  return dayjs(date).isSameOrAfter(dayjs().subtract(x, "months"), "date");
}
