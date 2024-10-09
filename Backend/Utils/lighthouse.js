const lighthouse = require('lighthouse');
const { co2 } = require('@tgwf/co2');

async function Co2Routes(urlObject) {
    let chrome;
    let analysisResult = {}; // To store the result
    console.log(urlObject);
    

    try {
        // Extract the URL from the provided object
        const url = urlObject.value; // Assuming the object has a property 'value'

        // Dynamically import chrome-launcher
        const { launch } = await import('chrome-launcher'); // Dynamic import

        // Launch Chrome in headless mode
        chrome = await launch({ chromeFlags: ['--headless'] });
        const options = {
            logLevel: 'info',
            output: 'json',
            onlyCategories: ['performance'],
            port: chrome.port,
        };

        // Run Lighthouse
        const runnerResult = await lighthouse(url, options);
        const report = JSON.parse(runnerResult.report);

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
            CO2EmissionPerMB: (emissions / (transferSize / 1024 / 1024)).toFixed(2) + ' grams/MB', // Correct calculation for CO2 per MB
        };

        return analysisResult; // Return the result
    } catch (error) {
        console.error('Error running Lighthouse:', error.message);
        if (error.stack) {
            console.error('Stack trace:', error.stack);
        }
        throw new Error('Analysis failed: ' + error.message);
    } finally {
        if (chrome) {
            await chrome.kill(); // Ensure Chrome is closed
        }
    }
}

module.exports = Co2Routes;
