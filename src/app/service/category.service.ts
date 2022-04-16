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
}
