const Leave = require("../models/Leave");
const User = require("../models/User");

const calculateTotalDays = (fromDate, toDate) => {
  const start = new Date(fromDate);
  const end = new Date(toDate);
  const diff = end.setHours(0, 0, 0, 0) - start.setHours(0, 0, 0, 0);

  return Math.floor(diff / (1000 * 60 * 60 * 24)) + 1;
};

exports.applyLeave = async (req, res) => {
  try {
    const { leaveType, fromDate, toDate, reason } = req.body;

    if (!leaveType || !fromDate || !toDate || !reason) {
      return res.status(400).json({ message: "All leave fields are required" });
    }

    const start = new Date(fromDate);
    const end = new Date(toDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
      return res.status(400).json({ message: "Invalid leave dates" });
    }

    if (start < today) {
      return res.status(400).json({ message: "Leave start date cannot be in the past" });
    }

    if (end < start) {
      return res.status(400).json({ message: "To date cannot be before from date" });
    }

    if (reason.trim().length < 10) {
      return res.status(400).json({ message: "Reason must be at least 10 characters long" });
    }

    const hasOverlap = await Leave.findOne({
      requestedBy: req.user._id,
      status: { $in: ["Pending", "Approved"] },
      $or: [
        {
          fromDate: { $lte: end },
          toDate: { $gte: start }
        }
      ]
    });

    if (hasOverlap) {
      return res.status(400).json({
        message: "You already have a pending or approved leave in this date range"
      });
    }

    const leave = await Leave.create({
      requestedBy: req.user._id,
      leaveType,
      fromDate: start,
      toDate: end,
      totalDays: calculateTotalDays(start, end),
      reason: reason.trim()
    });

    const populatedLeave = await Leave.findById(leave._id)
      .populate("requestedBy", "name email role department")
      .populate("reviewedBy", "name email role");

    res.status(201).json(populatedLeave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getMyLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find({ requestedBy: req.user._id })
      .populate("reviewedBy", "name email role")
      .sort({ createdAt: -1 });

    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllLeaves = async (req, res) => {
  try {
    const query = {};

    if (req.query.status && req.query.status !== "All") {
      query.status = req.query.status;
    }

    if (req.query.role && req.query.role !== "All") {
      const matchedUsers = await User.find({ role: req.query.role }).select("_id");
      query.requestedBy = { $in: matchedUsers.map((user) => user._id) };
    }

    const leaves = await Leave.find(query)
      .populate("requestedBy", "name email role department")
      .populate("reviewedBy", "name email role")
      .sort({ createdAt: -1 });

    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateLeaveStatus = async (req, res) => {
  try {
    const { status, adminRemarks } = req.body;

    if (!["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ message: "Status must be Approved or Rejected" });
    }

    if (status === "Rejected" && !adminRemarks?.trim()) {
      return res.status(400).json({ message: "Remarks are required when rejecting leave" });
    }

    const leave = await Leave.findById(req.params.id);

    if (!leave) {
      return res.status(404).json({ message: "Leave request not found" });
    }

    leave.status = status;
    leave.adminRemarks = adminRemarks?.trim() || "";
    leave.reviewedBy = req.user._id;
    leave.reviewedAt = new Date();

    await leave.save();

    const populatedLeave = await Leave.findById(leave._id)
      .populate("requestedBy", "name email role department")
      .populate("reviewedBy", "name email role");

    res.json(populatedLeave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
