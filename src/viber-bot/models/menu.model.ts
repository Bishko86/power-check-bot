import { ActionBody } from '../enums/action-button.enum';
import { MenuKeys } from '../enums/menu-keys.enum';
import { MenuType } from '../enums/menu-type.enum';

export interface Button {
  ActionBody: string;
  ActionType: string;
  BgColor: string;
  Text: string;
  TextOpacity: number;
  Rows: number;
  Columns: number;
}

export interface MenuTemplateType {
  ButtonsGroupColumns: number;
  ButtonsGroupRows: number;
  BgColor: string;
  Buttons: Button[];
}

export type MenuConfig = Record<MenuType, ButtonConfig[]>;

export interface ButtonConfig {
  body: ActionBody,
  text: MenuKeys,
}

export interface ResponseTemplateData {
  responseText: string;
  buttonTemplate: MenuTemplateType
}
