// routes/spaCheck.js
const express = require('express');
const puppeteer = require('puppeteer');
const router = express.Router();

// Function to check if the website is a Single Page Application (SPA)
async function isSinglePageApplication(url) {
    const browser = await puppeteer.launch({
        headless: true, // Ensure headless mode
        args: [
            '--disable-gpu',
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage'
        ]
    });

    const page = await browser.newPage();

    // Block images, stylesheets, and fonts to improve performance
    await page.setRequestInterception(true);
    page.on('request', (req) => {
        if (['image', 'stylesheet', 'font'].includes(req.resourceType())) {
            req.abort(); // Block these resources
        } else {
            req.continue();
        }
    });

    // Go to the URL with a reasonable timeout and minimal waiting time
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 10000 }); // 10 seconds timeout

    // Check for root element (common in SPAs)
    const rootElement = await page.evaluate(() => {
        return document.getElementById('root') || document.getElementById('app') ? true : false;
    });

    // Check for AJAX requests by observing the network
    const ajaxRequestCount = await page.evaluate(() => {
        return performance.getEntriesByType('resource')
            .filter(entry => entry.initiatorType === 'xmlhttprequest').length;
    });

    // Check for History API usage
    const usesHistoryAPI = await page.evaluate(() => {
        return window.history.state !== null || (window.history.length > 1 && window.location.href.indexOf('?') !== -1);
    });

    await browser.close();

    return {
        isSPA: rootElement || ajaxRequestCount > 0 || usesHistoryAPI,
        rootElement,
        ajaxRequestCount,
        usesHistoryAPI
    };
}

// POST API endpoint to check if the provided URL is an SPA
router.post('/', async (req, res) => {
    const { url } = req.body;

    // Validate the URL format; expect url to be an object with a 'value' property
    if (!url || typeof url !== 'object' || !url.value || typeof url.value !== 'string') {
        return res.status(400).json({ error: 'Invalid URL format. Expected an object with a string property "value".' });
    }

    try {
        // Call the isSinglePageApplication function with the URL value
        const result = await isSinglePageApplication(url.value);
        res.json(result); // Send back the result
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: 'Failed to check if the URL is an SPA' });
    }
});

module.exports = { router, isSinglePageApplication };
