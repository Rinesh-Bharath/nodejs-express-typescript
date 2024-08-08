import dotenv from 'dotenv';

import app from './app';
import { connectDB, disConnectDB } from './repository/mongodb/init';
import { serverLogger as logger } from './shared/logger';

dotenv.config();

init();

async function init() {
  try {
    // Connects the mongo database
    await connectDB();

    const server = app.listen(process.env.SERVER_PORT, () => {
      logger.info(`[Express]: Server is running at ${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`);
    });
    server.setTimeout(Number(process.env.SERVER_TIMEOUT));
    process.on('SIGINT', async function () {
      logger.warn('\nGracefully shutting down from SIGINT (Ctrl-C)');
      // some other closing procedures go here
      await disConnectDB();
      process.exit(0);
    });
  } catch (error) {
    logger.error(error, `[Express]: An error occurred while starting the server`);
    process.exit(1);
  }
}
