import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'main-header',
  imports: [RouterLink],
  templateUrl: './main-header.html',
  styleUrl: './main-header.scss',
})
export class MainHeader {
  router = inject(Router);
  btn_txt = 'Neues Produkt';
  btnClassList = 'btn--primary';
  path = '';

  ngOnInit() {
    this.path = '';

    if (this.path === 'detail') {
      this.btn_txt = 'zurück zur Liste';
    }
  }

  // todo delet only for testing
  switchPath() {
    this.path = this.router.url;
  }
}
