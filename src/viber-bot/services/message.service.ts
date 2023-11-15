///<reference path = '../models/viber-bot.model.d.ts' />
import { Bot, TextMessage, ViberResponse } from 'viber-bot';

import viberBotService, { ViberBotService } from './viber-bot.service'
import db from '../../api/services/database.service';

import { GreetRegex, OpenMenuRegex } from '../constants';
import { UserService } from '../../api/services/user.service';
import { User } from '../../api/models';
import { UserRole } from '../../enums';
import { ConsumersService } from '../../api/services/consumers.service';

export class MessageService {
  constructor(
    private viberBotService: ViberBotService,
    private userService: UserService,
    private consumersService: ConsumersService
    ) {}

  handleSubscribeEvent(response: ViberResponse): void {
    //TODO provide subscribe event handler
  }

  handleMessageEvent(message: TextMessage, response: ViberResponse, bot: Bot): void {
    //TODO remove, provide correct logic
    if (message.text === '1') {
      const user: User = {
        userId: response.userProfile.id,
        name: response.userProfile.name,
        consumerId: '6546bb2e82acce3136cda520',
        role: UserRole.SUPER_ADMIN,
      }
      
      this.userService.saveUser(user);
    }

    if (message.text === 'Q') {
      this.consumersService.getConsumerById();
    }
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
const userService = new UserService(db);
const consumersService = new ConsumersService(db);
export default new MessageService(viberBotService, userService, consumersService);
