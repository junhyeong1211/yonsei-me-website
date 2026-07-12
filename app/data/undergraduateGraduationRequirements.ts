export type VerificationStatus = "verified" | "needs-review";

export type CreditSummaryItem = {
  id: string;
  label: string;
  value: string;
  emphasis?: "major" | "total";
};

export type MajorTypeSummary = {
  id: "single-major" | "transfer" | "graduating-double-major";
  label: string;
  items: CreditSummaryItem[];
};

export type RequirementCourse = {
  nameKo: string;
  credits: number | null;
  courseCode?: string;
  reviewNote?: string;
};

export type CurriculumSection = {
  id: string;
  title: string;
  creditRequirement: string;
  description?: string;
  items: RequirementCourse[];
  notes?: string[];
};

export type NoticeGroup = {
  id: string;
  title: string;
  items: string[];
};

export type AdditionalProgramRequirement = {
  id: "double-major" | "minor";
  title: string;
  rows: { admissionYear: string; required: string; elective: string; total: string }[];
  requiredCourses: { title: string; description: string; items?: string[] }[];
};

export type UndergraduateGraduationRequirement = {
  admissionYear: "2025" | "2024" | "previous";
  label: string;
  verificationStatus: VerificationStatus;
  reviewNote: string | null;
  creditSummary: MajorTypeSummary[];
  curriculumSections: CurriculumSection[];
  noticeGroups: NoticeGroup[];
  additionalPrograms: AdditionalProgramRequirement[];
};

const summary = (id: MajorTypeSummary["id"], label: string, values: [string, string, ("major" | "total")?][]): MajorTypeSummary => ({
  id,
  label,
  items: values.map(([itemId, value, emphasis]) => ({
    id: itemId,
    label: {
      foundation: "교양기초",
      liberalElective: "대학교양 선택",
      liberalRequired: "대학교양 필수",
      basicEducation: "기초교육",
      liberalSubtotal: "교양 소계",
      majorFoundation: "전공기초",
      majorRequired: "전공필수",
      majorElective: "전공선택",
      majorSubtotal: "전공 소계",
      total: "총 이수학점",
      upperLevel: "3000·4000단위",
    }[itemId] ?? itemId,
    value,
    emphasis,
  })),
});

const course = (nameKo: string, credits: number | null, courseCode?: string, reviewNote?: string): RequirementCourse => ({ nameKo, credits, courseCode, reviewNote });

export const undergraduateGraduationRequirements: UndergraduateGraduationRequirement[] = [
  {
    admissionYear: "2025",
    label: "2025학번",
    verificationStatus: "verified",
    reviewNote: "원문의 ‘3~4천 단위’, ‘3,4000단위’ 표기는 3000·4000단위로 정리해 표시함. 공식 원문 확인 필요.",
    creditSummary: [
      summary("single-major", "단일전공", [
        ["foundation", "8학점"], ["liberalElective", "12학점"], ["liberalRequired", "27학점"], ["basicEducation", "2학점"], ["liberalSubtotal", "49학점"], ["majorFoundation", "해당 없음"], ["majorRequired", "24학점"], ["majorElective", "36학점"], ["majorSubtotal", "60학점", "major"], ["total", "130학점", "total"], ["upperLevel", "45학점"],
      ]),
      summary("transfer", "학사편입", [
        ["foundation", "1학점"], ["liberalElective", "해당 없음"], ["liberalRequired", "27학점"], ["basicEducation", "해당 없음"], ["liberalSubtotal", "28학점"], ["majorFoundation", "해당 없음"], ["majorRequired", "24학점"], ["majorElective", "36학점"], ["majorSubtotal", "60학점", "major"], ["total", "88학점", "total"], ["upperLevel", "이수 의무 없음"],
      ]),
      summary("graduating-double-major", "졸업예정자 복수전공", [
        ["foundation", "해당 없음"], ["liberalElective", "해당 없음"], ["liberalRequired", "21학점"], ["basicEducation", "해당 없음"], ["liberalSubtotal", "21학점"], ["majorFoundation", "해당 없음"], ["majorRequired", "24학점"], ["majorElective", "36학점"], ["majorSubtotal", "60학점", "major"], ["total", "81학점", "total"], ["upperLevel", "이수 의무 없음"],
      ]),
    ],
    curriculumSections: [
      {
        id: "foundation",
        title: "교양기초",
        creditRequirement: "필수 8학점",
        items: [course("채플", 2), course("글쓰기", 3), course("기독교의 이해", 3)],
        notes: ["채플은 4학기 이수"],
      },
      {
        id: "liberal-elective",
        title: "대학교양",
        creditRequirement: "선택 12학점",
        description: "다음 6개 영역 중 4개 영역을 필수 이수",
        items: [course("문학과예술", null), course("인간과역사", null), course("언어와표현", null), course("가치와윤리", null), course("국가와사회", null), course("지역과세계", null)],
      },
      {
        id: "liberal-required",
        title: "대학교양",
        creditRequirement: "필수 27학점",
        description: "논리와수리, 자연과우주, 생명과환경, 정보와기술 영역으로 이수 처리",
        items: [
          course("공학수학(1)", 3, "MAT1011"), course("공학수학(2)", 3, "MAT1012"), course("공학수학(3)", 3, "MAT2016"), course("공학수학(4)", 3, "MAT2017"), course("공학정보처리", 3, "ENG1108"), course("공학물리학및실험(1)", 3, "PHY1011"), course("공학물리학및실험(2)", 3, "PHY1012"), course("공학화학및실험(1)", 3, "CHE1011"), course("공학화학및실험(2)", 3, "CHE1012"),
        ],
      },
      {
        id: "basic-education",
        title: "기초교육",
        creditRequirement: "필수 2학점",
        items: [course("Yonsei RC101", 1), course("사회참여", 1)],
      },
      {
        id: "major-required",
        title: "전공필수",
        creditRequirement: "24학점",
        items: [
          course("고체역학", 3, "MEU2600"), course("열역학", 3, "MEU2610"), course("동역학", 3, "MEU2650"), course("유체역학", 3, "MEU2640"), course("기계공학실험(1)", 3, "MEU2104"), course("기계공학실험(2)", 3, "MEU3005"), course("창의제품설계", 3, "MEU4300"), course("연구논문", 3, "MEU4400"),
        ],
      },
      {
        id: "major-elective",
        title: "전공선택",
        creditRequirement: "36학점 이상",
        items: [
          course("응용고체역학", 3, "MEU3600"), course("환경기계공학", 3, "MEU3001"), course("공학재료", 3, "MEU3600", "상세 데이터에는 MEU3660으로 표기되어 있어 공식 확인 필요."), course("재료거동학", 3, "MEU3301"), course("광공학", 3, "MEU3012"), course("기계요소설계", 3, "MEU3630"), course("기계진동", 3, "MEU3670"), course("메카니즘설계", 3, "MEU3002"), course("메카트로닉스", 3, "MEU3690", "상세 데이터에는 MEU3014로 표기되어 있어 공식 확인 필요."), course("컴퓨터응용기계설계", 3, "MEU2620"), course("생산공학", 3, "MEU3620"), course("에너지동력공학", 3, "MEU3011"), course("열전달", 3, "MEU3650"), course("응용열역학", 3, "MEU3610"), course("응용유체역학", 3, "MEU3640"), course("정형생산시스템", 3, "MEU3013"), course("전자기학및응용", 3, "MEU3015"), course("기계시스템제어", 3, "MEU3680"), course("나노기계공학", 3, "MEU3710"), course("마이크로기계시스템", 3, "MEU3010"), course("바이오의료기계", 3, "MEU3004"), course("생체역학", 3, "MEU3700"), course("컴퓨터해석기반설계", 3, "MEU3801"), course("기계공학세미나", 3, "MEU4001", "2025학년도 2학기 기계공학세미나 개편 내용은 최신 교과목 데이터와 대조 필요."), course("스페셜 토픽", 1, "MEU2001"), course("학부연구(1)", 1, "MEU3006"), course("학부연구(2)", 1, "MEU3007"), course("학부연구(3)", 1, "MEU3008"), course("학부연구(4)", 1, "MEU3009"), course("공학수치해석", 3, "MEU3003"), course("확률통계", 3, "MAT2013"),
        ],
      },
      {
        id: "general-elective",
        title: "일반선택",
        creditRequirement: "21학점",
        items: [],
      },
      {
        id: "total",
        title: "총 이수학점",
        creditRequirement: "130학점",
        items: [],
      },
    ],
    noticeGroups: [
      {
        id: "admission-and-liberal",
        title: "입학연도 및 교양 관련",
        items: [
          "20·21·22학번은 사회참여(SE) 이수 의무가 없음", "20학번 이후 학생은 대학영어Ⅰ, 대학영어Ⅱ 이수 의무가 없음", "19학번 이후 학생은 공학물리학및실험(1), (2), 공학화학및실험(1), (2)를 이수해야 함", "10학번 이후 학생은 대학교양 10개 영역 중 8개 영역 이상 이수", "22학번 이후 학생은 대학교양의 문학과예술, 인간과역사, 언어와표현, 가치와윤리, 국가와사회, 지역과세계 중 4개 영역 필수 이수", "18학번 이후 RC 이수요건: 사회참여와 Yonsei RC101 총 2학점", "13~17학번 RC 이수요건: Holistic Education(1), (2), (3) 중 2과목과 Yonsei RC101을 포함해 총 3학점", "15학번부터 채플 1회에 0.5학점 부여", "10학번부터 공학화학및실험은 자연과우주 또는 생명과환경 중 한 영역으로 인정",
        ],
      },
      {
        id: "major-and-upper-level",
        title: "전공 및 고급과목 관련",
        items: [
          "03학번 이후 학생은 3000·4000단위 과목에서 45학점 이상 이수해야 함", "대학원 과목은 4000단위로 인정", "학사편입 및 졸업예정자 복수전공은 3000·4000단위 이수 의무가 없음", "미래설계공학(1), 현재 우리마을리빙랩: 10학번부터 전공선택 3학점, 설계 1학점으로 인정", "공학인증과정 대상자는 설계학점 이수 필요: 03~12학번 18학점 이상, 13학번 이후 12학점 이상",
        ],
      },
      {
        id: "duplicate-and-restrictions",
        title: "교과목 중복 및 수강 제한",
        items: [
          "동일 학기에 동일 교수 연구실에서 수행한 하나의 연구결과물로 학부연구와 연구논문 두 과목의 학점을 동시에 인정하지 않음", "2025학년도 1학기부터 학부연구(MEU3006~MEU3009)와 연구논문(MEU4400)은 동일 학기 수강 불가", "동시에 수강할 경우 한 과목만 성적 인정", "2025학년도 2학기부터 기계공학세미나(1)은 폐강", "기계공학세미나(2)는 기계공학세미나로 명칭 변경 예정", "19학번 이후 학생이 기계공학세미나(1), (2)를 모두 수강할 경우 한 과목만 전공선택으로 인정하고 나머지는 일반선택으로 계산", "스페셜 토픽, 구 주니어 세미나는 재학 중 총 3회, 3학점까지 수강 가능",
        ],
      },
    ],
    additionalPrograms: [
      {
        id: "double-major",
        title: "복수전공",
        rows: [
          { admissionYear: "06~09학번", required: "9학점", elective: "31학점", total: "40학점" },
          { admissionYear: "10학번 이후", required: "9학점", elective: "27학점", total: "36학점" },
        ],
        requiredCourses: [
          { title: "19학번 이전 복수전공자·부전공자", description: "필수 이수과목", items: ["기계공학창의설계", "창의설계프로젝트(2)", "창의제품설계(종합설계)"] },
          { title: "19학번 이후, 19학번 포함 복수전공자·부전공자", description: "열역학, 고체역학, 유체역학, 동역학 중 최소 3과목, 9학점 이상 수강" },
          { title: "졸업예정자 복수전공", description: "전공필수·전공선택 60학점과 필수교양 21학점 이수", items: ["논리와수리", "자연과우주", "생명과환경"] },
        ],
      },
      {
        id: "minor",
        title: "부전공",
        rows: [{ admissionYear: "06학번 이후", required: "9학점", elective: "12학점", total: "21학점" }],
        requiredCourses: [
          { title: "19학번 이전 복수전공자·부전공자", description: "필수 이수과목", items: ["기계공학창의설계", "창의설계프로젝트(2)", "창의제품설계(종합설계)"] },
          { title: "19학번 이후, 19학번 포함 복수전공자·부전공자", description: "열역학, 고체역학, 유체역학, 동역학 중 최소 3과목, 9학점 이상 수강" },
        ],
      },
    ],
  },
  {
    admissionYear: "2024",
    label: "2024학번",
    verificationStatus: "needs-review",
    reviewNote: "2024학번 별도 졸업이수요건표가 제공되지 않아 공식 자료 확인 필요.",
    creditSummary: [],
    curriculumSections: [],
    noticeGroups: [],
    additionalPrograms: [],
  },
  {
    admissionYear: "previous",
    label: "이전 학번 안내",
    verificationStatus: "needs-review",
    reviewNote: "이전 학번별 세부 학점표는 제공되지 않았음. 화면에는 입학연도별 주요 유의사항만 제공.",
    creditSummary: [],
    curriculumSections: [],
    noticeGroups: [],
    additionalPrograms: [],
  },
];

export const getUndergraduateGraduationRequirement = (admissionYear: UndergraduateGraduationRequirement["admissionYear"]) =>
  undergraduateGraduationRequirements.find((item) => item.admissionYear === admissionYear) ?? undergraduateGraduationRequirements[0];
