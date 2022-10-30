import { faker } from '@faker-js/faker';
import axios from 'axios';
import { CommandContext } from 'grammy';

import { logger } from '../Logger';
import { MyContext } from '../models/Context';

async function getVersion(ctx: CommandContext<MyContext>) {
    await ctx.reply(`La version es 🤌🏻🤌🏻🤌🏻🤌🏻🤌🏻🤌🏻🤌🏻🤌🏻🤌🏻🤌🏻🤌🏻 1.2`);
}

async function getMeme(ctx: CommandContext<MyContext>) {
    try {
        logger.info(`getMeme | Command from ${ctx.message?.from.username ?? 'Manolo'}`);
        const response = await axios.get('https://meme-api.herokuapp.com/gimme');

        const { url } = response.data as { url: string };

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await ctx.replyWithPhoto(url);
    } catch (e) {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        await ctx.reply(`Peto el meme ${e}`);
        logger.error({ message: 'getMeme | crashed', error: e });
    }
}

// OJO
async function getOjo(ctx: CommandContext<MyContext>) {
    let ojo = 'OJO';
    const max = Math.floor(Math.random() * 20) + 1;
    for (let i = 0; i < max; i++) {
        ojo = ojo + 'O';
    }
    await ctx.reply(ojo);
}

// Myriam

async function getMyriam(ctx: CommandContext<MyContext>) {
    const randomNumber = faker.phone.number('+34 ### ### ###');
    const ojo = 'tiene numero nuevo ' + randomNumber;
    await ctx.reply(ojo);
}
// Lourdes

async function shutUpLou(ctx: CommandContext<MyContext>) {
    if (ctx.message) {
        const username = (await ctx.getAuthor()).user.username;
        if (username?.toLowerCase() === 'lou_rookie') {
            const i = Math.floor(Math.random() * 100);
            logger.info(`shutUpLou | user ${username} i ${i}`);
            if (i <= 15) {
                await ctx.replyWithVideo(
                    'https://cdn.discordapp.com/attachments/978990392999559219/990735723579707462/Callate_Lourdes_Plaza_Santo_Domingo_16_06_2017_DvGDppCJOag.mp4',
                    {
                        reply_to_message_id: ctx.message.message_id,
                    }
                );
            }
        }
    }
}

export { getMeme, getMyriam, getOjo, getVersion, shutUpLou };
