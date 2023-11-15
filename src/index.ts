import "dotenv/config.js";
import { ViberBot } from './viber-bot/app.bot';
import { MongoDB } from './api/api';

ViberBot.start();
MongoDB.startConnection(); 