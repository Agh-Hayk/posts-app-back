const jwt = require("jsonwebtoken");

// Middleware function to verify token
function verifyToken(req, res, next) {
   const authHeader = req.headers["authorization"];
   const token = authHeader && authHeader.split(" ")[1];

   if (!token) {
      res.status(401).json({ error: "Token not provided" });
      return;
   }

   jwt.verify(token, "testing", (err, decoded) => {
      if (err) {
         console.error("Error verifying token: " + err.stack);
         res.status(401).json({ error: "Invalid token" });
         return;
      }

      req.userId = decoded.userId;
      next();
   });
}

module.exports = { verifyToken };
