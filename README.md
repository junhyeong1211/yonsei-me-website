# 연세대학교 기계공학부 홈페이지 프론트엔드

연세대학교 기계공학부 공식 홈페이지 운영을 위한 반응형 프론트엔드 기본 구조입니다. 한국어와 영어를 같은 정보 구조로 제공하며, 교수진·연구 분야·연구실·교육과정·공지사항·학사일정·통합검색 흐름을 구현했습니다.

> 데이터별 공식 검수 상태는 `reviewNote`, `verificationStatus`, `classificationStatus`를 확인합니다. 샘플 공지·일정·레거시 데이터는 운영 전에 학부가 확인한 정보로 교체해야 합니다.

## 기술 스택

- Next.js App Router 호환 vinext
- React 19
- TypeScript strict
- Tailwind CSS 4 및 전역 CSS
- lucide-react 아이콘
- Cloudflare Workers 호환 빌드

## 실행 방법

Node.js 22.13 이상이 필요합니다.

```bash
npm install
npm run dev
```

개발 서버가 출력한 Local URL에서 확인합니다.

```bash
npm run lint
npm run build
npm test
```

## 주요 폴더

```text
app/
  [locale]/[[...slug]]/page.tsx  locale 기반 공통 라우트
  components/DepartmentSite.tsx 전체 레이아웃과 페이지 템플릿
  data/                          도메인별 TypeScript 콘텐츠 데이터
  lib/content.ts                 데이터 조회 함수
  globals.css                    디자인 토큰과 반응형 스타일
docs/
  information-architecture.md    사이트맵과 주요 사용자 경로
  content-model.md               콘텐츠 타입과 데이터 관계
public/
  og.png                         소셜 미리보기 이미지
```

## 콘텐츠 데이터 관리

콘텐츠는 `app/data` 아래에서 도메인별 파일로 나누어 관리합니다. 페이지에 같은 데이터를 직접 반복 작성하지 말고 아래 파일을 수정합니다.

| 콘텐츠 | 주 관리 파일 | 비고 |
| --- | --- | --- |
| 교수진 | `app/data/faculty.ts` | 교수진 목록과 상세 페이지의 주 데이터 |
| 연구실 | `app/data/labs.ts` | 연구실 목록과 상세 페이지의 주 데이터 |
| 연구 분야 | `app/data/researchAreas.ts` | 6개 연구 분야 탐색 분류 |
| 학부 교육과정 | `app/data/undergraduateProgram.ts` | 학년별 교육 과정과 학습 경험 |
| 학부 교과목 개설 목록 | `app/data/undergraduateCourseOfferings.ts` | 학년·학기·과목 구분 필터 데이터 |
| 학부 전공필수·전공선택 상세 | `app/data/undergraduateCourseDetails.ts` | 전공 교과목 상세 데이터 |
| 교과목 체계도 | `app/data/curriculumTree.ts` | 이수 흐름, 선수과목, 원본 체계도 연결 |
| 대학원 교과목 | `app/data/graduateCourses.ts` | 대학원 교과목과 코드 수준 필터 |
| 학부 졸업요건 | `app/data/undergraduateGraduationRequirements.ts` | 학번별 요건과 검수 상태 |
| 대학원 졸업요건 | `app/data/graduateGraduationRequirements.ts` | 대학원 이수요건 |
| 장학 안내 | `app/data/scholarships.ts` | 장학 정보와 검수 상태 |
| 연혁 | `app/data/history.ts` | 학부 연혁 |
| 교직원 | `app/data/staff.ts` | 학부·대학원·BK21 행정 담당자 |
| 학생활동·동아리 | `app/data/studentActivities.ts` | 동아리 목록·상세, 대표 이미지와 공식 검수 전 영문 문구 |
| 입학 | `app/data/undergraduateAdmission.ts` | 학부 입학 콘텐츠와 공식 외부 URL |
| 취업 정보 | `app/data/careers.ts` | 채용·진로 게시 데이터 |
| 학사일정 | `app/data/calendar.ts` | 정적 초기값과 fallback, 런타임 연동은 `app/api/calendar/route.ts` |
| 공지사항 | `app/data/content.ts`의 `notices` | 현재 정적·샘플 공지 데이터 |

`app/data/content.ts`는 공지사항, 메인 일정 미리보기, Hero, SNS와 일부 레거시 호환 데이터를 계속 관리합니다. 교수진·연구실·연구 분야·교육 데이터의 현재 페이지용 주 데이터는 위 전용 파일을 우선 사용합니다.

`reviewNote`, `verificationStatus`, `classificationStatus`가 있는 항목은 공식 검증 상태를 함께 나타냅니다. 파일이 존재한다는 사실만으로 공식 검증이 완료된 것은 아니며, 샘플 공지·일정·레거시 데이터는 운영 전에 학부가 확인한 정보로 교체해야 합니다.

학생활동·동아리의 한국어 콘텐츠는 제공 자료를 반영했으며, 영문 문구와 향후 모집 정보는 공식 확인 전 상태입니다. 확인이 필요한 외부 채널은 링크를 추측하지 않고 `링크 확인 필요`로 표시합니다.

## 이미지 교체

- 히어로와 Instagram 이미지는 `app/data/content.ts`의 URL을 교체합니다.
- 교수 사진은 `public/images/faculty/`에 두고 `app/data/faculty.ts`의 `image` 경로와 연결합니다.
- 학생활동 대표 이미지는 `public/images/clubs/`에 두고 `app/data/studentActivities.ts`의 `image` 경로와 연결합니다.
- 교수 사진은 4:5, 뉴스는 16:9, Instagram은 1:1 비율을 권장합니다.

## 한국어·영어 작성

다국어 문자열은 다음 구조를 사용합니다.

```ts
{ ko: "한국어 콘텐츠", en: "English content" }
```

언어를 전환하면 현재 페이지와 같은 slug의 대응 언어 페이지로 이동합니다.

## API 또는 CMS 연결

화면은 `app/lib/content.ts`와 각 전용 데이터 파일을 통해 데이터에 접근합니다. 향후 REST API나 Headless CMS를 연결할 때 조회 함수와 도메인별 타입을 API 응답 타입에 맞춥니다. 현재 단계에서는 D1이나 R2를 사용하지 않습니다.

## 디자인 기준

- Deep navy, white, Yonsei blue 중심
- 얇은 선과 넓은 여백으로 영역 구분
- 과도한 그림자, 둥근 카드, 그라디언트 사용 금지
- 메인 섹션 순서: 공지 바 → 헤더 → 히어로 → 퀵메뉴 → 공지/일정 → 연구 → 교수진 → 교육과정 → Instagram → 푸터

전체 요구사항은 [`outputs/yonsei-mechanical-website-spec.md`](outputs/yonsei-mechanical-website-spec.md)를 참고합니다.
