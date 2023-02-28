// module.exports = (request, response) => {
//     response.json({
//       body: request.body,
//       query: request.query,
//       cookies: request.cookies,
//     });
// };
// https://github.com/yagop/node-telegram-bot-api/issues/319#issuecomment-324963294
// Fixes an error with Promise cancellation
// process.env.NTBA_FIX_319 = 'test';

// Require our Telegram helper package
const TelegramBot = require('node-telegram-bot-api');

// Export as an asynchronous function
// We'll wait until we've responded to the user
module.exports = async (request, response) => {
    try {
        // Create our new bot handler with the token
        // that the Botfather gave us
        // Use an environment variable so we don't expose it in our code
        const bot = new TelegramBot(process.env.BOT_TOKEN);

        bot.command('random', (ctx) => {
            ctx.reply('random random random!')
          })
          bot.hears(['hi', 'Hey', 'hey', 'Hi', 'Hello', 'hello', 'What is up?'], (ctx) => ctx.reply('Hey there'));

          bot.on('sticker', (ctx) => ctx.reply('👍'));

          bot.start(async (ctx) => {
             ctx.reply('start 234234234234234')
          });

        // Retrieve the POST request body that gets sent from Telegram
        const { body } = request;

        // Ensure that this is a message being sent
        if (body.message) {
            // Retrieve the ID for this chat
            // and the text that the user sent
            const { chat: { id }, text } = body.message;

            // Create a message to send back
            // We can use Markdown inside this
            const message = `✅ Thanks for your message: *"${text}"*\nHave a great day! 👋🏻`;

            // Send our new message back in Markdown and
            // wait for the request to finish
            await bot.sendMessage(id, message, {parse_mode: 'Markdown'});
        }
    }
    catch(error) {
        // If there was an error sending our message then we 
        // can log it into the Vercel console
        console.error('Error sending message');
        console.log(error.toString());
    }
    response.send('Ok');
};
