export type ResearchAreaSlug =
  | "mechanics-materials"
  | "energy-thermal-fluids"
  | "robotics-control"
  | "design-manufacturing"
  | "micro-nano"
  | "bio-photonics";

export type ResearchArea = {
  id: string;
  slug: ResearchAreaSlug;
  nameKo: string;
  nameEn: string;
  shortDescription: string;
  displayOrder: number;
  classificationStatus: "draft";
};

export const researchAreas: ResearchArea[] = [
  {
    id: "mechanics-materials",
    slug: "mechanics-materials",
    nameKo: "역학·소재",
    nameEn: "Mechanics & Materials",
    shortDescription: "기계 구조와 재료에 관한 연구 정보를 살펴봅니다.",
    displayOrder: 1,
    classificationStatus: "draft",
  },
  {
    id: "energy-thermal-fluids",
    slug: "energy-thermal-fluids",
    nameKo: "에너지·열유체",
    nameEn: "Energy & Thermal-Fluids",
    shortDescription: "에너지, 열 및 유체 관련 연구 정보를 살펴봅니다.",
    displayOrder: 2,
    classificationStatus: "draft",
  },
  {
    id: "robotics-control",
    slug: "robotics-control",
    nameKo: "로보틱스·제어",
    nameEn: "Robotics & Control",
    shortDescription: "로봇, 제어 및 지능 시스템 관련 연구 정보를 살펴봅니다.",
    displayOrder: 3,
    classificationStatus: "draft",
  },
  {
    id: "design-manufacturing",
    slug: "design-manufacturing",
    nameKo: "설계·제조",
    nameEn: "Design & Manufacturing",
    shortDescription: "설계, 생산 및 제조 관련 연구 정보를 살펴봅니다.",
    displayOrder: 4,
    classificationStatus: "draft",
  },
  {
    id: "micro-nano",
    slug: "micro-nano",
    nameKo: "마이크로·나노",
    nameEn: "Micro & Nano Engineering",
    shortDescription: "마이크로·나노 공학 관련 연구 정보를 살펴봅니다.",
    displayOrder: 5,
    classificationStatus: "draft",
  },
  {
    id: "bio-photonics",
    slug: "bio-photonics",
    nameKo: "바이오·포토닉스",
    nameEn: "Bio & Photonics",
    shortDescription: "바이오 및 포토닉스 관련 연구 정보를 살펴봅니다.",
    displayOrder: 6,
    classificationStatus: "draft",
  },
];

export const getResearchAreaBySlug = (slug: string) =>
  researchAreas.find((area) => area.slug === slug);
