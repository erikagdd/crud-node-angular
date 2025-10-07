import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  products?: Product[];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.all_products();
  }

  all_products(): void {
    this.productService.getAll().subscribe({
      next: data => {
        this.productService.products =  data;
      },
      error: e => console.error(e)
    });
    this.productService.products$.subscribe({
      next: data => this.products = data,
      error: e => console.error(e)
    });
  }

}
