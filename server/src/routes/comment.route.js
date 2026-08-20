import { Router } from "express";
import { JWTAuthenticate } from "../middleware/auth.middleware.js";
import { getCommentsByBlog, postComment } from "../controllers/comment.controller.js";

const router = Router();

router.post('/post-comment', JWTAuthenticate, postComment)
router.get('/get-comments/:id', JWTAuthenticate, getCommentsByBlog)

export default router;
