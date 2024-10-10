const axios = require('axios'); // Import axios for making API requests
const { co2 } = require('@tgwf/co2');

async function Co2Routes(urlObject) {
    let analysisResult = {}; // To store the result
    console.log(urlObject);

    try {
        // Extract the URL from the provided object
        const url = urlObject.value; // Assuming the object has a property 'value'

        // Replace 'YOUR_API_KEY' with your actual PageSpeed Insights API key
        const API_KEY = 'AIzaSyBdjcivkknL4lqC9c7O1sFfy0RqfBOychI';
        const response = await axios.get(`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&key=${API_KEY}`);

        const report = response.data.lighthouseResult; // Access the Lighthouse report from the response

        // Check if we have the performance category
        if (!report.categories || !report.categories.performance) {
            throw new Error('Performance category not found in Lighthouse report');
        }

        // Try to find the total byte weight audit
        const totalByteWeightAudit = report.audits['total-byte-weight'];
        if (!totalByteWeightAudit || typeof totalByteWeightAudit.numericValue !== 'number') {
            throw new Error('Total byte weight information not found or invalid');
        }

        const transferSize = totalByteWeightAudit.numericValue;

        const greenHosting = false; // Set to true if the website is hosted on green energy
        const emissions = new co2({ model: 'swd' }).perVisit(transferSize, greenHosting);

        // Prepare the analysis result
        analysisResult = {
            website: url,
            totalTransferSize: (transferSize / 1024 / 1024).toFixed(2) + ' MB', // Convert bytes to MB
            estimatedCO2Emission: emissions.toFixed(4) + ' grams', // Total CO2 emissions in grams
            CO2EmissionPerMB: (emissions / (transferSize / 1024 / 1024)).toFixed(2) + ' grams/mb', // CO2 per MB
        };

        return analysisResult; // Return the result
    } catch (error) {
        console.error('Error running Lighthouse:', error.message);
        if (error.stack) {
            console.error('Stack trace:', error.stack);
        }
        throw new Error('Analysis failed: ' + error.message);
    }
}

module.exports = Co2Routes;
