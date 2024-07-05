// rateLimit.js

import rateLimit from "express-rate-limit";
import rawBody from "raw-body";

// Rate limit setup: 100 requests per hour per raw body
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 100, // limit each raw body to 100 requests per windowMs
  message: "Too many requests with this raw body, please try again later.",
  keyGenerator: async (req) => {
    // Use raw body as the key for rate limiting
    try {
      const body = await rawBody(req);
      return body.toString();
    } catch (err) {
      console.error("Error reading raw body:", err);
      return req.ip; // Fallback to IP address if raw body cannot be read
    }
  },
});

export { limiter };
