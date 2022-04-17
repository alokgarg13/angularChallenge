import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Category, Product } from '../model/models';
import { ProductService } from '../service/product.service';
import { Router } from '@angular/router';
import { CategoryService } from './../service/category.service';
import { DialogComponent } from './../dialog/dialog.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {

  productsList: Product[] = [];
  categories: Category[] = [];

  responseErrorMessage = "";

  getAllProductSubscription: Subscription;
  deleteProductSubscription: Subscription;
  getCategorySubscription: Subscription;

  displayedColumns: string[] = ['id', 'name', 'cat_id', 'price', 'action'];

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    public dialog: MatDialog,
    private router: Router) { }
  @ViewChild(MatTable) table: MatTable<Product>;


  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }

  getProducts() {
    this.getAllProductSubscription = this.productService.getAllProducts().subscribe(
      (response: any) => {
        this.productsList = response;
        console.log(this.productsList);
      },
      (error: HttpErrorResponse) => {
        this.responseErrorMessage = error.message;
      }
    )
  }

  getCategories() {
    this.getCategorySubscription = this.categoryService.getCategories().subscribe(
      (response: any) => {
        this.categories = response;
      }
    ),
    (error: HttpErrorResponse) => {
      this.responseErrorMessage = error.message;
    }
  }

  getCategoryName(cat_id: Number) {
    const category = this.categories.find((categ)=> {
      if(categ.id === cat_id) return categ;
    });
    return (category && category.name) ? category.name : '';
  }

  editProduct(product: Product) {
    this.router.navigate([`/products/${product.id}/edit`]);
  }

  deleteProduct(productId: any) {
    this.deleteProductSubscription = this.productService.deleteProduct(productId).subscribe(
      (response: any) => {
        this.dialog.open(DialogComponent, {
          data: {
            title: 'Product Deleted',
            description: 'Product has been DELETED successfully from the database.',
            redirectPath: '/products'
            }
        });
        this.getProducts();
      }
    );
  }

  ngOnDestroy(): void {
    if(this.getAllProductSubscription) this.getAllProductSubscription.unsubscribe();
    if(this.deleteProductSubscription) this.deleteProductSubscription.unsubscribe();
    if(this.getCategorySubscription) this.getCategorySubscription.unsubscribe();
  }
}
