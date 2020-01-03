import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from './locale';
import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from './user-management';
// prettier-ignore
import product, {
  ProductState
} from 'app/entities/order/product/product.reducer';
// prettier-ignore
import productCategory, {
  ProductCategoryState
} from 'app/entities/order/product-category/product-category.reducer';
// prettier-ignore
import customer, {
  CustomerState
} from 'app/entities/customer/customer.reducer';
// prettier-ignore
import productOrder, {
  ProductOrderState
} from 'app/entities/order/product-order/product-order.reducer';
// prettier-ignore
import orderItem, {
  OrderItemState
} from 'app/entities/order/order-item/order-item.reducer';
// prettier-ignore
import invoice, {
  InvoiceState
} from 'app/entities/invoice/invoice/invoice.reducer';
// prettier-ignore
import usage, {
  UsageState
} from 'app/entities/usage/usage/usage.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly locale: LocaleState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly product: ProductState;
  readonly productCategory: ProductCategoryState;
  readonly customer: CustomerState;
  readonly productOrder: ProductOrderState;
  readonly orderItem: OrderItemState;
  readonly invoice: InvoiceState;
  readonly usage: UsageState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  product,
  productCategory,
  customer,
  productOrder,
  orderItem,
  invoice,
  usage,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar
});

export default rootReducer;
