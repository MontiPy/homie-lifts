// src/data/workoutTemplates.ts

export const workoutTemplates = [
  {
    name: "PHUL - Power Upper",
    category: "Strength + Hypertrophy",
    durationWeeks: 8,
    createdBy: "system",
    exercises: [
      { name: "Barbell Bench Press", sets: 3, reps: 5, weight: 135 },
      { name: "Barbell Row", sets: 3, reps: 5, weight: 135 },
      { name: "Overhead Press", sets: 3, reps: 8, weight: 65 },
      { name: "Lat Pulldown", sets: 3, reps: 10, weight: 90 }
    ]
  },
  {
    name: "PPL - Push Day",
    category: "Hypertrophy",
    durationWeeks: 6,
    createdBy: "system",
    exercises: [
      { name: "Incline Dumbbell Press", sets: 4, reps: 10, weight: 45 },
      { name: "Lateral Raise", sets: 3, reps: 15, weight: 15 },
      { name: "Overhead Press", sets: 3, reps: 10, weight: 75 },
      { name: "Triceps Pushdown", sets: 3, reps: 15, weight: 40 }
    ]
  },
  {
    name: "Starting Strength - Workout A",
    category: "Strength",
    durationWeeks: 6,
    createdBy: "system",
    exercises: [
      { name: "Back Squat", sets: 3, reps: 5, weight: 135 },
      { name: "Bench Press", sets: 3, reps: 5, weight: 115 },
      { name: "Deadlift", sets: 1, reps: 5, weight: 185 }
    ]
  },
  {
    name: "StrongLifts 5x5 - Day 1",
    category: "Strength",
    durationWeeks: 12,
    createdBy: "system",
    exercises: [
      { name: "Back Squat", sets: 5, reps: 5, weight: 135 },
      { name: "Bench Press", sets: 5, reps: 5, weight: 115 },
      { name: "Barbell Row", sets: 5, reps: 5, weight: 95 }
    ]
  },
  {
    name: "Full Body Fat Burn - Circuit A",
    category: "Fat Loss",
    durationWeeks: 4,
    createdBy: "system",
    exercises: [
      { name: "Bodyweight Squats", sets: 3, reps: 20, weight: 0 },
      { name: "Push-Ups", sets: 3, reps: 15, weight: 0 },
      { name: "Burpees", sets: 3, reps: 10, weight: 0 },
      { name: "Dumbbell Rows", sets: 3, reps: 15, weight: 25 }
    ]
  }
];
