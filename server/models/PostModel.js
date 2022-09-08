const mongoose = require('mongoose');
const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    flair: {
        type: String,
        required: true
    },
    reactions: {
        type: Object,
        required: true,
        happy: {
            type: Number,
            required: true
        },
        fire: {
            type: Number,
            required: true
        },
        love: {
            type: Number,
            required: true
        },
        gross: {
            type: Number, 
            required: true
        },
        trash: {
            type: Number,
            required: true
        },
        confused: {
            type: Number,
            required: true
        }
    },
    net: {
        type: Number,
        required: true
    }
});
const PostModel = mongoose.model('posts', PostSchema);
module.exports = PostModel;