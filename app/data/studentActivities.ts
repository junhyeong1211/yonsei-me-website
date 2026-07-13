import type { LocaleText } from "./content";

export type StudentActivityLink = {
  id: string;
  label: LocaleText;
  url: string;
  kind: "external" | "email";
};

export type StudentActivity = {
  id: string;
  slug: string;
  name: LocaleText;
  category: LocaleText;
  shortDescription: LocaleText;
  description: LocaleText;
  teams: LocaleText[];
  projects: LocaleText[];
  achievements: LocaleText[];
  keywords: LocaleText[];
  links: StudentActivityLink[];
  image: {
    src: string;
    alt: LocaleText;
  };
  order: number;
  reviewNote: string;
};

export const studentActivities: StudentActivity[] = [
  {
    id: "yonsei-drone",
    slug: "yonsei-drone",
    name: { ko: "연세드론", en: "Yonsei Drone" },
    category: { ko: "무인비행체 설계·제작", en: "Unmanned aerial vehicle design and development" },
    shortDescription: {
      ko: "지능비행 알고리즘과 기체 설계·제작을 중심으로 무인비행체 프로젝트를 진행합니다.",
      en: "The club develops unmanned aerial vehicle projects around intelligent flight algorithms and airframe design.",
    },
    description: {
      ko: "연세드론은 연세대학교 무인비행체 동아리로, 소프트웨어 기반의 지능비행 알고리즘과 하드웨어 기체 설계·제작을 함께 다룹니다.",
      en: "Yonsei Drone is Yonsei University's unmanned aerial vehicle club, working across software-based intelligent flight algorithms and airframe design and development.",
    },
    teams: [
      { ko: "SW 지능비행 알고리즘 개발", en: "Software: intelligent flight algorithm development" },
      { ko: "HW 기체 설계 및 제작", en: "Hardware: airframe design and development" },
    ],
    projects: [
      { ko: "무인비행체 플랫폼 개발", en: "Unmanned aerial vehicle platform development" },
      { ko: "자율 비행을 위한 인지·경로 계획·제어 알고리즘 개발", en: "Perception, path-planning, and control algorithm development for autonomous flight" },
    ],
    achievements: [
      { ko: "제공 이미지에 2023~2025년 대회·수상 활동이 정리되어 있습니다.", en: "The supplied material presents competition and award activities from 2023 to 2025." },
    ],
    keywords: [
      { ko: "무인비행체", en: "UAV" },
      { ko: "지능비행", en: "Intelligent flight" },
      { ko: "기체 설계", en: "Airframe design" },
    ],
    links: [
      { id: "instagram", label: { ko: "Instagram @yonsei_drone", en: "Instagram @yonsei_drone" }, url: "https://www.instagram.com/yonsei_drone/", kind: "external" },
      { id: "website", label: { ko: "연세드론 웹사이트", en: "Yonsei Drone website" }, url: "https://yonseidron.com", kind: "external" },
    ],
    image: { src: "/images/clubs/yonsei-drone.png", alt: { ko: "연세드론 활동 소개 이미지", en: "Yonsei Drone activity introduction" } },
    order: 1,
    reviewNote: "영문 문구는 제공된 자료를 바탕으로 한 공식 검수 전 번역입니다.",
  },
  {
    id: "mecar",
    slug: "mecar",
    name: { ko: "MECar", en: "MECar" },
    category: { ko: "학생 자작자동차", en: "Student-built vehicle engineering" },
    shortDescription: {
      ko: "차량 설계부터 부품 조달, 연구와 제조까지 전 과정을 직접 수행하는 학생 자작자동차 팀입니다.",
      en: "A student team that carries out the full process of building a vehicle, from design and parts procurement to research and manufacturing.",
    },
    description: {
      ko: "MECar는 연세대학교 공과대학 소속 학생 주도 조직으로, 차량을 처음부터 제작하는 과정에서 구조 해석 기반의 설계와 제조 활동을 진행합니다.",
      en: "MECar is a student-led organization affiliated with Yonsei University's School of Engineering that builds vehicles from scratch through design, procurement, research, and manufacturing.",
    },
    teams: [
      { ko: "기계팀: 구조 해석 기반 설계와 제조", en: "Mechanical team: design and manufacturing based on structural analysis" },
      { ko: "전장팀: 전자 제어 시스템과 전력 관리", en: "Electrical team: electronic control systems and power management" },
      { ko: "디자인팀: 차량 구조 설계와 3D 모델링", en: "Design team: vehicle structure design and 3D modeling" },
      { ko: "마케팅팀: 홍보와 프로젝트 관리", en: "Marketing team: promotion and project management" },
    ],
    projects: [
      { ko: "학생 자작자동차 설계·제작", en: "Student-built vehicle design and manufacturing" },
      { ko: "차량 부품 조달과 제작 공정 연구", en: "Vehicle parts procurement and manufacturing-process research" },
    ],
    achievements: [
      { ko: "2020 KSAE BAJA Participation Award 및 Best Teamwork Award", en: "2020 KSAE BAJA Participation Award and Best Teamwork Award" },
      { ko: "2024 KSAE BAJA Race Finisher", en: "2024 KSAE BAJA Race Finisher" },
      { ko: "2024 Student Smart e-Mobility Competition EV Division 공동 참가 및 Best Activity Award", en: "2024 Student Smart e-Mobility Competition EV Division joint participation and Best Activity Award" },
    ],
    keywords: [
      { ko: "자작자동차", en: "Student-built vehicle" },
      { ko: "구조 해석", en: "Structural analysis" },
      { ko: "전력 관리", en: "Power management" },
    ],
    links: [],
    image: { src: "/images/clubs/mecar.png", alt: { ko: "MECar 활동 소개 이미지", en: "MECar activity introduction" } },
    order: 2,
    reviewNote: "영문 문구는 제공된 자료를 바탕으로 한 공식 검수 전 번역입니다.",
  },
  {
    id: "roboin",
    slug: "roboin",
    name: { ko: "로보인", en: "Roboin" },
    category: { ko: "로봇 프로젝트", en: "Robotics projects" },
    shortDescription: {
      ko: "로보인 학생 동아리의 활동 정보는 공식 확인 후 업데이트됩니다.",
      en: "Roboin activity information will be updated after official confirmation.",
    },
    description: {
      ko: "현재 제공된 자료에는 로보인 로고만 포함되어 있습니다. 세부 활동, 프로젝트와 성과는 공식 정보를 확인한 뒤 안내합니다.",
      en: "The supplied material currently includes the Roboin logo only. Detailed activities, projects, and achievements will be added after official confirmation.",
    },
    teams: [],
    projects: [],
    achievements: [],
    keywords: [
      { ko: "로봇", en: "Robotics" },
      { ko: "학생 프로젝트", en: "Student projects" },
    ],
    links: [],
    image: { src: "/images/clubs/roboin.png", alt: { ko: "로보인 로고", en: "Roboin logo" } },
    order: 3,
    reviewNote: "영문 문구는 공식 검수 전 번역이며, 세부 활동 정보는 공식 확인이 필요합니다.",
  },
  {
    id: "space-y",
    slug: "space-y",
    name: { ko: "SPACE Y", en: "SPACE Y" },
    category: { ko: "항공우주 프로젝트", en: "Aerospace projects" },
    shortDescription: {
      ko: "로켓, 인공위성, 항공기 관련 프로젝트를 다루는 공과대학 항공우주 동아리입니다.",
      en: "A School of Engineering aerospace club working on projects related to rockets, satellites, and aircraft.",
    },
    description: {
      ko: "SPACE Y는 공과대학 항공우주 동아리로, 로켓·인공위성·항공기와 관련된 프로젝트 활동을 진행합니다.",
      en: "SPACE Y is a School of Engineering aerospace club working on projects related to rockets, satellites, and aircraft.",
    },
    teams: [
      { ko: "로켓 프로젝트", en: "Rocket projects" },
      { ko: "인공위성 프로젝트", en: "Satellite projects" },
      { ko: "항공기 프로젝트", en: "Aircraft projects" },
    ],
    projects: [
      { ko: "로켓, 인공위성, 항공기 관련 제작·탐구 활동", en: "Rocket, satellite, and aircraft-related making and exploration activities" },
    ],
    achievements: [],
    keywords: [
      { ko: "로켓", en: "Rocket" },
      { ko: "인공위성", en: "Satellite" },
      { ko: "항공기", en: "Aircraft" },
    ],
    links: [
      { id: "instagram", label: { ko: "Instagram @yonsei_space", en: "Instagram @yonsei_space" }, url: "https://www.instagram.com/yonsei_space/", kind: "external" },
      { id: "email", label: { ko: "yonseispace@gmail.com", en: "yonseispace@gmail.com" }, url: "mailto:yonseispace@gmail.com", kind: "email" },
    ],
    image: { src: "/images/clubs/space-y.png", alt: { ko: "SPACE Y 활동 소개 이미지", en: "SPACE Y activity introduction" } },
    order: 4,
    reviewNote: "영문 문구는 제공된 자료를 바탕으로 한 공식 검수 전 번역입니다.",
  },
];

export const getStudentActivityBySlug = (slug: string) =>
  studentActivities.find((activity) => activity.slug === slug);
