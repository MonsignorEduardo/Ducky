import { hydrate } from '@grammyjs/hydrate';
import { Bot } from 'grammy';

import { clearCtx, getMeme, getMyriam, getOjo, getVersion } from './commands/custom';
import { create, executeCommandDB, populate } from './commands/onDb';
import type { MyContext } from './models/Context';

export class DuckyBot {
    bot: Bot<MyContext>;
    constructor() {
        this.bot = new Bot(process.env.TELEGRAM_TOKEN!);
        this.bot.use(hydrate());
    }

    start() {
        this.bot.start();
    }

    async setCommands() {
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
        this.bot.command('version', getVersion, clearCtx);
        this.bot.command('meme', getMeme, clearCtx);
        this.bot.command('ojo', getOjo, clearCtx);
        this.bot.command('myriam', getMyriam, clearCtx);

        this.bot.command('populate', populate);
        this.bot.command('create', create);

        this.bot.on('message:text', executeCommandDB);
    }
}
