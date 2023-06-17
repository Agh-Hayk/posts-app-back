const express = require("express");
const connection = require("./config/db");
const postsRoutes = require("./routes/postsRouter");
const authRoutes = require("./routes/authRouter");
const usersRoutes = require("./routes/usersRouter");

const app = express();

require("dotenv").config();

connection.connect();

app.use(express.json());

app.use("/posts", postsRoutes);
app.use("/auth", authRoutes);
app.use("/users", usersRoutes);

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});
