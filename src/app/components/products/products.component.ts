import { Component, OnInit } from '@angular/core';
import { ProductsService } from './../../services/products.service';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/products.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  private subscription: Subscription;
  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.productsService.getProducts();
    this.subscription = this.productsService.getProductUpdateListener()
      .subscribe((productsData: { products: Product[] }) => {
        this.products = productsData.products;
        console.log(this.products);
      });
  }

}