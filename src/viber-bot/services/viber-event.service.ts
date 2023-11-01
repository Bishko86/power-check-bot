import { Bot, Events, TextMessage, ViberResponse } from 'viber-bot';

import { MessageService } from './message.service';
import { GreetRegex, OpenMenuRegex } from '../constants';
import messageService from './message.service';

class ViberEventService {
  constructor(
    private viberBotInstance: Bot,
    private messageService: MessageService,
  ) {}

  start(): Bot {
    this.listenBotEvents();
    return this.viberBotInstance;
  }

  private listenBotEvents(): void {
    this.watchForSubscribeEvent();
    this.watchForReceivedMessageEvent();
    this.watchForTextMessage();
  }

  private watchForSubscribeEvent(): void {
    this.viberBotInstance.on(Events.SUBSCRIBED, (response: ViberResponse) => {
      this.messageService.handleSubscribeEvent(response);
    });
  }

  private watchForReceivedMessageEvent(): void {
    this.viberBotInstance.on(Events.MESSAGE_RECEIVED, (message: TextMessage, response: ViberResponse) => {
      this.messageService.handleMessageEvent(message, response);
    });
  }

  private watchForTextMessage(): void {
    this.viberBotInstance.onTextMessage(GreetRegex, (message: TextMessage, response: ViberResponse) => {
      this.messageService.handleTextMessage(message, response);
    });

    this.viberBotInstance.onTextMessage(OpenMenuRegex, (message: TextMessage, response: ViberResponse) => {
      this.messageService.handleTextMessage(message, response);
    });
  }
}

const bot = new Bot({
  authToken: process.env.BOT_ACCOUNT_TOKEN,
  name: process.env.BOT_NAME,
  avatar: process.env.AVATAR_URL
});

export default new ViberEventService(bot, messageService).start();
