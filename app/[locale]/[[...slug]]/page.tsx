import type { Metadata } from "next";
import DepartmentSite from "../../components/DepartmentSite";
import type { Locale } from "../../data/content";

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
