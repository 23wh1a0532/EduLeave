const mongoose = require("mongoose");

const leaveRequestSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  facultyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  leaveType: String,
  fromDate: Date,
  toDate: Date,
  totalDays: Number,
  reason: String,
  status: {
    type: String,
    default: "pending"
  },
  appliedAt: {
    type: Date,
    default: Date.now
  },
  reviewedAt: Date,
  remarks: String
});

module.exports = mongoose.model("LeaveRequest", leaveRequestSchema);
