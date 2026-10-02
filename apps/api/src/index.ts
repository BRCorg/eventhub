import express from "express";
import pg from "pg";
import { MongoClient } from "mongodb";
import { createClient } from "redis";

const port = Number(process.env.API_PORT ?? 3000);

// Dans Docker, chaque base est joignable par son nom de service
const postgres = new pg.Pool({ connectionString: process.env.POSTGRES_URL });
const mongo = new MongoClient(
  process.env.MONGO_URL ?? "mongodb://localhost:27017/eventhub",
);
const redis = createClient({ url: process.env.REDIS_URL });
redis.on("error", (err) => console.error("Redis :", err.message));

async function check(fn: () => Promise<unknown>) {
  try {
    await fn();
    return "ok";
  } catch {
    return "ko";
  }
}

const app = express();

app.get("/api/healthz", async (_req, res) => {
  const services = {
    postgres: await check(() => postgres.query("SELECT 1")),
    mongo: await check(() => mongo.db().command({ ping: 1 })),
    redis: await check(() => redis.ping()),
  };
  const ok = Object.values(services).every((s) => s === "ok");
  res.status(ok ? 200 : 503).json({ status: ok ? "ok" : "degraded", services });
});

mongo.connect().catch((err) => console.error("Mongo :", err.message));
redis.connect().catch((err) => console.error("Redis :", err.message));

app.listen(port, () => console.log(`API démarrée sur le port ${port}`));
