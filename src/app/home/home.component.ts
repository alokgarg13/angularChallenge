import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from './../service/product.service';
import { CategoryService } from './../service/category.service';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Product, Category} from './../model/models';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy{

  getAllProductSubscription: Subscription;
  getCategorySubscription: Subscription;
  responseErrorMessage = "";
  productsList: Product[] = [];
  categoryList: Category[] = [];

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService) {
    }

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }

 getProducts() {
    this.getAllProductSubscription = this.productService.getAllProducts().subscribe(
      (response: any) => {
        this.productsList = response;
        console.log('prouct on home page ', this.productsList);
      },
      (error: HttpErrorResponse) => {
        this.responseErrorMessage = error.message;
      }
    )
  }

  getCategories() {
    this.getCategorySubscription = this.categoryService.getCategories().subscribe(
      (response: any) => {
        this.categoryList = response;
        console.log(this.categoryList);
      },
      (error: HttpErrorResponse) => {
        this.responseErrorMessage = error.message;
      }
    )
  }

  ngOnDestroy(): void {
    if(this.getAllProductSubscription) this.getAllProductSubscription.unsubscribe();
    if(this.getCategorySubscription) this.getCategorySubscription.unsubscribe();
  }

}
