const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");
const {
   createPost,
   getAllPosts,
   getPostById,
   updatePost,
   deletePost,
} = require("../conntrollers/postsController");

router.post("/", verifyToken, createPost);
router.get("/", getAllPosts);
router.get("/:id", verifyToken, getPostById);
router.put("/:id", verifyToken, updatePost);
router.delete("/:id", verifyToken, deletePost);

module.exports = router;
