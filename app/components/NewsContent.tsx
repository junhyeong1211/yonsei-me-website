"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ChevronLeft, ChevronRight, Download, ExternalLink, Paperclip, Search } from "lucide-react";
import { useMemo, useState } from "react";
import type { Locale } from "../data/content";
import type { EditorialContentType, EditorialPost } from "../data/editorialContent";
import { matchesEditorialQuery, sortEditorialPosts } from "../data/editorialContent";
import { newsCategories, newsPosts, type NewsCategoryKey } from "../data/news";

const PAGE_SIZE = 5;

const text = (value: { ko: string; en: string }, locale: Locale) => value[locale];
const copy = (locale: Locale, ko: string, en: string) => locale === "ko" ? ko : en;
const localizedPath = (locale: Locale, path: string) => `/${locale}${path}`;
const hasAttachment = (post: EditorialPost) => post.hasAttachment ?? post.attachments.length > 0;
const dateLabel = (date: string, locale: Locale) => {
  const [year, month, day] = date.split("-").map(Number);
  return locale === "ko"
    ? `${year}.${String(month).padStart(2, "0")}.${String(day).padStart(2, "0")}`
    : new Intl.DateTimeFormat("en", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" }).format(new Date(Date.UTC(year, month - 1, day)));
};

const sectionSettings: Record<EditorialContentType, { eyebrow: string; title: { ko: string; en: string }; description: { ko: string; en: string }; basePath: string }> = {
  news: {
    eyebrow: "NEWS",
    title: { ko: "뉴스", en: "News" },
    description: { ko: "기계공학부의 연구성과, 수상, 국제교류와 학부 소식을 전합니다.", en: "Read department news on research, awards, international exchange, and community activities." },
    basePath: "/news",
  },
  seminar: {
    eyebrow: "SEMINARS",
    title: { ko: "세미나", en: "Seminars" },
    description: { ko: "기계공학부에서 열리는 세미나와 초청 강연 소식을 확인하세요.", en: "Find seminars and invited lectures hosted by the department." },
    basePath: "/seminars",
  },
  event: {
    eyebrow: "EVENTS",
    title: { ko: "행사", en: "Events" },
    description: { ko: "기계공학부의 학술·교육 행사 일정을 안내합니다.", en: "Find academic and educational events from the department." },
    basePath: "/events",
  },
};

function EditorialPageHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <header className="page-header"><div className="container page-header-inner"><p className="section-label light">{eyebrow}</p><h1>{title}</h1><p>{description}</p></div></header>;
}

function Pagination({ page, totalPages, onChange, locale }: { page: number; totalPages: number; onChange: (page: number) => void; locale: Locale }) {
  if (totalPages <= 1) return null;
  return (
    <nav className="pagination" aria-label={copy(locale, "페이지", "Pagination")}>
      <button type="button" disabled={page === 1} onClick={() => onChange(page - 1)} aria-label={copy(locale, "이전 페이지", "Previous page")}><ChevronLeft size={18} /></button>
      {Array.from({ length: totalPages }, (_, index) => index + 1).map((number) => <button type="button" key={number} aria-current={page === number ? "page" : undefined} onClick={() => onChange(number)}>{number}</button>)}
      <button type="button" disabled={page === totalPages} onClick={() => onChange(page + 1)} aria-label={copy(locale, "다음 페이지", "Next page")}><ChevronRight size={18} /></button>
    </nav>
  );
}

export function NewsDirectoryPage({ locale, searchParams }: { locale: Locale; searchParams: Record<string, string> }) {
  const initialCategory = newsCategories.some((item) => item.key === searchParams.category) ? searchParams.category as NewsCategoryKey : "all";
  const [category, setCategory] = useState<NewsCategoryKey>(initialCategory);
  const [query, setQuery] = useState(searchParams.q ?? "");
  const [page, setPage] = useState(1);
  const filteredPosts = useMemo(() => sortEditorialPosts(newsPosts).filter((post) => (category === "all" || post.categoryKey === category) && matchesEditorialQuery(post, query)), [category, query]);
  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / PAGE_SIZE));
  const visiblePosts = filteredPosts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const selectCategory = (nextCategory: NewsCategoryKey) => {
    setCategory(nextCategory);
    setPage(1);
  };

  return (
    <>
      <EditorialPageHeader eyebrow="NEWS" title={copy(locale, "뉴스", "News")} description={sectionSettings.news.description[locale]} />
      <section className="section editorial-directory-section">
        <div className="container editorial-directory-container">
          <div className="editorial-toolbar">
            <div className="editorial-category-tabs" role="tablist" aria-label={copy(locale, "뉴스 분류", "News categories")}>
              {newsCategories.map((item) => <button type="button" role="tab" aria-selected={category === item.key} key={item.key} onClick={() => selectCategory(item.key)}>{text(item.label, locale)}</button>)}
            </div>
            <label className="editorial-search"><span className="sr-only">{copy(locale, "뉴스 검색", "Search news")}</span><Search size={18} aria-hidden="true" /><input value={query} onChange={(event) => { setQuery(event.target.value); setPage(1); }} placeholder={copy(locale, "제목과 본문 검색", "Search title and content")} /></label>
          </div>
          <p className="editorial-result-count"><strong>{filteredPosts.length}</strong>{copy(locale, "건", " posts")}</p>
          <div className="news-editorial-list">
            {visiblePosts.map((post, index) => (
              <article className="news-editorial-item" key={post.id}>
                <span className="news-editorial-number">{String(filteredPosts.length - ((page - 1) * PAGE_SIZE + index)).padStart(2, "0")}</span>
                <Link className="news-editorial-thumbnail" href={localizedPath(locale, `/news/${post.slug}`)} aria-label={text(post.title, locale)}>
                  {post.thumbnail ? <Image src={post.thumbnail} alt="" fill sizes="(max-width: 680px) 100vw, 260px" /> : <span>NEWS</span>}
                </Link>
                <div className="news-editorial-content">
                  <div className="news-editorial-meta"><span>{text(post.category, locale)}</span>{hasAttachment(post) && <Paperclip size={15} aria-label={copy(locale, "첨부파일 있음", "Attachment available")} />}</div>
                  <h2><Link href={localizedPath(locale, `/news/${post.slug}`)}>{text(post.title, locale)}</Link></h2>
                  {post.summary && <p>{text(post.summary, locale)}</p>}
                  <time dateTime={post.publishedAt}>{dateLabel(post.publishedAt, locale)}</time>
                </div>
              </article>
            ))}
          </div>
          {!visiblePosts.length && <p className="editorial-empty">{copy(locale, "검색 결과가 없습니다.", "No results found.")}</p>}
          <Pagination page={page} totalPages={totalPages} onChange={setPage} locale={locale} />
        </div>
      </section>
    </>
  );
}

export function EditorialBoardPage({ locale, searchParams, posts, type }: { locale: Locale; searchParams: Record<string, string>; posts: EditorialPost[]; type: "seminar" | "event" }) {
  const settings = sectionSettings[type];
  const [query, setQuery] = useState(searchParams.q ?? "");
  const [page, setPage] = useState(1);
  const filteredPosts = useMemo(() => sortEditorialPosts(posts).filter((post) => matchesEditorialQuery(post, query)), [posts, query]);
  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / PAGE_SIZE));
  const visiblePosts = filteredPosts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <>
      <EditorialPageHeader eyebrow={settings.eyebrow} title={settings.title[locale]} description={settings.description[locale]} />
      <section className="section editorial-directory-section">
        <div className="container editorial-directory-container">
          <div className="editorial-board-toolbar">
            <p><strong>{filteredPosts.length}</strong>{copy(locale, "건", " posts")}</p>
            <label className="editorial-search"><span className="sr-only">{copy(locale, `${settings.title.ko} 검색`, `Search ${settings.title.en.toLowerCase()}`)}</span><Search size={18} aria-hidden="true" /><input value={query} onChange={(event) => { setQuery(event.target.value); setPage(1); }} placeholder={copy(locale, "제목·작성자 검색", "Search title or author")} /></label>
          </div>
          <div className="editorial-board" role="table" aria-label={settings.title[locale]}>
            <div className="editorial-board-head" role="row"><span role="columnheader">{copy(locale, "번호", "No.")}</span><span role="columnheader">{copy(locale, "제목", "Title")}</span><span role="columnheader">{copy(locale, "첨부", "File")}</span><span role="columnheader">{copy(locale, "작성자", "Author")}</span><span role="columnheader">{copy(locale, "등록일", "Date")}</span></div>
            {visiblePosts.map((post, index) => (
              <Link className="editorial-board-row" role="row" href={localizedPath(locale, `${settings.basePath}/${post.slug}`)} key={post.id} aria-label={text(post.title, locale)}>
                <span className="editorial-board-number" role="cell">{post.number ?? filteredPosts.length - ((page - 1) * PAGE_SIZE + index)}</span>
                <strong role="cell">{post.isNew && <span className="editorial-new-badge" aria-label={copy(locale, "새 글", "New post")}>N</span>}{text(post.title, locale)}</strong>
                <span className="editorial-board-file" role="cell">{hasAttachment(post) ? <Paperclip size={15} aria-label={copy(locale, "첨부파일 있음", "Attachment available")} /> : "-"}</span>
                <span role="cell">{post.author ? text(post.author, locale) : copy(locale, "확인 중", "Pending")}</span>
                <time role="cell" dateTime={post.publishedAt}>{dateLabel(post.publishedAt, locale)}</time>
              </Link>
            ))}
          </div>
          {!visiblePosts.length && <p className="editorial-empty">{copy(locale, "검색 결과가 없습니다.", "No results found.")}</p>}
          <Pagination page={page} totalPages={totalPages} onChange={setPage} locale={locale} />
        </div>
      </section>
    </>
  );
}

export function ProgramsDirectoryPage({ locale, searchParams, posts }: { locale: Locale; searchParams: Record<string, string>; posts: EditorialPost[] }) {
  const router = useRouter();
  const initialType = searchParams.type === "seminar" || searchParams.type === "event" ? searchParams.type : "all";
  const [selectedType, setSelectedType] = useState<"all" | "seminar" | "event">(initialType);
  const [query, setQuery] = useState(searchParams.q ?? "");
  const [page, setPage] = useState(1);
  const filteredPosts = useMemo(() => sortEditorialPosts(posts).filter((post) => {
    const searchable = `${post.title.ko} ${post.title.en} ${post.author?.ko ?? ""} ${post.author?.en ?? ""}`.toLowerCase();
    return (selectedType === "all" || post.type === selectedType) && searchable.includes(query.trim().toLowerCase());
  }), [posts, query, selectedType]);
  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / PAGE_SIZE));
  const visiblePosts = filteredPosts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const selectType = (nextType: "all" | "seminar" | "event") => {
    setSelectedType(nextType); setPage(1);
    const params = new URLSearchParams();
    if (nextType !== "all") params.set("type", nextType);
    if (query.trim()) params.set("q", query.trim());
    router.replace(`${localizedPath(locale, "/news/programs")}${params.size ? `?${params.toString()}` : ""}`);
  };
  return <><EditorialPageHeader eyebrow="SEMINARS & EVENTS" title={copy(locale, "세미나·행사", "Seminars & Events")} description={copy(locale, "기계공학부의 세미나와 주요 행사를 안내합니다.", "Find seminars and major department events.")} /><section className="section editorial-directory-section"><div className="container editorial-directory-container"><div className="editorial-toolbar"><div className="editorial-category-tabs" role="tablist" aria-label={copy(locale, "세미나·행사 분류", "Seminars and events categories")}>{(["all", "seminar", "event"] as const).map((type) => <button type="button" role="tab" aria-selected={selectedType === type} key={type} onClick={() => selectType(type)}>{type === "all" ? copy(locale, "전체", "All") : type === "seminar" ? copy(locale, "세미나", "Seminars") : copy(locale, "행사", "Events")}</button>)}</div><label className="editorial-search"><span className="sr-only">{copy(locale, "세미나·행사 검색", "Search seminars and events")}</span><Search size={18} aria-hidden="true" /><input value={query} onChange={(event) => { setQuery(event.target.value); setPage(1); }} placeholder={copy(locale, "제목·작성자 검색", "Search title or author")} /></label></div><p className="editorial-result-count"><strong>{filteredPosts.length}</strong>{copy(locale, "건", " posts")}</p><div className="editorial-board" role="table" aria-label={copy(locale, "세미나·행사 목록", "Seminars and events list")}><div className="editorial-board-head" role="row"><span role="columnheader">{copy(locale, "번호", "No.")}</span><span role="columnheader">{copy(locale, "제목", "Title")}</span><span role="columnheader">{copy(locale, "첨부", "File")}</span><span role="columnheader">{copy(locale, "작성자", "Author")}</span><span role="columnheader">{copy(locale, "등록일", "Date")}</span></div>{visiblePosts.map((post, index) => <Link className="editorial-board-row" role="row" href={localizedPath(locale, `/news/programs/${post.slug}`)} key={post.id}><span className="editorial-board-number" role="cell">{post.number ?? filteredPosts.length - ((page - 1) * PAGE_SIZE + index)}</span><strong role="cell"><small className="editorial-program-type">{post.type === "seminar" ? copy(locale, "세미나", "Seminar") : copy(locale, "행사", "Event")}</small>{post.isNew && <span className="editorial-new-badge">N</span>}{text(post.title, locale)}</strong><span className="editorial-board-file" role="cell">{hasAttachment(post) ? <Paperclip size={15} aria-label={copy(locale, "첨부파일 있음", "Attachment available")} /> : "-"}</span><span role="cell">{post.author ? text(post.author, locale) : copy(locale, "확인 중", "Pending")}</span><time role="cell" dateTime={post.publishedAt}>{dateLabel(post.publishedAt, locale)}</time></Link>)}</div>{!visiblePosts.length && <p className="editorial-empty">{copy(locale, "검색 결과가 없습니다.", "No results found.")}</p>}<Pagination page={page} totalPages={totalPages} onChange={setPage} locale={locale} /></div></section></>;
}

export function EditorialDetailPage({ locale, post, posts }: { locale: Locale; post: EditorialPost; posts: EditorialPost[] }) {
  const settings = sectionSettings[post.type];
  const basePath = post.type === "news" ? settings.basePath : "/news/programs";
  const orderedPosts = sortEditorialPosts(posts);
  const index = orderedPosts.findIndex((item) => item.id === post.id);
  const previous = orderedPosts[index - 1];
  const next = orderedPosts[index + 1];
  const hasBody = Boolean(post.summary || post.content);

  return (
    <>
      <EditorialPageHeader eyebrow={settings.eyebrow} title={text(post.title, locale)} description={`${text(post.category, locale)} · ${dateLabel(post.publishedAt, locale)}`} />
      <section className="section content-section editorial-detail-page">
        <article className="container article-detail editorial-article-detail">
          <dl className="editorial-detail-meta">
            <div><dt>{copy(locale, "카테고리", "Category")}</dt><dd>{text(post.category, locale)}</dd></div>
            <div><dt>{copy(locale, "작성자", "Author")}</dt><dd>{post.author ? text(post.author, locale) : copy(locale, "확인 중", "Pending")}</dd></div>
            <div><dt>{copy(locale, "등록일", "Published")}</dt><dd><time dateTime={post.publishedAt}>{dateLabel(post.publishedAt, locale)}</time></dd></div>
            {post.researchDate && <div><dt>{copy(locale, "연구일", "Research date")}</dt><dd><time dateTime={post.researchDate}>{dateLabel(post.researchDate, locale)}</time></dd></div>}
            <div><dt>{copy(locale, "첨부", "Attachment")}</dt><dd>{hasAttachment(post) ? copy(locale, "첨부파일 있음", "Attachment available") : copy(locale, "없음", "None")}</dd></div>
            {post.eventDate && <div><dt>{copy(locale, "일정", "Event date")}</dt><dd><time dateTime={post.eventDate}>{dateLabel(post.eventDate, locale)}</time></dd></div>}
          </dl>
          {hasBody && <div className="article-body editorial-article-body">{post.summary && <p>{text(post.summary, locale)}</p>}{post.content && <p>{text(post.content, locale)}</p>}</div>}
          {post.attachments.length > 0 && <section className="editorial-detail-resources" aria-labelledby="editorial-attachments-title">
            <h2 id="editorial-attachments-title">{copy(locale, "첨부파일", "Attachments")}</h2>
            {post.attachments.map((attachment) => <a href={attachment.url} key={attachment.id} download><Download size={17} aria-hidden="true" />{text(attachment.name, locale)}</a>)}
          </section>}
          {(post.sourceUrl || post.paperUrl) && <div className="editorial-external-actions">
            {post.sourceUrl && <a className="button outline editorial-original-post-link" href={post.sourceUrl} target="_blank" rel="noopener noreferrer" aria-label={copy(locale, `${text(post.title, locale)} 공식 게시글 보기, 새 탭에서 열림`, `View original post: ${text(post.title, locale)}, opens in a new tab`)}>{copy(locale, "공식 게시글 보기", "View Original Post")}<ExternalLink size={16} aria-hidden="true" /></a>}
            {post.paperUrl && <a className="button outline editorial-related-paper-link" href={post.paperUrl} target="_blank" rel="noopener noreferrer" aria-label={copy(locale, `${text(post.title, locale)} 관련 논문 보기, 새 탭에서 열림`, `View related paper: ${text(post.title, locale)}, opens in a new tab`)}>{copy(locale, "관련 논문 보기", "View Related Paper")}<ExternalLink size={16} aria-hidden="true" /></a>}
          </div>}
          {post.externalLinks.length > 0 && <section className="editorial-detail-resources" aria-labelledby="editorial-links-title">
            <h2 id="editorial-links-title">{copy(locale, "관련 외부 링크", "Related links")}</h2>
            {post.externalLinks.map((link) => <a href={link.url} target="_blank" rel="noopener noreferrer" key={link.id} aria-label={copy(locale, `${text(link.label, locale)} 새 탭에서 열기`, `Open ${text(link.label, locale)} in a new tab`)}>{text(link.label, locale)}<ExternalLink size={16} aria-hidden="true" /><span className="sr-only">{copy(locale, " 새 창", " opens in a new window")}</span></a>)}
          </section>}
          <div className="article-navigation editorial-article-navigation">{previous ? <Link href={localizedPath(locale, `${basePath}/${previous.slug}`)}><ChevronLeft size={18} /><span><small>{copy(locale, "이전 글", "Previous")}</small>{text(previous.title, locale)}</span></Link> : <span />}{next ? <Link href={localizedPath(locale, `${basePath}/${next.slug}`)}><span><small>{copy(locale, "다음 글", "Next")}</small>{text(next.title, locale)}</span><ChevronRight size={18} /></Link> : <span />}</div>
          <Link className="button outline article-list-button" href={localizedPath(locale, basePath)}><ArrowLeft size={17} />{copy(locale, "목록으로 돌아가기", "Back to list")}</Link>
        </article>
      </section>
    </>
  );
}
