import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductsService } from './../../../services/products.service';
import { Product } from 'src/app/models/products.model';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: Product;
  private subscription: Subscription;
  editedProductId: number;

  constructor(private route: ActivatedRoute,
    private productsService: ProductsService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    if (this.product === undefined) {
      this.route.firstChild.params.subscribe(
        (params: Params) => {
          this.product = this.productsService.getProduct(params.id);
        })
    } else {
      this.subscription = this.productsService.editedProductId.subscribe(
        (editedProductId: number) => {
          this.editedProductId = editedProductId;
          this.product = this.productsService.getProduct(this.editedProductId);
        });
    }
  }

  onSubmit({ valid }): void {
    if (valid) {
      this.toastr.success(`Thank you for updating product ${this.product.name}`, 'Product updated!');
    }
  }

}