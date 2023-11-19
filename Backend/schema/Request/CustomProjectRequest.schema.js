const mongoose = require('mongoose');

const CustomProjectRequest = new mongoose.Schema({
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group',
    },

    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

    projectTitle: {
        type: String,
    },

    projectDescription: {
        type: String,
    },

    projectDomain: {
        type: String,
    },

    type: {
        type: String,
        default: "CUSTOM_PROJECT_REQUEST"
    },

    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending',
    },

    message: {
        type: String,
    },

}, {
    timestamps: true,
});

module.exports = mongoose.model('CustomProjectRequest', CustomProjectRequest);
