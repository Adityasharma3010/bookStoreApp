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

const FRONTEND_URL = process.env.FRONTEND_URL || "*";
app.use(cors({ origin: FRONTEND_URL }));

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// defining routes
app.use("/book", bookRoute);
app.use("/user", userRoute);
