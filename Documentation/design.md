[design.md](https://github.com/user-attachments/files/31191629/design.md)
# Money Boss AI — Design Reference

> Gamified mobile finance app built with **Kiro IDE** · AI powered by **Amazon Bedrock**  
> Stack: React 19 · TypeScript · Tailwind CSS v4 · Lucide React · Express · Vite

---

## Table of Contents

1. [Design System](#1-design-system)
2. [SplashAuth](#2-splashauth)
3. [OnboardingFlow](#3-onboardingflow)
4. [CurrencySelectScreen](#4-currencyselectscreen)
5. [HomeDashboard](#5-homedashboard)
6. [RecordsManager](#6-recordsmanager)
7. [BudgetsGoalsScreen](#7-budgetsgoalsscreen)
8. [AnalyticsScreen](#8-analyticsscreen)
9. [AiCoachScreen](#9-aicoachscreen)
10. [SpendingReactionPopup](#10-spendingreactionpopup)
11. [RewardsScreen](#11-rewardsscreen)
12. [LeaderboardScreen](#12-leaderboardscreen)
13. [ProfileScreen](#13-profilescreen)
14. [MentorCard](#14-mentorcard)
15. [MentorInfoModal](#15-mentorinfomodal)
16. [BottomNav](#16-bottomnav)

---

## 1. Design System

**File:** `src/index.css`

```css
@import "tailwindcss";
```

### Color Palette

| Token | Value | Usage |
|---|---|---|
| Primary Purple | `#7B2EFF` | CTAs, active states, gradients |
| Deep Purple | `#5A1FCC` | Gradient endpoints |
| Fuchsia | `#C026D3` | Sister mentor accent |
| Emerald | `#10b981` | Income, success, savings |
| Amber | `#f59e0b` | Warning, multiplier, streaks |
| Rose | `#f43f5e` | Overspend, error states |
| Amazon Orange | `#FF9900` | Kiro / AWS branding |
| Background | `#000000` | Pure black canvas |
| Surface | `white/5` | Card backgrounds |
| Border | `white/10` | Card borders |

### Typography

| Font | Usage |
|---|---|
| `Space Grotesk` | Headlines, numbers, KP counter |
| `Inter` | Body text, labels, descriptions |

### Border Radius Scale

| Class | Radius | Usage |
|---|---|---|
| `rounded-xl` | 12px | Inputs, small buttons |
| `rounded-2xl` | 16px | Cards, modals |
| `rounded-3xl` | 24px | Primary cards, hero sections |
| `rounded-[44px]` | 44px | Phone canvas container |

### Shadows & Glow Effects

```
Purple glow:    shadow-[0_0_35px_rgba(123,46,255,0.45)]
Emerald glow:   shadow-[0_0_25px_rgba(16,185,129,0.5)]
Fuchsia glow:   shadow-[0_0_10px_rgba(192,38,211,0.8)]
Ambient card:   shadow-[0_8px_32px_rgba(0,0,0,0.6)]
```

### Gradient Patterns

```
Primary CTA:     bg-gradient-to-r from-[#7B2EFF] to-[#5A1FCC]
Goal card:       bg-gradient-to-br from-purple-900/40 via-indigo-900/30 to-black
Hero wallet:     bg-gradient-to-br from-purple-900/30 via-indigo-900/40 to-black
Savings goal:    bg-gradient-to-br from-[#12062a] to-black
Confirm button:  bg-gradient-to-r from-emerald-600 to-teal-600
```

### Animation Classes

```
animate-fadeIn      — screen entrance fade
animate-pulse       — active nav icon, live indicator dot
animate-spin        — loading spinner (RefreshCw)
animate-bounce      — onboarding step icon
active:scale-95     — button press feedback
active:scale-[0.98] — large button press
transition-all duration-700 — budget progress bars
```

### Phone Canvas

All screens render inside a fixed `390×844px` phone frame:

```tsx
<div className="w-[390px] h-[844px] rounded-[44px] border border-purple-500/30
     shadow-[0_0_80px_rgba(123,46,255,0.35)] bg-black overflow-hidden">
```

---

## 2. SplashAuth

**File:** `src/components/SplashAuth.tsx`

**Purpose:** Login/signup gate screen. Entry point before onboarding.

### Props

```ts
interface SplashAuthProps {
  onLoginSuccess: () => void;
}
```

### Layout Structure

```
radial-gradient background (purple → black)
  └── max-w-md centered column
        ├── BRANDING BLOCK
        │     ├── 👑 animated icon (80×80 rounded-3xl, purple glow)
        │     ├── "Money Boss AI" h1 (Space Grotesk, gradient text on "AI")
        │     ├── tagline italic
        │     └── "Built with Kiro · Amazon Bedrock" badge pill
        │
        ├── LOGIN CARD (rounded-3xl, bg-white/5, backdrop-blur-xl)
        │     ├── header row (title + "Demo Active" badge)
        │     ├── email input
        │     ├── password input + forgot link
        │     ├── "Sign In to Wallet" submit button (purple gradient)
        │     ├── OR divider
        │     └── "Continue with Amazon AWS" button (aws svg icon + orange)
        │
        ├── "Quick Start Onboarding" text link
        └── "AI powered by Amazon Bedrock · Built in Kiro IDE" footer
```

### Key Design Decisions

- **No Google OAuth** — replaced with Amazon AWS sign-in button using inline SVG with `#FF9900` orange brand color
- Login card uses `backdrop-blur-xl` + `bg-white/5` for frosted glass on dark background
- Kiro + Amazon Bedrock badge uses `text-orange-400` / `text-orange-300` to reinforce AWS identity
- Form inputs use `focus:border-purple-500 focus:ring-1 focus:ring-purple-500`
- Submit button uses `active:scale-[0.98]` for subtle press feedback

```tsx
// Kiro + AWS badge
<div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
  <span className="text-[10px] text-neutral-400 font-semibold uppercase tracking-wider">Built with</span>
  <span className="text-xs font-extrabold text-orange-400">Kiro</span>
  <span className="text-neutral-600 text-xs">•</span>
  <span className="text-xs font-extrabold text-orange-300">Amazon Bedrock</span>
</div>
```

---

## 3. OnboardingFlow

**File:** `src/components/OnboardingFlow.tsx`

**Purpose:** 4-step wizard collecting user setup data before entering the app.

### Props

```ts
interface OnboardingFlowProps {
  onCompleteOnboarding: (data: {
    currency: Currency;
    initialBalance: number;
    goalTitle: string;
    goalDesc: string;
    startDate: string;
    endDate: string;
    goalTarget: number;
    pmAmount: number;
    pmPeriod: 'weekly' | 'monthly';
    mentorId: number;
  }) => void;
  customMentorImages?: Record<number, string>;
  onUpdateCustomImage?: (mentorId: number, url: string) => void;
}
```

### Step Indicator

Sticky top bar with 4 pills. Active step = `w-8 bg-purple-500` with glow. Completed = `w-3 bg-purple-800`. Pending = `w-3 bg-neutral-800`.

### Step 1 — Wallet Setup

- Animated 💳 icon (bounce)
- 2-column currency grid (max-h-48, scrollable): flags + name + symbol
- Selected currency: `bg-purple-900/40 border-purple-500 shadow glow`
- Large numeric display card: `Space Grotesk text-4xl` with currency symbol
- 3×4 numeric keypad: `h-14 rounded-2xl bg-white/5` keys

### Step 2 — Financial Goal Setup

- 🎯 icon (fuchsia gradient)
- Text inputs for title, description, start/end dates, target amount
- Goal timeline preview: purple progress bar at 35% by default
- Purple quote block at bottom

### Step 3 — Pocket Money Commitment

- 💰 icon (amber→purple gradient)
- Weekly / Monthly toggle (purple active pill)
- Large amount display + same numeric keypad
- Italic quote: *"Discipline today, freedom tomorrow."*

### Step 4 — Mentor Selection

- Badge: **"Kiro AI System"** (replaces original "Signature AI System")
- Vertically scrollable list of 4 full-width `MentorCard` components
- Final CTA: emerald gradient "Confirm Mentor & Launch Money Boss AI"
- `MentorInfoModal` rendered as overlay for detailed dossier view

### Keypad Implementation

```ts
const handleKeypadPress = (key, currentValue, setValue) => {
  if (key === '⌫') setValue(prev => prev.length > 1 ? prev.slice(0, -1) : '0');
  else if (key === '.') { if (!currentValue.includes('.')) setValue(prev => prev + '.'); }
  else setValue(prev => prev === '0' ? key : prev + key);
};
```

---

## 4. CurrencySelectScreen

**File:** `src/components/CurrencySelectScreen.tsx`

**Purpose:** Full-screen currency picker with search and confirm.

### Props

```ts
interface CurrencySelectScreenProps {
  currentCurrency: Currency;
  onSelectCurrency: (currency: Currency) => void;
  onNavigateBack: () => void;
}
```

### Supported Currencies

`USD · INR · EUR · GBP · JPY · SGD · MYR · THB · PHP · IDR · AED`

### Layout Structure

```
Page (bg-black, pb-28)
  ├── Header (back button + "Currency Selection 🌐" title)
  ├── ACTIVE CURRENCY BANNER
  │     ├── "Active Currency Preference" label + code badge
  │     └── flag emoji + name + symbol (emerald) + region + sample
  ├── SEARCH INPUT (Search icon left, placeholder hints)
  ├── CURRENCY LIST (grid-cols-1, gap-3)
  │     └── Each item: flag + name + code + symbol + sample format
  │           Selected: bg-purple-900/30 + glow border
  │           Unselected: bg-white/5
  └── FIXED BOTTOM CONFIRM BAR
        └── emerald gradient "Apply [Name] ([Symbol]) Base Currency" button
```

### Selection State

```tsx
// Selected item glow
'bg-purple-900/30 border-purple-500/80 shadow-[0_0_20px_rgba(123,46,255,0.3)]'

// Checkmark circle
<div className="w-6 h-6 rounded-full bg-emerald-500 text-black">
  <Check size={14} />
</div>
```

---

## 5. HomeDashboard

**File:** `src/components/HomeDashboard.tsx`

**Purpose:** Main app hub. Displays balance, goal progress, pocket money, mentor zone, transactions, chart, and upcoming payments.

### Props

```ts
interface HomeDashboardProps {
  balance: number;
  currency: Currency;
  currencySymbol: string;
  mentor: Mentor;
  kp: number;
  multiplier: number;
  transactions: Transaction[];
  budgets: CategoryBudget[];
  goal: FinancialGoal;
  pmLeft: number;
  pmTotal: number;
  onNavigate: (screen: any) => void;
  onTriggerReaction: (cat: string, name: string, amount: number) => void;
  customImage?: string;
}
```

### Layout Sections (top → bottom)

#### Header
```
"Welcome Back 👋" + "Money Boss HQ" title
Bell icon → navigates to Analytics (has purple dot notification)
```

#### Wallet Card
- `bg-gradient-to-br from-purple-900/30 via-indigo-900/40 to-black`
- Absolute blur circle top-right + faded `₹ $` watermark bottom-right
- Currency switch pill → navigates to `currency-select`
- Balance: `Space Grotesk text-4xl` with `text-emerald-400` symbol
- Bottom row: Cash Wallet (25%) + Bank Accounts (75%) + Add button

#### Goal Progress Card
- SVG circular progress ring (rotated -90°, `text-purple-400`)
- Percentage center label
- Goal title, description, saved amount, target
- Tappable → navigates to `budgets`

#### Pocket Money Widget
- Large remaining amount display
- Progress bar: purple (>50%) → amber (>20%) → rose (≤20%)
- 4-column category chip grid showing remaining per category

#### Mentor Reaction Zone
- Mentor avatar (custom image or emoji fallback)
- Active mentor name + mood status badge (`Good Standing / Warning State / Critical Guard`)
- Mentor's current warning line (italic, truncated)
- "Tap to consult AI Money Coach (Kiro + Bedrock)" — navigates to `ai-coach`

#### Recent Transactions List
- 5 most recent, divided rows
- Click expense → triggers `onTriggerReaction` → opens `SpendingReactionPopup`
- Income: `text-emerald-400` • Expense: `text-rose-400`

#### 30-Day Spending Bar Chart
- W / M period toggle
- 12 mock bars, highlighted bar at index 7 (fuchsia gradient)
- Week labels beneath

#### Upcoming Planned Payments
- Mobile Fiber Bill (Aug 18)
- **AWS Cloud Plan** (Aug 22) — orange ☁️ icon (Amazon branding)

---

## 6. RecordsManager

**File:** `src/components/RecordsManager.tsx`

**Purpose:** Transaction logging screen with numeric keypad, category selection, and searchable history.

### Props

```ts
interface RecordsManagerProps {
  currencySymbol: string;
  transactions: Transaction[];
  onAddTransaction: (txn: Omit<Transaction, 'id'>) => void;
  onNavigate: (screen: any) => void;
}
```

### Tab System

| Tab | Gradient | Category |
|---|---|---|
| Expense | `from-[#7B2EFF] to-[#5A1FCC]` | Food (default) |
| Income | `from-emerald-600 to-teal-600` | Income |
| Transfer | `from-blue-600 to-indigo-600` | Other |

### Form Fields

- **Amount display** — `Space Grotesk text-4xl` with currency symbol
- **Category pills** — horizontal scroll, `Food 🍜 / Wants 🎮 / Transport 🚌 / Health 💊 / Other 📦`
- **Account select** — `Cash / Bank Account / Card`
- **Date input** — `type="date"`
- **Note input** — merchant description / free text

### Keypad

- 3×4 grid (`1-9`, `.`, `0`, `⌫`)
- `h-12 rounded-xl` keys with `hover:bg-purple-600/20`

### Transaction History

- Search bar with `Search` icon left-aligned
- Divided list rows: icon + name + category/account/date + colored amount

---

## 7. BudgetsGoalsScreen

**File:** `src/components/BudgetsGoalsScreen.tsx`

**Purpose:** Manage category budget allocations and savings goals/quests.

### Props

```ts
interface BudgetsGoalsScreenProps {
  currencySymbol: string;
  budgets: CategoryBudget[];
  goals: FinancialGoal[];
  onAddBudget: (b: Omit<CategoryBudget, 'id'>) => void;
  onAddGoal: (g: Omit<FinancialGoal, 'id' | 'savedAmount'>) => void;
  onNavigate: (screen: any) => void;
}
```

### Total Budget Banner

- Purple→indigo→black gradient card
- Total spent / total limit display
- Progress bar: rose (>85%) → amber (>70%) → purple gradient (normal)
- Remaining text in `text-neutral-300`

### Category Budget Cards

Each card shows:
- Icon + category name + spent/limit
- Progress bar: rose (≥90%) → amber (≥75%) → emerald (normal)
- Remaining amount + percentage used

### Savings Goals Quests

Each goal card:
- `bg-gradient-to-br from-[#12062a] to-black`
- Title + description + target amount (right)
- `from-emerald-500 to-teal-400` progress bar
- Deadline + completion percentage

### Modals

Both Budget and Goal creation modals:
- Fixed overlay: `bg-black/80 backdrop-blur-md`
- `bg-neutral-900 border border-purple-500/40 rounded-3xl`
- Appear from bottom on mobile (`items-end sm:items-center`)

---

## 8. AnalyticsScreen

**File:** `src/components/AnalyticsScreen.tsx`

**Purpose:** Detailed spending analytics with period filter, donut chart, heatmap, and savings trend line.

### Props

```ts
interface AnalyticsScreenProps {
  currencySymbol: string;
  onNavigate: (screen: any) => void;
}
```

### Period Toggle

`Day / Week / Month / Year` — active pill: `bg-purple-600 text-white shadow-lg`

### Category Breakdown Donut

SVG donut with 4 segments (rotated -90°):

| Segment | Color | Category |
|---|---|---|
| `#3b82f6` (blue) | 60/238 | Transport 16% |
| `#a855f7` (purple) | 80/238 | Wants 30% |
| `#f97316` (orange) | 50/238 | Food 43% |
| `#10b981` (emerald) | 48/238 | Health 11% |

Center label: total spent + "Total Spent" subtitle.

### Spending Heatmap

35-cell 7-column grid (5 weeks × 7 days). Intensity levels:

| Level | Class |
|---|---|
| 0 | `bg-white/5` |
| 1 | `bg-purple-900/40 border border-purple-500/20` |
| 2 | `bg-purple-700/60 border border-purple-500/40` |
| 3 | `bg-purple-600 border border-purple-400` |
| 4 | `bg-fuchsia-500 shadow-[0_0_10px_rgba(192,38,211,0.8)]` |

### Savings Rate Line Graph

SVG path with cubic bezier curve + gradient fill underneath:

```svg
<path d="M0,45 C50,40 100,20 150,25 C200,30 250,10 300,8"
  stroke="#10b981" strokeWidth="3" />
```

Month labels: Mar → Aug.

### Footer

```
"Analytics powered by Kiro + Amazon Bedrock"
text-orange-400 · text-orange-300
```

---

## 9. AiCoachScreen

**File:** `src/components/AiCoachScreen.tsx`

**Purpose:** Chat interface with AI Money Coach powered by Amazon Bedrock via Kiro.

### Props

```ts
interface AiCoachScreenProps {
  mentor: Mentor;
  currencySymbol: string;
  balance: number;
  pmLeft: number;
  pmTotal: number;
  goalTitle: string;
  goalProgress: number;
  kp: number;
  multiplier: number;
  streak: number;
  onNavigate: (screen: any) => void;
  customImage?: string;
}
```

### Layout Structure

```
Sticky Top Bar (bg-black/90 backdrop-blur-md)
  ├── Back button
  ├── Mentor avatar (10×10 rounded-xl) + "AI Money Coach" title
  ├── Live indicator: "🟢 Live · Amazon Bedrock" (text-emerald-400)
  ├── Voice output toggle (Volume2 / VolumeX)
  └── Tone toggle: "🎭 Mentor Voice" / "👔 Neutral"

Messages Area (flex-1, overflow-y-auto)
  ├── User messages: right-aligned, purple gradient bubble
  ├── Bot messages: left-aligned, bg-white/10 border-purple-500/30
  └── Loading: RefreshCw spin + "{mentor.name} is consulting Amazon Bedrock..."

Quick Suggestions (horizontal scroll)
  └── 5 pill buttons with 💡 prefix

Input Bar (rounded-2xl bg-white/5 backdrop-blur-xl)
  ├── Text input (transparent bg)
  ├── Mic button (rose pulse when active)
  └── Send button (purple gradient, disabled:opacity-50)
```

### API Call

```ts
POST /api/ai-coach
{
  message: string,
  mentor: { name, personality, quote },
  tone: 'mentor' | 'neutral',
  userData: { currency, balance, pmLeft, pmTotal, goalTitle, goalProgress, kp, multiplier, streak }
}
// Response: { reply: string }
// Backend: Amazon Bedrock → Claude 3 Sonnet
```

### Voice Features

- **Output**: `window.speechSynthesis` — pitch varies by mentor ID
- **Input**: `webkitSpeechRecognition` / `SpeechRecognition` Web API

### Initial Welcome Message

```
"Hello! I'm your AI Money Coach, powered by Amazon Bedrock via Kiro.
I have live access to your {balance} balance, your {pmLeft} pocket budget,
and your savings goals. What financial question can I help you analyze?"
```

---

## 10. SpendingReactionPopup

**File:** `src/components/SpendingReactionPopup.tsx`

**Purpose:** Full-screen overlay popup triggered after each expense transaction. Mentor reacts based on budget status.

### Props

```ts
interface SpendingReactionPopupProps {
  reaction: ReactionData | null;
  mentor: Mentor;
  isOpen: boolean;
  onClose: () => void;
  customImage?: string;
}

interface ReactionData {
  category: string;
  itemName: string;
  amount: number;
  catRemaining: number;
  daysLeft: number;
  status: 'good' | 'warn' | 'over';
  kpChange: number;
  multiplierChange: number;
  line: string;
}
```

### Status Themes

| Status | Background | Shadow |
|---|---|---|
| `good` | `bg-emerald-950/90 border-emerald-500/50` | `rgba(16,185,129,0.3)` |
| `warn` | `bg-amber-950/90 border-amber-500/50` | `rgba(245,158,11,0.3)` |
| `over` | `bg-rose-950/90 border-rose-600/60` | `rgba(220,38,38,0.4)` |

### Reaction Emojis

| Status | Default | Mother (id=4) |
|---|---|---|
| `good` | 🥳 | 🥳 |
| `warn` | 🤨 | 🤨 |
| `over` | 😤 | 💥 |

### Layout

```
Full-screen overlay (bg-black/90 backdrop-blur-md)
  └── Modal (max-w-sm, rounded-3xl, status-colored)
        ├── X close button (absolute top-right)
        ├── Mentor avatar (28×28) + reaction emoji badge (bottom-right)
        ├── Status badge + "{mentor.name} Reacts" heading
        ├── Mentor quote in italic card (bg-black/50)
        ├── 2×2 Stats Grid
        │     ├── Category remaining
        │     ├── Days remaining
        │     ├── KP impact (green/red)
        │     └── Current multiplier (amber)
        └── "Acknowledge & Continue" purple gradient button
```

---

## 11. RewardsScreen

**File:** `src/components/RewardsScreen.tsx`

**Purpose:** Gamification hub — KP counter, streak tracking, reward shop, and achievements.

### Props

```ts
interface RewardsScreenProps {
  kp: number;
  multiplier: number;
  mentor: Mentor;
  shopItems: ShopItem[];
  achievements: Achievement[];
  onPurchaseItem: (itemId: string, cost: number) => void;
  onNavigate: (screen: any) => void;
  customImage?: string;
}
```

### KP Hero Counter

- `Space Grotesk text-5xl font-black` with `bg-gradient-to-r from-purple-300 via-fuchsia-300 to-amber-300 bg-clip-text text-transparent`
- 3-column grid below: Multiplier (amber) · Level 7 (purple) · Mentor emoji

### Active Streaks

2-column grid:
- 🔥 No-Overspend Streak (amber border)
- ⚡ Daily Logging Streak (purple border, +0.2x boost badge)

### Reward Shop

2-column grid of shop item cards:
- Gradient icon area (h-16, item gradient background)
- Item name + KP cost
- Purchase button states:
  - **Unlocked**: emerald badge "Unlocked"
  - **Affordable**: purple "Purchase Item"
  - **Locked**: neutral "Need X KP" with Lock icon

### Achievements

Divided list rows. Earned items: full opacity with `Check` icon. Locked: `opacity-50`.

---

## 12. LeaderboardScreen

**File:** `src/components/LeaderboardScreen.tsx`

**Purpose:** Anonymized global savings & discipline rankings.

### Props

```ts
interface LeaderboardScreenProps {
  users: LeaderboardUser[];
  onNavigate: (screen: any) => void;
}
```

### User Pinned Rank Banner

- Purple→indigo→black gradient card with glow
- Large `#rank` box (purple)
- Name + streak/savedPct stats
- Score (amber, `Space Grotesk text-2xl font-black`)
- Rank change: `ArrowUpRight + "+N Ranks"` (emerald)

### Leaderboard Table

Divided rows. Current user highlighted:
- `bg-purple-900/20 border-l-4 border-l-purple-500`

Rank badge colors:

| Rank | Colors |
|---|---|
| 1 | `text-amber-400 bg-amber-500/20 border-amber-500/40` |
| 2 | `text-neutral-300 bg-neutral-400/20` |
| 3 | `text-amber-600 bg-amber-700/20` |
| 4+ | `text-neutral-500 bg-white/5` |

Medal emojis: 🥇 🥈 🥉 for top 3.

---

## 13. ProfileScreen

**File:** `src/components/ProfileScreen.tsx`

**Purpose:** User profile, mentor controls, currency, preferences, and security settings.

### Props

```ts
interface ProfileScreenProps {
  mentor: Mentor;
  kp: number;
  multiplier: number;
  streak: number;
  currency: Currency;
  onCurrencyChange: (c: Currency) => void;
  onNavigate: (screen: any) => void;
  customMentorImages?: Record<number, string>;
  onUpdateCustomImage?: (mentorId: number, url: string) => void;
}
```

### Hero Profile Card

- Mentor avatar (96×96, rounded-3xl, purple glow)
- Username + Level 7 tag
- Active mentor badge (purple pill)
- 3-stat grid: KP (purple) · Multiplier (amber) · Streak (emerald)

### Settings List (divided rows)

| Setting | Icon | Color | Action |
|---|---|---|---|
| Switch Mentor | 👑 | purple | → `mentor-select` |
| Custom Character Images | ImageIcon | fuchsia | expand inline form |
| Base Wallet Currency | DollarSign | blue | → `currency-select` |
| Dark Theme Mode | Moon | indigo | local toggle |
| Push Reminders | Bell | emerald | local toggle |
| Biometric Unlock | Fingerprint | amber | local toggle |

### Toggle Component

```tsx
const Toggle = ({ value, onChange }) => (
  <button className={`w-12 h-6 rounded-full p-0.5 ${value ? 'bg-purple-600' : 'bg-neutral-700'}`}>
    <div className={`w-5 h-5 rounded-full bg-white transition-transform
      ${value ? 'translate-x-6' : 'translate-x-0'}`} />
  </button>
);
```

### Footer Attribution

```
"AI Coach powered by Amazon Bedrock · Built with Kiro IDE"
text-orange-400 · text-purple-400
```

---

## 14. MentorCard

**File:** `src/components/MentorCard.tsx`

**Purpose:** Selectable mentor character card used in OnboardingFlow and Mentor Selection screen.

### Props

```ts
interface MentorCardProps {
  mentor: Mentor;
  isSelected: boolean;
  onSelect: (mentorId: number) => void;
  onOpenInfo: (mentorId: number) => void;
  customImage?: string;
}
```

### Theme Classes

| ID | Name | Background | Border |
|---|---|---|---|
| `m1` | Brother | `from-[#0d0d1a] via-[#12062a] to-[#080820]` | `border-purple-500/30` |
| `m2` | Sister | `from-[#160820] via-[#2d0a3a] to-[#100510]` | `border-fuchsia-500/30` |
| `m3` | Father | `from-[#0a0a0a] via-[#1a1a2e] to-[#080808]` | `border-purple-600/30` |
| `m4` | Mother | `from-[#0a0000] via-[#1a0010] to-[#08000a]` | `border-red-500/30` |

### Selected State

```
ring-2 ring-purple-500 shadow-[0_0_35px_rgba(123,46,255,0.45)] scale-[1.01]
```

### Card Anatomy

```
Card (rounded-3xl, theme gradient)
  ├── HEADER ROW
  │     ├── Avatar (96×96, custom image or emoji fallback)
  │     └── Info column
  │           ├── Difficulty badge (mentor.color dynamic styling)
  │           ├── Name (Space Grotesk text-xl)
  │           ├── Personality tag (neutral-400)
  │           └── Quote (left border in mentor.color, italic)
  │
  ├── STATS ROW (3-column grid)
  │     ├── +N KP Reward (emerald)
  │     ├── Penalty (rose / neutral)
  │     └── Max Multiplier (amber)
  │
  ├── RULES BOX (bg-white/5 rounded-2xl)
  │     └── ShieldAlert icon + bullet list
  │
  └── BUTTONS ROW
        ├── "Behavior Info" (neutral ghost)
        └── "Select Mentor" / "Active Mentor ✓" (purple → emerald when selected)
```

---

## 15. MentorInfoModal

**File:** `src/components/MentorInfoModal.tsx`

**Purpose:** Full-screen detailed dossier for a mentor. Includes personality overview, spending rules, rewards/penalties matrix, and voice sample quotes.

### Props

```ts
interface MentorInfoModalProps {
  mentor: Mentor | null;
  isOpen: boolean;
  onClose: () => void;
  onSelect: (mentorId: number) => void;
  customImage?: string;
  onUpdateCustomImage?: (mentorId: number, url: string) => void;
}
```

### Layout

```
Fixed full-screen (bg-black/95 backdrop-blur-xl)
  ├── STICKY HEADER
  │     ├── Back (ArrowLeft)
  │     ├── "Mentor Dossier: {name}"
  │     └── "Select" button (purple)
  │
  └── SCROLLABLE CONTENT
        ├── HERO SECTION
        │     ├── 128×128 avatar (purple glow border) + 📷 image URL button
        │     ├── Custom URL input form (collapsible)
        │     ├── Name (Space Grotesk text-2xl)
        │     └── Difficulty (mentor.color)
        │
        ├── BEHAVIORAL PERSONALITY card (bg-white/5)
        ├── SPENDING BLOCK & WARNING PROTOCOL card (amber heading)
        ├── REWARDS & PENALTIES (2-column grid)
        │     ├── Emerald card (rewards)
        │     └── Rose card (penalties)
        │
        ├── VOICE & REACTIONS PREVIEW
        │     ├── Under Budget (emerald)
        │     ├── Near Category Limit (amber)
        │     └── Overspend Breach (rose)
        │
        └── "Choose {name} as Mentor" CTA (purple gradient, full-width)
```

### Custom Image URL System

```tsx
// Camera icon button on avatar triggers collapsible form
<button onClick={() => setShowImageInput(!showImageInput)}>
  <ImageIcon size={14} />
</button>

// Input accepts any direct image URL
// Saved via onUpdateCustomImage(mentor.id, url)
// Images stored in App.tsx customMentorImages: Record<number, string>
```

---

## 16. BottomNav

**File:** `src/components/BottomNav.tsx`

**Purpose:** Persistent mobile bottom navigation bar. Hidden on auth/onboarding screens.

### Props

```ts
interface BottomNavProps {
  activeScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
}
```

### Tab Configuration

| ID | Label | Icon |
|---|---|---|
| `home` | Home | `Home` |
| `budgets` | Budgets | `PieChart` |
| `rewards` | Rewards | `Star` |
| `ai-coach` | AI Coach | `Bot` |
| `leaderboard` | Ranks | `Trophy` |

### Hidden On

`['splash', 'auth', 'ob1', 'ob2', 'ob3']`

### Styling

```
Position: fixed bottom-0, z-40
Background: bg-black/90 backdrop-blur-2xl
Border: border-t border-purple-500/20
Max width: max-w-md mx-auto (centered in phone canvas)
```

Active tab:
```
bg-purple-600/20 text-purple-300
border border-purple-500/40
shadow-[0_0_15px_rgba(123,46,255,0.3)]
Icon: text-purple-400 animate-pulse
```

Inactive tab:
```
text-neutral-400 hover:text-neutral-200
```

---

## Screen Navigation Map

```
auth
  └── ob1 / ob2 / ob3 (OnboardingFlow)
        └── home (HomeDashboard)
              ├── records    (RecordsManager)
              ├── budgets    (BudgetsGoalsScreen)
              ├── rewards    (RewardsScreen)
              ├── ai-coach   (AiCoachScreen)
              ├── leaderboard (LeaderboardScreen)
              ├── analytics  (AnalyticsScreen)
              ├── profile    (ProfileScreen)
              ├── mentor-select (MentorCard list + MentorInfoModal)
              └── currency-select (CurrencySelectScreen)

Global Overlay (any screen):
  └── SpendingReactionPopup (triggered by expense transactions)
```

---

## Tech Stack Summary

| Layer | Technology |
|---|---|
| UI Framework | React 19 + TypeScript |
| Styling | Tailwind CSS v4 (`@import "tailwindcss"`) |
| Icons | Lucide React |
| Fonts | Space Grotesk (headings) · Inter (body) |
| Build | Vite 6 |
| Server | Express 4 |
| AI Backend | **Amazon Bedrock** — Claude 3 Sonnet (`anthropic.claude-3-sonnet-20240229-v1:0`) |
| AWS SDK | `@aws-sdk/client-bedrock-runtime` |
| IDE | **Kiro IDE** (built with Kiro) |

---

*Built with Kiro · Powered by Amazon Bedrock*
