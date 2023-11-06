import { Db } from 'mongodb';
import { UserRole } from '../../enums';

export interface Schema {
  addSchema(db: Promise<Db>): void;
}

export interface User {
  userId: string;
  consumerId: string;
  role: UserRole;
}

export interface Consumer {
  houseNumber: number;
  users?: User[];
  data?: DataIndicators[];
}

export interface DataIndicators {
  year: number,
  monthlyData: MonthlyData[],
}

export interface MonthlyData {
  counterData: number,
  consumedKW: number
}

export interface GeneralCounter {
  data: DataIndicators[];
  primaryPrice: number;
  actualPrice: number;
  consumedKW: number;
  submittedKW:number;
  residualBalance: number;
}
