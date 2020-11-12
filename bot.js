const { Telegraf } = require('telegraf');
const token = require('./token');
const bot = new Telegraf(token);

const CHAT_WARS_ID = 265204902;

const USERS = [417653081, 593183093];

const takeData = require('./takeData');



// bot.start(async ctx => await ctx.reply(`купи котам посрать`));

// bot.hears('text', async ctx =>  await ctx.reply(`${ctx.from.id}`));

bot.on('forward', async ctx =>  {
   checkForward(ctx);
   return ctx.reply(`${ctx.from.id}`);
   //await takeData(ctx);
});

const checkForward = (ctx) => {
   if (ctx.message.forward_from.id !== CHAT_WARS_ID) {
      return ctx.reply(`Это ты чатворс, что ты несешь`);
   } else {
      return true;
   }
}

const checkUsers = (ctx) => {
   console.log(ctx.from.id, USERS, !USERS.includes(ctx.from.id))
   if (!USERS.includes(ctx.from.id)) {
      return ctx.reply(`Я тебя не знаю, пиши хозяйке, чтобы разрешила с тобой разговаривать`)
   } else {
      return ctx.reply(`
         Меня создали, чтобы я могла хуярить данные в гугл щитс вместо кожаных ублюдков. Поэтому я с удовольствием приму от тебя форвард твоей биржи. Ебош!
      `);
   }
}

bot.on('message', async ctx =>  {
   console.log(ctx.message.text)
   checkUsers(ctx);
});

bot.launch();

// получает форвард/сообщение

// проверяет, от авторизованных ли это юзеров

// проверяет, от ЧВ ли это
