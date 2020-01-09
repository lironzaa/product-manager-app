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
  productsOrigin: Product[] = [];
  private subscription: Subscription;
  showProductDetail: boolean = false;
  page: number = 1;
  constructor(private productsService: ProductsService,
    private router: Router) { }

  ngOnInit(): void {
    this.productsService.fetchProducts();
    this.subscription = this.productsService.productsUpdated
      .subscribe((productsData: { products: Product[] }) => {
        this.products = this.productsOrigin = productsData.products;
      });
    this.subscription = this.productsService.showProductDetail.subscribe(
      (showProductDetail: boolean) => {
        this.showProductDetail = showProductDetail;
      });
  }

  selectProductItem(clickedProduct: Product): void {
    this.productsService.showProductDetail.next(true);
    this.productsService.editedProductId.next(clickedProduct.id);
    this.router.navigate([`products/${clickedProduct.id}`]);
  }

  searchProduct(searchedProduct): void {
    if (searchedProduct.length > 0) {
      this.products = this.productsOrigin.filter(product => {
        return product.name.toLowerCase().match(searchedProduct.toLowerCase()) || product.description.match(searchedProduct.toLowerCase())
      })
    } else {
      this.products = this.productsOrigin;
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}