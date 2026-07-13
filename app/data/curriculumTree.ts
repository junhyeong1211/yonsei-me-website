export type CurriculumSemester = "1-1" | "1-2" | "2-1" | "2-2" | "3-1" | "3-2" | "4-1" | "4-2";

export type CurriculumArea = "msc" | "major" | "ge";

export type CurriculumPlacement =
  | "semester-grid"
  | "completion"
  | "seminar"
  | "advanced-first-primary"
  | "advanced-first-secondary"
  | "advanced-second-primary"
  | "advanced-second-secondary"
  | "ge-common"
  | "ge-recommended";

export type CurriculumTreeCourse = {
  id: string;
  nameKo: string;
  area: CurriculumArea;
  semester: CurriculumSemester | null;
  required: boolean;
  prerequisiteIds: string[];
  chooseOneGroup: string | null;
  placement: CurriculumPlacement;
};

const course = (
  id: string,
  nameKo: string,
  area: CurriculumArea,
  semester: CurriculumSemester | null,
  required: boolean,
  placement: CurriculumPlacement,
  options: Pick<CurriculumTreeCourse, "prerequisiteIds" | "chooseOneGroup"> = { prerequisiteIds: [], chooseOneGroup: null },
): CurriculumTreeCourse => ({ id, nameKo, area, semester, required, placement, ...options });

export const curriculumSemesters: { id: CurriculumSemester; labelKo: string; year: 1 | 2 | 3 | 4 }[] = [
  { id: "1-1", labelKo: "1학년 1학기", year: 1 },
  { id: "1-2", labelKo: "1학년 2학기", year: 1 },
  { id: "2-1", labelKo: "2학년 1학기", year: 2 },
  { id: "2-2", labelKo: "2학년 2학기", year: 2 },
  { id: "3-1", labelKo: "3학년 1학기", year: 3 },
  { id: "3-2", labelKo: "3학년 2학기", year: 3 },
  { id: "4-1", labelKo: "4학년 1학기", year: 4 },
  { id: "4-2", labelKo: "4학년 2학기", year: 4 },
];

export const curriculumTreeCourses: CurriculumTreeCourse[] = [
  course("msc-math-1", "공학수학 1", "msc", "1-1", true, "semester-grid"),
  course("msc-physics-1", "공학물리학 및 실험 1", "msc", "1-1", true, "semester-grid"),
  course("msc-chemistry-1", "공학화학 및 실험 1", "msc", "1-1", true, "semester-grid"),
  course("msc-math-2", "공학수학 2", "msc", "1-2", true, "semester-grid"),
  course("msc-physics-2", "공학물리학 및 실험 2", "msc", "1-2", true, "semester-grid"),
  course("msc-chemistry-2", "공학화학 및 실험 2", "msc", "1-2", true, "semester-grid"),
  course("msc-math-3", "공학수학 3", "msc", "2-1", true, "semester-grid"),
  course("msc-information-processing", "공학정보처리", "msc", "2-1", true, "semester-grid"),
  course("msc-math-4", "공학수학 4", "msc", "2-2", true, "semester-grid", { prerequisiteIds: ["msc-math-3"], chooseOneGroup: null }),
  course("msc-numerical-analysis", "공학수치해석", "msc", "3-1", false, "semester-grid", { prerequisiteIds: [], chooseOneGroup: "msc-advanced-choice" }),
  course("msc-probability-statistics", "확률 통계", "msc", "3-1", false, "semester-grid", { prerequisiteIds: [], chooseOneGroup: "msc-advanced-choice" }),

  course("major-solid-mechanics", "고체 역학", "major", "2-1", true, "semester-grid"),
  course("major-thermodynamics", "열역학", "major", "2-1", true, "semester-grid"),
  course("major-computer-aided-design", "컴퓨터 응용 기계 설계", "major", "2-1", false, "semester-grid"),
  course("major-fluid-mechanics", "유체 역학", "major", "2-2", true, "semester-grid"),
  course("major-dynamics", "동역학", "major", "2-2", true, "semester-grid"),
  course("major-mechanical-lab-1", "기계공학실험 1", "major", "2-2", true, "semester-grid"),
  course("major-creative-product-design", "창의제품설계", "major", null, true, "completion"),
  course("major-thesis", "연구논문", "major", null, true, "completion"),
  course("major-seminar-1", "기계공학세미나 1", "major", null, false, "seminar"),
  course("major-seminar-2", "기계공학세미나 2", "major", null, false, "seminar"),

  course("major-material-behavior", "재료거동학", "major", "3-1", false, "advanced-first-primary"),
  course("major-heat-transfer", "열 전달", "major", "3-1", false, "advanced-first-primary"),
  course("major-manufacturing", "생산 공학", "major", "3-1", false, "advanced-first-primary"),
  course("major-applied-fluid", "응용 유체 역학", "major", "3-1", false, "advanced-first-primary"),
  course("major-vibration", "기계 진동", "major", "3-1", false, "advanced-first-primary"),
  course("major-mechanical-lab-2", "기계공학실험 2", "major", "3-1", true, "advanced-first-primary"),
  course("major-undergraduate-research-1", "학부연구 1", "major", "3-1", false, "advanced-first-primary"),
  course("major-environmental-mechanical", "환경기계공학", "major", "3-1", false, "advanced-first-secondary"),
  course("major-microsystems", "마이크로 기계시스템", "major", "3-1", false, "advanced-first-secondary"),
  course("major-electromagnetics", "전자기학및응용", "major", "3-1", false, "advanced-first-secondary"),
  course("major-mechanism-design", "메카니즘설계", "major", "3-1", false, "advanced-first-secondary"),
  course("major-biomedical-mechanical", "바이오의료기계", "major", "3-1", false, "advanced-first-secondary"),
  course("major-applied-solid", "응용고체역학", "major", "3-2", false, "advanced-second-primary"),
  course("major-applied-thermodynamics", "응용열역학", "major", "3-2", false, "advanced-second-primary"),
  course("major-net-shaped-manufacturing", "정형생산시스템", "major", "3-2", false, "advanced-second-primary"),
  course("major-energy-power", "에너지동력공학", "major", "3-2", false, "advanced-second-primary"),
  course("major-system-control", "기계시스템제어", "major", "3-2", false, "advanced-second-primary"),
  course("major-mechatronics", "메카트로닉스", "major", "3-2", false, "advanced-second-primary"),
  course("major-undergraduate-research-2", "학부연구 2", "major", "3-2", false, "advanced-second-primary"),
  course("major-engineering-materials", "공학재료", "major", "3-2", false, "advanced-second-secondary"),
  course("major-nano-mechanical", "나노기계공학", "major", "3-2", false, "advanced-second-secondary"),
  course("major-optical-engineering", "광공학", "major", "3-2", false, "advanced-second-secondary"),
  course("major-machine-elements", "기계요소설계", "major", "3-2", false, "advanced-second-secondary"),
  course("major-biomechanics", "생체역학", "major", "3-2", false, "advanced-second-secondary"),
  course("major-computational-design", "컴퓨터 해석기반설계", "major", "3-2", false, "advanced-second-secondary"),

  course("ge-writing", "글쓰기", "ge", null, true, "ge-common"),
  course("ge-christianity", "기독교의 이해 영역 중 1과목", "ge", null, true, "ge-common"),
  course("ge-college-english", "대학영어 Ⅰ + Ⅱ", "ge", null, false, "ge-common", { prerequisiteIds: [], chooseOneGroup: "ge-english-choice" }),
  course("ge-advanced-college-english", "고급대학영어 Ⅰ + 대학영어 Ⅱ", "ge", null, false, "ge-common", { prerequisiteIds: [], chooseOneGroup: "ge-english-choice" }),
  course("ge-science-technology-society", "과학기술과 사회", "ge", null, false, "ge-recommended"),
  course("ge-technology-patent", "기술창조와 특허", "ge", null, false, "ge-recommended"),
  course("ge-techno-leadership", "테크노리더십", "ge", null, false, "ge-recommended"),
  course("ge-venture-103-21c", "창업 103:21C", "ge", null, false, "ge-recommended"),
  course("ge-technology-management", "기술 경영", "ge", null, false, "ge-recommended"),
  course("ge-engineering-economics", "경제성 공학", "ge", null, false, "ge-recommended"),
];

export const liberalEducationAreas = [
  "문학과예술",
  "인간과역사",
  "언어와표현",
  "가치와윤리",
  "국가와사회",
  "지역과세계",
  "정보와기술",
] as const;

export const curriculumTreeSource = {
  originalChartUrl: "https://me.yonsei.ac.kr/me/faculty/schedule.do",
  originalPdfUrl: null as string | null,
  reviewNote: "원본 체계도 PDF 파일 또는 직접 URL은 프로젝트에 제공되지 않아, 인쇄용 버튼은 현재 페이지를 PDF로 저장하는 방식으로 제공함.",
};
