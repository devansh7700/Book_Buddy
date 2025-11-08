import express from 'express';

const app = express();

// Middleware
app.use(express.json());


// Default route
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Library API is running ' });
});

export default app;
