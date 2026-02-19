require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectDB = require("./utils/db");
const userRoutes = require("./routes/userRoutes");
const leaveRoutes = require("./routes/leaveRoutes");

const app = express();

// Connect Database
connectDB();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/leaves", leaveRoutes);

app.get("/", (req, res) => {
  res.send("EduLeave Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
