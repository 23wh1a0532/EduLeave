const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  totalWorkingDays: Number,
  presentDays: Number,
  leaveDays: Number,
  attendancePercentage: Number
});

module.exports = mongoose.model("Attendance", attendanceSchema);
