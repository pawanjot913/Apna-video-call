const mongoose = require("mongoose");


const MeetingSchema = new mongoose.Schema({ 
    userId: { type: String, required: true },
    meetingId: { type: String, required: true, unique: true },
    date: { type: Date, default: Date.now },
}); 

const Meeting = mongoose.model("Meeting", MeetingSchema);

module.exports = Meeting;