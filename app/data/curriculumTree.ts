export type CurriculumArea = "msc" | "major" | "ge";
export type CurriculumSemester = "1-1" | "1-2" | "2-1" | "2-2" | "3-1" | "3-2" | "4-1" | "4-2";
export type CurriculumCourseSemester = CurriculumSemester | "upper-spring" | "upper-fall" | null;
export type CurriculumDisplayGroup =
  | "semester-grid"
  | "graduation-required"
  | "seminar"
  | "advanced-spring-left"
  | "advanced-spring-right"
  | "advanced-fall-left"
  | "advanced-fall-right"
  | "general-required"
  | "general-recommended";

export type CurriculumCourse = {
  id: string;
  nameKo: string;
  nameEn: string | null;
  area: CurriculumArea;
  semester: CurriculumCourseSemester;
  required: boolean;
  prerequisites: string[];
  oneOfGroup: string | null;
  displayGroup: CurriculumDisplayGroup;
};

export type GeneralEducationRule = {
  id: string;
  titleKo: string;
  titleEn: string;
  areas: string[];
  totalAreaCount: number;
  requiredAreaCount: number;
};

export const curriculumSemesters: { id: CurriculumSemester; labelKo: string; labelEn: string }[] = [
  { id: "1-1", labelKo: "1-1", labelEn: "Y1 S1" },
  { id: "1-2", labelKo: "1-2", labelEn: "Y1 S2" },
  { id: "2-1", labelKo: "2-1", labelEn: "Y2 S1" },
  { id: "2-2", labelKo: "2-2", labelEn: "Y2 S2" },
  { id: "3-1", labelKo: "3-1", labelEn: "Y3 S1" },
  { id: "3-2", labelKo: "3-2", labelEn: "Y3 S2" },
  { id: "4-1", labelKo: "4-1", labelEn: "Y4 S1" },
  { id: "4-2", labelKo: "4-2", labelEn: "Y4 S2" },
];

const course = (
  id: string,
  nameKo: string,
  area: CurriculumArea,
  semester: CurriculumCourseSemester,
  required: boolean,
  displayGroup: CurriculumDisplayGroup,
  prerequisites: string[] = [],
  oneOfGroup: string | null = null,
): CurriculumCourse => ({ id, nameKo, nameEn: null, area, semester, required, prerequisites, oneOfGroup, displayGroup });

export const curriculumCourses: CurriculumCourse[] = [
  course("engineering-math-1", "공학수학 1", "msc", "1-1", true, "semester-grid"),
  course("engineering-physics-lab-1", "공학물리학 및 실험 1", "msc", "1-1", true, "semester-grid"),
  course("engineering-chemistry-lab-1", "공학화학 및 실험 1", "msc", "1-1", true, "semester-grid"),
  course("engineering-math-2", "공학수학 2", "msc", "1-2", true, "semester-grid"),
  course("engineering-physics-lab-2", "공학물리학 및 실험 2", "msc", "1-2", true, "semester-grid"),
  course("engineering-chemistry-lab-2", "공학화학 및 실험 2", "msc", "1-2", true, "semester-grid"),
  course("engineering-math-3", "공학수학 3", "msc", "2-1", true, "semester-grid"),
  course("engineering-information-processing", "공학정보처리", "msc", "2-1", true, "semester-grid"),
  course("engineering-math-4", "공학수학 4", "msc", "2-2", true, "semester-grid", ["engineering-math-3"]),
  course("engineering-numerical-analysis", "공학수치해석", "msc", "3-1", false, "semester-grid", [], "msc-choice-1"),
  course("probability-statistics", "확률 통계", "msc", "3-1", false, "semester-grid", [], "msc-choice-1"),

  course("solid-mechanics", "고체 역학", "major", "2-1", true, "semester-grid"),
  course("thermodynamics", "열역학", "major", "2-1", true, "semester-grid"),
  course("computer-aided-mechanical-design", "컴퓨터 응용 기계 설계", "major", "2-1", false, "semester-grid"),
  course("fluid-mechanics", "유체 역학", "major", "2-2", true, "semester-grid"),
  course("dynamics", "동역학", "major", "2-2", true, "semester-grid"),
  course("mechanical-engineering-lab-1", "기계공학실험 (1)", "major", "2-2", true, "semester-grid"),
  course("creative-product-design", "창의제품설계", "major", null, true, "graduation-required"),
  course("research-thesis", "연구논문", "major", null, true, "graduation-required"),
  course("mechanical-engineering-seminar-1", "기계공학세미나 (1)", "major", null, false, "seminar"),
  course("mechanical-engineering-seminar-2", "기계공학세미나 (2)", "major", null, false, "seminar"),

  course("material-behavior", "재료거동학", "major", "upper-spring", false, "advanced-spring-left"),
  course("heat-transfer", "열 전달", "major", "upper-spring", false, "advanced-spring-left"),
  course("manufacturing-engineering", "생산 공학", "major", "upper-spring", false, "advanced-spring-left"),
  course("applied-fluid-mechanics", "응용 유체 역학", "major", "upper-spring", false, "advanced-spring-left"),
  course("mechanical-vibration", "기계 진동", "major", "upper-spring", false, "advanced-spring-left"),
  course("mechanical-engineering-lab-2", "기계공학실험 (2)", "major", "upper-spring", true, "advanced-spring-left"),
  course("undergraduate-research-1", "학부연구 (1)", "major", "upper-spring", false, "advanced-spring-left"),
  course("environmental-mechanical-engineering", "환경기계공학", "major", "upper-spring", false, "advanced-spring-right"),
  course("micro-mechanical-systems", "마이크로 기계시스템", "major", "upper-spring", false, "advanced-spring-right"),
  course("electromagnetics-applications", "전자기학및응용", "major", "upper-spring", false, "advanced-spring-right"),
  course("mechanism-design", "메카니즘설계", "major", "upper-spring", false, "advanced-spring-right"),
  course("biomedical-machinery", "바이오의료기계", "major", "upper-spring", false, "advanced-spring-right"),

  course("applied-solid-mechanics", "응용고체역학", "major", "upper-fall", false, "advanced-fall-left"),
  course("applied-thermodynamics", "응용열역학", "major", "upper-fall", false, "advanced-fall-left"),
  course("formal-production-systems", "정형생산시스템", "major", "upper-fall", false, "advanced-fall-left"),
  course("energy-power-engineering", "에너지동력공학", "major", "upper-fall", false, "advanced-fall-left"),
  course("mechanical-system-control", "기계시스템제어", "major", "upper-fall", false, "advanced-fall-left"),
  course("mechatronics", "메카트로닉스", "major", "upper-fall", false, "advanced-fall-left"),
  course("undergraduate-research-2", "학부연구 (2)", "major", "upper-fall", false, "advanced-fall-left"),
  course("engineering-materials", "공학재료", "major", "upper-fall", false, "advanced-fall-right"),
  course("nano-mechanical-engineering", "나노기계공학", "major", "upper-fall", false, "advanced-fall-right"),
  course("optical-engineering", "광공학", "major", "upper-fall", false, "advanced-fall-right"),
  course("machine-element-design", "기계요소설계", "major", "upper-fall", false, "advanced-fall-right"),
  course("biomechanics", "생체역학", "major", "upper-fall", false, "advanced-fall-right"),
  course("computer-analysis-based-design", "컴퓨터 해석기반설계", "major", "upper-fall", false, "advanced-fall-right"),

  course("writing", "글쓰기", "ge", null, true, "general-required"),
  course("christian-understanding", "기독교의 이해 영역 중 1과목", "ge", null, true, "general-required"),
  course("college-english", "대학영어 Ⅰ·Ⅱ (또는 고급대학영어 Ⅰ + 대학영어 Ⅱ)", "ge", null, true, "general-required"),
  course("science-technology-society", "과학기술과 사회", "ge", null, false, "general-recommended"),
  course("technology-creation-patents", "기술창조와 특허", "ge", null, false, "general-recommended"),
  course("techno-leadership", "테크노리더십", "ge", null, false, "general-recommended"),
  course("startup-103-21c", "창업 103:21C", "ge", null, false, "general-recommended"),
  course("technology-management", "기술 경영", "ge", null, false, "general-recommended"),
  course("engineering-economy", "경제성 공학", "ge", null, false, "general-recommended"),
];

const commonLiberalAreas = ["문학과예술", "인간과역사", "언어와표현", "가치와윤리", "국가와사회", "지역과세계"];

export const generalEducationRules: GeneralEducationRule[] = [
  {
    id: "through-2021",
    titleKo: "21학번 포함 이전",
    titleEn: "Admission through 2021",
    areas: [...commonLiberalAreas, "정보와기술"],
    totalAreaCount: 7,
    requiredAreaCount: 5,
  },
  {
    id: "from-2022",
    titleKo: "22학번 포함 이후",
    titleEn: "Admission from 2022",
    areas: commonLiberalAreas,
    totalAreaCount: 6,
    requiredAreaCount: 4,
  },
];

export const curriculumTreePdfUrl: string | null = null;

export const curriculumTreeReviewNotes = [
  "원본 교과목 체계도 PDF 파일 또는 URL 확인 필요.",
  "‘창업 103:21C’는 원본 표기를 유지했으며 학과 원자료로 정확한 과목명 확인 필요.",
  "스페셜 트랙 구성 과목과 별도 상세 페이지 콘텐츠는 학과 확인 필요.",
  "창의제품설계·연구논문의 개설 학기 표기는 학과 확인 후 추가 필요.",
];

export const getCurriculumCourseById = (id: string) => curriculumCourses.find((item) => item.id === id);

export const getCurriculumCourses = (area: CurriculumArea, displayGroup?: CurriculumDisplayGroup) =>
  curriculumCourses.filter((item) => item.area === area && (!displayGroup || item.displayGroup === displayGroup));
