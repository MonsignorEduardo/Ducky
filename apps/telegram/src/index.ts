import express from 'express';

import { DuckyBot } from './DuckyBot';
import { logger } from './Logger';

const myBot = new DuckyBot();
void myBot.start();

const app = express();
const port = process.env.PORT || 3333;

app.listen(port, () => {
    logger.info(`Web server started at ${port}`);
});

app.get('/health', (req, res) => {
    logger.debug(`Health request ${req.headers}`);
    res.sendStatus(200);
});
