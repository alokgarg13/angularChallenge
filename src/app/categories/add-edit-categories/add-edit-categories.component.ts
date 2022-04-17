import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { Category } from '../../model/models';
import { CategoryService } from '../../service/category.service';
import { DialogComponent } from '../../dialog/dialog.component';


@Component({
  selector: 'app-add-edit-categories',
  templateUrl: './add-edit-categories.component.html',
  styleUrls: ['./add-edit-categories.component.scss']
})
export class AddEditCategoriesComponent implements OnInit, OnDestroy {

  isAdd = true;
  isEdit = false;
  categoryId: any;
  categoryForm: FormGroup;
  selectedCategory: Category;
  categories: Category;
  responseErrorMessage: any;

  categorySubscription: Subscription;
  addCategorySubscription: Subscription;
  updateCategorySubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    public fb: FormBuilder,
    private categoryService: CategoryService,
    public dialog: MatDialog,
    public router: Router
  ) { }

  ngOnInit(): void {

    const routeParams = this.route.snapshot.paramMap;
    this.isEdit = routeParams.get('id') ? true : false;
    this.reactiveForm();

    if(this.isEdit) {
      this.categoryId = Number(routeParams.get('id'));
      this.isAdd = false;
      this.getCategory();
    }
  }

  reactiveForm() {
    this.categoryForm = this.fb.group({
      id: [''],
      name: ['', Validators.required]
    });
  }

  getCategory() {
    this.categorySubscription = this.categoryService.getCategory(this.categoryId)
      .subscribe(
        (response: any) => {
          this.categoryForm.patchValue(response);
        }
      );
  }

  submitForm() {
    const categoryForm = this.categoryForm.value;
    if(this.isAdd) this.addNewCategory(categoryForm);
    if(this.isEdit) this.updateProduct(categoryForm);
  }

  addNewCategory(categoryForm: Category) {

    const product = {
      name: categoryForm.name,
    }

    this.addCategorySubscription = this.categoryService.addCategory(product).subscribe(
      (response: any) => {
        this.dialog.open(DialogComponent, {
          data: {
            title: 'Category Added',
            description: 'New category has been ADDED successfully in the database.',
            redirectPath: '/categories'
            }
          });
      },
      (error: HttpErrorResponse) => {
        this.responseErrorMessage = error.message;
      }
    );
  }

  updateProduct(categoryForm: Category) {

    const category = {
      id: parseInt( categoryForm.id.toString()),
      name: categoryForm.name,
    }

    this.updateCategorySubscription = this.categoryService.editCategory(category).subscribe(
      (response: any) => {
        this.dialog.open(DialogComponent, {
          data: {
            title: 'Category Updated',
            description: 'Category details has been UPDATED successfully in the database.',
            redirectPath: '/categories'
            }
        });
      },
      (error: HttpErrorResponse) => {
        this.responseErrorMessage = error.message;
      }
    );
  }

  ngOnDestroy(): void {
    if(this.categorySubscription) this.categorySubscription.unsubscribe();
    if(this.addCategorySubscription) this.addCategorySubscription.unsubscribe();
    if(this.updateCategorySubscription) this.updateCategorySubscription.unsubscribe();
  }

}


