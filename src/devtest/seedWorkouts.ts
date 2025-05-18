// src/devTest/seedWorkouts.ts
console.log("🔥 Seed script loaded!");

import { db } from "../services/firebase.node";
import { collection, addDoc } from "firebase/firestore";
import { workoutTemplates } from "../data/workoutTemplates";

async function seedWorkouts() {
  try {
    const workoutsCollection = collection(db, "workouts");
    for (const workout of workoutTemplates) {
      await addDoc(workoutsCollection, workout);
      console.log(`Seeded: ${workout.name}`);
    }
    console.log("All workouts seeded successfully.");
  } catch (error) {
    console.error("Error seeding workouts:", error);
  }
}

seedWorkouts();
