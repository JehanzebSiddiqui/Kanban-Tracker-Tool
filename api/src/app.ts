import express from "express";
import cors from "cors";
import { pool } from "./db";

export function createApp() {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.get("/health", async (_req, res) => {
    try {
      await pool.query("SELECT 1");
      res.json({ status: "ok", db: "up" });
    } catch (err) {
      console.error("Health check failed:", err);
      res.status(500).json({ status: "error", db: "down" });
    }
  });

  return app;
}