const express = require('express');
const connectDB = require('./Config/db'); // Adjust the path accordingly
const emissionsRoute = require('./Routes/emission');
const { router: cssOptimizationRouter } = require('./Routes/cssOptimization');
const { router: spaCheckRoute } = require('./Routes/spaCheck');
const analyzeRoute = require('./Routes/analyze');
const { router: imageOptimization } = require('./Routes/imageOptimize');
const estimationRoutes = require('./Routes/estimationRoutes');
const { signup, login } = require('./Controller/authController');
require('dotenv').config();

const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Connect to the database first
connectDB().then(() => {
    // Use the Routes
    app.use('/api/emissions', emissionsRoute);
    app.use('/api/css', cssOptimizationRouter);
    app.use('/api/spa', spaCheckRoute);
    app.use('/api/analyze', analyzeRoute);
    app.use('/api/image', imageOptimization);
    app.use('/api/store-estimation',estimationRoutes);
    app.use('/api/auth/signup', signup);
    app.use('/api/auth/login', login);

    app.use((err, req, res) => {
        console.error(err.stack); // Log error stack for debugging
        res.status(500).json({ error: 'Something went wrong!' });
    });

    // Start the server only after successful database connection
    app.listen(PORT,'0.0.0.0', () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}).catch(error => {
    console.error('Failed to connect to the database:', error.message);
});
