import type { UndergraduateCourseCategory } from "./undergraduateCourseOfferings";

export type UndergraduateCourseDetail = {
  courseCode: string;
  nameKo: string;
  nameEn: string | null;
  category: Exclude<UndergraduateCourseCategory, "university-core">;
  description: string;
  reviewNote: string | null;
};

const detail = (
  courseCode: string,
  nameKo: string,
  nameEn: string | null,
  category: UndergraduateCourseDetail["category"],
  description: string,
  reviewNote: string | null = null,
): UndergraduateCourseDetail => ({ courseCode, nameKo, nameEn, category, description, reviewNote });

export const undergraduateCourseDetails: UndergraduateCourseDetail[] = [
  detail("MEU2104", "기계공학실험(1)", "Mechanical Engineering Laboratory I", "required", "실험과 실습을 통하여 기계공학에 대한 깊이 있는 지식을 갖추며, 공학적인 문제의 정의, 실험의 수행 계획, 장비의 활용방법 및 실험 기술, 결과의 해석 및 보고서의 작성을 경험하는 것을 목표로 함. 실험 및 실습 주제에 대한 이론 강의와 학생이 직접 수행하는 실험 및 실습으로 이루어져 있음. 주제는 고체역학, 열역학, 생산공학 및 기초전자회로임."),
  detail("MEU2300", "기계공학창의설계", "Creative Thinking in Mechanical Engineering", "required", "창의적 공학설계를 통하여 기계공학의 근본이 되는 힘, 운동 및 에너지에 대하여 이해한다. 이와 관련된 대표적인 기술 및 응용사례에 대하여 알아본다. 개인별 또는 팀별 프로젝트 수행을 통하여 창의적 사고와 설계 능력을 배양한다."),
  detail("MEU2600", "고체역학", "Mechanics of Materials", "required", "고체역학에 필요한 정력학 개념(힘과 모멘트의 평형), 부정정 구조물 해석, 응력과 변형률, 여러 하중(축하중, 비틀림, 굽힘)에 따른 응력 및 변형률, 재료의 강도 및 이에 따른 설계, 보의 처짐을 다룬다."),
  detail("MEU2610", "열역학", "Thermodynamics", "required", "에너지 기본개념, 상태방정식과 순수물질의 성지, 밀폐시스템에서의 열역학 제1법칙 및 제2법칙, 개방시스템에서의 열역학 제1법칙 및 제2법칙, 증기동력사이클, 기체동력사이클을 다룬다.", "‘순수물질의 성지’는 ‘순수물질의 성질’ 가능성이 있어 공식 확인 필요."),
  detail("MEU2640", "유체역학", "Fluid Mechanics", "required", "유체의 정의, 정수력학, Bernoulli 식, 유체운동의 특성, 유한검사체적을 사용하는 적분형 유동방정식, Navier-Stokes 방정식 등 미분해석, 차원해석 등을 다룬다."),
  detail("MEU2650", "동역학", "Dynamics", "required", "질점의 운동학, 질점의 동역학, 질점계의 운동학, 질점계의 동역학, 강체의 운동학 및 동역학, 에너지, 운동량 등을 배운다."),
  detail("MEU3005", "기계공학실험(2)", "Mechanical Engineering Laboratory II", "required", "실험과 실습을 통하여 기계공학에 대한 깊이 있는 지식을 갖추며, 공학적인 문제의 정의, 실험의 수행 계획, 장비의 활용방법 및 실험 기술, 결과의 해석 및 보고서의 작성을 경험하는 것을 목표로 함. 실험 및 실습 주제에 대한 이론 강의와 학생이 직접 수행하는 실험 및 실습으로 이루어져 있음. 주제는 유체역학, 동역학, 열전달 및 기계진동학임."),
  detail("MEU4300", "창의제품설계", "Creative Product Design", "required", "제품개발을 위한 설계 및 기반 지식에 초점을 두며 팀 프로젝트를 통하여 경쟁력 있는 공학적 제품을 설계하고 시작품을 제작한다. 본 과목의 주요 내용은 제품개발과정, 고급설계기법, 프로젝트 경영, 마케팅 전략, 지적재산권, 제품홍보, 제품개발 case study 등이다."),
  detail("MEU4400", "연구논문", "Undergraduate Thesis", "required", "기계공학 주제에 대하여 학생 스스로 문제를 정의하고 분석하여 종합된 보고서(논문)를 작성하고 발표하는 능력을 배양한다."),

  detail("MEU2620", "컴퓨터응용기계설계", "Computer-aided Mechanical Engineering Design", "elective", "설계공학의 개요, CAD 및 3차원 솔리드모델링을 통한 도면작성, 공학제도의 방법, 정투상, 부투상, 단면법, 3차원 투영방법, 도면분석 및 관리, 공차해석, 기하공차, 형상공차, 시스템설계, 파라미터설계, 공차설계, CAD/CAM의 기초 등을 배운다."),
  detail("MEU3001", "환경기계공학", null, "elective", "수송기관, 발전소 및 산업체 등에서 배출되거나 실내 공간에 부유하는 가스상·입자상 유해물질의 종류를 살펴보고 환경규제 및 인체에 미치는 영향을 공부한다. 유해물질의 측정기기 및 저감기기의 작동 원리를 공부하고 이들 기기의 설계 이론을 습득한다."),
  detail("MEU3002", "메카니즘설계", "Mechanism Design", "elective", "좌표계, 속도해석, 가속도해석, 운동의 정의, 연쇄기구의 운동해석, 캠, 치차 및 치차열의 해석, 링크의 해석 및 합성을 다룬다."),
  detail("MEU3004", "바이오의료기계", "Biomedical Mechanical Engineering", "elective", "기계공학의 기초 지식과 이론을 바탕으로 유전자, 단백질, 세포 등의 생체 시스템을 이해하고 기계공학을 기반으로 한 의료용 진단 및 치료 기기 등의 원리에 대해 학습한다."),
  detail("MEU3006", "학부연구(1)", "Undergraduate Independent Study I", "elective", "교수 지도하에 기계공학 최신 주제 연구에 참여하여 전공에 대한 다양한 경험을 쌓고 심화된 기계공학 지식을 습득한다."),
  detail("MEU3007", "학부연구(2)", "Undergraduate Independent Study II", "elective", "교수 지도하에 기계공학 최신 주제 연구에 참여하여 전공에 대한 다양한 경험을 쌓고 심화된 기계공학 지식을 습득한다."),
  detail("MEU3008", "학부연구(3)", "Undergraduate Independent Study III", "elective", "교수 지도하에 기계공학 최신 주제 연구에 참여하여 전공에 대한 다양한 경험을 쌓고 심화된 기계공학 지식을 습득한다.", "개설 교과목 표에는 없고 상세 설명에만 존재함."),
  detail("MEU3009", "학부연구(4)", "Undergraduate Independent Study IV", "elective", "교수 지도하에 기계공학 최신 주제 연구에 참여하여 전공에 대한 다양한 경험을 쌓고 심화된 기계공학 지식을 습득한다.", "개설 교과목 표에는 없고 상세 설명에만 존재함."),
  detail("MEU3010", "마이크로기계시스템", "Microsystems for Mechanical Engineering", "elective", "마이크로 크기의 소자 제작 및 시스템에 대한 기초적 지식과 그 응용을 공부한다. 마이크로 스케일 구조의 가공방법, 마이크로 역학 및 그 응용에 관한 지식을 배운다."),
  detail("MEU3011", "에너지동력공학", "Energy and Power Engineering", "elective", "내연기관의 구조, 내연기관 관련 용어, 스파크점화기관과 압축점화기관의 비교, 흡기와 배기, 연료와 공기의 혼합, 점화와 연소, 배기가스 공해물질 배출, 열전달과 윤활, 진동, 내연기관 설계 및 열·유체역학 요약, 가스터빈 사이클, 원심·축류 압축기, 연소기, 원심·축류터빈, 터빈요소 성능 해석 및 시스템 구성을 배운다."),
  detail("MEU3012", "광공학", "Optical Engineering", "elective", "광학에 대한 기본 이론을 익히고, 기계공학 응용을 위한 광학계 이론과 광학장치에 대해서 공부한다. 레이저의 이론과 종류, 광공학과 첨단기술이 결합한 응용분야를 배운다."),
  detail("MEU3013", "정형생산시스템", "Net-Shaped Manufacturing System", "elective", "한 번의 공정으로 원하는 형상의 제품을 가공하는 가공방법 및 가공시스템에 대해 강의한다. 금형설계 및 가공방법, 다이캐스팅공정, 초정밀 금속성형, 폴리머 성형, 쾌속조형(RP) 등의 이론과 3D 공정시뮬레이션, 공정실습 및 현장견학 등을 병행한다."),
  detail("MEU3014", "메카트로닉스", "Mechatronics", "elective", "메카트로닉스 시스템의 개요, 구성 요소 및 설계에 대해서 배운다. 센서의 원리 및 사용, 아날로그·디지털 변환회로 원리와 응용, 컴퓨터와의 인터페이싱 기법 등을 강의하며 DC 모터의 제어를 포함한 실습을 수행한다.", "개설 교과목 표에는 MEU3690으로 표기되어 있어 공식 확인 필요."),
  detail("MEU3015", "전자기학및응용", "Electromagnetics and Applications", "elective", "기계공학도를 위한 전자기학의 물리적인 기본원리와 기계시스템 응용 지식을 학습한다. 전자기학의 기본 물리이론, 전기모터와 플라즈마 추진 등의 전자기 응용, 계산 전자기학의 기본 기술을 학습한다."),
  detail("MEU3301", "재료거동학", "Mechanical Behaviors of Materials", "elective", "응력 및 변형률 관계식, 재료거동에 대한 유변학 모델, 항복 및 파괴기준식, 파괴역학, 피로, 크립 등을 다룬다."),
  detail("MEU3600", "응용고체역학", "Advanced Mechanics of Materials", "elective", "고체역학의 기본 개념을 확장하여 보에 대한 응용이론, 비대칭 굽힘, 박판 보의 전단응력, 곡선보, 셀 구조이론, 두꺼운 실린더 및 디스크의 응력과 변형, 탄성안정론을 다룬다."),
  detail("MEU3610", "응용열역학", "Applied Thermodynamics", "elective", "에너지 변환 동력기기와 공기조화·냉동기기의 구체적인 작동 원리 및 이론을 학습한다. 열역학 관계식, 혼합기체의 성질, 온도 및 습도조절, 응축 및 이슬점, 화학반응과 연소, 열역학적 밸런스, 화학평형, 상평형 등을 공부한다."),
  detail("MEU3620", "생산공학", "Manufacturing Process", "elective", "기계 제품생산의 기초가 되는 주조, 성형, 절삭, 특수가공, 접합, 3D 프린팅 등 생산공정의 원리를 이해하고, 생산시스템 및 가공 자동화, 생산의 경제학에 대한 개념을 학습한다."),
  detail("MEU3630", "기계요소설계", "Design of Machine Element", "elective", "역학적 지식을 활용하여 기계부품과 시스템의 문제를 정의하고 설계하는 과정을 학습한다. 축, 베어링, 나사, 기어 등의 기계부품 해석 및 설계를 중심으로 새로운 설계 방법도 소개한다."),
  detail("MEU3640", "응용유체역학", "Applied Fluid Mechanics", "elective", "관로유동, 외부유동, 포텐셜 유동, Open Channel 유동, 압축성 유동, 유체기계 및 전산유체역학의 기초를 다룬다."),
  detail("MEU3650", "열전달", "Heat Transfer", "elective", "기계, 에너지, 전자 및 가전시스템의 설계·제작·운전·효율 향상에 필요한 열전달의 기본 원리 및 응용 방법을 학습한다. 열전도, 휜 해석, 비정상 열전도, 열전달 수치해석, 강제대류, 자연대류, 복사, 응축, 증발 및 비등 열전달, 열교환기, 전자장비·나노·바이오 열전달 등을 강의·토론·PBL 방식으로 배운다."),
  detail("MEU3660", "공학재료", "Engineering Materials", "elective", "소재의 물리적·화학적 기본원리를 공부하고 금속, 세라믹, 고분자, 반도체, 복합재료의 격자구조, 결함, 평형상태도, 철-탄소계 합금의 성질, 기계적·전기적·광학적 특성을 학습한다. 나노·바이오 및 신소재 응용에서 재료 선택과 설계방법을 습득한다.", "개설 교과목 표에는 MEU3600으로 표기되어 있어 공식 확인 필요."),
  detail("MEU3670", "기계진동", "Mechanical Vibration", "elective", "진동이라는 물리적 현상을 이해하고 동역학의 법칙을 활용하여 진동현상을 모델링하고 해석하는 방법을 배운다. 기계시스템의 진동 분석과 제어 방법, 기계설계에 반영하는 방법을 학습한다."),
  detail("MEU3680", "기계시스템제어", "Mechanical System Control", "elective", "제어계의 개요, 모델링 기법, 전달함수, 선형 시스템의 시간영역 및 주파수영역 특성, 상태방정식, 안정도 판별법, 신호 흐름도, 정상상태오차해석, 근궤적설계, 궤한제어, 제어계 설계를 배운다.", "‘궤한제어’는 ‘귀환제어’ 가능성이 있어 공식 확인 필요."),
  detail("MEU3700", "생체역학", "Biomechanics", "elective", "기계공학의 역학이론을 바탕으로 생체시스템의 작동 원리를 이해하고 기계공학적 해석 방법을 배운다. 세포역학, 혈류역학, 순환기 시스템, 호흡기 시스템, 근골격 시스템을 학습하고 조직공학 및 생체모방공학 등의 응용 기술을 배운다."),
  detail("MEU3710", "나노기계공학", "Nano Mechanical Engineering", "elective", "나노기술의 기본원리인 양자역학의 슈뢰딩거 운동방정식, 터널링, 불확정성 원리, 고체의 밴드 및 밴드갭 이론, 나노 열특성, 에너지 변환, 반도체 등의 개념을 습득하고 측정 및 공정기술의 기계공학 응용을 학습한다."),
  detail("MEU3801", "컴퓨터해석기반설계", "Computational Analysis Based Design", "elective", "기계공학 영역에서 컴퓨터 활용 능력을 강화하기 위한 과목으로, FEM·CFD 등 다양한 기계 분야에 적용 가능한 해석 기술과 기본 설계 이론을 학습한다."),
  detail("MEU4001", "기계공학세미나(1)", "Mechanical Engineering Seminar I", "elective", "기계공학도로서 필요한 교양, 직업윤리 의식, 공학 디자인, 공학 경영, 법률 및 특허 등을 세미나를 통하여 학습한다."),
  detail("MEU4002", "기계공학세미나(2)", "Mechanical Engineering Seminar II", "elective", "기계공학도로서 필요한 교양, 직업윤리 의식, 공학 디자인, 공학 경영, 법률 및 특허 등을 세미나를 통하여 학습한다."),
  detail("MEU3003", "공학수치해석", "Engineering Numerical Analysis", "elective", "공학문제의 수치적 해결방법으로 다양한 수치기법과 알고리즘을 다룬다. 컴퓨터의 수치계산 오차, 대수방정식의 근을 구하는 방법, 선형대수방정식의 해법, 최적화 방법, 커브피팅, 수치 미분·적분, 상미분방정식과 편미분방정식의 수치해석 방법을 다룬다."),
  detail("MAT2013", "확률통계", "Probability and Statistics", "elective", "불확실한 현상을 모형화하기 위해 이산형 및 연속형 확률변수의 특성을 다루며, 실험데이터를 이용한 모형 분석을 위해 기초 통계기법, 가설 검증, 단순 회귀분석 기법 등을 다룬다."),
];

export const requiredUndergraduateCourseDetails = undergraduateCourseDetails.filter((item) => item.category === "required");
export const electiveUndergraduateCourseDetails = undergraduateCourseDetails.filter((item) => item.category === "elective");

export const getUndergraduateCourseDetail = (courseCode: string, nameKo?: string) =>
  undergraduateCourseDetails.find((item) => item.courseCode === courseCode && (!nameKo || item.nameKo === nameKo));
