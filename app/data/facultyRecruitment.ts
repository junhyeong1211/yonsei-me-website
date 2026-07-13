import type { LocaleText } from "./content";

type RecruitmentArea = {
  title: LocaleText;
  subareas?: LocaleText[];
};

export const facultyRecruitment = {
  title: { ko: "교수 초빙", en: "Faculty Recruitment" },
  description: {
    ko: "연세대학교 기계공학부와 함께 교육과 연구의 미래를 이끌 우수한 연구자를 기다립니다.",
    en: "The Department of Mechanical Engineering at Yonsei University welcomes outstanding researchers to help shape the future of education and research.",
  },
  overview: [
    {
      ko: "연세대학교 기계공학부는 향후 여러 기계공학 분야에서 전임교원을 지속적으로 확충할 계획입니다.",
      en: "The department plans to continue expanding its tenure-track faculty across a range of mechanical engineering fields.",
    },
    {
      ko: "우수한 연구 및 교육 역량을 갖춘 연구자를 모집합니다.",
      en: "We seek researchers with outstanding strengths in both research and education.",
    },
    {
      ko: "기계공학 또는 관련 분야 박사학위 소지자를 대상으로 합니다.",
      en: "Applicants should hold a Ph.D. in mechanical engineering or a related field.",
    },
    {
      ko: "학제 간 연구와 새로운 관점을 가진 지원자를 환영합니다.",
      en: "We welcome applicants with interdisciplinary research experience and new perspectives.",
    },
  ] satisfies LocaleText[],
  areas: [
    { title: { ko: "역학·소재", en: "Mechanics & Materials" } },
    { title: { ko: "열·유체 시스템", en: "Thermal / Fluid Systems" } },
    { title: { ko: "동적 시스템·제어", en: "Dynamic Systems & Control" } },
    { title: { ko: "제조·설계", en: "Manufacturing & Design" } },
    {
      title: { ko: "신규·융합 분야", en: "Emerging Areas" },
      subareas: [
        { ko: "바이오", en: "Bio" },
        { ko: "의료", en: "Medical" },
        { ko: "나노", en: "Nano" },
        { ko: "마이크로", en: "Micro" },
        { ko: "광학 기술", en: "Optical Technology" },
      ],
    },
  ] satisfies RecruitmentArea[],
  scopeNote: {
    ko: "위 분야에 한정되지 않으며, 기계공학과 관련된 다양한 분야의 지원자를 환영합니다.",
    en: "The search is not limited to the areas above, and applicants from a wide range of mechanical engineering-related fields are welcome.",
  },
  application: {
    instruction: {
      ko: "이력서 또는 CV를 PDF 형식으로 제출해 주세요.",
      en: "Please submit a résumé or CV in PDF format.",
    },
    buttonLabel: { ko: "교수 지원하기", en: "Apply for Faculty Position" },
    url: "https://sites.google.com/yonsei.ac.kr/me-faculty-application?usp=sharing",
  },
  contact: {
    committee: "Faculty Search Committee",
    email: "mech@yonsei.ac.kr",
  },
  searchKeywords: [
    "교수 초빙",
    "교수 채용",
    "Faculty Recruitment",
    "Faculty Application",
    "tenure-track",
    "mech@yonsei.ac.kr",
  ],
  reviewNote: "영문 문구는 제공된 모집 안내를 바탕으로 정리했으며, 모집 조건과 일정은 공식 안내를 우선합니다.",
} as const;
