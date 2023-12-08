import { Bot } from 'viber-bot';

export class ViberBotHelper {
  static bot: Bot;

  private constructor() { }

  static getBot(): Bot {
    if (!this.bot) {
      this.bot = new Bot({
        authToken: process.env.BOT_ACCOUNT_TOKEN,
        name: process.env.BOT_NAME,
        avatar: process.env.AVATAR_URL
      });
    }
    return this.bot;
  }
}
