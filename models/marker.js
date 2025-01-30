const mongoose = require('mongoose');

const markerSchema = new mongoose.Schema({
    layerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Layer',
        required: true
    },
    label: String,
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Marker', markerSchema); 