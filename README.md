# Homie Lifts

A social fitness app to log workouts, track progress, and shame your friends into getting fit together!

## Features

* Browse and start pre-defined workout programs
* Log sets and reps for each exercise
* Track workout completion and performance
* View workout summaries
* (Planned) Group features for social accountability

## UI & Layout

* Built with **React Native** and **UI Kitten** for consistent cross-platform styling.
* **Bottom Tab Navigator** (React Navigation) for intuitive mobile navigation.
* Responsive, mobile-first design optimized for iPhone and Android devices.

## Tech Stack

* **Language & Framework**: React Native (TypeScript)
* **Styling**: UI Kitten + Eva Design System
* **Navigation**: React Navigation (Bottom Tabs)
* **Backend**: Firebase Authentication & Firestore
* **State Management**: React Context + Hooks
* **Code Quality**: ESLint, Prettier

## Project Structure

```
homie-lifts/
  assets/                # Images and icons
  src/
    App.tsx             # App entry point
    backend/            # Firestore backend logic
    components/         # Reusable UI components
    data/               # Static data (e.g. workout templates)
    devtest/            # Dev/test scripts (e.g. seeding Firestore)
    navigation/         # Navigation stacks and tab setup
    screens/            # App screens (Home, Workouts, etc.)
    services/           # Firebase config
    theme/              # Custom theme
    types/              # TypeScript types
  .env                  # Environment variables (not committed)
  package.json
  tsconfig.json
  app.json
```

## Getting Started

1. **Install dependencies:**
   ```sh
   npm install
   ```

2. **Set up Firebase:**
   - Create a `.env` file in the root directory with your Firebase config (see `.env.example` for format).

3. **Run the app:**
   ```sh
   npm start
   ```
   or use `npm run android` / `npm run ios` / `npm run web` as needed.

## Development

- **Seeding Workouts:**  
  Run the script in `src/devtest/seedWorkouts.ts` to populate Firestore with sample workouts.

- **Navigation:**  
  Uses React Navigation with stack and tab navigators. See [`src/navigation`](src/navigation).

- **Firebase:**  
  Configuration is in [`src/services/firebase.ts`](src/services/firebase.ts).

## License

0BSD

---

Made with 💪 by the Homie Lifts team.
