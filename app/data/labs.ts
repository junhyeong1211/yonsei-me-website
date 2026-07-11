import type { ResearchAreaSlug } from "./researchAreas";

export type ResearchLab = {
  id: string;
  slug: string;
  nameKo: string;
  nameEn: string;
  professorKo: string;
  professorEn: string;
  primaryArea: ResearchAreaSlug;
  secondaryAreas: ResearchAreaSlug[];
  location: string | null;
  phoneNumbers: string[];
  description: string | null;
  keywords: string[];
  homepageUrl: string | null;
  reviewNote: string | null;
};

const pendingDetails = {
  description: null,
  keywords: [],
  homepageUrl: null,
  reviewNote: null,
} as const;

export const researchLabs: ResearchLab[] = [
  { id: "computational-mechanics-materials", slug: "computational-mechanics-materials", nameKo: "전산재료역학 연구실", nameEn: "Computational Mechanics of Materials Lab.", professorKo: "강건욱", professorEn: "Keonwook Kang", primaryArea: "mechanics-materials", secondaryAreas: [], location: "공학관 N204", phoneNumbers: ["02-2123-7426"], ...pendingDetails },
  { id: "nano-fabrication-micro-optics", slug: "nano-fabrication-micro-optics", nameKo: "마이크로 나노 응용 기술 개발 연구실", nameEn: "Nano Fabrication/Micro Optics Lab.", professorKo: "강신일", professorEn: "Kang, Shinill", primaryArea: "micro-nano", secondaryAreas: ["bio-photonics"], location: "공학관 C330", phoneNumbers: ["02-2123-2829"], ...pendingDetails },
  { id: "optics-quantum", slug: "optics-quantum", nameKo: "광학 양자 연구실", nameEn: "Optics Quantum Lab.", professorKo: "김경식", professorEn: "Kim, Kyoungsik", primaryArea: "bio-photonics", secondaryAreas: ["micro-nano"], location: "공학관 A534", phoneNumbers: ["02-2123-7725"], ...pendingDetails },
  { id: "tribology", slug: "tribology", nameKo: "트라이볼로지 연구실", nameEn: "Tribology Research Lab.", professorKo: "김대은", professorEn: "Kim, Dae Eun", primaryArea: "mechanics-materials", secondaryAreas: ["design-manufacturing"], location: "공학관 A491", phoneNumbers: ["02-2123-7424"], ...pendingDetails },
  { id: "max-lab", slug: "max-lab", nameKo: "멀티스케일구조설계 및 극한제조 연구실", nameEn: "Multiscale Architecture and eXtreme Manufacturing, MAX Lab.", professorKo: "김석", professorEn: "Kim, Seok", primaryArea: "design-manufacturing", secondaryAreas: ["mechanics-materials"], location: "공학관 C314", phoneNumbers: ["02-2123-4463"], ...pendingDetails },
  { id: "nano-optoelectronics-system", slug: "nano-optoelectronics-system", nameKo: "나노광전자시스템 연구실", nameEn: "Nano-Optoelectronics System Lab.", professorKo: "김영주", professorEn: "Kim, Young-Joo", primaryArea: "bio-photonics", secondaryAreas: ["micro-nano"], location: "공학원 D332", phoneNumbers: ["02-2123-7211"], ...pendingDetails },
  { id: "mems", slug: "mems", nameKo: "마이크로시스템 연구실", nameEn: "MEMS Lab.", professorKo: "김용준", professorEn: "Kim, Yong-Jun", primaryArea: "micro-nano", secondaryAreas: ["design-manufacturing"], location: "공학관 A583", phoneNumbers: ["02-2123-7212"], ...pendingDetails },
  { id: "advanced-thermoengineering", slug: "advanced-thermoengineering", nameKo: "어드밴스드 열공학 연구실", nameEn: "Advanced ThermoEngineering Lab.", professorKo: "김우철", professorEn: "Kim, Woochul", primaryArea: "energy-thermal-fluids", secondaryAreas: [], location: "공학관 A310", phoneNumbers: ["02-2123-7849"], ...pendingDetails },
  { id: "small-scale-fluids", slug: "small-scale-fluids", nameKo: "미소유체연구실", nameEn: "Small-Scale Fluids Lab.", professorKo: "김원정", professorEn: "Kim, Wonjung", primaryArea: "energy-thermal-fluids", secondaryAreas: ["micro-nano", "bio-photonics"], location: "공학관 A386", phoneNumbers: ["02-2123-4471"], ...pendingDetails },
  { id: "nano-transducers", slug: "nano-transducers", nameKo: "나노기전시스템 연구실", nameEn: "Nano Transducers Lab.", professorKo: "김종백", professorEn: "Kim, Jongbaeg", primaryArea: "micro-nano", secondaryAreas: ["robotics-control"], location: "산학협동관 520호", phoneNumbers: ["02-2123-7895"], ...pendingDetails },
  { id: "intelligent-device-manufacturing", slug: "intelligent-device-manufacturing", nameKo: "지능소자공정 연구실", nameEn: "Laboratory for Intelligent Device & Manufacturing", professorKo: "김해진", professorEn: "Kim, Hae-Jin", primaryArea: "design-manufacturing", secondaryAreas: ["micro-nano"], location: "공학관 N206", phoneNumbers: ["02-2123-2819"], ...pendingDetails },
  { id: "biomedical-energy-system", slug: "biomedical-energy-system", nameKo: "바이오메디컬 & 에너지 시스템 연구실", nameEn: "Biomedical and Energy System Lab.", professorKo: "류원형", professorEn: "Ryu, WonHyoung", primaryArea: "bio-photonics", secondaryAreas: ["energy-thermal-fluids"], location: "공학관 N105", phoneNumbers: ["02-2123-7437"], ...pendingDetails },
  { id: "computational-science-ai", slug: "computational-science-ai", nameKo: "계산과학-인공지능 연구실", nameEn: "Computational Science - Artificial Intelligence Lab.", professorKo: "민경민", professorEn: "Min, Kyoungmin", primaryArea: "robotics-control", secondaryAreas: ["design-manufacturing"], location: "공학관 N201", phoneNumbers: ["02-2123-4464"], ...pendingDetails },
  { id: "manufacturing-mechatronics", slug: "manufacturing-mechatronics", nameKo: "생산 & 메카트로닉스 연구실", nameEn: "Manufacturing & Mechatronics Lab.", professorKo: "민병권", professorEn: "Min, Byung-Kwon", primaryArea: "design-manufacturing", secondaryAreas: ["robotics-control"], location: "산학협동관 308호", phoneNumbers: ["02-2123-6611"], ...pendingDetails },
  { id: "vibration-opto-mechatronics", slug: "vibration-opto-mechatronics", nameKo: "진동 및 광메카트로닉스 연구실", nameEn: "Vibration and Opto-Mechatronics Lab.", professorKo: "박노철", professorEn: "Park, No-Cheol", primaryArea: "robotics-control", secondaryAreas: ["bio-photonics"], location: "공학원 332D", phoneNumbers: ["02-2123-4677"], ...pendingDetails },
  { id: "ice-clean-energy", slug: "ice-clean-energy", nameKo: "내연기관 & 청정에너지 연구실", nameEn: "Ice & Clean Energy Lab.", professorKo: "송순호", professorEn: "Song, Soonho", primaryArea: "energy-thermal-fluids", secondaryAreas: [], location: "공학관 A180", phoneNumbers: ["02-2123-7221"], ...pendingDetails },
  { id: "human-centered-ai-robotics", slug: "human-centered-ai-robotics", nameKo: "인간중심AI로보틱스 연구실", nameEn: "Human-Centered AI Robotics Lab.", professorKo: "신동준", professorEn: "Shin, Dongjun", primaryArea: "robotics-control", secondaryAreas: [], location: "공학관 C426", phoneNumbers: ["02-2123-2826"], ...pendingDetails },
  { id: "micro-servo-system", slug: "micro-servo-system", nameKo: "정밀제어시스템 연구실", nameEn: "Micro Servo System Lab.", professorKo: "양현석", professorEn: "Yang, Hyunseok", primaryArea: "robotics-control", secondaryAreas: [], location: "공학관 A283", phoneNumbers: ["02-2123-7214"], ...pendingDetails },
  { id: "systematic-structure-design", slug: "systematic-structure-design", nameKo: "전산구조설계 연구실", nameEn: "Systematic Structure Design Lab.", professorKo: "유정훈", professorEn: "Yoo, Jeonghoon", primaryArea: "design-manufacturing", secondaryAreas: ["mechanics-materials"], location: "공학관 C334", phoneNumbers: ["02-2123-2859"], ...pendingDetails },
  { id: "manufacturing-mechatronics-research", slug: "manufacturing-mechatronics-research", nameKo: "정밀 생산 메카트로닉스 연구실", nameEn: "Research Laboratory of Manufacturing Mechatronics", professorKo: "윤준영", professorEn: "Yoon, Junyoung", primaryArea: "design-manufacturing", secondaryAreas: ["robotics-control"], location: "공학관 A190", phoneNumbers: ["02-2123-7445"], ...pendingDetails },
  { id: "heat-transfer-thermal-design", slug: "heat-transfer-thermal-design", nameKo: "열전달 및 열설계 연구실", nameEn: "Heat Transfer & Thermal Design Lab.", professorKo: "이남규", professorEn: "Lee, NamKyu", primaryArea: "energy-thermal-fluids", secondaryAreas: [], location: "공학관 N207", phoneNumbers: ["02-2123-2820"], ...pendingDetails },
  { id: "multi-physics-design-optimization-phm", slug: "multi-physics-design-optimization-phm", nameKo: "멀티피직스 최적설계 & 건전성진단예지 연구실", nameEn: "Multi-Physics Design Optimization & Prognostics and Health Management Lab.", professorKo: "이종수", professorEn: "Lee, Jongsoo", primaryArea: "design-manufacturing", secondaryAreas: ["mechanics-materials"], location: "공학관 A286, C323", phoneNumbers: ["02-2123-4474", "02-2123-7275"], ...pendingDetails },
  { id: "multi-scale-fluid-dynamics", slug: "multi-scale-fluid-dynamics", nameKo: "멀티스케일 유체역학 연구실", nameEn: "Multi-scale Fluid Dynamics Lab.", professorKo: "이준상", professorEn: "Lee, Joon Sang", primaryArea: "energy-thermal-fluids", secondaryAreas: [], location: "공학관 A277, N204", phoneNumbers: ["02-2123-7217"], ...pendingDetails },
  { id: "turbulence", slug: "turbulence", nameKo: "난류 연구실", nameEn: "Turbulence Lab.", professorKo: "이창훈", professorEn: "Lee, Changhoon", primaryArea: "energy-thermal-fluids", secondaryAreas: [], location: "공학관 A178", phoneNumbers: [], ...pendingDetails },
  { id: "biomechanics-soft-materials", slug: "biomechanics-soft-materials", nameKo: "생체역학 및 연성재료 연구실", nameEn: "Biomechanics & Soft Materials Lab.", professorKo: "이형석", professorEn: "Hyung-Suk Lee", primaryArea: "bio-photonics", secondaryAreas: ["mechanics-materials"], location: "공학관 A581, N104", phoneNumbers: ["02-2123-4624"], ...pendingDetails },
  { id: "micro-mechanics", slug: "micro-mechanics", nameKo: "마이크로역학 연구실", nameEn: "Micro Mechanics Lab.", professorKo: "장용훈", professorEn: "Jang, Yong Hoon", primaryArea: "mechanics-materials", secondaryAreas: ["micro-nano"], location: "공학관 A110", phoneNumbers: ["02-2123-7220"], ...pendingDetails },
  { id: "nemd", slug: "nemd", nameKo: "나노 융합 소자 연구실", nameEn: "NEMD Lab.", professorKo: "전성찬", professorEn: "Jun, Seong Chan", primaryArea: "micro-nano", secondaryAreas: [], location: "공학관 N204", phoneNumbers: ["02-2123-7888"], ...pendingDetails },
  { id: "intelligent-structures-integrated-design", slug: "intelligent-structures-integrated-design", nameKo: "지능형 구조 및 통합 설계 연구실", nameEn: "Intelligent Structures & Integrated Design Lab.", professorKo: "전흥재", professorEn: "Chun, Heoung Jae", primaryArea: "design-manufacturing", secondaryAreas: ["mechanics-materials"], location: "공학관 C332", phoneNumbers: ["02-2123-7222"], ...pendingDetails },
  { id: "biochip-technology", slug: "biochip-technology", nameKo: "바이오칩 연구실", nameEn: "Laboratory of Biochip Technology", professorKo: "정효일", professorEn: "Jung, Hyo-il", primaryArea: "bio-photonics", secondaryAreas: ["micro-nano"], location: "공학관 A108", phoneNumbers: ["02-2123-7767"], ...pendingDetails },
  { id: "computational-imaging-instrumentation", slug: "computational-imaging-instrumentation", nameKo: "산술 광학 영상 및 응용 연구실", nameEn: "Computational Imaging & Instrumentation Laboratory", professorKo: "주철민", professorEn: "Joo, Chulmin", primaryArea: "bio-photonics", secondaryAreas: ["micro-nano"], location: "공학관 N104", phoneNumbers: ["02-2123-7706"], ...pendingDetails, reviewNote: "한글 연구실명 공식 확인 필요" },
  { id: "machine-learning-control-systems", slug: "machine-learning-control-systems", nameKo: "기계학습 및 제어 시스템 연구실", nameEn: "Machine Learning and Control Systems Lab.", professorKo: "최종은", professorEn: "Choi, Jongeun", primaryArea: "robotics-control", secondaryAreas: [], location: "공학관 N206", phoneNumbers: [], ...pendingDetails },
  { id: "accurate-measurement-intelligent-sensing", slug: "accurate-measurement-intelligent-sensing", nameKo: "정밀 측정 및 지능형 센싱 연구실", nameEn: "High-Dimensional Accurate Measurement and Intelligent Sensing Lab.", professorKo: "현재상", professorEn: "Hyun, Jae-Sang", primaryArea: "robotics-control", secondaryAreas: ["design-manufacturing"], location: "공학관 C315", phoneNumbers: ["02-2123-2818"], ...pendingDetails },
  { id: "multiphysics-energy-system", slug: "multiphysics-energy-system", nameKo: "지속가능한 에너지 플랫폼 개발 연구실", nameEn: "Multiphysics Energy System Lab.", professorKo: "홍종섭", professorEn: "Hong, Jongsup", primaryArea: "energy-thermal-fluids", secondaryAreas: [], location: "공학관 A288", phoneNumbers: [], ...pendingDetails },
];

export const getResearchLabBySlug = (slug: string) =>
  researchLabs.find((lab) => lab.slug === slug);
