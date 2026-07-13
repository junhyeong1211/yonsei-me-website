import type { LocaleText } from "./content";

export type EditorialContentType = "news" | "seminar" | "event";

export type EditorialAttachment = {
  id: string;
  name: LocaleText;
  url: string;
};

export type EditorialExternalLink = {
  id: string;
  label: LocaleText;
  url: string;
};

export type EditorialPost = {
  id: string;
  type: EditorialContentType;
  category: LocaleText;
  title: LocaleText;
  summary: LocaleText;
  content: LocaleText | null;
  author: LocaleText | null;
  publishedAt: string;
  eventDate: string | null;
  thumbnail: string | null;
  attachments: EditorialAttachment[];
  externalLinks: EditorialExternalLink[];
  isNew: boolean;
  slug: string;
};

export const pendingEditorialContent: LocaleText = {
  ko: "상세 내용 준비 중",
  en: "Detailed content is being prepared.",
};

export const sortEditorialPosts = (posts: EditorialPost[]) =>
  [...posts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

export const matchesEditorialQuery = (post: EditorialPost, query: string) => {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return true;
  return [
    post.title.ko,
    post.title.en,
    post.summary.ko,
    post.summary.en,
    post.content?.ko ?? "",
    post.content?.en ?? "",
    post.author?.ko ?? "",
    post.author?.en ?? "",
    post.category.ko,
    post.category.en,
  ].join(" ").toLowerCase().includes(normalized);
};
