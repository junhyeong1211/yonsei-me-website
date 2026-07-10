"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { FormEvent, ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  Camera,
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  ExternalLink,
  FlaskConical,
  GraduationCap,
  Mail,
  MapPin,
  Menu,
  MessageSquareText,
  Phone,
  RotateCcw,
  Search,
  UserRound,
  X,
} from "lucide-react";
import {
  courses,
  events,
  faculty,
  heroImage,
  instagramPosts,
  labs,
  notices,
  researchAreas,
  type Course,
  type Faculty,
  type Lab,
  type Locale,
  type LocaleText,
  type Notice,
  type ResearchArea,
} from "../data/content";
import {
  getCourseBySlug,
  getCoursesForArea,
  getFacultyBySlug,
  getFacultyForArea,
  getLabBySlug,
  getLabsForArea,
  getNoticeBySlug,
  getResearchAreaBySlug,
} from "../lib/content";

type DepartmentSiteProps = {
  locale: Locale;
  segments: string[];
  searchParams: Record<string, string>;
};

type NavItem = {
  key: string;
  label: LocaleText;
  path: string;
  children: { label: LocaleText; path: string }[];
};

const t = (value: LocaleText, locale: Locale) => value[locale];
const tx = (locale: Locale, ko: string, en: string) => (locale === "ko" ? ko : en);
const hrefFor = (locale: Locale, path = "") => `/${locale}${path}`;

const navigation: NavItem[] = [
  {
    key: "about",
    label: { ko: "학부소개", en: "About" },
    path: "/about",
    children: [
      ["학부 소개", "About the Department", "/about"],
      ["학부장 인사말", "Chair's Message", "/about/greeting"],
      ["비전 및 교육목표", "Vision & Objectives", "/about/vision"],
      ["연혁", "History", "/about/history"],
      ["조직 및 연락처", "Organization & Contact", "/about/contact"],
      ["오시는 길", "Directions", "/about/directions"],
    ].map(([ko, en, path]) => ({ label: { ko, en }, path })),
  },
  {
    key: "faculty",
    label: { ko: "교수진", en: "People" },
    path: "/faculty",
    children: [
      ["전체 교수진", "All Faculty", "/faculty"],
      ["연구분야별 교수진", "Faculty by Area", "/faculty?view=area"],
      ["연구실", "Laboratories", "/labs"],
      ["명예교수", "Emeritus Faculty", "/faculty/emeritus"],
      ["교직원", "Staff", "/faculty/staff"],
    ].map(([ko, en, path]) => ({ label: { ko, en }, path })),
  },
  {
    key: "research",
    label: { ko: "연구분야", en: "Research" },
    path: "/research",
    children: [
      ["연구분야 전체", "All Research Areas", "/research"],
      ...researchAreas.map((area) => [
        `${area.number} ${area.name.ko}`,
        `${area.number} ${area.name.en}`,
        `/research/${area.slug}`,
      ]),
      ["연구성과", "Research Outcomes", "/research/outcomes"],
      ["연구시설", "Research Facilities", "/research/facilities"],
    ].map(([ko, en, path]) => ({ label: { ko, en }, path })),
  },
  {
    key: "academics",
    label: { ko: "교육과정", en: "Academics" },
    path: "/academics",
    children: [
      ["학부과정", "Undergraduate", "/academics/undergraduate"],
      ["학부 교과목", "Undergraduate Courses", "/academics/courses?program=undergraduate"],
      ["대학원과정", "Graduate", "/academics/graduate"],
      ["대학원 교과목", "Graduate Courses", "/academics/courses?program=graduate"],
      ["졸업요건", "Graduation Requirements", "/academics/requirements"],
      ["교과과정 체계도", "Curriculum Map", "/academics/curriculum-map"],
    ].map(([ko, en, path]) => ({ label: { ko, en }, path })),
  },
  {
    key: "news",
    label: { ko: "학과소식", en: "News" },
    path: "/news/notices",
    children: [
      ["학부공지", "Undergraduate Notices", "/news/notices?audience=undergraduate"],
      ["대학원공지", "Graduate Notices", "/news/notices?audience=graduate"],
      ["학부 뉴스", "Department News", "/news/department"],
      ["연구 뉴스", "Research News", "/news/research"],
      ["세미나", "Seminars", "/news/seminars"],
      ["행사", "Events", "/news/events"],
      ["학사일정", "Academic Calendar", "/news/calendar"],
      ["채용정보", "Careers", "/news/careers"],
    ].map(([ko, en, path]) => ({ label: { ko, en }, path })),
  },
  {
    key: "admission",
    label: { ko: "입학·홍보", en: "Admissions" },
    path: "/admission/undergraduate",
    children: [
      ["학부 입학", "Undergraduate Admission", "/admission/undergraduate"],
      ["대학원 입학", "Graduate Admission", "/admission/graduate"],
      ["학부 홍보", "Department Brochure", "/promotion/department"],
      ["학생 활동", "Student Activities", "/promotion/students"],
      ["Instagram", "Instagram", "/promotion/instagram"],
      ["문의하기", "Contact Us", "/promotion/contact"],
    ].map(([ko, en, path]) => ({ label: { ko, en }, path })),
  },
];

const quickLinks = [
  { ko: "학부공지", en: "Notices", path: "/news/notices?audience=undergraduate", icon: MessageSquareText },
  { ko: "학사일정", en: "Calendar", path: "/news/calendar", icon: CalendarDays },
  { ko: "교과과정", en: "Curriculum", path: "/academics/courses", icon: BookOpen },
  { ko: "대학원 입학", en: "Graduate Admission", path: "/admission/graduate", icon: GraduationCap },
  { ko: "채용정보", en: "Careers", path: "/news/careers", icon: BriefcaseBusiness },
  { ko: "오시는 길", en: "Directions", path: "/about/directions", icon: MapPin },
];

const routeLabels: Record<string, LocaleText> = {
  about: { ko: "학부소개", en: "About" },
  greeting: { ko: "학부장 인사말", en: "Chair's Message" },
  vision: { ko: "비전 및 교육목표", en: "Vision & Objectives" },
  history: { ko: "연혁", en: "History" },
  contact: { ko: "조직 및 연락처", en: "Organization & Contact" },
  directions: { ko: "오시는 길", en: "Directions" },
  faculty: { ko: "교수진", en: "Faculty" },
  labs: { ko: "연구실", en: "Laboratories" },
  research: { ko: "연구분야", en: "Research" },
  academics: { ko: "교육과정", en: "Academics" },
  undergraduate: { ko: "학부과정", en: "Undergraduate" },
  graduate: { ko: "대학원과정", en: "Graduate" },
  courses: { ko: "교과목", en: "Courses" },
  requirements: { ko: "졸업요건", en: "Requirements" },
  news: { ko: "학과소식", en: "News" },
  notices: { ko: "공지사항", en: "Notices" },
  events: { ko: "행사", en: "Events" },
  calendar: { ko: "학사일정", en: "Academic Calendar" },
  careers: { ko: "채용정보", en: "Careers" },
  admission: { ko: "입학", en: "Admissions" },
  promotion: { ko: "홍보", en: "Promotion" },
  instagram: { ko: "Instagram", en: "Instagram" },
  search: { ko: "통합검색", en: "Search" },
};

function ArrowLink({ children }: { children: ReactNode }) {
  return (
    <span className="arrow-link-icon" aria-hidden="true">
      {children}
      <ArrowRight size={17} strokeWidth={1.7} />
    </span>
  );
}

function Breadcrumb({ locale, segments }: { locale: Locale; segments: string[] }) {
  if (segments.length === 0) return null;

  return (
    <nav className="breadcrumb container" aria-label={tx(locale, "현재 위치", "Breadcrumb")}>
      <Link href={hrefFor(locale)}>{tx(locale, "홈", "Home")}</Link>
      {segments.map((segment, index) => {
        const path = `/${segments.slice(0, index + 1).join("/")}`;
        const area = researchAreas.find((item) => item.slug === segment);
        const person = faculty.find((item) => item.slug === segment);
        const course = courses.find((item) => item.slug === segment);
        const notice = notices.find((item) => item.slug === segment);
        const label = area
          ? t(area.name, locale)
          : person
            ? t(person.name, locale)
            : course
              ? t(course.name, locale)
              : notice
                ? t(notice.title, locale)
                : routeLabels[segment]
                  ? t(routeLabels[segment], locale)
                  : segment;
        const isLast = index === segments.length - 1;
        return (
          <span key={path} className={index > 1 && !isLast ? "breadcrumb-optional" : undefined}>
            <ChevronRight size={14} aria-hidden="true" />
            {isLast ? <span aria-current="page">{label}</span> : <Link href={hrefFor(locale, path)}>{label}</Link>}
          </span>
        );
      })}
    </nav>
  );
}

function PageHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <header className="page-header">
      <div className="container page-header-inner">
        <p className="section-label light">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </header>
  );
}

function SectionHeading({ label, title, link }: { label: string; title: string; link?: ReactNode }) {
  return (
    <div className="section-heading">
      <div>
        <p className="section-label">{label}</p>
        <h2>{title}</h2>
      </div>
      {link}
    </div>
  );
}

function FacultyCard({ item, locale }: { item: Faculty; locale: Locale }) {
  const areas = item.researchAreaIds
    .map((id) => researchAreas.find((area) => area.id === id))
    .filter((area): area is ResearchArea => Boolean(area));
  const lab = labs.find((entry) => entry.id === item.labId);

  return (
    <Link href={hrefFor(locale, `/faculty/${item.slug}`)} className="faculty-card">
      <div className="faculty-image" aria-hidden="true">
        <UserRound size={54} strokeWidth={1} />
        <span>{tx(locale, "교수 사진", "Faculty photo")}</span>
      </div>
      <div className="faculty-card-body">
        <p className="faculty-position">{t(item.position, locale)}</p>
        <h3>{t(item.name, locale)}</h3>
        <p>{areas.map((area) => t(area.name, locale)).join(" · ")}</p>
        <span className="faculty-lab">{lab ? t(lab.name, locale) : tx(locale, "[연구실 확인 필요]", "[Lab required]")}</span>
        <ArrowRight className="card-arrow" size={19} aria-hidden="true" />
      </div>
    </Link>
  );
}

function ResearchCard({ area, locale }: { area: ResearchArea; locale: Locale }) {
  return (
    <Link href={hrefFor(locale, `/research/${area.slug}`)} className="research-card">
      <span className="research-number">{area.number}</span>
      <h3>{t(area.name, locale)}</h3>
      <p className="research-en">{locale === "ko" ? area.name.en : area.name.ko}</p>
      <p>{t(area.shortDescription, locale)}</p>
      <ArrowRight size={20} aria-hidden="true" />
    </Link>
  );
}

function EmptyState({ locale }: { locale: Locale }) {
  return (
    <div className="empty-state">
      <Search size={26} aria-hidden="true" />
      <h3>{tx(locale, "검색 결과가 없습니다", "No results found")}</h3>
      <p>{tx(locale, "검색어나 필터 조건을 다시 확인해 주세요.", "Try changing your query or filters.")}</p>
    </div>
  );
}

function SiteHeader({
  locale,
  segments,
  openMenu,
  setOpenMenu,
  mobileOpen,
  setMobileOpen,
  mobileSection,
  setMobileSection,
  searchOpen,
  setSearchOpen,
}: {
  locale: Locale;
  segments: string[];
  openMenu: string | null;
  setOpenMenu: (value: string | null) => void;
  mobileOpen: boolean;
  setMobileOpen: (value: boolean) => void;
  mobileSection: string | null;
  setMobileSection: (value: string | null) => void;
  searchOpen: boolean;
  setSearchOpen: (value: boolean) => void;
}) {
  const currentTop = segments[0] ?? "";
  const languagePath = `/${locale === "ko" ? "en" : "ko"}${segments.length ? `/${segments.join("/")}` : ""}`;

  return (
    <>
      <a className="skip-link" href="#main-content">
        {tx(locale, "본문 바로가기", "Skip to content")}
      </a>
      <aside className="top-notice" aria-label={tx(locale, "주요 공지", "Important notice")}>
        <div className="container top-notice-inner">
          <span className="top-notice-tag">NOTICE</span>
          <Link href={hrefFor(locale, "/news/notices/notice-01")}>
            {tx(locale, "[중요 학부공지 제목 입력 예정]", "[Important undergraduate notice]")}
          </Link>
          <time dateTime="2026-07-08">2026.07.08</time>
        </div>
      </aside>
      <header className="site-header">
        <div className="container header-row">
          <Link href={hrefFor(locale)} className="brand" aria-label={tx(locale, "연세대학교 기계공학부 홈", "Mechanical Engineering home")}>
            <span className="brand-mark" aria-hidden="true">Y</span>
            <span className="brand-text">
              <strong>{tx(locale, "연세대학교 기계공학부", "Mechanical Engineering")}</strong>
              <small>YONSEI UNIVERSITY</small>
            </span>
          </Link>

          <nav className="desktop-nav" aria-label={tx(locale, "주요 메뉴", "Primary navigation")} onMouseLeave={() => setOpenMenu(null)}>
            {navigation.map((item) => {
              const active = currentTop === item.key || (item.key === "admission" && currentTop === "promotion");
              return (
                <div className="nav-item" key={item.key} onMouseEnter={() => setOpenMenu(item.key)}>
                  <button
                    type="button"
                    className={active ? "active" : undefined}
                    aria-expanded={openMenu === item.key}
                    aria-controls={`menu-${item.key}`}
                    onClick={() => setOpenMenu(item.key)}
                  >
                    {t(item.label, locale)}
                    <ChevronDown size={14} aria-hidden="true" />
                  </button>
                  {openMenu === item.key && (
                    <div className="nav-dropdown" id={`menu-${item.key}`}>
                      <div className="nav-dropdown-heading">
                        <span>{t(item.label, locale)}</span>
                        <Link href={hrefFor(locale, item.path)}>{tx(locale, "전체보기", "Overview")}</Link>
                      </div>
                      <div className="nav-dropdown-links">
                        {item.children.map((child) => (
                          <Link key={child.path} href={hrefFor(locale, child.path)} onClick={() => setOpenMenu(null)}>
                            {t(child.label, locale)}
                            <ArrowRight size={14} aria-hidden="true" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="header-tools">
            <Link href={languagePath} className="language-switch" lang={locale === "ko" ? "en" : "ko"}>
              {locale === "ko" ? "EN" : "KR"}
            </Link>
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" className="icon-button" aria-label="Instagram" title="Instagram">
              <Camera size={19} />
            </a>
            <button type="button" className="icon-button" aria-label={tx(locale, "검색 열기", "Open search")} title={tx(locale, "검색", "Search")} onClick={() => setSearchOpen(true)}>
              <Search size={20} />
            </button>
            <button type="button" className="icon-button mobile-menu-button" aria-label={tx(locale, "전체 메뉴 열기", "Open menu")} aria-expanded={mobileOpen} onClick={() => setMobileOpen(true)}>
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="mobile-menu" role="dialog" aria-modal="true" aria-label={tx(locale, "전체 메뉴", "Full menu")}>
          <div className="mobile-menu-top">
            <span>{tx(locale, "전체 메뉴", "Menu")}</span>
            <button type="button" className="icon-button inverse" aria-label={tx(locale, "전체 메뉴 닫기", "Close menu")} onClick={() => setMobileOpen(false)}>
              <X size={24} />
            </button>
          </div>
          <nav aria-label={tx(locale, "모바일 주요 메뉴", "Mobile navigation")}>
            {navigation.map((item) => (
              <div className="mobile-nav-group" key={item.key}>
                <button type="button" aria-expanded={mobileSection === item.key} onClick={() => setMobileSection(mobileSection === item.key ? null : item.key)}>
                  {t(item.label, locale)}
                  <ChevronDown size={18} />
                </button>
                {mobileSection === item.key && (
                  <div className="mobile-nav-links">
                    {item.children.map((child) => (
                      <Link href={hrefFor(locale, child.path)} key={child.path} onClick={() => setMobileOpen(false)}>
                        {t(child.label, locale)}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
          <div className="mobile-menu-footer">
            <Link href={languagePath}>{locale === "ko" ? "English" : "한국어"}</Link>
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">Instagram <ExternalLink size={14} /></a>
          </div>
        </div>
      )}

      {searchOpen && <SearchDialog locale={locale} onClose={() => setSearchOpen(false)} />}
    </>
  );
}

function SearchDialog({ locale, onClose }: { locale: Locale; onClose: () => void }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onClose();
    router.push(`${hrefFor(locale, "/search")}?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <div className="search-dialog" role="dialog" aria-modal="true" aria-labelledby="search-title">
      <button type="button" className="search-backdrop" aria-label={tx(locale, "검색 닫기", "Close search")} onClick={onClose} />
      <div className="search-panel">
        <div className="search-panel-top">
          <div>
            <p className="section-label">SEARCH</p>
            <h2 id="search-title">{tx(locale, "통합검색", "Search")}</h2>
          </div>
          <button type="button" className="icon-button" aria-label={tx(locale, "검색 닫기", "Close search")} onClick={onClose}><X size={24} /></button>
        </div>
        <form className="global-search-form" onSubmit={submit}>
          <label htmlFor="global-search">{tx(locale, "검색어", "Search query")}</label>
          <div>
            <Search size={23} aria-hidden="true" />
            <input id="global-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={tx(locale, "교수, 연구분야, 교과목, 공지 검색", "Search faculty, research, courses, notices")} autoFocus />
            <button type="submit" className="button primary">{tx(locale, "검색", "Search")}</button>
          </div>
        </form>
        <div className="search-suggestions">
          <span>{tx(locale, "추천", "Suggested")}</span>
          {["로보틱스", "교과목", "대학원 입학"].map((item) => <button type="button" key={item} onClick={() => setQuery(item)}>{item}</button>)}
        </div>
      </div>
    </div>
  );
}

function SiteFooter({ locale }: { locale: Locale }) {
  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <div className="footer-brand">
          <p className="footer-signature">YONSEI UNIVERSITY</p>
          <h2>{tx(locale, "연세대학교 기계공학부", "Department of Mechanical Engineering")}</h2>
          <address>
            <span><MapPin size={16} /> {tx(locale, "[공식 주소 확인 필요]", "[Official address required]")}</span>
            <span><Phone size={16} /> {tx(locale, "[전화번호 확인 필요]", "[Phone number required]")}</span>
            <span><Mail size={16} /> {tx(locale, "[공식 이메일 확인 필요]", "[Official email required]")}</span>
          </address>
        </div>
        <div className="footer-links">
          <div>
            <h3>{tx(locale, "학부 바로가기", "Department")}</h3>
            <Link href={hrefFor(locale, "/faculty")}>{tx(locale, "교수진", "Faculty")}</Link>
            <Link href={hrefFor(locale, "/research")}>{tx(locale, "연구분야", "Research")}</Link>
            <Link href={hrefFor(locale, "/academics/courses")}>{tx(locale, "교과목", "Courses")}</Link>
            <Link href={hrefFor(locale, "/about/directions")}>{tx(locale, "오시는 길", "Directions")}</Link>
          </div>
          <div>
            <h3>{tx(locale, "관련 사이트", "Related")}</h3>
            <a href="https://www.yonsei.ac.kr/" target="_blank" rel="noreferrer">{tx(locale, "연세대학교", "Yonsei University")} <ExternalLink size={12} /></a>
            <a href="https://engineering.yonsei.ac.kr/" target="_blank" rel="noreferrer">{tx(locale, "공과대학", "College of Engineering")} <ExternalLink size={12} /></a>
            <span>{tx(locale, "연세포탈", "Yonsei Portal")}</span>
            <span>{tx(locale, "증명서 발급", "Certificates")}</span>
          </div>
          <div>
            <h3>{tx(locale, "소셜·문의", "Connect")}</h3>
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">Instagram <ExternalLink size={12} /></a>
            <span>YouTube</span>
            <Link href={hrefFor(locale, "/promotion/contact")}>{tx(locale, "문의하기", "Contact Us")}</Link>
          </div>
        </div>
      </div>
      <div className="container footer-bottom">
        <div><Link href={hrefFor(locale, "/privacy")}>{tx(locale, "개인정보처리방침", "Privacy Policy")}</Link><Link href={hrefFor(locale, "/email-policy")}>{tx(locale, "이메일무단수집거부", "Email Policy")}</Link></div>
        <p>© YONSEI UNIVERSITY DEPARTMENT OF MECHANICAL ENGINEERING.</p>
      </div>
    </footer>
  );
}

function HomePage({ locale }: { locale: Locale }) {
  const [noticeTab, setNoticeTab] = useState<"undergraduate" | "graduate">("undergraduate");
  const filteredNotices = notices.filter((notice) => notice.audience === noticeTab).slice(0, 5);

  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        {/* The photo is replaceable from the data file without changing this component. */}
        <Image src={heroImage} alt={tx(locale, "기계공학 연구 환경", "Mechanical engineering research environment")} fill priority sizes="100vw" />
        <div className="hero-overlay" aria-hidden="true" />
        <div className="container hero-content">
          <p className="hero-kicker">MECHANICAL ENGINEERING · YONSEI UNIVERSITY</p>
          <h1 id="hero-title">{tx(locale, "기계의 원리를 넘어,\n미래의 움직임을 설계합니다", "Beyond mechanics,\nwe design how the future moves")}</h1>
          <p>{tx(locale, "기초 원리와 첨단 기술을 연결해 사람과 사회를 위한 새로운 기계 시스템을 탐구합니다.", "Connecting fundamental principles with advanced technology to shape mechanical systems for society.")}</p>
          <div className="hero-actions">
            <Link className="button light" href={hrefFor(locale, "/about")}>{tx(locale, "학부 소개", "About Us")}<ArrowRight size={17} /></Link>
            <Link className="text-button light" href={hrefFor(locale, "/admission/undergraduate")}>{tx(locale, "입학 안내", "Admissions")}<ArrowRight size={17} /></Link>
          </div>
        </div>
        <div className="hero-index" aria-hidden="true"><span>01</span><i /></div>
      </section>

      <nav className="quick-links" aria-label={tx(locale, "주요 바로가기", "Quick links")}>
        <div className="container quick-links-grid">
          {quickLinks.map((item) => {
            const Icon = item.icon;
            return <Link href={hrefFor(locale, item.path)} key={item.path}><Icon size={23} strokeWidth={1.5} /><span>{locale === "ko" ? item.ko : item.en}</span><ArrowRight size={16} /></Link>;
          })}
        </div>
      </nav>

      <section className="section news-calendar-section">
        <div className="container split-content">
          <div className="notice-preview">
            <SectionHeading label="NOTICE" title={tx(locale, "공지사항", "Notices")} link={<Link className="section-more" href={hrefFor(locale, "/news/notices")} aria-label={tx(locale, "공지사항 전체보기", "View all notices")}><ArrowRight size={21} /></Link>} />
            <div className="tabs" role="tablist" aria-label={tx(locale, "공지 구분", "Notice audience")}>
              <button type="button" role="tab" aria-selected={noticeTab === "undergraduate"} onClick={() => setNoticeTab("undergraduate")}>{tx(locale, "학부공지", "Undergraduate")}</button>
              <button type="button" role="tab" aria-selected={noticeTab === "graduate"} onClick={() => setNoticeTab("graduate")}>{tx(locale, "대학원공지", "Graduate")}</button>
            </div>
            <div className="notice-list">
              {filteredNotices.map((notice) => <NoticeRow key={notice.id} notice={notice} locale={locale} />)}
            </div>
          </div>
          <div className="calendar-preview">
            <SectionHeading label="ACADEMIC CALENDAR" title={tx(locale, "학사일정", "Academic Calendar")} link={<Link className="section-more" href={hrefFor(locale, "/news/calendar")} aria-label={tx(locale, "학사일정 전체보기", "View full calendar")}><ArrowRight size={21} /></Link>} />
            <div className="event-list compact">
              {events.slice(0, 4).map((event) => <EventRow key={event.id} event={event} locale={locale} />)}
            </div>
          </div>
        </div>
      </section>

      <section className="research-section section">
        <div className="container">
          <SectionHeading label="RESEARCH" title={tx(locale, "세상을 움직이는 여섯 가지 연구", "Six fields moving the world forward")} link={<Link className="text-button light" href={hrefFor(locale, "/labs")}>{tx(locale, "연구실 전체보기", "All laboratories")}<ArrowRight size={17} /></Link>} />
          <div className="research-grid">{researchAreas.map((area) => <ResearchCard key={area.id} area={area} locale={locale} />)}</div>
        </div>
      </section>

      <section className="section faculty-section">
        <div className="container">
          <SectionHeading label="FACULTY" title={tx(locale, "지식의 경계를 넓히는 교수진", "Faculty expanding the boundaries of knowledge")} link={<Link className="text-button" href={hrefFor(locale, "/faculty")}>{tx(locale, "전체 교수진", "View all faculty")}<ArrowRight size={17} /></Link>} />
          <div className="faculty-grid preview">{faculty.slice(0, 4).map((person) => <FacultyCard key={person.id} item={person} locale={locale} />)}</div>
        </div>
      </section>

      <section className="education-section section">
        <div className="container">
          <SectionHeading label="EDUCATION" title={tx(locale, "원리에서 혁신으로 이어지는 교육", "Education from principles to innovation")} />
          <div className="education-grid">
            <EducationPanel locale={locale} type="undergraduate" />
            <EducationPanel locale={locale} type="graduate" />
          </div>
        </div>
      </section>

      <section className="section instagram-section">
        <div className="container">
          <SectionHeading label="INSTAGRAM" title={tx(locale, "기계공학부의 오늘", "Inside Mechanical Engineering")} link={<a className="text-button" href="https://www.instagram.com/" target="_blank" rel="noreferrer">@YONSEI_ME<ExternalLink size={15} /></a>} />
          <div className="instagram-grid">
            {instagramPosts.map((post) => (
              <a className="instagram-card" href="https://www.instagram.com/" target="_blank" rel="noreferrer" key={post.id}>
                <div className="instagram-image"><Image src={post.image} alt="" fill sizes="(max-width: 680px) 44vw, (max-width: 940px) 50vw, 33vw" /><span><Camera size={23} /></span></div>
                <div><p>{t(post.caption, locale)}</p><time>{post.publishedAt}</time></div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function EducationPanel({ locale, type }: { locale: Locale; type: "undergraduate" | "graduate" }) {
  const undergraduate = type === "undergraduate";
  return (
    <article className="education-panel">
      <span className="education-number">{undergraduate ? "01" : "02"}</span>
      <p>{undergraduate ? "UNDERGRADUATE" : "GRADUATE"}</p>
      <h3>{undergraduate ? tx(locale, "학부 교육과정", "Undergraduate Program") : tx(locale, "대학원 교육과정", "Graduate Program")}</h3>
      <p className="education-description">{undergraduate ? tx(locale, "기계공학의 기초부터 설계와 실험까지 단계적으로 확장합니다.", "Build from mechanical fundamentals to design and experimentation.") : tx(locale, "전문 연구역량을 바탕으로 새로운 지식과 기술을 탐구합니다.", "Develop advanced research capabilities and create new knowledge.")}</p>
      <ul>
        <li>{tx(locale, "핵심 전공 역량", "Core competencies")}</li>
        <li>{tx(locale, "실험 및 설계", "Experimentation and design")}</li>
        <li>{tx(locale, "연구분야 연계", "Research-area pathways")}</li>
      </ul>
      <Link className="text-button" href={hrefFor(locale, undergraduate ? "/academics/undergraduate" : "/academics/graduate")}><ArrowLink>{undergraduate ? tx(locale, "교과과정 보기", "View curriculum") : tx(locale, "대학원 안내", "Graduate information")}</ArrowLink></Link>
    </article>
  );
}

function NoticeRow({ notice, locale }: { notice: Notice; locale: Locale }) {
  return (
    <Link className="notice-row" href={hrefFor(locale, `/news/notices/${notice.slug}`)}>
      <span className={`notice-category ${notice.isImportant ? "important" : ""}`}>{notice.isImportant ? tx(locale, "중요", "Important") : notice.category}</span>
      <strong>{t(notice.title, locale)}</strong>
      <time dateTime={notice.publishedAt}>{notice.publishedAt.replaceAll("-", ".")}</time>
    </Link>
  );
}

function EventRow({ event, locale }: { event: (typeof events)[number]; locale: Locale }) {
  const date = new Date(`${event.startDate}T00:00:00`);
  return (
    <div className="event-row">
      <div className="event-date"><span>{date.toLocaleString("en", { month: "short" }).toUpperCase()}</span><strong>{String(date.getDate()).padStart(2, "0")}</strong></div>
      <div><span>{event.category}</span><h3>{t(event.title, locale)}</h3></div>
    </div>
  );
}

function FacultyDirectory({ locale, searchParams }: { locale: Locale; searchParams: Record<string, string> }) {
  const router = useRouter();
  const [area, setArea] = useState(searchParams.area ?? "all");
  const [position, setPosition] = useState(searchParams.position ?? "all");
  const [query, setQuery] = useState(searchParams.query ?? "");

  const results = useMemo(() => faculty.filter((person) => {
    const searchable = `${person.name.ko} ${person.name.en} ${person.researchKeywords.ko.join(" ")} ${person.researchKeywords.en.join(" ")}`.toLowerCase();
    return (area === "all" || person.researchAreaIds.includes(area)) && (position === "all" || person.position.en === position) && (!query || searchable.includes(query.toLowerCase()));
  }), [area, position, query]);

  const syncUrl = (nextArea: string, nextPosition: string, nextQuery: string) => {
    const params = new URLSearchParams();
    if (nextArea !== "all") params.set("area", nextArea);
    if (nextPosition !== "all") params.set("position", nextPosition);
    if (nextQuery) params.set("query", nextQuery);
    router.replace(`${hrefFor(locale, "/faculty")}${params.size ? `?${params.toString()}` : ""}`);
  };

  const reset = () => { setArea("all"); setPosition("all"); setQuery(""); router.replace(hrefFor(locale, "/faculty")); };

  return (
    <>
      <PageHeader eyebrow="FACULTY" title={tx(locale, "교수진", "Faculty")} description={tx(locale, "연구분야와 키워드로 교수진과 연구실을 탐색합니다.", "Explore faculty and laboratories by research area and keyword.")} />
      <section className="section content-section">
        <div className="container">
          <div className="sample-data-note">{tx(locale, "현재 교수 정보는 레이아웃 검토용 샘플입니다.", "Faculty records shown here are sample data for layout review.")}</div>
          <form className="filter-bar" onSubmit={(event) => { event.preventDefault(); syncUrl(area, position, query); }}>
            <div className="filter-field search-field"><label htmlFor="faculty-query">{tx(locale, "이름 또는 연구 키워드", "Name or research keyword")}</label><div><Search size={18} /><input id="faculty-query" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={tx(locale, "예: 로보틱스, 제어", "e.g. robotics, control")} /></div></div>
            <div className="filter-field"><label htmlFor="faculty-area">{tx(locale, "연구분야", "Research area")}</label><select id="faculty-area" value={area} onChange={(event) => { setArea(event.target.value); syncUrl(event.target.value, position, query); }}><option value="all">{tx(locale, "전체", "All")}</option>{researchAreas.map((item) => <option key={item.id} value={item.id}>{t(item.name, locale)}</option>)}</select></div>
            <div className="filter-field"><label htmlFor="faculty-position">{tx(locale, "직위", "Position")}</label><select id="faculty-position" value={position} onChange={(event) => { setPosition(event.target.value); syncUrl(area, event.target.value, query); }}><option value="all">{tx(locale, "전체", "All")}</option><option value="Professor">{tx(locale, "교수", "Professor")}</option><option value="Associate Professor">{tx(locale, "부교수", "Associate Professor")}</option><option value="Assistant Professor">{tx(locale, "조교수", "Assistant Professor")}</option></select></div>
            <button className="button primary filter-submit" type="submit"><Search size={17} />{tx(locale, "검색", "Search")}</button>
            <button className="icon-button filter-reset" type="button" onClick={reset} aria-label={tx(locale, "필터 초기화", "Reset filters")} title={tx(locale, "초기화", "Reset")}><RotateCcw size={19} /></button>
          </form>
          <div className="results-heading"><p><strong>{results.length}</strong> {tx(locale, "명의 교수진", "faculty members")}</p><span>{tx(locale, "이름순", "By name")}</span></div>
          {results.length ? <div className="faculty-grid directory">{results.map((person) => <FacultyCard key={person.id} item={person} locale={locale} />)}</div> : <EmptyState locale={locale} />}
        </div>
      </section>
    </>
  );
}

function FacultyDetail({ locale, person }: { locale: Locale; person: Faculty }) {
  const areas = person.researchAreaIds.map((id) => researchAreas.find((area) => area.id === id)).filter((area): area is ResearchArea => Boolean(area));
  const lab = labs.find((entry) => entry.id === person.labId);
  return (
    <>
      <PageHeader eyebrow="FACULTY PROFILE" title={t(person.name, locale)} description={areas.map((area) => t(area.name, locale)).join(" · ")} />
      <section className="section content-section"><div className="container profile-layout">
        <aside className="profile-aside"><div className="profile-image"><UserRound size={72} strokeWidth={0.9} /><span>{tx(locale, "교수 사진 입력 예정", "Faculty photo required")}</span></div><Link className="back-link" href={hrefFor(locale, "/faculty")}><ArrowLeft size={17} />{tx(locale, "교수진 목록", "Faculty directory")}</Link></aside>
        <div className="profile-content">
          <div className="profile-heading"><p>{t(person.position, locale)}</p><h2>{t(person.name, locale)}</h2></div>
          <dl className="profile-meta"><div><dt>{tx(locale, "연구분야", "Research areas")}</dt><dd>{areas.map((area) => t(area.name, locale)).join(", ")}</dd></div><div><dt>{tx(locale, "연구실", "Laboratory")}</dt><dd>{lab ? <Link href={hrefFor(locale, `/labs/${lab.slug}`)}>{t(lab.name, locale)}</Link> : "-"}</dd></div><div><dt>Email</dt><dd>{person.email}</dd></div><div><dt>{tx(locale, "위치", "Office")}</dt><dd>{person.office ? t(person.office, locale) : "-"}</dd></div></dl>
          <section className="detail-block"><p className="section-label">RESEARCH INTERESTS</p><h2>{tx(locale, "연구 관심분야", "Research Interests")}</h2><div className="keyword-list">{person.researchKeywords[locale].map((keyword) => <span key={keyword}>{keyword}</span>)}</div></section>
          <section className="detail-block"><p className="section-label">PROFILE</p><h2>{tx(locale, "프로필", "Profile")}</h2><p>{tx(locale, "[학력, 주요 경력, 대표 연구성과 입력 예정] 확정된 공식 정보로 교체해 주세요.", "[Education, experience, and selected publications required] Replace with verified information.")}</p></section>
          <RelatedLinks locale={locale} items={areas.map((area) => ({ title: t(area.name, locale), path: `/research/${area.slug}` }))} />
        </div>
      </div></section>
    </>
  );
}

function ResearchDirectory({ locale }: { locale: Locale }) {
  return <><PageHeader eyebrow="RESEARCH" title={tx(locale, "연구분야", "Research Areas")} description={tx(locale, "기계공학의 여섯 연구축을 통해 교수, 연구실, 교과목을 함께 탐색합니다.", "Explore six research areas and their connected faculty, labs, and courses.")} /><section className="section content-section"><div className="container"><div className="research-directory-grid">{researchAreas.map((area) => <ResearchDirectoryItem key={area.id} area={area} locale={locale} />)}</div></div></section></>;
}

function ResearchDirectoryItem({ area, locale }: { area: ResearchArea; locale: Locale }) {
  return <Link className="research-directory-item" href={hrefFor(locale, `/research/${area.slug}`)}><span>{area.number}</span><div><p>{area.name.en}</p><h2>{area.name[locale]}</h2><p>{t(area.shortDescription, locale)}</p><div className="keyword-list small">{area.keywords[locale].map((keyword) => <i key={keyword}>{keyword}</i>)}</div></div><ArrowRight size={24} /></Link>;
}

function ResearchDetail({ locale, area }: { locale: Locale; area: ResearchArea }) {
  const relatedFaculty = getFacultyForArea(area.id);
  const relatedLabs = getLabsForArea(area.id);
  const relatedCourses = getCoursesForArea(area.id);
  return <><PageHeader eyebrow={`RESEARCH AREA ${area.number}`} title={t(area.name, locale)} description={t(area.shortDescription, locale)} /><section className="section content-section"><div className="container detail-layout"><main><section className="detail-block first"><p className="section-label">OVERVIEW</p><h2>{tx(locale, "연구분야 소개", "Overview")}</h2><p>{t(area.description, locale)}</p><div className="keyword-list">{area.keywords[locale].map((keyword) => <span key={keyword}>{keyword}</span>)}</div></section><section className="detail-block"><SectionHeading label="FACULTY" title={tx(locale, "관련 교수진", "Related Faculty")} /><div className="faculty-grid related">{relatedFaculty.map((person) => <FacultyCard key={person.id} item={person} locale={locale} />)}</div></section><section className="detail-block"><SectionHeading label="LABORATORIES" title={tx(locale, "관련 연구실", "Related Laboratories")} /><div className="simple-link-list">{relatedLabs.map((lab) => <Link href={hrefFor(locale, `/labs/${lab.slug}`)} key={lab.id}><FlaskConical size={20} /><span><strong>{t(lab.name, locale)}</strong><small>{t(lab.description, locale)}</small></span><ArrowRight size={18} /></Link>)}</div></section><section className="detail-block"><SectionHeading label="COURSES" title={tx(locale, "관련 교과목", "Related Courses")} /><div className="simple-link-list">{relatedCourses.map((course) => <Link href={hrefFor(locale, `/academics/courses/${course.slug}`)} key={course.id}><BookOpen size={20} /><span><strong>{t(course.name, locale)}</strong><small>{course.code} · {course.credits} {tx(locale, "학점", "credits")}</small></span><ArrowRight size={18} /></Link>)}</div></section></main><aside className="detail-nav"><p>{tx(locale, "다른 연구분야", "Other Areas")}</p>{researchAreas.filter((item) => item.id !== area.id).map((item) => <Link href={hrefFor(locale, `/research/${item.slug}`)} key={item.id}><span>{item.number}</span>{t(item.name, locale)}</Link>)}</aside></div></section></>;
}

function LabDirectory({ locale }: { locale: Locale }) {
  return <><PageHeader eyebrow="LABORATORIES" title={tx(locale, "연구실", "Laboratories")} description={tx(locale, "연구분야별 연구실과 담당 교수진을 연결해 확인합니다.", "Discover laboratories and their connected faculty by research area.")} /><section className="section content-section"><div className="container lab-grid">{labs.map((lab) => <LabCard key={lab.id} lab={lab} locale={locale} />)}</div></section></>;
}

function LabCard({ lab, locale }: { lab: Lab; locale: Locale }) {
  const area = researchAreas.find((item) => item.id === lab.researchAreaIds[0]);
  return <Link className="lab-card" href={hrefFor(locale, `/labs/${lab.slug}`)}><div className="lab-card-icon"><FlaskConical size={30} /></div><div><p>{area ? t(area.name, locale) : ""}</p><h2>{t(lab.name, locale)}</h2><span>{t(lab.description, locale)}</span></div><ArrowRight size={20} /></Link>;
}

function LabDetail({ locale, lab }: { locale: Locale; lab: Lab }) {
  const relatedFaculty = faculty.filter((person) => lab.professorIds.includes(person.id));
  const relatedAreas = researchAreas.filter((area) => lab.researchAreaIds.includes(area.id));
  return <><PageHeader eyebrow="LABORATORY" title={t(lab.name, locale)} description={relatedAreas.map((area) => t(area.name, locale)).join(" · ")} /><section className="section content-section"><div className="container detail-layout"><main><section className="detail-block first"><p className="section-label">ABOUT THE LAB</p><h2>{tx(locale, "연구실 소개", "About the Laboratory")}</h2><p>{t(lab.description, locale)}</p></section><section className="detail-block"><SectionHeading label="FACULTY" title={tx(locale, "담당 교수", "Faculty")} /><div className="faculty-grid related">{relatedFaculty.map((person) => <FacultyCard key={person.id} item={person} locale={locale} />)}</div></section><section className="detail-block"><p className="section-label">CONTACT</p><h2>{tx(locale, "위치 및 연락처", "Location & Contact")}</h2><dl className="profile-meta"><div><dt>{tx(locale, "위치", "Location")}</dt><dd>{lab.location ? t(lab.location, locale) : "-"}</dd></div><div><dt>{tx(locale, "웹사이트", "Website")}</dt><dd>{lab.websiteUrl ?? tx(locale, "[공식 URL 확인 필요]", "[Official URL required]")}</dd></div></dl></section></main><aside className="detail-nav"><p>{tx(locale, "연구분야", "Research Areas")}</p>{relatedAreas.map((area) => <Link href={hrefFor(locale, `/research/${area.slug}`)} key={area.id}><span>{area.number}</span>{t(area.name, locale)}</Link>)}</aside></div></section></>;
}

function CourseDirectory({ locale, searchParams }: { locale: Locale; searchParams: Record<string, string> }) {
  const router = useRouter();
  const [program, setProgram] = useState(searchParams.program ?? "all");
  const [semester, setSemester] = useState(searchParams.semester ?? "all");
  const [category, setCategory] = useState(searchParams.category ?? "all");
  const [area, setArea] = useState(searchParams.area ?? "all");
  const [query, setQuery] = useState(searchParams.query ?? "");
  const results = useMemo(() => courses.filter((course) => {
    const searchable = `${course.code} ${course.name.ko} ${course.name.en}`.toLowerCase();
    return (program === "all" || course.program === program) && (semester === "all" || course.semester === semester || course.semester === "both") && (category === "all" || course.category === category) && (area === "all" || course.researchAreaIds.includes(area)) && (!query || searchable.includes(query.toLowerCase()));
  }), [program, semester, category, area, query]);

  const sync = (values: { program: string; semester: string; category: string; area: string; query: string }) => {
    const params = new URLSearchParams();
    Object.entries(values).forEach(([key, value]) => { if (value && value !== "all") params.set(key, value); });
    router.replace(`${hrefFor(locale, "/academics/courses")}${params.size ? `?${params}` : ""}`);
  };
  const values = { program, semester, category, area, query };
  return <><PageHeader eyebrow="COURSES" title={tx(locale, "교과목 검색", "Course Search")} description={tx(locale, "학부와 대학원 교과목을 과정, 학기, 구분, 연구분야로 찾아보세요.", "Find undergraduate and graduate courses by program, semester, category, and research area.")} /><section className="section content-section"><div className="container"><div className="sample-data-note">{tx(locale, "현재 교과목 정보는 기능 확인용 샘플입니다.", "Course records are sample data for functional review.")}</div><form className="course-filter" onSubmit={(event) => { event.preventDefault(); sync(values); }}><div className="filter-field search-field"><label htmlFor="course-query">{tx(locale, "과목명 또는 학정번호", "Course name or code")}</label><div><Search size={18} /><input id="course-query" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={tx(locale, "검색어 입력", "Enter a keyword")} /></div></div><FilterSelect id="course-program" label={tx(locale, "과정", "Program")} value={program} onChange={(value) => { setProgram(value); sync({ ...values, program: value }); }} options={[["all", tx(locale, "전체", "All")], ["undergraduate", tx(locale, "학부", "Undergraduate")], ["graduate", tx(locale, "대학원", "Graduate")]]} /><FilterSelect id="course-semester" label={tx(locale, "학기", "Semester")} value={semester} onChange={(value) => { setSemester(value); sync({ ...values, semester: value }); }} options={[["all", tx(locale, "전체", "All")], ["spring", tx(locale, "봄학기", "Spring")], ["fall", tx(locale, "가을학기", "Fall")]]} /><FilterSelect id="course-category" label={tx(locale, "구분", "Category")} value={category} onChange={(value) => { setCategory(value); sync({ ...values, category: value }); }} options={[["all", tx(locale, "전체", "All")], ["required", tx(locale, "필수", "Required")], ["elective", tx(locale, "선택", "Elective")]]} /><div className="filter-field"><label htmlFor="course-area">{tx(locale, "연구분야", "Research area")}</label><select id="course-area" value={area} onChange={(event) => { setArea(event.target.value); sync({ ...values, area: event.target.value }); }}><option value="all">{tx(locale, "전체", "All")}</option>{researchAreas.map((item) => <option value={item.id} key={item.id}>{t(item.name, locale)}</option>)}</select></div><button className="button primary" type="submit"><Search size={17} />{tx(locale, "검색", "Search")}</button><button className="icon-button filter-reset" type="button" aria-label={tx(locale, "필터 초기화", "Reset filters")} onClick={() => { setProgram("all"); setSemester("all"); setCategory("all"); setArea("all"); setQuery(""); router.replace(hrefFor(locale, "/academics/courses")); }}><RotateCcw size={19} /></button></form><div className="results-heading"><p><strong>{results.length}</strong> {tx(locale, "개 교과목", "courses")}</p><span>{tx(locale, "샘플 데이터", "Sample data")}</span></div>{results.length ? <CourseResults locale={locale} items={results} /> : <EmptyState locale={locale} />}</div></section></>;
}

function FilterSelect({ id, label, value, onChange, options }: { id: string; label: string; value: string; onChange: (value: string) => void; options: [string, string][] }) {
  return <div className="filter-field"><label htmlFor={id}>{label}</label><select id={id} value={value} onChange={(event) => onChange(event.target.value)}>{options.map(([optionValue, optionLabel]) => <option value={optionValue} key={optionValue}>{optionLabel}</option>)}</select></div>;
}

function CourseResults({ locale, items }: { locale: Locale; items: Course[] }) {
  return <><div className="course-table-wrap"><table className="course-table"><thead><tr><th>{tx(locale, "학정번호", "Code")}</th><th>{tx(locale, "교과목명", "Course")}</th><th>{tx(locale, "과정", "Program")}</th><th>{tx(locale, "학기", "Semester")}</th><th>{tx(locale, "구분", "Category")}</th><th>{tx(locale, "학점", "Credits")}</th><th><span className="sr-only">{tx(locale, "상세", "Details")}</span></th></tr></thead><tbody>{items.map((course) => <tr key={course.id}><td>{course.code}</td><td><Link href={hrefFor(locale, `/academics/courses/${course.slug}`)}><strong>{t(course.name, locale)}</strong><small>{locale === "ko" ? course.name.en : course.name.ko}</small></Link></td><td>{course.program === "undergraduate" ? tx(locale, "학부", "Undergraduate") : tx(locale, "대학원", "Graduate")}</td><td>{course.semester === "spring" ? tx(locale, "봄", "Spring") : course.semester === "fall" ? tx(locale, "가을", "Fall") : tx(locale, "연중", "Both")}</td><td>{course.category === "required" ? tx(locale, "필수", "Required") : tx(locale, "선택", "Elective")}</td><td>{course.credits}</td><td><Link href={hrefFor(locale, `/academics/courses/${course.slug}`)} aria-label={`${t(course.name, locale)} ${tx(locale, "상세보기", "details")}`}><ArrowRight size={18} /></Link></td></tr>)}</tbody></table></div><div className="course-mobile-list">{items.map((course) => <Link className="course-mobile-card" href={hrefFor(locale, `/academics/courses/${course.slug}`)} key={course.id}><div><span>{course.code}</span><i>{course.program === "undergraduate" ? tx(locale, "학부", "Undergraduate") : tx(locale, "대학원", "Graduate")}</i></div><h3>{t(course.name, locale)}</h3><p>{course.credits} {tx(locale, "학점", "credits")} · {course.category === "required" ? tx(locale, "필수", "Required") : tx(locale, "선택", "Elective")}</p><ArrowRight size={18} /></Link>)}</div></>;
}

function CourseDetail({ locale, course }: { locale: Locale; course: Course }) {
  const areas = researchAreas.filter((area) => course.researchAreaIds.includes(area.id));
  return <><PageHeader eyebrow={`${course.code} · COURSE`} title={t(course.name, locale)} description={locale === "ko" ? course.name.en : course.name.ko} /><section className="section content-section"><div className="container detail-layout"><main><section className="detail-block first"><p className="section-label">COURSE OVERVIEW</p><h2>{tx(locale, "교과목 설명", "Course Description")}</h2><p>{t(course.description, locale)}</p></section><section className="detail-block"><p className="section-label">INFORMATION</p><h2>{tx(locale, "교과목 정보", "Course Information")}</h2><dl className="course-detail-grid"><div><dt>{tx(locale, "학정번호", "Code")}</dt><dd>{course.code}</dd></div><div><dt>{tx(locale, "과정", "Program")}</dt><dd>{course.program === "undergraduate" ? tx(locale, "학부", "Undergraduate") : tx(locale, "대학원", "Graduate")}</dd></div><div><dt>{tx(locale, "학년", "Year")}</dt><dd>{course.year ?? "-"}</dd></div><div><dt>{tx(locale, "학기", "Semester")}</dt><dd>{course.semester}</dd></div><div><dt>{tx(locale, "구분", "Category")}</dt><dd>{course.category}</dd></div><div><dt>{tx(locale, "학점", "Credits")}</dt><dd>{course.credits}</dd></div></dl></section><RelatedLinks locale={locale} items={areas.map((area) => ({ title: t(area.name, locale), path: `/research/${area.slug}` }))} /></main><aside className="detail-nav"><Link className="back-link" href={hrefFor(locale, "/academics/courses")}><ArrowLeft size={16} />{tx(locale, "교과목 목록", "Course list")}</Link><p>{tx(locale, "관련 연구분야", "Related Areas")}</p>{areas.map((area) => <Link href={hrefFor(locale, `/research/${area.slug}`)} key={area.id}><span>{area.number}</span>{t(area.name, locale)}</Link>)}</aside></div></section></>;
}

function NoticeDirectory({ locale, searchParams }: { locale: Locale; searchParams: Record<string, string> }) {
  const [audience, setAudience] = useState(searchParams.audience ?? "all");
  const [query, setQuery] = useState(searchParams.query ?? "");
  const results = notices.filter((notice) => (audience === "all" || notice.audience === audience) && (!query || t(notice.title, locale).toLowerCase().includes(query.toLowerCase())));
  return <><PageHeader eyebrow="NOTICE" title={tx(locale, "공지사항", "Notices")} description={tx(locale, "학부와 대학원 주요 안내를 빠르게 확인하세요.", "Find undergraduate and graduate announcements.")} /><section className="section content-section"><div className="container"><div className="notice-toolbar"><div className="tabs" role="tablist" aria-label={tx(locale, "공지 구분", "Notice audience")}><button type="button" role="tab" aria-selected={audience === "all"} onClick={() => setAudience("all")}>{tx(locale, "전체", "All")}</button><button type="button" role="tab" aria-selected={audience === "undergraduate"} onClick={() => setAudience("undergraduate")}>{tx(locale, "학부공지", "Undergraduate")}</button><button type="button" role="tab" aria-selected={audience === "graduate"} onClick={() => setAudience("graduate")}>{tx(locale, "대학원공지", "Graduate")}</button></div><label className="inline-search"><span className="sr-only">{tx(locale, "공지 검색", "Search notices")}</span><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={tx(locale, "제목 검색", "Search by title")} /></label></div><div className="notice-table"><div className="notice-table-head"><span>{tx(locale, "구분", "Category")}</span><span>{tx(locale, "제목", "Title")}</span><span>{tx(locale, "게시일", "Date")}</span></div>{results.map((notice) => <NoticeRow key={notice.id} notice={notice} locale={locale} />)}</div><nav className="pagination" aria-label={tx(locale, "페이지", "Pagination")}><button type="button" aria-label={tx(locale, "이전 페이지", "Previous page")}><ChevronLeft size={18} /></button><button type="button" aria-current="page">1</button><button type="button">2</button><button type="button" aria-label={tx(locale, "다음 페이지", "Next page")}><ChevronRight size={18} /></button></nav></div></section></>;
}

function NoticeDetail({ locale, notice }: { locale: Locale; notice: Notice }) {
  const index = notices.findIndex((item) => item.id === notice.id);
  const previous = notices[index - 1];
  const next = notices[index + 1];
  return <><PageHeader eyebrow="NOTICE" title={t(notice.title, locale)} description={`${notice.category} · ${notice.publishedAt.replaceAll("-", ".")}`} /><section className="section content-section"><article className="container article-detail"><div className="article-meta"><span>{notice.audience === "undergraduate" ? tx(locale, "학부공지", "Undergraduate") : tx(locale, "대학원공지", "Graduate")}</span><time>{notice.publishedAt}</time></div><div className="article-body"><p>{t(notice.body, locale)}</p><p>{tx(locale, "현재 공지는 화면 구성 확인을 위한 샘플입니다. 게시 전 공식 내용과 일정, 담당 부서 정보를 확인해 주세요.", "This notice is sample content for layout review. Verify all official details before publishing.")}</p></div>{notice.attachments && <div className="attachments"><h2>{tx(locale, "첨부파일", "Attachments")}</h2>{notice.attachments.map((attachment) => <a href={attachment.url} key={attachment.id}><Download size={18} />{t(attachment.name, locale)}</a>)}</div>}<div className="article-navigation">{previous ? <Link href={hrefFor(locale, `/news/notices/${previous.slug}`)}><ChevronLeft size={18} /><span><small>{tx(locale, "이전글", "Previous")}</small>{t(previous.title, locale)}</span></Link> : <span />}{next ? <Link href={hrefFor(locale, `/news/notices/${next.slug}`)}><span><small>{tx(locale, "다음글", "Next")}</small>{t(next.title, locale)}</span><ChevronRight size={18} /></Link> : <span />}</div><Link className="button outline article-list-button" href={hrefFor(locale, "/news/notices")}><ArrowLeft size={17} />{tx(locale, "목록으로", "Back to list")}</Link></article></section></>;
}

function CalendarPage({ locale }: { locale: Locale }) {
  const groups = events.reduce<Record<string, typeof events>>((acc, event) => { const month = event.startDate.slice(0, 7); acc[month] = [...(acc[month] ?? []), event]; return acc; }, {});
  return <><PageHeader eyebrow="ACADEMIC CALENDAR" title={tx(locale, "학사일정", "Academic Calendar")} description={tx(locale, "다가오는 학사 및 학부 일정을 월별로 확인합니다.", "View upcoming academic and department events by month.")} /><section className="section content-section"><div className="container calendar-page">{Object.entries(groups).map(([month, items]) => <section key={month}><header><strong>{month.slice(5)}</strong><span>{month.slice(0, 4)}</span></header><div>{items.map((event) => <EventRow key={event.id} event={event} locale={locale} />)}</div></section>)}</div></section></>;
}

function SearchPage({ locale, searchParams }: { locale: Locale; searchParams: Record<string, string> }) {
  const router = useRouter();
  const [query, setQuery] = useState(searchParams.q ?? "");
  const normalized = query.trim().toLowerCase();
  const facultyResults = normalized ? faculty.filter((item) => `${item.name.ko} ${item.name.en} ${item.researchKeywords.ko.join(" ")} ${item.researchKeywords.en.join(" ")}`.toLowerCase().includes(normalized)) : [];
  const researchResults = normalized ? researchAreas.filter((item) => `${item.name.ko} ${item.name.en} ${item.keywords.ko.join(" ")} ${item.keywords.en.join(" ")}`.toLowerCase().includes(normalized)) : [];
  const courseResults = normalized ? courses.filter((item) => `${item.code} ${item.name.ko} ${item.name.en}`.toLowerCase().includes(normalized)) : [];
  const noticeResults = normalized ? notices.filter((item) => `${item.title.ko} ${item.title.en}`.toLowerCase().includes(normalized)) : [];
  const total = facultyResults.length + researchResults.length + courseResults.length + noticeResults.length;
  return <><PageHeader eyebrow="SEARCH" title={tx(locale, "통합검색", "Search")} description={tx(locale, "교수, 연구, 교육과정, 공지 및 소식을 한 곳에서 찾습니다.", "Search faculty, research, academics, and notices in one place.")} /><section className="section content-section"><div className="container search-page"><form onSubmit={(event) => { event.preventDefault(); router.replace(`${hrefFor(locale, "/search")}?q=${encodeURIComponent(query)}`); }}><label htmlFor="search-page-input">{tx(locale, "검색어", "Search query")}</label><div><Search size={22} /><input id="search-page-input" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={tx(locale, "검색어를 입력하세요", "Enter a search term")} /><button className="button primary" type="submit">{tx(locale, "검색", "Search")}</button></div></form>{normalized && <p className="search-summary"><strong>‘{query}’</strong> {tx(locale, `검색 결과 ${total}건`, `${total} results`)}</p>}{!normalized ? <div className="empty-state"><Search size={26} /><h3>{tx(locale, "검색어를 입력해 주세요", "Enter a search term")}</h3><p>{tx(locale, "교수명, 연구 키워드, 과목명, 공지 제목을 검색할 수 있습니다.", "Search by faculty, research keyword, course, or notice title.")}</p></div> : total === 0 ? <EmptyState locale={locale} /> : <div className="search-groups"><SearchGroup title={tx(locale, "교수진", "Faculty")} items={facultyResults.map((item) => ({ title: t(item.name, locale), description: item.researchKeywords[locale].join(" · "), path: `/faculty/${item.slug}` }))} locale={locale} /><SearchGroup title={tx(locale, "연구", "Research")} items={researchResults.map((item) => ({ title: t(item.name, locale), description: t(item.shortDescription, locale), path: `/research/${item.slug}` }))} locale={locale} /><SearchGroup title={tx(locale, "교육과정", "Academics")} items={courseResults.map((item) => ({ title: t(item.name, locale), description: `${item.code} · ${item.credits} ${tx(locale, "학점", "credits")}`, path: `/academics/courses/${item.slug}` }))} locale={locale} /><SearchGroup title={tx(locale, "공지 및 소식", "News & Notices")} items={noticeResults.map((item) => ({ title: t(item.title, locale), description: item.publishedAt, path: `/news/notices/${item.slug}` }))} locale={locale} /></div>}</div></section></>;
}

function SearchGroup({ title, items, locale }: { title: string; items: { title: string; description: string; path: string }[]; locale: Locale }) {
  if (!items.length) return null;
  return <section className="search-group"><h2>{title}<span>{items.length}</span></h2>{items.map((item) => <Link href={hrefFor(locale, item.path)} key={item.path}><div><strong>{item.title}</strong><p>{item.description}</p></div><ArrowRight size={18} /></Link>)}</section>;
}

function RelatedLinks({ locale, items }: { locale: Locale; items: { title: string; path: string }[] }) {
  if (!items.length) return null;
  return <section className="detail-block"><p className="section-label">RELATED CONTENT</p><h2>{tx(locale, "연관 콘텐츠", "Related Content")}</h2><div className="related-links">{items.map((item) => <Link href={hrefFor(locale, item.path)} key={item.path}>{item.title}<ArrowRight size={18} /></Link>)}</div></section>;
}

function GenericPage({ locale, segments }: { locale: Locale; segments: string[] }) {
  const key = segments[segments.length - 1] ?? "about";
  const label = routeLabels[key] ? t(routeLabels[key], locale) : tx(locale, "콘텐츠 준비 중", "Content in preparation");
  const section = segments[0];
  const pageCopy: Record<string, { ko: string; en: string }> = {
    about: { ko: "기계공학부의 교육과 연구, 공동체를 소개합니다.", en: "Learn about the department's education, research, and community." },
    undergraduate: { ko: "기초부터 설계와 실험까지 이어지는 학부 교육과정을 안내합니다.", en: "Explore the undergraduate curriculum from fundamentals to design and experiments." },
    graduate: { ko: "전문 연구역량을 확장하는 대학원 교육과정을 안내합니다.", en: "Explore graduate education for advanced research capabilities." },
    careers: { ko: "학생과 졸업생을 위한 채용 및 진로 정보를 제공합니다.", en: "Career and employment information for students and alumni." },
    directions: { ko: "학부 위치와 방문 정보를 안내합니다.", en: "Find department location and visitor information." },
  };
  const description = pageCopy[key] ? pageCopy[key][locale] : tx(locale, "공식 콘텐츠를 입력할 수 있도록 페이지 구조를 준비했습니다.", "This page is ready for verified department content.");
  const isDirections = key === "directions";
  return <><PageHeader eyebrow={(section ?? "DEPARTMENT").toUpperCase()} title={label} description={description} /><section className="section content-section"><div className="container generic-layout"><main><p className="section-label">OVERVIEW</p><h2>{label}</h2><p>{tx(locale, "[공식 콘텐츠 입력 예정] 현재 페이지는 전체 메뉴와 사용자 경로가 끊기지 않도록 준비한 운영용 템플릿입니다.", "[Official content required] This operational template keeps navigation and user journeys complete.")}</p>{isDirections && <div className="contact-placeholder"><MapPin size={34} /><div><h3>{tx(locale, "위치 및 연락처", "Location & Contact")}</h3><p>{tx(locale, "[공식 주소 확인 필요]", "[Official address required]")}</p><p>{tx(locale, "[대표 전화 및 이메일 확인 필요]", "[Official phone and email required]")}</p></div></div>}</main><aside><p>{tx(locale, "관련 페이지", "Related Pages")}</p>{navigation.find((item) => item.key === section || (section === "promotion" && item.key === "admission"))?.children.slice(0, 6).map((item) => <Link href={hrefFor(locale, item.path)} key={item.path}>{t(item.label, locale)}<ArrowRight size={16} /></Link>)}</aside></div></section></>;
}

export default function DepartmentSite({ locale, segments, searchParams }: DepartmentSiteProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
        setSearchOpen(false);
      }
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen || searchOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen, searchOpen]);

  const [section, second, third] = segments;
  let page: ReactNode;
  if (!section) page = <HomePage locale={locale} />;
  else if (section === "faculty" && second && getFacultyBySlug(second)) page = <FacultyDetail locale={locale} person={getFacultyBySlug(second)!} />;
  else if (section === "faculty" && !second) page = <FacultyDirectory locale={locale} searchParams={searchParams} />;
  else if (section === "research" && second && getResearchAreaBySlug(second)) page = <ResearchDetail locale={locale} area={getResearchAreaBySlug(second)!} />;
  else if (section === "research" && !second) page = <ResearchDirectory locale={locale} />;
  else if (section === "labs" && second && getLabBySlug(second)) page = <LabDetail locale={locale} lab={getLabBySlug(second)!} />;
  else if (section === "labs" && !second) page = <LabDirectory locale={locale} />;
  else if (section === "academics" && second === "courses" && third && getCourseBySlug(third)) page = <CourseDetail locale={locale} course={getCourseBySlug(third)!} />;
  else if (section === "academics" && second === "courses") page = <CourseDirectory locale={locale} searchParams={searchParams} />;
  else if (section === "news" && second === "notices" && third && getNoticeBySlug(third)) page = <NoticeDetail locale={locale} notice={getNoticeBySlug(third)!} />;
  else if (section === "news" && second === "notices") page = <NoticeDirectory locale={locale} searchParams={searchParams} />;
  else if (section === "news" && second === "calendar") page = <CalendarPage locale={locale} />;
  else if (section === "search") page = <SearchPage locale={locale} searchParams={searchParams} />;
  else if (section === "promotion" && second === "instagram") page = <HomePage locale={locale} />;
  else page = <GenericPage locale={locale} segments={segments} />;

  return (
    <div className="site-shell">
      <SiteHeader locale={locale} segments={segments} openMenu={openMenu} setOpenMenu={setOpenMenu} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} mobileSection={mobileSection} setMobileSection={setMobileSection} searchOpen={searchOpen} setSearchOpen={setSearchOpen} />
      <Breadcrumb locale={locale} segments={segments} />
      <main id="main-content">{page}</main>
      <SiteFooter locale={locale} />
    </div>
  );
}
