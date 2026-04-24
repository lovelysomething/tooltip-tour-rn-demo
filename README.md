# Tooltip Tour — React Native Demo App

Expo test app for the [tooltip-tour-react-native](https://github.com/lovelysomething/tooltip-tour-react-native) SDK.

Three screens, each with registered `useTTPage` + `useTTTarget` elements ready to tour:

| Screen | Page ID | Key targets |
|--------|---------|-------------|
| Home | `home` | `welcomeHeading`, `welcomeSubtitle`, `featureCardAnalytics`, `featureCardTours`, `featureCardInspector`, `getStartedButton`, `profileNavButton` |
| Profile | `profile` | `profileAvatar`, `profileName`, `planBadge`, `editProfileButton`, `settingsSection`, `signOutButton` |
| Feed | `feed` | `feedHeader`, `newTourButton`, `tour-1` … `tour-8` (FlatList with scroll integration) |

---

## Setup

```bash
npm install
```

Open `App.tsx` and replace `YOUR_SITE_KEY` with your site key from the dashboard:

```ts
TooltipTour.configure({
  siteKey: 'sk_...',
  baseURL: 'https://app.lovelysomething.com',
})
```

---

## Run

```bash
npx expo start
```

Then press `i` for iOS simulator, `a` for Android emulator, or scan the QR code with Expo Go.

---

## Testing the Inspector

1. Open a walkthrough step in the dashboard and click **Capture from device**
2. Scan the QR code with your device — the app opens with the Inspector banner
3. Switch to **Highlight** to see blue chips on all registered elements
4. Tap a chip → enter identifier → Send to Site

---

## SDK

The SDK lives at [tooltip-tour-react-native](https://github.com/lovelysomething/tooltip-tour-react-native) and is linked locally via `package.json`:

```json
"tooltip-tour-react-native": "file:../tooltip-tour-react-native"
```
