export type FacultyMember = {
  id: string;
  slug: string;
  category: "faculty";
  nameKo: string | null;
  nameEn: string | null;
  positionKo: string | null;
  positionEn: string | null;
  email: string | null;
  phoneNumbers: string[];
  office: string | null;
  image: string | null;
  profileUrl: string | null;
  reviewNote: string | null;
};

export const facultyMembers: FacultyMember[] = [
  {
    "id": "kang-keonwook",
    "slug": "kang-keonwook",
    "category": "faculty",
    "nameKo": "강건욱",
    "nameEn": "Keonwook Kang",
    "positionKo": "부교수",
    "positionEn": "Associate Professor",
    "email": "kwkang75@yonsei.ac.kr",
    "phoneNumbers": [
      "02-2123-2825"
    ],
    "office": "Engineering Building #1, Room 589",
    "image": "/images/faculty/kang-keonwook.webp",
    "profileUrl": null,
    "reviewNote": null
  },
  {
    "id": "kang-shinill",
    "slug": "kang-shinill",
    "category": "faculty",
    "nameKo": "강신일",
    "nameEn": "Shinill Kang",
    "positionKo": "교수",
    "positionEn": "Professor",
    "email": "snlkang@yonsei.ac.kr",
    "phoneNumbers": [
      "02-2123-2829"
    ],
    "office": "Engineering Building #3, Room C324",
    "image": "/images/faculty/kang-shinill.webp",
    "profileUrl": null,
    "reviewNote": null
  },
  {
    "id": "kim-kyoungsik",
    "slug": "kim-kyoungsik",
    "category": "faculty",
    "nameKo": "김경식",
    "nameEn": "Kyoungsik Kim",
    "positionKo": "교수",
    "positionEn": "Professor",
    "email": "kks@yonsei.ac.kr",
    "phoneNumbers": [
      "02-2123-5815"
    ],
    "office": "Engineering Building #3, Room C317",
    "image": "/images/faculty/kim-kyoungsik.webp",
    "profileUrl": null,
    "reviewNote": null
  },
  {
    "id": "kim-dae-eun",
    "slug": "kim-dae-eun",
    "category": "faculty",
    "nameKo": "김대은",
    "nameEn": "Dae Eun Kim",
    "positionKo": "교수",
    "positionEn": "Professor",
    "email": "kimde@yonsei.ac.kr",
    "phoneNumbers": [
      "02-2123-2822"
    ],
    "office": "Engineering Building #1, Room N202",
    "image": "/images/faculty/kim-dae-eun.webp",
    "profileUrl": null,
    "reviewNote": null
  },
  {
    "id": "kim-seok",
    "slug": "kim-seok",
    "category": "faculty",
    "nameKo": "김석",
    "nameEn": "Seok Kim",
    "positionKo": "부교수",
    "positionEn": "Associate Professor",
    "email": "seokkim@yonsei.ac.kr",
    "phoneNumbers": [
      "02-2123-4463"
    ],
    "office": "Engineering Building #3, Room C314",
    "image": "/images/faculty/kim-seok.webp",
    "profileUrl": null,
    "reviewNote": null
  },
  {
    "id": "kim-young-joo",
    "slug": "kim-young-joo",
    "category": "faculty",
    "nameKo": "김영주",
    "nameEn": "Young-Joo Kim",
    "positionKo": "교수",
    "positionEn": "Professor",
    "email": "yjkim40@yonsei.ac.kr",
    "phoneNumbers": [
      "02-2123-6852"
    ],
    "office": "Engineering Building #3, Room C316",
    "image": "/images/faculty/kim-young-joo.webp",
    "profileUrl": null,
    "reviewNote": null
  },
  {
    "id": "kim-yong-jun",
    "slug": "kim-yong-jun",
    "category": "faculty",
    "nameKo": "김용준",
    "nameEn": "Yong-Jun Kim",
    "positionKo": "교수",
    "positionEn": "Professor",
    "email": "yjk@yonsei.ac.kr",
    "phoneNumbers": [
      "02-2123-2844"
    ],
    "office": "Engineering Building #1, Room A585",
    "image": "/images/faculty/kim-yong-jun.webp",
    "profileUrl": null,
    "reviewNote": null
  },
  {
    "id": "kim-woochul",
    "slug": "kim-woochul",
    "category": "faculty",
    "nameKo": "김우철",
    "nameEn": "Woochul Kim",
    "positionKo": "교수 / 학부장",
    "positionEn": "Professor / Department Chair",
    "email": "woochul@yonsei.ac.kr",
    "phoneNumbers": [
      "02-2123-5816"
    ],
    "office": "Engineering Building #3, Room C428",
    "image": "/images/faculty/kim-woochul.webp",
    "profileUrl": null,
    "reviewNote": null
  },
  {
    "id": "kim-wonjung",
    "slug": "kim-wonjung",
    "category": "faculty",
    "nameKo": "김원정",
    "nameEn": "Wonjung Kim",
    "positionKo": "부교수 / 학부주임교수",
    "positionEn": "Associate Professor / Undergraduate Program Director",
    "email": "WJK@YONSEI.AC.KR",
    "phoneNumbers": [
      "02-2123-4471"
    ],
    "office": null,
    "image": "/images/faculty/kim-wonjung.webp",
    "profileUrl": null,
    "reviewNote": "연구실 위치 확인 필요"
  },
  {
    "id": "kim-jongbaeg",
    "slug": "kim-jongbaeg",
    "category": "faculty",
    "nameKo": "김종백",
    "nameEn": "Jongbaeg Kim",
    "positionKo": "교수",
    "positionEn": "Professor",
    "email": "kimjb@yonsei.ac.kr",
    "phoneNumbers": [
      "02-2123-2812"
    ],
    "office": "Engineering Building #3, Room C427",
    "image": "/images/faculty/kim-jongbaeg.webp",
    "profileUrl": null,
    "reviewNote": null
  },
  {
    "id": "kim-hae-jin",
    "slug": "kim-hae-jin",
    "category": "faculty",
    "nameKo": "김해진",
    "nameEn": "Hae-Jin Kim",
    "positionKo": "부교수",
    "positionEn": "Associate Professor",
    "email": "hjk@yonsei.ac.kr",
    "phoneNumbers": [
      "02-2123-2819"
    ],
    "office": "Engineering Building #1, Room N206",
    "image": "/images/faculty/kim-hae-jin.webp",
    "profileUrl": null,
    "reviewNote": null
  },
  {
    "id": "ryu-wonhyoung",
    "slug": "ryu-wonhyoung",
    "category": "faculty",
    "nameKo": "류원형",
    "nameEn": "WonHyoung Ryu",
    "positionKo": "교수",
    "positionEn": "Professor",
    "email": "whryu@yonsei.ac.kr",
    "phoneNumbers": [
      "02-2123-5821"
    ],
    "office": "Engineering Building #3, Room C326",
    "image": "/images/faculty/ryu-wonhyoung.webp",
    "profileUrl": null,
    "reviewNote": null
  },
  {
    "id": "min-kyoungmin",
    "slug": "min-kyoungmin",
    "category": "faculty",
    "nameKo": "민경민",
    "nameEn": "Kyoungmin Min",
    "positionKo": "부교수",
    "positionEn": "Associate Professor",
    "email": "kmin.min@yonsei.ac.kr",
    "phoneNumbers": [
      "02-2123-4464"
    ],
    "office": "Engineering Building #1, Room N201",
    "image": "/images/faculty/min-kyoungmin.webp",
    "profileUrl": null,
    "reviewNote": null
  },
  {
    "id": "min-byung-kwon",
    "slug": "min-byung-kwon",
    "category": "faculty",
    "nameKo": "민병권",
    "nameEn": "Byung-Kwon Min",
    "positionKo": "교수",
    "positionEn": "Professor",
    "email": "bkmin@yonsei.ac.kr",
    "phoneNumbers": [
      "02-2123-5813"
    ],
    "office": null,
    "image": "/images/faculty/min-byung-kwon.webp",
    "profileUrl": null,
    "reviewNote": "연구실 위치 확인 필요"
  },
  {
    "id": "park-no-cheol",
    "slug": "park-no-cheol",
    "category": "faculty",
    "nameKo": "박노철",
    "nameEn": "No-Cheol Park",
    "positionKo": "교수",
    "positionEn": "Professor",
    "email": "pnch@yonsei.ac.kr",
    "phoneNumbers": [
      "02-2123-4530"
    ],
    "office": "Engineering Building #1, Room N311",
    "image": "/images/faculty/park-no-cheol.webp",
    "profileUrl": null,
    "reviewNote": null
  },
  {
    "id": "song-soonho",
    "slug": "song-soonho",
    "category": "faculty",
    "nameKo": "송순호",
    "nameEn": "Soonho Song",
    "positionKo": "교수",
    "positionEn": "Professor",
    "email": "soonhosong@yonsei.ac.kr",
    "phoneNumbers": [
      "02-2123-2811"
    ],
    "office": "Engineering Building #3, Room C318",
    "image": "/images/faculty/song-soonho.webp",
    "profileUrl": null,
    "reviewNote": null
  },
  {
    "id": "shin-dongjun",
    "slug": "shin-dongjun",
    "category": "faculty",
    "nameKo": "신동준",
    "nameEn": "Dongjun Shin",
    "positionKo": "교수",
    "positionEn": "Professor",
    "email": "dj.shin@yonsei.ac.kr",
    "phoneNumbers": [
      "02-2123-2826"
    ],
    "office": "Engineering Building #3, Room 426",
    "image": "/images/faculty/shin-dongjun.webp",
    "profileUrl": null,
    "reviewNote": null
  },
  {
    "id": "yang-hyunseok",
    "slug": "yang-hyunseok",
    "category": "faculty",
    "nameKo": "양현석",
    "nameEn": "Hyunseok Yang",
    "positionKo": "교수",
    "positionEn": "Professor",
    "email": "hsyang@yonsei.ac.kr",
    "phoneNumbers": [
      "02-2123-2824"
    ],
    "office": "Engineering Building #1, Room A584",
    "image": "/images/faculty/yang-hyunseok.webp",
    "profileUrl": null,
    "reviewNote": null
  },
  {
    "id": "yoo-jeonghoon",
    "slug": "yoo-jeonghoon",
    "category": "faculty",
    "nameKo": "유정훈",
    "nameEn": "Jeonghoon Yoo",
    "positionKo": "교수",
    "positionEn": "Professor",
    "email": "yoojh@yonsei.ac.kr",
    "phoneNumbers": [
      "02-2123-2859"
    ],
    "office": "Engineering Building #3, Room C322",
    "image": "/images/faculty/yoo-jeonghoon.webp",
    "profileUrl": null,
    "reviewNote": null
  },
  {
    "id": "yoon-junyoung",
    "slug": "yoon-junyoung",
    "category": "faculty",
    "nameKo": "윤준영",
    "nameEn": "Junyoung Yoon",
    "positionKo": "부교수",
    "positionEn": "Associate Professor",
    "email": "junyoung.yoon@yonsei.ac.kr",
    "phoneNumbers": [
      "02-2123-2817"
    ],
    "office": "Engineering Building #1, Room N205",
    "image": "/images/faculty/yoon-junyoung.webp",
    "profileUrl": null,
    "reviewNote": null
  },
  {
    "id": "lee-namkyu",
    "slug": "lee-namkyu",
    "category": "faculty",
    "nameKo": "이남규",
    "nameEn": "NamKyu Lee",
    "positionKo": "조교수",
    "positionEn": "Assistant Professor",
    "email": "NK.LEE@YONSEI.AC.KR",
    "phoneNumbers": [],
    "office": "Engineering Building #1, Room N207",
    "image": "/images/faculty/lee-namkyu.webp",
    "profileUrl": null,
    "reviewNote": "전화번호 확인 필요"
  },
  {
    "id": "lee-jongsoo",
    "slug": "lee-jongsoo",
    "category": "faculty",
    "nameKo": "이종수",
    "nameEn": "Jongsoo Lee",
    "positionKo": "교수",
    "positionEn": "Professor",
    "email": "jleej@yonsei.ac.kr",
    "phoneNumbers": [
      "02-2123-4474"
    ],
    "office": "Engineering Building #3, Room C323",
    "image": "/images/faculty/lee-jongsoo.webp",
    "profileUrl": null,
    "reviewNote": null
  },
  {
    "id": "lee-joon-sang",
    "slug": "lee-joon-sang",
    "category": "faculty",
    "nameKo": "이준상",
    "nameEn": "Joon Sang Lee",
    "positionKo": "교수",
    "positionEn": "Professor",
    "email": "joonlee@yonsei.ac.kr",
    "phoneNumbers": [
      "02-2123-5820"
    ],
    "office": "Engineering Building #3, Room 327",
    "image": "/images/faculty/lee-joon-sang.webp",
    "profileUrl": null,
    "reviewNote": "원문: Eng 3, 327. 3공학관 327호"
  },
  {
    "id": "lee-changhoon",
    "slug": "lee-changhoon",
    "category": "faculty",
    "nameKo": "이창훈",
    "nameEn": "Changhoon Lee",
    "positionKo": "교수",
    "positionEn": "Professor",
    "email": "CLEE@YONSEI.AC.KR@yonsei.ac.kr",
    "phoneNumbers": [
      "02-2123-2846"
    ],
    "office": "ASTC 611a, Engineering Building #1, Room 590",
    "image": "/images/faculty/lee-changhoon.webp",
    "profileUrl": null,
    "reviewNote": "이메일 형식 오류 확인 필요"
  },
  {
    "id": "lee-hyung-suk",
    "slug": "lee-hyung-suk",
    "category": "faculty",
    "nameKo": "이형석",
    "nameEn": "Hyung-Suk Lee",
    "positionKo": "교수",
    "positionEn": "Professor",
    "email": "hyungsuk@yonsei.ac.kr",
    "phoneNumbers": [
      "02-2123-5824"
    ],
    "office": "Engineering Building #1, Room A588",
    "image": "/images/faculty/lee-hyung-suk.webp",
    "profileUrl": null,
    "reviewNote": null
  },
  {
    "id": "jang-yong-hoon",
    "slug": "jang-yong-hoon",
    "category": "faculty",
    "nameKo": "장용훈",
    "nameEn": "Yong Hoon Jang",
    "positionKo": "교수",
    "positionEn": "Professor",
    "email": "jyh@yonsei.ac.kr",
    "phoneNumbers": [
      "02-2123-5812",
      "032-749-3122"
    ],
    "office": "Engineering Building #1, Room A591",
    "image": "/images/faculty/jang-yong-hoon.webp",
    "profileUrl": null,
    "reviewNote": null
  },
  {
    "id": "jun-seong-chan",
    "slug": "jun-seong-chan",
    "category": "faculty",
    "nameKo": "전성찬",
    "nameEn": "Seong Chan Jun",
    "positionKo": "교수",
    "positionEn": "Professor",
    "email": "scj@yonsei.ac.kr",
    "phoneNumbers": [
      "02-2123-5817"
    ],
    "office": "Engineering Building #1, Room A587",
    "image": "/images/faculty/jun-seong-chan.webp",
    "profileUrl": null,
    "reviewNote": null
  },
  {
    "id": "chun-heoung-jae",
    "slug": "chun-heoung-jae",
    "category": "faculty",
    "nameKo": "전흥재",
    "nameEn": "Heoung Jae Chun",
    "positionKo": "교수",
    "positionEn": "Professor",
    "email": "hjchun@yonsei.ac.kr",
    "phoneNumbers": [
      "02-2123-4827"
    ],
    "office": "Engineering Building #3, Room C325",
    "image": "/images/faculty/chun-heoung-jae.webp",
    "profileUrl": null,
    "reviewNote": null
  },
  {
    "id": "jung-hyo-il",
    "slug": "jung-hyo-il",
    "category": "faculty",
    "nameKo": "정효일",
    "nameEn": "Hyo-il Jung",
    "positionKo": "교수",
    "positionEn": "Professor",
    "email": "uridle7@yonsei.ac.kr",
    "phoneNumbers": [
      "02-2123-5814"
    ],
    "office": "Engineering Building #1, Room A592",
    "image": "/images/faculty/jung-hyo-il.webp",
    "profileUrl": null,
    "reviewNote": null
  },
  {
    "id": "joo-chulmin",
    "slug": "joo-chulmin",
    "category": "faculty",
    "nameKo": "주철민",
    "nameEn": "Chulmin Joo",
    "positionKo": "교수",
    "positionEn": "Professor",
    "email": "cjoo@yonsei.ac.kr",
    "phoneNumbers": [
      "02-2123-5822"
    ],
    "office": "Engineering Building #3, Room C328",
    "image": "/images/faculty/joo-chulmin.webp",
    "profileUrl": null,
    "reviewNote": null
  },
  {
    "id": "choi-jongeun",
    "slug": "choi-jongeun",
    "category": "faculty",
    "nameKo": "최종은",
    "nameEn": "Jongeun Choi",
    "positionKo": "교수",
    "positionEn": "Professor",
    "email": "jongeunchoi@yonsei.ac.kr",
    "phoneNumbers": [],
    "office": "Engineering Building #3, Room C319",
    "image": "/images/faculty/choi-jongeun.webp",
    "profileUrl": null,
    "reviewNote": "전화번호 확인 필요"
  },
  {
    "id": "hyun-jae-sang",
    "slug": "hyun-jae-sang",
    "category": "faculty",
    "nameKo": "현재상",
    "nameEn": "Jae-Sang Hyun",
    "positionKo": "조교수",
    "positionEn": "Assistant Professor",
    "email": "hyun.jaesang@yonsei.ac.kr",
    "phoneNumbers": [
      "02-2123-2818"
    ],
    "office": "Engineering Building #3, Room C315",
    "image": "/images/faculty/hyun-jae-sang.webp",
    "profileUrl": null,
    "reviewNote": null
  },
  {
    "id": "hong-jongsup",
    "slug": "hong-jongsup",
    "category": "faculty",
    "nameKo": "홍종섭",
    "nameEn": "Jongsup Hong",
    "positionKo": "교수",
    "positionEn": "Professor",
    "email": "jongsup.hong@yonsei.ac.kr",
    "phoneNumbers": [
      "02-2123-4465"
    ],
    "office": null,
    "image": "/images/faculty/hong-jongsup.webp",
    "profileUrl": null,
    "reviewNote": "연구실 위치 확인 필요"
  }
];

export const getFacultyMemberBySlug = (slug: string) =>
  facultyMembers.find((member) => member.slug === slug);
