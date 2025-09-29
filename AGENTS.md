# Repository Guidelines

## 프로젝트 구조 및 모듈 구성

- 루트: `index.html`, `package.json`, `vite.config.ts`가 빌드/개발 설정을 정의합니다.
- 소스: `src/`에 애플리케이션 코드가 위치합니다.
  - `src/components/`: React 컴포넌트(PascalCase 파일명, 예: `GuestBook.tsx`).
  - `src/styles/`: 전역 테마/토큰(`globals.css`).
  - `src/index.css`: Tailwind v4 유틸리티 스타일.
  - 문서/콘텐츠: `src/guidelines/Guidelines.md`, `src/Attributions.md`.
- 빌드 결과물: `npm run build` 실행 시 `dist/` 생성.

## 빌드·개발 실행 명령어

- `npm install`: 의존성 설치.
- `npm run dev`: Vite 개발 서버 실행(기본 `http://localhost:5173`).
- `npm run build`: 프로덕션 빌드 → `dist/` 출력.
- 선택: `npx vite preview`로 빌드 산출물 미리보기.

## 코딩 스타일 및 네이밍

- 언어: TypeScript + React 함수형 컴포넌트/훅 우선.
- 파일명: 컴포넌트 `PascalCase.tsx`, 유틸 `camelCase.ts`.
- 서식: 들여쓰기 2스페이스, import 정렬, named export 선호.
- 스타일: JSX에서 Tailwind 유틸리티 사용 권장. 디자인 토큰/전역 규칙은 `src/styles/globals.css`에 정의. 동적 상황 외 인라인 스타일 지양.
- 접근성: 시맨틱 태그, 라벨 연결, 이미지 `alt` 제공.

## 테스트 가이드라인

- 현재 테스트 도구는 미구성. 도입 시 Vitest + React Testing Library를 권장.
- 테스트 파일은 인접 배치: `*.test.tsx|ts`. 빠르고 결정적이어야 합니다.
- 중요 경로(라우팅, 핵심 컴포넌트, 폼) 우선 커버. 스냅샷은 안정 UI에 한정.

## 커밋·PR 가이드라인

- 커밋: 명령형·간결하게(영/한 모두 가능). 예) `feat: add GuestBook entry form`, `fix: 로그인 폼 유효성 수정`.
- 이슈 연결: 관련 시 `#<id>` 참조.
- PR: 변경 요약, UI 변경 스크린샷, 테스트/QA 절차 포함. 범위는 작고 명확하게.
- PR 전 점검: `npm run dev`로 스모크 체크, 빌드 성공 확인.

## 보안 및 설정 팁

- 시크릿/키 커밋 금지. 환경변수 사용 시 `.env.local` 활용, `.gitignore`에 `.env*` 추가 권장.
- 정적 에셋은 `src/assets/`(필요 시 생성)에 두고 Vite import로 해싱 적용.
