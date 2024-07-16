import { connect, ConnectOptions, disconnect } from 'mongoose';

import { serverLogger as logger } from '../../shared/logger';

const { MONGO_HOST, MONGO_USERNAME, MONGO_PASSWORD, MONGO_DATABASE } = process.env as Readonly<{
  MONGO_HOST: string;
  MONGO_USERNAME: string;
  MONGO_PASSWORD: string;
  MONGO_DATABASE: string;
}>;

let isConnected = false; // Keep track of the connection status

export async function connectDB(): Promise<void> {
  if (isConnected) {
    return;
  }
  try {
    const connectionString: string = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:27017/${MONGO_DATABASE}`;
    const connectionOptions: ConnectOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      authSource: 'admin', // Authenticate against the admin database
    } as ConnectOptions;
    await connect(connectionString, connectionOptions);
    isConnected = true;
    logger.info('[MongoDB]: MongoDB connected...');
  } catch (error) {
    logger.error(error, `[MongoDB]: Failed to connect to MongoDB`);
    process.exit(1);
  }
}

export async function disConnectDB(): Promise<void> {
  if (!isConnected) {
    return;
  }
  try {
    await disconnect();
    isConnected = false;
    logger.info('[MongoDB]: MongoDB disconnected...');
  } catch (error) {
    logger.error(error, `[MongoDB]: Failed to disconnect from MongoDB`);
  }
}
