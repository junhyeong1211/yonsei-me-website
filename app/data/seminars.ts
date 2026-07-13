import type { EditorialPost } from "./editorialContent";

export const seminarPosts: EditorialPost[] = [
  {
    id: "seminar-01", type: "seminar", category: { ko: "BK 세미나", en: "BK Seminar" },
    title: { ko: "히라이 교수", en: "Prof. Hirai" }, summary: { ko: "상세 내용 준비 중", en: "Detailed content is being prepared." },
    content: null, author: null, publishedAt: "2026-07-31", eventDate: "2026-07-31", thumbnail: null,
    attachments: [], externalLinks: [], isNew: true, slug: "bk-seminar-hirai",
  },
  {
    id: "seminar-02", type: "seminar", category: { ko: "집중강의", en: "Intensive Lecture" },
    title: { ko: "여름학기 해외집중강의 시리즈(2차)", en: "Summer Intensive Lecture Series (Round 2)" }, summary: { ko: "상세 내용 준비 중", en: "Detailed content is being prepared." },
    content: null, author: null, publishedAt: "2026-07-24", eventDate: "2026-07-24", thumbnail: null,
    attachments: [], externalLinks: [], isNew: true, slug: "summer-intensive-lecture-july-24",
  },
  {
    id: "seminar-03", type: "seminar", category: { ko: "집중강의", en: "Intensive Lecture" },
    title: { ko: "여름학기 해외집중강의 시리즈(2차)", en: "Summer Intensive Lecture Series (Round 2)" }, summary: { ko: "상세 내용 준비 중", en: "Detailed content is being prepared." },
    content: null, author: null, publishedAt: "2026-07-23", eventDate: "2026-07-23", thumbnail: null,
    attachments: [], externalLinks: [], isNew: true, slug: "summer-intensive-lecture-july-23",
  },
  {
    id: "seminar-04", type: "seminar", category: { ko: "BK 세미나", en: "BK Seminar" },
    title: { ko: "Prof. Robert G. Landers", en: "Prof. Robert G. Landers" }, summary: { ko: "상세 내용 준비 중", en: "Detailed content is being prepared." },
    content: null, author: null, publishedAt: "2026-07-15", eventDate: "2026-07-15", thumbnail: null,
    attachments: [], externalLinks: [], isNew: false, slug: "bk-seminar-robert-landers",
  },
  {
    id: "seminar-05", type: "seminar", category: { ko: "BK 세미나", en: "BK Seminar" },
    title: { ko: "이지현 교수", en: "Prof. Lee Ji-hyun" }, summary: { ko: "상세 내용 준비 중", en: "Detailed content is being prepared." },
    content: null, author: null, publishedAt: "2026-07-14", eventDate: "2026-07-14", thumbnail: null,
    attachments: [], externalLinks: [], isNew: false, slug: "bk-seminar-lee-ji-hyun",
  },
];

export const getSeminarBySlug = (slug: string) => seminarPosts.find((post) => post.slug === slug);
