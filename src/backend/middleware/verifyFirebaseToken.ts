import { adminAuth } from "../firebaseAdmin";
import { Request, Response, NextFunction } from "express";
import type { DecodedIdToken } from "firebase-admin/auth";

interface AuthenticatedRequest extends Request {
  user?: DecodedIdToken;
}

export async function verifyFirebaseToken(
  req: AuthenticatedRequest, res: Response, next: NextFunction
) {
  const authHeader = req.headers.authorization || "";
  const match = authHeader.match(/^Bearer (.+)$/);
  if (!match) return res.status(401).json({ error: "No token" });

  try {
    const decoded = await adminAuth.verifyIdToken(match[1]);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
}
