import { Size } from 'app/shared/model/enumerations/size.model';

export interface IProduct {
  id?: number;
  name?: string;
  description?: string;
  price?: number;
  size?: Size;
  imageContentType?: string;
  image?: any;
  productCategoryName?: string;
  productCategoryId?: number;
}

export const defaultValue: Readonly<IProduct> = {};
