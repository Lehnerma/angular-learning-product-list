import { Service, signal } from '@angular/core';
import { Product } from '../interfaces/product';
import { CurrencyPipe } from '@angular/common';
@Service()
export class Products {
  
  productList = signal<Product[]>([]);

  constructor() {
    this.productList.set([
      {
        name: 'Gaming Maus',
        description:
          'Eine ergonomische Gaming-Maus mit hoher Präzision und einstellbarer DPI. Ideal für FPS- und MOBA-Spiele, bietet sie eine langlebige Bauweise und komfortable Seitentasten für schnelles Reagieren.',
        specs: 'dpi: 6400, cable length: 1.8m, color: Schwarz',
        stock: 120,
        price: 250000,
      },
      {
        name: 'Mechanische Gaming Tastatur',
        description:
          'Eine reaktions schnelle Tastatur mit RGB-Beleuchtung und mechanischen Switches für ein optimales Tipp- und Gaming-Gefühl.',
        specs: 'switches: Red, layout: DE, backlighting: RGB',
        stock: 85,
        price: 34990,
      },
      {
        name: 'Wireless Gaming Headset',
        description:
          'Kabelloses Over-Ear-Headset mit sattem Surround-Sound, integriertem Mikrofon und hoher Akkulaufzeit für lange Sessions.',
        specs: 'driver: 50mm, battery: 30h, connection: 2.4GHz Wireless',
        stock: 45,
        price: 49.99,
      },
      {
        name: 'Ergonomisches Mauspad XL',
        description:
          'Extragroße und rutschfeste Unterlage für flüssige Mausbewegungen und stabilen Halt der Tastatur.',
        specs: 'dimensions: 900x400mm, thickness: 3mm, surface: Speed',
        stock: 210,
        price: 99.01,
      },
      {
        name: 'Streaming USB Mikrofon',
        description:
          'Kondensatormikrofon mit Studioqualität für Podcasts, Streams und klare Sprachübertragung im Team-Chat.',
        specs: 'polar pattern: Cardioid, connection: USB-C, sample rate: 96kHz',
        stock: 30,
        price: 39.99,
      },
      {
        name: 'In-Ear Gaming Kopfhörer',
        description:
          'Kompakte In-Ear-Monitore mit starkem Bass und abnehmbarem Mikrofonarm für unterwegs.',
        specs: 'driver: 10mm, connector: 3.5mm Jack, weight: 20g',
        stock: 95,
        price: 15.0,
      },
      {
        name: 'Vertikale Office Maus',
        description:
          'Ergonomische Maus zur Entlastung des Handgelenks bei langen Arbeitstagen und gelegentlichen Casual Games.',
        specs: 'dpi: 1600, sensor: Optical, connectivity: Bluetooth',
        stock: 60,
        price: 18.0,
      },
      {
        name: 'RGB Maus-Bungee',
        description:
          'Hält das Mauskabel auf Spannung für ein kabelloses Gefühl mit integrierter Akzentbeleuchtung.',
        specs: 'ports: 2x USB 2.0, power: USB-powered, color: Mattschwarz',
        stock: 150,
        price: 129.9,
      },
      {
        name: 'Gaming Controller Wireless',
        description:
          'Vielseitiger Gamepad-Controller mit präzisen Analog-Sticks und programmierbaren Rücktasten.',
        specs: 'compatibility: PC/Console, battery: 15h, rumble: Dual-Motor',
        stock: 75,
        price: 29.99,
      },
      {
        name: 'Monitor Lichtleiste',
        description:
          'Bildschirm-Lampe zur augenschonenden Schreibtischbeleuchtung ohne störende Reflexionen auf dem Display.',
        specs: 'control: Touch/Remote, temperature: 2700K-6500K, power: USB',
        stock: 110,
        price: 21.99,
      },
    ]);
  }

  productDetail = signal<Product>({
    name: 'n/a',
    description: 'n/a',
    specs: 'n/a',
    stock: 0,
    price: 0,
  });

  addProduct(product: Product){
    this.productList.update(list => [...list, product])
  }

  setProductDetailByName(name: string) {
    let tmpProduct = this.productList().find((product) => product.name == name);
    if (tmpProduct) this.productDetail.set(tmpProduct);
  }
}
