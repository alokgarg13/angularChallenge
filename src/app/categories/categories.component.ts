import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Category } from '../model/models';
import { CategoryService } from '../service/category.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categoryList: Category[] = [];
  responseErrorMessage = "";

  displayedColumns: string[] = ['id', 'name', 'action'];

  constructor(private categoryService: CategoryService) { }
  @ViewChild(MatTable) table: MatTable<Category>;


  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.categoryService.getCategories().subscribe(
      (response: any) => {
        this.categoryList = response;
        console.log(this.categoryList);
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

  editCategory(product: Category) {
    console.log(product);
  }

  deleteCategory(product: Category) {

  }

}
