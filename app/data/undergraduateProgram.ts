export type UndergraduateProgramYear = {
  year: 1 | 2 | 3 | 4;
  titleKo: string;
  titleEn: string;
  descriptionKo: string;
  descriptionEn: string;
  representativeCourses: string[];
};

export const undergraduateProgramYears: UndergraduateProgramYear[] = [
  {
    year: 1,
    titleKo: "공학 기초",
    titleEn: "Engineering Foundations",
    descriptionKo: "수학·물리·화학 등 공학 기초 과목을 학습하고, 기계공학창의설계를 통해 전공을 처음 경험합니다.",
    descriptionEn: "Build foundations in mathematics, physics, and chemistry, and encounter the major through creative mechanical engineering design.",
    representativeCourses: ["공학수학(1)", "공학수학(2)", "공학물리학및실험(1)", "공학물리학및실험(2)", "공학화학및실험(1)", "공학화학및실험(2)", "기계공학창의설계"],
  },
  {
    year: 2,
    titleKo: "전공 기초",
    titleEn: "Major Foundations",
    descriptionKo: "고체역학·열역학·유체역학·동역학 등 기계공학의 핵심 이론과 실험 과목을 학습합니다.",
    descriptionEn: "Study the core theories and laboratories of mechanical engineering, including mechanics of materials, thermodynamics, fluid mechanics, and dynamics.",
    representativeCourses: ["공학정보처리", "공학수학(3)", "공학수학(4)", "고체역학", "열역학", "유체역학", "동역학", "컴퓨터응용기계설계", "기계공학실험(1)"],
  },
  {
    year: 3,
    titleKo: "전공 심화",
    titleEn: "Advanced Study",
    descriptionKo: "설계·제조·열유체·제어·바이오·나노 등 관심 분야의 전공선택 과목을 통해 전문성을 확장합니다.",
    descriptionEn: "Develop expertise through electives in design, manufacturing, thermo-fluids, control, bioengineering, and nanoengineering.",
    representativeCourses: ["공학수치해석", "기계공학실험(2)", "기계진동", "열전달", "생산공학", "메카니즘설계", "바이오의료기계", "마이크로기계시스템", "메카트로닉스", "기계시스템제어"],
  },
  {
    year: 4,
    titleKo: "설계와 연구",
    titleEn: "Design and Research",
    descriptionKo: "창의제품설계와 연구논문, 세미나 및 학부연구를 통해 전공 지식을 실제 문제에 적용하고 결과를 발표합니다.",
    descriptionEn: "Apply disciplinary knowledge to real problems and present results through product design, thesis work, seminars, and undergraduate research.",
    representativeCourses: ["창의제품설계", "연구논문", "기계공학세미나(1)", "기계공학세미나(2)", "학부연구"],
  },
];

export const undergraduateLearningExperiences = [
  {
    number: "01",
    titleKo: "이론",
    titleEn: "Theory",
    descriptionKo: "역학·열유체·재료·제어 등 기계공학의 핵심 원리를 학습합니다.",
    descriptionEn: "Learn the core principles of mechanics, thermo-fluids, materials, and control.",
  },
  {
    number: "02",
    titleKo: "실험",
    titleEn: "Laboratory",
    descriptionKo: "기계공학실험과 전공 실습을 통해 측정·분석·결과 해석 능력을 기릅니다.",
    descriptionEn: "Develop measurement, analysis, and interpretation skills through laboratories and practical coursework.",
  },
  {
    number: "03",
    titleKo: "설계·연구",
    titleEn: "Design and Research",
    descriptionKo: "창의설계·제품설계·학부연구·연구논문을 통해 문제를 정의하고 해결하는 과정을 경험합니다.",
    descriptionEn: "Practice defining and solving problems through creative design, product design, undergraduate research, and thesis work.",
  },
] as const;
