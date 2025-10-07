import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input() value: Product | any;
  constructor(private productService: ProductService, private toastrService: ToastrService) { }

  ngOnInit(): void {}

  deleteProduct(slug: string): void {
    this.productService.delete_product(slug).subscribe({
      next: data => {
        this.toastrService.success("This product has been delete")
        this.productService.products = this.productService.products.filter(p => p.slug !== this.value.slug);
      }
    })
  }
}
