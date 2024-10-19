const express = require('express');
const router = express.Router();
const { verifyToken } = require('../Controller/auth');
const Estimation = require('../Models/Estimation'); // Importing the model

// Store estimation in the database
router.post('/', verifyToken, async (req, res) => {
    const { url, emissionData } = req.body; // Destructure url and emissionData from the request body
    const userId = req.userId; // Extract userId from the token in the verifyToken middleware
    console.log("userid", userId);
    
    console.log(req.body); // For debugging: log the incoming request body

    try {
        // Create a new record for emission data in the database
        const newEmission = new Estimation({
            userId, // Use the extracted userId
            webUrl: url, // Correctly map url to webUrl
            emissions: emissionData.emissions, // Map emissions correctly
            imageOptimization: emissionData.imageOptimization, // Map image optimization correctly
            spaCheck: emissionData.spaCheck, // Map SPA check correctly
        });

        // Save to database
        await newEmission.save();
        res.status(201).json({ message: 'Emission data stored successfully' });
    } catch (error) {
        console.error('Error storing emission data:', error);
        res.status(500).json({ message: 'Error storing emission data', error: error.message });
    }
});

module.exports = router;
