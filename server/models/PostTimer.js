const mongoose = require('mongoose');
const PostTimerSchema = new mongoose.Schema({
    ip: {
        type: String,
        required: true
    },
    seconds: {
        type: Number,
        required: true
    }
});
const PostTimer = mongoose.model('post-timers', PostTimerSchema);
module.exports = PostTimer;