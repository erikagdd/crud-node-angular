import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductsAddComponent } from './components/products-add/products-add.component';

const routes: Routes = [
    { path: '', component: ProductsListComponent},
    { path: 'add', component: ProductsAddComponent},
    { path: 'update/:slug', component: ProductsAddComponent},
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductsRoutingModule { }