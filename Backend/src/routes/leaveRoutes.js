const express = require("express");
const {
  applyLeave,
  getMyLeaves,
  getAllLeaves,
  updateLeaveStatus
} = require("../controllers/leaveController");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, authorize("student", "faculty"), applyLeave);
router.get("/mine", protect, authorize("student", "faculty"), getMyLeaves);
router.get("/", protect, authorize("admin"), getAllLeaves);
router.patch("/:id/status", protect, authorize("admin"), updateLeaveStatus);

module.exports = router;
