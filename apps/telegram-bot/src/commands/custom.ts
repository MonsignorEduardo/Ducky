import {faker} from '@faker-js/faker';
import axios from 'axios';
import {CommandContext} from 'grammy';

import {MyContext} from '../models/Contex';

function getVersion(ctx: CommandContext<MyContext>) {
  ctx.reply('La version es 🤌🏻🤌🏻🤌🏻🤌🏻🤌🏻🤌🏻🤌🏻🤌🏻🤌🏻🤌🏻🤌🏻 ' + 1);
}

async function getMeme(ctx: CommandContext<MyContext>) {
  try {
    console.log('Get meme Command from ' + ctx.message?.from.username);
    const response = await axios.get('https://meme-api.herokuapp.com/gimme');
    const {url} = response.data;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ctx.replyWithPhoto(url);
  } catch (e) {
    ctx.reply('Peto el meme ' + e);
  }
}

//Clear text

async function clearCtx(ctx: CommandContext<MyContext>) {
  try {
    await ctx.deleteMessage();
  } catch (e) {
    ctx.reply('Peto el meme ' + e);
  }
}

// OJO
function getOjo(ctx: CommandContext<MyContext>) {
  let ojo = 'OJO';
  const max = Math.floor(Math.random() * 20) + 1;
  for (let i = 0; i < max; i++) {
    ojo = ojo + 'O';
  }
  ctx.reply(ojo);
}

// Myriam

function getMyriam(ctx: CommandContext<MyContext>) {
  const randomNumber = faker.phone.number('+34 ### ### ###');
  const ojo = 'tiene numero nuevo ' + randomNumber;
  ctx.reply(ojo);
}
// Lour

async function shutUpLou(ctx: CommandContext<MyContext>) {
  if (ctx.message) {
    const username = (await ctx.getAuthor()).user.username;
    if (username?.toLowerCase() === 'lou_rookie') {
      const i = Math.floor(Math.random() * 100);
      console.log(`user ${username} i ${i}`);
      if (i <= 15) {
        ctx.replyWithVideo(
          'https://cdn.discordapp.com/attachments/978990392999559219/990735723579707462/Callate_Lourdes_Plaza_Santo_Domingo_16_06_2017_DvGDppCJOag.mp4',
          {
            reply_to_message_id: ctx.message.message_id,
          }
        );
      }
    }
  }
}

export {clearCtx, getMeme, getMyriam, getOjo, getVersion, shutUpLou};
