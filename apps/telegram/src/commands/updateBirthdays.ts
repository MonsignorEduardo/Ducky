import { prisma } from '@ducky/db';
import { CommandContext } from 'grammy';

import { logger } from '../services/Logger';
import { MyContext } from '../models/Context';

async function updateBirthdays(ctx: CommandContext<MyContext>) {
    const response = await ctx.reply('Actualizando cumpleaños ....');
    const date = ctx.match.split('-');
    if (date.length === 3) {
        const [d, m, y] = date;
        const username = (await ctx.getAuthor()).user.username;
        if (username !== undefined) {
            const user = await prisma.telegramUser.upsert({
                where: { username: username },
                update: {},
                create: {
                    username: username,
                    birthday: {
                        create: {
                            day: new Date(`${y}-${m}-${d}`),
                        },
                    },
                },
            });
            logger.info('updateUsernames - telegramUser updated', { user });
            await response.editText(`Cumpleaños actualizado ${y}-${m}-${d}`);
        } else {
            logger.error('updateUsernames no username found', { ctx });
        }
    }
}

export { updateBirthdays };
