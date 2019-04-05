const winston = require('winston');
const { createLogger, format, transports } = winston;
const { combine, timestamp, label, printf, colorize, prettyPrint } = format;

// Check this out or something similar when going into production
// https://gist.github.com/Xeoncross/b8a735626559059353f21a000f7faa4b

const myFormat = printf(info => {
    if (info.stack) {
        return `${info.timestamp} [${info.label}] ${info.level}: ${info.message} ${info.stack}`;
    } else {
        return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
    }
});

winston.addColors({
    error: 'red',
    warn: 'yellow',
    info: 'cyan',
    debug: 'green'
});
const logger = createLogger({
    format: combine(
        colorize(),
        label({ label: 'slingshot/server' }),
        timestamp({
            format: 'DD-MM-YYYY HH:mm:ss'
        }),
        myFormat
    ),
    transports: [new transports.Console()]
});

module.exports = logger;
