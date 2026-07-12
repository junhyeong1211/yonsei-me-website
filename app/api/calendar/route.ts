import type { CalendarEvent } from "../../data/calendar";

const calendarId = "0nevledgmf1pgvjsc57sp2tdik@group.calendar.google.com";
const calendarFeedUrl = `https://calendar.google.com/calendar/ical/${encodeURIComponent(calendarId)}/public/basic.ics`;
const seoulTimeZone = "Asia/Seoul";

type ParsedIcsDate = {
  date: string;
  time: string;
};

const unescapeIcsText = (value: string) => value
  .replace(/\\n/gi, " ")
  .replace(/\\,/g, ",")
  .replace(/\\;/g, ";")
  .replace(/\\\\/g, "\\")
  .trim();

function propertyValue(lines: string[], name: string) {
  const line = lines.find((item) => item.startsWith(name));
  return line ? line.slice(line.indexOf(":") + 1) : null;
}

function parseIcsDate(value: string): ParsedIcsDate | null {
  const match = value.match(/^(\d{4})(\d{2})(\d{2})(?:T(\d{2})(\d{2})(\d{2})?)?(Z)?$/);
  if (!match) return null;

  const [, rawYear, rawMonth, rawDay, rawHour, rawMinute, , utc] = match;
  if (!rawHour) return { date: `${rawYear}-${rawMonth}-${rawDay}`, time: "" };
  if (!utc) return { date: `${rawYear}-${rawMonth}-${rawDay}`, time: `${rawHour}:${rawMinute}` };

  const utcDate = new Date(Date.UTC(Number(rawYear), Number(rawMonth) - 1, Number(rawDay), Number(rawHour), Number(rawMinute)));
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: seoulTimeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(utcDate);
  const part = (type: string) => parts.find((item) => item.type === type)?.value ?? "";
  return { date: `${part("year")}-${part("month")}-${part("day")}`, time: `${part("hour")}:${part("minute")}` };
}

function addDays(value: string, amount: number) {
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  date.setUTCDate(date.getUTCDate() + amount);
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}-${String(date.getUTCDate()).padStart(2, "0")}`;
}

function weekdayCode(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  return ["SU", "MO", "TU", "WE", "TH", "FR", "SA"][new Date(Date.UTC(year, month - 1, day)).getUTCDay()];
}

function daysBetween(start: string, end: string) {
  const toUtc = (value: string) => {
    const [year, month, day] = value.split("-").map(Number);
    return Date.UTC(year, month - 1, day);
  };
  return Math.floor((toUtc(end) - toUtc(start)) / 86_400_000);
}

function expandDates(startDate: string, rule: string | null, year: number) {
  if (!rule) return startDate.startsWith(`${year}-`) ? [startDate] : [];

  const values = new Map(rule.split(";").map((part) => part.split("=", 2) as [string, string]));
  const frequency = values.get("FREQ");
  const interval = Number(values.get("INTERVAL") ?? "1") || 1;
  const until = parseIcsDate(values.get("UNTIL") ?? "")?.date ?? `${year}-12-31`;
  const rangeStart = `${year}-01-01`;
  const rangeEnd = `${year}-12-31`;
  const finalDate = until < rangeEnd ? until : rangeEnd;
  const weekdays = new Set((values.get("BYDAY") ?? weekdayCode(startDate)).split(","));
  const dates: string[] = [];

  for (let current = startDate; current <= finalDate; current = addDays(current, 1)) {
    if (current < rangeStart) continue;
    const elapsedDays = daysBetween(startDate, current);
    const elapsedWeeks = Math.floor(elapsedDays / 7);
    const [startYear, startMonth, startDay] = startDate.split("-").map(Number);
    const [currentYear, currentMonth, currentDay] = current.split("-").map(Number);
    const matches = (frequency === "DAILY" && elapsedDays % interval === 0)
      || (frequency === "WEEKLY" && elapsedWeeks % interval === 0 && weekdays.has(weekdayCode(current)))
      || (frequency === "MONTHLY" && (currentMonth - startMonth + (currentYear - startYear) * 12) % interval === 0 && currentDay === startDay)
      || (frequency === "YEARLY" && currentMonth === startMonth && currentDay === startDay && (currentYear - startYear) % interval === 0);
    if (matches) dates.push(current);
  }

  return dates;
}

function parseCalendarEvents(ics: string, year: number): CalendarEvent[] {
  const unfolded = ics.replace(/\r?\n[ \t]/g, "");
  const blocks = unfolded.split("BEGIN:VEVENT").slice(1).map((block) => block.split("END:VEVENT")[0]);
  const events: CalendarEvent[] = [];

  blocks.forEach((block) => {
    const lines = block.split(/\r?\n/).filter(Boolean);
    const start = parseIcsDate(propertyValue(lines, "DTSTART") ?? "");
    if (!start) return;
    const end = parseIcsDate(propertyValue(lines, "DTEND") ?? "");
    const summary = unescapeIcsText(propertyValue(lines, "SUMMARY") ?? "");
    if (!summary) return;

    const separator = summary.indexOf("_");
    const category = separator > 0 ? summary.slice(0, separator).trim() : "일정";
    const title = separator > 0 ? summary.slice(separator + 1).trim() : summary;
    const location = propertyValue(lines, "LOCATION");
    const description = propertyValue(lines, "DESCRIPTION");
    const link = propertyValue(lines, "URL");
    const uid = propertyValue(lines, "UID") ?? `${start.date}-${summary}`;
    const occurrenceDates = expandDates(start.date, propertyValue(lines, "RRULE"), year);

    occurrenceDates.forEach((date) => {
      events.push({
        id: `${uid}-${date}`,
        title: { ko: title, en: title },
        date,
        startTime: start.time,
        endTime: end?.time ?? start.time,
        category: { ko: category, en: category },
        location: location ? { ko: unescapeIcsText(location), en: unescapeIcsText(location) } : null,
        description: description ? { ko: unescapeIcsText(description), en: unescapeIcsText(description) } : null,
        link: link ? unescapeIcsText(link) : null,
      });
    });
  });

  return events.sort((a, b) => `${a.date}-${a.startTime}`.localeCompare(`${b.date}-${b.startTime}`));
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const year = Number(searchParams.get("year")) || new Date().getFullYear();

  try {
    const response = await fetch(calendarFeedUrl, { headers: { Accept: "text/calendar" } });
    if (!response.ok) throw new Error(`Calendar source responded with ${response.status}`);
    const events = parseCalendarEvents(await response.text(), year);
    return Response.json({ events, source: "google-calendar-public-ics" }, { headers: { "Cache-Control": "public, max-age=300" } });
  } catch {
    return Response.json({ events: [], source: "unavailable" }, { status: 502, headers: { "Cache-Control": "no-store" } });
  }
}
