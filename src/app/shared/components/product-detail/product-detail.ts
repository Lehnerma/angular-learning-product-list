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

  detail = this.productService.productDetail;

  ngOnInit() {
    let currentName = this.route.snapshot.paramMap.get('name');
    if (currentName) this.productService.setProductDetailByName(currentName);
  }

  deletDetail() {
    this.detail.update(product => ({...product , description: ''}))
  }
}
