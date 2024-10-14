const express = require('express');
const router = express.Router();
const Co2Routes = require('../Utils/lighthouse'); // For emissions analysis
const { optimizeCSS } = require('../Routes/cssOptimization'); // CSS optimization function
const { isSinglePageApplication } = require('../Routes/spaCheck'); // SPA check function
const { optimizeImages } = require('../Routes/imageOptimize');

// API endpoint to handle comprehensive analysis
router.post('/', async (req, res) => {
    const { url } = req.body; // Get URL from the request body

    console.log("Received URL:", url);

    // Validate the URL; expect url to be an object with a 'value' property
    if (!url || typeof url !== 'object' || !url.value || typeof url.value !== 'string') {
        return res.status(400).json({ error: 'Invalid URL format. Expected an object with a string property "value".' });
    }

    try {

        const results = await Promise.allSettled([
            Co2Routes(url), // CO2 emissions analysis
            optimizeCSS(url.value), // CSS optimization
            isSinglePageApplication(url.value), // SPA check
            optimizeImages(url.value) // Image optimization
        ]);

        // Prepare the analysis result without sending errors to the client
        const analysisResult = {};

        if (results[0].status === 'fulfilled') {
            analysisResult.emissions = results[0].value;
        } else {
            console.error('CO2 Analysis Error:', results[0].reason); // Log error on server side
        }

        if (results[1].status === 'fulfilled') {
            analysisResult.cssOptimization = results[1].value;
        } else {
            console.error('CSS Optimization Error:', results[1].reason); // Log error on server side
        }

        if (results[2].status === 'fulfilled') {
            analysisResult.spaCheck = results[2].value;
        } else {
            console.error('SPA Check Error:', results[2].reason); // Log error on server side
        }

        if (results[3].status === 'fulfilled') {
            analysisResult.imageOptimization = results[3].value;
        } else {
            console.error('Image Optimization Error:', results[3].reason); // Log error on server side
        }

        // Send back the compiled result with only successful results
        res.json(analysisResult);

    } catch (error) {
        console.error("Unexpected Error during analysis:", error);
        res.status(500).json({ error: 'An unexpected error occurred.' }); // Only general error to client
    }
});

module.exports = router;
