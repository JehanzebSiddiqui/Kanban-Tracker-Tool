import request from "supertest";
import { afterAll, describe, expect, it } from "vitest";
import { createApp } from "./app";
import { pool } from "./db";

describe("GET /health", () => {
  afterAll(async () => {
    await pool.end();
  });

  it("returns ok when the database is reachable", async () => {
    const res = await request(createApp()).get("/health");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: "ok", db: "up" });
  });
});