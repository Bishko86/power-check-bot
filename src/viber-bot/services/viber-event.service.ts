///<reference path = '../models/viber-bot.model.d.ts' />
import db from "../../api/services/database.service";
import { Bot, Events, TextMessage, ViberResponse } from 'viber-bot';

import messageService, { MessageService } from './message.service';
import { ViberBotHelper } from '../helpers/bot.helper';
import { UserService } from '../../api/services/user.service';
import { ConsumersService } from '../../api/services/consumers.service';

class ViberEventService {
  constructor(
    private viberBotInstance: Bot,
    private messageService: MessageService,
    private userService: UserService
  ) { }

  start(): Bot {
    this.listenBotEvents();
    return this.viberBotInstance;
  }

  private listenBotEvents(): void {
    this.watchForSubscribeEvent();
    this.watchForReceivedMessageEvent();

    this.viberBotInstance.on(Events.CONVERSATION_STARTED, (response: ViberResponse) => {
      console.error(Events.CONVERSATION_STARTED, response);
    });
  }

  private watchForSubscribeEvent(): void {
    this.viberBotInstance.on(Events.SUBSCRIBED, (response: ViberResponse) => {
      this.messageService.handleSubscribeEvent(response);
    });
  }

  private watchForReceivedMessageEvent(): void {
    this.viberBotInstance.on(Events.MESSAGE_RECEIVED, (message: TextMessage, response: ViberResponse) => {
      const userId = response.userProfile.id;
      
      const text = parseFloat(message.text);
      const userText = isNaN(text) ? message.text : text;

      if (typeof userText === 'number') {
        this.userService.submitCounterData(userId, userText);
      } else {
        this.messageService.handleTextMessage(message, response);
      }
    }); 
  }
}


const consumerService = new ConsumersService(db);
const userService = new UserService(db, consumerService);
export default new ViberEventService(ViberBotHelper.getBot(), messageService, userService);
