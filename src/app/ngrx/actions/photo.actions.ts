import { createAction, props } from '@ngrx/store';
import { IProducts } from 'src/app/products.vm';

export const getProducts = createAction('[Product] Get Product');
export const getProductsComplete = createAction(
  '[Product] Get Products Complete',
  props<{ productsList: IProducts[] }>()
);

// Cart
export const addItemInCart = createAction('[Product] Add item in cart', props<{product: IProducts}>());
export const deleteItemInCart = createAction('[product] Delete item in cart', props<{id: number}>());
export const addNoOfItemInCart = createAction('[Product] Add no of item in cart', props<{id:number}>())
export const removeNoOfItemInCart = createAction('[Product] Remove no of item in cart', props<{id:number}>())
