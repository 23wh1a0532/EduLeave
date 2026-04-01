require("dotenv").config();
const connectDB = require("./utils/db");
const User = require("./models/User");
const Leave = require("./models/Leave");

connectDB();

const resetData = async () => {
  await Leave.deleteMany();
  await User.deleteMany();

  console.log("All users and leave requests have been removed.");
  process.exit();
};

resetData();
