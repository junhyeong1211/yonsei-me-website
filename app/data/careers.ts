import type { LocaleText } from "./content";

export type CareerCategory = "company-recruitment" | "research-position" | "internship" | "career-event" | "other";
export type CareerStatus = "open" | "closed" | "information-pending";

export type CareerPost = {
  id: string;
  slug: string;
  type: "employment";
  category: CareerCategory;
  titleKo: string;
  titleEn: string;
  company: LocaleText | null;
  summaryKo: string;
  summaryEn: string;
  contentKo: string;
  contentEn: string;
  publishedAt: string;
  applicationDeadline: string | null;
  tags: LocaleText[];
  attachments: { id: string; name: LocaleText; url: string }[];
  externalUrl: string | null;
  isPinned: boolean;
  status: CareerStatus;
  isDemo: boolean;
};

export const careerCategoryLabels: Record<CareerCategory, LocaleText> = {
  "company-recruitment": { ko: "기업 채용", en: "Company recruitment" },
  "research-position": { ko: "연구원·연구직", en: "Research position" },
  internship: { ko: "인턴", en: "Internship" },
  "career-event": { ko: "취업 행사", en: "Career event" },
  other: { ko: "기타", en: "Other" },
};

export const careerPosts: CareerPost[] = [
  {
    id: "career-sample-01",
    slug: "sample-company-recruitment",
    type: "employment",
    category: "company-recruitment",
    titleKo: "[샘플] 기업 채용 공고 입력 예정",
    titleEn: "[Sample] Company recruitment notice pending",
    company: { ko: "[기관명 입력 예정]", en: "[Organization pending]" },
    summaryKo: "실제 기업 채용 공고가 등록되면 공고 제목, 기관명, 접수기한 및 첨부파일을 이 자리에 안내합니다.",
    summaryEn: "Verified recruitment details, deadlines, and attachments will be posted here when provided.",
    contentKo: "이 게시글은 취업 정보 게시판의 화면 구성을 확인하기 위한 샘플입니다. 실제 공고가 등록되기 전에는 지원 조건, 모집 인원, 접수 기한을 확정 정보로 안내하지 않습니다.",
    contentEn: "This is a sample post for reviewing the career board layout. Verified application requirements, openings, and deadlines will be added when supplied.",
    publishedAt: "2026-07-13",
    applicationDeadline: null,
    tags: [{ ko: "샘플", en: "Sample" }, { ko: "기업 채용", en: "Company recruitment" }],
    attachments: [],
    externalUrl: null,
    isPinned: true,
    status: "information-pending",
    isDemo: true,
  },
  {
    id: "career-sample-02",
    slug: "sample-research-position",
    type: "employment",
    category: "research-position",
    titleKo: "[샘플] 연구원·연구직 모집 안내 입력 예정",
    titleEn: "[Sample] Research position notice pending",
    company: { ko: "[기관명 입력 예정]", en: "[Organization pending]" },
    summaryKo: "연구기관 또는 기업의 공식 모집 안내가 제공되면 확인된 내용만 게시합니다.",
    summaryEn: "Only verified information from research institutions or companies will be posted here.",
    contentKo: "이 게시글은 연구원·연구직 공고 형식을 확인하기 위한 샘플입니다. 실제 공고가 제공되면 기관명, 지원 방법, 관련 자료를 검토 후 반영합니다.",
    contentEn: "This is a sample research position post. Verified organization, application method, and supporting materials will be added when provided.",
    publishedAt: "2026-07-12",
    applicationDeadline: null,
    tags: [{ ko: "샘플", en: "Sample" }, { ko: "연구직", en: "Research" }],
    attachments: [],
    externalUrl: null,
    isPinned: false,
    status: "information-pending",
    isDemo: true,
  },
  {
    id: "career-sample-03",
    slug: "sample-career-event",
    type: "employment",
    category: "career-event",
    titleKo: "[샘플] 취업·진로 행사 안내 입력 예정",
    titleEn: "[Sample] Career event notice pending",
    company: { ko: "[주관 기관 입력 예정]", en: "[Organizer pending]" },
    summaryKo: "취업 상담, 멘토링 또는 진로 행사의 공식 안내가 제공되면 확인된 내용만 게시합니다.",
    summaryEn: "Verified guidance for career counselling, mentoring, or events will be posted here.",
    contentKo: "이 게시글은 취업 행사 안내 형식을 확인하기 위한 샘플입니다. 실제 일정과 참여 방법은 공식 안내가 제공된 후 업데이트합니다.",
    contentEn: "This is a sample career event post. The official schedule and participation guidance will be updated when available.",
    publishedAt: "2026-07-11",
    applicationDeadline: null,
    tags: [{ ko: "샘플", en: "Sample" }, { ko: "취업 행사", en: "Career event" }],
    attachments: [],
    externalUrl: null,
    isPinned: false,
    status: "information-pending",
    isDemo: true,
  },
];

export const getCareerPostBySlug = (slug: string) => careerPosts.find((post) => post.slug === slug);
