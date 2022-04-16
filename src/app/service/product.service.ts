import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../model/models';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) {

  }

  getAllProducts(): Observable<Product[]> {
    const url = environment.apiBaseUrl+'/products';
    return this.httpClient.get<Product[]>(url);
  }

  getProduct(id: any): Observable<Product[]> {
    const url = `${environment.apiBaseUrl}/products/${id}`;
    return this.httpClient.get<Product[]>(url);
  }

  addProduct(product: Product): Observable<Product> {
    const url = environment.apiBaseUrl+'/products';
    console.log('product obj to add new: ', product);
    return this.httpClient.post<Product>(url, product);
  }

  editProduct(product: Product): Observable<Product> {
    const url = `${environment.apiBaseUrl}/products/${product.id}`;
    return this.httpClient.put<Product>(url, product);
  }


  deleteProduct(id: any): Observable<Product> {
    const url = `${environment.apiBaseUrl}/products/${id}`;
    return this.httpClient.delete<Product>(url);
  }
}
