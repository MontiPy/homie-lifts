// This file will help structure the Firestore backend logic for workouts in the Homie Lifts app.
// We'll start with type definitions and Firestore functions to manage workout templates and user workouts.

// --- Type Definitions ---

export interface ExerciseTemplate {
    name: string;
    sets: number;
    reps: number;
    weight: number;
}

export interface WorkoutTemplate {
    id?: string; // Firestore doc ID
    name: string;
    description?: string;
    createdBy: string; // User ID
    category?: string;
    exercises: ExerciseTemplate[];
}

export interface CompletedSet {
    reps: number;
    weight: number;
}

export interface ExerciseLog {
    name: string;
    sets: CompletedSet[];
}

export interface UserWorkout {
    id?: string; // Firestore doc ID
    userId: string;
    templateId: string;
    date: Date;
    completed: boolean;
    exercises: ExerciseLog[];
    notes?: string;
}

// --- Firestore Logic (connected to firebase.ts) ---

import { db } from "../services/firebase";
import { collection, addDoc, doc, updateDoc, getDocs, query, where } from "firebase/firestore";

/**
 * Adds a new workout template to Firestore
 */
export async function createWorkoutTemplate(template: WorkoutTemplate) {
    const docRef = await addDoc(collection(db, "workoutTemplates"), template);
    return docRef.id;
}

/**
 * Starts a new workout for a user from a selected template
 */
export async function startWorkoutFromTemplate(userId: string, template: WorkoutTemplate) {
    const workout: UserWorkout = {
        userId,
        templateId: template.id!,
        date: new Date(),
        completed: false,
        exercises: template.exercises.map((ex) => ({
            name: ex.name,
            sets: Array.from({ length: ex.sets }, () => ({ reps: ex.reps, weight: ex.weight }))
        }))
    };

    const docRef = await addDoc(collection(db, "userWorkouts"), workout);
    return docRef.id;
}

/**
 * Marks a workout as complete and updates notes
 */
export async function completeWorkout(workoutId: string, notes?: string) {
    const workoutRef = doc(db, "userWorkouts", workoutId);

    await updateDoc(workoutRef, {
        completed: true,
        notes: notes || ""
    });
}

// --- Seed Workout Templates ---

const predefinedTemplates: WorkoutTemplate[] = [
    {
        name: "Push Day A",
        createdBy: "system",
        category: "Strength",
        exercises: [
            { name: "Bench Press", sets: 3, reps: 8, weight: 135 },
            { name: "Overhead Press", sets: 3, reps: 10, weight: 65 },
            { name: "Triceps Pushdown", sets: 3, reps: 12, weight: 40 },
        ]
    },
    {
        name: "Pull Day A",
        createdBy: "system",
        category: "Strength",
        exercises: [
            { name: "Deadlift", sets: 3, reps: 5, weight: 185 },
            { name: "Barbell Row", sets: 3, reps: 8, weight: 95 },
            { name: "Bicep Curl", sets: 3, reps: 12, weight: 25 },
        ]
    },
    {
        name: "Leg Day A",
        createdBy: "system",
        category: "Strength",
        exercises: [
            { name: "Squat", sets: 3, reps: 8, weight: 155 },
            { name: "Leg Press", sets: 3, reps: 10, weight: 180 },
            { name: "Calf Raise", sets: 3, reps: 15, weight: 80 },
        ]
    }
];

/**
 * Seeds predefined templates into Firestore if they don't already exist
 */
export async function seedWorkoutTemplates() {
    const templatesRef = collection(db, "workoutTemplates");

    for (const template of predefinedTemplates) {
        const q = query(templatesRef, where("name", "==", template.name));
        const existing = await getDocs(q);
        if (existing.empty) {
            await addDoc(templatesRef, template);
            console.log(`Seeded: ${template.name}`);
        } else {
            console.log(`Already exists: ${template.name}`);
        }
    }
}
