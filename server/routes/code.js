import express from "express";
import Code from "../models/Code.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/save", verifyToken, async (req, res) => {
  const { code, language } = req.body;
  const saved = await Code.create({ userId: req.user.id, code, language });
  res.json(saved);
});

router.get("/my-codes", verifyToken, async (req, res) => {
  const codes = await Code.find({ userId: req.user.id });
  res.json(codes);
});

export default router;
