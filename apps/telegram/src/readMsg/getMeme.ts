import axios from 'axios';

import { MyContext } from '../models/Context';
import { logger } from '../services/Logger';

const getMemeUrl = async () => {
    try {
        const response = await axios.get('https://meme-api.herokuapp.com/gimme');
        const { url } = response.data as { url: string };
        return url;
    } catch (e) {
        logger.error({ message: 'getMemeUrl | crashed', error: e });
        return '';
    }
};

const getMeme = async (ctx: MyContext) => {
    await ctx.reply('Getting the meme ...');
    const memeUrl = await getMemeUrl();
    await ctx.replyWithPhoto(memeUrl);
};

export { getMeme };
