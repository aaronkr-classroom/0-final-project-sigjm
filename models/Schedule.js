// models/Schedule.js
"use strict";

const mongoose = require("mongoose"),
    scheduleSchema = mongoose.Schema(
        {
            courseName: {
                type: String,
                required: true,
            },
            dayOfWeek: {
                type: String,
                required: true,
                enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            },
            startTime: {
                type: String, // e.g., "09:00"
                required: true,
            },
            endTime: {
                type: String, // e.g., "10:30"
                required: true,
            },
            room: {
                type: String,
                required: true,
            },
        },
        {
            timestamps: true,
        }
    );

module.exports = mongoose.model("Schedule", scheduleSchema);
