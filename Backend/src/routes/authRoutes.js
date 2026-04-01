const express = require("express");
const {
  register,
  registerAdmin,
  login,
  resetPassword,
  me
} = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/register-admin", registerAdmin);
router.post("/login", login);
router.post("/reset-password", resetPassword);
router.get("/me", protect, me);

module.exports = router;
