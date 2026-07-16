import type { Metadata } from "next";
import { redirect } from "next/navigation";
import DepartmentSite from "../../components/DepartmentSite";
import type { Locale } from "../../data/content";
import { navigation } from "../../data/navigation";

type PageProps = {
  params: Promise<{ locale: string; slug?: string[] }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const fallbackTitles = {
  ko: {
    faculty: "교수진",
    labs: "연구실",
    research: "연구·구성원",
    academics: "교육·학사",
    news: "뉴스",
    seminars: "세미나·행사",
    events: "세미나·행사",
    admission: "입학·진로",
    search: "통합검색",
    promotion: "홍보",
  },
  en: {
    faculty: "Faculty",
    labs: "Laboratories",
    research: "Research & People",
    academics: "Academics",
    news: "News",
    seminars: "Seminars & Events",
    events: "Seminars & Events",
    admission: "Admissions & Careers",
    search: "Search",
    promotion: "Promotion",
  },
} as const;

function pageTitle(locale: Locale, segments: string[]) {
  const path = `/${segments.join("/")}`;
  const navigationTitle = navigation
    .flatMap((item) => item.children)
    .find((item) => item.path === path)?.label[locale];

  return navigationTitle ?? fallbackTitles[locale][segments[0] as keyof typeof fallbackTitles[typeof locale]] ?? (locale === "ko" ? "연세대학교 기계공학부" : "Mechanical Engineering");
}

export async function generateMetadata({ params }: Pick<PageProps, "params">): Promise<Metadata> {
  const resolvedParams = await params;
  const locale: Locale = resolvedParams.locale === "en" ? "en" : "ko";
  const title = pageTitle(locale, resolvedParams.slug ?? []);
  const description = locale === "ko"
    ? `연세대학교 기계공학부 ${title} 페이지입니다.`
    : `${title} information from Yonsei University Mechanical Engineering.`;

  return {
    title,
    description,
    openGraph: { title, description },
    twitter: { title, description },
  };
}

export default async function LocalePage({ params, searchParams }: PageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const locale: Locale = resolvedParams.locale === "en" ? "en" : "ko";
  if (resolvedParams.slug?.length === 1 && resolvedParams.slug[0] === "academics") {
    redirect(`/${locale}/academics/undergraduate`);
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
      segments={resolvedParams.slug ?? []}
      searchParams={normalizedSearchParams}
    />
  );
}
