import express from 'express';

import { DuckyBot } from './DuckyBot';
import { logger } from './Logger';

const myBot = new DuckyBot();
void myBot.start();

const app = express();
const port = process.env.PORT || 3333;

app.get('/', (req, res) => {
    res.json({ message: 'Hello World!' });
});

app.listen(port, () => {
    logger.info(`Web server started at ${port}`);
});
