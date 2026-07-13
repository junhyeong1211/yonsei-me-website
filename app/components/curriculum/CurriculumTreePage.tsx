"use client";

import Link from "next/link";
import { ArrowRight, Download, FileText } from "lucide-react";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import type { Locale } from "../../data/content";
import {
  curriculumCourses,
  curriculumSemesters,
  curriculumTreePdfUrl,
  generalEducationRules,
  getCurriculumCourseById,
  getCurriculumCourses,
  type CurriculumCourse,
  type CurriculumCourseSemester,
  type CurriculumDisplayGroup,
  type CurriculumSemester,
} from "../../data/curriculumTree";

type SemesterFilter = "all" | CurriculumSemester;
type AdvancedTerm = "spring" | "fall";

const text = (locale: Locale, ko: string, en: string) => (locale === "ko" ? ko : en);

const semesterText = (semester: CurriculumCourseSemester, locale: Locale) => {
  if (!semester) return text(locale, "개설 학기 확인 필요", "Semester to be confirmed");
  if (semester === "upper-spring") return text(locale, "3·4학년 1학기", "Years 3–4, Spring");
  if (semester === "upper-fall") return text(locale, "3·4학년 2학기", "Years 3–4, Fall");
  const [year, term] = semester.split("-");
  return text(locale, `${year}학년 ${term}학기`, `Year ${year}, Semester ${term}`);
};

const matchesSemester = (course: CurriculumCourse, filter: SemesterFilter) => {
  if (filter === "all" || course.semester === null) return true;
  if (course.semester === filter) return true;
  if (course.semester === "upper-spring") return filter === "3-1" || filter === "4-1";
  if (course.semester === "upper-fall") return filter === "3-2" || filter === "4-2";
  return false;
};

function CourseCard({
  course,
  locale,
  filter,
  selectedCourseId,
  prerequisiteIds,
  onSelect,
}: {
  course: CurriculumCourse;
  locale: Locale;
  filter: SemesterFilter;
  selectedCourseId: string | null;
  prerequisiteIds: string[];
  onSelect: (course: CurriculumCourse) => void;
}) {
  const prerequisites = course.prerequisites
    .map((id) => getCurriculumCourseById(id))
    .filter((item): item is CurriculumCourse => Boolean(item));
  const isActive = matchesSemester(course, filter);
  const isSelected = selectedCourseId === course.id;
  const isPrerequisite = prerequisiteIds.includes(course.id);
  const name = locale === "en" && course.nameEn ? course.nameEn : course.nameKo;
  const status = course.required ? text(locale, "필수", "Required") : text(locale, "선택 이수", "Elective");
  const prerequisiteLabel = prerequisites.length
    ? `${text(locale, "선수과목", "Prerequisite")}: ${prerequisites.map((item) => item.nameKo).join(", ")}`
    : "";

  return (
    <li className="curriculum-course-item">
      <button
        type="button"
        className={`curriculum-course-card${course.required ? " is-required" : ""}${isSelected ? " is-selected" : ""}${isPrerequisite ? " is-prerequisite" : ""}${!isActive ? " is-filtered-out" : ""}`}
        onClick={() => onSelect(course)}
        disabled={!isActive}
        aria-pressed={isSelected}
        aria-label={`${name}, ${semesterText(course.semester, locale)}, ${status}${prerequisiteLabel ? `, ${prerequisiteLabel}` : ""}`}
      >
        {isPrerequisite ? <span className="curriculum-prerequisite-badge">{text(locale, "선수과목", "Prerequisite")}</span> : null}
        {course.required ? <span className="curriculum-required-badge">{text(locale, "필수", "Required")}</span> : null}
        <span className="curriculum-course-name">{name}</span>
        {prerequisites.length ? (
          <span className="curriculum-course-meta">
            {text(locale, "선수", "Prerequisite")}: {prerequisites.map((item) => item.nameKo).join(", ")}
          </span>
        ) : null}
      </button>
    </li>
  );
}

function CourseList({
  courses,
  locale,
  filter,
  selectedCourseId,
  prerequisiteIds,
  onSelect,
  className = "",
}: {
  courses: CurriculumCourse[];
  locale: Locale;
  filter: SemesterFilter;
  selectedCourseId: string | null;
  prerequisiteIds: string[];
  onSelect: (course: CurriculumCourse) => void;
  className?: string;
}) {
  return (
    <ul className={`curriculum-course-list ${className}`.trim()}>
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
          locale={locale}
          filter={filter}
          selectedCourseId={selectedCourseId}
          prerequisiteIds={prerequisiteIds}
          onSelect={onSelect}
        />
      ))}
    </ul>
  );
}

function OneOfGroup({
  courses,
  locale,
  filter,
  selectedCourseId,
  prerequisiteIds,
  onSelect,
}: {
  courses: CurriculumCourse[];
  locale: Locale;
  filter: SemesterFilter;
  selectedCourseId: string | null;
  prerequisiteIds: string[];
  onSelect: (course: CurriculumCourse) => void;
}) {
  return (
    <div className={`curriculum-one-of-group${courses.every((course) => !matchesSemester(course, filter)) ? " is-filtered-out" : ""}`}>
      <span className="curriculum-one-of-badge">{text(locale, "택 1", "Choose 1")}</span>
      <CourseList
        courses={courses}
        locale={locale}
        filter={filter}
        selectedCourseId={selectedCourseId}
        prerequisiteIds={prerequisiteIds}
        onSelect={onSelect}
      />
    </div>
  );
}

function SemesterGrid({
  gridId,
  title,
  courses,
  locale,
  filter,
  selectedCourseId,
  prerequisiteIds,
  onSelect,
  showEntryMarkers = false,
}: {
  gridId: string;
  title: string;
  courses: CurriculumCourse[];
  locale: Locale;
  filter: SemesterFilter;
  selectedCourseId: string | null;
  prerequisiteIds: string[];
  onSelect: (course: CurriculumCourse) => void;
  showEntryMarkers?: boolean;
}) {
  const coursesFor = (semester: CurriculumSemester) => courses.filter((course) => course.semester === semester);

  return (
    <div className="curriculum-semester-grid-shell">
      <h3 className="curriculum-subsection-title">{title}</h3>
      <div className="curriculum-desktop-grid" aria-label={title}>
        {showEntryMarkers ? (
          <>
            <div className="curriculum-entry-marker marker-year-two" aria-hidden="true">
              <span>{text(locale, "2학년 진입 전 필수", "Required before Year 2")}</span>
            </div>
            <div className="curriculum-entry-marker marker-year-three" aria-hidden="true">
              <span>{text(locale, "3학년 진입 전 필수", "Required before Year 3")}</span>
            </div>
          </>
        ) : null}
        {curriculumSemesters.map((semester) => {
          const semesterCourses = coursesFor(semester.id);
          const grouped = semesterCourses.filter((course) => course.oneOfGroup);
          const plain = semesterCourses.filter((course) => !course.oneOfGroup);
          return (
            <section className={`curriculum-semester-column${filter !== "all" && filter !== semester.id ? " is-filtered-out" : ""}`} key={semester.id} aria-labelledby={`${gridId}-${semester.id}`}>
              <h4 id={`${gridId}-${semester.id}`} className="curriculum-semester-label">
                {locale === "ko" ? semester.labelKo : semester.labelEn}
              </h4>
              <CourseList
                courses={plain}
                locale={locale}
                filter={filter}
                selectedCourseId={selectedCourseId}
                prerequisiteIds={prerequisiteIds}
                onSelect={onSelect}
              />
              {grouped.length ? (
                <OneOfGroup
                  courses={grouped}
                  locale={locale}
                  filter={filter}
                  selectedCourseId={selectedCourseId}
                  prerequisiteIds={prerequisiteIds}
                  onSelect={onSelect}
                />
              ) : null}
            </section>
          );
        })}
      </div>

      <div className="curriculum-mobile-grades">
        {[1, 2, 3, 4].map((year) => {
          const yearSemesters = curriculumSemesters.filter((semester) => semester.id.startsWith(`${year}-`));
          const hasCourses = yearSemesters.some((semester) => coursesFor(semester.id).length);
          if (!hasCourses) return null;
          return (
            <div className="curriculum-mobile-grade-wrap" key={year}>
              <details className="curriculum-grade-accordion" open={year <= 2}>
                <summary>{text(locale, `${year}학년`, `Year ${year}`)}</summary>
                <div className="curriculum-mobile-semesters">
                  {yearSemesters.map((semester) => {
                    const semesterCourses = coursesFor(semester.id);
                    const grouped = semesterCourses.filter((course) => course.oneOfGroup);
                    return (
                      <section className={`curriculum-mobile-semester${filter !== "all" && filter !== semester.id ? " is-filtered-out" : ""}`} key={semester.id}>
                        <h4>{locale === "ko" ? semester.labelKo : semester.labelEn}</h4>
                        <CourseList
                          courses={semesterCourses.filter((course) => !course.oneOfGroup)}
                          locale={locale}
                          filter={filter}
                          selectedCourseId={selectedCourseId}
                          prerequisiteIds={prerequisiteIds}
                          onSelect={onSelect}
                        />
                        {grouped.length ? (
                          <OneOfGroup
                            courses={grouped}
                            locale={locale}
                            filter={filter}
                            selectedCourseId={selectedCourseId}
                            prerequisiteIds={prerequisiteIds}
                            onSelect={onSelect}
                          />
                        ) : null}
                      </section>
                    );
                  })}
                </div>
              </details>
              {showEntryMarkers && year < 3 ? (
                <div className="curriculum-mobile-entry-marker">
                  {text(locale, `${year + 1}학년 진입 전 필수`, `Required before Year ${year + 1}`)}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AreaSection({ code, title, children }: { code: string; title: string; children: ReactNode }) {
  return (
    <section className="curriculum-area-section" aria-labelledby={`curriculum-area-${code.toLowerCase()}`}>
      <div className="curriculum-area-label" aria-hidden="true">{code}</div>
      <div className="curriculum-area-content">
        <h2 id={`curriculum-area-${code.toLowerCase()}`}>{title}</h2>
        {children}
      </div>
    </section>
  );
}

export function CurriculumTreePage({ locale }: { locale: Locale }) {
  const [filter, setFilter] = useState<SemesterFilter>("all");
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [advancedTerm, setAdvancedTerm] = useState<AdvancedTerm>("spring");

  const selectedCourse = selectedCourseId ? getCurriculumCourseById(selectedCourseId) ?? null : null;
  const prerequisiteIds = selectedCourse?.prerequisites ?? [];
  const liveMessage = useMemo(() => {
    if (!selectedCourse) return "";
    const prerequisites = selectedCourse.prerequisites
      .map((id) => getCurriculumCourseById(id))
      .filter((item): item is CurriculumCourse => Boolean(item));
    if (!prerequisites.length) return text(locale, `${selectedCourse.nameKo}의 선수과목은 지정되어 있지 않습니다.`, `No prerequisite is specified for ${selectedCourse.nameKo}.`);
    const prerequisiteDescription = prerequisites
      .map((course) => `${course.nameKo} (${semesterText(course.semester, locale)})`)
      .join(", ");
    return text(
      locale,
      `${selectedCourse.nameKo}의 선수과목: ${prerequisiteDescription}`,
      `Prerequisites for ${selectedCourse.nameKo}: ${prerequisiteDescription}`,
    );
  }, [locale, selectedCourse]);

  useEffect(() => {
    const clearSelection = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedCourseId(null);
    };
    window.addEventListener("keydown", clearSelection);
    return () => window.removeEventListener("keydown", clearSelection);
  }, []);

  const handleCourseSelect = (course: CurriculumCourse) => {
    setSelectedCourseId((current) => (current === course.id ? null : course.id));
  };

  const handleFilterChange = (nextFilter: SemesterFilter) => {
    setFilter(nextFilter);
    setSelectedCourseId(null);
    if (nextFilter === "3-1" || nextFilter === "4-1") setAdvancedTerm("spring");
    if (nextFilter === "3-2" || nextFilter === "4-2") setAdvancedTerm("fall");
  };

  const mscCourses = getCurriculumCourses("msc", "semester-grid");
  const majorBasics = getCurriculumCourses("major", "semester-grid");
  const group = (displayGroup: CurriculumDisplayGroup) => curriculumCourses.filter((course) => course.displayGroup === displayGroup);

  return (
    <div className="curriculum-tree-page">
      <div className="container curriculum-tree-inner">
        <header className="curriculum-tree-header">
          <div>
            <p className="curriculum-tree-eyebrow">CURRICULUM TREE</p>
            <h1>{text(locale, "기계공학부 교과목 트리", "Mechanical Engineering Curriculum Tree")}</h1>
            <p>
              {text(
                locale,
                "학기별 교과목과 필수 이수 여부, 선수과목 관계를 한눈에 확인할 수 있습니다.",
                "Review courses, requirements, and prerequisite relationships by semester.",
              )}
            </p>
          </div>
          {curriculumTreePdfUrl ? (
            <a className="curriculum-pdf-link" href={curriculumTreePdfUrl} target="_blank" rel="noopener noreferrer">
              <Download size={18} aria-hidden="true" />
              {text(locale, "인쇄용 PDF 다운로드", "Download print PDF")}
            </a>
          ) : (
            <span className="curriculum-pdf-link is-disabled" aria-disabled="true">
              <FileText size={18} aria-hidden="true" />
              <span>
                {text(locale, "인쇄용 PDF 다운로드", "Download print PDF")}
                <small>{text(locale, "원본 PDF 확인 필요", "Source PDF required")}</small>
              </span>
            </span>
          )}
        </header>

        <aside className="curriculum-requirement-banner">
          <p>{text(locale, "학번마다 교과목 체계가 다르니, 상세 정보를 위해 각 학번의 졸업 요건을 확인하시기 바랍니다.", "Curriculum requirements vary by admission year. Please review the graduation requirements for your cohort.")}</p>
          <Link href={`/${locale}/academics/requirements?program=undergraduate`}>
            {text(locale, "학번별 졸업요건 보기", "View requirements by admission year")}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </aside>

        <div className="curriculum-legend" aria-label={text(locale, "교과목 트리 범례", "Curriculum tree legend")}>
          <span><i className="legend-required" />{text(locale, "필수", "Required")}</span>
          <span><i className="legend-elective" />{text(locale, "선택 이수", "Elective")}</span>
          <span><i className="legend-one-of" />{text(locale, "택 1", "Choose 1")}</span>
          <span><b aria-hidden="true">→</b>{text(locale, "선수과목 · 과목 클릭", "Prerequisite · Select a course")}</span>
        </div>

        <div className="curriculum-semester-tabs" role="tablist" aria-label={text(locale, "학기 선택", "Select semester")}>
          <button type="button" role="tab" aria-selected={filter === "all"} className={filter === "all" ? "is-active" : ""} onClick={() => handleFilterChange("all")}>
            {text(locale, "전체", "All")}
          </button>
          {curriculumSemesters.map((semester) => (
            <button
              key={semester.id}
              type="button"
              role="tab"
              aria-selected={filter === semester.id}
              className={filter === semester.id ? "is-active" : ""}
              onClick={() => handleFilterChange(semester.id)}
            >
              {locale === "ko" ? semester.labelKo : semester.labelEn}
            </button>
          ))}
        </div>

        <p className="sr-only" aria-live="polite">{liveMessage}</p>

        <AreaSection code="MSC" title={text(locale, "수학·과학·컴퓨팅", "Mathematics, Science & Computing")}>
          <SemesterGrid
            gridId="msc-semester"
            title={text(locale, "MSC 교과목", "MSC courses")}
            courses={mscCourses}
            locale={locale}
            filter={filter}
            selectedCourseId={selectedCourseId}
            prerequisiteIds={prerequisiteIds}
            onSelect={handleCourseSelect}
            showEntryMarkers
          />
        </AreaSection>

        <AreaSection code="MAJOR" title={text(locale, "전공", "Major")}>
          <SemesterGrid
            gridId="major-foundation-semester"
            title={text(locale, "전공 기초 · 2학년", "Major foundations · Year 2")}
            courses={majorBasics}
            locale={locale}
            filter={filter}
            selectedCourseId={selectedCourseId}
            prerequisiteIds={prerequisiteIds}
            onSelect={handleCourseSelect}
          />

          <div className="curriculum-major-strips">
            <section>
              <h3>{text(locale, "졸업 필수", "Required for graduation")}</h3>
              <CourseList courses={group("graduation-required")} locale={locale} filter={filter} selectedCourseId={selectedCourseId} prerequisiteIds={prerequisiteIds} onSelect={handleCourseSelect} />
            </section>
            <section>
              <h3>{text(locale, "세미나", "Seminars")}</h3>
              <CourseList courses={group("seminar")} locale={locale} filter={filter} selectedCourseId={selectedCourseId} prerequisiteIds={prerequisiteIds} onSelect={handleCourseSelect} />
            </section>
          </div>

          <section className="curriculum-advanced-section" aria-labelledby="curriculum-advanced-title">
            <div className="curriculum-advanced-heading">
              <h3 id="curriculum-advanced-title">{text(locale, "전공 심화 · 3~4학년", "Advanced major · Years 3–4")}</h3>
              <div className="curriculum-advanced-toggle" role="tablist" aria-label={text(locale, "개설 학기", "Offering semester")}>
                <button type="button" role="tab" aria-selected={advancedTerm === "spring"} className={advancedTerm === "spring" ? "is-active" : ""} onClick={() => setAdvancedTerm("spring")}>{text(locale, "1학기", "Spring")}</button>
                <button type="button" role="tab" aria-selected={advancedTerm === "fall"} className={advancedTerm === "fall" ? "is-active" : ""} onClick={() => setAdvancedTerm("fall")}>{text(locale, "2학기", "Fall")}</button>
              </div>
            </div>
            <div className="curriculum-advanced-panels">
              {(["spring", "fall"] as AdvancedTerm[]).map((term) => (
                <section className={`curriculum-advanced-panel term-${term}${advancedTerm === term ? " is-mobile-active" : ""}`} key={term}>
                  <h4>{text(locale, term === "spring" ? "1학기 개설" : "2학기 개설", term === "spring" ? "Spring offerings" : "Fall offerings")}</h4>
                  <div className="curriculum-advanced-columns">
                    <CourseList courses={group(`advanced-${term}-left` as CurriculumDisplayGroup)} locale={locale} filter={filter} selectedCourseId={selectedCourseId} prerequisiteIds={prerequisiteIds} onSelect={handleCourseSelect} />
                    <CourseList courses={group(`advanced-${term}-right` as CurriculumDisplayGroup)} locale={locale} filter={filter} selectedCourseId={selectedCourseId} prerequisiteIds={prerequisiteIds} onSelect={handleCourseSelect} />
                  </div>
                </section>
              ))}
            </div>
          </section>

          <Link className="curriculum-special-track" href={`/${locale}/academics/undergraduate`}>
            <span><b>{text(locale, "스페셜 트랙", "Special tracks")}</b><small>{text(locale, "구성 과목은 학과 확인 후 제공됩니다.", "Course details will be provided after departmental confirmation.")}</small></span>
            <span>{text(locale, "자세히 보기", "View details")} <ArrowRight size={16} aria-hidden="true" /></span>
          </Link>
        </AreaSection>

        <AreaSection code="GE" title={text(locale, "교양", "General Education")}>
          <div className="curriculum-general-overview">
            <section>
              <h3>{text(locale, "공통 교양 · 필수 이수", "Common general education · Required")}</h3>
              <ul className="curriculum-general-required-list">
                {group("general-required").map((course) => <li key={course.id}>{course.nameKo}</li>)}
              </ul>
            </section>
            <section>
              <h3>{text(locale, "공학 관련 권장 교양", "Recommended engineering-related electives")}</h3>
              <ul className="curriculum-general-chips">
                {group("general-recommended").map((course) => <li key={course.id}>{course.nameKo}</li>)}
              </ul>
            </section>
          </div>

          <section className="curriculum-cohort-section" aria-labelledby="curriculum-cohort-title">
            <h3 id="curriculum-cohort-title">{text(locale, "학번별 이수 영역", "Requirements by admission year")}</h3>
            <div className="curriculum-cohort-grid">
              {generalEducationRules.map((rule) => (
                <article key={rule.id}>
                  <h4>{locale === "ko" ? rule.titleKo : rule.titleEn}</h4>
                  <ul>{rule.areas.map((area) => <li key={area}>{area}</li>)}</ul>
                  <p><strong>{rule.totalAreaCount}</strong>{text(locale, `개 영역 중 `, ` areas; complete courses in `)}<strong>{rule.requiredAreaCount}</strong>{text(locale, "개 영역에서 각 1과목씩 이수 필수", " areas, one course per area")}</p>
                </article>
              ))}
            </div>
            <p className="curriculum-cohort-note">{text(locale, "22학번부터 정보와기술 영역 제외, 이수 영역 5개→4개", "From the 2022 cohort, Information & Technology is excluded and the required areas change from 5 to 4.")}</p>
          </section>
        </AreaSection>
      </div>
    </div>
  );
}
