# Retro Developer Blog PRD

## Next.js 마이그레이션 안내

이 프로젝트는 Vite + React에서 Next.js(App Router)로 마이그레이션되었습니다.

- 개발 서버: `npm run dev` (Next.js)
- 프로덕션 빌드: `npm run build` 후 `npm start`
- 진입점: `src/app/(site)/page.tsx` (클라이언트 컴포넌트로 기존 `src/App.tsx`를 마운트)
- 전역 스타일: `src/app/globals.css`에서 기존 `src/index.css`, `src/styles/globals.css`를 가져옵니다.

불필요 파일 정리: 기존 `index.html`, `vite.config.ts`는 제거되었습니다.

### 라우팅 구조

- 홈: `/`
- 다이어리: `/diary`
- 사진첩: `/photos`
- 방명록: `/guestbook`
- 관리자: `/admin`

폴더 구조(발췌):

```
src/app
  ├─ (site)/
  │   ├─ page.tsx
  │   └─ layout.tsx
  ├─ (sections)/
  │   ├─ diary/page.tsx
  │   ├─ photos/page.tsx
  │   ├─ guestbook/page.tsx
  │   └─ admin/page.tsx
  ├─ globals.css
  └─ layout.tsx
```

각 페이지는 기존 컴포넌트 위에 얇은 클라이언트 페이지로 구성되어 있습니다(`src/app/*/page.tsx`).

### Lint/Format

- ESLint: `npm run lint` (Next.js core-web-vitals)
- Prettier: `npm run format`

### 환경변수

- 예시 파일: `.env.local.example`
- 로컬 설정: `.env.local`(git에 커밋 금지)

### Tailwind 설정

- 구성 파일: `tailwind.config.ts`, `postcss.config.cjs`
- 설치: `npm i -D tailwindcss postcss autoprefixer`
- 지시어 적용: `src/app/globals.css`에 `@tailwind base; @tailwind components; @tailwind utilities;` 적용됨.
- 호환성: 현재는 기존 CSS(`src/index.css`, `src/styles/globals.css`)도 함께 로드합니다. 점진 전환 후 `src/index.css` 제거 가능.

### 공통 네비게이션

- 파일: `src/app/(sections)/HeaderNav.tsx`
- 기능: 현재 경로 하이라이트, 모바일 햄버거 메뉴(토글)

  This is a code bundle for Retro Developer Blog PRD. The original project is available at https://www.figma.com/design/QSqGOWdyS1y8Bs59ZRNFLX/Retro-Developer-Blog-PRD.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.
