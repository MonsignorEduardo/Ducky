import { Command, prisma } from '@ducky/db';
import { CommandContext } from 'grammy';

import { logger } from '../Logger';
import { MyContext } from '../models/Context';
import { UserCommand } from '../models/DataComand';
import { inTime } from './helper';

let storedCommands: Command[] = [];

async function populate(ctx: CommandContext<MyContext>) {
    const response = await ctx.reply('Populating ....');
    storedCommands = await prisma.command.findMany();
    await response.editText(`${storedCommands.length} Comandos actualizados e importados`);
}

async function create(ctx: CommandContext<MyContext>) {
    const ctxResponse = await ctx.reply('Creando ...');
    const [matches, response] = ctx.match.split('-');
    const responseText = await prisma.command.create({
        data: {
            matches: matches,
            type: 'text',
            response: response,
            timer: 60,
        },
    });
    storedCommands.push(responseText);
    await ctxResponse.editText(`Comando  creado con éxito 🤗 ${JSON.stringify(responseText)}`);
}

async function executeCommandDB(ctx: MyContext) {
    const data = await getDataCommand(ctx);
    logger.info(
        `ExecuteCommandDB | Received msg from ${ctx.from?.username ?? 'Pepe'} with message ${
            ctx.message?.text ?? 'Tus muertos'
        }`
    );
    if (data && data.inTime) {
        const { command, message_id } = data;
        logger.info(`executeCommandDB Executing command ${command.matches}`);
        switch (command.type) {
            case 'sticker':
                await ctx.replyWithSticker(command.response, {
                    reply_to_message_id: message_id,
                });
                break;
            case 'text':
                await ctx.reply(command.response, {
                    reply_to_message_id: message_id,
                });
                break;
            case 'video':
                await ctx.replyWithVideo(command.response, {
                    reply_to_message_id: message_id,
                });
                break;
            case 'foto':
                await ctx.replyWithPhoto(command.response, {
                    reply_to_message_id: message_id,
                });
                break;
            case 'audio':
                await ctx.replyWithAudio(command.response, {
                    reply_to_message_id: message_id,
                });
                break;
            default:
                break;
        }

        if (command.extraResponse && command.type !== 'sticker') {
            await ctx.reply(command.extraResponse, {
                reply_to_message_id: message_id,
            });
        }
        await prisma.command.update({
            where: { id: command.id },
            data: { lastCall: new Date() },
        });
    }
}

const findCommand = (msg: string) => {
    return storedCommands.find((command) => {
        return msg.includes(command.matches.toLowerCase());
    });
};

const getDataCommand = async (ctx: MyContext): Promise<UserCommand | false> => {
    if ((await ctx.getAuthor()).user.is_bot) return false;

    const msg = ctx.message?.text?.toLocaleLowerCase();
    const message_id = ctx.message?.message_id;

    if (msg === undefined || message_id === undefined) return false;

    const command = findCommand(msg);

    if (command === undefined) return false;

    return {
        bot: false,
        command,
        inTime: inTime(command),
        message_id,
    };
};

export { create, executeCommandDB, populate };
