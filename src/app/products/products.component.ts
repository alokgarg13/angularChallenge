import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Product } from '../model/models';
import { ProductService } from '../service/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { CategoryService } from './../service/category.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  productsList: Product[] = [];
  responseErrorMessage = "";

  displayedColumns: string[] = ['id', 'name', 'cat_id', 'price', 'action'];

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router) { }
  @ViewChild(MatTable) table: MatTable<Product>;


  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getAllProducts().subscribe(
      (response: any) => {
        this.productsList = response;
      },
      (error: HttpErrorResponse) => {
        this.responseErrorMessage = error.message;
      }
    )
  }

  editProduct(product: Product) {
    this.router.navigate([`/products/${product.id}/edit`]);
  }

  deleteProduct(productId: any) {
    this.productService.deleteProduct(productId).subscribe(
      (response: any) => {
        console.log('Product Deleted');
        this.getProducts();
      }
    );
  }

  getCategoryName(cat_id: Number) {
    this.categoryService.getCategory(cat_id).subscribe(
      (response: any) => {
        console.log(response.name);
      }
    );
  }

}
