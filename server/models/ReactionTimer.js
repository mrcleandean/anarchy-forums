const mongoose = require('mongoose');
const ReactionTimerSchema = new mongoose.Schema({
    ip: {
        type: String,
        required: true
    },
    seconds: {
        type: Number,
        required: true
    }
});
const ReactionTimer = mongoose.model('reaction-timers', ReactionTimerSchema);
module.exports = ReactionTimer;