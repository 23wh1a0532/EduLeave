const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const buildToken = (user) =>
  jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET || "secretkey",
    { expiresIn: "1d" }
  );

const sanitizeUser = (user) => {
  const { password, ...userData } = user._doc;
  return userData;
};

const createUser = async ({ name, email, password, role, department }) => {
  const normalizedEmail = email.trim().toLowerCase();
  const existingUser = await User.findOne({ email: normalizedEmail });

  if (existingUser) {
    return { error: { status: 409, message: "User already exists" } };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    name: name.trim(),
    email: normalizedEmail,
    password: hashedPassword,
    role,
    department: department?.trim() || ""
  });

  return { user };
};

exports.register = async (req, res) => {
  try {
    const { name, email, password, department } = req.body;
    const role = req.body.role || "student";

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required" });
    }

    if (!["student", "faculty"].includes(role)) {
      return res.status(400).json({ message: "Role must be student or faculty" });
    }

    const result = await createUser({ name, email, password, role, department });

    if (result.error) {
      return res.status(result.error.status).json({ message: result.error.message });
    }

    res.status(201).json({
      message: "Registration successful",
      user: sanitizeUser(result.user)
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.registerAdmin = async (req, res) => {
  try {
    const { name, email, password, department, adminSecret } = req.body;

    if (!name || !email || !password || !adminSecret) {
      return res.status(400).json({
        message: "Name, email, password, and admin secret are required"
      });
    }

    if (adminSecret !== (process.env.ADMIN_SECRET || "EDULEAVE_ADMIN_2026")) {
      return res.status(403).json({ message: "Invalid admin secret" });
    }

    const result = await createUser({
      name,
      email,
      password,
      role: "admin",
      department
    });

    if (result.error) {
      return res.status(result.error.status).json({ message: result.error.message });
    }

    res.status(201).json({
      message: "Admin account created successfully",
      user: sanitizeUser(result.user)
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    res.json({
      token: buildToken(user),
      user: sanitizeUser(user)
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { email, role, newPassword } = req.body;

    if (!email || !role || !newPassword) {
      return res.status(400).json({
        message: "Email, role, and new password are required"
      });
    }

    if (!["student", "faculty", "admin"].includes(role)) {
      return res.status(400).json({ message: "Invalid role selected" });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        message: "New password must be at least 6 characters long"
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: normalizedEmail, role });

    if (!user) {
      return res.status(404).json({ message: "User not found for this role" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: "Password reset successful. Please login with your new password." });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.me = async (req, res) => {
  res.json(req.user);
};
