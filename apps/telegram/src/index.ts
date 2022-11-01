import { hydrate } from '@grammyjs/hydrate';
import express from 'express';
import { Bot } from 'grammy';

import { getMeme, getMyriam, getOjo, getVersion } from './commands/custom';
import { listBirthdays, updateBirthdays } from './commands/OnDb/birthDays';
import { populate, responseMSG } from './commands/OnDb/readMsd';
import { logger } from './Logger';
import type { MyContext } from './models/Context';

const telegramToken = process.env.TELEGRAM_TOKEN ?? '';

const main = async () => {
    const app = express();
    const port = process.env.PORT || 3333;
    app.use(express.json()); // parse the JSON request body

    const bot = new Bot<MyContext>(telegramToken);
    bot.use(hydrate());
    logger.info({
        message: 'DuckyBot Setting commands',
    });

    await bot.api.setMyCommands([
        { command: 'meme', description: 'Dropea meme' },
        { command: 'ojo', description: 'Ojito' },
        { command: 'myriam', description: 'Te dice su nuevo numero' },
        { command: 'version', description: 'Te dice la version del bot' },
        { command: 'populate', description: 'Actualiza los respuestas' },
        {
            command: 'updatecumple',
            description: 'Añade tu fecha de cumpleaños Uso /cumpleaños 18-07-1998',
        },
        {
            command: 'listcumples',
            description: 'Muestra todos los cumples formato Peru',
        },
    ]);

    // Commands
    bot.command('version', getVersion);
    bot.command('meme', getMeme);
    bot.command('ojo', getOjo);
    bot.command('myriam', getMyriam);

    bot.command('populate', populate);

    bot.command('updatecumple', updateBirthdays);
    bot.command('listcumples', listBirthdays);

    logger.info({
        message: 'DuckyBot Commands set',
    });
    bot.on('message:text', responseMSG);

    logger.info({
        message: 'DuckyBot ready to read msg',
    });

    app.listen(port, () => {
        logger.info(`Web server started at ${port}`);
    });

    app.get('/', (req, res) => {
        res.send('Alive'.trim());
    });
    await bot.start();
};

void main();
