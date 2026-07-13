"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { FormEvent, ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Download,
  ExternalLink,
  Search,
} from "lucide-react";
import {
  getLocalizedOptionalText,
  getLocalizedPostContent,
  getLocalizedPostSummary,
  getLocalizedPostTitle,
  getNewsCategoryLabel,
  getNewsPostPath,
  getNewsTypePath,
  getPostBySlug,
  getPostsByType,
  getPreviousAndNextPosts,
  isPostNew,
  matchesNewsFilter,
  newsTypeConfigs,
  searchPosts,
  type NewsFilterDefinition,
  type NewsLocale,
  type NewsPost,
  type NewsPostType,
} from "../../data/newsPosts";

const tx = (locale: NewsLocale, ko: string, en: string) => locale === "ko" ? ko : en;
const ITEMS_PER_PAGE = 10;

const formatDate = (value: string, locale: NewsLocale) => {
  const [year, month, day] = value.split("-").map(Number);
  return locale === "ko"
    ? `${year}.${String(month).padStart(2, "0")}.${String(day).padStart(2, "0")}`
    : new Intl.DateTimeFormat("en", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" }).format(new Date(Date.UTC(year, month - 1, day)));
};

const buildListPath = (locale: NewsLocale, type: NewsPostType, query: string, category: string, page: number) => {
  const params = new URLSearchParams();
  if (query.trim()) params.set("q", query.trim());
  if (category !== "all") params.set("category", category);
  if (page > 1) params.set("page", String(page));
  const queryString = params.toString();
  return `/${locale}${getNewsTypePath(type)}${queryString ? `?${queryString}` : ""}`;
};

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function HighlightedText({ text, query }: { text: string; query: string }) {
  const normalized = query.trim();
  if (!normalized) return <>{text}</>;
  const matcher = new RegExp(`(${escapeRegExp(normalized)})`, "gi");
  return <>{text.split(matcher).map((part, index) => part.toLocaleLowerCase() === normalized.toLocaleLowerCase() ? <mark key={`${index}-${part}`}>{part}</mark> : <span key={`${index}-${part}`}>{part}</span>)}</>;
}

const getSearchSnippet = (post: NewsPost, locale: NewsLocale, query: string) => {
  const summary = getLocalizedPostSummary(post, locale);
  if (!query.trim()) return summary;
  const candidates = [summary, ...getLocalizedPostContent(post, locale)];
  const match = candidates.find((value) => value.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase())) ?? summary;
  return match.length > 170 ? `${match.slice(0, 167)}...` : match;
};

function NewsPageHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <header className="page-header"><div className="container page-header-inner"><p className="section-label light">{eyebrow}</p><h1>{title}</h1><p>{description}</p></div></header>;
}

export function NewsFilters({ locale, filters, selected, onSelect }: { locale: NewsLocale; filters: NewsFilterDefinition[]; selected: string; onSelect: (value: string) => void }) {
  if (filters.length <= 1) return null;
  return <div className="news-system-filters" role="tablist" aria-label={tx(locale, "게시글 분류", "Post categories")}>
    {filters.map((filter) => <button type="button" role="tab" aria-selected={selected === filter.value} onClick={() => onSelect(filter.value)} key={filter.value}>{locale === "ko" ? filter.labelKo : filter.labelEn}</button>)}
  </div>;
}

export function NewsSearch({ locale, value, appliedQuery, onChange, onSubmit, onReset }: { locale: NewsLocale; value: string; appliedQuery: string; onChange: (value: string) => void; onSubmit: (event: FormEvent<HTMLFormElement>) => void; onReset: () => void }) {
  return <form className="news-system-search" role="search" onSubmit={onSubmit}>
    <label htmlFor="news-search-query">{tx(locale, "게시글 검색", "Search posts")}</label>
    <div><Search size={18} aria-hidden="true" /><input id="news-search-query" type="search" value={value} onChange={(event) => onChange(event.target.value)} placeholder={tx(locale, "제목·본문·태그·분류 검색", "Search title, body, tags, or category")} /><button type="submit">{tx(locale, "검색", "Search")}</button></div>
    {appliedQuery && <button className="news-search-reset" type="button" onClick={onReset}>{tx(locale, "검색 초기화", "Clear search")}</button>}
  </form>;
}

function NewsPostExtraMeta({ post, locale }: { post: NewsPost; locale: NewsLocale }) {
  if (post.type === "event") {
    const location = getLocalizedOptionalText(post.location, locale);
    if (!post.eventDate && !post.eventTime && !location) return null;
    return <p className="news-list-extra">{[
      post.eventDate ? formatDate(post.eventDate, locale) : null,
      post.eventTime,
      location,
    ].filter(Boolean).join(" · ")}</p>;
  }
  if (post.type === "faculty-recruitment") {
    const field = getLocalizedOptionalText(post.recruitmentField, locale);
    return <p className="news-list-extra">{[
      field ?? tx(locale, "모집 분야 확인 필요", "Recruitment field to be confirmed"),
      post.applicationPeriod ?? tx(locale, "접수 기간 확인 필요", "Application period to be confirmed"),
    ].join(" · ")}</p>;
  }
  return null;
}

export function NewsListItem({ post, locale, query }: { post: NewsPost; locale: NewsLocale; query: string }) {
  const title = getLocalizedPostTitle(post, locale);
  const category = getNewsCategoryLabel(post.category, locale);
  return <article className="news-system-list-item">
    <div className="news-list-classification">
      {post.isPinned && <strong>{tx(locale, "고정", "Pinned")}</strong>}
      <span>{category}</span>
    </div>
    <div className="news-list-content">
      <h2><Link href={getNewsPostPath(locale, post)}><HighlightedText text={title} query={query} /></Link>{isPostNew(post) && <em>NEW</em>}</h2>
      <p><HighlightedText text={getSearchSnippet(post, locale, query)} query={query} /></p>
      <NewsPostExtraMeta post={post} locale={locale} />
    </div>
    <div className="news-list-date"><time dateTime={post.publishedAt}>{formatDate(post.publishedAt, locale)}</time>{post.isDemo && <span>{tx(locale, "샘플", "Sample")}</span>}</div>
  </article>;
}

export function NewsList({ posts, locale, query }: { posts: NewsPost[]; locale: NewsLocale; query: string }) {
  if (!posts.length) return <div className="news-system-empty"><h2>{tx(locale, "검색 결과가 없습니다", "No posts found")}</h2><p>{tx(locale, "검색어나 분류 조건을 다시 확인해 주세요.", "Try changing the search query or category.")}</p></div>;
  return <div className="news-system-list"><div className="news-system-list-head" aria-hidden="true"><span>{tx(locale, "고정·분류", "Status · Category")}</span><span>{tx(locale, "제목", "Title")}</span><span>{tx(locale, "게시일", "Published")}</span></div>{posts.map((post) => <NewsListItem post={post} locale={locale} query={query} key={post.id} />)}</div>;
}

export function Pagination({ locale, currentPage, pageCount, getHref }: { locale: NewsLocale; currentPage: number; pageCount: number; getHref: (page: number) => string }) {
  if (pageCount <= 1) return null;
  const start = Math.max(1, currentPage - 2);
  const end = Math.min(pageCount, start + 4);
  const pages = Array.from({ length: end - start + 1 }, (_, index) => start + index);
  const control = (page: number, label: string, icon: ReactNode, disabled: boolean) => disabled
    ? <span className="is-disabled" aria-disabled="true">{icon}</span>
    : <Link href={getHref(page)} aria-label={label}>{icon}</Link>;
  return <nav className="news-system-pagination" aria-label={tx(locale, "게시글 페이지", "Post pagination")}>
    {control(1, tx(locale, "첫 페이지", "First page"), <ChevronsLeft size={17} aria-hidden="true" />, currentPage === 1)}
    {control(currentPage - 1, tx(locale, "이전 페이지", "Previous page"), <ChevronLeft size={17} aria-hidden="true" />, currentPage === 1)}
    {pages.map((page) => page === currentPage ? <span className="is-current" aria-current="page" key={page}>{page}</span> : <Link href={getHref(page)} aria-label={tx(locale, `${page}페이지`, `Page ${page}`)} key={page}>{page}</Link>)}
    {control(currentPage + 1, tx(locale, "다음 페이지", "Next page"), <ChevronRight size={17} aria-hidden="true" />, currentPage === pageCount)}
    {control(pageCount, tx(locale, "마지막 페이지", "Last page"), <ChevronsRight size={17} aria-hidden="true" />, currentPage === pageCount)}
  </nav>;
}

export function NewsListPage({ locale, type, searchParams }: { locale: NewsLocale; type: NewsPostType; searchParams: Record<string, string> }) {
  const router = useRouter();
  const config = newsTypeConfigs[type];
  const appliedQuery = searchParams.q ?? searchParams.query ?? "";
  const requestedFilter = searchParams.category ?? searchParams.audience;
  const selectedFilter = requestedFilter && config.filters.some((filter) => filter.value === requestedFilter) ? requestedFilter : "all";
  const requestedPage = Math.max(1, Number.parseInt(searchParams.page ?? "1", 10) || 1);
  const [queryInput, setQueryInput] = useState(appliedQuery);

  useEffect(() => setQueryInput(appliedQuery), [appliedQuery]);

  const results = useMemo(() => {
    const selectedDefinition = config.filters.find((filter) => filter.value === selectedFilter);
    return searchPosts(getPostsByType(type), appliedQuery).filter((post) => matchesNewsFilter(post, selectedDefinition));
  }, [appliedQuery, config.filters, selectedFilter, type]);
  const pageCount = Math.max(1, Math.ceil(results.length / ITEMS_PER_PAGE));
  const currentPage = Math.min(requestedPage, pageCount);
  const visiblePosts = results.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const updateList = (query: string, category: string, page = 1) => router.replace(buildListPath(locale, type, query, category, page), { scroll: false });

  return <>
    <NewsPageHeader eyebrow={config.eyebrow} title={locale === "ko" ? config.titleKo : config.titleEn} description={locale === "ko" ? config.descriptionKo : config.descriptionEn} />
    <section className="section content-section news-system-page"><div className="container">
      <div className="news-system-toolbar">
        <NewsFilters locale={locale} filters={config.filters} selected={selectedFilter} onSelect={(value) => updateList(appliedQuery, value)} />
        <NewsSearch locale={locale} value={queryInput} appliedQuery={appliedQuery} onChange={setQueryInput} onSubmit={(event) => { event.preventDefault(); updateList(queryInput, selectedFilter); }} onReset={() => { setQueryInput(""); updateList("", selectedFilter); }} />
      </div>
      <div className="news-system-result-summary" role="status" aria-live="polite"><strong>{results.length}</strong> {tx(locale, "개 게시글", "posts")}{appliedQuery && <span> · “{appliedQuery}”</span>}</div>
      <NewsList posts={visiblePosts} locale={locale} query={appliedQuery} />
      <Pagination locale={locale} currentPage={currentPage} pageCount={pageCount} getHref={(page) => buildListPath(locale, type, appliedQuery, selectedFilter, page)} />
    </div></section>
  </>;
}

export function PostHeader({ post, locale }: { post: NewsPost; locale: NewsLocale }) {
  const config = newsTypeConfigs[post.type];
  const location = getLocalizedOptionalText(post.location, locale);
  const recruitmentField = getLocalizedOptionalText(post.recruitmentField, locale);
  return <header className="page-header news-post-header"><div className="container page-header-inner">
    <p className="section-label light">{config.eyebrow} · {getNewsCategoryLabel(post.category, locale)}</p>
    <h1>{getLocalizedPostTitle(post, locale)}</h1>
    <div className="news-post-dates"><span>{tx(locale, "게시일", "Published")} <time dateTime={post.publishedAt}>{formatDate(post.publishedAt, locale)}</time></span>{post.updatedAt && <span>{tx(locale, "수정일", "Updated")} <time dateTime={post.updatedAt}>{formatDate(post.updatedAt, locale)}</time></span>}{post.isDemo && <strong>{tx(locale, "샘플 게시글", "Sample post")}</strong>}</div>
    {(post.type === "event" || post.type === "faculty-recruitment") && <dl className="news-post-special-meta">
      {post.type === "event" && <><div><dt>{tx(locale, "행사일", "Event date")}</dt><dd>{post.eventDate ? `${formatDate(post.eventDate, locale)}${post.eventEndDate ? ` – ${formatDate(post.eventEndDate, locale)}` : ""}` : tx(locale, "확인 필요", "To be confirmed")}</dd></div><div><dt>{tx(locale, "시간", "Time")}</dt><dd>{post.eventTime ?? tx(locale, "확인 필요", "To be confirmed")}</dd></div><div><dt>{tx(locale, "장소", "Location")}</dt><dd>{location ?? tx(locale, "확인 필요", "To be confirmed")}</dd></div></>}
      {post.type === "faculty-recruitment" && <><div><dt>{tx(locale, "모집 분야", "Recruitment field")}</dt><dd>{recruitmentField ?? tx(locale, "확인 필요", "To be confirmed")}</dd></div><div><dt>{tx(locale, "접수 기간", "Application period")}</dt><dd>{post.applicationPeriod ?? tx(locale, "확인 필요", "To be confirmed")}</dd></div></>}
    </dl>}
  </div></header>;
}

export function PostBody({ post, locale }: { post: NewsPost; locale: NewsLocale }) {
  return <section className="news-post-body" aria-labelledby="news-post-body-title"><h2 id="news-post-body-title" className="sr-only">{tx(locale, "본문", "Post content")}</h2>{post.isDemo && <aside><strong>{tx(locale, "샘플 콘텐츠", "Sample content")}</strong><p>{tx(locale, "이 게시글은 화면 확인용 샘플이며 실제 학부 공지가 아닙니다.", "This post is a display sample and is not an official department notice.")}</p></aside>}{getLocalizedPostContent(post, locale).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{post.externalUrl && <a className="news-post-external-link" href={post.externalUrl} target="_blank" rel="noopener noreferrer">{tx(locale, "외부 페이지에서 보기", "View external page")}<ExternalLink size={16} aria-hidden="true" /></a>}</section>;
}

export function AttachmentList({ post, locale }: { post: NewsPost; locale: NewsLocale }) {
  if (!post.attachments.length) return null;
  return <section className="news-attachment-list" aria-labelledby="news-attachment-title"><h2 id="news-attachment-title">{tx(locale, "첨부파일", "Attachments")}</h2>{post.attachments.map((attachment) => <a href={attachment.url} key={`${attachment.name}-${attachment.url}`}><Download size={17} aria-hidden="true" /><span>{attachment.name}</span>{attachment.size && <small>{attachment.size}</small>}</a>)}</section>;
}

export function PreviousNextPosts({ post, locale }: { post: NewsPost; locale: NewsLocale }) {
  const { previous, next } = getPreviousAndNextPosts(post);
  if (!previous && !next) return null;
  return <nav className="news-previous-next" aria-label={tx(locale, "이전 글과 다음 글", "Previous and next posts")}>
    {previous ? <Link href={getNewsPostPath(locale, previous)}><ChevronLeft size={18} aria-hidden="true" /><span><small>{tx(locale, "이전 글", "Previous")}</small>{getLocalizedPostTitle(previous, locale)}</span></Link> : <span />}
    {next ? <Link href={getNewsPostPath(locale, next)}><span><small>{tx(locale, "다음 글", "Next")}</small>{getLocalizedPostTitle(next, locale)}</span><ChevronRight size={18} aria-hidden="true" /></Link> : <span />}
  </nav>;
}

export function NewsDetailPage({ locale, type, slug }: { locale: NewsLocale; type: NewsPostType; slug: string }) {
  const post = getPostBySlug(type, slug);
  if (!post) return null;
  return <>
    <PostHeader post={post} locale={locale} />
    <section className="section content-section news-detail-page"><article className="container news-detail-article">
      <PostBody post={post} locale={locale} />
      <AttachmentList post={post} locale={locale} />
      <PreviousNextPosts post={post} locale={locale} />
      <Link className="button outline news-back-to-list" href={`/${locale}${getNewsTypePath(type)}`}><ArrowLeft size={17} aria-hidden="true" />{tx(locale, "목록으로 돌아가기", "Back to list")}</Link>
    </article></section>
  </>;
}
