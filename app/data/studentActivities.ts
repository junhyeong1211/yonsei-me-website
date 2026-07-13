import type { LocaleText } from "./content";

export type StudentActivityLink = {
  id: string;
  label: LocaleText;
  url?: string;
  kind: "external" | "email" | "pending";
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
    category: { ko: "무인비행체 · 자율비행 · 기체 제작", en: "Unmanned aerial vehicles · Autonomous flight · Airframe fabrication" },
    shortDescription: {
      ko: "드론, 고정익, VTOL 등 무인비행체를 직접 제작하고 자율비행 알고리즘을 개발하는 동아리입니다.",
      en: "A club that builds unmanned aerial vehicles such as drones, fixed-wing aircraft, and VTOL platforms, while developing autonomous-flight algorithms.",
    },
    description: {
      ko: "하드웨어팀과 소프트웨어팀으로 나뉘어 무인비행체 제작과 자율비행 기술을 연구합니다.",
      en: "The club is organized into hardware and software teams that study unmanned aerial vehicle fabrication and autonomous-flight technologies.",
    },
    teams: [
      { ko: "소프트웨어팀: 인지·판단·제어 알고리즘 개발", en: "Software team: perception, decision-making, and control algorithms" },
      { ko: "소프트웨어팀: ROS2, PX4 Autopilot, C++, Python", en: "Software team: ROS2, PX4 Autopilot, C++, and Python" },
      { ko: "하드웨어팀: 기체 설계·해석·제작", en: "Hardware team: airframe design, analysis, and fabrication" },
      { ko: "하드웨어팀: 탄소섬유·3D 프린팅 활용과 하드웨어 통합", en: "Hardware team: carbon fiber, 3D printing, and hardware integration" },
      { ko: "하드웨어팀: 모터·GPS·LiDAR 통합, 비행 테스트 및 성능 개선", en: "Hardware team: motor, GPS, and LiDAR integration, flight testing, and performance improvement" },
    ],
    projects: [
      { ko: "Stereo Vision Collision Avoidance", en: "Stereo Vision Collision Avoidance" },
      { ko: "Precision Landing using Reinforcement Learning", en: "Precision Landing using Reinforcement Learning" },
      { ko: "RGB Camera 기반 End-to-End Autonomous Flight", en: "RGB camera-based End-to-End Autonomous Flight" },
      { ko: "통신 프로토콜 및 STM32 비행 제어기 개발", en: "Communication protocol and STM32 flight-controller development" },
    ],
    achievements: [
      { ko: "제21·22·23회 한국로봇항공기 경연대회 본선 진출", en: "Finalist in the 21st, 22nd, and 23rd Korea Robot Aviation Competition" },
      { ko: "제21회 한국로봇항공기 경연대회 2위", en: "Second place at the 21st Korea Robot Aviation Competition" },
      { ko: "2024 현대모비스 모빌리티 SW 해커톤 대상", en: "Grand Prize, 2024 Hyundai Mobis Mobility SW Hackathon" },
      { ko: "2025 우주항공 Makerthon VTOL 부문 대상", en: "Grand Prize, VTOL category, 2025 Aerospace Makerthon" },
      { ko: "2024 서울특별시 드론 활용 경진대회 우수상", en: "Excellence Award, 2024 Seoul Drone Utilization Competition" },
      { ko: "2024 AAM 디지털 설계 경진대회 2위", en: "Second place, 2024 AAM Digital Design Competition" },
      { ko: "2024 AI Drone Challenge 대상", en: "Grand Prize, 2024 AI Drone Challenge" },
    ],
    keywords: [
      { ko: "무인비행체", en: "UAV" },
      { ko: "지능비행", en: "Intelligent flight" },
      { ko: "기체 설계", en: "Airframe design" },
    ],
    links: [
      { id: "instagram", label: { ko: "Instagram @yonsei_drone", en: "Instagram @yonsei_drone" }, url: "https://www.instagram.com/yonsei_drone/", kind: "external" },
      { id: "youtube", label: { ko: "YouTube @yonseidrone", en: "YouTube @yonseidrone" }, url: "https://www.youtube.com/@yonseidrone", kind: "external" },
      { id: "notion", label: { ko: "Notion 모집 안내", en: "Notion recruitment information" }, url: "https://yonseidrone.com/recruit", kind: "external" },
    ],
    image: { src: "/images/clubs/yonsei-drone.png", alt: { ko: "연세드론 활동 소개 이미지", en: "Yonsei Drone activity introduction" } },
    order: 1,
    reviewNote: "영문 문구는 제공된 자료를 바탕으로 한 공식 검수 전 번역입니다.",
  },
  {
    id: "mecar",
    slug: "mecar",
    name: { ko: "MECar", en: "MECar" },
    category: { ko: "자작 자동차 · 기계설계 · 전기제어", en: "Student-built vehicles · Mechanical design · Electrical control" },
    shortDescription: {
      ko: "차량 설계부터 부품 발주와 제작까지 직접 수행하는 연세대학교 자작 자동차 동아리입니다.",
      en: "Yonsei University's student-built vehicle club carries out vehicle design, parts ordering, and fabrication directly.",
    },
    description: {
      ko: "MECar는 차량 설계부터 부품 발주와 제작까지 직접 수행하며, 기계설계와 전기제어를 바탕으로 자작 자동차 프로젝트를 진행합니다.",
      en: "MECar carries out student-built vehicle projects based on mechanical design and electrical control, from vehicle design through parts ordering and fabrication.",
    },
    teams: [
      { ko: "기계팀: 구조해석, 차체 제작, 경량화, ANSYS 검증", en: "Mechanical team: structural analysis, chassis fabrication, lightweighting, and ANSYS verification" },
      { ko: "전기팀: 배터리, 컨트롤러, LV·HV 시스템, 센서 네트워크", en: "Electrical team: batteries, controllers, LV/HV systems, and sensor networks" },
      { ko: "설계팀: CAD, 3D 모델링, 제작 도면", en: "Design team: CAD, 3D modeling, and fabrication drawings" },
      { ko: "마케팅팀: 후원사, 콘텐츠, SNS, 프로젝트 관리", en: "Marketing team: sponsors, content, social media, and project management" },
    ],
    projects: [
      { ko: "학생 자작 자동차 설계·제작", en: "Student-built vehicle design and fabrication" },
      { ko: "부품 발주와 제작 공정 수행", en: "Parts ordering and fabrication process execution" },
    ],
    achievements: [
      { ko: "2020 KSAE BAJA 장려상 및 베스트 팀워크상", en: "2020 KSAE BAJA Encouragement Award and Best Teamwork Award" },
      { ko: "2024 KSAE BAJA 내구력 경기 완주", en: "Completed the 2024 KSAE BAJA endurance event" },
      { ko: "2024 대학생 스마트 e모빌리티 경진대회 EV 부문 연합 출전", en: "Joint entry in the EV category of the 2024 Student Smart e-Mobility Competition" },
      { ko: "베스트 활동상", en: "Best Activity Award" },
    ],
    keywords: [
      { ko: "자작자동차", en: "Student-built vehicle" },
      { ko: "구조 해석", en: "Structural analysis" },
      { ko: "전력 관리", en: "Power management" },
    ],
    links: [
      { id: "instagram", label: { ko: "Instagram @yonseimecar", en: "Instagram @yonseimecar" }, url: "https://www.instagram.com/yonseimecar/", kind: "external" },
      { id: "notion", label: { ko: "Notion · 링크 확인 필요", en: "Notion · Link verification required" }, kind: "pending" },
    ],
    image: { src: "/images/clubs/mecar.png", alt: { ko: "MECar 활동 소개 이미지", en: "MECar activity introduction" } },
    order: 2,
    reviewNote: "영문 문구는 제공된 자료를 바탕으로 한 공식 검수 전 번역입니다.",
  },
  {
    id: "roboin",
    slug: "roboin",
    name: { ko: "로보인", en: "Roboin" },
    category: { ko: "로봇 · 인공지능 · 제작 프로젝트", en: "Robotics · Artificial intelligence · Fabrication projects" },
    shortDescription: {
      ko: "로봇을 배우고 직접 제작하며 세미나와 대회에 참여하는 기계공학부 로봇 학술 동아리입니다.",
      en: "A mechanical engineering robotics club that learns and builds robots while participating in seminars and competitions.",
    },
    description: {
      ko: "로보인은 로봇을 배우고 직접 제작하며 세미나와 대회에 참여하는 기계공학부 로봇 학술 동아리입니다.",
      en: "Roboin is a mechanical engineering robotics club that learns and builds robots while participating in seminars and competitions.",
    },
    teams: [
      { ko: "아두이노, 라즈베리파이, 3D CAD, AI 세미나", en: "Arduino, Raspberry Pi, 3D CAD, and AI seminars" },
      { ko: "기업·연구실 연계 활동과 대학원 세미나 참여", en: "Industry and laboratory-linked activities and graduate seminars" },
    ],
    projects: [
      { ko: "로봇팔, 드론, 4족보행 로봇 제작", en: "Robot arm, drone, and quadruped robot fabrication" },
      { ko: "IoT 기기와 자율주행 자동차 프로젝트", en: "IoT device and autonomous-driving vehicle projects" },
      { ko: "에디슨 전산설계 대회, KU 메디컬 해커톤, 로보마스터 참가", en: "Participation in the Edison Computational Design Competition, KU Medical Hackathon, and RoboMaster" },
    ],
    achievements: [],
    keywords: [
      { ko: "로봇", en: "Robotics" },
      { ko: "인공지능", en: "Artificial intelligence" },
      { ko: "학생 프로젝트", en: "Student projects" },
    ],
    links: [
      { id: "naver-cafe", label: { ko: "Naver Cafe", en: "Naver Cafe" }, url: "https://cafe.naver.com/yonseiunivroboin", kind: "external" },
      { id: "youtube", label: { ko: "YouTube", en: "YouTube" }, url: "https://youtu.be/caPJby-NVIEn", kind: "external" },
      { id: "facebook", label: { ko: "Facebook", en: "Facebook" }, url: "https://facebook.com/roboinrecruit", kind: "external" },
    ],
    image: { src: "/images/clubs/roboin.png", alt: { ko: "로보인 로고", en: "Roboin logo" } },
    order: 3,
    reviewNote: "영문 문구는 제공된 자료를 바탕으로 한 공식 검수 전 번역입니다. 제공되지 않은 수상 연도와 상명은 포함하지 않았습니다.",
  },
  {
    id: "space-y",
    slug: "space-y",
    name: { ko: "SPACE Y", en: "SPACE Y" },
    category: { ko: "로켓 · 인공위성 · 항공 · 항공우주 콘텐츠", en: "Rocket · Satellite · Aviation · Aerospace content" },
    shortDescription: {
      ko: "로켓, 인공위성, 항공, 컨버전스 4개 팀을 중심으로 항공우주 프로젝트와 학술 활동을 수행합니다.",
      en: "An aerospace club with rocket, satellite, aviation, and convergence teams that carries out aerospace projects and academic activities.",
    },
    description: {
      ko: "SPACE Y는 로켓, 인공위성, 항공, 컨버전스 4개 팀을 중심으로 항공우주 프로젝트와 학술 활동을 수행합니다.",
      en: "SPACE Y carries out aerospace projects and academic activities through rocket, satellite, aviation, and convergence teams.",
    },
    teams: [
      { ko: "로켓팀: 구조 설계·해석, OpenRocket·Fusion·ANSYS", en: "Rocket team: structural design and analysis with OpenRocket, Fusion, and ANSYS" },
      { ko: "로켓팀: KNSB 고체연료·연소 실험, 노즐·챔버 설계", en: "Rocket team: KNSB solid propellant and combustion experiments, nozzle and chamber design" },
      { ko: "인공위성팀: CDHS, SMS, COMS, 캔위성 제작 및 논문", en: "Satellite team: CDHS, SMS, COMS, CanSat fabrication, and papers" },
      { ko: "항공팀: 항공기 모델 설계·제작, Fusion·3D 프린팅·MDF·발사나무·ANSYS", en: "Aviation team: aircraft model design and fabrication using Fusion, 3D printing, MDF, balsa wood, and ANSYS" },
      { ko: "컨버전스팀: 카드뉴스와 학회지, 내부 세미나, 항공우주 정책 학술 활동", en: "Convergence team: card news, a journal, internal seminars, and aerospace policy activities" },
    ],
    projects: [
      { ko: "로켓 통신·낙하산 사출·점화·자세 제어, 비행 데이터·전자보드", en: "Rocket communication, parachute deployment, ignition, attitude control, flight data, and electronics boards" },
      { ko: "캔위성 제작 및 논문", en: "CanSat fabrication and papers" },
      { ko: "항공 제어·메커니즘 스터디", en: "Aviation control and mechanism study" },
      { ko: "NASA JPL 관계자 초청 세미나", en: "Invited seminar with a NASA JPL representative" },
    ],
    achievements: [
      { ko: "2023 NURA 학술대회 장려상", en: "Encouragement Award, 2023 NURA Academic Conference" },
      { ko: "2024 NURA 학술대회 금상 및 항우연원장상", en: "Gold Award and KARI President Award, 2024 NURA Academic Conference" },
      { ko: "2023 국내 캔위성 대회 우수상", en: "Excellence Award, 2023 domestic CanSat competition" },
      { ko: "2023 AAS·NASA 대회 본선", en: "Finalist in the 2023 AAS·NASA competition" },
      { ko: "2024 국내 캔위성 대회 우수상", en: "Excellence Award, 2024 domestic CanSat competition" },
    ],
    keywords: [
      { ko: "로켓", en: "Rocket" },
      { ko: "인공위성", en: "Satellite" },
      { ko: "항공기", en: "Aircraft" },
    ],
    links: [
      { id: "instagram", label: { ko: "Instagram @yonsei_space", en: "Instagram @yonsei_space" }, url: "https://www.instagram.com/yonsei_space/", kind: "external" },
    ],
    image: { src: "/images/clubs/space-y.png", alt: { ko: "SPACE Y 활동 소개 이미지", en: "SPACE Y activity introduction" } },
    order: 4,
    reviewNote: "영문 문구는 제공된 자료를 바탕으로 한 공식 검수 전 번역입니다.",
  },
];

export const getStudentActivityBySlug = (slug: string) =>
  studentActivities.find((activity) => activity.slug === slug);
