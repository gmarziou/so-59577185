import { OrderItemStatus } from 'app/shared/model/enumerations/order-item-status.model';

export interface IOrderItem {
  id?: number;
  quantity?: number;
  totalPrice?: number;
  status?: OrderItemStatus;
  productName?: string;
  productId?: number;
  orderCode?: string;
  orderId?: number;
}

export const defaultValue: Readonly<IOrderItem> = {};
