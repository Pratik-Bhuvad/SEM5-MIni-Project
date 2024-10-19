const express = require('express');
const connectDB = require('./Config/db'); // Database connection
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

const corsOptions = {
    origin: 'http://localhost:5173', // Allow only this origin to access the server
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

// Middleware
app.use(express.json());
app.use(cors()); // Enable CORS for all origins, can be configured further if needed

// Connect to the database and start server
connectDB().then(() => {
    // Routes
    app.use('/api/emissions', emissionsRoute);
    app.use('/api/css', cssOptimizationRouter);
    app.use('/api/spa', spaCheckRoute);
    app.use('/api/analyze', analyzeRoute);
    app.use('/api/image', imageOptimization);
    app.use('/api/store-estimation', estimationRoutes);
    
    // Auth routes
    app.post('/api/auth/signup', signup); // Use POST for auth routes
    app.post('/api/auth/login', login);

    // Error handling middleware
    app.use((err, req, res, next) => { // Added `next` to middleware signature
        console.error(err.stack); // Log error stack for debugging
        res.status(500).json({ error: 'Something went wrong!' });
    });

    // Start the server
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}).catch(error => {
    console.error('Failed to connect to the database:', error.message);
});
