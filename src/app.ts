import express from 'express';
import bookRoutes from './api/v1/routes/bookRoutes';
import { setupSwagger } from './config/swagger';
import { startOverdueCron } from './cron/overdueChecker';

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/v1/books', bookRoutes);

// Swagger docs
setupSwagger(app);

// Start Node-Cron Job
startOverdueCron();

// Default route
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Library API is running ' });
});

export default app;
