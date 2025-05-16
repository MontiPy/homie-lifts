// Run this file with: npx tsx WorkoutBackendTest.ts or npx ts-node WorkoutBackendTest.ts
import { seedWorkoutTemplates } from "../backend/workout";
import { db } from "./firebase";

// Fire off the seeding logic
seedWorkoutTemplates()
  .then(() => console.log("✅ Seeding complete"))
  .catch((err) => console.error("❌ Seeding failed:", err));