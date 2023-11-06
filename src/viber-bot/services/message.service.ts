///<reference path = '../models/viber-bot.model.d.ts' />
import { TextMessage, ViberResponse } from 'viber-bot';

import viberBotService, { ViberBotService } from './viber-bot.service'
import { GreetRegex, OpenMenuRegex } from '../constants';

export class MessageService {
  constructor(private viberBotService: ViberBotService) {}

  handleSubscribeEvent(response: ViberResponse): void {
    //TODO provide subscribe event handler
  }

  handleMessageEvent(message: TextMessage, response: ViberResponse): void {
    //TODO provide message event handler
  }

  handleTextMessage(message: TextMessage, response: ViberResponse): void {
    if (GreetRegex.test(message.text)) {
      this.viberBotService.initialMenuTemplate(response);
    }

    if (OpenMenuRegex.test(message.text)) {
      this.viberBotService.secondaryMenuTemplate(response)
    }
  }
}

export default new MessageService(viberBotService);
