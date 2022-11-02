import { prisma } from '@ducky/db';
import { CommandContext } from 'grammy';

import { logger } from '../services/Logger';
import { MyContext } from '../models/Context';

async function listBirthdays(ctx: CommandContext<MyContext>) {
    const response = await ctx.reply('Obteniendo cumpleaños ....');
    const birthdays = await prisma.birthday.findMany({});
    if (birthdays) {
        const prettyB = birthdays
            .filter((b) => b.username && b.username !== '')
            .map((b) => {
                return `El cumple de ${b.username} es ${b.day.toLocaleDateString()}`;
            })
            .join('\n');
        await response.editText(prettyB);
    } else {
        logger.error('updateUsernames no username found', { ctx });
    }
}

export { listBirthdays };
