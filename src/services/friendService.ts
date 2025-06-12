// In workoutService.ts or create friendService.ts
import {
  getDocs,
  collection,
  query,
  where,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { auth, db } from "./firebase";
import { Friend } from "../types/friendTypes";

export const fetchFriendsWithShameLevel = async (): Promise<Friend[]> => {
  const user = auth.currentUser;
  if (!user) return [];

  const snapshot = await getDocs(collection(db, "users", user.uid, "friends"));
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Friend, "id">),
  }));
};

export const addFriendByIdentifier = async (identifier: string) => {
  const user = auth.currentUser;
  if (!user) return;

  const usersRef = collection(db, "users");
  let q = query(usersRef, where("username", "==", identifier.toLowerCase()));
  let snapshot = await getDocs(q);

  if (snapshot.empty) {
    q = query(usersRef, where("email", "==", identifier.toLowerCase()));
    snapshot = await getDocs(q);
  }

  if (snapshot.empty) {
    throw new Error("User not found");
  }

  const targetDoc = snapshot.docs[0];
  const targetId = targetDoc.id;
  if (targetId === user.uid) throw new Error("Cannot add yourself");

  const targetData = targetDoc.data();
  const displayName = targetData.username || targetData.email || "Friend";

  await setDoc(doc(db, "users", user.uid, "friends", targetId), {
    displayName,
    shameLevel: 0,
  });

  const currentSnap = await getDoc(doc(db, "users", user.uid));
  const currentData = currentSnap.data() || {};
  const currentName = currentData.username || currentData.email || user.email;

  await setDoc(doc(db, "users", targetId, "friends", user.uid), {
    displayName: currentName,
    shameLevel: 0,
  });
};
