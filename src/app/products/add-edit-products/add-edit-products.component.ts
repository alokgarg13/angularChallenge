import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { Category, Product } from './../../model/models';
import { ProductService } from './../../service/product.service';
import { CategoryService } from './../../service/category.service';
import { DialogComponent } from './../../dialog/dialog.component';


@Component({
  selector: 'app-add-edit-products',
  templateUrl: './add-edit-products.component.html',
  styleUrls: ['./add-edit-products.component.scss']
})
export class AddEditProductsComponent implements OnInit, OnDestroy {

  isAdd = true;
  isEdit = false;
  productId: any;
  productForm: FormGroup;
  selectedProduct: Product;
  categories: Category;
  responseErrorMessage: any;
  categoryId: any = '';

  productSubscription: Subscription;
  categorySubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    public fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    public dialog: MatDialog,
    public router: Router
  ) { }

  ngOnInit(): void {

    const routeParams = this.route.snapshot.paramMap;
    this.isEdit = routeParams.get('id') ? true : false;
    this.reactiveForm();

    this.getAllCategories();

    if(this.isEdit) {
      this.productId = Number(routeParams.get('id'));
      this.isAdd = false;
      this.getProductDetails();
    }
  }

  reactiveForm() {
    this.productForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      cat_id: ['', Validators.required],
      price: ['', Validators.required],
    });
  }

  getProductDetails() {
    this.productSubscription = this.productService.getProduct(this.productId)
      .subscribe(
        (response: any) => {
          this.selectedProduct = response;
          this.productForm.patchValue(response);
          this.categoryId = response.cat_id;
        }
      );
  }

  getAllCategories() {
    this.categorySubscription = this.categoryService.getCategories().subscribe(
      (response: any) => {
        this.categories = response;
      }
    );
  }

  submitForm() {
    const productForm = this.productForm.value;
    if(this.isAdd) this.addNewProduct(productForm);
    if(this.isEdit) this.updateProduct(productForm);
  }

  productCategory(obj: any) {
    return this.isEdit ? this.selectedProduct?.id : '';
  }

  addNewProduct(productForm: Product) {

    const product = {
      cat_id: parseInt( productForm.cat_id.toString()),
      name: productForm.name,
      price: productForm.price
    }

    this.productService.addProduct(product).subscribe(
      (response: any) => {
        this.dialog.open(DialogComponent, {
          data: {
            title: 'Product Added',
            description: 'New product has been ADDED successfully in the database.',
            redirectPath: '/products'
            }
          });
      },
      (error: HttpErrorResponse) => {
        this.responseErrorMessage = error.message;
      }
    );
  }

  updateProduct(productForm: Product) {

    const product = {
      id: parseInt( productForm.id.toString()),
      cat_id: parseInt( productForm.cat_id.toString()),
      name: productForm.name,
      price: productForm.price
    }

    this.productService.editProduct(product).subscribe(
      (response: any) => {
        this.dialog.open(DialogComponent, {
          data: {
            title: 'Product Updated',
            description: 'Product details has been UPDATED successfully in the database.',
            redirectPath: '/products'
            }
        });
      },
      (error: HttpErrorResponse) => {
        this.responseErrorMessage = error.message;
      }
    );
  }

  ngOnDestroy(): void {
    if(this.productSubscription) this.productSubscription.unsubscribe();
    if(this.categorySubscription) this.categorySubscription.unsubscribe();
  }

}


