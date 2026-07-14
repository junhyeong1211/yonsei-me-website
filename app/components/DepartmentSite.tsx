"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { FormEvent, ReactNode, RefObject } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { FaInstagram } from "react-icons/fa";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  BriefcaseBusiness,
  BusFront,
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
  Paperclip,
  RotateCcw,
  Search,
  TrainFront,
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
import { calendarEventsByMonth, type CalendarEvent } from "../data/calendar";
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
import {
  undergraduateLearningExperiences,
  undergraduateProgramYears,
} from "../data/undergraduateProgram";
import {
  undergraduateCourseOfferings,
  type UndergraduateCourseCategory,
  type UndergraduateCourseOffering,
} from "../data/undergraduateCourseOfferings";
import {
  electiveUndergraduateCourseDetails,
  getUndergraduateCourseDetail,
  requiredUndergraduateCourseDetails,
  type UndergraduateCourseDetail,
} from "../data/undergraduateCourseDetails";
import {
  getUndergraduateGraduationRequirement,
  type AdditionalProgramRequirement,
  type CurriculumSection,
  type MajorTypeSummary,
} from "../data/undergraduateGraduationRequirements";
import {
  graduateGraduationRequirements,
  type GraduateGraduationRequirementSection,
  type GraduateRequirementTable,
} from "../data/graduateGraduationRequirements";
import {
  externalGraduateHandbookUrl,
  graduateCourseLevelMatches,
  graduateCourses,
  type GraduateCourse,
  type GraduateCourseLevelFilter,
} from "../data/graduateCourses";
import {
  aboutDepartmentIntroduction,
  aboutEducationalGoals,
  aboutEducationalPurpose,
} from "../data/about";
import { administrativeStaff } from "../data/staff";
import { getStudentActivityBySlug, studentActivities, type StudentActivity } from "../data/studentActivities";
import { facultyRecruitment } from "../data/facultyRecruitment";
import { getNewsBySlug, newsPosts } from "../data/news";
import { getSeminarBySlug, seminarPosts } from "../data/seminars";
import { eventPosts, getEventBySlug } from "../data/events";
import { EditorialBoardPage, EditorialDetailPage, NewsDirectoryPage, ProgramsDirectoryPage } from "./NewsContent";
import { AlumniPartnershipsPage } from "./AlumniPartnershipsPage";
import { searchSiteDocuments } from "../data/searchIndex";
import { departmentHistory } from "../data/history";
import {
  scholarshipCategoryLabels,
  scholarships,
  type Scholarship,
  type ScholarshipCategory,
} from "../data/scholarships";
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
import { departmentDirections } from "../data/directions";
import {
  graduateAdmissionUrl,
  undergraduateAdmission,
  undergraduateAdmissionUrl,
} from "../data/undergraduateAdmission";
import {
  careerCategoryLabels,
  careerPosts,
  getCareerPostBySlug,
  type CareerCategory,
  type CareerPost,
} from "../data/careers";
import {
  curriculumSemesters,
  curriculumTreeCourses,
  curriculumTreeSource,
  liberalEducationAreas,
  type CurriculumSemester,
  type CurriculumTreeCourse,
} from "../data/curriculumTree";
import { researchVisionCapabilities } from "../data/researchVisionCapabilities";
import { socialChallenges } from "../data/socialChallenges";
import researchPageStyles from "./ResearchPages.module.css";

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
  { ko: "교과목 안내", en: "Courses", path: "/academics/courses", icon: BookOpen },
  { ko: "대학원 진학", en: "Graduate Admission", path: "/admission/graduate", icon: GraduationCap, externalUrl: graduateAdmissionUrl, ariaLabel: "연세대학교 일반대학원 입학 안내 새 창에서 열기" },
  { ko: "취업 정보", en: "Careers", path: "/admission/careers", icon: BriefcaseBusiness },
  { ko: "오시는 길", en: "Directions", path: "/about/directions", icon: MapPin },
];

const homeSectionNavigation = [
  { code: "HOME", ko: "메인", en: "Home" },
  { code: "NOTICE", ko: "공지·일정", en: "Notices and calendar" },
  { code: "RESEARCH", ko: "주요 연구 분야", en: "Research areas" },
  { code: "FACULTY", ko: "교수진", en: "Faculty" },
  { code: "EDUCATION", ko: "교육과정", en: "Curriculum" },
  { code: "TODAY", ko: "학부 SNS", en: "Department social media" },
  { code: "FOOTER", ko: "하단 정보", en: "Footer information" },
];

const routeLabels: Record<string, LocaleText> = {
  about: { ko: "학부소개", en: "About" },
  greeting: { ko: "학부장 인사말", en: "Chair's Message" },
  vision: { ko: "비전 및 교육목표", en: "Vision & Objectives" },
  history: { ko: "연혁", en: "History" },
  staff: { ko: "교직원", en: "Staff" },
  "student-activities": { ko: "학생활동·동아리", en: "Student Activities" },
  alumni: { ko: "동문·대외협력", en: "Alumni & Partnerships" },
  "alumni-partnerships": { ko: "동문·대외협력", en: "Alumni & Partnerships" },
  contact: { ko: "조직 및 연락처", en: "Organization & Contact" },
  directions: { ko: "오시는 길", en: "Directions" },
  faculty: { ko: "교수진", en: "Faculty" },
  labs: { ko: "연구실", en: "Laboratories" },
  research: { ko: "연구분야", en: "Research" },
  fields: { ko: "연구 분야", en: "Research Areas" },
  "vision-capabilities": { ko: "연구 비전·역량", en: "Research Vision & Capabilities" },
  "social-challenges": { ko: "사회난제 신문고", en: "Social Challenges" },
  academics: { ko: "교육과정", en: "Academics" },
  undergraduate: { ko: "학부 교육과정", en: "Undergraduate Program" },
  graduate: { ko: "대학원과정", en: "Graduate" },
  courses: { ko: "교과목 안내", en: "Courses" },
  requirements: { ko: "졸업요건", en: "Requirements" },
  scholarships: { ko: "장학 안내", en: "Scholarships" },
  "curriculum-tree": { ko: "교과목 체계도", en: "Curriculum Tree" },
  news: { ko: "학과소식", en: "News" },
  department: { ko: "뉴스", en: "News" },
  notices: { ko: "공지사항", en: "Notices" },
  programs: { ko: "세미나·행사", en: "Seminars & Events" },
  seminars: { ko: "세미나·행사", en: "Seminars & Events" },
  events: { ko: "세미나·행사", en: "Seminars & Events" },
  "faculty-recruitment": { ko: "교수 초빙", en: "Faculty Recruitment" },
  calendar: { ko: "학사일정", en: "Academic Calendar" },
  careers: { ko: "취업 정보", en: "Career Information" },
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
  const breadcrumbItems = segments
    .map((segment, index) => ({ segment, index }))
    .filter(({ index }) => !(segments[0] === "academics" && segments.length > 1 && index === 0));

  return (
    <nav className="breadcrumb container" aria-label={tx(locale, "현재 위치", "Breadcrumb")}>
      <Link href={hrefFor(locale)}>{tx(locale, "홈", "Home")}</Link>
      {breadcrumbItems.map(({ segment, index }, itemIndex) => {
        const path = `/${segments.slice(0, index + 1).join("/")}`;
        const area = researchAreas.find((item) => item.slug === segment);
        const researchLab = getResearchLabBySlug(segment);
        const facultyMember = getFacultyMemberBySlug(segment);
        const person = faculty.find((item) => item.slug === segment);
        const course = courses.find((item) => item.slug === segment);
        const notice = notices.find((item) => item.slug === segment);
        const career = getCareerPostBySlug(segment);
        const studentActivity = getStudentActivityBySlug(segment);
        const admissionLabel = segments[0] === "admission" && index === 1
          ? ({
              undergraduate: { ko: "학부 입학", en: "Undergraduate Admission" },
              graduate: { ko: "대학원 진학", en: "Graduate Admission" },
              careers: { ko: "취업 정보", en: "Career Information" },
            } as Record<string, LocaleText>)[segment]
          : undefined;
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
                : career
                  ? (locale === "ko" ? career.titleKo : career.titleEn)
                  : studentActivity
                    ? t(studentActivity.name, locale)
                    : admissionLabel
                      ? t(admissionLabel, locale)
                      : routeLabels[segment]
                        ? t(routeLabels[segment], locale)
                        : segment;
        const isLast = itemIndex === breadcrumbItems.length - 1;
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
    <Link
      href={hrefFor(locale, `/research/fields?area=${area.slug}#research-laboratories`)}
      className="research-card"
      aria-label={tx(locale, `${area.nameKo} 연구실 목록 보기`, `View laboratories in ${area.nameEn}`)}
    >
      <span className="research-card-number" aria-hidden="true">{String(area.displayOrder).padStart(2, "0")}</span>
      <h3>{locale === "ko" ? area.nameKo : area.nameEn}</h3>
      <p className="research-en">{locale === "ko" ? area.nameEn : area.nameKo}</p>
      <p className="research-description">{area.shortDescription}</p>
      <ArrowUpRight className="research-card-arrow" size={19} aria-hidden="true" />
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
  const navButtonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [megaMenuCenters, setMegaMenuCenters] = useState<Record<string, number>>({});
  const currentPath = segments.length ? `/${segments.join("/")}` : "/";
  const localeSuffix = segments.length ? `/${segments.join("/")}` : "";
  const activeItemKey = getActiveNavigationItem(currentPath)?.key;

  useEffect(() => {
    if (!openMenu) return;

    const syncMegaMenuCenters = () => {
      const shell = headerShellRef.current;
      if (!shell) return;

      const shellRect = shell.getBoundingClientRect();
      const centers = Object.fromEntries(
        navigation.flatMap((item) => {
          const button = navButtonRefs.current[item.key];
          if (!button) return [];

          const rect = button.getBoundingClientRect();
          return [[item.key, rect.left - shellRect.left + rect.width / 2] as const];
        }),
      );

      setMegaMenuCenters(centers);
    };

    const frame = window.requestAnimationFrame(syncMegaMenuCenters);
    window.addEventListener("resize", syncMegaMenuCenters);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", syncMegaMenuCenters);
    };
  }, [openMenu]);

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
        data-locale={locale}
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
                      ref={(button) => {
                        navButtonRefs.current[item.key] = button;
                      }}
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
              <a href="https://www.instagram.com/yonsei_mech/" target="_blank" rel="noopener noreferrer" className="icon-button" aria-label="Yonsei Mechanical Engineering Instagram" title="Instagram">
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
            <div className="mega-menu-grid">
              {navigation.map((item) => (
                <section
                  className={`mega-menu-column${openMenu === item.key ? " active" : ""}`}
                  key={item.key}
                  onMouseEnter={() => setOpenMenu(item.key)}
                  style={{ left: `${megaMenuCenters[item.key] ?? 0}px` }}
                >
                  <div className="mega-menu-links">
                    {item.children.map((child) => child.externalUrl ? (
                      <a
                        key={`${item.key}-${child.path}`}
                        href={child.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={child.ariaLabel}
                        onClick={() => setOpenMenu(null)}
                        onFocus={() => setOpenMenu(item.key)}
                      >
                        {t(child.label, locale)}<ExternalLink size={13} aria-hidden="true" />
                      </a>
                    ) : (
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
                    {item.children.map((child) => child.externalUrl ? (
                      <a href={child.externalUrl} target="_blank" rel="noopener noreferrer" aria-label={child.ariaLabel} key={child.path} onClick={() => { setMobileOpen(false); setMobileSection(null); }}>
                        {t(child.label, locale)}<ExternalLink size={14} aria-hidden="true" />
                      </a>
                    ) : (
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
            <a href="https://www.instagram.com/yonsei_mech/" target="_blank" rel="noopener noreferrer" aria-label="Yonsei Mechanical Engineering Instagram">Instagram <ExternalLink size={14} /></a>
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
            <input id="global-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={tx(locale, "교수, 교과목, 장학, 입학, 공지 검색", "Search faculty, courses, scholarships, admissions, notices")} autoFocus />
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
              return item.externalUrl ? (
                <a href={item.externalUrl} target="_blank" rel="noopener noreferrer" aria-label={item.ariaLabel} key={item.path}><Icon size={23} strokeWidth={1.5} /><span>{locale === "ko" ? item.ko : item.en}</span><ExternalLink size={16} /></a>
              ) : <Link href={hrefFor(locale, item.path)} key={item.path}><Icon size={23} strokeWidth={1.5} /><span>{locale === "ko" ? item.ko : item.en}</span><ArrowRight size={16} /></Link>;
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
        <div className="container">
          <div className="research-index-layout">
            <header className="research-index-header">
              <p className="section-label">RESEARCH</p>
              <h2>{tx(locale, "주요 연구 분야", "Research Areas")}</h2>
              <Link className="research-all-link" href={hrefFor(locale, "/labs")}>{tx(locale, "연구실 전체보기", "All laboratories")}<ArrowRight size={17} aria-hidden="true" /></Link>
            </header>
            <nav className="research-grid" aria-label={tx(locale, "주요 연구 분야", "Research areas")}>
              {directoryResearchAreas.map((area) => <ResearchCard key={area.id} area={area} locale={locale} />)}
            </nav>
          </div>
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
          <SectionHeading label="SOCIAL MEDIA" title={tx(locale, "기계공학부 SNS", "Mechanical Engineering SNS")} link={<a className="text-button" href="https://www.instagram.com/yonsei_mech/" target="_blank" rel="noopener noreferrer" aria-label="Yonsei Mechanical Engineering Instagram, opens in a new tab">@YONSEI_MECH<ExternalLink size={15} /></a>} />
          <div className="instagram-grid home-stagger">
            {instagramPosts.map((post) => (
              <a className="instagram-card" href="https://www.instagram.com/yonsei_mech/" target="_blank" rel="noopener noreferrer" aria-label={`${t(post.caption, locale)} · Instagram`} key={post.id}>
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
      <Link className="text-button" href={hrefFor(locale, undergraduate ? "/academics/undergraduate" : "/academics/graduate")}><ArrowLink>{undergraduate ? tx(locale, "학부 교육과정 보기", "View undergraduate program") : tx(locale, "대학원 안내", "Graduate information")}</ArrowLink></Link>
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
  const label = event.time ? `${event.category} · ${t(event.time, locale)}` : event.category;
  return (
    <div className="event-row">
      <div className="event-date"><span>{date.toLocaleString("en", { month: "short" }).toUpperCase()}</span><strong>{String(date.getDate()).padStart(2, "0")}</strong></div>
      <div><span>{label}</span><h3>{t(event.title, locale)}</h3></div>
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
  const laboratory = facultyMemberLaboratory(member);

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
            </dl>
            {(laboratory || member.officialProfileUrl) && <div className="faculty-member-detail-actions">
              {laboratory && <Link className="faculty-laboratory-view-link" href={hrefFor(locale, `/labs/${laboratory.slug}`)}>{tx(locale, "연구실 보기", "View laboratory")}<ArrowRight size={17} aria-hidden="true" /></Link>}
              {member.officialProfileUrl && <a className="detail-external-link" href={member.officialProfileUrl} target="_blank" rel="noopener noreferrer" aria-label={tx(locale, `${member.nameKo ?? name} 공식 프로필 보기, 새 탭에서 열림`, `View official profile for ${member.nameEn ?? name}, opens in a new tab`)}>{tx(locale, "공식 프로필 보기", "View Official Profile")}<ExternalLink size={16} aria-hidden="true" /></a>}
            </div>}
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

function ResearchVisionCapabilitiesPage({ locale }: { locale: Locale }) {
  const vision = researchVisionCapabilities.vision;
  const capabilities = researchVisionCapabilities.capabilities;

  return (
    <>
      <PageHeader
        eyebrow={t(researchVisionCapabilities.eyebrow, locale)}
        title={t(researchVisionCapabilities.title, locale)}
        description={t(researchVisionCapabilities.description, locale)}
      />
      <main className={researchPageStyles.page}>
        <section className={researchPageStyles.section} aria-labelledby="research-vision-heading">
          <div className="container">
            <header className={researchPageStyles.sectionHeader}>
              <div>
                <p className={researchPageStyles.eyebrow}>{t(vision.eyebrow, locale)}</p>
                <h2 id="research-vision-heading">{t(vision.title, locale)}</h2>
              </div>
            </header>
            <div className={researchPageStyles.visionGrid}>
              {vision.items.map((item) => (
                <article className={researchPageStyles.visionItem} key={item.number}>
                  <span className={researchPageStyles.itemNumber}>{item.number}</span>
                  <h3>{t(item.title, locale)}</h3>
                  <p>{t(item.description, locale)}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={researchPageStyles.section} aria-labelledby="research-capabilities-heading">
          <div className="container">
            <header className={researchPageStyles.sectionHeader}>
              <div>
                <p className={researchPageStyles.eyebrow}>{t(capabilities.eyebrow, locale)}</p>
                <h2 id="research-capabilities-heading">{t(capabilities.title, locale)}</h2>
              </div>
            </header>
            <div className={researchPageStyles.capabilityGrid}>
              {capabilities.items.map((item) => (
                <article className={researchPageStyles.capabilityItem} key={item.number}>
                  <span className={researchPageStyles.itemNumber}>{item.number}</span>
                  <h3>{t(item.title, locale)}</h3>
                  <p>{t(item.description, locale)}</p>
                </article>
              ))}
            </div>
            <nav className={researchPageStyles.relatedLinks} aria-label={tx(locale, "연구 역량 관련 페이지", "Research capability related pages")}>
              {researchVisionCapabilities.relatedLinks.map((item) => (
                <Link href={hrefFor(locale, item.path)} key={item.path}>
                  {t(item.label, locale)}
                  <ArrowRight size={17} aria-hidden="true" />
                </Link>
              ))}
            </nav>
          </div>
        </section>
      </main>
    </>
  );
}

function SocialChallengesPage({ locale }: { locale: Locale }) {
  const eligibleUse = socialChallenges.eligibleUse;
  const process = socialChallenges.process;
  const preparation = socialChallenges.preparation;

  return (
    <>
      <PageHeader
        eyebrow={t(socialChallenges.eyebrow, locale)}
        title={t(socialChallenges.title, locale)}
        description={t(socialChallenges.description, locale)}
      />
      <main className={researchPageStyles.page}>
        <section className={researchPageStyles.section} aria-labelledby="social-challenge-eligible-heading">
          <div className="container">
            <header className={researchPageStyles.simpleHeader}>
              <p className={researchPageStyles.eyebrow}>ELIGIBILITY</p>
              <h2 id="social-challenge-eligible-heading">{t(eligibleUse.title, locale)}</h2>
            </header>
            <ul className={researchPageStyles.eligibleList}>
              {eligibleUse.items.map((item) => <li key={item.title.ko}>{t(item.title, locale)}</li>)}
            </ul>
            <p className={researchPageStyles.reviewNotice}>{t(eligibleUse.notice, locale)}</p>
          </div>
        </section>

        <section className={researchPageStyles.section} aria-labelledby="social-challenge-process-heading">
          <div className="container">
            <header className={researchPageStyles.simpleHeader}>
              <p className={researchPageStyles.eyebrow}>PROCESS</p>
              <h2 id="social-challenge-process-heading">{t(process.title, locale)}</h2>
            </header>
            <ol className={researchPageStyles.processGrid}>
              {process.items.map((item) => (
                <li key={item.number}>
                  <span className={researchPageStyles.itemNumber}>{item.number}</span>
                  <h3>{t(item.title, locale)}</h3>
                  <p>{t(item.description!, locale)}</p>
                </li>
              ))}
            </ol>
            <div className={researchPageStyles.application}>
              <a
                className={researchPageStyles.applicationLink}
                href={socialChallenges.application.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="사회난제 신문고 신청서 새 창에서 열기"
              >
                {t(socialChallenges.application.label, locale)}
                <ExternalLink size={17} aria-hidden="true" />
              </a>
              <p>{t(socialChallenges.application.note, locale)}</p>
            </div>
          </div>
        </section>

        <section className={researchPageStyles.section} aria-labelledby="social-challenge-preparation-heading">
          <div className="container">
            <header className={researchPageStyles.simpleHeader}>
              <p className={researchPageStyles.eyebrow}>BEFORE APPLYING</p>
              <h2 id="social-challenge-preparation-heading">{t(preparation.title, locale)}</h2>
            </header>
            <ul className={researchPageStyles.preparationGrid}>
              {preparation.items.map((item) => <li key={item.title.ko}>{t(item.title, locale)}</li>)}
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}

function ResearchFieldsPage({ locale, searchParams }: { locale: Locale; searchParams: Record<string, string> }) {
  const router = useRouter();
  const pendingAreaScroll = useRef<string | null>(null);
  const selectedArea = directoryResearchAreas.find((area) => area.slug === searchParams.area);
  const primaryLabCounts = useMemo(
    () => new Map(directoryResearchAreas.map((area) => [area.slug, researchLabs.filter((lab) => lab.primaryArea === area.slug).length])),
    [],
  );
  const relatedLabs = selectedArea
    ? researchLabs.filter((lab) => lab.primaryArea === selectedArea.slug || lab.secondaryAreas.includes(selectedArea.slug))
    : [];

  const scrollToLaboratories = () => {
    document.getElementById("research-laboratories")?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "start",
    });
  };

  useEffect(() => {
    if (!selectedArea || pendingAreaScroll.current !== selectedArea.slug) return;

    const frame = window.requestAnimationFrame(() => {
      scrollToLaboratories();
      pendingAreaScroll.current = null;
    });

    return () => window.cancelAnimationFrame(frame);
  }, [selectedArea]);

  const selectArea = (slug: string) => {
    const target = `${hrefFor(locale, "/research/fields")}?area=${encodeURIComponent(slug)}#research-laboratories`;

    if (selectedArea?.slug === slug) {
      window.history.replaceState(null, "", target);
      scrollToLaboratories();
      return;
    }

    pendingAreaScroll.current = slug;
    router.replace(target);
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
            <section id="research-laboratories" className="research-fields-results" aria-live="polite" tabIndex={-1}>
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
  const resultsRef = useRef<HTMLDivElement>(null);
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
    const target = resultsRef.current;
    if (target) {
      const headerHeight = Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-height")) || 0;
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - headerHeight - 24, behavior: "smooth" });
    }
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
          <div className="laboratory-directory-results" ref={resultsRef}>
            <div className="laboratory-directory-summary"><p><strong>{results.length}</strong> {tx(locale, "개 연구실", "laboratories")}</p><span>{tx(locale, "주·관련 연구 분야 포함", "Primary and secondary areas included")}</span></div>
            {results.length ? <div className="laboratory-directory-grid">{results.map((lab) => <LabCard key={lab.id} lab={lab} locale={locale} />)}</div> : <EmptyState locale={locale} />}
          </div>
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
  const facultyMember = facultyMembers.find((member) => member.nameKo === lab.professorKo);

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
                <div><dt>{tx(locale, "지도교수", "Faculty advisor")}</dt><dd>{facultyMember ? <Link href={hrefFor(locale, `/faculty/${facultyMember.slug}`)}>{lab.professorKo} · {lab.professorEn}</Link> : <>{lab.professorKo} · {lab.professorEn}</>}</dd></div>
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
              {lab.homepageUrl && <a className="detail-external-link lab-homepage-link" href={lab.homepageUrl} target="_blank" rel="noopener noreferrer" aria-label={tx(locale, `${lab.nameKo} 홈페이지 방문, 새 탭에서 열림`, `Visit ${lab.nameEn} website, opens in a new tab`)}>{tx(locale, "연구실 홈페이지 방문", "Visit Lab Website")}<ExternalLink size={16} aria-hidden="true" /></a>}
            </section>
          </main>
          <aside className="detail-nav">
            <p>{tx(locale, "연구 분야", "Research areas")}</p>
            {directoryResearchAreas.map((area) => <Link href={hrefFor(locale, `/research/fields?area=${area.slug}#research-laboratories`)} key={area.id}><span>{String(area.displayOrder).padStart(2, "0")}</span>{researchAreaName(area, locale)}</Link>)}
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

const undergraduateHandbookUrl = "https://underwood1.yonsei.ac.kr/com/lgin/SsoCtr/initExtPageWork.do?link=handbList&locale=ko";

type CurriculumSemesterFilter = "all" | CurriculumSemester;

function curriculumSemesterLabel(semester: CurriculumSemester) {
  return curriculumSemesters.find((item) => item.id === semester)?.labelKo ?? semester;
}

function CurriculumTreeCourseCard({
  course,
  activeSemester,
  selectedCourseId,
  prerequisiteIds,
  onSelect,
}: {
  course: CurriculumTreeCourse;
  activeSemester: CurriculumSemesterFilter;
  selectedCourseId: string | null;
  prerequisiteIds: string[];
  onSelect: (id: string) => void;
}) {
  const prerequisiteNames = course.prerequisiteIds
    .map((id) => curriculumTreeCourses.find((item) => item.id === id)?.nameKo)
    .filter((name): name is string => Boolean(name));
  const isDimmed = activeSemester !== "all" && course.semester !== null && course.semester !== activeSemester;
  const isSelected = selectedCourseId === course.id;
  const isPrerequisite = prerequisiteIds.includes(course.id);
  const ariaLabel = [
    course.nameKo,
    course.semester ? curriculumSemesterLabel(course.semester) : "개설 학기 확인 필요",
    course.required ? "필수" : "선택 이수",
    prerequisiteNames.length ? `선수과목: ${prerequisiteNames.join(", ")}` : null,
  ].filter(Boolean).join(", ");

  return (
    <button
      type="button"
      className={`curriculum-course-card${course.required ? " is-required" : ""}${isSelected ? " is-selected" : ""}${isPrerequisite ? " is-prerequisite" : ""}${isDimmed ? " is-dimmed" : ""}`}
      aria-label={ariaLabel}
      aria-pressed={isSelected}
      disabled={isDimmed}
      onClick={() => onSelect(course.id)}
    >
      <span className="curriculum-course-name">{course.nameKo}</span>
      {course.required && <span className="curriculum-course-required">필수</span>}
      {isPrerequisite && <span className="curriculum-course-prerequisite">선수과목</span>}
      {prerequisiteNames.length > 0 && <small>선수: {prerequisiteNames.join(", ")}</small>}
    </button>
  );
}

function CurriculumTreeCourseList({
  courses,
  activeSemester,
  selectedCourseId,
  prerequisiteIds,
  onSelect,
}: {
  courses: CurriculumTreeCourse[];
  activeSemester: CurriculumSemesterFilter;
  selectedCourseId: string | null;
  prerequisiteIds: string[];
  onSelect: (id: string) => void;
}) {
  const standaloneCourses = courses.filter((course) => !course.chooseOneGroup);
  const choiceGroups = Array.from(new Map(
    courses
      .filter((course) => course.chooseOneGroup)
      .map((course) => [course.chooseOneGroup!, courses.filter((item) => item.chooseOneGroup === course.chooseOneGroup)]),
  ).values());

  return (
    <ul className="curriculum-course-list">
      {standaloneCourses.map((course) => (
        <li key={course.id}><CurriculumTreeCourseCard course={course} activeSemester={activeSemester} selectedCourseId={selectedCourseId} prerequisiteIds={prerequisiteIds} onSelect={onSelect} /></li>
      ))}
      {choiceGroups.map((group) => (
        <li className="curriculum-choice-group" key={group[0].chooseOneGroup}>
          <span>택 1</span>
          <ul>{group.map((course) => <li key={course.id}><CurriculumTreeCourseCard course={course} activeSemester={activeSemester} selectedCourseId={selectedCourseId} prerequisiteIds={prerequisiteIds} onSelect={onSelect} /></li>)}</ul>
        </li>
      ))}
    </ul>
  );
}

function CurriculumTreeSemesterGrid({
  courses,
  activeSemester,
  selectedCourseId,
  prerequisiteIds,
  onSelect,
}: {
  courses: CurriculumTreeCourse[];
  activeSemester: CurriculumSemesterFilter;
  selectedCourseId: string | null;
  prerequisiteIds: string[];
  onSelect: (id: string) => void;
}) {
  const coursesBySemester = (semester: CurriculumSemester) => courses.filter((course) => course.semester === semester);
  const years = [1, 2, 3, 4] as const;

  return (
    <>
      <div className="curriculum-semester-scroll">
        <div className="curriculum-semester-grid">
          <span className="curriculum-entry-boundary is-year-two" data-label="2학년 진입 전 필수" aria-hidden="true" />
          <span className="curriculum-entry-boundary is-year-three" data-label="3학년 진입 전 필수" aria-hidden="true" />
          {curriculumSemesters.map((semester) => (
            <section className={`curriculum-semester-column${activeSemester !== "all" && activeSemester !== semester.id ? " is-dimmed" : ""}`} key={semester.id}>
              <h3>{semester.id}</h3>
              <CurriculumTreeCourseList courses={coursesBySemester(semester.id)} activeSemester={activeSemester} selectedCourseId={selectedCourseId} prerequisiteIds={prerequisiteIds} onSelect={onSelect} />
            </section>
          ))}
        </div>
      </div>
      <div className="curriculum-mobile-years">
        {years.map((year) => {
          const yearSemesters = curriculumSemesters.filter((semester) => semester.year === year);
          const shouldOpen = activeSemester === "all" ? year === 1 : yearSemesters.some((semester) => semester.id === activeSemester);
          return (
            <div key={year}>
              <details open={shouldOpen}>
                <summary>{year}학년 <span>{yearSemesters.map((semester) => semester.id).join(" · ")}</span></summary>
                <div className="curriculum-mobile-semesters">
                  {yearSemesters.map((semester) => (
                    <section className={activeSemester !== "all" && activeSemester !== semester.id ? "is-dimmed" : ""} key={semester.id}>
                      <h3>{semester.id}</h3>
                      <CurriculumTreeCourseList courses={coursesBySemester(semester.id)} activeSemester={activeSemester} selectedCourseId={selectedCourseId} prerequisiteIds={prerequisiteIds} onSelect={onSelect} />
                    </section>
                  ))}
                </div>
              </details>
              {year === 1 && <p className="curriculum-mobile-entry">2학년 진입 전 필수</p>}
              {year === 2 && <p className="curriculum-mobile-entry">3학년 진입 전 필수</p>}
            </div>
          );
        })}
      </div>
    </>
  );
}

function CurriculumTreeSection({ code, title, children }: { code: string; title: string; children: ReactNode }) {
  return (
    <section className="curriculum-tree-section">
      <header><span>{code}</span></header>
      <div className="curriculum-tree-section-content">
        <h2>{title}</h2>
        {children}
      </div>
    </section>
  );
}

function CurriculumTreePage({ locale }: { locale: Locale }) {
  const [activeSemester, setActiveSemester] = useState<CurriculumSemesterFilter>("all");
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const selectedCourse = curriculumTreeCourses.find((course) => course.id === selectedCourseId) ?? null;
  const prerequisiteIds = selectedCourse?.prerequisiteIds ?? [];
  const prerequisiteCourses = prerequisiteIds
    .map((id) => curriculumTreeCourses.find((course) => course.id === id))
    .filter((course): course is CurriculumTreeCourse => Boolean(course));
  const mscCourses = curriculumTreeCourses.filter((course) => course.area === "msc" && course.placement === "semester-grid");
  const majorFoundationCourses = curriculumTreeCourses.filter((course) => course.area === "major" && course.placement === "semester-grid");
  const completionCourses = curriculumTreeCourses.filter((course) => course.placement === "completion");
  const seminarCourses = curriculumTreeCourses.filter((course) => course.placement === "seminar");
  const commonGeCourses = curriculumTreeCourses.filter((course) => course.placement === "ge-common");
  const recommendedGeCourses = curriculumTreeCourses.filter((course) => course.placement === "ge-recommended");
  const semesterOptions: { id: CurriculumSemesterFilter; label: string }[] = [
    { id: "all", label: tx(locale, "전체", "All") },
    ...curriculumSemesters.map((semester) => ({ id: semester.id, label: semester.id })),
  ];
  const selectionAnnouncement = selectedCourse
    ? selectedCourse.prerequisiteIds.length
      ? `${selectedCourse.nameKo}의 선수과목: ${prerequisiteCourses.map((course) => `${course.nameKo} (${course.semester ? curriculumSemesterLabel(course.semester) : "학기 확인 필요"})`).join(", ")}`
      : `${selectedCourse.nameKo}에 등록된 선수과목이 없습니다.`
    : "";

  useEffect(() => {
    const clearSelection = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedCourseId(null);
    };
    document.addEventListener("keydown", clearSelection);
    return () => document.removeEventListener("keydown", clearSelection);
  }, []);

  const selectCourse = (id: string) => setSelectedCourseId((current) => current === id ? null : id);
  const renderCourses = (courses: CurriculumTreeCourse[]) => (
    <CurriculumTreeCourseList courses={courses} activeSemester={activeSemester} selectedCourseId={selectedCourseId} prerequisiteIds={prerequisiteIds} onSelect={selectCourse} />
  );

  return (
    <div className="curriculum-tree-page">
      <div className="container curriculum-tree-header">
        <div>
          <p className="section-label">CURRICULUM TREE</p>
          <h1>{tx(locale, "기계공학부 교과목 트리", "Mechanical Engineering Curriculum Tree")}</h1>
          <p>{tx(locale, "학년·학기별 교과목의 이수 흐름과 선수관계를 확인할 수 있습니다.", "Review course progression and prerequisites by academic year and semester.")}</p>
        </div>
        <div className="curriculum-tree-actions">
          {curriculumTreeSource.originalPdfUrl ? (
            <a className="curriculum-print-button" href={curriculumTreeSource.originalPdfUrl} target="_blank" rel="noopener noreferrer"><Download size={16} />{tx(locale, "인쇄용 PDF 다운로드", "Download printable PDF")}</a>
          ) : (
            <button className="curriculum-print-button" type="button" onClick={() => window.print()}><Download size={16} />{tx(locale, "인쇄용 PDF 다운로드", "Save as printable PDF")}</button>
          )}
          <a className="curriculum-source-link" href={curriculumTreeSource.originalChartUrl} target="_blank" rel="noopener noreferrer">{tx(locale, "원본 체계도 보기", "View original chart")}<ExternalLink size={15} aria-hidden="true" /></a>
        </div>
      </div>

      <main className="curriculum-tree-main">
        <div className="container">
          <aside className="curriculum-requirements-banner">
            <p>{tx(locale, "학번마다 교과목 체계가 다르니, 상세 정보를 위해 각 학번의 졸업 요건을 확인하시기 바랍니다.", "Course structures vary by admission year. Confirm the graduation requirements for your admission year.")}</p>
            <Link href={hrefFor(locale, "/academics/requirements")}>{tx(locale, "학번별 졸업요건 보기", "View graduation requirements")}<ArrowRight size={16} /></Link>
          </aside>

          <div className="curriculum-legend" aria-label={tx(locale, "교과목 트리 범례", "Curriculum tree legend")}>
            <span className="is-required">{tx(locale, "필수", "Required")}</span>
            <span>{tx(locale, "선택 이수", "Elective")}</span>
            <span className="is-choice">{tx(locale, "택 1", "Choose one")}</span>
            <span className="is-prerequisite">→ {tx(locale, "선수과목 · 과목 클릭", "Prerequisite · select a course")}</span>
          </div>

          <div className="curriculum-semester-tabs" role="tablist" aria-label={tx(locale, "학기 필터", "Semester filter")}>
            {semesterOptions.map((option) => <button type="button" role="tab" aria-selected={activeSemester === option.id} onClick={() => { setActiveSemester(option.id); setSelectedCourseId(null); }} key={option.id}>{option.label}</button>)}
          </div>

          <div className="sr-only" aria-live="polite">{selectionAnnouncement}</div>

          <div className="curriculum-tree-sections">
            <CurriculumTreeSection code="MSC" title={tx(locale, "MSC", "MSC")}>
              <CurriculumTreeSemesterGrid courses={mscCourses} activeSemester={activeSemester} selectedCourseId={selectedCourseId} prerequisiteIds={prerequisiteIds} onSelect={selectCourse} />
            </CurriculumTreeSection>

            <CurriculumTreeSection code="MAJOR" title={tx(locale, "전공", "Major")}>
              <section className="curriculum-subsection">
                <header><p>MAJOR FOUNDATION</p><h3>{tx(locale, "전공 기초 · 2학년", "Major Foundations · Year 2")}</h3></header>
                <CurriculumTreeSemesterGrid courses={majorFoundationCourses} activeSemester={activeSemester} selectedCourseId={selectedCourseId} prerequisiteIds={prerequisiteIds} onSelect={selectCourse} />
              </section>
              <div className="curriculum-major-strips">
                <section><header><p>GRADUATION REQUIRED</p><h3>{tx(locale, "졸업 필수", "Graduation Required")}</h3></header>{renderCourses(completionCourses)}</section>
                <section><header><p>SEMINAR</p><h3>{tx(locale, "세미나", "Seminar")}</h3></header>{renderCourses(seminarCourses)}</section>
              </div>
              <section className="curriculum-advanced-section">
                <header><p>ADVANCED STUDY</p><h3>{tx(locale, "전공 심화 · 3~4학년", "Advanced Study · Years 3–4")}</h3></header>
                <div className="curriculum-advanced-panels">
                  <section><h4>{tx(locale, "1학기 개설", "First semester")}</h4><div><div>{renderCourses(curriculumTreeCourses.filter((course) => course.placement === "advanced-first-primary"))}</div><div>{renderCourses(curriculumTreeCourses.filter((course) => course.placement === "advanced-first-secondary"))}</div></div></section>
                  <section><h4>{tx(locale, "2학기 개설", "Second semester")}</h4><div><div>{renderCourses(curriculumTreeCourses.filter((course) => course.placement === "advanced-second-primary"))}</div><div>{renderCourses(curriculumTreeCourses.filter((course) => course.placement === "advanced-second-secondary"))}</div></div></section>
                </div>
              </section>
              <Link className="curriculum-special-track" href={hrefFor(locale, "/academics/courses?tab=elective")}><span>{tx(locale, "스페셜 트랙", "Special Track")}</span><strong>{tx(locale, "세부 구성 과목은 학과 확인 후 안내합니다.", "Detailed course composition will be updated after departmental confirmation.")}</strong><ArrowRight size={17} /></Link>
            </CurriculumTreeSection>

            <CurriculumTreeSection code="GE" title={tx(locale, "교양", "General Education")}>
              <div className="curriculum-ge-top">
                <section><header><p>COMMON GENERAL EDUCATION</p><h3>{tx(locale, "공통 교양 · 필수 이수", "Common General Education · Required")}</h3></header>{renderCourses(commonGeCourses)}</section>
                <section><header><p>RECOMMENDED</p><h3>{tx(locale, "공학 관련 권장 교양", "Recommended Engineering-related Electives")}</h3></header><div className="curriculum-recommended-chips">{recommendedGeCourses.map((course) => <span key={course.id}>{course.nameKo}</span>)}</div><p>{tx(locale, "졸업 필수요건 아님 · 이수 권장", "Not a graduation requirement · recommended")}</p></section>
              </div>
              <section className="curriculum-liberal-requirements">
                <header><p>LIBERAL EDUCATION REQUIREMENTS</p><h3>{tx(locale, "교양 영역 이수요건", "Liberal Education Requirements")}</h3></header>
                <div className="curriculum-liberal-area-chips">{liberalEducationAreas.map((area) => <span className={area === "정보와기술" ? "is-legacy" : ""} key={area}>{area}{area === "정보와기술" && <small>21학번까지만 해당</small>}</span>)}</div>
                <div className="curriculum-requirement-strips"><article><strong>5</strong><p>{tx(locale, "21학번 포함 이전", "Through class of 2021")}<span>{tx(locale, "7개 영역 중 5개 영역에서 각 1과목씩 이수 필수", "Complete one course in each of five of seven areas")}</span></p></article><article><strong>4</strong><p>{tx(locale, "22학번 포함 이후", "Class of 2022 and after")}<span>{tx(locale, "6개 영역 중 4개 영역에서 각 1과목씩 이수 필수", "Complete one course in each of four of six areas")}</span></p></article></div>
                <p className="curriculum-liberal-note">* {tx(locale, "22학번부터 정보와기술 영역이 제외되어 이수 영역이 5개에서 4개로 변경됩니다.", "From the class of 2022, Information and Technology is excluded and the required number of areas changes from five to four.")}</p>
              </section>
            </CurriculumTreeSection>
          </div>
        </div>
      </main>
    </div>
  );
}

function UndergraduateProgramPage({ locale }: { locale: Locale }) {
  const quickLinks = [
    { label: tx(locale, "교과목 안내", "Courses"), path: "/academics/courses" },
    { label: tx(locale, "학부 졸업요건", "Graduation Requirements"), path: "/academics/requirements" },
  ];
  const lowerLinks = [
    { label: tx(locale, "교과목 안내", "Courses"), path: "/academics/courses?tab=schedule" },
    { label: tx(locale, "전공필수", "Required Courses"), path: "/academics/courses?tab=required" },
    { label: tx(locale, "전공선택", "Elective Courses"), path: "/academics/courses?tab=elective" },
    { label: tx(locale, "학부 졸업요건", "Graduation Requirements"), path: "/academics/requirements" },
    { label: tx(locale, "장학 안내", "Scholarships"), path: "/academics/scholarships" },
  ];

  return (
    <>
      <PageHeader
        eyebrow="UNDERGRADUATE PROGRAM"
        title={tx(locale, "학부 교육과정", "Undergraduate Program")}
        description={tx(locale, "기계공학의 기초 이론부터 실험·설계·전공 심화 및 연구까지 학년별 교육과정의 흐름을 확인할 수 있습니다.", "Follow the undergraduate curriculum from engineering foundations through laboratories, design, advanced study, and research.")}
      />
      <section className="section content-section undergraduate-program-page">
        <div className="container">
          <nav className="academic-quick-links" aria-label={tx(locale, "학부 교육과정 빠른 링크", "Undergraduate program quick links")}>
            {quickLinks.map((item) => <Link href={hrefFor(locale, item.path)} key={item.path}>{item.label}<ArrowRight size={16} /></Link>)}
            <a href={undergraduateHandbookUrl} target="_blank" rel="noopener noreferrer" aria-label={tx(locale, "학부 수강편람 조회, 새 탭에서 열림", "Open the undergraduate course handbook in a new tab")}>{tx(locale, "학부 수강편람 조회", "Course Handbook")}<ExternalLink size={15} /></a>
          </nav>

          <SectionHeading label="PROGRAM FLOW" title={tx(locale, "학년별 교육 과정", "Program by Academic Year")} />
          <div className="undergraduate-year-grid">
            {undergraduateProgramYears.map((item) => (
              <Link href={hrefFor(locale, `/academics/courses?tab=schedule&year=${item.year}`)} className="undergraduate-year" key={item.year}>
                <div className="undergraduate-year-heading">
                  <span>{String(item.year).padStart(2, "0")}</span>
                  <p>{tx(locale, `${item.year}학년`, `Year ${item.year}`)}</p>
                </div>
                <h2>{locale === "ko" ? item.titleKo : item.titleEn}</h2>
                <p>{locale === "ko" ? item.descriptionKo : item.descriptionEn}</p>
                <div className="undergraduate-course-names">
                  <strong>{tx(locale, "대표 과목", "Representative Courses")}</strong>
                  <ul>{item.representativeCourses.map((name) => <li key={name}>{name}</li>)}</ul>
                </div>
                <span className="undergraduate-year-link">{tx(locale, "해당 학년 교과목 보기", `View Year ${item.year} courses`)}<ArrowRight size={16} /></span>
              </Link>
            ))}
          </div>

          <section className="academic-experience-section">
            <SectionHeading label="LEARNING EXPERIENCE" title={tx(locale, "주요 학습 경험", "Core Learning Experiences")} />
            <div className="academic-experience-grid">
              {undergraduateLearningExperiences.map((item) => (
                <article key={item.number}>
                  <span>{item.number}</span>
                  <h3>{locale === "ko" ? item.titleKo : item.titleEn}</h3>
                  <p>{locale === "ko" ? item.descriptionKo : item.descriptionEn}</p>
                </article>
              ))}
            </div>
          </section>

          <nav className="academic-related-links" aria-label={tx(locale, "학부 교육과정 관련 페이지", "Related undergraduate pages")}>
            {lowerLinks.map((item) => <Link href={hrefFor(locale, item.path)} key={item.path}>{item.label}<ArrowRight size={17} /></Link>)}
          </nav>
        </div>
      </section>
    </>
  );
}

type GraduateCreditsFilter = "all" | "3" | "0";

const graduateLevelOptions: { value: GraduateCourseLevelFilter; ko: string; en: string }[] = [
  { value: "all", ko: "전체", en: "All" },
  { value: "5000", ko: "5000단위", en: "5000 level" },
  { value: "6000", ko: "6000단위", en: "6000 level" },
  { value: "7000", ko: "7000단위", en: "7000 level" },
  { value: "8000", ko: "8000단위 이상", en: "8000 level and above" },
  { value: "directed", ko: "연구지도", en: "Directed Research" },
];

const graduateCreditsOptions: { value: GraduateCreditsFilter; ko: string; en: string }[] = [
  { value: "all", ko: "전체 학점", en: "All credits" },
  { value: "3", ko: "3학점", en: "3 credits" },
  { value: "0", ko: "0학점", en: "0 credits" },
];

const graduateLevelFilterFromQuery = (value: string | undefined): GraduateCourseLevelFilter =>
  graduateLevelOptions.some((item) => item.value === value) ? value as GraduateCourseLevelFilter : "all";

const graduateCreditsFilterFromQuery = (value: string | undefined): GraduateCreditsFilter =>
  value === "3" || value === "0" ? value : "all";

function GraduateProgramPage({ locale, searchParams }: { locale: Locale; searchParams: Record<string, string> }) {
  const quickLinks = [
    { label: tx(locale, "대학원 교과목", "Graduate Courses"), path: "/academics/graduate#course-catalog" },
    { label: tx(locale, "대학원 졸업요건", "Graduate Requirements"), path: "/academics/requirements?program=graduate" },
    { label: tx(locale, "교수진", "Faculty"), path: "/faculty" },
    { label: tx(locale, "연구실", "Laboratories"), path: "/labs" },
    { label: tx(locale, "대학원 진학", "Graduate Admission"), path: "/admission/graduate" },
  ];
  const overviewItems = [
    {
      number: "01",
      title: tx(locale, "전공 교과목", "Major Courses"),
      description: tx(locale, "기계공학의 세부 전공과 연구 분야에 해당하는 5000단위 이상의 대학원 교과목을 확인할 수 있습니다.", "Review graduate courses at the 5000 level and above across mechanical engineering specialties and research areas."),
    },
    {
      number: "02",
      title: tx(locale, "연구·세미나 교과목", "Research and Seminar Courses"),
      description: tx(locale, "기계공학세미나와 연구지도 과목을 통해 연구 발표와 학위 연구를 수행합니다.", "Mechanical engineering seminars and directed research courses support research presentations and degree research."),
    },
    {
      number: "03",
      title: tx(locale, "졸업요건 연계", "Graduate Requirements"),
      description: tx(locale, "최소 이수학점, 필수 교과목, 종합시험 및 논문심사 요건은 대학원 졸업요건 페이지에서 확인할 수 있습니다.", "Confirm minimum credits, required coursework, comprehensive examinations, and thesis review requirements on the graduate requirements page."),
      path: "/academics/requirements?program=graduate",
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow="GRADUATE PROGRAM"
        title={tx(locale, "대학원 교육과정", "Graduate Program")}
        description={tx(locale, "기계공학과 대학원에서 개설되는 전공 교과목을 학정번호와 분야별 수준에 따라 확인할 수 있습니다.", "Review graduate mechanical engineering courses by course code and level.")}
      />
      <section className="section content-section graduate-program-page">
        <div className="container">
          <nav className="academic-quick-links" aria-label={tx(locale, "대학원 교육과정 빠른 링크", "Graduate program quick links")}>
            {quickLinks.map((item) => <Link href={hrefFor(locale, item.path)} key={item.path}>{item.label}<ArrowRight size={16} /></Link>)}
            {externalGraduateHandbookUrl && <a href={externalGraduateHandbookUrl} target="_blank" rel="noopener noreferrer" aria-label={tx(locale, "대학원 수강편람 조회, 새 탭에서 열림", "Open the graduate course handbook in a new tab")}>{tx(locale, "대학원 수강편람 조회", "Graduate Course Handbook")}<ExternalLink size={15} /></a>}
          </nav>

          <section className="graduate-program-overview" aria-label={tx(locale, "대학원 교육과정 안내", "Graduate program overview")}>
            <SectionHeading label="PROGRAM GUIDE" title={tx(locale, "대학원 교육과정 안내", "Program Guide")} />
            <div className="graduate-program-overview-list">
              {overviewItems.map((item) => (
                <article key={item.number}>
                  <span>{item.number}</span>
                  <div><h3>{item.title}</h3><p>{item.description}</p>{item.path && <Link href={hrefFor(locale, item.path)}>{tx(locale, "대학원 졸업요건 확인", "View Graduate Requirements")}<ArrowRight size={15} /></Link>}</div>
                </article>
              ))}
            </div>
          </section>

          <GraduateCourseCatalog locale={locale} searchParams={searchParams} />
        </div>
      </section>
    </>
  );
}

function GraduateCourseCatalog({ locale, searchParams }: { locale: Locale; searchParams: Record<string, string> }) {
  const router = useRouter();
  const [level, setLevel] = useState<GraduateCourseLevelFilter>(() => graduateLevelFilterFromQuery(searchParams.level));
  const [credits, setCredits] = useState<GraduateCreditsFilter>(() => graduateCreditsFilterFromQuery(searchParams.credits));
  const [query, setQuery] = useState(searchParams.q ?? "");

  useEffect(() => {
    setLevel(graduateLevelFilterFromQuery(searchParams.level));
    setCredits(graduateCreditsFilterFromQuery(searchParams.credits));
    setQuery(searchParams.q ?? "");
  }, [searchParams.credits, searchParams.level, searchParams.q]);

  const results = useMemo(() => graduateCourses.filter((course) => {
    const searchable = `${course.courseCode} ${course.nameKo} ${course.nameEn}`.toLowerCase();
    return graduateCourseLevelMatches(course, level)
      && (credits === "all" || course.credits === Number(credits))
      && (!query.trim() || searchable.includes(query.trim().toLowerCase()));
  }), [credits, level, query]);

  const syncUrl = (next: { level: GraduateCourseLevelFilter; credits: GraduateCreditsFilter; query: string }) => {
    const params = new URLSearchParams();
    if (next.level !== "all") params.set("level", next.level);
    if (next.credits !== "all") params.set("credits", next.credits);
    if (next.query.trim()) params.set("q", next.query.trim());
    const suffix = params.size ? `?${params.toString()}` : "";
    router.replace(`${hrefFor(locale, "/academics/graduate")}${suffix}`, { scroll: false });
  };

  const updateLevel = (nextLevel: GraduateCourseLevelFilter) => {
    setLevel(nextLevel);
    syncUrl({ level: nextLevel, credits, query });
  };
  const updateCredits = (nextCredits: GraduateCreditsFilter) => {
    setCredits(nextCredits);
    syncUrl({ level, credits: nextCredits, query });
  };
  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    syncUrl({ level, credits, query });
  };
  const resetFilters = () => {
    setLevel("all");
    setCredits("all");
    setQuery("");
    router.replace(hrefFor(locale, "/academics/graduate"), { scroll: false });
  };
  const hasFilters = level !== "all" || credits !== "all" || Boolean(query.trim());

  return (
    <section className="graduate-course-catalog" id="course-catalog" aria-labelledby="graduate-course-catalog-title">
      <SectionHeading label="GRADUATE COURSES" title={tx(locale, "대학원 교과목", "Graduate Courses")} />
      <p className="graduate-course-catalog-description">{tx(locale, "학정번호, 교과목명 및 학점 정보를 검색하고 확인할 수 있습니다.", "Search course codes, course titles, and credit information.")}</p>
      <p className="graduate-course-filter-note">{tx(locale, "학정번호 수준은 학위과정이나 난이도의 공식 분류가 아닌 교과목 탐색을 위한 코드 범위 필터입니다.", "Course levels are code-range filters for browsing and do not represent an official degree-track or difficulty classification.")}</p>

      <div className="graduate-course-toolbar">
        <div className="graduate-filter-group">
          <p>{tx(locale, "학정번호 수준", "Course code level")}</p>
          <div role="group" aria-label={tx(locale, "학정번호 수준 필터", "Course code level filter")} className="graduate-filter-options">
            {graduateLevelOptions.map((item) => <button type="button" aria-pressed={level === item.value} onClick={() => updateLevel(item.value)} key={item.value}>{locale === "ko" ? item.ko : item.en}</button>)}
          </div>
        </div>
        <div className="graduate-filter-group">
          <p>{tx(locale, "학점", "Credits")}</p>
          <div role="group" aria-label={tx(locale, "학점 필터", "Credit filter")} className="graduate-filter-options">
            {graduateCreditsOptions.map((item) => <button type="button" aria-pressed={credits === item.value} onClick={() => updateCredits(item.value)} key={item.value}>{locale === "ko" ? item.ko : item.en}</button>)}
          </div>
        </div>
        <form className="graduate-course-search" onSubmit={submitSearch}>
          <label htmlFor="graduate-course-search">{tx(locale, "학정번호 또는 과목명", "Course code or title")}</label>
          <div><input id="graduate-course-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={tx(locale, "학정번호 또는 과목명 검색", "Search by code or course title")} /><button className="button primary" type="submit"><Search size={16} />{tx(locale, "검색", "Search")}</button></div>
        </form>
      </div>

      <div className="graduate-course-results-heading" aria-live="polite">
        <p>{hasFilters ? <><strong>{tx(locale, "검색 결과", "Results")}</strong> {results.length}{tx(locale, "개", " courses")}</> : <><strong>{tx(locale, "총", "Total")}</strong> {graduateCourses.length}{tx(locale, "개 교과목", " courses")}</>}</p>
        {hasFilters && <button type="button" onClick={resetFilters}>{tx(locale, "초기화", "Reset")}</button>}
      </div>

      {results.length ? <GraduateCourseList locale={locale} courses={results} /> : <EmptyState locale={locale} />}
    </section>
  );
}

function GraduateCourseList({ locale, courses: courseItems }: { locale: Locale; courses: GraduateCourse[] }) {
  return (
    <>
      <div className="graduate-course-table-wrap">
        <table className="graduate-course-table">
          <caption className="sr-only">{tx(locale, "대학원 교과목 목록", "Graduate course list")}</caption>
          <thead><tr><th scope="col">{tx(locale, "학정번호", "Code")}</th><th scope="col">{tx(locale, "과목명", "Course")}</th><th scope="col">{tx(locale, "영문명", "English Title")}</th><th scope="col">{tx(locale, "학점", "Credits")}</th></tr></thead>
          <tbody>{courseItems.map((course) => <tr key={course.id}><td>{course.courseCode}</td><td><strong>{locale === "ko" ? course.nameKo : course.nameEn}</strong>{course.reviewNote && <em>{tx(locale, "공식 확인 필요", "Official verification needed")}</em>}</td><td>{locale === "ko" ? course.nameEn : course.nameKo}</td><td>{course.credits}</td></tr>)}</tbody>
        </table>
      </div>
      <div className="graduate-course-mobile-list">
        {courseItems.map((course) => <article key={course.id}><span>{course.courseCode}</span><h3>{locale === "ko" ? course.nameKo : course.nameEn}</h3><p>{locale === "ko" ? course.nameEn : course.nameKo}</p><dl><div><dt>{tx(locale, "학점", "Credits")}</dt><dd>{course.credits}</dd></div></dl>{course.reviewNote && <em>{tx(locale, "공식 확인 필요", "Official verification needed")}</em>}</article>)}
      </div>
    </>
  );
}

type UndergraduateCourseTab = "schedule" | "required" | "elective";

const resolveUndergraduateCourseTab = (searchParams: Record<string, string>): UndergraduateCourseTab => {
  if (searchParams.tab === "required" || searchParams.tab === "elective" || searchParams.tab === "schedule") return searchParams.tab;
  if (searchParams.category === "required" || searchParams.category === "elective") return searchParams.category;
  return "schedule";
};

const normalizedCourseFilter = (value: string | undefined, allowed: string[]) => value && allowed.includes(value) ? value : "all";

function CourseDirectory({ locale, searchParams }: { locale: Locale; searchParams: Record<string, string> }) {
  const router = useRouter();
  const [tab, setTab] = useState<UndergraduateCourseTab>(() => resolveUndergraduateCourseTab(searchParams));
  const [year, setYear] = useState(() => normalizedCourseFilter(searchParams.year, ["1", "2", "3", "4"]));
  const [semester, setSemester] = useState(() => normalizedCourseFilter(searchParams.semester, ["1", "2"]));
  const [category, setCategory] = useState(() => normalizedCourseFilter(searchParams.category, ["university-core", "required", "elective"]));
  const [query, setQuery] = useState(searchParams.q ?? searchParams.query ?? "");
  const [expandedOffering, setExpandedOffering] = useState<string | null>(null);

  useEffect(() => {
    const nextTab = resolveUndergraduateCourseTab(searchParams);
    setTab(nextTab);
    if (nextTab !== "schedule") return;
    setYear(normalizedCourseFilter(searchParams.year, ["1", "2", "3", "4"]));
    setSemester(normalizedCourseFilter(searchParams.semester, ["1", "2"]));
    setCategory(normalizedCourseFilter(searchParams.category, ["university-core", "required", "elective"]));
    setQuery(searchParams.q ?? searchParams.query ?? "");
  }, [searchParams.category, searchParams.q, searchParams.query, searchParams.semester, searchParams.tab, searchParams.year]);

  const values = { year, semester, category, query };
  const results = useMemo(() => undergraduateCourseOfferings.filter((item) => {
    const searchable = `${item.courseCode} ${item.nameKo} ${item.nameEn ?? ""}`.toLowerCase();
    return (year === "all" || item.years.includes(Number(year)))
      && (semester === "all" || item.semester === Number(semester))
      && (category === "all" || item.category === category)
      && (!query.trim() || searchable.includes(query.trim().toLowerCase()));
  }), [year, semester, category, query]);

  const syncScheduleUrl = (next: typeof values) => {
    const params = new URLSearchParams({ tab: "schedule" });
    if (next.year !== "all") params.set("year", next.year);
    if (next.semester !== "all") params.set("semester", next.semester);
    if (next.category !== "all") params.set("category", next.category);
    if (next.query.trim()) params.set("q", next.query.trim());
    router.replace(`${hrefFor(locale, "/academics/courses")}?${params.toString()}`, { scroll: false });
  };

  const selectTab = (nextTab: UndergraduateCourseTab) => {
    setTab(nextTab);
    if (nextTab === "schedule") syncScheduleUrl(values);
    else router.replace(`${hrefFor(locale, "/academics/courses")}?tab=${nextTab}`, { scroll: false });
  };

  const resetFilters = () => {
    setYear("all");
    setSemester("all");
    setCategory("all");
    setQuery("");
    router.replace(`${hrefFor(locale, "/academics/courses")}?tab=schedule`, { scroll: false });
  };
  const hasFilters = year !== "all" || semester !== "all" || category !== "all" || Boolean(query.trim());

  return (
    <>
      <PageHeader
        eyebrow="COURSES"
        title={tx(locale, "교과목 안내", "Courses")}
        description={tx(locale, "기계공학부 학사과정의 학년·학기별 개설 교과목과 전공 교과목의 상세 내용을 확인할 수 있습니다.", "Review undergraduate course offerings by year and semester, along with detailed descriptions of required and elective courses.")}
      />
      <section className="section content-section undergraduate-courses-page">
        <div className="container">
          <div className="course-page-actions">
            <a className="button outline" href={undergraduateHandbookUrl} target="_blank" rel="noopener noreferrer" aria-label={tx(locale, "학부 수강편람 조회, 새 탭에서 열림", "Open the undergraduate course handbook in a new tab")}>{tx(locale, "학부 수강편람 조회", "Course Handbook")}<ExternalLink size={16} /></a>
          </div>

          <div className="undergraduate-course-tabs" role="tablist" aria-label={tx(locale, "교과목 안내 구분", "Course information sections")}>
            {([
              ["schedule", tx(locale, "학년·학기별 교과목", "Courses by Year and Semester")],
              ["required", tx(locale, "전공필수", "Required Courses")],
              ["elective", tx(locale, "전공선택", "Elective Courses")],
            ] as [UndergraduateCourseTab, string][]).map(([value, label]) => (
              <button type="button" role="tab" id={`undergraduate-course-tab-${value}`} aria-controls={`undergraduate-course-panel-${value}`} aria-selected={tab === value} onClick={() => selectTab(value)} key={value}>{label}</button>
            ))}
          </div>

          {tab === "schedule" ? (
            <div role="tabpanel" className="course-schedule-panel" id="undergraduate-course-panel-schedule" aria-labelledby="undergraduate-course-tab-schedule" tabIndex={0}>
              <form className="undergraduate-course-filter" onSubmit={(event) => { event.preventDefault(); syncScheduleUrl(values); }}>
                <div className="filter-field search-field">
                  <label htmlFor="undergraduate-course-query">{tx(locale, "교과목 검색", "Search Courses")}</label>
                  <div><Search size={18} /><input id="undergraduate-course-query" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={tx(locale, "교과목명·학정번호·영문명", "Name, course code, or English title")} /></div>
                </div>
                <FilterSelect id="undergraduate-course-year" label={tx(locale, "학년", "Year")} value={year} onChange={(value) => { setYear(value); syncScheduleUrl({ ...values, year: value }); }} options={[["all", tx(locale, "전체 학년", "All Years")], ["1", tx(locale, "1학년", "Year 1")], ["2", tx(locale, "2학년", "Year 2")], ["3", tx(locale, "3학년", "Year 3")], ["4", tx(locale, "4학년", "Year 4")]]} />
                <FilterSelect id="undergraduate-course-semester" label={tx(locale, "학기", "Semester")} value={semester} onChange={(value) => { setSemester(value); syncScheduleUrl({ ...values, semester: value }); }} options={[["all", tx(locale, "전체 학기", "All Semesters")], ["1", tx(locale, "1학기", "Semester 1")], ["2", tx(locale, "2학기", "Semester 2")]]} />
                <FilterSelect id="undergraduate-course-category" label={tx(locale, "과목 구분", "Category")} value={category} onChange={(value) => { setCategory(value); syncScheduleUrl({ ...values, category: value }); }} options={[["all", tx(locale, "전체 구분", "All Categories")], ["university-core", tx(locale, "대학 교양", "University Core")], ["required", tx(locale, "전공필수", "Required")], ["elective", tx(locale, "전공선택", "Elective")]]} />
                <button className="button primary" type="submit"><Search size={16} />{tx(locale, "검색", "Search")}</button>
                {hasFilters && <button className="course-filter-reset" type="button" onClick={resetFilters}>{tx(locale, "초기화", "Reset")}</button>}
              </form>

              <div className="results-heading"><p><strong>{results.length}</strong> {tx(locale, "개 교과목", "courses")}</p></div>
              {results.length ? <UndergraduateCourseSchedule locale={locale} items={results} expandedOffering={expandedOffering} setExpandedOffering={setExpandedOffering} /> : <EmptyState locale={locale} />}
            </div>
          ) : (
            <div role="tabpanel" className="course-detail-panel" id={`undergraduate-course-panel-${tab}`} aria-labelledby={`undergraduate-course-tab-${tab}`} tabIndex={0}>
              <p className="course-detail-intro">{tab === "required" ? tx(locale, "기계공학부 학사과정의 전공필수 교과목입니다.", "Required courses in the undergraduate mechanical engineering program.") : tx(locale, "기계공학의 세부 분야를 확장하는 전공선택 교과목입니다.", "Elective courses that deepen study across mechanical engineering fields.")}</p>
              <UndergraduateCourseDetailList locale={locale} items={tab === "required" ? requiredUndergraduateCourseDetails : electiveUndergraduateCourseDetails} />
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function FilterSelect({ id, label, value, onChange, options }: { id: string; label: string; value: string; onChange: (value: string) => void; options: [string, string][] }) {
  return <div className="filter-field"><label htmlFor={id}>{label}</label><select id={id} value={value} onChange={(event) => onChange(event.target.value)}>{options.map(([optionValue, optionLabel]) => <option value={optionValue} key={optionValue}>{optionLabel}</option>)}</select></div>;
}

function undergraduateCategoryLabel(category: UndergraduateCourseCategory, locale: Locale) {
  if (category === "university-core") return tx(locale, "대학 교양", "University Core");
  if (category === "required") return tx(locale, "전공필수", "Required");
  return tx(locale, "전공선택", "Elective");
}

function UndergraduateCourseSchedule({ locale, items, expandedOffering, setExpandedOffering }: { locale: Locale; items: UndergraduateCourseOffering[]; expandedOffering: string | null; setExpandedOffering: (id: string | null) => void }) {
  return (
    <>
      <div className="undergraduate-course-table-wrap">
        <table className="undergraduate-course-table">
          <thead><tr><th>{tx(locale, "학년", "Year")}</th><th>{tx(locale, "학기", "Semester")}</th><th>{tx(locale, "구분", "Category")}</th><th>{tx(locale, "학정번호", "Code")}</th><th>{tx(locale, "교과목명", "Course")}</th><th>{tx(locale, "학점", "Credits")}</th><th>{tx(locale, "강의", "Lecture")}</th><th>{tx(locale, "실습", "Practice")}</th><th><span className="sr-only">{tx(locale, "상세보기", "Details")}</span></th></tr></thead>
          <tbody>{items.map((item) => {
            const detailItem = getUndergraduateCourseDetail(item.courseCode, item.nameKo);
            const expanded = expandedOffering === item.id;
            return <tr className={expanded ? "is-expanded" : undefined} key={item.id}><td>{item.years.join("·")}</td><td>{item.semester ? tx(locale, `${item.semester}학기`, `S${item.semester}`) : tx(locale, "확인 필요", "To confirm")}</td><td><span className={`course-category course-category-${item.category}`}>{undergraduateCategoryLabel(item.category, locale)}</span></td><td>{item.courseCode}</td><td><strong>{locale === "en" && item.nameEn ? item.nameEn : item.nameKo}</strong>{item.nameEn && <small>{locale === "ko" ? item.nameEn : item.nameKo}</small>}{item.reviewNote && <em>{tx(locale, "공식 확인 필요", "Official verification needed")}</em>}{expanded && detailItem && <p className="course-table-description">{detailItem.description}</p>}</td><td>{item.credits}</td><td>{item.lectureHours}</td><td>{item.practiceHours}</td><td>{detailItem ? <button type="button" aria-expanded={expanded} aria-label={`${item.nameKo} ${tx(locale, "상세 설명", "description")}`} onClick={() => setExpandedOffering(expanded ? null : item.id)}>{expanded ? <ChevronDown size={17} /> : <ChevronRight size={17} />}</button> : <span aria-hidden="true">-</span>}</td></tr>;
          })}</tbody>
        </table>
      </div>
      <div className="undergraduate-course-mobile-list">
        {items.map((item) => {
          const detailItem = getUndergraduateCourseDetail(item.courseCode, item.nameKo);
          return <article key={item.id}><div className="course-mobile-meta"><span>{item.courseCode}</span><i className={`course-category course-category-${item.category}`}>{undergraduateCategoryLabel(item.category, locale)}</i></div><h3>{locale === "en" && item.nameEn ? item.nameEn : item.nameKo}</h3>{item.nameEn && <p className="course-mobile-english">{locale === "ko" ? item.nameEn : item.nameKo}</p>}<dl><div><dt>{tx(locale, "학년", "Year")}</dt><dd>{item.years.join("·")}</dd></div><div><dt>{tx(locale, "학기", "Semester")}</dt><dd>{item.semester ? item.semester : tx(locale, "확인 필요", "To confirm")}</dd></div><div><dt>{tx(locale, "학점", "Credits")}</dt><dd>{item.credits}</dd></div><div><dt>{tx(locale, "강의·실습", "Lecture · Practice")}</dt><dd>{item.lectureHours} · {item.practiceHours}</dd></div></dl>{item.reviewNote && <p className="course-review-note">{tx(locale, "공식 확인 필요", "Official verification needed")}</p>}{detailItem && <details><summary>{tx(locale, "상세보기", "View Details")}</summary><p>{detailItem.description}</p></details>}</article>;
        })}
      </div>
    </>
  );
}

function UndergraduateCourseDetailList({ locale, items }: { locale: Locale; items: UndergraduateCourseDetail[] }) {
  return <div className="undergraduate-course-detail-list">{items.map((item) => <details key={`${item.courseCode}-${item.nameKo}`}><summary><span className={`course-category course-category-${item.category}`}>{undergraduateCategoryLabel(item.category, locale)}</span><div><small>{item.courseCode}</small><h2>{locale === "en" && item.nameEn ? item.nameEn : item.nameKo}</h2>{item.nameEn && <p className="course-detail-english">{locale === "ko" ? item.nameEn : item.nameKo}</p>}<p className="course-detail-preview">{item.description}</p></div><span className="course-detail-toggle">{tx(locale, "상세보기", "View Details")}<ChevronDown size={17} /></span></summary><div className="course-detail-description"><p>{item.description}</p>{item.reviewNote && <aside><strong>{tx(locale, "공식 확인 필요", "Official verification needed")}</strong><span>{item.reviewNote}</span></aside>}</div></details>)}</div>;
}

type GraduationProgram = "undergraduate" | "graduate";
type GraduationAdmissionYear = "2025" | "2024" | "previous";

const graduationProgramFromQuery = (value: string | undefined): GraduationProgram => value === "graduate" ? "graduate" : "undergraduate";
const graduationYearFromQuery = (value: string | undefined): GraduationAdmissionYear => value === "2024" || value === "previous" ? value : "2025";

function GraduationRequirementsPage({ locale, searchParams }: { locale: Locale; searchParams: Record<string, string> }) {
  const router = useRouter();
  const [program, setProgram] = useState<GraduationProgram>(() => graduationProgramFromQuery(searchParams.program));
  const [admissionYear, setAdmissionYear] = useState<GraduationAdmissionYear>(() => graduationYearFromQuery(searchParams.year));

  useEffect(() => {
    setProgram(graduationProgramFromQuery(searchParams.program));
    setAdmissionYear(graduationYearFromQuery(searchParams.year));
  }, [searchParams.program, searchParams.year]);

  const syncUrl = (nextProgram: GraduationProgram, nextYear = admissionYear) => {
    const params = new URLSearchParams({ program: nextProgram });
    if (nextProgram === "undergraduate") params.set("year", nextYear);
    router.replace(`${hrefFor(locale, "/academics/requirements")}?${params.toString()}`, { scroll: false });
  };

  return <>
    <PageHeader eyebrow="GRADUATION REQUIREMENTS" title={tx(locale, "졸업요건", "Graduation Requirements")} description={tx(locale, "입학연도와 학위과정에 따른 이수학점, 필수 교과목 및 학위 취득 요건을 확인할 수 있습니다.", "Review credits, required courses, and degree requirements by admission year and degree program.")} />
    <section className="section content-section graduation-requirements-page"><div className="container">
      {locale === "en" && <p className="graduation-language-note">Official graduation requirement details are currently provided in Korean.</p>}
      <aside className="graduation-check-notice"><strong>{tx(locale, "확인 안내", "Before You Confirm")}</strong><p>{tx(locale, "졸업요건은 입학연도와 학위과정에 따라 다를 수 있습니다. 최종 졸업사정 전 학사요람과 학부·대학원 공지사항을 반드시 확인해 주세요.", "Graduation requirements may vary by admission year and degree program. Confirm the academic handbook and the latest department or graduate school notices before final degree clearance.")}</p></aside>
      <div className="graduation-program-tabs" role="tablist" aria-label={tx(locale, "졸업요건 과정 선택", "Degree program selection")}>
        {(["undergraduate", "graduate"] as GraduationProgram[]).map((item) => <button type="button" role="tab" id={`graduation-program-tab-${item}`} aria-selected={program === item} aria-controls={`graduation-program-panel-${item}`} onClick={() => { setProgram(item); syncUrl(item); }} key={item}>{item === "undergraduate" ? tx(locale, "학부 졸업요건", "Undergraduate Requirements") : tx(locale, "대학원 졸업요건", "Graduate Requirements")}</button>)}
      </div>
      {program === "undergraduate" ? <UndergraduateGraduationRequirements locale={locale} admissionYear={admissionYear} onSelectAdmissionYear={(year) => { setAdmissionYear(year); syncUrl("undergraduate", year); }} /> : <GraduateGraduationRequirements locale={locale} />}
    </div></section>
  </>;
}

function UndergraduateGraduationRequirements({ locale, admissionYear, onSelectAdmissionYear }: { locale: Locale; admissionYear: GraduationAdmissionYear; onSelectAdmissionYear: (year: GraduationAdmissionYear) => void }) {
  const requirement = getUndergraduateGraduationRequirement(admissionYear);
  const isComplete = requirement.verificationStatus === "verified";
  const pendingMessage = admissionYear === "2024" ? tx(locale, "2024학번 세부 졸업이수요건은 공식 자료 확인이 필요합니다.", "Detailed graduation credit requirements for 2024 admission require official confirmation.") : tx(locale, "이전 학번의 세부 졸업이수요건은 입학연도별 공식 자료 확인이 필요합니다.", "Detailed requirements for earlier admissions require confirmation against the official materials for each admission year.");
  return <div role="tabpanel" className="graduation-program-panel" id="graduation-program-panel-undergraduate" aria-labelledby="graduation-program-tab-undergraduate" tabIndex={0}>
    <div className="graduation-year-selector" aria-label={tx(locale, "학부 입학연도 선택", "Undergraduate admission year")}>{(["2025", "2024", "previous"] as GraduationAdmissionYear[]).map((year) => <button type="button" aria-pressed={admissionYear === year} onClick={() => onSelectAdmissionYear(year)} key={year}>{year === "previous" ? tx(locale, "이전 학번 안내", "Earlier Admission") : tx(locale, `${year}학번`, `${year} Admission`)}</button>)}</div>
    {!isComplete ? <section className="graduation-pending-state" aria-live="polite"><p className="section-label">OFFICIAL VERIFICATION</p><h2>{pendingMessage}</h2><p>{tx(locale, "현재 제공된 자료에는 해당 학번의 별도 세부 학점표가 없습니다. 최종 졸업사정 전 학사요람과 학부 공지사항을 확인해 주세요.", "The supplied material does not include a separate detailed credit table for this admission year. Check the academic handbook and department notices before final degree clearance.")}</p></section> : <>
      <section className="requirements-content-section requirements-credit-section"><div className="requirements-section-heading"><div><p className="section-label">2025 ADMISSION</p><h2>핵심 학점 요약</h2></div><p>{tx(locale, "유형별 교양·전공·총 이수학점을 비교합니다.", "Compare liberal arts, major, and total credits by student type.")}</p></div><UndergraduateCreditSummary locale={locale} summaries={requirement.creditSummary} /></section>
      <section className="requirements-content-section requirements-curriculum-section"><div className="requirements-section-heading"><div><p className="section-label">COURSE COMPOSITION</p><h2>2025학번 교과목 구성</h2></div></div><div className="undergraduate-requirement-sections">{requirement.curriculumSections.map((section) => <UndergraduateRequirementSection locale={locale} section={section} key={section.id} />)}</div></section>
      <section className="requirements-content-section requirements-notes-section"><div className="requirements-section-heading"><div><p className="section-label">IMPORTANT NOTES</p><h2>학부 주요 유의사항</h2></div></div><div className="undergraduate-notice-list">{requirement.noticeGroups.map((notice) => <details key={notice.id}><summary><span>{notice.title}</span><ChevronDown size={18} aria-hidden="true" /></summary><ul>{notice.items.map((item) => <li key={item}>{item}</li>)}</ul></details>)}</div></section>
      <section className="requirements-content-section additional-programs-section"><div className="requirements-section-heading"><div><p className="section-label">ADDITIONAL PROGRAMS</p><h2>복수전공·부전공</h2></div></div><div className="additional-program-grid">{requirement.additionalPrograms.map((program) => <AdditionalProgramTable program={program} key={program.id} />)}</div></section>
    </>}
  </div>;
}

function UndergraduateCreditSummary({ locale, summaries }: { locale: Locale; summaries: MajorTypeSummary[] }) {
  const rows = summaries[0]?.items ?? [];
  return <><div className="requirements-credit-table-wrap"><table className="requirements-credit-table"><caption className="sr-only">{tx(locale, "2025학번 유형별 졸업 이수학점 비교", "2025 admission graduation credit comparison by student type")}</caption><thead><tr><th scope="col">{tx(locale, "구분", "Category")}</th>{summaries.map((summary) => <th scope="col" key={summary.id}>{summary.label}</th>)}</tr></thead><tbody>{rows.map((row) => <tr className={row.emphasis ? `is-${row.emphasis}` : undefined} key={row.id}><th scope="row">{row.label}</th>{summaries.map((summary) => <td key={summary.id}>{summary.items.find((item) => item.id === row.id)?.value ?? "-"}</td>)}</tr>)}</tbody></table></div><div className="requirements-credit-mobile">{summaries.map((summary) => <article key={summary.id}><h3>{summary.label}</h3><dl>{summary.items.map((item) => <div className={item.emphasis ? `is-${item.emphasis}` : undefined} key={item.id}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}</dl></article>)}</div></>;
}

function UndergraduateRequirementSection({ locale, section }: { locale: Locale; section: CurriculumSection }) {
  return <article className={`undergraduate-requirement-section is-${section.id}`}><header><div><p>{section.title}</p><h3>{section.creditRequirement}</h3></div>{section.description && <span>{section.description}</span>}</header>{section.items.length > 0 && <ul>{section.items.map((item) => <li key={`${item.courseCode ?? "general"}-${item.nameKo}`}><RequirementCourseLink locale={locale} name={item.nameKo} code={item.courseCode} /><span>{item.credits === null ? tx(locale, "영역 이수", "Area requirement") : `${item.credits}${tx(locale, "학점", " credits")}`}</span></li>)}</ul>}{section.notes && <p className="undergraduate-section-note">{section.notes.join(" · ")}</p>}</article>;
}

function RequirementCourseLink({ locale, name, code }: { locale: Locale; name: string; code?: string }) {
  if (!code) return <strong>{name}</strong>;
  return <Link href={hrefFor(locale, `/academics/courses?tab=schedule&q=${encodeURIComponent(code)}`)} aria-label={tx(locale, `${name} 교과목 안내에서 검색`, `Search ${name} in course directory`)}><strong>{name}</strong><small>{code}</small></Link>;
}

function AdditionalProgramTable({ program }: { program: AdditionalProgramRequirement }) {
  return <article className="additional-program-card"><h3>{program.title}</h3><table><caption className="sr-only">{program.title} 이수학점 비교</caption><thead><tr><th scope="col">입학연도</th><th scope="col">전공필수</th><th scope="col">전공선택</th><th scope="col">졸업학점</th></tr></thead><tbody>{program.rows.map((row) => <tr key={row.admissionYear}><th scope="row">{row.admissionYear}</th><td>{row.required}</td><td>{row.elective}</td><td>{row.total}</td></tr>)}</tbody></table><div>{program.requiredCourses.map((item) => <section key={item.title}><h4>{item.title}</h4><p>{item.description}</p>{item.items && <ul>{item.items.map((courseName) => <li key={courseName}>{courseName}</li>)}</ul>}</section>)}</div></article>;
}

function GraduateGraduationRequirements({ locale }: { locale: Locale }) {
  const [activeSectionId, setActiveSectionId] = useState(graduateGraduationRequirements[0].sectionId);
  const activeSection = graduateGraduationRequirements.find((section) => section.sectionId === activeSectionId) ?? graduateGraduationRequirements[0];
  return <div role="tabpanel" className="graduation-program-panel" id="graduation-program-panel-graduate" aria-labelledby="graduation-program-tab-graduate" tabIndex={0}><div className="graduate-requirements-desktop"><nav className="graduate-step-navigation" aria-label={tx(locale, "대학원 졸업 절차", "Graduate requirement steps")}>{graduateGraduationRequirements.map((section) => <button type="button" aria-current={activeSectionId === section.sectionId ? "step" : undefined} onClick={() => setActiveSectionId(section.sectionId)} key={section.sectionId}><span>{section.step}</span>{section.title}</button>)}</nav><GraduateRequirementSection locale={locale} section={activeSection} /></div><div className="graduate-requirements-mobile">{graduateGraduationRequirements.map((section, index) => <details open={index === 0} key={section.sectionId}><summary><span>{section.step}</span><strong>{section.title}</strong><ChevronDown size={18} aria-hidden="true" /></summary><GraduateRequirementSection locale={locale} section={section} compact /></details>)}</div></div>;
}

function GraduateRequirementSection({ locale, section, compact = false }: { locale: Locale; section: GraduateGraduationRequirementSection; compact?: boolean }) {
  return <section className={`graduate-requirement-section${compact ? " is-compact" : ""}`} aria-labelledby={`graduate-section-${section.sectionId}`}><header><p className="section-label">STEP {section.step}</p><h2 id={`graduate-section-${section.sectionId}`}>{section.title}</h2>{section.summary && <p>{section.summary}</p>}</header>{section.tables.map((item) => <GraduateRequirementTableView table={item} key={item.id} />)}{section.requirementGroups.map((item) => <section className="graduate-requirement-group" key={item.title}><h3>{item.title}</h3><ul>{item.items.map((value) => <li key={value}>{value}</li>)}</ul></section>)}{section.notes.length > 0 && <aside className="graduate-requirement-notes"><h3>{tx(locale, "유의사항", "Notes")}</h3><ul>{section.notes.map((note) => <li key={note}>{note}</li>)}</ul></aside>}</section>;
}

function GraduateRequirementTableView({ table }: { table: GraduateRequirementTable }) {
  return <section className="graduate-requirement-table-wrap"><h3>{table.title}</h3><table><caption className="sr-only">{table.title}</caption><thead><tr>{table.columns.map((column) => <th scope="col" key={column}>{column}</th>)}</tr></thead><tbody>{table.rows.map((row) => <tr key={row.join("-")}>{row.map((value, index) => <td data-label={table.columns[index]} key={`${index}-${value}`}>{value}</td>)}</tr>)}</tbody></table></section>;
}

type ScholarshipFilterKey = "tuition" | "living-expense" | "grade" | "income" | "year" | "duplicate" | "needs-review";

const scholarshipFilterKeys: ScholarshipFilterKey[] = ["tuition", "living-expense", "grade", "income", "year", "duplicate", "needs-review"];

function scholarshipSupportTypeLabel(item: Scholarship, locale: Locale) {
  if (item.supportType === "tuition") return tx(locale, "등록금 지원", "Tuition");
  if (item.supportType === "living-expense") return tx(locale, "생활비 지원", "Living Expense");
  if (item.supportType === "mixed") return tx(locale, "등록금·생활비 지원", "Tuition & Living Expense");
  if (item.supportType === "other") return tx(locale, "기타 지원", "Other Support");
  return tx(locale, "지원 형태 확인 필요", "Support Type To Confirm");
}

function scholarshipVerificationLabel(item: Scholarship, locale: Locale) {
  if (item.verificationStatus === "historical") return tx(locale, "과거 기준·최신 공지 확인 필요", "Historical · Check Latest Notice");
  if (item.verificationStatus === "needs-review") return tx(locale, "최신 정보 확인 필요", "Current Information To Confirm");
  return tx(locale, "검수 완료", "Verified");
}

function ScholarshipDetailField({ label, children }: { label: string; children: ReactNode }) {
  return <div><dt>{label}</dt><dd>{children}</dd></div>;
}

function ScholarshipsPage({ locale, searchParams }: { locale: Locale; searchParams: Record<string, string> }) {
  const router = useRouter();
  const validCategory = (value: string | undefined): ScholarshipCategory | "all" =>
    value === "internal" || value === "external" || value === "department-fund" ? value : "all";
  const parseFilters = (value: string | undefined) => new Set((value ?? "").split(",").filter((item): item is ScholarshipFilterKey => scholarshipFilterKeys.includes(item as ScholarshipFilterKey)));
  const [category, setCategory] = useState<ScholarshipCategory | "all">(validCategory(searchParams.category));
  const [query, setQuery] = useState(searchParams.q ?? "");
  const [filters, setFilters] = useState<Set<ScholarshipFilterKey>>(parseFilters(searchParams.filters));
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const counts: Record<ScholarshipCategory | "all", number> = {
    all: scholarships.length,
    internal: scholarships.filter((item) => item.category === "internal").length,
    external: scholarships.filter((item) => item.category === "external").length,
    "department-fund": scholarships.filter((item) => item.category === "department-fund").length,
  };

  const filterDefinitions: { key: ScholarshipFilterKey; label: string }[] = [
    { key: "tuition", label: tx(locale, "등록금 지원", "Tuition") },
    { key: "living-expense", label: tx(locale, "생활비 지원", "Living Expense") },
    { key: "grade", label: tx(locale, "성적 기준 있음", "Grade Requirement") },
    { key: "income", label: tx(locale, "소득·가계 기준 있음", "Income Requirement") },
    { key: "year", label: tx(locale, "학년 조건 있음", "Year Requirement") },
    { key: "duplicate", label: tx(locale, "중복수혜 가능", "Duplicate Award Allowed") },
    { key: "needs-review", label: tx(locale, "최신 정보 확인 필요", "Needs Current Review") },
  ];

  const results = useMemo(() => scholarships.filter((item) => {
    const normalizedQuery = query.trim().toLowerCase();
    const searchable = [item.name.ko, item.name.en, ...item.eligibility, item.quota, item.amount, item.selectionPeriod, ...item.continuationConditions, item.applicationMethod, ...item.notes, item.reviewNote]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    const matchesFilters = [...filters].every((filter) => {
      if (filter === "tuition") return item.supportType === "tuition" || item.supportType === "mixed";
      if (filter === "living-expense") return item.supportType === "living-expense" || item.supportType === "mixed";
      if (filter === "grade") return item.criteria.grade;
      if (filter === "income") return item.criteria.income;
      if (filter === "year") return item.criteria.year;
      if (filter === "duplicate") return item.duplicateAllowed === true;
      return item.verificationStatus !== "current";
    });
    return (category === "all" || item.category === category)
      && (!normalizedQuery || searchable.includes(normalizedQuery))
      && matchesFilters;
  }), [category, filters, query]);

  const syncUrl = (nextCategory: ScholarshipCategory | "all", nextQuery: string, nextFilters: Set<ScholarshipFilterKey>) => {
    const params = new URLSearchParams();
    if (nextCategory !== "all") params.set("category", nextCategory);
    if (nextQuery.trim()) params.set("q", nextQuery.trim());
    if (nextFilters.size) params.set("filters", [...nextFilters].join(","));
    const queryString = params.toString();
    router.replace(`${hrefFor(locale, "/academics/scholarships")}${queryString ? `?${queryString}` : ""}`, { scroll: false });
  };

  const selectCategory = (nextCategory: ScholarshipCategory | "all") => {
    setCategory(nextCategory);
    syncUrl(nextCategory, query, filters);
  };

  const toggleFilter = (key: ScholarshipFilterKey) => {
    const nextFilters = new Set(filters);
    if (nextFilters.has(key)) nextFilters.delete(key);
    else nextFilters.add(key);
    setFilters(nextFilters);
    syncUrl(category, query, nextFilters);
  };

  const resetSearch = () => {
    setCategory("all");
    setQuery("");
    setFilters(new Set());
    router.replace(hrefFor(locale, "/academics/scholarships"), { scroll: false });
  };

  const toggleExpanded = (id: string) => {
    const nextIds = new Set(expandedIds);
    if (nextIds.has(id)) nextIds.delete(id);
    else nextIds.add(id);
    setExpandedIds(nextIds);
  };

  const hasSearchState = category !== "all" || Boolean(query.trim()) || filters.size > 0;
  const missing = tx(locale, "정보 확인 필요", "Information To Confirm");

  return (
    <>
      <PageHeader
        eyebrow="SCHOLARSHIPS"
        title={tx(locale, "장학 안내", "Scholarships")}
        description={tx(locale, "교내 장학금과 교외 장학금, 기계공학부 기금장학금의 주요 지원 조건과 선발 정보를 확인할 수 있습니다.", "Compare key eligibility and selection information for internal, external, and department-funded scholarships.")}
      />
      <section className="section content-section scholarship-page">
        <div className="container">
          {locale === "en" && <p className="scholarship-language-note">Official scholarship descriptions are currently provided in Korean.</p>}
          <aside className="scholarship-change-notice">
            <strong>{tx(locale, "신청 전 확인", "Before Applying")}</strong>
            <p>{tx(locale, "장학금의 선발 기준, 지원 금액 및 일정은 학기별로 변경될 수 있습니다. 신청 전 최신 공지사항과 담당 부서 안내를 반드시 확인해 주세요.", "Selection criteria, award amounts, and schedules may change each semester. Check the latest notice and responsible office before applying.")}</p>
          </aside>

          <div className="scholarship-tabs" role="tablist" aria-label={tx(locale, "장학금 분류", "Scholarship Categories")}>
            {(["all", "internal", "external", "department-fund"] as const).map((value) => (
              <button type="button" role="tab" aria-selected={category === value} onClick={() => selectCategory(value)} key={value}>
                <span>{value === "all" ? tx(locale, "전체", "All") : t(scholarshipCategoryLabels[value], locale)}</span>
                <strong>{counts[value]}</strong>
              </button>
            ))}
          </div>

          <form className="scholarship-search" onSubmit={(event) => { event.preventDefault(); syncUrl(category, query, filters); }}>
            <label htmlFor="scholarship-query">{tx(locale, "장학금 검색", "Search Scholarships")}</label>
            <div>
              <Search size={18} aria-hidden="true" />
              <input id="scholarship-query" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={tx(locale, "장학금명·지원 기준·금액·선발 시기", "Name, eligibility, amount, or selection period")} />
              <button type="submit">{tx(locale, "검색", "Search")}</button>
            </div>
          </form>

          <div className="scholarship-filters" aria-label={tx(locale, "장학금 조건 필터", "Scholarship Condition Filters")}>
            {filterDefinitions.map((filter) => <button type="button" aria-pressed={filters.has(filter.key)} onClick={() => toggleFilter(filter.key)} key={filter.key}>{filter.label}</button>)}
          </div>

          <div className="scholarship-results-heading">
            <p role="status" aria-live="polite"><strong>{results.length}</strong> {tx(locale, "개 장학금", "scholarships")}</p>
            {hasSearchState && <button type="button" onClick={resetSearch}>{tx(locale, "검색·필터 초기화", "Reset Search & Filters")}</button>}
          </div>

          {results.length ? <div className="scholarship-list">
            {results.map((item) => {
              const expanded = expandedIds.has(item.id);
              const headingId = `scholarship-heading-${item.id}`;
              const panelId = `scholarship-panel-${item.id}`;
              return <article className={`scholarship-item${expanded ? " is-expanded" : ""}`} key={item.id}>
                <header>
                  <div className="scholarship-title-block">
                    <p>{t(item.categoryLabel, locale)} · {scholarshipSupportTypeLabel(item, locale)}</p>
                    <h2 id={headingId}>{t(item.name, locale)}</h2>
                    <span>{item.eligibility[0] ?? missing}</span>
                  </div>
                  <dl className="scholarship-summary">
                    <div><dt>{tx(locale, "지원 내용", "Award")}</dt><dd>{item.amount ?? scholarshipSupportTypeLabel(item, locale)}</dd></div>
                    <div><dt>{tx(locale, "선발 시기", "Selection")}</dt><dd>{item.selectionPeriod ?? missing}</dd></div>
                  </dl>
                  <button className="scholarship-expand" type="button" aria-expanded={expanded} aria-controls={panelId} onClick={() => toggleExpanded(item.id)}>
                    {tx(locale, "상세보기", "Details")}<ChevronDown size={17} aria-hidden="true" />
                  </button>
                </header>
                {expanded && <div className="scholarship-detail" id={panelId} role="region" aria-labelledby={headingId}>
                  <dl>
                    <ScholarshipDetailField label={tx(locale, "추천·지원 기준", "Eligibility")}>{item.eligibility.length ? <ul>{item.eligibility.map((value) => <li key={value}>{value}</li>)}</ul> : missing}</ScholarshipDetailField>
                    <ScholarshipDetailField label={tx(locale, "선발 인원", "Quota")}>{item.quota ?? missing}</ScholarshipDetailField>
                    <ScholarshipDetailField label={tx(locale, "장학금액", "Amount")}>{item.amount ?? missing}</ScholarshipDetailField>
                    <ScholarshipDetailField label={tx(locale, "선발 시기", "Selection Period")}>{item.selectionPeriod ?? missing}</ScholarshipDetailField>
                    <ScholarshipDetailField label={tx(locale, "계속 수혜 조건", "Continuation")}>{item.continuationConditions.length ? <ul>{item.continuationConditions.map((value) => <li key={value}>{value}</li>)}</ul> : missing}</ScholarshipDetailField>
                    <ScholarshipDetailField label={tx(locale, "중복수혜", "Duplicate Awards")}>{item.duplicateAllowed === true ? tx(locale, "가능(원문 기준)", "Allowed per Source") : item.duplicateAllowed === false ? tx(locale, "불가(원문 기준)", "Not Allowed per Source") : missing}</ScholarshipDetailField>
                    <ScholarshipDetailField label={tx(locale, "신청 방법·제출처", "Application")}>{item.applicationMethod ?? missing}</ScholarshipDetailField>
                    <ScholarshipDetailField label={tx(locale, "기타 유의사항", "Notes")}>{item.notes.length ? <ul>{item.notes.map((value) => <li key={value}>{value}</li>)}</ul> : missing}</ScholarshipDetailField>
                    <ScholarshipDetailField label={tx(locale, "기준연도·검수 상태", "Source & Verification")}><strong className={`scholarship-verification is-${item.verificationStatus}`}>{scholarshipVerificationLabel(item, locale)}</strong>{item.sourceYear && <span>{item.sourceYear}</span>}{item.reviewNote && <p>{item.reviewNote}</p>}</ScholarshipDetailField>
                  </dl>
                </div>}
              </article>;
            })}
          </div> : <EmptyState locale={locale} />}

          <aside className="scholarship-footer-note">
            <h2>{tx(locale, "신청 전 확인사항", "Application Notes")}</h2>
            <ul>
              <li>{tx(locale, "장학금 공지는 학기별로 변경될 수 있습니다.", "Scholarship notices may change each semester.")}</li>
              <li>{tx(locale, "최신 신청 기간과 제출 서류는 공지사항에서 확인해 주세요.", "Check notices for current deadlines and required documents.")}</li>
              <li>{tx(locale, "일부 교내 장학금은 국가장학금 신청이 필요합니다.", "Some internal scholarships require a national scholarship application.")}</li>
              <li>{tx(locale, "등록금 범위를 초과하는 중복수혜 가능 여부는 장학금마다 다릅니다.", "Rules for awards exceeding tuition differ by scholarship.")}</li>
            </ul>
          </aside>

          <nav className="scholarship-related-links" aria-label={tx(locale, "장학 관련 페이지", "Scholarship Related Pages")}>
            <Link href={hrefFor(locale, "/news/notices?audience=undergraduate")}>{tx(locale, "학부 공지사항", "Undergraduate Notices")}<ArrowRight size={17} /></Link>
            <Link href={hrefFor(locale, "/academics/undergraduate")}>{tx(locale, "학부 교육과정", "Undergraduate Program")}<ArrowRight size={17} /></Link>
            <Link href={hrefFor(locale, "/academics/courses")}>{tx(locale, "교과목 안내", "Courses")}<ArrowRight size={17} /></Link>
          </nav>
        </div>
      </section>
    </>
  );
}

function CourseDetail({ locale, course }: { locale: Locale; course: Course }) {
  const areas = researchAreas.filter((area) => course.researchAreaIds.includes(area.id));
  return <><PageHeader eyebrow={`${course.code} · COURSE`} title={t(course.name, locale)} description={locale === "ko" ? course.name.en : course.name.ko} /><section className="section content-section"><div className="container detail-layout"><main><section className="detail-block first"><p className="section-label">COURSE OVERVIEW</p><h2>{tx(locale, "교과목 설명", "Course Description")}</h2><p>{t(course.description, locale)}</p></section><section className="detail-block"><p className="section-label">INFORMATION</p><h2>{tx(locale, "교과목 정보", "Course Information")}</h2><dl className="course-detail-grid"><div><dt>{tx(locale, "학정번호", "Code")}</dt><dd>{course.code}</dd></div><div><dt>{tx(locale, "과정", "Program")}</dt><dd>{course.program === "undergraduate" ? tx(locale, "학부", "Undergraduate") : tx(locale, "대학원", "Graduate")}</dd></div><div><dt>{tx(locale, "학년", "Year")}</dt><dd>{course.year ?? "-"}</dd></div><div><dt>{tx(locale, "학기", "Semester")}</dt><dd>{course.semester}</dd></div><div><dt>{tx(locale, "구분", "Category")}</dt><dd>{course.category}</dd></div><div><dt>{tx(locale, "학점", "Credits")}</dt><dd>{course.credits}</dd></div></dl></section><RelatedLinks locale={locale} items={areas.map((area) => ({ title: t(area.name, locale), path: `/research/${area.slug}` }))} /></main><aside className="detail-nav"><Link className="back-link" href={hrefFor(locale, "/academics/courses")}><ArrowLeft size={16} />{tx(locale, "교과목 목록", "Course list")}</Link><p>{tx(locale, "관련 연구분야", "Related Areas")}</p>{areas.map((area) => <Link href={hrefFor(locale, `/research/${area.slug}`)} key={area.id}><span>{area.number}</span>{t(area.name, locale)}</Link>)}</aside></div></section></>;
}

function UndergraduateAdmissionPage({ locale }: { locale: Locale }) {
  const data = undergraduateAdmission;

  return (
    <>
      <PageHeader eyebrow="UNDERGRADUATE ADMISSION" title={t(data.pageTitle, locale)} description={t(data.description, locale)} />
      <section className="section content-section admission-page">
        <div className="container">
          <div className="admission-page-actions">
            <a className="button primary" href={data.officialAdmissionUrl} target="_blank" rel="noopener noreferrer" aria-label={tx(locale, "연세대학교 입학처 새 창에서 열기", "Open Yonsei University Admissions in a new tab")}>
              {tx(locale, "연세대학교 입학처 바로가기", "Visit Yonsei University Admissions")}<ExternalLink size={16} aria-hidden="true" />
            </a>
          </div>

          <p className="admission-reference-notice">{t(data.admissionNotice, locale)}</p>

          <section className="admission-section">
            <SectionHeading label="ADMISSION GUIDE" title={tx(locale, "입학전형 확인", "Admission Guide")} />
            <div className="admission-type-grid">
              {data.admissionTypes.map((item) => (
                <article key={item.id}>
                  <h3>{t(item.title, locale)}</h3>
                  <p>{t(item.description, locale)}</p>
                  <a href={data.officialAdmissionUrl} target="_blank" rel="noopener noreferrer" aria-label={`${t(item.linkLabel, locale)} ${tx(locale, "새 창에서 열기", "opens in a new tab")}`}>
                    {t(item.linkLabel, locale)}<ExternalLink size={15} aria-hidden="true" />
                  </a>
                </article>
              ))}
            </div>
          </section>

          <section className="admission-section">
            <SectionHeading label="APPLICATION PROCESS" title={tx(locale, "지원 절차", "Application Process")} />
            <ol className="admission-process-list">
              {data.applicationSteps.map((step) => <li key={step.number}><span>{step.number}</span><p>{t(step.text, locale)}</p></li>)}
            </ol>
          </section>

          <section className="admission-section">
            <SectionHeading label="EXPLORE THE DEPARTMENT" title={tx(locale, "기계공학부 미리보기", "Explore Mechanical Engineering")} />
            <div className="admission-preview-grid">
              {data.relatedLinks.map((item) => <Link href={hrefFor(locale, item.path)} key={item.id}><div><h3>{t(item.title, locale)}</h3><p>{t(item.description, locale)}</p></div><ArrowRight size={18} aria-hidden="true" /></Link>)}
            </div>
          </section>

          <section className="admission-section admission-faq">
            <SectionHeading label="FAQ" title={tx(locale, "자주 묻는 질문", "Frequently Asked Questions")} />
            <div>
              {data.faq.map((item, index) => (
                <details key={item.question.ko}>
                  <summary><span>{String(index + 1).padStart(2, "0")}</span>{t(item.question, locale)}<ChevronDown size={18} aria-hidden="true" /></summary>
                  <p>{t(item.answer, locale)}</p>
                </details>
              ))}
            </div>
          </section>

          <RelatedLinks locale={locale} items={data.relatedLinks.map((item) => ({ title: t(item.title, locale), path: item.path }))} />
        </div>
      </section>
    </>
  );
}

function GraduateAdmissionRedirect({ locale }: { locale: Locale }) {
  useEffect(() => {
    window.location.replace(graduateAdmissionUrl);
  }, []);

  return (
    <>
      <PageHeader eyebrow="GRADUATE ADMISSION" title={tx(locale, "대학원 진학", "Graduate Admission")} description={tx(locale, "연세대학교 일반대학원 입학 안내로 이동합니다.", "Opening Yonsei University Graduate School admissions information.")} />
      <section className="section content-section external-destination-page">
        <div className="container">
          <p>{tx(locale, "자동으로 이동하지 않으면 아래 링크를 선택해 주세요.", "If you are not redirected automatically, use the link below.")}</p>
          <a className="button primary" href={graduateAdmissionUrl} target="_blank" rel="noopener noreferrer" aria-label={tx(locale, "연세대학교 일반대학원 입학 안내 새 창에서 열기", "Open Yonsei University Graduate School admissions in a new tab")}>
            {tx(locale, "연세대학교 일반대학원 입학 안내", "Yonsei Graduate School Admissions")}<ExternalLink size={16} aria-hidden="true" />
          </a>
        </div>
      </section>
    </>
  );
}

const careerCategories: Array<"all" | CareerCategory> = ["all", "company-recruitment", "research-position", "internship", "career-event", "other"];

const careerDateLabel = (value: string | null, locale: Locale) => value ? value.replaceAll("-", ".") : tx(locale, "미정", "TBA");

function CareerDirectory({ locale, searchParams }: { locale: Locale; searchParams: Record<string, string> }) {
  const router = useRouter();
  const [category, setCategory] = useState<"all" | CareerCategory>(careerCategories.includes(searchParams.category as CareerCategory) ? searchParams.category as "all" | CareerCategory : "all");
  const [query, setQuery] = useState(searchParams.q ?? "");
  const normalizedQuery = query.trim().toLowerCase();
  const filteredPosts = careerPosts
    .filter((post) => category === "all" || post.category === category)
    .filter((post) => !normalizedQuery || `${post.titleKo} ${post.titleEn} ${post.company?.ko ?? ""} ${post.company?.en ?? ""} ${post.summaryKo} ${post.summaryEn} ${post.contentKo} ${post.contentEn} ${post.tags.map((tag) => `${tag.ko} ${tag.en}`).join(" ")}`.toLowerCase().includes(normalizedQuery))
    .sort((a, b) => Number(b.isPinned) - Number(a.isPinned) || b.publishedAt.localeCompare(a.publishedAt));
  const hasFilters = category !== "all" || Boolean(query.trim());

  const syncUrl = (nextCategory: "all" | CareerCategory, nextQuery: string) => {
    const params = new URLSearchParams();
    if (nextCategory !== "all") params.set("category", nextCategory);
    if (nextQuery.trim()) params.set("q", nextQuery.trim());
    const suffix = params.size ? `?${params.toString()}` : "";
    router.replace(`${hrefFor(locale, "/admission/careers")}${suffix}`);
  };

  const selectCategory = (nextCategory: "all" | CareerCategory) => {
    setCategory(nextCategory);
    syncUrl(nextCategory, query);
  };

  const reset = () => {
    setCategory("all");
    setQuery("");
    syncUrl("all", "");
  };

  return (
    <>
      <PageHeader eyebrow="CAREER OPPORTUNITIES" title={tx(locale, "취업 정보", "Career Information")} description={tx(locale, "기업 채용, 연구원·인턴 모집 및 취업 관련 행사 정보를 확인할 수 있습니다.", "Find company recruitment, research and internship positions, and career-related events.")} />
      <section className="section content-section career-page">
        <div className="container">
          <div className="career-service-row">
            <p>{tx(locale, "채용정보, 진로상담, 취업 멘토링 및 경력개발 서비스는 커리어연세에서 추가로 확인할 수 있습니다.", "Career Yonsei provides additional recruitment, counselling, mentoring, and career development services.")}</p>
            <a className="text-button" href="https://career.yonsei.ac.kr/nonIndex.do" target="_blank" rel="noopener noreferrer" aria-label={tx(locale, "커리어연세 새 창에서 열기", "Open Career Yonsei in a new tab")}>{tx(locale, "커리어연세 바로가기", "Visit Career Yonsei")}<ExternalLink size={15} aria-hidden="true" /></a>
          </div>

          <div className="career-toolbar">
            <div className="career-category-tabs" role="tablist" aria-label={tx(locale, "취업 정보 구분", "Career categories")}>
              {careerCategories.map((item) => <button type="button" role="tab" aria-selected={category === item} key={item} onClick={() => selectCategory(item)}>{item === "all" ? tx(locale, "전체", "All") : t(careerCategoryLabels[item], locale)}</button>)}
            </div>
            <form className="career-search" onSubmit={(event) => { event.preventDefault(); syncUrl(category, query); }}>
              <label className="sr-only" htmlFor="career-query">{tx(locale, "취업 정보 검색", "Search career information")}</label>
              <div><Search size={18} aria-hidden="true" /><input id="career-query" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={tx(locale, "제목, 회사·기관명, 본문, 태그 검색", "Search title, organization, content, or tags")} /><button type="submit">{tx(locale, "검색", "Search")}</button></div>
              {hasFilters && <button type="button" onClick={reset}>{tx(locale, "초기화", "Reset")}</button>}
            </form>
          </div>

          <div className="career-results-summary"><p><strong>{filteredPosts.length}</strong> {tx(locale, "건", "posts")}</p><span>{tx(locale, "샘플 게시글은 실제 공고가 아닙니다.", "Sample posts are not actual job announcements.")}</span></div>
          <div className="career-table">
            <div className="career-table-head"><span>{tx(locale, "구분", "Category")}</span><span>{tx(locale, "제목", "Title")}</span><span>{tx(locale, "회사·기관명", "Organization")}</span><span>{tx(locale, "게시일", "Date")}</span><span>{tx(locale, "접수마감일", "Deadline")}</span><span>{tx(locale, "첨부", "Files")}</span></div>
            {filteredPosts.map((post) => <CareerRow key={post.id} locale={locale} post={post} />)}
          </div>
          {!filteredPosts.length && <EmptyState locale={locale} />}
        </div>
      </section>
    </>
  );
}

function CareerRow({ locale, post }: { locale: Locale; post: CareerPost }) {
  return (
    <Link className="career-row" href={hrefFor(locale, `/admission/careers/${post.slug}`)}>
      <span className="career-row-category">{post.isPinned ? tx(locale, "고정", "Pinned") : t(careerCategoryLabels[post.category], locale)}</span>
      <strong>{locale === "ko" ? post.titleKo : post.titleEn}</strong>
      <span>{post.company ? t(post.company, locale) : "-"}</span>
      <time dateTime={post.publishedAt}>{careerDateLabel(post.publishedAt, locale)}</time>
      <span>{careerDateLabel(post.applicationDeadline, locale)}</span>
      <span className="career-row-file">{post.attachments.length > 0 && <Paperclip size={15} aria-label={tx(locale, "첨부파일 있음", "Attachment available")} />}</span>
    </Link>
  );
}

function CareerDetail({ locale, post }: { locale: Locale; post: CareerPost }) {
  const orderedPosts = [...careerPosts].sort((a, b) => Number(b.isPinned) - Number(a.isPinned) || b.publishedAt.localeCompare(a.publishedAt));
  const index = orderedPosts.findIndex((item) => item.id === post.id);
  const previous = orderedPosts[index - 1];
  const next = orderedPosts[index + 1];
  const title = locale === "ko" ? post.titleKo : post.titleEn;
  const summary = locale === "ko" ? post.summaryKo : post.summaryEn;
  const content = locale === "ko" ? post.contentKo : post.contentEn;

  return (
    <>
      <PageHeader eyebrow="CAREER OPPORTUNITIES" title={title} description={`${t(careerCategoryLabels[post.category], locale)} · ${careerDateLabel(post.publishedAt, locale)}`} />
      <section className="section content-section career-detail-page">
        <article className="container article-detail">
          <div className="career-detail-meta"><span>{t(careerCategoryLabels[post.category], locale)}</span><span>{post.company ? t(post.company, locale) : tx(locale, "기관 정보 확인 중", "Organization pending")}</span><time dateTime={post.publishedAt}>{tx(locale, "게시일", "Posted")} {careerDateLabel(post.publishedAt, locale)}</time><span>{tx(locale, "접수마감일", "Deadline")} {careerDateLabel(post.applicationDeadline, locale)}</span></div>
          {post.isDemo && <p className="sample-data-note">{tx(locale, "이 게시글은 취업 정보 화면 구성 확인을 위한 샘플이며 실제 공고가 아닙니다.", "This is a sample post for reviewing the career page and is not an actual announcement.")}</p>}
          <div className="article-body"><p>{summary}</p><p>{content}</p></div>
          {post.attachments.length > 0 && <div className="attachments"><h2>{tx(locale, "첨부파일", "Attachments")}</h2>{post.attachments.map((attachment) => <a href={attachment.url} key={attachment.id}><Download size={18} />{t(attachment.name, locale)}</a>)}</div>}
          {post.externalUrl && <a className="button primary career-apply-link" href={post.externalUrl} target="_blank" rel="noopener noreferrer">{tx(locale, "외부 지원 링크", "External application link")}<ExternalLink size={16} /></a>}
          <div className="article-navigation">{previous ? <Link href={hrefFor(locale, `/admission/careers/${previous.slug}`)}><ChevronLeft size={18} /><span><small>{tx(locale, "이전글", "Previous")}</small>{locale === "ko" ? previous.titleKo : previous.titleEn}</span></Link> : <span />}{next ? <Link href={hrefFor(locale, `/admission/careers/${next.slug}`)}><span><small>{tx(locale, "다음글", "Next")}</small>{locale === "ko" ? next.titleKo : next.titleEn}</span><ChevronRight size={18} /></Link> : <span />}</div>
          <Link className="button outline article-list-button" href={hrefFor(locale, "/admission/careers")}><ArrowLeft size={17} />{tx(locale, "목록으로 돌아가기", "Back to list")}</Link>
        </article>
      </section>
    </>
  );
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

function getCalendarDays(year: number, month: number) {
  const monthIndex = month - 1;
  const firstWeekday = new Date(Date.UTC(year, monthIndex, 1)).getUTCDay();
  const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const totalDays = Math.ceil((firstWeekday + daysInMonth) / 7) * 7;
  const firstVisibleDate = new Date(Date.UTC(year, monthIndex, 1 - firstWeekday));

  return Array.from({ length: totalDays }, (_, index) => {
    const date = new Date(firstVisibleDate);
    date.setUTCDate(firstVisibleDate.getUTCDate() + index);
    const dateKey = `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}-${String(date.getUTCDate()).padStart(2, "0")}`;

    return {
      dateKey,
      day: date.getUTCDate(),
      isCurrentMonth: date.getUTCMonth() === monthIndex,
    };
  });
}

function formatCalendarTime(value: string, locale: Locale) {
  if (!value) return tx(locale, "종일", "All day");
  const [hours, minutes] = value.split(":").map(Number);
  if (locale === "en") return `${hours % 12 || 12}:${String(minutes).padStart(2, "0")} ${hours < 12 ? "AM" : "PM"}`;
  return `${hours < 12 ? "오전" : "오후"} ${hours % 12 || 12}:${String(minutes).padStart(2, "0")}`;
}

function formatCalendarDate(value: string, locale: Locale) {
  const [year, month, day] = value.split("-").map(Number);
  return locale === "ko" ? `${year}년 ${month}월 ${day}일` : new Intl.DateTimeFormat("en", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }).format(new Date(Date.UTC(year, month - 1, day)));
}

function getTodayKey() {
  const parts = new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Seoul", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(new Date());
  const valueFor = (type: string) => parts.find((part) => part.type === type)?.value ?? "";
  return `${valueFor("year")}-${valueFor("month")}-${valueFor("day")}`;
}

function groupCalendarEventsByMonth(events: CalendarEvent[]) {
  const grouped = Object.fromEntries(Array.from({ length: 12 }, (_, index) => [index + 1, []])) as Record<number, CalendarEvent[]>;
  events.forEach((event) => {
    if (!event.date.startsWith("2026-")) return;
    const month = Number(event.date.slice(5, 7));
    grouped[month].push(event);
  });
  return grouped;
}

function CalendarEventDialog({ event, locale, onClose, closeButtonRef }: { event: CalendarEvent; locale: Locale; onClose: () => void; closeButtonRef: RefObject<HTMLButtonElement | null> }) {
  const timeLabel = !event.startTime ? formatCalendarTime(event.startTime, locale) : event.endTime && event.endTime !== event.startTime ? `${formatCalendarTime(event.startTime, locale)} - ${formatCalendarTime(event.endTime, locale)}` : formatCalendarTime(event.startTime, locale);
  const unavailable = tx(locale, "등록된 정보가 없습니다.", "No information is available.");

  return (
    <div className="calendar-event-dialog-backdrop" role="presentation" onMouseDown={(clickEvent) => { if (clickEvent.target === clickEvent.currentTarget) onClose(); }}>
      <section className="calendar-event-dialog" role="dialog" aria-modal="true" aria-labelledby="calendar-event-dialog-title">
        <button className="calendar-event-dialog-close" type="button" onClick={onClose} ref={closeButtonRef} aria-label={tx(locale, "일정 상세 닫기", "Close event details")}><X size={19} /></button>
        <p>{t(event.category, locale)}</p>
        <h2 id="calendar-event-dialog-title">{t(event.title, locale)}</h2>
        <dl>
          <div><dt>{tx(locale, "날짜", "Date")}</dt><dd>{formatCalendarDate(event.date, locale)}</dd></div>
          <div><dt>{tx(locale, "시간", "Time")}</dt><dd>{timeLabel}</dd></div>
          <div><dt>{tx(locale, "분류", "Category")}</dt><dd>{t(event.category, locale)}</dd></div>
          <div><dt>{tx(locale, "장소", "Location")}</dt><dd>{event.location ? t(event.location, locale) : unavailable}</dd></div>
          <div><dt>{tx(locale, "상세", "Details")}</dt><dd>{event.description ? t(event.description, locale) : unavailable}</dd></div>
        </dl>
        {event.link && <a href={event.link} target="_blank" rel="noreferrer">{tx(locale, "관련 안내 보기", "View related notice")}<ExternalLink size={15} /></a>}
      </section>
    </div>
  );
}

function CalendarPage({ locale, searchParams }: { locale: Locale; searchParams: Record<string, string> }) {
  const router = useRouter();
  const todayKey = getTodayKey();
  const todayYear = Number(todayKey.slice(0, 4));
  const todayMonth = Number(todayKey.slice(5, 7));
  const queryYear = Number(searchParams.year);
  const queryMonth = Number(searchParams.month);
  const initialMonth = queryYear === 2026 && queryMonth >= 1 && queryMonth <= 12 ? queryMonth : (todayYear === 2026 ? todayMonth : 7);
  const [selectedMonth, setSelectedMonth] = useState(initialMonth);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [focusedDayIndex, setFocusedDayIndex] = useState(0);
  const [eventsByMonth, setEventsByMonth] = useState<Record<number, CalendarEvent[]>>(calendarEventsByMonth);
  const [calendarSourceReady, setCalendarSourceReady] = useState(false);
  const calendarDayRefs = useRef<Array<HTMLDivElement | null>>([]);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const selectedEvents = eventsByMonth[selectedMonth] ?? [];
  const calendarDays = getCalendarDays(2026, selectedMonth);
  const eventsByDate = selectedEvents.reduce<Record<string, CalendarEvent[]>>((acc, event) => {
    acc[event.date] = [...(acc[event.date] ?? []), event];
    return acc;
  }, {});
  const weekdays = locale === "ko" ? ["일", "월", "화", "수", "목", "금", "토"] : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthLabel = locale === "ko" ? `2026년 ${selectedMonth}월` : new Intl.DateTimeFormat("en", { month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(Date.UTC(2026, selectedMonth - 1, 1)));
  const monthOptions = Array.from({ length: 12 }, (_, index) => index + 1);

  const selectMonth = (month: number) => {
    const nextMonth = Math.min(12, Math.max(1, month));
    setSelectedMonth(nextMonth);
    setSelectedDate(null);
    setFocusedDayIndex(0);
    router.replace(`${hrefFor(locale, "/news/calendar")}?year=2026&month=${nextMonth}`, { scroll: false });
  };

  const openEvent = (event: CalendarEvent) => {
    setSelectedDate(event.date);
    setSelectedEvent(event);
  };

  const moveFocus = (index: number, offset: number) => {
    const nextIndex = Math.min(calendarDays.length - 1, Math.max(0, index + offset));
    setFocusedDayIndex(nextIndex);
    window.requestAnimationFrame(() => calendarDayRefs.current[nextIndex]?.focus());
  };

  useEffect(() => {
    if (queryYear === 2026 && queryMonth >= 1 && queryMonth <= 12 && queryMonth !== selectedMonth) setSelectedMonth(queryMonth);
  }, [queryMonth, queryYear, selectedMonth]);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/calendar?year=2026", { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Unable to load calendar events");
        return response.json() as Promise<{ events?: CalendarEvent[] }>;
      })
      .then((data) => {
        if (!Array.isArray(data.events)) throw new Error("Invalid calendar response");
        setEventsByMonth(groupCalendarEventsByMonth(data.events));
        setCalendarSourceReady(true);
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setCalendarSourceReady(true);
      });
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!selectedEvent) return;
    closeButtonRef.current?.focus();
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setSelectedEvent(null); };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [selectedEvent]);

  return (
    <div className="calendar-route-page">
      <PageHeader
        eyebrow="ACADEMIC CALENDAR"
        title={tx(locale, "학사일정", "Academic Calendar")}
        description={tx(locale, "기계공학부의 학사 및 주요 일정을 월간 달력으로 확인합니다.", "View academic and department events in a monthly calendar.")}
      />
      <section className="section content-section">
        <div className="container calendar-page">
          <section className="department-calendar" aria-labelledby="calendar-month-title">
            <header className="department-calendar-toolbar">
              <div>
                <p className="section-label">MONTHLY SCHEDULE</p>
                <h2 id="calendar-month-title">{monthLabel}</h2>
              </div>
              <div className="calendar-month-controls">
                <button type="button" className="calendar-icon-button" onClick={() => selectMonth(selectedMonth - 1)} disabled={selectedMonth === 1} aria-label={tx(locale, "이전 달", "Previous month")} title={tx(locale, "이전 달", "Previous month")}><ChevronLeft size={18} /></button>
                <label className="calendar-month-select"><span className="sr-only">{tx(locale, "월 선택", "Select month")}</span><select value={selectedMonth} onChange={(event) => selectMonth(Number(event.target.value))}>{monthOptions.map((month) => <option value={month} key={month}>{locale === "ko" ? `${month}월` : new Intl.DateTimeFormat("en", { month: "long", timeZone: "UTC" }).format(new Date(Date.UTC(2026, month - 1, 1)))}</option>)}</select></label>
                <button type="button" className="calendar-icon-button" onClick={() => selectMonth(selectedMonth + 1)} disabled={selectedMonth === 12} aria-label={tx(locale, "다음 달", "Next month")} title={tx(locale, "다음 달", "Next month")}><ChevronRight size={18} /></button>
                <button type="button" className="calendar-today-button" onClick={() => selectMonth(todayYear === 2026 ? todayMonth : 7)} aria-label={tx(locale, "오늘로 이동", "Go to today")}>{tx(locale, "오늘", "Today")}</button>
              </div>
            </header>
            <div className="department-calendar-viewport">
              <div className="department-calendar-body" role="grid" aria-label={tx(locale, `${monthLabel} 일정`, `${monthLabel} schedule`)}>
                <div className="department-calendar-weekdays" role="row">
                  {weekdays.map((weekday, index) => <span className={index === 0 ? "is-sunday" : index === 6 ? "is-saturday" : undefined} role="columnheader" key={weekday}>{weekday}</span>)}
                </div>
                <div className="department-calendar-grid">
                  {calendarDays.map((day, index) => {
                    const dayEvents = eventsByDate[day.dateKey] ?? [];
                    const weekday = index % 7;
                    const isToday = day.dateKey === todayKey;
                    const isSelected = day.dateKey === selectedDate;
                    const dateLabel = formatCalendarDate(day.dateKey, locale);
                    return (
                      <div
                        className={`department-calendar-day${day.isCurrentMonth ? "" : " is-outside"}${weekday === 0 ? " is-sunday" : weekday === 6 ? " is-saturday" : ""}${isToday ? " is-today" : ""}${isSelected ? " is-selected" : ""}${dayEvents.length ? " has-events" : ""}`}
                        role="gridcell"
                        aria-label={dayEvents.length ? tx(locale, `${dateLabel}, 일정 ${dayEvents.length}개`, `${dateLabel}, ${dayEvents.length} events`) : tx(locale, `${dateLabel}, 등록된 일정 없음`, `${dateLabel}, no events`)}
                        aria-current={isToday ? "date" : undefined}
                        aria-selected={isSelected || undefined}
                        tabIndex={index === focusedDayIndex ? 0 : -1}
                        onFocus={() => setFocusedDayIndex(index)}
                        onKeyDown={(event) => {
                          if (event.target !== event.currentTarget) return;
                          if (event.key === "ArrowLeft") { event.preventDefault(); moveFocus(index, -1); }
                          if (event.key === "ArrowRight") { event.preventDefault(); moveFocus(index, 1); }
                          if (event.key === "ArrowUp") { event.preventDefault(); moveFocus(index, -7); }
                          if (event.key === "ArrowDown") { event.preventDefault(); moveFocus(index, 7); }
                          if ((event.key === "Enter" || event.key === " ") && dayEvents.length) { event.preventDefault(); openEvent(dayEvents[0]); }
                        }}
                        ref={(element) => { calendarDayRefs.current[index] = element; }}
                        key={day.dateKey}
                      >
                        <time dateTime={day.dateKey}>{day.day}</time>
                        {dayEvents.length > 0 && <div className="department-calendar-events">{dayEvents.slice(0, 2).map((event) => <button type="button" key={event.id} onClick={() => openEvent(event)}><span>{formatCalendarTime(event.startTime, locale)}</span><strong>{t(event.category, locale)} · {t(event.title, locale)}</strong></button>)}{dayEvents.length > 2 && <button type="button" className="calendar-more-events" onClick={() => openEvent(dayEvents[2])}>+{dayEvents.length - 2}{tx(locale, "개 더보기", " more")}</button>}</div>}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            {!selectedEvents.length && <p className="calendar-month-empty">{calendarSourceReady ? tx(locale, "등록된 일정이 없습니다.", "No events are registered.") : tx(locale, "일정을 불러오는 중입니다.", "Loading events.")}</p>}
          </section>
          <section className="calendar-mobile-events" aria-labelledby="calendar-mobile-events-title">
            <h2 id="calendar-mobile-events-title">{tx(locale, "이번 달 일정", "This month’s schedule")}</h2>
            {selectedEvents.length ? <ol>{selectedEvents.map((event) => <li key={event.id}><button type="button" onClick={() => openEvent(event)}><time dateTime={event.date}>{formatCalendarDate(event.date, locale)}</time><span>{formatCalendarTime(event.startTime, locale)}</span><strong>{t(event.category, locale)} · {t(event.title, locale)}</strong></button></li>)}</ol> : <p>{calendarSourceReady ? tx(locale, "등록된 일정이 없습니다.", "No events are registered.") : tx(locale, "일정을 불러오는 중입니다.", "Loading events.")}</p>}
          </section>
        </div>
      </section>
      {selectedEvent && <CalendarEventDialog event={selectedEvent} locale={locale} onClose={() => setSelectedEvent(null)} closeButtonRef={closeButtonRef} />}
    </div>
  );
}

function FacultyRecruitmentPage({ locale }: { locale: Locale }) {
  const { application, areas, contact, description, overview, scopeNote, title } = facultyRecruitment;

  return (
    <>
      <PageHeader eyebrow="FACULTY RECRUITMENT" title={t(title, locale)} description={t(description, locale)} />
      <main className="faculty-recruitment-page">
        <section className="section faculty-recruitment-overview">
          <div className="container faculty-recruitment-container">
            <header className="faculty-recruitment-section-heading">
              <p className="section-label">RECRUITMENT OVERVIEW</p>
              <h2>{tx(locale, "모집 안내", "Recruitment Overview")}</h2>
            </header>
            <ul className="faculty-recruitment-summary">
              {overview.map((item) => <li key={item.ko}>{t(item, locale)}</li>)}
            </ul>
          </div>
        </section>

        <section className="section faculty-recruitment-areas" aria-labelledby="faculty-recruitment-areas-title">
          <div className="container faculty-recruitment-container">
            <header className="faculty-recruitment-section-heading">
              <p className="section-label">RESEARCH AREAS</p>
              <h2 id="faculty-recruitment-areas-title">{tx(locale, "주요 관심 연구 분야", "Areas of Interest")}</h2>
            </header>
            <div className="faculty-recruitment-area-grid">
              {areas.map((area) => (
                <article key={area.title.en}>
                  <h3>{t(area.title, locale)}</h3>
                  {area.subareas && <ul>{area.subareas.map((subarea) => <li key={subarea.en}>{t(subarea, locale)}</li>)}</ul>}
                </article>
              ))}
            </div>
            <p className="faculty-recruitment-scope-note">{t(scopeNote, locale)}</p>
          </div>
        </section>

        <section className="section faculty-recruitment-application" aria-labelledby="faculty-recruitment-application-title">
          <div className="container faculty-recruitment-container faculty-recruitment-application-inner">
            <div>
              <p className="section-label">APPLICATION</p>
              <h2 id="faculty-recruitment-application-title">{tx(locale, "지원 방법", "How to Apply")}</h2>
              <p>{t(application.instruction, locale)}</p>
            </div>
            <a
              className="button primary faculty-recruitment-apply-link"
              href={application.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${t(application.buttonLabel, locale)}${tx(locale, " (새 창)", " (opens in a new window)")}`}
            >
              {t(application.buttonLabel, locale)}
              <ExternalLink size={17} aria-hidden="true" />
            </a>
          </div>
        </section>

        <section className="section faculty-recruitment-contact" aria-labelledby="faculty-recruitment-contact-title">
          <div className="container faculty-recruitment-container">
            <header className="faculty-recruitment-section-heading">
              <p className="section-label">CONTACT</p>
              <h2 id="faculty-recruitment-contact-title">{tx(locale, "문의", "Contact")}</h2>
            </header>
            <dl>
              <div>
                <dt>{tx(locale, "담당", "Committee")}</dt>
                <dd>{contact.committee}</dd>
              </div>
              <div>
                <dt>{tx(locale, "이메일", "Email")}</dt>
                <dd><a href={`mailto:${contact.email}`} aria-label={`${contact.committee} ${contact.email}`}>{contact.email}</a></dd>
              </div>
            </dl>
          </div>
        </section>
      </main>
    </>
  );
}

function SearchPage({ locale, searchParams }: { locale: Locale; searchParams: Record<string, string> }) {
  const router = useRouter();
  const [query, setQuery] = useState(searchParams.q ?? "");
  const normalized = query.trim().toLowerCase();
  const facultyResults = normalized ? faculty.filter((item) => `${item.name.ko} ${item.name.en} ${item.researchKeywords.ko.join(" ")} ${item.researchKeywords.en.join(" ")}`.toLowerCase().includes(normalized)) : [];
  const researchResults = normalized ? researchAreas.filter((item) => `${item.name.ko} ${item.name.en} ${item.keywords.ko.join(" ")} ${item.keywords.en.join(" ")}`.toLowerCase().includes(normalized)) : [];
  const labResults = normalized ? labs.filter((item) => `${item.name.ko} ${item.name.en} ${item.description.ko} ${item.description.en} ${item.location?.ko ?? ""} ${item.location?.en ?? ""}`.toLowerCase().includes(normalized)) : [];
  const courseResults = normalized ? courses.filter((item) => `${item.code} ${item.name.ko} ${item.name.en} ${item.description.ko} ${item.description.en} ${item.category}`.toLowerCase().includes(normalized)) : [];
  const studentActivityResults = normalized ? studentActivities.filter((item) => [
    item.name.ko,
    item.name.en,
    item.category.ko,
    item.category.en,
    item.shortDescription.ko,
    item.shortDescription.en,
    item.description.ko,
    item.description.en,
    ...item.teams.flatMap((entry) => [entry.ko, entry.en]),
    ...item.projects.flatMap((entry) => [entry.ko, entry.en]),
    ...item.achievements.flatMap((entry) => [entry.ko, entry.en]),
    ...item.keywords.flatMap((entry) => [entry.ko, entry.en]),
  ].join(" ").toLowerCase().includes(normalized)) : [];
  const documentResults = normalized ? searchSiteDocuments(query) : [];
  const pageResults = documentResults.filter((item) => item.kind === "page");
  const noticeNewsResults = documentResults.filter((item) => item.kind === "notice-news");
  const admissionCareerResults = documentResults.filter((item) => item.kind === "admission-career");
  const total = facultyResults.length + researchResults.length + labResults.length + courseResults.length + studentActivityResults.length + pageResults.length + noticeNewsResults.length + admissionCareerResults.length;

  return (
    <>
      <PageHeader eyebrow="SEARCH" title={tx(locale, "통합검색", "Search")} description={tx(locale, "교수, 연구, 교육과정, 학생활동, 뉴스와 소식을 한 곳에서 찾습니다.", "Search faculty, research, academics, student activities, news, and notices in one place.")} />
      <section className="section content-section">
        <div className="container search-page">
          <form onSubmit={(event) => { event.preventDefault(); router.replace(`${hrefFor(locale, "/search")}?q=${encodeURIComponent(query)}`); }}>
            <label htmlFor="search-page-input">{tx(locale, "검색어", "Search query")}</label>
            <div><Search size={22} /><input id="search-page-input" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={tx(locale, "검색어를 입력하세요", "Enter a search term")} /><button className="button primary" type="submit">{tx(locale, "검색", "Search")}</button></div>
          </form>
          {normalized && <p className="search-summary"><strong>‘{query}’</strong> {tx(locale, `검색 결과 ${total}건`, `${total} results`)}</p>}
          {!normalized ? (
            <div className="empty-state"><Search size={26} /><h3>{tx(locale, "검색어를 입력해 주세요", "Enter a search term")}</h3><p>{tx(locale, "교수진, 연구실, 교과목, 장학, 졸업요건, 입학·진로, 공지·뉴스를 검색할 수 있습니다.", "Search faculty, laboratories, courses, scholarships, graduation requirements, admissions and careers, notices, and news.")}</p></div>
          ) : total === 0 ? <EmptyState locale={locale} /> : (
            <div className="search-groups">
              <SearchGroup title={tx(locale, "페이지", "Pages")} items={pageResults.map((item) => ({ id: item.id, title: t(item.title, locale), description: t(item.description, locale), path: item.path }))} locale={locale} />
              <SearchGroup title={tx(locale, "교수진", "Faculty")} items={facultyResults.map((item) => ({ id: item.id, title: t(item.name, locale), description: item.researchKeywords[locale].join(" · "), path: `/faculty/${item.slug}` }))} locale={locale} />
              <SearchGroup title={tx(locale, "연구 분야", "Research Areas")} items={researchResults.map((item) => ({ id: item.id, title: t(item.name, locale), description: t(item.shortDescription, locale), path: `/research/${item.slug}` }))} locale={locale} />
              <SearchGroup title={tx(locale, "연구실", "Laboratories")} items={labResults.map((item) => ({ id: item.id, title: t(item.name, locale), description: t(item.description, locale), path: `/labs/${item.slug}` }))} locale={locale} />
              <SearchGroup title={tx(locale, "교과목", "Courses")} items={courseResults.map((item) => ({ id: item.id, title: t(item.name, locale), description: `${item.code} · ${item.credits} ${tx(locale, "학점", "credits")}`, path: `/academics/courses/${item.slug}` }))} locale={locale} />
              <SearchGroup title={tx(locale, "학생활동", "Student Activities")} items={studentActivityResults.map((item) => ({ id: item.id, title: t(item.name, locale), description: t(item.shortDescription, locale), path: `/about/student-activities/${item.slug}` }))} locale={locale} />
              <SearchGroup title={tx(locale, "공지·뉴스", "Notices & News")} items={noticeNewsResults.map((item) => ({ id: item.id, title: t(item.title, locale), description: t(item.description, locale), path: item.path }))} locale={locale} />
              <SearchGroup title={tx(locale, "입학·진로", "Admissions & Careers")} items={admissionCareerResults.map((item) => ({ id: item.id, title: t(item.title, locale), description: t(item.description, locale), path: item.path }))} locale={locale} />
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function SearchGroup({ title, items, locale }: { title: string; items: { id: string; title: string; description: string; path: string }[]; locale: Locale }) {
  if (!items.length) return null;
  return <section className="search-group"><h2>{title}<span>{items.length}</span></h2>{items.map((item) => <Link href={hrefFor(locale, item.path)} key={item.id}><div><strong>{item.title}</strong><p>{item.description}</p></div><ArrowRight size={18} /></Link>)}</section>;
}

function RelatedLinks({ locale, items }: { locale: Locale; items: { title: string; path: string }[] }) {
  if (!items.length) return null;
  return <section className="detail-block"><p className="section-label">RELATED CONTENT</p><h2>{tx(locale, "연관 콘텐츠", "Related Content")}</h2><div className="related-links">{items.map((item) => <Link href={hrefFor(locale, item.path)} key={item.path}>{item.title}<ArrowRight size={18} /></Link>)}</div></section>;
}

function AboutPage({ locale }: { locale: Locale }) {
  const officialLanguageNotice = locale === "en" ? "Official content below is currently provided in Korean." : null;
  const relatedLinks = [
    { title: tx(locale, "연혁", "History"), path: "/about/history" },
    { title: tx(locale, "교수진", "Faculty"), path: "/faculty" },
    { title: tx(locale, "연구 분야", "Research Areas"), path: "/research/fields" },
    { title: tx(locale, "학부 교육과정", "Undergraduate Program"), path: "/academics/undergraduate" },
    { title: tx(locale, "오시는 길", "Directions"), path: "/about/directions" },
  ];

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-about-reveal]"));
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return undefined;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <noscript><style>{`[data-about-reveal] { opacity: 1 !important; transform: none !important; }`}</style></noscript>
      <PageHeader
        eyebrow="ABOUT YONSEI MECHANICAL ENGINEERING"
        title={tx(locale, "학부 소개·비전", "About & Vision")}
        description={locale === "ko" ? "연세대학교 기계공학부는 기계공학의 이론과 응용을 바탕으로 사회와 산업의 발전에 기여할 창의적 공학 인재를 양성합니다." : "Official information on the Department of Mechanical Engineering."}
      />

      <section className="about-vision-section">
        <div className="container">
          {officialLanguageNotice && <p className="about-language-notice">{officialLanguageNotice}</p>}
          <div className="about-vision-panel">
            <section className="about-vision-introduction about-page-reveal" data-about-reveal>
              <header>
                <span>01</span>
                <p>ABOUT</p>
                <h2>{locale === "ko" ? aboutDepartmentIntroduction.titleKo : aboutDepartmentIntroduction.titleEn}</h2>
              </header>
              <p>{aboutDepartmentIntroduction.summary}</p>
            </section>

            <section className="about-vision-purpose about-page-reveal" data-about-reveal>
              <header>
                <p>EDUCATIONAL PURPOSE</p>
                <h2>{locale === "ko" ? aboutEducationalPurpose.titleKo : aboutEducationalPurpose.titleEn}</h2>
              </header>
              <p>{aboutEducationalPurpose.summary}</p>
            </section>

            <section className="about-vision-goals about-page-reveal" data-about-reveal>
              <header>
                <p>OBJECTIVES</p>
                <h2>{tx(locale, "세부 교육목표", "Educational Goals")}</h2>
              </header>
              <div className="about-goals-grid">
                {aboutEducationalGoals.map((goal) => (
                  <article key={goal.number}>
                    <span>{Number(goal.number)}</span>
                    <h3>{goal.title}</h3>
                    <p>{goal.description}</p>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </div>
      </section>

      <section className="about-related-band about-page-reveal" data-about-reveal>
        <nav className="container about-related-links" aria-label={tx(locale, "학부 소개 관련 페이지", "Related about pages")}>
          {relatedLinks.map((item) => <Link href={hrefFor(locale, item.path)} key={item.path}>{item.title}<ArrowRight size={17} /></Link>)}
        </nav>
      </section>
    </>
  );
}

function MapEmbed({ locale }: { locale: Locale }) {
  const embedUrl = `https://www.google.com/maps?q=${encodeURIComponent(departmentDirections.mapQuery)}&output=embed`;

  return (
    <div className="directions-map-frame">
      <div className="directions-map-fallback">
        <MapPin size={22} aria-hidden="true" />
        <p>{departmentDirections.mapQuery}</p>
      </div>
      <iframe
        src={embedUrl}
        title={tx(locale, "연세대학교 기계공학부 위치 지도", "Map of Yonsei Mechanical Engineering")}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}

function DirectionsPage({ locale }: { locale: Locale }) {
  const relatedLinks = [
    { title: tx(locale, "학부 소개·비전", "About & Vision"), path: "/about" },
    { title: tx(locale, "연혁", "History"), path: "/about/history" },
    { title: tx(locale, "교수진", "Faculty"), path: "/faculty" },
    { title: tx(locale, "연구 분야", "Research Areas"), path: "/research/fields" },
  ];

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(`${departmentDirections.address} ${departmentDirections.postalCode}`);
    } catch {}
  };

  return (
    <>
      <header className="directions-page-header">
        <div className="container">
          <p className="section-label">LOCATION</p>
          <h1>{tx(locale, "오시는 길", "Contact & Directions")}</h1>
          <p>{tx(locale, "연세대학교 기계공학부의 위치와 대중교통 이용 방법을 안내합니다.", "Find the department and public transportation information for your visit.")}</p>
        </div>
      </header>

      <section className="directions-map-section">
        <div className="container">
          <MapEmbed locale={locale} />
          <div className="directions-map-meta">
            <p>{departmentDirections.mapQuery}</p>
            <a href={departmentDirections.externalMapUrl} target="_blank" rel="noopener noreferrer">
              {tx(locale, "지도 크게 보기", "Open larger map")}
              <span className="sr-only">{tx(locale, " (새 창)", " (opens in a new window)")}</span>
              <ExternalLink size={15} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <section className="directions-contact-section" aria-labelledby="directions-contact-title">
        <div className="container">
          <h2 className="sr-only" id="directions-contact-title">{tx(locale, "연락처", "Contact information")}</h2>
          <div className="directions-contact-grid">
            <article>
              <span>{tx(locale, "주소", "Address")}</span>
              <p>{departmentDirections.address}<br />{tx(locale, "우편번호", "Postal code")} {departmentDirections.postalCode}</p>
              <button type="button" onClick={copyAddress} aria-label={tx(locale, "주소 복사", "Copy address")}>{tx(locale, "주소 복사", "Copy address")}</button>
            </article>
            <article>
              <span>{tx(locale, "전화", "Telephone")}</span>
              <a href={`tel:${departmentDirections.phone.replaceAll("-", "")}`} aria-label={tx(locale, `기계공학부 전화 ${departmentDirections.phone}`, `Call the department at ${departmentDirections.phone}`)}>{departmentDirections.phone}</a>
            </article>
            <article>
              <span>{tx(locale, "이메일", "Email")}</span>
              <a href={`mailto:${departmentDirections.email}`} aria-label={tx(locale, `기계공학부 이메일 ${departmentDirections.email}`, `Email the department at ${departmentDirections.email}`)}>{departmentDirections.email}</a>
            </article>
          </div>
        </div>
      </section>

      <section className="directions-transit-section" aria-labelledby="subway-heading">
        <div className="container">
          <header className="directions-section-heading">
            <p className="section-label directions-mode-label"><TrainFront size={16} aria-hidden="true" />SUBWAY</p>
            <h2 id="subway-heading">{tx(locale, "지하철 이용 안내", "By Subway")}</h2>
            <p><span className="subway-line-mark">{t(departmentDirections.subway.line, locale)}</span>{t(departmentDirections.subway.station, locale)}</p>
          </header>
          <div className="subway-exit-grid">
            {departmentDirections.subway.exits.map((exit) => (
              <article key={exit.number}>
                <strong className="subway-exit-title"><MapPin size={17} aria-hidden="true" />{tx(locale, `${exit.number}번 출구`, `Exit ${exit.number}`)}</strong>
                <p>{t(exit.description, locale)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="directions-bus-section" aria-labelledby="bus-heading">
        <div className="container">
          <header className="directions-section-heading">
            <p className="section-label directions-mode-label"><BusFront size={16} aria-hidden="true" />BUS</p>
            <h2 id="bus-heading">{tx(locale, "버스 이용 안내", "By Bus")}</h2>
          </header>
          <div className="bus-route-grid">
            {departmentDirections.busRoutes.map((group) => (
              <article className={`bus-route-group is-${group.colorKey}`} key={group.colorKey}>
                <h3><BusFront size={17} aria-hidden="true" />{t(group.type, locale)}</h3>
                <div aria-label={`${t(group.type, locale)} ${tx(locale, "버스 노선", "bus routes")}`}>
                  {group.routes.map((route) => <span key={route}>{route}</span>)}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="directions-related-section">
        <nav className="container directions-related-links" aria-label={tx(locale, "학부 소개 관련 페이지", "Related pages") }>
          {relatedLinks.map((item) => <Link href={hrefFor(locale, item.path)} key={item.path}>{item.title}<ArrowRight size={17} aria-hidden="true" /></Link>)}
        </nav>
      </section>
    </>
  );
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

function HistoryPage({ locale }: { locale: Locale }) {
  const languageNotice = locale === "en" ? "Official history records are currently provided in Korean." : null;
  const relatedLinks = [
    { title: tx(locale, "학부 소개·비전", "About & Vision"), path: "/about" },
    { title: tx(locale, "교육 목표", "Educational Goals"), path: "/academics/undergraduate" },
    { title: tx(locale, "교수진", "Faculty"), path: "/faculty" },
    { title: tx(locale, "오시는 길", "Directions"), path: "/about/directions" },
  ];

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-history-reveal]"));
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return undefined;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <noscript><style>{`[data-history-reveal] { opacity: 1 !important; transform: none !important; }`}</style></noscript>
      <PageHeader
        eyebrow="HISTORY"
        title={tx(locale, "연혁", "History")}
        description={tx(locale, "연세대학교 기계공학부는 1958년 출발 이후, 교육과 연구의 축적을 바탕으로 기계공학 분야의 발전을 이어오고 있습니다.", "The Department of Mechanical Engineering has continued to advance its field through the accumulated strength of education and research since 1958.")}
      />
      <section className="section history-page">
        <div className="container history-page-content">
          {languageNotice && <p className="history-language-notice">{languageNotice}</p>}
          <header className="history-intro" data-history-reveal>
            <p className="section-label">DEPARTMENT HISTORY</p>
            <h2>{tx(locale, "기계공학부 연혁", "Department History")}</h2>
          </header>
          <ol className="history-timeline" aria-label={tx(locale, "기계공학부 연혁 목록", "Department history timeline")}>
            {departmentHistory.map((entry) => (
              <li className={`history-timeline-item${entry.highlight ? " is-highlight" : ""}`} data-history-reveal key={entry.id}>
                <span className="history-timeline-marker" aria-hidden="true" />
                <article>
                  <time dateTime={`${entry.year}-${String(entry.month).padStart(2, "0")}`}>
                    <strong>{entry.year}</strong><span>. {String(entry.month).padStart(2, "0")}.</span>
                  </time>
                  <p>{entry.title}</p>
                </article>
              </li>
            ))}
          </ol>
          <nav className="history-related-links" aria-label={tx(locale, "연혁 관련 페이지", "Related history pages")}>
            {relatedLinks.map((item) => <Link href={hrefFor(locale, item.path)} key={item.path}>{item.title}<ArrowRight size={17} /></Link>)}
          </nav>
        </div>
      </section>
    </>
  );
}

function StudentActivitiesPage({ locale }: { locale: Locale }) {
  const activities = studentActivities.slice().sort((a, b) => a.order - b.order);

  return (
    <>
      <PageHeader
        eyebrow="STUDENT ACTIVITIES"
        title={tx(locale, "학생활동·동아리", "Student Activities")}
        description={tx(locale, "기계공학 지식을 실제 프로젝트와 대회 활동으로 확장하는 학생 동아리를 소개합니다.", "Meet student clubs that extend mechanical engineering knowledge through projects and competitions.")}
      />
      <section className="section student-activities-page">
        <div className="container student-activities-grid">
          {activities.map((activity) => (
            <article className="student-activity-card" key={activity.id}>
              <Link
                href={hrefFor(locale, `/about/student-activities/${activity.slug}`)}
                aria-label={tx(locale, `${t(activity.name, locale)} 자세히 보기`, `View ${t(activity.name, locale)} details`)}
              >
                <header className="student-activity-card-meta">
                  <span>{String(activity.order).padStart(2, "0")}</span>
                  <p>{t(activity.category, locale)}</p>
                </header>
                <div className="student-activity-card-image">
                  <Image src={activity.image.src} alt={t(activity.image.alt, locale)} fill sizes="(max-width: 1024px) 100vw, 50vw" unoptimized />
                </div>
                <div className="student-activity-card-content">
                  <h2>{t(activity.name, locale)}</h2>
                  <p>{t(activity.shortDescription, locale)}</p>
                  <div className="student-activity-keywords" aria-label={tx(locale, `${t(activity.name, locale)} 주요 키워드`, `${t(activity.name, locale)} keywords`)}>
                    {activity.keywords.map((keyword) => <span key={keyword.ko}>{t(keyword, locale)}</span>)}
                  </div>
                  <span className="student-activity-detail-link">{tx(locale, "자세히 보기", "View details")}<ArrowRight size={17} aria-hidden="true" /></span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function StudentActivityDetailSection({
  label,
  title,
  items,
  locale,
}: {
  label: string;
  title: string;
  items: LocaleText[];
  locale: Locale;
}) {
  return (
    <section className="student-activity-detail-section">
      <p className="section-label">{label}</p>
      <h2>{title}</h2>
      {items.length ? <ul>{items.map((item) => <li key={item.ko}>{t(item, locale)}</li>)}</ul> : <p className="student-activity-pending">{tx(locale, "공식 정보를 확인한 뒤 업데이트합니다.", "This information will be updated after official confirmation.")}</p>}
    </section>
  );
}

function StudentActivityDetail({ locale, activity }: { locale: Locale; activity: StudentActivity }) {
  const relatedActivities = studentActivities.filter((item) => item.id !== activity.id).sort((a, b) => a.order - b.order);

  return (
    <>
      <PageHeader eyebrow="STUDENT ACTIVITIES" title={t(activity.name, locale)} description={t(activity.category, locale)} />
      <section className="section student-activity-detail-page">
        <div className="container student-activity-detail-layout">
          <main>
            <figure className="student-activity-hero-image">
              <Image src={activity.image.src} alt={t(activity.image.alt, locale)} fill sizes="(max-width: 1024px) 100vw, 70vw" priority unoptimized />
            </figure>
            <section className="student-activity-detail-section student-activity-introduction">
              <p className="section-label">INTRODUCTION</p>
              <h2>{tx(locale, "동아리 소개", "About the Club")}</h2>
              <p>{t(activity.description, locale)}</p>
            </section>
            <div className="student-activity-detail-columns">
              <StudentActivityDetailSection label="TEAM & ACTIVITIES" title={tx(locale, "팀·활동 분야", "Teams & Activities")} items={activity.teams} locale={locale} />
              <StudentActivityDetailSection label="PROJECTS" title={tx(locale, "주요 프로젝트", "Key Projects")} items={activity.projects} locale={locale} />
              <StudentActivityDetailSection label="ACHIEVEMENTS" title={tx(locale, "주요 성과", "Highlights")} items={activity.achievements} locale={locale} />
              <section className="student-activity-detail-section">
                <p className="section-label">EXTERNAL CHANNELS</p>
                <h2>{tx(locale, "외부 채널", "External Channels")}</h2>
                {activity.links.length ? (
                  <ul className="student-activity-external-links">
                    {activity.links.map((link) => (
                      <li key={link.id}>
                        {link.kind === "pending" ? <span className="student-activity-pending-link">{t(link.label, locale)}</span> : (
                          <a
                            href={link.url}
                            target={link.kind === "external" ? "_blank" : undefined}
                            rel={link.kind === "external" ? "noopener noreferrer" : undefined}
                            aria-label={link.kind === "external" ? tx(locale, `${t(activity.name, locale)} ${t(link.label, locale)} 새 창에서 열기`, `Open ${t(activity.name, locale)} ${t(link.label, locale)} in a new tab`) : tx(locale, `${t(activity.name, locale)} 이메일 보내기`, `Email ${t(activity.name, locale)}`)}
                          >
                            {t(link.label, locale)}{link.kind === "external" && <ExternalLink size={15} aria-hidden="true" />}
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : <p className="student-activity-pending">{tx(locale, "공식 외부 채널 정보를 확인한 뒤 업데이트합니다.", "Official external channels will be added after confirmation.")}</p>}
              </section>
            </div>
            {locale === "en" && <p className="student-activity-language-note">{activity.reviewNote}</p>}
          </main>
          <aside className="student-activity-detail-nav">
            <Link className="back-link" href={hrefFor(locale, "/about/student-activities")}><ArrowLeft size={16} />{tx(locale, "동아리 목록", "All student activities")}</Link>
            <p>{tx(locale, "다른 학생활동", "Other Activities")}</p>
            {relatedActivities.map((item) => <Link href={hrefFor(locale, `/about/student-activities/${item.slug}`)} key={item.id}><span>{String(item.order).padStart(2, "0")}</span>{t(item.name, locale)}<ArrowRight size={16} /></Link>)}
          </aside>
        </div>
      </section>
    </>
  );
}

function StaffPage({ locale }: { locale: Locale }) {
  const staffGroups = administrativeStaff
    .slice()
    .sort((a, b) => a.displayOrder - b.displayOrder)
    .reduce<{ departmentKo: string; departmentEn: string | null; members: typeof administrativeStaff }[]>((groups, member) => {
      const group = groups.find((entry) => entry.departmentKo === member.departmentKo);
      if (group) group.members.push(member);
      else groups.push({ departmentKo: member.departmentKo, departmentEn: member.departmentEn, members: [member] });
      return groups;
    }, []);
  const relatedLinks = [
    { title: tx(locale, "학부 소개·비전", "About & Vision"), path: "/about" },
    { title: tx(locale, "연혁", "History"), path: "/about/history" },
    { title: tx(locale, "동문·대외협력", "Alumni & Partnerships"), path: "/about/alumni" },
    { title: tx(locale, "연락처·오시는 길", "Contact & Directions"), path: "/about/directions" },
  ];

  return (
    <>
      <PageHeader
        eyebrow="ADMINISTRATIVE STAFF"
        title={tx(locale, "교직원", "Staff")}
        description={tx(locale, "기계공학부 학부·대학원 행정과 BK21 교육연구단의 담당자 및 연락처를 안내합니다.", "Administrative contacts for undergraduate and graduate affairs, and the BK21 education and research group.")}
      />
      <section className="section staff-page">
        <div className="container staff-page-content">
          <header className="staff-page-intro">
            <p className="section-label">CONTACT DIRECTORY</p>
            <h2>{tx(locale, "교직원 연락처", "Staff Contacts")}</h2>
          </header>
          <div className="staff-group-list">
            {staffGroups.map((group) => (
              <section className="staff-group" key={group.departmentKo} aria-labelledby={`staff-${group.departmentKo}`}>
                <h3 id={`staff-${group.departmentKo}`}>{locale === "en" ? group.departmentEn ?? group.departmentKo : group.departmentKo}</h3>
                <div className="staff-directory" role="table" aria-label={tx(locale, `${group.departmentKo} 교직원 연락처`, `${group.departmentKo} staff contacts`)}>
                  <div className="staff-directory-head" role="row">
                    <span role="columnheader">{tx(locale, "담당", "Responsibility")}</span>
                    <span role="columnheader">{tx(locale, "성명", "Name")}</span>
                    <span role="columnheader">{tx(locale, "교내 전화", "Telephone")}</span>
                    <span role="columnheader">{tx(locale, "이메일", "Email")}</span>
                    <span role="columnheader">{tx(locale, "위치", "Office")}</span>
                  </div>
                  {group.members.map((member) => (
                    <article className="staff-directory-row" role="row" key={member.id}>
                      <div className="staff-responsibility" role="cell"><span>{tx(locale, "담당", "Responsibility")}</span><strong>{locale === "en" ? member.responsibilityEn ?? member.responsibilityKo : member.responsibilityKo}</strong></div>
                      <div className="staff-name" role="cell"><span>{tx(locale, "성명", "Name")}</span><strong>{locale === "en" ? member.nameEn ?? member.nameKo : member.nameKo}</strong></div>
                      <div role="cell"><span>{tx(locale, "교내 전화", "Telephone")}</span><a href={`tel:${member.phone.replaceAll("-", "")}`} aria-label={tx(locale, `${member.nameKo} 전화 ${member.phone}`, `Call ${member.nameKo} at ${member.phone}`)}>{member.phone}</a></div>
                      <div role="cell"><span>{tx(locale, "이메일", "Email")}</span><a href={`mailto:${member.email}`} aria-label={tx(locale, `${member.nameKo} 이메일 ${member.email}`, `Email ${member.nameKo} at ${member.email}`)}>{member.email}</a></div>
                      <div role="cell"><span>{tx(locale, "위치", "Office")}</span><p>{locale === "en" ? member.officeEn ?? member.officeKo : member.officeKo}</p></div>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
          <nav className="staff-related-links" aria-label={tx(locale, "교직원 관련 페이지", "Related staff pages")}>
            {relatedLinks.map((item) => <Link href={hrefFor(locale, item.path)} key={item.path}>{item.title}<ArrowRight size={17} aria-hidden="true" /></Link>)}
          </nav>
        </div>
      </section>
    </>
  );
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
  else if (section === "about" && !second) page = <AboutPage locale={locale} />;
  else if (section === "about" && second === "history") page = <HistoryPage locale={locale} />;
  else if (section === "about" && second === "staff") page = <StaffPage locale={locale} />;
  else if (section === "about" && second === "student-activities" && third && getStudentActivityBySlug(third)) page = <StudentActivityDetail locale={locale} activity={getStudentActivityBySlug(third)!} />;
  else if (section === "about" && second === "student-activities") page = <StudentActivitiesPage locale={locale} />;
  else if (section === "about" && (second === "alumni-partnerships" || second === "alumni")) page = <AlumniPartnershipsPage locale={locale} />;
  else if (section === "faculty" && second && getFacultyMemberBySlug(second)) page = <FacultyMemberDetail locale={locale} member={getFacultyMemberBySlug(second)!} />;
  else if (section === "faculty" && !second) page = <FacultyMemberDirectory locale={locale} />;
  else if (section === "faculty" && second && getFacultyBySlug(second)) page = <FacultyDetail locale={locale} person={getFacultyBySlug(second)!} />;
  else if (section === "research" && second === "fields") page = <ResearchFieldsPage locale={locale} searchParams={searchParams} />;
  else if (section === "research" && second === "vision-capabilities") page = <ResearchVisionCapabilitiesPage locale={locale} />;
  else if (section === "research" && second === "social-challenges") page = <SocialChallengesPage locale={locale} />;
  else if (section === "research" && second && getResearchAreaBySlug(second)) page = <ResearchDetail locale={locale} area={getResearchAreaBySlug(second)!} />;
  else if (section === "research" && !second) page = <ResearchFieldsPage locale={locale} searchParams={searchParams} />;
  else if (section === "labs" && second && getResearchLabBySlug(second)) page = <ResearchLabDetail locale={locale} lab={getResearchLabBySlug(second)!} />;
  else if (section === "labs" && second && getLabBySlug(second)) page = <LabDetail locale={locale} lab={getLabBySlug(second)!} />;
  else if (section === "labs" && !second) page = <ResearchLabDirectory locale={locale} searchParams={searchParams} />;
  else if (section === "about" && second === "directions") page = <DirectionsPage locale={locale} />;
  else if (section === "academics" && second === "scholarships") page = <ScholarshipsPage locale={locale} searchParams={searchParams} />;
  else if (section === "academics" && second === "requirements") page = <GraduationRequirementsPage locale={locale} searchParams={searchParams} />;
  else if (section === "academics" && second === "curriculum-tree") page = <CurriculumTreePage locale={locale} />;
  else if (section === "academics" && second === "undergraduate") page = <UndergraduateProgramPage locale={locale} />;
  else if (section === "academics" && second === "graduate") page = <GraduateProgramPage locale={locale} searchParams={searchParams} />;
  else if (section === "academics" && second === "courses" && third && getCourseBySlug(third)) page = <CourseDetail locale={locale} course={getCourseBySlug(third)!} />;
  else if (section === "academics" && second === "courses") page = <CourseDirectory locale={locale} searchParams={searchParams} />;
  else if (section === "admission" && second === "undergraduate") page = <UndergraduateAdmissionPage locale={locale} />;
  else if (section === "admission" && second === "graduate") page = <GraduateAdmissionRedirect locale={locale} />;
  else if (section === "admission" && second === "careers" && third && getCareerPostBySlug(third)) page = <CareerDetail locale={locale} post={getCareerPostBySlug(third)!} />;
  else if (section === "admission" && second === "careers") page = <CareerDirectory locale={locale} searchParams={searchParams} />;
  else if (section === "news" && second === "careers" && third && getCareerPostBySlug(third)) page = <CareerDetail locale={locale} post={getCareerPostBySlug(third)!} />;
  else if (section === "news" && second === "careers") page = <CareerDirectory locale={locale} searchParams={searchParams} />;
  else if (section === "news" && second === "notices" && third && getNoticeBySlug(third)) page = <NoticeDetail locale={locale} notice={getNoticeBySlug(third)!} />;
  else if (section === "news" && second === "notices") page = <NoticeDirectory locale={locale} searchParams={searchParams} />;
  else if (section === "news" && second === "calendar") page = <CalendarPage locale={locale} searchParams={searchParams} />;
  else if (section === "news" && second === "faculty-recruitment") page = <FacultyRecruitmentPage locale={locale} />;
  else if (section === "news" && second === "department") page = <NewsDirectoryPage locale={locale} searchParams={searchParams} />;
  else if (section === "news" && second === "programs" && third) {
    const post = [...seminarPosts, ...eventPosts].find((item) => item.slug === third);
    page = post ? <EditorialDetailPage locale={locale} post={post} posts={[...seminarPosts, ...eventPosts]} /> : <PlaceholderPage locale={locale} segments={segments} />;
  }
  else if (section === "news" && second === "programs") page = <ProgramsDirectoryPage locale={locale} searchParams={searchParams} posts={[...seminarPosts, ...eventPosts]} />;
  else if (section === "news" && second === "events") page = <ProgramsDirectoryPage locale={locale} searchParams={{ ...searchParams, type: "event" }} posts={[...seminarPosts, ...eventPosts]} />;
  else if (section === "news" && second && getNewsBySlug(second)) page = <EditorialDetailPage locale={locale} post={getNewsBySlug(second)!} posts={newsPosts} />;
  else if (section === "news" && !second) page = <NewsDirectoryPage locale={locale} searchParams={searchParams} />;
  else if (section === "seminars" && second && getSeminarBySlug(second)) page = <EditorialDetailPage locale={locale} post={getSeminarBySlug(second)!} posts={seminarPosts} />;
  else if (section === "seminars" && !second) page = <ProgramsDirectoryPage locale={locale} searchParams={{ ...searchParams, type: "seminar" }} posts={[...seminarPosts, ...eventPosts]} />;
  else if (section === "events" && second && getEventBySlug(second)) page = <EditorialDetailPage locale={locale} post={getEventBySlug(second)!} posts={eventPosts} />;
  else if (section === "events" && !second) page = <ProgramsDirectoryPage locale={locale} searchParams={{ ...searchParams, type: "event" }} posts={[...seminarPosts, ...eventPosts]} />;
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
