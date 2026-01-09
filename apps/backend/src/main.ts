import { config } from './config/env.js';
import { createServer } from './server.js';
import { logger } from './utils/logger.js';

async function main() {
  const app = createServer();

  app.listen(config.port, () => {
    logger.info(`Server running on port ${config.port}`);
    logger.info(`Environment: ${config.nodeEnv}`);
  });
}

main().catch((error) => {
  logger.error('Failed to start server:', error);
  process.exit(1);
});
