const connection = require("../config/db");

// Create a new post
function createPost(req, res) {
   const { title, content } = req.body;
   const query = "INSERT INTO posts (title, content) VALUES (?, ?)";
   connection.query(query, [title, content], (err, results) => {
      if (err) {
         console.error("Error creating post: " + err.stack);
         res.status(500).json({ error: "Failed to create post" });
         return;
      }
      res.status(201).json({ message: "Post created successfully" });
   });
}

// Get all posts
function getAllPosts(req, res) {
   const query = "SELECT * FROM posts";
   connection.query(query, (err, results) => {
      if (err) {
         console.error("Error retrieving posts: " + err.stack);
         res.status(500).json({ error: "Failed to retrieve posts" });
         return;
      }
      res.status(200).json(results);
   });
}

// Get a specific post by ID
function getPostById(req, res) {
   const postId = req.params.id;
   const query = "SELECT * FROM posts WHERE id = ?";
   connection.query(query, [postId], (err, results) => {
      if (err) {
         console.error("Error retrieving post: " + err.stack);
         res.status(500).json({ error: "Failed to retrieve post" });
         return;
      }
      if (results.length === 0) {
         res.status(404).json({ error: "Post not found" });
         return;
      }
      res.status(200).json(results[0]);
   });
}

// Update a post
function updatePost(req, res) {
   const postId = req.params.id;
   const { title, content } = req.body;
   const query = "UPDATE posts SET title = ?, content = ? WHERE id = ?";
   connection.query(query, [title, content, postId], (err, results) => {
      if (err) {
         console.error("Error updating post: " + err.stack);
         res.status(500).json({ error: "Failed to update post" });
         return;
      }
      res.status(200).json({ message: "Post updated successfully" });
   });
}

// Delete a post
function deletePost(req, res) {
   const postId = req.params.id;
   const query = "DELETE FROM posts WHERE id = ?";
   connection.query(query, [postId], (err, results) => {
      if (err) {
         console.error("Error deleting post: " + err.stack);
         res.status(500).json({ error: "Failed to delete post" });
         return;
      }
      res.status(200).json({ message: "Post deleted successfully" });
   });
}

module.exports = {
   deletePost,
   updatePost,
   getPostById,
   getAllPosts,
   createPost,
};
