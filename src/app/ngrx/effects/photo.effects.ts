import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { PhotoService } from "src/app/services/photo.service";
import { getProducts, getProductsComplete } from "../actions/photo.actions";
import { catchError, map, of, switchMap } from "rxjs";
import { IProducts } from "src/app/products.vm";


@Injectable()
export class PhotoEffects {
    constructor(private service: PhotoService, private actions$:Actions){

    }

    getAllPhoto$ = createEffect(() => 
        this.actions$.pipe(
            ofType(getProducts),
            switchMap((action) => {
                return this.service.getPhoto().pipe(
                    map((data: IProducts[]) => {
                        return getProductsComplete({productsList: data})
                    } ),
                    catchError((error) => of(error))
                )
            })
        )
    )
}