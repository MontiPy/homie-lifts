// In workoutService.ts or create friendService.ts
import {
  getDocs,
  collection,
  query,
  where,
  doc,
  setDoc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import { auth, db } from "./firebase";
import { Friend, FriendRequest } from "../types/friendTypes";

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

  const friendDoc = await getDoc(doc(db, "users", user.uid, "friends", targetId));
  if (friendDoc.exists()) return;

  const currentSnap = await getDoc(doc(db, "users", user.uid));
  const currentData = currentSnap.data() || {};
  const currentName = currentData.username || currentData.email || user.email;

  await setDoc(doc(db, "users", targetId, "friendRequests", user.uid), {
    fromId: user.uid,
    fromName: currentName,
  });
};

export const fetchFriendRequests = async (): Promise<FriendRequest[]> => {
  const user = auth.currentUser;
  if (!user) return [];

  const snapshot = await getDocs(
    collection(db, "users", user.uid, "friendRequests"),
  );
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<FriendRequest, "id">),
  }));
};

export const acceptFriendRequest = async (requesterId: string) => {
  const user = auth.currentUser;
  if (!user) return;

  const requestRef = doc(db, "users", user.uid, "friendRequests", requesterId);
  const requestSnap = await getDoc(requestRef);
  if (!requestSnap.exists()) return;

  const { fromName } = requestSnap.data() as { fromName?: string };

  await setDoc(doc(db, "users", user.uid, "friends", requesterId), {
    displayName: fromName || "Friend",
    shameLevel: 0,
  });

  const currentSnap = await getDoc(doc(db, "users", user.uid));
  const currentData = currentSnap.data() || {};
  const currentName = currentData.username || currentData.email || user.email;

  await setDoc(doc(db, "users", requesterId, "friends", user.uid), {
    displayName: currentName,
    shameLevel: 0,
  });

  await deleteDoc(requestRef);
};

export const rejectFriendRequest = async (requesterId: string) => {
  const user = auth.currentUser;
  if (!user) return;
  await deleteDoc(doc(db, "users", user.uid, "friendRequests", requesterId));
};
