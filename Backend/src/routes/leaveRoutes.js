const express = require("express");
const router = express.Router();
const Leave = require("../models/Leave");

// Apply Leave
router.post("/", async (req, res) => {
  try {
    const leave = await Leave.create(req.body);
    res.status(201).json(leave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get All Leaves
router.get("/", async (req, res) => {
  try {
    const leaves = await Leave.find().populate("student");
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Approve / Reject Leave
router.put("/:id", async (req, res) => {
  try {
    const updatedLeave = await Leave.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(updatedLeave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
