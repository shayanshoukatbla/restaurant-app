# Shayan Restaurant App

A full-featured restaurant discovery mobile app built with React Native (Expo). Supports user authentication, restaurant browsing in list and map views, restaurant CRUD, favorites, and a comment/rating system.

---

## Requirements Coverage

| Feature                      | Status  | Notes                                                                 |
| ---------------------------- | ------- | --------------------------------------------------------------------- |
| Signup / Login / Logout      | Done    | 2-step signup, session persistence                                    |
| Session verification on boot | Done    | `GET /auth/verify` on app start; splash-style loading screen shown during verification |
| Bearer token on all requests | Done    | Axios interceptor, 401 auto-logout                                    |
| Restaurant list (paged)      | Done    | Infinite scroll, 10 per page                                          |
| Restaurant detail            | Done    | Address, description, image, map, reviews                             |
| Restaurant map view          | Done    | Custom markers, card carousel, long-press directions                  |
| Create restaurant            | Done    | Image upload via presign (S3), Nominatim address search               |
| Edit restaurant              | Done    | Pre-filled form, updates list + detail cache                          |
| Delete restaurant            | Done    | Owner-only, confirmation dialog                                       |
| Add comment + rating         | Done    | 1–5 stars, 10–255 chars, real-time validation                         |
| Edit comment                 | Done    | Owner-only, inline edit mode                                          |
| Delete comment               | Done    | Owner-only, confirmation dialog                                       |
| Favorites (local)            | Done    | Zustand + AsyncStorage, persisted on device                           |
| Loading states               | Done    | Skeleton loaders, spinners, button loading                            |
| Error handling               | Done    | Formatted API errors, fallback screens                                |
| Profile screen               | Partial | UI complete; update profile API not yet available in backend contract |

---

## Tech Stack

| Layer        | Technology                                                          |
| ------------ | ------------------------------------------------------------------- |
| Framework    | Expo SDK 54 / React Native 0.81.5                                   |
| Language     | TypeScript (strict mode)                                            |
| Styling      | NativeWind v4.2.2 + Tailwind CSS v3.4.19                            |
| Navigation   | React Navigation v7 (native stack + bottom tabs)                    |
| Server state | TanStack Query v5 (infinite queries, mutations, cache invalidation) |
| Client state | Zustand v5 + AsyncStorage persistence                               |
| Forms        | react-hook-form v7 + Zod v4                                         |
| HTTP         | Axios with Bearer token interceptor                                 |
| Maps         | react-native-maps v1.20.1                                           |
| Geocoding    | Nominatim (OpenStreetMap)                                           |
| Image upload | expo-image-picker + S3 presigned URL flow                           |
| Image cache  | expo-image (memory + disk caching)                                  |
| Fonts        | expo-font (Roobert Regular + SemiBold)                              |
| Animations   | react-native-reanimated ~4.1.1                                      |

---

## Project Structure

```
src/
├── api/
│   ├── client.ts               # Axios instance, interceptors, configureApiClient()
│   └── geocodingApi.ts         # Nominatim geocoding
├── components/                 # Shared UI components
│   ├── icons/index.tsx         # All SVG icons as typed React components
│   ├── AppInput.tsx
│   ├── AppCard.tsx
│   ├── Button.tsx
│   ├── TabBar.tsx
│   ├── AddressInput.tsx
│   ├── ProfileDateInput.tsx
│   └── ...
├── features/
│   ├── auth/
│   │   ├── api/authApi.ts
│   │   ├── components/
│   │   ├── schemas/
│   │   ├── screens/            # Splash, Welcome, Signin, Signup, Profile
│   │   ├── store/useAuthStore.ts
│   │   └── utils/dateUtils.ts
│   └── restaurants/
│       ├── api/restaurantApi.ts
│       ├── components/
│       │   ├── detail/         # Hero, Body, Reviews, AddComment, CommentItem, StarRating
│       │   ├── RestaurantMapView.tsx
│       │   ├── MapMarkers.tsx
│       │   ├── MapCardStrip.tsx
│       │   └── ...
│       ├── hooks/
│       ├── schemas/
│       ├── screens/            # Restaurants, RestaurantDetail, CreateRestaurant, EditRestaurant, Favorites
│       ├── store/useFavoritesStore.ts
│       └── utils/mapDirections.ts
├── hooks/                      # useAddressSuggestions, useAppFonts
├── navigation/                 # RootNavigator, AuthNavigator, AppNavigator, RestaurantsNavigator
├── types/                      # api.ts, navigation.ts
└── utils/errorFormatter.ts
```

---

## Navigation Architecture

```
RootNavigator (native stack)
├── AuthNavigator (native stack)          — unauthenticated
│   └── Splash → Welcome → Signin → Signup
└── AppNavigator (bottom tabs)            — authenticated
    ├── RestaurantList → RestaurantsNavigator (native stack)
    │   ├── Restaurants            (list / map toggle)
    │   ├── RestaurantDetail
    │   ├── CreateRestaurant
    │   └── EditRestaurant
    ├── Favorites
    └── Profile
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- Expo CLI: `npm install -g expo-cli`
- EAS CLI (for builds/updates): `npm install -g eas-cli`
- iOS: Xcode 15+ with a simulator or physical device
- Android: Android Studio with an emulator, or a physical device with Expo Go

### 1. Clone and install

```bash
git clone <your-repo-url>
cd shayan-restaurant-app
npm install
```

### 2. Environment variables

Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

```env
EXPO_PUBLIC_API_BASE_URL=https://react-native-challenge-api.tailor-hub.com/api
EXPO_PUBLIC_GEOCODING_API_BASE_URL=https://nominatim.openstreetmap.org
```

### 3. Run locally (Expo Go)

```bash
# Start the dev server
npx expo start

# Press 'i' for iOS simulator
# Press 'a' for Android emulator
# Scan QR code with Expo Go app on a physical device
```

> Note: `react-native-maps` is bundled with Expo Go and works out of the box with `npx expo start`.

### 4. Development build (recommended for maps)

```bash
# iOS
npx expo run:ios

# Android
npx expo run:android
```

---

## EAS Builds & Updates

This project is configured for [EAS Build](https://docs.expo.dev/build/introduction/) and [EAS Update](https://docs.expo.dev/eas-update/introduction/).

### Build profiles (eas.json)

| Profile       | Type                  | Notes                   |
| ------------- | --------------------- | ----------------------- |
| `development` | Internal distribution | Dev client enabled      |
| `preview`     | Internal distribution | APK/IPA for testing     |
| `production`  | Store submission      | Auto-increments version |

### Create a preview build

```bash
# Android APK
eas build --platform android --profile preview

# iOS IPA (requires Apple Developer account)
eas build --platform ios --profile preview
```

### Push an OTA update

```bash
eas update --branch preview --message "Your update message"
```

> The `platforms` field in `app.json` is set to `["ios", "android"]`, so web is excluded from all builds and OTA updates.

---

## API

Base URL: `https://react-native-challenge-api.tailor-hub.com/api`

All authenticated requests include `Authorization: Bearer <token>` via the Axios interceptor in `src/api/client.ts`. A 401 response automatically clears the session and redirects to the auth flow.

### Endpoints used

```
POST   /auth/signup
POST   /auth/login
POST   /auth/logout
GET    /auth/verify

GET    /restaurant/list?page=&limit=
GET    /restaurant/detail/:id
POST   /restaurant/create
PUT    /restaurant/:id
DELETE /restaurant/:id

POST   /restaurant/:id/comment
PUT    /restaurant/:id/comment/:commentId
DELETE /restaurant/:id/comment/:commentId

POST   /upload/presign
```

---

## Design

Implemented from the provided Figma file. Key design decisions:

- **Color palette**: `ink` (#0B0B0B), `canvas` (#FFFFFF), `card` (#F1F1F0), `blue` (#264BEB), `primary` (#E94560)
- **Typography**: Roobert Regular + SemiBold (custom fonts loaded via expo-font)
- **Styling**: 90% NativeWind / Tailwind CSS — 10% inline `style={}` objects )
- **Border radius**: `rounded-3xl` (24px) for cards, `rounded-button` (17px) for buttons
- **Session loading screen**: while `GET /auth/verify` runs on boot, a splash-style screen (logo + spinner inside the `card` rounded card) is shown instead of a blank screen or a premature redirect

---

## Known Limitations

- **Profile update**: The profile screen UI (DNI, birth date, address) is complete, but there is no `/user/update` endpoint in the provided API contract. The form data is collected but not submitted.
- **Comment owner check**: Ownership is determined by matching `user.name` with `review.owner.name`. If names are not unique, edit/delete buttons may appear for wrong users.

---

## Potential Improvements

**Architecture**

- Add a proper user update endpoint to the backend and connect the profile screen form.
- Replace name-based comment ownership with ID comparison once the API exposes `review.owner._id`.

**UX / Accessibility**

- Add `accessibilityLabel` and `accessibilityRole` to all interactive elements.
- Improve map empty state when no restaurants have coordinates.
- Offline mode: show cached data with a "you're offline" banner.

**Testing**

- Unit tests for Zod schemas and utility functions (`errorFormatter`, `dateUtils`).
- Component tests for `AddComment` and `CommentItem` using React Native Testing Library.
- E2E tests with Detox for the auth flow and restaurant creation.

**Observability**

- Integrate Sentry for crash reporting and error tracking.
- Add analytics events for key actions (restaurant view, comment add, map direction opened).

---

## AI Usage

This project was built with Claude Code (Anthropic) as the primary AI assistant throughout the development process.

**What AI assisted with:**

- Generating boilerplate for feature modules (screens, hooks, API files) following the established architecture pattern.
- Writing Zod validation schemas and react-hook-form integration.
- Implementing the map view components (MapMarkers, MapCardStrip, marker sync logic).
- Debugging NativeWind v4 compatibility issues with `react-native-css-interop`.
- Writing the Axios interceptor pattern and TanStack Query infinite scroll setup.
- Image upload presign flow implementation.
- Platform-specific map directions utility (`mapDirections.ts`).

**How results were validated:**

- Every generated file was reviewed for correctness before being committed.
- Styling was visually verified against the Figma design on both iOS and Android.
- API integration was tested against the live backend at each step.
- TypeScript compilation (`tsc --noEmit`) was used to catch type errors before running.
- Manual testing on physical devices and simulators for navigation flows, form validation, and map interactions.
- EAS builds were generated and tested as preview APKs on Android devices.

**Tools used:**

- Claude Code (claude-sonnet-4-6) — primary AI coding assistant via VS Code extension
