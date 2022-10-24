import { WinstonTransport as AxiomTransport } from '@axiomhq/axiom-node';
import winston from 'winston';

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [new AxiomTransport({ dataset: 'telegram' })],
});

// Add the console logger if we're not in production
if (process.env.NODE_ENV != 'production') {
    logger.add(
        new winston.transports.Console({
            format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
        })
    );
}
logger.info({
    level: 'info',
    message: 'Logger successfuly setup',
});

export { logger };
