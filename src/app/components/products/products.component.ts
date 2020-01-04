import { Component, OnInit } from '@angular/core';
import { ProductsService } from './../../services/products.service';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/products.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  private subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  constructor(private productsService: ProductsService,
    private router: Router) { }

  ngOnInit(): void {
    this.productsService.getProducts();
    this.subscription = this.productsService.getProductUpdateListener()
      .subscribe((productsData: { products: Product[] }) => {
        this.products = productsData.products;
        console.log(this.products);
      });
    this.subscription = this.productsService.startedEditing
      .subscribe(
        (index: number) => {
          this.editedItemIndex = index;
          this.editMode = true;
        }
      );
  }

  selectProductItem(index: number): void {
    this.productsService.startedEditing.next(index);
    const productId = (index + 1);
    this.router.navigate([`products/${productId}`]);
  }

}