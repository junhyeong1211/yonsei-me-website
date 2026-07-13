export type ResearchVisionLocaleText = {
  ko: string;
  en: string;
};

export type ResearchVisionItem = {
  number: string;
  title: ResearchVisionLocaleText;
  description: ResearchVisionLocaleText;
};

export const researchVisionCapabilities = {
  eyebrow: {
    ko: "RESEARCH VISION & CAPABILITIES",
    en: "RESEARCH VISION & CAPABILITIES",
  },
  title: {
    ko: "연구 비전·역량",
    en: "Research Vision & Capabilities",
  },
  description: {
    ko: "연세대학교 기계공학부는 축적된 교육과 연구 역량을 바탕으로 기계공학의 새로운 가능성을 탐구하고 사회와 산업의 발전에 기여합니다.",
    en: "Yonsei Mechanical Engineering explores new possibilities in mechanical engineering and contributes to society and industry through accumulated educational and research capabilities.",
  },
  vision: {
    eyebrow: {
      ko: "RESEARCH VISION",
      en: "RESEARCH VISION",
    },
    title: {
      ko: "연구 비전",
      en: "Research Vision",
    },
    items: [
      {
        number: "01",
        title: {
          ko: "미래를 선도하는 공학인 양성",
          en: "Educating Engineers for the Future",
        },
        description: {
          ko: "기계공학의 기본 이론과 설계 능력을 바탕으로 새로운 기술과 산업의 변화를 이끌 수 있는 공학 인재를 양성합니다.",
          en: "We educate engineers who can lead technological and industrial change through mechanical engineering fundamentals and design capability.",
        },
      },
      {
        number: "02",
        title: {
          ko: "융합 연구를 주도하는 연구 환경",
          en: "An Environment for Convergent Research",
        },
        description: {
          ko: "기계공학을 기반으로 다양한 학문 및 산업 분야와 연계하여 융합 연구와 새로운 기술 개발을 추진합니다.",
          en: "We advance convergent research and new technology development in connection with diverse academic and industrial fields.",
        },
      },
      {
        number: "03",
        title: {
          ko: "사회에 기여하는 지도자 양성",
          en: "Developing Leaders Who Contribute to Society",
        },
        description: {
          ko: "공학인의 사회적 책임을 이해하고 전문성과 리더십을 갖춘 인재로 성장할 수 있도록 지원합니다.",
          en: "We support students in becoming professionals with leadership and an understanding of engineers' social responsibility.",
        },
      },
    ] satisfies ResearchVisionItem[],
  },
  capabilities: {
    eyebrow: {
      ko: "RESEARCH CAPABILITIES",
      en: "RESEARCH CAPABILITIES",
    },
    title: {
      ko: "연구 역량",
      en: "Research Capabilities",
    },
    items: [
      {
        number: "01",
        title: {
          ko: "교수진과 연구인력",
          en: "Faculty and Research Personnel",
        },
        description: {
          ko: "다양한 전문 분야의 교수진과 연구인력이 기계공학의 교육과 연구를 수행하고 있습니다.",
          en: "Faculty and research personnel from diverse specialties conduct education and research in mechanical engineering.",
        },
      },
      {
        number: "02",
        title: {
          ko: "국가 연구사업과 산학협력",
          en: "National Research Projects and Industry Collaboration",
        },
        description: {
          ko: "BK21 사업과 다양한 국가 연구사업 및 산학협력을 통해 기계공학 분야의 연구를 수행하고 있습니다.",
          en: "Research in mechanical engineering is conducted through BK21, national research projects, and industry collaboration.",
        },
      },
      {
        number: "03",
        title: {
          ko: "연구시설과 장비",
          en: "Research Facilities and Equipment",
        },
        description: {
          ko: "각 연구실의 실험·측정 장비와 기계 제작 및 가공 시설을 기반으로 연구를 수행합니다.",
          en: "Research is conducted using laboratory experimental and measurement equipment, as well as mechanical fabrication and processing facilities.",
        },
      },
      {
        number: "04",
        title: {
          ko: "연구성과와 학술 교류",
          en: "Research Outcomes and Academic Exchange",
        },
        description: {
          ko: "국내외 학술활동과 연구 교류를 통해 연구결과를 공유하고 기계공학 분야의 발전에 기여합니다.",
          en: "We share research outcomes through domestic and international academic activities and exchange, contributing to the advancement of mechanical engineering.",
        },
      },
    ] satisfies ResearchVisionItem[],
  },
  relatedLinks: [
    { path: "/faculty", label: { ko: "교수진", en: "Faculty" } },
    { path: "/research/fields", label: { ko: "연구 분야", en: "Research Areas" } },
    { path: "/labs", label: { ko: "연구실", en: "Laboratories" } },
  ],
} as const;
