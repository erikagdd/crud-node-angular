import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AbstractControl, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-products-add',
  templateUrl: './products-add.component.html',
  styleUrls: ['./products-add.component.css']
})
export class ProductsAddComponent implements OnInit {
  
  update: Boolean = false;
  submitted = false;

  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    price: new FormControl(0),
    description: new FormControl('')
  })

  constructor(
    private route: ActivatedRoute, 
    private product_service: ProductService, 
    private router: Router, 
    private toastrService: ToastrService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    if(this.route.snapshot.params["slug"]) {
      this.get_product(this.route.snapshot.params["slug"]);
      this.update = true;
    }
    this.form = this.formBuilder.group(
      {
        name: ['', Validators.required],
        price: [0, Validators.required],
        description: ['', Validators.required]
      }
    )
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if(this.form.valid) {
      if(this.route.snapshot.params["slug"]) {
        this.update_product()
      } else {
        this.insert_product()
      }
    }
  }

  get_product(slug: string): void {
    this.product_service.getOne(slug).subscribe({
      next: data => {
        this.form.setValue({
          name: data.name, 
          price: data.price, 
          description: data.description
        })
      },
      error: e => {
        console.error(e);
      }
    })
  }

  insert_product(): void {
    this.product_service.insert_product(this.form.value).subscribe({
      next: data => {
        this.router.navigate(['/product'])
        this.toastrService.success("This product has been add")
      }
    })
  }

  update_product(): void {
    this.product_service.update_product(this.form.value, this.route.snapshot.params["slug"]).subscribe({
      next: data => {
        this.router.navigate(['/product'])
        this.toastrService.success("This product has been update")
      }
    })
  }
}
