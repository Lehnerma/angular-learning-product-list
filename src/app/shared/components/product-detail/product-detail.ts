import { Component, inject } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Products } from '../../services/products';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  imports: [CurrencyPipe],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss',
})
export class ProductDetail {
  private route = inject(ActivatedRoute);
  productService = inject(Products);

  detail = {
    name: 'n/a',
    description: 'n/a',
    specs: 'n/a',
    stock: 0,
    price: 0,
  };

  ngOnInit() {
    let currentName = this.route.snapshot.paramMap.get('name');
    if (currentName) this.productService.setProductDetailByName(currentName);
    this.detail = this.productService.productDetail;
  }

  deletDetail() {
    this.detail.name = '';
  }
}
