import { Command, prisma } from '@ducky/db';

import { MyContext } from '../models/Context';
import { dbService } from '../services/Db';
import { logger } from '../services/Logger';
import { getMeme } from './getMeme';
import { getOjo } from './getOjo';

async function responseMSG(ctx: MyContext) {
    try {
        logger.info('Mensaje recibido');

        const data = await getData(ctx);

        if (data) {
            const { msg, message_id } = data;

            // Pre dtb
            // FIXME: Move to DB

            if (msg.includes('meme')) {
                return await getMeme(ctx);
            }
            if (msg.includes('ojo')) {
                return await getOjo(ctx);
            }

            const command = await dbService.findCommand(msg);
            logger.info('Commando recibido', { command });
            if (!command) {
                return;
            }
            if (!inTime(command)) {
                return;
            }
            logger.info('Ejecutando  commando', { command });
            switch (command.type) {
                case 'STICKER':
                    await ctx.replyWithSticker(command.response, {
                        reply_to_message_id: message_id,
                    });
                    break;
                case 'TEXT':
                    await ctx.reply(command.response, {
                        reply_to_message_id: message_id,
                    });
                    break;
                case 'VIDEO':
                    await ctx.replyWithVideo(command.response, {
                        reply_to_message_id: message_id,
                    });
                    break;
                case 'FOTO':
                    await ctx.replyWithPhoto(command.response, {
                        reply_to_message_id: message_id,
                    });
                    break;
                case 'AUDIO':
                    await ctx.replyWithAudio(command.response, {
                        reply_to_message_id: message_id,
                    });
                    break;
                default:
                    break;
            }

            if (command.extraResponse && command.type !== 'STICKER') {
                await ctx.reply(command.extraResponse, {
                    reply_to_message_id: message_id,
                });
            }
            await prisma.command.update({
                where: { id: command.id },
                data: { lastCall: new Date() },
            });
        }
    } catch (error) {
        logger.error('responseMSG - crash', { error, ctx });
    }
}

const inTime = (comando: Command): boolean => {
    const tActual = new Date();
    const mTms = 60000;
    logger.info(`inTime | Tactual  ${(tActual.getTime() - comando.lastCall.getTime()) / mTms}`);

    if (tActual.getTime() - comando.lastCall.getTime() >= comando.timer * mTms) {
        comando.lastCall = tActual;
        logger.info(`inTime | Ultima  ${comando.lastCall.getTime() / mTms}`);

        return true;
    }
    return false;
};

const getData = async (ctx: MyContext) => {
    const author = await ctx.getAuthor();
    if (author.user.is_bot) return false;

    const msg = ctx.message?.text?.toLocaleLowerCase();
    const message_id = ctx.message?.message_id;

    if (msg === undefined || message_id === undefined) return false;

    return {
        author,
        msg,
        message_id,
    };
};

export { responseMSG };
