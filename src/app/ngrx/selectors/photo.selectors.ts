import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IItems, ProductState } from "../products.state";

export const productState = createFeatureSelector<ProductState>('products');

export const isProductsLoading = createSelector(productState, (state: ProductState) => state.productsListInprogress);
export const productsList = createSelector(productState, (state: ProductState) => state.productsList);


export const noOfItemsInCartCount = createSelector(productState, (state: ProductState) => state.numberOfTotalItems);
export const cartItems = createSelector(productState, (state:ProductState) => state.cartItems);
export const cartTotalPrice = createSelector(productState,(state) => {
    return state.cartItems.reduce((acc, cartItem: IItems) => {
        return acc + (cartItem.noOfItems * cartItem.item.price)
    },0)
})