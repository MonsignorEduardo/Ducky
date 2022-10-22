import { Command as DbCommand } from '@prisma/client';
import { CommandContext } from 'grammy';

import { MyContext } from '../models/Context';
import { UserCommand } from '../models/DataComand';
import { inTime } from './helper';
import { prisma } from './prisma';

let storedCommands: DbCommand[] = [];

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
    console.info(`Received msg from ${ctx.from?.username} with message ${ctx.message?.text}`);
    if (data && data.inTime) {
        const { command, message_id } = data;
        console.info(`Executing command ${command.matches}`);
        switch (command.type) {
            case 'sticker':
                ctx.replyWithSticker(command.response, {
                    reply_to_message_id: message_id,
                });
                break;
            case 'text':
                ctx.reply(command.response, {
                    reply_to_message_id: message_id,
                });
                break;
            case 'video':
                ctx.replyWithVideo(command.response, {
                    reply_to_message_id: message_id,
                });
                break;
            case 'foto':
                ctx.replyWithPhoto(command.response, {
                    reply_to_message_id: message_id,
                });
                break;
            case 'audio':
                ctx.replyWithAudio(command.response, {
                    reply_to_message_id: message_id,
                });
                break;
            default:
                break;
        }

        if (command.extraResponse && command.type !== 'sticker') {
            ctx.reply(command.extraResponse, {
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
