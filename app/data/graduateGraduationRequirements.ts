export type GraduateRequirementTable = {
  id: string;
  title: string;
  columns: string[];
  rows: string[][];
};

export type GraduateRequirementGroup = {
  title: string;
  items: string[];
};

export type GraduateGraduationRequirementSection = {
  sectionId: string;
  step: string;
  title: string;
  titleEn: string;
  summary: string | null;
  requirementGroups: GraduateRequirementGroup[];
  tables: GraduateRequirementTable[];
  notes: string[];
  applicableFrom: string | null;
  reviewNote: string | null;
};

const table = (id: string, title: string, columns: string[], rows: string[][]): GraduateRequirementTable => ({ id, title, columns, rows });
const group = (title: string, items: string[]): GraduateRequirementGroup => ({ title, items });

export const graduateGraduationRequirements: GraduateGraduationRequirementSection[] = [
  {
    sectionId: "advisor",
    step: "01",
    title: "지도교수 배정",
    titleEn: "Advisor Assignment",
    summary: "입학 후 학과가 정한 기간 내에 지도교수를 정하고 승인 절차를 완료해야 합니다.",
    requirementGroups: [
      group("대상", ["석사과정, 석·박사 통합과정 및 박사과정 신입생은 입학 시 학과에서 정한 기간 내 지도교수를 정해야 함"]),
      group("절차", ["교수와의 개별 접촉 및 면담을 통해 지도교수를 결정", "학과 소정양식에 지도교수 승인을 받은 뒤 주임교수에게 제출하여 최종 승인"]),
    ],
    tables: [],
    notes: [],
    applicableFrom: null,
    reviewNote: null,
  },
  {
    sectionId: "credits",
    step: "02",
    title: "수업 및 이수학점",
    titleEn: "Coursework and Credits",
    summary: "과정과 입학 시기에 따라 최소 졸업학점과 기계공학과 강의과목 이수 기준이 달라집니다.",
    requirementGroups: [
      group("공통 요건", ["최소 졸업학점 충족", "총 평량평균 3.0/4.3 이상", "2026년 1학기 이후 입학자는 학위논문연구과목 학점을 최소 졸업학점에 포함할 수 없음"]),
      group("2025년 2학기 이후 입학자의 기계공학과 강의과목 이수요건", ["석사과정: 12학점 이상", "박사과정: 12학점 이상", "석·박사 통합과정: 18학점 이상", "본교 기계공학과 석사학위 취득 후 박사과정 입학자는 통합과정 기준을 준용하며 석사과정 이수과목 인정"]),
      group("기계공학과 개설 강의과목의 의미", ["기계공학과 전공강의 과목", "기계공학세미나 제외", "대학원에서의 연구 제외", "학위논문연구과목 제외"]),
      group("기타 수강 관련", ["타 전공 입학생의 보충과목은 주임교수가 지도교수와 협의해 결정", "석사·박사과정 세미나 과목: 최대 2강좌", "통합과정 세미나 과목: 최대 3강좌", "학위과정 수료에 필요한 총평량평균: 3.0 이상"]),
    ],
    tables: [
      table("minimum-credits", "최소 졸업학점", ["과정", "2026년 1학기 이후 입학자", "2026년 이전 입학자"], [
        ["석사과정", "27학점", "30학점"],
        ["박사과정", "27학점", "30학점"],
        ["석·박사 통합과정", "48학점", "54학점"],
      ]),
    ],
    notes: [],
    applicableFrom: "2025년 2학기 이후 입학자 기계공학과 강의과목 이수요건 포함",
    reviewNote: "‘2026년 이전 입학자’의 정확한 적용 범위는 최신 학사요람 확인 필요.",
  },
  {
    sectionId: "required-courses",
    step: "03",
    title: "필수 교과목",
    titleEn: "Required Courses",
    summary: "대학원에서의연구와 연구윤리 과목의 적용 시점 및 인정 과목을 확인합니다.",
    requirementGroups: [],
    tables: [
      table("graduate-required-courses", "대학원 필수 교과목", ["학정번호", "과목명", "학점", "개설전공", "비고"], [
        ["MEU5055", "대학원에서의연구", "1학점", "기계공학과", "2021학년도 1학기 입학생부터 필수 · 매년 1학기 개설"],
        ["YSG6003 또는 YSG6004", "연구윤리", "0학점", "일반대학원 공통", "기계공학과 전체 대학원생 필수 · 본교 석사 졸업 후 박사 진학자도 필수"],
      ]),
    ],
    notes: ["2021학년도 2학기 이전 입학자는 공학윤리와연구방법론(ENG6060) 또는 연구윤리(ENG6100)도 인정"],
    applicableFrom: "MEU5055: 2021학년도 1학기 입학생부터",
    reviewNote: null,
  },
  {
    sectionId: "comprehensive-exam",
    step: "04",
    title: "종합시험",
    titleEn: "Comprehensive Examination",
    summary: "학과가 주관하며, 과정별 권장 응시 시기와 재응시 제한을 확인해야 합니다.",
    requirementGroups: [
      group("공통", ["학과에서 주관", "학사일정을 고려해 한 학기에 1회 개최", "학위과정 중 3회 이상 불합격하면 논문예비심사를 받을 수 없으며 학위과정에서 제적"]),
      group("석사과정", ["2학기 종료 시점 이내 첫 종합시험 응시", "세부 구성 및 채점기준은 별도 규정 적용"]),
      group("박사과정", ["석사학위가 있는 박사과정 학생: 3학기 종료 시점 이내 첫 시험 응시 권장"]),
      group("석·박사 통합과정", ["5학기 종료 시점 이내 첫 시험 응시 권장", "석사과정 종합시험 없이 박사과정 규정 적용"]),
    ],
    tables: [],
    notes: [],
    applicableFrom: null,
    reviewNote: null,
  },
  {
    sectionId: "preliminary-thesis",
    step: "05",
    title: "학위논문 예비심사",
    titleEn: "Preliminary Thesis Review",
    summary: "종합시험과 외국어시험, 연구계획서 승인 여부를 확인한 뒤 예비심사를 진행합니다.",
    requirementGroups: [
      group("자격", ["종합시험 및 외국어시험 합격", "학위논문 연구계획서 승인"]),
      group("과정별 시기", ["석사과정: 연구계획서가 승인된 학기에 예비심사 가능", "박사과정: 연구계획서 승인 학기로부터 최소 한 학기 이후 예비심사 가능"]),
      group("심사 방식", ["학위논문에 대한 구두발표", "예비심사위원회가 합격 여부 결정"]),
      group("심사위원", ["석사학위논문: 3인", "박사학위논문: 5인", "석사 심사위원 중 1인까지 외부인사 가능", "박사 심사위원 중 2인까지 외부인사 가능"]),
      group("기타", ["박사·통합과정 예비심사는 공개 발표", "발표 일정 사전 공지", "박사·통합과정은 예비심사와 본심사를 동일 학기에 실시할 수 없음"]),
    ],
    tables: [],
    notes: [],
    applicableFrom: null,
    reviewNote: null,
  },
  {
    sectionId: "final-thesis",
    step: "06",
    title: "학위논문 본심사",
    titleEn: "Final Thesis Review",
    summary: "예비심사 합격과 학술활동 요건 충족 후 논문 본심사를 진행합니다.",
    requirementGroups: [
      group("자격", ["예비심사 합격", "학위논문 수정·보완", "학술활동 졸업요건 충족"]),
      group("심사 방식", ["학위논문 구두발표"]),
      group("심사위원", ["석사: 3인", "박사: 5인", "지도교수는 자동 심사위원", "석사 심사위원 중 1인까지 외부인사 가능", "박사 심사위원 중 2인까지 외부인사 가능"]),
      group("합격 기준", ["석사: 심사위원 2인 이상이 80점 이상", "박사: 심사위원 4인 이상이 80점 이상"]),
      group("불합격", ["1학기 이상 경과 후 재심사 가능", "재심사 불합격 시 더 이상 논문심사 불가", "수료생으로 학위과정 종료"]),
      group("학위논문 심사 기한", ["석사: 입학일로부터 4년 이내", "박사: 입학일로부터 7년 이내", "석·박사 통합: 입학일로부터 8년 이내"]),
      group("연장", ["수료요건 충족자에 한해 합당한 사유가 있으면 대학원장 재가를 통해 2년 연장 가능", "연장 기간에는 휴학할 수 없음"]),
    ],
    tables: [],
    notes: [],
    applicableFrom: null,
    reviewNote: null,
  },
  {
    sectionId: "english-exam",
    step: "07",
    title: "영어시험",
    titleEn: "English Proficiency",
    summary: "과정별 최소 공인영어 성적과 면제 가능 조건을 확인합니다.",
    requirementGroups: [],
    tables: [
      table("master-english", "석사과정 · 2014년 이후 입학", ["시험", "최소 점수"], [
        ["TOEFL PBT", "510"], ["TOEFL CBT", "200"], ["TOEFL iBT", "75"], ["TOEIC", "650"], ["TEPS", "540"], ["NEW TEPS", "291"], ["IELTS", "6.0"],
      ]),
      table("doctoral-english", "석·박사 통합과정 및 박사과정 · 2014년 이후 입학", ["시험", "최소 점수"], [
        ["TOEFL PBT", "560"], ["TOEFL CBT", "220"], ["TOEFL iBT", "83"], ["TOEIC", "720"], ["TEPS", "600"], ["NEW TEPS", "327"], ["IELTS", "6.4"],
      ]),
    ],
    notes: ["공인성적 유효기간과 대학원 재학기간이 일치해야 함", "본교 석사 출신이 박사 졸업 영어기준을 이미 충족한 경우 박사 진학 시 외국어시험 면제", "학부과정을 영어권에서 이수한 입학자도 외국어시험 면제 가능", "입학 후 관련 증빙 제출 필수"],
    applicableFrom: "2014년 이후 입학",
    reviewNote: "영어시험 면제 조건은 최신 학사요람 및 학과 내규 확인 필요.",
  },
  {
    sectionId: "research-activity",
    step: "08",
    title: "학술활동",
    titleEn: "Research Activity",
    summary: "학위논문 제출을 위해 학과가 정한 학술활동 요건을 충족해야 합니다.",
    requirementGroups: [
      group("학술활동 요건", ["석사·박사·석박사 통합과정 학생은 대학원이 인정하는 국내외 학술지와 학술대회를 통해 학술활동을 수행해야 함", "석사 및 박사 학위논문 제출을 위해 학과에서 정한 학술활동 요건 충족 필요", "구체적인 기준은 공식 학사요람과 학과 내규 확인 안내"]),
    ],
    tables: [],
    notes: [],
    applicableFrom: null,
    reviewNote: "학술활동 세부기준은 최신 학사요람 및 학과 내규 확인 필요.",
  },
  {
    sectionId: "other",
    step: "09",
    title: "기타",
    titleEn: "Other Requirements",
    summary: "정원외 입학생 적용 원칙과 최신 규정 확인 경로를 안내합니다.",
    requirementGroups: [
      group("기타 안내", ["군위탁 및 기타 정원외 입학생에게도 동일 요건 적용이 원칙", "대학원 세부운영내규에 명시되지 않은 사항은 대학원 학칙 및 내규를 따름", "자세한 사항은 대학원 공지사항 및 학사요람 확인"]),
    ],
    tables: [],
    notes: [],
    applicableFrom: null,
    reviewNote: null,
  },
];
