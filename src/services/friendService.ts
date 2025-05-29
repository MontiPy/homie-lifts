// In workoutService.ts or create friendService.ts
import { getDocs, collection } from "firebase/firestore";
import { auth, db } from "./firebase";
import { Friend } from "../types/friendTypes";

export const fetchFriendsWithShameLevel = async (): Promise<Friend[]> => {
  const user = auth.currentUser;
  if (!user) return [];

  const snapshot = await getDocs(collection(db, "users", user.uid, "friends"));
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...(doc.data() as Omit<Friend, "id">),
  }));
};
