import type { EditorialPost } from "./editorialContent";

export const newsCategories = [
  { key: "all", label: { ko: "전체", en: "All" } },
  { key: "research", label: { ko: "연구성과", en: "Research" } },
  { key: "award", label: { ko: "수상", en: "Awards" } },
  { key: "international", label: { ko: "국제교류", en: "International" } },
  { key: "department", label: { ko: "학부소식", en: "Department" } },
] as const;

export type NewsCategoryKey = (typeof newsCategories)[number]["key"];

export const newsPosts: Array<EditorialPost & { categoryKey: Exclude<NewsCategoryKey, "all"> }> = [
  {
    id: "news-01",
    type: "news",
    categoryKey: "department",
    category: { ko: "학부소식", en: "Department" },
    title: { ko: "[중요 학부공지 제목 입력 예정]", en: "[Important undergraduate news title pending]" },
    summary: { ko: "공지 본문과 안내 사항을 입력할 예정입니다.", en: "The verified news summary will be added." },
    content: null,
    author: null,
    publishedAt: "2026-07-08",
    eventDate: null,
    thumbnail: "/images/hero-campus.png",
    attachments: [],
    externalLinks: [],
    isNew: true,
    slug: "important-undergraduate-news-pending",
  },
  {
    id: "news-02",
    type: "news",
    categoryKey: "department",
    category: { ko: "학부소식", en: "Department" },
    title: { ko: "[대학원공지 제목 입력 예정]", en: "[Graduate news title pending]" },
    summary: { ko: "대학원 공지 본문을 입력할 예정입니다.", en: "The verified graduate news summary will be added." },
    content: null,
    author: null,
    publishedAt: "2026-07-03",
    eventDate: null,
    thumbnail: "/images/hero-lab.png",
    attachments: [],
    externalLinks: [],
    isNew: true,
    slug: "graduate-news-pending",
  },
  ...Array.from({ length: 3 }, (_, index) => ({
    id: `news-0${index + 3}`,
    type: "news" as const,
    categoryKey: "department" as const,
    category: { ko: "학부소식", en: "Department" },
    title: { ko: `[공지 제목 ${index + 3} 입력 예정]`, en: `[News title ${index + 3} pending]` },
    summary: { ko: "확정된 뉴스 내용으로 교체해야 하는 샘플입니다.", en: "Replace this sample with verified news content." },
    content: null,
    author: null,
    publishedAt: `2026-06-${String(28 - index * 3).padStart(2, "0")}`,
    eventDate: null,
    thumbnail: ["/images/hero-equipment.png", "/images/hero-mechanical.webp", "/images/hero-campus.png"][index],
    attachments: [],
    externalLinks: [],
    isNew: false,
    slug: `news-${index + 3}-pending`,
  })),
];

export const getNewsBySlug = (slug: string) => newsPosts.find((post) => post.slug === slug);
