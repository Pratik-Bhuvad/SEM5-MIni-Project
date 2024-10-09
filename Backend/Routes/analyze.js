const express = require('express');
const router = express.Router();
const Co2Routes = require('../Utils/lighthouse'); // For emissions analysis
const {optimizeCSS} = require('../Routes/cssOptimization'); // CSS optimization function
const {isSinglePageApplication} = require('../Routes/spaCheck'); // SPA check function
const {optimizeImages} = require('../Routes/imageOptimize')

// API endpoint to handle comprehensive analysis
router.post('/', async (req, res) => {
    const { url } = req.body; // Get URL from the request body

    console.log("Received URL:", url);

    // Validate the URL; expect url to be an object with a 'value' property
    if (!url || typeof url !== 'object' || !url.value || typeof url.value !== 'string') {
        return res.status(400).json({ error: 'Invalid URL format. Expected an object with a string property "value".' });
    }

    try {
        console.log("Starting CO2 analysis...");
        const emissionsResult = await Co2Routes(url);
        console.log("CO2 analysis complete:", emissionsResult);

        console.log("Starting CSS optimization...");
        const cssResult = await optimizeCSS(url.value);
        console.log("CSS optimization complete:", cssResult);

        console.log("Starting SPA check...");
        const spaResult = await isSinglePageApplication(url.value);
        console.log("SPA check complete:", spaResult);

        console.log("Starting image optimization...");
        const optimizationResult = await optimizeImages(url.value);
        console.log("Image optimization complete:", optimizationResult);

        // Compile all results into one object
        const analysisResult = {
            emissions: emissionsResult,
            cssOptimization: cssResult,
            spaCheck: spaResult,
            imageOptimization: optimizationResult,
        };

        // Use util.inspect to safely print the object with circular references
        // const safeResult = util.inspect(analysisResult, { depth: null, colors: false });
        res.json(analysisResult); // Send back the compiled result as JSON
    } catch (error) {
        console.error("Error during analysis:", error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;