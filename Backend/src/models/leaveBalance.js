const mongoose = require("mongoose");

const leaveBalanceSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  medical: Number,
  personal: Number,
  od: Number,
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("LeaveBalance", leaveBalanceSchema);
