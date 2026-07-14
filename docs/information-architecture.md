# 정보 구조 및 사용자 경로

## 글로벌 메뉴

현재 홈페이지는 한국어와 영어에서 같은 5개 글로벌 메뉴 구조를 사용한다. 모든 내부 경로는 `/ko` 또는 `/en` locale 접두어를 붙여 제공한다.

```text
학부 소개
├─ 학부 소개·비전
├─ 연혁
├─ 교직원
├─ 학생활동·동아리
├─ 동문·대외협력
└─ 연락처·오시는 길

교육·학사
├─ 학부 교육과정
├─ 교과목 안내
├─ 교과목 체계도
├─ 학부 졸업요건
├─ 대학원 교육과정
└─ 장학 안내

연구·구성원
├─ 연구 분야
├─ 연구실
├─ 교수진
├─ 연구 비전·역량
└─ 사회난제 신문고

소식
├─ 공지사항
├─ 뉴스
├─ 세미나·행사
├─ 교수 초빙
└─ 학사일정

입학·진로
├─ 학부 입학
├─ 대학원 진학
└─ 취업 정보
```

## 교육·학사 용어 기준

| 용어 | 목적 | 경로 |
| --- | --- | --- |
| 학부 교육과정 | 학년별 교육 과정과 주요 학습 경험을 안내하는 허브 | `/[locale]/academics/undergraduate` |
| 교과목 안내 | 학년·학기별 전체 교과목 검색과 전공필수·전공선택 조회 | `/[locale]/academics/courses` |
| 교과목 체계도 | 교과목 이수 흐름과 선수·후수 관계 시각화 | `/[locale]/academics/curriculum-tree` |

`교과과정`은 단독 메뉴명으로 사용하지 않는다. 일반 설명 문장에 쓰인 `학년별 교육 과정`은 학부 교육과정의 내용을 설명하는 표현으로 유지한다.

## 3번 클릭 원칙

| 목적 | 사용자 경로 | 최종 경로 |
| --- | --- | --- |
| 전체 교과목 조회 | 홈 → 교육·학사 → 교과목 안내 → 학년·학기별 교과목 | `/[locale]/academics/courses?tab=schedule` |
| 전공필수 조회 | 홈 → 교육·학사 → 교과목 안내 → 전공필수 | `/[locale]/academics/courses?tab=required` |
| 전공선택 조회 | 홈 → 교육·학사 → 교과목 안내 → 전공선택 | `/[locale]/academics/courses?tab=elective` |
| 졸업요건 확인 | 홈 → 교육·학사 → 학부 졸업요건 | `/[locale]/academics/requirements` |
| 장학 안내 확인 | 홈 → 교육·학사 → 장학 안내 | `/[locale]/academics/scholarships` |
| 연구실 찾기 | 홈 → 연구·구성원 → 연구실 | `/[locale]/labs` |
| 교수진 찾기 | 홈 → 연구·구성원 → 교수진 | `/[locale]/faculty` |
| 학생활동 찾기 | 홈 → 학부 소개 → 학생활동·동아리 | `/[locale]/about/student-activities` |
| 동문·대외협력 확인 | 홈 → 학부 소개 → 동문·대외협력 | `/[locale]/about/alumni-partnerships` |
| 대학원 입학 확인 | 홈 → 입학·진로 → 대학원 진학 | 연세대학교 일반대학원 공식 외부 URL |
| 취업 정보 확인 | 홈 → 입학·진로 → 취업 정보 | `/[locale]/admission/careers` |

## 라우트

```text
/ [locale]
/[locale]/about
/[locale]/about/history
/[locale]/about/staff
/[locale]/about/student-activities
/[locale]/about/student-activities/[slug]
/[locale]/about/alumni-partnerships
/[locale]/about/directions

/[locale]/academics
/[locale]/academics/undergraduate
/[locale]/academics/courses
/[locale]/academics/courses/[slug]
/[locale]/academics/curriculum-tree
/[locale]/academics/requirements
/[locale]/academics/graduate
/[locale]/academics/scholarships

/[locale]/research/fields
/[locale]/research/vision-capabilities
/[locale]/research/social-challenges
/[locale]/research/[area-slug]
/[locale]/labs
/[locale]/labs/[slug]
/[locale]/faculty
/[locale]/faculty/[slug]

/[locale]/news/notices
/[locale]/news/notices/[slug]
/[locale]/news/department
/[locale]/news/events
/[locale]/news/faculty-recruitment
/[locale]/news/calendar

/[locale]/admission/undergraduate
/[locale]/admission/graduate
/[locale]/admission/careers
/[locale]/admission/careers/[slug]
/[locale]/search
```

`/admission/graduate`는 연세대학교 일반대학원 공식 입학 안내로 연결한다. 공식 상세 콘텐츠가 아직 없는 내부 메뉴는 공통 준비 페이지로 연결해 404나 빈 화면이 생기지 않도록 유지한다.
