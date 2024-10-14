const mongoose = require('mongoose');

const EstimationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    webUrl: { type: String, required: true },
    emissions: { type: Object, required: true },
    imageOptimization: { type: Object, required: true },
    spaCheck: { type: Object, required: true },
    date: { type: Date, default: Date.now }
});

const Estimation = mongoose.model('Estimation', EstimationSchema);
module.exports = Estimation;
