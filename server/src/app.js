import dotenv from "dotenv";
// dotenv.config({ path: "./.env" });
dotenv.config()
import express from "express";

const app = express();

// Middlewares
import cookieParser from "cookie-parser";
import cors from "cors";

app.use(
    cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// deployment route
app.get('/', (req, res) => res.send("Hello from server"))

// Routers
import userRouter from "./routes/user.route.js";
import blogRouter from "./routes/blog.route.js";
import categoryRouter from "./routes/category.route.js";
import commentRouter from "./routes/comment.route.js";
import likeRouter from "./routes/like.route.js";
app.use("/api/v1/user", userRouter);
app.use("/api/v1/blog", blogRouter);
app.use("/api/v1/category", categoryRouter)
app.use("/api/v1/comment", commentRouter)
app.use("/api/v1/like", likeRouter)

// error middleware
import { errorMiddleware } from "./middleware/error.middleware.js";
app.use(errorMiddleware);

export { app };
