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
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    // optional: exit so Render marks the deploy as failed
    process.exit(1);
  });

const app = express();
app.use(express.json());

// Use exact FRONTEND_URL from env and enable credentials when a specific origin is set
const FRONTEND_URL = process.env.FRONTEND_URL || null;

// Replace current CORS setup with this:
const corsOptions = {
  origin: FRONTEND_URL ? FRONTEND_URL : false,
  credentials: !!FRONTEND_URL, // true when FRONTEND_URL is set
};

app.use(cors(corsOptions));
// ensure preflight responds with the same headers
app.options("*", cors(corsOptions));

// Optional: ensure header always present for matched origins
app.use((req, res, next) => {
  if (FRONTEND_URL && req.headers.origin === FRONTEND_URL) {
    res.header("Access-Control-Allow-Credentials", "true");
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
