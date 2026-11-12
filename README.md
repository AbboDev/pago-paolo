# Pago Paolo

A cross-platform mobile application built with **React Native**, **Expo**, and **TypeScript** to track shared expenses, balances, and who owes what.

---

## What the Application Does

**Pago Paolo** simplifies tracking group expenses and settling debts among friends, roommates, and travel companions. Inspired by the everyday dilemma _"Chi paga?"_ (Who pays?), Pago Paolo keeps a transparent, straightforward ledger so everyone knows who covered an expense, who owes money, and the most efficient way to settle balances.

### Key Features

- **Shared Expense Tracking**:

  - Quickly log expenses, dinners, bills, and joint purchases.
  - Split costs evenly or assign custom shares to specific participants.

- **Balance & Debt Calculation**:

  - Real-time overview of who is owed money and who needs to pay.
  - Automatically calculates net balances and minimizes the number of transactions needed to settle debts.

- **Activity & Settlement**:

  - Keep a clear chronological history of expenses and settlements.
  - Mark debts as settled once payments are completed.

- **Cross-Platform**:
  - Seamless experience across **iOS**, **Android**, and the **Web** powered by Expo Router.

---

## Tech Stack

- **Backend & Database**: [Supabase](https://supabase.com/) (PostgreSQL with Row Level Security & Realtime)
- **Framework**: [Expo](https://expo.dev/) (SDK 58) with [React Native](https://reactnative.dev/)
- **Routing**: [Expo Router](https://docs.expo.dev/router/introduction/) (File-based navigation)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Package Manager**: [pnpm](https://pnpm.io/)
- **Code Quality**: ESLint, Prettier, Husky, lint-staged, and Commitlint (Conventional Commits)

---

## Supabase Setup

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Fill in your project URL and Anon Key from your Supabase Dashboard:
   ```env
   EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```
3. Run the SQL schema and RLS policies from [supabase/schema.sql](supabase/schema.sql) in the Supabase SQL Editor.

---

## Getting Started

### Prerequisites

- **Node.js**: `>= 26` (see [.nvmrc](.nvmrc))
- **pnpm**: `>= 10.0.0`

### Installation

```bash
pnpm install
```

### Development

Start the development server:

```bash
pnpm start
# or
pnpm expo start
```

In the interactive terminal menu:

- Press `i` to launch in the **iOS Simulator**
- Press `a` to launch in the **Android Emulator**
- Press `w` to launch in the **Web browser**
- Scan the displayed QR code with the **Expo Go** app on a physical device

### Code Quality & Scripts

- **Typecheck**:
  ```bash
  pnpm run typecheck
  ```
- **Lint**:
  ```bash
  pnpm run lint
  # or auto-fix
  pnpm run lint:fix
  ```
- **Format**:
  ```bash
  pnpm run format
  # or check without writing
  pnpm run format:check
  ```
- **Tests**:
  ```bash
  pnpm test
  # or watch mode
  pnpm run test:watch
  ```

---

## Git & Commit Conventions

This project enforces [Conventional Commits](https://www.conventionalcommits.org/) via **Commitlint**, **Husky**, and **lint-staged**. Staged files are automatically formatted with Prettier and checked with ESLint upon commit.
