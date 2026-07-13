# 콘텐츠 모델

## 기본 원칙

- 화면 컴포넌트에 운영 콘텐츠를 반복 작성하지 않고 `app/data`의 도메인별 TypeScript 파일에서 관리합니다.
- 한국어와 영어가 함께 필요한 데이터는 동일한 레코드 안에서 관리하고, `/ko`, `/en` 라우트가 같은 데이터 구조를 사용합니다.
- 교수진, 연구실, 연구 분야, 교과목은 ID·slug·분류 값을 통해 연결합니다.
- `app/lib/content.ts`는 공지·메인·레거시 호환 콘텐츠의 조회 지점이며, 도메인 페이지는 각 전용 데이터 파일을 직접 사용할 수 있습니다.

## 현재 데이터 위치

| 도메인 | 주 데이터 파일 | 연결 또는 검수 정보 |
| --- | --- | --- |
| 교수진 | `app/data/faculty.ts` | `id`, `slug`, 사진 경로, `reviewNote` |
| 연구실 | `app/data/labs.ts` | `primaryArea`, `secondaryAreas`, 교수진·연락처 |
| 연구 분야 | `app/data/researchAreas.ts` | 6개 분야 slug와 탐색 정보 |
| 학부 교육과정 | `app/data/undergraduateProgram.ts` | 학년별 교육 과정과 내부 링크 |
| 학부 교과목 | `app/data/undergraduateCourseOfferings.ts`, `app/data/undergraduateCourseDetails.ts` | 학년·학기·교과 구분 필터 |
| 교과목 체계도 | `app/data/curriculumTree.ts` | 선수과목과 이수 흐름 |
| 대학원 교과목 | `app/data/graduateCourses.ts` | 코드 수준과 학점 필터 |
| 졸업요건 | `app/data/undergraduateGraduationRequirements.ts`, `app/data/graduateGraduationRequirements.ts` | 학번별 또는 과정별 검수 상태 |
| 장학 안내 | `app/data/scholarships.ts` | 장학 분류와 확인 필요 정보 |
| 연혁 | `app/data/history.ts` | 연혁 항목 |
| 교직원 | `app/data/staff.ts` | 행정 담당, 연락처, 위치 |
| 입학·취업 | `app/data/undergraduateAdmission.ts`, `app/data/careers.ts` | 공식 외부 링크와 게시 데이터 |
| 학사일정 | `app/data/calendar.ts`, `app/api/calendar/route.ts` | 초기값·fallback과 런타임 연동 |
| 공지·메인 콘텐츠 | `app/data/content.ts` | 공지사항, Hero, SNS, 레거시 호환 데이터 |

## 관계

```text
ResearchArea
├─ Lab.primaryArea / Lab.secondaryAreas
├─ Faculty의 연구 분야 표시
└─ 학부·대학원 교과목의 분류와 탐색

Faculty.slug ──> /[locale]/faculty/[slug]
Lab.slug ──────> /[locale]/labs/[slug]
Course.id ─────> 선수과목·교과목 체계도 관계
```

## 검수와 샘플 데이터

- `reviewNote`, `verificationStatus`, `classificationStatus`가 있는 항목은 원문 확인 필요 여부와 검수 상태를 함께 기록합니다.
- 전용 데이터 파일이 존재한다는 사실만으로 공식 검증이 끝난 것은 아닙니다.
- 샘플 공지, 일정, Hero·SNS 미리보기와 레거시 콘텐츠는 운영 전 학부가 확인한 최신 정보로 교체합니다.
- 공식 데이터로 교체할 때는 기존 `id`와 `slug`를 유지하면 상세 경로와 연결된 링크를 안정적으로 유지할 수 있습니다.

## CMS 연결 지점

도메인별 파일의 타입을 API 응답 타입과 맞추고, 조회가 필요한 데이터는 `app/lib/content.ts` 또는 해당 도메인용 조회 모듈로 옮깁니다. 컴포넌트의 표현 구조와 식별자 체계는 유지한 채 데이터 원본만 교체하는 방식을 권장합니다.
