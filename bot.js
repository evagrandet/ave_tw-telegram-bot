const { Telegraf } = require('telegraf');
const token = require('./token');
const bot = new Telegraf(token);

const CHAT_WARS_ID = 265204902;

const USERS = [417653081, 593183093];

const setData = require('./setData');



// bot.start(async ctx => await ctx.reply(`купи котам посрать`));

// bot.hears('text', async ctx =>  await ctx.reply(`${ctx.from.id}`));

bot.on('forward', async ctx =>  {
   checkForward(ctx);
   //return ctx.reply(`${ctx.from.id}`);
   //await setData(ctx);
});

const checkForward = (ctx) => {
   if (ctx.message.forward_from.id !== CHAT_WARS_ID) {
      return ctx.reply(`Это не чатворс, что ты несешь`);
   } else {
      return setData(ctx);
   }
}


const checkUsers = (ctx) => {
   if (!USERS.includes(ctx.from.id)) {
      return ctx.reply(`Я тебя не знаю, пиши хозяйке, чтобы разрешила с тобой разговаривать`)
   } else {
      return ctx.reply(`
         Меня создали, чтобы я могла хуярить данные в гугл щитс вместо кожаных ублюдков. Поэтому я с удовольствием приму от тебя форвард твоей биржи. Ебош!
      `);
   }
}

bot.on('message', async ctx =>  {
   checkUsers(ctx);
});

bot.launch();

// получает форвард/сообщение

// проверяет, от авторизованных ли это юзеров

// проверяет, от ЧВ ли это
