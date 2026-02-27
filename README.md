# Restaurants App - React Native Technical Challenge (Mobile)

## Context

At Tailor we build mobile apps with React Native, focusing on product quality, maintainable architecture, and best practices. This challenge evaluates your ability to deliver a functional app end to end: UI, navigation, API integration, loading/error states, and delivery.

---

## Objective

Build a restaurants application in React Native that enables:
- User authentication (signup/login) and session persistence.
- Restaurant list and detail views powered by the API.
- Restaurant CRUD.
- In-app favorites management (local persistence).
- Restaurant comments management.

---

## Design (Figma)

You must implement the design from Figma:
  - https://www.figma.com/design/LuwjRZZb3ms0MeAmu7gZch/Tailor-Prueba-t%C3%A9cnica-Junior?node-id=1235-1831&t=QBe1sh3ejkqnEot3-1

You may adjust micro-details if needed due to platform limitations, but prioritize visual consistency and good UX.

---

## Backend API

A dedicated API is provided for this challenge. Use the contract defined in the documentation (endpoints, models, params, and responses).

- Base URL (API):
  - https://react-native-challenge-api.tailor-hub.com/api
- Documentation (Swagger):
  - https://react-native-challenge-api.tailor-hub.com/api/docs
  - https://react-native-challenge-api.tailor-hub.com/api/docs.json

### Main endpoints

Auth
- `POST /auth/signup`
- `POST /auth/login`
- `POST /auth/logout`
- `GET /auth/verify`

Restaurants
- `GET /restaurant/list` (paged: `limit`, `page`)
- `GET /restaurant/detail/:id`
- `POST /restaurant/create`
- `PUT /restaurant/:id`
- `DELETE /restaurant/:id`

Comments
- `POST /restaurant/:id/comment`
- `PUT /restaurant/:id/comment/:commentId`
- `DELETE /restaurant/:id/comment/:commentId`

Uploads (S3 presigned)
- `POST /upload/presign`

---

## Functional requirements (aligned with the API)

1) User authentication (Auth)
- Implement Register and Login using `/auth/signup` and `/auth/login`.
- Persist the session token in `AsyncStorage` to avoid logging in on every app start.
- Implement Logout (`/auth/logout`).
- (Recommended) Verify session on app start with `/auth/verify`.
- For protected endpoints, send the token as `Authorization: Bearer <token>`.

2) Restaurant List
- Display a list of restaurants from `/restaurant/list` (paged).
- Each item must include at minimum `name`, `address`, `image`, and `avgRating` if available.

3) Restaurant Details
- When selecting a restaurant, navigate to a detail view (`/restaurant/detail/:id`) with extended info:
  - Address, description, and image.
  - Coordinates (`latlng`) for the map.
  - Average rating and associated comments.

4) Restaurant CRUD
- Create a restaurant (`/restaurant/create`).
- Edit an existing restaurant (`/restaurant/:id`).
- Delete a restaurant (`/restaurant/:id`).

Notes:
- For create/update, the API requires `name`, `address`, `image`, and `latlng` (and `description` is optional).
- If you support image uploads, use `/upload/presign` to get a `publicUrl` and store it in the `image` field (allowed types: `image/jpeg`, `image/png`, `image/webp`).

5) Favorites (in-app)
- Allow users to mark/unmark restaurants as favorites in the app.
- Favorites must be stored locally (persisted on device). There is no favorites endpoint in the API.
- Include a screen that lists only the user's favorites.

6) Restaurant comments
- Show comments associated with a restaurant (included in the detail response).
- Allow adding a comment using `/restaurant/:id/comment` with `comment` and `rating` (rating 1-5, comment 10-255 chars).
- (Optional) Edit/delete comments (`PUT/DELETE /restaurant/:id/comment/:commentId`) if you implement it.

7) Loading states
- Show a loading indicator while fetching data (list, detail, comments, etc.).

8) Error handling
- Show appropriate error messages for:
  - Network issues.
  - Invalid responses.
  - Server/API errors.
- Avoid blank screens: always provide user feedback.

9) Design and UX
- The app must follow the design, be responsive, and feel good on iOS and Android.
- Basic accessibility is valued (labels, touch targets, reasonable contrast).

10) Navigation
- Use `react-navigation`.
- Required structure:
  - A Drawer with different sections.
  - Two navigation stacks:
    - Auth Stack: Login / Register.
    - App Stack: the rest of the screens (includes map + list, detail, create).

---

## Technical requirements (recommendations)

- React Native. (Expo is recommended, not required.)
- TypeScript (recommended).
- A maintainable networking layer (fetch/axios + interceptors if applicable).
- Coherent state management (local + server-state).
- Clear project structure (features/modules, components, navigation, services, etc.).
- Do not commit secrets. If configuration is needed, include a `.env.example`.

---

## Bonus tracks

Testing
- Realistic unit tests (components and/or logic).
- End-to-end tests with Detox (if time/setup allows).

Improvements
- Include a brief section with improvements you would implement if the project continued:
  - architecture, performance, scalability, UX, accessibility, observability, etc.

Deployments / Distribution (optional)
- If you generate builds (Android or iOS), document the process and add links in the README.
- No platform is prioritized.
- If you generate distributable builds, send them by email to tools@tailor-hub.com.

---

## AI usage (highly valued)

We are a team that embraces AI as part of the workflow. We value:
- Using AI to accelerate development, tests, refactors, documentation, and debugging.
- Clear justification of decisions: what AI generated, what you reviewed, what you adjusted, and how you ensured quality.

Include an "AI Usage" section in the README with:
- AI tools used.
- Which parts were generated/assisted with AI.
- How you validated the result (review, tests, manual verification, etc.).

---

## Delivery

1. Push your solution to a public GitHub repository.
2. Include a `README.md` with complete instructions to run the app (Android and iOS if applicable).
3. If there is any distribution/deployment, add links in the README.

---

## Very important (execution)

Evaluation depends on being able to run the project. If we cannot run the app by following the README instructions in your repository, the challenge will not be evaluated.

---

## What we will evaluate

- Design fidelity and UX quality.
- Correct API integration (contract, errors, states).
- Code structure, readability, reuse, and maintainability.
- Auth/App navigation separation.
- Delivery quality: README, scripts, consistency, and (bonus) tests.
- Responsible and justified AI usage.
