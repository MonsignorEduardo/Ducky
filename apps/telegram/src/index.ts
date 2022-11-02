import { hydrate } from '@grammyjs/hydrate';
import express from 'express';
import { Bot, webhookCallback } from 'grammy';

import { getMyriam } from './commands/getMyriam';
import { getVersion } from './commands/getVersion';
import { listBirthdays } from './commands/listBirthdays';
import { updateBirthdays } from './commands/updateBirthdays';
import type { MyContext } from './models/Context';
import { responseMSG } from './readMsg/readMsd';
import { logger } from './services/Logger';

const telegramToken = process.env.TELEGRAM_TOKEN ?? '';

const getBot = () => {
    // let bot: Bot<MyContext>;
    // if (process.env.NODE_ENV === 'development') {
    //     bot = new Bot<MyContext>(telegramToken);
    // } else {
    //     bot = new Bot(telegramToken, {
    //         client: {
    //             // We accept the drawback of webhook replies for typing status.
    //             canUseWebhookReply: (method) => method === 'sendChatAction',
    //         },
    //     });
    // }

    // return bot;
    return new Bot<MyContext>(telegramToken);
};

const main = async () => {
    // Express
    const app = express();
    const port = process.env.PORT || 3333;
    app.use(express.json()); // parse the JSON request body
    app.listen(port, () => {
        logger.info(`Web server started at ${port}`);
    });

    app.get('/', (req, res) => {
        res.send('Alive'.trim());
    });

    // Telegram Bot
    const bot = getBot();

    bot.use(hydrate());
    logger.info({
        message: 'DuckyBot Setting commands',
    });

    await bot.api.setMyCommands([
        { command: 'myriam', description: 'Te dice su nuevo numero' },
        { command: 'version', description: 'Te dice la version del bot' },
        {
            command: 'cc',
            description: 'Añade tu fecha de cumpleaños Uso /cc 18-07-1998',
        },
        {
            command: 'lc',
            description: 'Muestra todos los cumples formato Peru',
        },
    ]);

    // Commands
    bot.command('version', getVersion);
    bot.command('myriam', getMyriam);
    bot.command('cc', updateBirthdays);
    bot.command('lc', listBirthdays);

    logger.info({
        message: 'DuckyBot Commands set',
    });
    bot.on('message:text', responseMSG);

    logger.info({
        message: 'DuckyBot ready to read msg',
    });

    // if (process.env.NODE_ENV === 'development') {
    //     await bot.start();
    // } else {
    //     app.use(webhookCallback(bot, 'express'));
    // }
    await bot.start();
};

void main();
