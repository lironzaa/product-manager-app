import { Component, OnInit, Input } from '@angular/core';
import { Product } from './../../../models/products.model';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product;
  index: string;
  constructor() { }

  ngOnInit(): void {
    this.index = `/products/${this.product.id}`;
  }
}