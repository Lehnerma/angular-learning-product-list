import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Products } from '../../services/products';
import { Product } from '../../interfaces/product';
import { ProductModel } from '../../models/productmodel';

@Component({
  selector: 'app-product-form',
  imports: [ReactiveFormsModule],
  templateUrl: './product-form.html',
  styleUrl: './product-form.scss',
})
export class ProductForm {
  router = inject(Router);
  productService = inject(Products);
  private route = inject(ActivatedRoute);
  product: Product | undefined;

  ngOnInit() {
    this.getCurrentProduct();
    this.insertForm();
  }

  productForm = new FormGroup({
    name: new FormControl('n/a', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),

    description: new FormControl('n/a', { nonNullable: true }),
    stock: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(0)],
    }),
    
    price: new FormControl(0.0, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(0)],
    }),
  });

  getCurrentProduct() {
    const currentName = this.route.snapshot.paramMap.get('product-name');
    this.product = this.productService
      .productList()
      .find((product) => product.name === currentName);
  }

  insertForm() {
    if (!this.product) return;
    this.productForm.patchValue({
      name: this.product?.name,
      description: this.product?.description,
      stock: this.product?.stock,
      price: this.product?.price,
    });
  }

  onSubmit() {
    if (this.productForm.valid) {

      let product = new ProductModel(this.productForm.value);

      if (this.product) {
        this.productService.updateProduct(this.product.name, product);
      } else {
        this.productService.addProduct(product);
      }
      this.router.navigate(['']);
    }
  }
}
