import { MenuType } from '../enums/menu-type.enum';
import { Button, ButtonConfig, ResponseTemplateData } from '../models/menu.model';
import { MenuButtonConfig, ResponseMessages } from './constant.view';

export class MenuTemplate {
  static getTemplate(menuType: MenuType): ResponseTemplateData {
    const config = MenuButtonConfig[menuType];
    const responseText = ResponseMessages[menuType];

    const responseTemplate = {
      responseText,
      buttonTemplate: {
        ButtonsGroupColumns: 4,
        ButtonsGroupRows: 1,
        BgColor: '#cccccc',
        Buttons: this.getButtons(config),
      }
    }

    return responseTemplate;
  }

  private static getButtons(config: ButtonConfig[]): Button[] {
    return config.map(({ body, text }) => ({
      ActionBody: body,
      ActionType: "reply",
      BgColor: "#cccccc",
      Text: text,
      TextOpacity: 60,
      Rows: 1,
      Columns: 4
    }));
  }
}
