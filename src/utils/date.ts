import { format, parse, parseISO } from "date-fns";
import { toZonedTime } from "date-fns-tz";

import { PREVIEW_FULL_DATE_MASK, PREVIEW_SHORT_DATE_MASK } from "@/constants/common";
interface IFormatDateOptions {
  onlyDate?: boolean;
  formatMask?: string;
  parseMask?: string;
}

export const parseDate = (date: string | number, parseMask?: string) => {
  const dateString = date.toString();

  if (parseMask) {
    return parse(dateString, parseMask, new Date());
  }

  const parsedDate = dateString.includes("Z") ? parseISO(dateString) : parseISO(dateString + "Z");

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return toZonedTime(parsedDate, timeZone);
};

export const formatDate = (date: string | number, formatOptions?: IFormatDateOptions): string => {
  try {
    const { onlyDate = true, parseMask } = formatOptions || {};

    const formatString =
      formatOptions?.formatMask || (onlyDate ? PREVIEW_SHORT_DATE_MASK : PREVIEW_FULL_DATE_MASK);

    const zonedDate = parseDate(date, parseMask);
    return format(zonedDate, formatString);
  } catch {
    return "-";
  }
};
