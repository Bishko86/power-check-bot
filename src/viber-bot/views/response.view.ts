import { Message } from 'viber-bot';

import { MenuType } from '../enums/menu-type.enum';
import { MenuTemplate } from './menu.view';


export class Response {
  static getResponse(menuType: MenuType) {
    return Response.createTemplate(menuType);
  }
  
  private static createTemplate(menuType: MenuType): (Message.Text | Message.RichMedia)[] {
    const { responseText, buttonTemplate } = MenuTemplate.getTemplate(menuType);
  
    return [new Message.Text(responseText), new Message.RichMedia(buttonTemplate)];
  }
}
