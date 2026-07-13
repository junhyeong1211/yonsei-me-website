# 교육·학사 용어 및 프로젝트 문서 정리 계획

> 상태: 구현 전 작업 계획
>
> 이 문서는 현재 구현을 조사해 단계별 변경 범위를 확정한 문서다. 이 문서를 작성하는 단계에서는 내비게이션, 페이지, `package.json`, README 및 기존 정보 구조 문서를 수정하지 않는다.

## 1. 작업 목표

교육·학사 영역에서 혼용 중인 용어를 아래 세 개의 역할로 구분하고, 화면 링크와 프로젝트 문서를 현재 구현에 맞춘다.

| 용어 | 역할 | 실제 경로 |
| --- | --- | --- |
| 학부 교육과정 | 학년별 교육 과정과 주요 학습 경험을 설명하는 허브 | `/[locale]/academics/undergraduate` |
| 교과목 안내 | 학년·학기별 전체 교과목 검색, 전공필수·전공선택 조회 | `/[locale]/academics/courses` |
| 교과목 체계도 | 교과목 이수 흐름과 선수·후수 관계 시각화 | `/[locale]/academics/curriculum-tree` |

단독 메뉴명으로 쓰인 `교과과정`은 `교과목 안내`로 변경한다. `학년별 교육 과정`처럼 일반 설명 문맥에서 쓰인 표현은 유지한다.

## 2. 현재 구현 조사 결과

### 2.1 이미 올바르게 구현된 항목

- 교과목 안내 페이지 제목은 이미 `교과목 안내`다.
- 교과목 안내 설명은 학년·학기별 개설 교과목과 전공 교과목 상세 조회 목적을 이미 반영한다.
- 교과목 안내 탭은 이미 다음 세 개다.
  - `학년·학기별 교과목`
  - `전공필수`
  - `전공선택`
- 검색 대상은 교과목명, 학정번호, 영문명이다.
- 필터는 학년, 학기, 과목 구분을 사용한다.
- 한국어와 영어는 같은 locale 라우팅 구조를 공유한다.
- 교과목 체계도는 별도 경로 `/academics/curriculum-tree`에 구현되어 있다.

### 2.2 수정이 필요한 항목

- 메인 퀵메뉴가 `교과과정 / Curriculum`로 표시된다.
- 교육·학사 Mega Menu에 `교과목 안내`가 없고 요청 순서와 다르다.
- Mega Menu의 졸업요건 표기가 `졸업 요건`이며 요청 명칭은 `학부 졸업요건`이다.
- 학부 교육과정 페이지의 하단 링크는 5개이며, 요청된 6개 구조와 다르다.
- `README.md`가 모든 콘텐츠를 `app/data/content.ts`에서 관리한다고 설명한다.
- `docs/information-architecture.md`가 과거 6개 글로벌 메뉴 구조를 설명한다.
- `package.json` scripts가 Unix 전용 환경변수 문법을 사용한다.

### 2.3 실제 교과목 query 규칙

현재 코드에서 확인한 값만 사용한다.

| 목적 | 실제 URL |
| --- | --- |
| 전체 교과목 | `/[locale]/academics/courses?tab=schedule` |
| 전공필수 | `/[locale]/academics/courses?tab=required` |
| 전공선택 | `/[locale]/academics/courses?tab=elective` |

하위 호환을 위해 `category=required`, `category=elective`도 현재 코드에서 인식하지만, 신규 내부 링크는 정식 탭 query인 `tab`을 사용한다.

학년·학기별 목록의 추가 query는 다음과 같다.

- 학년: `year=1|2|3|4`
- 학기: `semester=1|2`
- 교과 구분: `category=university-core|required|elective`
- 검색어: `q={검색어}`

## 3. 단계별 구현 계획

각 단계는 독립적으로 검수한 뒤 다음 단계로 진행한다. 가능하면 단계별 커밋을 남겨 문제 발생 시 해당 단계만 되돌릴 수 있게 한다.

### 단계 0. 기준 상태 보존과 변경 범위 확인

목적: 현재 정상 상태를 보존하고 예상하지 않은 변경을 차단한다.

작업:

1. 작업 시작 시 `git status`로 깨끗한 상태인지 확인한다.
2. 현재 커밋을 가리키는 교육 용어 정리 전용 백업 브랜치를 만든다.
3. 아래 파일의 변경 전 내용을 기록한다.
   - `app/components/DepartmentSite.tsx`
   - `app/data/navigation.ts`
   - `docs/information-architecture.md`
   - `README.md`
   - `package.json`
   - `package-lock.json`

완료 조건:

- 교수진, 연구실, 연구 분야, 메인 Hero 데이터에는 diff가 없다.
- 백업 브랜치가 원격 저장소에도 존재한다.

### 단계 1. 화면 용어 최소 수정

대상 파일:

- `app/components/DepartmentSite.tsx`

작업:

1. 메인 퀵메뉴의 한국어 `교과과정`을 `교과목 안내`로 변경한다.
2. 영어 `Curriculum`을 `Courses`로 변경한다.
3. 기존 `BookOpen` 아이콘, 레이아웃, 스타일, 목적지 `/academics/courses`를 유지한다.
4. `aria-label`이 별도 지정되어 있거나 화면명에서 파생되는지 확인하고 `교과목 안내 / Courses`와 일치시킨다.
5. 단독 링크 문구로 남은 `교과과정`을 검색하되, 설명 문장에 포함된 `교육과정`은 문맥을 확인해 유지한다.

완료 조건:

- 메인 퀵메뉴만 `교과목 안내 / Courses`로 표시된다.
- 다른 퀵메뉴는 변경되지 않는다.
- 클릭 경로는 `/ko/academics/courses`, `/en/academics/courses`다.

권장 커밋:

```text
fix: standardize course directory terminology
```

### 단계 2. 교육·학사 Mega Menu 정보 구조 정리

대상 파일:

- `app/data/navigation.ts`

변경 후 순서와 경로:

| 순서 | 메뉴명 | 영어명 | 경로 |
| --- | --- | --- | --- |
| 1 | 학부 교육과정 | Undergraduate Curriculum | `/academics/undergraduate` |
| 2 | 교과목 안내 | Courses | `/academics/courses` |
| 3 | 교과목 체계도 | Curriculum Tree | `/academics/curriculum-tree` |
| 4 | 학부 졸업요건 | Undergraduate Graduation Requirements | `/academics/requirements` |
| 5 | 대학원 교육과정 | Graduate Curriculum | `/academics/graduate` |
| 6 | 학사 안내 | Academic Information | `/academics` |
| 7 | 장학 안내 | Scholarships | `/academics/scholarships` |

작업 원칙:

- 기존 navigation 배열에서 교육·학사 children만 최소 수정한다.
- 새 페이지나 중복 라우트를 만들지 않는다.
- 같은 navigation 데이터를 사용하는 데스크톱 Mega Menu와 모바일 아코디언에 동시에 반영되는지 확인한다.
- Header, hover 밑줄, ESC 닫기, 키보드 탐색 구현은 수정하지 않는다.

완료 조건:

- 데스크톱과 모바일의 순서·용어·경로가 동일하다.
- `/academics/courses`에서 교육·학사 메뉴가 active 상태다.
- breadcrumb의 `courses` 라벨은 기존 route label `교과목 안내 / Courses`를 사용한다.

### 단계 3. 학부 교육과정 페이지 내부 링크 정리

대상 파일:

- `app/components/DepartmentSite.tsx`

페이지 역할:

- 제목과 학년별 교육 과정 콘텐츠는 유지한다.
- 페이지를 교과목 목록 페이지로 바꾸지 않는다.

하단 빠른 이동 메뉴:

| 메뉴 | 경로 |
| --- | --- |
| 교과목 안내 | `/academics/courses?tab=schedule` |
| 전공필수 | `/academics/courses?tab=required` |
| 전공선택 | `/academics/courses?tab=elective` |
| 학부 졸업요건 | `/academics/requirements` |
| 학사 안내 | `/academics` |
| 장학 안내 | `/academics/scholarships` |

작업:

1. 기존 하단 `lowerLinks`를 위 6개 항목으로 정리한다.
2. 기존 상단 퀵링크와 역할이 겹치는 부분은 레이아웃을 바꾸지 않고 경로만 일관되게 맞춘다.
3. 전공필수·전공선택은 별도 페이지를 만들지 않는다.
4. `tab=required`, `tab=elective`를 그대로 재사용한다.

완료 조건:

- 6개 링크가 모두 실제 페이지 또는 실제 필터 상태로 이동한다.
- 브라우저 새로고침 후에도 선택한 탭 상태가 유지된다.
- 한국어와 영어에서 같은 query 구조를 사용한다.

### 단계 4. 교과목 안내 페이지 회귀 점검

주요 대상:

- `app/components/DepartmentSite.tsx`
- `app/data/undergraduateCourseOfferings.ts`
- `app/data/undergraduateCourseDetails.ts`

이 단계는 기본적으로 점검 단계다. 요구사항을 이미 만족하는 부분은 수정하지 않는다.

확인 항목:

1. 페이지 제목: `교과목 안내 / Courses`
2. 설명: 학년·학기별 개설 교과목과 전공 교과목 상세 조회 목적
3. 탭: `schedule`, `required`, `elective`
4. 검색: 교과목명, 학정번호, 영문명
5. 필터: 학년, 학기, 과목 구분
6. 직접 URL 진입 및 새로고침 시 탭과 필터 상태 유지
7. breadcrumb 라벨과 교육·학사 active 상태
8. query 갱신 시 예상하지 않은 상단 스크롤이 발생하는지 확인

수정이 필요할 경우에도 기존 검색·필터 데이터와 URL 규칙은 유지한다.

### 단계 5. 정보 구조 문서 최신화

대상 파일:

- `docs/information-architecture.md`

작업:

1. 과거 6개 글로벌 메뉴를 실제 5개 글로벌 메뉴로 교체한다.
2. 현재 `app/data/navigation.ts`의 순서와 명칭을 문서에 반영한다.
3. locale 공통 라우트 규칙을 유지한다.
4. 3번 클릭 원칙을 실제 경로로 갱신한다.

문서에 포함할 사용자 경로:

| 목적 | 사용자 경로 | 최종 URL |
| --- | --- | --- |
| 전체 교과목 조회 | 홈 → 교육·학사 → 교과목 안내 → 학년·학기별 교과목 | `/[locale]/academics/courses?tab=schedule` |
| 전공필수 조회 | 홈 → 교육·학사 → 교과목 안내 → 전공필수 | `/[locale]/academics/courses?tab=required` |
| 전공선택 조회 | 홈 → 교육·학사 → 교과목 안내 → 전공선택 | `/[locale]/academics/courses?tab=elective` |
| 졸업요건 확인 | 홈 → 교육·학사 → 학부 졸업요건 | `/[locale]/academics/requirements` |
| 장학 안내 확인 | 홈 → 교육·학사 → 장학 안내 | `/[locale]/academics/scholarships` |
| 연구실 찾기 | 홈 → 연구·구성원 → 연구실 | `/[locale]/labs` |
| 교수진 찾기 | 홈 → 연구·구성원 → 교수진 | `/[locale]/faculty` |
| 대학원 입학 확인 | 홈 → 입학·진로 → 대학원 진학 | 외부 공식 대학원 입학 URL |
| 취업 정보 확인 | 홈 → 입학·진로 → 취업 정보 | `/[locale]/admission/careers` |

3번 클릭 원칙은 메뉴 클릭 수를 줄이는 방향을 설명하되, 외부 대학원 입학 링크는 내부 상세 페이지를 거치지 않는다는 점을 명시한다.

### 단계 6. README 데이터 관리 위치 최신화

대상 파일:

- `README.md`

현재 파일 기준으로 다음 표를 사용한다.

| 콘텐츠 | 주 관리 파일 | 비고 |
| --- | --- | --- |
| 교수진 | `app/data/faculty.ts` | 교수진 목록·상세의 주 데이터 |
| 연구실 | `app/data/labs.ts` | 연구실 목록·상세의 주 데이터 |
| 연구 분야 | `app/data/researchAreas.ts` | 현재 6개 탐색 분류, 상태 메타데이터 확인 필요 |
| 학부 교육과정 | `app/data/undergraduateProgram.ts` | 학년별 흐름 및 주요 학습 경험 |
| 학부 교과목 개설 목록 | `app/data/undergraduateCourseOfferings.ts` | 학년·학기·구분 필터 데이터 |
| 학부 전공필수·전공선택 상세 | `app/data/undergraduateCourseDetails.ts` | 상세 교과목 데이터 |
| 교과목 체계도 | `app/data/curriculumTree.ts` | 체계도 전용 데이터와 원본 링크 |
| 대학원 교과목 | `app/data/graduateCourses.ts` | 대학원 교과목 및 코드 수준 필터 |
| 학부 졸업요건 | `app/data/undergraduateGraduationRequirements.ts` | 학번별 검수 상태 포함 |
| 대학원 졸업요건 | `app/data/graduateGraduationRequirements.ts` | 대학원 이수요건 |
| 장학 안내 | `app/data/scholarships.ts` | 검수 상태 및 기준연도 포함 |
| 연혁 | `app/data/history.ts` | 학부 연혁 |
| 교직원 | `app/data/staff.ts` | 행정·BK21 담당자 |
| 입학 | `app/data/undergraduateAdmission.ts` | 학부 입학 콘텐츠 및 공식 외부 URL |
| 취업 정보 | `app/data/careers.ts` | 채용·진로 게시 데이터 |
| 학사일정 | `app/data/calendar.ts` | 정적 초기값·fallback, 런타임 연동은 `app/api/calendar/route.ts` |
| 공지사항 | `app/data/content.ts`의 `notices` | 현재 샘플/정적 공지 데이터 |

README에 함께 명시할 사항:

- `app/data/content.ts`는 현재도 공지, 메인 일정 미리보기, Hero, SNS 및 일부 레거시 샘플 데이터를 포함한다.
- 모든 콘텐츠가 한 파일에 있다는 기존 설명은 삭제한다.
- `reviewNote`, `verificationStatus`, `classificationStatus`가 있는 데이터는 해당 상태를 유지한다.
- 공식 검증 완료 여부를 파일 존재만으로 판단하지 않는다.
- 샘플 공지·일정·레거시 데이터는 운영 전 공식 정보로 교체해야 한다.

### 단계 7. package.json Windows 호환 정리

대상 파일:

- `package.json`
- `package-lock.json`은 실제 의존성 또는 lockfile 메타데이터가 바뀌는 경우에만 갱신

변경안:

```json
{
  "scripts": {
    "dev": "vinext dev",
    "build": "vinext build",
    "start": "vinext start"
  }
}
```

판단 근거:

- `WRANGLER_LOG_PATH`는 현재 실행을 위한 필수 환경변수가 아니라 로그 저장 위치 지정이다.
- 필수값이 아니므로 `cross-env`를 추가하지 않는다.
- 의존성을 추가하지 않으므로 원칙적으로 `package-lock.json`의 dependency tree 변경은 없다.
- `npm install --package-lock-only`가 필요하지 않다면 lockfile을 불필요하게 수정하지 않는다.

완료 조건:

- macOS/Linux에서 기존 명령이 동작한다.
- Windows PowerShell에서 Unix 환경변수 문법 오류 없이 `npm run dev`가 시작된다.
- build와 start 명령도 같은 방식으로 플랫폼 독립적이다.

### 단계 8. 통합 검증과 최종 반영

정적 검사:

```bash
npm run lint
npm run build
npm test
```

`lint` 또는 `test`가 기존 프로젝트 문제로 실패할 경우, 이번 변경에서 발생한 실패인지 기존 실패인지 로그를 분리해 보고한다.

필수 화면 검증:

1. `/ko`, `/en` 메인 퀵메뉴가 `교과목 안내 / Courses`로 표시된다.
2. 메인 퀵메뉴가 locale에 맞는 `/academics/courses`로 이동한다.
3. 데스크톱 Mega Menu와 모바일 아코디언이 같은 교육·학사 순서를 사용한다.
4. `/academics/courses?tab=schedule`에서 학년·학기별 교과목 탭이 선택된다.
5. `/academics/courses?tab=required`에서 전공필수 탭이 선택된다.
6. `/academics/courses?tab=elective`에서 전공선택 탭이 선택된다.
7. 각 query URL을 새로고침해도 선택 상태가 유지된다.
8. breadcrumb는 `교과목 안내 / Courses`를 표시한다.
9. 교육·학사 메뉴 active 상태가 유지된다.
10. `/ko/academics/undergraduate`, `/en/academics/undergraduate`의 6개 링크가 정상 동작한다.
11. 교수진, 연구실, 연구 분야, 메인 Hero에 예상하지 않은 시각·데이터 diff가 없다.
12. `npm run dev`, `npm run build`, `npm run start`에 Unix 환경변수 문법이 남아 있지 않다.

최종 diff 허용 범위:

- `app/components/DepartmentSite.tsx`
- `app/data/navigation.ts`
- `docs/information-architecture.md`
- `README.md`
- `package.json`
- 필요한 경우에만 `package-lock.json`

## 4. 단계별 권장 실행 순서

작업량과 회귀 위험을 줄이기 위해 다음과 같이 나눠 진행한다.

1. **화면 용어 단계**: 단계 0~2
2. **교육 링크 단계**: 단계 3~4
3. **문서 단계**: 단계 5~6
4. **실행 환경 단계**: 단계 7
5. **최종 검증 단계**: 단계 8

각 묶음 완료 후 빌드와 화면 확인을 하고 다음 묶음으로 넘어간다. 한 번에 전체 파일을 재작성하지 않는다.

## 5. 이번 문서 작성 단계에서 변경하지 않는 것

- 교수진 데이터 및 UI
- 연구실 데이터 및 UI
- 연구 분야 데이터 및 UI
- 메인 Hero 및 슬라이드
- 공지사항·학사일정 디자인
- Header 및 Mega Menu 디자인
- 모바일 아코디언 동작
- 교과목 검색·필터 로직
- 기존 locale 라우팅 구조

