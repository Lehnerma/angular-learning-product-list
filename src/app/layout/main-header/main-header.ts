import { Component } from '@angular/core';

@Component({
  selector: 'main-header',
  imports: [],
  templateUrl: './main-header.html',
  styleUrl: './main-header.scss',
})
export class MainHeader {
  btn_txt = 'Neues Produkt';
  btnClassList = 'btn--primary';
  path = '';

  ngOnInit() {
    this.path = 'detail';

    if (this.path === 'detail') {
      this.btn_txt = 'zurück zur Liste';
    }
  }
}
