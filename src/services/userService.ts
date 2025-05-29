import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebase";

export const saveUserProfile = async (data: {
  username?: string;
  fitnessGoal?: string;
  accessLevel?: string;
  fitnessLevel?: string;
  avatarStyle?: string;
  onboardingComplete?: boolean;
}) => {
  const user = auth.currentUser;
  if (!user) throw new Error("No user is logged in");

  await setDoc(doc(db, "users", user.uid), data, { merge: true });
};
