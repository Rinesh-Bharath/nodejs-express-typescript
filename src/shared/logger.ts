import fs from 'fs';
import path from 'path';
import pino from 'pino';

const logsDir = path.join(__dirname, '..', '..', 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

const appLogFile = path.join(logsDir, 'app.log');
const appLogStream = fs.createWriteStream(appLogFile, { flags: 'a' });

const errorLogFile = path.join(logsDir, 'error.log');
const errorStream = fs.createWriteStream(errorLogFile, { flags: 'a' });

const httpLogFile = path.join(logsDir, 'http.log');
const httpLogStream = fs.createWriteStream(httpLogFile, { flags: 'a' });

const serverLogFile = path.join(logsDir, 'server.log');
const serverLogStream = fs.createWriteStream(serverLogFile, { flags: 'a' });

const customOptions = {
  formatter: {
    level: (label: string) => {
      return {
        level: label.toUpperCase(),
      };
    },
  },
  timestamp: () => `,"timestamp":"${new Date(Date.now()).toISOString()}"`,
};

// Create respective Pino logger instances
const appLogger = pino(
  {
    level: 'info',
    formatters: customOptions.formatter,
    timestamp: customOptions.timestamp,
  },
  appLogStream
);

const errorLogger = pino(
  {
    level: 'error',
    formatters: customOptions.formatter,
    timestamp: customOptions.timestamp,
  },
  errorStream
);

const httpLogger = pino(
  {
    level: 'info',
    formatters: customOptions.formatter,
    timestamp: customOptions.timestamp,
  },
  httpLogStream
);

const serverLogger = pino(
  {
    level: 'info',
    formatters: customOptions.formatter,
    timestamp: customOptions.timestamp,
  },
  serverLogStream
);

export { appLogger, errorLogger, httpLogger, serverLogger };
