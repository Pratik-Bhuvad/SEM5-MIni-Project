const express = require('express');
const router = express.Router();
const Co2Routes = require('../Utils/lighthouse'); // Ensure this points to the correct location

// API endpoint to handle emissions analysis
router.post('/', async (req, res) => {
    const { url } = req.body; // Get the URL from the request body

    // Validate the URL; expect url to be an object with a 'value' property
    if (!url || typeof url !== 'object' || !url.value || typeof url.value !== 'string') {
        return res.status(400).json({ error: 'Invalid URL format. Expected an object with a string property "value".' });
    }

    try {
        const result = await Co2Routes(url); // Call the Co2Routes function with the URL
        res.json(result); // Send back the result as JSON
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
