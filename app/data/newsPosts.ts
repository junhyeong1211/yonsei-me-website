export type NewsLocale = "ko" | "en";
export type NewsPostType = "notice" | "news" | "event" | "faculty-recruitment";
export type NewsPostStatus = "published" | "draft" | "archived";
export type NewsAudience = "undergraduate" | "graduate" | "all";

export type NewsAttachment = {
  name: string;
  url: string;
  size: string | null;
};

export type LocalizedOptionalText = {
  ko: string | null;
  en: string | null;
};

export type NewsPost = {
  id: string;
  slug: string;
  type: NewsPostType;
  category: string;
  titleKo: string;
  titleEn: string;
  summaryKo: string;
  summaryEn: string;
  contentKo: string[];
  contentEn: string[];
  publishedAt: string;
  updatedAt: string | null;
  author: LocalizedOptionalText | null;
  isPinned: boolean;
  audience: NewsAudience;
  tags: string[];
  attachments: NewsAttachment[];
  thumbnail: string | null;
  eventDate: string | null;
  eventEndDate: string | null;
  eventTime: string | null;
  location: LocalizedOptionalText | null;
  recruitmentField: LocalizedOptionalText | null;
  applicationPeriod: string | null;
  externalUrl: string | null;
  status: NewsPostStatus;
  isDemo: boolean;
};

export type NewsFilterDefinition = {
  value: string;
  labelKo: string;
  labelEn: string;
  audience?: NewsAudience;
  category?: string;
};

export type NewsTypeConfig = {
  type: NewsPostType;
  segment: string;
  eyebrow: string;
  titleKo: string;
  titleEn: string;
  descriptionKo: string;
  descriptionEn: string;
  filters: NewsFilterDefinition[];
};

const allFilter: NewsFilterDefinition = { value: "all", labelKo: "전체", labelEn: "All" };

export const newsTypeConfigs: Record<NewsPostType, NewsTypeConfig> = {
  notice: {
    type: "notice",
    segment: "notices",
    eyebrow: "NOTICES",
    titleKo: "공지사항",
    titleEn: "Notices",
    descriptionKo: "기계공학부의 학부·대학원 학사와 일반 안내를 확인할 수 있습니다.",
    descriptionEn: "Find undergraduate, graduate, academic, and general department notices.",
    filters: [
      allFilter,
      { value: "undergraduate", labelKo: "학부", labelEn: "Undergraduate", audience: "undergraduate" },
      { value: "graduate", labelKo: "대학원", labelEn: "Graduate", audience: "graduate" },
      { value: "academic", labelKo: "학사", labelEn: "Academic", category: "academic" },
      { value: "scholarship", labelKo: "장학", labelEn: "Scholarship", category: "scholarship" },
      { value: "general", labelKo: "일반", labelEn: "General", category: "general" },
    ],
  },
  news: {
    type: "news",
    segment: "department",
    eyebrow: "NEWS",
    titleKo: "뉴스",
    titleEn: "News",
    descriptionKo: "기계공학부의 교육·연구와 학생 활동 소식을 전합니다.",
    descriptionEn: "Read department education, research, and student activity updates.",
    filters: [
      allFilter,
      { value: "department", labelKo: "학부 소식", labelEn: "Department", category: "department" },
      { value: "research", labelKo: "연구 소식", labelEn: "Research", category: "research" },
      { value: "achievement", labelKo: "수상·성과", labelEn: "Awards & Achievements", category: "achievement" },
      { value: "student-activity", labelKo: "학생 활동", labelEn: "Student Activities", category: "student-activity" },
    ],
  },
  event: {
    type: "event",
    segment: "events",
    eyebrow: "SEMINARS & EVENTS",
    titleKo: "세미나·행사",
    titleEn: "Seminars & Events",
    descriptionKo: "기계공학부의 세미나와 학술·학부 행사를 안내합니다.",
    descriptionEn: "Find department seminars, academic events, and information sessions.",
    filters: [
      allFilter,
      { value: "seminar", labelKo: "세미나", labelEn: "Seminars", category: "seminar" },
      { value: "academic-event", labelKo: "학술행사", labelEn: "Academic Events", category: "academic-event" },
      { value: "department-event", labelKo: "학부행사", labelEn: "Department Events", category: "department-event" },
      { value: "briefing", labelKo: "설명회", labelEn: "Information Sessions", category: "briefing" },
    ],
  },
  "faculty-recruitment": {
    type: "faculty-recruitment",
    segment: "faculty-recruitment",
    eyebrow: "FACULTY RECRUITMENT",
    titleKo: "교수 초빙",
    titleEn: "Faculty Recruitment",
    descriptionKo: "기계공학부 교수 초빙 공고를 안내합니다.",
    descriptionEn: "Find faculty recruitment notices from the department.",
    filters: [allFilter],
  },
};

export const newsCategoryLabels: Record<string, { ko: string; en: string }> = {
  academic: { ko: "학사", en: "Academic" },
  scholarship: { ko: "장학", en: "Scholarship" },
  general: { ko: "일반", en: "General" },
  department: { ko: "학부 소식", en: "Department" },
  research: { ko: "연구 소식", en: "Research" },
  achievement: { ko: "수상·성과", en: "Awards & Achievements" },
  "student-activity": { ko: "학생 활동", en: "Student Activities" },
  seminar: { ko: "세미나", en: "Seminar" },
  "academic-event": { ko: "학술행사", en: "Academic Event" },
  "department-event": { ko: "학부행사", en: "Department Event" },
  briefing: { ko: "설명회", en: "Information Session" },
  "faculty-recruitment": { ko: "교수 초빙", en: "Faculty Recruitment" },
};

const sampleContentKo = "이 게시글은 공통 목록 및 상세 화면 확인을 위한 샘플입니다. 실제 게시 전 공식 내용으로 교체해야 합니다.";
const sampleContentEn = "This post is a sample for validating the shared list and detail layout. Replace it with verified official content before publication.";

export const newsPosts: NewsPost[] = [
  {
    id: "notice-undergraduate-sample",
    slug: "sample-undergraduate-notice",
    type: "notice",
    category: "academic",
    titleKo: "[샘플] 학부 공지사항 게시 예시",
    titleEn: "[Sample] Undergraduate notice example",
    summaryKo: "학부 대상 공지사항의 목록과 상세 구성을 확인하기 위한 샘플입니다.",
    summaryEn: "A sample used to validate undergraduate notice list and detail views.",
    contentKo: [sampleContentKo, "학사 일정과 제출 안내 등 실제 내용은 공식 공지가 제공된 뒤 입력합니다."],
    contentEn: [sampleContentEn, "Academic schedules and submission instructions will be added only after official content is provided."],
    publishedAt: "2026-07-10",
    updatedAt: null,
    author: null,
    isPinned: true,
    audience: "undergraduate",
    tags: ["학부", "학사", "샘플"],
    attachments: [],
    thumbnail: null,
    eventDate: null,
    eventEndDate: null,
    eventTime: null,
    location: null,
    recruitmentField: null,
    applicationPeriod: null,
    externalUrl: null,
    status: "published",
    isDemo: true,
  },
  {
    id: "notice-graduate-sample",
    slug: "sample-graduate-notice",
    type: "notice",
    category: "general",
    titleKo: "[샘플] 대학원 공지사항 게시 예시",
    titleEn: "[Sample] Graduate notice example",
    summaryKo: "대학원 대상 일반 공지의 표시 방식을 확인하기 위한 샘플입니다.",
    summaryEn: "A sample used to validate general notices for graduate students.",
    contentKo: [sampleContentKo, "대학원 관련 실제 일정과 제출 서류는 임의로 작성하지 않습니다."],
    contentEn: [sampleContentEn, "No graduate schedule or required document information is invented in this sample."],
    publishedAt: "2026-07-08",
    updatedAt: null,
    author: null,
    isPinned: false,
    audience: "graduate",
    tags: ["대학원", "일반", "샘플"],
    attachments: [],
    thumbnail: null,
    eventDate: null,
    eventEndDate: null,
    eventTime: null,
    location: null,
    recruitmentField: null,
    applicationPeriod: null,
    externalUrl: null,
    status: "published",
    isDemo: true,
  },
  {
    id: "notice-scholarship-sample",
    slug: "sample-scholarship-notice",
    type: "notice",
    category: "scholarship",
    titleKo: "[샘플] 장학금 공지 게시 예시",
    titleEn: "[Sample] Scholarship notice example",
    summaryKo: "장학금 검색과 분류 필터 동작을 확인하기 위한 샘플입니다.",
    summaryEn: "A sample used to validate scholarship search and filtering.",
    contentKo: [sampleContentKo, "실제 장학금 모집 일정, 선발 기준 및 지원 금액은 포함하지 않습니다."],
    contentEn: [sampleContentEn, "This sample includes no actual scholarship deadline, criteria, or award amount."],
    publishedAt: "2026-07-04",
    updatedAt: null,
    author: null,
    isPinned: false,
    audience: "all",
    tags: ["장학금", "장학", "샘플"],
    attachments: [],
    thumbnail: null,
    eventDate: null,
    eventEndDate: null,
    eventTime: null,
    location: null,
    recruitmentField: null,
    applicationPeriod: null,
    externalUrl: null,
    status: "published",
    isDemo: true,
  },
  {
    id: "news-department-sample",
    slug: "sample-department-news",
    type: "news",
    category: "department",
    titleKo: "[샘플] 학부 소식 게시 예시",
    titleEn: "[Sample] Department news example",
    summaryKo: "학부 소식 목록과 상세 화면 확인을 위한 샘플입니다.",
    summaryEn: "A sample used to validate department news list and detail views.",
    contentKo: [sampleContentKo, "실제 학부 소식이 제공되면 이 샘플을 교체합니다."],
    contentEn: [sampleContentEn, "Replace this sample when an official department story is provided."],
    publishedAt: "2026-07-09",
    updatedAt: null,
    author: null,
    isPinned: false,
    audience: "all",
    tags: ["학부 소식", "샘플"],
    attachments: [],
    thumbnail: null,
    eventDate: null,
    eventEndDate: null,
    eventTime: null,
    location: null,
    recruitmentField: null,
    applicationPeriod: null,
    externalUrl: null,
    status: "published",
    isDemo: true,
  },
  {
    id: "news-research-sample",
    slug: "sample-research-news",
    type: "news",
    category: "research",
    titleKo: "[샘플] 연구 소식 게시 예시",
    titleEn: "[Sample] Research news example",
    summaryKo: "연구 소식 분류와 검색 동작을 확인하기 위한 샘플입니다.",
    summaryEn: "A sample used to validate research news filtering and search.",
    contentKo: [sampleContentKo, "확인되지 않은 연구성과나 수상 내용은 포함하지 않습니다."],
    contentEn: [sampleContentEn, "No unverified research result or award is included."],
    publishedAt: "2026-07-02",
    updatedAt: null,
    author: null,
    isPinned: false,
    audience: "all",
    tags: ["연구 소식", "샘플"],
    attachments: [],
    thumbnail: null,
    eventDate: null,
    eventEndDate: null,
    eventTime: null,
    location: null,
    recruitmentField: null,
    applicationPeriod: null,
    externalUrl: null,
    status: "published",
    isDemo: true,
  },
  {
    id: "news-student-sample",
    slug: "sample-student-activity-news",
    type: "news",
    category: "student-activity",
    titleKo: "[샘플] 학생 활동 소식 게시 예시",
    titleEn: "[Sample] Student activity news example",
    summaryKo: "학생 활동 소식의 표시 방식을 확인하기 위한 샘플입니다.",
    summaryEn: "A sample used to validate student activity news presentation.",
    contentKo: [sampleContentKo, "실제 학생 활동 정보와 사진은 공식 자료가 제공된 뒤 등록합니다."],
    contentEn: [sampleContentEn, "Official student activity information and images will be added when provided."],
    publishedAt: "2026-06-25",
    updatedAt: null,
    author: null,
    isPinned: false,
    audience: "all",
    tags: ["학생 활동", "샘플"],
    attachments: [],
    thumbnail: null,
    eventDate: null,
    eventEndDate: null,
    eventTime: null,
    location: null,
    recruitmentField: null,
    applicationPeriod: null,
    externalUrl: null,
    status: "published",
    isDemo: true,
  },
  {
    id: "event-seminar-sample",
    slug: "sample-seminar-event",
    type: "event",
    category: "seminar",
    titleKo: "[샘플] 세미나 안내 게시 예시",
    titleEn: "[Sample] Seminar announcement example",
    summaryKo: "세미나의 행사일·시간·장소 표시를 확인하기 위한 샘플입니다.",
    summaryEn: "A sample used to validate seminar date, time, and location fields.",
    contentKo: [sampleContentKo, "표시된 일정과 장소는 UI 확인용이며 실제 세미나 정보가 아닙니다."],
    contentEn: [sampleContentEn, "The displayed schedule and location are for UI validation and are not an actual seminar notice."],
    publishedAt: "2026-07-07",
    updatedAt: null,
    author: null,
    isPinned: false,
    audience: "all",
    tags: ["세미나", "샘플"],
    attachments: [],
    thumbnail: null,
    eventDate: "2026-07-14",
    eventEndDate: null,
    eventTime: "11:00",
    location: { ko: "[샘플 장소]", en: "[Sample location]" },
    recruitmentField: null,
    applicationPeriod: null,
    externalUrl: null,
    status: "published",
    isDemo: true,
  },
  {
    id: "event-academic-sample",
    slug: "sample-academic-event",
    type: "event",
    category: "academic-event",
    titleKo: "[샘플] 학술행사 안내 게시 예시",
    titleEn: "[Sample] Academic event announcement example",
    summaryKo: "학술행사 분류와 상세 정보 구성을 확인하기 위한 샘플입니다.",
    summaryEn: "A sample used to validate academic event filtering and detail information.",
    contentKo: [sampleContentKo, "실제 행사명과 일정은 공식 정보가 제공된 뒤 입력합니다."],
    contentEn: [sampleContentEn, "The official event name and schedule will be added when provided."],
    publishedAt: "2026-06-30",
    updatedAt: null,
    author: null,
    isPinned: false,
    audience: "all",
    tags: ["학술행사", "샘플"],
    attachments: [],
    thumbnail: null,
    eventDate: null,
    eventEndDate: null,
    eventTime: null,
    location: null,
    recruitmentField: null,
    applicationPeriod: null,
    externalUrl: null,
    status: "published",
    isDemo: true,
  },
  {
    id: "faculty-recruitment-sample-01",
    slug: "sample-faculty-recruitment-notice",
    type: "faculty-recruitment",
    category: "faculty-recruitment",
    titleKo: "[샘플] 교수 초빙 공고 게시 예시",
    titleEn: "[Sample] Faculty recruitment notice example",
    summaryKo: "교수 초빙 목록과 상세 화면 구성을 확인하기 위한 샘플입니다.",
    summaryEn: "A sample used to validate faculty recruitment list and detail views.",
    contentKo: [sampleContentKo, "모집 분야, 지원 자격, 접수 기간과 제출 서류는 제공되지 않아 표시하지 않습니다."],
    contentEn: [sampleContentEn, "No recruitment field, eligibility requirement, application period, or required document is provided."],
    publishedAt: "2026-07-01",
    updatedAt: null,
    author: null,
    isPinned: false,
    audience: "all",
    tags: ["교수 초빙", "샘플"],
    attachments: [],
    thumbnail: null,
    eventDate: null,
    eventEndDate: null,
    eventTime: null,
    location: null,
    recruitmentField: null,
    applicationPeriod: null,
    externalUrl: null,
    status: "published",
    isDemo: true,
  },
  {
    id: "faculty-recruitment-sample-02",
    slug: "sample-faculty-recruitment-archive",
    type: "faculty-recruitment",
    category: "faculty-recruitment",
    titleKo: "[샘플] 교수 초빙 게시글 형식 예시",
    titleEn: "[Sample] Faculty recruitment post format example",
    summaryKo: "모집 분야와 접수 기간이 제공될 때의 정보 구조를 준비한 샘플입니다.",
    summaryEn: "A sample structure prepared for future recruitment field and application period data.",
    contentKo: [sampleContentKo, "현재는 공식 모집 내용이 없으므로 구체적인 조건을 생성하지 않습니다."],
    contentEn: [sampleContentEn, "No detailed condition is generated because no official recruitment content is available."],
    publishedAt: "2026-06-20",
    updatedAt: null,
    author: null,
    isPinned: false,
    audience: "all",
    tags: ["교수 초빙", "샘플"],
    attachments: [],
    thumbnail: null,
    eventDate: null,
    eventEndDate: null,
    eventTime: null,
    location: null,
    recruitmentField: null,
    applicationPeriod: null,
    externalUrl: null,
    status: "published",
    isDemo: true,
  },
];

const sortNewsPosts = (posts: NewsPost[]) => [...posts].sort((a, b) => {
  if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1;
  return b.publishedAt.localeCompare(a.publishedAt);
});

export const getPostsByType = (type: NewsPostType) =>
  sortNewsPosts(newsPosts.filter((post) => post.type === type && post.status === "published"));

export const getPostBySlug = (type: NewsPostType, slug: string) =>
  newsPosts.find((post) => post.type === type && post.slug === slug && post.status === "published");

export const getPostByAnySlug = (slug: string) =>
  newsPosts.find((post) => post.slug === slug && post.status === "published");

export const getNewsTypeFromSegment = (segment: string): NewsPostType | null =>
  (Object.values(newsTypeConfigs).find((config) => config.segment === segment)?.type ?? null);

export const getNewsTypePath = (type: NewsPostType) => `/news/${newsTypeConfigs[type].segment}`;

export const getNewsPostPath = (locale: NewsLocale, post: NewsPost) =>
  `/${locale}${getNewsTypePath(post.type)}/${post.slug}`;

export const getLocalizedPostTitle = (post: NewsPost, locale: NewsLocale) =>
  locale === "ko" ? post.titleKo : post.titleEn;

export const getLocalizedPostSummary = (post: NewsPost, locale: NewsLocale) =>
  locale === "ko" ? post.summaryKo : post.summaryEn;

export const getLocalizedPostContent = (post: NewsPost, locale: NewsLocale) =>
  locale === "ko" ? post.contentKo : post.contentEn;

export const getLocalizedOptionalText = (value: LocalizedOptionalText | null, locale: NewsLocale) =>
  value ? (locale === "ko" ? value.ko : value.en) ?? value.ko ?? value.en : null;

export const getNewsCategoryLabel = (category: string, locale: NewsLocale) =>
  newsCategoryLabels[category]?.[locale] ?? category;

export const matchesNewsFilter = (post: NewsPost, filter: NewsFilterDefinition | undefined) => {
  if (!filter || filter.value === "all") return true;
  if (filter.audience) return post.audience === filter.audience || post.audience === "all";
  if (filter.category) return post.category === filter.category;
  return true;
};

export const searchPosts = (posts: NewsPost[], query: string) => {
  const normalized = query.trim().toLocaleLowerCase();
  if (!normalized) return posts;
  return posts.filter((post) => [
    post.titleKo,
    post.titleEn,
    post.summaryKo,
    post.summaryEn,
    ...post.contentKo,
    ...post.contentEn,
    ...post.tags,
    post.category,
    newsCategoryLabels[post.category]?.ko,
    newsCategoryLabels[post.category]?.en,
  ].filter(Boolean).join(" ").toLocaleLowerCase().includes(normalized));
};

export const getPreviousAndNextPosts = (post: NewsPost) => {
  const posts = getPostsByType(post.type);
  const index = posts.findIndex((item) => item.id === post.id);
  return {
    previous: index >= 0 ? posts[index + 1] ?? null : null,
    next: index > 0 ? posts[index - 1] ?? null : null,
  };
};

export const isPostNew = (post: NewsPost, now = new Date()) => {
  const published = new Date(`${post.publishedAt}T00:00:00+09:00`);
  const age = now.getTime() - published.getTime();
  return age >= 0 && age <= 7 * 24 * 60 * 60 * 1000;
};

export const getSearchableNewsDocuments = (locale: NewsLocale) =>
  newsPosts.filter((post) => post.status === "published").map((post) => ({
    id: post.id,
    type: post.type,
    title: getLocalizedPostTitle(post, locale),
    body: getLocalizedPostContent(post, locale).join("\n"),
    summary: getLocalizedPostSummary(post, locale),
    tags: post.tags,
    date: post.publishedAt,
    path: getNewsPostPath(locale, post),
  }));
