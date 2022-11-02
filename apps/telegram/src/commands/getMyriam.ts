import { faker } from '@faker-js/faker';
import { CommandContext } from 'grammy';

import { MyContext } from '../models/Context';

async function getMyriam(ctx: CommandContext<MyContext>) {
    const randomNumber = faker.phone.number('+34 ### ### ###');
    const ojo = 'tiene numero nuevo ' + randomNumber;
    await ctx.reply(ojo);
}

export { getMyriam };
