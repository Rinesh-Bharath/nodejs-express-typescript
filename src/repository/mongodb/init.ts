import { connect, ConnectOptions } from 'mongoose';
import { serverLogger as logger } from '../../shared/logger';

const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_DATABASE } = process.env as Readonly<{
  MONGO_USERNAME: string;
  MONGO_PASSWORD: string;
  MONGO_DATABASE: string;
}>;

let isConnected = false; // Reuse connection

export async function connectDB(): Promise<void> {
  if (isConnected) {
    return;
  }
  try {
    const connectionString: string = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@mongodb-core:27017/${MONGO_DATABASE}`;
    const connectionOptions: ConnectOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      authSource: 'admin', // Authenticate against the admin database
    } as ConnectOptions;
    await connect(connectionString, connectionOptions);
    isConnected = true;
    logger.info('MongoDB connected...');
  } catch (err) {
    logger.error(`Failed to connect to MongoDB - ${err}`);
    process.exit(1);
  }
}
