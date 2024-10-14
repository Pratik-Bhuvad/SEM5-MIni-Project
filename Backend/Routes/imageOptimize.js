// routes/imageOptimization.js
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();  // This loads environment variables from the .env file
const router = express.Router();

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Function to fetch images from a URL
async function fetchImagesFromURL(url) {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const images = [];

    $('img').each((index, element) => {
        let src = $(element).attr('src');
        if (src) {
            // Check if the src is not an absolute URL
            if (!(src.startsWith('http://') || src.startsWith('https://'))) {
                // Convert relative URL to absolute using the base URL
                src = new URL(src, url).href;
            }
            images.push(src);
        }
    });

    return images;
}

// Function to upload the original image to Cloudinary
async function uploadImageToCloudinary(imageUrl) {
    const response = await cloudinary.uploader.upload(imageUrl, {
        folder: 'img-carbon-checker',
        resource_type: 'auto',
    });
    return {
        format: response.format,
        size: response.bytes / 1024, // Convert bytes to kilobytes
        secure_url: response.secure_url,
    };
}

// Function to upload the optimized image
async function uploadOptimizedImage(imageUrl) {
    const response = await cloudinary.uploader.upload(imageUrl, {
        folder: 'img-carbon-checker',
        resource_type: 'auto',
        transformation: [
            { quality: 'auto', fetch_format: 'avif'} // Ensure optimization parameters are applied
        ],
    });
    return {
        format: response.format,
        size: response.bytes / 1024, // Convert bytes to kilobytes
        secure_url: response.secure_url,
    };
}

// Function to calculate CO2 emissions based on image size (in KB)
function calculateCO2(sizeInKB) {
    const CO2_PER_KB = 0.24; // Example value; adjust based on real data
    return (sizeInKB * CO2_PER_KB); // Return CO2 emissions in grams
}

// Function to optimize images and fetch them
async function optimizeImages(url) {
    const images = await fetchImagesFromURL(url); // Fetch images from the provided URL
    const results = [];

    for (const imageUrl of images) {
        const originalDetails = await uploadImageToCloudinary(imageUrl);
        const optimizedDetails = await uploadOptimizedImage(originalDetails.secure_url); // Ensure we're using the secure URL of the original image

        results.push({
            original: {
                format: originalDetails.format,
                size: originalDetails.size,
                co2: calculateCO2(originalDetails.size),
                url: originalDetails.secure_url,
            },
            optimized: {
                format: optimizedDetails.format,
                size: optimizedDetails.size,
                co2: calculateCO2(optimizedDetails.size),
                url: optimizedDetails.secure_url,
            },
        });
    }

    return results; // Return the results of the optimization
}

// Route for image optimization
router.post('/', async (req, res) => {
    const { url } = req.body; // Expecting the request body to contain an object with a 'url' property

    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    try {
        const optimizedResults = await optimizeImages(url.value); // Call the optimizeImages function with the URL

        // Respond with the total number of images and their details
        res.json({ totalImages: optimizedResults.length, images: optimizedResults });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while processing the images.' });
    }
});

module.exports = {router, optimizeImages};
