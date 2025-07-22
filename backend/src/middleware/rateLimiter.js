// src/middleware/rateLimiter.js
import ratelimit from "../config/upstash.cjs"; // Import from .cjs file

const ratelimiter = async (req, res, next) => {

  try {
    const { success } = await ratelimit.limit("my-rate-limit"); // Static key
    
    if (!success) {
      return res.status(429).json({
        message: "Too many requests, please try again later.",
      });
    }
    next();
  } catch (error) {
    console.error("Rate limiter error:", error);
    next(error);
  }
};

export default ratelimiter;
