const mongoose = require('mongoose');

const layerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Layer', layerSchema); 