import { ConfirmMenuMessage, StartMenuMessage, SubmitMenuMessage } from '../../constants';
import { ActionBody } from '../enums/action-button.enum';
import { MenuKeys } from '../enums/menu-keys.enum';
import { MenuType } from '../enums/menu-type.enum';
import { MenuConfig } from '../models/menu.model';

export const MenuButtonConfig: MenuConfig = {
  [MenuType.START_MENU]: [
    {
      body: ActionBody.MENU,
      text: MenuKeys.MAIN_MENU,
    },
    {
      body: ActionBody.INFO,
      text: MenuKeys.INFO,
    },
  ],
  [MenuType.MAIN_MENU]: [
    {
      body: ActionBody.CONFIRM,
      text: MenuKeys.SUBMIT,
    },
    {
      body: ActionBody.MENU,
      text: MenuKeys.BACK,
    },
  ],
  [MenuType.CONFIRM_MENU]: [
    {
      body: ActionBody.YES,
      text: MenuKeys.YES,
    },
    {
      body: ActionBody.NO,
      text: MenuKeys.NO,
    },
  ],
}

export const ResponseMessages = {
  [MenuType.START_MENU]: StartMenuMessage,
  [MenuType.MAIN_MENU]: SubmitMenuMessage,
  [MenuType.CONFIRM_MENU]: ConfirmMenuMessage,
}
