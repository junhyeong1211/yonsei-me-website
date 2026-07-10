# 연세대학교 기계공학부 홈페이지 프론트엔드

연세대학교 기계공학부 공식 홈페이지 운영을 위한 반응형 프론트엔드 기본 구조입니다. 한국어와 영어를 같은 정보 구조로 제공하며, 교수진·연구분야·연구실·교과목·공지사항·학사일정·통합검색 흐름을 정적 샘플 데이터로 구현했습니다.

> 현재 교수명, 연락처, 교과목, 공지, 일정은 레이아웃과 기능 확인용 샘플입니다. 운영 전에 반드시 학부가 확인한 공식 데이터로 교체해야 합니다.

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
  data/content.ts                샘플 콘텐츠와 TypeScript 타입
  lib/content.ts                 데이터 조회 함수
  globals.css                    디자인 토큰과 반응형 스타일
docs/
  information-architecture.md    사이트맵과 주요 사용자 경로
  content-model.md               콘텐츠 타입과 데이터 관계
public/
  og.png                         소셜 미리보기 이미지
```

## 콘텐츠 수정

모든 샘플 콘텐츠는 `app/data/content.ts`에서 관리합니다.

- 교수: `faculty`
- 연구분야: `researchAreas`
- 연구실: `labs`
- 교과목: `courses`
- 공지사항: `notices`
- 학사일정: `events`
- Instagram 미리보기: `instagramPosts`
- 히어로 이미지: `heroImage`

교수, 연구분야, 연구실, 교과목은 `id` 또는 `slug`로 연결됩니다. 연결을 변경할 때는 화면에 같은 정보를 직접 반복 입력하지 말고 각 레코드의 참조 ID를 수정합니다.

## 이미지 교체

- 히어로와 Instagram 이미지는 `app/data/content.ts`의 URL을 교체합니다.
- 교수 사진을 추가할 때는 `Faculty.profileImage`에 경로를 추가하고 `FacultyCard`와 상세 화면의 placeholder를 이미지 렌더링으로 전환합니다.
- 교수 사진은 4:5, 뉴스는 16:9, Instagram은 1:1 비율을 권장합니다.

## 한국어·영어 작성

다국어 문자열은 다음 구조를 사용합니다.

```ts
{ ko: "한국어 콘텐츠", en: "English content" }
```

언어를 전환하면 현재 페이지와 같은 slug의 대응 언어 페이지로 이동합니다.

## API 또는 CMS 연결

화면은 `app/lib/content.ts`의 조회 함수를 통해 데이터에 접근합니다. 향후 REST API나 Headless CMS를 연결할 때 이 함수의 구현을 교체하고, `app/data/content.ts`의 타입을 API 응답 타입과 맞춥니다. 현재 단계에서는 D1이나 R2를 사용하지 않습니다.

## 디자인 기준

- Deep navy, white, Yonsei blue 중심
- 얇은 선과 넓은 여백으로 영역 구분
- 과도한 그림자, 둥근 카드, 그라디언트 사용 금지
- 메인 섹션 순서: 공지 바 → 헤더 → 히어로 → 퀵메뉴 → 공지/일정 → 연구 → 교수진 → 교육과정 → Instagram → 푸터

전체 요구사항은 [`outputs/yonsei-mechanical-website-spec.md`](outputs/yonsei-mechanical-website-spec.md)를 참고합니다.
