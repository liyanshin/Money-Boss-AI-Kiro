[workflow.md](https://github.com/user-attachments/files/31191608/workflow.md)
# Money Boss AI — Workflow Documentation

## 1. Project Overview

**Money Boss AI** is a mobile-first personal finance application built with React and TypeScript.

The application combines:

- Personal wallet and transaction tracking
- Category budgets
- Financial savings goals
- Pocket-money limits
- Mentor-based financial accountability
- Gamification using Kinetic Points (KP)
- Reward shop and achievements
- Global savings leaderboard
- AI financial coaching
- Voice input and voice output
- Multi-currency support
- Custom mentor character images
- Amazon Bedrock integration
- Kiro IDE branding/integration

The UI is designed as a vertical mobile application with a fixed `390px × 844px` phone canvas and a dark black/purple visual theme.

---

# 2. High-Level Application Flow

```text
                    ┌──────────────────┐
                    │   Splash / Auth  │
                    │  SplashAuth.tsx  │
                    └────────┬─────────┘
                             │ Login / Quick Start
                             ▼
                    ┌──────────────────┐
                    │    Onboarding    │
                    │OnboardingFlow.tsx│
                    └────────┬─────────┘
                             │
             ┌───────────────┼────────────────┐
             │               │                │
             ▼               ▼                ▼
       Currency Setup    Goal Setup      Pocket Budget
             │               │                │
             └───────────────┼────────────────┘
                             ▼
                    ┌──────────────────┐
                    │ Mentor Selection │
                    │  MentorCard(s)   │
                    └────────┬─────────┘
                             │ Confirm
                             ▼
                    ┌──────────────────┐
                    │ Home Dashboard   │
                    │HomeDashboard.tsx │
                    └────────┬─────────┘
                             │
       ┌─────────────┬───────┼────────┬──────────────┐
       ▼             ▼       ▼        ▼              ▼
    Records       Budgets  Rewards  AI Coach     Leaderboard
       │             │       │        │              │
       └─────────────┴───────┴────────┴──────────────┘
                             │
                             ▼
                    Profile / Settings
```

---

# 3. Application Entry Point

## `App.tsx`

`App.tsx` is the main application controller.

It manages:

- Current screen
- Currency
- Wallet balance
- Pocket-money allowance
- Active mentor
- Kinetic Points
- Multiplier
- Streak
- Transactions
- Budgets
- Financial goals
- Shop items
- Achievements
- Leaderboard
- Custom mentor images
- Spending-reaction popup

### Initial state

```text
screen            = auth
currency          = INR
balance           = 47820
pmTotal           = 5900
pmLeft            = 3200
activeMentorId    = 3
kp                = 2450
multiplier        = 2.4
streak            = 7
```

Initial data is loaded from:

```text
data/initialData
data/mentors
```

---

# 4. Screen Navigation

The application uses a `ScreenId` state rather than a routing library.

Navigation is performed using:

```tsx
setScreen(...)
```

The primary screens are:

```text
auth
ob1
ob2
ob3
home
records
budgets
rewards
ai-coach
leaderboard
analytics
profile
mentor-select
currency-select
```

### Navigation examples

```text
Auth
  ↓
ob1
  ↓
ob2
  ↓
ob3
  ↓
home
```

From Home:

```text
Home
 ├── records
 ├── budgets
 ├── rewards
 ├── ai-coach
 ├── leaderboard
 ├── analytics
 ├── profile
 ├── mentor-select
 └── currency-select
```

---

# 5. Authentication Workflow

## `SplashAuth.tsx`

The authentication screen provides:

- Email field
- Password field
- Sign-in button
- Forgot-password link
- Continue with Amazon AWS button
- Quick Start Onboarding

### Current behavior

Authentication is currently a demo flow.

The submitted credentials are not validated.

```text
Submit form
   ↓
onLoginSuccess()
   ↓
screen = ob1
```

The Amazon AWS button and Quick Start button also directly call:

```tsx
onLoginSuccess()
```

### Important implementation note

This is currently **demo authentication**, not production authentication.

A production implementation should connect the flow to a real identity provider and session/token management.

---

# 6. Onboarding Workflow

## `OnboardingFlow.tsx`

The onboarding process has four steps.

```text
Step 1 → Wallet
Step 2 → Financial Goal
Step 3 → Pocket Money
Step 4 → Mentor
```

---

## Step 1 — Wallet Setup

User selects:

- Base currency
- Starting wallet balance

Supported onboarding currencies include:

```text
USD
INR
EUR
GBP
JPY
SGD
MYR
AED
```

The amount is entered through a custom numeric keypad.

### Data generated

```ts
currency
initialBalance
```

Clicking:

**Continue to Goal Setup**

moves to Step 2.

---

# 7. Step 2 — Financial Goal

The user enters:

- Goal title
- Goal description
- Start date
- Target date
- Target amount

Example:

```text
Goal:
Save ₹10,000 Milestone

Description:
Build an emergency fund and invest in growth stocks

Target:
₹10,000
```

The goal is treated as the primary financial quest.

Clicking:

**Continue to Pocket Budget**

moves to Step 3.

---

# 8. Step 3 — Pocket Money Commitment

The user chooses:

```text
Weekly Allowance
or
Monthly Pocket Pool
```

The user then enters the spending allowance.

A value greater than zero is required.

Example:

```text
Monthly Pocket Pool
₹5,900
```

Clicking:

**Select Your Mentor**

moves to Step 4.

---

# 9. Step 4 — Mentor Selection

Four mentors are available:

```text
Mentor 1
Mentor 2
Mentor 3
Mentor 4
```

Each mentor can influence:

- Warning behavior
- Spending reactions
- KP rewards
- KP penalties
- Multiplier changes
- Maximum multiplier
- AI coaching personality
- Voice tone
- Reaction messages

The user can:

- Select a mentor
- Open mentor information
- Configure custom mentor images

Clicking:

**Confirm Mentor & Launch Money Boss AI**

calls:

```tsx
onCompleteOnboarding(...)
```

---

# 10. Completing Onboarding

`App.tsx` receives the onboarding data through:

```tsx
handleCompleteOnboarding()
```

The following state is updated:

```text
currency
balance
pmTotal
pmLeft
activeMentorId
goals
```

A new primary goal is inserted into the goals collection.

The application then navigates to:

```text
home
```

---

# 11. Home Dashboard

## `HomeDashboard.tsx`

The Home screen is the central financial overview.

It displays:

### Wallet

- Total wallet balance
- Cash wallet estimate
- Bank account estimate
- Current currency
- Add transaction button

The current demo splits:

```text
Cash Wallet    = 25% of balance
Bank Accounts  = 75% of balance
```

---

# 12. Goal Progress

The dashboard calculates:

```text
goalPct =
(savedAmount / targetAmount) × 100
```

The value is capped at 100%.

The goal card displays:

- Current saved amount
- Target amount
- Goal title
- Goal description
- Circular progress indicator

Selecting the goal card opens:

```text
Budgets / Goals
```

---

# 13. Pocket Money System

The Home dashboard calculates:

```text
pmPct =
(pmLeft / pmTotal) × 100
```

The status is determined by remaining pocket money.

### Good standing

```text
pmPct > 50
```

### Warning

```text
20 < pmPct <= 50
```

### Critical

```text
pmPct <= 20
```

The visual state changes accordingly.

The dashboard also shows the remaining amount for the first four budget categories.

---

# 14. Mentor Reaction Zone

The dashboard contains an active mentor card.

It displays:

- Mentor character
- Mentor name
- Current budget mood
- Mentor warning line
- AI Coach entry point

Selecting the mentor card opens:

```text
AI Coach
```

---

# 15. Recent Transactions

The Home dashboard displays the five most recent transactions.

Expense transactions can be clicked to trigger:

```tsx
onTriggerReaction(...)
```

This opens the mentor reaction popup.

---

# 16. Spending Chart

The Home screen contains a spending chart with:

```text
W = Weekly
M = Monthly
```

The current implementation uses demo spending values.

The chart is visual only and is not yet dynamically calculated from the transaction collection.

---

# 17. Upcoming Payments

The dashboard displays planned payments such as:

```text
Mobile Fiber Bill
AWS Cloud Plan
```

These are currently static demo entries.

---

# 18. Transaction Management

## `RecordsScreen.tsx`

The Records Manager handles:

- Expenses
- Income
- Transfers
- Amount entry
- Categories
- Account source
- Date
- Merchant/note
- Search
- Transaction history

---

## Transaction Types

```text
expense
income
transfer
```

### Expense categories

```text
Food
Wants
Transport
Health
Other
```

---

# 19. Adding a Transaction

When the user presses:

```text
Record EXPENSE
Record INCOME
Record TRANSFER
```

the component creates transaction data and sends it to:

```tsx
onAddTransaction()
```

`App.tsx` then creates an ID:

```tsx
id: 't_' + Date.now()
```

and inserts the transaction into the transaction collection.

---

# 20. Expense Processing

For expenses:

```text
Transaction added
      ↓
Balance decreases
      ↓
Pocket money decreases
      ↓
Matching category budget increases spent amount
      ↓
Mentor reaction is calculated
      ↓
KP/multiplier updated
      ↓
Reaction popup displayed
```

Balance cannot go below zero because the implementation uses:

```tsx
Math.max(0, previousBalance - amount)
```

Pocket money is also prevented from becoming negative.

---

# 21. Income Processing

For income:

```text
Income transaction
      ↓
Balance increases
```

The current implementation does not increase pocket money or KP directly from income.

---

# 22. Budget Matching

When an expense is added, the application searches for a matching category:

```tsx
b.cat.toLowerCase().includes(
  newTxn.cat.toLowerCase()
)
```

If a matching budget exists:

```text
newSpent =
currentSpent + transactionAmount
```

The category budget is updated.

---

# 23. Mentor Reaction Engine

The reaction engine is implemented in:

```text
App.tsx
→ triggerMentorReaction()
```

It determines:

```text
Category
Item
Amount
Remaining category budget
Status
KP change
Multiplier change
Mentor reaction line
```

---

# 24. Spending Status Logic

A category's spending percentage is calculated as:

```text
percentage =
(spent + newAmount) / categoryLimit
```

### Good

```text
percentage < 75%
```

### Warning

```text
75% <= percentage < 100%
```

### Over Budget

```text
percentage >= 100%
```

---

# 25. KP Reward System

For a transaction that does not breach the budget:

```text
KP += mentor.rewardKP
```

For an overspend:

```text
KP -= mentor.penaltyKP
```

KP cannot fall below zero.

---

# 26. Multiplier System

For successful spending:

```text
multiplier += mentor.rewardMult
```

The multiplier is capped at:

```text
mentor.maxMult
```

For an overspend:

```text
multiplier -= mentor.penaltyMult
```

The multiplier cannot fall below:

```text
1.0x
```

Mentor 4 has special behavior:

```text
overspend → multiplier = 1.0x
```

---

# 27. Spending Reaction Popup

## `SpendingReactionPopup.tsx`

The popup communicates the financial result of a transaction.

Possible states:

```text
good
warn
over
```

### Good

```text
Transaction Approved
🥳
```

### Warning

```text
Category Warning Triggered
🤨
```

### Overspend

```text
Budget Breach Detected!
😤
```

Mentor 4 uses:

```text
💥
```

for the overspend reaction.

---

# 28. Reaction Popup Information

The popup displays:

- Mentor avatar
- Status
- Mentor reaction quote
- Category remaining
- Days remaining
- KP impact
- Current multiplier

The user closes it with:

```text
Acknowledge & Continue
```

---

# 29. AI Money Coach

## `AiCoachScreen.tsx`

The AI Coach provides conversational financial guidance.

The initial assistant message contains live application state such as:

```text
Current balance
Pocket budget remaining
Savings goals
```

---

# 30. AI Coach API Workflow

When a message is submitted:

```text
User message
      ↓
AiCoachScreen
      ↓
POST /api/ai-coach
      ↓
Backend AI service
      ↓
Amazon Bedrock
      ↓
AI response
      ↓
Chat message
      ↓
Optional voice output
```

The request contains:

```json
{
  "message": "...",
  "mentor": {
    "name": "...",
    "personality": "...",
    "quote": "..."
  },
  "tone": "mentor",
  "userData": {
    "currency": "...",
    "balance": 0,
    "pmLeft": 0,
    "pmTotal": 0,
    "goalTitle": "...",
    "goalProgress": 0,
    "kp": 0,
    "multiplier": 0,
    "streak": 0
  }
}
```

---

# 31. AI Coach Error Handling

If the API fails:

```text
AI API error
      ↓
Console error
      ↓
Fallback mentor message
```

The fallback response uses the user's:

- Current balance
- Remaining pocket budget
- Mentor quote

This ensures the UI still responds even when the AI service is unavailable.

---

# 32. AI Voice Output

The AI Coach uses browser speech synthesis.

The workflow is:

```text
AI response
   ↓
SpeechSynthesisUtterance
   ↓
Browser speech synthesis
```

Voice output can be toggled using:

```text
Volume On
Volume Off
```

The mentor can influence the voice pitch.

---

# 33. AI Voice Input

The microphone button uses:

```text
SpeechRecognition
or
webkitSpeechRecognition
```

Workflow:

```text
Tap microphone
      ↓
Browser speech recognition
      ↓
Speech transcript
      ↓
Input field
      ↓
handleSend(transcript)
      ↓
AI Coach API
```

If speech recognition is unsupported, the application shows a browser-support alert.

---

# 34. Mentor Tone

The AI Coach has two modes:

```text
🎭 Mentor Voice
👔 Neutral
```

Mentor Voice sends:

```text
tone = mentor
```

Neutral mode sends:

```text
tone = neutral
```

---

# 35. Quick AI Suggestions

The AI Coach provides predefined prompts:

```text
How much can I spend today?
Why is my pocket money low?
Review my spending this week
Help me hit my savings goal
Explain this category overspend
```

Selecting one immediately sends it to the AI Coach.

---

# 36. Rewards System

## `RewardsScreen.tsx`

The Rewards screen displays:

- KP balance
- Multiplier
- User level
- Active streaks
- Reward shop
- Achievements

---

# 37. Kinetic Points

KP is the application's gamification currency.

KP can be earned through successful spending behavior.

KP can be lost through overspending.

KP can also be spent in the reward shop.

---

# 38. Reward Shop

Each shop item contains:

```text
Item ID
Name
Icon
Cost
Gradient
Unlocked state
```

If the user has enough KP:

```text
Purchase
   ↓
KP decreases
   ↓
Item becomes unlocked
```

If the user does not have enough KP:

```text
Purchase blocked
   ↓
Insufficient KP message
```

Unlocked items cannot be purchased again.

---

# 39. Streak System

The Rewards screen currently displays two demo streaks:

### No-Overspend Streak

```text
7 Days
```

### Daily Logging Streak

```text
14 Days
+0.2x Boost
```

The primary `streak` state is also passed throughout the application.

---

# 40. Achievements

Achievements have:

```text
ID
Name
Description
Icon
Earned state
```

Earned achievements display:

```text
✓ Earned
```

Unachieved achievements display:

```text
Locked
```

---

# 41. Leaderboard

## `Leaderboard.tsx`

The leaderboard displays anonymized savings and financial-discipline rankings.

Each leaderboard user contains information such as:

```text
Rank
Name
Avatar
Streak
Saved percentage
Score
Rank change
Badge
Current-user flag
```

---

# 42. Current User Position

The application attempts to find:

```tsx
users.find(u => u.isCurrentUser)
```

If no current user exists, it falls back to:

```text
users[3]
```

The user's position is displayed in a pinned card.

---

# 43. Leaderboard Ranking Display

Ranks 1–3 use special visual treatment:

```text
🥇 Rank 1
🥈 Rank 2
🥉 Rank 3
```

Other users display their numeric rank.

The current user's row receives a purple highlighted state.

---

# 44. Bottom Navigation

## `BottomNav.tsx`

The persistent navigation contains:

```text
Home
Budgets
Rewards
AI Coach
Ranks
```

The bar is hidden during:

```text
splash
auth
ob1
ob2
ob3
```

The active screen receives purple styling and an animated icon.

---

# 45. Profile & Settings

## `ProfileScreen.tsx`

The Profile screen contains:

- User profile card
- Current mentor
- KP
- Multiplier
- Streak
- Mentor switching
- Custom image manager
- Currency selection
- Dark theme toggle
- Notification toggle
- Biometric toggle
- Amazon Bedrock / Kiro footer

---

# 46. Mentor Switching

The user can open:

```text
Mentor Selection HQ
```

The four mentors are displayed again.

Selecting a mentor updates:

```text
activeMentorId
```

and returns the user to Home.

---

# 47. Custom Mentor Images

Users can paste a direct image URL for the active mentor.

The application stores:

```ts
Record<number, string>
```

Example concept:

```text
mentor ID → custom image URL
```

The custom image takes priority over the default mentor avatar:

```text
customMentorImages[id] || mentor.avatarImage
```

This custom image is reused across:

- Home
- AI Coach
- Rewards
- Profile
- Reaction popup
- Mentor cards/modals

---

# 48. Currency Selection

## `CurrencySelection.tsx`

The currency selection screen provides searchable currency options.

Supported currencies include:

```text
USD — $
INR — ₹
EUR — €
GBP — £
JPY — ¥
SGD — S$
MYR — RM
THB — ฿
PHP — ₱
IDR — Rp
AED — AED
```

The search matches:

```text
Currency code
Currency name
Symbol
Region
```

The user selects a currency and presses:

```text
Apply [Currency] Base Currency
```

The selected currency is passed to `App.tsx`.

---

# 49. Currency Formatting

`App.tsx` maintains a currency-symbol mapping:

```text
INR → ₹
USD → $
EUR → €
GBP → £
JPY → ¥
SGD → S$
MYR → RM
THB → ฿
PHP → ₱
IDR → Rp
AED → AED
```

The symbol is passed into financial components as:

```text
currencySymbol
```

---

# 50. Global Reaction Overlay

The spending reaction popup is mounted globally in `App.tsx`.

This means it can appear above the current application screen.

Workflow:

```text
Expense
  ↓
triggerMentorReaction()
  ↓
reactionPopup state
  ↓
SpendingReactionPopup
  ↓
User acknowledgement
  ↓
Popup closes
```

---

# 51. State Ownership

The main financial state is centralized in `App.tsx`.

```text
App.tsx
│
├── currency
├── balance
├── pmTotal
├── pmLeft
├── activeMentorId
├── kp
├── multiplier
├── streak
├── customMentorImages
├── transactions
├── budgets
├── goals
├── shopItems
├── achievements
├── leaderboardUsers
└── reactionPopup
```

Child screens receive state through props and communicate changes using callback props.

---

# 52. Component Communication Pattern

The project primarily follows a parent-state / child-callback architecture.

Example:

```text
RecordsManager
      │
      │ onAddTransaction()
      ▼
    App.tsx
      │
      ├── update balance
      ├── update pocket budget
      ├── update category budget
      └── trigger mentor reaction
```

Another example:

```text
ProfileScreen
      │
      │ onUpdateCustomImage()
      ▼
    App.tsx
      │
      ▼
customMentorImages
```

---

# 53. Financial Transaction Data Flow

```text
                    User records expense
                             │
                             ▼
                    RecordsManager.tsx
                             │
                             ▼
                    onAddTransaction()
                             │
                             ▼
                         App.tsx
                             │
                ┌────────────┼────────────┐
                ▼            ▼            ▼
             Balance     Pocket Money   Category
             Update        Update       Spending
                │            │            │
                └────────────┼────────────┘
                             ▼
                    Mentor Reaction Engine
                             │
                ┌────────────┴────────────┐
                ▼                         ▼
             KP Update               Multiplier
                │                         │
                └────────────┬────────────┘
                             ▼
                    Reaction Popup
```

---

# 54. Financial Goal Data Flow

```text
Onboarding
   ↓
Goal information
   ↓
handleCompleteOnboarding()
   ↓
goals state
   ↓
HomeDashboard
   ↓
Goal progress card
```

Additional goals can be created through:

```text
BudgetsGoalsScreen
      ↓
onAddGoal()
      ↓
App.tsx
      ↓
goals state
```

---

# 55. Budget Data Flow

```text
Budget creation
      ↓
BudgetsGoalsScreen
      ↓
onAddBudget()
      ↓
App.tsx
      ↓
budgets state
```

Expenses then update the corresponding budget's `spent` value.

---

# 56. Gamification Data Flow

```text
Financial behavior
       ↓
Mentor reaction engine
       ↓
Good / Warning / Overspend
       ↓
KP calculation
       ↓
Multiplier calculation
       ↓
RewardsScreen
       ↓
Reward Shop / Achievements
```

---

# 57. AI Financial Context

The AI Coach receives application state so that responses can be contextual.

The current context includes:

```text
Currency
Wallet balance
Pocket budget remaining
Pocket budget total
Goal title
Goal progress
KP
Multiplier
Streak
```

The mentor context includes:

```text
Mentor name
Mentor personality
Mentor quote
```

This allows the backend AI service to generate mentor-style financial guidance.

---

# 58. Data Persistence

The supplied implementation currently stores application state in React state:

```tsx
useState(...)
```

Therefore, the following data is currently session/runtime state:

```text
Wallet balance
Transactions
Budgets
Goals
KP
Multiplier
Streak
Mentor
Custom images
Shop unlocks
```

A page refresh or application restart can reset these values unless persistence is added.

For production, persistent storage should be introduced, for example:

```text
Database
+
Authenticated user ID
+
API/backend persistence
```

---

# 59. Backend Dependency

The primary backend dependency shown in the supplied code is:

```text
POST /api/ai-coach
```

The frontend expects a response containing:

```json
{
  "reply": "AI response text"
}
```

The frontend labels the AI system as:

```text
Amazon Bedrock
```

and the application as being built with:

```text
Kiro IDE
```

---

# 60. Error Handling

The application contains basic client-side error handling.

### AI API

If `/api/ai-coach` fails:

```text
console.error()
+
fallback mentor response
```

### Voice recognition

If unsupported:

```text
alert()
```

### Invalid transaction

If amount is zero or invalid:

```text
alert()
```

### Invalid pocket budget

If pocket allowance is zero or negative:

```text
alert()
```

### Insufficient KP

If reward purchase cost exceeds KP:

```text
alert()
```

---

# 61. UI Design System

The application uses a consistent visual language.

### Primary colors

```text
Black
Royal Purple
Indigo
Fuchsia
Emerald
Amber
Rose
```

### Visual characteristics

- Rounded cards
- Glassmorphism
- Dark backgrounds
- Purple gradients
- Soft borders
- Glow effects
- Animated transitions
- Mobile-first layout
- `Space Grotesk` for major financial headings
- `Inter` for general UI text

---

# 62. Mobile Canvas

`App.tsx` wraps the entire application in:

```text
390px × 844px
```

with:

```text
rounded phone frame
black background
purple border
purple glow
```

This creates a mobile-device preview even when running on a desktop browser.

---

# 63. Global Bottom Navigation Architecture

The bottom navigation is rendered outside individual screens.

Therefore:

```text
App
│
├── Main Render Canvas
│    └── Current Screen
│
├── Global Reaction Overlay
│
└── Persistent Bottom Navigation
```

This keeps navigation persistent across the main application.

---

# 64. Complete User Journey

```text
1. Open Money Boss AI
        ↓
2. Authentication / Quick Start
        ↓
3. Choose base currency
        ↓
4. Enter wallet balance
        ↓
5. Define financial goal
        ↓
6. Set goal target/date
        ↓
7. Set pocket-money allowance
        ↓
8. Choose financial mentor
        ↓
9. Launch Money Boss AI
        ↓
10. View Home Dashboard
        ↓
11. Record expenses/income
        ↓
12. Budget automatically updates
        ↓
13. Mentor evaluates spending
        ↓
14. KP and multiplier update
        ↓
15. Reaction popup appears
        ↓
16. Continue financial tracking
        ↓
17. Earn/redeem rewards
        ↓
18. Track achievements
        ↓
19. Compare savings discipline
        ↓
20. Consult AI Money Coach
        ↓
21. Manage profile/currency/mentor
```

---

# 65. Core Business Logic Summary

| Feature | Trigger | Result |
|---|---|---|
| Add expense | User records expense | Balance and pocket money decrease |
| Add income | User records income | Balance increases |
| Category spending | Expense matches budget | Budget `spent` increases |
| <75% budget usage | Expense remains safe | Good status |
| 75–99% usage | Category approaches limit | Warning status |
| ≥100% usage | Budget breached | Overspend status |
| Successful spending | Good/warning transaction | KP reward + multiplier increase |
| Overspending | Budget breach | KP penalty + multiplier reduction |
| Reward purchase | Enough KP | KP deducted + item unlocked |
| AI question | User sends message | `/api/ai-coach` request |
| AI API failure | Backend unavailable | Fallback mentor response |
| Voice input | Microphone enabled | Speech converted to text |
| Voice output | AI reply received | Browser speaks response |
| Currency change | User confirms currency | Global currency preference changes |
| Mentor change | User selects mentor | Active mentor changes |
| Custom image | User saves image URL | Mentor avatar override changes |

---

# 66. Important Current Implementation Limitations

The supplied frontend is currently a functional/demo-oriented architecture rather than a complete production financial system.

Known limitations include:

1. Authentication is simulated.
2. Financial data is stored in React state rather than persistent storage.
3. Leaderboard data is mock data.
4. Achievement data is initialized from static data.
5. Reward items are local state.
6. Spending chart values are currently hard-coded.
7. Upcoming payments are static demo entries.
8. Goal progress passed to the AI Coach is currently hard-coded to `68`.
9. Reaction popup uses a hard-coded fallback of `820` for category remaining when no budget matches.
10. Reaction popup uses a hard-coded `18` days remaining value.
11. Wallet cash/bank values are calculated as fixed 25%/75% estimates rather than actual account balances.
12. The AI backend endpoint `/api/ai-coach` must exist for live Bedrock responses.
13. Browser speech APIs depend on browser/device support.
14. Biometrics is currently a UI toggle and does not implement actual biometric authentication.
15. Dark mode is currently a UI state within Profile and does not switch the application's global theme.
16. Notification toggle is currently a local UI state and does not register push notifications.
17. Currency switching changes the displayed currency but does not perform exchange-rate conversion.
18. Transfer transactions are selectable but the current `App.tsx` transaction handler only explicitly processes expense and income behavior.
19. There is no demonstrated server-side validation for financial transactions.
20. No database persistence or multi-device synchronization is shown in the supplied code.

---

# 67. Recommended Production Architecture

For a production implementation, the application can evolve into:

```text
                    ┌──────────────────────┐
                    │      React App       │
                    │      TypeScript      │
                    └──────────┬───────────┘
                               │
                         HTTPS / API
                               │
                    ┌──────────▼───────────┐
                    │   Backend API Layer  │
                    └──────────┬───────────┘
                               │
          ┌────────────────────┼─────────────────────┐
          │                    │                     │
          ▼                    ▼                     ▼
     User/Auth API       Finance API           AI Coach API
          │                    │                     │
          ▼                    ▼                     ▼
      Identity          Transaction DB        Amazon Bedrock
                              │
                    ┌─────────┴─────────┐
                    ▼                   ▼
                Budgets              Goals
                    │                   │
                    └─────────┬─────────┘
                              ▼
                         Gamification
                              │
                    ┌─────────┴─────────┐
                    ▼                   ▼
                  KP                Leaderboard
```

---

# 68. Suggested Production Data Entities

A persistent backend should maintain entities similar to:

```text
User
Account
Transaction
CategoryBudget
FinancialGoal
PocketBudget
Mentor
UserMentor
KineticPointLedger
RewardItem
UserReward
Achievement
UserAchievement
LeaderboardEntry
PlannedPayment
AIConversation
AIMessage
```

---

# 69. Security Considerations

Because this application handles financial information, production implementation should include:

- Secure authentication
- Server-side authorization
- HTTPS
- Input validation
- API authentication
- Secure secrets management
- Bedrock credentials kept server-side
- Database access controls
- Audit logging
- Rate limiting
- Secure session handling
- Protection against client-side manipulation of balances/KP
- No sensitive financial calculations trusted solely to the browser

The frontend should never contain AWS credentials or other privileged Bedrock credentials.

---

# 70. Final Architecture Summary

Money Boss AI follows a centralized state-driven React architecture.

```text
                    App.tsx
                       │
       ┌───────────────┼────────────────┐
       │               │                │
       ▼               ▼                ▼
    Screens         Business Logic     Global UI
       │               │                │
       │               │                ├── BottomNav
       │               │                └── ReactionPopup
       │               │
       ├── Home        ├── Transactions
       ├── Records     ├── Budgets
       ├── Budgets     ├── Goals
       ├── Rewards     ├── KP
       ├── AI Coach    ├── Multiplier
       ├── Leaderboard └── Mentor Logic
       └── Profile
                       │
                       ▼
                 /api/ai-coach
                       │
                       ▼
                 Amazon Bedrock
```

The core product loop is:

```text
PLAN
  ↓
SET BUDGET
  ↓
SPEND
  ↓
ANALYZE
  ↓
MENTOR REACTION
  ↓
EARN / LOSE KP
  ↓
BUILD STREAK
  ↓
REACH GOAL
  ↓
EARN REWARDS
  ↓
IMPROVE FINANCIAL DISCIPLINE
```

This workflow represents the functionality and architecture visible in the supplied Money Boss AI React/TypeScript code.
