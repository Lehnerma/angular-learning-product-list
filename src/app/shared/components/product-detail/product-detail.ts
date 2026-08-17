import { Component, inject } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, RouterLink } from '@angular/router';
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
  router = inject(Router);
  productService = inject(Products);
  detail = this.productService.productDetail; // unser detail als signal. 

  ngOnInit() {
   const currentId = Number(this.route.snapshot.paramMap.get('id'));
    if (currentId) this.productService.setProductDetailById(currentId);
  }

  async deletDetail() {
    this.productService.deleteProduct(this.detail().id)

    this.router.navigate(['']);
  }
}
