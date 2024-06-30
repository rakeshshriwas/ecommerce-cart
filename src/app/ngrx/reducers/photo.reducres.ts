import { createReducer, on } from '@ngrx/store';
import {
  getProducts,
  getProductsComplete,
  addItemInCart,
  deleteItemInCart,
  addNoOfItemInCart,
  removeNoOfItemInCart,
} from '../actions/photo.actions';
import { IProducts } from '../../products.vm';
import { IItems } from '../products.state';
import { cartItems } from '../selectors/photo.selectors';

export interface IPhotoListState {
  productsList: IProducts[];
  productsListInprogress: boolean;
  cartItems: IItems[];
  numberOfTotalItems: number;
}

export const initialState: IPhotoListState = {
  productsList: [],
  productsListInprogress: false,
  cartItems: [],
  numberOfTotalItems: 0,
};

const getTotalNoOfItems = (cartItems: IItems[]): number => {
  return cartItems.reduce(
    (partialSum, cartItem) => partialSum + cartItem.noOfItems,
    0
  );
};

export const photoReducers = createReducer(
  initialState,
  on(getProducts, (state) => {
    return {
      ...state,
      productsListInprogress: true,
    };
  }),
  on(getProductsComplete, (state, response) => {
    return {
      ...state,
      productsListInprogress: false,
      productsList: response.productsList,
    };
  }),
  on(addItemInCart, (state, { product }) => {
    const existingItem = state.cartItems.find(({ id }) => id === product.id);
    return {
      ...state,
      cartItems: state.cartItems
        .map((cardItem) =>
          cardItem.id !== product.id
            ? cardItem
            : { ...cardItem, noOfItems: cardItem.noOfItems + 1 }
        )
        .concat(
          existingItem ? [] : [{ id: product.id, noOfItems: 1, item: product }]
        ),
      numberOfTotalItems: state.numberOfTotalItems + 1,
    };
  }),
  on(deleteItemInCart, (state, { id }) => {
    const cartItems = state.cartItems.filter((obj) => obj.id !== id);
    return {
      ...state,
      cartItems,
      numberOfTotalItems: getTotalNoOfItems(cartItems),
    };
  }),
  on(addNoOfItemInCart, (state, { id }) => {
    return {
      ...state,
      cartItems: state.cartItems
        .map((cartItem) =>
          cartItem.id !== id
            ? cartItem
            : { ...cartItem, noOfItems: cartItem.noOfItems + 1 }
        )
        .filter(({ noOfItems }) => noOfItems > 0),
      numberOfTotalItems: state.numberOfTotalItems + 1,
    };
  }),
  on(removeNoOfItemInCart, (state, { id }) => {
    return {
      ...state,
      cartItems: state.cartItems
        .map((cartItem) =>
          cartItem.id !== id
            ? cartItem
            : { ...cartItem, noOfItems: cartItem.noOfItems - 1 }
        )
        .filter(({ noOfItems }) => noOfItems > 0),
      numberOfTotalItems: state.numberOfTotalItems - 1,
    };
  })
);
