
import { Message, ViberResponse } from 'viber-bot';

import { SAMPLE_RICH_MEDIA, SAMPLE_RICH_MEDIA_2 } from '../constants';

export class ViberBotService {
  initialMenuTemplate(response: ViberResponse): void {
    try {
      const menuTemplate = new Message.RichMedia(SAMPLE_RICH_MEDIA_2);
      response.send(menuTemplate);
    } catch(err) {
      //TODO provide error handler
      console.error(err);
    }
  }

  secondaryMenuTemplate(response: ViberResponse): void {
    try {
      const menuTemplate = new Message.RichMedia(SAMPLE_RICH_MEDIA);
      response.send(menuTemplate);
    } catch(err) {
      //TODO provide error handler
      console.error(err);
    }
  }
}

export default new ViberBotService();
