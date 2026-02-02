const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Dashboard = require("../models/Dashboard");
const User = require("../models/User");

function recalcProgress(dashboard) {
  let totalSlotsAllDays = 0;
  let completedSlotsAllDays = 0;

  dashboard.daysInfo.forEach((day) => {
    const total = day.totalSlots || 0;
    const completedSlots = day.slotsInfo.filter((s) => s.isCompleted).length;

    day.dayProgress =
      total === 0 ? 0 : Math.round((completedSlots / total) * 100);

    totalSlotsAllDays += total;
    completedSlotsAllDays += completedSlots;
  });

  dashboard.overallProgress =
    totalSlotsAllDays === 0
      ? 0
      : Math.round((completedSlotsAllDays / totalSlotsAllDays) * 100);
}


// Create new dashboard
router.post("/", auth, async (req, res) => {
  try {
    const userId = req.userId;
    const { title, totalDays, daysInfo } = req.body;

    if (
      !title ||
      !totalDays ||
      !Array.isArray(daysInfo) ||
      daysInfo.length !== totalDays
    )
      return res.status(400).json({ message: "Invalid payload" });

    // validate each day and slot constraints
    for (const day of daysInfo) {
      if (!day.totalSlots || day.totalSlots < 0 || day.totalSlots > 20)
        return res.status(400).json({ message: "totalSlots must be 0-20" });
      if (
        !Array.isArray(day.slotsInfo) ||
        day.slotsInfo.length !== day.totalSlots
      )
        return res
          .status(400)
          .json({ message: "slotsInfo mismatch with totalSlots" });
      for (const slot of day.slotsInfo) {
        if (!slot.startTime || !slot.endTime || !slot.subjectName)
          return res
            .status(400)
            .json({ message: "Slot missing required fields" });
        slot.isCompleted = !!slot.isCompleted;
        slot.topics = Array.isArray(slot.topics) ? slot.topics : [];
      }
    }

    const dashboard = new Dashboard({ userId, title, totalDays, daysInfo });
    recalcProgress(dashboard);
    await dashboard.save();

    // push to user
    await User.findByIdAndUpdate(userId, {
      $push: { mydashboards: dashboard._id },
    });

    res.status(201).json({ dashboard });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all dashboards for user
router.get("/", auth, async (req, res) => {
  try {
    const userId = req.userId;
    const dashboards = await Dashboard.find({ userId }).sort({ createdAt: -1 });
    res.json({ dashboards });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get single dashboard
router.get("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const dash = await Dashboard.findById(id);
    if (!dash) return res.status(404).json({ message: "Not found" });
    if (dash.userId.toString() !== req.userId)
      return res.status(403).json({ message: "Forbidden" });
    res.json({ dashboard: dash });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Toggle slot completion and recalc progress
router.patch("/:id/slot/toggle", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { dayNumber, slotIndex } = req.body;
    if (typeof dayNumber !== "number" || typeof slotIndex !== "number")
      return res
        .status(400)
        .json({ message: "Invalid dayNumber or slotIndex" });

    const dash = await Dashboard.findById(id);
    if (!dash) return res.status(404).json({ message: "Not found" });
    if (dash.userId.toString() !== req.userId)
      return res.status(403).json({ message: "Forbidden" });

    const day = dash.daysInfo.find((d) => d.dayNumber === dayNumber);
    if (!day) return res.status(400).json({ message: "Day not found" });
    if (slotIndex < 0 || slotIndex >= day.slotsInfo.length)
      return res.status(400).json({ message: "Invalid slotIndex" });

    day.slotsInfo[slotIndex].isCompleted =
      !day.slotsInfo[slotIndex].isCompleted;

    recalcProgress(dash);
    await dash.save();

    res.json({ dashboard: dash });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

