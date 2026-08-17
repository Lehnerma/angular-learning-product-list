import { Routes } from '@angular/router';
import { ProductList } from './shared/components/product-list/product-list';
import { ProductDetail } from './shared/components/product-detail/product-detail';
import { Page404 } from './shared/components/page404/page404';
import { ProductForm } from './shared/components/product-form/product-form';

export const routes: Routes = [
  {
    path: '',
    component: ProductList,
  },
  {
    path: 'detail/:name',
    component: ProductDetail,
  },
  {
    path: 'productform',
    component: ProductForm,
  },
  { path: 'detail/:product-name/productform',
    component: ProductForm,
   },
  {
    path: '404-page-not-found',
    component: Page404,
  },

  { path: '**', redirectTo: '/404-page-not-found' },
];
