import "dotenv/config.js";
import { ViberBot } from './viber-bot/app.bot';
import { MongoDB } from './api/api';

MongoDB.startConnection().then(() => {
  ViberBot.start();
});
