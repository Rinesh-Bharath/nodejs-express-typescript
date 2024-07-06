import app from './app';
import dotenv from 'dotenv';

dotenv.config();

init();

async function init() {
  try {
    app.listen(process.env.SERVER_PORT, () => {
      console.log(`[server]: Server is running at ${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`);
    });
    process.on('SIGINT', function () {
      console.log('\nGracefully shutting down from SIGINT (Ctrl-C)');
      // some other closing procedures go here
      process.exit(0);
    });
  } catch (error) {
    console.error(`An error occurred: ${JSON.stringify(error)}`);
    process.exit(1);
  }
}
