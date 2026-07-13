import type { LocaleText } from "./content";

export const graduateAdmissionUrl = "https://graduate.yonsei.ac.kr/graduate/index.do#n";
export const undergraduateAdmissionUrl = "https://admission.yonsei.ac.kr/seoul/admission/html/main/main.asp";

type AdmissionType = {
  id: "early" | "regular";
  title: LocaleText;
  description: LocaleText;
  linkLabel: LocaleText;
};

type AdmissionRelatedLink = {
  id: string;
  title: LocaleText;
  description: LocaleText;
  path: string;
};

export const undergraduateAdmission = {
  pageTitle: { ko: "학부 입학", en: "Undergraduate Admission" },
  description: {
    ko: "연세대학교 기계공학부 지원을 준비하는 학생을 위해 입학전형 확인 방법과 학부 교육·연구 정보를 안내합니다.",
    en: "Find admission guidance and an introduction to the department's undergraduate education and research.",
  },
  officialAdmissionUrl: undergraduateAdmissionUrl,
  admissionNotice: {
    ko: "입학전형의 모집인원, 평가방법, 제출서류 및 일정은 학년도별로 변경될 수 있습니다. 지원 전 연세대학교 입학처의 해당 연도 모집요강을 반드시 확인해 주세요.",
    en: "The number of places, evaluation methods, required documents, and schedule may change each academic year. Please review the official admission guide for the relevant year before applying.",
  },
  admissionTypes: [
    {
      id: "early",
      title: { ko: "수시모집", en: "Early Admission" },
      description: {
        ko: "학생부교과, 학생부종합, 논술 등 전형별 지원방법과 평가요소는 해당 학년도 수시모집 요강에서 확인해야 합니다.",
        en: "Application methods and evaluation criteria for each early-admission track must be confirmed in the official guide for the relevant year.",
      },
      linkLabel: { ko: "수시모집 요강 확인", en: "View early admission guide" },
    },
    {
      id: "regular",
      title: { ko: "정시모집", en: "Regular Admission" },
      description: {
        ko: "수능 반영영역, 과목 선택 조건, 모집군과 선발방법은 해당 학년도 정시모집 요강에서 확인해야 합니다.",
        en: "CSAT subject requirements, selection groups, and selection methods must be confirmed in the official guide for the relevant year.",
      },
      linkLabel: { ko: "정시모집 요강 확인", en: "View regular admission guide" },
    },
  ] satisfies AdmissionType[],
  applicationSteps: [
    { number: "01", text: { ko: "모집요강 확인", en: "Review the admission guide" } },
    { number: "02", text: { ko: "지원 자격과 제출서류 확인", en: "Confirm eligibility and required documents" } },
    { number: "03", text: { ko: "원서접수 및 전형 참여", en: "Submit the application and take part in the process" } },
    { number: "04", text: { ko: "합격자 발표와 등록 안내 확인", en: "Check results and registration guidance" } },
  ],
  relatedLinks: [
    {
      id: "about",
      title: { ko: "학부 소개·비전", en: "About & Vision" },
      description: { ko: "기계공학부의 설립 목적과 교육목표를 확인할 수 있습니다.", en: "Learn about the department's purpose and educational objectives." },
      path: "/about",
    },
    {
      id: "curriculum",
      title: { ko: "학부 교육과정", en: "Undergraduate Curriculum" },
      description: { ko: "기계공학의 기초 이론부터 실험·설계·연구까지 학년별 교육과정을 확인할 수 있습니다.", en: "Review the curriculum from fundamental theory to experimentation, design, and research." },
      path: "/academics/undergraduate",
    },
    {
      id: "research",
      title: { ko: "주요 연구 분야", en: "Research Areas" },
      description: { ko: "역학·소재, 에너지·열유체, 로보틱스·제어 등 기계공학부의 주요 연구 분야를 살펴볼 수 있습니다.", en: "Explore major research areas including mechanics, energy, robotics, and control." },
      path: "/research/fields",
    },
    {
      id: "faculty-labs",
      title: { ko: "교수진·연구실", en: "Faculty & Laboratories" },
      description: { ko: "관심 있는 연구 분야와 관련된 교수진 및 연구실 정보를 확인할 수 있습니다.", en: "Find faculty and laboratories connected to your research interests." },
      path: "/faculty",
    },
    {
      id: "labs",
      title: { ko: "연구실", en: "Laboratories" },
      description: { ko: "기계공학부의 연구실과 지도교수 정보를 찾아볼 수 있습니다.", en: "Browse laboratories and their faculty advisors." },
      path: "/labs",
    },
    {
      id: "scholarships",
      title: { ko: "장학 안내", en: "Scholarships" },
      description: { ko: "교내·교외 및 기계공학부 기금장학금 정보를 확인할 수 있습니다.", en: "Review university, external, and department scholarship information." },
      path: "/academics/scholarships",
    },
  ] satisfies AdmissionRelatedLink[],
  faq: [
    {
      question: { ko: "정확한 모집인원과 전형일정은 어디서 확인하나요?", en: "Where can I confirm the exact number of places and admission schedule?" },
      answer: { ko: "연세대학교 입학처에서 해당 학년도의 수시·정시 모집요강을 확인해야 합니다.", en: "Please review the early and regular admission guides for the relevant year on the Yonsei University Admissions website." },
    },
    {
      question: { ko: "기계공학부에서 어떤 과목을 배우나요?", en: "What subjects do mechanical engineering students study?" },
      answer: { ko: "학부 교육과정과 교과목 안내 페이지에서 기초공학, 역학, 열유체, 설계, 제어 및 연구 관련 교과목을 확인할 수 있습니다.", en: "The undergraduate curriculum and course pages introduce courses in engineering fundamentals, mechanics, thermal fluids, design, control, and research." },
    },
    {
      question: { ko: "연구 분야와 연구실을 미리 볼 수 있나요?", en: "Can I explore research areas and laboratories in advance?" },
      answer: { ko: "연구 분야, 교수진 및 연구실 페이지에서 확인할 수 있습니다.", en: "Yes. Please visit the research areas, faculty, and laboratories pages." },
    },
    {
      question: { ko: "장학금 정보는 어디서 확인하나요?", en: "Where can I find scholarship information?" },
      answer: { ko: "교육·학사의 장학 안내 페이지에서 교내·교외·기계공학부 기금장학금을 확인할 수 있습니다.", en: "The scholarship page under Academics provides university, external, and department scholarship information." },
    },
  ],
  referenceYear: null,
  verificationStatus: "needs-review" as const,
  reviewNote: "정시 수능 반영 비율, 필수 선택과목, 논술전형 수능최저, 특정 전형명·평가 비율·모집인원은 해당 학년도의 연세대학교 입학처 공식 모집요강 확인 후 업데이트가 필요합니다.",
};
