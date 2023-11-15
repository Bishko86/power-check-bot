import { Db } from 'mongodb';
import { UserRole } from '../../enums';

export interface Schema {
  addSchema(): Promise<void>;
}

export interface User {
  userId: string;
  name: string;
  consumerId: string;
  role: UserRole;
}

export interface Consumer {
  houseNumber: number;
  hasNightTariff: boolean;
  users?: User[];
  data?: DataIndicators[];
}

export interface DataIndicators {
  year: number,
  monthlyData: MonthlyData[],
}

export interface MonthlyData {
  dayData: number;
  nightData: number,
}

export interface GeneralCounter {
  data: DataIndicators[];
  dayPrice: number;
  nightPrice: number;
  actualDayPrice: number;
  actualNightPrice: number;
  consumedDayKW: number;
  consumedNightKW: number;
}
