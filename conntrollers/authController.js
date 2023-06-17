const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const connection = require("../config/db");

function loginUser(req, res) {
   const { username, password } = req.body;

   // Check if the username exists in the database
   const checkUserQuery = "SELECT * FROM users WHERE username = ?";
   connection.query(checkUserQuery, [username], (err, results) => {
      if (err) {
         console.error("Error checking user: " + err.stack);
         res.status(500).json({ error: "Failed to check user" });
         return;
      }

      // If the username does not exist
      if (results.length === 0) {
         res.status(401).json({ error: "Invalid username or password" });
         return;
      }

      // Verify the password
      const user = results[0];
      bcrypt.compare(password, user.password, (err, passwordMatch) => {
         if (err) {
            console.error("Error comparing passwords: " + err.stack);
            res.status(500).json({ error: "Failed to compare passwords" });
            return;
         }

         // If the password does not match
         if (!passwordMatch) {
            res.status(401).json({ error: "Invalid username or password" });
            return;
         }

         // Password is correct, generate a new token
         const newToken = jwt.sign({ userId: user.id }, "testing", {
            expiresIn: "1h",
         });

         // Update the token in the database
         const updateTokenQuery = "UPDATE users SET token = ? WHERE id = ?";
         connection.query(
            updateTokenQuery,
            [newToken, user.id],
            (err, result) => {
               if (err) {
                  console.error("Error updating token: " + err.stack);
                  res.status(500).json({ error: "Failed to update token" });
                  return;
               }

               res.status(200).json({ token: newToken });
            }
         );
      });
   });
}

function registerUser(req, res) {
   const { username, password } = req.body;

   // Check if the username already exists in the database
   const checkUserQuery = "SELECT * FROM users WHERE username = ?";
   connection.query(checkUserQuery, [username], (err, results) => {
      if (err) {
         console.error("Error checking user: " + err.stack);
         res.status(500).json({ error: "Failed to check user" });
         return;
      }

      // If the username already exists
      if (results.length > 0) {
         res.status(409).json({ error: "Username already exists" });
         return;
      }

      // Hash the password
      bcrypt.hash(password, 10, (err, hashedPassword) => {
         if (err) {
            console.error("Error hashing password: " + err.stack);
            res.status(500).json({ error: "Failed to hash password" });
            return;
         }

         // Create a new user in the database
         const createUserQuery =
            "INSERT INTO users (username, password) VALUES (?, ?)";
         connection.query(
            createUserQuery,
            [username, hashedPassword],
            (err, result) => {
               if (err) {
                  console.error("Error creating user: " + err.stack);
                  res.status(500).json({ error: "Failed to create user" });
                  return;
               }

               res.status(201).json({
                  message: "User registered successfully",
               });
            }
         );
      });
   });
}

function protected(req, res) {
   // Access the authenticated user ID with req.userId
   res.status(200).json({ message: "Protected route accessed successfully" });
}

module.exports = {
   loginUser,
   registerUser,
   protected,
};
