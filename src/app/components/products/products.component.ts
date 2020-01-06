import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from './../../services/products.service';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/products.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  private subscription: Subscription;
  showProductDetail: boolean = false;
  constructor(private productsService: ProductsService,
    private router: Router) { }

  ngOnInit(): void {
    this.productsService.getProducts();
    this.subscription = this.productsService.getProductUpdateListener()
      .subscribe((productsData: { products: Product[] }) => {
        this.products = productsData.products;
      });
    this.subscription = this.productsService.showProductDetail.subscribe(
      (showProductDetail: boolean) => {
        this.showProductDetail = showProductDetail;
      }
    )
  }

  selectProductItem(index: number): void {
    this.productsService.showProductDetail.next(true);
    const productId = (index + 1);
    this.router.navigate([`products/${productId}`]);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}