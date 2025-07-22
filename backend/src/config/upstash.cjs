// src/config/upstash.cjs
const { Ratelimit } = require("@upstash/ratelimit"); // Note: Ratelimit, not RateLimit
const { Redis } = require("@upstash/redis");
require("dotenv").config();

console.log("Initializing rate limiter...");

// Create rate limiter instance
const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(100, "60 s"), // Use Ratelimit.slidingWindow
    analytics: true,
});

console.log("Rate limiter initialized successfully");

module.exports = ratelimit;