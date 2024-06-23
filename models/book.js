// models/Course.js
"use strict";

const mongoose = require("mongoose"),
    bookSchema = mongoose.Schema(
        {
            title: {
                type: String,
                required: true,
                unique: true,
            },
            description: {
                type: String,
                required: true,
            },
            maxStudents: {
                type: Number,
                default: 0,
                min: [0, "bookcode cannot have a negative number of students"],
            },
            cost: {
                type: Number,
                default: 0,
                min: [0, "cost cannot have a negative cost"],
            },
            schedules: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: "ClassSchedule"
            }]
        },
        {
            timestamps: true,
        }
    );

module.exports = mongoose.model("Book", bookSchema);
