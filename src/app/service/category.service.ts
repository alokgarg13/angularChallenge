import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Category } from '../model/models';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient) { }

  getCategories(): Observable<Category[]> {
    const url = environment.apiBaseUrl+'/categories';
    return this.httpClient.get<Category[]>(url);
  }

  getCategory(cat_id: any): Observable<Category> {
    const url = `${environment.apiBaseUrl}/categories/${cat_id}`;
    return this.httpClient.get<Category>(url);
  }

  addCategory(product: Category): Observable<Category> {
    const url = environment.apiBaseUrl+'/categories';
    return this.httpClient.post<Category>(url, product);
  }

  editCategory(product: Category): Observable<Category> {
    const url = `${environment.apiBaseUrl}/categories/${product.id}`;
    return this.httpClient.put<Category>(url, product);
  }

  deleteCategory(id: any): Observable<Category> {
    const url = `${environment.apiBaseUrl}/categories/${id}`;
    return this.httpClient.delete<Category>(url);
  }

}
