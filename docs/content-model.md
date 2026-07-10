# 콘텐츠 모델

## 기본 원칙

- 화면 JSX에 운영 콘텐츠를 반복 입력하지 않습니다.
- 한국어와 영어는 같은 레코드의 `LocaleText`로 관리합니다.
- 교수, 연구분야, 연구실, 교과목은 ID로 연결합니다.
- UI는 `app/lib/content.ts`의 조회 함수를 통해 콘텐츠에 접근합니다.

## 주요 타입

| 타입 | 식별자 | 주요 관계 |
| --- | --- | --- |
| `Faculty` | `id`, `slug` | `researchAreaIds`, `labId` |
| `ResearchArea` | `id`, `slug` | 교수·연구실·교과목에서 참조 |
| `Lab` | `id`, `slug` | `professorIds`, `researchAreaIds` |
| `Course` | `id`, `slug`, `code` | `researchAreaIds`, `prerequisiteIds` |
| `Notice` | `id`, `slug` | `audience`, `attachments` |
| `Event` | `id`, `slug` | 날짜와 카테고리 |

## 관계

```text
ResearchArea
├─ Faculty.researchAreaIds
├─ Lab.researchAreaIds
└─ Course.researchAreaIds

Faculty.labId ──> Lab.id
Lab.professorIds ──> Faculty.id
Course.prerequisiteIds ──> Course.id
```

## 샘플 데이터 교체

`app/data/content.ts`에서 대괄호로 표시된 값과 샘플 교과목·일정을 학부가 확인한 공식 정보로 교체합니다. 교체할 때 기존 `id`와 `slug`를 유지하면 연결된 페이지 주소와 연관 콘텐츠가 그대로 작동합니다.

이미지는 `public/`에 저장한 뒤 데이터의 경로만 수정하는 방식을 권장합니다. 외부 CMS를 도입할 경우 이미지 URL과 locale 필드를 동일한 구조로 반환합니다.

## CMS 연결 지점

`app/lib/content.ts`의 동기 조회 함수를 비동기 API 호출로 변경합니다. 컴포넌트는 콘텐츠 모델을 유지하고 데이터 원본만 교체할 수 있도록 설계되어 있습니다.
