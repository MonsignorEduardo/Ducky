import { CommandContext } from 'grammy';

import { MyContext } from '../models/Context';

async function getVersion(ctx: CommandContext<MyContext>) {
    await ctx.reply(`La version es 🤌🏻🤌🏻🤌🏻🤌🏻🤌🏻🤌🏻🤌🏻🤌🏻🤌🏻🤌🏻🤌🏻 1.2`);
}

export { getVersion };
