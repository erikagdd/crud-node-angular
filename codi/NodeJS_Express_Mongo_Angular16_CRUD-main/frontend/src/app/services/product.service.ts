import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product.model';

const URL = 'http://localhost:8080/api/products';


@Injectable({
  providedIn: 'root',
})
export class ProductService {

  private productsList = new BehaviorSubject<Product[]>([]);
  readonly products$ = this.productsList.asObservable();

  constructor(private http: HttpClient) { }

  get products(): Product[] {
    return this.productsList.getValue();
  }

  set products(data: Product[]) {
    this.productsList.next(data);
  }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(URL);
  }

  getOne(slug: string): Observable<Product> {
    return this.http.get<Product>(`${URL}/${slug}`);
  }

  insert_product(product: Product): Observable<Product[]> {
    return this.http.post<Product[]>(URL, product)
  }

  update_product(product: Product, slug: string): Observable<Product[]> {
    return this.http.put<Product[]>(`${URL}/${slug}`, product);
  }

  delete_product(slug: string): Observable<Product[]> {
    return this.http.delete<Product[]>(`${URL}/${slug}`);
  }
}
