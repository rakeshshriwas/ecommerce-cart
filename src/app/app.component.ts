import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IItems, ProductState } from './ngrx/products.state';
import { Observable } from 'rxjs';
import { IProducts } from './products.vm';
import {
  cartItems,
  cartTotalPrice,
  isProductsLoading,
  noOfItemsInCartCount,
  productsList,
} from './ngrx/selectors/photo.selectors';
import {
  getProducts,
  addItemInCart,
  deleteItemInCart,
  addNoOfItemInCart,
  removeNoOfItemInCart,
} from './ngrx/actions/photo.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'product-store';

  public productsList$: Observable<IProducts[]>;
  public isProductListLoading$: Observable<boolean>;
  public cartCount$: Observable<number>;
  public cartItemsList$: Observable<IItems[]>;
  public totalPrice$: Observable<number>;

  constructor(private store: Store<ProductState>) {
    this.productsList$ = this.store.pipe(select(productsList));
    this.isProductListLoading$ = this.store.pipe(select(isProductsLoading));
    this.cartCount$ = this.store.pipe(select(noOfItemsInCartCount));
    this.cartItemsList$ = this.store.pipe(select(cartItems));
    this.totalPrice$ = this.store.pipe(select(cartTotalPrice));
  }
  ngOnInit(): void {
    this.store.dispatch(getProducts());
  }

  public addItemInCart(product: IProducts) {
    this.store.dispatch(addItemInCart({ product }));
  }

  public action(actionType: string, item: IItems) {
    if (actionType === 'add') {
      this.store.dispatch(addNoOfItemInCart({ id: item.id }));
    } else if (actionType === 'remove') {
      this.store.dispatch(removeNoOfItemInCart({ id: item.id }));
    } else if (actionType === 'delete') {
      this.store.dispatch(deleteItemInCart({ id: item.id }));
    }
  }
}
