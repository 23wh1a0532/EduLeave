require("dotenv").config();
const connectDB = require("./utils/db");
const User = require("./models/User.");

connectDB();

const seed = async () => {
  await User.deleteMany();

  await User.create([
    {
      name: "Student One",
      email: "student@gmail.com",
      role: "student",
      department: "CSE"
    },
    {
      name: "Faculty One",
      email: "faculty@gmail.com",
      role: "faculty",
      department: "CSE"
    }
  ]);

  console.log("Seed Data Inserted");
  process.exit();
};

seed();
