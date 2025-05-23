// src/backend/routes.ts
import express from "express";
import { verifyFirebaseToken } from "./middleware/verifyFirebaseToken";
const router = express.Router();

router.get("/hello", verifyFirebaseToken, (req, res) => {
  res.json({ msg: `Hello, ${req.user?.email}` });
});
