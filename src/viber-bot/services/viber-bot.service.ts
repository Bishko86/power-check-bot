///<reference path = '../models/viber-bot.model.d.ts' />
import { Message, ViberResponse } from 'viber-bot';

import { SAMPLE_RICH_MEDIA } from '../constants';
import { ViberBotHelper } from '../helpers/bot.helper';
import Catch from '../../utils/catch-decorator.util';

export class ViberBotService {
  @Catch
  sendMenuTemplate(response: ViberResponse): void {
    const user = response.userProfile;
    const bot = ViberBotHelper.getBot();
    bot.sendMessage(user, [
      new Message.Text("Here's the product you've requested:"),
    ]);
  }

  @Catch
  secondaryMenuTemplate(response: ViberResponse): void {
    const menuTemplate = new Message.RichMedia(SAMPLE_RICH_MEDIA);
    response.send(menuTemplate);
  }
}

export default new ViberBotService();
