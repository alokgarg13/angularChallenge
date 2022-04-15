import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Product } from '../model/product';
import { ServeProductService } from '../service/serve-product.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  productsList: Product[] = [];
  responseErrorMessage = "";

  displayedColumns: string[] = ['id', 'name', 'cat_id', 'price', 'action'];

  constructor(private httpService: ServeProductService) { }
  @ViewChild(MatTable) table: MatTable<Product>;


  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.httpService.getProduct().subscribe(
      (response: any) => {
        this.productsList = response;
        console.log(this.productsList);
      },
      (error: HttpErrorResponse) => {
        this.responseErrorMessage = error.message;
        console.log(this.responseErrorMessage);
        console.log(error);
      }
    )
  }

  addProduct() {
    // const randomElementIndex = Math.floor(Math.random() * PRODUCTS_DATA.length);
    // this.dataSource.push(PRODUCTS_DATA[randomElementIndex]);
    // this.table.renderRows();
  }

  removeData() {
    // this.dataSource.pop();
    // this.table.renderRows();
  }

  editProduct(product: Product) {
    console.log(product);
  }

  deleteProduct(product: Product) {

  }

}
