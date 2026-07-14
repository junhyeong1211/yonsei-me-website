import type { LocaleText } from "./content";
import { departmentDirections } from "./directions";

export type AlumniPartnershipStatus = "ready" | "preparing";

export type AlumniNetworkItem = {
  id: string;
  title: LocaleText;
  description: LocaleText;
  path: string | null;
  status: AlumniPartnershipStatus;
};

export type PartnershipArea = {
  id: string;
  title: LocaleText;
  description: LocaleText;
};

export type PartnershipCase = {
  id: string;
  category: LocaleText;
  title: LocaleText;
  description: LocaleText;
  date: string;
  relatedNewsSlug: string | null;
  externalLink: string | null;
  status: AlumniPartnershipStatus;
};

export type AlumniPartnershipInquiry = {
  id: string;
  title: LocaleText;
  description: LocaleText;
  kind: "email" | "news";
  path: string | null;
};

export const alumniPartnerships = {
  title: { ko: "동문·대외협력", en: "Alumni & Partnerships" },
  description: {
    ko: "동문과 산업체, 연구기관 및 해외 대학을 연결하여 교육과 연구의 교류를 확대합니다.",
    en: "We connect alumni, industry, research institutes, and universities abroad to expand educational and research exchange.",
  },
  contactEmail: departmentDirections.email,
  network: [
    {
      id: "alumni-news",
      title: { ko: "동문 소식", en: "Alumni News" },
      description: { ko: "동문 관련 소식은 확인되는 대로 업데이트합니다.", en: "Verified alumni news will be added as it becomes available." },
      path: "/news?category=department",
      status: "preparing",
    },
    {
      id: "graduate-interviews",
      title: { ko: "졸업생 인터뷰", en: "Graduate Interviews" },
      description: { ko: "졸업생 인터뷰 콘텐츠를 준비하고 있습니다.", en: "Graduate interview content is being prepared." },
      path: null,
      status: "preparing",
    },
    {
      id: "career-mentoring",
      title: { ko: "진로·멘토링", en: "Career Mentoring" },
      description: { ko: "동문과 재학생을 잇는 진로·멘토링 정보를 준비하고 있습니다.", en: "Career mentoring information connecting alumni and students is being prepared." },
      path: null,
      status: "preparing",
    },
    {
      id: "alumni-events",
      title: { ko: "동문 행사", en: "Alumni Events" },
      description: { ko: "동문 행사 소식은 확인되는 대로 안내합니다.", en: "Verified alumni event information will be posted here." },
      path: "/events",
      status: "preparing",
    },
  ] satisfies AlumniNetworkItem[],
  partnershipAreas: [
    {
      id: "industry",
      title: { ko: "산학협력", en: "Industry Collaboration" },
      description: { ko: "기업과의 공동 연구, 기술 교류, 현장 교육", en: "Joint research, technology exchange, and field-based education with industry" },
    },
    {
      id: "international",
      title: { ko: "국제교류", en: "International Exchange" },
      description: { ko: "해외 대학과의 학생·연구 교류", en: "Student and research exchange with universities abroad" },
    },
    {
      id: "academic",
      title: { ko: "학술협력", en: "Academic Collaboration" },
      description: { ko: "연구기관 및 타 대학과의 공동 세미나와 연구", en: "Joint seminars and research with institutes and other universities" },
    },
  ] satisfies PartnershipArea[],
  cases: [
    {
      id: "japan-academic-industry-exchange-2026",
      category: { ko: "국제교류", en: "International Exchange" },
      title: {
        ko: "연세대학교 기계공학부, 일본 게이오대·도쿄대와 글로벌 학술 및 산업 교류 프로그램 개최",
        en: "Yonsei Mechanical Engineering Holds Global Academic and Industry Exchange Program with Keio and the University of Tokyo",
      },
      description: {
        ko: "학생과 연구진이 게이오대학교와 도쿄대학교를 방문하여 공동 세미나, 연구실 탐방, 산업체 견학을 진행하고 교환학생·공동학위·공동연구 추진 방안을 논의했습니다.",
        en: "Students and researchers visited Keio University and the University of Tokyo for joint seminars, laboratory visits, and industry tours, and discussed student exchange, joint degrees, and collaborative research.",
      },
      date: "2026.02.23 - 2026.02.27",
      relatedNewsSlug: null,
      externalLink: null,
      status: "ready",
    },
  ] satisfies PartnershipCase[],
  inquiries: [
    {
      id: "alumni-tip",
      title: { ko: "동문 소식 제보", en: "Share Alumni News" },
      description: { ko: "동문 소식과 활동을 학부에 알려주세요.", en: "Share alumni news and activities with the department." },
      kind: "email",
      path: null,
    },
    {
      id: "industry-inquiry",
      title: { ko: "산학협력 문의", en: "Industry Partnership Inquiry" },
      description: { ko: "공동 연구와 기술 교류에 관해 문의합니다.", en: "Contact the department about joint research and technology exchange." },
      kind: "email",
      path: null,
    },
    {
      id: "international-inquiry",
      title: { ko: "국제교류 문의", en: "International Exchange Inquiry" },
      description: { ko: "학생·연구 교류에 관해 문의합니다.", en: "Contact the department about student and research exchange." },
      kind: "email",
      path: null,
    },
    {
      id: "related-news",
      title: { ko: "관련 소식 보기", en: "View Related News" },
      description: { ko: "국제교류와 학부 소식을 확인합니다.", en: "Browse international exchange and department news." },
      kind: "news",
      path: "/news?category=international",
    },
  ] satisfies AlumniPartnershipInquiry[],
  searchKeywords: [
    "동문",
    "대외협력",
    "산학협력",
    "국제교류",
    "학술협력",
    "alumni",
    "partnerships",
    "industry collaboration",
    "international exchange",
  ],
};

