type CalendarEvent = {
  title: string;
  description: string;
  location: string;
  start: Date;
  end: Date;
};

function toGoogleDate(date: Date) {
  return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

export function googleCalendarUrl(event: CalendarEvent) {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    details: event.description,
    location: event.location,
    dates: `${toGoogleDate(event.start)}/${toGoogleDate(event.end)}`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function outlookCalendarUrl(event: CalendarEvent) {
  const params = new URLSearchParams({
    path: "/calendar/action/compose",
    rru: "addevent",
    subject: event.title,
    body: event.description,
    location: event.location,
    startdt: event.start.toISOString(),
    enddt: event.end.toISOString(),
  });
  return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`;
}

export function icsDataUrl(event: CalendarEvent) {
  const format = (date: Date) =>
    date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//bidavetli.com//Kurumsal Etkinlik//TR",
    "BEGIN:VEVENT",
    `UID:${Date.now()}@bidavetli.com`,
    `DTSTAMP:${format(new Date())}`,
    `DTSTART:${format(event.start)}`,
    `DTEND:${format(event.end)}`,
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${event.description}`,
    `LOCATION:${event.location}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  return `data:text/calendar;charset=utf8,${encodeURIComponent(ics)}`;
}
