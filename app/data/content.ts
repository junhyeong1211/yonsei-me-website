import { getNewsCategoryLabel, getPostsByType } from "./newsPosts";

export type Locale = "ko" | "en";

export type LocaleText = {
  ko: string;
  en: string;
};

export type Faculty = {
  id: string;
  slug: string;
  name: LocaleText;
  position: LocaleText;
  researchAreaIds: string[];
  researchKeywords: { ko: string[]; en: string[] };
  labId?: string;
  email?: string;
  phone?: string;
  office?: LocaleText;
  profileImage?: string;
  externalProfileUrl?: string;
  order: number;
  isActive: boolean;
};

export type ResearchArea = {
  id: string;
  slug: string;
  number: string;
  name: LocaleText;
  shortDescription: LocaleText;
  description: LocaleText;
  keywords: { ko: string[]; en: string[] };
  image?: string;
  order: number;
};

export type Lab = {
  id: string;
  slug: string;
  name: LocaleText;
  professorIds: string[];
  researchAreaIds: string[];
  description: LocaleText;
  websiteUrl?: string;
  location?: LocaleText;
  phone?: string;
};

export type Course = {
  id: string;
  slug: string;
  code: string;
  name: LocaleText;
  program: "undergraduate" | "graduate";
  year?: number;
  semester: "spring" | "fall" | "both";
  category: "required" | "elective";
  credits: number;
  description: LocaleText;
  researchAreaIds: string[];
  prerequisiteIds?: string[];
  isActive: boolean;
};

export type Notice = {
  id: string;
  slug: string;
  title: LocaleText;
  body: LocaleText;
  audience: "undergraduate" | "graduate" | "all";
  category: string;
  publishedAt: string;
  isImportant: boolean;
  attachments?: { id: string; name: LocaleText; url: string }[];
};

export type Event = {
  id: string;
  slug: string;
  title: LocaleText;
  startDate: string;
  time?: LocaleText;
  endDate?: string;
  location?: LocaleText;
  category: string;
};

export const researchAreas: ResearchArea[] = [
  {
    id: "solid-materials",
    slug: "solid-materials",
    number: "01",
    name: { ko: "고체역학 및 재료", en: "Solid Mechanics & Materials" },
    shortDescription: {
      ko: "구조의 거동과 첨단 재료의 신뢰성을 탐구합니다.",
      en: "Exploring structural behavior and the reliability of advanced materials.",
    },
    description: {
      ko: "재료의 변형과 파괴, 구조 건전성, 다기능 소재를 다루는 연구분야입니다. 현재 내용은 화면 구성을 위한 샘플이며 공식 연구분야 설명으로 교체해야 합니다.",
      en: "This sample area covers deformation, fracture, structural integrity, and multifunctional materials. Replace it with verified department content.",
    },
    keywords: { ko: ["구조", "재료", "피로"], en: ["Structures", "Materials", "Fatigue"] },
    order: 1,
  },
  {
    id: "thermo-fluids",
    slug: "thermo-fluids",
    number: "02",
    name: { ko: "열유체공학", en: "Thermal & Fluid Engineering" },
    shortDescription: {
      ko: "열과 유동의 원리를 에너지 변환 시스템에 적용합니다.",
      en: "Applying heat and flow principles to energy conversion systems.",
    },
    description: {
      ko: "열전달, 유체역학, 연소와 에너지 시스템을 연결하는 연구분야입니다. 공식 설명 입력이 필요합니다.",
      en: "A sample research area connecting heat transfer, fluid mechanics, combustion, and energy systems.",
    },
    keywords: { ko: ["열전달", "유동", "연소"], en: ["Heat Transfer", "Flow", "Combustion"] },
    order: 2,
  },
  {
    id: "dynamics-control",
    slug: "dynamics-control",
    number: "03",
    name: { ko: "동역학 및 제어", en: "Dynamics & Control" },
    shortDescription: {
      ko: "복잡한 기계 시스템의 움직임을 해석하고 제어합니다.",
      en: "Analyzing and controlling the motion of complex mechanical systems.",
    },
    description: {
      ko: "진동, 시스템 동역학, 정밀 제어와 자율 시스템을 다루는 샘플 연구분야입니다.",
      en: "A sample area spanning vibration, system dynamics, precision control, and autonomous systems.",
    },
    keywords: { ko: ["진동", "제어", "자율시스템"], en: ["Vibration", "Control", "Autonomy"] },
    order: 3,
  },
  {
    id: "robotics",
    slug: "robotics",
    number: "04",
    name: { ko: "로보틱스", en: "Robotics" },
    shortDescription: {
      ko: "사람과 환경을 이해하는 지능형 기계 시스템을 연구합니다.",
      en: "Developing intelligent machines that understand people and environments.",
    },
    description: {
      ko: "로봇 설계, 지능 제어, 센싱과 인간-로봇 상호작용을 연결하는 샘플 연구분야입니다.",
      en: "A sample area connecting robot design, intelligent control, sensing, and human-robot interaction.",
    },
    keywords: { ko: ["로봇", "센싱", "지능제어"], en: ["Robots", "Sensing", "Intelligent Control"] },
    order: 4,
  },
  {
    id: "micro-nano",
    slug: "micro-nano",
    number: "05",
    name: { ko: "마이크로·나노공학", en: "Micro & Nano Engineering" },
    shortDescription: {
      ko: "미세 스케일의 현상을 새로운 장치와 공정으로 확장합니다.",
      en: "Turning microscale phenomena into new devices and processes.",
    },
    description: {
      ko: "마이크로·나노 구조, 정밀 제조, 센서와 바이오 응용을 다루는 샘플 연구분야입니다.",
      en: "A sample area covering micro/nano structures, precision fabrication, sensors, and bio applications.",
    },
    keywords: { ko: ["미세가공", "센서", "나노소재"], en: ["Microfabrication", "Sensors", "Nanomaterials"] },
    order: 5,
  },
  {
    id: "energy-systems",
    slug: "energy-systems",
    number: "06",
    name: { ko: "에너지 시스템", en: "Energy Systems" },
    shortDescription: {
      ko: "지속가능한 에너지 생산과 저장, 활용 기술을 탐구합니다.",
      en: "Advancing sustainable energy generation, storage, and use.",
    },
    description: {
      ko: "친환경 에너지 변환, 저장, 열관리와 시스템 최적화를 다루는 샘플 연구분야입니다.",
      en: "A sample area focused on clean conversion, storage, thermal management, and optimization.",
    },
    keywords: { ko: ["에너지", "저장", "열관리"], en: ["Energy", "Storage", "Thermal Management"] },
    order: 6,
  },
];

export const faculty: Faculty[] = [
  {
    id: "faculty-01",
    slug: "faculty-01",
    name: { ko: "[교수명 01 입력 예정]", en: "[Faculty name 01]" },
    position: { ko: "교수", en: "Professor" },
    researchAreaIds: ["solid-materials", "micro-nano"],
    researchKeywords: { ko: ["구조 건전성", "첨단 재료"], en: ["Structural integrity", "Advanced materials"] },
    labId: "smart-structures-lab",
    email: "[공식 이메일 확인 필요]",
    office: { ko: "[연구실 위치 확인 필요]", en: "[Office location required]" },
    order: 1,
    isActive: true,
  },
  {
    id: "faculty-02",
    slug: "faculty-02",
    name: { ko: "[교수명 02 입력 예정]", en: "[Faculty name 02]" },
    position: { ko: "교수", en: "Professor" },
    researchAreaIds: ["thermo-fluids", "energy-systems"],
    researchKeywords: { ko: ["열전달", "에너지 변환"], en: ["Heat transfer", "Energy conversion"] },
    labId: "thermal-energy-lab",
    email: "[공식 이메일 확인 필요]",
    office: { ko: "[연구실 위치 확인 필요]", en: "[Office location required]" },
    order: 2,
    isActive: true,
  },
  {
    id: "faculty-03",
    slug: "faculty-03",
    name: { ko: "[교수명 03 입력 예정]", en: "[Faculty name 03]" },
    position: { ko: "부교수", en: "Associate Professor" },
    researchAreaIds: ["dynamics-control"],
    researchKeywords: { ko: ["진동", "정밀 제어"], en: ["Vibration", "Precision control"] },
    labId: "dynamics-control-lab",
    email: "[공식 이메일 확인 필요]",
    office: { ko: "[연구실 위치 확인 필요]", en: "[Office location required]" },
    order: 3,
    isActive: true,
  },
  {
    id: "faculty-04",
    slug: "faculty-04",
    name: { ko: "[교수명 04 입력 예정]", en: "[Faculty name 04]" },
    position: { ko: "부교수", en: "Associate Professor" },
    researchAreaIds: ["robotics", "dynamics-control"],
    researchKeywords: { ko: ["로보틱스", "지능 제어"], en: ["Robotics", "Intelligent control"] },
    labId: "intelligent-robotics-lab",
    email: "[공식 이메일 확인 필요]",
    office: { ko: "[연구실 위치 확인 필요]", en: "[Office location required]" },
    order: 4,
    isActive: true,
  },
  {
    id: "faculty-05",
    slug: "faculty-05",
    name: { ko: "[교수명 05 입력 예정]", en: "[Faculty name 05]" },
    position: { ko: "조교수", en: "Assistant Professor" },
    researchAreaIds: ["micro-nano"],
    researchKeywords: { ko: ["미세가공", "바이오 센서"], en: ["Microfabrication", "Biosensors"] },
    labId: "micro-device-lab",
    email: "[공식 이메일 확인 필요]",
    office: { ko: "[연구실 위치 확인 필요]", en: "[Office location required]" },
    order: 5,
    isActive: true,
  },
  {
    id: "faculty-06",
    slug: "faculty-06",
    name: { ko: "[교수명 06 입력 예정]", en: "[Faculty name 06]" },
    position: { ko: "조교수", en: "Assistant Professor" },
    researchAreaIds: ["energy-systems", "thermo-fluids"],
    researchKeywords: { ko: ["에너지 저장", "열관리"], en: ["Energy storage", "Thermal management"] },
    labId: "sustainable-energy-lab",
    email: "[공식 이메일 확인 필요]",
    office: { ko: "[연구실 위치 확인 필요]", en: "[Office location required]" },
    order: 6,
    isActive: true,
  },
];

export const labs: Lab[] = [
  ["smart-structures-lab", "스마트 구조 연구실", "Smart Structures Lab", "faculty-01", "solid-materials"],
  ["thermal-energy-lab", "열에너지 연구실", "Thermal Energy Lab", "faculty-02", "thermo-fluids"],
  ["dynamics-control-lab", "동역학 및 제어 연구실", "Dynamics & Control Lab", "faculty-03", "dynamics-control"],
  ["intelligent-robotics-lab", "지능로봇 연구실", "Intelligent Robotics Lab", "faculty-04", "robotics"],
  ["micro-device-lab", "마이크로 디바이스 연구실", "Micro Device Lab", "faculty-05", "micro-nano"],
  ["sustainable-energy-lab", "지속가능 에너지 연구실", "Sustainable Energy Lab", "faculty-06", "energy-systems"],
].map(([slug, ko, en, professorId, areaId]) => ({
  id: slug,
  slug,
  name: { ko, en },
  professorIds: [professorId],
  researchAreaIds: [areaId],
  description: {
    ko: "연구실 소개와 주요 프로젝트를 입력할 예정입니다. 현재 데이터는 화면 구성을 위한 샘플입니다.",
    en: "Lab overview and projects will be added. This is sample content for layout review.",
  },
  location: { ko: "[연구실 위치 확인 필요]", en: "[Location required]" },
}));

export const courses: Course[] = [
  ["me-u-01", "MEU0001", "기계공학 기초", "Fundamentals of Mechanical Engineering", "undergraduate", 1, "spring", "required", 3, ["solid-materials"]],
  ["me-u-02", "MEU0002", "열유체 기초", "Fundamentals of Thermo-Fluids", "undergraduate", 2, "fall", "required", 3, ["thermo-fluids"]],
  ["me-u-03", "MEU0003", "시스템 동역학", "System Dynamics", "undergraduate", 3, "spring", "elective", 3, ["dynamics-control"]],
  ["me-u-04", "MEU0004", "로봇공학 개론", "Introduction to Robotics", "undergraduate", 4, "fall", "elective", 3, ["robotics"]],
  ["me-g-01", "MEG0001", "고급 재료역학", "Advanced Mechanics of Materials", "graduate", undefined, "spring", "elective", 3, ["solid-materials"]],
  ["me-g-02", "MEG0002", "고급 열전달", "Advanced Heat Transfer", "graduate", undefined, "fall", "elective", 3, ["thermo-fluids", "energy-systems"]],
  ["me-g-03", "MEG0003", "지능형 로봇 시스템", "Intelligent Robotic Systems", "graduate", undefined, "spring", "elective", 3, ["robotics", "dynamics-control"]],
  ["me-g-04", "MEG0004", "마이크로 시스템 설계", "Micro System Design", "graduate", undefined, "both", "elective", 3, ["micro-nano"]],
].map(([id, code, ko, en, program, year, semester, category, credits, researchAreaIds]) => ({
  id: id as string,
  slug: id as string,
  code: code as string,
  name: { ko: ko as string, en: en as string },
  program: program as Course["program"],
  year: year as number | undefined,
  semester: semester as Course["semester"],
  category: category as Course["category"],
  credits: credits as number,
  description: {
    ko: "[교과목 설명 입력 예정] 현재 정보는 검색 및 필터 동작을 보여주기 위한 샘플입니다.",
    en: "[Course description required] This sample demonstrates search and filtering.",
  },
  researchAreaIds: researchAreaIds as string[],
  isActive: true,
}));

export const notices: Notice[] = getPostsByType("notice").map((post) => ({
  id: post.id,
  slug: post.slug,
  title: { ko: post.titleKo, en: post.titleEn },
  body: { ko: post.contentKo.join("\n"), en: post.contentEn.join("\n") },
  audience: post.audience,
  category: getNewsCategoryLabel(post.category, "ko"),
  publishedAt: post.publishedAt,
  isImportant: post.isPinned,
  attachments: post.attachments.map((attachment, index) => ({
    id: `${post.id}-attachment-${index + 1}`,
    name: { ko: attachment.name, en: attachment.name },
    url: attachment.url,
  })),
}));

export const events: Event[] = getPostsByType("event").map((post) => ({
  id: post.id,
  slug: post.slug,
  title: { ko: post.titleKo, en: post.titleEn },
  startDate: post.eventDate ?? post.publishedAt,
  time: post.eventTime ? { ko: post.eventTime, en: post.eventTime } : undefined,
  endDate: post.eventEndDate ?? undefined,
  location: post.location?.ko || post.location?.en ? { ko: post.location.ko ?? post.location.en ?? "", en: post.location.en ?? post.location.ko ?? "" } : undefined,
  category: getNewsCategoryLabel(post.category, "ko"),
}));

export const instagramPosts = [
  {
    id: "ig-01",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=900&q=82",
    caption: { ko: "[연구실 소식 입력 예정]", en: "[Lab story coming soon]" },
    publishedAt: "2026.07",
  },
  {
    id: "ig-02",
    image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=900&q=82",
    caption: { ko: "[학생 활동 소식 입력 예정]", en: "[Student story coming soon]" },
    publishedAt: "2026.06",
  },
  {
    id: "ig-03",
    image: "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?auto=format&fit=crop&w=900&q=82",
    caption: { ko: "[학부 행사 소식 입력 예정]", en: "[Department event coming soon]" },
    publishedAt: "2026.06",
  },
];

export const heroSlides = [
  {
    id: "campus",
    image: "/images/hero-campus.png",
    alt: { ko: "연세대학교 공학원 건물", en: "Yonsei University Engineering Hall" },
  },
  {
    id: "lab",
    image: "/images/hero-lab.png",
    alt: { ko: "정밀 기계 실험실", en: "Precision mechanical engineering laboratory" },
  },
  {
    id: "equipment",
    image: "/images/hero-equipment.png",
    alt: { ko: "기계공학 연구 장비", en: "Mechanical engineering research equipment" },
  },
] as const;

export const heroImage = heroSlides[0].image;

export const relatedSites = [
  { label: { ko: "연세대학교", en: "Yonsei University" }, url: "https://www.yonsei.ac.kr/sc/index.do" },
  { label: { ko: "연세대학교 공과대학", en: "Yonsei College of Engineering" }, url: "https://engineering.yonsei.ac.kr/engineering/index.do" },
  { label: { ko: "BK21 교육연구단", en: "BK21 Education and Research Group" }, url: "https://me.yonsei.ac.kr/me/bk21/vision_1.do" },
  { label: { ko: "연세대학교 심리상담센터", en: "Yonsei Counseling Center" }, url: "https://counsel.yonsei.ac.kr/ysclinic/index.do" },
  { label: { ko: "연세대학교 ABC", en: "Yonsei ABC" }, url: "https://yabc.yonsei.ac.kr/sinchon/index.php" },
  { label: { ko: "연세대학교 학술정보원", en: "Yonsei University Library" }, url: "https://library.yonsei.ac.kr/local/html/education" },
  { label: { ko: "Y-DEC", en: "Y-DEC" }, url: "https://ydec.yonsei.ac.kr/ydec/index.do" },
  { label: { ko: "커리어 연세", en: "Career Yonsei" }, url: "https://career.yonsei.ac.kr/nonIndex.do" },
  { label: { ko: "LEARN US", en: "LEARN US" }, url: "https://www.learnus.org/" },
] as const;
