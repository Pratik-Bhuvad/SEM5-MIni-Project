const express = require('express');
const router = express.Router();
const Estimation = require('../Models/Estimation'); // Importing the model

// Store estimation in the database
router.post('/', (req, res) => {
    const { userId, webUrl, emissions, imageOptimization, spaCheck } = req.body;

    // Create a new estimation entry
    const newEstimation = new Estimation({
        userId,
        webUrl,
        emissions,
        imageOptimization,
        spaCheck
    });

    newEstimation.save()
        .then(estimation => res.status(201).json(estimation))
        .catch(err => res.status(500).json({ error: 'Error saving estimation to the database' }));
});

module.exports = router;
