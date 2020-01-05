import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from './../../../services/products.service';
import { Product } from 'src/app/models/products.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  product: Product;
  id: number;
  createMode: boolean = false;
  private subscription: Subscription;

  constructor(private route: ActivatedRoute,
    private productsService: ProductsService,
  ) { }

  ngOnInit(): void {
    this.route.firstChild.params.subscribe(
      (params: any) => {
        this.product = this.productsService.getProduct(params.id);
        console.log(this.product);
      })
    this.subscription = this.productsService.createMode
      .subscribe(
        (createMode: boolean) => {
          this.createMode = createMode;
          console.log(this.createMode);
        }
      );
  }

  onSubmit({ valid }): void {
    this.productsService.updateProduct(this.product.id, this.product);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}