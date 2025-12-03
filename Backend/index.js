import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";

dotenv.config();

// Use an env var that Render will set (MONGODB_URI). Keep old names as fallback.
const MONGO_URI =
  process.env.MONGODB_URI ||
  process.env.URI ||
  "mongodb://localhost:27017/bookstore";

// Connect to MongoDB with basic error handling
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

const app = express();
app.use(express.json());

// Use exact FRONTEND_URL from env and enable credentials when a specific origin is set
const FRONTEND_URL = process.env.FRONTEND_URL || null;

// robust CORS: only allow credentials for the exact FRONTEND_URL
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) {
      // server-side requests or tools (no Origin header) — allow
      return callback(null, true);
    }
    if (FRONTEND_URL) {
      return origin === FRONTEND_URL
        ? callback(null, true)
        : callback(null, false);
    }
    // no FRONTEND_URL configured -> allow any origin (use with caution)
    return callback(null, true);
  },
  credentials: !!FRONTEND_URL,
};

app.use(cors(corsOptions));

// Ensure the credentials header and exact origin are always present when origin matches
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (FRONTEND_URL && origin === FRONTEND_URL) {
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Origin", FRONTEND_URL);
    res.vary =
      (res.getHeader("Vary") || "") +
      (res.getHeader("Vary") ? ", Origin" : "Origin");
  }
  next();
});

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// defining routes
app.use("/book", bookRoute);
app.use("/user", userRoute);
