const express = require('express');
const emissionsRoute = require('./Routes/emission');
const { router: cssOptimizationRouter } = require('./Routes/cssOptimization');
const { router: spaCheckRoute } = require('./Routes/spaCheck');
const analyzeRoute = require('./Routes/analyze');
const {router: imageOptimization} = require('./Routes/imageOptimize')

require('dotenv').config();

const cors = require('cors')

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors())

// Use the Routes
app.use('/api/emissions', emissionsRoute);
app.use('/api/css', cssOptimizationRouter);
app.use('/api/spa', spaCheckRoute);
app.use('/api/analyze', analyzeRoute);
app.use('/api/image', imageOptimization);

app.use((err, req, res) => {
  console.error(err.stack); // Log error stack for debugging
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
