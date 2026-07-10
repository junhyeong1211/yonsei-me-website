# 정보 구조 및 사용자 경로

## 글로벌 메뉴

```text
학부소개
├─ 학부 소개
├─ 학부장 인사말
├─ 비전 및 교육목표
├─ 연혁
├─ 조직 및 연락처
└─ 오시는 길

교수진
├─ 전체 교수진
├─ 연구분야별 교수진
├─ 연구실
├─ 명예교수
└─ 교직원

연구분야
├─ 연구분야 전체
├─ 연구분야 01~06
├─ 연구성과
└─ 연구시설

교육과정
├─ 학부과정
├─ 학부 교과목
├─ 대학원과정
├─ 대학원 교과목
├─ 졸업요건
└─ 교과과정 체계도

학과소식
├─ 학부공지
├─ 대학원공지
├─ 학부·연구 뉴스
├─ 세미나·행사
├─ 학사일정
└─ 채용정보

입학·홍보
├─ 학부 입학
├─ 대학원 입학
├─ 학부 홍보
├─ 학생 활동
├─ Instagram
└─ 문의하기
```

## 3번 클릭 원칙

| 목적 | 경로 |
| --- | --- |
| 교수 찾기 | 홈 → 교수진 → 연구분야 또는 교수 → 교수 상세 |
| 연구실 찾기 | 홈 → 연구분야 → 분야 상세 → 관련 연구실 |
| 학부 교과목 | 홈 → 교육과정 → 학부 교과목 → 교과목 상세 |
| 대학원 교과목 | 홈 → 교육과정 → 대학원 교과목 → 교과목 상세 |
| 공지 확인 | 홈 → 학과소식 → 공지 구분 → 공지 상세 |
| 대학원 입학 | 홈 → 입학·홍보 → 대학원 입학 |
| 채용정보 | 홈 퀵메뉴 → 채용정보 |
| 오시는 길 | 홈 퀵메뉴 → 오시는 길 |

## 라우트

모든 라우트는 `/ko`와 `/en`에서 같은 구조를 사용합니다.

```text
/[locale]
/[locale]/about/*
/[locale]/faculty
/[locale]/faculty/[slug]
/[locale]/labs
/[locale]/labs/[slug]
/[locale]/research
/[locale]/research/[slug]
/[locale]/academics/*
/[locale]/academics/courses
/[locale]/academics/courses/[slug]
/[locale]/news/notices
/[locale]/news/notices/[slug]
/[locale]/news/calendar
/[locale]/news/events
/[locale]/news/careers
/[locale]/admission/*
/[locale]/promotion/*
/[locale]/search
```

아직 공식 콘텐츠가 없는 하위 메뉴는 공통 준비 페이지 템플릿으로 연결되어 죽은 링크를 만들지 않습니다.
