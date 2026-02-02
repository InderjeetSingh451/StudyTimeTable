const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SlotSchema = new Schema({
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  subjectName: { type: String, required: true },
  topics: [{ type: String }],
  isCompleted: { type: Boolean, default: false },
});

const DaySchema = new Schema({
  dayNumber: { type: Number, required: true },
  totalSlots: { type: Number, required: true },
  slotsInfo: [SlotSchema],
  dayProgress: { type: Number, default: 0 },
});

const DashboardSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  totalDays: { type: Number, required: true },
  daysInfo: [DaySchema],
  overallProgress: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Dashboard", DashboardSchema);
