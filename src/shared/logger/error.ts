import pino from 'pino';

const destination = `${__dirname}/../../../logs/error.log`;

const { NODE_ENV } = process.env as Readonly<{
  NODE_ENV: string;
}>;

// Supress logs for testing
const logLevel = NODE_ENV === 'test' ? 'silent' : 'info';

const errorLogger = pino({
  timestamp: () => `,"timestamp":"${new Date(Date.now()).toISOString()}"`,
  transport: {
    targets: [
      {
        level: logLevel,
        target: 'pino/file',
        options: { destination: destination, mkdir: true },
      },
      {
        level: logLevel,
        target: 'pino-pretty',
        options: { colorize: true },
      },
    ],
  },
});

export { errorLogger };
