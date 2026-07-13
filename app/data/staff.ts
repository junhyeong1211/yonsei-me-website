export type AdministrativeStaff = {
  id: string;
  departmentKo: string;
  departmentEn: string | null;
  responsibilityKo: string;
  responsibilityEn: string | null;
  nameKo: string;
  nameEn: string | null;
  phone: string;
  officeKo: string;
  officeEn: string | null;
  email: string;
  displayOrder: number;
};

export const administrativeStaff: AdministrativeStaff[] = [
  {
    id: "nam-minhwa",
    departmentKo: "기계공학부 행정",
    departmentEn: null,
    responsibilityKo: "대학원",
    responsibilityEn: null,
    nameKo: "남민화",
    nameEn: null,
    phone: "02-2123-2810",
    officeKo: "제4공학관 D301호",
    officeEn: null,
    email: "nmh@yonsei.ac.kr",
    displayOrder: 1,
  },
  {
    id: "jeong-nagyeong",
    departmentKo: "기계공학부 행정",
    departmentEn: null,
    responsibilityKo: "학부 행정",
    responsibilityEn: null,
    nameKo: "정나경",
    nameEn: null,
    phone: "02-2123-4426",
    officeKo: "제4공학관 D301호",
    officeEn: null,
    email: "skyice@yonsei.ac.kr",
    displayOrder: 2,
  },
  {
    id: "lim-eunyeong",
    departmentKo: "BK21 교육연구단",
    departmentEn: null,
    responsibilityKo: "BK21 교육연구단",
    responsibilityEn: null,
    nameKo: "임은영",
    nameEn: null,
    phone: "02-2123-7817",
    officeKo: "제4공학관 D608호",
    officeEn: null,
    email: "mech_bk21_ley@yonsei.ac.kr",
    displayOrder: 3,
  },
  {
    id: "jeong-yesol",
    departmentKo: "BK21 교육연구단",
    departmentEn: null,
    responsibilityKo: "BK21 교육연구단",
    responsibilityEn: null,
    nameKo: "정예솔",
    nameEn: null,
    phone: "02-2123-7815",
    officeKo: "제4공학관 D608호",
    officeEn: null,
    email: "ysol912@yonsei.ac.kr",
    displayOrder: 4,
  },
];
