const express = require('express');
const router = express.Router();
const axios = require('axios');
const postcss = require('postcss');
const cssnano = require('cssnano');
const { PurgeCSS } = require('purgecss');
const cheerio = require('cheerio');
const postcssSafeParser = require('postcss-safe-parser');

// Function to fetch CSS from a URL
const fetchCSSFromURL = async (url) => {
    try {
        const response = await axios.get(url);
        const html = response.data;


        const $ = cheerio.load(html);
        const cssLinks = [];

        // Extracting CSS links from the HTML
        $('link[rel="stylesheet"]').each((index, element) => {
            const href = $(element).attr('href');
            if (href) {
                const absoluteURL = new URL(href, url).href; // Convert to absolute URL
                cssLinks.push(absoluteURL);
            }
        });


        // Fetch the CSS contents
        const cssContents = await Promise.all(cssLinks.map(async (link) => {
            try {
                const cssResponse = await axios.get(link);
                return cssResponse.data;
            } catch (err) {
                console.error(`Error fetching CSS from ${link}:`, err.message);
                return ''; // Return empty if there is an error
            }
        }));

        return cssContents.join('\n'); // Combine all CSS content
    } catch (error) {
        console.error('Error fetching HTML:', error.message);
        throw new Error('Failed to fetch CSS');
    }
};

// CSS Optimization Logic
const optimizeCSS = async (url) => {

    try {
        const allCss = await fetchCSSFromURL(url); // Fetch CSS using the provided URL


        // Purge unused CSS
        const purgeCSSResults = await new PurgeCSS().purge({
            content: [{ raw: allCss, extension: 'html' }],
            css: [{ raw: allCss }],
        });

        const optimizedCss = purgeCSSResults.map(result => result.css).join('\n');


        // Minify the CSS using safe parser, ignoring errors silently
        let minifiedCss = { css: optimizedCss }; // Default to optimized CSS
        try {
            minifiedCss = await postcss([cssnano]).process(optimizedCss, { from: undefined, parser: postcssSafeParser });
        } catch (minificationError) {
            console.error('Minification Error:', minificationError.message);
        }

        return {
            originalCSSLength: allCss.length,
            originalCSS: allCss, // Optionally you can limit how much you log here
            purgedCSSLength: optimizedCss.length,
            minifiedCSSLength: minifiedCss.css.length,
            minifiedCSS: minifiedCss.css, // Optionally you can limit how much you log here
        };
    } catch (error) {
        console.error('Error during CSS optimization:', error.message);
        return { error: 'CSS optimization failed, but errors were ignored.' };
    }
};

// API endpoint for CSS optimization
router.post('/', async (req, res) => {

    const { url } = req.body; // Expecting url as an object

    // Validate the URL format
    if (typeof url !== 'object' || !url.value || typeof url.value !== 'string') {
        return res.status(400).json({ error: 'Invalid URL format. Expected an object with a string property "value".' });
    }

    try {
        const result = await optimizeCSS(url.value); // Access the URL value from the object
        res.json(result);
    } catch (error) {
        console.error('Error processing request:', error.message);
        res.status(500).json({ error: error.message });
    }
});

module.exports = { router, optimizeCSS };
