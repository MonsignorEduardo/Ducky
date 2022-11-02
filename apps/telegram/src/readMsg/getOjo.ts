import { MyContext } from '../models/Context';

async function getOjo(ctx: MyContext) {
    let ojo = 'OJO';
    const max = Math.floor(Math.random() * 20) + 1;
    for (let i = 0; i < max; i++) {
        ojo = ojo + 'O';
    }
    await ctx.reply(ojo);
}

export { getOjo };
