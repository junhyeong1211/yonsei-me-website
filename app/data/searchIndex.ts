import type { LocaleText } from "./content";
import { notices } from "./content";
import { alumniPartnerships } from "./alumniPartnerships";
import { calendarEventsByMonth } from "./calendar";
import { careerPosts } from "./careers";
import { curriculumTreeCourses } from "./curriculumTree";
import { eventPosts } from "./events";
import { facultyRecruitment } from "./facultyRecruitment";
import { newsPosts } from "./news";
import { seminarPosts } from "./seminars";
import { scholarships } from "./scholarships";
import { undergraduateAdmission } from "./undergraduateAdmission";
import { undergraduateGraduationRequirements } from "./undergraduateGraduationRequirements";

export type SearchDocumentKind = "page" | "notice-news" | "admission-career";

export type SearchDocument = {
  id: string;
  kind: SearchDocumentKind;
  title: LocaleText;
  description: LocaleText;
  path: string;
  searchableText: string;
};

const localized = (value: LocaleText | null | undefined) => value ? `${value.ko} ${value.en}` : "";
const join = (values: Array<string | null | undefined>) => values.filter(Boolean).join(" ");

const documents: SearchDocument[] = [
  ...scholarships.map((scholarship) => ({
    id: `scholarship-${scholarship.id}`,
    kind: "page" as const,
    title: scholarship.name,
    description: scholarship.categoryLabel,
    path: "/academics/scholarships",
    searchableText: join([
      localized(scholarship.name),
      localized(scholarship.categoryLabel),
      ...scholarship.eligibility,
      scholarship.quota,
      scholarship.amount,
      scholarship.selectionPeriod,
      ...scholarship.continuationConditions,
      scholarship.applicationMethod,
      ...scholarship.notes,
      scholarship.reviewNote,
    ]),
  })),
  {
    id: "undergraduate-graduation-requirements",
    kind: "page",
    title: { ko: "학부 졸업요건", en: "Undergraduate Graduation Requirements" },
    description: { ko: "학번별 이수학점과 전공·교양 이수요건을 안내합니다.", en: "Review graduation credit and curriculum requirements by admission year." },
    path: "/academics/requirements",
    searchableText: join(undergraduateGraduationRequirements.flatMap((requirement) => [
      requirement.label,
      requirement.reviewNote,
      ...requirement.creditSummary.flatMap((summary) => [summary.label, ...summary.items.flatMap((item) => [item.label, item.value])]),
      ...requirement.curriculumSections.flatMap((section) => [section.title, section.creditRequirement, section.description, ...(section.notes ?? []), ...section.items.flatMap((item) => [item.nameKo, item.courseCode, item.reviewNote])]),
      ...requirement.noticeGroups.flatMap((group) => [group.title, ...group.items]),
      ...requirement.additionalPrograms.flatMap((program) => [program.title, ...program.requiredCourses.flatMap((course) => [course.title, course.description, ...(course.items ?? [])])]),
    ]),
    ),
  },
  {
    id: "curriculum-tree",
    kind: "page",
    title: { ko: "교과목 체계도", en: "Curriculum Tree" },
    description: { ko: "학년·학기별 교과목 흐름과 선수과목 관계를 확인합니다.", en: "Review course progression and prerequisites by academic year and semester." },
    path: "/academics/curriculum-tree",
    searchableText: join([
      "교과목 체계도 교과목 트리 선수과목 필수 선택 이수",
      ...curriculumTreeCourses.flatMap((course) => [course.nameKo, course.area, course.semester, course.required ? "필수" : "선택"]),
    ]),
  },
  {
    id: "alumni-partnerships",
    kind: "page",
    title: alumniPartnerships.title,
    description: alumniPartnerships.description,
    path: "/about/alumni-partnerships",
    searchableText: join([
      localized(alumniPartnerships.title),
      localized(alumniPartnerships.description),
      ...alumniPartnerships.network.flatMap((item) => [localized(item.title), localized(item.description)]),
      ...alumniPartnerships.partnershipAreas.flatMap((item) => [localized(item.title), localized(item.description)]),
      ...alumniPartnerships.cases.flatMap((item) => [localized(item.category), localized(item.title), localized(item.description)]),
      ...alumniPartnerships.inquiries.flatMap((item) => [localized(item.title), localized(item.description)]),
    ]),
  },
  {
    id: "undergraduate-admission",
    kind: "admission-career",
    title: undergraduateAdmission.pageTitle,
    description: undergraduateAdmission.description,
    path: "/admission/undergraduate",
    searchableText: join([
      localized(undergraduateAdmission.pageTitle),
      localized(undergraduateAdmission.description),
      localized(undergraduateAdmission.admissionNotice),
      ...undergraduateAdmission.admissionTypes.flatMap((item) => [localized(item.title), localized(item.description), localized(item.linkLabel)]),
      ...undergraduateAdmission.applicationSteps.map((item) => localized(item.text)),
      ...undergraduateAdmission.faq.flatMap((item) => [localized(item.question), localized(item.answer)]),
    ]),
  },
  {
    id: "graduate-admission",
    kind: "admission-career",
    title: { ko: "대학원 진학", en: "Graduate Admission" },
    description: { ko: "연세대학교 일반대학원 입학 안내로 연결합니다.", en: "Connect to Yonsei Graduate School admissions information." },
    path: "/admission/graduate",
    searchableText: "대학원 진학 대학원 입학 일반대학원 Graduate Admission Yonsei Graduate School",
  },
  {
    id: "career-information",
    kind: "admission-career",
    title: { ko: "취업 정보", en: "Career Information" },
    description: { ko: "채용, 연구직, 인턴과 취업 행사를 안내합니다.", en: "Find recruitment, research positions, internships, and career events." },
    path: "/admission/careers",
    searchableText: "취업 정보 채용 진로 기업 연구원 인턴 취업 행사 Career Information recruitment internship research position",
  },
  ...careerPosts.map((post) => ({
    id: `career-${post.id}`,
    kind: "admission-career" as const,
    title: { ko: post.titleKo, en: post.titleEn },
    description: { ko: post.summaryKo, en: post.summaryEn },
    path: `/admission/careers/${post.slug}`,
    searchableText: join([
      post.titleKo,
      post.titleEn,
      localized(post.company),
      post.summaryKo,
      post.summaryEn,
      post.contentKo,
      post.contentEn,
      ...post.tags.map(localized),
    ]),
  })),
  {
    id: "faculty-recruitment",
    kind: "notice-news",
    title: facultyRecruitment.title,
    description: facultyRecruitment.description,
    path: "/news/faculty-recruitment",
    searchableText: join([
      localized(facultyRecruitment.title),
      localized(facultyRecruitment.description),
      ...facultyRecruitment.overview.map(localized),
      ...facultyRecruitment.areas.flatMap((area) => [localized(area.title), ...(area.subareas?.map(localized) ?? [])]),
      localized(facultyRecruitment.scopeNote),
      localized(facultyRecruitment.application.instruction),
      ...facultyRecruitment.searchKeywords,
    ]),
  },
  {
    id: "academic-calendar",
    kind: "notice-news",
    title: { ko: "학사일정", en: "Academic Calendar" },
    description: { ko: "학부의 월별 학사일정을 안내합니다.", en: "View the department's monthly academic calendar." },
    path: "/news/calendar",
    searchableText: join([
      "학사일정 Academic Calendar",
      ...Object.values(calendarEventsByMonth).flatMap((events) => events.flatMap((event) => [localized(event.title), localized(event.category), localized(event.location), localized(event.description), event.date, event.startTime, event.endTime])),
    ]),
  },
  ...notices.map((notice) => ({
    id: `notice-${notice.id}`,
    kind: "notice-news" as const,
    title: notice.title,
    description: notice.body,
    path: `/news/notices/${notice.slug}`,
    searchableText: join([localized(notice.title), localized(notice.body), notice.category, notice.audience]),
  })),
  ...[...newsPosts, ...seminarPosts, ...eventPosts].map((post) => ({
      id: `editorial-${post.id}`,
      kind: "notice-news" as const,
      title: post.title,
      description: post.summary,
      path: post.type === "news" ? `/news/${post.slug}` : `/news/programs/${post.slug}`,
      searchableText: join([localized(post.title), localized(post.summary), localized(post.content), localized(post.author), localized(post.category)]),
    })),
];

export const searchSiteDocuments = (query: string) => {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return [];
  return documents.filter((document) => `${localized(document.title)} ${localized(document.description)} ${document.searchableText}`.toLowerCase().includes(normalized));
};
