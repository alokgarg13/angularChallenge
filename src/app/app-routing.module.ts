import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditCategoriesComponent } from './categories/add-edit-categories/add-edit-categories.component';
import { CategoriesComponent } from './categories/categories.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AddEditProductsComponent } from './products/add-edit-products/add-edit-products.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'products/new', component: AddEditProductsComponent },
  { path: 'products/:id/edit', component: AddEditProductsComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'categories/new', component: AddEditCategoriesComponent },
  { path: 'categories/:id/edit', component: AddEditCategoriesComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
