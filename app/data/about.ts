export type AboutSection = {
  sectionId: string;
  titleKo: string;
  titleEn: string;
  summary: string;
  reviewNote: string | null;
};

export type AboutEducationalGoal = {
  number: string;
  title: string;
  description: string;
};

export const aboutDepartmentIntroduction: AboutSection = {
  sectionId: "department-introduction",
  titleKo: "기계공학부 소개",
  titleEn: "Department Introduction",
  summary: "기독교 정신에 기하여 학술의 심오한 이론과 광범 정치한 응용방법을 교수·연구하며, 국가와 인류 사회 발전에 공헌할 지도적 인격을 도야함을 목적으로 한다.",
  reviewNote: "‘광범 정치한’은 공식 원문 표기를 확인할 필요가 있음.",
};

export const aboutEducationalPurpose: AboutSection = {
  sectionId: "educational-purpose",
  titleKo: "교육목적",
  titleEn: "Educational Purpose",
  summary: "창의적 사고와 도전정신을 바탕으로 종합 설계 능력을 갖추고, 글로벌 사회에 유익한 가치를 창출할 수 있는 인재 양성",
  reviewNote: null,
};

export const aboutEducationalGoals: AboutEducationalGoal[] = [
  {
    number: "01",
    title: "공학실무와 연구 수행",
    description: "창의적 사고방법과 설계기술을 익히고, 기계공학을 기반으로 여러 전문 분야에 걸친 종합적인 공학설계에 적용할 수 있는 공학실무능력과 연구수행능력을 계발한다.",
  },
  {
    number: "02",
    title: "소통과 리더십",
    description: "자신의 생각을 효율적으로 전달하고 동료들과 협업하며, 조직을 관리하고 경영할 수 있는 리더십을 배양한다.",
  },
  {
    number: "03",
    title: "미래기술에 대한 도전",
    description: "미래에 필요한 예측하기 어려운 기술에 도전하고, 신기술을 개발하여 새로운 환경에 유익하게 적용할 수 있는 능력을 계발한다.",
  },
  {
    number: "04",
    title: "평생학습과 사회적 책임",
    description: "평생을 통해 자기계발을 할 줄 알며, 개방적인 마음과 비판적 의문을 가지고 자신의 연구결과 및 개발품에 대한 사회적·윤리적 책임을 인식할 수 있는 소양을 익힌다.",
  },
  {
    number: "05",
    title: "글로벌 역량",
    description: "글로벌 사회에서 공학인의 국제적 역할을 인식하고, 산업체, 교육·연구기관, 공공기관의 리더로 성장할 수 있는 역량을 계발한다.",
  },
];
