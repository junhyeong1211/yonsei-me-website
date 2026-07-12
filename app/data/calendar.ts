import type { LocaleText } from "./content";

export type CalendarEvent = {
  id: string;
  title: LocaleText;
  date: string;
  startTime: string;
  endTime: string;
  category: LocaleText;
  location: LocaleText | null;
  description: LocaleText | null;
  link: string | null;
};

export const calendarEventsByMonth: Record<number, CalendarEvent[]> = {
  1: [],
  2: [],
  3: [],
  4: [],
  5: [],
  6: [],
  7: [
    {
      id: "2026-07-14-bk-seminar",
      title: { ko: "이지현 교수", en: "Prof. Lee Ji-hyun" },
      date: "2026-07-14",
      startTime: "11:00",
      endTime: "12:00",
      category: { ko: "BK 세미나", en: "BK Seminar" },
      location: null,
      description: null,
      link: null,
    },
    {
      id: "2026-07-15-bk-seminar",
      title: { ko: "Prof. Robert G. Landers", en: "Prof. Robert G. Landers" },
      date: "2026-07-15",
      startTime: "10:30",
      endTime: "11:30",
      category: { ko: "BK 세미나", en: "BK Seminar" },
      location: null,
      description: null,
      link: null,
    },
    {
      id: "2026-07-20-intensive-lecture",
      title: { ko: "여름학기 해외집중강의 시리즈(2차)", en: "Summer Intensive Lecture Series (Round 2)" },
      date: "2026-07-20",
      startTime: "14:00",
      endTime: "17:00",
      category: { ko: "여름학기", en: "Summer Session" },
      location: null,
      description: null,
      link: null,
    },
    {
      id: "2026-07-21-intensive-lecture",
      title: { ko: "여름학기 해외집중강의 시리즈(2차)", en: "Summer Intensive Lecture Series (Round 2)" },
      date: "2026-07-21",
      startTime: "14:00",
      endTime: "17:00",
      category: { ko: "여름학기", en: "Summer Session" },
      location: null,
      description: null,
      link: null,
    },
    {
      id: "2026-07-23-intensive-lecture",
      title: { ko: "여름학기 해외집중강의 시리즈(2차)", en: "Summer Intensive Lecture Series (Round 2)" },
      date: "2026-07-23",
      startTime: "14:00",
      endTime: "16:00",
      category: { ko: "여름학기", en: "Summer Session" },
      location: null,
      description: null,
      link: null,
    },
    {
      id: "2026-07-24-intensive-lecture",
      title: { ko: "여름학기 해외집중강의 시리즈(2차)", en: "Summer Intensive Lecture Series (Round 2)" },
      date: "2026-07-24",
      startTime: "14:00",
      endTime: "16:00",
      category: { ko: "여름학기", en: "Summer Session" },
      location: null,
      description: null,
      link: null,
    },
    {
      id: "2026-07-31-bk-seminar",
      title: { ko: "히라이 교수", en: "Prof. Hirai" },
      date: "2026-07-31",
      startTime: "17:00",
      endTime: "18:00",
      category: { ko: "BK 세미나", en: "BK Seminar" },
      location: null,
      description: null,
      link: null,
    },
  ],
  8: [],
  9: [],
  10: [],
  11: [],
  12: [],
};
