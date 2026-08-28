# CLAUDE.md

This file provides guidance to AI agents (Claude Code — claude.ai/code, Codex, Copilot, etc.) **and human developers** when working with code in this repository.
These rules are shared across AI tools; the same content is mirrored in **AGENTS.md** for Codex users.

Rules are written in **English** so AI tools can follow them accurately.
Additional explanations are written in **Korean (설명)** for developers.

## How to read this document / 이 문서 읽는 법

설명:
처음 합류했다면 아래 순서로 읽는 것을 권장합니다.

1. **1. Overview** — 필수 준수 규칙(언어·기존 패턴 우선)을 먼저 확인합니다.
2. **2. Getting Started** — 패키지 매니저·환경 변수·스택을 확인합니다.
3. **3. Architecture** — 레이어 구조와 BFF/인증 구조를 이해합니다. (가장 중요)
4. **4. Conventions ~ 7. Working Rules** — 실제 코드를 작성할 때 규칙으로 참고합니다.

각 규칙은 `Rule:`(영어, AI가 정확히 따르는 지시) + `설명:`(한국어, 개발자용 부연) 쌍으로 되어 있습니다.

## Table of Contents

1. [Overview](#1-overview) — 문서 사용법 · Core Directives
2. [Getting Started](#2-getting-started) — Package Manager · Environments · Stack
3. [Architecture](#3-architecture) — Layers · Private Folders · Public API · BFF/Auth · SSE · State · Forms
4. [Conventions](#4-conventions) — Naming/Imports · TypeScript · File Separation · React · Branch · Commit · Lint
5. [Implementation Patterns](#5-implementation-patterns) — API · React Query · Zustand
6. [UI & Styling](#6-ui--styling) — ShadCN · Styling · Component Consistency
7. [Working Rules](#7-working-rules) — Code Change Rules · Pre-Completion Checklist
8. [Reference](#8-reference) — Project Icons

---

# 1. Overview

## Core Directives

Rule:
All responses, explanations, and code comments must be exclusively in Korean.

설명:
AI의 모든 대답·설명·코드 주석은 무조건 한국어로 작성합니다 (대답은 무조건 한국어로 할 것).

Rule:
Use the existing project architecture and coding patterns; prefer them over introducing new ones.

설명:
기존 코드 구조와 패턴을 유지하는 것이 가장 중요합니다. 새로운 패턴을 도입하기보다 이 문서에 정의된 프로젝트 스타일을 따르는 것을 우선합니다.

---

# 2. Getting Started

## Commands

Rule:
No npm scripts are defined yet. Do not reference or invent `pnpm <script>` commands — read `package.json` first and use whatever scripts actually exist. Package manager is **pnpm**; all app code lives under `src/`.

설명:
아직 스크립트가 정의되지 않은 초기 상태입니다. `pnpm dev`, `pnpm build` 같은 명령을 임의로 가정하지 말고, 필요할 때 `package.json`을 먼저 확인해 실제 존재하는 스크립트를 사용합니다. 스크립트가 정해지면 이 섹션에 표로 정리합니다.
패키지 관리는 pnpm을 사용합니다.

Rule:
There is no test runner. If asked to add tests, surface this first instead of assuming Jest/Vitest/Playwright.

설명:
테스트 러너가 없습니다. 테스트 추가 요청이 오면 러너부터 정해야 한다는 사실을 먼저 알립니다.

## Environments

Environment is selected at build/run time via `APP_ENV` (`local` | `development` | `staging` | `production`) — this drives runtime config, not `NODE_ENV`. `.env.local` overrides `.env.development` for the dev server and is git-ignored.

Cookie names, cookie domain, and `API_UPSTREAM` are env-specific. Only `NEXT_PUBLIC_*` values are exposed to the browser — never put secrets there.

| File             | Purpose                     |
| ---------------- | --------------------------- |
| .env.development | development server          |
| .env.local       | local developer environment |

Rule:
Never commit `.env.local`. Never put secrets in `NEXT_PUBLIC_*` variables.

설명:
환경은 `APP_ENV`로 선택하며, `.env.local`이 `.env.development`를 덮어씁니다. `.env.local`은 개인 환경 파일이므로 Git에 커밋하지 않습니다. `NEXT_PUBLIC_*` 값은 브라우저에 노출되므로 절대 시크릿을 넣지 않습니다.

## Stack snapshot

Next.js 16 (App Router, React 19), TypeScript strict, Tailwind v4 (+ SCSS optional), ShadCN/Radix/Base UI, Zustand (vanilla + Context provider), TanStack Query v5, axios + `qs`, `clsx`, `zod`, `date-fns`, `lucide-react`, `react-hook-form` + `zod` for forms, `sonner` for toasts. Package manager: pnpm.

---

# 3. Architecture

## Layers

Feature-Sliced Design을 기반으로 하되, **route 단위 조합과 route 전용 코드는 `src/app/` 안에서 해결**합니다.
상위 레이어는 하위 레이어를 import할 수 있지만 그 반대는 안 됩니다.

| Layer           | Purpose                                                                                                                                                                                                                                                                                   |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/app/`      | Next.js App Router entry, root layout, `(auth)` / `(main)` 같은 route group, global providers, styles. `proxy.ts` (Next 16의 `middleware.ts` 후속)가 auth redirect를 담당. BFF route handler는 `api/v1/` 아래. **route 단위 UI 조합과 해당 route에서만 쓰이는 segment가 모두 여기 위치.** |
| `src/features/` | 2개 이상의 route에서 재사용되는 사용자 행위·플로우. 초기에는 비어 있으며, 실제 재사용이 발생할 때 생성합니다.                                                                                                                                                                             |
| `src/entities/` | 도메인 엔티티(`api/`, `model/`, `queries/`, `hooks/`, `lib/`, `ui/`). **프로젝트 시작 시점에는 존재하지 않습니다.** route-local segment에 있던 도메인 코드가 2개 이상 route/feature에서 공유될 때 이 레이어로 승격하며 생성합니다.                                                        |
| `src/shared/`   | 프레임워크 래퍼와 도메인 무관 공통 유틸 (`api/`, `lib/`, `hooks/`, `ui/` — ShadCN 기반 primitive 포함, `config/`).                                                                                                                                                                        |

Rule:
Do **not** create a `widgets` layer or a `pages` layer. Large UI blocks belong to the owning route's `_ui/`; route-level composition is handled by App Router files (`page.tsx`, `layout.tsx`).

설명:
`widgets` 레이어는 사용하지 않습니다. 기존 FSD에서 위젯이 담당하던 큰 UI 블록은 해당 route의 `_ui/`에 두고, 여러 route에서 재사용될 때만 `features`로 올립니다.
`pages` 레이어도 사용하지 않습니다. App Router의 `page.tsx` / `layout.tsx`가 그 역할을 그대로 수행합니다.

## Private folders in `src/app/`

Rule:
Inside `src/app/`, every folder that is **not** a route segment must be prefixed with `_`. This is Next.js's private-folder convention — the folder is excluded from routing and can never collide with a route segment name.

| Folder      | Contents                                     |
| ----------- | -------------------------------------------- |
| `_ui/`      | 해당 route 전용 컴포넌트                     |
| `_model/`   | 해당 route 전용 types, constants, zod schema |
| `_hooks/`   | 해당 route 전용 hook                         |
| `_lib/`     | 해당 route 전용 helper / formatter           |
| `_api/`     | 해당 route 전용 API 함수                     |
| `_queries/` | 해당 route 전용 React Query key · options    |

**`_stores/`와 `_providers/`는 예외적으로 `src/app/` 최상위에만 하나씩 존재합니다.** route 하위에는 만들지 않습니다.

| Top-level folder      | Contents                                                            |
| --------------------- | ------------------------------------------------------------------- |
| `src/app/_stores/`    | 모든 Zustand store. 스토어별 폴더 안에 `store` · `context` 2개 파일 |
| `src/app/_providers/` | 모든 Provider 컴포넌트 (`AppProvider`, `*StoreProvider`)            |

설명:
스토어와 Provider는 route에 종속되지 않고 한곳에 모읍니다. **스코프는 파일 위치가 아니라 Provider를 어느 `layout.tsx`에서 마운트하는지로 결정**되므로, 파일이 최상위에 있어도 특정 route 구간에서만 동작하게 만들 수 있습니다.

`page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx` 등 App Router 파일 규약과 `(group)`, `[param]`, `api/v1/**`(실제 endpoint)는 규약 그대로 유지합니다.

```
src/app/
├── _stores/
│   ├── index.ts                    # 모든 스토어 re-export
│   └── agent/
│       ├── index.ts
│       ├── agent.store.ts
│       └── agent.context.ts
├── _providers/
│   ├── index.ts
│   ├── AppProvider.tsx             # React Query only
│   └── AgentStoreProvider.tsx      # _stores/agent 사용
├── (main)/
│   └── agent-studio/
│       ├── _api/
│       │   ├── index.ts
│       │   └── agents.ts
│       ├── _model/
│       │   ├── index.ts
│       │   ├── types.ts
│       │   └── constants.ts
│       ├── _queries/
│       │   ├── index.ts
│       │   ├── queryKeys.ts
│       │   └── queryOptions.ts
│       ├── _ui/
│       │   ├── index.ts
│       │   └── AgentPanel.tsx
│       ├── layout.tsx              # AgentStoreProvider 마운트
│       └── page.tsx
└── layout.tsx                      # AppProvider 마운트
```

## Public API — `index.ts`

Rule:
Every folder exposes its contents through an `index.ts`. Never import a file inside another folder directly.

설명:
**모든 폴더는 `index.ts`를 통해서만 export합니다.** 폴더가 곧 모듈 경계이고, `index.ts`가 그 폴더의 공개 계약(public surface)입니다.

```typescript
// ✅
import { useAgentStore } from "@/app/_stores/agent";
import { cn } from "@/shared/lib/utils";

// ❌
import { useAgentStore } from "@/app/_stores/agent/agent.context";
```

규칙:

- `index.ts`에 없는 것은 폴더 밖에서 쓸 수 없는 내부 구현으로 간주합니다. 외부에 필요해지면 파일을 직접 import하지 말고 `index.ts`에 명시적으로 추가합니다.
- re-export는 `export *` 대신 `export { X }` / `export type { Y }`로 명시합니다.
- `index.ts`는 re-export만 담습니다. 여기에 로직을 구현하지 않습니다.
- **같은 폴더 내부의 형제 파일끼리는 `./`로 직접 import합니다.** 자기 폴더의 `index.ts`를 경유하면 순환 참조가 생깁니다.

예외 (`index.ts` 대상 아님):

- App Router 파일 규약 — `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `route.ts`, `proxy.ts`. Next.js가 경로로 직접 로드하므로 barrel을 만들지 않습니다.
- `src/shared/ui/shadcn/*` — ShadCN 생성 도구가 파일 단위로 관리하므로 `@ui/shadcn/button` 형태의 파일 import를 유지합니다.

## Placement rules

Rule:
Decide placement by reuse scope, in this order.

1. 이 route에서만 쓰이는가? → 해당 route의 `_*` segment.
2. 2개 이상 route에서 쓰이는가? → 사용자 행위·플로우면 `features`, 도메인 데이터(타입·API·쿼리)면 `entities`.
3. 도메인과 무관한 범용 유틸·primitive인가? → `shared`.

Rule:
A nested route may import from its parent's `_*` segments. A route must **never** import from a sibling route's `_*` segments.

설명:
중첩 route는 부모의 `_*`를 참조할 수 있지만, 형제 route의 `_*`는 절대 참조하지 않습니다. 공유가 필요해지는 순간이 곧 `features` / `entities`로 승격할 시점입니다.
`features`와 `entities`는 미리 만들어두지 않습니다. 두 번째 사용처가 생겼을 때 route-local 코드를 옮기면서 만듭니다.

## BFF proxy + auth

The Next app **is** the BFF. Browser code always hits `/api/v1/...`; never the upstream backend directly.

- `src/app/api/v1/[...path]/route.ts` — catch-all REST proxy. Delegates every method to `proxyWithAuth` in `src/shared/api/bff/proxy-with-auth.ts`.
- `src/shared/api/bff/proxy-with-auth.ts` — reads `accessToken` / `refreshToken` from **httpOnly** cookies, injects `Authorization: Bearer …` to upstream (`API_UPSTREAM`).
- **Retries & Buffering:** Request bodies are pre-buffered to an `ArrayBuffer` with `duplex: "half"` set explicitly, ensuring the retry logic can replay the body if the first attempt fails (Node streams are one-shot).
- Transparently refreshes on `401` by calling `refreshAuthTokens` against `AUTH_REFRESH_PATH` (one retry; the refresh endpoint is in `PUBLIC_AUTH_PATHS` to avoid loops), rewrites cookies via `setAuthCookies` on success.
- `src/proxy.ts` — page-level proxy. Unauthenticated users → `/login?next=…`; authenticated users hitting `/login` → the default landing route. Matcher excludes `/api`, `/healthz`, and static assets/files with extensions.
- `src/shared/api/client.ts` exposes two Axios instances (`api` → BFF, `upstreamApi` → upstream). The `api` instance is what app code uses. Response interceptor on `401` redirects the browser to `/login?next=…`.
- **Serialization:** Query strings on the client are serialized with `qs` using `arrayFormat: "repeat"`.
- `BASE_URL` is hard-coded to `/api/v1` (`src/shared/api/config.ts`).

설명:
이 Next 앱 자체가 BFF(Backend For Frontend)입니다. 브라우저 코드는 항상 `/api/v1/...`만 호출하고, 업스트림 백엔드를 직접 부르지 않습니다. 인증 토큰은 **httpOnly 쿠키**에 저장되며, BFF가 서버에서 꺼내 업스트림 요청에 `Authorization` 헤더로 주입합니다. `401`이 오면 BFF가 토큰을 자동 갱신(1회 재시도)하고 쿠키를 다시 씁니다. 클라이언트는 토큰을 직접 다루지 않습니다.

## SSE streams

- `src/shared/lib/sse/subscribeSse.ts` — `EventSource` wrapper with `parse`, `onMessage`, `extraEvents`, returning `{ source, close }`. Always call `close()` on unmount / session change.
- SSE has **dedicated BFF route handlers** under `src/app/api/v1/sse/...`. These are separate from the catch-all REST proxy because `EventSource` requires a stable streaming response and doesn't support custom auth headers — auth flows through cookies on the BFF route.
- Consumers hold the `SseSubscription` in a `useRef` and clear it in `useEffect` cleanup.

설명:
실시간 스트리밍은 SSE(Server-Sent Events)를 사용합니다. `EventSource`는 커스텀 인증 헤더를 지원하지 않으므로, catch-all REST 프록시와 분리된 **전용 BFF 라우트**(`api/v1/sse/...`)를 통해 쿠키로 인증합니다. 구독 객체는 `useRef`에 보관하고 언마운트·세션 변경 시 반드시 `close()`로 정리합니다(정리하지 않으면 연결이 누수됩니다).

## State management & data

- **React Query** is the source of truth for async data. `createQueryClient` (in `src/shared/lib/query/client.ts`) sets defaults: `staleTime: 5min`, `gcTime: 10min`, `refetchOnWindowFocus: false`, `retry: 1`. The client is instantiated once via `useState(createQueryClient)` (lazy init) in `src/app/_providers/AppProvider.tsx`. Query keys are colocated with the owning route in `_queries/queryKeys.ts` (or `entities/*/queries/queryKeys.ts` once promoted).
- **Zustand** is the source of truth for client state (store-per-route/feature with Context). `zustand/context` is **not** used — it was removed in v5; follow the [official v4/v5 migration pattern](https://zustand.docs.pmnd.rs/reference/previous-versions/zustand-v3-create-context#migration).
  1. Define `createXStore` using `zustand/vanilla`'s `createStore` (not the React `create`), and export `XStoreApi` for typing.
  2. Export `XStoreContext` (a plain React `createContext<XStoreApi | null>(null)`) and `useXStore(selector)` from a sibling `*.context.ts`. The hook **throws** if no provider is mounted — by design — and delegates to `useStore(store, selector)` from `zustand`.
  3. Add `XStoreProvider` that lazy-inits the store in a `useRef`. **All provider components live in `src/app/_providers/`.**
  4. Put `store` + `context` in `src/app/_stores/[name]/`, the provider in `src/app/_providers/`, and mount the provider from the owning route's `layout.tsx` — stores and providers are collected in one place, and scope is determined by the mount point, not the file location. `AppProvider` (root layout) only wires React Query.

_Implication:_ a hook that calls `useXStore(...)` only works on routes that mount `XStoreProvider`. Shared hooks consumed by multiple routes either (a) avoid the store, or (b) accept callbacks injected by route-specific wrappers.

설명:
비동기(서버) 데이터의 단일 소스는 **React Query**, 클라이언트/UI 상태의 단일 소스는 **Zustand**입니다. 두 상태를 중복 저장하지 않습니다. Zustand 스토어는 전역 `create`가 아니라 `zustand/vanilla`의 `createStore`로 만들고, Provider 컴포넌트는 `src/app/_providers/`에 모아두되 **마운트는 필요한 라우트 구간의 `layout.tsx`에서만** 합니다(파일 위치는 한곳, 스코프는 라우트별). 구체적 파일 구성은 [5. Implementation Patterns](#5-implementation-patterns)를 참고합니다.

## Forms, schemas, UI

- **Forms:** `react-hook-form` + `zod` (via `@hookform/resolvers`). zod schema는 해당 route의 `_model/`에 둡니다.
- **UI:** ShadCN components live in `src/shared/ui/shadcn/`; project-level primitives wrap them in `src/shared/ui/`. `components.json` configures the ShadCN generator.
- **Styling:** Tailwind v4 with `tw-animate-css` and `tailwind-merge`; class composition via `clsx`.

설명:
폼은 `react-hook-form` + `zod`로 구성해 스키마 기반으로 검증합니다. UI는 ShadCN 컴포넌트(`src/shared/ui/shadcn/`)를 프로젝트 프리미티브(`src/shared/ui/`)로 감싸 사용합니다. 상세 규칙은 [6. UI & Styling](#6-ui--styling)을 참고합니다.

---

# 4. Conventions

## Naming Conventions & Imports

Rule:
Follow the project naming conventions and use the `@/` path alias.

설명:
프로젝트 네이밍 규칙과 경로 alias를 따릅니다.

- Files/folders: `kebab-case` (예: `dataset-config`, `knowledge-base`)
- React components: `PascalCase.tsx`
- Non-route folders under `src/app/`: `_` prefix — route-local (`_ui`, `_model`, `_hooks`, `_lib`, `_api`, `_queries`) and top-level only (`_stores`, `_providers`)
- Store folder name: `_stores/[name]/` where `[name]` is `kebab-case`; files inside are `[name].store.ts` / `[name].context.ts`
- Declaration files: `[name].type.ts` (types) · `constants.ts` / `config.ts` (const) · role-named files for functions — see [File Separation](#file-separation-by-declaration-kind)
- Every folder exposes an `index.ts`; import folders, not files (see [3. Architecture](#3-architecture))
- Imports: use the `@/` alias instead of parent relative paths (`../`, `../../`). Same-folder `./` imports are allowed. Import order: react/next → node_modules → `@/` → relative → css → side-effect.
  - `@/*` → `./src/*`
  - `@ui/*` → `./src/shared/ui/*`

Rule:
Route-local segments are imported with the `@/app/...` alias, not `../`.

설명:
route-local segment도 `@/app/(main)/agent-studio/_model` 형태의 alias 경로로 import합니다. 스토어는 `@/app/_stores/[name]`으로 import합니다. (린트 설정 시 `no-restricted-imports`로 부모 상대경로를 차단하고 `simple-import-sort`로 순서를 강제하는 것을 권장합니다. 경로가 길어지는 것이 부담이면 `src/app/**`에 한해 상대경로를 허용하는 override를 팀 합의로 정할 수 있습니다.)

## TypeScript

Rule:
Always use TypeScript (`.ts` or `.tsx`) for new files. Avoid `any`; prefer narrower types. Define reusable models with `interface` or `type`. All functions must include explicit return types and JSDoc comments.

설명:
모든 신규 코드는 TypeScript로 작성하고, 가능하면 `any` 사용을 피해 명확한 타입을 정의합니다. 데이터 모델은 interface/type으로 재사용 가능하게 작성하며, 함수에는 명시적 반환 타입과 JSDoc 주석을 답니다.

## File Separation by Declaration Kind

Rule:
Do not mix declaration kinds in one file. Types, constants, and functions must each live in their own file, placed in the FSD-appropriate folder for their reuse scope.

**Exception:** a type used only by its own file — component `Props`, `page.tsx` params, a hook's params/return — stays inline in that file. Split a type out when it is shared, or could reasonably be shared, beyond the file that declares it.

| Declaration                     | File                                        | Folder                                             |
| ------------------------------- | ------------------------------------------- | -------------------------------------------------- |
| `type` / `interface`            | `[name].type.ts` (or `types.ts` if generic) | `_model/` · `entities/*/model/` · `shared/model/`  |
| `const` config / literal values | `constants.ts` or `config.ts`               | `_model/` · `entities/*/model/` · `shared/config/` |
| functions (logic, helpers)      | `[name].ts` named after its role            | `_lib/` · `_api/` · `shared/lib/` · `shared/api/`  |

설명:
**타입 선언·설정 상수·함수는 한 파일에 섞지 않습니다.** 각각 별도 파일로 분리하고, 파일을 놓을 폴더는 [3. Architecture](#3-architecture)의 배치 규칙(재사용 범위)에 따라 정합니다.

다만 **그 파일 안에서만 쓰이는 타입은 분리하지 않습니다.** 아래 "분리하지 않는 예외"를 참고합니다.

- **`type` / `interface`** → 도메인 의미가 있으면 `[name].type.ts`, 해당 폴더 전반의 범용 타입이면 `types.ts`
  - 예: `provider.type.ts`, `errors.type.ts`, `category.type.ts`
- **`const` 설정·상수** → `constants.ts` (고정 리터럴) 또는 `config.ts` (환경·런타임에 따라 달라지는 설정)
- **함수** → 역할을 드러내는 이름의 파일. 타입 파일에 함수를 같이 두지 않습니다.

### 분리하지 않는 예외 — 그 파일에서만 쓰이는 타입

**판단 기준은 "다른 파일이 이 타입을 쓸 수 있는가"입니다.** 파일 밖으로 나갈 일이 없는 타입은 선언한 자리에 그대로 둡니다.

| 분리 ✅ (파일 밖에서 쓰임)                       | 분리 ❌ (그 파일 전용)                          |
| ------------------------------------------------ | ----------------------------------------------- |
| 도메인 모델 — `User`, `Product`, `QuickMenuItem` | 컴포넌트 `Props` 인터페이스                     |
| API 요청·응답 — `ReqCreateTeam`, `ResUsers`      | `page.tsx` / `layout.tsx`의 params·searchParams |
| 여러 화면이 공유하는 상태·에러 코드              | 특정 hook의 인자·반환 타입                      |
|                                                  | route handler의 `RouteContext`                  |

```typescript
// ✅ 분리하지 않음 — 이 컴포넌트 밖에서 쓸 일이 없다
interface OAuthButtonProps {
  provider: OAuthProvider;
  className?: string;
}

export function OAuthButton({ provider, className }: OAuthButtonProps) { ... }
```

```typescript
// ✅ 분리 — 도메인 메타데이터라 다른 화면·API도 참조한다
// user.type.ts
export interface User {
  id: string;
  nickname: string;
}
```

설명:
`Props`나 params 타입을 굳이 파일로 빼면 파일 수만 늘고, 컴포넌트를 읽을 때 시그니처를 확인하러 다른 파일을 열어야 해서 오히려 읽기 어려워집니다. **한 곳에서만 쓰는 타입은 그 자리에 있을 때 가장 읽기 쉽습니다.**

반대로 `User` 같은 도메인 타입은 화면·API·스토어가 함께 참조하므로, 한 컴포넌트 안에 두면 그 컴포넌트를 import해야만 타입을 쓸 수 있는 잘못된 의존이 생깁니다.

**애매하면 인라인으로 두었다가, 두 번째 사용처가 생길 때 분리합니다.** 이는 `features`/`entities`를 미리 만들지 않는 [3. Architecture](#3-architecture)의 승격 규칙과 같은 원칙입니다.

분리하는 이유:

1. **변경 이유가 다릅니다.** 타입은 API 계약이 바뀔 때, 상수는 정책이 바뀔 때, 함수는 로직이 바뀔 때 수정됩니다. 한 파일에 두면 관련 없는 변경이 같은 파일에서 충돌합니다.
2. **타입 파일은 런타임 코드를 갖지 않습니다.** `import type`으로만 참조되어 번들에서 완전히 제거될 수 있고, 순환 참조도 끊어집니다.
3. **배치 판단이 쉬워집니다.** 타입만 여러 route에서 공유되는 경우가 흔한데, 파일이 나뉘어 있으면 그 파일만 `entities`/`shared`로 승격하면 됩니다.

배치는 재사용 범위를 따릅니다. **도메인·라우트에 의존하는 값은 승격하지 않습니다** — 예를 들어 App Router 경로나 특정 도메인의 시크릿을 읽는 설정은 `shared`로 올리면 레이어 의존 방향이 뒤집히므로 route-local `_*`에 둡니다.

```
src/app/login/_model/
├── index.ts          # 공개 API (re-export만)
├── types.ts          # 범용 타입
├── errors.type.ts    # 에러 도메인 타입
└── constants.ts      # 상수

src/app/api/v1/oauth/_lib/
├── index.ts
├── provider.type.ts   # 타입만
├── provider.config.ts # 설정 상수 + 조회 함수
└── redirect-uri.ts    # 함수
```

## React / Next.js

Rule:
Use functional components. Prefer Server Components; use `"use client"` only when browser APIs or state management require it. Reuse logic through custom React hooks.

설명:
React 컴포넌트는 함수형으로 작성하고, App Router 환경에서는 Server Component를 우선합니다. 브라우저 API나 상태 관리가 필요한 경우에만 client component를 사용합니다. 중복 로직은 custom hook으로 분리합니다.

## Branch Strategy

Rule:
Follow the repository branch strategy. Do not change it or propose a new branch policy.

설명:
브랜치 전략은 프로젝트 협업 규칙이므로 AI가 변경하거나 다른 방식으로 사용·제안하면 안 됩니다.

| Branch         | Purpose                 |
| -------------- | ----------------------- |
| prod           | production environment  |
| stage          | staging environment     |
| dev            | development environment |
| alpha          | feature integration     |
| feature/<name> | feature development     |
| hotfix/<name>  | urgent bug fix          |

## Commit Message Convention

Rule:
Use the predefined commit prefixes. Format: lowercase, imperative, `type: subject`.

설명:
커밋 메시지는 정해진 prefix를 사용하며, 소문자·명령형의 `type: subject` 형식을 따릅니다.

| Type     | Description                                               |
| -------- | --------------------------------------------------------- |
| feat     | new feature                                               |
| fix      | bug fix                                                   |
| hotfix   | urgent production bug                                     |
| refactor | refactoring (no behavior change)                          |
| perf     | performance improvement                                   |
| build    | build related change                                      |
| ci       | CI/CD configuration change                                |
| style    | formatting only — semicolons, whitespace, no logic change |
| design   | UI or CSS change                                          |
| remove   | file deletion                                             |
| rename   | file rename                                               |
| test     | test code                                                 |
| chore    | configuration / package manager / misc chores             |
| docs     | documentation                                             |

Examples:

```
feat: add login api
feat: add agent conversation panel
fix: resolve React Query cache issue
refactor: simplify sidebar rendering
```

## Linting

Rule:
Keep lint clean before committing. Strip stray `console.log`, and prefer narrower types over `any` / non-null assertions in new code.

설명:
린트 규칙을 준수하고, 커밋 전에 경고를 정리합니다. ESLint 설정이 확정되면 실제 룰 목록을 이 섹션에 정리합니다.

- 남아 있는 `console.log`는 커밋 전에 제거합니다.
- `any`, non-null assertion(`!`)은 신규 코드에서 지양하고 좁은 타입을 사용합니다.

---

# 5. Implementation Patterns

설명:
아래 패턴의 파일 위치는 **해당 코드를 소유한 route의 `_*` segment**를 기본으로 합니다.
2개 이상 route가 같은 도메인 코드를 쓰게 되면 `src/entities/[entity-name]/`으로 승격하며, 이때 폴더명에서 `_`를 떼고 FSD segment 이름(`api/`, `model/`, `queries/`)을 사용합니다. 승격해도 파일 내용·네이밍 규칙은 그대로입니다.

| Route-local (default)      | Promoted (`entities`)                     |
| -------------------------- | ----------------------------------------- |
| `_api/index.ts`            | `entities/[name]/api/index.ts`            |
| `_model/types.ts`          | `entities/[name]/model/types.ts`          |
| `_queries/queryKeys.ts`    | `entities/[name]/queries/queryKeys.ts`    |
| `_queries/queryOptions.ts` | `entities/[name]/queries/queryOptions.ts` |

**스토어와 Provider는 승격 대상이 아닙니다.** `_stores/[name]/`의 store·context와 `_providers/[Name]StoreProvider.tsx`는 처음부터 `src/app/` 최상위에 모여 있으므로 `entities`로 옮기지 않습니다.

## API Communication

Rule:
Use Axios for API requests, `qs` for query strings, and follow the existing API structure.

설명:
API 통신은 Axios, query string은 qs를 사용하며, 이미 존재하는 API 패턴을 유지합니다.

### API Function & Type Pattern

설명:
API 연동 함수와 타입은 아래 규칙을 엄격히 따릅니다. 타입은 `_model/types.ts`에, 함수는 `_api/index.ts`에 둡니다. GET은 SSR용 `accessToken`을 선택 인자로 받아 있으면 `upstreamApi`, 없으면 BFF 클라이언트(`api`)를 사용합니다. 그 외 메서드는 항상 BFF 클라이언트만 사용합니다.

**1. Type Parameters (`_model/types.ts`)**

- Place all API request and response types in the owning route's `_model/types.ts`.
- **Naming Convention:** Use PascalCase starting with `Req` for request parameters and `Res` for response data.
- **Format:** `Req[Name]` and `Res[Name]`.

**2. API Functions (`_api/index.ts`)**

- **GET methods**: Function names should start with `request[Name]`.
  - **Authentication**: All GET fetch functions must accept an optional `accessToken?: string` parameter.
  - **Client Routing**:
    - If `accessToken` is provided (e.g., during SSR or specific server contexts), use `upstreamApi` and explicitly pass the `Authorization` header.
    - If `accessToken` is not provided (e.g., during standard client-side fetching), use `api` (the BFF client).
- **Non-GET methods (POST, PUT, DELETE, etc.)**: Function names should start with an action verb (e.g., `create`, `update`, `delete`).
  - Always use the `api` client (BFF) only. Do not use `upstreamApi` or pass `accessToken`.

**Examples:**

_Types (`_model/types.ts`):_

```typescript
export interface ReqCreateNewTeamSpace { ... }
export interface ResCreateNewTeamSpace { ... }
```

_GET Method (`_api/index.ts`):_

```typescript
/**
 * 모든 사용자 목록 조회
 * @return 로그인 응답 데이터
 */
export const requestAllUsers = async (accessToken?: string) => {
  return accessToken
    ? upstreamApi.get<ResUsers>(`${BASE_URL}/users`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
    : api.get<ResUsers>(`${BASE_URL}/users`);
};
```

_Non-GET Method (`_api/index.ts`):_

```typescript
/**
 *
 * @Teams 팀공간 생성
 */
export const createNewTeamSpace = async (params: ReqCreateNewTeamSpace) =>
  await api.post<ResCreateNewTeamSpace>(`${BASE_URL}/team-spaces`, params);
```

## React Query

Rule:
Use React Query for server state. Avoid manual data fetching inside components. Do not store server data in Zustand.

설명:
API 데이터·서버 상태는 React Query로 관리하고, 컴포넌트 내부에서 직접 fetch를 호출하지 않습니다. 서버 데이터를 Zustand에 저장하지 않습니다.

### React Query Pattern

설명:
API 함수를 만든 뒤에는 같은 route의 `_queries/`에 TanStack Query 키와 옵션을 설정합니다. GET만 query key가 필요하고, GET·비GET 모두 query options 파일에 등록합니다. GET의 `queryFn`은 응답 구조를 검증해 `code`가 정상이 아니거나 `data`가 없으면 `HttpError`를 던집니다.

**1. Query Keys (`_queries/queryKeys.ts`)**

- Only **GET methods** require registering a query key for TanStack Query usage.

**2. Query Options (`_queries/queryOptions.ts`)**

- **All methods** (both GET and non-GET) must be registered in this file.
- **GET methods (Queries):**
  - Must define `queryKey`, `queryFn`, and standard query options (e.g., `staleTime`, `gcTime`).
  - The `queryFn` must validate the response structure. Check if `code !== HttpStatusCode.Ok` or `!data`, and throw an `HttpError` containing the respective error code and message.
- **Non-GET methods (Mutations):**
  - Only require defining the `mutationFn` mapped to the API function.

**Examples (`_queries/queryOptions.ts`):**

_GET Method (Query):_

```typescript
  /**
   *
   * @Teams 팀 목록 조회
   * @param accessToken
   * @returns
   */
  teamSpaces: (accessToken?: string) => ({
    queryKey: driveKey.teamSpace(),
    queryFn: async () => {
      const { code, data, message } = await requestTeamSpaces(accessToken);

      if (code !== HttpStatusCode.Ok || !data)
        throw new HttpError({
          code,
          message: message || HTTP_MESSAGES[code as HttpMessageKeys].message,
        });

      return data;
    },
    staleTime: Infinity,
    gcTime: Infinity,
  }),
```

_Non-GET Method (Mutation):_

```typescript
  /**
   *
   * @Teams 팀 생성
   * @returns
   */
  createNewTeamSpace: () => ({
    mutationFn: createNewTeamSpace,
  }),
```

## Zustand

Rule:
Use Zustand for global/UI client state only. Avoid duplicating server state already held by React Query.

설명:
Zustand는 UI 상태·클라이언트 전용 상태에만 사용하고, React Query 데이터와 동일한 상태를 중복 저장하지 않습니다.

### Zustand Store Pattern

Rule:
Do **not** use `createContext` from `zustand/context`. It was deprecated in v4 and removed in v5. Follow the official v4/v5 migration pattern: a plain React `createContext` holding a vanilla store instance, plus `useStore(store, selector)` from `zustand`.
Reference: https://zustand.docs.pmnd.rs/reference/previous-versions/zustand-v3-create-context#migration

설명:
`zustand/context`의 `createContext`는 v4에서 deprecated, v5에서 제거됐습니다. 공식 마이그레이션 가이드가 제시하는 방식(React 기본 `createContext` + vanilla store 인스턴스 + `useStore(store, selector)`)을 사용합니다.

새 Zustand 스토어를 만들 때는 **반드시 3개 파일**(`store`·`context`·`provider`)을 함께 생성합니다. 이때 `store`·`context`는 **`src/app/_stores/[name]/`**에, **`provider`는 `src/app/_providers/`**에 둡니다. route 하위에는 스토어 파일을 두지 않습니다. store를 전역 `create`로 만들면 서버에서 모듈이 공유되어 요청 간 상태가 섞이므로, vanilla `createStore`로 만들고 Provider가 클라이언트당 한 번만(`useRef`) 인스턴스를 생성합니다. 컴포넌트에서는 selector를 쓰는 커스텀 훅으로만 접근해 불필요한 리렌더를 막습니다.

**1. `src/app/_stores/[name]/[name].store.ts` (State & Logic)**

- Define `State`, `Actions`, and `Store` types, and export `[Name]StoreApi` for typing the ref/context.
- Export `init[Name]Store()` for default values.
- Export `create[Name]Store(initState)` using `createStore` from `"zustand/vanilla"`.
- No React import here — this file must stay framework-agnostic.

```typescript
import { createStore } from "zustand/vanilla";
import type { StoreApi } from "zustand";

export interface AgentState {
  selectedAgentId: string | null;
}

export interface AgentActions {
  selectAgent: (id: string | null) => void;
  reset: () => void;
}

export type AgentStore = AgentState & AgentActions;
export type AgentStoreApi = StoreApi<AgentStore>;

/**
 * agent 스토어 기본값
 */
export const initAgentStore = (): AgentState => ({
  selectedAgentId: null,
});

/**
 * agent 스토어 인스턴스 생성
 */
export const createAgentStore = (
  initState: AgentState = initAgentStore(),
): AgentStoreApi =>
  createStore<AgentStore>()((set) => ({
    ...initState,
    selectAgent: (id) => set({ selectedAgentId: id }),
    reset: () => set(initAgentStore()),
  }));
```

**2. `src/app/_stores/[name]/[name].context.ts` (React Context + selector hook)**

- `'use client';`
- Create and export `[Name]StoreContext` with `createContext<[Name]StoreApi | null>(null)`.
- Export `use[Name]Store<T>(selector)`. It reads the store from context, **throws when the provider is missing**, and delegates to `useStore(store, selector)` from `zustand`.
- The selector is required — do not expose a no-argument overload that returns the whole store, as it re-renders on every change.

```typescript
"use client";

import { createContext, useContext } from "react";
import { useStore } from "zustand";

import type { AgentStore, AgentStoreApi } from "./agent.store";

export const AgentStoreContext = createContext<AgentStoreApi | null>(null);

/**
 * agent 스토어 selector 훅
 * @param selector 구독할 상태를 고르는 selector
 */
export const useAgentStore = <T>(selector: (state: AgentStore) => T): T => {
  const store = useContext(AgentStoreContext);

  if (!store) throw new Error("Missing AgentStoreProvider");

  return useStore(store, selector);
};
```

**3. `src/app/_providers/[Name]StoreProvider.tsx` (Provider Component)**

- Location: **always `src/app/_providers/`**. Register it in `src/app/_providers/index.ts`.
- `'use client';`
- Import `create[Name]Store` / `init[Name]Store` / `[Name]StoreContext` from `@/app/_stores/[name]` (its `index.ts`), never from the store files directly.
- Initialize the store exactly once per client with `useRef`. Pass `null` to `useRef` explicitly (required in React 19) and compare against `null`.
- Accept an optional `initialState` prop when the store needs to be seeded from server-rendered data.

```typescript
"use client";

import { type ReactNode, useRef } from "react";

import {
  type AgentState,
  type AgentStoreApi,
  AgentStoreContext,
  createAgentStore,
  initAgentStore,
} from "@/app/_stores/agent";

interface AgentStoreProviderProps {
  children: ReactNode;
  initialState?: AgentState;
}

/**
 * agent 스토어 Provider
 */
export const AgentStoreProvider = ({
  children,
  initialState,
}: AgentStoreProviderProps) => {
  const storeRef = useRef<AgentStoreApi | null>(null);

  if (storeRef.current === null) {
    storeRef.current = createAgentStore(initialState ?? initAgentStore());
  }

  return (
    <AgentStoreContext.Provider value={storeRef.current}>
      {children}
    </AgentStoreContext.Provider>
  );
};
```

**4. Mounting**

- Mount the provider from the owning route's `layout.tsx`, importing it from `@/app/_providers`. Do not mount it in the root layout unless the store is genuinely app-wide.
- One provider instance = one store instance. Mounting the same provider at two levels creates two independent stores, so mount it at the highest route that needs it and no lower.

**5. Usage (Consuming the Store)**

- Always use the custom hook exported from `@/app/_stores/[name]`.
- Select specific state values with a selector to prevent unnecessary re-renders. Select actions separately rather than pulling an object of several values, or return a stable object via `useShallow` from `zustand/react/shallow`.

```typescript
const selectedAgentId = useAgentStore((state) => state.selectedAgentId);
const selectAgent = useAgentStore((state) => state.selectAgent);
```

Rule:
When selecting multiple values at once, wrap the selector in `useShallow` from `zustand/react/shallow`. A selector returning a new object without it re-renders on every store update.

```typescript
import { useShallow } from "zustand/react/shallow";

const { selectedAgentId, selectAgent } = useAgentStore(
  useShallow((state) => ({
    selectedAgentId: state.selectedAgentId,
    selectAgent: state.selectAgent,
  })),
);
```

---

# 6. UI & Styling

## UI Development

Rule:
Use ShadCN UI components first, reuse existing shared components, and create new components only when necessary. Try absorbing differences as a new variant before creating a new component.

설명:
새 UI를 만들기 전에 ShadCN UI(`src/shared/ui/shadcn/`) 또는 래핑된 공용 프리미티브(`src/shared/ui/`)를 우선 사용하고, 기존 공용 컴포넌트를 먼저 확인해 재사용합니다. 기존 UI로 해결되지 않을 때만 새 컴포넌트를 만들며, 조금 다른 UI는 바로 새로 만들지 말고 기존 컴포넌트의 variant로 흡수할 수 있는지 먼저 검토합니다.

## Styling Rules

Rule:
Use Tailwind CSS for styling; use SCSS only when Tailwind is insufficient. Avoid hardcoded style values — use design tokens (`var(--…)`) for colors, gradients, and shadows (no raw hex). Use the `cn()` helper for conditional or merged classNames.

설명:
스타일은 Tailwind CSS를 기본으로 사용하고, Tailwind로 해결하기 어려운 경우에만 SCSS를 사용합니다. 색·그라데이션·그림자는 하드코딩하지 않고 디자인 토큰(`var(--…)`)만 사용하며, 조건부/병합 className은 문자열 직접 조합 대신 `@/shared/lib/utils`의 `cn()`을 사용합니다.

## Component Consistency

Rule:
Keep all screens visually consistent by using shared components through variants and design tokens — never one-off overrides.

설명:
공통 컴포넌트를 잘 만들어도 **쓰는 방식**에 따라 같은 버튼이 화면마다 달라질 수 있어 아래를 팀 규칙으로 합의합니다.

### 일관성이 깨지는 4가지 경우

| #   | 상황                       | 이유                                           | 분류        |
| --- | -------------------------- | ---------------------------------------------- | ----------- |
| ①   | 공통 컴포넌트 안 씀        | 생짜 `<button>`/`<div>`로 직접 제작            | 안 쓴 경우  |
| ②   | 컴포넌트는 쓰지만 override | `className`/`style`로 색·radius·padding 덮어씀 | 쓰는데 깨짐 |
| ③   | 하드코딩 색/값             | 토큰 대신 `#4f6ef7` 같은 값 직접 박음          | 쓰는데 깨짐 |
| ④   | 포크/복붙                  | 비슷한 컴포넌트를 따로 하나 더 만듦            | 안 쓴 경우  |

Rule:
When a UI looks different, try to absorb it as a new variant first; create a new component only when a variant truly cannot express it.

설명:
"다르다 → 바로 새로 만든다"가 아니라 **"다르다 → variant로 흡수 시도 → 정말 안 되면 새로 만든다"** 순서를 따릅니다.

Rule:
Colors, gradients, and shadows must use design tokens (`var(--…)`) only. No raw hex. If a `className` override repeats, promote it to a variant.

설명:

- 공통 컴포넌트 위치: `src/shared/ui/shadcn/*` (cva variant 구조)
- 디자인 토큰 단일 소스: `src/shared/ui/styles/theme.css`
- primary 색은 env로 주입됩니다(`NEXT_PUBLIC_BRAND_PRIMARY_COLOR` → `layout.tsx` 인라인 `--brand-primary`). 색 토큰은 브랜드 변수에서 파생시켜 멀티브랜드 일관성을 유지합니다.
- 반복되는 override는 일회성으로 두지 말고 variant로 승격합니다.

---

# 7. Working Rules

## Code Change Rules

Rule:
Follow the existing folder structure, avoid modifying unrelated files, prefer small and focused changes, and avoid large refactors unless requested.

설명:

- 기존 폴더 구조를 유지하고, 새 코드는 [3. Architecture](#3-architecture)의 배치 규칙에 따라 배치합니다.
- `widgets` / `pages` 레이어를 새로 만들지 않습니다.
- `features` / `entities`는 재사용이 실제로 발생하기 전까지 만들지 않습니다. 기본 위치는 route-local `_*` segment입니다.
- 요청과 관련 없는 파일은 수정하지 않습니다.
- 가능하면 작은 단위로 변경합니다.
- 요청이 없는 대규모 리팩토링은 수행하지 않습니다.

## Pre-Completion Checklist

Rule:
Before completing a task, verify there are no TypeScript or ESLint errors, and that new folders follow the naming and export rules.

설명:
작업 완료 전에 아래를 확인합니다.

1. TypeScript 오류와 ESLint 오류/경고가 없는지
2. `src/app/` 안의 non-route 폴더에 `_` prefix가 붙었는지
3. 새로 만든 폴더에 `index.ts`가 있고, 외부에서 파일을 직접 import하지 않는지
4. 형제 route의 `_*`를 참조하지 않는지
5. 새 스토어가 `src/app/_stores/[name]/`에, 새 Provider가 `src/app/_providers/`에 있고 각 `index.ts`에 등록됐는지
6. 타입·상수·함수를 한 파일에 섞지 않고 각각 분리했는지 — 단, 그 파일에서만 쓰는 `Props`·params 타입은 인라인 유지 ([File Separation](#file-separation-by-declaration-kind))

타입·린트 검사는 `package.json`에 정의된 스크립트를 확인해 실행합니다. 정의된 스크립트가 없으면 `npx tsc --noEmit` 등으로 직접 확인합니다.

---

# 8. Reference

## Project Icons

Rule:
Use the following icons in commits or documentation.

설명:
프로젝트에서는 아래 이모지를 사용합니다.

- ✅ success
- 🐞 bug
- 🎉 feature
- ⭐ improvement
- 📊 data
- 👍 approval
- 🛑 warning
- ☠️ critical issue
