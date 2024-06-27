const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({

    problemName: {
        type: String,
        trim: true,
        required: true
    },

    problemStatement: {
        type: String,
        required: true
    },

    constraints: {
        type: String,
        required: true
    },

    
    problemDifficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'],
        required: true
    },

    problemTags: {
        type: String,
        required: true
    },

    sampleInput: {
        type: String,
        required: true
    },

    sampleOutput: {
        type: String,
        required: true
    },

    privateInput: {
        type: String,
        required: true
    },

    privateOutput: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('problem', problemSchema);