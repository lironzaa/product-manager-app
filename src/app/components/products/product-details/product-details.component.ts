import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductsService } from './../../../services/products.service';
import { Product } from 'src/app/models/products.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: Product;

  constructor(private route: ActivatedRoute,
    private productsService: ProductsService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.route.firstChild.params.subscribe(
      (params: Params) => {
        this.product = this.productsService.getProduct(params.id);
      })
  }

  onSubmit({ valid }): void {
    console.log(`product id + ${this.product.id}`);
    if (valid) {
      this.productsService.updateProduct(this.product.id, this.product);
      this.toastr.success(`Thank you for updating product ${this.product.name}`, 'Product updated!');
    }
  }

}