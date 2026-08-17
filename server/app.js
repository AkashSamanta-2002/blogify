import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import express from "express";

const app = express();

// Middlewares
import cookieParser from "cookie-parser";
import cors from "cors";
console.log(process.env.CLIENT_URL);
app.use(
    cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Routers
import userRouter from "./src/routes/user.route.js";
import blogRouter from "./src/routes/blog.route.js";
import categoryRouter from "./src/routes/category.route.js";
app.use("/api/v1/user", userRouter);
app.use("/api/v1/blog", blogRouter);
app.use("/api/v1/category", categoryRouter)

// error middleware
import { errorMiddleware } from "./src/middleware/error.middleware.js";
app.use(errorMiddleware);

export { app };
