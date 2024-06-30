import { IProducts } from '../products.vm';

export interface ProductState {
  productsList: IProducts[];
  productsListInprogress: boolean;
  cartItems: IItems[];
  numberOfTotalItems: 0;
}

export interface IItems {
  id: number;
  noOfItems: number;
  item: IProducts;
}
