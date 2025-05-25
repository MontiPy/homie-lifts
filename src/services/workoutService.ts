import { getDocs, query, orderBy, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "./firebase"; // Use the already initialized instances

export const saveWorkoutSummary = async (
  workoutName: string,
  performance: { exercise: string; setsCompleted: boolean[] }[]
) => {
  const user = auth.currentUser;

  if (!user) {
    console.warn("No user is logged in. Cannot save workout.");
    return;
  }

  const totalSets = performance.reduce((acc, curr) => acc + curr.setsCompleted.length, 0);
  const completedSets = performance.reduce(
    (acc, curr) => acc + curr.setsCompleted.filter(Boolean).length,
    0
  );

  
  const completionRate = Math.round((completedSets / totalSets) * 100);

  await addDoc(collection(db, "users", user.uid, "userWorkouts"), {
    workoutName,
    performance,
    completionRate,
    timestamp: serverTimestamp(),
  });
};

export const fetchUserWorkouts = async () => {
  const user = auth.currentUser;
  if (!user) {
    console.warn("No user is logged in.");
    return [];
  }

  const workoutsRef = collection(db, "users", user.uid, "userWorkouts");
  const q = query(workoutsRef, orderBy("timestamp", "desc"));

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};
