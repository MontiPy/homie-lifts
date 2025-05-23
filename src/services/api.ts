// src/services/api.ts
import { auth } from "./firebase";
import { API_BASE_URL } from "@env";   // defined in your .env as your backend URL

const API_BASE = API_BASE_URL;

export async function fetchWithAuth(
  path: string,
  init: RequestInit = {}
): Promise<Response> {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");
  const token = await user.getIdToken(/* forceRefresh */ false);

  const headers = {
    ...(init.headers ?? {}),
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  return fetch(`${API_BASE}${path}`, {
    ...init,
    headers,
  });
}
