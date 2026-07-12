"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { FormEvent, ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { FaInstagram } from "react-icons/fa";
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
  MapPin,
  Menu,
  MessageSquareText,
  RotateCcw,
  Search,
  UserRound,
  X,
} from "lucide-react";
import {
  courses,
  events,
  faculty,
  heroSlides,
  instagramPosts,
  labs,
  notices,
  relatedSites,
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
  researchAreas as directoryResearchAreas,
  type ResearchArea as DirectoryResearchArea,
} from "../data/researchAreas";
import {
  getResearchLabBySlug,
  researchLabs,
  type ResearchLab,
} from "../data/labs";
import {
  facultyMembers,
  getFacultyMemberBySlug,
  type FacultyMember,
} from "../data/faculty";
import { getActiveNavigationItem, navigation } from "../data/navigation";
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

const t = (value: LocaleText, locale: Locale) => value[locale];
const tx = (locale: Locale, ko: string, en: string) => (locale === "ko" ? ko : en);
const hrefFor = (locale: Locale, path = "") => `/${locale}${path}`;

const quickLinks = [
  { ko: "학부공지", en: "Notices", path: "/news/notices?audience=undergraduate", icon: MessageSquareText },
  { ko: "학사일정", en: "Calendar", path: "/news/calendar", icon: CalendarDays },
  { ko: "교과과정", en: "Curriculum", path: "/academics/courses", icon: BookOpen },
  { ko: "대학원 입학", en: "Graduate Admission", path: "/admission/graduate", icon: GraduationCap },
  { ko: "채용정보", en: "Careers", path: "/news/careers", icon: BriefcaseBusiness },
  { ko: "오시는 길", en: "Directions", path: "/about/directions", icon: MapPin },
];

const homeSectionNavigation = [
  { code: "HOME", ko: "메인", en: "Home" },
  { code: "NOTICE", ko: "공지·일정", en: "Notices and calendar" },
  { code: "RESEARCH", ko: "주요 연구 분야", en: "Research areas" },
  { code: "FACULTY", ko: "교수진", en: "Faculty" },
  { code: "EDUCATION", ko: "교육과정", en: "Curriculum" },
  { code: "TODAY", ko: "학부 소식", en: "Department stories" },
  { code: "FOOTER", ko: "하단 정보", en: "Footer information" },
];

const routeLabels: Record<string, LocaleText> = {
  about: { ko: "학부소개", en: "About" },
  greeting: { ko: "학부장 인사말", en: "Chair's Message" },
  vision: { ko: "비전 및 교육목표", en: "Vision & Objectives" },
  history: { ko: "연혁", en: "History" },
  alumni: { ko: "동문·대외협력", en: "Alumni & Partnerships" },
  contact: { ko: "조직 및 연락처", en: "Organization & Contact" },
  directions: { ko: "오시는 길", en: "Directions" },
  faculty: { ko: "교수진", en: "Faculty" },
  labs: { ko: "연구실", en: "Laboratories" },
  research: { ko: "연구분야", en: "Research" },
  fields: { ko: "연구 분야", en: "Research Areas" },
  "vision-capabilities": { ko: "연구 비전·역량", en: "Research Vision & Capabilities" },
  "social-challenges": { ko: "사회난제 신문고", en: "Social Challenges" },
  academics: { ko: "교육과정", en: "Academics" },
  undergraduate: { ko: "학부과정", en: "Undergraduate" },
  graduate: { ko: "대학원과정", en: "Graduate" },
  courses: { ko: "교과목", en: "Courses" },
  requirements: { ko: "졸업요건", en: "Requirements" },
  news: { ko: "학과소식", en: "News" },
  department: { ko: "뉴스", en: "News" },
  notices: { ko: "공지사항", en: "Notices" },
  events: { ko: "행사", en: "Events" },
  calendar: { ko: "학사일정", en: "Academic Calendar" },
  careers: { ko: "채용정보", en: "Careers" },
  admission: { ko: "입학", en: "Admissions" },
  promotion: { ko: "홍보", en: "Promotion" },
  instagram: { ko: "Instagram", en: "Instagram" },
  privacy: { ko: "개인정보처리방침", en: "Privacy Policy" },
  legal: { ko: "법적고지", en: "Legal Notice" },
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
        const researchLab = getResearchLabBySlug(segment);
        const facultyMember = getFacultyMemberBySlug(segment);
        const person = faculty.find((item) => item.slug === segment);
        const course = courses.find((item) => item.slug === segment);
        const notice = notices.find((item) => item.slug === segment);
        const label = area
          ? t(area.name, locale)
          : researchLab
            ? (locale === "ko" ? researchLab.nameKo : researchLab.nameEn)
          : facultyMember
            ? (locale === "ko" ? facultyMember.nameKo ?? facultyMember.nameEn ?? segment : facultyMember.nameEn ?? facultyMember.nameKo ?? segment)
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

function ResearchCard({ area, locale }: { area: DirectoryResearchArea; locale: Locale }) {
  return (
    <Link href={hrefFor(locale, `/research/fields?area=${area.slug}`)} className="research-card">
      <span className="research-number">{String(area.displayOrder).padStart(2, "0")}</span>
      <h3>{locale === "ko" ? area.nameKo : area.nameEn}</h3>
      <p className="research-en">{locale === "ko" ? area.nameEn : area.nameKo}</p>
      <p>{area.shortDescription}</p>
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
  const headerShellRef = useRef<HTMLDivElement>(null);
  const currentPath = segments.length ? `/${segments.join("/")}` : "/";
  const localeSuffix = segments.length ? `/${segments.join("/")}` : "";
  const activeItemKey = getActiveNavigationItem(currentPath)?.key;

  useEffect(() => {
    if (!openMenu) return;

    const closeOnOutsidePointer = (event: PointerEvent) => {
      if (!headerShellRef.current?.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    };

    document.addEventListener("pointerdown", closeOnOutsidePointer);
    return () => document.removeEventListener("pointerdown", closeOnOutsidePointer);
  }, [openMenu, setOpenMenu]);

  return (
    <>
      <a className="skip-link" href="#main-content">
        {tx(locale, "본문 바로가기", "Skip to content")}
      </a>
      <div
        className="header-navigation-shell"
        ref={headerShellRef}
        onMouseLeave={() => setOpenMenu(null)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
            setOpenMenu(null);
          }
        }}
      >
        <header className="site-header">
          <div className="container header-row">
            <Link href={hrefFor(locale)} className="brand" aria-label={tx(locale, "연세대학교 기계공학부 홈", "Mechanical Engineering home")}>
              <span className="brand-mark">
                <Image src="/images/yonsei-symbol.png" alt="연세대학교 심볼" width={1185} height={1188} priority unoptimized />
              </span>
              <span className="brand-text">
                <strong>연세대학교 기계공학부</strong>
                <small>YONSEI UNIVERSITY · MECHANICAL ENGINEERING</small>
              </span>
            </Link>

            <nav className="desktop-nav" aria-label={tx(locale, "주요 메뉴", "Primary navigation")}>
              {navigation.map((item) => {
                const active = activeItemKey === item.key;
                return (
                  <div className="nav-item" key={item.key} onMouseEnter={() => setOpenMenu(item.key)}>
                    <button
                      type="button"
                      className={active ? "active" : undefined}
                      aria-expanded={openMenu === item.key}
                      aria-controls="desktop-mega-menu"
                      onClick={() => setOpenMenu(openMenu === item.key ? null : item.key)}
                      onFocus={() => setOpenMenu(item.key)}
                    >
                      {t(item.label, locale)}
                      <ChevronDown size={14} aria-hidden="true" />
                    </button>
                  </div>
                );
              })}
            </nav>

            <div className="header-tools">
              <div className="language-switch" aria-label={tx(locale, "언어 선택", "Choose language")}>
                <Link href={`/ko${localeSuffix}`} lang="ko" aria-current={locale === "ko" ? "page" : undefined} onClick={() => setOpenMenu(null)}>KR</Link>
                <span aria-hidden="true">|</span>
                <Link href={`/en${localeSuffix}`} lang="en" aria-current={locale === "en" ? "page" : undefined} onClick={() => setOpenMenu(null)}>EN</Link>
              </div>
              <a href="https://www.instagram.com/yonsei_mech/" target="_blank" rel="noreferrer" className="icon-button" aria-label="Yonsei Mechanical Engineering Instagram" title="Instagram">
                <FaInstagram size={19} aria-hidden="true" />
              </a>
              <button type="button" className="icon-button" aria-label={tx(locale, "검색 열기", "Open search")} title={tx(locale, "검색", "Search")} onClick={() => setSearchOpen(true)}>
                <Search size={20} />
              </button>
              <button
                type="button"
                className="icon-button mobile-menu-button"
                aria-label={tx(locale, "전체 메뉴 열기", "Open menu")}
                aria-expanded={mobileOpen}
                onClick={() => {
                  setOpenMenu(null);
                  setMobileOpen(true);
                }}
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </header>

        {openMenu && (
          <div className="mega-menu" id="desktop-mega-menu">
            <div className="container mega-menu-grid">
              {navigation.map((item) => (
                <section
                  className={`mega-menu-column${openMenu === item.key ? " active" : ""}`}
                  key={item.key}
                  onMouseEnter={() => setOpenMenu(item.key)}
                >
                  <Link
                    className="mega-menu-title"
                    href={hrefFor(locale, item.path)}
                    onClick={() => setOpenMenu(null)}
                    onFocus={() => setOpenMenu(item.key)}
                  >
                    {t(item.label, locale)}
                  </Link>
                  <div className="mega-menu-links">
                    {item.children.map((child) => (
                      <Link
                        key={`${item.key}-${child.path}`}
                        href={hrefFor(locale, child.path)}
                        onClick={() => setOpenMenu(null)}
                        onFocus={() => setOpenMenu(item.key)}
                      >
                        {t(child.label, locale)}
                      </Link>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        )}
      </div>

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
                <button type="button" aria-expanded={mobileSection === item.key} aria-controls={`mobile-section-${item.key}`} onClick={() => setMobileSection(mobileSection === item.key ? null : item.key)}>
                  {t(item.label, locale)}
                  <ChevronDown size={18} />
                </button>
                {mobileSection === item.key && (
                  <div className="mobile-nav-links" id={`mobile-section-${item.key}`}>
                    {item.children.map((child) => (
                      <Link href={hrefFor(locale, child.path)} key={child.path} onClick={() => { setMobileOpen(false); setMobileSection(null); }}>
                        {t(child.label, locale)}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
          <div className="mobile-menu-footer">
            <Link href={`/ko${localeSuffix}`} lang="ko" aria-current={locale === "ko" ? "page" : undefined}>KR</Link>
            <span aria-hidden="true">|</span>
            <Link href={`/en${localeSuffix}`} lang="en" aria-current={locale === "en" ? "page" : undefined}>EN</Link>
            <a href="https://www.instagram.com/yonsei_mech/" target="_blank" rel="noreferrer" aria-label="Yonsei Mechanical Engineering Instagram">Instagram <ExternalLink size={14} /></a>
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
  const [relatedSitesOpen, setRelatedSitesOpen] = useState(false);
  const relatedSitesRef = useRef<HTMLDivElement>(null);
  const relatedSitesButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!relatedSitesOpen) return;

    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!relatedSitesRef.current?.contains(event.target as Node)) setRelatedSitesOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setRelatedSitesOpen(false);
      relatedSitesButtonRef.current?.focus();
    };

    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [relatedSitesOpen]);

  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <div className="footer-brand">
          <Image src="/images/yonsei-symbol.png" alt="연세대학교 심볼" width={1185} height={1188} unoptimized />
          <div>
            <h2>{tx(locale, "연세대학교 기계공학부", "Yonsei University Mechanical Engineering")}</h2>
            <p>YONSEI UNIVERSITY · MECHANICAL ENGINEERING</p>
          </div>
        </div>

        <div className="footer-information">
          <nav className="footer-policy-links" aria-label={tx(locale, "정책 안내", "Policies")}>
            <Link href={hrefFor(locale, "/privacy")}>{tx(locale, "개인정보처리방침", "Privacy Policy")}</Link>
            <Link href={hrefFor(locale, "/legal")}>{tx(locale, "법적고지", "Legal Notice")}</Link>
          </nav>
          <address>
            <p>{tx(locale, "[03722] 서울특별시 서대문구 연세로 50 연세대학교 공과대학 기계공학부", "Department of Mechanical Engineering, Yonsei University, 50 Yonsei-ro, Seodaemun-gu, Seoul 03722, Korea")}</p>
            <p>{tx(locale, "대학원: 02-2123-2810", "Graduate: +82-2-2123-2810")}</p>
            <p>{tx(locale, "학부: 02-2123-4426", "Undergraduate: +82-2-2123-4426")}</p>
            <p>BK21: 02-2123-7817, 02-2123-7815</p>
          </address>
          <p className="footer-copyright">Copyright © 2026 Yonsei University Department of Mechanical Engineering.<br />All rights reserved.</p>
        </div>

        <div className="footer-related-sites" ref={relatedSitesRef}>
          <button
            className="related-sites-trigger"
            type="button"
            aria-haspopup="menu"
            aria-expanded={relatedSitesOpen}
            onClick={() => setRelatedSitesOpen((open) => !open)}
            onKeyDown={(event) => {
              if (event.key !== "ArrowDown") return;
              event.preventDefault();
              setRelatedSitesOpen(true);
              window.requestAnimationFrame(() => relatedSitesRef.current?.querySelector<HTMLAnchorElement>("[role='menuitem']")?.focus());
            }}
            ref={relatedSitesButtonRef}
          >
            <span>{tx(locale, "관련 사이트", "Related sites")}</span>
            <ChevronDown size={17} aria-hidden="true" />
          </button>
          {relatedSitesOpen && (
            <div className="related-sites-menu" role="menu" aria-label={tx(locale, "관련 사이트 목록", "Related sites list")}>
              {relatedSites.map((site) => (
                <a href={site.url} target="_blank" rel="noopener noreferrer" role="menuitem" onClick={() => setRelatedSitesOpen(false)} key={site.url}>
                  {locale === "ko" ? site.label.ko : site.label.en}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}

function HomePage({ locale }: { locale: Locale }) {
  const [noticeTab, setNoticeTab] = useState<"undergraduate" | "graduate">("undergraduate");
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);
  const [heroHovered, setHeroHovered] = useState(false);
  const [heroFocusWithin, setHeroFocusWithin] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [activeHomeSection, setActiveHomeSection] = useState(0);
  const homeRef = useRef<HTMLDivElement>(null);
  const filteredNotices = notices.filter((notice) => notice.audience === noticeTab).slice(0, 5);

  useEffect(() => {
    document.documentElement.classList.add("home-snap-page");
    return () => document.documentElement.classList.remove("home-snap-page");
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(media.matches);
    updatePreference();
    media.addEventListener("change", updatePreference);
    return () => media.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    let frame = 0;
    const updateActiveSection = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const homeSections = Array.from(homeRef.current?.querySelectorAll<HTMLElement>("[data-home-section]") ?? []);
        const footer = document.querySelector<HTMLElement>(".site-footer");
        const sections = footer ? [...homeSections, footer] : homeSections;

        if (footer && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 8) {
          setActiveHomeSection(sections.length - 1);
          return;
        }

        const viewportCenter = window.innerHeight / 2;
        let closestIndex = 0;
        let closestDistance = Number.POSITIVE_INFINITY;

        sections.forEach((section, index) => {
          const rect = section.getBoundingClientRect();
          const distance = Math.abs(rect.top + rect.height / 2 - viewportCenter);
          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
          }
        });

        setActiveHomeSection(closestIndex);
      });
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || heroHovered || heroFocusWithin) return;
    const interval = window.setInterval(() => {
      setActiveHeroSlide((current) => (current + 1) % heroSlides.length);
    }, 6000);
    return () => window.clearInterval(interval);
  }, [prefersReducedMotion, heroHovered, heroFocusWithin, activeHeroSlide]);

  useEffect(() => {
    const root = homeRef.current;
    if (!root) return;

    const targets = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
    const reveal = (target: HTMLElement) => target.classList.add("is-visible");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      targets.forEach(reveal);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal(entry.target as HTMLElement);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  const scrollToHomeSection = (index: number) => {
    const homeSections = Array.from(homeRef.current?.querySelectorAll<HTMLElement>("[data-home-section]") ?? []);
    const footer = document.querySelector<HTMLElement>(".site-footer");
    const sections = footer ? [...homeSections, footer] : homeSections;
    sections[index]?.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
  };

  return (
    <div className="home-page" ref={homeRef}>
      <noscript><style>{"[data-reveal], [data-reveal] .home-stagger > * { opacity: 1 !important; transform: none !important; }"}</style></noscript>
      <nav className={`home-section-nav ${[0, 2, 6].includes(activeHomeSection) ? "is-light" : ""}`} aria-label={tx(locale, "메인 섹션 메뉴", "Main section menu")}>
        <div className="home-section-track">
          {homeSectionNavigation.map((item, index) => (
            <button
              type="button"
              className={index === activeHomeSection ? "is-active" : ""}
              aria-current={index === activeHomeSection ? "true" : undefined}
              aria-label={tx(locale, `${item.ko} 섹션으로 이동`, `Go to ${item.en}`)}
              onClick={() => scrollToHomeSection(index)}
              key={item.code}
            ><span className="sr-only">{item.code}</span></button>
          ))}
        </div>
      </nav>
      <section
        className="hero"
        aria-labelledby="hero-title"
        data-reveal
        data-home-section
        onMouseEnter={() => setHeroHovered(true)}
        onMouseLeave={() => setHeroHovered(false)}
        onFocusCapture={() => setHeroFocusWithin(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setHeroFocusWithin(false);
        }}
      >
        <div className="hero-slides">
          {heroSlides.map((slide, index) => (
            <div
              className={`hero-slide hero-slide-${slide.id} ${index === activeHeroSlide ? "is-active" : ""}`}
              aria-hidden={index !== activeHeroSlide}
              key={slide.id}
            >
              <Image
                src={slide.image}
                alt={index === activeHeroSlide ? (locale === "ko" ? slide.alt.ko : slide.alt.en) : ""}
                fill
                priority={index === 0}
                sizes="100vw"
                unoptimized
              />
            </div>
          ))}
        </div>
        <div className="hero-overlay" aria-hidden="true" />
        <div className="container hero-content">
          <p className="hero-kicker">MECHANICAL ENGINEERING · YONSEI UNIVERSITY</p>
          <h1 id="hero-title">{tx(locale, "기계공학으로 더 나은 움직임을 만듭니다", "Building better motion through mechanical engineering")}</h1>
          <p>{tx(locale, "에너지·로보틱스·설계·제조·바이오 분야의 교육과 연구를 통해 미래 산업을 이끌 인재와 기술을 키웁니다.", "Through education and research in energy, robotics, design, manufacturing, and bioengineering, we cultivate people and technology to lead future industries.")}</p>
          <div className="hero-actions">
            <Link className="button light" href={hrefFor(locale, "/about")}>{tx(locale, "학부 소개", "About Us")}<ArrowRight size={17} /></Link>
            <Link className="text-button light" href={hrefFor(locale, "/admission/undergraduate")}>{tx(locale, "입학 안내", "Admissions")}<ArrowRight size={17} /></Link>
          </div>
        </div>
        <div className="hero-controls" aria-label={tx(locale, "Hero 이미지 슬라이드", "Hero image carousel")}>
          <button type="button" onClick={() => setActiveHeroSlide((activeHeroSlide - 1 + heroSlides.length) % heroSlides.length)} onPointerUp={(event) => event.currentTarget.blur()} aria-label={tx(locale, "이전 이미지", "Previous image")}><ChevronLeft size={20} /></button>
          <div className="hero-indicators">
            {heroSlides.map((slide, index) => (
              <button
                type="button"
                className={index === activeHeroSlide ? "is-active" : ""}
                aria-current={index === activeHeroSlide ? "true" : undefined}
                aria-label={tx(locale, `${index + 1}번 이미지 보기`, `Show image ${index + 1}`)}
                onClick={() => setActiveHeroSlide(index)}
                onPointerUp={(event) => event.currentTarget.blur()}
                key={slide.id}
              ><span className="sr-only">{index + 1}</span></button>
            ))}
          </div>
          <span className="hero-count" aria-live="polite">{String(activeHeroSlide + 1).padStart(2, "0")} / {String(heroSlides.length).padStart(2, "0")}</span>
          <button type="button" onClick={() => setActiveHeroSlide((activeHeroSlide + 1) % heroSlides.length)} onPointerUp={(event) => event.currentTarget.blur()} aria-label={tx(locale, "다음 이미지", "Next image")}><ChevronRight size={20} /></button>
        </div>
      </section>

      <div className="home-snap-section quick-news-screen" data-home-section>
        <nav className="quick-links" aria-label={tx(locale, "주요 바로가기", "Quick links")}>
          <div className="container quick-links-grid" data-reveal>
            {quickLinks.map((item) => {
              const Icon = item.icon;
              return <Link href={hrefFor(locale, item.path)} key={item.path}><Icon size={23} strokeWidth={1.5} /><span>{locale === "ko" ? item.ko : item.en}</span><ArrowRight size={16} /></Link>;
            })}
          </div>
        </nav>

        <section className="section news-calendar-section">
          <div className="container split-content home-stagger" data-reveal>
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
      </div>

      <section className="research-section section" data-home-section>
        <div className="container" data-reveal>
          <SectionHeading label="RESEARCH" title={tx(locale, "주요 연구 분야", "Research Areas")} link={<Link className="text-button light" href={hrefFor(locale, "/labs")}>{tx(locale, "연구실 전체보기", "All laboratories")}<ArrowRight size={17} /></Link>} />
          <div className="research-grid home-stagger">{directoryResearchAreas.map((area) => <ResearchCard key={area.id} area={area} locale={locale} />)}</div>
        </div>
      </section>

      <section className="section faculty-section" data-home-section>
        <div className="container" data-reveal>
          <SectionHeading label="FACULTY" title={tx(locale, "교수진", "Faculty")} link={<Link className="text-button" href={hrefFor(locale, "/faculty")}>{tx(locale, "전체 교수진", "View all faculty")}<ArrowRight size={17} /></Link>} />
          <div className="faculty-member-grid faculty-member-grid-preview home-stagger">{facultyMembers.slice(0, 4).map((member) => <FacultyMemberCard key={member.id} member={member} locale={locale} variant="preview" />)}</div>
        </div>
      </section>

      <section className="education-section section" data-home-section>
        <div className="container" data-reveal>
          <SectionHeading label="EDUCATION" title={tx(locale, "교육과정", "Curriculum")} />
          <div className="education-grid home-stagger">
            <EducationPanel locale={locale} type="undergraduate" />
            <EducationPanel locale={locale} type="graduate" />
          </div>
        </div>
      </section>

      <section className="section instagram-section" data-home-section>
        <div className="container" data-reveal>
          <SectionHeading label="TODAY" title={tx(locale, "기계공학부의 오늘", "Inside Mechanical Engineering")} link={<a className="text-button" href="https://www.instagram.com/" target="_blank" rel="noreferrer">@YONSEI_ME<ExternalLink size={15} /></a>} />
          <div className="instagram-grid home-stagger">
            {instagramPosts.map((post) => (
              <a className="instagram-card" href="https://www.instagram.com/" target="_blank" rel="noreferrer" key={post.id}>
                <div className="instagram-image"><Image src={post.image} alt="" fill sizes="(max-width: 680px) 44vw, (max-width: 940px) 50vw, 33vw" /><span><Camera size={23} /></span></div>
                <div><p>{t(post.caption, locale)}</p><time>{post.publishedAt}</time></div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
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

const facultyMemberName = (member: FacultyMember, locale: Locale) =>
  locale === "ko"
    ? member.nameKo ?? member.nameEn ?? tx(locale, "교수명 확인 중", "Faculty name pending")
    : member.nameEn ?? member.nameKo ?? tx(locale, "교수명 확인 중", "Faculty name pending");

const facultyMemberAlternateName = (member: FacultyMember, locale: Locale) =>
  locale === "ko" ? member.nameEn : member.nameKo;

const facultyMemberLaboratory = (member: FacultyMember) =>
  researchLabs.find((lab) => lab.professorKo === member.nameKo);

function FacultyMemberPhoto({ member, locale }: { member: FacultyMember; locale: Locale }) {
  const [imageFailed, setImageFailed] = useState(false);
  const name = facultyMemberName(member, locale);
  const alt = tx(locale, `${name} 교수 프로필 사진`, `${name} faculty profile photo`);

  return (
    <div className="faculty-member-photo">
      {member.image && !imageFailed ? (
        <Image src={member.image} alt={alt} fill sizes="(max-width: 680px) 100vw, (max-width: 1180px) 50vw, 33vw" unoptimized onError={() => setImageFailed(true)} />
      ) : (
        <div className="faculty-member-photo-placeholder" role="img" aria-label={alt}><UserRound size={64} strokeWidth={1} /></div>
      )}
    </div>
  );
}

function FacultyMemberDirectory({ locale }: { locale: Locale }) {
  return (
    <>
      <PageHeader eyebrow="FACULTY" title={tx(locale, "교수진", "Faculty")} description={tx(locale, "기계공학부 교수진을 소개합니다.", "Meet the faculty of Mechanical Engineering.")} />
      <section className="section content-section">
        <div className="container">
          <div className="faculty-member-directory-summary"><strong>{facultyMembers.length}</strong> {tx(locale, "명의 교수진", "faculty members")}</div>
          <div className="faculty-member-grid">
            {facultyMembers.map((member) => <FacultyMemberCard key={member.id} member={member} locale={locale} />)}
          </div>
        </div>
      </section>
    </>
  );
}

function FacultyMemberCard({ member, locale, variant = "directory" }: { member: FacultyMember; locale: Locale; variant?: "directory" | "preview" }) {
  const name = facultyMemberName(member, locale);
  const alternateName = facultyMemberAlternateName(member, locale);
  const laboratory = facultyMemberLaboratory(member);
  const laboratoryContext = laboratory
    ? (locale === "ko" ? laboratory.nameKo : laboratory.nameEn)
    : tx(locale, "연구실 정보 확인 중", "Laboratory information pending");

  if (variant === "preview") {
    return (
      <Link href={hrefFor(locale, `/faculty/${member.slug}`)} className="faculty-member-card faculty-member-card-preview" aria-label={tx(locale, `${member.nameKo ?? name} 교수 프로필 보기`, `View ${member.nameEn ?? name}'s profile`)}>
        <FacultyMemberPhoto member={member} locale={locale} />
        <div className="faculty-member-card-body">
          <p className="faculty-member-position">{locale === "ko" ? member.positionKo : member.positionEn}</p>
          <h2>{name}</h2>
          {alternateName && <p className="faculty-member-name-en">{alternateName}</p>}
          <p className="faculty-member-laboratory">{laboratoryContext}</p>
          <span className="faculty-member-detail-link">{tx(locale, "프로필 보기", "View profile")}<ArrowRight size={17} /></span>
        </div>
      </Link>
    );
  }

  return (
    <article className="faculty-member-card">
      <FacultyMemberPhoto member={member} locale={locale} />
      <div className="faculty-member-card-body">
        <p className="faculty-member-position">{locale === "ko" ? member.positionKo : member.positionEn}</p>
        <h2>{name}</h2>
        {alternateName && <p className="faculty-member-name-en">{alternateName}</p>}
        <dl className="faculty-member-contact-list">
          <div><dt>{tx(locale, "이메일", "Email")}</dt><dd>{member.email ? <a href={`mailto:${member.email}`}>{member.email}</a> : tx(locale, "이메일 확인 중", "Email information pending")}</dd></div>
          <div><dt>{tx(locale, "연락처", "Contact")}</dt><dd>{member.phoneNumbers.length ? member.phoneNumbers.map((phone, index) => <span key={phone}>{index > 0 && " · "}<a href={`tel:${phone.replaceAll("-", "")}`}>{phone}</a></span>) : tx(locale, "연락처 확인 중", "Contact information pending")}</dd></div>
          <div><dt>{tx(locale, "위치", "Office")}</dt><dd>{member.office ?? tx(locale, "위치 확인 중", "Office information pending")}</dd></div>
        </dl>
        <Link href={hrefFor(locale, `/faculty/${member.slug}`)} className="faculty-member-detail-link" aria-label={tx(locale, `${member.nameKo ?? name} 교수 상세보기`, `View ${member.nameEn ?? name}'s profile`)}>{tx(locale, "프로필 보기", "View profile")}<ArrowRight size={17} /></Link>
      </div>
    </article>
  );
}

function FacultyMemberDetail({ locale, member }: { locale: Locale; member: FacultyMember }) {
  const name = facultyMemberName(member, locale);
  const alternateName = facultyMemberAlternateName(member, locale);

  return (
    <>
      <PageHeader eyebrow="FACULTY PROFILE" title={name} description={locale === "ko" ? member.positionKo ?? "" : member.positionEn ?? ""} />
      <section className="section content-section">
        <div className="container faculty-member-detail-layout">
          <aside className="faculty-member-detail-aside">
            <FacultyMemberPhoto member={member} locale={locale} />
            <Link className="back-link" href={hrefFor(locale, "/faculty")}><ArrowLeft size={17} />{tx(locale, "교수진 목록", "Faculty directory")}</Link>
          </aside>
          <main>
            <div className="faculty-member-detail-heading">
              <p>{locale === "ko" ? member.positionKo : member.positionEn}</p>
              <h2>{name}</h2>
              {alternateName && <span>{alternateName}</span>}
            </div>
            <dl className="faculty-member-detail-list">
              <div><dt>{tx(locale, "이메일", "Email")}</dt><dd>{member.email ? <a href={`mailto:${member.email}`}>{member.email}</a> : "-"}</dd></div>
              <div><dt>{tx(locale, "연락처", "Contact")}</dt><dd>{member.phoneNumbers.length ? member.phoneNumbers.map((phone, index) => <span key={phone}>{index > 0 && " · "}<a href={`tel:${phone.replaceAll("-", "")}`}>{phone}</a></span>) : tx(locale, "연락처 확인 중", "Contact information pending")}</dd></div>
              <div><dt>{tx(locale, "연구실 위치", "Office")}</dt><dd>{member.office ?? tx(locale, "위치 확인 중", "Office information pending")}</dd></div>
              {member.profileUrl && <div><dt>{tx(locale, "외부 프로필", "External profile")}</dt><dd><a href={member.profileUrl} target="_blank" rel="noopener noreferrer">{member.profileUrl}<ExternalLink size={15} /></a></dd></div>}
            </dl>
            <section className="detail-block faculty-member-research-placeholder"><p className="section-label">RESEARCH INFORMATION</p><h2>{tx(locale, "연구 정보", "Research Information")}</h2><p>{tx(locale, "상세 연구 정보는 추후 업데이트될 예정입니다.", "Detailed research information will be updated soon.")}</p></section>
          </main>
        </div>
      </section>
    </>
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

const researchAreaName = (area: DirectoryResearchArea, locale: Locale) =>
  locale === "ko" ? area.nameKo : area.nameEn;

function ResearchFieldsPage({ locale, searchParams }: { locale: Locale; searchParams: Record<string, string> }) {
  const router = useRouter();
  const selectedArea = directoryResearchAreas.find((area) => area.slug === searchParams.area);
  const primaryLabCounts = useMemo(
    () => new Map(directoryResearchAreas.map((area) => [area.slug, researchLabs.filter((lab) => lab.primaryArea === area.slug).length])),
    [],
  );
  const relatedLabs = selectedArea
    ? researchLabs.filter((lab) => lab.primaryArea === selectedArea.slug || lab.secondaryAreas.includes(selectedArea.slug))
    : [];

  const selectArea = (slug: string) => {
    router.replace(`${hrefFor(locale, "/research/fields")}?area=${encodeURIComponent(slug)}`);
  };

  return (
    <>
      <PageHeader
        eyebrow="RESEARCH AREAS"
        title={tx(locale, "연구 분야", "Research Areas")}
        description={tx(locale, "기계공학부 연구실을 탐색하기 위한 여섯 개의 연구 분야입니다.", "Six research areas for exploring the department's laboratories.")}
      />
      <section className="section content-section">
        <div className="container">
          <div className="research-area-grid" role="list" aria-label={tx(locale, "연구 분야 목록", "Research areas")}>
            {directoryResearchAreas.map((area) => {
              const isSelected = area.slug === selectedArea?.slug;
              const primaryCount = primaryLabCounts.get(area.slug) ?? 0;
              return (
                <button
                  type="button"
                  className={`research-area-card ${isSelected ? "is-selected" : ""}`}
                  aria-pressed={isSelected}
                  onClick={() => selectArea(area.slug)}
                  key={area.id}
                >
                  <span>{String(area.displayOrder).padStart(2, "0")}</span>
                  <strong>{researchAreaName(area, locale)}</strong>
                  <small>{locale === "ko" ? area.nameEn : area.nameKo}</small>
                  <p>{area.shortDescription}</p>
                  <em>{tx(locale, `주 연구실 ${primaryCount}개`, `${primaryCount} primary labs`)}</em>
                </button>
              );
            })}
          </div>

          {selectedArea ? (
            <section className="research-fields-results" aria-live="polite">
              <SectionHeading
                label="LABORATORIES"
                title={tx(locale, `${selectedArea.nameKo} 관련 연구실`, `${selectedArea.nameEn} Laboratories`)}
                link={<Link className="text-button" href={hrefFor(locale, `/labs?area=${selectedArea.slug}`)}>{tx(locale, "전체 연구실 보기", "View all laboratories")}<ArrowRight size={17} /></Link>}
              />
              <p className="research-fields-count"><strong>{relatedLabs.length}</strong> {tx(locale, "개 연구실", "laboratories")}</p>
              <div className="laboratory-directory-grid laboratory-directory-grid-compact">
                {relatedLabs.map((lab) => <LabCard key={lab.id} lab={lab} locale={locale} />)}
              </div>
            </section>
          ) : (
            <div className="research-fields-empty">
              <p>{tx(locale, "연구 분야를 선택하면 관련 연구실을 확인할 수 있습니다.", "Select a research area to view related laboratories.")}</p>
              <Link className="text-button" href={hrefFor(locale, "/labs")}>{tx(locale, "전체 연구실 보기", "View all laboratories")}<ArrowRight size={17} /></Link>
            </div>
          )}

          <p className="research-classification-note">{tx(locale, "연구 분야는 홈페이지 정보 탐색을 위한 분류이며, 학부 제공 자료에 따라 조정될 수 있습니다.", "Research areas are an information-navigation classification and may be adjusted according to department-provided materials.")}</p>
        </div>
      </section>
    </>
  );
}

function ResearchLabDirectory({ locale, searchParams }: { locale: Locale; searchParams: Record<string, string> }) {
  const router = useRouter();
  const initialArea = directoryResearchAreas.some((area) => area.slug === searchParams.area) ? searchParams.area : "all";
  const [area, setArea] = useState(initialArea);
  const [query, setQuery] = useState(searchParams.q ?? "");
  const primaryLabCounts = useMemo(
    () => new Map(directoryResearchAreas.map((item) => [item.slug, researchLabs.filter((lab) => lab.primaryArea === item.slug).length])),
    [],
  );

  useEffect(() => {
    setArea(initialArea);
    setQuery(searchParams.q ?? "");
  }, [initialArea, searchParams.q]);

  const results = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    return researchLabs.filter((lab) => {
      const matchesArea = area === "all" || lab.primaryArea === area || lab.secondaryAreas.includes(area as DirectoryResearchArea["slug"]);
      const searchable = `${lab.nameKo} ${lab.nameEn} ${lab.professorKo} ${lab.professorEn}`.toLocaleLowerCase();
      return matchesArea && (!normalizedQuery || searchable.includes(normalizedQuery));
    });
  }, [area, query]);

  const syncUrl = (nextArea: string, nextQuery: string) => {
    const params = new URLSearchParams();
    if (nextArea !== "all") params.set("area", nextArea);
    if (nextQuery.trim()) params.set("q", nextQuery.trim());
    router.replace(`${hrefFor(locale, "/labs")}${params.size ? `?${params.toString()}` : ""}`);
  };

  const updateQuery = (nextQuery: string) => {
    setQuery(nextQuery);
    syncUrl(area, nextQuery);
  };

  const updateArea = (nextArea: string) => {
    setArea(nextArea);
    syncUrl(nextArea, query);
  };

  const reset = () => {
    setArea("all");
    setQuery("");
    router.replace(hrefFor(locale, "/labs"));
  };

  const hasActiveFilters = area !== "all" || Boolean(query.trim());

  return (
    <>
      <PageHeader
        eyebrow="LABORATORIES"
        title={tx(locale, "연구실", "Laboratories")}
        description={tx(locale, "연구실명 또는 교수명으로 검색해 보세요.", "Search by laboratory or faculty advisor.")}
      />
      <section className="section content-section">
        <div className="container">
          <div className="laboratory-directory-toolbar">
            <div className="laboratory-area-tabs" role="tablist" aria-label={tx(locale, "연구 분야 필터", "Research area filters")}>
              <button type="button" role="tab" aria-selected={area === "all"} className={area === "all" ? "is-selected" : ""} onClick={() => updateArea("all")}><span>{tx(locale, "전체", "All")}</span><small>{researchLabs.length}</small></button>
              {directoryResearchAreas.map((item) => (
                <button type="button" role="tab" aria-selected={area === item.slug} className={area === item.slug ? "is-selected" : ""} onClick={() => updateArea(item.slug)} key={item.id}>
                  <span>{researchAreaName(item, locale)}</span><small>{primaryLabCounts.get(item.slug) ?? 0}</small>
                </button>
              ))}
            </div>
            <form className="laboratory-directory-search" onSubmit={(event: FormEvent<HTMLFormElement>) => { event.preventDefault(); syncUrl(area, query); }}>
              <label className="sr-only" htmlFor="lab-query">{tx(locale, "연구실명 또는 지도교수명", "Laboratory or faculty advisor")}</label>
              <div className="laboratory-search-field"><Search size={18} aria-hidden="true" /><input id="lab-query" value={query} onChange={(event) => updateQuery(event.target.value)} placeholder={tx(locale, "연구실명 또는 교수명 검색", "Search laboratory or faculty advisor")} /><button type="submit">{tx(locale, "검색", "Search")}</button></div>
              {hasActiveFilters && <button className="laboratory-filter-reset" type="button" onClick={reset}>{tx(locale, "초기화", "Reset")}</button>}
            </form>
          </div>
          <div className="laboratory-directory-summary"><p><strong>{results.length}</strong> {tx(locale, "개 연구실", "laboratories")}</p><span>{tx(locale, "주·관련 연구 분야 포함", "Primary and secondary areas included")}</span></div>
          {results.length ? <div className="laboratory-directory-grid">{results.map((lab) => <LabCard key={lab.id} lab={lab} locale={locale} />)}</div> : <EmptyState locale={locale} />}
        </div>
      </section>
    </>
  );
}

function LabCard({ lab, locale }: { lab: ResearchLab; locale: Locale }) {
  const primaryArea = directoryResearchAreas.find((area) => area.slug === lab.primaryArea);
  const secondaryAreas = lab.secondaryAreas
    .map((slug) => directoryResearchAreas.find((area) => area.slug === slug))
    .filter((area): area is DirectoryResearchArea => Boolean(area));

  return (
    <article className="laboratory-directory-card">
      <header>
        {primaryArea && <p className="laboratory-primary-area">{researchAreaName(primaryArea, locale)}</p>}
        <h2>{locale === "ko" ? lab.nameKo : lab.nameEn}</h2>
        <p className="laboratory-name-en">{locale === "ko" ? lab.nameEn : lab.nameKo}</p>
      </header>
      <dl className="laboratory-meta-list">
        <div><dt>{tx(locale, "지도교수", "Faculty advisor")}</dt><dd>{locale === "ko" ? `${lab.professorKo} · ${lab.professorEn}` : `${lab.professorEn} · ${lab.professorKo}`}</dd></div>
        <div><dt>{tx(locale, "위치", "Location")}</dt><dd>{lab.location ?? tx(locale, "위치 확인 중", "Location information pending")}</dd></div>
        <div><dt>{tx(locale, "연락처", "Contact")}</dt><dd>{lab.phoneNumbers.length ? lab.phoneNumbers.map((phone, index) => <span key={phone}>{index > 0 && " · "}<a href={`tel:${phone.replaceAll("-", "")}`}>{phone}</a></span>) : tx(locale, "연락처 확인 중", "Contact information pending")}</dd></div>
      </dl>
      {secondaryAreas.length > 0 && <div className="laboratory-secondary-areas" aria-label={tx(locale, "관련 연구 분야", "Related research areas")}>{secondaryAreas.map((item) => <span key={item.id}>{researchAreaName(item, locale)}</span>)}</div>}
      <Link className="laboratory-directory-detail-link" href={hrefFor(locale, `/labs/${lab.slug}`)} aria-label={tx(locale, `${lab.nameKo} 상세보기`, `View details for ${lab.nameEn}`)}>{tx(locale, "상세보기", "View details")}<ArrowRight size={17} /></Link>
    </article>
  );
}

function ResearchLabDetail({ locale, lab }: { locale: Locale; lab: ResearchLab }) {
  const primaryArea = directoryResearchAreas.find((area) => area.slug === lab.primaryArea);
  const secondaryAreas = lab.secondaryAreas
    .map((slug) => directoryResearchAreas.find((area) => area.slug === slug))
    .filter((area): area is DirectoryResearchArea => Boolean(area));
  const pendingMessage = "연구실 상세 소개는 추후 업데이트될 예정입니다.";

  return (
    <>
      <PageHeader eyebrow="LABORATORY" title={locale === "ko" ? lab.nameKo : lab.nameEn} description={locale === "ko" ? lab.nameEn : lab.nameKo} />
      <section className="section content-section">
        <div className="container research-lab-detail-layout">
          <main>
            <section className="detail-block first">
              <p className="section-label">LABORATORY INFORMATION</p>
              <h2>{tx(locale, "연구실 정보", "Laboratory Information")}</h2>
              <dl className="research-lab-detail-list">
                <div><dt>{tx(locale, "연구실명", "Laboratory")}</dt><dd>{lab.nameKo}</dd></div>
                <div><dt>{tx(locale, "영문명", "English name")}</dt><dd>{lab.nameEn}</dd></div>
                <div><dt>{tx(locale, "지도교수", "Faculty advisor")}</dt><dd>{lab.professorKo} · {lab.professorEn}</dd></div>
                <div><dt>{tx(locale, "주 연구 분야", "Primary research area")}</dt><dd>{primaryArea ? researchAreaName(primaryArea, locale) : "-"}</dd></div>
                <div><dt>{tx(locale, "관련 연구 분야", "Related research areas")}</dt><dd>{secondaryAreas.length ? secondaryAreas.map((area) => researchAreaName(area, locale)).join(" · ") : "-"}</dd></div>
                <div><dt>{tx(locale, "위치", "Location")}</dt><dd>{lab.location ?? "-"}</dd></div>
                <div><dt>{tx(locale, "연락처", "Contact")}</dt><dd>{lab.phoneNumbers.length ? lab.phoneNumbers.join(" · ") : tx(locale, "연락처 확인 중", "Contact information pending")}</dd></div>
              </dl>
            </section>
            <section className="detail-block">
              <p className="section-label">ABOUT</p>
              <h2>{tx(locale, "연구실 소개", "About the Laboratory")}</h2>
              <p>{lab.description ?? pendingMessage}</p>
            </section>
            <section className="detail-block">
              <p className="section-label">HOMEPAGE</p>
              <h2>{tx(locale, "홈페이지", "Homepage")}</h2>
              {lab.homepageUrl ? <a className="text-button" href={lab.homepageUrl} target="_blank" rel="noopener noreferrer">{lab.homepageUrl}<ExternalLink size={16} /></a> : <p>{pendingMessage}</p>}
            </section>
          </main>
          <aside className="detail-nav">
            <p>{tx(locale, "연구 분야", "Research areas")}</p>
            {directoryResearchAreas.map((area) => <Link href={hrefFor(locale, `/research/fields?area=${area.slug}`)} key={area.id}><span>{String(area.displayOrder).padStart(2, "0")}</span>{researchAreaName(area, locale)}</Link>)}
          </aside>
        </div>
      </section>
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
  return <><PageHeader eyebrow="LABORATORIES" title={tx(locale, "연구실", "Laboratories")} description={tx(locale, "연구분야별 연구실과 담당 교수진을 연결해 확인합니다.", "Discover laboratories and their connected faculty by research area.")} /><section className="section content-section"><div className="container lab-grid">{labs.map((lab) => <LegacyLabCard key={lab.id} lab={lab} locale={locale} />)}</div></section></>;
}

function LegacyLabCard({ lab, locale }: { lab: Lab; locale: Locale }) {
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

function PlaceholderPage({ locale, segments }: { locale: Locale; segments: string[] }) {
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
  const relatedNavigation = getActiveNavigationItem(`/${segments.join("/")}`);
  return <><PageHeader eyebrow={(section ?? "DEPARTMENT").toUpperCase()} title={label} description={description} /><section className="section content-section"><div className="container generic-layout"><main><p className="section-label">CONTENT</p><h2>{tx(locale, "콘텐츠 준비 중", "Content in preparation")}</h2><p>{tx(locale, "공식 콘텐츠를 준비하고 있습니다. 확인되는 대로 업데이트하겠습니다.", "Official content is being prepared and will be updated when confirmed.")}</p>{isDirections && <div className="contact-placeholder"><MapPin size={34} /><div><h3>{tx(locale, "위치 및 연락처", "Location & Contact")}</h3><p>{tx(locale, "[공식 주소 확인 필요]", "[Official address required]")}</p><p>{tx(locale, "[대표 전화 및 이메일 확인 필요]", "[Official phone and email required]")}</p></div></div>}</main><aside><p>{tx(locale, "관련 페이지", "Related Pages")}</p>{relatedNavigation?.children.slice(0, 6).map((item) => <Link href={hrefFor(locale, item.path)} key={item.path}>{t(item.label, locale)}<ArrowRight size={16} /></Link>)}</aside></div></section></>;
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
  else if (section === "faculty" && second && getFacultyMemberBySlug(second)) page = <FacultyMemberDetail locale={locale} member={getFacultyMemberBySlug(second)!} />;
  else if (section === "faculty" && !second) page = <FacultyMemberDirectory locale={locale} />;
  else if (section === "faculty" && second && getFacultyBySlug(second)) page = <FacultyDetail locale={locale} person={getFacultyBySlug(second)!} />;
  else if (section === "research" && second === "fields") page = <ResearchFieldsPage locale={locale} searchParams={searchParams} />;
  else if (section === "research" && second && getResearchAreaBySlug(second)) page = <ResearchDetail locale={locale} area={getResearchAreaBySlug(second)!} />;
  else if (section === "research" && !second) page = <ResearchFieldsPage locale={locale} searchParams={searchParams} />;
  else if (section === "labs" && second && getResearchLabBySlug(second)) page = <ResearchLabDetail locale={locale} lab={getResearchLabBySlug(second)!} />;
  else if (section === "labs" && second && getLabBySlug(second)) page = <LabDetail locale={locale} lab={getLabBySlug(second)!} />;
  else if (section === "labs" && !second) page = <ResearchLabDirectory locale={locale} searchParams={searchParams} />;
  else if (section === "academics" && second === "courses" && third && getCourseBySlug(third)) page = <CourseDetail locale={locale} course={getCourseBySlug(third)!} />;
  else if (section === "academics" && second === "courses") page = <CourseDirectory locale={locale} searchParams={searchParams} />;
  else if (section === "news" && second === "notices" && third && getNoticeBySlug(third)) page = <NoticeDetail locale={locale} notice={getNoticeBySlug(third)!} />;
  else if (section === "news" && second === "notices") page = <NoticeDirectory locale={locale} searchParams={searchParams} />;
  else if (section === "news" && second === "calendar") page = <CalendarPage locale={locale} />;
  else if (section === "search") page = <SearchPage locale={locale} searchParams={searchParams} />;
  else if (section === "promotion" && second === "instagram") page = <HomePage locale={locale} />;
  else page = <PlaceholderPage locale={locale} segments={segments} />;

  return (
    <div className="site-shell">
      <SiteHeader locale={locale} segments={segments} openMenu={openMenu} setOpenMenu={setOpenMenu} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} mobileSection={mobileSection} setMobileSection={setMobileSection} searchOpen={searchOpen} setSearchOpen={setSearchOpen} />
      <Breadcrumb locale={locale} segments={segments} />
      <main id="main-content">{page}</main>
      <SiteFooter locale={locale} />
    </div>
  );
}
