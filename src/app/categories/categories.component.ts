import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Category } from '../model/models';
import { Router } from '@angular/router';
import { CategoryService } from './../service/category.service';
import { DialogComponent } from './../dialog/dialog.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit, OnDestroy {

  categoryList: Category[] = [];

  responseErrorMessage = "";

  getCategorySubscription: Subscription;
  deleteCategorySubscription: Subscription;


  displayedColumns: string[] = ['id', 'name', 'action'];

  constructor(
    private categoryService: CategoryService,
    public dialog: MatDialog,
    private router: Router) { }
  @ViewChild(MatTable) table: MatTable<Category>;


  ngOnInit(): void {
    this.getCategories();
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

  editCategory(category: Category) {
    this.router.navigate([`/categories/${category.id}/edit`]);
  }

  deleteCategory(catId: any) {
    this.deleteCategorySubscription = this.categoryService.deleteCategory(catId).subscribe(
      (response: any) => {
        this.dialog.open(DialogComponent, {
          data: {
            title: 'Category Deleted',
            description: 'Category has been DELETED successfully from the database.',
            redirectPath: '/categories'
            }
        });
        this.getCategories();
      }
    );
  }

  ngOnDestroy(): void {
    if(this.getCategorySubscription) this.getCategorySubscription.unsubscribe();
    if(this.deleteCategorySubscription) this.deleteCategorySubscription.unsubscribe();
  }
}
