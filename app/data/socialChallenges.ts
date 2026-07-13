export type SocialChallengeLocaleText = {
  ko: string;
  en: string;
};

export type SocialChallengeItem = {
  number?: string;
  title: SocialChallengeLocaleText;
  description?: SocialChallengeLocaleText;
};

export const socialChallenges = {
  eyebrow: {
    ko: "SOCIAL CHALLENGE SUPPORT",
    en: "SOCIAL CHALLENGE SUPPORT",
  },
  title: {
    ko: "사회난제 신문고",
    en: "Social Challenges",
  },
  description: {
    ko: "기술적 난제 해결을 필요로 하는 기업과 기계공학부의 연구 역량을 연결하여 문제 해결을 위한 연구 협력 가능성을 검토합니다.",
    en: "We examine possibilities for research collaboration by connecting companies facing technical challenges with the department's research capabilities.",
  },
  eligibleUse: {
    title: {
      ko: "이런 경우 이용할 수 있습니다",
      en: "When You Can Use This Service",
    },
    items: [
      { title: { ko: "제품 또는 공정 과정에서 기술적 문제를 겪는 기업", en: "Companies experiencing technical problems in products or processes" } },
      { title: { ko: "기계공학 분야의 연구개발 협력이 필요한 기업", en: "Companies requiring research and development collaboration in mechanical engineering" } },
      { title: { ko: "새로운 기술 적용을 위한 전문가 검토가 필요한 기업", en: "Companies needing expert review for applying new technology" } },
      { title: { ko: "산학 공동연구 가능성을 검토하고 싶은 기업", en: "Companies wishing to explore industry-academia joint research" } },
    ] satisfies SocialChallengeItem[],
    notice: {
      ko: "지원 범위와 협력 진행 여부는 접수 내용과 연구 분야의 적합성을 검토한 후 결정됩니다.",
      en: "The scope of support and whether collaboration proceeds are determined after reviewing the submission and its fit with the research area.",
    },
  },
  process: {
    title: {
      ko: "진행 절차",
      en: "Process",
    },
    items: [
      {
        number: "01",
        title: { ko: "기술 애로사항 접수", en: "Submit a Technical Challenge" },
        description: { ko: "기업이 기술적 애로사항과 해결이 필요한 내용을 신청서로 제출합니다.", en: "A company submits its technical challenge and the issue requiring resolution through the application form." },
      },
      {
        number: "02",
        title: { ko: "내용 검토 및 연구자 연결", en: "Review and Researcher Connection" },
        description: { ko: "접수된 내용을 검토하고 관련 분야 교수 또는 연구그룹과의 연결 가능성을 확인합니다.", en: "We review the submission and check the possibility of connecting it with faculty or research groups in relevant fields." },
      },
      {
        number: "03",
        title: { ko: "연구개발 계획 협의", en: "Discuss a Research and Development Plan" },
        description: { ko: "기업과 연구자가 문제의 범위, 연구 방법 및 협력 가능성을 협의합니다.", en: "The company and researchers discuss the problem scope, research methods, and collaboration possibilities." },
      },
      {
        number: "04",
        title: { ko: "연구 협력 진행", en: "Proceed with Research Collaboration" },
        description: { ko: "협의 결과에 따라 기술지원, 공동연구 또는 후속 연구개발을 진행합니다.", en: "Depending on the discussion outcome, technical support, joint research, or follow-up research and development may proceed." },
      },
    ] satisfies SocialChallengeItem[],
  },
  application: {
    label: { ko: "사회난제 신문고 신청하기", en: "Apply for Social Challenge Support" },
    note: { ko: "Google Forms 신청서로 이동합니다.", en: "Opens the Google Forms application." },
    url: "https://docs.google.com/forms/d/e/1FAIpQLSea44Y6XTPfWXrMX5gGGZGpx2-2Z3DF1IDih2cp9jCeqH2MbA/viewform",
  },
  preparation: {
    title: { ko: "신청 전 준비사항", en: "Prepare Before Applying" },
    items: [
      { title: { ko: "기업명과 담당자 연락처", en: "Company name and contact information" } },
      { title: { ko: "해결이 필요한 기술적 문제", en: "Technical problem that needs resolution" } },
      { title: { ko: "현재까지 시도한 해결 방법", en: "Solutions attempted so far" } },
      { title: { ko: "필요한 지원 또는 협력 범위", en: "Requested support or collaboration scope" } },
      { title: { ko: "관련 참고자료", en: "Relevant reference materials" } },
    ] satisfies SocialChallengeItem[],
  },
} as const;
