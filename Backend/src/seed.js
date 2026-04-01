require("dotenv").config();
const bcrypt = require("bcryptjs");
const connectDB = require("./utils/db");
const User = require("./models/User");

connectDB();

const seed = async () => {
  await User.deleteMany();

  const password = await bcrypt.hash("Password123", 10);

  await User.create([
    {
      name: "Student One",
      email: "student@gmail.com",
      role: "student",
      department: "CSE",
      password
    },
    {
      name: "Faculty One",
      email: "faculty@gmail.com",
      role: "faculty",
      department: "CSE",
      password
    },
    {
      name: "Admin One",
      email: "admin@gmail.com",
      role: "admin",
      department: "Administration",
      password
    }
  ]);

  console.log("Seed data inserted");
  console.log("Default password for all seeded users: Password123");
  process.exit();
};

seed();
