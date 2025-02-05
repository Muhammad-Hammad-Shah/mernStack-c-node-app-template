import winston from 'winston';
import { Config } from '.';

// 🔹 Define custom colors
winston.addColors({
    info: 'blue',
    warn: 'yellow',
    error: 'red bold',
    debug: 'cyan',
});

const logger = winston.createLogger({
    level: 'info',

    defaultMeta: {
        servicename: 'auth-service',
    },
    transports: [
        //
        new winston.transports.File({
            level: 'error',
            dirname: 'logs',
            filename: 'error.log',
            format: winston.format.combine(
                winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                // winston.format.colorize({ all: true }),
                winston.format.json(),
                winston.format.prettyPrint(),
            ),
            silent: Config.NODE_ENV === 'test',
        }),

        //
        new winston.transports.File({
            level: 'info',
            dirname: 'logs',
            filename: 'combined.log',
            format: winston.format.combine(
                winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                // winston.format.colorize({ all: true }),
                winston.format.json(),
                winston.format.prettyPrint(),
            ),
            silent: Config.NODE_ENV === 'test',
        }),
        //
        new winston.transports.Console({
            level: 'info',
            format: winston.format.combine(
                winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                // winston.format.colorize({ all: true }),
                winston.format.json(),
                winston.format.prettyPrint(),
            ),
            silent: Config.NODE_ENV === 'test',
        }),
    ],
});

export default logger;
