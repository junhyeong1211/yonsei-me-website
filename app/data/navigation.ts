import type { LocaleText } from "./content";
import { graduateAdmissionUrl } from "./undergraduateAdmission";

export type NavigationChild = {
  label: LocaleText;
  path: string;
  externalUrl?: string;
  ariaLabel?: string;
};

export type NavigationItem = {
  key: string;
  label: LocaleText;
  path: string;
  activePaths: string[];
  children: NavigationChild[];
};

const child = (ko: string, en: string, path: string, options?: Pick<NavigationChild, "externalUrl" | "ariaLabel">): NavigationChild => ({
  label: { ko, en },
  path,
  ...options,
});

export const navigation: NavigationItem[] = [
  {
    key: "about",
    label: { ko: "학부 소개", en: "About" },
    path: "/about",
    activePaths: ["/about"],
    children: [
      child("학부 소개·비전", "About & Vision", "/about"),
      child("연혁", "History", "/about/history"),
      child("교직원", "Staff", "/about/staff"),
      child("학생활동·동아리", "Student Activities", "/about/student-activities"),
      child("동문·대외협력", "Alumni & Partnerships", "/about/alumni-partnerships"),
      child("연락처·오시는 길", "Contact & Directions", "/about/directions"),
    ],
  },
  {
    key: "academics",
    label: { ko: "교육·학사", en: "Academics" },
    path: "/academics",
    activePaths: ["/academics"],
    children: [
      child("학부 교육과정", "Undergraduate Curriculum", "/academics/undergraduate"),
      child("교과목 안내", "Courses", "/academics/courses"),
      child("교과목 체계도", "Curriculum Tree", "/academics/curriculum-tree"),
      child("학부 졸업요건", "Undergraduate Graduation Requirements", "/academics/requirements"),
      child("대학원 교육과정", "Graduate Curriculum", "/academics/graduate"),
      child("장학 안내", "Scholarships", "/academics/scholarships"),
    ],
  },
  {
    key: "research-people",
    label: { ko: "연구·구성원", en: "Research & People" },
    path: "/research/fields",
    activePaths: ["/research", "/labs", "/faculty"],
    children: [
      child("연구 분야", "Research Areas", "/research/fields"),
      child("연구실", "Laboratories", "/labs"),
      child("교수진", "Faculty", "/faculty"),
      child("연구 비전·역량", "Research Vision & Capabilities", "/research/vision-capabilities"),
      child("사회난제 신문고", "Social Challenges", "/research/social-challenges"),
    ],
  },
  {
    key: "news",
    label: { ko: "소식", en: "News" },
    path: "/news/notices",
    activePaths: ["/news", "/seminars", "/events"],
    children: [
      child("공지사항", "Notices", "/news/notices"),
      child("뉴스", "News", "/news"),
      child("세미나·행사", "Seminars & Events", "/news/programs"),
      child("교수 초빙", "Faculty Recruitment", "/news/faculty-recruitment"),
      child("학사일정", "Academic Calendar", "/news/calendar"),
    ],
  },
  {
    key: "admission-careers",
    label: { ko: "입학·진로", en: "Admissions & Careers" },
    path: "/admission/undergraduate",
    activePaths: ["/admission"],
    children: [
      child("학부 입학", "Undergraduate Admission", "/admission/undergraduate"),
      child("대학원 진학", "Graduate Admission", "/admission/graduate", {
        externalUrl: graduateAdmissionUrl,
        ariaLabel: "연세대학교 일반대학원 입학 안내 새 창에서 열기",
      }),
      child("취업 정보", "Career Information", "/admission/careers"),
    ],
  },
];

export const getActiveNavigationItem = (pathname: string) =>
  navigation
    .flatMap((item) => item.activePaths.map((path) => ({ item, path })))
    .filter(({ path }) => pathname === path || pathname.startsWith(`${path}/`))
    .sort((a, b) => b.path.length - a.path.length)[0]?.item;
