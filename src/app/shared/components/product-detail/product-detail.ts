import { Component, inject } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, RouterLink } from '@angular/router';
import { Products } from '../../services/products';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss',
})

export class ProductDetail {
  private route = inject(ActivatedRoute);
  productService = inject(Products);

  detail = this.productService.productDetail;


  ngOnInit() {
    let currentId = Number(this.route.snapshot.paramMap.get('id'));
    if (currentId) this.productService.setProductDetailById(currentId);
  }

  deletDetail() {
    this.detail.update(product => ({...product , description: ''}))
  }
}
