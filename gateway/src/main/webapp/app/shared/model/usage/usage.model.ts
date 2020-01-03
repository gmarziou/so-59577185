import { Moment } from 'moment';

export interface IUsage {
  id?: number;
  date?: Moment;
  details?: string;
  sentDate?: Moment;
  userId?: number;
  productId?: number;
}

export const defaultValue: Readonly<IUsage> = {};
