import { createClient, RedisClientType } from "redis";

const redis: RedisClientType = createClient();

// Error handling
redis.on("error", (err) => {
  console.error("Redis error:", err);
});

// Connection state handling
redis.on("connect", () => {
  console.log("Connected to Redis");
});

redis.on("ready", () => {
  console.log("Redis is ready");
});

redis.on("end", () => {
  console.log("Redis connection closed");
});

redis.on("reconnecting", () => {
  console.log("Reconnecting to Redis...");
});

// Connect the client
redis.connect().catch(console.error);

export default redis;
