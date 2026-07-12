export type DepartmentHistoryEntry = {
  id: string;
  date: string;
  year: number;
  month: number;
  title: string;
  category?: string;
  highlight?: boolean;
};

export const departmentHistoryMeta = {
  sectionId: "department-history",
  reviewNote: "비정규 입학 문구 원문 확인 필요",
};

export const departmentHistory: DepartmentHistoryEntry[] = [
  { id: "2020-bk21", date: "2020. 08.", year: 2020, month: 8, title: "4단계 BK21 사업 선정", highlight: true },
  { id: "2016-bk21-plus", date: "2016. 03.", year: 2016, month: 3, title: "3단계 BK21 플러스 사업단 협약 체결" },
  { id: "2010-anniversary", date: "2010. 11.", year: 2010, month: 11, title: "기계공학과 창립 50주년", highlight: true },
  { id: "2003-abeek", date: "2003. 03.", year: 2003, month: 3, title: "ABEEK 인증 프로그램 가입" },
  { id: "2002-independent-department", date: "2002. 03.", year: 2002, month: 3, title: "기계전자공학부에서 기계공학부로 분리 독립 (현 입학정원 180명)" },
  { id: "1999-program-integration", date: "1999. 03.", year: 1999, month: 3, title: "기계공학과와 기계설계학과를 기계공학전공으로 통합" },
  { id: "1996-mechatronics-integration", date: "1996. 03.", year: 1996, month: 3, title: "기전 공학부로 통합" },
  { id: "1980-industrial-graduate-program", date: "1980. 03.", year: 1980, month: 3, title: "산업대학원 산업기계전공이 기계공학 전공으로 전공명칭 변경" },
  { id: "1974-industrial-mechanics", date: "1974. 01.", year: 1974, month: 1, title: "산업대학원에 산업기계 전공 신설" },
  { id: "1972-doctoral-program", date: "1972. 03.", year: 1972, month: 3, title: "본과 대학원 박사과정 신설" },
  { id: "1972-industrial-mechanics", date: "1972. 01.", year: 1972, month: 1, title: "산업대학원에 산업기계 전공 신설" },
  { id: "1971-masters-program", date: "1971. 03.", year: 1971, month: 3, title: "본과 대학원 석사과정 신설" },
  { id: "1964-first-graduates", date: "1964. 02.", year: 1964, month: 2, title: "이공대학 공학부 기계공학과 첫 졸업생 졸업" },
  { id: "1963-first-admission", date: "1963. 02.", year: 1963, month: 2, title: "이공대학 공학부 기계공학과 첫 신입생 입학" },
  { id: "1962-department-separation", date: "1962. 12.", year: 1962, month: 12, title: "이공대학 공학부 기계공학과로 분리" },
  { id: "1960-first-admission", date: "1960. 03.", year: 1960, month: 3, title: "이공대학 건설공학과 첫 신입생 입학" },
  { id: "1958-department-founded", date: "1958. 12.", year: 1958, month: 12, title: "이공대학 건설공학과 신설", highlight: true },
];
