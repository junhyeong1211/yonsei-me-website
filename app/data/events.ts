import type { EditorialPost } from "./editorialContent";

export const eventPosts: EditorialPost[] = [
  {
    id: "event-post-01", type: "event", category: { ko: "BK 세미나", en: "BK Seminar" },
    title: { ko: "히라이 교수", en: "Prof. Hirai" }, summary: { ko: "상세 내용 준비 중", en: "Detailed content is being prepared." },
    content: null, author: null, publishedAt: "2026-07-31", eventDate: "2026-07-31", thumbnail: null,
    attachments: [], externalLinks: [], isNew: true, slug: "academic-event-hirai",
  },
  ...[
    ["24", "summer-session-event-july-24"],
    ["23", "summer-session-event-july-23"],
    ["21", "summer-session-event-july-21"],
    ["20", "summer-session-event-july-20"],
  ].map(([day, slug], index): EditorialPost => ({
    id: `event-post-0${index + 2}`,
    type: "event",
    category: { ko: "여름학기", en: "Summer Session" },
    title: { ko: "여름학기 해외집중강의 시리즈(2차)", en: "Summer Intensive Lecture Series (Round 2)" },
    summary: { ko: "상세 내용 준비 중", en: "Detailed content is being prepared." },
    content: null,
    author: null,
    publishedAt: `2026-07-${day}`,
    eventDate: `2026-07-${day}`,
    thumbnail: null,
    attachments: [],
    externalLinks: [],
    isNew: index < 2,
    slug,
  })),
];

export const getEventBySlug = (slug: string) => eventPosts.find((post) => post.slug === slug);
