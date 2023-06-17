const connection = require("../config/db");

function getAllUsers(req, res) {
   const getUsersQuery = "SELECT id, username FROM users";
   connection.query(getUsersQuery, (err, results) => {
      if (err) {
         console.error("Error getting users: " + err.stack);
         res.status(500).json({ error: "Failed to get users" });
         return;
      }

      res.status(200).json(results);
   });
}

function getUserById(req, res) {
   const userId = req.params.id;
   const getUserQuery = "SELECT id, username FROM users WHERE id = ?";
   connection.query(getUserQuery, [userId], (err, results) => {
      if (err) {
         console.error("Error getting user: " + err.stack);
         res.status(500).json({ error: "Failed to get user" });
         return;
      }

      if (results.length === 0) {
         res.status(404).json({ error: "User not found" });
         return;
      }

      res.status(200).json(results[0]);
   });
}

module.exports = {
   getAllUsers,
   getUserById,
};
