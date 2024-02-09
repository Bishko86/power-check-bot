///<reference path = '../models/viber-bot.model.d.ts' />
import { Bot, TextMessage, ViberResponse } from 'viber-bot';

import viberBotService, { ViberBotService } from './viber-bot.service'
import db from '../../api/services/database.service';

import { UserService } from '../../api/services/user.service';
import { User } from '../../api/models';
import { UserRole } from '../../enums';
import { ConsumersService } from '../../api/services/consumers.service';
import { MenuType } from '../enums/menu-type.enum';
import { ViberBotHelper } from '../helpers/bot.helper';
import Catch from '../../utils/catch-decorator.util';
import { Response } from '../views/response.view';

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
  }
@Catch
  handleTextMessage(message: TextMessage, response: ViberResponse): void {
    const menu = (Object.values(MenuType) as string[]).includes(message.text);
    const bot = ViberBotHelper.getBot();
    const user = response.userProfile;

    const menuType = menu ? message.text as MenuType : MenuType.START_MENU;

    const responseBody = Response.getResponse(menuType)
    console.error(responseBody);
    
    bot.sendMessage(user, responseBody);
  }
}

const consumersService = new ConsumersService(db);
const userService = new UserService(db, consumersService);

export default new MessageService(viberBotService, userService, consumersService);
