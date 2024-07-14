import { connect, ConnectOptions } from 'mongoose';

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
    console.log('MongoDB connected...');
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  }
}
