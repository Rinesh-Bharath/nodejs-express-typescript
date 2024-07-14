import dotenv from 'dotenv';

import app from './app';
import { connectDB } from './repository/mongodb/init';
import { serverLogger as logger } from './shared/logger';

dotenv.config();

init();

async function init() {
  try {
    // Connects the mongo database
    await connectDB();

    app.listen(process.env.SERVER_PORT, () => {
      console.log(`[server]: Server is running at ${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`);
      logger.info(`[server]: Server is running at ${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`);
    });
    process.on('SIGINT', function () {
      logger.warn('\nGracefully shutting down from SIGINT (Ctrl-C)');
      // some other closing procedures go here
      process.exit(0);
    });
  } catch (error) {
    logger.error(`An error occurred: ${JSON.stringify(error)}`);
    process.exit(1);
  }
}
