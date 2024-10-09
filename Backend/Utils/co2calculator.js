const { co2 } = require('@tgwf/co2');

function calculateEmissions(transferSize, greenHosting = false) {
    return new co2({ model: 'swd' }).perVisit(transferSize, greenHosting);
}

module.exports = { calculateEmissions };
