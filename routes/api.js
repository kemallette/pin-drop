const express = require('express');
const router = express.Router();
const Layer = require('../models/layer');
const Marker = require('../models/marker');

// Layer routes
router.get('/layers', async (req, res) => {
    try {
        const layers = await Layer.find();
        res.json(layers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/layers', async (req, res) => {
    const layer = new Layer({
        name: req.body.name
    });

    try {
        const newLayer = await layer.save();
        res.status(201).json(newLayer);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Marker routes
router.get('/markers/:layerId', async (req, res) => {
    try {
        const markers = await Marker.find({ layerId: req.params.layerId });
        res.json(markers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/markers', async (req, res) => {
    const marker = new Marker({
        layerId: req.body.layerId,
        label: req.body.label,
        latitude: req.body.latitude,
        longitude: req.body.longitude
    });

    try {
        const newMarker = await marker.save();
        res.status(201).json(newMarker);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/markers/:id', async (req, res) => {
    try {
        await Marker.findByIdAndDelete(req.params.id);
        res.json({ message: 'Marker deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router; 