import pino from 'pino';

const destination = `${__dirname}/../../../logs/app.log`;

const appLogger = pino({
  timestamp: () => `,"timestamp":"${new Date(Date.now()).toISOString()}"`,
  transport: {
    targets: [
      {
        target: 'pino/file',
        options: { destination: destination, mkdir: true },
      },
      {
        target: 'pino-pretty',
        options: { colorize: true },
      },
    ],
  },
});

export { appLogger };
