import { hydrate } from '@grammyjs/hydrate';
import { Bot } from 'grammy';

import { getMeme, getMyriam, getOjo, getVersion } from './commands/custom';
import { create, executeCommandDB, populate } from './commands/onDb';
import { logger } from './Logger';
import type { MyContext } from './models/Context';

const telegramToken = process.env.TELEGRAM_TOKEN ?? '';

export class DuckyBot {
    bot: Bot<MyContext>;
    constructor() {
        this.bot = new Bot(telegramToken);
        this.bot.use(hydrate());
    }

    async start() {
        try {
            logger.info({
                message: 'DuckyBot starting',
            });
            await this.setCommands();
            await this.bot.start();
            logger.info({
                message: 'DuckyBot started',
            });
        } catch (error) {
            logger.error(error);
        }
    }

    private async setCommands() {
        logger.info({
            message: 'DuckyBot Setting commands',
        });

        await this.bot.api.setMyCommands([
            { command: 'meme', description: 'Dropea meme' },
            { command: 'ojo', description: 'Ojito' },
            { command: 'myriam', description: 'Te dice su nuevo numero' },
            { command: 'version', description: 'Te dice la version del bot' },
            { command: 'moneda', description: 'Lanza moneda' },
            { command: 'populate', description: 'Actualiza los respuestas' },
            {
                command: 'create',
                description: 'Crea un comando personalizado uso create name-value',
            },
        ]);

        // Commands
        this.bot.command('version', getVersion);
        this.bot.command('meme', getMeme);
        this.bot.command('ojo', getOjo);
        this.bot.command('myriam', getMyriam);

        this.bot.command('populate', populate);
        this.bot.command('create', create);

        logger.info({
            message: 'DuckyBot Commands set',
        });
        this.bot.on('message:text', executeCommandDB);

        logger.info({
            message: 'DuckyBot ready to read msg',
        });
    }
}
