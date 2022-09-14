import { Context, Telegraf } from 'telegraf';
import { Update } from 'typegram';
import { appendSheet } from './utils/appendSheet';
require("dotenv").config({ path: '.env' });

const BOT_TOKEN = process.env.BOT_TOKEN;
const bot: Telegraf<Context<Update>>
  = new Telegraf(process.env.BOT_TOKEN as string);

bot.start((ctx) => { ctx.reply('The Lucky Draw has started!') });

bot.on('new_chat_members', async(ctx) => {
  console.log('new member:', ctx.from);
  try {
    await appendSheet({
      user: `@${ctx.from.username}`, 
    });  
  } catch (error) {
    console.log(error);
  }
})

bot.launch();
console.log('Bot has started!....');
