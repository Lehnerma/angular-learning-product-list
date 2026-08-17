import { Service, signal } from '@angular/core';
import { Product } from '../interfaces/product';
import { CurrencyPipe } from '@angular/common';
import { createClient } from '@supabase/supabase-js';
import { ProductModel } from '../models/productmodel';
@Service()
export class Products {
  supabaseUrl = 'https://umsjfkbiddxtfqmdzvjd.supabase.co';
  supabaseAPI = 'sb_publishable_zW1fVNM7kAoJUf7_lbIkWQ_H1dpwtV0';
  supabase = createClient(this.supabaseUrl, this.supabaseAPI);
  productListInsertChannel;
  productListDeleteChannel;
  productList = signal<Product[]>([]);

  constructor() {
    this.getAllProduct();
    this.productListInsertChannel = this.supabase
      .channel('custom-insert-channel')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'products' },
        (payload) => {
          let tempProduct = new ProductModel(payload.new);
          this.productList.update((list) => [...list, tempProduct]);
        },
      )
      .subscribe();

    this.productListDeleteChannel = this.supabase
      .channel('custom-delete-channel')
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'products' },
        (payload) => {
          const tmpId = payload.old['id']; 
          this.productList.update((list) => list.filter(product => product.id != tmpId))
        },
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.supabase.removeChannel(this.productListInsertChannel); // wir mussen den channel auch wieder unsubscriben weil wir drehen ja ab.
    this.supabase.removeChannel(this.productListDeleteChannel);
  }

  productDetail = signal<Product>({
    id: 0,
    name: 'n/a',
    description: 'n/a',
    specs: 'n/a',
    stock: 0,
    price: 0,
  });

  async deleteProduct(id: number) {
    const response = await this.supabase
      .from('products') //
      .delete()
      .eq('id', id);
  }

  setProductDetailByName(name: string) {
    let tmpProduct = this.productList().find((product) => product.name == name);
    if (tmpProduct) this.productDetail.set(tmpProduct);
  }

  setProductDetailById(id: number) {
    let tmpProduct = this.productList().find((product) => product.id == id);
    if (tmpProduct) this.productDetail.set(tmpProduct);
  }

  async getAllProduct() {
    let response = await this.supabase
      .from('products') //
      .select('*');
    this.productList.set((response.data ?? []) as Product[]);
  }

  async addProduct(product: ProductModel) {
    const product_data = product.getCleanAddJson(); // mit dem model erstellen wir die vorlage ohne id weil die wird von supabase selbst gesetzt
    const { data, error } = await this.supabase
      .from('products')
      .insert([product_data]) // hier insert wir es - wir laden es hoch und die vom modal angelegten keys passen perfect und werden so ubernommen vom supabase
      .select();
  }

  updateProduct(originalName: string, updatedProduct: Product) {
    this.productList.update((list) =>
      list.map((product) => (product.name === originalName ? updatedProduct : product)),
    );
  }
}
