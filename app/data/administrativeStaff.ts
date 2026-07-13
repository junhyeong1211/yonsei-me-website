export type AdministrativeStaffMember = {
  id: string;
  departmentKo: string;
  departmentEn: string | null;
  nameKo: string;
  nameEn: string | null;
  phone: string;
  officeKo: string;
  officeEn: string | null;
  email: string;
  displayOrder: number;
};

export type AdministrativeStaffGroup = {
  id: string;
  departmentKo: string;
  departmentEn: string | null;
  members: AdministrativeStaffMember[];
};

export const administrativeStaff: AdministrativeStaffMember[] = [
  {
    id: "graduate-nam-minhwa",
    departmentKo: "대학원",
    departmentEn: null,
    nameKo: "남민화",
    nameEn: null,
    phone: "02-2123-2810",
    officeKo: "제4공학관 D301호",
    officeEn: null,
    email: "nmh@yonsei.ac.kr",
    displayOrder: 1,
  },
  {
    id: "undergraduate-jeong-nagyeong",
    departmentKo: "학부 행정",
    departmentEn: null,
    nameKo: "정나경",
    nameEn: null,
    phone: "02-2123-4426",
    officeKo: "제4공학관 D301호",
    officeEn: null,
    email: "skyice@yonsei.ac.kr",
    displayOrder: 2,
  },
  {
    id: "bk21-im-eunyeong",
    departmentKo: "BK21 교육연구단",
    departmentEn: null,
    nameKo: "임은영",
    nameEn: null,
    phone: "02-2123-7817",
    officeKo: "제4공학관 D608호",
    officeEn: null,
    email: "mech_bk21_ley@yonsei.ac.kr",
    displayOrder: 3,
  },
  {
    id: "bk21-jeong-yesol",
    departmentKo: "BK21 교육연구단",
    departmentEn: null,
    nameKo: "정예솔",
    nameEn: null,
    phone: "02-2123-7815",
    officeKo: "제4공학관 D608호",
    officeEn: null,
    email: "ysol912@yonsei.ac.kr",
    displayOrder: 4,
  },
];

export const administrativeStaffGroups: AdministrativeStaffGroup[] = [
  {
    id: "graduate",
    departmentKo: "대학원",
    departmentEn: null,
    members: administrativeStaff.filter((member) => member.departmentKo === "대학원"),
  },
  {
    id: "undergraduate-administration",
    departmentKo: "학부 행정",
    departmentEn: null,
    members: administrativeStaff.filter((member) => member.departmentKo === "학부 행정"),
  },
  {
    id: "bk21",
    departmentKo: "BK21 교육연구단",
    departmentEn: null,
    members: administrativeStaff.filter((member) => member.departmentKo === "BK21 교육연구단"),
  },
];
