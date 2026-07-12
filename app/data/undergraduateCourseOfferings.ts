export type UndergraduateCourseCategory = "university-core" | "required" | "elective";

export type UndergraduateCourseOffering = {
  id: string;
  years: number[];
  semester: 1 | 2 | null;
  category: UndergraduateCourseCategory;
  categoryCode: "대교" | "전필" | "전선";
  courseCode: string;
  nameKo: string;
  nameEn: string | null;
  credits: number;
  lectureHours: number;
  practiceHours: number;
  reviewNote: string | null;
};

const course = (
  id: string,
  years: number[],
  semester: 1 | 2 | null,
  category: UndergraduateCourseCategory,
  categoryCode: UndergraduateCourseOffering["categoryCode"],
  courseCode: string,
  nameKo: string,
  credits: number,
  lectureHours: number,
  practiceHours: number,
  nameEn: string | null = null,
  reviewNote: string | null = null,
): UndergraduateCourseOffering => ({ id, years, semester, category, categoryCode, courseCode, nameKo, nameEn, credits, lectureHours, practiceHours, reviewNote });

export const undergraduateCourseOfferings: UndergraduateCourseOffering[] = [
  course("mat1011-1-1", [1], 1, "university-core", "대교", "MAT1011", "공학수학(1)", 3, 3, 1),
  course("phy1011-1-1", [1], 1, "university-core", "대교", "PHY1011", "공학물리학및실험(1)", 3, 2, 2),
  course("che1011-1-1", [1], 1, "university-core", "대교", "CHE1011", "공학화학및실험(1)", 3, 2, 2),
  course("meu2300-1-1", [1], 1, "required", "전필", "MEU2300", "기계공학창의설계", 3, 2, 2, "Creative Thinking in Mechanical Engineering"),
  course("mat1012-1-2", [1], 2, "university-core", "대교", "MAT1012", "공학수학(2)", 3, 3, 1),
  course("phy1012-1-2", [1], 2, "university-core", "대교", "PHY1012", "공학물리학및실험(2)", 3, 2, 2),
  course("che1012-1-2", [1], 2, "university-core", "대교", "CHE1012", "공학화학및실험(2)", 3, 2, 2),
  course("eng1108-2-1", [2], 1, "university-core", "대교", "ENG1108", "공학정보처리", 3, 2, 2),
  course("mat2016-2-1", [2], 1, "university-core", "대교", "MAT2016", "공학수학(3)", 3, 3, 1),
  course("meu2600-2-1", [2], 1, "required", "전필", "MEU2600", "고체역학", 3, 3, 0, "Mechanics of Materials"),
  course("meu2610-2-1", [2], 1, "required", "전필", "MEU2610", "열역학", 3, 3, 0, "Thermodynamics"),
  course("meu2620-2-1", [2], 1, "elective", "전선", "MEU2620", "컴퓨터응용기계설계", 3, 2, 2, "Computer-aided Mechanical Engineering Design"),
  course("mat2017-2-2", [2], 2, "university-core", "대교", "MAT2017", "공학수학(4)", 3, 3, 1),
  course("meu2640-2-2", [2], 2, "required", "전필", "MEU2640", "유체역학", 3, 3, 0, "Fluid Mechanics"),
  course("meu2650-2-2", [2], 2, "required", "전필", "MEU2650", "동역학", 3, 3, 0, "Dynamics"),
  course("meu2104-2-2", [2], 2, "required", "전필", "MEU2104", "기계공학실험(1)", 3, 1, 2, "Mechanical Engineering Laboratory I"),
  course("meu3003-34-1", [3, 4], 1, "elective", "전선", "MEU3003", "공학수치해석", 3, 3, 0, "Engineering Numerical Analysis"),
  course("mat2013-34-1", [3, 4], 1, "elective", "전선", "MAT2013", "확률통계", 3, 3, 1, "Probability and Statistics"),
  course("meu3005-34-1", [3, 4], 1, "required", "전필", "MEU3005", "기계공학실험(2)", 3, 1, 2, "Mechanical Engineering Laboratory II"),
  course("meu3670-34-1", [3, 4], 1, "elective", "전선", "MEU3670", "기계진동", 3, 3, 0, "Mechanical Vibration"),
  course("meu3650-34-1", [3, 4], 1, "elective", "전선", "MEU3650", "열전달", 3, 3, 0, "Heat Transfer"),
  course("meu3620-34-1", [3, 4], 1, "elective", "전선", "MEU3620", "생산공학", 3, 3, 0, "Manufacturing Process"),
  course("meu3002-34-1", [3, 4], 1, "elective", "전선", "MEU3002", "메카니즘설계", 3, 3, 0, "Mechanism Design"),
  course("meu3004-34-1", [3, 4], 1, "elective", "전선", "MEU3004", "바이오의료기계", 3, 3, 0, "Biomedical Mechanical Engineering"),
  course("meu3010-34-1", [3, 4], 1, "elective", "전선", "MEU3010", "마이크로기계시스템", 3, 3, 0, "Microsystems for Mechanical Engineering"),
  course("meu3640-34-1", [3, 4], 1, "elective", "전선", "MEU3640", "응용유체역학", 3, 3, 0, "Applied Fluid Mechanics"),
  course("meu3301-34-1", [3, 4], 1, "elective", "전선", "MEU3301", "재료거동학", 3, 3, 0, "Mechanical Behaviors of Materials"),
  course("meu3015-34-1", [3, 4], 1, "elective", "전선", "MEU3015", "전자기학및응용", 3, 3, 0, "Electromagnetics and Applications"),
  course("meu3001-34-1", [3, 4], 1, "elective", "전선", "MEU3001", "환경기계공학", 3, 3, 0),
  course("meu3006-34-1", [3, 4], 1, "elective", "전선", "MEU3006", "학부연구(1)", 1, 1, 1, "Undergraduate Independent Study I"),
  course("meu3630-34-2", [3, 4], 2, "elective", "전선", "MEU3630", "기계요소설계", 3, 3, 0, "Design of Machine Element"),
  course("meu3600-mechanics-34-2", [3, 4], 2, "elective", "전선", "MEU3600", "응용고체역학", 3, 3, 0, "Advanced Mechanics of Materials"),
  course("meu3610-34-2", [3, 4], 2, "elective", "전선", "MEU3610", "응용열역학", 3, 3, 0, "Applied Thermodynamics"),
  course("meu3690-34-2", [3, 4], 2, "elective", "전선", "MEU3690", "메카트로닉스", 3, 3, 1, null, "상세 설명에는 MEU3014로 표기되어 있어 공식 확인 필요."),
  course("meu3680-34-2", [3, 4], 2, "elective", "전선", "MEU3680", "기계시스템제어", 3, 3, 0, "Mechanical System Control"),
  course("meu3700-34-2", [3, 4], 2, "elective", "전선", "MEU3700", "생체역학", 3, 3, 0, "Biomechanics"),
  course("meu3600-materials-34-2", [3, 4], 2, "elective", "전선", "MEU3600", "공학재료", 3, 3, 0, null, "상세 설명에는 MEU3660으로 표기되어 있어 공식 확인 필요."),
  course("meu3012-34-2", [3, 4], 2, "elective", "전선", "MEU3012", "광공학", 3, 3, 0, "Optical Engineering"),
  course("meu3013-34-2", [3, 4], 2, "elective", "전선", "MEU3013", "정형생산시스템", 3, 3, 0, "Net-Shaped Manufacturing System"),
  course("meu3011-34-2", [3, 4], 2, "elective", "전선", "MEU3011", "에너지동력공학", 3, 3, 0, "Energy and Power Engineering"),
  course("meu3710-34-2", [3, 4], 2, "elective", "전선", "MEU3710", "나노기계공학", 3, 3, 0, "Nano Mechanical Engineering"),
  course("meu3801-34-2", [3, 4], 2, "elective", "전선", "MEU3801", "컴퓨터해석기반설계", 3, 2, 2, "Computational Analysis Based Design"),
  course("meu3007-34-2", [3, 4], 2, "elective", "전선", "MEU3007", "학부연구(2)", 1, 1, 1, "Undergraduate Independent Study II"),
  course("meu4300-4-1", [4], 1, "required", "전필", "MEU4300", "창의제품설계", 3, 4, 2, "Creative Product Design"),
  course("meu4400-4-1", [4], 1, "required", "전필", "MEU4400", "연구논문", 3, 3, 0, "Undergraduate Thesis"),
  course("meu4001-4-1", [4], 1, "elective", "전선", "MEU4001", "기계공학세미나(1)", 3, 3, 0, "Mechanical Engineering Seminar I"),
  course("meu4300-4-2", [4], 2, "required", "전필", "MEU4300", "창의제품설계", 3, 4, 2, "Creative Product Design"),
  course("meu4400-4-2", [4], 2, "required", "전필", "MEU4400", "연구논문", 3, 3, 0, "Undergraduate Thesis"),
  course("meu4002-4-2", [4], 2, "elective", "전선", "MEU4002", "기계공학세미나(2)", 3, 3, 0, "Mechanical Engineering Seminar II"),
  course("meu2001-234-null", [2, 3, 4], null, "elective", "전선", "MEU2001", "스페셜 토픽", 1, 1, 0, null, "원본에서 학기가 명확하지 않아 공식 확인 필요."),
];
