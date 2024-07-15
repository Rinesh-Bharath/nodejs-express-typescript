import pino from 'pino';

const destination = `${__dirname}/../../../logs/http.log`;

const httpLogger = pino({
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

export { httpLogger };
