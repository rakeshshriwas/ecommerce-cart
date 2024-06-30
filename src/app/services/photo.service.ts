import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProducts } from '../products.vm';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  constructor(private http: HttpClient) {}

  public getPhoto(): Observable<IProducts[]> {
    return this.http.get<IProducts[]>('https://fakestoreapiserver.reactbd.com/amazonproducts');
  }
}
