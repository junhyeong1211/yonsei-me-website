import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DepartmentSite from "../../components/DepartmentSite";
import type { Locale } from "../../data/content";
import { getNewsTypeFromSegment, getPostBySlug } from "../../data/newsPosts";

type PageProps = {
  params: Promise<{ locale: string; slug?: string[] }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export const metadata: Metadata = {
  title: "Mechanical Engineering",
};

export default async function LocalePage({ params, searchParams }: PageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const locale: Locale = resolvedParams.locale === "en" ? "en" : "ko";
  const segments = resolvedParams.slug ?? [];
  if (segments[0] === "news" && segments[1] && segments[2]) {
    const newsType = getNewsTypeFromSegment(segments[1]);
    if (newsType && !getPostBySlug(newsType, segments[2])) notFound();
  }
  const normalizedSearchParams = Object.fromEntries(
    Object.entries(resolvedSearchParams).map(([key, value]) => [
      key,
      Array.isArray(value) ? value[0] ?? "" : value ?? "",
    ]),
  );

  return (
    <DepartmentSite
      locale={locale}
      segments={segments}
      searchParams={normalizedSearchParams}
    />
  );
}
