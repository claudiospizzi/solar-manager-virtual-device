import http from 'http';
import express from 'express';
import routes from './routes/mystrom-switch';

const router = express();

// Logging
router.use((req, _res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Parse the simple requests
router.use(express.urlencoded({ extended: false }));

// Take care of JSON data
router.use(express.json());

// Default routes
router.use('/', routes);

// Error handling
router.use((req, res) => {
  const error = new Error('not found');
  return res.status(404).json({
    message: error.message,
  });
});

// Detect port
let port = 80;
if (process.env.PORT) {
  const envPort = parseInt(process.env.PORT);
  if (!isNaN(envPort)) {
    port = envPort;
  }
}

// Run server
const httpServer = http.createServer(router);
httpServer.listen(port, () => console.log(`Server now running on port ${port}`));
