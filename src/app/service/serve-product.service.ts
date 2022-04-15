import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../model/product';
import { environment } from './../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ServeProductService {

  constructor(private httpClient: HttpClient) {

  }

  getProduct(): Observable<Product> {
    const url = environment.apiBaseUrl+'/products2';
    return this.httpClient.get<Product>(url);
  }

  // getAll(suspendReasonCodesObj: any): Observable<any> {
  //   return this.httpClient.get<SuspendReasonCodesModel>(
  //     environment.apiBaseUrl +
  //       this.utilityService.resolveUrlParameter(
  //         API_ENDPOINT.SUSPEND_REASON_CODES_ALL,
  //         suspendReasonCodesObj
  //       ),
  //     httpOptions
  //   );
  // }
}
