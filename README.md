# MedCircle

A community app for MBBS students across India.
Built with **Expo + React Native + TypeScript** — runs on **iOS, Android, and Web** from one codebase.

---

## ✨ Features

- 🩺 13 categories (Jobs, Trips, Life Partner, Study Partner, Parties, Sports, Movies, Entrepreneur, Exam Info, Counselling, College Enquiry, Finance, College Events)
- 🎓 College + Batch communities with owner/admin/member roles
- 💬 1-on-1 chats
- 🔔 Notifications
- 🌗 Light + Dark theme (default Light, switchable from Settings)
- 📱 Cross-platform: iOS, Android, Web

---

## 🚀 Quick Start (Mac)

### Step 1 — Make sure you have Node 20+

```bash
nvm use 20
node --version    # should print v20.x.x or higher
```

If you don't have Node 20:
```bash
nvm install 20
nvm use 20
nvm alias default 20
```

### Step 2 — Install dependencies

```bash
cd medcircle
rm -rf node_modules package-lock.json
npm cache clean --force
npm install --ignore-scripts --legacy-peer-deps
```

The `--ignore-scripts` flag is **important** — it skips problematic postinstall hooks on Apple Silicon (the `bob: command not found` error we hit with MedConnect).

### Step 3 — Run on your phone (Expo Go)

```bash
npx expo start --clear
```

- A QR code appears in the terminal
- Open the **Expo Go** app on your phone (install from Play Store / App Store if needed)
- Scan the QR code
- App loads on your phone

### Step 4 — Run on web (browser)

```bash
npx expo start --web
```

Opens in your default browser at `http://localhost:8081`. Works in Chrome, Safari, Firefox.

### Step 5 — Run on iOS Simulator (Mac only)

```bash
npx expo start --ios
```

Requires Xcode installed.

---

## 🧱 Project Structure

```
medcircle/
├── app/                    # Expo Router screens (file-based routing)
│   ├── (auth)/             # Login, Signup, Splash
│   ├── (tabs)/             # Home, Communities, Notifications, Profile
│   ├── post/               # Post detail, Create post (modal)
│   ├── community/          # Community detail
│   ├── chat/               # Chat list, Chat thread
│   ├── _layout.tsx         # Root layout with providers
│   ├── index.tsx           # Entry point → Splash
│   └── settings.tsx        # Settings (theme switcher etc.)
├── components/             # Reusable UI components
│   ├── Avatar.tsx
│   ├── BottomNav.tsx       # 5-tab nav with raised center "+" button
│   ├── Button.tsx
│   ├── CategoryChip.tsx
│   ├── CommunityCard.tsx
│   ├── FilterChips.tsx
│   ├── Header.tsx
│   ├── Input.tsx
│   ├── PostCard.tsx
│   ├── AppStatusBar.tsx
│   └── ThemeProvider.tsx   # Light/Dark with persistence
├── constants/              # Design tokens + sample data
│   ├── categories.ts       # The 13 categories
│   ├── colors.ts           # Light + dark color palettes
│   ├── sampleData.ts       # Posts, communities, chats, notifications
│   ├── shadows.ts          # Cross-platform shadows
│   ├── spacing.ts
│   ├── theme.ts
│   └── typography.ts
├── lib/                    # Cross-platform helpers
│   ├── format.ts           # formatCount, initialsOf
│   ├── haptics.ts          # Haptic feedback (no-ops on web)
│   └── toast.ts            # Toast notifications
├── types/
│   └── index.ts            # TypeScript types
├── app.json                # Expo config
├── package.json
├── babel.config.js
└── tsconfig.json
```

---

## 🎨 Design

**Theme:** Light default, Dark switchable from Settings (persisted to AsyncStorage)
**Colors:**
- Primary: Indigo `#4F46E5`
- Accent: Teal `#14B8A6`
- Backgrounds: White / Slate-50 (light) — Slate-900 / Slate-800 (dark)
**Typography:** System fonts (Inter-like on iOS, Roboto on Android)
**Icons:** Lucide via `lucide-react-native`

---

## 🛠 Troubleshooting

### "Cannot find native module 'ExpoLinking'"

The version of `expo-linking` and `expo-constants` are pinned. If you see this error:

```bash
rm -rf node_modules/expo-linking node_modules/expo-constants
npm install expo-linking@~6.3.1 expo-constants@~16.0.2 --save --legacy-peer-deps
```

### "bob: command not found" during npm install

Always install with `--ignore-scripts`:

```bash
rm -rf node_modules package-lock.json
npm install --ignore-scripts --legacy-peer-deps
```

### Phone won't connect to dev server

- Both phone and Mac must be on the **same Wi-Fi network**
- If using ServiceNow VPN, try disabling it temporarily
- Press `Ctrl+C` to stop, then restart with: `npx expo start --tunnel`

### Reset everything

```bash
# Stop the dev server (Ctrl+C)
# Then:
npx expo start --clear --reset-cache
# Force-close Expo Go on your phone, swipe it away, then scan QR again
```

---

## 📦 Future: Building for Play Store / App Store

When you're ready to ship real builds:

1. Sign up for [Expo EAS](https://expo.dev) (free tier available)
2. Run: `npx eas build --platform android` (Play Store .aab)
3. Run: `npx eas build --platform ios` (App Store .ipa) — requires $99/yr Apple Developer account

Play Store has a one-time $25 fee.

---

## 🧪 Demo Data

The app currently uses sample data from `constants/sampleData.ts`:
- Logged in as: **Venkata Prasad** (AIIMS Delhi, Final Year)
- 6 sample posts across multiple categories
- 3 joined communities + 4 to discover
- 3 chats with sample messages
- 5 notifications

When you're ready to wire up real data, the Supabase migrations from your earlier exports are a great starting point.

---

Built with ❤️ for MBBS students across India.
